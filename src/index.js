import commandHandler from './lib/handlers/commandHandler';
import {say} from './lib/speach'
import music from './lib/music';
import Sonus from 'sonus';
import gspeech from '@google-cloud/speech';
import play_sound from 'play-sound';
import moduleLoader from './lib/handlers/commandHandler/moduleLoader';

let player = play_sound({player: 'play'});
let ignore = false;
let currentHotword = '';


// Snowboy hotword detection configuration

const hotwords = [
    {file: 'resources/snowboy/computer.umdl', hotword: 'stranger', sensitivity: 0.3}
];

(async () => {
    await say('Initiation sequence started');

    try {
        await moduleLoader.loadModule(__dirname + '/modules/alarm');
        await moduleLoader.loadModule(__dirname + '/modules/music');
        await moduleLoader.loadModule(__dirname + '/modules/lights');
        await moduleLoader.loadModule(__dirname + '/modules/time');
        await moduleLoader.loadModule(__dirname + '/modules/manager');
        await moduleLoader.loadModule(__dirname + '/modules/calendar');
        await moduleLoader.loadModule(__dirname + '/modules/misc');
        await moduleLoader.loadModule(__dirname + '/modules/wolframalpha');
    } catch (e) {
        console.log(e);
        await say('An error occurred while installing primary subroutines')
    }

    await say('Primary subroutines have been installed');
    await say('Initiating connection to speech recognition service');

    const speech = new gspeech.SpeechClient({
        keyFilename: 'resources/google/key.json'
    });

    const sonus = Sonus.init({hotwords}, speech);

    Sonus.start(sonus);

    sonus.on('hotword', async (index, keyword) => {
        await music.currentController.update();

        if (ignore)
            return;

        player.play(__dirname + '/../resources/tone.wav', {}, function (err) {

        });

        console.log(keyword);
        currentHotword = keyword;
        ignore = true;

        await moduleLoader.sendEvent('onStartListen');
    });

    sonus.on('partial-result', result => console.log('Partial', result));
    sonus.on('final-result', async (result) => {
        ignore = false;

        result = result.toLowerCase();

        result = result.replace('what\'s', 'what is');


        await commandHandler(result);

        console.log('Sending end listen event');
        await moduleLoader.sendEvent('onEndListen');
    });

    await say('Speech recognition service enabled');

})();
