import { IOSignal } from './IOSignal';

export abstract class IOElement {
    public id: string;
    // public name: string;

    constructor(public name?: string) {
        if (!name) {
            this.name = this.constructor.name;
        }
    }

    abstract processSignal(signal: IOSignal): IOSignal;
}
