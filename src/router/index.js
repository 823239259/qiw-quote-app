import Vue from 'vue'
import Router from 'vue-router'
import index from '../page/index.vue'
import stockFutures from "../page/quote/stockFutures.vue"
import optionalList from "../page/quote/optionalList.vue"
import optionalBox from "../page/quote/optionalBox.vue"
import noLogin from "../page/quote/noLogin.vue"
import optionalManage from "../page/quote/optionalManage.vue"
import search from "../page/quote/search.vue"
import quoteDetails from "../page/quote/quoteDetails.vue"
import remind from "../page/quote/remind.vue"
import tradeLogin from "../page/trade/tradeLogin.vue"
import trade from "../page/trade.vue"


import account from "../page/account.vue"
import information from "../page/information.vue"
import login from "../page/login.vue"
import regisiter from "../page/regisiter.vue"
import wechatRegisiter from "../page/wechatRegisiter.vue"
import forgetPassword from "../page/forgetPassword.vue"
import resetPassword from "../page/resetPassword.vue"
import personalSet from "../page/account/personalSet.vue"
import resetLoginPassword from "../page/account/resetLoginPassword.vue"
import resetPhone from "../page/account/resetPhone.vue"
import moneyDetails from"../page/account/moneyDetails.vue"
import realName from"../page/account/realName.vue"
import feedBack from"../page/account/feedBack.vue"
import help from"../page/account/help.vue"
import customerServices from"../page/account/customerServices.vue"
import newsNotice from"../page/account/newsNotice.vue"
import newsDetails from"../page/account/newsDetails.vue"
import recharge from"../page/account/recharge.vue"
import myFinance from"../page/account/myFinance/myFinance.vue"
import financeDetails from"../page/account/myFinance/financeDetails.vue"
import schemeDetails from"../page/account/myFinance/schemeDetails.vue"
import historyRecords from"../page/account/myFinance/historyRecords.vue"

Vue.use(Router)

export default new Router({
	routes: [{
		path: '*',
		component: index
	},{
		path: '/',
		component: index
	},{
		path: '/account',
		component:account
	},{
		path: '/information',
		component: information
	},{
		path: '/trade',
		component: trade
	},{
		path: '/stockFutures',
		component: stockFutures
	},{
		path: '/optionalList',
		component: optionalList
	},{
		path: '/optionalBox',
		component: optionalBox
	},{
		path: '/noLogin',
		component: noLogin
	},{
		path: '/optionalManage',
		component: optionalManage
	},{
		path: '/search',
		component: search
	},{
		path: '/quoteDetails',
		component: quoteDetails
	},{
		path: '/remind',
		component: remind
	},{
		path: '/tradeLogin',
		component: tradeLogin
		
		
		
		
	},{
		path:'/login',
		component:login
	},{
		path:'/regisiter',
		component:regisiter
	},{
		path:'/wechatRegisiter',
		component:wechatRegisiter
	},{
		path:'/forgetPassword',
		component:forgetPassword
	},{
		path:'/resetPassword',
		component:resetPassword
	},{
		path:'/personalSet',
		component:personalSet
	},{
		path:'/resetLoginPassword',
		component:resetLoginPassword
	},{
		path:'/resetPhone',
		component:resetPhone
	},{
		path:'/moneyDetails',
		component:moneyDetails
	},{
		path:'/realName',
		component:realName
	},{
		path:'/feedBack',
		component:feedBack
	},{
		path:'/help',
		component:help
	},{
		path:'/customerServices',
		component:customerServices
	},{
		path:'/newsNotice',
		component:newsNotice	
	},{
		path:'/newsDetails',
		component:newsDetails
	},{
		path:'/recharge',
		component:recharge
	},{
		path:'/myFinance',
		component:myFinance
	},{
		path:'/financeDetails',
		component:financeDetails,
		children:[
			{
				path:"/schemeDetails",
				component:schemeDetails
			},{
				path:"/historyRecords",
				component:historyRecords
			}
		]
	}
	]
})