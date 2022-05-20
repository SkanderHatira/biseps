this.webpackChunk([0],{1004:function(t,e,n){"use strict";var r=n(27),i=r(n(111)),a=r(n(112)),o=r(n(1050)),c=r(n(405)),s=r(n(655)),u=r(n(411)),f=r(n(656));function l(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var h=n(1005),d=function(t){(0,c.default)(r,t);var e,n=(e=r,function(){var t,n=(0,u.default)(e);if(l()){var r=(0,u.default)(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return(0,s.default)(this,t)});function r(t){var e,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{checkIndent:!0};(0,i.default)(this,r),e=n.call(this);var o,c=a.checkIndent;return e._checkIndent=c,o="string"===typeof t?t.trimEnd().split(/(?:[\t ]*\r?\n){2,}/):t||[],e._stanzaAndCommentOrder=[],o.forEach((function(t){e.add(t)})),e}return(0,a.default)(r,[{key:"add",value:function(t){if(""===t)throw new Error("Invalid stanza, was empty");if(t.trim().startsWith("#")){var e=t.trimEnd().split(/\r?\n/).map((function(t){return t.trim()}));if(e.every((function(t){return t.startsWith("#")})))return this._stanzaAndCommentOrder.push(e.join("\n")),this}var n=new h(t,{checkIndent:this._checkIndent});if(this.nameKey){if(n.nameKey!==this.nameKey)throw new Error("The first line in each stanza must have the same key. "+"Saw both ".concat(this.nameKey," and ").concat(n.nameKey))}else this.nameKey=n.nameKey;if(this.has(n.name))throw new Error("Got duplicate stanza name: ".concat(n.name));return this._stanzaAndCommentOrder.push(n.name),(0,o.default)((0,u.default)(r.prototype),"set",this).call(this,n.name,n)}},{key:"update",value:function(t,e){if(!(e instanceof h))throw new Error("Value of ".concat(t," is not an RaStanza"));(0,o.default)((0,u.default)(r.prototype),"set",this).call(this,t,e)}},{key:"delete",value:function(t){return this._stanzaAndCommentOrder.includes(t)&&(this._stanzaAndCommentOrder=this._stanzaAndCommentOrder.filter((function(e){return e!==t}))),(0,o.default)((0,u.default)(r.prototype),"delete",this).call(this,t)}},{key:"clear",value:function(){this._stanzaAndCommentOrder.length=0,this.nameKey=void 0,(0,o.default)((0,u.default)(r.prototype),"clear",this).call(this)}},{key:"toString",value:function(){var t=this;if(0===this.size)return"";var e=[];return this._stanzaAndCommentOrder.forEach((function(n){n.startsWith("#")?e.push("".concat(n,"\n")):e.push(t.get(n).toString())})),e.join("\n")}}]),r}((0,f.default)(Map));t.exports=d},1005:function(t,e,n){"use strict";var r=n(27),i=r(n(427)),a=r(n(247)),o=r(n(111)),c=r(n(112)),s=r(n(1050)),u=r(n(405)),f=r(n(655)),l=r(n(411)),h=r(n(656));function d(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}n(1190);var p=function(t){(0,u.default)(r,t);var e,n=(e=r,function(){var t,n=(0,l.default)(e);if(d()){var r=(0,l.default)(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return(0,f.default)(this,t)});function r(t){var e,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{checkIndent:!0};(0,o.default)(this,r),e=n.call(this);var a,c=i.checkIndent;return e._checkIndent=c,a="string"===typeof t?t.trimEnd().split(/\r?\n/):t||[],e._keyAndCommentOrder=[],a.forEach((function(t){e.add(t)})),e}return(0,c.default)(r,[{key:"add",value:function(t){if(""===t)throw new Error("Invalid stanza, contained blank lines");if(t.trim().startsWith("#"))return this._keyAndCommentOrder.push(t.trim()),this;if(t.trimEnd().endsWith("\\")){var e=t.trimEnd().slice(0,-1);return this._continuedLine?this._continuedLine+=e.trimStart():this._continuedLine=e,this}var n=t;if(this._continuedLine&&(n=this._continuedLine+n.trimStart(),this._continuedLine=void 0),this.indent||this._checkIndent){var i=n.match(/^([ \t]+)/);if(void 0===this.indent)if(i){var o=(0,a.default)(i,2);this.indent=o[1]}else this.indent="";else if(""===this.indent&&null!==i||this.indent&&this.indent!==i[1])throw new Error("Inconsistent indentation of stanza")}else this.indent="";var c=n.trim(),u=c.indexOf(" ");if(-1===u){if(!this.nameKey)throw new Error("First line in a stanza must have both a key and a value");return this.has(c)?this:(this._keyAndCommentOrder.push(c),(0,s.default)((0,l.default)(r.prototype),"set",this).call(this,c,""))}var f=c.slice(0,u),h=c.slice(u+1);if(this.has(f)&&h!==this.get(f))throw new Error("Got duplicate key with a different value in stanza: "+'"'.concat(f,'" key has both ').concat(this.get(f)," and ").concat(h));return this._keyAndCommentOrder.push(f),this.nameKey||(this.nameKey=f,this.name=c.slice(u+1)),(0,s.default)((0,l.default)(r.prototype),"set",this).call(this,f,h)}},{key:"set",value:function(t,e){if("string"!==typeof e)throw new Error("Value of ".concat(t," must be a string, got ").concat((0,i.default)(e)));return(0,s.default)((0,l.default)(r.prototype),"set",this).call(this,t,e)}},{key:"delete",value:function(t){if(t===this.nameKey)throw new Error("Cannot delete the first line in a stanza (you can still overwrite it with set()).");return this._keyAndCommentOrder.includes(t)&&(this._keyAndCommentOrder=this._keyAndCommentOrder.filter((function(e){return e!==t}))),(0,s.default)((0,l.default)(r.prototype),"delete",this).call(this,t)}},{key:"clear",value:function(){this._keyAndCommentOrder.length=0,this._continuedLine=void 0,this.indent=void 0,this.name=void 0,this.nameKey=void 0,(0,s.default)((0,l.default)(r.prototype),"clear",this).call(this)}},{key:"toString",value:function(){var t=this;if(0===this.size)return"";var e=[];return this._keyAndCommentOrder.forEach((function(n){n.startsWith("#")?e.push("".concat(t.indent).concat(n)):e.push("".concat(t.indent).concat(n," ").concat(t.get(n)).trimEnd())})),"".concat(e.join("\n"),"\n")}}]),r}((0,h.default)(Map));t.exports=p},1050:function(t,e,n){var r=n(1189);function i(){return"undefined"!==typeof Reflect&&Reflect.get?(t.exports=i=Reflect.get,t.exports.__esModule=!0,t.exports.default=t.exports):(t.exports=i=function(t,e,n){var i=r(t,e);if(i){var a=Object.getOwnPropertyDescriptor(i,e);return a.get?a.get.call(arguments.length<3?t:n):a.value}},t.exports.__esModule=!0,t.exports.default=t.exports),i.apply(this,arguments)}t.exports=i,t.exports.__esModule=!0,t.exports.default=t.exports},1189:function(t,e,n){var r=n(411);t.exports=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=r(t)););return t},t.exports.__esModule=!0,t.exports.default=t.exports},1190:function(t,e,n){"use strict";String.prototype.trimStart||(String.prototype.trimLeft?String.prototype.trimStart=String.prototype.trimLeft:String.prototype.trimStart=function(){return this.replace(/^[\s\uFEFF\xA0]+/g,"")}),String.prototype.trimEnd||(String.prototype.trimRight?String.prototype.trimEnd=String.prototype.trimRight:String.prototype.trimEnd=function(){return this.replace(/[\s\uFEFF\xA0]+$/g,"")})},1191:function(t,e,n){"use strict";var r=n(27),i=r(n(247)),a=r(n(111)),o=r(n(112)),c=r(n(405)),s=r(n(655)),u=r(n(411));function f(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var l=function(t){(0,c.default)(r,t);var e,n=(e=r,function(){var t,n=(0,u.default)(e);if(f()){var r=(0,u.default)(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return(0,s.default)(this,t)});function r(t){var e;if((0,a.default)(this,r),"track"!==(e=n.call(this,t,{checkIndent:!1})).nameKey)throw new Error('trackDb has "'.concat(e.nameKey,'" instead of "track" as the first line in each track'));return e.forEach((function(t,n){var r=Array.from(t.keys()),a=[];if(["track","shortLabel"].forEach((function(t){r.includes(t)||a.push(t)})),a.length>0)throw new Error("Track ".concat(n," is missing required key(s): ").concat(a.join(", ")));var o=["superTrack","compositeTrack","container","view"];if(!r.some((function(t){return o.includes(t)}))){if(!r.includes("bigDataUrl"))throw new Error("Track ".concat(n,' is missing required key "bigDataUrl"'));if(!r.includes("type")){var c=e.settings(n);if(!Array.from(c.keys()).includes("type"))throw new Error("Neither track ".concat(n,' nor any of its parent tracks have the required key "type"'))}}var s="",u=n;do{if(u=e.get(u).get("parent")){var f=u.split(" ");u=(0,i.default)(f,1)[0],s+="    "}}while(u);var l=e.get(n);l.indent=s,e.set(n,l)})),e}return(0,o.default)(r,[{key:"settings",value:function(t){var e=this;if(!this.has(t))throw new Error("Track ".concat(t," does not exist"));var n=[t],r=t;do{(r=this.get(r).get("parent"))&&n.push(r)}while(r);var i=new Map;return n.reverse(),n.forEach((function(t){e.get(t).forEach((function(t,e){i.set(e,t)}))})),i}}]),r}(n(1004));t.exports=l},1192:function(t,e,n){"use strict";var r=n(27),i=r(n(111)),a=r(n(405)),o=r(n(655)),c=r(n(411));function s(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var u=function(t){(0,a.default)(r,t);var e,n=(e=r,function(){var t,n=(0,c.default)(e);if(s()){var r=(0,c.default)(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return(0,o.default)(this,t)});function r(t){var e;if((0,i.default)(this,r),"hub"!==(e=n.call(this,t)).nameKey)throw new Error('Hub file must begin with a line like "hub <hub_name>"');var a=["hub","shortLabel","longLabel","genomesFile","email","descriptionUrl"],o=[];if(e.forEach((function(t,e){a.includes(e)||o.push(e)})),o.length>0)throw new Error("Hub file has invalid entr".concat(1===o.length?"y":"ies",": ").concat(o.join(", ")));var c=[];if(a.forEach((function(t){"descriptionUrl"===t||e.get(t)||c.push(t)})),c.length>0)throw new Error("Hub file is missing required entr".concat(1===c.length?"y":"ies",": ").concat(c.join(", ")));return e}return r}(n(1005));t.exports=u},1193:function(t,e,n){"use strict";var r=n(27),i=r(n(111)),a=r(n(405)),o=r(n(655)),c=r(n(411));function s(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var u=function(t){(0,a.default)(r,t);var e,n=(e=r,function(){var t,n=(0,c.default)(e);if(s()){var r=(0,c.default)(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return(0,o.default)(this,t)});function r(t){var e;if((0,i.default)(this,r),"genome"!==(e=n.call(this,t)).nameKey)throw new Error('Genomes file must begin with a line like "genome <genome_name>"');var a=["genome","trackDb"];return e.forEach((function(t,e){var n=[];if(a.forEach((function(e){t.get(e)||n.push(e)})),n.length>0)throw new Error("Genomes file entry ".concat(e," is missing required entr").concat(1===n.length?"y":"ies",": ").concat(n.join(", ")))})),e}return r}(n(1004));t.exports=u},1213:function(t,e,n){"use strict";var r=n(1004),i=n(1005),a=n(1191),o=n(1192),c=n(1193);t.exports={RaFile:r,RaStanza:i,TrackDbFile:a,HubFile:o,GenomesFile:c}}});
//# sourceMappingURL=0.aa3f117980c15500c977.worker.js.map