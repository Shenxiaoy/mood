<template>
	<div class="upload-v1">
		<div @click="handleUpload">
			<slot>上传</slot>
		</div>
		<input
				ref="fileInput"
				type="file"
				style="display: none"
				:multiple="multiple"
				:accept="accept"
				@change="handleUploadChange">

	</div>
</template>

<script>
import axios from 'axios'
import {dataURLtoFile} from '@/utils/func'
export default {
  name: "upload-v1",
  data () {
    return {
      fileList: [],
	  accept: 'image/*,video/*',
	  loading: false
	}
  },
  components: {

  },
  props: {
    token: {
      type: String,
	  default: '9h5kHWHnr20ObcQ45Efmw7Y2J8Dn_0lvl6ch0cTZ:V8M-iZIxEqh-DyJaACrUA_5WhD4=:eyJzY29wZSI6ImNvbyIsImRlYWRsaW5lIjoxNTg2NjU5NTUxfQ=='
	},
	action: {
      type: String,
	  default: 'http://upload-z2.qiniup.com'
	},
    multiple: {
      type: Boolean,
	  default: true
	},
	accepts: {
      type: Array,
	  default: ['png', 'jpg', 'webp', 'mp4']
	},
	origin: {
      type: String,
	  default: 'http://image.shenxiaoyu.cn'
	}
  },
  methods: {
    // 单个文件请求上传
    async singleUpload (blob) {
      const fileInfo = {
        name: blob.name,
		type: blob.type,
        size: (blob.size/1024/1024).toFixed(3)
	  }

	  // 获取视频预览图src url
	  if (fileInfo.type.indexOf('video') > -1) {
        const imgBlob = await this.getVideoPhoto(blob)
		console.log(imgBlob, 'sssss')
        const data = new FormData()
        data.append('file', imgBlob)
        data.append('token', this.token)
		const json = await axios({
          method: 'post',
          url: this.action,
          data: data
        })
		fileInfo.imgUrl = `${this.origin}/${json.data.key}`
	  }

      const data = new FormData()
      data.append('file', blob)
      data.append('token', this.token)
      return axios({
        method: 'post',
        url: this.action,
        data: data
      }).then(result => {
        const obj = Object.assign({}, fileInfo, {
          url: `${this.origin}/${result.data.key}`
		})
        return obj
      })
    },
    // 获取视频第一帧图片
    getVideoPhoto (blob) {
      const url = window.URL.createObjectURL(blob)
      const video = document.createElement('video')
      video.width = 500
      video.height = 500
      video.src = url
      video.currentTime = 1
      const canvas = document.createElement('canvas')
      canvas.width = 500
      canvas.height = 500
	  return new Promise((res, rej) => {
        video.oncanplay = () => {
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
          const img = canvas.toDataURL('image/jpeg')
          const imgBlob = dataURLtoFile(img, 'image/jpeg')
          try {
            res(imgBlob)
		  }
		  catch (error) {
            rej(error)
		  }
        }
	  })


      // console.log(smallImgBlob, 'outoutout')
      // return smallImgBlob
    },
    async handleUploadChange (e) {
      const files = Array.from(e.target.files)
      if (files.length > 9) {
        console.log('选择文件最大数量不能超过9个')
		return
	  }
	  // 文件类型校验
	  //...

	  // 批量上传文件
	  this.loading = true
	  this.$emit('loadingChange', true)
	  const axiosList = files.map(item => {
	    return this.singleUpload(item)
	  })
	  const result = await axios.all(axiosList)
	  this.loading = false

      this.$emit('loadingChange', false)
	  this.$emit('onchange', result)
	},

    handleUpload () {
      this.$refs.fileInput.click()
    },
  },
  created () {

  }
}
</script>

<style scoped lang="scss">
	.upload-v1 {
		display: inline-block;
	}
</style>