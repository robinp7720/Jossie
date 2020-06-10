import music from '../../lib/music'

export default {
    savedState: music.playing(),

    'resume': async function (modifiers) {
        await music.resume();
        this.savedState = true;
    },

    'pause': async function (modifiers) {
        await music.pause();
        this.savedState = false;
    },

    'next': async (modifiers) => {
        await music.next();
    },

    'clear': async (modifiers) => {
        await music.clearQueue();
    },

    'searchadd': async (modifiers) => {
        await music.searchPlayAdd(modifiers);
    },

    'remove': async (modifiers) => {
        if (modifiers.dobj === 'everything') {
            return this['clear'](modifiers);
        }

        await music.removeFromQueue(-1)
    },

    'set': async (modifiers) => {
        switch (modifiers.subject) {
            case 'volume':
                await music.volume(modifiers.value);
                break;
        }
    },

    'reduce': async function (modifiers) {
        this['turn down'](modifiers);
    },

    'decrease': async function (modifiers) {
        this['turn down'](modifiers);
    },

    'increase': async function (modifiers) {
        this['turn up'](modifiers);
    },

    'turn down': async (modifiers) => {
        switch (modifiers.subject) {
            case 'volume':
                await music.volume(await music.currentVolume() - modifiers.value);
                break;
        }

    },

    'turn up': async (modifiers) => {
        switch (modifiers.subject) {
            case 'volume':
                // - - is used as a + because of javascript's stupid type casting
                await music.volume(await music.currentVolume() - - modifiers.value);
                break;
        }
    },

    'is': async function (modifiers) {

    },

    'go': async function (modifiers) {
        if (modifiers.pqbj === 'track') {
            if (modifiers.amod === 'first') {
                await music.currentController.sendCommand('play', [1])
            }
        }
    },

    'play': async function (modifiers) {
        this['resume'](modifiers);
    }
}
