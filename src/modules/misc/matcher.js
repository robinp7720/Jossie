import dateNlp from 'date.js';
import textAnalysis from '../../lib/textAnalysis';

export default {
    async match(text, last) {
        let analysis = new textAnalysis(text);

        if (text.includes('you know what to do')) {
            return {
                topic: 'misc',
                action: 'know',
                ignoreDelay: true,
                modifiers: {
                    nsubj: ['you', 'what'],
                    aux: 'to',
                    ccomp: 'do'
                }
            }
        }
    }
}
