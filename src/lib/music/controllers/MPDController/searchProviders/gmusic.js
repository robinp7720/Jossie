import fetch from 'node-fetch';

export default class GmusicProvider {
    constructor(host, mpdController) {
        this.host = host
        this.mpdController = mpdController;
    }

    async searchAddSong(song, artist) {
        let url = '';
        if (artist)
            url = this.host + `/get_by_search?type=song&title=${encodeURIComponent(song)}&artist=${encodeURIComponent(artist)}&num_tracks=200`;
        else
            url = this.host + `/get_by_search?type=song&title=${encodeURIComponent(song)}&num_tracks=200`;

        await this.mpdController.sendCommand('add', [url]);
    }

    async searchAddArtist(artist) {
        let url = this.host + `/get_by_search?type=artist&artist=${encodeURIComponent(artist)}&num_tracks=20034`;

        let result = await fetch(url)
            .then(res => res.text());

        let body = result.split('\n');

        for (let i in body) {
            let item = body[i];
            if (item.charAt(0) === "#") continue;
            console.log(item);
            await this.mpdController.sendCommand('add', [item]);
        }
    }
}
