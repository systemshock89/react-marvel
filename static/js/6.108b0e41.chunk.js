(this.webpackJsonpmarvel=this.webpackJsonpmarvel||[]).push([[6],{21:function(e,t,c){"use strict";var a=c.p+"static/media/error.42292aa1.gif",s=c(3);t.a=()=>Object(s.jsx)("img",{style:{display:"block",width:"250px",height:"250px",objectFit:"contain",margin:"0 auto"},src:a,alt:"Error"})},22:function(e,t,c){"use strict";var a=c(0);t.a=()=>{const{request:e,clearError:t,process:c,setProcess:s}=(()=>{const[e,t]=Object(a.useState)("waiting"),c=Object(a.useCallback)((async function(e){let c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{"Content-Type":"application/json"};t("loading");try{const t=await fetch(e,{method:c,body:a,headers:s});if(!t.ok)throw new Error("Could not fetch ".concat(e,", status: ").concat(t.status));return await t.json()}catch(r){throw t("error"),r}}),[]);return{request:c,clearError:Object(a.useCallback)((()=>{t("loading")}),[]),process:e,setProcess:t}})(),r="https://gateway.marvel.com:443/v1/public/",n="apikey=a69aadd3cee4bd52ac851e95515c1aaa",i=e=>({id:e.id,name:e.name,description:e.description?"".concat(e.description.slice(0,210),"..."):"There is no description for this character",thumbnail:e.thumbnail.path+"."+e.thumbnail.extension,homepage:e.urls[0].url,wiki:e.urls[1].url,comics:e.comics.items}),o=e=>({id:e.id,title:e.title,description:e.description||"There is no description",pageCount:e.pageCount?"".concat(e.pageCount," p."):"No information about the number of pages",thumbnail:e.thumbnail.path+"."+e.thumbnail.extension,price:e.prices[0].price?"".concat(e.prices[0].price,"$"):"not available"});return{clearError:t,process:c,setProcess:s,getAllCharacters:async function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:210;return(await e("".concat(r,"characters?limit=9&offset=").concat(t,"&").concat(n))).data.results.map(i)},getCharacterByName:async t=>(await e("".concat(r,"characters?name=").concat(t,"&").concat(n))).data.results.map(i),getCharacter:async t=>{const c=await e("".concat(r,"characters/").concat(t,"?").concat(n));return i(c.data.results[0])},getAllComics:async function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return(await e("".concat(r,"comics?orderBy=issueNumber&limit=8&offset=").concat(t,"&").concat(n))).data.results.map(o)},getComic:async t=>{const c=await e("".concat(r,"comics/").concat(t,"?").concat(n));return o(c.data.results[0])}}}},25:function(e,t,c){"use strict";var a=c(6),s=c(21),r=(c(26),c(3));var n=()=>Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("p",{className:"char__select",children:"Please select a character to see information"}),Object(r.jsxs)("div",{className:"skeleton",children:[Object(r.jsxs)("div",{className:"pulse skeleton__header",children:[Object(r.jsx)("div",{className:"pulse skeleton__circle"}),Object(r.jsx)("div",{className:"pulse skeleton__mini"})]}),Object(r.jsx)("div",{className:"pulse skeleton__block"}),Object(r.jsx)("div",{className:"pulse skeleton__block"}),Object(r.jsx)("div",{className:"pulse skeleton__block"})]})]});t.a=(e,t,c)=>{switch(e){case"waiting":return Object(r.jsx)(n,{});case"loading":return Object(r.jsx)(a.a,{});case"confirmed":return Object(r.jsx)(t,{data:c});case"error":return Object(r.jsx)(s.a,{});default:throw new Error("Unexpected process state")}}},26:function(e,t,c){},30:function(e,t,c){},31:function(e,t,c){"use strict";c(30);var a=c.p+"static/media/Avengers.4065c8f9.png",s=c.p+"static/media/Avengers_logo.9eaf2193.png",r=c(3);t.a=()=>Object(r.jsxs)("div",{className:"app__banner",children:[Object(r.jsx)("img",{src:a,alt:"Avengers"}),Object(r.jsxs)("div",{className:"app__banner-text",children:["New comics every week!",Object(r.jsx)("br",{}),"Stay tuned!"]}),Object(r.jsx)("img",{src:s,alt:"Avengers logo"})]})},65:function(e,t,c){"use strict";c.r(t);var a=c(2),s=c(0),r=c(22),n=c(25),i=c(31),o=c(3);t.default=e=>{let{Component:t,dataType:c}=e;const{id:l}=Object(a.q)(),[u,d]=Object(s.useState)(null),{getComic:p,getCharacter:m,clearError:h,process:b,setProcess:j}=Object(r.a)();Object(s.useEffect)((()=>{g()}),[l]);const g=()=>{switch(h(),c){case"comic":p(l).then(f).then((()=>j("confirmed")));break;case"character":m(l).then(f).then((()=>j("confirmed")));break;default:return}},f=e=>{d(e)};return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(i.a,{}),Object(n.a)(b,t,u)]})}}}]);
//# sourceMappingURL=6.108b0e41.chunk.js.map