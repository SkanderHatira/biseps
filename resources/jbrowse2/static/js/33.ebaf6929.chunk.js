(this["webpackJsonp@jbrowse/web"]=this["webpackJsonp@jbrowse/web"]||[]).push([[33],{1739:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return Y}));var n=a(82),r=a(29),o=a(80),c=a.n(o),l=a(1),A=a.n(l),i=a(51),u=a(1664),s=a(1667),m=a(1668),v=a(1671),f=a(1669),E=a(1633),b=a(61),d=a(1640),g=a(1678),p=a(1636),O=a(1681),x=a(1630),B=a(1261),C=a(1659),Q=a(1631),W=a(1652),k=a(352),U=a.n(k),q=a(461),L=a.n(q),h=a(107),j=a(86),N=a(1673),I=a(1677),K=a.p+"static/media/svInspectorIcon.91bdff8d.png",S=Object(i.a)((function(e){return{card:{width:200,height:150,cursor:"pointer"},name:{marginTop:e.spacing(),textAlign:"center",maxWidth:200},media:{height:150}}})),y={name:"New session ".concat((new Date).toLocaleString()),connections:{}};function R(e){var t=e.name,a=e.onClick,n=void 0===a?function(){}:a,o=e.image,c=S(),i=Object(l.useState)(!1),u=Object(r.a)(i,2),s=u[0],m=u[1];return A.a.createElement(g.a,null,A.a.createElement(N.a,{className:c.card,onMouseOver:function(){return m(!0)},onMouseOut:function(){return m(!1)},onClick:n,raised:Boolean(s)},A.a.createElement(I.a,{className:c.media,image:o})),A.a.createElement(p.a,{variant:"subtitle2",className:c.name,style:{cursor:"pointer"},onClick:n},t))}function z(e){var t=e.rootModel;return A.a.createElement(R,{name:"Empty",onClick:function(){t.setSession(y)},image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAACWCAYAAACb3McZAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAB7CAAAewgBeCQdoQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMUSURBVHic7dsxixRnAMbxd3anCZhGU4okkCOKhfU27uUTxAi3bYpY5Duk1cbGLyApUnog+A20kK2SxkawiWIKuayVVplz0mQhiD57566+c9nfr9tiXp7mzw4zTCkAAAAAAAAAAAAAAACcJE3tAdvk9NVrZ8uom6x1yJt2/vLu7ecbmsQKbe0BW2XUTZqm3FnniH7UzUop+xtaxAqj2gNgyAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQNDWHnAUn329e3Zc+kntHevqF692mi9OrXXG5I/Rzjfnftzb0KRq2sNmfvPP289r71jlRAQyLv2k6cud2jvW1T07KG1THozOnJp+yPWXn4zvf/Wy3Nj0rhq6cT8rpezX3rGKW6xPrHt6MH2zePXguNf9G8fuR5hEIJAKjhuJOOoRSCVHjUQcdQmkolWRiKM+gVT2vkjEMQwCGYC3IxHHcJyIx7zboHt6MG1HzcNv//q8+1Icg+EfZEB+ufzo7+uz32vP4D8EMhC//vDi/pVLr3cvXFxMr/3027Hfk/BxCGQAlnEsf4tkOARS2dtxLIlkGARS0fviWBJJfQKpZFUcSyKpSyAVHDWOJZHUI5BP7LhxLImkjhPxovCwNPNx089q71jXre8XO1cuvf7g7zkuXFxMr+49/vnu/vknm9xVQ3vYzGtvOIqm9oBt0t87t1dKv+aHX82s+e7Z4D80+r9wiwWBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAI2toDtkp3OC/teLb2GQAAAAAAAAAAAAAAAMA7/QMEwsCcxccm/QAAAABJRU5ErkJggg=="})}function H(e){var t=e.rootModel;return A.a.createElement(R,{name:"Linear Genome View",onClick:function(){t.setSession(Object(j.a)(Object(j.a)({},y),{},{name:"New session ".concat((new Date).toLocaleString()),views:[{type:"LinearGenomeView"}]}))},image:"data:image/png;base64,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"})}function V(e){var t=e.rootModel;return A.a.createElement(R,{name:"Structural Variant Inspector",onClick:function(){t.setSession(Object(j.a)(Object(j.a)({},y),{},{name:"New session ".concat((new Date).toLocaleString()),views:[{type:"SvInspectorView"}]}))},image:K})}var w=a(1634),M=a(257),T=a.n(M),F=a(580),G=a.n(F),D=a(1632),Z=Object(i.a)({menu:{left:"65%"}});var P=function(e){var t=e.sessionName,a=e.onClick,n=e.onDelete,o=Z(),c=Object(l.useState)(!1),i=Object(r.a)(c,2),u=i[0],s=i[1],m=Object(l.useState)(null),v=Object(r.a)(m,2),f=v[0],E=v[1],b=function(e){if(E(null),"delete"===e)return n(t)};return A.a.createElement(A.a.Fragment,null,A.a.createElement(D.a,{onMouseOver:function(){return s(!0)},onMouseOut:function(){return s(!1)},onClick:function(){return a(t)},raised:Boolean(u),button:!0},A.a.createElement(w.a,{title:t,enterDelay:300},A.a.createElement(p.a,{variant:"body2",noWrap:!0,style:{width:250}},t)),A.a.createElement(d.a,{className:o.menu,onClick:function(e){e.stopPropagation(),E(e.currentTarget)}},A.a.createElement(G.a,{color:"secondary"}))),A.a.createElement(B.a,{id:"simple-menu",anchorEl:f,keepMounted:!0,open:Boolean(f),onClose:b},A.a.createElement(Q.a,{onClick:function(){return b("delete")}},A.a.createElement(W.a,null,A.a.createElement(T.a,{color:"secondary"})),A.a.createElement(p.a,{variant:"inherit"},"Delete"))))},X=Object(i.a)((function(e){return{newSession:{backgroundColor:e.palette.grey[300],padding:e.spacing(2),marginTop:e.spacing(6)},header:{margin:e.spacing(2)},settings:{float:"right"}}})),J=function(e){var t=e.sessionToDelete,a=e.onClose,o=e.rootModel,i=Object(l.useState)(!1),b=Object(r.a)(i,2),d=b[0],g=b[1];return Object(l.useEffect)((function(){Object(n.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{d&&(g(!1),o.removeSavedSession({name:t}),a(!0))}catch(n){g((function(){throw n}))}case 1:case"end":return e.stop()}}),e)})))()}),[d,a,o,t]),A.a.createElement(u.a,{open:!!t,onClose:function(){return a(!1)}},A.a.createElement(s.a,{id:"alert-dialog-title"},'Delete session "'.concat(t,'"?')),A.a.createElement(m.a,null,A.a.createElement(v.a,{id:"alert-dialog-description"},"This action cannot be undone")),A.a.createElement(f.a,null,A.a.createElement(E.a,{onClick:function(){return a(!1)},color:"primary"},"Cancel"),A.a.createElement(E.a,{onClick:function(){return g(!0)},color:"primary",variant:"contained",autoFocus:!0},"Delete")))};function Y(e){var t=e.rootModel,a=e.onFactoryReset,o=X(),i=Object(l.useState)(),u=Object(r.a)(i,2),s=u[0],m=u[1],v=Object(l.useState)(),f=Object(r.a)(v,2),E=f[0],k=f[1],q=Object(l.useState)(),j=Object(r.a)(q,2),N=j[0],I=j[1],K=Object(l.useState)(!0),S=Object(r.a)(K,2),y=S[0],R=S[1],w=Object(l.useState)(null),M=Object(r.a)(w,2),T=M[0],F=M[1],G=Object(l.useState)(!1),D=Object(r.a)(G,2),Z=D[0],Y=D[1],_=void 0!==s?s:[];return Object(l.useEffect)((function(){Object(n.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{N&&t.activateSession(N)}catch(a){m((function(){throw a}))}case 1:case"end":return e.stop()}}),e)})))()}),[t,N]),Object(l.useEffect)((function(){Object(n.a)(c.a.mark((function e(){var a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{y&&(R(!1),a=t.savedSessions.map((function(e){var t;return null===(t=JSON.parse(JSON.stringify(e)))||void 0===t?void 0:t.name})),m(a))}catch(n){m((function(){throw n}))}case 1:case"end":return e.stop()}}),e)})))()}),[t.savedSessions,y]),s?A.a.createElement(A.a.Fragment,null,A.a.createElement(h.FactoryResetDialog,{open:Z,onFactoryReset:a,onClose:function(){Y(!1)}}),A.a.createElement(J,{rootModel:t,sessionToDelete:E,onClose:function(e){k(void 0),R(e)}}),A.a.createElement(d.a,{className:o.settings,onClick:function(e){e.stopPropagation(),F(e.currentTarget)}},A.a.createElement(L.a,null)),A.a.createElement(g.a,{maxWidth:"md"},A.a.createElement(h.LogoFull,null),A.a.createElement("div",{className:o.newSession},A.a.createElement(p.a,{variant:"h5",className:o.header},"Start a new session"),A.a.createElement(O.a,{container:!0,spacing:4},A.a.createElement(O.a,{item:!0},A.a.createElement(z,{rootModel:t})),A.a.createElement(O.a,{item:!0},A.a.createElement(H,{rootModel:t})),A.a.createElement(O.a,{item:!0},A.a.createElement(V,{rootModel:t})))),A.a.createElement("div",null,A.a.createElement(p.a,{variant:"h5",className:o.header},"Recent sessions"),A.a.createElement(x.a,{style:{overflow:"auto",maxHeight:200}},null===_||void 0===_?void 0:_.map((function(e){return A.a.createElement(P,{key:e,sessionName:e,onClick:function(){return I(e)},onDelete:function(){return k(e)}})}))))),A.a.createElement(B.a,{anchorEl:T,keepMounted:!0,open:Boolean(T),onClose:function(){F(null)}},A.a.createElement(C.a,null,"Advanced Settings"),A.a.createElement(Q.a,{onClick:function(){Y(!0),F(null)}},A.a.createElement(W.a,null,A.a.createElement(U.a,null)),A.a.createElement(p.a,{variant:"inherit"},"Reset")))):A.a.createElement(b.a,{style:{position:"fixed",top:"50%",left:"50%",marginTop:-25,marginLeft:-25},size:50})}},352:function(e,t,a){"use strict";var n=a(90),r=a(93);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(a(1)),c=(0,n(a(94)).default)(o.createElement("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"}),"Warning");t.default=c}}]);
//# sourceMappingURL=33.ebaf6929.chunk.js.map