(this["webpackJsonp@jbrowse/web"]=this["webpackJsonp@jbrowse/web"]||[]).push([[26],{2311:function(e,t){e.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t){if(e&&t){var n=Array.isArray(t)?t:t.split(","),r=e.name||"",o=e.type||"",i=o.replace(/\/.*$/,"");return n.some((function(e){var t=e.trim();return"."===t.charAt(0)?r.toLowerCase().endsWith(t.toLowerCase()):t.endsWith("/*")?i===t.replace(/\/.*$/,""):o===t}))}return!0}}])},2312:function(e,t,n){"use strict";var r=n(86),o=n(97);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(n(1)),a=(0,r(n(98)).default)(i.createElement("path",{d:"M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"}),"CloudUpload");t.default=a},2313:function(e,t,n){"use strict";var r=n(86),o=n(97);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(n(1)),a=(0,r(n(98)).default)(i.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"}),"Error");t.default=a},2336:function(e,t,n){"use strict";n.d(t,"a",(function(){return N}));var r=n(1),o=n.n(r),i=n(11),a=n.n(i);function u(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(t){i(t)}}function u(e){try{c(r.throw(e))}catch(t){i(t)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}c((r=r.apply(e,t||[])).next())}))}function c(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"===typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(u){i=[6,u],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}}function l(e,t){var n="function"===typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(u){o={error:u}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a}var f=new Map([["avi","video/avi"],["gif","image/gif"],["ico","image/x-icon"],["jpeg","image/jpeg"],["jpg","image/jpeg"],["mkv","video/x-matroska"],["mov","video/quicktime"],["mp4","video/mp4"],["pdf","application/pdf"],["png","image/png"],["zip","application/zip"],["doc","application/msword"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"]]);function s(e,t){var n=function(e){var t=e.name;if(t&&-1!==t.lastIndexOf(".")&&!e.type){var n=t.split(".").pop().toLowerCase(),r=f.get(n);r&&Object.defineProperty(e,"type",{value:r,writable:!1,configurable:!1,enumerable:!0})}return e}(e);if("string"!==typeof n.path){var r=e.webkitRelativePath;Object.defineProperty(n,"path",{value:"string"===typeof t?t:"string"===typeof r&&r.length>0?r:e.name,writable:!1,configurable:!1,enumerable:!0})}return n}var p=[".DS_Store","Thumbs.db"];function d(e){return u(this,void 0,void 0,(function(){return c(this,(function(t){return[2,(n=e,n.dataTransfer&&e.dataTransfer?g(e.dataTransfer,e.type):v(e))];var n}))}))}function v(e){return(null!==e.target&&e.target.files?y(e.target.files):[]).map((function(e){return s(e)}))}function g(e,t){return u(this,void 0,void 0,(function(){var n;return c(this,(function(r){switch(r.label){case 0:return e.items?(n=y(e.items).filter((function(e){return"file"===e.kind})),"drop"!==t?[2,n]:[4,Promise.all(n.map(m))]):[3,2];case 1:return[2,b(h(r.sent()))];case 2:return[2,b(y(e.files).map((function(e){return s(e)})))]}}))}))}function b(e){return e.filter((function(e){return-1===p.indexOf(e.name)}))}function y(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];t.push(r)}return t}function m(e){if("function"!==typeof e.webkitGetAsEntry)return D(e);var t=e.webkitGetAsEntry();return t&&t.isDirectory?j(t):D(e)}function h(e){return e.reduce((function(e,t){return function(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(l(arguments[t]));return e}(e,Array.isArray(t)?h(t):[t])}),[])}function D(e){var t=e.getAsFile();if(!t)return Promise.reject(e+" is not a File");var n=s(t);return Promise.resolve(n)}function O(e){return u(this,void 0,void 0,(function(){return c(this,(function(t){return[2,e.isDirectory?j(e):w(e)]}))}))}function j(e){var t=e.createReader();return new Promise((function(e,n){var r=[];!function o(){var i=this;t.readEntries((function(t){return u(i,void 0,void 0,(function(){var i,a,u;return c(this,(function(c){switch(c.label){case 0:if(t.length)return[3,5];c.label=1;case 1:return c.trys.push([1,3,,4]),[4,Promise.all(r)];case 2:return i=c.sent(),e(i),[3,4];case 3:return a=c.sent(),n(a),[3,4];case 4:return[3,6];case 5:u=Promise.all(t.map(O)),r.push(u),o(),c.label=6;case 6:return[2]}}))}))}),(function(e){n(e)}))}()}))}function w(e){return u(this,void 0,void 0,(function(){return c(this,(function(t){return[2,new Promise((function(t,n){e.file((function(n){var r=s(n,e.fullPath);t(r)}),(function(e){n(e)}))}))]}))}))}var F=n(2311),k=n.n(F);function A(e,t){return"application/x-moz-file"===e.type||k()(e,t)}function E(e,t,n){if(P(e.size)){if(P(t)&&P(n))return e.size>=t&&e.size<=n;if(P(t))return e.size>=t;if(P(n))return e.size<=n}return!0}function P(e){return void 0!==e&&null!==e}function x(e){var t=e.files,n=e.accept,r=e.minSize,o=e.maxSize;return!(!e.multiple&&t.length>1)&&t.every((function(e){return A(e,n)&&E(e,r,o)}))}function C(e){return"function"===typeof e.isPropagationStopped?e.isPropagationStopped():"undefined"!==typeof e.cancelBubble&&e.cancelBubble}function S(e){return e.dataTransfer?Array.prototype.some.call(e.dataTransfer.types,(function(e){return"Files"===e||"application/x-moz-file"===e})):!!e.target&&!!e.target.files}function z(e){e.preventDefault()}function T(e){return-1!==e.indexOf("MSIE")||-1!==e.indexOf("Trident/")}function L(e){return-1!==e.indexOf("Edge/")}function R(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.navigator.userAgent;return T(e)||L(e)}function M(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return t.some((function(t){return!C(e)&&t&&t.apply(void 0,[e].concat(r)),C(e)}))}}function I(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function K(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e))&&"[object Arguments]"!==Object.prototype.toString.call(e))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(c){o=!0,i=c}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function _(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function B(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?_(n,!0).forEach((function(t){G(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):_(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function G(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function q(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var H=Object(r.forwardRef)((function(e,t){var n=e.children,i=N(q(e,["children"])),a=i.open,u=q(i,["open"]);return Object(r.useImperativeHandle)(t,(function(){return{open:a}}),[a]),o.a.createElement(r.Fragment,null,n(B({},u,{open:a})))}));H.displayName="Dropzone",H.propTypes={children:a.a.func,accept:a.a.oneOfType([a.a.string,a.a.arrayOf(a.a.string)]),multiple:a.a.bool,preventDropOnDocument:a.a.bool,noClick:a.a.bool,noKeyboard:a.a.bool,noDrag:a.a.bool,noDragEventsBubbling:a.a.bool,minSize:a.a.number,maxSize:a.a.number,disabled:a.a.bool,getFilesFromEvent:a.a.func,onFileDialogCancel:a.a.func,onDragEnter:a.a.func,onDragLeave:a.a.func,onDragOver:a.a.func,onDrop:a.a.func,onDropAccepted:a.a.func,onDropRejected:a.a.func};var J={isFocused:!1,isFileDialogActive:!1,isDragActive:!1,isDragAccept:!1,isDragReject:!1,draggedFiles:[],acceptedFiles:[],rejectedFiles:[]};function N(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.accept,n=e.disabled,o=void 0!==n&&n,i=e.getFilesFromEvent,a=void 0===i?d:i,u=e.maxSize,c=void 0===u?1/0:u,l=e.minSize,f=void 0===l?0:l,s=e.multiple,p=void 0===s||s,v=e.onDragEnter,g=e.onDragLeave,b=e.onDragOver,y=e.onDrop,m=e.onDropAccepted,h=e.onDropRejected,D=e.onFileDialogCancel,O=e.preventDropOnDocument,j=void 0===O||O,w=e.noClick,F=void 0!==w&&w,k=e.noKeyboard,P=void 0!==k&&k,T=e.noDrag,L=void 0!==T&&T,_=e.noDragEventsBubbling,H=void 0!==_&&_,N=Object(r.useRef)(null),$=Object(r.useRef)(null),U=Object(r.useReducer)(W,J),V=K(U,2),Q=V[0],X=V[1],Y=Q.isFocused,Z=Q.isFileDialogActive,ee=Q.draggedFiles,te=Object(r.useCallback)((function(){$.current&&(X({type:"openDialog"}),$.current.value=null,$.current.click())}),[X]),ne=function(){Z&&setTimeout((function(){$.current&&($.current.files.length||(X({type:"closeDialog"}),"function"===typeof D&&D()))}),300)};Object(r.useEffect)((function(){return window.addEventListener("focus",ne,!1),function(){window.removeEventListener("focus",ne,!1)}}),[$,Z,D]);var re=Object(r.useCallback)((function(e){N.current&&N.current.isEqualNode(e.target)&&(32!==e.keyCode&&13!==e.keyCode||(e.preventDefault(),te()))}),[N,$]),oe=Object(r.useCallback)((function(){X({type:"focus"})}),[]),ie=Object(r.useCallback)((function(){X({type:"blur"})}),[]),ae=Object(r.useCallback)((function(){F||(R()?setTimeout(te,0):te())}),[$,F]),ue=Object(r.useRef)([]),ce=function(e){N.current&&N.current.contains(e.target)||(e.preventDefault(),ue.current=[])};Object(r.useEffect)((function(){return j&&(document.addEventListener("dragover",z,!1),document.addEventListener("drop",ce,!1)),function(){j&&(document.removeEventListener("dragover",z),document.removeEventListener("drop",ce))}}),[N,j]);var le=Object(r.useCallback)((function(e){e.preventDefault(),e.persist(),be(e),-1===ue.current.indexOf(e.target)&&(ue.current=[].concat(I(ue.current),[e.target])),S(e)&&Promise.resolve(a(e)).then((function(t){C(e)&&!H||(X({draggedFiles:t,isDragActive:!0,type:"setDraggedFiles"}),v&&v(e))}))}),[a,v,H]),fe=Object(r.useCallback)((function(e){if(e.preventDefault(),e.persist(),be(e),e.dataTransfer)try{e.dataTransfer.dropEffect="copy"}catch(t){}return S(e)&&b&&b(e),!1}),[b,H]),se=Object(r.useCallback)((function(e){e.preventDefault(),e.persist(),be(e);var t=ue.current.filter((function(t){return t!==e.target&&N.current&&N.current.contains(t)}));ue.current=t,t.length>0||(X({isDragActive:!1,type:"setDraggedFiles",draggedFiles:[]}),S(e)&&g&&g(e))}),[N,g,H]),pe=Object(r.useCallback)((function(e){e.preventDefault(),e.persist(),be(e),ue.current=[],S(e)&&Promise.resolve(a(e)).then((function(n){if(!C(e)||H){var r=[],o=[];n.forEach((function(e){A(e,t)&&E(e,f,c)?r.push(e):o.push(e)})),!p&&r.length>1&&o.push.apply(o,I(r.splice(0))),X({acceptedFiles:r,rejectedFiles:o,type:"setFiles"}),y&&y(r,o,e),o.length>0&&h&&h(o,e),r.length>0&&m&&m(r,e)}})),X({type:"reset"})}),[p,t,f,c,a,y,m,h,H]),de=function(e){return o?null:e},ve=function(e){return P?null:de(e)},ge=function(e){return L?null:de(e)},be=function(e){H&&e.stopPropagation()},ye=Object(r.useMemo)((function(){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.refKey,n=void 0===t?"ref":t,r=e.onKeyDown,i=e.onFocus,a=e.onBlur,u=e.onClick,c=e.onDragEnter,l=e.onDragOver,f=e.onDragLeave,s=e.onDrop,p=q(e,["refKey","onKeyDown","onFocus","onBlur","onClick","onDragEnter","onDragOver","onDragLeave","onDrop"]);return B(G({onKeyDown:ve(M(r,re)),onFocus:ve(M(i,oe)),onBlur:ve(M(a,ie)),onClick:de(M(u,ae)),onDragEnter:ge(M(c,le)),onDragOver:ge(M(l,fe)),onDragLeave:ge(M(f,se)),onDrop:ge(M(s,pe))},n,N),o||P?{}:{tabIndex:0},{},p)}}),[N,re,oe,ie,ae,le,fe,se,pe,P,L,o]),me=Object(r.useCallback)((function(e){e.stopPropagation()}),[]),he=Object(r.useMemo)((function(){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.refKey,r=void 0===n?"ref":n,o=e.onChange,i=e.onClick,a=q(e,["refKey","onChange","onClick"]),u=G({accept:t,multiple:p,type:"file",style:{display:"none"},onChange:de(M(o,pe)),onClick:de(M(i,me)),autoComplete:"off",tabIndex:-1},r,$);return B({},u,{},a)}}),[$,t,p,pe,o]),De=ee.length,Oe=De>0&&x({files:ee,accept:t,minSize:f,maxSize:c,multiple:p}),je=De>0&&!Oe;return B({},Q,{isDragAccept:Oe,isDragReject:je,isFocused:Y&&!o,getRootProps:ye,getInputProps:he,rootRef:N,inputRef:$,open:de(te)})}function W(e,t){switch(t.type){case"focus":return B({},e,{isFocused:!0});case"blur":return B({},e,{isFocused:!1});case"openDialog":return B({},e,{isFileDialogActive:!0});case"closeDialog":return B({},e,{isFileDialogActive:!1});case"setDraggedFiles":var n=t.isDragActive;return B({},e,{draggedFiles:t.draggedFiles,isDragActive:n});case"setFiles":return B({},e,{acceptedFiles:t.acceptedFiles,rejectedFiles:t.rejectedFiles});case"reset":return B({},e,{isFileDialogActive:!1,isDragActive:!1,draggedFiles:[],acceptedFiles:[],rejectedFiles:[]});default:return e}}}}]);
//# sourceMappingURL=26.d1feb473.chunk.js.map