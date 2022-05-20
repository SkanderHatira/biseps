this.webpackChunk([40],{1280:function(e,a,t){"use strict";t.r(a);var l=t(6),n=t(0),r=t.n(n),i=t(16),c=t(143),o=t(244),u=t(844),d=t(846),s=t(145),m=t(847),p=t(81),g=t(894),v=t(118),f=t(848),E=t(136),h=t(52),b=t.n(h),y=Object(c.a)((function(e){return{paper:{padding:e.spacing(2),margin:e.spacing(2)},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]},field:{margin:e.spacing(2)}}})),O=["read paired","read mapped in proper pair","read unmapped","mate unmapped","read reverse strand","mate reverse strand","first in pair","second in pair","not primary alignment","read fails platform/vendor quality checks","read is PCR or optical duplicate","supplementary alignment"];function C(e){var a=e.flag,t=void 0===a?0:a,l=e.setFlag;return r.a.createElement(r.a.Fragment,null,r.a.createElement(o.a,{type:"number",value:t,onChange:function(e){return l(+e.target.value)}}),O.map((function(e,a){var n=t&1<<a,i="".concat(e,"_").concat(n);return r.a.createElement("div",{key:i},r.a.createElement("input",{type:"checkbox",checked:Boolean(n),onChange:function(e){e.target.checked?l(t|1<<a):l(t&~(1<<a))}}),r.a.createElement("label",{htmlFor:i},e))})))}a.default=Object(i.observer)((function(e){var a,t,i=e.model,c=e.handleClose,h=y(),O=i.filterBy,F=Object(n.useState)(null===O||void 0===O?void 0:O.flagInclude),j=Object(l.a)(F,2),N=j[0],k=j[1],x=Object(n.useState)(null===O||void 0===O?void 0:O.flagExclude),S=Object(l.a)(x,2),B=S[0],P=S[1],R=Object(n.useState)((null===O||void 0===O||null===(a=O.tagFilter)||void 0===a?void 0:a.tag)||""),A=Object(l.a)(R,2),L=A[0],w=A[1],z=Object(n.useState)((null===O||void 0===O||null===(t=O.tagFilter)||void 0===t?void 0:t.value)||""),I=Object(l.a)(z,2),Z=I[0],q=I[1],G=Object(n.useState)((null===O||void 0===O?void 0:O.readName)||""),H=Object(l.a)(G,2),T=H[0],U=H[1],$=L.match(/^[A-Za-z][A-Za-z0-9]$/),_="https://broadinstitute.github.io/picard/explain-flags.html";return r.a.createElement(u.a,{open:!0,onClose:c},r.a.createElement(d.a,null,"Filter options",r.a.createElement(s.a,{"aria-label":"close",className:h.closeButton,onClick:c},r.a.createElement(b.a,null))),r.a.createElement(m.a,null,r.a.createElement(p.a,null,"Set filter bitmask options. Refer to ",r.a.createElement(g.a,{href:_},_)," ","for details"),r.a.createElement(v.a,{className:h.paper,variant:"outlined"},r.a.createElement("div",{style:{display:"flex"}},r.a.createElement("div",null,r.a.createElement(p.a,null,"Read must have ALL these flags"),r.a.createElement(C,{flag:N,setFlag:k})),r.a.createElement("div",null,r.a.createElement(p.a,null,"Read must have NONE of these flags"),r.a.createElement(C,{flag:B,setFlag:P})))),r.a.createElement(v.a,{className:h.paper,variant:"outlined"},r.a.createElement(p.a,null,"Filter by tag name and value. Use * in the value field to get all reads containing any value for that tag. Example: filter tag name SA with value * to get all split/supplementary reads. Other examples include HP for haplotype, or RG for read group"),r.a.createElement(o.a,{className:h.field,value:L,onChange:function(e){w(e.target.value)},placeholder:"Enter tag name",inputProps:{maxLength:2,"data-testid":"color-tag-name-input"},error:2===L.length&&!$,helperText:2!==L.length||$?"":"Not a valid tag","data-testid":"color-tag-name"}),r.a.createElement(o.a,{className:h.field,value:Z,onChange:function(e){q(e.target.value)},placeholder:"Enter tag value",inputProps:{"data-testid":"color-tag-name-input"},"data-testid":"color-tag-value"})),r.a.createElement(v.a,{className:h.paper,variant:"outlined"},r.a.createElement(p.a,null,"Filter by read name"),r.a.createElement(o.a,{className:h.field,value:T,onChange:function(e){U(e.target.value)},placeholder:"Enter read name",inputProps:{"data-testid":"color-tag-readname-input"},"data-testid":"color-tag-readname"})),r.a.createElement(f.a,null,r.a.createElement(E.a,{variant:"contained",color:"primary",autoFocus:!0,type:"submit",onClick:function(){i.setFilterBy({flagInclude:N,flagExclude:B,readName:T,tagFilter:""!==L?{tag:L,value:Z}:void 0}),c()}},"Submit"),r.a.createElement(E.a,{variant:"contained",color:"secondary",onClick:function(){return c()}},"Cancel"))))}))}});
//# sourceMappingURL=40.aa3f117980c15500c977.worker.js.map