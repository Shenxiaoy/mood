<template>
	<div class="article-item">
		<div></div>
		<div class="article-title">{{result.title}}</div>
		<div class="content-show">
			<div class="pic-item" v-for="item in result.fileList">
				<a v-if="isPic(item.type) === 'image'" @click="bigPhoto(item)">
					<img :src="item.url" alt="">
				</a>
				<a class="item-video" v-else-if="isPic(item.type) === 'video'" @click="bigPhoto(item)">
					<img :src="item.imgUrl || ''" alt="">
					<span class="video-play"><van-icon name="play-circle-o" /></span>
				</a>

			</div>
		</div>
		<div class="photo-fixed" :style="{display: display}">
			<div class="back-but" @click.stop="cancel"><van-icon name="arrow-left" /></div>
			<div class="content" v-if="isPic(fileType) === 'image'">
				<img @click="cancel" :src="url" alt="">
			</div>
			<div v-else-if="isPic(fileType) === 'video'" class="video-show content">
				<video autoplay @click.stop="cancel" :src="url">不支持视频播放</video>
			</div>

		</div>
	</div>
</template>

<script>
import {Icon} from 'vant'
export default {
  name: "tab-one",
  data () {
    return {
      display: 'none',
	  url: '',
	  fileType: ''
    }
  },
  props: ['result'],
  components: {
    [Icon.name]: Icon
  },
  methods: {
    // 预览
    bigPhoto (item) {
      this.display = 'block'
	  this.url = item.url
	  this.fileType = item.type
	},
    cancel () {
      this.display = 'none'
      this.url = ''
	  this.type = ''
	},
	// 判断图片和视频类型
	isPic (type) {
      if (type.indexOf('image') > -1) {
        return 'image'
	  }
	  else if (type.indexOf('video') > -1) {
        return 'video'
	  }
	}
  }
}
</script>

<style scoped lang="scss">
	.article-item {
		overflow: hidden;
		width: 100%;
		font-size: 14Px;
		.content-show {
			overflow: hidden;
			margin-top: 10px;
			.pic-item {
				background-color: rgba(255, 255, 255, .1);
				width: 30vw;
				height: 30vw;
				margin-left: 10px;
				margin-top: 10px;
				display: inline-block;
				vertical-align: middle;
				overflow: hidden;
				/*border: 1px solid darkorchid;*/
				img {
					display: inline-block;
					width: 100%;
					/*height: 100%;*/
				}
				.item-video {
					display: inline-block;
					width: 100%;
					height: 100%;
					overflow: hidden;
					max-height: 100%;
					position: relative;
					.video-play {
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
						color: rgba(255,255,255, .7);
						font-size: 30Px;

					}
				}

			}
		}
	}
	.photo-fixed {
		overflow: hidden;
		position: fixed;
		width: 100vw;
		height: 100vh;
		background: #323233;
		z-index: 100;
		top: 0;
		left: 0;
		.back-but {
			position: absolute;
			left: 0;
			top: 0;
			padding: 15Px;
			color: white;
			font-size: 20Px;

		}

		.content {
			width: 100vw;
			height: 100vh;
			display: flex;
			align-items: center;
			img {
				/*display: inline-block;*/
				width: 100%;
				/*height: 100%;*/
			}
			video {
				width: 100vw;
			}
		}

	}
</style>