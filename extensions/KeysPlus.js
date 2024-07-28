// Name : Keys+
// ID : enderKeysPlus
// Description : /* Placeholder */
// Version : 1.0
// Author : Ender-Studio
// License : MIT


// ［］
(function(Scratch){
    "use strict";

    if (!Scratch.extensions.unsandboxed) throw new Error("Keys+ must run unsandboxed");

    const runtime = Scratch.vm.runtime

    const _validKeys = [ "space", "up arrow", "down arrow", "right arrow", "left arrow", "backspace", "enter", "right shift", "left shift", "right control", "left control", "right alt", "left alt", "right windows key", "left windows key", "context menu", "escape", "tab", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "+", "=", "[", "]", "{", "}", "\\", "|", ";", ":", "'", "\"", ",", ".", "/", "?", "<", ">", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "caps lock", "scroll lock", "num lock", "insert", "delete", "home", "end", "page up", "page down", "numpad: divide", "numpad: multiply", "numpad: subtract", "numpad: add", "numpad: 0", "numpad: 1", "numpad: 2", "numpad: 3", "numpad: 4", "numpad: 5", "numpad: 6", "numpad: 7", "numpad: 8", "numpad: 9", "numpad: decimal", "numpad: enter" ],
          _formatToValue = [ "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Digit0", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "KeyA", "KeyB", "KeyC", "KeyD", "KeyE", "KeyF", "KeyG", "KeyH", "KeyI", "KeyJ", "KeyK", "KeyL", "KeyM", "KeyN", "KeyO", "KeyP", "KeyQ", "KeyR", "KeyS", "KeyT", "KeyU", "KeyV", "KeyW", "KeyX", "KeyY", "KeyZ", "Backquote", "Minus", "Equal", "BracketLeft", "BracketRight", "Backslash", "Semicolon", "Quote", "Comma", "Period", "Slash" ],
          _formatReverseOrder = [ "Meta", "Control", "Shift", "Alt", "Arrow"]
    let _keysPressed = {}, _keyPressed = [], _keybinds = {}, __keysPressed = {};

    const format = (_key, _value) => { if (_formatToValue.includes(_key)) return _value; let key = _key.split(/(?=[A-Z0-9])/); key = _formatReverseOrder.some(item => key.includes(item)) ? key.reverse().join(" ").replace("Meta", "Windows Key") : key.join(" ").replace("Numpad", "Numpad:"); return key.toLowerCase(); };
    const _parseKeys = (_keys) => { try { return JSON.parse(/^\[.*\]$/.test(_keys) ? _keys : `[${_keys}]`); } catch {  return []; } };
    const parseKeys = (_keys) => { const keys = [...new Set(_parseKeys(_keys))]; return keys.includes("any")? ["any"].concat(keys.filter(k => k !== "any")) : keys }
    const getKeysPressed = () => Object.keys(_keysPressed);

    const refresh = () => {Object.keys(__keysPressed).length === 0 ? _keysPressed = {} : !_keysPressed["any"] && (_keysPressed = {"any": [Date.now(), "N/A", "N/A"], ..._keysPressed})};

    class enderKeysPlus {
        constructor() {
            runtime.on("BEFORE_EXECUTE", () => { runtime.startHats("enderKeysPlus_eventWhileKeyPressed"); runtime.startHats("enderKeysPlus_eventWhileKeyPressedMultiple")})
            window.addEventListener("keydown", (event) => { __keysPressed[event.key] = true; __keysPressed[event.key] = true; if (!_keysPressed[format(event.code, event.key)]) _keysPressed[format(event.code, event.key)] = [ Date.now(), event.code, event.key] ; refresh() })
            window.addEventListener("keyup", (event) => { delete __keysPressed[event.key]; delete _keysPressed[format(event.code, event.key)]; refresh() })
        };
        getInfo() {
            return {
                id: "enderKeysPlus",
                name: "KeysPlus",
                color1: "#647970",
                color2: "#4D5E56",
                blocks: [
                    { opcode: "eventWhileKeyPressed", blockType: Scratch.BlockType.HAT, text: "while [key] key is pressed", isEdgeActivated: false, arguments: { key: { type: Scratch.ArgumentType.STRING, menu: "keys" } } },
                    { opcode: "eventWhileKeyPressedMultiple", blockType: Scratch.BlockType.HAT, text: "while ［[keys]］ keys is pressed [mode]", isEdgeActivated: false, arguments: { keys: { type: Scratch.ArgumentType.STRING }, mode: { type: Scratch.ArgumentType.STRING, menu: "returnMode" } } },
                    { opcode: "eventWhenKeyPressed", blockType: Scratch.BlockType.HAT, text: "when [key] key is pressed", arguments: { key: { type: Scratch.ArgumentType.STRING, menu: "keys" } } },
                    { opcode: "eventWhenKeyPressedMultiple", blockType: Scratch.BlockType.HAT, text: "when ［[keys]］ keys is pressed [mode]", arguments: { keys: { type: Scratch.ArgumentType.STRING }, mode: { type: Scratch.ArgumentType.STRING, menu: "returnMode" } } },
                    "---",
                    { opcode: "isKeyPressed", blockType: Scratch.BlockType.BOOLEAN, text: "is [key] key pressed?", arguments: { key: { type: Scratch.ArgumentType.STRING, menu: "keys" } } },
                    { opcode: "isKeyPressedMultiple", blockType: Scratch.BlockType.BOOLEAN, text: "are ［[keys]］ keys pressed? [mode]", arguments: { keys: { type: Scratch.ArgumentType.STRING }, mode: { type: Scratch.ArgumentType.STRING, menu: "returnModeExtra" } } },
                    "---",
                    { opcode: "keyPressedAll", blockType: Scratch.BlockType.REPORTER, text: "current keys pressed" },
                    { opcode: "keyPressedCurrent", blockType: Scratch.BlockType.REPORTER, text: "current key pressed" },
                    { opcode: "keyPressedProperty", blockType: Scratch.BlockType.REPORTER, text: "current key pressed [property]", disableMonitor: true, arguments: { property: { type: Scratch.ArgumentType.STRING, menu: "property" } } },
                    "---",
                    { opcode: "keyPressedTime", blockType: Scratch.BlockType.REPORTER, text: "time [key] key pressed", arguments: { key: { type: Scratch.ArgumentType.STRING, menu: "keys" } } },
                    { opcode: "keyPressedMultipleTime", blockType: Scratch.BlockType.REPORTER, text: "time ［[keys]］ keys pressed", arguments: { keys: { type: Scratch.ArgumentType.STRING } } },
                ],
                menus: {
                    keys: { acceptReporters: true, items: [ "space", "up arrow", "down arrow", "right arrow", "left arrow", "backspace", "enter", "any", "right shift", "left shift", "right control", "left control", "right alt", "left alt", "right windows key", "left windows key", "context menu", "escape", "tab", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "+", "=", "[", "]", "{", "}", "\\", "|", ";", ":", "'", "\"", ",", ".", "/", "?", "<", ">", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "caps lock", "scroll lock", "num lock", "insert", "delete", "home", "end", "page up", "page down", "numpad: divide", "numpad: multiply", "numpad: subtract", "numpad: add", "numpad: 0", "numpad: 1", "numpad: 2", "numpad: 3", "numpad: 4", "numpad: 5", "numpad: 6", "numpad: 7", "numpad: 8", "numpad: 9", "numpad: decimal", "numpad: enter" ] },
                    returnMode: { items: [ "together & in order", "together & ignore order" ] },
                    returnModeExtra: { items: [ "together & in order", "together & ignore order", "individually"] },
                    property: { items: [ "time", "code", "value", "name"] }
                }
            };
        };
        _isKeysPressed(keys, ordered) { if (keys.length === 0) return false; return ordered ? getKeysPressed().filter(k => keys.includes(k)).join("|") === keys.join("|") : keys.every(key => getKeysPressed().includes(key))}

        eventWhileKeyPressed(args) { return getKeysPressed().includes(args.key) }
        eventWhileKeyPressedMultiple(args) { const k = parseKeys(args.keys); return args.mode === "together & in order" ? this._isKeysPressed(k, true) : this._isKeysPressed(k, false) }
        eventWhenKeyPressed(args) { return getKeysPressed().includes(args.key) }
        eventWhenKeyPressedMultiple(args) { const k = parseKeys(args.keys); return args.mode === "together & in order" ? this._isKeysPressed(k, true) : this._isKeysPressed(k, false) }

        isKeyPressed(args) { return getKeysPressed().includes(args.key) }
        isKeyPressedMultiple(args) { const k = parseKeys(args.keys); return args.mode === "together & in order" ? this._isKeysPressed(k, true) : args.mode === "together & ignore order" ? this._isKeysPressed(k, false) : JSON.stringify(_parseKeys(args.keys).map(key => getKeysPressed().includes(key))); };

        keyPressedAll() { return JSON.stringify(getKeysPressed().slice(1)); }
        keyPressedCurrent() { return getKeysPressed().reverse()[0] || "None" };
        keyPressedProperty(args) { const key = _keysPressed[getKeysPressed().reverse()[0]]; return !key ? (args.property === "name" ? "None" : "N/A") : args.property === "name" ? format(key[1], key[2]) : args.property === "time" ? (Date.now() - key[0]) / 1000 : args.property === "code" ? key[1] : key[2]; }

        keyPressedTime(args) { return getKeysPressed().includes(args.key) ? (Date.now() - _keysPressed[args.key][0]) / 1000 : 0 };
        keyPressedMultipleTime(args) { return JSON.stringify(_parseKeys(args.keys).map(k => (_keysPressed[k] ? (Date.now() - _keysPressed[k][0]) / 1000 : 0))); }
    };
    Scratch.extensions.register(new enderKeysPlus());
})(Scratch);