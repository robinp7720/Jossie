export default class textAnalysis {
    constructor(sentence) {
        this.sentence = sentence;
        this.sentenceArray = sentence.split(' ');
    }

    beforeSingle(wordsBefore, wordAfter) {
        let index = this.sentenceArray.indexOf(wordAfter);
        for (let i in wordsBefore) {
            let word = wordsBefore[i];

            if (this.sentenceArray.indexOf(word) < 0) {
                continue;
            }

            if (this.sentenceArray.indexOf(word) < index) {
                return true;
            }
        }
        return false;
    }

    before(wordsBefore, wordsAfter) {
        for (let i in wordsAfter) {
            if (this.beforeSingle(wordsBefore, wordsAfter[i])) {
                return true;
            }
        }

        return false;
    }

    firstFrom(words) {
        for (let i in words) {
            if (this.sentenceArray.indexOf(words[i]) !== -1) {
                return words[i];
            }
        }
    }

    isQuestion() {
        return this.sentence.includes(' is ') || this.sentence.includes('when ') || this.sentence.includes('where ') || this.sentence.includes('what ') || this.sentence.includes('why ') || this.sentence.includes('will it');
    }

    delayToText(delay) {
        let text = '';
        let length = 0;

        if (delay.seconds) {
            text = delay.seconds + ' seconds' + text;
            length++;
        }

        if (delay.minutes) {
            let prefix = '';
            if (length === 1) prefix = 'and ';
            if (length > 1) prefix = ', ';
            text = delay.minutes + ' minutes ' + prefix + text;
            length++;
        }

        if (delay.hours) {
            let prefix = '';
            if (length === 1) prefix = 'and ';
            if (length > 1) prefix = ', ';
            text = delay.hours + ' hours ' + prefix + text;
            length++;
        }

        if (delay.days) {
            let prefix = '';
            if (length === 1) prefix = 'and ';
            if (length > 1) prefix = ', ';
            text = delay.days + ' days ' + prefix + text;
            length++;
        }

        return text;
    }

    matchTimeIn() {
        let temp = this.sentence.match(/in ((\d+) days|(\d+) day| |)( and |, | |)((\d+) hours|(\d+) hour| |)( and |, | |)((\d+) minutes|(\d+) minute| |)( and |, | |)((\d+) seconds|(\d+) second|)/);

        let delay = null;
        let delayInterval = 0;
        let delayText = '';

        if (temp) {
            delay = {
                days: temp[2] || 0,
                hours: temp[6] || 0,
                minutes: temp[10] || 0,
                seconds: temp[14] || 0
            };

            delayInterval = (1000 * delay.seconds) + (1000 * 60 * delay.minutes) + (1000 * 60 * 60 * delay.hours) + +(1000 * 60 * 60 * 24 * delay.hours);

            delayText = this.delayToText(delay);

            return {
                replace: temp[0],
                delay,
                delayInterval,
                delayText
            };
        }

        return {
            replace: '',
            delay: null,
            delayInterval,
            delayText
        };
    }

    matchTimeAt() {
        let match = this.sentence.match(/at ([0-1]{0,1}[1-9]{1})(|:([0-6]{1}[0-9]{1})) (a\.m\.|p.m\.)/);

        if (!match) {
            return {
                replace: '',
                delay: null,
                delayInterval: 0,
                delayText: ""
            };
        }

        let hour = match[1] | 0;
        let minute = match[3] | 0;
        let ampm = match[4];

        let currentDate = new Date()

        if (ampm === 'p.m.') hour += 12;

        let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hour, minute);

        console.log(hour, minute, ampm, date);

        let delayInterval = date.getTime() - currentDate.getTime();

        console.log(delayInterval);

        let seconds = delayInterval / 1000;

        let delay = {
            days: Math.floor(seconds / (3600 * 24)),
            hours: Math.floor(seconds % (3600 * 24) / 3600),
            minutes: Math.floor(seconds % 3600 / 60),
            seconds: Math.floor(seconds % 60)
        };

        console.log({
            replace: match[0],
            delay,
            delayInterval,
            delayText: this.delayToText(delay)
        });

        return {
            replace: match[0],
            delay,
            delayInterval,
            delayText: this.delayToText(delay)
        };
    }

    getTime() {
        let delay = this.matchTimeIn();

        if (delay.delay !== null)
            return delay;

        delay = this.matchTimeAt();

        if (delay.delay !== null)
            return delay;

        return {
            replace: '',
            delay: null,
            delayInterval: 0,
            delayText: ''
        };


    };
}
