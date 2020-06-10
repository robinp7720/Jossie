import match from './matches';
import responder from './responder';
import actions from './actions';
import textAnalysis from '../../textAnalysis';

export default async function commandHandler(text) {
    console.log(text);

    let commands = await match.match(text);

    await responder.respond(commands);

    for (let i in commands) {
        let command = commands[i];
        console.log(command);
        setTimeout(() => {
            actions.takeAction(command);
        }, command.delay.delayInterval)
    }
}
