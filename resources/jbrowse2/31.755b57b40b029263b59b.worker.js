this.webpackChunk([31],{2085:function(e,n,t){"use strict";t.r(n);var a=t(9),c=t(7),o=t(174),r=t(959),l=t(961),i=t(960),u=t(962),m=t(358),s=t(99),d=t(16),p=t(1),f=t(0),g=t.n(f),b=t(495),E=Object(d.observer)((function(e){var n=e.connectionType,t=e.model,a=e.setModelReady,c=n.configEditorComponent||b.a;return g.a.createElement(f.Suspense,{fallback:g.a.createElement("div",null,"Loading...")},g.a.createElement(c,{model:{target:t},setModelReady:a}))})),C=t(205),v=t(139),y=t(381),j=t(494),O=t.n(j);var h=function(e){var n=e.connectionTypeChoices,t=e.connectionType,a=e.setConnectionType;return Object(f.useEffect)((function(){t.name||a(n[0])})),t.name?g.a.createElement("form",{autoComplete:"off"},g.a.createElement(y.a,{value:t.name,label:"connectionType",helperText:t.description?g.a.createElement(g.a.Fragment,null,t.description,t.url?g.a.createElement(C.a,{href:t.url,rel:"noopener noreferrer",target:"_blank",color:"secondary"},g.a.createElement(O.a,null)):null):null,select:!0,fullWidth:!0,onChange:function(e){a(n.find((function(n){return n.name===e.target.value})))},variant:"outlined"},n.map((function(e){return g.a.createElement(v.a,{key:e.name,value:e.name},e.displayName||e.name)})))):null},T=Object(m.a)((function(e){return{root:{marginTop:e.spacing(1)},stepper:{backgroundColor:e.palette.background.default},button:{marginTop:e.spacing(1),marginRight:e.spacing(1)},actionsContainer:{marginBottom:e.spacing(2)}}})),k=["Select a Connection Type","Configure Connection"];n.default=Object(d.observer)((function(e){var n=e.model,t=Object(f.useState)({}),m=Object(a.a)(t,2),d=m[0],b=m[1],C=Object(f.useState)({}),v=Object(a.a)(C,2),y=v[0],j=v[1],O=Object(f.useState)(!0),S=Object(a.a)(O,2),N=S[0],w=S[1],M=Object(f.useState)(0),R=Object(a.a)(M,2),x=R[0],B=R[1],I=T(),W=Object(c.getSession)(n),D=Object(p.getEnv)(W).pluginManager;function F(e){b(e),j(e.configSchema.create({connectionId:"".concat(e.name,"-").concat(Date.now())},Object(p.getEnv)(n)))}function G(){x===k.length-1?function(){var e=W.addConnectionConf(y);W.makeConnection(e),W.hideWidget(n)}():B(x+1)}function L(){B(x-1)}return g.a.createElement("div",{className:I.root},g.a.createElement(u.a,{className:I.stepper,activeStep:x,orientation:"vertical"},k.map((function(e){return g.a.createElement(r.a,{key:e},g.a.createElement(i.a,null,e),g.a.createElement(l.a,null,function(){switch(x){case 0:return g.a.createElement(h,{connectionTypeChoices:D.getElementTypesInGroup("connection"),connectionType:d,setConnectionType:F});case 1:return g.a.createElement(E,{connectionType:d,model:y,setModelReady:w});default:return g.a.createElement(s.a,null,"Unknown step")}}(),g.a.createElement("div",{className:I.actionsContainer},g.a.createElement(o.a,{disabled:0===x,onClick:L,className:I.button},"Back"),g.a.createElement(o.a,{disabled:!(0===x&&d.name||1===x&&y&&N),variant:"contained",color:"primary",onClick:G,className:I.button,"data-testid":"addConnectionNext"},x===k.length-1?"Connect":"Next"))))}))))}))}});
//# sourceMappingURL=31.755b57b40b029263b59b.worker.js.map