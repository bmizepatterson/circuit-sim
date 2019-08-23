import { Circuit } from './Circuit';
import { Battery } from './power/Battery';
import { Relay } from './Relay';
import { LED } from './LED';

describe('A circuit', () => {
    let c = null, battery = null, led1 = null, led2 = null, relay1 = null, relay2 = null;

    beforeEach(() => {
        c = new Circuit('circuit1');
        battery = new Battery(5, 'battery');
        led1 = new LED('led1');
        led2 = new LED('led2');
        relay1 = new Relay('relay1');
        relay2 = new Relay('relay2');
    });

    it('is available.', () => {
        expect(c).toBeTruthy();
    });

    it('adds nodes.', () => {
        c.add(battery).add(led1).add(relay1).add(relay2);
        expect(c.nodes).toContain(battery.id);
        expect(c.nodes).toContain(led1.id);
        expect(c.nodes).toContain(relay1.id);
        expect(c.nodes).toContain(relay2.id);
        expect(c.nodes.length).toEqual(4);
    });

    it('removes nodes.', () => {
        c.add(battery).add(led1).remove(led1);
        expect(c.nodes).not.toContain(led1.id);
        expect(c.nodes.length).toEqual(1);

        c.removeAll();
        c.add(battery).add(led1).add(relay1).add(relay2);
        c.connect(battery, led1).connect(led1, relay1).connect(relay1, relay2);
        c.remove(led1);
        expect(c.areConnected(battery, relay2)).toBe(false);
    });

    it('removes all nodes.', () => {
        c.add(battery).add(led1).add(relay1).add(relay2).removeAll();
        expect(c.nodes).toEqual([]);
        expect(c.graph).toEqual({});
        expect(c.elements).toEqual({});
    });

    it('connects nodes.', () => {
        c.add(battery).add(led1).add(led2).add(relay1).add(relay2);
        c.connect(battery, led1).connect(led1, led2).connect(led2, relay1).connect(relay1, relay2).connect(relay2, battery);
        expect(c.graph[battery.id]).not.toContain(battery.id);
        expect(c.graph[battery.id]).toContain(led1.id);
        expect(c.graph[battery.id]).not.toContain(led2.id);
        expect(c.graph[relay2.id]).toContain(battery.id);
    });

    it('connects node A to node B only once.', () => {
        c.add(battery).connect(battery, led1).connect(battery, led1);
        expect(c.graph[battery.id].length).toEqual(1);
    });

    it('adds missing nodes automatically when trying to connect them.', () => {
        c.connect(battery, led1);
        expect(c.graph[battery.id]).toContain(led1.id);
    });

    it('without a power source is NOT closed.', () => {
        c.add(led1).add(led2).add(relay1);
        c.connect(led1, led2).connect(led2, relay1).connect(relay1, led1);
        expect(c.isClosed()).toBe(false);
    });

    it('with a power source NOT inside a cycle is NOT closed.', () => {
        c.add(battery);
        c.connect(led1, led2).connect(led2, relay1).connect(relay1, led1);
        expect(c.isClosed()).toBe(false);
    });

    it('with a power source inside a cycle IS closed.', () => {
        c.connect(battery, led1).connect(led1, led2).connect(led2, relay1).connect(relay1, battery);
        expect(c.isClosed()).toBe(true);

        c.removeAll();
        c.connect(battery, led1).connect(led1, led2).connect(led1, relay1).connect(relay1, battery);
        expect(c.isClosed()).toBe(true);
    });

});
