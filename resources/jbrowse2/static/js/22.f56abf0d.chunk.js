(this["webpackJsonp@jbrowse/web"]=this["webpackJsonp@jbrowse/web"]||[]).push([[22,25],{1726:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return f}));var r=n(11),a=n(81),i=n(88),u=n(89),s=n(488),c=n(104),o=n(79),f=function(e){Object(i.a)(n,e);var t=Object(u.a)(n);function n(e,r,i){var u;Object(a.a)(this,n),u=t.call(this,e,r,i);var f=Object(o.readConfObject)(e,"fastaLocation"),l=Object(o.readConfObject)(e,"faiLocation"),h=Object(o.readConfObject)(e,"gziLocation");if(!f)throw new Error("must provide fastaLocation");if(!l)throw new Error("must provide faiLocation");if(!h)throw new Error("must provide gziLocation");var p={fasta:Object(c.openLocation)(f,u.pluginManager),fai:Object(c.openLocation)(l,u.pluginManager),gzi:Object(c.openLocation)(h,u.pluginManager)};return u.fasta=new s.BgzipIndexedFasta(p),u}return Object(r.a)(n)}(n(945).default)},367:function(e,t,n){"use strict";(function(e){var r=n(80),a=n(99).default,i=n(101).default,u=n(158).default;Object.defineProperty(t,"__esModule",{value:!0});var s=n(164);function c(e,t){return e.offset+e.lineBytes*Math.floor(t/e.lineLength)+t%e.lineLength}function o(e,t){return f.apply(this,arguments)}function f(){return(f=u(r.mark((function e(t,n){var a,i,u,s;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.readFile(n);case 2:if((a=e.sent)&&a.length){e.next=5;break}throw new Error("No data read from FASTA index (FAI) file");case 5:return i=0,s=a.toString("utf8").split(/\r?\n/).filter((function(e){return/\S/.test(e)})).map((function(e){return e.split("\t")})).filter((function(e){return""!==e[0]})).map((function(e){return u&&u.name===e[0]||(u={name:e[0],id:i},i+=1),{id:u.id,name:e[0],length:+e[1],start:0,end:+e[1],offset:+e[2],lineLength:+e[3],lineBytes:+e[4]}})),e.abrupt("return",{name:Object.fromEntries(s.map((function(e){return[e.name,e]}))),id:Object.fromEntries(s.map((function(e){return[e.id,e]})))});case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var l=function(){function t(e){var n=e.fasta,r=e.fai,i=e.path,u=e.faiPath,c=e.chunkSizeLimit,o=void 0===c?1e6:c;if(a(this,t),n)this.fasta=n;else{if(!i)throw new Error("Need to pass filehandle for fasta or path to localfile");this.fasta=new s.LocalFile(i)}if(r)this.fai=r;else if(u)this.fai=new s.LocalFile(u);else{if(!i)throw new Error("Need to pass filehandle for  or path to localfile");this.fai=new s.LocalFile("".concat(i,".fai"))}this.chunkSizeLimit=o}return i(t,[{key:"_getIndexes",value:function(){var e=u(r.mark((function e(t){return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.indexes||(this.indexes=o(this.fai,t)),e.abrupt("return",this.indexes);case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getSequenceNames",value:function(){var e=u(r.mark((function e(t){return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=Object,e.next=3,this._getIndexes(t);case 3:return e.t1=e.sent.name,e.abrupt("return",e.t0.keys.call(e.t0,e.t1));case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getSequenceSizes",value:function(){var e=u(r.mark((function e(t){var n,a,i,u;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={},e.next=3,this._getIndexes(t);case 3:for(a=e.sent,i=Object.values(a.id),u=0;u<i.length;u+=1)n[i[u].name]=i[u].length;return e.abrupt("return",n);case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getSequenceSize",value:function(){var e=u(r.mark((function e(t,n){var a,i;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this._getIndexes(n);case 2:return i=e.sent,e.abrupt("return",null===(a=i.name[t])||void 0===a?void 0:a.length);case 4:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"hasReferenceSequence",value:function(){var e=u(r.mark((function e(t,n){return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this._getIndexes(n);case 2:return e.t0=t,e.abrupt("return",!!e.sent.name[e.t0]);case 4:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"getResiduesById",value:function(){var e=u(r.mark((function e(t,n,a,i){var u;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this._getIndexes(i);case 2:if(e.t0=t,u=e.sent.id[e.t0]){e.next=6;break}return e.abrupt("return",void 0);case 6:return e.abrupt("return",this._fetchFromIndexEntry(u,n,a,i));case 7:case"end":return e.stop()}}),e,this)})));return function(t,n,r,a){return e.apply(this,arguments)}}()},{key:"getResiduesByName",value:function(){var e=u(r.mark((function e(t,n,a,i){var u;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this._getIndexes(i);case 2:if(e.t0=t,u=e.sent.name[e.t0]){e.next=6;break}return e.abrupt("return",void 0);case 6:return e.abrupt("return",this._fetchFromIndexEntry(u,n,a,i));case 7:case"end":return e.stop()}}),e,this)})));return function(t,n,r,a){return e.apply(this,arguments)}}()},{key:"getSequence",value:function(){var e=u(r.mark((function e(t,n,a,i){return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.getResiduesByName(t,n,a,i));case 1:case"end":return e.stop()}}),e,this)})));return function(t,n,r,a){return e.apply(this,arguments)}}()},{key:"_fetchFromIndexEntry",value:function(){var t=u(r.mark((function t(n){var a,i,u,s,o,f,l,h=arguments;return r.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a=h.length>1&&void 0!==h[1]?h[1]:0,i=h.length>2?h[2]:void 0,u=h.length>3?h[3]:void 0,s=i,!(a<0)){t.next=6;break}throw new TypeError("regionStart cannot be less than 0");case 6:if((void 0===s||s>n.length)&&(s=n.length),!(a>=s)){t.next=9;break}return t.abrupt("return","");case 9:if(o=c(n,a),!((f=c(n,s)-o)>this.chunkSizeLimit)){t.next=13;break}throw new Error("data size of ".concat(f.toLocaleString()," bytes exceeded chunk size limit of ").concat(this.chunkSizeLimit.toLocaleString()," bytes"));case 13:return l=e.allocUnsafe(f),t.next=16,this.fasta.read(l,0,f,o,u);case 16:return t.abrupt("return",l.toString("utf8").replace(/\s+/g,""));case 17:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()}]),t}();t.default=l}).call(this,n(100).Buffer)},488:function(e,t,n){"use strict";var r=n(80),a=n(158).default,i=n(99).default,u=n(101).default,s=n(601).default,c=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.BgzipIndexedFasta=t.IndexedFasta=t.FetchableSmallFasta=t.parseSmallFasta=void 0;var o=c(n(559)),f=n(164),l=c(n(653));t.BgzipIndexedFasta=l.default;var h=c(n(367));function p(e){return e.split(">").filter((function(e){return/\S/.test(e)})).map((function(e){var t=e.split("\n"),n=s(t),r=n[0],a=n.slice(1),i=r.split(" "),u=s(i),c=u[0],o=u.slice(1),f=a.join("").replace(/\s/g,"");return{id:c,description:o.join(" "),sequence:f}}))}t.IndexedFasta=h.default,Object.fromEntries||o.default.shim(),t.parseSmallFasta=p;var d=function(){function e(t){var n=t.fasta,r=t.path;if(i(this,e),n)this.fasta=n;else{if(!r)throw new Error("Need to pass fasta or path");this.fasta=new f.LocalFile(r)}this.data=this.fasta.readFile().then((function(e){return p(e.toString("utf8"))}))}return u(e,[{key:"fetch",value:function(){var e=a(r.mark((function e(t,n,a){var i,u,s;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.data;case 2:if(i=e.sent,u=i.find((function(e){return e.id===t})),s=a-n,u){e.next=7;break}throw new Error("no sequence with id ".concat(t," exists"));case 7:return e.abrupt("return",u.sequence.substr(n,s));case 8:case"end":return e.stop()}}),e,this)})));return function(t,n,r){return e.apply(this,arguments)}}()},{key:"getSequenceNames",value:function(){var e=a(r.mark((function e(){var t;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.data;case 2:return t=e.sent,e.abrupt("return",t.map((function(e){return e.id})));case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}();t.FetchableSmallFasta=d},653:function(e,t,n){"use strict";var r=n(101).default,a=n(99).default,i=n(153).default,u=n(185).default,s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var c=n(152),o=function(e){i(n,e);var t=u(n);function n(e){var r,i=e.fasta,u=e.path,s=e.fai,o=e.faiPath,f=e.gzi,l=e.gziPath,h=e.chunkSizeLimit;return a(this,n),r=t.call(this,{fasta:i,path:u,fai:s,faiPath:o,chunkSizeLimit:h}),i&&f?r.fasta=new c.BgzfFilehandle({filehandle:i,gziFilehandle:f}):u&&l&&(r.fasta=new c.BgzfFilehandle({path:u,gziPath:l})),r}return r(n)}(s(n(367)).default);t.default=o},945:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return x}));var r=n(86),a=n(82),i=n(81),u=n(11),s=n(88),c=n(89),o=n(80),f=n.n(o),l=n(488),h=n(115),p=n(104),d=n(125),v=n(118),b=n(79),m=n(170),g=n.n(m),w=n(462),x=function(e){Object(s.a)(n,e);var t=Object(c.a)(n);function n(e,u,s){var c;Object(i.a)(this,n),(c=t.call(this,e,u,s)).fasta=void 0,c.seqCache=new g.a({cache:new w.a({maxSize:200}),fill:function(){var e=Object(a.a)(f.a.mark((function e(t,n){var a,i,u;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.refName,i=t.start,u=t.end,e.abrupt("return",c.fasta.getSequence(a,i,u,Object(r.a)(Object(r.a)({},t),{},{signal:n})));case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()});var o=Object(b.readConfObject)(e,"fastaLocation"),h=Object(b.readConfObject)(e,"faiLocation"),d={fasta:Object(p.openLocation)(o,c.pluginManager),fai:Object(p.openLocation)(h,c.pluginManager)};return c.fasta=new l.IndexedFasta(d),c}return Object(u.a)(n,[{key:"getRefNames",value:function(e){return this.fasta.getSequenceNames(e)}},{key:"getRegions",value:function(){var e=Object(a.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.fasta.getSequenceSizes(t);case 2:return n=e.sent,e.abrupt("return",Object.keys(n).map((function(e){return{refName:e,start:0,end:n[e]}})));case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getFeatures",value:function(e,t){var n=this,r=e.refName,i=e.start,u=e.end;return Object(d.ObservableCreate)(function(){var e=Object(a.a)(f.a.mark((function e(a){var s,c,o,l,h,p,d,b,m;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.fasta.getSequenceSize(r,t);case 2:for(s=e.sent,c=void 0!==s?Math.min(s,u):u,o=[],p=u+((l=128e3)-u%l),d=h=i-i%l;d<p;d+=l)b={refName:r,start:d,end:d+l},o.push(n.seqCache.get(JSON.stringify(b),b,null===t||void 0===t?void 0:t.signal));return e.next=11,Promise.all(o);case 11:(m=e.sent.join("").slice(i-h).slice(0,u-i))&&a.next(new v.a({id:"".concat(r," ").concat(i,"-").concat(c),data:{refName:r,start:i,end:c,seq:m}})),a.complete();case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}},{key:"freeResources",value:function(){}}]),n}(h.BaseSequenceAdapter)}}]);
//# sourceMappingURL=22.f56abf0d.chunk.js.map