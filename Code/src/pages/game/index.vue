<template>
    <div class="game-bg">
        <div class="game-box">
            <div class="players player-one">
                <div class="time-off" v-if="turnId==getOrder">{{ second }}</div>
                <div class="head"></div>
                <div class="order">{{ getOrder }}</div>
                <div class="nickname self">{{ getNickname }}</div>
                <div class="hp-value">{{ getHp }}</div>
                <div class="hp-box">
                    <div class="hp" v-bind:style="{ width: getHp + '%' }"></div>
                </div>
            </div>
            <div class="players" v-for="player in getPlayers">
                <div class="time-off" v-if="turnId==player.order">{{ second }}</div>
                <button class="kill" v-if="turnId==getOrder" v-on:click="kill(player.order)">杀</button>
                <div class="head"></div>
                <div class="order">{{ player.order }}</div>
                <div class="nickname">{{ player.nickname }}</div>
                <div class="status" v-if="player.status==1">己准备</div>
            </div>
        </div>
        <button v-if="getOrder==1&&status==0" class="play" v-on:click="play">开始游戏</button>
        <button v-if="getOrder!=1&&isReady!=1" class="play" v-on:click="ready">准备游戏</button>
    </div>

</template>

<script>
import TouchSlide from '../../assets/js/TouchSlide'
import api from '../../fetch/api'
import { mapGetters } from 'vuex'
import layer from '../../assets/js/layer/layer'
export default {
    name: 'index',
    components:{},
    props: [],
    data() {
        return {
            'nickName':'',
            'turnId':0,
            'second':15,
            'time':null,
            'status':0,
            'isReady':0
        }
    },
    computed: {
        ...mapGetters([
            'getSocket','getNickname','getHp','getPlayers','getOrder'
        ])
    },
    mounted(){
        this.initData();
    },
    methods:{
        initData(){
            const me = this;
            this.getSocket.on('player-join',data => {
                console.log('增加成员：'+data)
                me.$store.commit('addPlayer',data)
            })
            this.getSocket.on('turn',data => {
                me.turnId = data.order;
                console.log('轮到'+me.turnId+'击杀了');
                console.log('我是'+me.getOrder+'号');
                clearInterval(me.time);
                me.second = 15;
                me.time = setInterval(function(){
                    if(me.second == 0){
                        if(me.turnId != me.getOrder){return;}
                        let killNum = (me.getOrder == me.getPlayers.length+1)?1:(me.getOrder+1)
                        me.kill(killNum);
                    }else{
                        console.log('倒计时');
                        me.second = me.second-1;
                    }
                },1000)
            })
            this.getSocket.on('hurt',data => {
                if(me.getHp-10==0){
                    me.getSocket.emit('fail',me.getOrder);
                    clearInterval(me.time);
                    alert('惨遭滑铁卢，5秒后回到大厅重新匹配');
                    setTimeout(()=>{
                        me.$router.push('/');
                    },5000)
                }else{
                    me.$store.commit('cutHp',10)
                }
            })
            this.getSocket.on('victory',data => {
                clearInterval(me.time);
                alert('革命成功，5秒后回到大厅重新匹配');
                setTimeout(()=>{
                    me.$router.push('/');
                },5000)
            })
        },
        matchGame(){

        },
        play(){
            this.status = 1;
            this.getSocket.emit('play');
        },
        ready(){
            this.isReady = 1;
            this.getSocket.emit('ready',this.getOrder);
        },
        kill(order){
            const me = this;
            console.log('击杀'+order+'号');
            clearInterval(this.time);
            this.time = null;
            this.turnId = 0;
            this.second = 15;
            this.getSocket.emit('kill',{killNum:order,order:this.getOrder});
        }
    }
}
</script>

