(this["webpackJsonp@jbrowse/web"]=this["webpackJsonp@jbrowse/web"]||[]).push([[7,45],{1271:function(e,t,n){"use strict";var r=n(86);Object.defineProperty(t,"__esModule",{value:!0}),t.parseSmallFasta=d,Object.defineProperty(t,"BgzipIndexedFasta",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"IndexedFasta",{enumerable:!0,get:function(){return l.default}}),t.FetchableSmallFasta=void 0;var a=r(n(168)),u=r(n(169)),i=r(n(108)),s=r(n(118)),c=r(n(2322)),f=r(n(1272)),o=r(n(2324)),l=r(n(1273));function d(e){return e.split(">").filter((function(e){return/\S/.test(e)})).map((function(e){var t=e.split("\n"),n=(0,c.default)(t),r=n[0],a=n.slice(1),u=r.split(" "),i=(0,c.default)(u),s=i[0],f=i.slice(1),o=a.join("").replace(/\s/g,"");return{id:s,description:f.join(" "),sequence:o}}))}var p=function(){function e(t){var n=t.fasta,r=t.path;(0,i.default)(this,e),n?this.fasta=n:r&&(this.fasta=new f.default(r)),this.data=this.fasta.readFile().then((function(e){return d(e.toString("utf8"))}))}return(0,s.default)(e,[{key:"fetch",value:function(){var e=(0,u.default)(a.default.mark((function e(t,n,r){var u,i,s;return a.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.data;case 2:if(u=e.sent,i=u.find((function(e){return e.id===t})),s=r-n,i){e.next=7;break}throw new Error("no sequence with id ".concat(t," exists"));case 7:return e.abrupt("return",i.sequence.substr(n,s));case 8:case"end":return e.stop()}}),e,this)})));return function(t,n,r){return e.apply(this,arguments)}}()},{key:"getSequenceNames",value:function(){var e=(0,u.default)(a.default.mark((function e(){var t;return a.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.data;case 2:return t=e.sent,e.abrupt("return",t.map((function(e){return e.id})));case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}();t.FetchableSmallFasta=p},1272:function(e,t,n){"use strict";var r,a,u,i,s=n(86),c=s(n(168)),f=s(n(351)),o=s(n(169)),l=s(n(108)),d=s(n(118)),p=n(424).promisify;if(n(2323).isNode){var h=n(563);r=h&&p(h.open),a=h&&p(h.read),u=h&&p(h.fstat),i=h&&p(h.readFile)}var v=function(){function e(t){(0,l.default)(this,e),this.position=0,this.filename=t,this.fd=r(this.filename,"r")}return(0,d.default)(e,[{key:"read",value:function(){var e=(0,o.default)(c.default.mark((function e(t){var n,r,u,i,s=arguments;return c.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=s.length>1&&void 0!==s[1]?s[1]:0,r=s.length>2?s[2]:void 0,u=s.length>3?s[3]:void 0,null===u&&(this.position,this.position+=r),e.t0=a,e.next=8,this.fd;case 8:return e.t1=e.sent,e.t2=t,e.t3=n,e.t4=r,e.t5=u,e.next=15,(0,e.t0)(e.t1,e.t2,e.t3,e.t4,e.t5);case 15:if(i=e.sent,"object"!==(0,f.default)(i)){e.next=18;break}return e.abrupt("return",i.bytesRead);case 18:return e.abrupt("return",i);case 19:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"readFile",value:function(){var e=(0,o.default)(c.default.mark((function e(){return c.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",i(this.filename));case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"stat",value:function(){var e=(0,o.default)(c.default.mark((function e(){return c.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this._stat){e.next=8;break}return e.t0=u,e.next=4,this.fd;case 4:return e.t1=e.sent,e.next=7,(0,e.t0)(e.t1);case 7:this._stat=e.sent;case 8:return e.abrupt("return",this._stat);case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}();e.exports=v},1273:function(e,t,n){"use strict";(function(t){var r=n(86),a=r(n(168)),u=r(n(169)),i=r(n(108)),s=r(n(118)),c=r(n(1272));function f(e,t){return e.offset+e.lineBytes*Math.floor(t/e.lineLength)+t%e.lineLength}var o=function(){function e(t){var n=t.fasta,r=t.fai,a=t.path,u=t.faiPath,s=t.chunkSizeLimit,f=void 0===s?1e6:s;(0,i.default)(this,e),n?this.fasta=n:a&&(this.fasta=new c.default(a)),r?this.fai=r:u?this.fai=new c.default(u):a&&(this.fai=new c.default("".concat(a,".fai"))),this.chunkSizeLimit=f}return(0,s.default)(e,[{key:"_getIndexes",value:function(){var e=(0,u.default)(a.default.mark((function e(){return a.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.indexes){e.next=4;break}return e.next=3,this._readFAI();case 3:this.indexes=e.sent;case 4:return e.abrupt("return",this.indexes);case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"_readFAI",value:function(){var e=(0,u.default)(a.default.mark((function e(){var t,n,r,u,i;return a.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={},n={},e.next=4,this.fai.readFile();case 4:if((r=e.sent)&&r.length){e.next=7;break}throw new Error("No data read from FASTA index (FAI) file");case 7:return u=0,r.toString("utf8").split(/\r?\n/).filter((function(e){return/\S/.test(e)})).forEach((function(e){var r=e.split("\t");if(""!==r[0]){i&&i.name===r[0]||(i={name:r[0],id:u},u+=1);var a={id:i.id,name:r[0],length:+r[1],start:0,end:+r[1],offset:+r[2],lineLength:+r[3],lineBytes:+r[4]};t[a.name]=a,n[a.id]=a}})),e.abrupt("return",{name:t,id:n});case 10:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getSequenceNames",value:function(){var e=(0,u.default)(a.default.mark((function e(){return a.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=Object,e.next=3,this._getIndexes();case 3:return e.t1=e.sent.name,e.abrupt("return",e.t0.keys.call(e.t0,e.t1));case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getSequenceSizes",value:function(){var e=(0,u.default)(a.default.mark((function e(){var t,n,r,u;return a.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={},e.next=3,this._getIndexes();case 3:for(n=e.sent,r=Object.values(n.id),u=0;u<r.length;u+=1)t[r[u].name]=r[u].length;return e.abrupt("return",t);case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getSequenceSize",value:function(){var e=(0,u.default)(a.default.mark((function e(t){var n;return a.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this._getIndexes();case 2:return n=e.sent,e.abrupt("return",(n.name[t]||{}).length);case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"hasReferenceSequence",value:function(){var e=(0,u.default)(a.default.mark((function e(t){return a.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this._getIndexes();case 2:return e.t0=t,e.abrupt("return",!!e.sent.name[e.t0]);case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getResiduesById",value:function(){var e=(0,u.default)(a.default.mark((function e(t,n,r){var u;return a.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this._getIndexes();case 2:if(e.t0=t,u=e.sent.id[e.t0]){e.next=6;break}return e.abrupt("return",void 0);case 6:return e.abrupt("return",this._fetchFromIndexEntry(u,n,r));case 7:case"end":return e.stop()}}),e,this)})));return function(t,n,r){return e.apply(this,arguments)}}()},{key:"getResiduesByName",value:function(){var e=(0,u.default)(a.default.mark((function e(t,n,r){var u;return a.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this._getIndexes();case 2:if(e.t0=t,u=e.sent.name[e.t0]){e.next=6;break}return e.abrupt("return",void 0);case 6:return e.abrupt("return",this._fetchFromIndexEntry(u,n,r));case 7:case"end":return e.stop()}}),e,this)})));return function(t,n,r){return e.apply(this,arguments)}}()},{key:"getSequence",value:function(){var e=(0,u.default)(a.default.mark((function e(){var t=arguments;return a.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.getResiduesByName.apply(this,t));case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"_fetchFromIndexEntry",value:function(){var e=(0,u.default)(a.default.mark((function e(n){var r,u,i,s,c,o,l=arguments;return a.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=l.length>1&&void 0!==l[1]?l[1]:0,u=l.length>2?l[2]:void 0,i=u,!(r<0)){e.next=5;break}throw new TypeError("regionStart cannot be less than 0");case 5:if((void 0===i||i>n.length)&&(i=n.length),!(r>=i)){e.next=8;break}return e.abrupt("return","");case 8:if(s=f(n,r),!((c=f(n,i)-s)>this.chunkSizeLimit)){e.next=12;break}throw new Error("data size of ".concat(c.toLocaleString()," bytes exceeded chunk size limit of ").concat(this.chunkSizeLimit.toLocaleString()," bytes"));case 12:return o=t.allocUnsafe(c),e.next=15,this.fasta.read(o,0,c,s);case 15:return o=o.toString("utf8").replace(/\s+/g,""),e.abrupt("return",o);case 17:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}();e.exports=o}).call(this,n(113).Buffer)},2321:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return x}));var r=n(89),a=n.n(r),u=n(91),i=n(90),s=n(93),c=n(94),f=n(96),o=n(1271),l=n(130),d=n(136),p=n(145),h=n(142),v=n(82),y=n(178),m=n.n(y),b=n(437),x=function(e){Object(c.a)(n,e);var t=Object(f.a)(n);function n(e){var r;Object(i.a)(this,n),(r=t.call(this,e)).fasta=void 0,r.seqCache=new m.a({cache:new b.a({maxSize:200}),fill:function(){var e=Object(u.a)(a.a.mark((function e(t){var n,u,i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.refName,u=t.start,i=t.end,e.abrupt("return",r.fasta.getSequence(n,u,i));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()});var s=Object(v.readConfObject)(e,"fastaLocation"),c=Object(v.readConfObject)(e,"faiLocation");if(!s)throw new Error("must provide fastaLocation");if(!c)throw new Error("must provide faiLocation");var f={fasta:Object(d.openLocation)(s),fai:Object(d.openLocation)(c)};return r.fasta=new o.IndexedFasta(f),r}return Object(s.a)(n,[{key:"getRefNames",value:function(){return this.fasta.getSequenceNames()}},{key:"getRegions",value:function(){var e=Object(u.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.fasta.getSequenceSizes();case 2:return t=e.sent,e.abrupt("return",Object.keys(t).map((function(e){return{refName:e,start:0,end:t[e]}})));case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getFeatures",value:function(e){var t=this,n=e.refName,r=e.start,i=e.end;return Object(p.ObservableCreate)(function(){var e=Object(u.a)(a.a.mark((function e(u){var s,c,f,o,l,d,p,v,y;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.fasta.getSequenceSize(n);case 2:for(s=e.sent,c=void 0!==s?Math.min(s,i):i,f=[],d=i+((o=128e3)-i%o),p=l=r-r%o;p<d;p+=o)v={refName:n,start:p,end:p+o},f.push(t.seqCache.get(JSON.stringify(v),v));return e.next=11,Promise.all(f);case 11:(y=e.sent.join("").slice(r-l).slice(0,i-r))&&u.next(new h.a({id:"".concat(n," ").concat(r,"-").concat(c),data:{refName:n,start:r,end:c,seq:y}})),u.complete();case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}},{key:"freeResources",value:function(){}}]),n}(l.BaseFeatureDataAdapter)},2322:function(e,t,n){var r=n(1036),a=n(997),u=n(690),i=n(1037);e.exports=function(e){return r(e)||a(e)||u(e)||i()},e.exports.default=e.exports,e.exports.__esModule=!0},2323:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r="undefined"!==typeof window&&"undefined"!==typeof window.document,a="object"===("undefined"===typeof self?"undefined":n(self))&&self.constructor&&"DedicatedWorkerGlobalScope"===self.constructor.name,u="undefined"!==typeof e&&null!=e.versions&&null!=e.versions.node;t.isBrowser=r,t.isWebWorker=a,t.isNode=u,t.isJsDom=function(){return"undefined"!==typeof window&&"nodejs"===window.name||navigator.userAgent.includes("Node.js")||navigator.userAgent.includes("jsdom")}}).call(this,n(174))},2324:function(e,t,n){"use strict";var r=n(86),a=r(n(108)),u=r(n(258)),i=r(n(259)),s=r(n(226)),c=n(289);function f(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,s.default)(e);if(t){var a=(0,s.default)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return(0,i.default)(this,n)}}var o=function(e){(0,u.default)(n,e);var t=f(n);function n(e){var r,u=e.fasta,i=e.path,s=e.fai,f=e.faiPath,o=e.gzi,l=e.gziPath,d=e.chunkSizeLimit;return(0,a.default)(this,n),r=t.call(this,{fasta:u,path:i,fai:s,faiPath:f,chunkSizeLimit:d}),u&&o?r.fasta=new c.BgzfFilehandle({filehandle:u,gziFilehandle:o}):i&&l&&(r.fasta=new c.BgzfFilehandle({path:i,gziPath:l})),r}return n}(r(n(1273)).default);e.exports=o},563:function(e,t){}}]);
//# sourceMappingURL=7.bd698cf1.chunk.js.map