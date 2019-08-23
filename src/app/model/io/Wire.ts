import { IOElement } from './IOElement';

export class Wire { // extends IOElement {
    // protected _connectors: IOElement[] = [];

    // constructor(name?: string, connectors?: IOElement[]) {
    //     super();
    //     this.name = name ? name : this.constructor.name;
    //     if (connectors) {
    //         this._connectors = connectors;
    //     }
    // }

    // get in(): IOElement[] {
    //     // In a wire, every connection is both an input and an output
    //     return this._connectors;
    // }

    // get out(): IOElement[] {
    //     return this._connectors;
    // }

    // get connectors(): IOElement[] {
    //     return this._connectors;
    // }

    // receive(signal: number, from: IOElement) {
    //     // Wires transmit signals without changing them.
    //     console.log(this.name + ' has received a ' + signal + ' from ' + from.name);
    //     this.transmit(signal, from);
    // }

    // transmit(signal: number, from?: IOElement) {
    //     // Transmit to ALL connectors except the source
    //     this.out.filter(out => out !== from || !from)
    //         .forEach(out => {
    //             // console.log(this.name + ' is sending a ' + signal + ' to ' + out.name);
    //             out.receive(signal, this);
    //         });
    //     // const results = this.out.filter(out => out !== from || !from).map(out => out.receive(signal, this));
    //     // return Promise.all(results);
    // }

    // connectToInput(input: IOElement) {
    //     this.connectTo(input);
    // }

    // connectToOutput(output: IOElement) {
    //     this.connectTo(output);
    // }

    // connectTo(connector: IOElement) {
    //     // Only connect if they're not already connected
    //     if (!this.isConnectedTo(connector)) {
    //         this.connectors.push(connector);

    //         // Connections are reciprocal
    //         connector.connectTo(this);
    //     }
    // }

    // isConnectedTo(connector: IOElement): boolean {
    //     return this.connectors.findIndex(c => c === connector) > -1;
    // }
}
