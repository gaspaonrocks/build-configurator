import { mergeDeepRight, reduce } from 'ramda';
import webpack from 'webpack';

import configList from './models';

class Configurator {
    constructor() {
        this.config = {};
    }

    configNotSet() {
        const { entry, module, output, plugins } = this.config;
        return !entry || !module || !output || !plugins;
    }

    /**
     * @description getConfig
     * @returns {object} the final config object
     */
    getConfig() {
        if (this.configNotSet()) this.setConfig();

        return this.config;
    }

    /**
     * @description configReducer
     * @param {Array<object>} configsArray an array containing one or several config objects to merge
     * @returns {object} the resulting new config object
     */
    configReducer(configsArray) {
        return reduce(mergeDeepRight, this.config, configsArray);
    }

    /**
     * @description setConfig
     * @returns {undefined} store the config object in this.config
     */
    setConfig() {
        const { common } = configList;
        this.config = this.configReducer([common]);
    }

    /**
     * @description addConfig
     * @param {string} key the key in the config object that needs override
     * @param {object | array} value the new value passed to the config object
     * @returns {instance} itself to chain method calls
     */
    addConfig(key, value) {
        const { error } = console;

        if (!key || !value) {
            error('[WebpackConfig.addConfig] the given key or value are not valid');

            return this;
        }

        const { entry, module, output, plugins } = this.config;
        if (!entry || !module || !output || !plugins) this.setConfig();

        this.config = this.configReducer([{ [key]: value }]);

        return this;
    }

    /**
     * @description runConfig
     * @param {string} args parameters given via CLI when executing the script
     * @example NODE_ENV=test node config.js => process.env.NODE_ENV = 'test'
     * @example MY_INCREDIBLE_VAR=42 node config.js => process.env.MY_INCREDIBLE_VAR = 42
     * @returns {undefined} execute the build from where it is called.
     */
    runConfig(args) {
        const { error, log, warn } = console;

        warn('in runConfig', args);

        webpack(this.getConfig(), (err, stats) => {
            if (err || stats.hasErrors()) {
                error('process errors', args);
            }
            log('done', args);
        });
    }

    plug(key) {
        if (!Array.isArray(key)) {
            if (this.configNotSet()) this.setConfig();
            this.config = this.configReducer([configList[key]]);
        }
        else if (Array.isArray(key)) {/* functionnal method to iterate on key */ }

        return this;
    }

    unplug(key) {
        return this;
    }
}

export default new Configurator();