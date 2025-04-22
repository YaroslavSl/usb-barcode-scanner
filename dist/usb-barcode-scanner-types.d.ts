export interface UsbScannerOptions {
    vendorId?: number;
    productId?: number;
    path?: string;
    readBufferTimer?: boolean;
}
export type HidMap = {
    [key in number]: {
        unmodified: string;
        shift?: string;
    };
};
export type EventsMap = {
    data: (data: string) => void;
    error: (msg: string) => void;
};
