import calendar from '../../lib/calendar';

export default {
    'scheduled': async function () {
        let now = new Date();
        let count = await calendar.eventCounter(now, now.setHours(23));
        console.log(count);

        if (count === 1) {
            return [`You have ${count} events`];
        }

        return [`You have ${count} events`];
    },

    'have': function () {
        return ['Not implemented yet']
    }
}
