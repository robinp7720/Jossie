import moduleLoader from '../../lib/handlers/commandHandler/moduleLoader';

export default {
    'install': function (modifiers) {
        return [`Attempting to install ${modifiers.module} subroutine`]
    },

    'unload': function (modifiers) {
        return [`Attempting to unload ${modifiers.module} subroutine`]
    },

    'reload': function (modifiers) {
        return [`Attempting to reload ${modifiers.module} subroutine`]
    },

    'loaded': function (modifiers) {
        if (['modules', 'subroutines'].indexOf(modifiers.nsubjpass || modifiers.nsubj) !== -1) {
            if (modifiers.dobj === 'what') {
                let response = '';
                let counter = 0;

                for (let i in moduleLoader.modules) {
                    console.log(counter, Object.keys(moduleLoader.modules).length);
                    counter++;
                    if (counter+1 < Object.keys(moduleLoader.modules).length) {
                        response += moduleLoader.modules[i].module + ', ';
                        continue;
                    }

                    if (counter+1 === Object.keys(moduleLoader.modules).length) {
                        response += moduleLoader.modules[i].module + ' and ';
                        continue;
                    }

                    response += moduleLoader.modules[i].module;
                }

                return [`Currently the ${response} subroutines are installed`]
            }
        }
    },

    'installed': function (modifiers) {
        return this['loaded'](modifiers)
    },

}
