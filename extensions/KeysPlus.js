// Name : Keys+
// ID : enderKeysPlus
// Description : more powerful key sensing blocks.
// Version : 1.1
// Author : Ender-Studio
// License : MIT & LGPL-3.0

(function(Scratch){
    "use strict";

    if (!Scratch.extensions.unsandboxed) throw new Error("Keys+ must run unsandboxed");

    const runtime = Scratch.vm.runtime

    const _formatToValue = [ "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Digit0", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "KeyA", "KeyB", "KeyC", "KeyD", "KeyE", "KeyF", "KeyG", "KeyH", "KeyI", "KeyJ", "KeyK", "KeyL", "KeyM", "KeyN", "KeyO", "KeyP", "KeyQ", "KeyR", "KeyS", "KeyT", "KeyU", "KeyV", "KeyW", "KeyX", "KeyY", "KeyZ", "Backquote", "Minus", "Equal", "BracketLeft", "BracketRight", "Backslash", "Semicolon", "Quote", "Comma", "Period", "Slash" ],
          _formatReverseOrder = [ "Meta", "Control", "Shift", "Alt", "Arrow"]
    let _keysPressed = {}, _keybinds = {}, _filter = { name: {}, value: {} };

    const format = (_key, _value) => { if (_formatToValue.includes(_key)) return "_" + _value; let key = _key.split(/(?=[A-Z0-9])/); key = _formatReverseOrder.some(item => key.includes(item)) ? key.reverse().join(" ").replace("Meta", "Windows Key") : key.join(" ").replace("Numpad", "Numpad:"); return "_" + key.toLowerCase(); };
    const _parseKeys = (_keys) => { try { return JSON.parse(/^\[.*\]$/.test(_keys) ? _keys : `[${_keys}]`); } catch {  return []; } };
    const parseKeys = (_keys) => { const keys = [...new Set(_parseKeys(_keys))]; return keys.includes("any") ? ["any"].concat(keys.filter(k => k != "any")) : keys }
    const getKeysPressed = () => Object.keys(_keysPressed).map(key => key.slice(1));

    const refresh = () => { if (!Object.keys(_filter.name).length || !Object.keys(_filter.value).length) { _filter = { name: {}, value: {} }; _keysPressed = {} } else if (!_keysPressed["_any"]) _keysPressed = {"_any": [Date.now(), "N/A", "N/A"], ..._keysPressed} };
    
    class enderKeysPlus {
        constructor() {
            runtime.on("BEFORE_EXECUTE", () => { runtime.startHats("enderKeysPlus_eventWhileKeyPressed"); runtime.startHats("enderKeysPlus_eventWhileKeyPressedMultiple"); runtime.startHats("enderKeysPlus_eventKeybindWhileTriggered")})
            window.addEventListener("keydown", (event) => { _filter.name[event.code] = true; _filter.value[event.key] = true; if (!_keysPressed[format(event.code, event.key)]) _keysPressed[format(event.code, event.key)] = [ Date.now(), event.code, event.key] ; refresh() })
            window.addEventListener("keyup", (event) => { delete _filter.name[event.code]; delete _filter.value[event.key]; delete _keysPressed[format(event.code, event.key)]; refresh() })
            window.addEventListener("blur", () => { _filter = { name: {}, value: {} }; _keysPressed = {}})
        };
        getInfo() {
            return {
                id: "enderKeysPlus",
                name: "Keys+",
                color1: "#647970",
                color2: "#4D5E56",
                blocks: [
                    { opcode: "eventWhileKeyPressed", blockType: Scratch.BlockType.HAT, text: "while [key] key is pressed", isEdgeActivated: false, arguments: { key: { type: Scratch.ArgumentType.STRING, menu: "keys" } } },
                    { opcode: "eventWhileKeyPressedMultiple", blockType: Scratch.BlockType.HAT, text: "while ［[keys]］ keys is pressed [mode]", isEdgeActivated: false, arguments: { keys: { type: Scratch.ArgumentType.STRING }, mode: { type: Scratch.ArgumentType.STRING, menu: "triggerMode" } } },
                    { opcode: "eventWhenKeyPressed", blockType: Scratch.BlockType.HAT, text: "when [key] key is pressed", arguments: { key: { type: Scratch.ArgumentType.STRING, menu: "keys" } } },
                    { opcode: "eventWhenKeyPressedMultiple", blockType: Scratch.BlockType.HAT, text: "when ［[keys]］ keys is pressed [mode]", arguments: { keys: { type: Scratch.ArgumentType.STRING }, mode: { type: Scratch.ArgumentType.STRING, menu: "triggerMode" } } },
                    "---",
                    { opcode: "isKeyPressed", blockType: Scratch.BlockType.BOOLEAN, text: "is [key] key pressed?", arguments: { key: { type: Scratch.ArgumentType.STRING, menu: "keys" } } },
                    { opcode: "isKeyPressedMultiple", blockType: Scratch.BlockType.BOOLEAN, text: "are ［[keys]］ keys pressed? [mode]", arguments: { keys: { type: Scratch.ArgumentType.STRING }, mode: { type: Scratch.ArgumentType.STRING, menu: "returnMode" } } },
                    "---",
                    { opcode: "keyPressedAll", blockType: Scratch.BlockType.REPORTER, text: "current keys pressed" },
                    { opcode: "keyPressedCurrent", blockType: Scratch.BlockType.REPORTER, text: "current key pressed" },
                    { opcode: "keyPressedProperty", blockType: Scratch.BlockType.REPORTER, text: "current key pressed [property]", disableMonitor: true, arguments: { property: { type: Scratch.ArgumentType.STRING, menu: "property" } } },
                    "---",
                    { opcode: "keyPressedTime", blockType: Scratch.BlockType.REPORTER, text: "time [key] key pressed", arguments: { key: { type: Scratch.ArgumentType.STRING, menu: "keys" } } },
                    { opcode: "keyPressedMultipleTime", blockType: Scratch.BlockType.REPORTER, text: "time ［[keys]］ keys pressed", arguments: { keys: { type: Scratch.ArgumentType.STRING } } },
                    { blockType: Scratch.BlockType.LABEL, text: "Keybinding" },
                    { opcode: "eventKeybindWhileTriggered", blockType: Scratch.BlockType.HAT, text: "while [event] is triggered", isEdgeActivated: false, arguments: { event: { type: Scratch.ArgumentType.STRING, defaultValue: "event"  } } },
                    { opcode: "eventKeybindWhenTriggered", blockType: Scratch.BlockType.HAT, text: "when [event] is triggered", arguments: { event: { type: Scratch.ArgumentType.STRING, defaultValue: "event"  } } },
                    { opcode: "keybindTriggered", blockType: Scratch.BlockType.BOOLEAN, text: "is [event] triggered?", arguments: { event: { type: Scratch.ArgumentType.STRING, defaultValue: "event"  } } },
                    "---",
                    { opcode: "keybindBind", blockType: Scratch.BlockType.COMMAND, text: "bind [key] key as [group] to [event]", arguments: { event: { type: Scratch.ArgumentType.STRING, defaultValue: "event"  }, group: { type: Scratch.ArgumentType.STRING, defaultValue: "group" }, key: { type: Scratch.ArgumentType.STRING, menu: "keys" } } },
                    { opcode: "keybindBindMultiple", blockType: Scratch.BlockType.COMMAND, text: "bind ［[keys]］ keys [mode] as [group] to [event]", arguments: { event: { type: Scratch.ArgumentType.STRING, defaultValue: "event" }, mode: { type: Scratch.ArgumentType.STRING, menu: "triggerMode"}, group: { type: Scratch.ArgumentType.STRING, defaultValue: "group" }, keys: { type: Scratch.ArgumentType.STRING } } },
                    { opcode: "keybindUnbind", blockType: Scratch.BlockType.COMMAND, text: "unbind [group] from [event]", arguments: { event: { type: Scratch.ArgumentType.STRING, defaultValue: "event" }, group: { type: Scratch.ArgumentType.STRING, defaultValue: "group" } } },
                    "---",
                    { opcode: "keybindReset", blockType: Scratch.BlockType.COMMAND, text: "reset binds of [event]", arguments: { event: { type: Scratch.ArgumentType.STRING, defaultValue: "event" } } },
                    { opcode: "keybindResetAll", blockType: Scratch.BlockType.COMMAND, text: "reset all keybinds" },
                    "---",
                    { opcode: "keybindListGroups", blockType: Scratch.BlockType.REPORTER, text: "list all groups in [event]", arguments: { event: { type: Scratch.ArgumentType.STRING, defaultValue: "event" } } },
                    { opcode: "keybindListGroupKeys", blockType: Scratch.BlockType.REPORTER, text: "keys binded to [group] in [event]", arguments: { event: { type: Scratch.ArgumentType.STRING, defaultValue: "event" }, group: { type: Scratch.ArgumentType.STRING, defaultValue: "group" } } },
                    "---",
                    { opcode: "keybindList", blockType: Scratch.BlockType.REPORTER, text: "list all keybindings" },
                    { opcode: "keybindListActive", blockType: Scratch.BlockType.REPORTER, text: "active keybindings" },
                    "---",
                    { opcode: "keybindImport", blockType: Scratch.BlockType.COMMAND, text: "import keybinds from: [input]", arguments: { input: { type: Scratch.ArgumentType.STRING } } },
                    { opcode: "keybindExport", blockType: Scratch.BlockType.REPORTER, text: "export all keybinds", disableMonitor: true },
                ],
                menus: {
                    keys: { acceptReporters: true, items: [ "space", "up arrow", "down arrow", "right arrow", "left arrow", "backspace", "enter", "any", "right shift", "left shift", "right control", "left control", "right alt", "left alt", "right windows key", "left windows key", "context menu", "escape", "tab", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "+", "=", "[", "]", "{", "}", "\\", "|", ";", ":", "'", "\"", ",", ".", "/", "?", "<", ">", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "caps lock", "scroll lock", "num lock", "insert", "delete", "home", "end", "page up", "page down", "numpad: divide", "numpad: multiply", "numpad: subtract", "numpad: add", "numpad: 0", "numpad: 1", "numpad: 2", "numpad: 3", "numpad: 4", "numpad: 5", "numpad: 6", "numpad: 7", "numpad: 8", "numpad: 9", "numpad: decimal", "numpad: enter" ] },
                    triggerMode: { items: [ { text:"together & in order", value: "true" }, { text: "together & ignore order", value: "false" } ] },
                    returnMode: { items: [ "together & in order", "together & ignore order", "individually"] },
                    property: { items: [ "time", "code", "value", "name"] }
                }
            };
        };
        // Helper Functions
        _isKeysPressed(keys, ordered) { if (keys.length === 0) return false; return ordered ? getKeysPressed().filter(k => keys.includes(k)).join("|") === keys.join("|") : keys.every(key => getKeysPressed().includes(key))}
        _shouldKeybindTrigger(event) { return Object.values(_keybinds[event] || []).some(keys => this._isKeysPressed(keys.filter(key => key !== "@IgnoreOrder"), !keys.includes("@IgnoreOrder")) ) }
        // KeysPlus
        eventWhileKeyPressed(args) { return getKeysPressed().includes(String(args.key)) }
        eventWhileKeyPressedMultiple(args) { const k = parseKeys(args.keys); return this._isKeysPressed(k, Boolean(args.mode)) }
        eventWhenKeyPressed(args) { return getKeysPressed().includes(String(args.key)) }
        eventWhenKeyPressedMultiple(args) { const k = parseKeys(args.keys); return this._isKeysPressed(k, Boolean(args.mode)) }

        isKeyPressed(args) { return getKeysPressed().includes(String(args.key)) }
        isKeyPressedMultiple(args) { const k = parseKeys(args.keys); return args.mode === "together & in order" ? this._isKeysPressed(k, true) : args.mode === "together & ignore order" ? this._isKeysPressed(k, false) : JSON.stringify(_parseKeys(args.keys).map(key => getKeysPressed().includes(key))); };

        keyPressedAll() { return JSON.stringify(getKeysPressed().slice(1)); };
        keyPressedCurrent() { return getKeysPressed().reverse()[0] || "None" };
        keyPressedProperty(args) { const key = _keysPressed["_" + getKeysPressed().reverse()[0]]; return !key ? (args.property === "name" ? "None" : "N/A") : args.property === "name" ? format(key[1], key[2]).slice(1) : args.property === "time" ? (Date.now() - key[0]) / 1000 : args.property === "code" ? key[1] : key[2]; }

        keyPressedTime(args) { return getKeysPressed().includes(args.key) ? (Date.now() - _keysPressed["_" + String(args.key)][0]) / 1000 : 0 };
        keyPressedMultipleTime(args) { return JSON.stringify(_parseKeys(args.keys).map(k => (_keysPressed["_" + k] ? (Date.now() - _keysPressed["_" + k][0]) / 1000 : 0))); }
        // Keybinding
        eventKeybindWhileTriggered(args) { return this._shouldKeybindTrigger(args.event) }
        eventKeybindWhenTriggered(args) { return this._shouldKeybindTrigger(args.event) }
        keybindTriggered(args) { return this._shouldKeybindTrigger(args.event) }

        keybindBind(args) { if (!_keybinds[args.event]) _keybinds[args.event] = {}; _keybinds[args.event][args.group] = [String(args.key)] }
        keybindBindMultiple(args) { if (!_keybinds[args.event]) _keybinds[args.event] = {}; _keybinds[args.event][args.group] = Scratch.Cast.toBoolean(args.mode) ? parseKeys(args.keys) : parseKeys(args.keys).concat("@IgnoreOrder") }
        keybindUnbind(args) { delete _keybinds[args.event][args.group] }
        keybindReset(args) { delete _keybinds[args.event] }
        keybindResetAll() { _keybinds = {} }

        keybindListGroupKeys(args) { return JSON.stringify((_keybinds[args.event]?.[args.group] || []).filter(k => k !== "@IgnoreOrder")); } 
        keybindListGroups(args) { return JSON.stringify(Object.keys(_keybinds[args.event] || {})) }
        keybindList() { return JSON.stringify(Object.keys(_keybinds)) }
        keybindListActive() { return JSON.stringify(Object.keys(_keybinds).filter(e => this._shouldKeybindTrigger(e))) }

        keybindExport() { return JSON.stringify(_keybinds) }
        keybindImport(args) {
            let i = args.input; try { i = JSON.parse(i); } catch { console.error("Keys+ : Invalid Object."); return; };
            if (typeof i !== "object") { console.error("Keys+ : Invalid Object."); return; }
            else if (Array.isArray(i)) { console.error("Keys+ : Input cannot be an Array."); return; };
            for (const e in i) {
                if (typeof i[e] !== "object" || Array.isArray(i[e])) { console.error(`Keys+ : [./${e}] invalid or missing group.`); return; };
                for (const g in i[e]) { if (!Array.isArray(i[e][g])) { console.error(`Keys+ : [./${e}/${g}] must be an array.`); return; };
                if (!i[e][g].every(key => typeof key === "string")) { console.error(`Keys+ : [./${e}/${g}] contains non-string inputs.`); return; }; };
            }
            _keybinds = i
        }
    };
    Scratch.extensions.register(new enderKeysPlus());
})(Scratch);