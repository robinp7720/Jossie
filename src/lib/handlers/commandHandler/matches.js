import textAnalysis from '../../textAnalysis';
import moduleLoader from './moduleLoader';

export default {
    async match(text) {
        let matchers = await moduleLoader.getMatcherArray();

        let commands = text.split('and');
        let matches = [];

        for (let i in commands) {
            let command = commands[i].trim();

            for (let q in matchers) {
                let matcher = matchers[q];
                let last = {};

                if (i > 0) {
                    last = matches[i - 1];
                }

                let match = await matcher.match(command, last);

                if (match) {
                    match.original = command;
                    matches.push(match);

                    // Since we found a match we don't really want to go looking for any more
                    break;
                }
            }
        }

        let lastDelay = {};
        for (let i in matches) {
            let index = (matches.length - 1) - i;

            let match = matches[index];
            let analysis = new textAnalysis(match.original);

            let delay = analysis.getTime();

            if (delay.delayInterval > 0) {
                lastDelay = delay;
            }
            matches[index].delay = 0;

            if (!matches[index].ignoreDelay) {
                matches[index].delay = lastDelay;
            }
        }

        return matches;
    }
};
