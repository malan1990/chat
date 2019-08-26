/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue';
import VueChatScroll from 'vue-chat-scroll';
import Toaster from 'v-toaster';
import 'v-toaster/dist/v-toaster.css';
Vue.use(Toaster, {timeout: 4000});

Vue.use(VueChatScroll);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('message', require('./components/Message.vue').default);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    data: {
            message: '',
            chat: {
            message: [],
            user: [],
            color: [],
            time: []
          },
          typing: '',
          users: 0
    },
    watch:{
        message(){
        Echo.private('chat')
    .whisper('typing', {
        name: this.message
    });
    }
},
    methods: {
        send(){
            if(this.message.length != 0){
                this.chat.message.push(this.message)
                this.chat.user.push('Ja')
                this.chat.color.push('success')
                this.chat.time.push(this.getTime())

                axios.post('/send', {
                    message: this.message
                  })
                  .then(response => {
                    console.log(response);
                    this.message = ''
                  })
                  .catch(error => {
                    console.log(error);
                  });


            }
        },
        getTime(){
            let time = new Date()
            return time.getHours() + ':' + time.getMinutes()

        }
    }

    ,
    mounted(){
        Echo.private('chat')
    .listen('ChatEvent', (e) => {
        this.chat.message.push(e.message)
        this.chat.user.push(e.user)
        this.chat.color.push('warning')
        this.chat.time.push(this.getTime())
        console.log(e);
        Echo.private('chat')

    })
    .listenForWhisper('typing', (e) => {
       if(e.name != ''){
            this.typing = 'Pisanie...'
        }else{
           this.typing = ''
       }
    });
    Echo.join(`chat`)
    .here((users) => {
        //
        this.users = users.length
    })
    .joining((user) => {
        this.users += 1
        this.$toaster.success(user.name + ' dołączył do czatu')
    })
    .leaving((user) => {
        this.users -= 1
        this.$toaster.warning(user.name + ' opuścił czat')
    });
    }
});
