import alarm from '../../lib/alarm';
import music from '../../lib/music';
import lights from '../../lib/lights';

export default {
    'know': async function (modifiers) {
        if (modifiers.nsubj.includes('you') && modifiers.nsubj.includes('what') &&
            modifiers.aux === 'to' && modifiers.ccomp === 'do') {
            return [''];
        }
    },
}
