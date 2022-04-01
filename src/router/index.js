import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'

import PostDetails from '../views/Details/PostDetails.vue'
import PostCreate from '../views/Create/PostCreate.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/post',
        name: 'Post',
        component: Post
    },
    {
        path: '/create_post',
        name: 'PostCreate',
        component: PostCreate
    },
    {
        path: '/post/:id',
        name: 'PostDetails',
        component: PostDetails
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router