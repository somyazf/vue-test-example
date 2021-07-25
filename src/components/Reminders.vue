<template>
    <div>
        <input type="text" class="new-reminder" v-model="newReminder">
        <button @click="add" class="add">Add Reminder</button>

        <ul>
            <li v-for="reminder in reminders" :key="reminder">
                {{ reminder }}
                <button class="remove" @click="remove(reminder)">Remove</button>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            newReminder: '',
            reminders: []
        }
    },
    methods: {
        add() {
            this.reminders.push(this.newReminder);
            this.newReminder = ''
        },
        remover(reminder) {
            this.reminders.splice(reminder, 1)
        }
    }
}
</script>