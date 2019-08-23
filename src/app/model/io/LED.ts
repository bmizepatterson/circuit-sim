import { IOElement } from './IOElement';
import { IOSignal } from './IOSignal';

export class LED extends IOElement {

    constructor(public name?: string) {
        super(name);
    }

    processSignal(signal: IOSignal): IOSignal {
        // For now just forward the signal on
        return signal;
    }
}
