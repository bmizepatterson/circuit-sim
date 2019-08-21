import { IOElement } from './IOElement';

export class Circuit {
    id = 'circuit';
    graph: CircuitGraph = {};

    constructor(public name?: string) {
        if (!name) {
            this.name = this.constructor.name;
        }
    }

    get elements(): string[] {
        return Object.keys(this.graph);
    }

    get nextId(): string {
        return this.id + '-' + this.elements.length;
    }

    add(element: IOElement): this {
        element.id = this.nextId;
        this.graph[this.nextId] = [];
        return this;
    }

    connect(element1: IOElement, element2: IOElement): this {
        if (!this.graph[element1.id].includes(element2)) {
            this.graph[element1.id].push(element2);
        }
        return this;
    }
}

interface CircuitGraph {
    [key: string]: IOElement[];
}
