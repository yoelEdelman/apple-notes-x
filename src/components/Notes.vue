<template>
    <div class="contain">
        <div class="containerNote">
            <button @click="delete_notes(note.id, index)"><i class="fas fa-times"></i></button>
            <div @click="clickNote(note)" class="note">
                <div class="note-div1">
                    <article class="textNote">
                        {{ note.content.length > 10 ? note.content.substring(0, 10) +'...' : note.content }}
                    </article>
                </div>
                <div class="note-div2">{{moment(note.updated_at).format('LLL')}}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    div{
        text-align: left !important;
    }
    .textNote{
        margin-left: 5px;
    }
    .note{
        cursor: pointer;
        align-items: center;
        padding: 10px;
        transition: ease-in-out 0.3s;
        width: 100%;
    }
    .note-div1{
        display: flex;
        align-items: center;
        text-align: right;
    }
    .note-div2{
        text-align: left;
        color: grey;
        font-size: 80%;
        font-style: italic;
        padding-top: 10px
    }
    .containerNote{
        display: flex;
        width: 100%;
        position: relative;
        transform: translateX(-50px);
        transition: ease-in-out 0.3s;
    }
    .contain{
        cursor: pointer;
        background-color: #f8f8f6;
        width: 100%;
        border-bottom: 1px solid lightgray;
    }
    .contain:hover .containerNote{
        background-color: #e1e1e0;
        transform: translateX(0px);
    }
    button{
        width: 70px;
        background: none;
        border: none;
        color: #8e0100;
        outline: none;
        font-size: 30px;
        cursor: pointer;
    }
</style>
<script>
    import { mapActions, mapMutations} from 'vuex'

    export default {
        props:{
            note:{
                type: Object
            },
            index: {
            }
        },
        methods: {
            ...mapActions({ delete_notes :'delete_notes'}),
            clickNote(note){
                this.$emit('noteClick', note)
            },
        }
    }
</script>