import { HID, Device } from 'node-hid';
import { EventEmitter } from 'tsee';

import { UsbScannerOptions, HidMap, EventsMap } from './usb-barcode-scanner-types';
import { getDevice, defaultHidMap, getDeviceByPath } from './usb-barcode-scanner-utils';

const DEFAULT_READ_BUFFER_TIMEOUT = 50;

export class UsbScanner extends EventEmitter<EventsMap> {
    hid?: HID;
    hidMap: HidMap = defaultHidMap();
    readBufferTimer: boolean;

    constructor(options: UsbScannerOptions, hidMap?: HidMap) {
        super();

        let device: Device | undefined;

        if (options.path) {
            device = this.retrieveDeviceByPath(options.path);
        } else if (options.vendorId && options.productId) {
            device = getDevice(options.vendorId, options.productId);
        }
        this.readBufferTimer = options.readBufferTimer ?? false;

        if (device === undefined) {
            console.warn(`Device not found, please provide a valid path or vendor/product combination.`);
        } else {
            if (options.path) {
                this.hid = new HID(options.path);
            } else {
                this.hid = new HID(device.vendorId, device.productId);
            }

            if (hidMap) {
                this.hidMap = hidMap;
            }
        }
    }

    private retrieveDevice(vendorId: number, productId: number): Device|undefined {
        return getDevice(vendorId, productId);
    }

    private retrieveDeviceByPath(path: string): Device|undefined {
        return getDeviceByPath(path);
    }

    startScanning(): void {
        /**
         * USB HID Report Specification: https://www.usb.org/sites/default/files/documents/hid1_11.pdf
         * Starting Page 55
         *
         * Note USB barcode scanners always send a "input" type report which is a "long item" of 8 bytes.
         */

        /**
         * Page 60 in the specification
         */
        const HID_REPORT_BYTE_SIGNIFICANCE = {
            MODIFIER: 0,
            RESERVED: 1,
            KEY_CODE_1: 2,
            KEY_CODE_2: 3,
            KEY_CODE_3: 4,
            KEY_CODE_4: 5,
            KEY_CODE_5: 6,
            KEY_CODE_6: 7
        };

        const MODIFIER_BITS = {
            LEFT_CTRL: 0x1,
            LEFT_SHIFT: 0x2,
            LEFT_ALT: 0x3,
            LEFT_GUI: 0x4,
            RIGHT_CTRL: 0x5,
            RIGHT_SHIFT: 0x6,
            RIGHT_ALT: 0x7,
            RIGHT_GUI: 0x8
        };

        const REPORT_ENDING_KEY_CODE = 40;

        let bcodeBuffer: string[] = [];
        let barcode: string = '';
        let timer: NodeJS.Timeout | undefined;

        if (this.hid) {
            this.hid.on('data', (chunk: number[]) => {
                let keyCode1 = chunk[HID_REPORT_BYTE_SIGNIFICANCE.KEY_CODE_1];
                let modifierByte = chunk[HID_REPORT_BYTE_SIGNIFICANCE.MODIFIER];
                let isShiftModified = modifierByte & MODIFIER_BITS.LEFT_SHIFT || modifierByte & MODIFIER_BITS.RIGHT_SHIFT;
                if (keyCode1) {
                    if (keyCode1 !== REPORT_ENDING_KEY_CODE) {
                        let hidMapEntry = this.hidMap[keyCode1];
                        if (hidMapEntry) {
                            if (typeof hidMapEntry === 'object') {
                                if (isShiftModified && hidMapEntry.shift) {
                                    bcodeBuffer.push(hidMapEntry.shift);
                                } else {
                                    bcodeBuffer.push(hidMapEntry.unmodified);
                                }
                            } else {
                                bcodeBuffer.push(hidMapEntry);
                            }
                        }
                        if (timer) {
                            clearTimeout(timer);
                        }
                        if (this.readBufferTimer) {
                            timer = setTimeout(
                                () => {
                                    barcode = bcodeBuffer.join('');
                                    bcodeBuffer = [];
                                    this.emitDataScanned(barcode);
                                },
                                DEFAULT_READ_BUFFER_TIMEOUT
                            );
                        }
                    } else {
                        if (timer) {
                            clearTimeout(timer);
                        }
                        barcode = bcodeBuffer.join('');
                        bcodeBuffer = [];

                        this.emitDataScanned(barcode);
                    }
                }
            });
            this.hid.on('error', (error) => {
                    this.emitError(error);
            });
        }
    }

    stopScanning(): void {
        if (this.hid) {
            this.hid.close();
        }
    }

    private emitDataScanned(data: string): void {
        this.emit('data', data)
    }

    private emitError(error: string): void {
        this.emit('error', error)
    }
}
