<template>
    <div class="insideRight">
        <article v-if="note.updated_at" class="titleNote">
            {{moment(note.updated_at).startOf(1,'hour').fromNow()}}
            {{moment(note.updated_at).format('LLL')}}
            <article><b>{{ count_current_note }}</b>  Mot(s)</article>
        </article>
        <article class="titleNote" v-else>Aujourd'hui {{moment().format('LTS')}}</article>
        <textarea ref='writter' v-debounce="newNote"  v-model="note.content"></textarea>
    </div>
</template>

<style scoped>
    .insideRight{
        width: 100%;
        background-color: #f8f8f6;
    }
    .titleNote{
        padding: 20px;
        background-color: #f8f8f6;
    }
    textarea{
        background-color: #f8f8f6;
        padding: 20px;
        width: calc(100% - 40px);
        border: none;
        outline: none;
        font-size: 20px;
        height: calc(100% - 140px);
    }
</style>

<script>
    import { mapActions, mapMutations} from 'vuex'
    import { mapGetters } from 'vuex'

    export default {

        props: {
            note: {
                type: Object
            }
        },

        updated(){
                this.$refs.writter.focus();
        },

        computed: {
            ...mapGetters(['current_note']),
            ...mapGetters(['notes']),
            ...mapGetters(['count_current_note'])
        },

        methods:{
            ...mapActions({ add_note :'add_note'}),
            ...mapActions({ update_note :'update_note'}),

            newNote(note){
                if (this.notes.find(element => element.id === this.current_note.id)){
                    this.update_note(this.current_note)
                }
                else{
                        this.add_note(this.current_note)
                }
            }
        }
    }
</script>