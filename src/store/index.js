import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: null,
    current_note: {
      updated_at: '',
      content: ''
    }
  },
  mutations: {
    LOAD_NOTES(state, notes) {
      state.notes = notes;
    },

    DELETE_NOTES(state, elem){
      state.notes.splice(state.notes.findIndex(note =>  note.id === elem), 1)
    },

    ADD_NOTE (state, note) {
      state.notes.push(note)
    },

    CURRENT_NOTE(state, note){
      state.current_note = note
    },

    CLEAR_NOTE(state){
        state.current_note = {
            updated_at: '',
            content: ''
        }
    }
  },
  actions: {
    load_notes({commit}){
      axios.get(`https://laravel-api-notes-vue.herokuapp.com/api/notes`)
          .then(response => {
            const notesArray = Object.keys(response.data.notes).map(i => response.data.notes[i])
            commit('LOAD_NOTES', notesArray)
          })
    },

    delete_notes({commit} , id){
       axios.delete(`https://laravel-api-notes-vue.herokuapp.com/api/notes/${id}`)
           .then(response =>{
            commit("DELETE_NOTES", id)
               commit('CLEAR_NOTE')
          })
    },

    add_note({commit}, note){
      axios.post(`https://laravel-api-notes-vue.herokuapp.com/api/notes`, note)
          .then(response => {
             console.log(response.data.note)
            commit('ADD_NOTE', response.data.note)
            commit('CURRENT_NOTE', response.data.note)

          })
    },

    update_note({commit}, note){
      axios.put(`https://laravel-api-notes-vue.herokuapp.com/api/notes/${note.id}`, note)
          .then(response => {
            console.log(response.data.note)
           // commit('ADD_NOTE', response.data.Note)
          })
    },

    add_current_note({commit}, current){
      commit('CURRENT_NOTE', current)
    }
  },
  getters: {
    notes: state => {
      return state.notes
    },

    current_note : state => {
      return state.current_note
    },

    count_current_note : state => {
          return state.current_note.content.trim().split(' ').length
      },
  },
  modules: {
  }
})
