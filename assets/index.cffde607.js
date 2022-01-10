import{d as k,r as L,a as x,c as O,o as y,b as w,e as u,t as b,u as h,f as E,g as j,h as B}from"./vendor.278eec5b.js";const C=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerpolicy&&(c.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?c.credentials="include":o.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}};C();const m={"+":{calc:(e,t)=>e+t,predicate:(e,t)=>!0,operand_num:2},"-":{calc:(e,t)=>e-t,predicate:(e,t)=>!0,operand_num:2},"*":{calc:(e,t)=>e*t,predicate:(e,t)=>!0,operand_num:2},"/":{calc:(e,t)=>e/t,predicate:(e,t)=>t!==0,operand_num:2},gcd:{calc:(e,t)=>M(e,t),predicate:(e,t)=>Number.isInteger(e)&&Number.isInteger(t),operand_num:2},power:{calc:(e,t)=>Math.pow(e,t),predicate:(e,t)=>!0,operand_num:2},"//":{calc:(e,t)=>Math.floor(e/t),predicate:(e,t)=>t!==0&&Number.isInteger(e)&&Number.isInteger(t),operand_num:2},mod:{calc:(e,t)=>e%t,predicate:(e,t)=>t!==0&&Number.isInteger(e)&&Number.isInteger(t),operand_num:2},comb:{calc:(e,t)=>P(e,t),predicate:(e,t)=>Number.isInteger(e)&&Number.isInteger(t),operand_num:2},xor:{calc:(e,t)=>e^t,predicate:(e,t)=>Number.isInteger(e)&&Number.isInteger(t),operand_num:2},"!":{calc:e=>N(1,e),predicate:e=>Number.isInteger(e)&&e>=0,operand_num:1},"a^2":{calc:e=>e*e,predicate:e=>!0,operand_num:1}},M=(e,t)=>t?M(t,e%t):e;function N(e,t){let n=e,r=e;for(;r++<t;)n*=r;return n}function P(e,t){return e==t?1:(t=t<e-t?e-t:t,Math.floor(N(t+1,e)/N(1,e-t)))}const S=e=>Math.floor(Math.random()*e),I=e=>{for(let t=e.length-1;t>0;t--){const n=S(t+1);[e[t],e[n]]=[e[n],e[t]]}},$=(()=>{const e=Array.from({length:13},(n,r)=>r+1);return e.concat(e).concat(e).concat(e)})(),A=(e=4,t=4,n=24)=>{for(;;){const r=Object.keys(m);I(r),I($);const o=r.slice(0,e),c=$.slice(0,t),{is_exist:l,solution:s}=D(o,c,n);if(l)return{operations:o,cards:c,solution:s}}},D=(e,t,n=24)=>{let r=[];const o=5e3,c=5,l=(s,_=0)=>{if(s.length===1)return Math.abs(s[0]-n)<Number.EPSILON;if(_>c)return!1;I(e);for(const p of e)if(m[p].operand_num===1)for(let i=0;i<s.length;i++){const f=s.filter((a,d)=>i!==d),g=s[i];if(m[p].predicate(g)){const a=m[p].calc(g);if(a>o||a===g)continue;if(r.push(`${p} ${g} = ${a}`),l(f.concat([a]),_+1))return!0;r.pop()}}else if(m[p].operand_num===2)for(let i=0;i<s.length;i++)for(let f=i+1;f<s.length;f++){const g=s.filter((a,d)=>i!==d&&f!==d);for(const[a,d]of[[s[i],s[f]],[s[f],s[i]]])if(m[p].predicate(a,d)){const v=m[p].calc(a,d);if(v>o)continue;if(r.push(`${a} ${p} ${d} = ${v}`),l(g.concat([v]),_+1))return!0;r.pop()}}return!1};return{is_exist:l(t),solution:r}};var H=(e,t)=>{const n=e.__vccOpts||e;for(const[r,o]of t)n[r]=o;return n};const V={class:"bg-slate-800"},T={class:"font-mono bg-blue-gray-500 rounded-lg border-0 px-3 mt-10"},W={key:0},X=k({setup(e){const t=L(A()),n=x(!1),r=x(0);setInterval(()=>r.value++,1e3);const o=O(()=>new Date(r.value*1e3).toTimeString().substring(3,8)),c=()=>{const{operations:l,cards:s,solution:_}=A();t.operations=l,t.cards=s,t.solution=_,r.value=0,n.value=!1};return(l,s)=>(y(),w("div",V,[u("p",null,[u("code",null,b(h(t).operations),1)]),u("p",null,[u("code",null,b(h(t).cards),1)]),u("p",null,[u("button",T,b(h(o)),1)]),u("p",null,[u("button",{class:"font-mono bg-blue-gray-500 rounded-lg border-0 hover:cursor-pointer",onClick:s[0]||(s[0]=_=>n.value=!n.value)},b(n.value?"hide":"show")+" solution ",1),u("button",{class:"font-mono bg-blue-gray-500 rounded-lg border-0 hover:cursor-pointer mx-5",onClick:c}," new one ")]),n.value?(y(),w("p",W,[u("code",null,b(h(t).solution),1)])):E("",!0)]))}});var q=H(X,[["__scopeId","data-v-0f392178"]]);const F=k({setup(e){return(t,n)=>(y(),j(q,{class:"mt-30"}))}});B(F).mount("#app");