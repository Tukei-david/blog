import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
    state() {
        return {
            authenticated: false,
            user: null
        }
    },

    getters: {
        authenticated (state) {
            return state.authenticated
        },

        user (state) {
            return state.user
        }
    },

    mutations: {
        SET_AUTHENTICATED (state, authenticated) {
            state.authenticated = authenticated
        },
        SET_USER (state, user) {
            state.user = user
        }
    },

    actions: {
        async authenticate () {
            return await axios.get('api/user').then( (response) => {
                this.commit('SET_AUTHENTICATED', true)
                this.commit('SET_USER', response.data)
            }).catch ( (e) => {
                this.commit('SET_AUTHENTICATED', false)
                this.commit('SET_USER', null)
            })
        },

        async login ( { dispatch }, credentials) {
            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/login', credentials)

            dispatch('authenticate')
        }
    }
})