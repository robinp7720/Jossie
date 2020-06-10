import music from '../../lib/music'

export default {
    'resume': async (modifiers) => {
        return ['resuming playback', 'resuming music'];
    },

    'pause': async (modifiers) => {
        return ['pausing playback', 'pausing music'];
    },

    'next': async (modifiers) => {
        return ['Skipping to the next track', 'Skipping the track', 'Going to the next item in the queue'];
    },

    'clear': async (modifiers) => {
        return ['Clearing the queue']
    },

    'searchadd': async (modifiers) => {
        if (modifiers.artist && modifiers.song)
            return [`Adding ${modifiers.song} by ${modifiers.artist} to the playlist`];

        if (modifiers.artist)
            return [`Adding music by ${modifiers.artist} to the playlist`];
        return [`Adding ${modifiers.song} to the playlist`];
    },

    'remove': async function (modifiers) {
        if (modifiers.dobj === 'everything') {
            return this['clear'](modifiers);
        }

        return [
            'Removing the current track from the playlist',
            'Removing the current track from the queue',
            'Removing the current song from the playlist',
            'Removing the current song from the queue'
        ]
    },

    'set': async (modifiers) => {
        return [`Setting the ${modifiers.subject} to ${modifiers.value}%`]
    },

    'decrease': async function (modifiers) {
        return this['turn down'](modifiers);
    },

    'reduce': async function (modifiers) {
        return this['turn down'](modifiers);
    },

    'turn down': async (modifiers) => {
        return [
            `Reducing ${modifiers.subject} by ${modifiers.value}%`,
            `Decreasing ${modifiers.subject} by ${modifiers.value}%`,
            `Turning down the ${modifiers.subject} by ${modifiers.value}%`
        ];
    },

    'turn up': async (modifiers) => {
        return [
            `Increasing ${modifiers.subject} by ${modifiers.value}%`,
            `Turning up the ${modifiers.subject} by ${modifiers.value}%`
        ];
    },

    'increase': async function (modifiers)  {
        return this['turn up'](modifiers);
    },

    'is': async function (modifiers) {
        let value = '';

        switch (modifiers.subjectCompliment) {
            case 'volume':
                value = await music.currentVolume() + '%';
                break;
            case 'bitrate':
                value = music.currentController.data.bitrate
        }

        return [
            `The ${modifiers.subjectCompliment} of the ${modifiers.subject} is ${value}`
        ]
    },

    'go': async function (modifiers) {
        return [
            `Going to the ${modifiers.amod} ${modifiers.pobj}`
        ]
    }
}
