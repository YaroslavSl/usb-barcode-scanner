import { HID } from 'node-hid';
import { EventEmitter } from 'tsee';
import { UsbScannerOptions, HidMap, EventsMap } from './usb-barcode-scanner-types';
export declare class UsbScanner extends EventEmitter<EventsMap> {
    hid?: HID;
    hidMap: HidMap;
    readBufferTimer: boolean;
    constructor(options: UsbScannerOptions, hidMap?: HidMap);
    private retrieveDevice;
    private retrieveDeviceByPath;
    startScanning(): void;
    stopScanning(): void;
    private emitDataScanned;
    private emitError;
}
