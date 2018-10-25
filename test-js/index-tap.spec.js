import Configurator from '../src-js';

const { equal } = require('tap');

equal(typeof Configurator.getConfig, 'function', 'Configurator.getConfig should be function');

const expectedConfig = Configurator.getConfig();

equal(typeof expectedConfig, 'object', 'Configurator.getConfig should return a config object');
