import { getDevices, UsbScanner } from '../index';
import process from 'node:process';
import { Device } from 'node-hid';

async function main() {
    let scanners: UsbScanner[] = [];
    try {
        const availableDevices = await getDevices({ vendorId: 7851, productId: 34 });
        console.log('Available devices', availableDevices);

        availableDevices.forEach((device: Device) => {
            const scanner = new UsbScanner(device);
            scanner.on('data', (data) => {
                console.info(`QR-code ${device.serialNumber}`, data);
            });
            scanner.on('error', async (error) => {
                console.warn('Error', error);
            });
            scanner.startScanning();
            scanners.push(scanner);
        })

    } catch (err) {
        console.log('error', err);
    }

    ['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach((event) =>
        process.on(event, async () => {
            console.log('Shutting down...');
            scanners.forEach(scanner => scanner.stopScanning());
            process.exit(0);
        }),
    );
}

main().then()
