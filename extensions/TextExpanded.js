// Name : Text Expanded
// ID : enderText
// Description : Improved Text (by CST1229) extension + some new blocks
// Version : 1.0.0
// Author : EnderStudio
// License : MIT & LGPL-3.0

(function(Scratch) {
    "use strict";
    if (!Scratch.extensions.unsandboxed) throw new Error("Text Expanded must run unsandboxed!");

    const createLabel = (text, hide) => ({ blockType: Scratch.BlockType.LABEL, text: text, hideFromPalette: hide })
    const format = mode => String(mode).toLowerCase().replace(/\s/g, "")

    const scratchRegenReporter = [ "enderText_textForLetterGet", "enderText_textForLetterIndex" ];
    if (Scratch.gui) Scratch.gui.getBlockly().then(ScratchBlocks => {
        const originalCheck = ScratchBlocks.scratchBlocksUtils.isShadowArgumentReporter;
        ScratchBlocks.scratchBlocksUtils.isShadowArgumentReporter = function (block) {
        const result = originalCheck(block);
      return result ? true : block.isShadow() && scratchRegenReporter.includes(block.type);
    };});

    class enderText {
        constructor() {
            this.compatTempVar = !Scratch.vm.extensionManager.isExtensionLoaded("lmsTempVars2")
            Scratch.vm.runtime.on("EXTENSION_ADDED", info => { if (info.id === "lmsTempVars2") { this.compatTempVar = false; Scratch.vm.extensionManager.refreshBlocks(); } } );
        }
        getInfo() {
            return {
                id: "enderText",
                name: "Text Expanded",
                blocks: [
                    { opcode: "textWith", blockType: Scratch.BlockType.BOOLEAN, text: "[text] [mode] with [substring] ?", arguments: { text: { type: Scratch.ArgumentType.STRING, defaultValue: "apple" }, substring: { type: Scratch.ArgumentType.STRING, defaultValue: "app" }, mode: { type: Scratch.ArgumentType.STRING, menu: "textWith" } } },
                    { opcode: "isIdentical", blockType: Scratch.BlockType.BOOLEAN, text: "is [a] identical to [b] ?", arguments: { a: { type: Scratch.ArgumentType.STRING, defaultValue: "A" }, b: { type: Scratch.ArgumentType.STRING, defaultValue: "a" } } },
                    { opcode: "isString", blockType: Scratch.BlockType.BOOLEAN, text: "is [text] text?", arguments: { text: { type: Scratch.ArgumentType.STRING, defaultValue: "apple" } } },
                    "---",
                    { opcode: "textToString", blockType: Scratch.BlockType.REPORTER, text: "[text] as string", arguments: { text: { type: Scratch.ArgumentType.STRING } } },
                    { opcode: "stringToText", blockType: Scratch.BlockType.REPORTER, text: "\"[text]\"  as text", arguments: { text: { type: Scratch.ArgumentType.STRING } } },
                    "---",
                    { opcode: "textLettersFromTo", blockType: Scratch.BlockType.REPORTER, text: "letters [from] to [to] of [text]", arguments: {  text: { type: Scratch.ArgumentType.STRING, defaultValue: "Hello World!" }, from: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1}, to: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 } } },
                    { opcode: "textItemSplitBy", blockType: Scratch.BlockType.REPORTER, text: "item [item] of [text] split by [delimiter]", arguments: { text: { type: Scratch.ArgumentType.STRING, defaultValue: "apple|banana" }, item: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 }, delimiter: { type: Scratch.ArgumentType.STRING, defaultValue: "|" } } },
                    { opcode: "textCountSubstring", blockType: Scratch.BlockType.REPORTER, text: "count [substring] in [text]", arguments: { text: { type: Scratch.ArgumentType.STRING, defaultValue: "apple" }, substring: { type: Scratch.ArgumentType.STRING, defaultValue: "p" } } },
                    { opcode: "textIndexOf", blockType: Scratch.BlockType.REPORTER, text: "index # [index] of [substring] in [text]", arguments: { text: { type: Scratch.ArgumentType.STRING, defaultValue: "apple" }, substring: { type: Scratch.ArgumentType.STRING, defaultValue: "p" }, index: { type: Scratch.ArgumentType.NUMBER, defaultValue: "2" } } },
                    { opcode: "textInsert", blockType: Scratch.BlockType.REPORTER, text: "insert [substring] [mode] [index] in [text]", arguments: { text: { type: Scratch.ArgumentType.STRING }, substring: { type: Scratch.ArgumentType.STRING }, mode: { type: Scratch.ArgumentType.STRING, menu: "textInsert" }, index: { type: Scratch.ArgumentType.NUMBER } } },
                    { opcode: "textPad", blockType: Scratch.BlockType.REPORTER, text: "pad [text] at [mode] with [fill] at length [length]", arguments: { text: { type: Scratch.ArgumentType.STRING }, fill: { type: Scratch.ArgumentType.STRING }, length: { type: Scratch.ArgumentType.NUMBER }, mode: { type: Scratch.ArgumentType.STRING, menu: "textSide" } } },
                    "---",
                    { opcode: "textReplace", blockType: Scratch.BlockType.REPORTER, text: "replace [substring] # [index] of [text] with [replacement]", arguments: { text: { type: Scratch.ArgumentType.STRING }, substring: { type: Scratch.ArgumentType.STRING }, replacement: { type: Scratch.ArgumentType.STRING }, index: { type: Scratch.ArgumentType.NUMBER } } },
                    { opcode: "textReplaceFromTo", blockType: Scratch.BlockType.REPORTER, text: "replace [substring] # [from] to # [to] of [text] with [replacement]", arguments: { text: { type: Scratch.ArgumentType.STRING }, substring: { type: Scratch.ArgumentType.STRING }, replacement: { type: Scratch.ArgumentType.STRING }, from: { type: Scratch.ArgumentType.NUMBER }, to: { type: Scratch.ArgumentType.NUMBER } } },
                    { opcode: "textReplaceAll", blockType: Scratch.BlockType.REPORTER, text: "replace all [substring] in [text] with [replacement]", arguments: { text: { type: Scratch.ArgumentType.STRING }, substring: { type: Scratch.ArgumentType.STRING }, replacement: { type: Scratch.ArgumentType.STRING } } },
                    "---",

                    { opcode: "textRepeat", blockType: Scratch.BlockType.REPORTER, text: "repeat [text] [count] times", arguments: { text: { type: Scratch.ArgumentType.STRING, defaultValue: "Hello" }, count: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 } } },
                    { opcode: "textTrim", blockType: Scratch.BlockType.REPORTER, text: "trim [text] at [side]", arguments: { text: { type: Scratch.ArgumentType.STRING, defaultValue: "  apple & banana  "}, side: { type: Scratch.BlockType.STRING, menu: "textSide" } } },
                    { opcode: "textTrimAll", blockType: Scratch.BlockType.REPORTER, text: "trim all whitespaces in [text]", arguments: { text: { type: Scratch.ArgumentType.STRING, defaultValue: "   apple  &   banana  "} } },
                    { opcode: "textReverse", blockType: Scratch.BlockType.REPORTER, text: "reverse [text]", arguments: { text: { type: Scratch.ArgumentType.STRING, defaultValue: "oidutSrednE"} } },
                    { opcode: "textShuffle", blockType: Scratch.BlockType.REPORTER, text: "shuffle [text]", arguments: { text: { type: Scratch.ArgumentType.STRING, defaultValue: "EnderStudio"} } },
                    { opcode: "textExtract", blockType: Scratch.BlockType.REPORTER, text: "[type] from [text]", arguments: { text: { type: Scratch.ArgumentType.STRING, defaultValue: "abc@123.456" }, type: { type: Scratch.ArgumentType.STRING, menu: "textExtract" } } },
                    "---",
                    { opcode: "textIsCase", blockType: Scratch.BlockType.BOOLEAN, text: "is [text] [case] ?", arguments: { text: { type: Scratch.ArgumentType.STRING, defaultValue: "Hello World!" }, case: { type: Scratch.ArgumentType.STRING, menu: "textCase" } } },
                    { opcode: "textIsNamingConvention", blockType: Scratch.BlockType.BOOLEAN, text: "is [text] [case] ?", arguments: { text: { type: Scratch.ArgumentType.STRING, defaultValue: "Hello World!" }, case: { type: Scratch.ArgumentType.STRING, menu: "textNamingConvention" } } },
                    "---",
                    { opcode: "textToCase", blockType: Scratch.BlockType.REPORTER, text: "convert [text] to [case]", arguments: { text: { type: Scratch.ArgumentType.STRING, defaultValue: "Hello World!" }, case: { type: Scratch.ArgumentType.STRING, menu: "textCase" } } },
                    { opcode: "textToNamingConvention", blockType: Scratch.BlockType.REPORTER, text: "convert [text] to [case]", arguments: { text: { type: Scratch.ArgumentType.STRING, defaultValue: "Hello World!" }, case: { type: Scratch.ArgumentType.STRING, menu: "textNamingConvention" } } },
                    "---",
                    { blockType: Scratch.BlockType.XML, xml: `<block type="enderText_textForLetter"><value name="letter"> <shadow type="enderText_textForLetterGet"></shadow></value><value name="index"> <shadow type="enderText_textForLetterIndex"></shadow></value><value name="text"> <shadow type="text"><field name="TEXT">banana</field></shadow></value></block>` },
                    { opcode: "textForLetter", blockType: Scratch.BlockType.LOOP, text: "for each [letter] [index] in [text]", hideFromPalette: true, arguments: { letter: {}, text: { type: Scratch.ArgumentType.STRING, defaultValue: "banana"} } },
                    { opcode: "textForLetterGet", blockType: Scratch.BlockType.REPORTER, hideFromPalette: true, text: "letter" },
                    { opcode: "textForLetterIndex", blockType: Scratch.BlockType.REPORTER, hideFromPalette: true, text: "index" },
                    createLabel("Literals", false),
                    { opcode: "literalBasic", blockType: Scratch.BlockType.REPORTER, text: "`[input]`", arguments: { input: { type: Scratch.ArgumentType.STRING } } },
                    createLabel("Unicode", false),
                    { opcode: "textTextToUnicode", blockType: Scratch.BlockType.REPORTER, text: "unicode of [text]", arguments: { text: { type: Scratch.ArgumentType.STRING, defaultValue: "Hello World!" } } },
                    { opcode: "textUnicodeToText", blockType: Scratch.BlockType.REPORTER, text: "text of [unicode]", arguments: { unicode: { type: Scratch.ArgumentType.STRING, defaultValue: "72 101 108 108 111 32 87 111 114 108 100 33" } } },
                    createLabel("Regex", false),
                    { opcode: "regexTest", blockType: Scratch.BlockType.BOOLEAN, text: "[text] matches regex /[regex]/[flags] ?", arguments: { text: { type: Scratch.ArgumentType.STRING }, regex: { type: Scratch.ArgumentType.STRING }, flags: { type: Scratch.ArgumentType.STRING } } },
                    "---",
                    { opcode: "regexCount", blockType: Scratch.BlockType.REPORTER, text: "count regex /[regex]/[flags] in [text]", arguments: { text: { type: Scratch.ArgumentType.STRING }, regex: { type: Scratch.ArgumentType.STRING }, flags: { type: Scratch.ArgumentType.STRING } } },
                    { opcode: "regexReplace", blockType: Scratch.BlockType.REPORTER, text: "replace regex /[regex]/[flags] in [text] with [replacement]", arguments: { text: { type: Scratch.ArgumentType.STRING }, regex: { type: Scratch.ArgumentType.STRING }, flags: { type: Scratch.ArgumentType.STRING }, replacement: { type: Scratch.ArgumentType.STRING } } },
                    "---",
                    { opcode: "regexMatch", blockType: Scratch.BlockType.REPORTER, text: "[text] matched by regex /[regex]/[flags]", arguments: { text: { type: Scratch.ArgumentType.STRING }, regex: { type: Scratch.ArgumentType.STRING }, flags: { type: Scratch.ArgumentType.STRING } } },
                    { opcode: "regexMatchItem", blockType: Scratch.BlockType.REPORTER, text: "item # [index] of [text] matched by regex /[regex]/[flags]", arguments: { text: { type: Scratch.ArgumentType.STRING }, regex: { type: Scratch.ArgumentType.STRING }, flags: { type: Scratch.ArgumentType.STRING }, index: { type: Scratch.ArgumentType.STRING } } },
                    createLabel("Compat - Temporary Variables", this.compatTempVar ),
                    createLabel("⤷ Thread Variables", this.compatTempVar ),
                    { opcode: "literalThread", blockType: Scratch.BlockType.REPORTER, text: "`[input]`", arguments: { input: { type: Scratch.ArgumentType.STRING } }, hideFromPalette: this.compatTempVar },
                ],
                menus: {
                    "textSide": { acceptReporters: true, items: [ "start", "end", "both" ] },
                    "textWith" : { acceptReporters: true, items: [ "starts", "ends", "encloses" ] },
                    "textCase": { acceptReporters: true, items: [ "uppercase", "lowercase" ] },
                    "textInsert": { acceptReporters: true, items: [ "before", "at", "after" ] },
                    "textNamingConvention": { acceptReporters: true, items: [ "Title Case", "Exactly Title Case", "AlTeRnAtInG CaSe", "rEvErSe aLtErNaTiNg cAsE", "RanDomLy CasED", "camelCase", "PascalCase", "kebab-case", "snake_case", "camel_Snake_Case", "Pascal_Snake_Case", "SCREAMING_SNAKE_CASE", "Train-Case", "COBOL-CASE", "flatcase", "UPPERFLATCASE" ] },
                    "textExtract": { acceptReporters: true, items: [ "digits", "letters", "special characters", "number" ] }
                }
            };
        }
        textToString(args) { return JSON.stringify([String(args.text)]).slice(1, -1) }
        stringToText(args) { try { const text = String(args.text); return JSON.parse(/^".*"$/.test(text) ? text : `"${text}"`) } catch { return ""; }; };

        textForLetter(args, util) { const text = String(args.text), frame = util.thread.stackFrames[0]; util.stackFrame.index = util.stackFrame.index || 0; if (util.stackFrame.index < text.length) { frame.enderTextLetter = text[util.stackFrame.index]; frame.enderTextIndex = ++util.stackFrame.index; util.startBranch(1, true); }; };
        textForLetterGet(args, util) { return util.thread.stackFrames[0].enderTextLetter || ""; };
        textForLetterIndex(args, util) { return (util.thread.stackFrames[0].enderTextIndex || 0); };

        isString(args) { return typeof args.text === "string" };
        isIdentical(args) { return args.a === args.b; };
        textWith(args) { const mode = format(args.mode), text = String(args.text); return mode === "starts" ? text.startsWith(args.substring) :  mode === "ends" ? text.endsWith(args.substring) : mode === "encloses" ? text.startsWith(args.substring) && text.endsWith(args.substring) : false; };

        textLettersFromTo(args) { return String(args.text).substring(Math.min(args.from, args.to), Math.max(args.from, args.to)); };
        textItemSplitBy(args) { return String(args.text).split(args.delimiter)[args.item - 1] || ""; };
        textCountSubstring(args) { return String(args.text).split(args.substring).length - 1; };
        textIndexOf(args) { return String(args.text).split(args.substring, args.index + 1).join(args.substring).lastIndexOf(args.substring) + 1; };
        
        textRepeat(args) { return String(args.text).repeat(args.count); };
        textReverse(args) { return String(args.text).split("").reverse().join(""); };
        textShuffle(args) { return String(args.text).replace(/\S+/g, match => match.split("").sort(() => Math.random() - 0.5).join("")) }

        textTrim(args) { const side = format(args.side), text = String(args.text); return side === "start" ? text.trimStart() : side === "end" ? text.trimEnd() : side === "both" ? text.trim() : text };
        textTrimAll(args) { return String(args.text).trim().replace(/\s+/g, match => match[0] ) }

        textPad(args) { const text = String(args.text), mode = format(args.mode); return mode === "start" ? text.padStart(args.length, args.fill) : mode === "end" ? text.padEnd(args.length, args.fill) : mode === "both" ? text.padStart(text.length + ((args.length - text.length) / 2), args.fill).padEnd(args.length, args.fill) : args.text; };

        textInsert(args) { const text = String(args.text), mode = format(args.mode), index = Math.max(args.index - (mode === "before" ? 2 : mode === "after" ? 0 : 1), 0); return text.slice(0, index) + String(args.substring) + text.slice(index) }

        textReplaceAll(args) { return String(args.text).replaceAll(args.substring, args.replacement); };
        textReplace(args) { let idx = 0; return String(args.text).replace(new RegExp(args.substring, "g"), (m, i) => { idx++; return idx === args.index || (i === String(args.text).lastIndexOf(args.substring) && idx < args.index) ? args.replacement : m } ) }
        textReplaceFromTo(args) { const from = Math.min(args.from, args.to), to = Math.max(args.from, args.to); let idx = 0; return String(args.text).replace(new RegExp(args.substring, "g"), (m, i) => { idx++; return idx >= from && idx <= to ? args.replacement : m } ) }
        
        textExtract(args) { 
            const text = String(args.text); 
            switch(format(args.type)) { 
                case "digits": return text.replace(/\D+/g, ""); 
                case "letters": return text.replace(/[^a-z]/gi, "");  
                case "special characters": return text.replace(/[^a-z0-9]/gi, ""); 
                case "number": const n = text.replace(/[^-0-9.]/g, "");
                    return n.split("")
                            .filter((c, i) => (c === "-" && i === 0) || (c === "." && i === n.indexOf(".")) || /\d/.test(c))
                            .join("")
                            .replace("-.", "-0.")
                            .replace(/^\./, "0.");
                default: return text;
            };
        };
        // Case/Naming Conventions
        textToCase(args) { const text = String(args.text); switch(format(args.case)) { case "uppercase": return text.toUpperCase(); case "lowercase": return text.toLowerCase(); default: return text; }; };
        textIsCase(args) { const text = String(args.text);  switch(format(args.case)) { case "uppercase": return text === text.toUpperCase(); case "lowercase": return text === text.toLowerCase(); }; };
        textIsNamingConvention(args) { return String(args.text) === this.textToNamingConvention(args); };
        textToNamingConvention(args) {
            const _case = format(args.case);
            let text = String(args.text);
            if (["camel", "snake", "kebab", "pascal", "train", "flat", "exactlytitle"].some(substr => _case.includes(substr))) text = text.toLowerCase();
            if (_case.includes("camel")) text = text.replace(/\b\w/g, (char, index) => index === 0 ? char : char.toUpperCase())
            if (["pascal", "title", "train"].some(substr => _case.includes(substr))) text = text.replace(/\b\w/g, char => char.toUpperCase())
            if (_case.includes("alternating")) { text = text.replace(/./g, (char, index) => (_case.includes("reverse") ? index % 2 !== 0 : index % 2 === 0) ? char.toUpperCase() : char.toLowerCase()); };
            if (_case.includes("snake")) text = text.replace(/\s+/g, "_");
            if (["kebab", "cobol", "train"].some(substr => _case.includes(substr))) text = text.replace(/\s+/g, "-");
            if (["camel", "pascal", "flat"].some(substr => _case.includes(substr))) text = text.replace(/\s+/g, "");
            if (["upper", "screaming", "cobol"].some(substr => _case.includes(substr))) text = text.toUpperCase();
            if (/^glitchedcase:\d+(\.\d+)?%$/.test(_case)) { const power = _case.slice(13, -1); text = text.replace(/./g, (char) => power > Math.random() * 100 ? char.toUpperCase() : char.toLowerCase()) }
            return text;
        };
        // Literals
        literalBasic(args, util) {
            let input = String(args.input)
            let variables = {};
            for (const variable of Object.values(util.runtime.getTargetForStage().variables)) { if (variable.type === "") { variables[variable.name] = variable.value; } }
            for (const variable of Object.values(util.target.variables)) { if (variable.type === "") { variables[variable.name] = variable.value; } }
            const match = input.match(/\$\{.*?\}+/g) || []
            for (let i = 0; i < match.length; i++) {
                const name = match[i]
                input = input.replace(name, variables[name.slice(2, -1)] )
            }
            return input
        }
        literalThread(args, util) {
            let input = String(args.input)
            if (!util.thread.variables) util.thread.variables = {};
            const variables = util.thread.variables;
            for (let i = 0; i < Object.keys(variables).length; i++) {
                const name = Object.keys(variables)[i]
                input = input.replace("${" + name + "}", variables[name])
            }
            return input
        }
        // Unicodes
        textTextToUnicode(args) { return String(args.text).split("").map(char => char.charCodeAt(0)).join(" "); };
        textUnicodeToText(args) { return String(args.unicode).split(" ").map(value => String.fromCharCode(value)).join(""); };
        // Regex
        _regexMatch(args) { try { return String(args.text).match(new RegExp(args.regex, args.flags)) || [] } catch { return [] } }
        regexTest(args) { try { return new RegExp(args.regex, args.flags).test(String(args.text)); } catch { return false } };
        regexCount(args) { return this._regexMatch(args).length }
        regexReplace(args) { try { return String(args.text).replace(new RegExp(args.regex, args.flags), args.replacement); } catch { return "" } };
        regexMatch(args) { return JSON.stringify(this._regexMatch(args)); };
        regexMatchItem(args) { return this._regexMatch(args)[args.index] || ""; };

    };
    Scratch.extensions.register(new enderText);
})(Scratch);