import alarm from '../../lib/alarm';

export default {
     'set': function (modifiers) {
        if (modifiers.subject === 'alarm')
            return [`Setting an alarm for ${modifiers.time.getMinutes()} past ${modifiers.time.getHours()}`];

        if (modifiers.subject === 'alarm volume')
            return [`Setting the alarm volume to ${modifiers.value}%`]
    },

    'wake': function (modifiers) {
        return [`Waking you up`]
    }
}
