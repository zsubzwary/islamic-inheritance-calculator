if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const c=e=>s(e,t),d={module:{uri:t},exports:o,require:c};i[t]=Promise.all(n.map((e=>d[e]||c(e)))).then((e=>(r(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-DI63FdWE.css",revision:null},{url:"assets/index-wnO6cz9b.js",revision:null},{url:"index.html",revision:"2fa88ed64d896c1b8acf63fb0ab649cb"},{url:"registerSW.js",revision:"227541c58f2cec1ff97569ecccb673d9"},{url:"icon.svg",revision:"2c908d46d67f20d1680365e858c829f3"},{url:"manifest.webmanifest",revision:"63325d1de59eae43488f29a2763ed03e"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
