export default {
    'turn on': async (modifiers) => {
        return ['turning on the lights'];
    },

    'turn off': async (modifiers) => {
        return ['turning off the lights']
    },

    'dim': async (modifiers) => {
        return ['dimming the lights']
    },

    'set': async (modifiers) => {
        switch (modifiers.subject) {
            case 'brightness':
                return [`setting the brightness to ${modifiers.value}`];
            default:
                break;
        }
    },

}
