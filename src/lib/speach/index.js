const fs = require('fs');
const md5 = require('md5');

let player = require('play-sound')({player: 'mplayer'});

// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Creates a client
const client = new textToSpeech.TextToSpeechClient({
    keyFilename: __dirname + '/../../../resources/google/key.json'
});


function tts(text, callback) {
    console.log('Getting audio from google');

    // Construct the request
    const request = {
        input: {text: text},
        // Select the language and SSML Voice Gender (optional)
        voice: {languageCode: 'en-AU', ssmlGender: 'FEMALE', name: 'en-AU-Wavenet-C'},
        // Select the type of audio encoding
        audioConfig: {audioEncoding: 'MP3'},
    };

    // Performs the Text-to-Speech request
    client.synthesizeSpeech(request, (err, response) => {
        if (err) {
            console.error('ERROR:', err);
            return;
        }

        // Write the binary audio content to a local file
        fs.writeFile(__dirname + '/../../../en-AU-Wavenet-C/' + md5(text) + '.mp3', response.audioContent, 'binary', err => {
            if (err) {
                console.error('ERROR:', err);
                return;
            }

            player.play(__dirname + '/../../../en-AU-Wavenet-C/' + md5(text) + '.mp3', {mplayer: ['-volume', 50, '-ao', 'alsa' ]}, function (err) {
                if (err) throw err;
                if (callback)
                    callback();
            })
        });
    });

}


export function say(text, callback) {
    if (Array.isArray(text))
        text = text[Math.floor(Math.random()*text.length)];

    return new Promise((resolve, reject) => {
        fs.stat(__dirname + '/../../../en-AU-Wavenet-C/' + md5(text) + '.mp3', function (err, stat) {
            if (err == null) {
                console.log('File exists');
                player.play(__dirname + '/../../../en-AU-Wavenet-C/' + md5(text) + '.mp3', {mplayer: ['-volume', 50, '-ao', 'alsa' ]}, function (err) {
                    if (err) reject(err);
                    resolve();
                });

                return;
            }

            tts(text, resolve);
        });
    });

}
