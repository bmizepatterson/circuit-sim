import { Battery } from './Battery';
import { IOSignal } from '../IOSignal';

describe('A battery', () => {
    let b1 = null;

    beforeEach(() => {
        b1 = new Battery(5, 'battery1');
    });

    it('is available.', () => {
        expect(b1).toBeTruthy();
    });

    it('has a name.', () => {
        expect(b1.name).toEqual('battery1');
    });

    it('sends a voltage.', () => {
        const signal = b1.processSignal(new IOSignal(1));
        // Batteries ignore incoming voltage and always output their own voltage.
        expect(signal.voltage).toEqual(b1.voltage);
    });
});
