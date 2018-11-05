import { expect } from 'chai';
import 'mocha';
import Configurator from '../src-js';

describe('Configurator', () => {
    it('getConfig should be a function', () => {
        expect(typeof Configurator.getConfig, 'function');
    });

    it('getConfig should return an object', () => {
        const expected = Configurator.getConfig();

        expect(typeof expected, 'object');
    });

    it('should return a config object with splitChunks key', () => {
        const expected = Configurator.plug('optimization').getConfig();

        expect(typeof expected, 'object');
        expect(expected.splitChunks).to.not.be.undefined;
    })
});