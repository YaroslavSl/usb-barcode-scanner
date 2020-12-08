"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var node_hid_1 = require("node-hid");
var events_1 = require("events");
var usb_barcode_scanner_utils_1 = require("./usb-barcode-scanner-utils");
var UsbScanner = (function (_super) {
    __extends(UsbScanner, _super);
    function UsbScanner(options, hidMap) {
        var _this = _super.call(this) || this;
        var device;
        if (options.path) {
            device = _this.retreiveDeviceByPath(options.path);
        }
        else if (options.vendorId && options.productId) {
            device = usb_barcode_scanner_utils_1.getDevice(options.vendorId, options.productId);
        }
        if (options.sendBufferTimerOn === true) {
            _this.sendBufferTimerOn = true;
        }
        else {
            _this.sendBufferTimerOn = false;
        }
        if (device === undefined) {
            console.warn("Device not found, please provide a valid path or vendor/product combination.");
        }
        else {
            _this.hid = new node_hid_1.HID(device.vendorId, device.productId);
            if (hidMap) {
                _this.hidMap = hidMap;
            }
            else {
                _this.hidMap = usb_barcode_scanner_utils_1.defaultHidMap();
            }
        }
        return _this;
    }
    UsbScanner.prototype.retreiveDevice = function (vendorId, productId) {
        return usb_barcode_scanner_utils_1.getDevice(vendorId, productId);
    };
    UsbScanner.prototype.retreiveDeviceByPath = function (path) {
        return usb_barcode_scanner_utils_1.getDeviceByPath(path);
    };
    UsbScanner.prototype.startScanning = function () {
        var _this = this;
        var bcodeBuffer = [];
        var barcode = '';
        var timer;
        if (this.hid) {
            this.hid.on('data', function (chunk) {
                if (_this.hidMap[chunk[2]]) {
                    if (chunk[2] !== 40) {
                        bcodeBuffer.push(_this.hidMap[chunk[2]]);
                        if (timer) {
                            clearTimeout(timer);
                        }
                        if (_this.sendBufferTimerOn) {
                            timer = setTimeout(function () {
                                barcode = bcodeBuffer.join("");
                                bcodeBuffer = [];
                                _this.emitDataScanned(barcode);
                            }, 100);
                        }
                    }
                    else {
                        if (timer) {
                            clearTimeout(timer);
                        }
                        barcode = bcodeBuffer.join("");
                        bcodeBuffer = [];
                        _this.emitDataScanned(barcode);
                    }
                }
            });
            this.hid.on('error', function (error) {
                _this.emitError(error);
            });
        }
    };
    UsbScanner.prototype.stopScanning = function () {
        if (this.hid) {
            this.hid.close();
        }
    };
    UsbScanner.prototype.emitDataScanned = function (data) {
        this.emit('data', data);
    };
    UsbScanner.prototype.emitError = function (error) {
        this.emit('error', error);
    };
    return UsbScanner;
}(events_1.EventEmitter));
exports.UsbScanner = UsbScanner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNiLWJhcmNvZGUtc2Nhbm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91c2ItYmFyY29kZS1zY2FubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF1QztBQUN2QyxpQ0FBc0M7QUFHdEMseUVBQXdGO0FBRXhGO0lBQWdDLDhCQUFZO0lBS3hDLG9CQUFZLE9BQTBCLEVBQUUsTUFBWTtRQUFwRCxZQUNJLGlCQUFPLFNBMEJWO1FBeEJHLElBQUksTUFBd0IsQ0FBQztRQUU3QixJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDZCxNQUFNLEdBQUcsS0FBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwRDthQUFNLElBQUksT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO1lBQzlDLE1BQU0sR0FBRyxxQ0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzNEO1FBQ0QsSUFBSSxPQUFPLENBQUMsaUJBQWlCLEtBQUssSUFBSSxFQUFFO1lBQ3BDLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7U0FDakM7YUFBTTtZQUNILEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7U0FDbEM7UUFFRCxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyw4RUFBOEUsQ0FBQyxDQUFDO1NBQ2hHO2FBQU07WUFDSCxLQUFJLENBQUMsR0FBRyxHQUFHLElBQUksY0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXRELElBQUksTUFBTSxFQUFFO2dCQUNSLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2FBQ3hCO2lCQUFNO2dCQUNILEtBQUksQ0FBQyxNQUFNLEdBQUcseUNBQWEs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