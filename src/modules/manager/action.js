import moduleLoader from '../../lib/handlers/commandHandler/moduleLoader';
import {say} from '../../lib/speach';

export default {
    'install': async function (modifiers) {
        await moduleLoader.loadModule(`${__dirname}/../${modifiers.module}`);
        say(`${modifiers.module} subroutine has been installed`);
    },

    'unload': async function (modifiers) {
        await moduleLoader.unloadModule(`${__dirname}/../${modifiers.module}`);
        say(`${modifiers.module} subroutine has been removed`);
    },

    'reload': async function (modifiers) {
        await moduleLoader.unloadModule(`${__dirname}/../${modifiers.module}`);
        await moduleLoader.loadModule(`${__dirname}/../${modifiers.module}`);
        say(`${modifiers.module} subroutine has been reloaded`);
    },

    'loaded': function (modifiers) {

    },

    'installed': function (modifiers) {
        return this['loaded'](modifiers)
    },

}
