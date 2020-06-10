export default {
    'is': function (modifiers) {
        return [
            `It's currently ${modifiers.time.getMinutes()} past ${modifiers.time.getHours()}`,
            `It's currently ${modifiers.time.getHours()} ${modifiers.time.getMinutes()}`
        ]
    },

    'will': function (modifiers) {
        return [
            `It will be ${modifiers.time.getMinutes()} past ${modifiers.time.getHours()}`,
            `It will be ${modifiers.time.getHours()} ${modifiers.time.getMinutes()}`
        ]
    },
}
