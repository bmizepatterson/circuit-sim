import { ReceivesSignal, TransmitsSignal } from './index';

export abstract class IOElement implements ReceivesSignal, TransmitsSignal {
    public id: string;
    public in: TransmitsSignal[];
    public out: ReceivesSignal[];
    public name: string;

    abstract receive(signal: number, from: TransmitsSignal): void;
    abstract transmit(signal: number, from?: TransmitsSignal): void;
    abstract connectToInput(input: TransmitsSignal): void;
    abstract connectToOutput(output: ReceivesSignal): void;
    abstract connectTo(connector: TransmitsSignal & ReceivesSignal): void;
    abstract isConnectedTo(connector: TransmitsSignal | ReceivesSignal): boolean;
}
