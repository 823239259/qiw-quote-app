<template>
	<div id="tradeCenter">
		<div v-if="length > 0">
			<div class="tips">
				<span :class="{red: parameters[0].LastQuotation.LastPrice > parameters[0].LastQuotation.PreSettlePrice, green: parameters[0].LastQuotation.LastPrice < parameters[0].LastQuotation.PreSettlePrice}">{{parameters[0].LastQuotation.LastPrice | fixNum(parameters[0].DotSize)}}</span>
				<span :class="{green: parameters[0].LastQuotation.ChangeRate < 0, red: parameters[0].LastQuotation.ChangeRate > 0}"><em v-show="parameters[0].LastQuotation.ChangeRate > 0">+</em>{{parameters[0].LastQuotation.ChangeValue | fixNum(parameters[0].DotSize)}}</span>
				<span :class="{green: parameters[0].LastQuotation.ChangeRate < 0, red: parameters[0].LastQuotation.ChangeRate > 0}"><em v-show="parameters[0].LastQuotation.ChangeRate > 0">+</em>{{parameters[0].LastQuotation.ChangeRate | fixNumTwo}}%</span>
				<p>成交量：<em>{{parameters[0].LastQuotation.TotalVolume}}</em></p>
			</div>
			<div class="fens_title">
				<span @tap="showFens">分时图</span>
				<i class="icon icon_triangle" @tap="showFens"></i>
				<button>规则</button>
			</div>
			<div class="fens_box">
				<div id="fens"></div>
				<div id="volume"></div>
			</div>
			<div class="buy_one">
				<div class="col">
					<em>卖一</em>
					<span :class="{red: parameters[0].LastQuotation.AskPrice1 > parameters[0].LastQuotation.PreSettlePrice, green: parameters[0].LastQuotation.AskPrice1 < parameters[0].LastQuotation.PreSettlePrice}">{{parameters[0].LastQuotation.AskPrice1 | fixNum(parameters[0].DotSize)}}</span>
					<em>{{parameters[0].LastQuotation.AskQty1}}</em>
				</div>
				<div class="col">
					<em>买一</em>
					<span :class="{red: parameters[0].LastQuotation.BidPrice1 > parameters[0].LastQuotation.PreSettlePrice, green: parameters[0].LastQuotation.BidPrice1 < parameters[0].LastQuotation.PreSettlePrice}">{{parameters[0].LastQuotation.BidPrice1 | fixNum(parameters[0].DotSize)}}</span>
					<em>{{parameters[0].LastQuotation.BidQty1}}</em>
				</div>
			</div>
		</div>
		<div class="order_type">
			<template v-for="(v, index) in orderList">
				<span :class="{current: currentOrderType == index}" @touchstart="orderTypeSwitch(index)">{{v}}</span>
			</template>
		</div>
		<div class="order_cont fm">
			<div class="row">
				<b>合约代码</b>
				<div class="slt fl" @tap="openSelectOrder">
					<input type="text" class="ipt_lg" :value="orderTemplist[currentNo].CommodityName + ' ' + currentNo + orderTemplist[currentNo].MainContract" readonly="readonly" />
					<i class="icon icon_select"></i>
				</div>
			</div>
			<div class="normalOrder" v-if="orderListShow">
				<div class="row">
					<b>订单类型</b>
					<div class="slt slt_md fl" @tap="openSelectType">
						<input type="text" class="ipt_sm" :value="priceType" readonly="readonly" />
						<i class="icon icon_select"></i>
					</div>
					<input type="text" class="ipt_md ml" v-model="tradePrices" readonly />
				</div>
				<div class="row">
					<b>委托数量</b>
					<div class="num_box">
						<span class="add" @tap="addNum">+</span>
						<input type="number" class="ipt_order_num" v-model="defaultNum" />
						<span class="reduce" @tap="reduceNum">-</span>
					</div>
				</div>
				<div class="btn_box">
					<btn name="买入" className="redmd" @click.native="buy"></btn>
					<btn name="卖出" className="greenmd" @click.native="sell"></btn>
				</div>
			</div>
			<div class="conditionOrder" v-if="!orderListShow">
				<div class="row">
					<b>条件类型</b>
					<div class="type_box">
						<template v-for="(v, index) in conditionTab">
							<span :class="{current: currentConditionNum == index}" @tap="selectCondition(index)">{{v}}</span>
						</template>
					</div>
				</div>
				<div class="row" v-show="conditionShow">
					<b>触发条件</b>
					<div class="slt slt_sm fl" @tap="openSelectPrice">
						<input type="text" class="ipt_ssm" :value="selectType | conditionTypeSwitch" readonly="readonly" />
						<i class="icon icon_select"></i>
					</div>
					<input type="text" class="ipt_sm ml10" v-model="conditionPrice" />
					<b class="ml15">价格附加</b>
					<div class="slt slt_sm fl" @tap="openConditionType">
						<input type="text" class="ipt_ssm" :value="selectAdditionalType | conditionTypeSwitch" readonly="readonly" />
						<i class="icon icon_select"></i>
					</div>
					<input type="text" class="ipt_sm ml10" v-model="conditionAdditionalPrice" />
				</div>
				<div class="row" v-show="!conditionShow">
					<b>触发条件</b>
					<input type="text" class="ipt_150" readonly="readonly" v-model="conditionTime" />
					<input type="text" class="ipt_150 none" readonly="readonly" @click="selectTime" />
					<mt-datetime-picker ref="timePicker" :value="conditionTime" type="time" @confirm="handleConfirm"></mt-datetime-picker>
					<b class="ml25">价格附加</b>
					<div class="slt slt_md fl" @tap="openConditionType">
						<input type="text" class="ipt_sm" :value="timeAdditionalType | conditionTypeSwitch" readonly="readonly" />
						<i class="icon icon_select"></i>
					</div>
					<input type="text" class="ipt_sm ml10" v-model="timeAddtionalPrice" />
				</div>
				<div class="row">
					<b>委托价格</b>
					<div class="type_box">
						<template v-for="(v, index) in priceTab">
							<span :class="{current: currentPriceNum == index}" @tap="selectPrice(index)">{{v}}</span>
						</template>
					</div>
				</div>
				<div class="row">
					<b>下单类型</b>
					<div class="type_box">
						<template v-for="(v, index) in typeTab">
							<span :class="{current: currentTypeNum == index}" @tap="selectOrderType(index)">{{v}}</span>
						</template>
					</div>
				</div>
				<div class="row">
					<b>委托数量</b>
					<div class="num_box">
						<span class="add" @tap="addNum">+</span>
						<input type="text" class="ipt_md" v-model="defaultNum" />
						<span class="reduce" @tap="reduceNum">-</span>
					</div>
				</div>
				<div class="row">
					<b>有效日期</b>
					<p>永久有效</p>
				</div>
				<div class="btn_box">
					<btn name="确定" className="redlg" @click.native="conditionConfirm"></btn>
				</div>
			</div>
		</div>
		<selectBox ref="selectBox" :obj="obj" :type="type"></selectBox>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	import selectBox from "../../components/selectBox.vue"
	import { Toast, MessageBox } from 'mint-ui';
	import pro from "../../assets/js/common.js"
	export default{
		name: "trade",
		components: {btn, selectBox},
		data(){
			return{
				currentOrderType: 0,
				orderList: ['普通单','条件单'],
				orderListShow: true,
				fensShow: false,
				obj: [],
				type: '',
				priceType: '市价',
				tradePrices: '市价',
				defaultNum: 1,
				priceShow: true,
				
				conditionTab: ['价格条件','时间条件'],
				currentConditionNum: 0,
				priceTab: ['市价','对手价'],
				typeTab: ['买入','卖出'],
				currentPriceNum: 0,
				currentTypeNum: 0,
				conditionShow: true,
				selectType: '0',
				selectAdditionalType: '0',
				timeAdditionalType: '0',
				conditionTime: '',
				conditionPrice: '',
				conditionAdditionalPrice: '',   //附加价格
				timeAddtionalPrice: '',  //附加价格
				entrustPrice: 1,   //市价or对价
				direction: 0,   //买入or卖出
			}
		},
		computed: {
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			tradeSocket(){
				return this.$store.state.tradeSocket;
			},
			orderTemplist(){
				return this.$store.state.market.orderTemplist;
			},
			currentNo(){
				return this.$store.state.market.currentNo;
			},
			currentdetail(){
				return this.$store.state.market.currentdetail;
			},
			commodityAll(){
				return this.$store.state.account.commodityAll;
			},
			parameters(){
				return this.$store.state.market.Parameters;
			},
			length(){
				return this.$store.state.market.Parameters.length;
			},
			buyStatus(){
				return this.$store.state.market.buyStatus;
			},
			conditionStatus(){
				return this.$store.state.market.conditionStatus
			},
		},
		filters:{
			fixNumTwo: function(num){
				return num.toFixed(2);
			},
			fixNum: function(num, dotsize){
				return num.toFixed(dotsize);
			},
			conditionTypeSwitch: function(e){
				if(e == '0'){
					return '>';
				}else if(e == '1'){
					return '<';
				}else if(e == '2'){
					return '>=';
				}else if(e == '3'){
					return '<=';
				}
			}
		},
		watch: {
			currentNo: function(n, o){
				if(n && n != undefined){
					this.$store.state.isshow.isfensshow = false;
					this.$store.state.isshow.islightshow = false;
					this.$store.state.isshow.isklineshow = false;
					this.$parent.fensShow = false;
					//初始化当前合约
					this.$store.state.market.Parameters = [];
					this.$store.state.market.commodityOrder = [];
					this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + this.orderTemplist[this.currentNo].ExchangeNo + '","CommodityNo":"' + this.currentNo + '","ContractNo":"' + this.orderTemplist[this.currentNo].MainContract +'"}}');
					//初始化持仓合约行情
					let holdOrder = localStorage.subscribeOrder ?　JSON.parse(localStorage.subscribeOrder)　:　'';
					if(holdOrder != ''){
						holdOrder.forEach((o, i) => {
							this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + this.orderTemplist[o.name].ExchangeNo + '","CommodityNo":"' + o.name + '","ContractNo":"' + this.orderTemplist[o.name].MainContract +'"}}');
						});
					}
				}
			},
			priceType: function(n, o){
				if(n && n == '限价'){
					this.tradePrices = 0;
					$('.ipt_md').attr('readonly', false);
					this.priceShow = false;
				}else if(n && n == '市价'){
					this.priceShow = true;
					this.tradePrices = '市价';
					$('.ipt_md').attr('readonly', true);
				}
			},
			defaultNum: function(n, o){
				if(n && n <= 0){
					this.defaultNum = 0;
				}
			},
			length: function(n, o){
				if(n && n == 1){
					this.$store.state.market.currentdetail = this.parameters[0];
					this.$parent.totalShow = true;
				}
			},
		},
		methods: {
			orderTypeSwitch: function(index){
				this.currentOrderType = index;
				if(index == 0){
					this.orderListShow = true;
				}else{
					this.orderListShow = false;
					this.conditionPrice = this.currentdetail.LastQuotation.LastPrice;
				}
			},
			showFens: function(){
				if(this.fensShow == false){
					this.fensShow = true;
					$(".fens_box").css({'height': 4 + 'rem'});
					$(".icon_triangle").css({'transform': 'rotate(-180deg)'});
					//画分时图
					if(this.currentdetail){
						this.$store.state.isshow.isfens = true;
						let data = {
							Method: "QryHistory",
							Parameters:{
								ExchangeNo: this.currentdetail.ExchangeNo,
								CommodityNo: this.currentdetail.CommodityNo,
								ContractNo: this.currentdetail.MainContract,
								HisQuoteType: 0,
								BeginTime: "",
								EndTime: "",
								Count: 0
							}
						};
						this.quoteSocket.send(JSON.stringify(data));
					}
				}else{
					this.fensShow = false;
					$(".fens_box").css({'height': 0 + 'rem'});
					$(".icon_triangle").css({'transform': 'rotate(-360deg)'});
				}
			},
			addNum: function(){
				return this.defaultNum++;
			},
			reduceNum: function(){
				return this.defaultNum--;
			},
			openSelectOrder: function(){
				this.obj = this.commodityAll;
				this.type = 'order';
				$(".select_cont").css({bottom: 0});
				this.$refs.selectBox.shadeShow = true;
			},
			openSelectType: function(){
				this.obj = ['市价', '限价'];
				this.type = 'price';
				$(".select_cont").css({bottom: -3.55 + 'rem'});
				this.$refs.selectBox.shadeShow = true;
			},
			buy: function(){
				var buildIndex = 0, b;
				if(buildIndex > 100) buildIndex = 0;
				if(this.priceShow == true){   //市价下单
					b = {
						"Method":'InsertOrder',
						"Parameters":{
							"ExchangeNo": this.currentdetail.ExchangeNo,
							"CommodityNo": this.currentdetail.CommodityNo,
							"ContractNo": this.currentdetail.MainContract,
							"OrderNum": this.defaultNum,
							"Drection": 0,
							"PriceType": 1,
							"LimitPrice": 0.00,
							"TriggerPrice": 0,
							"OrderRef":this.$store.state.market.tradeConfig.client_source+ new Date().getTime()+(buildIndex++)
						}
					};
				}else{
					if(this.tradePrices == '' || this.tradePrices <= 0 || this.tradePrices == undefined){
						Toast({message: '请输入限价', position: 'bottom', duration: 1500}); return;
					}else if(this.defaultNum == 0){
						Toast({message: '请输入手数', position: 'bottom', duration: 1500}); return;
					}else{
						b = {
							"Method": 'InsertOrder',
							"Parameters":{
								"ExchangeNo": this.currentdetail.ExchangeNo,
								"CommodityNo": this.currentdetail.CommodityNo,
								"ContractNo": this.currentdetail.MainContract,
								"OrderNum": this.defaultNum,
								"Drection": 0,
								"PriceType": 0,
								"LimitPrice": parseFloat(this.tradePrices),
								"TriggerPrice": 0,
								"OrderRef": this.$store.state.market.tradeConfig.client_source+ new Date().getTime()+(buildIndex++)
							}
						};
					}
				}
				//确定文案
				var contract = b.Parameters.CommodityNo + b.Parameters.ContractNo;
				var LimitPrice;
				b.Parameters.PriceType == 1 ? LimitPrice = '市价' : LimitPrice = this.tradePrices;
				var orderNum = b.Parameters.OrderNum;
				var drection;
				b.Parameters.Drection == 0 ? drection = '买' : drection = '卖';
				this.confirmText = '确认提交订单:【'+contract+'】,价格【'+LimitPrice +'】,手数【'+orderNum+'】,方向【'+drection+'】？';
				MessageBox.confirm(this.confirmText,"提示").then(action=>{
					if(this.buyStatus == true) return;
					this.$store.state.market.buyStatus = true;
					this.tradeSocket.send(JSON.stringify(b));
				}).catch(err=>{});
			},
			sell: function(){
				var buildIndex = 0, b;
				if(buildIndex > 100) buildIndex = 0;
				if(this.priceShow == true){   //市价下单
					b = {
						"Method": 'InsertOrder',
						"Parameters":{
							"ExchangeNo": this.currentdetail.ExchangeNo,
							"CommodityNo": this.currentdetail.CommodityNo,
							"ContractNo": this.currentdetail.MainContract,
							"OrderNum": this.defaultNum,
							"Drection": 1,
							"PriceType": 1,
							"LimitPrice": 0.00,
							"TriggerPrice": 0,
							"OrderRef": this.$store.state.market.tradeConfig.client_source+ new Date().getTime()+(buildIndex++)
						}
					};
				}else{
					if(this.tradePrices == '' || this.tradePrices <= 0 || this.tradePrices == undefined){
						Toast({message: '请输入限价', position: 'bottom', duration: 1500}); return;
					}else if(this.defaultNum == 0){
						Toast({message: '请输入手数', position: 'bottom', duration: 1500}); return;
					}else{
						b = {
							"Method": 'InsertOrder',
							"Parameters":{
								"ExchangeNo": this.currentdetail.ExchangeNo,
								"CommodityNo": this.currentdetail.CommodityNo,
								"ContractNo": this.currentdetail.MainContract,
								"OrderNum": this.defaultNum,
								"Drection": 1,
								"PriceType": 0,
								"LimitPrice": parseFloat(this.tradePrices),
								"TriggerPrice": 0,
								"OrderRef": this.$store.state.market.tradeConfig.client_source+ new Date().getTime()+(buildIndex++)
							}
						};
					}
				}
				//确定文案
				var contract = b.Parameters.CommodityNo + b.Parameters.ContractNo;
				var LimitPrice;
				b.Parameters.PriceType == 1 ? LimitPrice = '市价' : LimitPrice = this.tradePrices;
				var orderNum = b.Parameters.OrderNum;
				var drection;
				b.Parameters.Drection == 0 ? drection = '买' : drection = '卖';
				this.confirmText = '确认提交订单:【'+contract+'】,价格【'+LimitPrice +'】,手数【'+orderNum+'】,方向【'+drection+'】？';
				MessageBox.confirm(this.confirmText,"提示").then(action=>{
					if(this.buyStatus == true) return;
					this.$store.state.market.buyStatus = true;
					this.tradeSocket.send(JSON.stringify(b));
				}).catch(err=>{});
			},
			openSelectPrice: function(){
				this.obj = ['0', '1', '2', '3'];
				this.type = 'condition';
				$(".select_cont").css({bottom: -1.78 + 'rem'});
				this.$refs.selectBox.shadeShow = true;
			},
			openConditionType: function(){
				this.obj = ['0', '1', '2', '3'];
				this.type = 'additionalCondition';
				$(".select_cont").css({bottom: -1.78 + 'rem'});
				this.$refs.selectBox.shadeShow = true;
			},
			selectCondition: function(index){
				this.currentConditionNum = index;
				if(index == 0){
					this.conditionShow = true;
				}else{
					this.conditionShow = false;
				}
			},
			selectPrice: function(index){
				this.currentPriceNum = index;
				if(index == 0){
					this.entrustPrice = 1;
				}else{
					this.entrustPrice = 2;
				}
			},
			selectOrderType: function(index){
				this.currentTypeNum = index;
				if(this.index == 0){
					this.direction = 0;
				}else{
					this.direction = 1;
				}
			},
			selectTime: function(){
				console.log(11111);
				this.$refs.timePicker.open();
			},
			handleConfirm: function(e){
				let time = new Date();
				this.conditionTime = pro.getDate("h:i:s", time);
				this.conditionTime = e + ':' + this.conditionTime.split(':')[2];
			},
			conditionConfirm: function(){
				let miniTikeSize = this.orderTemplist[this.currentNo].MiniTikeSize;
				let dotSize = this.orderTemplist[this.currentNo].DotSize;
				let confirmText;
				if(this.conditionShow == true){
					if(this.conditionAdditionalPrice){
						var d1 = this.conditionAdditionalPrice % miniTikeSize;
						if(d1 >= 0.000000001 && parseFloat(miniTikeSize - d1) >= 0.0000000001){
							Toast({message: '输入附加价格不符合最小变动价，最小变动价为：' + miniTikeSize, position: 'bottom', duration: 1500});
							return;
						}
						//判断价格与附加价格是否形成区间
						var conditionAdditionalPrice = this.conditionAdditionalPrice - miniTikeSize;
						conditionAdditionalPrice = conditionAdditionalPrice.toFixed(dotSize);
						var conditionAdditionalPrice00 = Number(this.conditionAdditionalPrice) + Number(miniTikeSize);
						conditionAdditionalPrice00 = conditionAdditionalPrice00.toFixed(dotSize);
						switch (this.selectType){
							case '0':
								if(this.selectAdditionalType == '0' || this.selectAdditionalType == '2' || this.selectAdditionalType == '1' && conditionAdditionalPrice <= this.conditionPrice){
									Toast({message: '输入的条件不能形成区间', position: 'bottom', duration: 1500});
									return;
								}
								if(this.selectAdditionalType == '3' && conditionAdditionalPrice < this.conditionPrice){
									Toast({message: '输入的条件不能形成区间', position: 'bottom', duration: 1500});
									return;
								}
								break;
							case '2':
								if(this.selectAdditionalType == '0' || this.selectAdditionalType == '2' || this.selectAdditionalType == '1' && conditionAdditionalPrice < this.conditionPrice){
									Toast({message: '输入的条件不能形成区间', position: 'bottom', duration: 1500});
									return;
								}
								if(this.selectAdditionalType == '3' && this.conditionAdditionalPrice < this.conditionPrice){
									Toast({message: '输入的条件不能形成区间', position: 'bottom', duration: 1500});
									return;
								}
								break;
							case '1':
								if(this.selectAdditionalType == '1' || this.selectAdditionalType == '3' || this.selectAdditionalType == '0' && conditionAdditionalPrice00 >= this.conditionPrice){
									Toast({message: '输入的条件不能形成区间', position: 'bottom', duration: 1500});
									return;
								}
								if(this.selectAdditionalType == '2' && conditionAdditionalPrice00 > this.conditionPrice){
									Toast({message: '输入的条件不能形成区间', position: 'bottom', duration: 1500});
									return;
								}
								break;
							case '3':
								if(this.selectAdditionalType == '1' || this.selectAdditionalType == '3' || this.selectAdditionalType == '0' && conditionAdditionalPrice00 > this.conditionPrice){
									Toast({message: '输入的条件不能形成区间', position: 'bottom', duration: 1500});
									return;
								}
								if(this.selectAdditionalType == '2' && this.conditionAdditionalPrice > this.conditionPrice){
									Toast({message: '输入的条件不能形成区间', position: 'bottom', duration: 1500});
									return;
								}
								break;
							default:
								break;
						}
					}
					var d0 = this.conditionPrice % miniTikeSize;
					if(this.conditionPrice == '' || this.conditionPrice == 0 || this.conditionPrice == undefined){
						Toast({message: '请输入价格', position: 'bottom', duration: 1500});
					}else if(d0 >= 0.000000001 && parseFloat(miniTikeSize - d0) >= 0.0000000001){
						Toast({message: '输入价格不符合最小变动价，最小变动价为：' + miniTikeSize, position: 'bottom', duration: 1500});
					}else if(this.defaultNum == '' || this.defaultNum <= 0 || this.defaultNum == undefined){
						Toast({message: '请输入手数', position: 'bottom', duration: 1500});
					}else{
						confirmText = '是否添加价格条件单？';
						let b = {
							"Method": 'InsertCondition',
							"Parameters":{
								'ExchangeNo': this.currentdetail.ExchangeNo,
								'CommodityNo': this.currentdetail.CommodityNo,
								'ContractNo': this.currentdetail.LastQuotation.ContractNo,
								'Num': parseInt(this.defaultNum),
								'ConditionType': 0,
								'PriceTriggerPonit': parseFloat(this.conditionPrice),
								'CompareType': parseInt(this.selectType),
								'TimeTriggerPoint': '',
								'AB_BuyPoint': 0.0,
								'AB_SellPoint': 0.0,
								'OrderType': parseInt(this.entrustPrice),
								'Drection': parseInt(this.direction),
								'StopLossType': 5,
								'StopLossDiff': 0.0,
								'StopWinDiff': 0.0,
								'AdditionFlag': this.conditionAdditionalPrice == '' ? false :  true,
								'AdditionType': parseInt(this.selectAdditionalType),
								'AdditionPrice': this.conditionAdditionalPrice == '' ? 0 : parseFloat(this.conditionAdditionalPrice)
							}
						};
						MessageBox.confirm(confirmText,"提示").then(action=>{
							if(this.conditionStatus == true) return;
							this.$store.state.market.conditionStatus = true;
							this.tradeSocket.send(JSON.stringify(b));
							this.conditionAdditionalPrice = '';
						}).catch(err=>{});
					}
				}else{
					let time = this.getNowFormatDate() + ' ' + this.conditionTime;
					if(this.timeAddtionalPrice){
						var d2 = this.timeAddtionalPrice % miniTikeSize;
						if(d2 >= 0.000000001 && parseFloat(miniTikeSize-d2) >= 0.0000000001){
							Toast({message: '输入附加价格不符合最小变动价，最小变动价为：' + miniTikeSize, position: 'bottom', duration: 1500});
							return;
						}
					}
					if(this.defaultNum == '' || this.defaultNum <= 0 || this.defaultNum == undefined){
						Toast({message: '请输入手数', position: 'bottom', duration: 1500})
					}else{
						confirmText = '是否添加时间条件单？';
						let b = {
							"Method": 'InsertCondition',
							"Parameters":{
								'ExchangeNo': this.currentdetail.ExchangeNo,
								'CommodityNo': this.currentdetail.CommodityNo,
								'ContractNo': this.currentdetail.LastQuotation.ContractNo,
								'Num': parseInt(this.defaultNum),
								'ConditionType': 1,
								'PriceTriggerPonit': 0.0,
								'CompareType': 5,
								'TimeTriggerPoint': time,
								'AB_BuyPoint': 0.0,
								'AB_SellPoint': 0.0,
								'OrderType': parseInt(this.entrustPrice),
								'Drection': parseInt(this.direction),
								'StopLossType': 5,
								'StopLossDiff': 0.0,
								'StopWinDiff': 0.0,
								'AdditionFlag': this.timeAddtionalPrice == '' ? false : true,
								'AdditionType': this.timeAddtionalPrice == '' ? 5 : parseInt(this.timeAdditionalType),
								'AdditionPrice': this.timeAddtionalPrice == '' ? 0 : parseFloat(this.timeAddtionalPrice)
							}
						};
						MessageBox.confirm(confirmText, "提示").then(action=>{
							if(this.conditionStatus == true) return;
							this.$store.state.market.conditionStatus = true;
							this.tradeSocket.send(JSON.stringify(b));
							this.timeAddtionalPrice = '';
						}).catch(err=>{});
					}
				}
			},
			getNowFormatDate: function(){
				let date = new Date();
			    let seperator1 = "-";
			    let month = date.getMonth() + 1;
			    let strDate = date.getDate();
			    if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (strDate >= 0 && strDate <= 9) {
			        strDate = "0" + strDate;
			    }
			    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
			    return currentdate;
			},
		},
		mounted: function(){
			//初始当前合约行情
			this.$store.state.market.Parameters = [];
			this.$store.state.market.commodityOrder = [];
			this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + this.orderTemplist[this.currentNo].ExchangeNo + '","CommodityNo":"' + this.currentNo + '","ContractNo":"' + this.orderTemplist[this.currentNo].MainContract +'"}}');
			//初始化持仓合约行情
			let holdOrder = localStorage.subscribeOrder ?　JSON.parse(localStorage.subscribeOrder)　:　'';
			if(holdOrder != ''){
				holdOrder.forEach((o, i) => {
					this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + this.orderTemplist[o.name].ExchangeNo + '","CommodityNo":"' + o.name + '","ContractNo":"' + this.orderTemplist[o.name].MainContract +'"}}');
				});
			}
			//取当前时间
			let time = new Date();
			this.conditionTime = pro.getDate("h:i:s", time);
			
		},
		activated: function(){
			//取当前时间
			let time = new Date();
			this.conditionTime = pro.getDate("h:i:s", time);
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	.tips{
		height: 0.64rem;
		line-height: 0.64rem;
		background: $titleBlue;
		border-bottom: 0.01rem solid $black;
		padding: 0 0.3rem;
		span{
			float: left;
			font-size: $fs28;
			margin-right: 0.3rem;
			&.red{
				color: $red;
			}
			&.green{
				color: $green;
			}
		}
		p{
			float: right;
			font-size: $fs28;
			em{
				color: $white;
			}
		}
	}
	.fens_title{
		height: 0.48rem;
		border-bottom: 0.01rem solid $black;
		padding-left: 3.4rem;
		span{
			float: left;
			display: inline-block;
			height: 0.48rem;
			line-height: 0.48rem;
			color: $fontBlue;
		}
		.icon_triangle{
			float: left;
			width: 0.16rem;
			height: 0.48rem;
			background: url(../../assets/images/triangle.png) no-repeat center 0.2rem;
			background-size: 0.16rem 0.08rem;
			margin: 0 0.2rem 0 0.06rem;
			transition: all .3s;
		}
		button{
			float: left;
			width: 0.64rem;
			height: 0.32rem;
			background: $yellow;
			border-radius: 0.1rem;
			margin: 0.08rem 0;
			color: $bg;
			font-size: 0.2rem;
			padding: 0;
		}
	}
	.fens_box{
		width: 7.5rem;
		height: 0;
		overflow: hidden;
		margin-bottom: 0.2rem;
		transition: all .3s;
		#fens{
			height: 2.4rem;
		}
		#volume{
			height: 1.6rem;
		}
	}
	#fens, #volume{
		width: 100%;
		margin: 0 auto;
	}
	.buy_one{
		width: 7.5rem;
		height: 0.64rem;
		line-height: 0.64rem;
		border-bottom: 0.01rem solid $black;
		display: flex;
		text-align: center;
		.col{
			width: 50%;
			background: #3a2d36;
			&:first-child{
				background: #273a3b;
			}
			em{
				color: $white;
				font-size: $fs28;
				margin: 0 0.2rem;
			}
			span{
				font-size: $fs28;
				&.red{
					color: $red;
				}
				&.green{
					color: $green;
				}
			}
		}
	}
	.order_type{
		height: 0.96rem;
		padding: 0 0.3rem;
		border-bottom: 0.01rem solid $black;
		span{
			display: inline-block;
			float: left;
			width: 3.45rem;
			height: 0.56rem;
			line-height: 0.56rem;
			text-align: center;
			background: $lightBlue;
			margin: 0.2rem 0;
			color: $white; 
			&:first-child{
				border-top-left-radius: 0.1rem;
				border-bottom-left-radius: 0.1rem;
			}
			&:last-child{
				border-top-right-radius: 0.1rem;
				border-bottom-right-radius: 0.1rem;
			}
			&.current{
				background: $blue;
			}
		}
	}
	.fm{
		width: 7.5rem;
		padding: 0.3rem 0 0 0;
		.row{
			width: 7.5rem;
			padding: 0 0.3rem;
			height: 0.88rem;
			overflow: hidden;
			margin-bottom: 0.3rem;
			position: relative;
			b{
				float: left;
				display: inline-block;
				width: 1.3rem;
				height: 0.88rem;
				line-height: 0.88rem;
				font-weight: normal;
				font-size: $fs28;
			}
			.slt{
				width: 5.6rem;
				height: 0.88rem;
				overflow: hidden;
				position: relative;
				&.slt_md{
					width: 1.2rem;
				}
				&.slt_sm{
					width: 0.8rem;
				}
				.icon{
					width: 0.1rem;
					height: 0.1rem;
					position: absolute;
					bottom: 0.1rem;
					right: 0.1rem;
					&.icon_select{
						background: url(../../assets/images/account/subscript_01.png) no-repeat center center;
						background-size: 100% 100%;
					}
					&.icon_selected{
						background: url(../../assets/images/account/subscript_02.png) no-repeat center center;
						background-size: 100% 100%;
					}
				}
			}
			input{
				float: left;
				height: 0.6rem;
				line-height: 0.6rem;
				padding: 0.12rem 0;
				box-sizing: content-box;
				color: $white;
				border: 0.01rem solid $black;
				border-radius: 0.1rem;
				background: #1b1f26;
				text-align: center;
				font-size: $fs24;
				&.ipt_lg{
					width: 5.58rem;
				}
				&.ipt_sm{
					width: 1.18rem;
				}
				&.ipt_ssm{
					width: 0.78rem;
				}
				&.ipt_md{
					width: 3.98rem;
				}
				&.ipt_150{
					width: 1.5rem;
				}
				&.none{
					position: absolute;
					top: 0;
					left: 1.3rem;
					z-index: 1;
					opacity: 0;
				}
			}
			.ml{
				margin-left: 0.35rem;
			}
			.ml10{
				margin-left: 0.1rem;
			}
			.ml15{
				width: 1.2rem;
				margin-left: 0.15rem;
			}
			.ml25{
				margin-left: 0.25rem;
			}
			.mr20{
				margin-right: 0.5rem;
			}
			.type_box{
				float: left;
				width: 5.58rem;
				height: 0.88rem;
				line-height: 0.88rem;
				border: 0.01rem solid $black;
				border-radius: 0.1rem;
				background: #1b1f26;
				span{
					float: left;
					display: inline-block;
					width: 2.77rem;
					height: 0.86rem;
					line-height: 0.86rem;
					text-align: center;
					box-sizing: border-box;
					&:last-child.current{
						background: $lightBlue;
						border-top-right-radius: 0.1rem;
						border-bottom-right-radius: 0.1rem;
					}
					&:first-child.current{
						background: $lightBlue;
						border-top-left-radius: 0.1rem;
						border-bottom-left-radius: 0.1rem;
					}
				}
			}
			.num_box{
				float: left;
				width: 5.6rem;
				height: 0.88rem;
				border: 0.01rem solid $black;
				background: #1b1f26;
				border-radius: 0.1rem;
				span{
					display: inline-block;
					float: left;
					width: 0.8rem;
					height: 0.88rem;
					line-height: 0.88rem;
					text-align: center;
					border-right: 0.01rem solid $black;
					font-size: $fs32;
					&.reduce{
						float: right;
						border: none;
						border-left: 0.01rem solid $black;
					}
				}
				input{
					border: none;
					width: 3.96rem;
				}
			}
			p{
				float: left;
				width: 5.58rem;
				height: 0.88rem;
				line-height: 0.88rem;
				text-align: center;
				border: 0.01rem solid $black;
				border-radius: 0.1rem;
				font-size: $fs28;
				color: $white;
			}
		}
		.btn_box{
			display: flex;
			justify-content: space-between;
			padding: 0 0.3rem;
		}
	}
</style>