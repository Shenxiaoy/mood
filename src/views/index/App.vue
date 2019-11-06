<template>
	<div class="test">
		<router-view />
	</div>
</template>

<script>
import API from '@/api'
import {setItem} from '@/utils/storage'
export default {
  name: 'home',
  data () {
	return {
	}
  },
  async created () {
    await API.checkLogin().then(json => {
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
  }
}
</script>
