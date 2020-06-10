import moduleLoader from './moduleLoader';

export default {
    async takeAction(command) {
        console.log('Executing command: ', command);
        await moduleLoader.modules[command.topic]['action'][command.action](command.modifiers);
    }
}


