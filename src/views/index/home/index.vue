<template>
	<div class="home">
		<div class="fixed-write" @click="handlePanel">
			<Icon class="el-icon-s-operation"></Icon>
		</div>
		<div class="wraper" v-for="item in articleList">
			<item :result="item"></item>
		</div>
		<div style="width: 100%; height: 10vw;"></div>
	</div>
</template>

<script>
import '@/assets/basic.css'
import Item from './component/item'
import {Icon, Dialog} from 'element-ui'
import API from '@/api'

export default {
  name: 'show',
  data () {
    return {
      articleList: []
    }
  },
  components: {
    Item,
	Icon
  },
  methods: {
    handlePanel () {
      this.$router.push('/write')
	}
  },
  created () {
    API.list().then(json => {
      const data = json.data.data
	  console.log(data, '------')
	  this.articleList = data.list
	})
  }
}
</script>
<style scoped lang="scss">
	.home {
		background: linear-gradient(187deg, rgba(236, 236, 236, 0.07) 0%, rgba(236, 236, 236, 0.07) 50%,rgba(160, 160, 160, 0.07) 50%, rgba(160, 160, 160, 0.07) 100%),linear-gradient(255deg, rgba(79, 79, 79, 0.09) 0%, rgba(79, 79, 79, 0.09) 50%,rgba(134, 134, 134, 0.09) 50%, rgba(134, 134, 134, 0.09) 100%),linear-gradient(191deg, rgba(80, 80, 80, 0.08) 0%, rgba(80, 80, 80, 0.08) 50%,rgba(132, 132, 132, 0.08) 50%, rgba(132, 132, 132, 0.08) 100%),linear-gradient(339deg, rgba(210, 210, 210, 0.04) 0%, rgba(210, 210, 210, 0.04) 50%,rgba(36, 36, 36, 0.04) 50%, rgba(36, 36, 36, 0.04) 100%),linear-gradient(173deg, rgba(68, 68, 68, 0.09) 0%, rgba(68, 68, 68, 0.09) 50%,rgba(57, 57, 57, 0.09) 50%, rgba(57, 57, 57, 0.09) 100%),linear-gradient(317deg, rgba(10, 10, 10, 0.01) 0%, rgba(10, 10, 10, 0.01) 50%,rgba(17, 17, 17, 0.01) 50%, rgba(17, 17, 17, 0.01) 100%),linear-gradient(173deg, rgba(25, 25, 25, 0.07) 0%, rgba(25, 25, 25, 0.07) 50%,rgba(127, 127, 127, 0.07) 50%, rgba(127, 127, 127, 0.07) 100%),linear-gradient(222deg, rgba(199, 199, 199, 0.05) 0%, rgba(199, 199, 199, 0.05) 50%,rgba(59, 59, 59, 0.05) 50%, rgba(59, 59, 59, 0.05) 100%),linear-gradient(232deg, rgba(161, 161, 161, 0.01) 0%, rgba(161, 161, 161, 0.01) 50%,rgba(28, 28, 28, 0.01) 50%, rgba(28, 28, 28, 0.01) 100%),linear-gradient(90deg, #9b0188,#dfdd49,#0f4d74);
		font-size: 16Px;
		width: 100vw;
		min-height: 100vh;
		position: relative;
		overflow: hidden;
	}
	.fixed-write {
		position: absolute;
		right: 2vw;
		top: 2vw;
		font-size: 18Px;
		color: wheat;
		padding: 1px;
		height: 20Px;
	}
	.wraper {
		font-size: 14Px;
		width: 100%;
		position: relative;
		top: 25Px;
		margin: 5vw auto;
		background-color: rgba(250, 250, 250, .5);
		padding: 2vw;
		/*border-radius: 5Px;*/
		box-sizing: border-box;
	}
</style>
