//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {
}
//准备mutations对象——修改state中的数据
const mutations = {
	savename: (state, name) => {
		state.name = name
		localStorage.setItem('name', name)
	},
	saveid: (state, id) => {
		state.id = id
		localStorage.setItem('id', id)
	},
	savetrainid: (state, trainid) => {
		state.trainid = trainid
		localStorage.setItem('trainid', trainid)
	},
	saveplatformnum: (state, platformnum) => {
		state.platformnum = platformnum
		localStorage.setItem('platformnum', platformnum)
	},
	saveloginstatus: (state, loginstatus) => {
		state.loginstatus = loginstatus
		localStorage.setItem('loginstatus', loginstatus)
	},
	savedepartureid: (state, departureid) => {
		state.departureid = departureid
		localStorage.setItem('departureid', departureid)
	},
	savearrivalid: (state, arrivalid) => {
		state.arrivalid = arrivalid
		localStorage.setItem('arrivalid', arrivalid)
	},
	savedepartureTime: (state, departureTime) => {
		state.departureTime = departureTime
		localStorage.setItem('departureTime', departureTime)
	},
	savearrivalTime: (state, arrivalTime) => {
		state.arrivalTime = arrivalTime
		localStorage.setItem('arrivalTime', arrivalTime)
	},
	saveplatformNum: (state, platformNum) => {
		state.platformNum = platformNum
		localStorage.setItem('platformNum', platformNum)
	}
}
//准备state对象——保存具体的数据
const state = {
	name:'' || localStorage.getItem('name'),
	id:'' || localStorage.getItem('id'),
	platformnum: '' || localStorage.getItem('platformnum'),
	loginstatus: '' || localStorage.getItem('loginstatus'),
	trainid: '' || localStorage.getItem('trainid'),
	departureid: '' || localStorage.getItem('departureid'),
	arrivalid: '' || localStorage.getItem('arrivalid'),
	departureTime: '' || localStorage.getItem('departureTime'),
	arrivalTime: '' || localStorage.getItem('arrivalTime'),
	platformNum: '' || localStorage.getItem('platformNum')
}



//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state
})
