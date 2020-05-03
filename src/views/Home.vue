<template>
  <div class="home">
    <div class="main">
        <div class="leftNotes">
            <button @click="newNot" class="newNote">Nouvelle note</button>
            <div class="forNotes">
                <template v-if="notes.length > 0">
                    <Notes v-for="(note, index) in notes" :note="note" @noteClick="select" :index="index" />
                </template>
                <article v-else class="article-home" >No rating</article>
            </div>
        </div>
      <Writter :note="current_note" />
    </div>
  </div>
</template>

<style scoped>

    .forNotes{
        background-color: #f8f8f6;
        overflow-y: scroll;
        height: calc(100% - 69px)
    }
    .newNote{
        width: 100%;
        padding: 20px 0px;
        cursor: pointer;
        background-color: #f8f8f6;
        border: none;
        outline: none;
        font-size: 110%;
        border-bottom: 1px solid #eaeaea;
    }
    .newNote:hover {
        background-color: #e1e1e0;
    }

    .forNotes{
        overflow-y: scroll;
    }

    .leftNotes{
        border-right: 1px solid lightgrey;
        width: 270px;
        text-align: left;
    }
  .home{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main{
    width: 95vw;
    height: 95vh;
    box-shadow: 0px 0px 5px lightgrey;
    display: flex;
      border-radius: 10px;
      overflow: hidden;
  }
  .article-home{
    text-align: center;
    padding-top: 20px;
  }

</style>
<script>
// @ is an alias to /src
import { mapGetters , mapActions} from 'vuex'
import Notes from "../components/Notes";
import Writter from "../components/Writter";
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Notes, Writter
  },

  data(){
    return{
      noteClick:{
        created_at: '',
        content: '',
      }
    }
  },

  created() {
    this.$store.dispatch('load_notes');
  },

  computed: {
    ...mapGetters(['notes']),
     ...mapGetters(['current_note'])
  },

  methods: {
      ...mapActions(['add_current_note']),
    select(param){
      console.log(param)
      this.noteClick = param
        this.add_current_note(param)
    },

      newNot(){
        this.noteClick = {
            content: ''
        }
          this.add_current_note(this.noteClick)
      }
  }
}
</script>
