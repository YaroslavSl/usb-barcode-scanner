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
var events_1 = require("events");
var usb_barcode_scanner_utils_1 = require("./usb-barcode-scanner-utils");
var readBufferTimeout = 50;
var UsbScanner = (function (_super) {
    __extends(UsbScanner, _super);
    function UsbScanner(options, hidMap) {
        var _this = _super.call(this) || this;
        var device;
        if (options.path) {
            device = _this.retreiveDeviceByPath(options.path);
        }
        else if (options.vendorId && options.productId) {
            device = (0, usb_barcode_scanner_utils_1.getDevice)(options.vendorId, options.productId);
        }
        if (options.readBufferTimer === true) {
            _this.readBufferTimer = true;
        }
        else {
            _this.readBufferTimer = false;
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
                _this.hidMap = (0, usb_barcode_scanner_utils_1.defaultHidMap)();
            }
        }
        return _this;
    }
    UsbScanner.prototype.retreiveDevice = function (vendorId, productId) {
        return (0, usb_barcode_scanner_utils_1.getDevice)(vendorId, productId);
    };
    UsbScanner.prototype.retreiveDeviceByPath = function (path) {
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
                                barcode = bcodeBuffer.join("");
                                bcodeBuffer = [];
                                _this.emitDataScanned(barcode);
                            }, readBufferTimeout);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNiLWJhcmNvZGUtc2Nhbm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91c2ItYmFyY29kZS1zY2FubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF1QztBQUN2QyxpQ0FBc0M7QUFHdEMseUVBQXdGO0FBRXhGLElBQU0saUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBRTdCO0lBQWdDLDhCQUFZO0lBS3hDLG9CQUFZLE9BQTBCLEVBQUUsTUFBWTtRQUFwRCxZQUNJLGlCQUFPLFNBMEJWO1FBeEJHLElBQUksTUFBd0IsQ0FBQztRQUU3QixJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDZCxNQUFNLEdBQUcsS0FBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwRDthQUFNLElBQUksT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO1lBQzlDLE1BQU0sR0FBRyxJQUFBLHFDQUFTLEVBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDM0Q7UUFDRCxJQUFJLE9BQU8sQ0FBQyxlQUFlLEtBQUssSUFBSSxFQUFFO1lBQ2xDLEtBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1NBQy9CO2FBQU07WUFDSCxLQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztTQUNoQztRQUVELElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLDhFQUE4RSxDQUFDLENBQUM7U0FDaEc7YUFBTTtZQUNILEtBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxjQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFdEQsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7YUFDeEI7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