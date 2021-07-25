<template>
    <div>
        <!-- viewing the question -->
        <div v-if="!editing">
            <h1 v-text="question.title"></h1>
            <div v-text="question.body" class="body"></div>
            <button id="edit" @click="editing = true">Edit</button>
        </div>
        <!-- editing the question -->
        <div v-if="editing">
            <input type="text" name="title" id="title" v-model="form.title">
            <textarea name="body" id="body" cols="30" rows="10" v-model="form.body"></textarea>
            <button id="update" @click="update">Update</button>
            <button id="cancel" @click="cancel">Cancel</button>
        </div>
    </div>
</template>
<script>
export default ({
    props: ['dataQuestion'],
    data() {
        return {
            question: this.dataQuestion,
            form: {
                title: this.dataQuestion.title,
                body: this.dataQuestion.body
            },
            editing: false
        }
    },
    methods: {
        cancel() {
            this.editing = false
        },
        update() {
            this.editing = false
            this.question.title = this.form.title
            this.question.body = this.form.body
        }
    }
})
</script>
