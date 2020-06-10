import dateNlp from 'date.js';
import textAnalysis from '../../lib/textAnalysis';

export default {
    async match(text, last) {
        let analysis = new textAnalysis(text);

        if (analysis.isQuestion()) {
            console.log('wolframalpha! ', text);
            return {
                topic: 'wolframalpha',
                action: 'response',
                ignoreDelay: true,
                modifiers: {
                    original: text
                }
            }
        }
    }
};
