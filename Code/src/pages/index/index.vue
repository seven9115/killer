<template>
    <div>
        <div class="login-box">
            <p><span>给自己取个响亮的名字：</span><input type="text" v-model="nickname" /></p>
            <button class="btn-match" v-on:click="matchGame">开始匹配</button>
        </div>
        <div class="login-bg-t"></div>
        <div class="login-bg-b"></div>
    </div>

</template>

<script>
import TouchSlide from '../../assets/js/TouchSlide'
import api from '../../fetch/api'
import { mapGetters } from 'vuex'
import layer from '../../assets/js/layer/layer'
import io from 'socket.io-client'

export default {
    name: 'index',
    components:{},
    props: [],
    data() {
        return {
            'nickname':''
        }
    },
    computed: {
        ...mapGetters([
            'getSocket'
        ])
    },
    mounted(){
        this.initData();
    },
    created(){
        this.$store.commit('setGetSocket', io.connect('http://192.168.2.101:80/'))
    },
    methods:{
        initData(){
            
        },
        matchGame(){
            if(!this.nickname){
                alert('输入名字');
                return
            }
            const me = this;
            this.getSocket.emit('match-game',this.nickname)
            this.getSocket.on('match-res',data => {
                if(data.code==200){
                    me.$store.commit('setNickname',me.nickname);
                    me.$store.commit('setOrder',data.order)
                    me.$router.push('/game');
                }
            })
        }
    }
}
</script>

