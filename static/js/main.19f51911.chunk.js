(this["webpackJsonpgithub-repository-search"]=this["webpackJsonpgithub-repository-search"]||[]).push([[0],{137:function(e,t,n){e.exports=n(317)},26:function(e,t,n){"use strict";n.d(t,"e",(function(){return u})),n.d(t,"d",(function(){return s})),n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return f})),n.d(t,"c",(function(){return d}));var r=n(31),a=n.n(r),c=n(46),i={yearly:"year",monthly:"month",weekly:"week",daily:"day"};var o={year:"yearly",month:"monthly",week:"weekly",day:"daily"};function u(e){return o[e]}var l="YYYY-MM-DD";function s(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=function(e){return i[e]}(e),r=a()().subtract(1+t,n).format(l);return{increments:n,from:r,to:a()(r).add(1,n).format(l)}}function m(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return s(u(e),t)}function f(e){return Object(c.a)(a()(e.from).fromNow())}var g="MMMM DD, YYYY";function d(e){var t=a()(e.from).format(g),n=a()(e.to).format(g);return"".concat(t," \u2013 ").concat(n)}},315:function(e,t,n){},317:function(e,t,n){"use strict";n.r(t);n(138);var r=n(0),a=n.n(r),c=n(41),i=n(17),o=n(4),u=n(38),l=Object(u.a)("grs-github-personal-access-token"),s="";function m(){var e=l(s),t=Object(i.a)(e,2);return{personalAccessToken:t[0],setPersonalAccessToken:t[1]}}function f(){return a.a.createElement(o.m,{content:function(e){var t=e.close;return a.a.createElement(g,{close:t})}},a.a.createElement(o.a,{appearance:"minimal"},"Add a personal access token"))}function g(e){var t=e.close,n=m(),c=n.personalAccessToken,u=n.setPersonalAccessToken,l=Object(r.useState)(c),s=Object(i.a)(l,2),f=s[0],g=s[1];return a.a.createElement(o.c,{width:280,padding:16},a.a.createElement(o.n,{paddingBottom:16},a.a.createElement(o.f,null,a.a.createElement(o.j,{target:"_blank",href:"https://github.com/settings/tokens"},"Generate a token")," ","and add it below to avoid hitting the rate limit.")),a.a.createElement(o.n,{paddingBottom:16},a.a.createElement(o.r,{value:f,onChange:function(e){g(e.target.value)}})),a.a.createElement(o.n,{paddingBottom:16,justifyContent:"flex-end"},a.a.createElement(o.a,{appearance:"primary",intent:"success",onClick:function(){u(f),t()}},"Save")))}var d=n(28),h=n(67),p=n(129),E=n(55),b=n(32),v=n(42),y=n(26),j=n(33),O=n(16),w=n.n(O),C=n(30),k=n(340),x=n(68);function R(e,t){return{queries:e,loading:t}}function S(e,t){return{timeRange:e,loading:t,results:arguments.length>2&&void 0!==arguments[2]?arguments[2]:null}}function q(){var e=Object(v.b)().searchType,t=Object(b.f)().refreshTimeRange,n=function(){var e=Object(k.a)(),t=m().personalAccessToken,n=Object(v.b)().searchType,a=Object(b.f)().getSearchCriteria,c=Object(r.useState)(R([],!0)),o=Object(i.a)(c,2),u=o[0],l=o[1],s=Object(r.useCallback)(function(){var r=Object(C.a)(w.a.mark((function r(a){var c,i,o,u;return w.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return c=a.searchCriteria,i=a.getLoadingState,o=a.getResolvedState,l((function(e){return i(e)})),r.next=4,Object(x.b)(n,c,t);case 4:u=r.sent,e()&&l((function(e){return o(u,e)}));case 6:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}(),[e,t,n]),f=Object(r.useCallback)(Object(C.a)(w.a.mark((function e(){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s({searchCriteria:a(),getLoadingState:function(){return R([S(a().timeRange,!0)],!0)},getResolvedState:function(e){return R([S(a().timeRange,!1,e)],!1)}});case 1:case"end":return e.stop()}}),e)}))),[s,a]),g=Object(r.useCallback)(Object(C.a)(w.a.mark((function e(){var t,n;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=Object(y.a)(a().timeRange.increments,u.queries.length),n=S(t,!0),s({searchCriteria:Object(b.c)(a().languages,t),getLoadingState:function(e){return R([].concat(Object(j.a)(e.queries),[n]),e.loading)},getResolvedState:function(e,r){return R([].concat(Object(j.a)(r.queries.filter((function(e){return e!==n}))),[S(t,!1,e)]),!1)}});case 3:case"end":return e.stop()}}),e)}))),[s,a,u.queries.length]),d=u.queries.length>0&&u.queries.slice(-1)[0];return{queries:u.queries,fetchInitialSearch:f,isFetchingInitialSearch:u.loading,fetchNextSearch:g,isFetchingNextSearch:u.loading||d&&d.loading}}(),c=n.queries,u=n.fetchInitialSearch,l=n.isFetchingInitialSearch,s=n.fetchNextSearch,f=n.isFetchingNextSearch;Object(r.useEffect)((function(){u()}),[u]);var g="most-starred"===e&&!l&&!f&&c.some((function(e){return e.results&&e.results.length}));return a.a.createElement(o.c,{width:1032,margin:"auto"},a.a.createElement(D,{refresh:t}),l?a.a.createElement(T,{repoCount:12}):a.a.createElement(a.a.Fragment,null,c.map((function(e){return a.a.createElement(I,{key:JSON.stringify(e.timeRange),query:e})}))),g&&a.a.createElement(P,{onVisible:s}))}function D(e){var t=e.refresh;return a.a.createElement(o.n,{paddingX:16,alignItems:"center",marginBottom:32},a.a.createElement(o.c,{grow:!0},a.a.createElement(v.a,null)),a.a.createElement(o.c,{marginRight:16},a.a.createElement(b.a,null)),a.a.createElement(o.c,{marginRight:16},a.a.createElement(b.b,null)),a.a.createElement(o.c,null,a.a.createElement(o.h,{icon:"refresh",onClick:t,"aria-label":"refresh"})))}function P(e){var t=e.onVisible,n=Object(p.a)({threshold:0}),c=Object(i.a)(n,2),o=c[0],u=c[1];return Object(r.useEffect)((function(){u&&t()}),[u,t]),a.a.createElement("div",{ref:o},a.a.createElement(T,{repoCount:3}))}function T(e){var t=e.repoCount;return a.a.createElement(a.a.Fragment,null,a.a.createElement(Y,null,a.a.createElement(M,null)),a.a.createElement(o.n,{flexWrap:"wrap",justifyContent:"center"},Array.from(Array(t)).map((function(e,t){return a.a.createElement(E.RepoCard,{key:t,marginX:16},a.a.createElement(E.RepoCardLoader,null))}))))}function I(e){var t=e.query;return t.loading?a.a.createElement(T,{repoCount:12}):a.a.createElement(a.a.Fragment,null,a.a.createElement(Y,null,a.a.createElement(B,{timeRange:t.timeRange})),a.a.createElement(o.n,{flexWrap:"wrap",justifyContent:"center"},(t.results||[]).map((function(e){return a.a.createElement(E.RepoCard,{key:e.url,marginX:16},a.a.createElement(E.RepoCardContent,{repo:e,timeRange:t.timeRange}))}))))}function Y(e){var t=e.children,n=Object(d.a)(e,["children"]);return a.a.createElement(o.n,Object.assign({paddingX:16,alignItems:"center",marginBottom:32},n),t)}function B(e){var t=e.timeRange;return a.a.createElement(o.c,{grow:!0},a.a.createElement(o.n,null,a.a.createElement(o.f,{size:600},Object(y.b)(t))),a.a.createElement(o.n,null,a.a.createElement(o.q,null,Object(y.c)(t))))}function M(){return a.a.createElement(o.l,{width:264,height:44},a.a.createElement(h.a,{height:44,width:264,speed:1,primaryColor:"#e8eaef",secondaryColor:o.s.colors.background.tint2,ariaLabel:"Search query header loading..."},a.a.createElement("rect",{x:"0",y:"0",rx:"4",ry:"4",width:"100",height:"22"}),a.a.createElement("rect",{x:"0",y:"26",rx:"4",ry:"4",width:"264",height:"18"})))}n(315);var A=document.getElementById("root");Object(c.render)(a.a.createElement((function(){return a.a.createElement(o.c,null,a.a.createElement(o.n,{elevation:1,backgroundColor:o.s.palette.blue.base,paddingX:8,minHeight:64,alignItems:"center"},a.a.createElement(o.c,{paddingRight:16,grow:!0},a.a.createElement(o.f,{size:700,color:"white"},"Gihtub Repository Search")),a.a.createElement(o.c,null,a.a.createElement(o.a,{is:"a",href:"https://github.com/eloiqs/github-repository-search",target:"_blank",appearance:"minimal",iconBefore:a.a.createElement(o.e,{color:"white",width:"16px",style:{marginRight:8,marginLeft:-3}})},a.a.createElement(o.q,{color:"white"},"View Source")))),a.a.createElement(o.n,null,a.a.createElement(o.c,{width:"100%"},a.a.createElement(o.n,{marginBottom:32,background:"orangeTint",paddingY:8,justifyContent:"center"},a.a.createElement(f,null)),a.a.createElement(o.n,null,a.a.createElement(q,null)))))}),null),A)},32:function(e,t,n){"use strict";var r=n(17),a=n(0),c=n.n(a),i=n(42),o=n(26),u=n(4),l=n(46);function s(){return{languages:arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],timeRange:arguments.length>1&&void 0!==arguments[1]?arguments[1]:Object(o.d)("yearly"),order:"desc",page:0,per_page:20}}var m=n(38),f=s(),g=Object(m.a)("grs-search-criteria");function d(){var e=g(f),t=Object(r.a)(e,2),n=t[0],c=t[1],i=Object(a.useCallback)((function(){return h(n)}),[n]),o=Object(a.useCallback)((function(){c((function(e){return h(e)}))}),[c]);return{getSearchCriteria:i,setSearchCriteria:c,refreshTimeRange:o}}function h(e){return s(e.languages,Object(o.a)(e.timeRange.increments))}function p(){var e=Object(i.b)().searchType,t=d(),n=t.getSearchCriteria,m=t.setSearchCriteria,f=Object(a.useState)(Object(o.e)(n().timeRange.increments)),g=Object(r.a)(f,2),h=g[0],p=g[1];function E(e,t){return function(){p(e),m((function(t){return s(t.languages,Object(o.d)(e))})),t()}}return Object(a.useEffect)((function(){"trending"===e&&"yearly"===h&&(p("monthly"),m((function(e){return s(e.languages,Object(o.d)("monthly"))})))}),[e,m,h]),c.a.createElement(u.m,{content:function(t){var n=t.close;return c.a.createElement(u.k,null,c.a.createElement(u.k.Group,null,"trending"!==e&&c.a.createElement(u.k.Item,{onSelect:E("yearly",n)},"Yearly"),c.a.createElement(u.k.Item,{onSelect:E("monthly",n)},"Monthly"),c.a.createElement(u.k.Item,{onSelect:E("weekly",n)},"Weekly"),c.a.createElement(u.k.Item,{onSelect:E("daily",n)},"Daily")))}},c.a.createElement(u.a,{iconBefore:"calendar"},Object(l.a)(h)))}var E=n(33),b=n(16),v=n.n(b),y=n(122),j=n(30),O=n(31),w=n.n(O),C=n(340),k=n(68);function x(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function R(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?x(n,!0).forEach((function(t){Object(y.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):x(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var S=Object(m.a)("grs-languages"),q={languages:[],timestamp:null};function D(){var e=Object(C.a)(),t=Object(a.useState)(!0),n=Object(r.a)(t,2),c=n[0],i=n[1],o=S(q),u=Object(r.a)(o,2),l=u[0],s=l.languages,m=l.timestamp,f=u[1];return Object(a.useEffect)((function(){(!m||w()().diff(w()(m),"days")>0)&&Object(j.a)(v.a.mark((function t(){var n,r;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i(!0),t.next=3,Object(k.a)();case 3:n=t.sent,e()&&(r=w()().format(),JSON.stringify(n)!==JSON.stringify(s)&&f({languages:n,timestamp:r}),f((function(e){return R({},e,{timestamp:r})})),i(!1));case 5:case"end":return t.stop()}}),t)})))()}),[e,s,f,m]),{languages:s,isLoading:c}}function P(){var e=d(),t=e.getSearchCriteria,n=e.setSearchCriteria,i=D().languages,o=Object(a.useState)(t().languages),l=Object(r.a)(o,2),m=l[0],f=l[1];var g=m.length?m.join(", "):"Filter languages",h=i.map((function(e){var t=e.name;return{label:t,value:t}}));return c.a.createElement(u.p,{isMultiSelect:!0,title:"Filter languages",options:h,selected:m,onSelect:function(e){var t=[].concat(Object(E.a)(m),[e.value]);f(t),n((function(e){return s(t,e.timeRange)}))},onDeselect:function(e){var t=m.filter((function(t){return t!==e.value}));f(t),n((function(e){return s(t,e.timeRange)}))}},c.a.createElement(u.a,{iconBefore:"filter"},g))}function T(e){var t=e.timeRange,n=t.from,r=t.to,a="created:".concat(n,"..").concat(r);if(!e.languages.length)return a;var c=e.languages.reduce((function(e,t){return e.length?e+"+language:".concat(t):"language:".concat(t)}),"");return"".concat(c,"+").concat(a)}n.d(t,"b",(function(){return p})),n.d(t,"a",(function(){return P})),n.d(t,"c",(function(){return s})),n.d(t,"d",(function(){return T})),n.d(t,"e",(function(){return D})),n.d(t,"f",(function(){return d}))},4:function(e,t,n){"use strict";var r=n(116),a=n(332),c=n(28),i=n(0),o=n.n(i),u=n(83).a;function l(e){var t=e.children,n=(e.card,e.grow),r=Object(c.a)(e,["children","card","grow"]);return o.a.createElement(u,Object.assign({display:"flex",flexDirection:"column",minWidth:"0",height:"100%",flexGrow:n?1:0},r),t)}var s=n(128),m=n(34).a;function f(e){var t=e.children,n=Object(c.a)(e,["children"]);return o.a.createElement(u,{className:"fade-text",position:"relative",height:"100%",overflow:"hidden"},o.a.createElement(m,n,t))}function g(e){return o.a.createElement("svg",Object.assign({fill:"currentColor",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 40 40",width:"100%",height:"100%"},e),o.a.createElement("g",null,o.a.createElement("path",{d:"m20 0c-11 0-20 9-20 20 0 8.8 5.7 16.3 13.7 19 1 0.2 1.3-0.5 1.3-1 0-0.5 0-2 0-3.7-5.5 1.2-6.7-2.4-6.7-2.4-0.9-2.3-2.2-2.9-2.2-2.9-1.9-1.2 0.1-1.2 0.1-1.2 2 0.1 3.1 2.1 3.1 2.1 1.7 3 4.6 2.1 5.8 1.6 0.2-1.3 0.7-2.2 1.3-2.7-4.5-0.5-9.2-2.2-9.2-9.8 0-2.2 0.8-4 2.1-5.4-0.2-0.5-0.9-2.6 0.2-5.3 0 0 1.7-0.5 5.5 2 1.6-0.4 3.3-0.6 5-0.6 1.7 0 3.4 0.2 5 0.7 3.8-2.6 5.5-2.1 5.5-2.1 1.1 2.8 0.4 4.8 0.2 5.3 1.3 1.4 2.1 3.2 2.1 5.4 0 7.6-4.7 9.3-9.2 9.8 0.7 0.6 1.4 1.9 1.4 3.7 0 2.7 0 4.9 0 5.5 0 0.6 0.3 1.2 1.3 1 8-2.7 13.7-10.2 13.7-19 0-11-9-20-20-20z"})))}var d=n(333),h=n(84),p=n(334),E=n(335),b=n(336);function v(e){var t=e.children,n=Object(c.a)(e,["children"]);return o.a.createElement(b.a,Object.assign({},n,{target:"_blank"}),t)}var y=n(344),j=n(342);function O(e){var t=e.children,n=(e.card,e.grow),r=Object(c.a)(e,["children","card","grow"]);return o.a.createElement(u,Object.assign({display:"flex",flexDirection:"row",width:"100%",minHeight:"0",flexGrow:n?1:0},r),t)}var w=n(343),C=n(341).a,k=n(339);n.d(t,"a",(function(){return r.a})),n.d(t,"b",(function(){return a.a})),n.d(t,"c",(function(){return l})),n.d(t,"s",(function(){return s.a})),n.d(t,"d",(function(){return f})),n.d(t,"e",(function(){return g})),n.d(t,"f",(function(){return d.a})),n.d(t,"g",(function(){return h.a})),n.d(t,"h",(function(){return p.a})),n.d(t,"i",(function(){return E.a})),n.d(t,"j",(function(){return v})),n.d(t,"k",(function(){return y.a})),n.d(t,"l",(function(){return u})),n.d(t,"m",(function(){return j.a})),n.d(t,"n",(function(){return O})),n.d(t,"o",(function(){return w.a})),n.d(t,"p",(function(){return C})),n.d(t,"q",(function(){return m})),n.d(t,"r",(function(){return k.a}))},42:function(e,t,n){"use strict";var r=n(0),a=n.n(r),c=n(4),i=n(17),o=n(38),u=Object(o.a)("grs-search-type"),l="most-starred";function s(){var e=u(l),t=Object(i.a)(e,2);return{searchType:t[0],setSearchType:t[1]}}function m(){var e=s(),t=e.searchType,n=e.setSearchType;return a.a.createElement(c.o,{label:"Search type",value:t,onChange:function(e){return n(e.target.value)},inputWidth:240},a.a.createElement("option",{value:"most-starred"},"Most starred"),a.a.createElement("option",{value:"trending"},"Trending"))}n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return s}))},46:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return i}));var r=n(33),a=n(121);function c(e){return e.charAt(0).toUpperCase()+e.slice(1)}function i(e){var t=Object(a.a)(e),n=t[0],c=t.slice(1);return n.reduce((function(e,t,n){return[].concat(Object(r.a)(e),Object(r.a)(c.reduce((function(e,t){return t[n]?[].concat(Object(r.a)(e),[t[n]]):e}),[t])))}),[])}},55:function(e,t,n){"use strict";var r=n(94);n.o(r,"RepoCard")&&n.d(t,"RepoCard",(function(){return r.RepoCard})),n.o(r,"RepoCardContent")&&n.d(t,"RepoCardContent",(function(){return r.RepoCardContent})),n.o(r,"RepoCardLoader")&&n.d(t,"RepoCardLoader",(function(){return r.RepoCardLoader}));var a=n(95);n.d(t,"RepoCard",(function(){return a.a})),n.d(t,"RepoCardContent",(function(){return a.b})),n.d(t,"RepoCardLoader",(function(){return a.c}))},68:function(e,t,n){"use strict";var r=n(16),a=n.n(r),c=n(30),i=n(123),o=n.n(i),u="https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml";function l(){return s.apply(this,arguments)}function s(){return(s=Object(c.a)(a.a.mark((function e(){var t,n,r,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(u);case 2:return t=e.sent,e.next=5,t.text();case 5:return n=e.sent,r=o.a.safeLoad(n),c=Object.keys(r).map((function(e){return{name:e,color:r[e].color}})),e.abrupt("return",c);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var m=n(124),f=n.n(m),g=n(32);function d(){return(d=Object(c.a)(a.a.mark((function e(t,n){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new f.a({auth:n}).search.repos({q:Object(g.d)(t),sort:"stars"});case 2:return r=e.sent,e.abrupt("return",r.data.items.map((function(e){return{name:e.name,url:e.html_url,owner:{name:e.owner.login,url:e.owner.html_url,avatarUrl:e.owner.avatar_url},createdAt:e.created_at,description:e.description,language:e.language,stars:e.stargazers_count,forks:e.forks_count,issues:e.open_issues_count}})));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var h=n(125),p=n(26),E=n(46);function b(){return(b=Object(c.a)(a.a.mark((function e(t){var n,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=Object(p.e)(t.timeRange.increments),e.next=3,Promise.all(t.languages.length?t.languages.map((function(e){return v(n,e)})):[v(n)]);case 3:return r=e.sent,e.abrupt("return",Object(E.b)(r));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function v(e,t){return y.apply(this,arguments)}function y(){return(y=Object(c.a)(a.a.mark((function e(t,n){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(h.a)(n?{language:n,since:t}:{since:t});case 2:return r=e.sent,e.abrupt("return",r.map(j));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function j(e){return{name:e.name,url:e.url,owner:{name:e.author,url:"https://github.com/".concat(e.author),avatarUrl:e.avatar},description:e.description,language:e.language,languageColor:e.languageColor,stars:e.stars,currentPeriodStars:e.currentPeriodStars,forks:e.forks}}function O(e,t,n){switch(e){case"most-starred":return function(e,t){return d.apply(this,arguments)}(t,n);case"trending":return function(e){return b.apply(this,arguments)}(t)}}n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return O}))},94:function(e,t){},95:function(e,t,n){"use strict";n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return f})),n.d(t,"c",(function(){return g}));var r=n(28),a=n(31),c=n.n(a),i=n(0),o=n.n(i),u=n(67),l=n(32),s=n(4);function m(e){var t=e.children,n=Object(r.a)(e,["children"]);return o.a.createElement(s.b,Object.assign({width:312,height:264,marginBottom:32,elevation:2,background:"tint1",padding:16},n),t)}function f(e){var t,n=e.repo,r=e.timeRange,a=Object(l.e)().languages;if(n.languageColor)t=n.languageColor;else{var i=a.find((function(e){return e.name===n.language}));t=i&&i.color}return o.a.createElement(s.c,{justifyContent:"space-between"},o.a.createElement(s.n,{alignItems:"center"},o.a.createElement(s.b,{marginRight:8,minWidth:32,width:32,height:32,overflow:"hidden"},o.a.createElement(s.i,{width:32,height:32,src:n.owner.avatarUrl})),o.a.createElement(s.c,{justifyContent:"center",grow:!0},o.a.createElement(s.j,{href:n.owner.url,color:"neutral",textDecoration:"none"},o.a.createElement(s.n,null,o.a.createElement(s.f,{size:400},n.owner.name)),o.a.createElement(s.n,null,o.a.createElement(s.q,null,"View Profile")))),n.currentPeriodStars&&o.a.createElement(s.c,null,o.a.createElement(s.n,{alignItems:"center"},o.a.createElement(s.g,{icon:"star",size:12,color:"default",paddingRight:4}),o.a.createElement(s.c,null,o.a.createElement(s.q,{fontSize:12},"".concat(n.currentPeriodStars," stars ").concat("day"===r.increments?"today":"this ".concat(r.increments))))))),o.a.createElement(s.n,null,o.a.createElement(s.c,null,o.a.createElement(s.n,null,o.a.createElement(s.c,null,o.a.createElement(s.n,null,o.a.createElement(s.j,{href:n.url,textDecoration:"none"},o.a.createElement(s.f,{size:500,color:"default"},n.name))),o.a.createElement(s.n,{paddingBottom:12},o.a.createElement(s.q,{size:300,color:"muted"},"Built by \xb7"," ",o.a.createElement(s.j,{href:n.owner.url,color:"neutral",textDecoration:"none"},n.owner.name),n.createdAt&&o.a.createElement(o.a.Fragment,null," \xb7 ",c()(n.createdAt).format("MMM D, YYYY"))))),o.a.createElement(s.c,null)),o.a.createElement(s.n,{height:56},o.a.createElement(s.d,null,n.description)))),o.a.createElement(s.n,null,o.a.createElement(s.c,{paddingRight:12},o.a.createElement(s.n,{alignItems:"center"},t&&o.a.createElement(s.g,{icon:"full-circle",color:t,paddingRight:4}),o.a.createElement(s.q,null,n.language))),o.a.createElement(s.c,{paddingRight:12},o.a.createElement(s.j,{href:"".concat(n.url,"/stargazers"),color:"neutral",textDecoration:"none"},o.a.createElement(s.n,null,o.a.createElement(s.c,{paddingRight:4},o.a.createElement(s.g,{icon:"star-empty",color:"default"})),o.a.createElement(s.c,null,o.a.createElement(s.q,null,n.stars))))),o.a.createElement(s.c,{paddingRight:12},o.a.createElement(s.j,{href:"".concat(n.url,"/network/members"),color:"neutral",textDecoration:"none"},o.a.createElement(s.n,null,o.a.createElement(s.c,{paddingRight:4},o.a.createElement(s.g,{icon:"fork",color:"default"})),o.a.createElement(s.c,null,o.a.createElement(s.q,null,n.forks))))),n.issues&&o.a.createElement(s.c,null,o.a.createElement(s.j,{href:"".concat(n.url,"/issues"),color:"neutral",textDecoration:"none"},o.a.createElement(s.n,null,o.a.createElement(s.c,{paddingRight:4},o.a.createElement(s.g,{icon:"issue",color:"default"})),o.a.createElement(s.c,null,o.a.createElement(s.q,null,n.issues)))))))}function g(){return o.a.createElement(u.a,{height:232,width:280,speed:1,primaryColor:"#e8eaef",secondaryColor:s.s.colors.background.tint2,ariaLabel:"Repo loading..."},o.a.createElement("rect",{x:"40",y:"4",rx:"4",ry:"4",width:"140",height:"12"}),o.a.createElement("rect",{x:"40",y:"24",rx:"4",ry:"4",width:"120",height:"10"}),o.a.createElement("rect",{x:"0",y:"72",rx:"4",ry:"4",width:"100",height:"12"}),o.a.createElement("rect",{x:"0",y:"91",rx:"4",ry:"4",width:"200",height:"10"}),o.a.createElement("rect",{x:"0",y:"118",rx:"4",ry:"4",width:"280",height:"56"}),o.a.createElement("rect",{x:"0",y:"220",rx:"4",ry:"4",width:"260",height:"12"}),o.a.createElement("rect",{x:"0",y:"4",rx:"4",ry:"4",width:"32",height:"32"}))}}},[[137,1,2]]]);
//# sourceMappingURL=main.19f51911.chunk.js.map