"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsbScanner = void 0;
var node_hid_1 = require("node-hid");
var tsee_1 = require("tsee");
var usb_barcode_scanner_utils_1 = require("./usb-barcode-scanner-utils");
var DEFAULT_READ_BUFFER_TIMEOUT = 50;
var UsbScanner = (function (_super) {
    __extends(UsbScanner, _super);
    function UsbScanner(options, hidMap) {
        var _a;
        var _this = _super.call(this) || this;
        _this.hidMap = (0, usb_barcode_scanner_utils_1.defaultHidMap)();
        var device;
        if (options.path) {
            device = _this.retrieveDeviceByPath(options.path);
        }
        else if (options.vendorId && options.productId) {
            device = (0, usb_barcode_scanner_utils_1.getDevice)(options.vendorId, options.productId);
        }
        _this.readBufferTimer = (_a = options.readBufferTimer) !== null && _a !== void 0 ? _a : false;
        if (device === undefined) {
            console.warn("Device not found, please provide a valid path or vendor/product combination.");
        }
        else {
            if (options.path) {
                _this.hid = new node_hid_1.HID(options.path);
            }
            else {
                _this.hid = new node_hid_1.HID(device.vendorId, device.productId);
            }
            if (hidMap) {
                _this.hidMap = hidMap;
            }
        }
        return _this;
    }
    UsbScanner.prototype.retrieveDevice = function (vendorId, productId) {
        return (0, usb_barcode_scanner_utils_1.getDevice)(vendorId, productId);
    };
    UsbScanner.prototype.retrieveDeviceByPath = function (path) {
        return (0, usb_barcode_scanner_utils_1.getDeviceByPath)(path);
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
                        if (_this.readBufferTimer) {
                            timer = setTimeout(function () {
                                barcode = bcodeBuffer.join('');
                                bcodeBuffer = [];
                                _this.emitDataScanned(barcode);
                            }, DEFAULT_READ_BUFFER_TIMEOUT);
                        }
                    }
                    else {
                        if (timer) {
                            clearTimeout(timer);
                        }
                        barcode = bcodeBuffer.join('');
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
}(tsee_1.EventEmitter));
exports.UsbScanner = UsbScanner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNiLWJhcmNvZGUtc2Nhbm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91c2ItYmFyY29kZS1zY2FubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF1QztBQUN2Qyw2QkFBb0M7QUFHcEMseUVBQXdGO0FBRXhGLElBQU0sMkJBQTJCLEdBQUcsRUFBRSxDQUFDO0FBRXZDO0lBQWdDLDhCQUF1QjtJQUtuRCxvQkFBWSxPQUEwQixFQUFFLE1BQWU7O1FBQXZELFlBQ0ksaUJBQU8sU0F3QlY7UUE1QkQsWUFBTSxHQUFXLElBQUEseUNBQWEsR0FBRSxDQUFDO1FBTTdCLElBQUksTUFBMEIsQ0FBQztRQUUvQixJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDZCxNQUFNLEdBQUcsS0FBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwRDthQUFNLElBQUksT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO1lBQzlDLE1BQU0sR0FBRyxJQUFBLHFDQUFTLEVBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDM0Q7UUFDRCxLQUFJLENBQUMsZUFBZSxHQUFHLE1BQUEsT0FBTyxDQUFDLGVBQWUsbUNBQUksS0FBSyxDQUFDO1FBRXhELElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLDhFQUE4RSxDQUFDLENBQUM7U0FDaEc7YUFBTTtZQUNILElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtnQkFDZCxLQUFJLENBQUMsR0FBRyxHQUFHLElBQUksY0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNwQztpQkFBTTtnQkFDSCxLQUFJLENBQUMsR0FBRyxHQUFHLElBQUksY0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxD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