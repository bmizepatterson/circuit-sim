import { IOElement } from './IOElement';

export class Battery extends IOElement {
    public out: IOElement[] = [];

    constructor(readonly voltage: number, name?: string) {
        super();
        this.name = name ? name : this.constructor.name;
    }

    get in(): IOElement[] {
        // Batteries have no inputs.
        return null;
    }

    transmit(): Promise<void[]> {
        // this.out.forEach(out => out.receive(this.voltage, this));
        const results = this.out.map(out => out.receive(this.voltage, this));
        return Promise.all(results);
        // new Promise(resolve => {
        //     .then(resolve);
        // });
    }

    receive(): Promise<void[]> {
        // No operation: Batteries can't receive signals.
        return Promise.resolve(void[]);
    }

    connectToInput(input: IOElement) {
        // No operation: Batteries can't be connected to signals.
    }

    connectToOutput(output: IOElement) {
        this.connectTo(output);
    }

    connectTo(connector: IOElement) {
        if (!this.isConnectedTo(connector)) {
            this.out.push(connector);
            // Set this as the input source
            connector.connectToInput(this);
        }
    }

    isConnectedTo(connector: IOElement): boolean {
        return this.out.findIndex(c => c === connector) > -1;
    }
}
