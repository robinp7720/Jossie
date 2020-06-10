import MPDController from './controllers/MPDController';

export default {
    currentController: new MPDController('localhost', 6600),

    async pause() {
        await this.currentController.pause();
    },

    async resume() {
        await this.currentController.resume();
    },

    async next() {
        await this.currentController.next();
    },

    async searchAdd(query) {
        await this.currentController.searchAdd(query);
    },

    async searchPlayAdd(query) {
        await this.currentController.searchPlayAdd(query);
    },

    async clearQueue() {
        await this.currentController.clearQueue();
    },

    async volume(value) {
        await this.currentController.volume(value);
    },

    async removeFromQueue(id) {
        await this.currentController.removeFromQueue(id);
    },

    async currentVolume() {
        return await this.currentController.currentVolume();
    },

    async playing() {
        return await this.currentController.playing();
    }
}
