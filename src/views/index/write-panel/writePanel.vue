<template>
	<div class="write-app">
		<div class="article-submit"><a @click="handleSubmit">发表</a></div>
		<div class="tab-text" key="tab_title">
			<div @click="handleTab(2)" v-if="tabType === 1"><van-icon name="send-gift" /> 图文模式</div>
			<div @click="handleTab(1)" v-else-if="tabType === 2"><van-icon name="card" /> 富文本模式</div>
		</div>
		<div key="tab-content">
			<div v-if="tabType === 2">
				<div class="edit-tool">
					<div style="display: inline-block">
						<QiniuUpload @onchange="uploadChange">
							<span style="color: #c8c9cc"><Icon class="el-icon-camera"></Icon></span>
						</QiniuUpload>
					</div>
				</div>
				<Panel ref="panel"></Panel>
			</div>
			<div v-else>
				<Picontent ref="picGroup"></Picontent>
			</div>
		</div>
	</div>
</template>

<script>
import Panel from './component/panel'
import {Icon, Upload} from 'element-ui'
import API from '@/api'
import {setItem} from '@/utils/storage'
import QiniuUpload from '@/components/upload/qiniuUpload-v1'
import Picontent from './component/picontent'

export default {
  name: "write-panel",
  data () {
    return {
      tabType: 1
	}
  },
  components: {
    Panel,
	Icon,
    QiniuUpload,
    Picontent
  },
  created () {
  },
  methods: {
    // 编辑模式切换
    handleTab (type) {
      this.tabType = type
	},
    uploadChange (urlList) {
      urlList.forEach(file => {
        if (file.type.indexOf('image') > -1) {
          const imgSrc = file.url
          let imgs = new Image()
          imgs.src = imgSrc
          imgs.style.display = 'inline-block'
          imgs.style.maxWidth = '100%'
          imgs.style.padding = '4px 0'
          imgs.style.borderRadius = '5px'
          this.$refs.panel.$refs.notePanel.appendChild(imgs)
          imgs = null
		}
	  })
	},
    handleSubmit () {
      let title, content,
		type = this.tabType
      if (this.tabType === 1) {
        // 照片编辑模式
		title = this.$refs.picGroup.value
		content = this.$refs.picGroup.fileList
	  }
	  else {
        // 富文本编辑模式
        content = this.$refs.panel.$refs.notePanel.innerHTML
        if (!content) {
          return
        }
        // 从内容中截取标题
        const regResult = content.indexOf('<br>') > -1 ? content.match('<br>') : content
        title = typeof regResult === 'string' ? '' : content.slice(0, regResult.index)
	  }

      API.save({
        title,
        content,
		type
      }).then(() => {
        this.$router.push('/')
      })
	}
  }
}
</script>

<style scoped lang="scss">
	.write-app {
		width: 100%;
		overflow: hidden;
		.article-submit {
			text-align: right;
			padding: 10px 20px;
			a {
				border: 1px solid #e9e9e9;
				font-family: "Adobe Devanagari";
				font-size: 14Px;
				display: inline-block;
				padding: 0 10Px;
				border-radius: 3px;
				color: #323233;
			}
		}
		.tab-text {
			div {
				display: inline-block;
				font-size: 14Px;
				box-sizing: border-box;
				margin: 30px;
				padding: 10px;
				color: #c8c9cc;
				/*border-radius: 10px;*/
				border-bottom: 1px solid #969799;
			}
		}
		.edit-tool {
			font-size: 50px;
			margin: 0 auto;
			width: 95%;
			height: 55px;
			padding: 20px 10px 10px 10px;
			border-bottom: 1px solid #eeeeee;
			text-align: center;
		}
	}

</style>