import { IOSignal } from './IOSignal';

export abstract class IOElement {
    public id: string;

    constructor(public name?: string) {
        if (!name) {
            this.name = this.constructor.name;
        }
    }

    abstract processSignal(signal: IOSignal): IOSignal;
}
