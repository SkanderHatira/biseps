(this["webpackJsonp@jbrowse/web"]=this["webpackJsonp@jbrowse/web"]||[]).push([[0],{37:function(n,e,o){"use strict";o.d(e,"a",(function(){return s}));var t=o(1),i=o.n(t),r=o(63),a=o(51),c=Object(a.a)({loadingIndicator:{position:"fixed",top:"50%",left:"50%",marginTop:-25,marginLeft:-25}});function s(){var n=c();return i.a.createElement(r.a,{disableShrink:!0,className:n.loadingIndicator,size:50})}},53:function(n,e,o){n.exports=o(61)},61:function(n,e,o){"use strict";o.r(e);var t=o(1),i=o.n(t),r=o(31),a=o.n(r),c=o(37),s=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function l(n,e){navigator.serviceWorker.register(n).then((function(n){n.onupdatefound=function(){var o=n.installing;null!=o&&(o.onstatechange=function(){"installed"===o.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),e&&e.onUpdate&&e.onUpdate(n)):(console.log("Content is cached for offline use."),e&&e.onSuccess&&e.onSuccess(n)))})}})).catch((function(n){console.error("Error during service worker registration:",n)}))}!function(n){if("serviceWorker"in navigator){if(new URL(".",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat(".","/service-worker.js");s?(!function(n,e){fetch(n).then((function(o){var t=o.headers.get("content-type");404===o.status||null!=t&&!t.includes("javascript")?navigator.serviceWorker.ready.then((function(n){n.unregister().then((function(){window.location.reload()}))})):l(n,e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e,n),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):l(e,n)}))}}();var u=Object(t.lazy)((function(){return Promise.all([o.e(2),o.e(4)]).then(o.bind(null,2508))})),d=Date.now();a.a.render(i.a.createElement(t.Suspense,{fallback:i.a.createElement(c.a,null)},i.a.createElement(u,{initialTimestamp:d})),document.getElementById("root"))}},[[53,1,3]]]);
//# sourceMappingURL=main.e568b763.chunk.js.map