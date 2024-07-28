(function(Scratch){
    "use strict";

    if (!Scratch.extensions.unsandboxed) throw new Error("DataTypes must run unsandboxed");

    const bi = (n) => {
        if (typeof n === "bigint") return n;
        if (typeof n === "string") {
            if (n.endsWith("n")) try { BigInt(n.slice(0, -1)) } catch {}
            try { BigInt(n.split('.')[0]); } catch { return 0n; };
        }
        try { return BigInt(Math.trunc(n)); } catch { return 0n; };
    };
    
    class enderDataTypes {
        getInfo() {
            return {
                id: "enderDataTypes",
                name: "DataTypes",
                color1: "#39977b",
                color2: "#163e3f",
                blocks: [
                    { blockType: Scratch.BlockType.LABEL, text: "Default" },
                    { opcode: "typeOf", blockType: Scratch.BlockType.REPORTER, text: "type of [input]", arguments: { input: { type: Scratch.ArgumentType.STRING } } },
                    { opcode: "castToString", blockType: Scratch.BlockType.REPORTER, text: "String [input]", arguments: { input: { type: Scratch.ArgumentType.STRING } } },
                    { opcode: "castToNumber", blockType: Scratch.BlockType.REPORTER, text: "Number [input]", arguments: { input: { type: Scratch.ArgumentType.STRING } } },
                    { opcode: "castToBoolean", blockType: Scratch.BlockType.REPORTER, text: "Boolean [input]", arguments: { input: { type: Scratch.ArgumentType.STRING } } },
                    { opcode: "castToBigInt", blockType: Scratch.BlockType.REPORTER, text: "BigInt [input]", arguments: { input: { type: Scratch.ArgumentType.STRING } } },
                    { opcode: "castToObject", blockType: Scratch.BlockType.REPORTER, text: "Object [input]", arguments: { input: { type: Scratch.ArgumentType.STRING } } },
                    { opcode: "castToSymbol", blockType: Scratch.BlockType.REPORTER, text: "Symbol [input]", arguments: { input: { type: Scratch.ArgumentType.STRING } } },
                    { opcode: "undefined", blockType: Scratch.BlockType.REPORTER, text: "undefined", disableMonitor: true },
                    { blockType: Scratch.BlockType.LABEL, text: "Scratch" },
                    { opcode: "scratchTypeOf", blockType: Scratch.BlockType.REPORTER, text: "［Scratch］type of [input]", arguments: { input: { type: Scratch.ArgumentType.STRING } } },
                    { opcode: "scratchCastToString", blockType: Scratch.BlockType.REPORTER, text: "［Scratch］cast to string [input]", arguments: { input: { type: Scratch.ArgumentType.STRING } } },
                    { opcode: "scratchCastToNumber", blockType: Scratch.BlockType.REPORTER, text: "［Scratch］cast to number [input]", arguments: { input: { type: Scratch.ArgumentType.STRING } } },
                    { opcode: "scratchCastToBoolean", blockType: Scratch.BlockType.REPORTER, text: "［Scratch］cast to boolean [input]", arguments: { input: { type: Scratch.ArgumentType.STRING } } },
                ]
            }
        }
        typeOf(args) { return typeof args.input };
        castToString(args) { return String(args.input); };
        castToNumber(args) { return Number(args.input); };
        castToBoolean(args) { return Boolean(args.input); };
        castToBigInt(args) { return bi(args.input); };
        castToObject(args) { try { return JSON.parse(args.input); } catch { return {} } };
        castToSymbol(args) { return Symbol(args.input); };
        undefined() { return undefined }
        
        scratchTypeOf(args) { return ["string", "number", "boolean"].includes(typeof args.input)? typeof args.input : "undefined"; };
        scratchCastToString(args) { return Scratch.Cast.toString(args.input); };
        scratchCastToNumber(args) { return Scratch.Cast.toNumber(args.input); };
        scratchCastToBoolean(args) { return Scratch.Cast.toBoolean(args.input); };
    }
    Scratch.extensions.register(new enderDataTypes())
})(Scratch)