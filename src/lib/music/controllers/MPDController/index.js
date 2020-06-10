import mpd from 'mpd';
import GmusicProvider from './searchProviders/gmusic';
import config from '../../../../config'

export default class MPDController {
    constructor(host, port) {
        this.client = mpd.connect({host, port});

        if (config.music.searchProvider === "gmusic")
            this.searchProvider = new GmusicProvider(config.music.searchProviderSettings.host, this)

        this.data = {};

        this.client.on('system', () => {
            this.update();
        });

        this.client.on('system-player', () => {
            this.update();
        });

        this.client.on('ready', () => {
            this.update();
        });
    }

    sendCommand(command, args) {
        return new Promise((resolve, reject) => {
            this.client.sendCommand(mpd.cmd(command, args), function (err, msg) {
                if (err) reject(err);
                resolve(msg);
            });
        });
    }

    async pause() {
        await this.sendCommand('pause', [1]);
    }

    async resume() {
        await this.sendCommand('pause', [0]);
    }

    async next() {
        await this.sendCommand('next', []);
    }

    async clearQueue() {
        await this.sendCommand('clear', []);
    }

    async volume(value) {
        await this.sendCommand('setvol', [value]);
    }

    async currentVolume() {
        return this.data.volume;
    }

    async playing() {
        return this.data.state === 'play';
    }

    async removeFromQueue(id) {
        if (id === -1) {
            id = this.data.song;
        }

        await this.next();
        await this.sendCommand('delete', [id]);
    }

    async searchPlayAdd(query) {
        let lastLength = this.data.playlistlength

        let response = await this.searchAdd(query);
        console.log(response);

        return await this.sendCommand('play', [lastLength]);
    }

    async searchAdd(query) {
        if (query.song) {
            return await this.searchProvider.searchAddSong(query.song, query.artist);
        } else if (query.artist) {
            return  await this.searchProvider.searchAddArtist(query.artist);
        }
    }

    update() {
        return new Promise((resolve, reject) => {
            this.client.sendCommand(mpd.cmd('status', []), (err, msg) => {
                if (err) reject();
                let data = msg.split(/\n/g);

                for (let i in data) {
                    let item = data[i];
                    item = item.split(': ');
                    this.data[item[0]] = item[1];
                }

                resolve(msg);
            });
        });
    }
}
