<template>
<div class="list">
    <slot v-if="users">
        <div v-for="(item,index) in users" :key="index">
            <div class="user-name">username: {{item.userName}}</div>
            <div class="password">password: {{item.password}}</div>
            <div class="email">email: {{item.email}}</div>
        </div>
    </slot>
</div>
</template>
<script>
export default {
    props:{
        users: {
        type: Array,
        default: () => {
            return []
        }
    },

    },
    data() {
        return {
        }
    }
}
</script>
<style scoped>
.list {
    padding-top: 16px;
    font-size: 17px;
}
</style>