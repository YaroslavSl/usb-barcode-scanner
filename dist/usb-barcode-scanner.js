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
        var HID_REPORT_BYTE_SIGNIFICANCE = {
            MODIFIER: 0,
            RESERVED: 1,
            KEY_CODE_1: 2,
            KEY_CODE_2: 3,
            KEY_CODE_3: 4,
            KEY_CODE_4: 5,
            KEY_CODE_5: 6,
            KEY_CODE_6: 7
        };
        var MODIFIER_BITS = {
            LEFT_CTRL: 0x1,
            LEFT_SHIFT: 0x2,
            LEFT_ALT: 0x3,
            LEFT_GUI: 0x4,
            RIGHT_CTRL: 0x5,
            RIGHT_SHIFT: 0x6,
            RIGHT_ALT: 0x7,
            RIGHT_GUI: 0x8
        };
        var REPORT_ENDING_KEY_CODE = 40;
        var bcodeBuffer = [];
        var barcode = '';
        var timer;
        if (this.hid) {
            this.hid.on('data', function (chunk) {
                var keyCode1 = chunk[HID_REPORT_BYTE_SIGNIFICANCE.KEY_CODE_1];
                var modifierByte = chunk[HID_REPORT_BYTE_SIGNIFICANCE.MODIFIER];
                var isShiftModified = modifierByte & MODIFIER_BITS.LEFT_SHIFT || modifierByte & MODIFIER_BITS.RIGHT_SHIFT;
                if (keyCode1) {
                    if (keyCode1 !== REPORT_ENDING_KEY_CODE) {
                        var hidMapEntry = _this.hidMap[keyCode1];
                        if (hidMapEntry) {
                            if (typeof hidMapEntry === 'object') {
                                if (isShiftModified && hidMapEntry.shift) {
                                    bcodeBuffer.push(hidMapEntry.shift);
                                }
                                else {
                                    bcodeBuffer.push(hidMapEntry.unmodified);
                                }
                            }
                            else {
                                bcodeBuffer.push(hidMapEntry);
                            }
                        }
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