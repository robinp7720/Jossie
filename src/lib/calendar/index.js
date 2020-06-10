import ical from 'ical';

function icalFromURL(url, conf) {
    return new Promise((resolve, reject) => {
        ical.fromURL(url, conf, (err, data) => {
            if (err)
                return reject(err);
            resolve(data);
        });
    });
}


export default {
    calendars: [],
    eventCounter: async function (start, end) {
        let events;

        for (let i in this.calendars) {
            let calURL = this.calendars[i];
            let data = await icalFromURL(calURL, {});
            for (let k in data) {
                if (data.hasOwnProperty(k)) {
                    var ev = data[k];

                    if (data[k].type == 'VEVENT') {
                        if (ev.start >= start && ev.end <= end) {
                            events.push(ev);
                        }
                    }
                }
            }
        }

        return events;
    }
};
