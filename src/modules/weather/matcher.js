import dateNlp from 'date.js';
import textAnalysis from '../../lib/textAnalysis';

export default {
    async match(text, last) {
        let analysis = new textAnalysis(text);

        if (text.includes('when will it rain')) {
            return {
                topic: 'weather',
                action: 'rain',
                ignoreDelay: true,
                modifiers: {
                    advmod: 'when',
                    aux: 'will',
                    nsubj: 'it',
                    tmod: dateNlp(text)
                }
            };
        } else if (text.includes('will it rain')) {
            return {
                topic: 'weather',
                action: 'rain',
                ignoreDelay: true,
                modifiers: {
                    aux: 'will',
                    nsubj: 'it',
                    tmod: dateNlp(text)
                }
            };
        }
    }
};
