(this["webpackJsonp@jbrowse/web"]=this["webpackJsonp@jbrowse/web"]||[]).push([[65],{1285:function(e,t,a){"use strict";a.r(t);var n=a(83),r=a(1),o=a.n(r),l=a(85),i=a(82),c=a(51),d=a(88),s=a(738),m=a.n(s),g=a(739),p=a.n(g),u=a(736),v=a.n(u),b=a(737),E=a.n(b),h=a(734),y=a.n(h),k=a(735),w=a.n(k),f=a(2368),j=a(733),O=Object(c.a)((function(e){return{headerBar:{gridArea:"1/1/auto/span 2",display:"flex"},spacer:{flexGrow:1},emphasis:{background:e.palette.secondary.main,padding:e.spacing(1)},hovered:{background:e.palette.secondary.light},displayName:{background:e.palette.secondary.main,paddingTop:3,paddingLeft:e.spacing(1),paddingRight:e.spacing(1)},inputBase:{color:e.palette.secondary.contrastText},inputRoot:{"&:hover":{backgroundColor:e.palette.secondary.light}},inputFocused:{borderColor:e.palette.primary.main,backgroundColor:e.palette.secondary.light}}})),C=Object(l.observer)((function(e){var t=e.model;return o.a.createElement(f.a,{onClick:t.toggleInteract,title:"Toggle interacting with the overlay"},t.interactToggled?o.a.createElement(y.a,null):o.a.createElement(w.a,null))})),T=Object(l.observer)((function(e){var t=e.model;return o.a.createElement(f.a,{onClick:t.toggleLinkViews,title:"Toggle linked scrolls and behavior across views"},t.linkViews?o.a.createElement(v.a,{color:"secondary"}):o.a.createElement(E.a,{color:"secondary"}))})),N=Object(l.observer)((function(e){var t=e.model;return o.a.createElement(f.a,{onClick:t.toggleIntraviewLinks,title:"Toggle rendering intraview links"},t.showIntraviewLinks?o.a.createElement(m.a,{color:"secondary"}):o.a.createElement(p.a,{color:"secondary"}))})),x=Object(l.observer)((function(e){var t=e.model,a=e.size,n=O();return t.setHeaderHeight(a.height),o.a.createElement("div",{className:n.headerBar},o.a.createElement(T,{model:t}),o.a.createElement(C,{model:t}),o.a.createElement(N,{model:t}),o.a.createElement("div",{className:n.spacer}))})),I=Object(j.withSize)({monitorHeight:!0})(x),R=Object(c.a)((function(e){return{root:{position:"relative",marginBottom:e.spacing(1),overflow:"hidden"},breakpointMarker:{position:"absolute",top:0,height:"100%",width:"3px",background:"magenta"},viewContainer:{marginTop:"3px"},container:{display:"grid"},overlay:{zIndex:100,gridArea:"1/1"},content:{gridArea:"1/1"}}})),B=Object(l.observer)((function(e){var t=e.model,a=R();return o.a.createElement(o.a.Fragment,null,t.tracks.map((function(e){var t=Object(n.a)(e.displays,1)[0],r=t.RenderingComponent;return r?o.a.createElement("div",{className:a.overlay,key:Object(i.getConf)(e,"trackId"),style:{height:t.height}},o.a.createElement(r,{model:t})):null})))})),L=Object(l.observer)((function(e){var t=e.model,a=R(),n=t.views,r=Object(d.getEnv)(t).pluginManager.getViewType(n[0].type).ReactComponent;return o.a.createElement("div",null,o.a.createElement(I,{model:t}),o.a.createElement("div",{className:a.container},o.a.createElement(r,{model:n[0]}),o.a.createElement("div",{style:{display:"grid"}},o.a.createElement(B,{model:t})),o.a.createElement(r,{model:n[1]})))})),V=Object(l.observer)((function(e){var t=e.model,a=R(),n=t.views,r=Object(d.getEnv)(t).pluginManager;return o.a.createElement("div",null,o.a.createElement(I,{model:t}),o.a.createElement("div",{className:a.container},o.a.createElement("div",{className:a.content},o.a.createElement("div",{style:{position:"relative"}},n.map((function(e){var t=r.getViewType(e.type).ReactComponent;return o.a.createElement(t,{key:e.id,model:e})}))),o.a.createElement(B,{model:t}))))})),z=Object(l.observer)((function(e){var t=e.model;return t.tracks.some((function(e){return e.displays.some((function(e){return Object(i.getConf)(e,"middle")}))}))?o.a.createElement(L,{model:t}):o.a.createElement(V,{model:t})}));t.default=z}}]);
//# sourceMappingURL=65.40139642.chunk.js.map