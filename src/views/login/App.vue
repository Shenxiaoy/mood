<template>
	<div style="min-height: 100vh">
		<div class="fixed-write" @click="handlePanel">
			<Icon class="el-icon-s-operation"></Icon>
		</div>
		<div class="wraper">
			<item></item>
		</div>
	</div>
</template>

<script>
import '@/assets/basic.css'
import Item from './component/item'
import {Icon, Dialog} from 'element-ui'
export default {
  name: 'show',
  data () {
    return {
    }
  },
  components: {
    Item,
	Icon
  },
  methods: {
    handlePanel () {

	}
  }
}
</script>
<style scoped lang="scss">
	.fixed-write {
		position: absolute;
		right: 2vw;
		top: 2vw;
		font-size: 2vw;
		color: wheat;
		padding: 1px;
	}
	.wraper {
		font-size: 14Px;
		width: 90%;
		position: relative;
		margin: 5vw auto;
		background-color: rgba(250, 250, 250, .5);
		padding: 2vw;
		border-radius: 5Px;
		box-sizing: border-box;
	}
</style>
