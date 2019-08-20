import { Battery, Wire } from './index';

describe('Battery', () => {
    let b1 = null;

    beforeEach(() => {
        b1 = new Battery(5, 'battery1');
    });

    it('is available', () => {
        expect(b1).toBeTruthy();
    });

    it('can be named', () => {
        expect(b1.name).toEqual('battery1');
    });

    it('can connect to a wire', () => {
        const wire1 = new Wire('wire1');
        b1.connectTo(wire1);
        expect(b1.out).toContain(wire1);
        expect(b1.out.length).toEqual(1);
        expect(wire1.in).toContain(b1);
        expect(wire1.in.length).toEqual(1);
    });

    it('has no inputs', () => {
        const wire1 = new Wire('wire1');
        b1.connectTo(wire1);
        expect(b1.in).toBeNull();
        b1.connectToInput(wire1);
        expect(b1.in).toBeNull();

        const wire2 = new Wire('wire2');
        wire2.connectTo(b1);
        expect(b1.in).toBeNull();
    });

    it('can transmit a signal through a wire', () => {
        const wire1 = new Wire('wire1');
        spyOn(wire1, 'receive');
        wire1.connectTo(b1);
        b1.transmit();
        expect(wire1.receive).toHaveBeenCalled();
    });

    it('can transmit a signal through a chain of wires', () => {
        const wire1 = new Wire('wire1');
        const wire2 = new Wire('wire2');
        const wire3 = new Wire('wire3');
        [wire1, wire2, wire3].forEach(w => {
            spyOn(w, 'receive');
            spyOn(w, 'transmit');
        });
        wire1.connectTo(b1);
        wire2.connectTo(wire1);
        wire3.connectTo(wire2);
        b1.transmit();

        setTimeout(() => {
            expect(wire1.receive).toHaveBeenCalledWith(5, b1);
            expect(wire1.transmit).toHaveBeenCalledWith(5, b1);
            expect(wire2.receive).toHaveBeenCalledWith(5, wire1);
            expect(wire2.transmit).toHaveBeenCalledWith(5, wire1);
            // expect(wire3.receive).toHaveBeenCalledWith(5, wire2);
            // Last wire in the chain shouldn't transmit
            // expect(wire3.transmit).not.toHaveBeenCalled();
        }, 100);
    });
});
