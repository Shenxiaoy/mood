<template>
	<div class="article-item">
		<!--<div class="article-title">{{result.title}}</div>-->
		<div class="article-content" v-html="result.content"></div>
	</div>
</template>

<script>
export default {
  name: "item",
  data () {
    return {

	}
  },
  props: ['result']
}
</script>

<style scoped lang="scss">
	.article-item {
		width: 100%;
		font-size: 14Px;
		.article-title {

		}
		.article-content {
			margin-top: 5px;
			img {
				max-width: 80%;
			}
		}
	}
</style>