import { Circuit } from './Circuit';
import { Wire } from './Wire';

describe('Circuits', () => {
    let c = null;
    let wire1 = null;
    let wire2 = null;
    let wire3 = null;
    let wire4 = null;

    beforeEach(() => {
        c = new Circuit('circuit1');
        wire1 = new Wire('wire1');
        wire2 = new Wire('wire2');
        wire3 = new Wire('wire3');
        wire4 = new Wire('wire4');
    });

    it('are available', () => {
        expect(c).toBeTruthy();
    });

    it('can contain elements', () => {
        c.add(wire1).add(wire2).add(wire3).add(wire4);

        expect(c.elements).toContain(wire1.id);
        expect(c.elements).toContain(wire2.id);
        expect(c.elements).toContain(wire3.id);
        expect(c.elements).toContain(wire4.id);
        expect(c.elements.length).toEqual(4);
    });

    it('can contain connected elements', () => {
        c.add(wire1).add(wire2).add(wire3).add(wire4);
        c.connect(wire1, wire2)
            .connect(wire2, wire3)
            .connect(wire3, wire4)
            .connect(wire1, wire4);

        expect(c.graph[wire1.id]).not.toContain(wire1);
        expect(c.graph[wire1.id]).toContain(wire2);
        expect(c.graph[wire1.id]).not.toContain(wire3);
        expect(c.graph[wire1.id]).toContain(wire4);
    });

    it('connects element A to element B only once', () => {
        c.add(wire1);
        c.connect(wire1, wire2).connect(wire1, wire2);
        expect(c.graph[wire1.id].length).toEqual(1);
    });

});
