export default {
    modules: {},

    async loadModule (path) {
        let module = (await import(path)).default;
        this.modules[module.module] = module;
    },

    async unloadModule (path) {
        let module = (await import(path)).default;
        delete this.modules[module.module];

        delete require.cache[require.resolve(`${path}/index.js`)];
        delete require.cache[require.resolve(`${path}/matcher.js`)];
        delete require.cache[require.resolve(`${path}/response.js`)];
        delete require.cache[require.resolve(`${path}/action.js`)];
    },

    async getMatcherArray() {
      let matchers = [];

      for (let i in this.modules) {
          matchers.push(this.modules[i].matcher);
      }

      return matchers;
    },

    async sendEvent(event) {
        for (let i in this.modules) {
            if (!this.modules[i].events)
                continue;

            if (!this.modules[i].events[event])
                continue;

            await this.modules[i].events[event]();
        }
    }
}
