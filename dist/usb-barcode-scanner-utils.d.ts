import { Device } from 'node-hid';
import { HidMap } from './usb-barcode-scanner-types';
export declare function getDevices(filter?: Partial<Pick<Device, 'vendorId' | 'productId' | 'path' | 'serialNumber'>>): Promise<Device[]>;
export declare function getDevice(vendorId: number, productId: number): Device | undefined;
export declare function getDeviceByPath(path: string): Device | undefined;
export declare function defaultHidMap(): HidMap;
