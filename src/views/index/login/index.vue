<template>
	<div class="login-wraper">
		<div v-if="status === 'signIn'">
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
			<div class="text-desr">
				<p class="text-sign-up" @click="status = 'signUp'">注册</p>
			</div>
		</div>
		<div v-else-if="status === 'signUp'">
			<div class="login-title">xiuxiu 注册</div>
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
					<van-field
							v-model="referee"
							label="推荐人"
							placeholder="请输入推荐人"
							clearable
							required
					/>
				</van-cell-group>
			</div>
			<div class="login-but">
				<van-button type="primary" style="width: 80%" round @click="signUpSubmit">注册</van-button>
			</div>
			<div class="text-desr">
				<p class="text-sign-up" @click="status = 'signIn'">登录</p>
			</div>
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
	  password: '',
	  status: 'signIn',
      referee: ''
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
	},

    signUpSubmit () {
      if (this.username && this.password && this.referee) {
        API.signUp({
          username: this.username,
          pass: this.password,
		  referee: this.referee
        }).then(json => {
          if (json.data.code === 0) {
            this.status = 'signIn'
            // this.$router.push('/login')
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

	.text-desr {
		text-align: right;
		.text-sign-up {
			font-size: 12Px;
			padding: 5vw;
			color: #7d7e80;
			display: inline-block;
		}
	}

</style>