import { Circuit } from './Circuit';
import { Wire } from './Wire';
import { IOElement } from './IOElement';
import { Battery } from './Battery';

describe('Circuits', () => {
    let c = null, wire1 = null, wire2 = null, wire3 = null, wire4 = null;

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

    it('can add nodes', () => {
        c.add(wire1).add(wire2).add(wire3).add(wire4);
        expect(c.nodes).toContain(wire1.id);
        expect(c.nodes).toContain(wire2.id);
        expect(c.nodes).toContain(wire3.id);
        expect(c.nodes).toContain(wire4.id);
        expect(c.nodes.length).toEqual(4);
    });

    it('can remove nodes', () => {
        c.add(wire1).add(wire2).remove(wire2);
        expect(c.nodes).not.toContain(wire2.id);
        expect(c.nodes.length).toEqual(1);

        c.removeAll();
        c.add(wire1).add(wire2).add(wire3).add(wire4);
        c.connect(wire1, wire2).connect(wire2, wire3).connect(wire3, wire4);
        c.remove(wire2);
        expect(c.areConnected(wire1, wire4)).toBe(false);
    });

    it('can remove all nodes', () => {
        c.add(wire1).add(wire2).add(wire3).removeAll();
        expect(c.nodes).toEqual([]);
        expect(c.graph).toEqual({});
        expect(c.elements).toEqual({});
    });

    it('can contain connected nodes', () => {
        c.add(wire1).add(wire2).add(wire3).add(wire4);
        c.connect(wire1, wire2).connect(wire2, wire3).connect(wire3, wire4).connect(wire1, wire4);
        expect(c.graph[wire1.id]).not.toContain(wire1.id);
        expect(c.graph[wire1.id]).toContain(wire2.id);
        expect(c.graph[wire1.id]).not.toContain(wire3.id);
        expect(c.graph[wire1.id]).toContain(wire4.id);
    });

    it('connect node A to node B only once', () => {
        c.add(wire1).connect(wire1, wire2).connect(wire1, wire2);
        expect(c.graph[wire1.id].length).toEqual(1);
    });

    it('add missing nodes automatically when trying to connect them', () => {
        c.connect(wire1, wire2);
        expect(c.graph[wire1.id]).toContain(wire2.id);
    });

    it('can detect when they are closed', () => {
        c.add(wire1).add(wire2).add(wire3).add(wire4);
        c.connect(wire1, wire2).connect(wire2, wire3).connect(wire3, wire4).connect(wire4, wire1);
        expect(c.isClosed()).toBe(true);

        c.removeAll();
        const wire5 = new Wire('wire5');
        c.add(wire1).add(wire2).add(wire3).add(wire4).add(wire5);
        c.connect(wire1, wire5).connect(wire2, wire3).connect(wire3, wire4).connect(wire4, wire2);
        expect(c.isClosed()).toBe(true);
    });

    it('can detect when they are NOT closed', () => {
        const b = new Battery(5, 'battery1');
        c.add(wire1).add(wire2).add(wire3).add(wire4).add(b);
        c.connect(b, wire1).connect(b, wire2).connect(wire1, wire3).connect(wire2, wire4);
        console.log(c);
        expect(c.isClosed()).toBe(false);
    });

});
