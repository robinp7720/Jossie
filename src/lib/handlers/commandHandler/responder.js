import {say} from '../../speach'
import moduleLoader from './moduleLoader';


export default {
    async respond(commands) {
        let responses = [];

        for (let i in commands) {
            let command = commands[i];

            responses.push(await this.generateSingle(command));
        }

        let conjugated = '';

        for (let i in responses) {
            let response = responses[i];

            if (i + 2 < responses.length) {
                conjugated += response +', ';
                continue;
            }

            if (i + 1 < responses.length) {
                conjugated += response + ' and ';
                continue;
            }

            conjugated += response;
        }

        await say(conjugated);
    },
    async generateSingle(command) {
        let responses = await moduleLoader.modules[command.topic]['response'][command.action](command.modifiers);

        if (command.delay.delayText) {
            return responses[Math.floor(Math.random()*responses.length)] + ` in ${command.delay.delayText}`;
        }

        return responses[Math.floor(Math.random()*responses.length)]
    }
}


