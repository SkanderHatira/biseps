(this["webpackJsonp@jbrowse/web"]=this["webpackJsonp@jbrowse/web"]||[]).push([[29],{1569:function(e,a,t){"use strict";var n=t(90),o=t(93);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var c=o(t(1)),l=(0,n(t(94)).default)(c.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Create");a.default=l},1570:function(e,a,t){"use strict";var n=t(90),o=t(93);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var c=o(t(1)),l=(0,n(t(94)).default)(c.createElement("path",{d:"M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"}),"ArrowBackIos");a.default=l},1743:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return Q}));var n=t(29),o=t(1),c=t.n(o),l=t(84),r=t(51),i=t(1664),s=t(1667),m=t(1640),u=t(1668),d=t(1669),p=t(1633),b=t(1570),f=t.n(b),E=t(112),g=t.n(E),y=t(237),v=t.n(y),j=t(1695),L=t(1653),O=t(1693),h=t(1628),C=t(1691),A=t(1694),w=t(1636),B=t(1692),S=t(1569),k=t.n(S),z=t(257),F=t.n(z),N=t(79),T=Object(r.a)((function(){return{table:{minWidth:500,minHeight:150},buttonCell:{padding:3},button:{display:"inline-block",padding:3,minHeight:0,minWidth:0}}})),x=Object(l.observer)((function(e){var a=e.rootModel,t=e.setIsAssemblyBeingEdited,n=e.setAssemblyBeingEdited,o=T();var l=a.jbrowse.assemblies.map((function(e){var l=Object(N.readConfObject)(e,"name"),r=Object(N.readConfObject)(e,"displayName"),i=Object(N.readConfObject)(e,"aliases");return c.a.createElement(j.a,{key:l},c.a.createElement(L.a,null,l),c.a.createElement(L.a,null,r),c.a.createElement(L.a,null,i?i.toString():""),c.a.createElement(L.a,{className:o.buttonCell},c.a.createElement(m.a,{"data-testid":"".concat(l,"-edit"),className:o.button,onClick:function(){t(!0),n(e)}},c.a.createElement(k.a,{color:"primary"})),c.a.createElement(m.a,{"data-testid":"".concat(l,"-delete"),className:o.button,onClick:function(){!function(e){a.jbrowse.removeAssemblyConf(e)}(l)}},c.a.createElement(F.a,{color:"error"}))))}));return c.a.createElement(O.a,{component:h.a},c.a.createElement(C.a,{className:o.table},c.a.createElement(A.a,null,c.a.createElement(j.a,null,c.a.createElement(L.a,null,c.a.createElement(w.a,{variant:"h5"},"Name")),c.a.createElement(L.a,null,c.a.createElement(w.a,{variant:"h5"},"Display name")),c.a.createElement(L.a,null,c.a.createElement(w.a,{variant:"h5"},"Aliases")),c.a.createElement(L.a,null,c.a.createElement(w.a,{variant:"h5"},"Actions")))),c.a.createElement(B.a,null,l)))})),M=t(660),I=t(1643),P=t(1631),_=t(1681),q=Object(r.a)((function(e){return{root:{flexGrow:1,overflow:"hidden",padding:e.spacing(0,3)},paper:{margin:"".concat(e.spacing(1),"px auto"),padding:e.spacing(2)},createButton:{marginTop:"1em",justifyContent:"center"},paperContent:{flex:"auto",margin:"".concat(e.spacing(1),"px auto"),padding:e.spacing(1),overflow:"auto"}}})),G=Object(l.observer)((function(e){var a=e.adapterSelection,t=e.setAdapterSelection,n=e.adapterTypes;return c.a.createElement(I.a,{value:a,label:"Type",select:!0,helperText:"Type of adapter to use",fullWidth:!0,onChange:function(e){t(e.target.value)}},n.map((function(e){return c.a.createElement(P.a,{key:e,value:e},e)})))})),H=Object(l.observer)((function(e){var a=e.adapterSelection,t=e.fastaLocation,n=e.setFastaLocation,o=e.faiLocation,l=e.setFaiLocation,r=e.gziLocation,i=e.setGziLocation,s=e.twoBitLocation,m=e.setTwoBitLocation,u=e.chromSizesLocation,d=e.setChromSizesLocation;return"IndexedFastaAdapter"===a||"BgzipFastaAdapter"===a?c.a.createElement(_.a,{container:!0,spacing:2},c.a.createElement(_.a,{item:!0},c.a.createElement(M.a,{name:"fastaLocation",location:t,setLocation:function(e){return n(e)}})),c.a.createElement(_.a,{item:!0},c.a.createElement(M.a,{name:"faiLocation",location:o,setLocation:function(e){return l(e)}})),"BgzipFastaAdapter"===a?c.a.createElement(_.a,{item:!0},c.a.createElement(M.a,{name:"gziLocation",location:r,setLocation:function(e){return i(e)}})):null):"TwoBitAdapter"===a?c.a.createElement(_.a,{container:!0,spacing:2},c.a.createElement(_.a,{item:!0},c.a.createElement(M.a,{name:"twoBitLocation",location:s,setLocation:function(e){return m(e)}})),c.a.createElement(_.a,{item:!0},c.a.createElement(M.a,{name:"chromSizesLocation (optional, can be added to speed up loading 2bit files with many contigs)",location:u,setLocation:function(e){return d(e)}}))):null})),J={uri:""},W=Object(l.observer)((function(e){var a=e.rootModel,t=e.setFormOpen,l=q(),r=["IndexedFastaAdapter","BgzipFastaAdapter","TwoBitAdapter"],i=Object(o.useState)(""),s=Object(n.a)(i,2),m=s[0],u=s[1],d=Object(o.useState)(""),b=Object(n.a)(d,2),f=b[0],E=b[1],g=Object(o.useState)(r[0]),y=Object(n.a)(g,2),j=y[0],L=y[1],O=Object(o.useState)(J),C=Object(n.a)(O,2),A=C[0],w=C[1],B=Object(o.useState)(J),S=Object(n.a)(B,2),k=S[0],z=S[1],F=Object(o.useState)(J),N=Object(n.a)(F,2),T=N[0],x=N[1],M=Object(o.useState)(J),P=Object(n.a)(M,2),W=P[0],D=P[1],V=Object(o.useState)(J),K=Object(n.a)(V,2),Q=K[0],R=K[1];return c.a.createElement("div",{className:l.root},c.a.createElement(h.a,{className:l.paper},c.a.createElement(I.a,{id:"assembly-name",inputProps:{"data-testid":"assembly-name"},label:"Assembly name",helperText:"The assembly name e.g. hg38",variant:"outlined",value:m,onChange:function(e){return u(e.target.value)}}),c.a.createElement(I.a,{id:"assembly-name",inputProps:{"data-testid":"assembly-display-name"},label:"Assembly display name",helperText:'A human readable display name for the assembly e.g. "Homo sapiens (hg38)"',variant:"outlined",value:f,onChange:function(e){return E(e.target.value)}}),c.a.createElement(G,{adapterSelection:j,setAdapterSelection:L,adapterTypes:r}),c.a.createElement("div",{className:l.paperContent},c.a.createElement(H,{adapterSelection:j,fastaLocation:A,setFastaLocation:w,faiLocation:k,setFaiLocation:z,gziLocation:T,setGziLocation:x,twoBitLocation:W,setTwoBitLocation:D,chromSizesLocation:Q,setChromSizesLocation:R}))),c.a.createElement(_.a,{container:!0,className:l.createButton},c.a.createElement(_.a,{item:!0},c.a.createElement(p.a,{variant:"contained",color:"secondary",startIcon:c.a.createElement(v.a,null),onClick:function(){var e;""===m?a.session.notify("Can't create an assembly without a name"):(t(!1),"IndexedFastaAdapter"===j?e={name:m,displayName:f,sequence:{adapter:{type:"IndexedFastaAdapter",fastaLocation:A,faiLocation:k}}}:"BgzipFastaAdapter"===j?e={name:m,displayName:f,sequence:{adapter:{type:"BgzipFastaAdapter",fastaLocation:A,faiLocation:k,gziLocation:T}}}:"TwoBitAdapter"===j&&(e={name:m,displayName:f,sequence:{adapter:{type:"TwoBitAdapter",twoBitLocation:W,chromSizesLocation:Q}}}),a.jbrowse.addAssemblyConf(e),a.session.notify("Successfully added ".concat(m," assembly to JBrowse 2"),"success"))}},"Create new assembly"))))})),D=t(658),V=Object(l.observer)((function(e){var a=e.assembly;return c.a.createElement(D.a,{model:{target:a}})})),K=Object(r.a)((function(e){return{titleBox:{color:"#fff",backgroundColor:e.palette.primary.main,textAlign:"center"},dialogContent:{width:"100%"},backButton:{color:"#fff",position:"absolute",left:e.spacing(4),top:e.spacing(4)},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]}}}));var Q=Object(l.observer)((function(e){var a=e.rootModel,t=e.onClose,l=K(),r=Object(o.useState)(!1),b=Object(n.a)(r,2),E=b[0],y=b[1],j=Object(o.useState)(!1),L=Object(n.a)(j,2),O=L[0],h=L[1],C=Object(o.useState)(),A=Object(n.a)(C,2),w=A[0],B=A[1],S=!E&&!O;return c.a.createElement(i.a,{open:!0,onClose:function(){return t(!1)}},c.a.createElement(s.a,{className:l.titleBox},S?"Assembly manager":null,E?c.a.createElement(c.a.Fragment,null,c.a.createElement(m.a,{"aria-label":"back",className:l.backButton,onClick:function(){return y(!1)}},c.a.createElement(f.a,null)),"Add new assembly"):null,O?c.a.createElement(c.a.Fragment,null,c.a.createElement(m.a,{"aria-label":"back",className:l.backButton,onClick:function(){return h(!1)}},c.a.createElement(f.a,null)),function(e){if(void 0!==e)return e.name;return null}(w)):null,c.a.createElement(m.a,{"aria-label":"close",className:l.closeButton,onClick:function(){return t(!1)}},c.a.createElement(g.a,null))),c.a.createElement(u.a,null,c.a.createElement("div",{className:l.dialogContent},S?c.a.createElement(x,{rootModel:a,setIsAssemblyBeingEdited:h,setAssemblyBeingEdited:B}):null,O?c.a.createElement(V,{assembly:w}):null,E?c.a.createElement(W,{rootModel:a,setFormOpen:y}):null)),c.a.createElement(d.a,null,S?c.a.createElement(c.a.Fragment,null,c.a.createElement(p.a,{color:"secondary",variant:"contained",onClick:function(){return t(!1)}},"Close"),c.a.createElement(p.a,{variant:"contained",color:"secondary",startIcon:c.a.createElement(v.a,null),onClick:function(){return y(!0)}},"Add new assembly")):null))}))}}]);
//# sourceMappingURL=29.89b9b5ef.chunk.js.map