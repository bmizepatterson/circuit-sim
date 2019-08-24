import { IOElement } from './IOElement';
import { isPowerSource, PowerSource } from './power/PowerSource';
import { IOSignal } from './IOSignal';

/**
 * Represents the structure of a circuit.
 */
export class Circuit {
    id = 'circuit';
    elements: CircuitElementList = {};
    graph: CircuitGraph = {};
    active = true;

    constructor(public name?: string) {
        if (!name) {
            this.name = this.constructor.name;
        }
    }

    get nodes(): string[] {
        return Object.keys(this.graph);
    }

    get nextId(): string {
        if (this.nodes.length) {
            const next = Math.max(...this.nodes.map(key => parseInt(key, 10))) + 1;
            return next.toString();
        }
        return '0';
    }

    add(element: IOElement): this {
        element.id = this.nextId;
        this.elements[element.id] = element;
        this.graph[element.id] = [];
        return this;
    }

    remove(element: IOElement): this {
        // Remove connections to this element
        for (const node of this.nodes) {
            const index = this.graph[node].findIndex(e => e === element.id);
            if (index > -1) {
                this.graph[node].splice(index, 1);
            }
        }
        // Remove the element itself from the graph
        delete this.elements[element.id];
        delete this.graph[element.id];
        return this;
    }

    removeAll(): this {
        this.elements = {};
        this.graph = {};
        return this;
    }

    connect(element1: IOElement, element2: IOElement): this {
        if (!this.nodes.includes(element1.id)) {
            this.add(element1);
        }
        if (!this.nodes.includes(element2.id)) {
            this.add(element2);
        }
        if (!this.graph[element1.id].includes(element2.id)) {
            this.graph[element1.id].push(element2.id);
        }
        return this;
    }

    /**
     * Determine whether element1 is connected to element2
     */
    areConnected(element1: IOElement, element2: IOElement): boolean {
        return this.traverse(element1).includes(element2.id);
    }

    /**
     * Determine whether the the graph is cyclic.
     * See https://hackernoon.com/the-javascript-developers-guide-to-graphs-and-detecting-cycles-in-them-96f4f619d563
     * The stack param in the recursive function is the recursion stack and keeps track of the 'back edges',
     * the nodes we visited to get us to the current node. If a child node ever connects to a node on the stack,
     * that means we've come back around to where we started, we've found a cycle.
     */
    isCyclic(): boolean {
        for (const node of this.nodes) {
            if (this._isCyclicRecursive(node, {}, {})) {
                return true;
            }
        }
        return false;
    }

    protected _isCyclicRecursive(
        node: string, visited: CircuitGraphStatus, stack: CircuitGraphStatus,
        callback = (n: string, v: CircuitGraphStatus, s: CircuitGraphStatus): void => {}
    ): boolean {
        if (!visited[node]) {
            visited[node] = stack[node] = true;
            callback(node, visited, stack);
            const children = this.graph[node];
            for (const child of children) {
                if (!visited[child] && this._isCyclicRecursive(child, visited, stack)) {
                    return true;
                } else if (stack[child]) {
                    return true;
                }
            }
        }
        // This node didn't initiate a cycle, so pop it off the stack.
        stack[node] = false;
        return false;
    }

    /**
     * Traverse the circuit starting with the given node.
     * @param element Element to start with
     * @returns CircuitElementList of reachable elements
     */
    traverse(element: IOElement): string[] {
        const traversed = {};
        this._deepSearchUtil(element.id, traversed);
        return Object.keys(traversed);
    }

    /**
     * Determine whether the circuit is "closed." A closed circuit is a circuit that contains a
     * cycle with a power source.
     */
    isClosed() {
        // Search for a power source
        const powerSourceNodes = this.nodes.filter(node => isPowerSource(this.elements[node]));

        if (!powerSourceNodes.length) {
            return false;
        }

        for (const powerSource of powerSourceNodes) {
            if (this._isCyclicRecursive(powerSource, {}, {})) {
                return true;
            }
        }

        // No power sources are inside a cycle, so the circuit is open.
        return false;
    }

    deepSearch(): CircuitGraphStatus {
        const visited = {};
        for (const node of this.nodes) {
            this._deepSearchUtil(node, visited);
        }
        return visited;
    }

    _deepSearchUtil(node: string, visited: CircuitGraphStatus, callback = (n: string, v: CircuitGraphStatus): void => {}) {
        if (!visited[node]) {
            visited[node] = true;
            callback(node, visited);
            const neighbors = this.graph[node];
            for (const neighbor of neighbors) {
                this._deepSearchUtil(neighbor, visited);
            }
        }
    }

    run(delay = 1000) {
        if (!this.isClosed()) {
            console.log('Can\'t run an open circuit');
            return;
        }
        // Start the circuit with the powersource(s)
        for (const node of this.nodes) {
            const element = this.elements[node];
            if (isPowerSource(element)) {
                const output = element.processSignal();
                console.log(element.name + ' is sending an output of ' + output.voltage);
                this._runRecursive(output, node, delay);
            }
        }
    }

    _runRecursive(input: IOSignal, parentNode: string, delay: number) {
        if (this.active) {
            for (const child of this.graph[parentNode]) {
                const childElement = this.elements[child];
                console.log(childElement.name + ' is receiving an input of ' + input.voltage);
                const output = childElement.processSignal(input);
                console.log(childElement.name + ' is sending an output of ' + output.voltage);
                // Step through the circuit slowly
                setTimeout(() => {
                    this._runRecursive(output, child, delay);
                }, delay);
            }
        }
    }

    stop() {
        this.active = false;
    }

}

/**
 * Represents a circuit's state at any given time
 * A new object is created after each advance of the circuit.
 */
export class CircuitState {

    constructor(
        public circuit: Circuit,    // The circuit whose state this object is representing
        public signal: IOSignal,    // The active signal
        public node: string,        // The active node
    ) { }

    get element(): IOElement {
        return this.circuit.elements[this.node];
    }

    // advance(): CircuitState {
    //     const nextNode = this.circuit.graph[this.node];

    // }
}

interface CircuitGraph {
    [key: string]: string[];
}

interface CircuitElementList {
    [key: string]: IOElement;
}

// Used to keep track of nodes during a recursive graph traversal
interface CircuitGraphStatus {
    [key: string]: boolean;
}
