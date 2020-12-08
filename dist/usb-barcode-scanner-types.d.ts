export interface UsbScannerOptions {
    vendorId?: number;
    productId?: number;
    path?: string;
    readBufferTimer?: boolean;
}
export interface onDataScanned {
    on(event: string, listener: Function): this;
}
export interface HidMap {
    code: number;
    value: string;
}
