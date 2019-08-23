import { IOElement } from './IOElement';
import { PowerSource } from './PowerSource';
import { IOSignal } from './IOSignal';

export class Battery extends IOElement implements PowerSource {

    constructor(readonly voltage: number, name?: string) {
        super(name);
    }

    processSignal(signal: IOSignal): IOSignal {
        // Ignore incoming signal
        return new IOSignal(this.voltage);
    }
}
