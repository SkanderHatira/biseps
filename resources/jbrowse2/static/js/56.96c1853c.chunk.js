(this["webpackJsonp@jbrowse/web"]=this["webpackJsonp@jbrowse/web"]||[]).push([[56],{1711:function(e,a,t){"use strict";t.r(a);var n=t(29),o=t(1),c=t.n(o),r=t(84),l=t(51),i=t(1664),s=t(1667),u=t(1640),m=t(1668),h=t(1636),p=t(1643),b=t(1669),g=t(1633),d=t(112),f=t.n(d),E=Object(l.a)((function(e){return{root:{width:500},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]},field:{margin:e.spacing(2)}}}));a.default=Object(r.observer)((function(e){var a=e.model,t=e.handleClose,r=E(),l=a.maxHeight,d=void 0===l?"":l,v=Object(o.useState)("".concat(d)),y=Object(n.a)(v,2),w=y[0],C=y[1];return c.a.createElement(i.a,{open:!0,onClose:t},c.a.createElement(s.a,null,"Filter options",c.a.createElement(u.a,{"aria-label":"close",className:r.closeButton,onClick:t},c.a.createElement(f.a,null))),c.a.createElement(m.a,{className:r.root},c.a.createElement(h.a,null,'Set max height for the track. For example, you can increase this if the layout says "Max height reached"'),c.a.createElement(p.a,{value:w,onChange:function(e){C(e.target.value)},placeholder:"Enter max height for layout"}),c.a.createElement(b.a,null,c.a.createElement(g.a,{variant:"contained",color:"primary",type:"submit",autoFocus:!0,onClick:function(){a.setMaxHeight(""===w||Number.isNaN(+w)?void 0:+w),t()}},"Submit"),c.a.createElement(g.a,{variant:"contained",color:"secondary",onClick:function(){return t()}},"Cancel"))))}))}}]);
//# sourceMappingURL=56.96c1853c.chunk.js.map