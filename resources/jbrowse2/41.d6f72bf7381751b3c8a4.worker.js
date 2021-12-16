this.webpackChunk([41],{2111:function(e,a,t){"use strict";t.r(a);var l=t(7),n=t(0),r=t.n(n),i=t(14),o=t(210),c=t(239),u=t(844),d=t(845),s=t(173),m=t(846),p=t(91),g=t(858),v=t(139),f=t(159),h=t(55),E=t.n(h),b=Object(o.a)((function(e){return{root:{width:500},paper:{padding:e.spacing(2),margin:e.spacing(2)},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]},field:{margin:e.spacing(2)}}})),y=["read paired","read mapped in proper pair","read unmapped","mate unmapped","read reverse strand","mate reverse strand","first in pair","second in pair","not primary alignment","read fails platform/vendor quality checks","read is PCR or optical duplicate","supplementary alignment"];function O(e){var a=e.flag,t=void 0===a?0:a,l=e.setFlag;return r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a,{type:"number",value:t,onChange:function(e){return l(+e.target.value)}}),y.map((function(e,a){var n=t&1<<a,i="".concat(e,"_").concat(n);return r.a.createElement("div",{key:i},r.a.createElement("input",{type:"checkbox",checked:Boolean(n),onChange:function(e){e.target.checked?l(t|1<<a):l(t&~(1<<a))}}),r.a.createElement("label",{htmlFor:i},e))})))}a.default=Object(i.observer)((function(e){var a,t,i=e.model,o=e.handleClose,h=b(),y=i.filterBy,N=Object(n.useState)(null===y||void 0===y?void 0:y.flagInclude),j=Object(l.a)(N,2),F=j[0],C=j[1],k=Object(n.useState)(null===y||void 0===y?void 0:y.flagExclude),x=Object(l.a)(k,2),S=x[0],B=x[1],P=Object(n.useState)((null===y||void 0===y||null===(a=y.tagFilter)||void 0===a?void 0:a.tag)||""),R=Object(l.a)(P,2),A=R[0],w=R[1],L=Object(n.useState)((null===y||void 0===y||null===(t=y.tagFilter)||void 0===t?void 0:t.value)||""),z=Object(l.a)(L,2),I=z[0],Z=z[1],q=Object(n.useState)((null===y||void 0===y?void 0:y.readName)||""),G=Object(l.a)(q,2),H=G[0],T=G[1],U=A.match(/^[A-Za-z][A-Za-z0-9]$/),$="https://broadinstitute.github.io/picard/explain-flags.html";return r.a.createElement(u.a,{open:!0,onClose:o},r.a.createElement(d.a,null,"Filter options",r.a.createElement(s.a,{"aria-label":"close",className:h.closeButton,onClick:o},r.a.createElement(E.a,null))),r.a.createElement(m.a,null,r.a.createElement(p.a,null,"Set filter bitmask options. Refer to ",r.a.createElement(g.a,{href:$},$)," ","for details"),r.a.createElement("div",{className:h.root},r.a.createElement(v.a,{className:h.paper,variant:"outlined"},r.a.createElement("div",{style:{display:"flex"}},r.a.createElement("div",null,r.a.createElement(p.a,null,"Read must have ALL these flags"),r.a.createElement(O,{flag:F,setFlag:C})),r.a.createElement("div",null,r.a.createElement(p.a,null,"Read must have NONE of these flags"),r.a.createElement(O,{flag:S,setFlag:B})))),r.a.createElement(v.a,{className:h.paper,variant:"outlined"},r.a.createElement(p.a,null,"Filter by tag name and value. Use * in the value field to get all reads containing any value for that tag. Example: filter tag name SA with value * to get all split/supplementary reads. Other examples include HP for haplotype, or RG for read group"),r.a.createElement(c.a,{className:h.field,value:A,onChange:function(e){w(e.target.value)},placeholder:"Enter tag name",inputProps:{maxLength:2,"data-testid":"color-tag-name-input"},error:2===A.length&&!U,helperText:2!==A.length||U?"":"Not a valid tag","data-testid":"color-tag-name"}),r.a.createElement(c.a,{className:h.field,value:I,onChange:function(e){Z(e.target.value)},placeholder:"Enter tag value",inputProps:{"data-testid":"color-tag-name-input"},"data-testid":"color-tag-value"})),r.a.createElement(v.a,{className:h.paper,variant:"outlined"},r.a.createElement(p.a,null,"Filter by read name"),r.a.createElement(c.a,{className:h.field,value:H,onChange:function(e){T(e.target.value)},placeholder:"Enter read name",inputProps:{"data-testid":"color-tag-readname-input"},"data-testid":"color-tag-readname"})),r.a.createElement(f.a,{variant:"contained",color:"primary",onClick:function(){i.setFilterBy({flagInclude:F,flagExclude:S,readName:H,tagFilter:""!==A?{tag:A,value:I}:void 0}),o()}},"Submit"))))}))}});
//# sourceMappingURL=41.d6f72bf7381751b3c8a4.worker.js.map