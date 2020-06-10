import textAnalysis from '../../lib/textAnalysis';

export default {
    match (text, last) {
        text.replace('celebrities', 'subroutines');
        let analysis = new textAnalysis(text);

        if (text.match(/install (.+) subroutine/)) {
            let match = text.match(/install (.+) subroutine/);

            return {
                topic: 'manager',
                action: 'install',
                modifiers: {
                    module: match[1]
                }
            }
        } else if (text.match(/unload (.+) subroutine/)) {
            let match = text.match(/unload (.+) subroutine/);

            return {
                topic: 'manager',
                action: 'unload',
                modifiers: {
                    module: match[1]
                }
            }
        } else if (text.match(/reload (.+) subroutine/)) {
            let match = text.match(/reload (.+) subroutine/);

            return {
                topic: 'manager',
                action: 'reload',
                modifiers: {
                    module: match[1]
                }
            }
        } else if (analysis.before(['what'], [ 'loaded', 'installed']) && (text.includes('modules') || (text.includes('subroutines')))) {
            return {
                topic: 'manager',
                action: analysis.firstFrom(['installed', 'loaded']),
                modifiers: {
                    nsubjpass:  analysis.firstFrom(['modules', 'subroutines']),
                    dobj: 'what',
                    auxpass: 'are'
                }
            }
        }
    }
}
