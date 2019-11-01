<template>
	<div class="write-app">
		<div class="article-submit"><a @click="handleSubmit">发表</a></div>
		<div class="edit-tool">
			<div style="display: inline-block" @click="handleUpload">
				<span><Icon class="el-icon-camera"></Icon></span>
				<input ref="fileInput" type="file" style="display: none" @change="handleUploadChange">
			</div>
		</div>
		<Panel ref="panel"></Panel>
	</div>
</template>

<script>
import Panel from './compoent/panel'
import {Icon, Upload} from 'element-ui'
import API from '@/api'
import axios from 'axios'
import {setItem} from '@/utils/storage'
export default {
  name: "write-panel",
  data () {
    return {}
  },
  components: {
    Panel,
	Icon
  },
  created () {
    API.checkLogin().then(json => {
      const data = json.data
	  if (data.code === 0) {
        setItem({
		  username: data.data.username
		})
	  }
	  else {
        this.$router.push('/login')
	  }
	})
  },
  methods: {
    handleSubmit () {
      const content = this.$refs.panel.$refs.notePanel.innerHTML
	  if (!content) {
        return
	  }
	  // 从内容中截取标题
	  const regResult = content.indexOf('<br>') > -1 ? content.match('<br>') : content
	  const title = typeof regResult === 'string' ? '' : content.slice(0, regResult.index)
      API.save({
		title,
		content
	  }).then(json => {
	    this.$router.push('/')
	  })
	},
	// 上传
    handleUpload () {
      this.$refs.fileInput.click()
	},
    handleUploadChange (e) {
      console.log(e)
	  const files = e.target.files
	  const type = files[0].type
	  const data = new FormData()
	  data.append('file', files[0])
      data.append('token', '9h5kHWHnr20ObcQ45Efmw7Y2J8Dn_0lvl6ch0cTZ:V8M-iZIxEqh-DyJaACrUA_5WhD4=:eyJzY29wZSI6ImNvbyIsImRlYWRsaW5lIjoxNTg2NjU5NTUxfQ==')
      axios({
        method: 'post',
        url: 'http://upload-z2.qiniup.com',
        data: data
      }).then(result => {
        if (type.indexOf('image') > -1) {
          const imgSrc = `http://image.shenxiaoyu.cn/${result.data.key}`
          let imgs = new Image()
          imgs.src = imgSrc
          imgs.style.display = 'inline-block'
          imgs.style.maxWidth = '100%'
          imgs.style.padding = '4px 0'
          imgs.style.borderRadius = '5px'
          this.$refs.panel.$refs.notePanel.appendChild(imgs)
          imgs = null
		}
		else if (type.indexOf('video') > -1) {

		}
      })
	},

	// 插入图片或视频的处理
	appendFile () {

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