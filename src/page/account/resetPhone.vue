<template>
	<div id="resetPhone">
		<mt-header title="修改手机号" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/personalSet" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		</mt-header>
		<div id="container">
			<div class="info">
				<p>您现在正在为账户&nbsp;{{mobile}}&nbsp;修改手机号</p>
			</div>
			<div class="phoneNumber">
				手机号:<span>{{mobile}}</span>
			</div>
			<div id="ipt">
				<ul>
					<li>
						<input type="text" class="input1" placeholder="短信验证" v-model="code"/>
						<i @click="getcode">{{volid ? info : ('倒计时'+time + '秒')}}</i>
					</li>
				</ul>
				<ul>
					<li>
						<input type="text" class="input1" placeholder="新手机号" v-model="cellphone"/>
					</li>
				</ul>
				<ul>
					<li>
						<input type="text" class="input1" placeholder="新验证码" v-model="code1"/>
						<i @click="getcode1">{{volid1 ? info : ('倒计时'+time1 + '秒')}}</i>
					</li>
				</ul>
				<mt-button class="btn" @click.native="confirm" type="danger">确认</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	import pro from "../../assets/js/common.js"
	export default{
		name:"resetPhone",
		data(){
			return{
				phone:"",
				mobile:"",
				userInfo:"",
				info:"获取验证码",
				time: 0,
				time1:0,
				cellphone:'',
				code:"",
				code1:'',
				phoneReg: /^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/
			}
		},
		computed: {
//			PATH: function(){
//				return this.$store.getters.PATH;
//			},
			volid: function(){
				if(this.time <= 0){
					return true
				}else{
					return false
				}
			},
//			environment(){
//				return this.$store.state.environment;
//			},
//			version: function(){
//				return '1.1';
//			},
			volid1:function(){
				if(this.time1 <= 0){
					return true
				}else{
					return false
				}
			}
		},
		methods:{
			getcode :function(e){
				//页面效果
				$(e.target).addClass('current');
				this.time = 60;
				var timing = setInterval(function(){
					this.time--;
					if(this.time <= 0){
						clearInterval(timing);
						$(e.target).removeClass('current');
					}
				}.bind(this), 1000);
				var data= {
					mobile:this.phone,
					type:3
				}
				var headers = {
					token : this.userInfo.token,
					secret : this.userInfo.secret
				}
				pro.fetch("post","/loginAndRegister/getSmsCode",data,headers).then((res)=>{
					if(res.code == 1 && res.success == true){
						this.$toast({message:"发送成功",duration: 2000});
					}
				}).catch((err)=>{
					var data = err.data;
					if(data == undefined){
						this.$toast({message:"网络不给力，请稍后再试",duration: 2000});
					}else if(data.code == -9999){
						this.$toast({message:"认证失败，请重新登录",duration: 2000});
						this.$router.push({path:"/login"})
					}else{
						this.$toast({message:data.message,duration: 2000});
					}
				})
			},
			getcode1:function(e){
				
				var data= {
					mobile:this.cellphone,
					type:3
				}
				var headers = {
					token : this.userInfo.token,
					secret : this.userInfo.secret
				}
				if(this.phoneReg.test(this.cellphone) == false){
					this.$toast({message:"请输入正确手机号",duration: 2000});
				}else{
					pro.fetch("post","/loginAndRegister/getSmsCode",data,headers).then((res)=>{
						if(res.code == 1 && res.success == true){
							this.$toast({message:"发送成功",duration: 2000});
						}
					}).catch((err)=>{
						var data = err.data;
						if(data == undefined){
							this.$toast({message:"网络不给力，请稍后再试",duration: 2000});
						}else if(data.code == -9999){
							this.$toast({message:"认证失败，请重新登录",duration: 2000});
							this.$router.push({path:"/login"})
						}else{
							this.$toast({message:data.message,duration: 2000});
						}
					})
						//页面效果
					$(e.target).addClass('current');
					this.time1 = 60;
					var timing = setInterval(function(){
						this.time1--;
						if(this.time1 <= 0){
							clearInterval(timing);
							$(e.target).removeClass('current');
						}
					}.bind(this), 1000);
				}
			},
			confirm:function(){
				if(this.cellphone == ''){
					this.$toast({message:"请输入手机号",duration: 2000});
				}else if(this.code == ''){
					this.$toast({message:"请输入原手机号短信验证码",duration: 2000});
				}else if(this.code1 == ''){
					this.$toast({message:"请输入新手机号短信验证码",duration: 2000});
				}else if(this.phoneReg.test(this.cellphone)==false){
					this.$toast({message:"请输入正确手机号",duration: 2000});
				}else{
					var data = {
						oldMobileCode:this.code,
						newMobile:this.cellphone,
						newMobileCode:this.code1
					}
					var headers = {
						token : this.userInfo.token,
						secret : this.userInfo.secret
					}
					pro.fetch("post","/account/modifyMoblie",data,headers).then((res)=>{
						if(res.code == 1 && res.success == true){
							this.$toast({message:"修改成功，请重新登录",duration: 2000});
							this.$router.push({path:"/login"});
						}
					}).catch((err)=>{
						var data = err.data;
						if(data == undefined){
							this.$toast({message:"网络不给力，请稍后再试",duration: 2000});
						}else if(data.code == -9999){
							this.$toast({message:"认证失败，请重新登录",duration: 2000});
							this.$router.push({path:"/login"});
						}else{
							this.$toast({message:data.message,duration: 2000});
						}
					})
				}
			}
		},
		mounted:function(){
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
			this.phone = this.$route.query.phone;
			console.log("this.phone===="+this.phone)
			var phone = this.$route.query.phone;
			this.mobile = phone.substr(0, 3) + '****' + phone.substr(7);
		},
		activited:function(){
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
			this.phone = this.$route.query.phone
		}
	}
