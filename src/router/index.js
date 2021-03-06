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
import tradeApply from "../page/trade/tradeApply.vue"
import applySuccess from "../page/trade/applySuccess.vue"
import cl from "../page/role/cl.vue"
import cn from '../page/role/cn.vue'
import es from '../page/role/es.vue'
import fdax from '../page/role/fdax.vue'
import fdxm from '../page/role/fdxm.vue'
import gc from '../page/role/gc.vue'
import hg from '../page/role/hg.vue'
import hhi from '../page/role/hhi.vue'
import hsi from '../page/role/hsi.vue'
import mch from '../page/role/mch.vue'
import mhi from '../page/role/mhi.vue'
import ng from '../page/role/ng.vue'
import nk from '../page/role/nk.vue'
import nq from '../page/role/nq.vue'
import qm from '../page/role/qm.vue'
import si from '../page/role/si.vue'
import ym from '../page/role/ym.vue'



import account from "../page/account.vue"
import information from "../page/information.vue"
import login from "../page/account/login/login.vue"
import regisiter from "../page/account/login/regisiter.vue"
import wechatRegisiter from "../page/account/login/wechatRegisiter.vue"
import forgetPassword from "../page/account/login/forgetPassword.vue"
import resetPassword from "../page/account/login/resetPassword.vue"
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
import addMargin from"../page/account/myFinance/addMargin.vue"
import information_details from "../page/information/information_details.vue"
import information_search from "../page/information/information_search.vue"
import service from "../page/account/service.vue"
import payWays from "../page/account/payWays.vue"
import newbieTask from "../page/account/newbieTask.vue"
import userRegistrationProtocol from "../page/account/login/userRegistrationProtocol.vue"
import agreement from "../page/trade/agreement.vue"
import tradersRules from "../page/trade/tradersRules.vue"
import importantDetails from "../page/information/importantDetails.vue"
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
		component: tradeLogin,
		children:[
			{
				path:"/tradeLogin",
				component:tradeLogin
			},{
				path:"/tradeLogin/tradeApply",
				component:tradeApply
			}
		]
	},{
		path: '/applySuccess',
		component: applySuccess
	},{
		path: '/cl',
		component: cl
	},{
		path: '/cn',
		component: cn
	},{
		path: '/es',
		component: es
	},{
		path: '/fdax',
		component: fdax
	},{
		path: '/fdxm',
		component: fdxm
	},{
		path: '/gc',
		component: gc
	},{
		path: '/hg',
		component: hg
	},{
		path: '/hhi',
		component: hhi
	},{
		path: '/hsi',
		component: hsi
	},{
		path: '/mch',
		component: mch
	},{
		path: '/mhi',
		component: mhi
	},{
		path: '/ng',
		component: ng
	},{
		path: '/nk',
		component: nk
	},{
		path: '/nq',
		component: nq
	},{
		path: '/qm',
		component: qm
	},{
		path: '/si',
		component: si
	},{
		path: '/ym',
		component: ym
	},
	
	
	{
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
		component:financeDetails
	},{
		path:'/addMargin',
		component:addMargin,
	},{
		path:'/information_details',
		component:information_details
	},{
		path:'/information_search',
		component:information_search
	},{
		path:'/service',
		component:service
	},{
		path:'/payWays',
		component:payWays
	},{
		path:"/newbieTask",
		component:newbieTask
	},{
		path:"/userRegistrationProtocol",
		component:userRegistrationProtocol
	},{
		path:"/agreement",
		component:agreement
	},{
		path:"/tradersRules",
		component:tradersRules
	},{
		path:"/importantDetails",
		component:importantDetails
	}
	]
})