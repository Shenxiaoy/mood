<template>
	<div>
		<div style="border-bottom: 1px solid #c8c9cc">
			<van-field label="标题：" v-model="value" placeholder="文字内容" />
		</div>
		<div class="upload-content">
			<div>
				<div>
					<div class="upload-style">
						<QiniuUpload
								@onchange="uploadChange"
								@loadingChange="loadingChange"
						>
							<span><Icon class="el-icon-camera"></Icon></span>
						</QiniuUpload>
					</div>
				</div>
				<p>上传图片</p>
			</div>
		</div>
		<div class="content-show">
			<div class="pic-item" v-for="item in fileList">
				<img v-if="item.type.indexOf('image') > -1" :src="item.url" alt="">
				<video v-else-if="item.type.indexOf('video') > -1" :src="item.url">不支持视频</video>
				<span v-else>{{item.name}}</span>
			</div>
		</div>
		<div>
			<van-overlay :show="show">
				<div class="overlay-loading">
					<van-loading type="spinner" color="#ffffff" />
				</div>
			</van-overlay>
		</div>
	</div>
</template>

<script>
import {Field, Icon, Loading, Overlay} from 'vant'
import QiniuUpload from '@/components/upload/qiniuUpload-v1'

export default {
  name: "picontent",
  data () {
    return {
      value: '',
	  fileList: [],
	  show: false
	}
  },
  components: {
    [Field.name]: Field,
    Icon,
    QiniuUpload,
	[Loading.name]: Loading,
	[Overlay.name]: Overlay
  },
  methods: {
    uploadChange (urlList) {
      console.log(urlList, 'pic')
      this.fileList = urlList
	},
	// 上传前后的loading 状态
    loadingChange (boolean) {
      if (boolean) {
        this.show = true
	  }
	  else {
        this.show = false
	  }
	}
  },
  created () {

  }
}
</script>

<style scoped lang="scss">
	.upload-content {
		display: flex;
		justify-content: center;
		margin-top: 50px;
		font-size: 32Px;
		color: white;
		text-align: center;

		.upload-style {
			background-color: #7d7e80;
			padding: 0 15px;
			display: inline-block;
			border-radius: 20%;
		}
		p {
			color: #323233;
			font-size: 16Px;
			display: inline-block;
		}
	}

	.content-show {

		margin-top: 30px;
		margin-left: 10px;

		.pic-item {
			width: 30vw;
			height: 30vw;
			margin-left: 10px;
			margin-top: 10px;
			display: inline-block;
			vertical-align: middle;
			overflow: hidden;
			img, video {
				display: inline-block;
				width: 100%;
				max-width: 100%;
			}
		}
	}

	.overlay-loading {
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

</style>