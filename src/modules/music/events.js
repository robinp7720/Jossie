import music from '../../lib/music'
import index from './index'

export default {
    onLoad () {

    },
    async onStartListen () {
        index.savedState = await music.playing();
        await music.pause();
    },
    async onEndListen () {
        if (index.savedState) {
            await music.resume();
        }
    }
}
