import music from '../../lib/music'

import action from './action';
import matcher from './matcher';
import response from './response';
import events from './events';

export default {
    module: 'music',

    savedState: music.playing(),

    action,
    matcher,
    response,
    events
}
