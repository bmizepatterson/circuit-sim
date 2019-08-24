import { IOElement } from '../IOElement';
import { IOSignal } from '../IOSignal';

export abstract class PowerSource extends IOElement {

    constructor(readonly voltage: number, name?: string) {
        super(name);
    }

    processSignal(_?: IOSignal) {
        return new IOSignal(this.voltage);
    }
}

export function isPowerSource(element: any): element is PowerSource {
    return (element as PowerSource).voltage !== undefined;
}
