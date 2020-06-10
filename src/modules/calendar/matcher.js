import textAnalysis from '../../lib/textAnalysis';

export default {
    match (text, last) {
        let analysis = new textAnalysis(text);

        // How many events are scheduled {time}
        if (text.includes('how many events are scheduled')) {
            return {
                topic: 'calendar',
                action: 'scheduled',
                ignoreDelay: true,
                modifiers: {
                    auxpass: 'are',
                    nsubjpass: 'events',
                    amod: 'many',
                    advmod: 'how'
                }
            }
        } else if (text.includes('how many events do I have today')) {
            return {
                topic: 'calendar',
                action: 'have',
                ignoreDelay: true,
                modifiers: {
                    aux: 'do',
                    nsubj: 'events',
                    amod: 'many',
                    advmod: 'how'
                }
            }
        }
    }
}
