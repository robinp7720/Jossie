import alarm from '../../lib/alarm'

export default {
    'set': function (modifiers) {
        if (modifiers.subject === 'alarm')
            alarm.set(modifiers.time);
        if (modifiers.subject === 'alarm volume')
            alarm.alarmVolume = modifiers.value;
    },

    'wake': function (modifiers) {
        alarm.sound()
    }
}
