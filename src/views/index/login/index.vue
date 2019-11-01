<template>
	<div class="login-wraper">
		<div class="login-title">
			xiuxiu 登录
		</div>
		<div class="login-info">
			<van-cell-group>
				<van-field
						v-model="username"
						required
						clearable
						label="用户名"
						placeholder="请输入用户名"
						@click-right-icon="$toast('question')"
				/>

				<van-field
						v-model="password"
						type="password"
						label="密码"
						placeholder="请输入密码"
						clearable
						required
				/>
			</van-cell-group>
		</div>
		<div class="login-but">
			<van-button type="primary" style="width: 80%" round @click="submit">登录</van-button>
		</div>
	</div>
</template>

<script>
import {Field, Divider, Button} from 'vant'
import API from '@/api'
export default {
  name: "login",
  data () {
    return {
      username: '',
	  password: ''
	}
  },
  methods: {
    async submit () {
      if (this.username && this.password) {
        API.login({
		  username: this.username,
		  pass: this.password
		}).then(json => {
		  if (json.data.code === 0) {
            this.$router.push('/')
          }
        })
	  }
	}
  },
  components: {
    [Field.name]: Field,
	[Divider.name]: Divider,
	[Button.name]: Button
  }
}
</script>

<style scoped lang="scss">
	.login-wraper {
		background-color: #F0F3F6;
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
	}
	.login-title {
		text-align: center;
		margin: 30px 0;
	}
	.login-info {
		padding: 10px;
		margin-top: 100px;
	}
	.login-but {
		text-align: center;
		margin-top: 50px;
	}
</style>