</script>
<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#resetPhone{
		width: 7.5rem;
	}
	#back{
		display: inline-block;
		width: 0.64rem;
		height: 1rem;
		background: url(../../assets/images/back_icon.png) no-repeat 0.15rem 0.34rem;
		background-size: 0.24rem 0.32rem;
	}
	#container{
		width: 100%;
		margin-top: 1rem;
		.info{
			height: 0.64rem;
			border-bottom: 1px solid #12141a;
			line-height: 0.64rem;
			background-color: $titleBlue;
			padding: 0 0.3rem;
		}
		.phoneNumber{
			height: 0.9rem;
			line-height: 0.9rem;
			padding: 0 0.3rem;
			border-bottom: 1px solid #12141a;
			span{
				color: $white;
				margin-left:0.2rem;
			}
		}
		#ipt{
			padding: 0 0.3rem;
			display: flex;
			flex-direction: column;
			ul{
				li{
					position: relative;
					i{
						position: absolute;
						top: 0.34rem;
						right: 0.02rem;
						display: block;
						width: 1.7rem;
						height: 0.8rem;
						background-color: $titleBlue;
						text-align: center;
						line-height: 0.88rem;
						border-radius: 0 0.1rem 0.1rem 0;
						border-left: 1px solid #12141a;
						color: $fontBlue;
						span{
							color: $blue;
							margin: 0 0.06rem;
						}
					}
				}
			}
			.btn{
				margin-top: 0.3rem;
				width:100%;
				height: 0.8rem;
				background-color: $blue;
				color: $white;
				border: none;
			}
			.input1{
				background-color: #1b1f26;
				border: 1px solid #12141a;
				outline: none;
				border-radius: 0.1rem;
				height: 0.88rem;
				width: 6.9rem;
				text-indent: 0.2rem;
				color: $white;
				margin-top: 0.3rem;
			}
			.current{
				pointer-events: none;
			}
		}
	}
</style>