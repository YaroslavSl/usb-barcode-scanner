"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultHidMap = exports.getDeviceByPath = exports.getDevice = exports.getDevices = void 0;
var node_hid_1 = require("node-hid");
var lodash_1 = __importDefault(require("lodash"));
function getDevices(filter) {
    return __awaiter(this, void 0, void 0, function () {
        var devices;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, (0, node_hid_1.devicesAsync)()];
                case 1:
                    devices = _a.sent();
                    if (filter) {
                        return [2, lodash_1.default.filter(devices, filter)];
                    }
                    return [2, devices];
            }
        });
    });
}
exports.getDevices = getDevices;
function getDevice(vendorId, productId) {
    return (0, node_hid_1.devices)(vendorId, productId)[0];
}
exports.getDevice = getDevice;
function getDeviceByPath(path) {
    return lodash_1.default.find((0, node_hid_1.devices)(), { 'path': path });
}
exports.getDeviceByPath = getDeviceByPath;
function defaultHidMap() {
    return {
        4: {
            unmodified: "a",
            shift: "A"
        },
        5: {
            unmodified: "b",
            shift: "B"
        },
        6: {
            unmodified: "c",
            shift: "C"
        },
        7: {
            unmodified: "d",
            shift: "D"
        },
        8: {
            unmodified: "e",
            shift: "E"
        },
        9: {
            unmodified: "f",
            shift: "F"
        },
        10: {
            unmodified: "g",
            shift: "G"
        },
        11: {
            unmodified: "h",
            shift: "H"
        },
        12: {
            unmodified: "i",
            shift: "I"
        },
        13: {
            unmodified: "j",
            shift: "J"
        },
        14: {
            unmodified: "k",
            shift: "K"
        },
        15: {
            unmodified: "l",
            shift: "L"
        },
        16: {
            unmodified: "m",
            shift: "M"
        },
        17: {
            unmodified: "n",
            shift: "N"
        },
        18: {
            unmodified: "o",
            shift: "O"
        },
        19: {
            unmodified: "p",
            shift: "P"
        },
        20: {
            unmodified: "q",
            shift: "Q"
        },
        21: {
            unmodified: "r",
            shift: "R"
        },
        22: {
            unmodified: "s",
            shift: "S"
        },
        23: {
            unmodified: "t",
            shift: "T"
        },
        24: {
            unmodified: "u",
            shift: "U"
        },
        25: {
            unmodified: "v",
            shift: "V"
        },
        26: {
            unmodified: "w",
            shift: "W"
        },
        27: {
            unmodified: "x",
            shift: "X"
        },
        28: {
            unmodified: "y",
            shift: "Y"
        },
        29: {
            unmodified: "z",
            shift: "Z"
        },
        30: {
            unmodified: "1",
            shift: "!"
        },
        31: {
            unmodified: "2",
            shift: "@"
        },
        32: {
            unmodified: "3",
            shift: "#"
        },
        33: {
            unmodified: "4",
            shift: "$"
        },
        34: {
            unmodified: "5",
            shift: "%"
        },
        35: {
            unmodified: "6",
            shift: "^"
        },
        36: {
            unmodified: "7",
            shift: "&"
        },
        37: {
            unmodified: "8",
            shift: "*"
        },
        38: {
            unmodified: "9",
            shift: "("
        },
        39: {
            unmodified: "0",
            shift: ")"
        },
        40: {
            unmodified: "enter"
        },
        43: {
            unmodified: "\t",
        },
        44: {
            unmodified: " "
        },
        45: {
            unmodified: "-",
            shift: "_"
        },
        46: {
            unmodified: "=",
            shift: "+"
        },
        47: {
            unmodified: "[",
            shift: "{"
        },
        48: {
            unmodified: "]",
            shift: "}"
        },
        49: {
            unmodified: "\\",
            shift: "|"
        },
        51: {
            unmodified: ";",
            shift: ":"
        },
        52: {
            unmodified: "'",
            shift: "\""
        },
        53: {
            unmodified: "`",
            shift: "~"
        },
        54: {
            unmodified: ",",
            shift: "<"
        },
        55: {
            unmodified: ".",
            shift: ">"
        },
        56: {
            unmodified: "/",
            shift: "?"
        },
        85: {
            unmodified: "*",
        },
        87: {
            unmodified: "+"
        }
    };
}
exports.defaultHidMap = defaultHidMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNiLWJhcmNvZGUtc2Nhbm5lci11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91c2ItYmFyY29kZS1zY2FubmVyLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF5RDtBQUN6RCxrREFBdUI7QUFHdkIsU0FBc0IsVUFBVSxDQUFDLE1BQWtGOzs7Ozt3QkFDL0YsV0FBTSxJQUFBLHVCQUFZLEdBQUUsRUFBQTs7b0JBQTlCLE9BQU8sR0FBRyxTQUFvQjtvQkFDcEMsSUFBSSxNQUFNLEVBQUU7d0JBQ1IsV0FBUSxnQkFBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFhLEVBQUM7cUJBQ2pEO29CQUNELFdBQU8sT0FBTyxFQUFDOzs7O0NBQ2xCO0FBTkQsZ0NBTUM7QUFFRCxTQUFnQixTQUFTLENBQUMsUUFBZ0IsRUFBRSxTQUFpQjtJQUN6RCxPQUFPLElBQUEsa0JBQU8sRUFBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUZELDhCQUVDO0FBRUQsU0FBZ0IsZUFBZSxDQUFDLElBQVk7SUFDeEMsT0FBTyxnQkFBQyxDQUFDLElBQUksQ0FBQyxJQUFBLGtCQUFPLEdBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQy9DLENBQUM7QUFGRCwwQ0FFQztBQUVELFNBQWdCLGFBQWE7SUFDekIsT0FBTztRQUNILENBQUMsRUFBRTtZQUNDLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELENBQUMsRUFBRTtZQUNDLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELENBQUMsRUFBRTtZQUNDLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELENBQUMsRUFBRTtZQUNDLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELENBQUMsRUFBRTtZQUNDLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELENBQUMsRUFBRTtZQUNDLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxPQUFPO1NBQ3RCO1FBQ0QsRUFBRSxFQUFFO1lBQ0EsVUFBVSxFQUFFLElBQUk7U0FDbkI7UUFDRCxFQUFFLEVBQUU7WUFDQSxVQUFVLEVBQUUsR0FBRztTQUNsQjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDYjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLEtBQUssRUFBRSxHQUFHO1NBQ2I7UUFDRCxFQUFFLEVBQUU7WUFDQSxVQUFVLEVBQUUsR0FBRztZQUNmLEtBQUssRUFBRSxHQUFHO1NBQ2I7UUFDRCxFQUFFLEVBQUU7WUFDQSxVQUFVLEVBQUUsR0FBRztZQUNmLEtBQUssRUFBRSxJQUFJO1NBQ2Q7UUFDRCxFQUFFLEVBQUU7WUFDQSxVQUFVLEVBQUUsR0FBRztZQUNmLEtBQUssRUFBRSxHQUFHO1NBQ2I7UUFDRCxFQUFFLEVBQUU7WUFDQSxVQUFVLEVBQUUsR0FBRztZQUNmLEtBQUssRUFBRSxHQUFHO1NBQ2I7UUFDRCxFQUFFLEVBQUU7WUFDQSxVQUFVLEVBQUUsR0FBRztZQUNmLEtBQUssRUFBRSxHQUFHO1NBQ2I7UUFDRCxFQUFFLEVBQUU7WUFDQSxVQUFVLEVBQUUsR0FBRztZQUNmLEtBQUssRUFBRSxHQUFHO1NBQ2I7UUFDRCxFQUFFLEVBQUU7WUFDQSxVQUFVLEVBQUUsR0FBRztTQUNsQjtRQUNELEVBQUUsRUFBRTtZQUNBLFVBQVUsRUFBRSxHQUFHO1NBQ2xCO0tBQ0osQ0FBQTtBQUNMLENBQUM7QUE5TUQsc0NBOE1DIn0=