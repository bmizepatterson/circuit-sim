export interface ReceivesSignal {
    in: TransmitsSignal[];
    receive(signal: number, from?: TransmitsSignal): void;
}

export interface TransmitsSignal {
    out: ReceivesSignal[];
    transmit(signal: number, from?: TransmitsSignal): void;
}

export { IOElement } from './IOElement';
export { Wire } from './Wire';
export { Battery } from './Battery';
