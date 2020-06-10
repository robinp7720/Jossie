import music from '../music'

export default {
    alarms: [],
    timeouts: [],

    alarmVolume: 70,

    updateAlarms() {
        for (let i in this.timeouts) {
            clearTimeout(this.timeouts[i]);
        }

        this.timeouts = [];

        for (let i in this.alarms) {
            this.timeouts.push(this.alarm(this.alarms[i], i));
        }
    },

    alarm(alarm, index) {
        let currentTime = new Date();
        let timeDelta = alarm.time - currentTime;

        return setTimeout(async () => {
            delete this.alarms[index];
            this.updateAlarms();

            await this.sound();


        }, timeDelta);
    },

    set(time) {
        this.alarms.push({
            time
        });

        this.updateAlarms();
    },
    async sound() {
        let lastVolume = await music.currentVolume();

        await music.volume(this.alarmVolume);
        await music.resume();

        setTimeout(async () => {
            await music.pause();
            await music.volume(lastVolume);
        }, 1000 * 10);
    }
};
