import dateNlp from 'date.js';
import textAnalysis from '../../lib/textAnalysis';

export default {
    async match(text, last) {
        let analysis = new textAnalysis(text);

        if (text.includes('what') && text.includes('time') && text.includes('is')) {
            return {
                topic: 'time',
                action: 'is',
                ignoreDelay: true,
                modifiers: {
                    time: dateNlp(text) || new Date()
                }
            }
        } else if (text.includes('what') && text.includes('time') && text.includes('will')) {
            return {
                topic: 'time',
                action: 'will',
                ignoreDelay: true,
                modifiers: {
                    time: dateNlp(text)
                }
            }
        }
    }
}
