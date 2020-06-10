import dateNlp from 'date.js';
import textAnalysis from '../../lib/textAnalysis';

export default {
    async match(text, last) {
        let analysis = new textAnalysis(text);

        if (text.includes('wake me')) {
            return {
                topic: 'alarm',
                action: 'wake',
            }
        } else if (text.includes('set an alarm')) {
            return {
                topic: 'alarm',
                action: 'set',
                ignoreDelay: true,
                modifiers: {
                    subject: 'alarm',
                    time: dateNlp(text)
                }
            }
        } else if (text.includes('set the alarm volume') || (last.action === 'set' && text.includes('the alarm volume'))) {
            return {
                topic: 'alarm',
                action: 'set',
                modifiers: {
                    subject: 'alarm volume',
                    value: parseInt(text.match(/\d+/g)[0])
                }
            }
        }
    }
}
