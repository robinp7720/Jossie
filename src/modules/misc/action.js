import music from '../../lib/music'
import lights from '../../lib/lights';

export default {
    'know': async function (modifiers) {
        if (modifiers.nsubj.includes('you') && modifiers.nsubj.includes('what') &&
        modifiers.aux === 'to' && modifiers.ccomp === 'do') {
            try {
                await music.volume(20);
                await music.resume();
                await lights.brightness([1,2,3,4], 1);
            } catch (e) {
                console.log(e);
            }
        }
    },
}
