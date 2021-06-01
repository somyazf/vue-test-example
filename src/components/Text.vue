<template>
    <div></div>
</template>
<script>

export default ({
    data() {
        return {

        }
    },
    methods: {
        checkAndGenerate(name, age) {
            if (!this.validateInput(name, true, false) || !this.validateInput(age, false, true)) {
                return false;
            }
            return this.generateText(name, age);
        },
        validateInput(text, notEmpty, isNumber) {
            if (!text) {
                return false;
            }
            if (notEmpty && text.trim().length === 0) {
                return false;
            }
            if (isNumber && isNaN(+text)) {
                return false;
            }
            return true;
        },
        generateText(name, age) {
            return `${name} (${age} years old)`;
        }
    }
})
</script>
