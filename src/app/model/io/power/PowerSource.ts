export interface PowerSource {
    readonly voltage: number;
}

export function isPowerSource(element: any): element is PowerSource {
    return (element as PowerSource).voltage !== undefined;
}
