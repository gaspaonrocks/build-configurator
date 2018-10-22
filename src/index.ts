import { mergeDeepRight, reduce } from 'ramda';
import * as webpack from 'webpack';

class Configurator {
    constructor(
        private config?: object
    ) {
        this.config = {};
    }

    /**
     * @description getConfig
     * @param {string} type the type of repo that the config is targeted to
     * @returns {object} the final config object
     */
    getConfig(type?: string): object {
        //const { entry, module, output, plugins } = this.config;
        //if (!entry || !module || !output || !plugins) this.setConfig(type);

        this.config = {
            entry: 'src.index.js',
            output: 'build',
            module: {},
            plugins: []
        }

        return this.config;
    }

    /**
     * @description configReducer
     * @param {Array<object>} configsArray an array containing one or several config objects to merge
     * @returns {object} the resulting new config object
     */
    configReducer(configsArray: Array<object>): object {
        return reduce(mergeDeepRight, this.config, configsArray);
    }

    /**
     * @description setConfig
     * @param {string} type the type of repo that the config is targeted to
     * @returns {undefined} styore the config object in this.config
     */
    /* setConfig(type: string): void {
        const { commonConfig, fragmentConfig, multiRepoConfig, optimization } = configs;

        const configReducer = configsArray => reduce(mergeDeepRight, this.config, configsArray);

        switch (type) {
            case LIB_CONFIG_TYPE:
                this.config = configReducer([commonConfig(), multiRepoConfig]);
                break;
            case APP_CONFIG_TYPE:
                this.config = configReducer([commonConfig(), optimization]);
                break;
            case FRAGMENT_CONFIG_TYPE:
                this.config = configReducer([commonConfig(), fragmentConfig]);
                break;
            default:
                this.config = {};
        }
    } */

    /**
     * @description addConfig
     * @param {string} key the key in the config object that needs override
     * @param {object | array} value the new value passed to the config object
     * @returns {instance} itself to chain method calls
     */
    /* addConfig(key: string, value: Array<number | object | string> | number | object | string): Configurator {
        const { error } = console;

        if (!key || !value) {
            error('[WebpackConfig.addConfig] the given key or value are not valid');

            return this;
        }

        const { entry, module, output, plugins } = this.config;
        if (!entry || !module || !output || !plugins) this.setConfig();

        this.config = mergeDeepRight(this.config, { [key]: value });

        return this;
    } */

    /**
     * @description runConfig
     * @param {string} args parameters given via CLI when executing the script
     * @example NODE_ENV=test node config.js => process.env.NODE_ENV = 'test'
     * @example MY_INCREDIBLE_VAR=42 node config.js => process.env.MY_INCREDIBLE_VAR = 42
     * @returns {undefined} execute the build from where it is called.
     */
    runConfig(args: Array<string>): void {
        const { error, log, warn } = console;
        warn('in runConfig', args);

        webpack(this.getConfig(), (err, stats) => {
            if (err || stats.hasErrors()) {
                error('process errors', args);
            }
            log('done', args);
        });
    }

    plug(key: Array<string> | string): Configurator {
        if (!Array.isArray(key)) {/* this.config = this.configReducer([configList[key]]) */ }
        else if (Array.isArray(key)) {/* functionnal method to iterate on key */ }

        return this;
    }

    unplug(key: Array<string> | string): Configurator {
        return this;
    }
}

export default new Configurator();
// export { LIB_CONFIG_TYPE, APP_CONFIG_TYPE, FRAGMENT_CONFIG_TYPE };
