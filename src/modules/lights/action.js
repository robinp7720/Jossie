import lights from '../../lib/lights';

export default {
    'turn on': async (modifiers) => {
        await lights.on(modifiers.regions);
    },

    'turn off': async (modifiers) => {
        await lights.off(modifiers.regions);
    },

    'dim': async (modifiers) => {
        await lights.brightness(modifiers.regions, 1);
    },

    'set': async (modifiers) => {
        switch (modifiers.subject) {
            case 'brightness':
                await lights.brightness(modifiers.regions, modifiers.value);
                break;
            default:
                break;
        }
    }

};
