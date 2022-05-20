this.webpackChunk([24],{1240:function(e,t,a){"use strict";var n=a(27),r=a(31);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(a(0)),l=(0,n(a(32)).default)(o.createElement("path",{d:"M7.11 8.53L5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z"}),"RotateLeft");t.default=l},1241:function(e,t,a){"use strict";var n=a(27),r=a(31);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(a(0)),l=(0,n(a(32)).default)(o.createElement("path",{d:"M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z"}),"RotateRight");t.default=l},1242:function(e,t,a){"use strict";var n=a(27),r=a(31);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(a(0)),l=(0,n(a(32)).default)(o.createElement("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"}),"LockOutlined");t.default=l},1243:function(e,t,a){"use strict";var n=a(27),r=a(31);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(a(0)),l=(0,n(a(32)).default)(o.createElement("path",{d:"M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"}),"LockOpen");t.default=l},1316:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(16),l=a(44),c=a(7),i=a(143),s=a(145),d=a(199),m=a(287),u=a.n(m),g=a(189),b=a.n(g),f=a(1240),h=a.n(f),p=a(1241),v=a.n(p),E=a(1242),k=a.n(E),x=a(1243),j=a.n(x),O=a(88),y=a(15),w=a(198),z=a(45),C=Object(i.a)({rulerLabel:{fontSize:"0.8rem",fontWeight:500,lineHeight:1.6,letterSpacing:"0.0075em"}});function M(e,t,a,n){if(e.flipped){var r=[n,a];a=r[0],n=r[1]}var o=e.bpToXY(a,t),l=e.bpToXY(n,t),c=Math.abs(n-a)/e.bpPerRadian>Math.PI?"1":"0";return["M"].concat(Object(y.a)(o),["A",t,t,"0",c,"1"],Object(y.a)(l)).join(" ")}var N=Object(o.observer)((function(e){var t=e.model,a=e.slice,n=Object(z.a)(),o=t.radiusPx+1,l=a.endRadians,i=a.startRadians,s=a.region,d=Object(c.polarToCartesian)(o,i),m=Object(c.polarToCartesian)(o,l),u=(l-i)*o,g=l-i>Math.PI?"1":"0",b=(l+i)/2,f="[".concat(Number(s.regions.length).toLocaleString(),"]");return r.a.createElement(r.a.Fragment,null,r.a.createElement(S,{text:f,view:t,maxWidthPx:u,radians:b,radiusPx:o,title:"".concat(Number(s.regions.length).toLocaleString()," more regions"),color:n.palette.text.primary}),r.a.createElement("path",{d:["M"].concat(Object(y.a)(d),["A",o,o,"0",g,"1"],Object(y.a)(m)).join(" "),stroke:n.palette.text.secondary,strokeWidth:2,strokeDasharray:"2,2",fill:"none"}))})),S=Object(o.observer)((function(e){var t=e.view,a=e.text,n=e.maxWidthPx,o=e.radians,l=e.radiusPx,i=e.title,s=e.color,d=C(),m=Object(c.polarToCartesian)(l+5,o);return a?6.5*a.length<n?r.a.createElement("text",{x:0,y:0,className:d.rulerLabel,textAnchor:"middle",dominantBaseline:"baseline",transform:"translate(".concat(m,") rotate(").concat(Object(c.radToDeg)(o)+90,")"),style:{fill:s}},a,r.a.createElement("title",null,i||a)):n>4?Object(c.radToDeg)(o+t.offsetRadians-Math.PI/2)>=180?r.a.createElement("text",{x:0,y:0,className:d.rulerLabel,textAnchor:"start",dominantBaseline:"middle",transform:"translate(".concat(m,") rotate(").concat(Object(c.radToDeg)(o),")"),style:{fill:s}},a,r.a.createElement("title",null,i||a)):r.a.createElement("text",{x:0,y:0,className:d.rulerLabel,textAnchor:"end",dominantBaseline:"middle",transform:"translate(".concat(m,") rotate(").concat(Object(c.radToDeg)(o)+180,")"),style:{fill:s}},a,r.a.createElement("title",null,i||a)):null:null})),B=Object(o.observer)((function(e){var t,a=e.model,n=e.slice,o=Object(z.a)(),l=a.radiusPx,i=n.region,s=n.endRadians,d=n.startRadians,m=(s+d)/2,u=(s-d)*l,g=Object(c.getSession)(a).assemblyManager.get(n.region.assemblyName);if(g&&(t=g.getRefNameColor(i.refName)),t)try{t=Object(w.makeContrasting)(t,o.palette.background.paper)}catch(b){t=o.palette.text.primary}else t=o.palette.text.primary;return r.a.createElement(r.a.Fragment,null,r.a.createElement(S,{text:i.refName,view:a,maxWidthPx:u,radians:m,radiusPx:l,color:t}),r.a.createElement("path",{d:M(n,l+1,i.start,i.end),stroke:t,strokeWidth:2,fill:"none"},r.a.createElement("title",null,i.refName)))})),P=Object(o.observer)((function(e){var t=e.model,a=e.slice;return a.region.elided?r.a.createElement(N,{key:Object(c.assembleLocString)(a.region.regions[0]),model:t,slice:a}):r.a.createElement(B,{key:Object(c.assembleLocString)(a.region),model:t,slice:a})})),L=a(6),R=a(890),T=a(891),F=a(136),W=a(282),H=a(187),V=Object(i.a)((function(e){return{importFormContainer:{marginBottom:e.spacing(4)}}})),_=Object(o.observer)((function(e){var t=e.model,a=V(),o=Object(c.getSession)(t),l=t.error,i=o.assemblyNames,s=o.assemblyManager,d=Object(n.useState)(i[0]),m=Object(L.a)(d,2),u=m[0],g=m[1],b=Object(n.useState)(l),f=Object(L.a)(b,2),h=f[0],p=f[1],v=s.get(u),E=i.length?null===v||void 0===v?void 0:v.error:"No configured assemblies",k=(null===v||void 0===v?void 0:v.regions)||[],x=E||h;return r.a.createElement(R.a,{className:a.importFormContainer},x?r.a.createElement(T.a,{container:!0,spacing:1,justifyContent:"center",alignItems:"center"},r.a.createElement(T.a,{item:!0},r.a.createElement(W.a,{error:x}))):null,r.a.createElement(T.a,{container:!0,spacing:1,justifyContent:"center",alignItems:"center"},r.a.createElement(T.a,{item:!0},r.a.createElement(H.a,{onChange:function(e){p(void 0),g(e)},session:o,selected:u})),r.a.createElement(T.a,{item:!0},r.a.createElement(F.a,{disabled:!(null!==k&&void 0!==k&&k.length),onClick:function(){return t.setDisplayedRegions(k)},variant:"contained",color:"primary"},k.length?"Open":"Loading\u2026"))))})),D=Object(i.a)((function(e){return{root:{position:"relative",marginBottom:e.spacing(1),overflow:"hidden",background:"white"},scroller:{overflow:"auto"},sliceRoot:{background:"none",boxSizing:"content-box",display:"block"},iconButton:{padding:"4px",margin:"0 2px 0 2px"},controls:{overflow:"hidden",whiteSpace:"nowrap",position:"absolute",background:d.a[200],boxSizing:"border-box",borderRight:"1px solid #a2a2a2",borderBottom:"1px solid #a2a2a2",left:0,top:0},importFormContainer:{marginBottom:e.spacing(4)}}})),I=Object(o.observer)((function(e){var t=e.model;return r.a.createElement(r.a.Fragment,null,t.staticSlices.map((function(e){return r.a.createElement(P,{key:Object(c.assembleLocString)(e.region.elided?e.region.regions[0]:e.region),model:t,slice:e})})),t.tracks.map((function(e){var a=e.displays[0];return r.a.createElement(a.RenderingComponent,{key:a.id,display:a,view:t})})))})),A=Object(o.observer)((function(e){var t=e.model,a=e.showingFigure,n=D();return r.a.createElement("div",{className:n.controls},r.a.createElement(s.a,{onClick:t.zoomOutButton,className:n.iconButton,title:t.lockedFitToWindow?"unlock to zoom out":"zoom out",disabled:!a||t.atMaxBpPerPx||t.lockedFitToWindow,color:"secondary"},r.a.createElement(u.a,null)),r.a.createElement(s.a,{onClick:t.zoomInButton,className:n.iconButton,title:"zoom in",disabled:!a||t.atMinBpPerPx,color:"secondary"},r.a.createElement(b.a,null)),r.a.createElement(s.a,{onClick:t.rotateCounterClockwiseButton,className:n.iconButton,title:"rotate counter-clockwise",disabled:!a,color:"secondary"},r.a.createElement(h.a,null)),r.a.createElement(s.a,{onClick:t.rotateClockwiseButton,className:n.iconButton,title:"rotate clockwise",disabled:!a,color:"secondary"},r.a.createElement(v.a,null)),r.a.createElement(s.a,{onClick:t.toggleFitToWindowLock,className:n.iconButton,title:t.lockedFitToWindow?"locked model to window size":"unlocked model to zoom further",disabled:t.tooSmallToLock,color:"secondary"},t.lockedFitToWindow?r.a.createElement(k.a,null):r.a.createElement(j.a,null)),t.hideTrackSelectorButton?null:r.a.createElement(s.a,{onClick:t.activateTrackSelector,title:"Open track selector","data-testid":"circular_track_select",color:"secondary"},r.a.createElement(O.c,null)))})),X=Object(o.observer)((function(e){var t=e.model,a=D(),n=!!t.displayedRegions.length&&t.figureWidth&&t.figureHeight,o=!n&&!t.disableImportForm,c=n&&!o;return r.a.createElement("div",{className:a.root,style:{width:t.width,height:t.height},"data-testid":t.id},t.error?r.a.createElement(l.ErrorMessage,{error:t.error}):r.a.createElement(r.a.Fragment,null,o?r.a.createElement(_,{model:t}):null,r.a.createElement(r.a.Fragment,null,c?r.a.createElement("div",{className:a.scroller,style:{width:t.width,height:t.height}},r.a.createElement("div",{className:a.rotator,style:{transform:["rotate(".concat(t.offsetRadians,"rad)")].join(" "),transition:"transform 0.5s",transformOrigin:t.centerXY.map((function(e){return"".concat(e,"px")})).join(" ")}},r.a.createElement("svg",{style:{position:"absolute",left:0,top:0},className:a.sliceRoot,width:"".concat(t.figureWidth,"px"),height:"".concat(t.figureHeight,"px"),version:"1.1"},r.a.createElement("g",{transform:"translate(".concat(t.centerXY,")")},r.a.createElement(I,{model:t}))))):null,r.a.createElement(A,{model:t,showingFigure:c}),t.hideVerticalResizeHandle?null:r.a.createElement(l.ResizeHandle,{onDrag:t.resizeHeight,style:{height:3,position:"absolute",bottom:0,left:0,background:"#ccc",boxSizing:"border-box",borderTop:"1px solid #fafafa"}}))))}));t.default=X}});
//# sourceMappingURL=24.aa3f117980c15500c977.worker.js.map