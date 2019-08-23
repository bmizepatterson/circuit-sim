import { Wire } from './Wire';
import { Battery } from './Battery';

// describe('A wire', () => {
    // let wire1 = null;

    // beforeEach(() => {
    //     wire1 = new Wire('wire1');
    // });

    // it('are available', () => {
    //     expect(wire1).toBeTruthy();
    // });

    // it('can be named', () => {
    //     expect(wire1.name).toEqual('wire1');
    // });

    // it('can connect to another wire reciprocally as both input and output', () => {
    //     const wire2 = new Wire('wire2');
    //     wire1.connectTo(wire2);
    //     expect(wire1.in).toContain(wire2);
    //     expect(wire1.out).toContain(wire2);
    //     expect(wire2.in).toContain(wire1);
    //     expect(wire2.out).toContain(wire1);
    //     expect(wire1.connectors).toContain(wire2);
    //     expect(wire2.connectors).toContain(wire1);
    //     expect(wire1.isConnectedTo(wire2)).toBe(true);
    //     expect(wire2.isConnectedTo(wire1)).toBe(true);
    //     expect(wire1.in.length).toEqual(1);
    //     expect(wire1.out.length).toEqual(1);
    //     expect(wire2.in.length).toEqual(1);
    //     expect(wire2.out.length).toEqual(1);
    //     expect(wire1.connectors.length).toEqual(1);
    //     expect(wire2.connectors.length).toEqual(1);
    // });

    // it('can transmit a signal to another wire', () => {
    //     const wire2 = new Wire('wire2');
    //     spyOn(wire1, 'receive');
    //     spyOn(wire2, 'receive');
    //     wire1.connectTo(wire2);
    //     wire1.transmit(5);
    //     expect(wire2.receive).toHaveBeenCalled();
    //     expect(wire1.receive).not.toHaveBeenCalled();
    // });

    // it('can connect to a battery', () => {
    //     const b1 = new Battery(5, 'battery1');
    //     wire1.connectTo(b1);
    //     expect(wire1.in).toContain(b1);
    // });

// });
