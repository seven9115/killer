
import Vue from 'vue'
import Vuex from 'vuex'

// import qs from 'qs'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 存放用户
    socket: '',
    // 存放历史记录
    messhistory: {
      infos: [],
      allmessage: []
    },
    // 存放房间信息，为了方便以后做多房间
    roomdetail: {
      id: '',
      nickname: '',
      hp: 100
    },
    players:[],
    // 存放机器人开场白
    robotmsg: [{
      message: 'Hi~有什么想知道的可以问我',
      user: 'robot'
    }],
    // svg
    svgmodal: null,
    // 是否启动tab
    istab: false
  },
  getters: {
    getSocket: state => state.socket,
    getNickname: state => state.roomdetail.nickname,
    getOrder: state => state.roomdetail.order,
    getHp: state => state.roomdetail.hp,
    getMessHistoryInfos: state => state.messhistory.infos,
    getMessHistoryAll: state => state.messhistory.allmessage,
    getRobotMsg: state => state.robotmsg,
    getPlayers: state => state.players
  },
  mutations: {
    setTab(state, data) {
      state.istab = data
    },
    setSvgModal(state, data) {
      state.svgmodal = data
    },
    setGetSocket (state, data) {
      state.socket = data
    },
    addPlayer(state, data) {
      state.players.push(data)
    },
    setRoomDetailHp(state,data) {
      state.roomdetail.hp = data
    },
    setNickname(state, data) {
      state.roomdetail.nickname = data
    },
    setOrder(state, data) {
      state.roomdetail.order = data
    },
    cutHp(state, data) {
      state.roomdetail.hp = state.roomdetail.hp-data;
    },
    setAllMessHistory(state, data) {
      state.messhistory.allmessage = data
    },
    setMessHistoryInfos(state, data) {
      state.messhistory.infos = data
    },
    setRobotMsg(state, data) {
      state.robotmsg.push(data)
    }
  },
  actions: {
  }
})
export default store