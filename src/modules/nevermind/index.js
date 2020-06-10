import {say} from '../../lib/speach';

export default {
    module: 'nevermind',
    startListening() {

    },

    stopListening() {

    },

    async match(text, analysis, callback) {
        if (text.includes("fuck you")) {
            say([
                'Fuck you too',
                'Don\'t say that to me',
                'Sorry'
            ], callback);

            return true;
        }

        else if (text.includes('nevermind') ||
            (text.includes('say') && text.includes('anything'))) {
            callback();
            return true;
        }
    }
}
