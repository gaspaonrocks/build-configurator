import Configurator from '../src-js';

const { assert, equal, test } = require('tap');

equal(typeof Configurator.getConfig, 'function', 'Configurator.getConfig should be function');

const expectedConfig = Configurator.getConfig();

equal(typeof expectedConfig, 'object', 'Configurator.getConfig should return a config object');

const expectedConfigWithOptimization = Configurator.plug('optimization').getConfig();

equal(typeof expectedConfigWithOptimization, 'object', 'Configurator.getConfig should return a valid config object');
assert(expectedConfigWithOptimization.splitChunks !== undefined, 'Configurator.getConfig should return an object with a `splitChunks` key');