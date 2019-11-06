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
    singleUpload (blob) {
      const fileInfo = {
        name: blob.name,
		type: blob.type,
        size: (blob.size/1024/1024).toFixed(3)
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