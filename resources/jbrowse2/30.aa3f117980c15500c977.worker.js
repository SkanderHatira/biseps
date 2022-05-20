this.webpackChunk([30],{1186:function(e,t,a){e.exports=function(){var e=[],t=[],a={},n={},r={};function o(e){return"string"===typeof e?new RegExp("^"+e+"$","i"):e}function i(e,t){return e===t?t:e===e.toLowerCase()?t.toLowerCase():e===e.toUpperCase()?t.toUpperCase():e[0]===e[0].toUpperCase()?t.charAt(0).toUpperCase()+t.substr(1).toLowerCase():t.toLowerCase()}function l(e,t){return e.replace(/\$(\d{1,2})/g,(function(e,a){return t[a]||""}))}function s(e,t){return e.replace(t[0],(function(a,n){var r=l(t[1],arguments);return i(""===a?e[n-1]:a,r)}))}function c(e,t,n){if(!e.length||a.hasOwnProperty(e))return t;for(var r=n.length;r--;){var o=n[r];if(o[0].test(t))return s(t,o)}return t}function u(e,t,a){return function(n){var r=n.toLowerCase();return t.hasOwnProperty(r)?i(n,r):e.hasOwnProperty(r)?i(n,e[r]):c(r,n,a)}}function d(e,t,a,n){return function(n){var r=n.toLowerCase();return!!t.hasOwnProperty(r)||!e.hasOwnProperty(r)&&c(r,r,a)===r}}function m(e,t,a){return(a?t+" ":"")+(1===t?m.singular(e):m.plural(e))}return m.plural=u(r,n,e),m.isPlural=d(r,n,e),m.singular=u(n,r,t),m.isSingular=d(n,r,t),m.addPluralRule=function(t,a){e.push([o(t),a])},m.addSingularRule=function(e,a){t.push([o(e),a])},m.addUncountableRule=function(e){"string"!==typeof e?(m.addPluralRule(e,"$0"),m.addSingularRule(e,"$0")):a[e.toLowerCase()]=!0},m.addIrregularRule=function(e,t){t=t.toLowerCase(),e=e.toLowerCase(),r[e]=t,n[t]=e},[["I","we"],["me","us"],["he","they"],["she","they"],["them","them"],["myself","ourselves"],["yourself","yourselves"],["itself","themselves"],["herself","themselves"],["himself","themselves"],["themself","themselves"],["is","are"],["was","were"],["has","have"],["this","these"],["that","those"],["echo","echoes"],["dingo","dingoes"],["volcano","volcanoes"],["tornado","tornadoes"],["torpedo","torpedoes"],["genus","genera"],["viscus","viscera"],["stigma","stigmata"],["stoma","stomata"],["dogma","dogmata"],["lemma","lemmata"],["schema","schemata"],["anathema","anathemata"],["ox","oxen"],["axe","axes"],["die","dice"],["yes","yeses"],["foot","feet"],["eave","eaves"],["goose","geese"],["tooth","teeth"],["quiz","quizzes"],["human","humans"],["proof","proofs"],["carve","carves"],["valve","valves"],["looey","looies"],["thief","thieves"],["groove","grooves"],["pickaxe","pickaxes"],["passerby","passersby"]].forEach((function(e){return m.addIrregularRule(e[0],e[1])})),[[/s?$/i,"s"],[/[^\u0000-\u007F]$/i,"$0"],[/([^aeiou]ese)$/i,"$1"],[/(ax|test)is$/i,"$1es"],[/(alias|[^aou]us|t[lm]as|gas|ris)$/i,"$1es"],[/(e[mn]u)s?$/i,"$1s"],[/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i,"$1"],[/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,"$1i"],[/(alumn|alg|vertebr)(?:a|ae)$/i,"$1ae"],[/(seraph|cherub)(?:im)?$/i,"$1im"],[/(her|at|gr)o$/i,"$1oes"],[/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i,"$1a"],[/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i,"$1a"],[/sis$/i,"ses"],[/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i,"$1$2ves"],[/([^aeiouy]|qu)y$/i,"$1ies"],[/([^ch][ieo][ln])ey$/i,"$1ies"],[/(x|ch|ss|sh|zz)$/i,"$1es"],[/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i,"$1ices"],[/\b((?:tit)?m|l)(?:ice|ouse)$/i,"$1ice"],[/(pe)(?:rson|ople)$/i,"$1ople"],[/(child)(?:ren)?$/i,"$1ren"],[/eaux$/i,"$0"],[/m[ae]n$/i,"men"],["thou","you"]].forEach((function(e){return m.addPluralRule(e[0],e[1])})),[[/s$/i,""],[/(ss)$/i,"$1"],[/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i,"$1fe"],[/(ar|(?:wo|[ae])l|[eo][ao])ves$/i,"$1f"],[/ies$/i,"y"],[/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i,"$1ie"],[/\b(mon|smil)ies$/i,"$1ey"],[/\b((?:tit)?m|l)ice$/i,"$1ouse"],[/(seraph|cherub)im$/i,"$1"],[/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i,"$1"],[/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i,"$1sis"],[/(movie|twelve|abuse|e[mn]u)s$/i,"$1"],[/(test)(?:is|es)$/i,"$1is"],[/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,"$1us"],[/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i,"$1um"],[/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i,"$1on"],[/(alumn|alg|vertebr)ae$/i,"$1a"],[/(cod|mur|sil|vert|ind)ices$/i,"$1ex"],[/(matr|append)ices$/i,"$1ix"],[/(pe)(rson|ople)$/i,"$1rson"],[/(child)ren$/i,"$1"],[/(eau)x?$/i,"$1"],[/men$/i,"man"]].forEach((function(e){return m.addSingularRule(e[0],e[1])})),["adulthood","advice","agenda","aid","aircraft","alcohol","ammo","analytics","anime","athletics","audio","bison","blood","bream","buffalo","butter","carp","cash","chassis","chess","clothing","cod","commerce","cooperation","corps","debris","diabetes","digestion","elk","energy","equipment","excretion","expertise","firmware","flounder","fun","gallows","garbage","graffiti","hardware","headquarters","health","herpes","highjinks","homework","housework","information","jeans","justice","kudos","labour","literature","machinery","mackerel","mail","media","mews","moose","music","mud","manga","news","only","personnel","pike","plankton","pliers","police","pollution","premises","rain","research","rice","salmon","scissors","series","sewage","shambles","shrimp","software","species","staff","swine","tennis","traffic","transportation","trout","tuna","wealth","welfare","whiting","wildebeest","wildlife","you",/pok[e\xe9]mon$/i,/[^aeiou]ese$/i,/deer$/i,/fish$/i,/measles$/i,/o[iu]s$/i,/pox$/i,/sheep$/i].forEach(m.addUncountableRule),m}()},1187:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},r=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t}(a(0));function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var s=90,c=219,u=222,d=192,m=100,p=3e3,h="navigator"in e&&/Win/i.test(navigator.platform),f="navigator"in e&&/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform),g="npm__react-simple-code-editor__textarea",v=function(e){function t(){var e,a,r;i(this,t);for(var o=arguments.length,g=Array(o),v=0;v<o;v++)g[v]=arguments[v];return a=r=l(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(g))),r.state={capture:!0},r._recordCurrentState=function(){var e=r._input;if(e){var t=e.value,a=e.selectionStart,n=e.selectionEnd;r._recordChange({value:t,selectionStart:a,selectionEnd:n})}},r._getLines=function(e,t){return e.substring(0,t).split("\n")},r._recordChange=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=r._history,o=a.stack,i=a.offset;if(o.length&&i>-1){r._history.stack=o.slice(0,i+1);var l=r._history.stack.length;if(l>m){var s=l-m;r._history.stack=o.slice(s,l),r._history.offset=Math.max(r._history.offset-s,0)}}var c=Date.now();if(t){var u=r._history.stack[r._history.offset];if(u&&c-u.timestamp<p){var d=/[^a-z0-9]([a-z0-9]+)$/i,h=r._getLines(u.value,u.selectionStart).pop().match(d),f=r._getLines(e.value,e.selectionStart).pop().match(d);if(h&&f&&f[1].startsWith(h[1]))return void(r._history.stack[r._history.offset]=n({},e,{timestamp:c}))}}r._history.stack.push(n({},e,{timestamp:c})),r._history.offset++},r._updateInput=function(e){var t=r._input;t&&(t.value=e.value,t.selectionStart=e.selectionStart,t.selectionEnd=e.selectionEnd,r.props.onValueChange(e.value))},r._applyEdits=function(e){var t=r._input,a=r._history.stack[r._history.offset];a&&t&&(r._history.stack[r._history.offset]=n({},a,{selectionStart:t.selectionStart,selectionEnd:t.selectionEnd})),r._recordChange(e),r._updateInput(e)},r._undoEdit=function(){var e=r._history,t=e.stack,a=e.offset,n=t[a-1];n&&(r._updateInput(n),r._history.offset=Math.max(a-1,0))},r._redoEdit=function(){var e=r._history,t=e.stack,a=e.offset,n=t[a+1];n&&(r._updateInput(n),r._history.offset=Math.min(a+1,t.length-1))},r._handleKeyDown=function(e){var t=r.props,a=t.tabSize,n=t.insertSpaces,o=t.ignoreTabKey,i=t.onKeyDown;if(!i||(i(e),!e.defaultPrevented)){var l=e.target,m=l.value,p=l.selectionStart,g=l.selectionEnd,v=(n?" ":"     ").repeat(a);if(9===e.keyCode&&!o&&r.state.capture)if(e.preventDefault(),e.shiftKey){var b=r._getLines(m,p),y=b.length-1,E=r._getLines(m,g).length-1,C=m.split("\n").map((function(e,t){return t>=y&&t<=E&&e.startsWith(v)?e.substring(v.length):e})).join("\n");if(m!==C){var k=b[y];r._applyEdits({value:C,selectionStart:k.startsWith(v)?p-v.length:p,selectionEnd:g-(m.length-C.length)})}}else if(p!==g){var $=r._getLines(m,p),x=$.length-1,O=r._getLines(m,g).length-1,j=$[x];r._applyEdits({value:m.split("\n").map((function(e,t){return t>=x&&t<=O?v+e:e})).join("\n"),selectionStart:/\S/.test(j)?p+v.length:p,selectionEnd:g+v.length*(O-x+1)})}else{var _=p+v.length;r._applyEdits({value:m.substring(0,p)+v+m.substring(g),selectionStart:_,selectionEnd:_})}else if(8===e.keyCode){var w=p!==g;if(m.substring(0,p).endsWith(v)&&!w){e.preventDefault();var S=p-v.length;r._applyEdits({value:m.substring(0,p-v.length)+m.substring(g),selectionStart:S,selectionEnd:S})}}else if(13===e.keyCode){if(p===g){var L=r._getLines(m,p).pop().match(/^\s+/);if(L&&L[0]){e.preventDefault();var T="\n"+L[0],P=p+T.length;r._applyEdits({value:m.substring(0,p)+T+m.substring(g),selectionStart:P,selectionEnd:P})}}}else if(57===e.keyCode||e.keyCode===c||e.keyCode===u||e.keyCode===d){var I=void 0;57===e.keyCode&&e.shiftKey?I=["(",")"]:e.keyCode===c?I=e.shiftKey?["{","}"]:["[","]"]:e.keyCode===u?I=e.shiftKey?['"','"']:["'","'"]:e.keyCode!==d||e.shiftKey||(I=["`","`"]),p!==g&&I&&(e.preventDefault(),r._applyEdits({value:m.substring(0,p)+I[0]+m.substring(p,g)+I[1]+m.substring(g),selectionStart:p,selectionEnd:g+2}))}else!(f?e.metaKey&&e.keyCode===s:e.ctrlKey&&e.keyCode===s)||e.shiftKey||e.altKey?(f?e.metaKey&&e.keyCode===s&&e.shiftKey:h?e.ctrlKey&&89===e.keyCode:e.ctrlKey&&e.keyCode===s&&e.shiftKey)&&!e.altKey?(e.preventDefault(),r._redoEdit()):77!==e.keyCode||!e.ctrlKey||f&&!e.shiftKey||(e.preventDefault(),r.setState((function(e){return{capture:!e.capture}}))):(e.preventDefault(),r._undoEdit())}},r._handleChange=function(e){var t=e.target,a=t.value,n=t.selectionStart,o=t.selectionEnd;r._recordChange({value:a,selectionStart:n,selectionEnd:o},!0),r.props.onValueChange(a)},r._history={stack:[],offset:-1},l(r,a)}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentDidMount",value:function(){this._recordCurrentState()}},{key:"render",value:function(){var e=this,t=this.props,a=t.value,r=t.style,i=t.padding,l=t.highlight,s=t.textareaId,c=t.autoFocus,u=t.disabled,d=t.form,m=t.maxLength,p=t.minLength,h=t.name,f=t.placeholder,v=t.readOnly,y=t.required,E=t.onClick,C=t.onFocus,k=t.onBlur,$=t.onKeyUp,x=(t.onKeyDown,t.onValueChange,t.tabSize,t.insertSpaces,t.ignoreTabKey,function(e,t){var a={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n]);return a}(t,["value","style","padding","highlight","textareaId","autoFocus","disabled","form","maxLength","minLength","name","placeholder","readOnly","required","onClick","onFocus","onBlur","onKeyUp","onKeyDown","onValueChange","tabSize","insertSpaces","ignoreTabKey"])),O={paddingTop:i,paddingRight:i,paddingBottom:i,paddingLeft:i},j=l(a);return o.createElement("div",n({},x,{style:n({},b.container,r)}),o.createElement("textarea",{ref:function(t){return e._input=t},style:n({},b.editor,b.textarea,O),className:g,id:s,value:a,onChange:this._handleChange,onKeyDown:this._handleKeyDown,onClick:E,onKeyUp:$,onFocus:C,onBlur:k,disabled:u,form:d,maxLength:m,minLength:p,name:h,placeholder:f,readOnly:v,required:y,autoFocus:c,autoCapitalize:"off",autoComplete:"off",autoCorrect:"off",spellCheck:!1,"data-gramm":!1}),o.createElement("pre",n({"aria-hidden":"true",style:n({},b.editor,b.highlight,O)},"string"===typeof j?{dangerouslySetInnerHTML:{__html:j+"<br />"}}:{children:j})),o.createElement("style",{type:"text/css",dangerouslySetInnerHTML:{__html:"\n/**\n * Reset the text fill color so that placeholder is visible\n */\n.npm__react-simple-code-editor__textarea:empty {\n  -webkit-text-fill-color: inherit !important;\n}\n\n/**\n * Hack to apply on some CSS on IE10 and IE11\n */\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  /**\n    * IE doesn't support '-webkit-text-fill-color'\n    * So we use 'color: transparent' to make the text transparent on IE\n    * Unlike other browsers, it doesn't affect caret color in IE\n    */\n  .npm__react-simple-code-editor__textarea {\n    color: transparent !important;\n  }\n\n  .npm__react-simple-code-editor__textarea::selection {\n    background-color: #accef7 !important;\n    color: transparent !important;\n  }\n}\n"}}))}},{key:"session",get:function(){return{history:this._history}},set:function(e){this._history=e.history}}]),t}(o.Component);v.defaultProps={tabSize:2,insertSpaces:!0,ignoreTabKey:!1,padding:0},t.default=v;var b={container:{position:"relative",textAlign:"left",whiteSpace:"pre-wrap",wordBreak:"keep-all",boxSizing:"border-box",padding:0,overflow:"hidden"},textarea:{position:"absolute",top:0,left:0,height:"100%",width:"100%",resize:"none",color:"inherit",overflow:"hidden",MozOsxFontSmoothing:"grayscale",WebkitFontSmoothing:"antialiased",WebkitTextFillColor:"transparent"},highlight:{position:"relative",pointerEvents:"none"},editor:{margin:0,border:0,background:"none",boxSizing:"inherit",display:"inherit",fontFamily:"inherit",fontSize:"inherit",fontStyle:"inherit",fontVariantLigatures:"inherit",fontWeight:"inherit",letterSpacing:"inherit",lineHeight:"inherit",tabSize:"inherit",textIndent:"inherit",textRendering:"inherit",textTransform:"inherit",whiteSpace:"inherit",wordBreak:"inherit"}}}).call(this,a(70))},1313:function(e,t,a){"use strict";a.r(t);var n=a(6),r=a(15),o=a(0),i=a.n(o),l=a(4),s=a(143),c=a(875),u=a(876),d=a(81),m=a(877),p=a(849),h=a(16),f=a(1),g=a(1186),v=a(170),b=a.n(v),y=a(44),E=a(58),C=a(244),k=a(108),$=a(245),x=a(835),O=a(836),j=a(850),_=a(145),w=a(646),S=a(886),L=a(889),T=a(888),P=a(144),I=a(839),N=a(652),K=a(109),M=a(118),z=a(253),F=a.n(z),A=a(182),D=a.n(A),R=a(535),W=a.n(R),U=a(7),V=a(192),q=a(401),B=a(294),H=a.n(B),G=a(1187),J=a.n(G),Z=Object(s.a)((function(e){return{callbackEditor:{marginTop:"16px",borderBottom:"1px solid ".concat(e.palette.divider),fontFamily:'Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace',fontSize:"12px"}}}));var Q=Object(h.observer)((function(e){var t=e.slot,a=Z(),r=Object(o.useState)(t.value),l=Object(n.a)(r,2),s=l[0],c=l[1],u=Object(o.useState)(),d=Object(n.a)(u,2),m=d[0],p=d[1],h=Object(U.useDebounce)(s,400);return Object(o.useEffect)((function(){try{var e,a=h.startsWith("jexl:")?h:"jexl:".concat(h);Object(V.a)(a,null===(e=Object(f.getEnv)(t).pluginManager)||void 0===e?void 0:e.jexl),t.set(a),p(null)}catch(n){console.error({e:n}),p(n)}}),[h,t]),i.a.createElement(i.a.Fragment,null,i.a.createElement(P.a,null,i.a.createElement($.a,{shrink:!0,htmlFor:"callback-editor"},t.name),i.a.createElement(J.a,{className:a.callbackEditor,value:s.startsWith("jexl:")?s.split("jexl:")[1]:s,onValueChange:function(e){return c(e)},highlight:function(e){return e},padding:10,style:{background:m?"#fdd":void 0}}),m?i.a.createElement(w.a,{style:{color:"#f00"}},"".concat(m)):null,i.a.createElement(w.a,null,t.description)),i.a.createElement(q.a,{title:i.a.createElement("div",null,"Callbacks are written in Jexl format. Click to learn more.",i.a.createElement("br",null)," Names of available context items: ",t.contextVariable),arrow:!0},i.a.createElement(_.a,{color:"primary",onClick:function(){var e=window.open("https://github.com/TomFrost/Jexl","_blank","noopener,noreferrer");e&&(e.opener=null)}},i.a.createElement(H.a,null))))})),X=Object(o.lazy)((function(){return a.e(4).then(a.bind(null,1303))}));var Y=function(e){var t=e.value,a=e.label,r=e.TextFieldProps,l=e.onChange,s=Object(o.useState)(!1),c=Object(n.a)(s,2),u=c[0],d=c[1];return i.a.createElement(i.a.Fragment,null,i.a.createElement(C.a,Object.assign({value:t,label:a,InputProps:{style:{color:t,borderRightWidth:"25px",borderRightStyle:"solid",borderRightColor:t}},onClick:function(){return d(!u)},onChange:function(e){l(e.target.value)}},r)),u?i.a.createElement(i.a.Suspense,{fallback:i.a.createElement("div",null)},i.a.createElement(X,{color:t,onChange:function(e){l(function(e){if(e instanceof Object){var t=e,a=t.r,n=t.g,r=t.b,o=t.a;return void 0===o?"rgb(".concat(a,",").concat(n,",").concat(r,")"):"rgba(".concat(a,",").concat(n,",").concat(r,",").concat(o,")")}return e}(e.rgb))}})):null)};Y.defaultProps={label:"",value:"#000",TextFieldProps:{}};var ee=Object(h.observer)((function(e){var t=e.slot;return i.a.createElement(Y,{label:t.name,value:t.value,onChange:function(e){t.set(e)},TextFieldProps:{helperText:t.description,fullWidth:!0}})})),te=a(442),ae=Object(h.observer)((function(e){var t=e.slot;return i.a.createElement(C.a,{label:t.name,helperText:t.description,fullWidth:!0,value:t.value,onChange:function(e){return t.set(e.target.value)}})})),ne=Object(h.observer)((function(e){var t=e.slot;return i.a.createElement(C.a,{label:t.name,helperText:t.description,fullWidth:!0,multiline:!0,value:t.value,onChange:function(e){return t.set(e.target.value)}})})),re=function(){return i.a.createElement(k.a,null,i.a.createElement("path",{d:"M20.41,3C21.8,5.71 22.35,8.84 22,12C21.8,15.16 20.7,18.29 18.83,21L17.3,20C18.91,17.57 19.85,14.8 20,12C20.34,9.2 19.89,6.43 18.7,4L20.41,3M5.17,3L6.7,4C5.09,6.43 4.15,9.2 4,12C3.66,14.8 4.12,17.57 5.3,20L3.61,21C2.21,18.29 1.65,15.17 2,12C2.2,8.84 3.3,5.71 5.17,3M12.08,10.68L14.4,7.45H16.93L13.15,12.45L15.35,17.37H13.09L11.71,14L9.28,17.33H6.76L10.66,12.21L8.53,7.45H10.8L12.08,10.68Z"}))},oe=Object(h.observer)((function(e){var t=e.slot,a=Object(o.useState)(""),r=Object(n.a)(a,2),l=r[0],s=r[1];return i.a.createElement(i.a.Fragment,null,t.name?i.a.createElement($.a,null,t.name):null,i.a.createElement(x.a,{disablePadding:!0},t.value.map((function(e,a){return i.a.createElement(O.a,{key:a,disableGutters:!0},i.a.createElement(C.a,{value:e,onChange:function(e){return t.setAtIndex(a,e.target.value)},InputProps:{endAdornment:i.a.createElement(j.a,{position:"end"},i.a.createElement(_.a,{color:"secondary",onClick:function(){return t.removeAtIndex(a)}},i.a.createElement(F.a,null)))}}))})),i.a.createElement(O.a,{disableGutters:!0},i.a.createElement(C.a,{value:l,placeholder:"add new",onChange:function(e){return s(e.target.value)},InputProps:{endAdornment:i.a.createElement(j.a,{position:"end"},i.a.createElement(_.a,{onClick:function(){t.add(l),s("")},disabled:""===l,color:"secondary","data-testid":"stringArrayAdd-".concat(t.name)},i.a.createElement(D.a,null)))}}))),i.a.createElement(w.a,null,t.description))})),ie=Object(s.a)((function(e){return{card:{marginTop:e.spacing(1)}}})),le=Object(h.observer)((function(e){var t=e.slot,a=ie(),r=Object(o.useState)(""),l=Object(n.a)(r,2),s=l[0],c=l[1];return i.a.createElement(i.a.Fragment,null,i.a.createElement($.a,null,t.name),Array.from(t.value,(function(e){var r=Object(n.a)(e,2),o=r[0],l=r[1];return i.a.createElement(S.a,{raised:!0,key:o,className:a.card},i.a.createElement(L.a,{title:o,action:i.a.createElement(_.a,{color:"secondary",onClick:function(){return t.remove(o)}},i.a.createElement(F.a,null))}),i.a.createElement(T.a,null,i.a.createElement(oe,{slot:{value:l,description:"Values associated with entry ".concat(o),setAtIndex:function(e,a){t.setAtKeyIndex(o,e,a)},removeAtIndex:function(e){t.removeAtKeyIndex(o,e)},add:function(e){t.addToKey(o,e)}}})))})),i.a.createElement(S.a,{raised:!0,className:a.card},i.a.createElement(L.a,{disableTypography:!0,title:i.a.createElement(C.a,{fullWidth:!0,value:s,placeholder:"add new",onChange:function(e){return c(e.target.value)},InputProps:{endAdornment:i.a.createElement(j.a,{position:"end"},i.a.createElement(_.a,{disabled:""===s,onClick:function(){t.add(s,[]),c("")},color:"secondary"},i.a.createElement(D.a,null)))}})})),i.a.createElement(w.a,null,t.description))})),se=Object(h.observer)((function(e){var t=e.slot,a=ie(),r=Object(o.useState)(""),l=Object(n.a)(r,2),s=l[0],c=l[1];return i.a.createElement(i.a.Fragment,null,i.a.createElement($.a,null,t.name),Array.from(t.value,(function(e){var r=Object(n.a)(e,2),o=r[0],l=r[1];return i.a.createElement(S.a,{raised:!0,key:o,className:a.card},i.a.createElement(L.a,{title:o,action:i.a.createElement(_.a,{color:"secondary",onClick:function(){return t.remove(o)}},i.a.createElement(F.a,null))}),i.a.createElement(T.a,null,i.a.createElement(ce,{slot:{value:l,set:function(e){return t.add(o,e)}}})))})),i.a.createElement(S.a,{raised:!0,className:a.card},i.a.createElement(L.a,{disableTypography:!0,title:i.a.createElement(C.a,{fullWidth:!0,value:s,placeholder:"add new",onChange:function(e){return c(e.target.value)},InputProps:{endAdornment:i.a.createElement(j.a,{position:"end"},i.a.createElement(_.a,{disabled:""===s,onClick:function(){t.add(s,0),c("")},color:"secondary"},i.a.createElement(D.a,null)))}})})),i.a.createElement(w.a,null,t.description))})),ce=Object(h.observer)((function(e){var t=e.slot,a=Object(o.useState)(t.value),r=Object(n.a)(a,2),l=r[0],s=r[1];return Object(o.useEffect)((function(){var e=parseFloat(l,10);Number.isNaN(e)?t.reset():t.set(e)}),[t,l]),i.a.createElement(C.a,{label:t.name,helperText:t.description,value:l,type:"number",onChange:function(e){return s(e.target.value)}})})),ue=Object(h.observer)((function(e){var t=e.slot,a=Object(o.useState)(t.value),r=Object(n.a)(a,2),l=r[0],s=r[1];return Object(o.useEffect)((function(){var e=parseInt(l,10);Number.isNaN(e)||t.set(e)}),[t,l]),i.a.createElement(C.a,{label:t.name,helperText:t.description,value:l,type:"number",onChange:function(e){return s(e.target.value)}})})),de=Object(h.observer)((function(e){var t=e.slot;return i.a.createElement(P.a,null,i.a.createElement(I.a,{label:t.name,control:i.a.createElement(N.a,{checked:t.value,onChange:function(e){return t.set(e.target.checked)}})}),i.a.createElement(w.a,null,t.description))})),me=Object(h.observer)((function(e){var t=e.slot,a=e.slotSchema,n=Object(f.getPropertyMembers)(Object(E.getSubType)(a)),r=Object(E.getUnionSubTypes)(Object(E.getUnionSubTypes)(Object(E.getSubType)(Object(E.getPropertyType)(n,"value")))[1]).map((function(e){return e.value}));return i.a.createElement(C.a,{value:t.value,label:t.name,select:!0,helperText:t.description,fullWidth:!0,onChange:function(e){return t.set(e.target.value)}},r.map((function(e){return i.a.createElement(K.a,{key:e,value:e},e)})))})),pe=Object(h.observer)((function(e){var t,a=e.slot;return i.a.createElement(y.FileSelector,{location:a.value,setLocation:function(e){return a.set(e)},name:a.name,description:a.description,rootModel:null===(t=Object(f.getEnv)(a).pluginManager)||void 0===t?void 0:t.rootModel})})),he={string:ae,text:ne,fileLocation:pe,stringArray:oe,stringArrayMap:le,numberMap:se,number:ce,integer:ue,color:ee,stringEnum:me,boolean:de,frozen:te.a,configRelationships:te.a},fe=Object(s.a)((function(e){return{paper:{display:"flex",marginBottom:e.spacing(2),position:"relative"},paperContent:{width:"100%"},slotModeSwitch:{width:24,background:e.palette.secondary.light,display:"flex",justifyContent:"center",alignItems:"center"}}})),ge=Object(h.observer)((function(e){var t=e.slot,a=e.slotSchema,n=fe(),r=t.type,o=t.isCallback?Q:he[r];return o||(console.warn("no slot editor defined for ".concat(r,", editing as string")),o=ae),r in he||console.warn("SlotEditor needs to implement ".concat(r)),i.a.createElement(M.a,{className:n.paper},i.a.createElement("div",{className:n.paperContent},i.a.createElement(o,{slot:t,slotSchema:a})),i.a.createElement("div",{className:n.slotModeSwitch},t.contextVariable.length?i.a.createElement(_.a,{className:n.slotModeIcon,onClick:function(){return t.isCallback?t.convertToValue():t.convertToCallback()},title:"convert to ".concat(t.isCallback?"regular value":"callback"),color:"secondary"},t.isCallback?i.a.createElement(re,null):i.a.createElement(W.a,null)):null))})),ve=Object(h.observer)((function(e){var t=e.typeNameChoices,a=e.slot,n=e.slotName,r=e.onChange,o=fe();return i.a.createElement(M.a,{className:o.paper},i.a.createElement("div",{className:o.paperContent},i.a.createElement(C.a,{value:a.type,label:"Type",select:!0,helperText:"Type of ".concat(n," to use"),fullWidth:!0,onChange:r},t.map((function(e){return i.a.createElement(K.a,{key:e,value:e},e)})))))})),be=Object(s.a)((function(e){return{expandIcon:{color:"#fff"},root:{padding:e.spacing(1,3,1,1)},expansionPanelDetails:{display:"block",padding:e.spacing(1)},accordion:{border:"1px solid ".concat(e.palette.text.primary)}}})),ye=Object(h.observer)((function(e){var t,a=be(),n=e.slotName,o=e.slotSchema,s=e.schema,h=e.slot,f=void 0===h?s[n]:h,v=e.path,y=void 0===v?[]:v;if(Object(l.isConfigurationSchemaType)(o)){if(f.length)return f.map((function(t,a){var r="".concat(Object(g.singular)(n)," ").concat(a+1);return i.a.createElement(ye,Object.assign({},e,{key:r,slot:t,slotName:r}))}));var E=Object(l.getTypeNamesFromExplicitlyTypedUnion)(o);return E.length&&(t=i.a.createElement(ve,{typeNameChoices:E,slotName:n,slot:f,onChange:function(e){e.target.value!==f.type&&s.setSubschema(n,{type:e.target.value})}})),i.a.createElement(c.a,{defaultExpanded:!0,className:a.accordion,TransitionProps:{unmountOnExit:!0,timeout:150}},i.a.createElement(u.a,{expandIcon:i.a.createElement(b.a,{className:a.expandIcon})},i.a.createElement(d.a,null,[].concat(Object(r.a)(y),[n]).join("\ud83e\udc52"))),i.a.createElement(m.a,{className:a.expansionPanelDetails},t,i.a.createElement(p.a,null,i.a.createElement(Ee,{schema:f,path:[].concat(Object(r.a)(y),[n])}))))}return Object(l.isConfigurationSlotType)(o)?i.a.createElement(ge,{key:n,slot:f,slotSchema:o}):null})),Ee=Object(h.observer)((function(e){var t=e.schema,a=e.path,r=void 0===a?[]:a,o=Object(f.getMembers)(t).properties;return Object.entries(o).map((function(e){var a=Object(n.a)(e,2),o=a[0],l=a[1];return i.a.createElement(ye,{key:o,slotName:o,slotSchema:l,path:r,schema:t})}))})),Ce=Object(h.observer)((function(e){var t=e.model,a=be(),n=t.target&&Object(l.readConfObject)(t.target,"trackId"),r=t.target&&Object(l.readConfObject)(t.target,"name");return i.a.createElement(c.a,{key:n,defaultExpanded:!0,className:a.accordion,TransitionProps:{unmountOnExit:!0,timeout:150}},i.a.createElement(u.a,{expandIcon:i.a.createElement(b.a,{className:a.expandIcon})},i.a.createElement(d.a,null,r||"Configuration")),i.a.createElement(m.a,{className:a.expansionPanelDetails,"data-testid":"configEditor"},t.target?i.a.createElement(Ee,{schema:t.target}):"no target set"))}));t.default=Ce}});
//# sourceMappingURL=30.aa3f117980c15500c977.worker.js.map