function e(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}function t(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var n={autoSleep:120,force3D:`auto`,nullTargetWarn:1,units:{lineHeight:``}},r={duration:.5,overwrite:!1,delay:0},i,a,o,s=1e8,c=1/s,l=Math.PI*2,u=l/4,d=0,f=Math.sqrt,p=Math.cos,m=Math.sin,h=function(e){return typeof e==`string`},g=function(e){return typeof e==`function`},_=function(e){return typeof e==`number`},v=function(e){return e===void 0},y=function(e){return typeof e==`object`},b=function(e){return e!==!1},x=function(){return typeof window<`u`},S=function(e){return g(e)||h(e)},C=typeof ArrayBuffer==`function`&&ArrayBuffer.isView||function(){},w=Array.isArray,T=/random\([^)]+\)/g,E=/,\s*/g,D=/(?:-?\.?\d|\.)+/gi,O=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,k=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,A=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,j=/[+-]=-?[.\d]+/,M=/[^,'"\[\]\s]+/gi,N=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,P,F,I,ee,L={},te={},ne,R=function(e){return(te=Te(e,L))&&Gn},re=function(e,t){return console.warn(`Invalid property`,e,`set to`,t,`Missing plugin? gsap.registerPlugin()`)},z=function(e,t){return!t&&console.warn(e)},ie=function(e,t){return e&&(L[e]=t)&&te&&(te[e]=t)||L},ae=function(){return 0},oe={suppressEvents:!0,isStart:!0,kill:!1},B={suppressEvents:!0,kill:!1},se={suppressEvents:!0},ce={},V=[],le={},ue,de={},fe={},pe=30,me=[],he=``,ge=function(e){var t=e[0],n,r;if(y(t)||g(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=me.length;r--&&!me[r].targetTest(t););n=me[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new en(e[r],n)))||e.splice(r,1);return e},H=function(e){return e._gsap||ge(ct(e))[0]._gsap},_e=function(e,t,n){return(n=e[t])&&g(n)?e[t]():v(n)&&e.getAttribute&&e.getAttribute(t)||n},U=function(e,t){return(e=e.split(`,`)).forEach(t)||e},W=function(e){return Math.round(e*1e5)/1e5||0},G=function(e){return Math.round(e*1e7)/1e7||0},ve=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n===`+`?e+r:n===`-`?e-r:n===`*`?e*r:e/r},K=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},q=function(){var e=V.length,t=V.slice(0),n,r;for(le={},V.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},ye=function(e){return!!(e._initted||e._startAt||e.add)},be=function(e,t,n,r){V.length&&!a&&q(),e.render(t,n,r||!!(a&&t<0&&ye(e))),V.length&&!a&&q()},xe=function(e){var t=parseFloat(e);return(t||t===0)&&(e+``).match(M).length<2?t:h(e)?e.trim():e},Se=function(e){return e},Ce=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},we=function(e){return function(t,n){for(var r in n)r in t||r===`duration`&&e||r===`ease`||(t[r]=n[r])}},Te=function(e,t){for(var n in t)e[n]=t[n];return e},Ee=function e(t,n){for(var r in n)r!==`__proto__`&&r!==`constructor`&&r!==`prototype`&&(t[r]=y(n[r])?e(t[r]||(t[r]={}),n[r]):n[r]);return t},De=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},Oe=function(e){var t=e.parent||P,n=e.keyframes?we(w(e.keyframes)):Ce;if(b(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},ke=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},Ae=function(e,t,n,r,i){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var a=e[r],o;if(i)for(o=t[i];a&&a[i]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=a,t.parent=t._dp=e,t},je=function(e,t,n,r){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var i=t._prev,a=t._next;i?i._next=a:e[n]===t&&(e[n]=a),a?a._prev=i:e[r]===t&&(e[r]=i),t._next=t._prev=t.parent=null},Me=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Ne=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},Pe=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Fe=function(e,t,n,r){return e._startAt&&(a?e._startAt.revert(B):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},Ie=function e(t){return!t||t._ts&&e(t.parent)},Le=function(e){return e._repeat?Re(e._tTime,e=e.duration()+e._rDelay)*e:0},Re=function(e,t){var n=Math.floor(e=G(e/t));return e&&n===e?n-1:n},ze=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Be=function(e){return e._end=G(e._start+(e._tDur/Math.abs(e._ts||e._rts||c)||0))},Ve=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=G(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Be(e),n._dirty||Ne(n,e)),e},He=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=ze(e.rawTime(),t),(!t._dur||nt(0,t.totalDuration(),n)-t._tTime>c)&&t.render(n,!0)),Ne(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-c}},Ue=function(e,t,n,r){return t.parent&&Me(t),t._start=G((_(n)?n:!n&&qe(t)&&(!e._last||e._last._start>=e._time)?e._last?e._last._start:e._time:n||e!==P?$e(e,n,t):e._time)+t._delay),t._end=G(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Ae(e,t,`_first`,`_last`,e._sort?`_start`:0),qe(t)||(e._recent=t),r||He(e,t),e._ts<0&&Ve(e,e._tTime),e},We=function(e,t){return(L.ScrollTrigger||re(`scrollTrigger`,t))&&L.ScrollTrigger.create(t,e)},Ge=function(e,t,n,r,i){if(un(e,t,i),!e._initted)return 1;if(!n&&e._pt&&!a&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&ue!==Bt.frame)return V.push(e),e._lazy=[i,r],1},Ke=function e(t){var n=t.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||e(n))},qe=function(e){var t=e.data;return t===`isFromStart`||t===`isStart`},Je=function(e,t,n,r){var i=e.ratio,o=t<0||!t&&(!e._start&&Ke(e)&&(e._initted||!qe(e))||(e._ts<0||e._dp._ts<0)&&!qe(e))?0:1,s=e._rDelay,l=0,u,d,f;if(s&&e._repeat&&(l=nt(0,e._tDur,t),d=Re(l,s),e._yoyo&&d&1&&(o=1-o),d!==Re(e._tTime,s)&&(i=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==i||a||r||e._zTime===c||!t&&e._zTime){if(!e._initted&&Ge(e,t,r,n,l))return;for(f=e._zTime,e._zTime=t||(n?c:0),n||=t&&!f,e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,u=e._pt;u;)u.r(o,u.d),u=u._next;t<0&&Fe(e,t,n,!0),e._onUpdate&&!n&&Tt(e,`onUpdate`),l&&e._repeat&&!n&&e.parent&&Tt(e,`onRepeat`),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&Me(e,1),!n&&!a&&(Tt(e,o?`onComplete`:`onReverseComplete`,!0),e._prom&&e._prom()))}else e._zTime||=t},Ye=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data===`isPause`&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data===`isPause`&&r._start<t)return r;r=r._prev}},Xe=function(e,t,n,r){var i=e._repeat,a=G(t)||0,o=e._tTime/e._tDur;return o&&!r&&(e._time*=a/e._dur),e._dur=a,e._tDur=i?i<0?1e10:G(a*(i+1)+e._rDelay*i):a,o>0&&!r&&Ve(e,e._tTime=e._tDur*o),e.parent&&Be(e),n||Ne(e.parent,e),e},Ze=function(e){return e instanceof nn?Ne(e):Xe(e,e._dur)},Qe={_start:0,endTime:ae,totalDuration:ae},$e=function e(t,n,r){var i=t.labels,a=t._recent||Qe,o=t.duration()>=s?a.endTime(!1):t._dur,c,l,u;return h(n)&&(isNaN(n)||n in i)?(l=n.charAt(0),u=n.substr(-1)===`%`,c=n.indexOf(`=`),l===`<`||l===`>`?(c>=0&&(n=n.replace(/=/,``)),(l===`<`?a._start:a.endTime(a._repeat>=0))+(parseFloat(n.substr(1))||0)*(u?(c<0?a:r).totalDuration()/100:1)):c<0?(n in i||(i[n]=o),i[n]):(l=parseFloat(n.charAt(c-1)+n.substr(c+1)),u&&r&&(l=l/100*(w(r)?r[0]:r).totalDuration()),c>1?e(t,n.substr(0,c-1),r)+l:o+l)):n==null?o:+n},et=function(e,t,n){var r=_(t[1]),i=(r?2:1)+(e<2?0:1),a=t[i],o,s;if(r&&(a.duration=t[1]),a.parent=n,e){for(o=a,s=n;s&&!(`immediateRender`in o);)o=s.vars.defaults||{},s=b(s.vars.inherit)&&s.parent;a.immediateRender=b(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[i-1]}return new _n(t[0],a,t[i+1])},tt=function(e,t){return e||e===0?t(e):t},nt=function(e,t,n){return n<e?e:n>t?t:n},rt=function(e,t){return!h(e)||!(t=N.exec(e))?``:t[1]},it=function(e,t,n){return tt(n,function(n){return nt(e,t,n)})},at=[].slice,ot=function(e,t){return e&&y(e)&&`length`in e&&(!t&&!e.length||e.length-1 in e&&y(e[0]))&&!e.nodeType&&e!==F},st=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(e){var r;return h(e)&&!t||ot(e,1)?(r=n).push.apply(r,ct(e)):n.push(e)})||n},ct=function(e,t,n){return o&&!t&&o.selector?o.selector(e):h(e)&&!n&&(I||!Vt())?at.call((t||ee).querySelectorAll(e),0):w(e)?st(e,n):ot(e)?at.call(e,0):e?[e]:[]},lt=function(e){return e=ct(e)[0]||z(`Invalid scope`)||{},function(t){var n=e.current||e.nativeElement||e;return ct(t,n.querySelectorAll?n:n===e?z(`Invalid scope`)||ee.createElement(`div`):e)}},ut=function(e){return e.sort(function(){return .5-Math.random()})},dt=function(e){if(g(e))return e;var t=y(e)?e:{each:e},n=Yt(t.ease),r=t.from||0,i=parseFloat(t.base)||0,a={},o=r>0&&r<1,c=isNaN(r)||o,l=t.axis,u=r,d=r;return h(r)?u=d={center:.5,edges:.5,end:1}[r]||0:!o&&c&&(u=r[0],d=r[1]),function(e,o,p){var m=(p||t).length,h=a[m],g,_,v,y,b,x,S,C,w;if(!h){if(w=t.grid===`auto`?0:(t.grid||[1,s])[1],!w){for(S=-s;S<(S=p[w++].getBoundingClientRect().left)&&w<m;);w<m&&w--}for(h=a[m]=[],g=c?Math.min(w,m)*u-.5:r%w,_=w===s?0:c?m*d/w-.5:r/w|0,S=0,C=s,x=0;x<m;x++)v=x%w-g,y=_-(x/w|0),h[x]=b=l?Math.abs(l===`y`?y:v):f(v*v+y*y),b>S&&(S=b),b<C&&(C=b);r===`random`&&ut(h),h.max=S-C,h.min=C,h.v=m=(parseFloat(t.amount)||parseFloat(t.each)*(w>m?m-1:l?l===`y`?m/w:w:Math.max(w,m/w))||0)*(r===`edges`?-1:1),h.b=m<0?i-m:i,h.u=rt(t.amount||t.each)||0,n=n&&m<0?Jt(n):n}return m=(h[e]-h.min)/h.max||0,G(h.b+(n?n(m):m)*h.v)+h.u}},ft=function(e){var t=10**((e+``).split(`.`)[1]||``).length;return function(n){var r=G(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(_(n)?0:rt(n))}},pt=function(e,t){var n=w(e),r,i;return!n&&y(e)&&(r=n=e.radius||s,e.values?(e=ct(e.values),(i=!_(e[0]))&&(r*=r)):e=ft(e.increment)),tt(t,n?g(e)?function(t){return i=e(t),Math.abs(i-t)<=r?i:t}:function(t){for(var n=parseFloat(i?t.x:t),a=parseFloat(i?t.y:0),o=s,c=0,l=e.length,u,d;l--;)i?(u=e[l].x-n,d=e[l].y-a,u=u*u+d*d):u=Math.abs(e[l]-n),u<o&&(o=u,c=l);return c=!r||o<=r?e[c]:t,i||c===t||_(t)?c:c+rt(t)}:ft(e))},mt=function(e,t,n,r){return tt(w(e)?!t:n===!0?!!(n=0):!r,function(){return w(e)?e[~~(Math.random()*e.length)]:(n||=1e-5)&&(r=n<1?10**((n+``).length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},ht=function(){var e=[...arguments];return function(t){return e.reduce(function(e,t){return t(e)},t)}},gt=function(e,t){return function(n){return e(parseFloat(n))+(t||rt(n))}},_t=function(e,t,n){return St(e,t,0,1,n)},vt=function(e,t,n){return tt(n,function(n){return e[~~t(n)]})},yt=function e(t,n,r){var i=n-t;return w(t)?vt(t,e(0,t.length),n):tt(r,function(e){return(i+(e-t)%i)%i+t})},bt=function e(t,n,r){var i=n-t,a=i*2;return w(t)?vt(t,e(0,t.length-1),n):tt(r,function(e){return e=(a+(e-t)%a)%a||0,t+(e>i?a-e:e)})},xt=function(e){return e.replace(T,function(e){var t=e.indexOf(`[`)+1,n=e.substring(t||7,t?e.indexOf(`]`):e.length-1).split(E);return mt(t?n:+n[0],t?0:+n[1],+n[2]||1e-5)})},St=function(e,t,n,r,i){var a=t-e,o=r-n;return tt(i,function(t){return n+((t-e)/a*o||0)})},Ct=function e(t,n,r,i){var a=isNaN(t+n)?0:function(e){return(1-e)*t+e*n};if(!a){var o=h(t),s={},c,l,u,d,f;if(r===!0&&(i=1)&&(r=null),o)t={p:t},n={p:n};else if(w(t)&&!w(n)){for(u=[],d=t.length,f=d-2,l=1;l<d;l++)u.push(e(t[l-1],t[l]));d--,a=function(e){e*=d;var t=Math.min(f,~~e);return u[t](e-t)},r=n}else i||(t=Te(w(t)?[]:{},t));if(!u){for(c in n)an.call(s,t,c,`get`,n[c]);a=function(e){return En(e,s)||(o?t.p:t)}}}return tt(r,a)},wt=function(e,t,n){var r=e.labels,i=s,a,o,c;for(a in r)o=r[a]-t,o<0==!!n&&o&&i>(o=Math.abs(o))&&(c=a,i=o);return c},Tt=function(e,t,n){var r=e.vars,i=r[t],a=o,s=e._ctx,c,l,u;if(i)return c=r[t+`Params`],l=r.callbackScope||e,n&&V.length&&q(),s&&(o=s),u=c?i.apply(l,c):i.call(l),o=a,u},Et=function(e){return Me(e),e.scrollTrigger&&e.scrollTrigger.kill(!!a),e.progress()<1&&Tt(e,`onInterrupt`),e},Dt,Ot=[],kt=function(e){if(e){if(e=!e.name&&e.default||e,x()||e.headless){var t=e.name,n=g(e),r=t&&!n&&e.init?function(){this._props=[]}:e,i={init:ae,render:En,add:an,kill:On,modifier:Dn,rawVars:0},a={targetTest:0,get:0,getSetter:Sn,aliases:{},register:0};if(Vt(),e!==r){if(de[t])return;Ce(r,Ce(De(e,i),a)),Te(r.prototype,Te(i,De(e,a))),de[r.prop=t]=r,e.targetTest&&(me.push(r),ce[t]=1),t=(t===`css`?`CSS`:t.charAt(0).toUpperCase()+t.substr(1))+`Plugin`}ie(t,r),e.register&&e.register(Gn,r,jn)}else Ot.push(e)}},At=255,jt={aqua:[0,At,At],lime:[0,At,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,At],navy:[0,0,128],white:[At,At,At],olive:[128,128,0],yellow:[At,At,0],orange:[At,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[At,0,0],pink:[At,192,203],cyan:[0,At,At],transparent:[At,At,At,0]},Mt=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*At+.5|0},Nt=function(e,t,n){var r=e?_(e)?[e>>16,e>>8&At,e&At]:0:jt.black,i,a,o,s,c,l,u,d,f,p;if(!r){if(e.substr(-1)===`,`&&(e=e.substr(0,e.length-1)),jt[e])r=jt[e];else if(e.charAt(0)===`#`){if(e.length<6&&(i=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e=`#`+i+i+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):``)),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&At,r&At,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&At,e&At]}else if(e.substr(0,3)===`hsl`){if(r=p=e.match(D),!t)s=r[0]%360/360,c=r[1]/100,l=r[2]/100,a=l<=.5?l*(c+1):l+c-l*c,i=l*2-a,r.length>3&&(r[3]*=1),r[0]=Mt(s+1/3,i,a),r[1]=Mt(s,i,a),r[2]=Mt(s-1/3,i,a);else if(~e.indexOf(`=`))return r=e.match(O),n&&r.length<4&&(r[3]=1),r}else r=e.match(D)||jt.transparent;r=r.map(Number)}return t&&!p&&(i=r[0]/At,a=r[1]/At,o=r[2]/At,u=Math.max(i,a,o),d=Math.min(i,a,o),l=(u+d)/2,u===d?s=c=0:(f=u-d,c=l>.5?f/(2-u-d):f/(u+d),s=u===i?(a-o)/f+(a<o?6:0):u===a?(o-i)/f+2:(i-a)/f+4,s*=60),r[0]=~~(s+.5),r[1]=~~(c*100+.5),r[2]=~~(l*100+.5)),n&&r.length<4&&(r[3]=1),r},Pt=function(e){var t=[],n=[],r=-1;return e.split(It).forEach(function(e){var i=e.match(k)||[];t.push.apply(t,i),n.push(r+=i.length+1)}),t.c=n,t},Ft=function(e,t,n){var r=``,i=(e+r).match(It),a=t?`hsla(`:`rgba(`,o=0,s,c,l,u;if(!i)return e;if(i=i.map(function(e){return(e=Nt(e,t,1))&&a+(t?e[0]+`,`+e[1]+`%,`+e[2]+`%,`+e[3]:e.join(`,`))+`)`}),n&&(l=Pt(e),s=n.c,s.join(r)!==l.c.join(r)))for(c=e.replace(It,`1`).split(k),u=c.length-1;o<u;o++)r+=c[o]+(~s.indexOf(o)?i.shift()||a+`0,0,0,0)`:(l.length?l:i.length?i:n).shift());if(!c)for(c=e.split(It),u=c.length-1;o<u;o++)r+=c[o]+i[o];return r+c[u]},It=function(){var e=`(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b`,t;for(t in jt)e+=`|`+t+`\\b`;return RegExp(e+`)`,`gi`)}(),Lt=/hsl[a]?\(/,Rt=function(e){var t=e.join(` `),n;if(It.lastIndex=0,It.test(t))return n=Lt.test(t),e[1]=Ft(e[1],n),e[0]=Ft(e[0],n,Pt(e[1])),!0},zt,Bt=function(){var e=Date.now,t=500,n=33,r=e(),i=r,a=1e3/240,o=a,s=[],c,l,u,d,f,p,m=function u(m){var h=e()-i,g=m===!0,_,v,y,b;if((h>t||h<0)&&(r+=h-n),i+=h,y=i-r,_=y-o,(_>0||g)&&(b=++d.frame,f=y-d.time*1e3,d.time=y/=1e3,o+=_+(_>=a?0:a-_),v=1),g||(c=l(u)),v)for(p=0;p<s.length;p++)s[p](y,f,b,m)};return d={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(e){return f/(1e3/(e||60))},wake:function(){ne&&(!I&&x()&&(F=I=window,ee=F.document||{},L.gsap=Gn,(F.gsapVersions||(F.gsapVersions=[])).push(Gn.version),R(te||F.GreenSockGlobals||!F.gsap&&F||{}),Ot.forEach(kt)),u=typeof requestAnimationFrame<`u`&&requestAnimationFrame,c&&d.sleep(),l=u||function(e){return setTimeout(e,o-d.time*1e3+1|0)},zt=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),zt=0,l=ae},lagSmoothing:function(e,r){t=e||1/0,n=Math.min(r||33,t)},fps:function(e){a=1e3/(e||240),o=d.time*1e3+a},add:function(e,t,n){var r=t?function(t,n,i,a){e(t,n,i,a),d.remove(r)}:e;return d.remove(e),s[n?`unshift`:`push`](r),Vt(),r},remove:function(e,t){~(t=s.indexOf(e))&&s.splice(t,1)&&p>=t&&p--},_listeners:s},d}(),Vt=function(){return!zt&&Bt.wake()},Ht={},Ut=/^[\d.\-M][\d.\-,\s]/,Wt=/["']/g,Gt=function(e){for(var t={},n=e.substr(1,e.length-3).split(`:`),r=n[0],i=1,a=n.length,o,s,c;i<a;i++)s=n[i],o=i===a-1?s.length:s.lastIndexOf(`,`),c=s.substr(0,o),t[r]=isNaN(c)?c.replace(Wt,``).trim():+c,r=s.substr(o+1).trim();return t},Kt=function(e){var t=e.indexOf(`(`)+1,n=e.indexOf(`)`),r=e.indexOf(`(`,t);return e.substring(t,~r&&r<n?e.indexOf(`)`,n+1):n)},qt=function(e){var t=(e+``).split(`(`),n=Ht[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf(`{`)?[Gt(t[1])]:Kt(e).split(`,`).map(xe)):Ht._CE&&Ut.test(e)?Ht._CE(``,e):n},Jt=function(e){return function(t){return 1-e(1-t)}},Yt=function(e,t){return e&&(g(e)?e:Ht[e]||qt(e))||t},Xt=function(e,t,n,r){n===void 0&&(n=function(e){return 1-t(1-e)}),r===void 0&&(r=function(e){return e<.5?t(e*2)/2:1-t((1-e)*2)/2});var i={easeIn:t,easeOut:n,easeInOut:r},a;return U(e,function(e){for(var t in Ht[e]=L[e]=i,Ht[a=e.toLowerCase()]=n,i)Ht[a+(t===`easeIn`?`.in`:t===`easeOut`?`.out`:`.inOut`)]=Ht[e+`.`+t]=i[t]}),i},Zt=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Qt=function e(t,n,r){var i=n>=1?n:1,a=(r||(t?.3:.45))/(n<1?n:1),o=a/l*(Math.asin(1/i)||0),s=function(e){return e===1?1:i*2**(-10*e)*m((e-o)*a)+1},c=t===`out`?s:t===`in`?function(e){return 1-s(1-e)}:Zt(s);return a=l/a,c.config=function(n,r){return e(t,n,r)},c},$t=function e(t,n){n===void 0&&(n=1.70158);var r=function(e){return e?--e*e*((n+1)*e+n)+1:0},i=t===`out`?r:t===`in`?function(e){return 1-r(1-e)}:Zt(r);return i.config=function(n){return e(t,n)},i};U(`Linear,Quad,Cubic,Quart,Quint,Strong`,function(e,t){var n=t<5?t+1:t;Xt(e+`,Power`+(n-1),t?function(e){return e**+n}:function(e){return e},function(e){return 1-(1-e)**n},function(e){return e<.5?(e*2)**n/2:1-((1-e)*2)**n/2})}),Ht.Linear.easeNone=Ht.none=Ht.Linear.easeIn,Xt(`Elastic`,Qt(`in`),Qt(`out`),Qt()),(function(e,t){var n=1/t,r=2*n,i=2.5*n,a=function(a){return a<n?e*a*a:a<r?e*(a-1.5/t)**2+.75:a<i?e*(a-=2.25/t)*a+.9375:e*(a-2.625/t)**2+.984375};Xt(`Bounce`,function(e){return 1-a(1-e)},a)})(7.5625,2.75),Xt(`Expo`,function(e){return 2**(10*(e-1))*e+e*e*e*e*e*e*(1-e)}),Xt(`Circ`,function(e){return-(f(1-e*e)-1)}),Xt(`Sine`,function(e){return e===1?1:-p(e*u)+1}),Xt(`Back`,$t(`in`),$t(`out`),$t()),Ht.SteppedEase=Ht.steps=L.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+ +!t,i=+!!t,a=1-c;return function(e){return((r*nt(0,a,e)|0)+i)*n}}},r.ease=Ht[`quad.out`],U(`onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt`,function(e){return he+=e+`,`+e+`Params,`});var en=function(e,t){this.id=d++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:_e,this.set=t?t.getSetter:Sn},tn=/*#__PURE__*/ function(){function e(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Xe(this,+e.duration,1,1),this.data=e.data,o&&(this._ctx=o,o.data.push(this)),zt||Bt.wake()}var t=e.prototype;return t.delay=function(e){return e||e===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+e-this._delay),this._delay=e,this):this._delay},t.duration=function(e){return arguments.length?this.totalDuration(this._repeat>0?e+(e+this._rDelay)*this._repeat:e):this.totalDuration()&&this._dur},t.totalDuration=function(e){return arguments.length?(this._dirty=0,Xe(this,this._repeat<0?e:(e-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(e,t){if(Vt(),!arguments.length)return this._tTime;var n=this._dp;if(n&&n.smoothChildTiming&&this._ts){for(Ve(this,e),!n._dp||n.parent||He(n,this);n&&n.parent;)n.parent._time!==n._start+(n._ts>=0?n._tTime/n._ts:(n.totalDuration()-n._tTime)/-n._ts)&&n.totalTime(n._tTime,!0),n=n.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&e<this._tDur||this._ts<0&&e>0||!this._tDur&&!e)&&Ue(this._dp,this,this._start-this._delay)}return(this._tTime!==e||!this._dur&&!t||this._initted&&Math.abs(this._zTime)===c||!this._initted&&this._dur&&e||!e&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=e),be(this,e,t)),this},t.time=function(e,t){return arguments.length?this.totalTime(Math.min(this.totalDuration(),e+Le(this))%(this._dur+this._rDelay)||(e?this._dur:0),t):this._time},t.totalProgress=function(e,t){return arguments.length?this.totalTime(this.totalDuration()*e,t):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(e,t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-e:e)+Le(this),t):this.duration()?Math.min(1,this._time/this._dur):+(this.rawTime()>0)},t.iteration=function(e,t){var n=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(e-1)*n,t):this._repeat?Re(this._tTime,n)+1:1},t.timeScale=function(e,t){if(!arguments.length)return this._rts===-c?0:this._rts;if(this._rts===e)return this;var n=this.parent&&this._ts?ze(this.parent._time,this):this._tTime,r=this._rts<0;this._rts=+e||0,this._ts=this._ps||e===-c?0:this._rts;var i=this.totalDuration();return(r!==this._rts<0||n>0&&n<i)&&this.totalTime(nt(-Math.abs(this._delay),i,n),t!==!1),Be(this),Pe(this)},t.paused=function(e){if(!arguments.length)return this._ps;if(this._ps!==e){if(this._ps=e,e)this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0;else{Vt(),this._ts=this._rts;var t=this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,n=this.progress()===1&&Math.abs(this._zTime)!==c,r;if(n)for(this._tTime-=c,r=this._first;r;){if(!r._dur&&r._zTime<0&&r._ts&&r._start<=t+c){n=!1;break}r=r._next}this.totalTime(t,n)}}return this},t.startTime=function(e){if(arguments.length){this._start=G(e);var t=this.parent||this._dp;return t&&(t._sort||!this.parent)&&Ue(t,this,this._start-this._delay),this}return this._start},t.endTime=function(e){return this._start+(b(e)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(e){var t=this.parent||this._dp;return t?e&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?ze(t.rawTime(e),this):this._tTime:this._tTime},t.revert=function(e){e===void 0&&(e=se);var t=a;return a=e,ye(this)&&(this.timeline&&this.timeline.revert(e),this.totalTime(-.01,e.suppressEvents)),this.data!==`nested`&&e.kill!==!1&&this.kill(),a=t,this},t.globalTime=function(e){for(var t=this,n=arguments.length?e:t.rawTime();t;)n=t._start+n/(Math.abs(t._ts)||1),t=t._dp;return!this.parent&&this._sat?this._sat.globalTime(e):n},t.repeat=function(e){return arguments.length?(this._repeat=e===1/0?-2:e,Ze(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(e){if(arguments.length){var t=this._time;return this._rDelay=e,Ze(this),t?this.time(t):this}return this._rDelay},t.yoyo=function(e){return arguments.length?(this._yoyo=e,this):this._yoyo},t.seek=function(e,t){return this.totalTime($e(this,e),b(t))},t.restart=function(e,t){return this.play().totalTime(e?-this._delay:0,b(t)),this._dur||(this._zTime=-c),this},t.play=function(e,t){return e!=null&&this.seek(e,t),this.reversed(!1).paused(!1)},t.reverse=function(e,t){return e!=null&&this.seek(e||this.totalDuration(),t),this.reversed(!0).paused(!1)},t.pause=function(e,t){return e!=null&&this.seek(e,t),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(e){return arguments.length?(!!e!==this.reversed()&&this.timeScale(-this._rts||(e?-c:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-c,this},t.isActive=function(){var e=this.parent||this._dp,t=this._start,n;return!!(!e||this._ts&&this._initted&&e.isActive()&&(n=e.rawTime(!0))>=t&&n<this.endTime(!0)-c)},t.eventCallback=function(e,t,n){var r=this.vars;return arguments.length>1?(t?(r[e]=t,n&&(r[e+`Params`]=n),e===`onUpdate`&&(this._onUpdate=t)):delete r[e],this):r[e]},t.then=function(e){var t=this,n=t._prom;return new Promise(function(r){var i=g(e)?e:Se,a=function(){var e=t.then;t.then=null,n&&n(),g(i)&&(i=i(t))&&(i.then||i===t)&&(t.then=e),r(i),t.then=e};t._initted&&t.totalProgress()===1&&t._ts>=0||!t._tTime&&t._ts<0?a():t._prom=a})},t.kill=function(){Et(this)},e}();Ce(tn.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-c,_prom:0,_ps:!1,_rts:1});var nn=/*#__PURE__*/ function(r){t(i,r);function i(t,n){var i;return t===void 0&&(t={}),i=r.call(this,t)||this,i.labels={},i.smoothChildTiming=!!t.smoothChildTiming,i.autoRemoveChildren=!!t.autoRemoveChildren,i._sort=b(t.sortChildren),P&&Ue(t.parent||P,e(i),n),t.reversed&&i.reverse(),t.paused&&i.paused(!0),t.scrollTrigger&&We(e(i),t.scrollTrigger),i}var o=i.prototype;return o.to=function(e,t,n){return et(0,arguments,this),this},o.from=function(e,t,n){return et(1,arguments,this),this},o.fromTo=function(e,t,n,r){return et(2,arguments,this),this},o.set=function(e,t,n){return t.duration=0,t.parent=this,Oe(t).repeatDelay||(t.repeat=0),t.immediateRender=!!t.immediateRender,new _n(e,t,$e(this,n),1),this},o.call=function(e,t,n){return Ue(this,_n.delayedCall(0,e,t),n)},o.staggerTo=function(e,t,n,r,i,a,o){return n.duration=t,n.stagger=n.stagger||r,n.onComplete=a,n.onCompleteParams=o,n.parent=this,new _n(e,n,$e(this,i)),this},o.staggerFrom=function(e,t,n,r,i,a,o){return n.runBackwards=1,Oe(n).immediateRender=b(n.immediateRender),this.staggerTo(e,t,n,r,i,a,o)},o.staggerFromTo=function(e,t,n,r,i,a,o,s){return r.startAt=n,Oe(r).immediateRender=b(r.immediateRender),this.staggerTo(e,t,r,i,a,o,s)},o.render=function(e,t,n){var r=this._time,i=this._dirty?this.totalDuration():this._tDur,o=this._dur,s=e<=0?0:G(e),l=this._zTime<0!=e<0&&(this._initted||!o),u,d,f,p,m,h,g,_,v,y,b,x;if(this!==P&&s>i&&e>=0&&(s=i),s!==this._tTime||n||l){if(r!==this._time&&o&&(s+=this._time-r,e+=this._time-r),u=s,v=this._start,_=this._ts,h=!_,l&&(o||(r=this._zTime),(e||!t)&&(this._zTime=e)),this._repeat){if(b=this._yoyo,m=o+this._rDelay,this._repeat<-1&&e<0)return this.totalTime(m*100+e,t,n);if(u=G(s%m),s===i?(p=this._repeat,u=o):(y=G(s/m),p=~~y,p&&p===y&&(u=o,p--),u>o&&(u=o)),y=Re(this._tTime,m),!r&&this._tTime&&y!==p&&this._tTime-y*m-this._dur<=0&&(y=p),b&&p&1&&(u=o-u,x=1),p!==y&&!this._lock){var S=b&&y&1,C=S===(b&&p&1);if(p<y&&(S=!S),r=S?0:s%o?o:s,this._lock=1,this.render(r||(x?0:G(p*m)),t,!o)._lock=0,this._tTime=s,!t&&this.parent&&Tt(this,`onRepeat`),this.vars.repeatRefresh&&!x&&(this.invalidate()._lock=1,y=p),r&&r!==this._time||h!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act||(o=this._dur,i=this._tDur,C&&(this._lock=2,r=S?o:-1e-4,this.render(r,!0),this.vars.repeatRefresh&&!x&&this.invalidate()),this._lock=0,!this._ts&&!h))return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(g=Ye(this,G(r),G(u)),g&&(s-=u-(u=g._start))),this._tTime=s,this._time=u,this._act=!!_,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=e,r=0),!r&&s&&o&&!t&&!y&&(Tt(this,`onStart`),this._tTime!==s))return this;if(u>=r&&e>=0)for(d=this._first;d;){if(f=d._next,(d._act||u>=d._start)&&d._ts&&g!==d){if(d.parent!==this)return this.render(e,t,n);if(d.render(d._ts>0?(u-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(u-d._start)*d._ts,t,n),u!==this._time||!this._ts&&!h){g=0,f&&(s+=this._zTime=-c);break}}d=f}else{d=this._last;for(var w=e<0?e:u;d;){if(f=d._prev,(d._act||w<=d._end)&&d._ts&&g!==d){if(d.parent!==this)return this.render(e,t,n);if(d.render(d._ts>0?(w-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(w-d._start)*d._ts,t,n||a&&ye(d)),u!==this._time||!this._ts&&!h){g=0,f&&(s+=this._zTime=w?-c:c);break}}d=f}}if(g&&!t&&(this.pause(),g.render(u>=r?0:-c)._zTime=u>=r?1:-1,this._ts))return this._start=v,Be(this),this.render(e,t,n);this._onUpdate&&!t&&Tt(this,`onUpdate`,!0),(s===i&&this._tTime>=this.totalDuration()||!s&&r)&&(v!==this._start&&Math.abs(_)===Math.abs(this._ts)||this._lock||((e||!o)&&(s===i&&this._ts>0||!s&&this._ts<0)&&Me(this,1),t||e<0&&!r||!s&&!r&&i||(Tt(this,s===i&&e>=0?`onComplete`:`onReverseComplete`,!0),this._prom&&!(s<i&&this.timeScale()>0)&&this._prom())))}return this},o.add=function(e,t){var n=this;if(_(t)||(t=$e(this,t,e)),!(e instanceof tn)){if(w(e))return e.forEach(function(e){return n.add(e,t)}),this;if(h(e))return this.addLabel(e,t);if(g(e))e=_n.delayedCall(0,e);else return this}return this===e?this:Ue(this,e,t)},o.getChildren=function(e,t,n,r){e===void 0&&(e=!0),t===void 0&&(t=!0),n===void 0&&(n=!0),r===void 0&&(r=-s);for(var i=[],a=this._first;a;)a._start>=r&&(a instanceof _n?t&&i.push(a):(n&&i.push(a),e&&i.push.apply(i,a.getChildren(!0,t,n)))),a=a._next;return i},o.getById=function(e){for(var t=this.getChildren(1,1,1),n=t.length;n--;)if(t[n].vars.id===e)return t[n]},o.remove=function(e){return h(e)?this.removeLabel(e):g(e)?this.killTweensOf(e):(e.parent===this&&je(this,e),e===this._recent&&(this._recent=this._last),Ne(this))},o.totalTime=function(e,t){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=G(Bt.time-(this._ts>0?e/this._ts:(this.totalDuration()-e)/-this._ts))),r.prototype.totalTime.call(this,e,t),this._forcing=0,this):this._tTime},o.addLabel=function(e,t){return this.labels[e]=$e(this,t),this},o.removeLabel=function(e){return delete this.labels[e],this},o.addPause=function(e,t,n){var r=_n.delayedCall(0,t||ae,n);return r.data=`isPause`,this._hasPause=1,Ue(this,r,$e(this,e))},o.removePause=function(e){var t=this._first;for(e=$e(this,e);t;)t._start===e&&t.data===`isPause`&&Me(t),t=t._next},o.killTweensOf=function(e,t,n){for(var r=this.getTweensOf(e,n),i=r.length;i--;)cn!==r[i]&&r[i].kill(e,t);return this},o.getTweensOf=function(e,t){for(var n=[],r=ct(e),i=this._first,a=_(t),o;i;)i instanceof _n?K(i._targets,r)&&(a?(!cn||i._initted&&i._ts)&&i.globalTime(0)<=t&&i.globalTime(i.totalDuration())>t:!t||i.isActive())&&n.push(i):(o=i.getTweensOf(r,t)).length&&n.push.apply(n,o),i=i._next;return n},o.tweenTo=function(e,t){t||={};var n=this,r=$e(n,e),i=t,a=i.startAt,o=i.onStart,s=i.onStartParams,l=i.immediateRender,u,d=_n.to(n,Ce({ease:t.ease||`none`,lazy:!1,immediateRender:!1,time:r,overwrite:`auto`,duration:t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale())||c,onStart:function(){if(n.pause(),!u){var e=t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale());d._dur!==e&&Xe(d,e,0,1).render(d._time,!0,!0),u=1}o&&o.apply(d,s||[])}},t));return l?d.render(0):d},o.tweenFromTo=function(e,t,n){return this.tweenTo(t,Ce({startAt:{time:$e(this,e)}},n))},o.recent=function(){return this._recent},o.nextLabel=function(e){return e===void 0&&(e=this._time),wt(this,$e(this,e))},o.previousLabel=function(e){return e===void 0&&(e=this._time),wt(this,$e(this,e),1)},o.currentLabel=function(e){return arguments.length?this.seek(e,!0):this.previousLabel(this._time+c)},o.shiftChildren=function(e,t,n){n===void 0&&(n=0);var r=this._first,i=this.labels,a;for(e=G(e);r;)r._start>=n&&(r._start+=e,r._end+=e),r=r._next;if(t)for(a in i)i[a]>=n&&(i[a]+=e);return Ne(this)},o.invalidate=function(e){var t=this._first;for(this._lock=0;t;)t.invalidate(e),t=t._next;return r.prototype.invalidate.call(this,e)},o.clear=function(e){e===void 0&&(e=!0);for(var t=this._first,n;t;)n=t._next,this.remove(t),t=n;return this._dp&&(this._time=this._tTime=this._pTime=0),e&&(this.labels={}),Ne(this)},o.totalDuration=function(e){var t=0,n=this,r=n._last,i=s,a,o,c;if(arguments.length)return n.timeScale((n._repeat<0?n.duration():n.totalDuration())/(n.reversed()?-e:e));if(n._dirty){for(c=n.parent;r;)a=r._prev,r._dirty&&r.totalDuration(),o=r._start,o>i&&n._sort&&r._ts&&!n._lock?(n._lock=1,Ue(n,r,o-r._delay,1)._lock=0):i=o,o<0&&r._ts&&(t-=o,(!c&&!n._dp||c&&c.smoothChildTiming)&&(n._start+=G(o/n._ts),n._time-=o,n._tTime-=o),n.shiftChildren(-o,!1,-1/0),i=0),r._end>t&&r._ts&&(t=r._end),r=a;Xe(n,n===P&&n._time>t?n._time:t,1,1),n._dirty=0}return n._tDur},i.updateRoot=function(e){if(P._ts&&(be(P,ze(e,P)),ue=Bt.frame),Bt.frame>=pe){pe+=n.autoSleep||120;var t=P._first;if((!t||!t._ts)&&n.autoSleep&&Bt._listeners.length<2){for(;t&&!t._ts;)t=t._next;t||Bt.sleep()}}},i}(tn);Ce(nn.prototype,{_lock:0,_hasPause:0,_forcing:0});var rn=function(e,t,n,r,i,a,o){var s=new jn(this._pt,e,t,0,1,Tn,null,i),c=0,l=0,u,d,f,p,m,h,g,_;for(s.b=n,s.e=r,n+=``,r+=``,(g=~r.indexOf(`random(`))&&(r=xt(r)),a&&(_=[n,r],a(_,e,t),n=_[0],r=_[1]),d=n.match(A)||[];u=A.exec(r);)p=u[0],m=r.substring(c,u.index),f?f=(f+1)%5:m.substr(-5)===`rgba(`&&(f=1),p!==d[l++]&&(h=parseFloat(d[l-1])||0,s._pt={_next:s._pt,p:m||l===1?m:`,`,s:h,c:p.charAt(1)===`=`?ve(h,p)-h:parseFloat(p)-h,m:f&&f<4?Math.round:0},c=A.lastIndex);return s.c=c<r.length?r.substring(c,r.length):``,s.fp=o,(j.test(r)||g)&&(s.e=0),this._pt=s,s},an=function(e,t,r,i,a,o,s,c,l,u){g(i)&&(i=i(a||0,e,o));var d=e[t],f=r===`get`?g(d)?l?e[t.indexOf(`set`)||!g(e[`get`+t.substr(3)])?t:`get`+t.substr(3)](l):e[t]():d:r,p=g(d)?l?bn:yn:vn,m;if(h(i)&&(~i.indexOf(`random(`)&&(i=xt(i)),i.charAt(1)===`=`&&(m=ve(f,i)+(rt(f)||0),(m||m===0)&&(i=m))),!u||f!==i||ln)return!isNaN(f*i)&&i!==``?(m=new jn(this._pt,e,t,+f||0,i-(f||0),typeof d==`boolean`?wn:Cn,0,p),l&&(m.fp=l),s&&m.modifier(s,this,e),this._pt=m):(!d&&!(t in e)&&re(t,i),rn.call(this,e,t,f,i,p,c||n.stringFilter,l))},on=function(e,t,n,r,i){if(g(e)&&(e=mn(e,i,t,n,r)),!y(e)||e.style&&e.nodeType||w(e)||C(e))return h(e)?mn(e,i,t,n,r):e;var a={},o;for(o in e)a[o]=mn(e[o],i,t,n,r);return a},sn=function(e,t,n,r,i,a){var o,s,c,l;if(de[e]&&(o=new de[e]).init(i,o.rawVars?t[e]:on(t[e],r,i,a,n),n,r,a)!==!1&&(n._pt=s=new jn(n._pt,i,e,0,1,o.render,o,0,o.priority),n!==Dt))for(c=n._ptLookup[n._targets.indexOf(i)],l=o._props.length;l--;)c[o._props[l]]=s;return o},cn,ln,un=function e(t,n,o){var l=t.vars,u=l.ease,d=l.startAt,f=l.immediateRender,p=l.lazy,m=l.onUpdate,h=l.runBackwards,g=l.yoyoEase,_=l.keyframes,v=l.autoRevert,y=t._dur,x=t._startAt,S=t._targets,C=t.parent,w=C&&C.data===`nested`?C.vars.targets:S,T=t._overwrite===`auto`&&!i,E=t.timeline,D=l.easeReverse||g,O,k,A,j,M,N,F,I,ee,L,te,ne,R;if(!E||_&&u||(u=`none`),t._ease=Yt(u,r.ease),t._rEase=D&&(Yt(D)||t._ease),t._from=!E&&!!l.runBackwards,t._from&&(t.ratio=1),!E||_&&!l.stagger){if(I=S[0]?H(S[0]).harness:0,ne=I&&l[I.prop],O=De(l,ce),x&&(x._zTime<0&&x.progress(1),n<0&&h&&f&&!v?x.render(-1,!0):x.revert(h&&y?B:oe),x._lazy=0),d){if(Me(t._startAt=_n.set(S,Ce({data:`isStart`,overwrite:!1,parent:C,immediateRender:!0,lazy:!x&&b(p),startAt:null,delay:0,onUpdate:m&&function(){return Tt(t,`onUpdate`)},stagger:0},d))),t._startAt._dp=0,t._startAt._sat=t,n<0&&(a||!f&&!v)&&t._startAt.revert(B),f&&y&&n<=0&&o<=0){n&&(t._zTime=n);return}}else if(h&&y&&!x){if(n&&(f=!1),A=Ce({overwrite:!1,data:`isFromStart`,lazy:f&&!x&&b(p),immediateRender:f,stagger:0,parent:C},O),ne&&(A[I.prop]=ne),Me(t._startAt=_n.set(S,A)),t._startAt._dp=0,t._startAt._sat=t,n<0&&(a?t._startAt.revert(B):t._startAt.render(-1,!0)),t._zTime=n,!f)e(t._startAt,c,c);else if(!n)return}for(t._pt=t._ptCache=0,p=y&&b(p)||p&&!y,k=0;k<S.length;k++){if(M=S[k],F=M._gsap||ge(S)[k]._gsap,t._ptLookup[k]=L={},le[F.id]&&V.length&&q(),te=w===S?k:w.indexOf(M),I&&(ee=new I).init(M,ne||O,t,te,w)!==!1&&(t._pt=j=new jn(t._pt,M,ee.name,0,1,ee.render,ee,0,ee.priority),ee._props.forEach(function(e){L[e]=j}),ee.priority&&(N=1)),!I||ne)for(A in O)de[A]&&(ee=sn(A,O,t,te,M,w))?ee.priority&&(N=1):L[A]=j=an.call(t,M,A,`get`,O[A],te,w,0,l.stringFilter);t._op&&t._op[k]&&t.kill(M,t._op[k]),T&&t._pt&&(cn=t,P.killTweensOf(M,L,t.globalTime(n)),R=!t.parent,cn=0),t._pt&&p&&(le[F.id]=1)}N&&An(t),t._onInit&&t._onInit(t)}t._onUpdate=m,t._initted=(!t._op||t._pt)&&!R,_&&n<=0&&E.render(s,!0,!0)},dn=function(e,t,n,r,i,a,o,s){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],l,u,d,f;if(!c)for(c=e._ptCache[t]=[],d=e._ptLookup,f=e._targets.length;f--;){if(l=d[f][t],l&&l.d&&l.d._pt)for(l=l.d._pt;l&&l.p!==t&&l.fp!==t;)l=l._next;if(!l)return ln=1,e.vars[t]=`+=0`,un(e,o),ln=0,s?z(t+` not eligible for reset. Try splitting into individual properties`):1;c.push(l)}for(f=c.length;f--;)u=c[f],l=u._pt||u,l.s=(r||r===0)&&!i?r:l.s+(r||0)+a*l.c,l.c=n-l.s,u.e&&(u.e=W(n)+rt(u.e)),u.b&&(u.b=l.s+rt(u.b))},fn=function(e,t){var n=e[0]?H(e[0]).harness:0,r=n&&n.aliases,i,a,o,s;if(!r)return t;for(a in i=Te({},t),r)if(a in i)for(s=r[a].split(`,`),o=s.length;o--;)i[s[o]]=i[a];return i},pn=function(e,t,n,r){var i=t.ease||r||`power1.inOut`,a,o;if(w(t))o=n[e]||(n[e]=[]),t.forEach(function(e,n){return o.push({t:n/(t.length-1)*100,v:e,e:i})});else for(a in t)o=n[a]||(n[a]=[]),a===`ease`||o.push({t:parseFloat(e),v:t[a],e:i})},mn=function(e,t,n,r,i){return g(e)?e.call(t,n,r,i):h(e)&&~e.indexOf(`random(`)?xt(e):e},hn=he+`repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert`,gn={};U(hn+`,id,stagger,delay,duration,paused,scrollTrigger`,function(e){return gn[e]=1}),hn=hn.split(`,`);var _n=/*#__PURE__*/ function(r){t(o,r);function o(t,a,o,s){var l;typeof a==`number`&&(o.duration=a,a=o,o=null),l=r.call(this,s?a:Oe(a))||this;var u=l.vars,d=u.duration,f=u.delay,p=u.immediateRender,m=u.stagger,h=u.overwrite,g=u.keyframes,v=u.defaults,x=u.scrollTrigger,T=a.parent||P,E=(w(t)||C(t)?_(t[0]):`length`in a)?[t]:ct(t),D,O,k,A,j,M,N,F;if(l._targets=E.length?ge(E):z(`GSAP target `+t+` not found. https://gsap.com`,!n.nullTargetWarn)||[],l._ptLookup=[],l._overwrite=h,g||m||S(d)||S(f)){a=l.vars;var I=a.easeReverse||a.yoyoEase;if(D=l.timeline=new nn({data:`nested`,defaults:v||{},targets:T&&T.data===`nested`?T.vars.targets:E}),D.kill(),D.parent=D._dp=e(l),D._start=0,m||S(d)||S(f)){if(A=E.length,N=m&&dt(m),y(m))for(j in m)~hn.indexOf(j)&&(F||={},F[j]=m[j]);for(O=0;O<A;O++)k=De(a,gn),k.stagger=0,I&&(k.easeReverse=I),F&&Te(k,F),M=E[O],k.duration=+mn(d,e(l),O,M,E),k.delay=(+mn(f,e(l),O,M,E)||0)-l._delay,!m&&A===1&&k.delay&&(l._delay=f=k.delay,l._start+=f,k.delay=0),D.to(M,k,N?N(O,M,E):0),D._ease=Ht.none;D.duration()?d=f=0:l.timeline=0}else if(g){Oe(Ce(D.vars.defaults,{ease:`none`})),D._ease=Yt(g.ease||a.ease||`none`);var ee=0,L,te,ne;if(w(g))g.forEach(function(e){return D.to(E,e,`>`)}),D.duration();else{for(j in k={},g)j===`ease`||j===`easeEach`||pn(j,g[j],k,g.easeEach);for(j in k)for(L=k[j].sort(function(e,t){return e.t-t.t}),ee=0,O=0;O<L.length;O++)te=L[O],ne={ease:te.e,duration:(te.t-(O?L[O-1].t:0))/100*d},ne[j]=te.v,D.to(E,ne,ee),ee+=ne.duration;D.duration()<d&&D.to({},{duration:d-D.duration()})}}d||l.duration(d=D.duration())}else l.timeline=0;return h===!0&&!i&&(cn=e(l),P.killTweensOf(E),cn=0),Ue(T,e(l),o),a.reversed&&l.reverse(),a.paused&&l.paused(!0),(p||!d&&!g&&l._start===G(T._time)&&b(p)&&Ie(e(l))&&T.data!==`nested`)&&(l._tTime=-c,l.render(Math.max(0,-f)||0)),x&&We(e(l),x),l}var s=o.prototype;return s.render=function(e,t,n){var r=this._time,i=this._tDur,a=this._dur,o=e<0,s=e>i-c&&!o?i:e<c?0:e,l,u,d,f,p,m,h,g;if(!a)Je(this,e,t,n);else if(s!==this._tTime||!e||n||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==o||this._lazy){if(l=s,g=this.timeline,this._repeat){if(f=a+this._rDelay,this._repeat<-1&&o)return this.totalTime(f*100+e,t,n);if(l=G(s%f),s===i?(d=this._repeat,l=a):(p=G(s/f),d=~~p,d&&d===p?(l=a,d--):l>a&&(l=a)),m=this._yoyo&&d&1,m&&(l=a-l),p=Re(this._tTime,f),l===r&&!n&&this._initted&&d===p)return this._tTime=s,this;d!==p&&this.vars.repeatRefresh&&!m&&!this._lock&&l!==f&&this._initted&&(this._lock=n=1,this.render(G(f*d),!0).invalidate()._lock=0)}if(!this._initted){if(Ge(this,o?e:l,n,t,s))return this._tTime=0,this;if(r!==this._time&&!(n&&this.vars.repeatRefresh&&d!==p))return this;if(a!==this._dur)return this.render(e,t,n)}if(this._rEase){var _=l<r;if(_!==this._inv){var v=_?r:a-r;this._inv=_,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=r,this._invRecip=v?(_?-1:1)/v:0,this._invScale=_?-this.ratio:1-this.ratio,this._invEase=_?this._rEase:this._ease}this.ratio=h=this._invRatio+this._invScale*this._invEase((l-this._invTime)*this._invRecip)}else this.ratio=h=this._ease(l/a);if(this._from&&(this.ratio=h=1-h),this._tTime=s,this._time=l,!this._act&&this._ts&&(this._act=1,this._lazy=0),!r&&s&&!t&&!p&&(Tt(this,`onStart`),this._tTime!==s))return this;for(u=this._pt;u;)u.r(h,u.d),u=u._next;g&&g.render(e<0?e:g._dur*g._ease(l/this._dur),t,n)||this._startAt&&(this._zTime=e),this._onUpdate&&!t&&(o&&Fe(this,e,t,n),Tt(this,`onUpdate`)),this._repeat&&d!==p&&this.vars.onRepeat&&!t&&this.parent&&Tt(this,`onRepeat`),s!==this._tDur&&s||this._tTime!==s||(o&&!this._onUpdate&&Fe(this,e,!0,!0),(e||!a)&&(s===this._tDur&&this._ts>0||!s&&this._ts<0)&&Me(this,1),!t&&(!o||r)&&(s||r||m)&&(Tt(this,s===i?`onComplete`:`onReverseComplete`,!0),this._prom&&!(s<i&&this.timeScale()>0)&&this._prom()))}return this},s.targets=function(){return this._targets},s.invalidate=function(e){return e&&this.vars.runBackwards||(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(e),r.prototype.invalidate.call(this,e)},s.resetTo=function(e,t,n,r,i){zt||Bt.wake(),this._ts||this.play();var a=Math.min(this._dur,(this._dp._time-this._start)*this._ts),o;return this._initted||un(this,a),o=this._ease(a/this._dur),dn(this,e,t,n,r,o,a,i)?this.resetTo(e,t,n,r,1):(Ve(this,0),this.parent||Ae(this._dp,this,`_first`,`_last`,this._dp._sort?`_start`:0),this.render(0))},s.kill=function(e,t){if(t===void 0&&(t=`all`),!e&&(!t||t===`all`))return this._lazy=this._pt=0,this.parent?Et(this):this.scrollTrigger&&this.scrollTrigger.kill(!!a),this;if(this.timeline){var n=this.timeline.totalDuration();return this.timeline.killTweensOf(e,t,cn&&cn.vars.overwrite!==!0)._first||Et(this),this.parent&&n!==this.timeline.totalDuration()&&Xe(this,this._dur*this.timeline._tDur/n,0,1),this}var r=this._targets,i=e?ct(e):r,o=this._ptLookup,s=this._pt,c,l,u,d,f,p,m;if((!t||t===`all`)&&ke(r,i))return t===`all`&&(this._pt=0),Et(this);for(c=this._op=this._op||[],t!==`all`&&(h(t)&&(f={},U(t,function(e){return f[e]=1}),t=f),t=fn(r,t)),m=r.length;m--;)if(~i.indexOf(r[m]))for(f in l=o[m],t===`all`?(c[m]=t,d=l,u={}):(u=c[m]=c[m]||{},d=t),d)p=l&&l[f],p&&(`kill`in p.d&&p.d.kill(f)!==!0||je(this,p,`_pt`),delete l[f]),u!==`all`&&(u[f]=1);return this._initted&&!this._pt&&s&&Et(this),this},o.to=function(e,t){return new o(e,t,arguments[2])},o.from=function(e,t){return et(1,arguments)},o.delayedCall=function(e,t,n,r){return new o(t,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:e,onComplete:t,onReverseComplete:t,onCompleteParams:n,onReverseCompleteParams:n,callbackScope:r})},o.fromTo=function(e,t,n){return et(2,arguments)},o.set=function(e,t){return t.duration=0,t.repeatDelay||(t.repeat=0),new o(e,t)},o.killTweensOf=function(e,t,n){return P.killTweensOf(e,t,n)},o}(tn);Ce(_n.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),U(`staggerTo,staggerFrom,staggerFromTo`,function(e){_n[e]=function(){var t=new nn,n=at.call(arguments,0);return n.splice(e===`staggerFromTo`?5:4,0,0),t[e].apply(t,n)}});var vn=function(e,t,n){return e[t]=n},yn=function(e,t,n){return e[t](n)},bn=function(e,t,n,r){return e[t](r.fp,n)},xn=function(e,t,n){return e.setAttribute(t,n)},Sn=function(e,t){return g(e[t])?yn:v(e[t])&&e.setAttribute?xn:vn},Cn=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},wn=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Tn=function(e,t){var n=t._pt,r=``;if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},En=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},Dn=function(e,t,n,r){for(var i=this._pt,a;i;)a=i._next,i.p===r&&i.modifier(e,t,n),i=a},On=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?je(this,t,`_pt`):t.dep||(n=1),t=r;return!n},kn=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},An=function(e){for(var t=e._pt,n,r,i,a;t;){for(n=t._next,r=i;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:a)?t._prev._next=t:i=t,(t._next=r)?r._prev=t:a=t,t=n}e._pt=i},jn=/*#__PURE__*/ function(){function e(e,t,n,r,i,a,o,s,c){this.t=t,this.s=r,this.c=i,this.p=n,this.r=a||Cn,this.d=o||this,this.set=s||vn,this.pr=c||0,this._next=e,e&&(e._prev=this)}var t=e.prototype;return t.modifier=function(e,t,n){this.mSet=this.mSet||this.set,this.set=kn,this.m=e,this.mt=n,this.tween=t},e}();U(he+`parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse`,function(e){return ce[e]=1}),L.TweenMax=L.TweenLite=_n,L.TimelineLite=L.TimelineMax=nn,P=new nn({sortChildren:!1,defaults:r,autoRemoveChildren:!0,id:`root`,smoothChildTiming:!0}),n.stringFilter=Rt;var Mn=[],Nn={},Pn=[],Fn=0,In=0,Ln=function(e){return(Nn[e]||Pn).map(function(e){return e()})},Rn=function(){var e=Date.now(),t=[];e-Fn>2&&(Ln(`matchMediaInit`),Mn.forEach(function(e){var n=e.queries,r=e.conditions,i,a,o,s;for(a in n)i=F.matchMedia(n[a]).matches,i&&(o=1),i!==r[a]&&(r[a]=i,s=1);s&&(e.revert(),o&&t.push(e))}),Ln(`matchMediaRevert`),t.forEach(function(e){return e.onMatch(e,function(t){return e.add(null,t)})}),Fn=e,Ln(`matchMedia`))},zn=/*#__PURE__*/ function(){function e(e,t){this.selector=t&&lt(t),this.data=[],this._r=[],this.isReverted=!1,this.id=In++,e&&this.add(e)}var t=e.prototype;return t.add=function(e,t,n){g(e)&&(n=t,t=e,e=g);var r=this,i=function(){var e=o,i=r.selector,a;return e&&e!==r&&e.data.push(r),n&&(r.selector=lt(n)),o=r,a=t.apply(r,arguments),g(a)&&r._r.push(a),o=e,r.selector=i,r.isReverted=!1,a};return r.last=i,e===g?i(r,function(e){return r.add(null,e)}):e?r[e]=i:i},t.ignore=function(e){var t=o;o=null,e(this),o=t},t.getTweens=function(){var t=[];return this.data.forEach(function(n){return n instanceof e?t.push.apply(t,n.getTweens()):n instanceof _n&&!(n.parent&&n.parent.data===`nested`)&&t.push(n)}),t},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(e,t){var n=this;if(e?(function(){for(var t=n.getTweens(),r=n.data.length,i;r--;)i=n.data[r],i.data===`isFlip`&&(i.revert(),i.getChildren(!0,!0,!1).forEach(function(e){return t.splice(t.indexOf(e),1)}));for(t.map(function(e){return{g:e._dur||e._delay||e._sat&&!e._sat.vars.immediateRender?e.globalTime(0):-1/0,t:e}}).sort(function(e,t){return t.g-e.g||-1/0}).forEach(function(t){return t.t.revert(e)}),r=n.data.length;r--;)i=n.data[r],i instanceof nn?i.data!==`nested`&&(i.scrollTrigger&&i.scrollTrigger.revert(),i.kill()):!(i instanceof _n)&&i.revert&&i.revert(e);n._r.forEach(function(t){return t(e,n)}),n.isReverted=!0})():this.data.forEach(function(e){return e.kill&&e.kill()}),this.clear(),t){for(var r=Mn.length;r--;)Mn[r].id===this.id&&Mn.splice(r,1);this._mqs&&this._mqs.forEach(function(e){return e.removeListener?e.removeListener(Rn):e.removeEventListener(`change`,Rn)}),this._mqs=null}},t.revert=function(e){this.kill(e||{})},e}(),Bn=/*#__PURE__*/ function(){function e(e){this.contexts=[],this.scope=e,o&&o.data.push(this)}var t=e.prototype;return t.add=function(e,t,n){y(e)||(e={matches:e});var r=new zn(0,n||this.scope),i=r.conditions={},a,s,c;for(s in o&&!r.selector&&(r.selector=o.selector),this.contexts.push(r),t=r.add(`onMatch`,t),r.queries=e,e)s===`all`?c=1:(a=F.matchMedia(e[s]),a&&(Mn.indexOf(r)<0&&Mn.push(r),(i[s]=a.matches)&&(c=1),a.addListener?a.addListener(Rn):a.addEventListener(`change`,Rn),(r._mqs||=[]).push(a)));return c&&t(r,function(e){return r.add(null,e)}),this},t.revert=function(e){this.kill(e||{})},t.kill=function(e){this.contexts.forEach(function(t){return t.kill(e,!0)})},e}(),Vn={registerPlugin:function(){[...arguments].forEach(function(e){return kt(e)})},timeline:function(e){return new nn(e)},getTweensOf:function(e,t){return P.getTweensOf(e,t)},getProperty:function(e,t,n,r){h(e)&&(e=ct(e)[0]);var i=H(e||{}).get,a=n?Se:xe;return n===`native`&&(n=``),e&&(t?a((de[t]&&de[t].get||i)(e,t,n,r)):function(t,n,r){return a((de[t]&&de[t].get||i)(e,t,n,r))})},quickSetter:function(e,t,n){if(e=ct(e),e.length>1){var r=e.map(function(e){return Gn.quickSetter(e,t,n)}),i=r.length;return function(e){for(var t=i;t--;)r[t](e)}}e=e[0]||{};var a=de[t],o=H(e),s=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(t){var r=new a;Dt._pt=0,r.init(e,n?t+n:t,Dt,0,[e]),r.render(1,r),Dt._pt&&En(1,Dt)}:o.set(e,s);return a?c:function(t){return c(e,s,n?t+n:t,o,1)}},quickTo:function(e,t,n){var r,i=Gn.to(e,Ce((r={},r[t]=`+=0.1`,r.paused=!0,r.stagger=0,r),n||{})),a=function(e,n,r){return i.resetTo(t,e,n,r)};return a.tween=i,a},isTweening:function(e){return P.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Yt(e.ease,r.ease)),Ee(r,e||{})},config:function(e){return Ee(n,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,i=e.defaults,a=e.extendTimeline;(r||``).split(`,`).forEach(function(e){return e&&!de[e]&&!L[e]&&z(t+` effect requires `+e+` plugin.`)}),fe[t]=function(e,t,r){return n(ct(e),Ce(t||{},i),r)},a&&(nn.prototype[t]=function(e,n,r){return this.add(fe[t](e,y(n)?n:(r=n)&&{},this),r)})},registerEase:function(e,t){Ht[e]=Yt(t)},parseEase:function(e,t){return arguments.length?Yt(e,t):Ht},getById:function(e){return P.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new nn(e),r,i;for(n.smoothChildTiming=b(e.smoothChildTiming),P.remove(n),n._dp=0,n._time=n._tTime=P._time,r=P._first;r;)i=r._next,(t||!(!r._dur&&r instanceof _n&&r.vars.onComplete===r._targets[0]))&&Ue(n,r,r._start-r._delay),r=i;return Ue(P,n,0),n},context:function(e,t){return e?new zn(e,t):o},matchMedia:function(e){return new Bn(e)},matchMediaRefresh:function(){return Mn.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||Rn()},addEventListener:function(e,t){var n=Nn[e]||(Nn[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Nn[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:yt,wrapYoyo:bt,distribute:dt,random:mt,snap:pt,normalize:_t,getUnit:rt,clamp:it,splitColor:Nt,toArray:ct,selector:lt,mapRange:St,pipe:ht,unitize:gt,interpolate:Ct,shuffle:ut},install:R,effects:fe,ticker:Bt,updateRoot:nn.updateRoot,plugins:de,globalTimeline:P,core:{PropTween:jn,globals:ie,Tween:_n,Timeline:nn,Animation:tn,getCache:H,_removeLinkedListItem:je,reverting:function(){return a},context:function(e){return e&&o&&(o.data.push(e),e._ctx=o),o},suppressOverwrites:function(e){return i=e}}};U(`to,from,fromTo,delayedCall,set,killTweensOf`,function(e){return Vn[e]=_n[e]}),Bt.add(nn.updateRoot),Dt=Vn.to({},{duration:0});var Hn=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},Un=function(e,t){var n=e._targets,r,i,a;for(r in t)for(i=n.length;i--;)a=e._ptLookup[i][r],(a&&=a.d)&&(a._pt&&(a=Hn(a,r)),a&&a.modifier&&a.modifier(t[r],e,n[i],r))},Wn=function(e,t){return{name:e,headless:1,rawVars:1,init:function(e,n,r){r._onInit=function(e){var r,i;if(h(n)&&(r={},U(n,function(e){return r[e]=1}),n=r),t){for(i in r={},n)r[i]=t(n[i]);n=r}Un(e,n)}}}},Gn=Vn.registerPlugin({name:`attr`,init:function(e,t,n,r,i){var a,o,s;for(a in this.tween=n,t)s=e.getAttribute(a)||``,o=this.add(e,`setAttribute`,(s||0)+``,t[a],r,i,0,0,a),o.op=a,o.b=s,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)a?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:`endArray`,headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Wn(`roundProps`,ft),Wn(`modifiers`),Wn(`snap`,pt))||Vn;_n.version=nn.version=Gn.version=`3.15.1`,ne=1,x()&&Vt(),Ht.Power0,Ht.Power1,Ht.Power2,Ht.Power3,Ht.Power4,Ht.Linear,Ht.Quad,Ht.Cubic,Ht.Quart,Ht.Quint,Ht.Strong,Ht.Elastic,Ht.Back,Ht.SteppedEase,Ht.Bounce,Ht.Sine,Ht.Expo,Ht.Circ;var Kn,qn,Jn,Yn,Xn,Zn,Qn,$n=function(){return typeof window<`u`},er={},tr=180/Math.PI,nr=Math.PI/180,rr=Math.atan2,ir=1e8,ar=/([A-Z])/g,or=/(left|right|width|margin|padding|x)/i,sr=/[\s,\(]\S/,cr={autoAlpha:`opacity,visibility`,scale:`scaleX,scaleY`,alpha:`opacity`},lr=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},ur=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},dr=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},fr=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},pr=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},mr=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},hr=function(e,t){return t.set(t.t,t.p,e===1?t.e:t.b,t)},gr=function(e,t,n){return e.style[t]=n},_r=function(e,t,n){return e.style.setProperty(t,n)},vr=function(e,t,n){return e._gsap[t]=n},yr=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},br=function(e,t,n,r,i){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(i,a)},xr=function(e,t,n,r,i){var a=e._gsap;a[t]=n,a.renderTransform(i,a)},Sr=`transform`,Cr=Sr+`Origin`,wr=function e(t,n){var r=this,i=this.target,a=i.style,o=i._gsap;if(t in er&&a){if(this.tfm=this.tfm||{},t!==`transform`)t=cr[t]||t,~t.indexOf(`,`)?t.split(`,`).forEach(function(e){return r.tfm[e]=Ur(i,e)}):this.tfm[t]=o.x?o[t]:Ur(i,t),t===Cr&&(this.tfm.zOrigin=o.zOrigin);else return cr.transform.split(`,`).forEach(function(t){return e.call(r,t,n)});if(this.props.indexOf(Sr)>=0)return;o.svg&&(this.svgo=i.getAttribute(`data-svg-origin`),this.props.push(Cr,n,``)),t=Sr}(a||n)&&this.props.push(t,n,a[t])},Tr=function(e){e.translate&&(e.removeProperty(`translate`),e.removeProperty(`scale`),e.removeProperty(`rotate`))},Er=function(){for(var e=this.props,t=this.target,n=t.style,r=t._gsap,i=0,a;i<e.length;i+=3)e[i+1]?e[i+1]===2?t[e[i]](e[i+2]):t[e[i]]=e[i+2]:e[i+2]?n[e[i]]=e[i+2]:n.removeProperty(e[i].substr(0,2)===`--`?e[i]:e[i].replace(ar,`-$1`).toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),t.setAttribute(`data-svg-origin`,this.svgo||``)),i=Qn(),i&&i.isStart||n[Sr]||(Tr(n),r.zOrigin&&n[Cr]&&(n[Cr]+=` `+r.zOrigin+`px`,r.zOrigin=0,r.renderTransform()),r.uncache=1)}},Dr=function(e,t){var n={target:e,props:[],revert:Er,save:wr};return e._gsap||Gn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(`,`).forEach(function(e){return n.save(e)}),n},Or,kr=function(e,t){var n=qn.createElementNS?qn.createElementNS((t||`http://www.w3.org/1999/xhtml`).replace(/^https/,`http`),e):qn.createElement(e);return n&&n.style?n:qn.createElement(e)},Ar=function e(t,n,r){var i=getComputedStyle(t);return i[n]||i.getPropertyValue(n.replace(ar,`-$1`).toLowerCase())||i.getPropertyValue(n)||!r&&e(t,Mr(n)||n,1)||``},jr=`O,Moz,ms,Ms,Webkit`.split(`,`),Mr=function(e,t,n){var r=(t||Xn).style,i=5;if(e in r&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);i--&&!(jr[i]+e in r););return i<0?null:(i===3?`ms`:i>=0?jr[i]:``)+e},Nr=function(){$n()&&window.document&&(Kn=window,qn=Kn.document,Jn=qn.documentElement,Xn=kr(`div`)||{style:{}},kr(`div`),Sr=Mr(Sr),Cr=Sr+`Origin`,Xn.style.cssText=`border-width:0;line-height:0;position:absolute;padding:0`,Or=!!Mr(`perspective`),Qn=Gn.core.reverting,Yn=1)},Pr=function(e){var t=e.ownerSVGElement,n=kr(`svg`,t&&t.getAttribute(`xmlns`)||`http://www.w3.org/2000/svg`),r=e.cloneNode(!0),i;r.style.display=`block`,n.appendChild(r),Jn.appendChild(n);try{i=r.getBBox()}catch{}return n.removeChild(r),Jn.removeChild(n),i},Fr=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Ir=function(e){var t,n;try{t=e.getBBox()}catch{t=Pr(e),n=1}return t&&(t.width||t.height)||n||(t=Pr(e)),t&&!t.width&&!t.x&&!t.y?{x:+Fr(e,[`x`,`cx`,`x1`])||0,y:+Fr(e,[`y`,`cy`,`y1`])||0,width:0,height:0}:t},Lr=function(e){return!(!e.getCTM||e.parentNode&&!e.ownerSVGElement||!Ir(e))},Rr=function(e,t){if(t){var n=e.style,r;t in er&&t!==Cr&&(t=Sr),n.removeProperty?(r=t.substr(0,2),(r===`ms`||t.substr(0,6)===`webkit`)&&(t=`-`+t),n.removeProperty(r===`--`?t:t.replace(ar,`-$1`).toLowerCase())):n.removeAttribute(t)}},zr=function(e,t,n,r,i,a){var o=new jn(e._pt,t,n,0,1,a?hr:mr);return e._pt=o,o.b=r,o.e=i,e._props.push(n),o},Br={deg:1,rad:1,turn:1},Vr={grid:1,flex:1},Hr=function e(t,n,r,i){var a=parseFloat(r)||0,o=(r+``).trim().substr((a+``).length)||`px`,s=Xn.style,c=or.test(n),l=t.tagName.toLowerCase()===`svg`,u=(l?`client`:`offset`)+(c?`Width`:`Height`),d=100,f=i===`px`,p=i===`%`,m,h,g,_;if(i===o||!a||Br[i]||Br[o])return a;if(o!==`px`&&!f&&(a=e(t,n,r,`px`)),_=t.getCTM&&Lr(t),(p||o===`%`)&&(er[n]||~n.indexOf(`adius`)))return m=_?t.getBBox()[c?`width`:`height`]:t[u],W(p?a/m*d:a/100*m);if(s[c?`width`:`height`]=d+(f?o:i),h=i!==`rem`&&~n.indexOf(`adius`)||i===`em`&&t.appendChild&&!l?t:t.parentNode,_&&(h=(t.ownerSVGElement||{}).parentNode),h&&h!==qn&&h.appendChild||(h=qn.body),g=h._gsap,g&&p&&g.width&&c&&g.time===Bt.time&&!g.uncache)return W(a/g.width*d);if(p&&(n===`height`||n===`width`)){var v=t.style[n];t.style[n]=d+i,m=t[u],v?t.style[n]=v:Rr(t,n)}else(p||o===`%`)&&!Vr[Ar(h,`display`)]&&(s.position=Ar(t,`position`)),h===t&&(s.position=`static`),h.appendChild(Xn),m=Xn[u],h.removeChild(Xn),s.position=`absolute`;return c&&p&&(g=H(h),g.time=Bt.time,g.width=h[u]),W(f?m*a/d:m&&a?d/m*a:0)},Ur=function(e,t,n,r){var i;return Yn||Nr(),t in cr&&t!==`transform`&&(t=cr[t],~t.indexOf(`,`)&&(t=t.split(`,`)[0])),er[t]&&t!==`transform`?(i=ti(e,r),i=t===`transformOrigin`?i.svg?i.origin:ni(Ar(e,Cr))+` `+i.zOrigin+`px`:i[t]):(i=e.style[t],(!i||i===`auto`||r||~(i+``).indexOf(`calc(`))&&(i=Jr[t]&&Jr[t](e,t,n)||Ar(e,t)||_e(e,t)||+(t===`opacity`))),n&&!~(i+``).trim().indexOf(` `)?Hr(e,t,i,n)+n:i},Wr=function(e,t,r,i){if(!r||r===`none`){var a=Mr(t,e,1),o=a&&Ar(e,a,1);o&&o!==r?(t=a,r=o):t===`borderColor`&&(r=Ar(e,`borderTopColor`))}var s=new jn(this._pt,e.style,t,0,1,Tn),c=0,l=0,u,d,f,p,m,h,g,_,v,y,b,x;if(s.b=r,s.e=i,r+=``,i+=``,i.substring(0,6)===`var(--`&&(i=Ar(e,i.substring(4,i.indexOf(`)`)))),i===`auto`&&(h=e.style[t],e.style[t]=i,i=Ar(e,t)||i,h?e.style[t]=h:Rr(e,t)),u=[r,i],Rt(u),r=u[0],i=u[1],f=r.match(k)||[],x=i.match(k)||[],x.length){for(;d=k.exec(i);)g=d[0],v=i.substring(c,d.index),m?m=(m+1)%5:(v.substr(-5)===`rgba(`||v.substr(-5)===`hsla(`)&&(m=1),g!==(h=f[l++]||``)&&(p=parseFloat(h)||0,b=h.substr((p+``).length),g.charAt(1)===`=`&&(g=ve(p,g)+b),_=parseFloat(g),y=g.substr((_+``).length),c=k.lastIndex-y.length,y||(y=y||n.units[t]||b,c===i.length&&(i+=y,s.e+=y)),b!==y&&(p=Hr(e,t,h,y)||0),s._pt={_next:s._pt,p:v||l===1?v:`,`,s:p,c:_-p,m:m&&m<4||t===`zIndex`?Math.round:0});s.c=c<i.length?i.substring(c,i.length):``}else s.r=t===`display`&&i===`none`?hr:mr;return j.test(i)&&(s.e=0),this._pt=s,s},Gr={top:`0%`,bottom:`100%`,left:`0%`,right:`100%`,center:`50%`},Kr=function(e){var t=e.split(` `),n=t[0],r=t[1]||`50%`;return(n===`top`||n===`bottom`||r===`left`||r===`right`)&&(e=n,n=r,r=e),t[0]=Gr[n]||n,t[1]=Gr[r]||r,t.join(` `)},qr=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,i=t.u,a=n._gsap,o,s,c;if(i===`all`||i===!0)r.cssText=``,s=1;else for(i=i.split(`,`),c=i.length;--c>-1;)o=i[c],er[o]&&(s=1,o=o===`transformOrigin`?Cr:Sr),Rr(n,o);s&&(Rr(n,Sr),a&&(a.svg&&n.removeAttribute(`transform`),r.scale=r.rotate=r.translate=`none`,ti(n,1),a.uncache=1,Tr(r)))}},Jr={clearProps:function(e,t,n,r,i){if(i.data!==`isFromStart`){var a=e._pt=new jn(e._pt,t,n,0,0,qr);return a.u=r,a.pr=-10,a.tween=i,e._props.push(n),1}}},Yr=[1,0,0,1,0,0],Xr={},Zr=function(e){return e===`matrix(1, 0, 0, 1, 0, 0)`||e===`none`||!e},Qr=function(e){var t=Ar(e,Sr);return Zr(t)?Yr:t.substr(7).match(O).map(W)},$r=function(e,t){var n=e._gsap||H(e),r=e.style,i=Qr(e),a,o,s,c;return n.svg&&e.getAttribute(`transform`)?(s=e.transform.baseVal.consolidate().matrix,i=[s.a,s.b,s.c,s.d,s.e,s.f],i.join(`,`)===`1,0,0,1,0,0`?Yr:i):(i===Yr&&!e.offsetParent&&e!==Jn&&!n.svg&&(s=r.display,r.display=`block`,a=e.parentNode,a&&(e.offsetParent||e.getBoundingClientRect().width)||(c=1,o=e.nextElementSibling,Jn.appendChild(e)),i=Qr(e),s?r.display=s:Rr(e,`display`),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):Jn.removeChild(e))),t&&i.length>6?[i[0],i[1],i[4],i[5],i[12],i[13]]:i)},ei=function(e,t,n,r,i,a){var o=e._gsap,s=i||$r(e,!0),c=o.xOrigin||0,l=o.yOrigin||0,u=o.xOffset||0,d=o.yOffset||0,f=s[0],p=s[1],m=s[2],h=s[3],g=s[4],_=s[5],v=t.split(` `),y=parseFloat(v[0])||0,b=parseFloat(v[1])||0,x,S,C,w;n?s!==Yr&&(S=f*h-p*m)&&(C=h/S*y+b*(-m/S)+(m*_-h*g)/S,w=y*(-p/S)+f/S*b-(f*_-p*g)/S,y=C,b=w):(x=Ir(e),y=x.x+(~v[0].indexOf(`%`)?y/100*x.width:y),b=x.y+(~(v[1]||v[0]).indexOf(`%`)?b/100*x.height:b)),r||r!==!1&&o.smooth?(g=y-c,_=b-l,o.xOffset=u+(g*f+_*m)-g,o.yOffset=d+(g*p+_*h)-_):o.xOffset=o.yOffset=0,o.xOrigin=y,o.yOrigin=b,o.smooth=!!r,o.origin=t,o.originIsAbsolute=!!n,e.style[Cr]=`0px 0px`,a&&(zr(a,o,`xOrigin`,c,y),zr(a,o,`yOrigin`,l,b),zr(a,o,`xOffset`,u,o.xOffset),zr(a,o,`yOffset`,d,o.yOffset)),e.setAttribute(`data-svg-origin`,y+` `+b)},ti=function(e,t){var r=e._gsap||new en(e);if(`x`in r&&!t&&!r.uncache)return r;var i=e.style,a=r.scaleX<0,o=`px`,s=`deg`,c=getComputedStyle(e),l=Ar(e,Cr)||`0`,u=d=f=h=g=_=v=y=b=0,d,f,p=m=1,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,ee,L,te,ne,R;return r.svg=!!(e.getCTM&&Lr(e)),c.translate&&((c.translate!==`none`||c.scale!==`none`||c.rotate!==`none`)&&(i[Sr]=(c.translate===`none`?``:`translate3d(`+(c.translate+` 0 0`).split(` `).slice(0,3).join(`, `)+`) `)+(c.rotate===`none`?``:`rotate(`+c.rotate+`) `)+(c.scale===`none`?``:`scale(`+c.scale.split(` `).join(`,`)+`) `)+(c[Sr]===`none`?``:c[Sr])),i.scale=i.rotate=i.translate=`none`),C=$r(e,r.svg),r.svg&&(r.uncache?(P=e.getBBox(),l=r.xOrigin-P.x+`px `+(r.yOrigin-P.y)+`px`,N=``):N=!t&&e.getAttribute(`data-svg-origin`),ei(e,N||l,!!N||r.originIsAbsolute,r.smooth!==!1,C)),x=r.xOrigin||0,S=r.yOrigin||0,C!==Yr&&(D=C[0],O=C[1],k=C[2],A=C[3],u=j=C[4],d=M=C[5],C.length===6?(p=Math.sqrt(D*D+O*O),m=Math.sqrt(A*A+k*k),h=D||O?rr(O,D)*tr:0,v=k||A?rr(k,A)*tr+h:0,v&&(m*=Math.abs(Math.cos(v*nr))),r.svg&&(u-=x-(x*D+S*k),d-=S-(x*O+S*A))):(R=C[6],te=C[7],I=C[8],ee=C[9],L=C[10],ne=C[11],u=C[12],d=C[13],f=C[14],w=rr(R,L),g=w*tr,w&&(T=Math.cos(-w),E=Math.sin(-w),N=j*T+I*E,P=M*T+ee*E,F=R*T+L*E,I=j*-E+I*T,ee=M*-E+ee*T,L=R*-E+L*T,ne=te*-E+ne*T,j=N,M=P,R=F),w=rr(-k,L),_=w*tr,w&&(T=Math.cos(-w),E=Math.sin(-w),N=D*T-I*E,P=O*T-ee*E,F=k*T-L*E,ne=A*E+ne*T,D=N,O=P,k=F),w=rr(O,D),h=w*tr,w&&(T=Math.cos(w),E=Math.sin(w),N=D*T+O*E,P=j*T+M*E,O=O*T-D*E,M=M*T-j*E,D=N,j=P),g&&Math.abs(g)+Math.abs(h)>359.9&&(g=h=0,_=180-_),p=W(Math.sqrt(D*D+O*O+k*k)),m=W(Math.sqrt(M*M+R*R)),w=rr(j,M),v=Math.abs(w)>2e-4?w*tr:0,b=ne?1/(ne<0?-ne:ne):0),r.svg&&(N=e.getAttribute(`transform`),r.forceCSS=e.setAttribute(`transform`,``)||!Zr(Ar(e,Sr)),N&&e.setAttribute(`transform`,N))),Math.abs(v)>90&&Math.abs(v)<270&&(a?(p*=-1,v+=h<=0?180:-180,h+=h<=0?180:-180):(m*=-1,v+=v<=0?180:-180)),t||=r.uncache,r.x=u-((r.xPercent=u&&(!t&&r.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*r.xPercent/100:0)+o,r.y=d-((r.yPercent=d&&(!t&&r.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*r.yPercent/100:0)+o,r.z=f+o,r.scaleX=W(p),r.scaleY=W(m),r.rotation=W(h)+s,r.rotationX=W(g)+s,r.rotationY=W(_)+s,r.skewX=v+s,r.skewY=y+s,r.transformPerspective=b+o,(r.zOrigin=parseFloat(l.split(` `)[2])||!t&&r.zOrigin||0)&&(i[Cr]=ni(l)),r.xOffset=r.yOffset=0,r.force3D=n.force3D,r.renderTransform=r.svg?li:Or?ci:ii,r.uncache=0,r},ni=function(e){return(e=e.split(` `))[0]+` `+e[1]},ri=function(e,t,n){var r=rt(t);return W(parseFloat(t)+parseFloat(Hr(e,`x`,n+`px`,r)))+r},ii=function(e,t){t.z=`0px`,t.rotationY=t.rotationX=`0deg`,t.force3D=0,ci(e,t)},ai=`0deg`,oi=`0px`,si=`) `,ci=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.z,c=n.rotation,l=n.rotationY,u=n.rotationX,d=n.skewX,f=n.skewY,p=n.scaleX,m=n.scaleY,h=n.transformPerspective,g=n.force3D,_=n.target,v=n.zOrigin,y=``,b=g===`auto`&&e&&e!==1||g===!0;if(v&&(u!==ai||l!==ai)){var x=parseFloat(l)*nr,S=Math.sin(x),C=Math.cos(x),w;x=parseFloat(u)*nr,w=Math.cos(x),a=ri(_,a,S*w*-v),o=ri(_,o,-Math.sin(x)*-v),s=ri(_,s,C*w*-v+v)}h!==oi&&(y+=`perspective(`+h+si),(r||i)&&(y+=`translate(`+r+`%, `+i+`%) `),(b||a!==oi||o!==oi||s!==oi)&&(y+=s!==oi||b?`translate3d(`+a+`, `+o+`, `+s+`) `:`translate(`+a+`, `+o+si),c!==ai&&(y+=`rotate(`+c+si),l!==ai&&(y+=`rotateY(`+l+si),u!==ai&&(y+=`rotateX(`+u+si),(d!==ai||f!==ai)&&(y+=`skew(`+d+`, `+f+si),(p!==1||m!==1)&&(y+=`scale(`+p+`, `+m+si),_.style[Sr]=y||`translate(0, 0)`},li=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.rotation,c=n.skewX,l=n.skewY,u=n.scaleX,d=n.scaleY,f=n.target,p=n.xOrigin,m=n.yOrigin,h=n.xOffset,g=n.yOffset,_=n.forceCSS,v=parseFloat(a),y=parseFloat(o),b,x,S,C,w;s=parseFloat(s),c=parseFloat(c),l=parseFloat(l),l&&(l=parseFloat(l),c+=l,s+=l),s||c?(s*=nr,c*=nr,b=Math.cos(s)*u,x=Math.sin(s)*u,S=Math.sin(s-c)*-d,C=Math.cos(s-c)*d,c&&(l*=nr,w=Math.tan(c-l),w=Math.sqrt(1+w*w),S*=w,C*=w,l&&(w=Math.tan(l),w=Math.sqrt(1+w*w),b*=w,x*=w)),b=W(b),x=W(x),S=W(S),C=W(C)):(b=u,C=d,x=S=0),(v&&!~(a+``).indexOf(`px`)||y&&!~(o+``).indexOf(`px`))&&(v=Hr(f,`x`,a,`px`),y=Hr(f,`y`,o,`px`)),(p||m||h||g)&&(v=W(v+p-(p*b+m*S)+h),y=W(y+m-(p*x+m*C)+g)),(r||i)&&(w=f.getBBox(),v=W(v+r/100*w.width),y=W(y+i/100*w.height)),w=`matrix(`+b+`,`+x+`,`+S+`,`+C+`,`+v+`,`+y+`)`,f.setAttribute(`transform`,w),_&&(f.style[Sr]=w)},ui=function(e,t,n,r,i){var a=360,o=h(i),s=parseFloat(i)*(o&&~i.indexOf(`rad`)?tr:1)-r,c=r+s+`deg`,l,u;return o&&(l=i.split(`_`)[1],l===`short`&&(s%=a,s!==s%(a/2)&&(s+=s<0?a:-a)),l===`cw`&&s<0?s=(s+a*ir)%a-~~(s/a)*a:l===`ccw`&&s>0&&(s=(s-a*ir)%a-~~(s/a)*a)),e._pt=u=new jn(e._pt,t,n,r,s,ur),u.e=c,u.u=`deg`,e._props.push(n),u},di=function(e,t){for(var n in t)e[n]=t[n];return e},fi=function(e,t,n){var r=di({},n._gsap),i=`perspective,force3D,transformOrigin,svgOrigin`,a=n.style,o,s,c,l,u,d,f,p;for(s in r.svg?(c=n.getAttribute(`transform`),n.setAttribute(`transform`,``),a[Sr]=t,o=ti(n,1),Rr(n,Sr),n.setAttribute(`transform`,c)):(c=getComputedStyle(n)[Sr],a[Sr]=t,o=ti(n,1),a[Sr]=c),er)c=r[s],l=o[s],c!==l&&i.indexOf(s)<0&&(f=rt(c),p=rt(l),u=f===p?parseFloat(c):Hr(n,s,c,p),d=parseFloat(l),e._pt=new jn(e._pt,o,s,u,d-u,lr),e._pt.u=p||0,e._props.push(s));di(o,r)};U(`padding,margin,Width,Radius`,function(e,t){var n=`Top`,r=`Right`,i=`Bottom`,a=`Left`,o=(t<3?[n,r,i,a]:[n+a,n+r,i+r,i+a]).map(function(n){return t<2?e+n:`border`+n+e});Jr[t>1?`border`+e:e]=function(e,t,n,r,i){var a,s;if(arguments.length<4)return a=o.map(function(t){return Ur(e,t,n)}),s=a.join(` `),s.split(a[0]).length===5?a[0]:s;a=(r+``).split(` `),s={},o.forEach(function(e,t){return s[e]=a[t]=a[t]||a[(t-1)/2|0]}),e.init(t,s,i)}});var pi={name:`css`,register:Nr,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,r,i,a){var o=this._props,s=e.style,c=r.vars.startAt,l,u,d,f,p,m,g,_,v,y,b,x,S,C,w,T,E;for(g in Yn||Nr(),this.styles=this.styles||Dr(e),T=this.styles.props,this.tween=r,t)if(g!==`autoRound`&&(u=t[g],!(de[g]&&sn(g,t,r,i,e,a)))){if(p=typeof u,m=Jr[g],p===`function`&&(u=u.call(r,i,e,a),p=typeof u),p===`string`&&~u.indexOf(`random(`)&&(u=xt(u)),m)m(this,e,g,u,r)&&(w=1);else if(g.substr(0,2)===`--`)l=(getComputedStyle(e).getPropertyValue(g)+``).trim(),u+=``,It.lastIndex=0,It.test(l)||(_=rt(l),v=rt(u),v?_!==v&&(l=Hr(e,g,l,v)+v):_&&(u+=_)),this.add(s,`setProperty`,l,u,i,a,0,0,g),o.push(g),T.push(g,0,s[g]);else if(p!==`undefined`){if(c&&g in c?(l=typeof c[g]==`function`?c[g].call(r,i,e,a):c[g],h(l)&&~l.indexOf(`random(`)&&(l=xt(l)),rt(l+``)||l===`auto`||(l+=n.units[g]||rt(Ur(e,g))||``),(l+``).charAt(1)===`=`&&(l=Ur(e,g))):l=Ur(e,g),f=parseFloat(l),y=p===`string`&&u.charAt(1)===`=`&&u.substr(0,2),y&&(u=u.substr(2)),d=parseFloat(u),g in cr&&(g===`autoAlpha`&&(f===1&&Ur(e,`visibility`)===`hidden`&&d&&(f=0),T.push(`visibility`,0,s.visibility),zr(this,s,`visibility`,f?`inherit`:`hidden`,d?`inherit`:`hidden`,!d)),g!==`scale`&&g!==`transform`&&(g=cr[g],~g.indexOf(`,`)&&(g=g.split(`,`)[0]))),b=g in er,b){if(this.styles.save(g),E=u,p===`string`&&u.substring(0,6)===`var(--`){if(u=Ar(e,u.substring(4,u.indexOf(`)`))),u.substring(0,5)===`calc(`){var D=e.style.perspective;e.style.perspective=u,u=Ar(e,`perspective`),D?e.style.perspective=D:Rr(e,`perspective`)}d=parseFloat(u)}if(x||(S=e._gsap,S.renderTransform&&!t.parseTransform||ti(e,t.parseTransform),C=t.smoothOrigin!==!1&&S.smooth,x=this._pt=new jn(this._pt,s,Sr,0,1,S.renderTransform,S,0,-1),x.dep=1),g===`scale`)this._pt=new jn(this._pt,S,`scaleY`,S.scaleY,(y?ve(S.scaleY,y+d):d)-S.scaleY||0,lr),this._pt.u=0,o.push(`scaleY`,g),g+=`X`;else if(g===`transformOrigin`){T.push(Cr,0,s[Cr]),u=Kr(u),S.svg?ei(e,u,0,C,0,this):(v=parseFloat(u.split(` `)[2])||0,v!==S.zOrigin&&zr(this,S,`zOrigin`,S.zOrigin,v),zr(this,s,g,ni(l),ni(u)));continue}else if(g===`svgOrigin`){ei(e,u,1,C,0,this);continue}else if(g in Xr){ui(this,S,g,f,y?ve(f,y+u):u);continue}else if(g===`smoothOrigin`){zr(this,S,`smooth`,S.smooth,u);continue}else if(g===`force3D`){S[g]=u;continue}else if(g===`transform`){fi(this,u,e);continue}}else g in s||(g=Mr(g)||g);if(b||(d||d===0)&&(f||f===0)&&!sr.test(u)&&g in s)_=(l+``).substr((f+``).length),d||=0,v=rt(u)||(g in n.units?n.units[g]:_),_!==v&&(f=Hr(e,g,l,v)),this._pt=new jn(this._pt,b?S:s,g,f,(y?ve(f,y+d):d)-f,!b&&(v===`px`||g===`zIndex`)&&t.autoRound!==!1?pr:lr),this._pt.u=v||0,b&&E!==u?(this._pt.b=l,this._pt.e=E,this._pt.r=fr):_!==v&&v!==`%`&&(this._pt.b=l,this._pt.r=dr);else if(g in s)Wr.call(this,e,g,l,y?y+u:u);else if(g in e)this.add(e,g,l||e[g],y?y+u:u,i,a);else if(g!==`parseTransform`){re(g,u);continue}b||(g in s?T.push(g,0,s[g]):typeof e[g]==`function`?T.push(g,2,e[g]()):T.push(g,1,l||e[g])),o.push(g)}}w&&An(this)},render:function(e,t){if(t.tween._time||!Qn())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Ur,aliases:cr,getSetter:function(e,t,n){var r=cr[t];return r&&r.indexOf(`,`)<0&&(t=r),t in er&&t!==Cr&&(e._gsap.x||Ur(e,`x`))?n&&Zn===n?t===`scale`?yr:vr:(Zn=n||{})&&(t===`scale`?br:xr):e.style&&!v(e.style[t])?gr:~t.indexOf(`-`)?_r:Sn(e,t)},core:{_removeProperty:Rr,_getMatrix:$r}};Gn.utils.checkPrefix=Mr,Gn.core.getStyleSaver=Dr,(function(e,t,r,i){var a=U(e+`,`+t+`,`+r,function(e){er[e]=1});U(t,function(e){n.units[e]=`deg`,Xr[e]=1}),cr[a[13]]=e+`,`+t,U(i,function(e){var t=e.split(`:`);cr[t[1]]=a[t[0]]})})(`x,y,z,scale,scaleX,scaleY,xPercent,yPercent`,`rotation,rotationX,rotationY,skewX,skewY`,`transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective`,`0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY`),U(`x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective`,function(e){n.units[e]=`px`}),Gn.registerPlugin(pi);var mi=Gn.registerPlugin(pi)||Gn;mi.core.Tween;var hi=1e3,gi=1001,_i=1002,vi=1003,yi=1004,bi=1005,xi=1006,Si=1007,Ci=1008,wi=1009,Ti=1010,Ei=1011,Di=1012,Oi=1013,ki=1014,Ai=1015,ji=1016,Mi=1017,Ni=1018,Pi=1020,Fi=35902,Ii=35899,Li=1021,Ri=1022,zi=1023,Bi=1026,Vi=1027,Hi=1028,Ui=1029,Wi=1030,Gi=1031,Ki=1033,qi=33776,Ji=33777,Yi=33778,Xi=33779,Zi=35840,Qi=35841,$i=35842,ea=35843,ta=36196,na=37492,ra=37496,ia=37488,aa=37489,oa=37490,sa=37491,ca=37808,la=37809,ua=37810,da=37811,fa=37812,pa=37813,ma=37814,ha=37815,ga=37816,_a=37817,va=37818,ya=37819,ba=37820,xa=37821,Sa=36492,Ca=36494,wa=36495,Ta=36283,Ea=36284,Da=36285,Oa=36286,ka=2300,Aa=2301,ja=2302,Ma=2303,Na=2400,Pa=2401,Fa=2402,Ia=3200,La=`srgb`,Ra=`srgb-linear`,za=`linear`,Ba=`srgb`,Va=7680,Ha=35044,Ua=35048,Wa=`300 es`,Ga=2e3;function Ka(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function qa(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Ja(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Ya(){let e=Ja(`canvas`);return e.style.display=`block`,e}var Xa={};function Za(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Qa(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function J(...e){e=Qa(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function $a(...e){e=Qa(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function eo(...e){let t=e.join(` `);t in Xa||(Xa[t]=!0,J(...e))}function to(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var no={0:0,2:6,4:4,3:5,1:1,6:2,7:7,5:3},ro=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},io=/* @__PURE__ */ `00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),ao=Math.PI/180,oo=180/Math.PI;function so(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(io[e&255]+io[e>>8&255]+io[e>>16&255]+io[e>>24&255]+`-`+io[t&255]+io[t>>8&255]+`-`+io[t>>16&15|64]+io[t>>24&255]+`-`+io[n&63|128]+io[n>>8&255]+`-`+io[n>>16&255]+io[n>>24&255]+io[r&255]+io[r>>8&255]+io[r>>16&255]+io[r>>24&255]).toLowerCase()}function co(e,t,n){return Math.max(t,Math.min(n,e))}function lo(e,t){return(e%t+t)%t}function uo(e,t,n){return(1-n)*e+n*t}function fo(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function po(e){switch(e.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function mo(e,t){if(t.constructor===Float32Array)return e;let n=po(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.max(e/n,-1)}function ho(e,t){if(t.constructor===Float32Array)return e;let n=po(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.round(e*n)}var go=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=co(this.x,e.x,t.x),this.y=co(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=co(this.x,e,t),this.y=co(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(co(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(co(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},_o=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:J(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(co(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Y=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(yo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(yo.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=co(this.x,e.x,t.x),this.y=co(this.y,e.y,t.y),this.z=co(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=co(this.x,e,t),this.y=co(this.y,e,t),this.z=co(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(co(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return vo.copy(this).projectOnVector(e),this.sub(vo)}reflect(e){return this.sub(vo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(co(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},vo=/*@__PURE__*/ new Y,yo=/*@__PURE__*/ new _o,bo=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return eo(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(xo.makeScale(e,t)),this}rotate(e){return eo(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(xo.makeRotation(-e)),this}translate(e,t){return eo(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(xo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},xo=/*@__PURE__*/ new bo,So=/*@__PURE__*/ new bo().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Co=/*@__PURE__*/ new bo().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function wo(){let e={enabled:!0,workingColorSpace:Ra,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Eo(e.r),e.g=Eo(e.g),e.b=Eo(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Do(e.r),e.g=Do(e.g),e.b=Do(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?za:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Ra]:{primaries:t,whitePoint:r,transfer:za,toXYZ:So,fromXYZ:Co,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:La},outputColorSpaceConfig:{drawingBufferColorSpace:La}},[La]:{primaries:t,whitePoint:r,transfer:Ba,toXYZ:So,fromXYZ:Co,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:La}}}),e}var To=/*@__PURE__*/ wo();function Eo(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Do(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Oo,ko=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Oo===void 0&&(Oo=Ja(`canvas`)),Oo.width=e.width,Oo.height=e.height;let t=Oo.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Oo}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Ja(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Eo(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Eo(t[e]/255)*255):t[e]=Eo(t[e]);return{data:t,width:e.width,height:e.height}}return J(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Ao=0,jo=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Ao++}),this.uuid=so(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width||0,t.height||0,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Mo(r[t].image)):e.push(Mo(r[t]))}else e=Mo(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Mo(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?ko.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(J(`Texture: Unable to serialize Texture.`),{})}var No=0,Po=/*@__PURE__*/ new Y,Fo=class e extends ro{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=gi,i=gi,a=xi,o=Ci,s=zi,c=wi,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:No++}),this.uuid=so(),this.name=``,this.source=new jo(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new go(0,0),this.repeat=new go(1,1),this.center=new go(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new bo,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Po).x}get height(){return this.source.getSize(Po).y}get depth(){return this.source.getSize(Po).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){J(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?J(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case hi:e.x-=Math.floor(e.x);break;case gi:e.x=e.x<0?0:1;break;case _i:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case hi:e.y-=Math.floor(e.y);break;case gi:e.y=e.y<0?0:1;break;case _i:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Fo.DEFAULT_IMAGE=null,Fo.DEFAULT_MAPPING=300,Fo.DEFAULT_ANISOTROPY=1;var Io=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=co(this.x,e.x,t.x),this.y=co(this.y,e.y,t.y),this.z=co(this.z,e.z,t.z),this.w=co(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=co(this.x,e,t),this.y=co(this.y,e,t),this.z=co(this.z,e,t),this.w=co(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(co(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Lo=class extends ro{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xi,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Io(0,0,e,t),this.scissorTest=!1,this.viewport=new Io(0,0,e,t),this.textures=[];let r=n.count;for(let i=0;i<r;i++)this.textures[i]=new Fo({width:e,height:t,depth:n.depth}),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:xi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new jo(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Ro=class extends Lo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},zo=class extends Fo{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=vi,this.minFilter=vi,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=/* @__PURE__ */ new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Bo=class extends Fo{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=vi,this.minFilter=vi,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},Vo=class e{static{this.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Ho.setFromMatrixColumn(e,0).length(),i=1/Ho.setFromMatrixColumn(e,1).length(),a=1/Ho.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Wo,e,Go)}lookAt(e,t,n){let r=this.elements;return Jo.subVectors(e,t),Jo.lengthSq()===0&&(Jo.z=1),Jo.normalize(),Ko.crossVectors(n,Jo),Ko.lengthSq()===0&&(Math.abs(n.z)===1?Jo.x+=1e-4:Jo.z+=1e-4,Jo.normalize(),Ko.crossVectors(n,Jo)),Ko.normalize(),qo.crossVectors(Jo,Ko),r[0]=Ko.x,r[4]=qo.x,r[8]=Jo.x,r[1]=Ko.y,r[5]=qo.y,r[9]=Jo.y,r[2]=Ko.z,r[6]=qo.z,r[10]=Jo.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],F=r[11],I=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*F,i[12]=a*w+o*O+s*M+c*I,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*F,i[13]=l*w+u*O+d*M+f*I,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*F,i[14]=p*w+m*O+h*M+g*I,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*F,i[15]=_*w+v*O+y*M+b*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Ho.set(r[0],r[1],r[2]).length(),o=Ho.set(r[4],r[5],r[6]).length(),s=Ho.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Uo.copy(this);let c=1/a,l=1/o,u=1/s;return Uo.elements[0]*=c,Uo.elements[1]*=c,Uo.elements[2]*=c,Uo.elements[4]*=l,Uo.elements[5]*=l,Uo.elements[6]*=l,Uo.elements[8]*=u,Uo.elements[9]*=u,Uo.elements[10]*=u,t.setFromRotationMatrix(Uo),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Ga,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Ga,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ho=/*@__PURE__*/ new Y,Uo=/*@__PURE__*/ new Vo,Wo=/*@__PURE__*/ new Y(0,0,0),Go=/*@__PURE__*/ new Y(1,1,1),Ko=/*@__PURE__*/ new Y,qo=/*@__PURE__*/ new Y,Jo=/*@__PURE__*/ new Y,Yo=/*@__PURE__*/ new Vo,Xo=/*@__PURE__*/ new _o,Zo=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(co(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-co(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(co(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-co(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(co(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-co(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:J(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Yo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Xo.setFromEuler(this),this.setFromQuaternion(Xo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Zo.DEFAULT_ORDER=`XYZ`;var Qo=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},$o=0,es=/*@__PURE__*/ new Y,ts=/*@__PURE__*/ new _o,ns=/*@__PURE__*/ new Vo,rs=/*@__PURE__*/ new Y,is=/*@__PURE__*/ new Y,as=/*@__PURE__*/ new Y,os=/*@__PURE__*/ new _o,ss=/*@__PURE__*/ new Y(1,0,0),cs=/*@__PURE__*/ new Y(0,1,0),ls=/*@__PURE__*/ new Y(0,0,1),us={type:`added`},ds={type:`removed`},fs={type:`childadded`,child:null},ps={type:`childremoved`,child:null},ms=class e extends ro{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$o++}),this.uuid=so(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new Y,n=new Zo,r=new _o,i=new Y(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Vo},normalMatrix:{value:new bo}}),this.matrix=new Vo,this.matrixWorld=new Vo,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ts.setFromAxisAngle(e,t),this.quaternion.multiply(ts),this}rotateOnWorldAxis(e,t){return ts.setFromAxisAngle(e,t),this.quaternion.premultiply(ts),this}rotateX(e){return this.rotateOnAxis(ss,e)}rotateY(e){return this.rotateOnAxis(cs,e)}rotateZ(e){return this.rotateOnAxis(ls,e)}translateOnAxis(e,t){return es.copy(e).applyQuaternion(this.quaternion),this.position.add(es.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ss,e)}translateY(e){return this.translateOnAxis(cs,e)}translateZ(e){return this.translateOnAxis(ls,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ns.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?rs.copy(e):rs.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),is.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ns.lookAt(is,rs,this.up):ns.lookAt(rs,is,this.up),this.quaternion.setFromRotationMatrix(ns),r&&(ns.extractRotation(r.matrixWorld),ts.setFromRotationMatrix(ns),this.quaternion.premultiply(ts.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?($a(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(us),fs.child=e,this.dispatchEvent(fs),fs.child=null):$a(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ds),ps.child=e,this.dispatchEvent(ps),ps.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ns.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ns.multiply(e.parent.matrixWorld)),e.applyMatrix4(ns),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(us),fs.child=e,this.dispatchEvent(fs),fs.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(is,e,as),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(is,os,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};ms.DEFAULT_UP=/*@__PURE__*/ new Y(0,1,0),ms.DEFAULT_MATRIX_AUTO_UPDATE=!0,ms.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var hs=class extends ms{constructor(){super(),this.isGroup=!0,this.type=`Group`}},gs={type:`move`},_s=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new hs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new hs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new hs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.quaternion,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.quaternion,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(gs)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new hs;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},vs={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ys={h:0,s:0,l:0},bs={h:0,s:0,l:0};function xs(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Ss=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=La){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,To.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=To.workingColorSpace){return this.r=e,this.g=t,this.b=n,To.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=To.workingColorSpace){if(e=lo(e,1),t=co(t,0,1),n=co(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=xs(i,r,e+1/3),this.g=xs(i,r,e),this.b=xs(i,r,e-1/3)}return To.colorSpaceToWorking(this,r),this}setStyle(e,t=La){function n(t){t!==void 0&&parseFloat(t)<1&&J(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseFloat(i[1]))/100,Math.min(100,parseFloat(i[2]))/100,Math.min(100,parseFloat(i[3]))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:J(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);J(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=La){let n=vs[e.toLowerCase()];return n===void 0?J(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Eo(e.r),this.g=Eo(e.g),this.b=Eo(e.b),this}copyLinearToSRGB(e){return this.r=Do(e.r),this.g=Do(e.g),this.b=Do(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=La){return To.workingToColorSpace(Cs.copy(this),e),Math.round(co(Cs.r*255,0,255))*65536+Math.round(co(Cs.g*255,0,255))*256+Math.round(co(Cs.b*255,0,255))}getHexString(e=La){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=To.workingColorSpace){To.workingToColorSpace(Cs.copy(this),t);let n=Cs.r,r=Cs.g,i=Cs.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=To.workingColorSpace){return To.workingToColorSpace(Cs.copy(this),t),e.r=Cs.r,e.g=Cs.g,e.b=Cs.b,e}getStyle(e=La){To.workingToColorSpace(Cs.copy(this),e);let t=Cs.r,n=Cs.g,r=Cs.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(ys),this.setHSL(ys.h+e,ys.s+t,ys.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ys),e.getHSL(bs);let n=uo(ys.h,bs.h,t),r=uo(ys.s,bs.s,t),i=uo(ys.l,bs.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Cs=/*@__PURE__*/ new Ss;Ss.NAMES=vs;var ws=class extends ms{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Zo,this.environmentIntensity=1,this.environmentRotation=new Zo,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background===null?null:e.background.clone(),this.environment=e.environment===null?null:e.environment.clone(),this.fog=e.fog===null?null:e.fog.clone(),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial===null?null:e.overrideMaterial.clone(),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ts=/*@__PURE__*/ new Y,Es=/*@__PURE__*/ new Y,Ds=/*@__PURE__*/ new Y,Os=/*@__PURE__*/ new Y,ks=/*@__PURE__*/ new Y,As=/*@__PURE__*/ new Y,js=/*@__PURE__*/ new Y,Ms=/*@__PURE__*/ new Y,Ns=/*@__PURE__*/ new Y,Ps=/*@__PURE__*/ new Y,Fs=/*@__PURE__*/ new Io,Is=/*@__PURE__*/ new Io,Ls=/*@__PURE__*/ new Io,Rs=class e{constructor(e=new Y,t=new Y,n=new Y){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Ts.subVectors(e,t),r.cross(Ts);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Ts.subVectors(r,t),Es.subVectors(n,t),Ds.subVectors(e,t);let a=Ts.dot(Ts),o=Ts.dot(Es),s=Ts.dot(Ds),c=Es.dot(Es),l=Es.dot(Ds),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Os)!==null&&Os.x>=0&&Os.y>=0&&Os.x+Os.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Os)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Os.x),s.addScaledVector(a,Os.y),s.addScaledVector(o,Os.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Fs.setScalar(0),Is.setScalar(0),Ls.setScalar(0),Fs.fromBufferAttribute(e,t),Is.fromBufferAttribute(e,n),Ls.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Fs,i.x),a.addScaledVector(Is,i.y),a.addScaledVector(Ls,i.z),a}static isFrontFacing(e,t,n,r){return Ts.subVectors(n,t),Es.subVectors(e,t),Ts.cross(Es).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ts.subVectors(this.c,this.b),Es.subVectors(this.a,this.b),Ts.cross(Es).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;ks.subVectors(r,n),As.subVectors(i,n),Ms.subVectors(e,n);let s=ks.dot(Ms),c=As.dot(Ms);if(s<=0&&c<=0)return t.copy(n);Ns.subVectors(e,r);let l=ks.dot(Ns),u=As.dot(Ns);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0&&s-l>0)return a=s/(s-l),t.copy(n).addScaledVector(ks,a);Ps.subVectors(e,i);let f=ks.dot(Ps),p=As.dot(Ps);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(As,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return js.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(js,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(ks,a).addScaledVector(As,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},zs=class{constructor(e=new Y(1/0,1/0,1/0),t=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Vs.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Vs.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Vs.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Vs):Vs.fromBufferAttribute(r,t),Vs.applyMatrix4(e.matrixWorld),this.expandByPoint(Vs);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Hs.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Hs.copy(e.boundingBox)),Hs.applyMatrix4(e.matrixWorld),this.union(Hs)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Vs),Vs.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ys),Xs.subVectors(this.max,Ys),Us.subVectors(e.a,Ys),Ws.subVectors(e.b,Ys),Gs.subVectors(e.c,Ys),Ks.subVectors(Ws,Us),qs.subVectors(Gs,Ws),Js.subVectors(Us,Gs);let t=[0,-Ks.z,Ks.y,0,-qs.z,qs.y,0,-Js.z,Js.y,Ks.z,0,-Ks.x,qs.z,0,-qs.x,Js.z,0,-Js.x,-Ks.y,Ks.x,0,-qs.y,qs.x,0,-Js.y,Js.x,0];return!$s(t,Us,Ws,Gs,Xs)||(t=[1,0,0,0,1,0,0,0,1],!$s(t,Us,Ws,Gs,Xs))?!1:(Zs.crossVectors(Ks,qs),t=[Zs.x,Zs.y,Zs.z],$s(t,Us,Ws,Gs,Xs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Vs).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Vs).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Bs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Bs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Bs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Bs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Bs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Bs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Bs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Bs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Bs)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Bs=[/*@__PURE__*/ new Y,/*@__PURE__*/ new Y,/*@__PURE__*/ new Y,/*@__PURE__*/ new Y,/*@__PURE__*/ new Y,/*@__PURE__*/ new Y,/*@__PURE__*/ new Y,/*@__PURE__*/ new Y],Vs=/*@__PURE__*/ new Y,Hs=/*@__PURE__*/ new zs,Us=/*@__PURE__*/ new Y,Ws=/*@__PURE__*/ new Y,Gs=/*@__PURE__*/ new Y,Ks=/*@__PURE__*/ new Y,qs=/*@__PURE__*/ new Y,Js=/*@__PURE__*/ new Y,Ys=/*@__PURE__*/ new Y,Xs=/*@__PURE__*/ new Y,Zs=/*@__PURE__*/ new Y,Qs=/*@__PURE__*/ new Y;function $s(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Qs.fromArray(e,a);let o=i.x*Math.abs(Qs.x)+i.y*Math.abs(Qs.y)+i.z*Math.abs(Qs.z),s=t.dot(Qs),c=n.dot(Qs),l=r.dot(Qs);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var ec=/*@__PURE__*/ new Y,tc=/*@__PURE__*/ new go,nc=0,rc=class extends ro{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:nc++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Ha,this.updateRanges=[],this.gpuType=Ai,this.version=0,this._normalizationScale=e===void 0?void 0:po(e)}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)tc.fromBufferAttribute(this,t),tc.applyMatrix3(e),this.setXY(t,tc.x,tc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ec.fromBufferAttribute(this,t),ec.applyMatrix3(e),this.setXYZ(t,ec.x,ec.y,ec.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ec.fromBufferAttribute(this,t),ec.applyMatrix4(e),this.setXYZ(t,ec.x,ec.y,ec.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ec.fromBufferAttribute(this,t),ec.applyNormalMatrix(e),this.setXYZ(t,ec.x,ec.y,ec.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ec.fromBufferAttribute(this,t),ec.transformDirection(e),this.setXYZ(t,ec.x,ec.y,ec.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}_denormalize(e){let t=this._normalizationScale;return t===void 0?mo(e,this.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?ho(e,this.array):Math.round(e*t)}},ic=class extends rc{constructor(e,t,n){super(new Uint16Array(e),t,n)}},ac=class extends rc{constructor(e,t,n){super(new Uint32Array(e),t,n)}},oc=class extends rc{constructor(e,t,n){super(new Float32Array(e),t,n)}},sc=/*@__PURE__*/ new zs,cc=/*@__PURE__*/ new Y,lc=/*@__PURE__*/ new Y,uc=class{constructor(e=new Y,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?sc.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;cc.subVectors(e,this.center);let t=cc.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(cc,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(lc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(cc.copy(e.center).add(lc)),this.expandByPoint(cc.copy(e.center).sub(lc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},dc=0,fc=/*@__PURE__*/ new Vo,pc=/*@__PURE__*/ new ms,mc=/*@__PURE__*/ new Y,hc=/*@__PURE__*/ new zs,gc=/*@__PURE__*/ new zs,_c=/*@__PURE__*/ new Y,vc=class e extends ro{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:dc++}),this.uuid=so(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Ka(e)?ac:ic)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new bo().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return fc.makeRotationFromQuaternion(e),this.applyMatrix4(fc),this}rotateX(e){return fc.makeRotationX(e),this.applyMatrix4(fc),this}rotateY(e){return fc.makeRotationY(e),this.applyMatrix4(fc),this}rotateZ(e){return fc.makeRotationZ(e),this.applyMatrix4(fc),this}translate(e,t,n){return fc.makeTranslation(e,t,n),this.applyMatrix4(fc),this}scale(e,t,n){return fc.makeScale(e,t,n),this.applyMatrix4(fc),this}lookAt(e){return pc.lookAt(e),pc.updateMatrix(),this.applyMatrix4(pc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(mc).negate(),this.translate(mc.x,mc.y,mc.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new oc(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&J(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zs);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)$a(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];hc.setFromBufferAttribute(n),this.morphTargetsRelative?(_c.addVectors(this.boundingBox.min,hc.min),this.boundingBox.expandByPoint(_c),_c.addVectors(this.boundingBox.max,hc.max),this.boundingBox.expandByPoint(_c)):(this.boundingBox.expandByPoint(hc.min),this.boundingBox.expandByPoint(hc.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&$a(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new uc);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)$a(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new Y,1/0);else if(e){let n=this.boundingSphere.center;if(hc.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];gc.setFromBufferAttribute(n),this.morphTargetsRelative?(_c.addVectors(hc.min,gc.min),hc.expandByPoint(_c),_c.addVectors(hc.max,gc.max),hc.expandByPoint(_c)):(hc.expandByPoint(gc.min),hc.expandByPoint(gc.max))}hc.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)_c.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(_c));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)_c.fromBufferAttribute(a,t),o&&(mc.fromBufferAttribute(e,t),_c.add(mc)),r=Math.max(r,n.distanceToSquared(_c))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&$a(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){$a(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new rc(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[],c=new Uint8Array(n.count);for(let e=0;e<n.count;e++)o[e]=new Y,s[e]=new Y;let l=new Y,u=new Y,d=new Y,f=new go,p=new go,m=new go,h=new Y,g=new Y;function _(e,t,r){c[e]=c[t]=c[r]=1,l.fromBufferAttribute(n,e),u.fromBufferAttribute(n,t),d.fromBufferAttribute(n,r),f.fromBufferAttribute(i,e),p.fromBufferAttribute(i,t),m.fromBufferAttribute(i,r),u.sub(l),d.sub(l),p.sub(f),m.sub(f);let a=1/(p.x*m.y-m.x*p.y);isFinite(a)&&(h.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(a),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(a),o[e].add(h),o[t].add(h),o[r].add(h),s[e].add(g),s[t].add(g),s[r].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let t=0,n=v.length;t<n;++t){let n=v[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)_(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let y=new Y,b=new Y,x=new Y,S=new Y;function C(e){x.fromBufferAttribute(r,e),S.copy(x);let t=o[e];y.copy(t),y.sub(x.multiplyScalar(x.dot(t))).normalize(),b.crossVectors(S,t);let n=b.dot(s[e])<0?-1:1;a.setXYZW(e,y.x,y.y,y.z,n)}for(let e=0,t=n.count;e<t;++e)c[e]&&C(e);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new rc(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new Y,i=new Y,a=new Y,o=new Y,s=new Y,c=new Y,l=new Y,u=new Y;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)_c.fromBufferAttribute(e,t),_c.normalize(),e.setXYZ(t,_c.x,_c.y,_c.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new rc(a,r,i)}if(this.index===null)return J(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},yc=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Ha,this.updateRanges=[],this.version=0,this.uuid=so()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=bc(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),r=new this.constructor(n,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=bc(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function bc(e){return e.buffer._uuid===void 0&&(e.buffer._uuid=so()),e.byteOffset===0&&e.byteLength===e.buffer.byteLength?e.buffer._uuid:e.buffer._uuid+`:`+e.byteOffset+`:`+e.byteLength}var xc=/*@__PURE__*/ new Y,Sc=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r,this._normalizationScale=e===void 0?void 0:po(e.array)}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)xc.fromBufferAttribute(this,t),xc.applyMatrix4(e),this.setXYZ(t,xc.x,xc.y,xc.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xc.fromBufferAttribute(this,t),xc.applyNormalMatrix(e),this.setXYZ(t,xc.x,xc.y,xc.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xc.fromBufferAttribute(this,t),xc.transformDirection(e),this.setXYZ(t,xc.x,xc.y,xc.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){Za(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new rc(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Za(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t===void 0?mo(e,this.data.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?ho(e,this.data.array):Math.round(e*t)}},Cc=/*@__PURE__*/ new Y,wc=/*@__PURE__*/ new Y,Tc=/*@__PURE__*/ new bo,Ec=class{constructor(e=new Y(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Cc.subVectors(n,t).cross(wc.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Cc),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Tc.getNormalMatrix(e),r=this.coplanarPoint(Cc).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Dc=0,Oc=class extends ro{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Dc++}),this.uuid=so(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ss(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Va,this.stencilZFail=Va,this.stencilZPass=Va,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){J(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?J(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ss().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Ec().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new go().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new go().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},kc=/*@__PURE__*/ new Y,Ac=/*@__PURE__*/ new Y,jc=/*@__PURE__*/ new Y,Mc=/*@__PURE__*/ new Y,Nc=class{constructor(e=new Y,t=new Y(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,kc)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=kc.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(kc.copy(this.origin).addScaledVector(this.direction,t),kc.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ac.copy(e).add(t).multiplyScalar(.5),jc.copy(t).sub(e).normalize(),Mc.copy(this.origin).sub(Ac);let i=e.distanceTo(t)*.5,a=-this.direction.dot(jc),o=Mc.dot(this.direction),s=-Mc.dot(jc),c=Mc.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Ac).addScaledVector(jc,d),f}intersectSphere(e,t){if(e.radius<0)return null;kc.subVectors(e.center,this.origin);let n=kc.dot(this.direction),r=kc.dot(kc)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,kc)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let P=S/w,F=C/w,I=1/w,ee=T-P*D,L=E-F*D,te=O-P*A,ne=k-F*A,R=j-P*N,re=M-F*N,z=R*ne-re*te,ie=ee*re-L*R,ae=te*L-ne*ee;if(r){if(z<0||ie<0||ae<0)return null}else if((z<0||ie<0||ae<0)&&(z>0||ie>0||ae>0))return null;let oe=z+ie+ae;if(oe===0)return null;let B=I*(z*D+ie*A+ae*N);return(oe>0?B<0:B>0)?null:this.at(B/oe,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Pc=class extends Oc{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new Ss(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zo,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Fc=/*@__PURE__*/ new Vo,Ic=/*@__PURE__*/ new Nc,Lc=/*@__PURE__*/ new uc,Rc=/*@__PURE__*/ new Y,zc=/*@__PURE__*/ new Y,Bc=/*@__PURE__*/ new Y,Vc=/*@__PURE__*/ new Y,Hc=/*@__PURE__*/ new Y,Uc=/*@__PURE__*/ new Y,Wc=/*@__PURE__*/ new Y,Gc=/*@__PURE__*/ new Y,Kc=class extends ms{constructor(e=new vc,t=new Pc){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Uc.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Hc.fromBufferAttribute(s,e),a?Uc.addScaledVector(Hc,r):Uc.addScaledVector(Hc.sub(t),r))}t.add(Uc)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Lc.copy(n.boundingSphere),Lc.applyMatrix4(i),Ic.copy(e.ray).recast(e.near),Lc.containsPoint(Ic.origin)===!1&&(Ic.intersectSphere(Lc,Rc)===null||Ic.origin.distanceToSquared(Rc)>(e.far-e.near)**2)||(Fc.copy(i).invert(),Ic.copy(e.ray).applyMatrix4(Fc),(n.boundingBox===null||Ic.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Ic)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Jc(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Jc(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Jc(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Jc(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function qc(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Gc.copy(s),Gc.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Gc);return l<n.near||l>n.far?null:{distance:l,point:Gc.clone(),object:e}}function Jc(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,zc),e.getVertexPosition(c,Bc),e.getVertexPosition(l,Vc);let u=qc(e,t,n,r,zc,Bc,Vc,Wc);if(u){let e=new Y;Rs.getBarycoord(Wc,zc,Bc,Vc,e),i&&(u.uv=Rs.getInterpolatedAttribute(i,s,c,l,e,new go)),a&&(u.uv1=Rs.getInterpolatedAttribute(a,s,c,l,e,new go)),o&&(u.normal=Rs.getInterpolatedAttribute(o,s,c,l,e,new Y),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new Y,materialIndex:0};Rs.getNormal(zc,Bc,Vc,t.normal),u.face=t,u.barycoord=e}return u}var Yc=class extends Fo{constructor(e=null,t=1,n=1,r,i,a,o,s,c=vi,l=vi,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Xc=/*@__PURE__*/ new uc,Zc=/*@__PURE__*/ new go(.5,.5),Qc=/*@__PURE__*/ new Y,$c=class{constructor(e=new Ec,t=new Ec,n=new Ec,r=new Ec,i=new Ec,a=new Ec){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ga,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xc.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xc.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xc)}intersectsSprite(e){return Xc.center.set(0,0,0),Xc.radius=.7071067811865476+Zc.distanceTo(e.center),Xc.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xc)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Qc.x=r.normal.x>0?e.max.x:e.min.x,Qc.y=r.normal.y>0?e.max.y:e.min.y,Qc.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Qc)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},el=/*@__PURE__*/ new Vo,tl=class e{constructor(){this.coordinateSystem=Ga,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let e=0;e<t.length;e++){let r=t[e];el.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[e]===void 0&&(n[e]=new $c),n[e].setFromProjectionMatrix(el,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new $c),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new e().copy(this)}},nl=class extends Fo{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},rl=class extends Fo{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},il=class extends Fo{constructor(e,t,n=ki,r,i,a,o=vi,s=vi,c,l=Bi,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new jo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},al=class extends il{constructor(e,t=ki,n=301,r,i,a=vi,o=vi,s,c=Bi){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ol=class extends Fo{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},sl=class e extends vc{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new oc(c,3)),this.setAttribute(`normal`,new oc(l,3)),this.setAttribute(`uv`,new oc(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new Y;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},cl=class e extends vc{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new oc(p,3)),this.setAttribute(`normal`,new oc(m,3)),this.setAttribute(`uv`,new oc(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};function ll(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(dl(i))i.isRenderTargetTexture?(J(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(dl(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function ul(e){let t={};for(let n=0;n<e.length;n++){let r=ll(e[n]);for(let e in r)t[e]=r[e]}return t}function dl(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function fl(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function pl(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:To.workingColorSpace}var ml={clone:ll,merge:ul},hl=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gl=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,_l=class extends Oc{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hl,this.fragmentShader=gl,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ll(e.uniforms),this.uniformsGroups=fl(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new Ss().setHex(r.value);break;case`v2`:this.uniforms[n].value=new go().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new Y().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Io().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new bo().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new Vo().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},vl=class extends _l{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},yl=class extends Oc{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Ia,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},bl=class extends Oc{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function xl(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Sl(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Cl=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},wl=class extends Cl{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Na,endingEnd:Na}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Pa:i=e,o=2*t-n;break;case Fa:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Pa:a=e,s=2*n-t;break;case Fa:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Tl=class extends Cl{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},El=class extends Cl{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Dl=class extends Cl{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Al(n,t,g,y,r);i[p]=Ol(x,o,_,b,m)}return i}};function Ol(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function kl(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Al(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Ol(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=kl(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var jl=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=xl(t,this.TimeBufferType),this.values=xl(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:xl(e.times,Array),values:xl(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Sl(e.settings)&&(n.settings={inTangents:xl(e.settings.inTangents,Array),outTangents:xl(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new El(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Tl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new wl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Dl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ka:t=this.InterpolantFactoryMethodDiscrete;break;case Aa:t=this.InterpolantFactoryMethodLinear;break;case ja:t=this.InterpolantFactoryMethodSmooth;break;case Ma:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return J(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ka;case this.InterpolantFactoryMethodLinear:return Aa;case this.InterpolantFactoryMethodSmooth:return ja;case this.InterpolantFactoryMethodBezier:return Ma}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e;Sl(this.settings)&&(Ml(this.settings.inTangents,e),Ml(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Sl(this.settings)&&(Nl(this.settings.inTangents,e),Nl(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&($a(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&($a(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){$a(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){$a(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&qa(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){$a(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===ja,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Sl(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Ml(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]+=t}function Nl(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}jl.prototype.ValueTypeName=``,jl.prototype.TimeBufferType=Float32Array,jl.prototype.ValueBufferType=Float32Array,jl.prototype.DefaultInterpolation=Aa;var Pl=class extends jl{constructor(e,t,n){super(e,t,n)}};Pl.prototype.ValueTypeName=`bool`,Pl.prototype.ValueBufferType=Array,Pl.prototype.DefaultInterpolation=ka,Pl.prototype.InterpolantFactoryMethodLinear=void 0,Pl.prototype.InterpolantFactoryMethodSmooth=void 0;var Fl=class extends jl{constructor(e,t,n,r){super(e,t,n,r)}};Fl.prototype.ValueTypeName=`color`;var Il=class extends jl{constructor(e,t,n,r){super(e,t,n,r)}};Il.prototype.ValueTypeName=`number`;var Ll=class extends Cl{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)_o.slerpFlat(i,0,a,c-o,a,c,s);return i}},Rl=class extends jl{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Ll(this.times,this.values,this.getValueSize(),e)}};Rl.prototype.ValueTypeName=`quaternion`,Rl.prototype.InterpolantFactoryMethodSmooth=void 0;var zl=class extends jl{constructor(e,t,n){super(e,t,n)}};zl.prototype.ValueTypeName=`string`,zl.prototype.ValueBufferType=Array,zl.prototype.DefaultInterpolation=ka,zl.prototype.InterpolantFactoryMethodLinear=void 0,zl.prototype.InterpolantFactoryMethodSmooth=void 0;var Bl=class extends jl{constructor(e,t,n,r){super(e,t,n,r)}};Bl.prototype.ValueTypeName=`vector`;var Vl=/*@__PURE__*/ new Y,Hl=/*@__PURE__*/ new _o,Ul=/*@__PURE__*/ new Y,Wl=class extends ms{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Vo,this.projectionMatrix=new Vo,this.projectionMatrixInverse=new Vo,this.coordinateSystem=Ga,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Vl,Hl,Ul),Ul.x===1&&Ul.y===1&&Ul.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vl,Hl,Ul.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Vl,Hl,Ul),Ul.x===1&&Ul.y===1&&Ul.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vl,Hl,Ul.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Gl=/*@__PURE__*/ new Y,Kl=/*@__PURE__*/ new go,ql=/*@__PURE__*/ new go,Jl=class extends Wl{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=oo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ao*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return oo*2*Math.atan(Math.tan(ao*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Gl.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Gl.x,Gl.y).multiplyScalar(-e/Gl.z),Gl.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Gl.x,Gl.y).multiplyScalar(-e/Gl.z)}getViewSize(e,t){return this.getViewBounds(e,Kl,ql),t.subVectors(ql,Kl)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ao*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Yl=class extends Wl{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Xl=class extends vc{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type=`InstancedBufferGeometry`,this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}},Zl=-90,Ql=1,$l=class extends ms{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Jl(Zl,Ql,e,t);r.layers=this.layers,this.add(r);let i=new Jl(Zl,Ql,e,t);i.layers=this.layers,this.add(i);let a=new Jl(Zl,Ql,e,t);a.layers=this.layers,this.add(a);let o=new Jl(Zl,Ql,e,t);o.layers=this.layers,this.add(o);let s=new Jl(Zl,Ql,e,t);s.layers=this.layers,this.add(s);let c=new Jl(Zl,Ql,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},eu=class extends Jl{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},tu=`\\[\\]\\.:\\/`,nu=/* @__PURE__ */ RegExp(`[\\[\\]\\.:\\/]`,`g`),ru=`[^\\[\\]\\.:\\/]`,iu=`[^`+tu.replace(`\\.`,``)+`]`,au=/*@__PURE__*/ `((?:WC+[\\/:])*)`.replace(`WC`,ru),ou=/*@__PURE__*/ `(WCOD+)?`.replace(`WCOD`,iu),su=/*@__PURE__*/ `(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,ru),cu=/*@__PURE__*/ `\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,ru),lu=RegExp(`^`+au+ou+su+cu+`$`),uu=[`material`,`materials`,`bones`,`map`],du=class{constructor(e,t,n){let r=n||fu.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},fu=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(nu,``)}static parseTrackName(e){let t=lu.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);uu.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){J(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){$a(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){$a(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){$a(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){$a(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){$a(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){$a(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){$a(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;$a(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){$a(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){$a(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};fu.Composite=du,fu.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},fu.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},fu.prototype.GetterByBindingType=[fu.prototype._getValue_direct,fu.prototype._getValue_array,fu.prototype._getValue_arrayElement,fu.prototype._getValue_toArray],fu.prototype.SetterByBindingTypeAndVersioning=[[fu.prototype._setValue_direct,fu.prototype._setValue_direct_setNeedsUpdate,fu.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[fu.prototype._setValue_array,fu.prototype._setValue_array_setNeedsUpdate,fu.prototype._setValue_array_setMatrixWorldNeedsUpdate],[fu.prototype._setValue_arrayElement,fu.prototype._setValue_arrayElement_setNeedsUpdate,fu.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[fu.prototype._setValue_fromArray,fu.prototype._setValue_fromArray_setNeedsUpdate,fu.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var pu=class extends yc{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}};(class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function mu(e,t,n,r){let i=hu(r);switch(n){case Li:return e*t;case Hi:return e*t/i.components*i.byteLength;case Ui:return e*t/i.components*i.byteLength;case Wi:return e*t*2/i.components*i.byteLength;case Gi:return e*t*2/i.components*i.byteLength;case Ri:return e*t*3/i.components*i.byteLength;case zi:return e*t*4/i.components*i.byteLength;case Ki:return e*t*4/i.components*i.byteLength;case qi:case Ji:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Yi:case Xi:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Qi:case ea:return Math.max(e,16)*Math.max(t,8)/4;case Zi:case $i:return Math.max(e,8)*Math.max(t,8)/2;case ta:case na:case ia:case aa:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ra:case oa:case sa:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ca:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case la:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case ua:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case da:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case fa:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case pa:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case ma:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case ha:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case ga:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case _a:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case va:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case ya:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case ba:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case xa:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Sa:case Ca:case wa:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ta:case Ea:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Da:case Oa:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function hu(e){switch(e){case wi:case Ti:return{byteLength:1,components:1};case Di:case Ei:case ji:return{byteLength:2,components:1};case Mi:case Ni:return{byteLength:2,components:4};case ki:case Oi:case Ai:return{byteLength:4,components:1};case Fi:case Ii:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`187`}})),typeof window<`u`&&(window.__THREE__?J(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`187`);function gu(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function _u(e){let t=/* @__PURE__ */ new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var vu={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},X={common:{diffuse:{value:/*@__PURE__*/ new Ss(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:/*@__PURE__*/ new bo},alphaMap:{value:null},alphaMapTransform:{value:/*@__PURE__*/ new bo},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:/*@__PURE__*/ new bo}},envmap:{envMap:{value:null},envMapRotation:{value:/*@__PURE__*/ new bo},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:/*@__PURE__*/ new bo}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:/*@__PURE__*/ new bo}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:/*@__PURE__*/ new bo},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:/*@__PURE__*/ new bo},normalScale:{value:/*@__PURE__*/ new go(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:/*@__PURE__*/ new bo},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:/*@__PURE__*/ new bo}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:/*@__PURE__*/ new bo}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:/*@__PURE__*/ new bo}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:/*@__PURE__*/ new Ss(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:/*@__PURE__*/ new Ss(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:/*@__PURE__*/ new bo},alphaTest:{value:0},uvTransform:{value:/*@__PURE__*/ new bo}},sprite:{diffuse:{value:/*@__PURE__*/ new Ss(16777215)},opacity:{value:1},center:{value:/*@__PURE__*/ new go(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:/*@__PURE__*/ new bo},alphaMap:{value:null},alphaMapTransform:{value:/*@__PURE__*/ new bo},alphaTest:{value:0}}},yu={basic:{uniforms:/*@__PURE__*/ ul([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.fog]),vertexShader:vu.meshbasic_vert,fragmentShader:vu.meshbasic_frag},lambert:{uniforms:/*@__PURE__*/ ul([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:/*@__PURE__*/ new Ss(0)},envMapIntensity:{value:1}}]),vertexShader:vu.meshlambert_vert,fragmentShader:vu.meshlambert_frag},phong:{uniforms:/*@__PURE__*/ ul([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:/*@__PURE__*/ new Ss(0)},specular:{value:/*@__PURE__*/ new Ss(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:vu.meshphong_vert,fragmentShader:vu.meshphong_frag},standard:{uniforms:/*@__PURE__*/ ul([X.common,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.roughnessmap,X.metalnessmap,X.fog,X.lights,{emissive:{value:/*@__PURE__*/ new Ss(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:vu.meshphysical_vert,fragmentShader:vu.meshphysical_frag},toon:{uniforms:/*@__PURE__*/ ul([X.common,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.gradientmap,X.fog,X.lights,{emissive:{value:/*@__PURE__*/ new Ss(0)}}]),vertexShader:vu.meshtoon_vert,fragmentShader:vu.meshtoon_frag},matcap:{uniforms:/*@__PURE__*/ ul([X.common,X.bumpmap,X.normalmap,X.displacementmap,X.fog,{matcap:{value:null}}]),vertexShader:vu.meshmatcap_vert,fragmentShader:vu.meshmatcap_frag},points:{uniforms:/*@__PURE__*/ ul([X.points,X.fog]),vertexShader:vu.points_vert,fragmentShader:vu.points_frag},dashed:{uniforms:/*@__PURE__*/ ul([X.common,X.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:vu.linedashed_vert,fragmentShader:vu.linedashed_frag},depth:{uniforms:/*@__PURE__*/ ul([X.common,X.displacementmap]),vertexShader:vu.depth_vert,fragmentShader:vu.depth_frag},normal:{uniforms:/*@__PURE__*/ ul([X.common,X.bumpmap,X.normalmap,X.displacementmap,{opacity:{value:1}}]),vertexShader:vu.meshnormal_vert,fragmentShader:vu.meshnormal_frag},sprite:{uniforms:/*@__PURE__*/ ul([X.sprite,X.fog]),vertexShader:vu.sprite_vert,fragmentShader:vu.sprite_frag},background:{uniforms:{uvTransform:{value:/*@__PURE__*/ new bo},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:vu.background_vert,fragmentShader:vu.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:/*@__PURE__*/ new bo}},vertexShader:vu.backgroundCube_vert,fragmentShader:vu.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:vu.cube_vert,fragmentShader:vu.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:vu.equirect_vert,fragmentShader:vu.equirect_frag},distance:{uniforms:/*@__PURE__*/ ul([X.common,X.displacementmap,{referencePosition:{value:/*@__PURE__*/ new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:vu.distance_vert,fragmentShader:vu.distance_frag},shadow:{uniforms:/*@__PURE__*/ ul([X.lights,X.fog,{color:{value:/*@__PURE__*/ new Ss(0)},opacity:{value:1}}]),vertexShader:vu.shadow_vert,fragmentShader:vu.shadow_frag}};yu.physical={uniforms:/*@__PURE__*/ ul([yu.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:/*@__PURE__*/ new bo},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:/*@__PURE__*/ new bo},clearcoatNormalScale:{value:/*@__PURE__*/ new go(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:/*@__PURE__*/ new bo},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:/*@__PURE__*/ new bo},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:/*@__PURE__*/ new bo},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:/*@__PURE__*/ new bo},sheen:{value:0},sheenColor:{value:/*@__PURE__*/ new Ss(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:/*@__PURE__*/ new bo},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:/*@__PURE__*/ new bo},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:/*@__PURE__*/ new bo},transmissionSamplerSize:{value:/*@__PURE__*/ new go},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:/*@__PURE__*/ new bo},attenuationDistance:{value:0},attenuationColor:{value:/*@__PURE__*/ new Ss(0)},specularColor:{value:/*@__PURE__*/ new Ss(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:/*@__PURE__*/ new bo},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:/*@__PURE__*/ new bo},anisotropyVector:{value:/*@__PURE__*/ new go},anisotropyMap:{value:null},anisotropyMapTransform:{value:/*@__PURE__*/ new bo}}]),vertexShader:vu.meshphysical_vert,fragmentShader:vu.meshphysical_frag};var bu={r:0,b:0,g:0},xu=/*@__PURE__*/ new Vo,Su=/*@__PURE__*/ new bo;Su.set(-1,0,0,0,1,0,0,0,1);function Cu(e,t,n,r,i,a){let o=new Ss(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&i.isCubeTexture?(l===void 0&&(l=new Kc(new sl(1,1,1),new _l({name:`BackgroundCubeMaterial`,uniforms:ll(yu.backgroundCube.uniforms),vertexShader:yu.backgroundCube.vertexShader,fragmentShader:yu.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(xu.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Su),l.material.toneMapped=To.getTransfer(i.colorSpace)!==Ba,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Kc(new cl(2,2),new _l({name:`BackgroundMaterial`,uniforms:ll(yu.background.uniforms),vertexShader:yu.background.vertexShader,fragmentShader:yu.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=To.getTransfer(i.colorSpace)!==Ba,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(bu,pl(e)),n.buffers.color.setClear(bu.r,bu.g,bu.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function wu(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Tu(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Eu(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(J(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),f=n.logarithmicDepthBuffer===!0&&d===!1;n.reversedDepthBuffer===!0&&d===!1&&J(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&d===!0&&J(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Du(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Ec,s=new bo,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Ou=class extends Ro{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new nl(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new sl(5,5,5),i=new _l({name:`CubemapFromEquirect`,uniforms:ll(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Kc(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=xi),new $l(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},ku=256,Au=3,ju=20,Mu=256,Nu=16,Pu=3,Fu=/*@__PURE__*/ new Y,Iu=/*@__PURE__*/ new Ss,Lu=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new $l(1,10,null),this._boxMesh=new Kc(new sl(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Fu}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(Iu));let h=new $l(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Uu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(ku,fo(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?ku:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=Ru(e,!1,!1),n=Math.log2(e)-Au;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Ru(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wu()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Uu()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Bu(),this._integrationMaterial=Vu());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/Nu);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-Pu)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(Mu*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Hu());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function Ru(e,t,n){return new Ou(e,{minFilter:Ci,generateMipmaps:t,type:ji,colorSpace:Ra,depthBuffer:n})}function zu(e,t,n){return new _l({name:e,uniforms:t,vertexShader:vu.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function Bu(){return zu(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Mu}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Vu(){return zu(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Nu}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Hu(){return zu(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${ju}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Uu(){return zu(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Wu(){return zu(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Gu(e){let t=/* @__PURE__ */ new WeakMap,n=/* @__PURE__ */ new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Ou(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Lu(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Lu(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=/* @__PURE__ */ new WeakMap,n=/* @__PURE__ */ new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Ku(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&eo(`WebGLRenderer: `+e+` extension not supported.`),t}}}function qu(e,t,n,r){let i={},a=/* @__PURE__ */ new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?ac:ic)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function Ju(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Yu(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:$a(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Xu(e,t,n){let r=/* @__PURE__ */ new WeakMap,i=new Io;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new zo(h,p,m,u);g.type=Ai,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new go(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Zu(e,t,n,r,i){let a=/* @__PURE__ */ new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=/* @__PURE__ */ new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Qu={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function $u(e,t,n,r,i,a){let o=new Ro(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=null,u=new vc;u.setAttribute(`position`,new oc([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute(`uv`,new oc([0,2,0,0,2,0],2));let d=new vl({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Kc(u,d),p=new Yl(-1,1,1,-1,0,1),m=null,h=null,g=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new Ro(t,n,{type:ji,depthBuffer:!1,stencilBuffer:!1}),c=new Ro(t,n,{type:ji,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&y.some(e=>e.needsDepthTexture===!0);r!==(o.depthTexture!==null)&&(r===!0&&l===null&&(l=new il(t,n),a===!0&&(l.format=Vi,l.type=Pi)),o.dispose(),o.depthTexture=r?l:null,o.resolveDepthBuffer=r,o.storeMultisampledDepthBuffer=r);for(let e=0;e<y.length;e++){let i=y[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(l)}},this.begin=function(e,t){if(g||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,g=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(m!==e.outputColorSpace||h!==e.toneMapping){m=e.outputColorSpace,h=e.toneMapping,d.defines={},To.getTransfer(m)===`srgb`&&(d.defines.SRGB_TRANSFER=``);let t=Qu[h];t&&(d.defines[t]=``),d.needsUpdate=!0}d.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(f,p),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var ed=/*@__PURE__*/ new Fo,td=/*@__PURE__*/ new il(1,1),nd=/*@__PURE__*/ new al(1),rd=/*@__PURE__*/ new zo,id=/*@__PURE__*/ new Bo,ad=/*@__PURE__*/ new nl,od=[],sd=[],cd=/* @__PURE__ */ new Float32Array(16),ld=/* @__PURE__ */ new Float32Array(9),ud=/* @__PURE__ */ new Float32Array(4);function dd(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=od[i];if(a===void 0&&(a=new Float32Array(i),od[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function fd(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function pd(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function md(e,t){let n=sd[t];n===void 0&&(n=new Int32Array(t),sd[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function hd(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function gd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(fd(n,t))return;e.uniform2fv(this.addr,t),pd(n,t)}}function _d(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(fd(n,t))return;e.uniform3fv(this.addr,t),pd(n,t)}}function vd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(fd(n,t))return;e.uniform4fv(this.addr,t),pd(n,t)}}function yd(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(fd(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),pd(n,t)}else{if(fd(n,r))return;ud.set(r),e.uniformMatrix2fv(this.addr,!1,ud),pd(n,r)}}function bd(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(fd(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),pd(n,t)}else{if(fd(n,r))return;ld.set(r),e.uniformMatrix3fv(this.addr,!1,ld),pd(n,r)}}function xd(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(fd(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),pd(n,t)}else{if(fd(n,r))return;cd.set(r),e.uniformMatrix4fv(this.addr,!1,cd),pd(n,r)}}function Sd(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Cd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(fd(n,t))return;e.uniform2iv(this.addr,t),pd(n,t)}}function wd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(fd(n,t))return;e.uniform3iv(this.addr,t),pd(n,t)}}function Td(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(fd(n,t))return;e.uniform4iv(this.addr,t),pd(n,t)}}function Ed(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Dd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(fd(n,t))return;e.uniform2uiv(this.addr,t),pd(n,t)}}function Od(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(fd(n,t))return;e.uniform3uiv(this.addr,t),pd(n,t)}}function kd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(fd(n,t))return;e.uniform4uiv(this.addr,t),pd(n,t)}}function Ad(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function jd(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?Ad(td):ed,n.setTexture2D(t||a,i)}function Md(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||id,i)}function Nd(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?Ad(nd):ad,n.setTextureCube(t||a,i)}function Pd(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||rd,i)}function Fd(e){switch(e){case 5126:return hd;case 35664:return gd;case 35665:return _d;case 35666:return vd;case 35674:return yd;case 35675:return bd;case 35676:return xd;case 5124:case 35670:return Sd;case 35667:case 35671:return Cd;case 35668:case 35672:return wd;case 35669:case 35673:return Td;case 5125:return Ed;case 36294:return Dd;case 36295:return Od;case 36296:return kd;case 35678:case 36198:case 36298:case 36306:case 35682:return jd;case 35679:case 36299:case 36307:return Md;case 35680:case 36300:case 36308:case 36293:return Nd;case 36289:case 36303:case 36311:case 36292:return Pd}}function Id(e,t){e.uniform1fv(this.addr,t)}function Ld(e,t){let n=dd(t,this.size,2);e.uniform2fv(this.addr,n)}function Rd(e,t){let n=dd(t,this.size,3);e.uniform3fv(this.addr,n)}function zd(e,t){let n=dd(t,this.size,4);e.uniform4fv(this.addr,n)}function Bd(e,t){let n=dd(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Vd(e,t){let n=dd(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Hd(e,t){let n=dd(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Ud(e,t){e.uniform1iv(this.addr,t)}function Wd(e,t){e.uniform2iv(this.addr,t)}function Gd(e,t){e.uniform3iv(this.addr,t)}function Kd(e,t){e.uniform4iv(this.addr,t)}function qd(e,t){e.uniform1uiv(this.addr,t)}function Jd(e,t){e.uniform2uiv(this.addr,t)}function Yd(e,t){e.uniform3uiv(this.addr,t)}function Xd(e,t){e.uniform4uiv(this.addr,t)}function Zd(e,t,n){let r=this.cache,i=t.length,a=md(n,i);fd(r,a)||(e.uniform1iv(this.addr,a),pd(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Ad(td):ed;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Qd(e,t,n){let r=this.cache,i=t.length,a=md(n,i);fd(r,a)||(e.uniform1iv(this.addr,a),pd(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||id,a[e])}function $d(e,t,n){let r=this.cache,i=t.length,a=md(n,i);fd(r,a)||(e.uniform1iv(this.addr,a),pd(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?Ad(nd):ad;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function ef(e,t,n){let r=this.cache,i=t.length,a=md(n,i);fd(r,a)||(e.uniform1iv(this.addr,a),pd(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||rd,a[e])}function tf(e){switch(e){case 5126:return Id;case 35664:return Ld;case 35665:return Rd;case 35666:return zd;case 35674:return Bd;case 35675:return Vd;case 35676:return Hd;case 5124:case 35670:return Ud;case 35667:case 35671:return Wd;case 35668:case 35672:return Gd;case 35669:case 35673:return Kd;case 5125:return qd;case 36294:return Jd;case 36295:return Yd;case 36296:return Xd;case 35678:case 36198:case 36298:case 36306:case 35682:return Zd;case 35679:case 36299:case 36307:return Qd;case 35680:case 36300:case 36308:case 36293:return $d;case 36289:case 36303:case 36311:case 36292:return ef}}var nf=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Fd(t.type)}},rf=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=tf(t.type)}},af=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},of=/(\w+)(\])?(\[|\.)?/g;function sf(e,t){e.seq.push(t),e.map[t.id]=t}function cf(e,t,n){let r=e.name,i=r.length;for(of.lastIndex=0;;){let a=of.exec(r),o=of.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){sf(n,l===void 0?new nf(s,e,t):new rf(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new af(s),sf(n,e)),n=e}}}var lf=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);cf(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function uf(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var df=37297,ff=0;function pf(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var mf=/*@__PURE__*/ new bo;function hf(e){To._getMatrix(mf,To.workingColorSpace,e);let t=`mat3( ${mf.elements.map(e=>e.toFixed(4))} )`;switch(To.getTransfer(e)){case za:return[t,`LinearTransferOETF`];case Ba:return[t,`sRGBTransferOETF`];default:return J(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function gf(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+pf(e.getShaderSource(t),r)}return i}function _f(e,t){let n=hf(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var vf={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function yf(e,t){let n=vf[t];return n===void 0?(J(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var bf=/*@__PURE__*/ new Y;function xf(){return To.getLuminanceCoefficients(bf),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${bf.x.toFixed(4)}, ${bf.y.toFixed(4)}, ${bf.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Sf(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Tf).join(`
`)}function Cf(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function wf(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Tf(e){return e!==``}function Ef(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Df(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Of=/^[ \t]*#include +<([\w\d./]+)>/gm;function kf(e){return e.replace(Of,Af)}function Af(e,t){let n=vu[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return kf(n)}var jf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Mf(e){return e.replace(jf,Nf)}function Nf(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Pf(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Ff={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function If(e){return Ff[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Lf={302:`ENVMAP_MODE_REFRACTION`};function Rf(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Lf[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var zf={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Bf(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:zf[e.combine]||`ENVMAP_BLENDING_NONE`}function Vf(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=If(n),l=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,u=Rf(n),d=Bf(n),f=Sf(n),p=Cf(a),m=i.createProgram(),h,g,_=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(h=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(Tf).join(`
`),h.length>0&&(h+=`
`),g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(Tf).join(`
`),g.length>0&&(g+=`
`)):(h=[Pf(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Tf).join(`
`),g=[Pf(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:vu.tonemapping_pars_fragment,n.toneMapping===0?``:yf(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,vu.colorspace_pars_fragment,_f(`linearToOutputTexel`,n.outputColorSpace),xf(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Tf).join(`
`)),o=kf(o),o=Ef(o,n),o=Df(o,n),s=kf(s),s=Ef(s,n),s=Df(s,n),o=Mf(o),s=Mf(s),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,h=[f,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+h,g=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+g);let v=_+h+o,y=_+g+s,b=uf(i,i.VERTEX_SHADER,v),x=uf(i,i.FRAGMENT_SHADER,y);i.attachShader(m,b),i.attachShader(m,x),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,`position`):i.bindAttribLocation(m,0,n.index0AttributeName),i.linkProgram(m);function S(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(m)||``,r=i.getShaderInfoLog(b)||``,a=i.getShaderInfoLog(x)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,m,b,x);else{let e=gf(i,b,`vertex`),n=gf(i,x,`fragment`);$a(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):J(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:h},fragmentShader:{log:c,prefix:g}})}i.deleteShader(b),i.deleteShader(x),C=new lf(i,m),w=wf(i,m)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(m,df)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=ff++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=x,this}var Hf=0,Uf=class{constructor(){this.shaderCache=/* @__PURE__ */ new Map,this.materialCache=/* @__PURE__ */ new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=/* @__PURE__ */ new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Wf(e),t.set(e,n)),n}},Wf=class{constructor(e){this.id=Hf++,this.code=e,this.usedTimes=0}};function Gf(e){return e===1030||e===37490||e===36285}function Kf(e,t,n,r,i,a){let o=new Qo,s=new Uf,c=/* @__PURE__ */ new Set,l=[],u=/* @__PURE__ */ new Map,d=r.logarithmicDepthBuffer,f={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function p(e){return c.add(e),e===0?`uv`:`uv${e}`}function m(i,o,l,u,m,h){let g=u.fog,_=m.geometry,v=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,b=t.get(i.envMap||v,y),x=f[i.type],S=r.precision;i.precision!==null&&(S=r.getMaxPrecision(i.precision),S!==i.precision&&J(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,S,`instead.`));let C=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,w=C===void 0?0:C.length,T=0;_.morphAttributes.position!==void 0&&(T=1),_.morphAttributes.normal!==void 0&&(T=2),_.morphAttributes.color!==void 0&&(T=3);let E,D,O,k;if(x){let e=yu[x];E=e.vertexShader,D=e.fragmentShader}else{E=i.vertexShader,D=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let A=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),M=m.isInstancedMesh===!0,N=m.isBatchedMesh===!0,P=!!i.map,F=!!i.matcap,I=!!b,ee=I&&b.isPMREMTexture===!0,L=!!i.aoMap,te=!!i.lightMap,ne=!!i.bumpMap&&i.wireframe===!1,R=!!i.normalMap,re=!!i.displacementMap,z=!!i.emissiveMap,ie=!!i.metalnessMap,ae=!!i.roughnessMap,oe=i.anisotropy>0,B=i.clearcoat>0,se=i.diffuseRoughness>0,ce=i.dispersion>0,V=i.retroreflectivity>0,le=i.iridescence>0,ue=i.sheen>0,de=i.transmission>0,fe=oe&&!!i.anisotropyMap,pe=B&&!!i.clearcoatMap,me=B&&!!i.clearcoatNormalMap,he=B&&!!i.clearcoatRoughnessMap,ge=se&&!!i.diffuseRoughnessMap,H=le&&!!i.iridescenceMap,_e=le&&!!i.iridescenceThicknessMap,U=ue&&!!i.sheenColorMap,W=ue&&!!i.sheenRoughnessMap,G=!!i.specularMap,ve=!!i.specularColorMap,K=!!i.specularIntensityMap,q=de&&!!i.transmissionMap,ye=de&&!!i.thicknessMap,be=!!i.gradientMap,xe=!!i.alphaMap,Se=i.alphaTest>0,Ce=!!i.alphaHash,we=!!i.extensions,Te=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Te=e.toneMapping);let Ee=ee?b.isCompressedCubeTexture?b.image[0].mipmaps:b.mipmaps:null,De={shaderID:x,shaderType:i.type,shaderName:i.name,vertexShader:E,fragmentShader:D,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:S,batching:N,batchingColor:N&&m._colorsTexture!==null,instancing:M,instancingColor:M&&m.instanceColor!==null,instancingMorph:M&&m.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:To.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:P,matcap:F,envMap:I,envMapMode:I&&b.mapping,envMapPMREM:ee,envMapMaxLod:ee?Ee.length-1:null,envMapSize:ee?Ee[0].width:null,aoMap:L,lightMap:te,bumpMap:ne,normalMap:R,displacementMap:re,emissiveMap:z,normalMapObjectSpace:R&&i.normalMapType===1,normalMapTangentSpace:R&&i.normalMapType===0,packedNormalMap:R&&i.normalMapType===0&&Gf(i.normalMap.format),metalnessMap:ie,roughnessMap:ae,anisotropy:oe,anisotropyMap:fe,clearcoat:B,clearcoatMap:pe,clearcoatNormalMap:me,clearcoatRoughnessMap:he,diffuseRoughness:se,diffuseRoughnessMap:ge,dispersion:ce,retroreflection:V,iridescence:le,iridescenceMap:H,iridescenceThicknessMap:_e,sheen:ue,sheenColorMap:U,sheenRoughnessMap:W,specularMap:G,specularColorMap:ve,specularIntensityMap:K,transmission:de,transmissionMap:q,thicknessMap:ye,gradientMap:be,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:xe,alphaTest:Se,alphaHash:Ce,combine:i.combine,mapUv:P&&p(i.map.channel),aoMapUv:L&&p(i.aoMap.channel),lightMapUv:te&&p(i.lightMap.channel),bumpMapUv:ne&&p(i.bumpMap.channel),normalMapUv:R&&p(i.normalMap.channel),displacementMapUv:re&&p(i.displacementMap.channel),emissiveMapUv:z&&p(i.emissiveMap.channel),metalnessMapUv:ie&&p(i.metalnessMap.channel),roughnessMapUv:ae&&p(i.roughnessMap.channel),anisotropyMapUv:fe&&p(i.anisotropyMap.channel),clearcoatMapUv:pe&&p(i.clearcoatMap.channel),clearcoatNormalMapUv:me&&p(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:he&&p(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ge&&p(i.diffuseRoughnessMap.channel),iridescenceMapUv:H&&p(i.iridescenceMap.channel),iridescenceThicknessMapUv:_e&&p(i.iridescenceThicknessMap.channel),sheenColorMapUv:U&&p(i.sheenColorMap.channel),sheenRoughnessMapUv:W&&p(i.sheenRoughnessMap.channel),specularMapUv:G&&p(i.specularMap.channel),specularColorMapUv:ve&&p(i.specularColorMap.channel),specularIntensityMapUv:K&&p(i.specularIntensityMap.channel),transmissionMapUv:q&&p(i.transmissionMap.channel),thicknessMapUv:ye&&p(i.thicknessMap.channel),alphaMapUv:xe&&p(i.alphaMap.channel),vertexTangents:!!_.attributes.tangent&&(R||oe),vertexNormals:!!_.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!_.attributes.color&&_.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!_.attributes.uv&&(P||xe),fog:!!g,useFog:i.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||_.attributes.normal===void 0&&R===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:_.attributes.position!==void 0,morphTargets:_.morphAttributes.position!==void 0,morphNormals:_.morphAttributes.normal!==void 0,morphColors:_.morphAttributes.color!==void 0,morphTargetsCount:w,morphTextureStride:T,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:h.filter(e=>e.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Te,decodeVideoTexture:P&&i.map.isVideoTexture===!0&&To.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:z&&i.emissiveMap.isVideoTexture===!0&&To.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:we&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(we&&i.extensions.multiDraw===!0||N)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return De.vertexUv1s=c.has(1),De.vertexUv2s=c.has(2),De.vertexUv3s=c.has(3),c.clear(),De}function h(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(g(n,t),_(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function g(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function _(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.diffuseRoughness&&o.enable(25),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function v(e){let t=f[e.type],n;if(t){let e=yu[t];n=ml.clone(e.uniforms)}else n=e.uniforms;return n}function y(t,n){let r=u.get(n);return r===void 0?(r=new Vf(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function b(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function x(e){s.remove(e)}function S(){s.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:v,acquireProgram:y,releaseProgram:b,releaseShaderCache:x,programs:l,dispose:S}}function qf(){let e=/* @__PURE__ */ new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=/* @__PURE__ */ new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Jf(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Yf(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Xf(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Jf),r.length>1&&r.sort(t||Yf),i.length>1&&i.sort(t||Yf)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Zf(){let e=/* @__PURE__ */ new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Xf,e.set(t,[i])):n>=r.length?(i=new Xf,r.push(i)):i=r[n],i}function n(){e=/* @__PURE__ */ new WeakMap}return{get:t,dispose:n}}function Qf(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new Y,color:new Ss};break;case`SpotLight`:n={position:new Y,direction:new Y,color:new Ss,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new Y,color:new Ss,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new Y,skyColor:new Ss,groundColor:new Ss};break;case`RectAreaLight`:n={color:new Ss,position:new Y,halfWidth:new Y,halfHeight:new Y}}return e[t.id]=n,n}}}function $f(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new go};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new go};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new go,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var ep=0;function tp(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function np(e){let t=new Qf,n=$f(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new Y);let i=new Y,a=new Vo,o=new Vo;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(tp);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=X.LTC_FLOAT_1,r.rectAreaLTC2=X.LTC_FLOAT_2):(r.rectAreaLTC1=X.LTC_HALF_1,r.rectAreaLTC2=X.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=ep++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function rp(e){let t=new np(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function ip(e){let t=/* @__PURE__ */ new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new rp(e),t.set(n,[a])):r>=i.length?(a=new rp(e),i.push(a)):a=i[r],a}function r(){t=/* @__PURE__ */ new WeakMap}return{get:n,dispose:r}}var ap=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,op=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,sp=[/*@__PURE__*/ new Y(1,0,0),/*@__PURE__*/ new Y(-1,0,0),/*@__PURE__*/ new Y(0,1,0),/*@__PURE__*/ new Y(0,-1,0),/*@__PURE__*/ new Y(0,0,1),/*@__PURE__*/ new Y(0,0,-1)],cp=[/*@__PURE__*/ new Y(0,-1,0),/*@__PURE__*/ new Y(0,-1,0),/*@__PURE__*/ new Y(0,0,1),/*@__PURE__*/ new Y(0,0,-1),/*@__PURE__*/ new Y(0,-1,0),/*@__PURE__*/ new Y(0,-1,0)],lp=/*@__PURE__*/ new Vo,up=/*@__PURE__*/ new Y,dp=/*@__PURE__*/ new Y;function fp(e,t,n){let r=new $c,i=new go,a=new go,o=new Io,s=new yl,c=new bl,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new _l({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new go},radius:{value:4}},vertexShader:ap,fragmentShader:op}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new vc;m.setAttribute(`position`,new rc(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Kc(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(J(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){J(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){J(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Ro(i.x,i.y,{format:Wi,type:ji,minFilter:xi,magFilter:xi,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new il(i.x,i.y,Ai),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Bi,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=vi,d.map.depthTexture.magFilter=vi}else l.isPointLight?(d.map=new Ou(i.x),d.map.depthTexture=new al(i.x,ki)):(d.map=new Ro(i.x,i.y),d.map.depthTexture=new il(i.x,i.y,ki)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Bi,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=xi,d.map.depthTexture.magFilter=xi):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=vi,d.map.depthTexture.magFilter=vi);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);let _=d.camera.layers.mask&4294967294?d.camera.layers:s.layers;for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),up.setFromMatrixPosition(l.matrixWorld),e.position.copy(up),dp.copy(e.position),dp.add(sp[t]),e.up.copy(cp[t]),e.lookAt(dp),e.updateMatrixWorld(),n.makeTranslation(-up.x,-up.y,-up.z),lp.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(lp,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,_,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new Ro(i.x,i.y,{format:Wi,type:ji}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=y(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)b(l[e],i,a,o,s,c)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function pp(e,t){function n(){let t=!1,n=new Io,r=null,i=new Io(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?ie(e.DEPTH_TEST):ae(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=no[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?ie(e.STENCIL_TEST):ae(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=/* @__PURE__ */ new WeakMap,u={},d={},f={},p=/* @__PURE__ */ new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Ss(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,F=e.getParameter(e.VERSION);F.indexOf(`WebGL`)===-1?F.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=P>=1);let I=null,ee={},L=e.getParameter(e.SCISSOR_BOX),te=e.getParameter(e.VIEWPORT),ne=new Io().fromArray(L),R=new Io().fromArray(te);function re(t,n,r,i){let a=/* @__PURE__ */ new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let z={};z[e.TEXTURE_2D]=re(e.TEXTURE_2D,e.TEXTURE_2D,1),z[e.TEXTURE_CUBE_MAP]=re(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),z[e.TEXTURE_2D_ARRAY]=re(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),z[e.TEXTURE_3D]=re(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ie(e.DEPTH_TEST),o.setFunc(3),de(!1),fe(1),ie(e.CULL_FACE),le(0);function ie(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ae(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function oe(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function B(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function se(t){return h!==t&&(e.useProgram(t),h=t,!0)}let ce={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};ce[103]=e.MIN,ce[104]=e.MAX;let V={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function le(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(ae(e.BLEND),g=!1);else if(g===!1&&(ie(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:$a(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:$a(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:$a(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:$a(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(ce[n],ce[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(V[r],V[i],V[o],V[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ue(t,n){t.side===2?ae(e.CULL_FACE):ie(e.CULL_FACE);let r=t.side===1;n&&(r=!r),de(r),t.blending===1&&t.transparent===!1?le(0):le(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),me(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?ie(e.SAMPLE_ALPHA_TO_COVERAGE):ae(e.SAMPLE_ALPHA_TO_COVERAGE)}function de(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function fe(t){t===0?ae(e.CULL_FACE):(ie(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function pe(t){t!==k&&(N&&e.lineWidth(t),k=t)}function me(t,n,r){t?(ie(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):ae(e.POLYGON_OFFSET_FILL)}function he(t){t?ie(e.SCISSOR_TEST):ae(e.SCISSOR_TEST)}function ge(t){t===void 0&&(t=e.TEXTURE0+M-1),I!==t&&(e.activeTexture(t),I=t)}function H(t,n,r){r===void 0&&(r=I===null?e.TEXTURE0+M-1:I);let i=ee[r];i===void 0&&(i={type:void 0,texture:void 0},ee[r]=i),(i.type!==t||i.texture!==n)&&(I!==r&&(e.activeTexture(r),I=r),e.bindTexture(t,n||z[t]),i.type=t,i.texture=n)}function _e(){let t=ee[I];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function U(){try{e.compressedTexImage2D(...arguments)}catch(e){$a(`WebGLState:`,e)}}function W(){try{e.compressedTexImage3D(...arguments)}catch(e){$a(`WebGLState:`,e)}}function G(){try{e.texSubImage2D(...arguments)}catch(e){$a(`WebGLState:`,e)}}function ve(){try{e.texSubImage3D(...arguments)}catch(e){$a(`WebGLState:`,e)}}function K(){try{e.compressedTexSubImage2D(...arguments)}catch(e){$a(`WebGLState:`,e)}}function q(){try{e.compressedTexSubImage3D(...arguments)}catch(e){$a(`WebGLState:`,e)}}function ye(){try{e.texStorage2D(...arguments)}catch(e){$a(`WebGLState:`,e)}}function be(){try{e.texStorage3D(...arguments)}catch(e){$a(`WebGLState:`,e)}}function xe(){try{e.texImage2D(...arguments)}catch(e){$a(`WebGLState:`,e)}}function Se(){try{e.texImage3D(...arguments)}catch(e){$a(`WebGLState:`,e)}}function Ce(t){return d[t]===void 0?e.getParameter(t):d[t]}function we(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Te(t){ne.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ne.copy(t))}function Ee(t){R.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),R.copy(t))}function De(t,n){let r=l.get(n);r===void 0&&(r=/* @__PURE__ */ new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function Oe(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function ke(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},I=null,ee={},f={},c={},p=/* @__PURE__ */ new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Ss(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ne.set(0,0,e.canvas.width,e.canvas.height),R.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:ie,disable:ae,bindFramebuffer:oe,drawBuffers:B,useProgram:se,setBlending:le,setMaterial:ue,setFlipSided:de,setCullFace:fe,setLineWidth:pe,setPolygonOffset:me,setScissorTest:he,activeTexture:ge,bindTexture:H,unbindTexture:_e,compressedTexImage2D:U,compressedTexImage3D:W,texImage2D:xe,texImage3D:Se,pixelStorei:we,getParameter:Ce,updateUBOMapping:De,uniformBlockBinding:Oe,texStorage2D:ye,texStorage3D:be,texSubImage2D:G,texSubImage3D:ve,compressedTexSubImage2D:K,compressedTexSubImage3D:q,scissor:Te,viewport:Ee,reset:ke}}function mp(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new go,u=/* @__PURE__ */ new WeakMap,d=/* @__PURE__ */ new Set,f,p=/* @__PURE__ */ new WeakMap,m=/* @__PURE__ */ new Set,h=new FinalizationRegistry(e=>m.delete(e)),g=!1;try{g=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function _(e,t){return g?new OffscreenCanvas(e,t):Ja(`canvas`)}function v(e,t,n){let r=1,i=ye(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=_(n,a));let o=t?_(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),J(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&J(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function y(e){return e.generateMipmaps}function b(t){e.generateMipmap(t)}function x(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function S(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];J(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||J(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?za:To.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function C(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,J(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function w(e,t){return y(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function T(e){let t=new WeakRef(e);r.get(e).__ref=t,m.add(t),h.register(e,t,t)}function E(e){let t=r.get(e).__ref;t!==void 0&&(m.delete(t),h.unregister(t))}function D(e){k(e.target)}function O(e){A(e.target)}function k(e){e.removeEventListener(`dispose`,D),E(e),M(e),e.isVideoTexture&&u.delete(e),e.isHTMLTexture&&d.delete(e)}function A(e){e.removeEventListener(`dispose`,O),E(e),P(e)}function j(){for(let e of m){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?A(t):k(t))}m.clear(),d.clear()}function M(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&N(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function N(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function P(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&k(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(a[t])}r.remove(t)}let F=0;function I(){F=0}function ee(){return F}function L(e){F=e}function te(){let e=F;return e>=i.maxTextures&&J(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),F+=1,e}function ne(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function R(t,i){let a=r.get(t);if(t.isVideoTexture&&K(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)J(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)J(`WebGLRenderer: Texture marked for update but image is incomplete`);else{ue(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function re(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?ue(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function z(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?ue(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ie(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?de(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ae={[hi]:e.REPEAT,[gi]:e.CLAMP_TO_EDGE,[_i]:e.MIRRORED_REPEAT},oe={[vi]:e.NEAREST,[yi]:e.NEAREST_MIPMAP_NEAREST,[bi]:e.NEAREST_MIPMAP_LINEAR,[xi]:e.LINEAR,[Si]:e.LINEAR_MIPMAP_NEAREST,[Ci]:e.LINEAR_MIPMAP_LINEAR},B={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function se(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&J(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ae[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ae[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ae[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,oe[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,oe[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,B[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ce(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,D),T(n));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=ne(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&N(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function V(e,t,n){return Math.floor(Math.floor(e/n)/t)}function le(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=V(n.start,r.width,4),c=V(t.start,r.width,4);n.start<=i+1&&a===c&&V(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function ue(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=ce(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=To.getPrimaries(To.workingColorSpace),r=o.colorSpace===``?null:To.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=v(o.image,!1,i.maxTextureSize);t=q(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=S(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);se(c,o);let h,g=o.mipmaps,_=o.isVideoTexture!==!0,x=f.__version===void 0||l===!0,T=u.dataReady,E=w(o,t);if(o.isDepthTexture)m=C(o.format===Vi,o.type),x&&(_?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(g.length>0){_&&x&&n.texStorage2D(e.TEXTURE_2D,E,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else _?(x&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&le(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){_&&x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,g[0].width,g[0].height,t.depth);for(let i=0,a=g.length;i<a;i++)if(h=g[i],o.format!==1023){if(r!==null){if(_){if(T){if(o.layerUpdates.size>0){let t=mu(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else J(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else _?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{_&&x&&n.texStorage2D(e.TEXTURE_2D,E,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],o.format===1023?_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?J(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):_?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(_){if(x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=mu(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)_?(x&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(x){if(_)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(g.length>0){if(_&&x){let t=ye(g[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=g.length;t<i;t++)h=g[t],_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(_){if(x){let r=ye(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);y(o)&&o.mipmapsAutoUpdate===!0&&b(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function de(t,o,s){if(o.image.length!==6)return;let c=ce(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=To.getPrimaries(To.workingColorSpace),r=o.colorSpace===``?null:To.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=v(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=q(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),_=a.convert(o.type),x=S(o.internalFormat,g,_,o.normalized,o.colorSpace),T=o.isVideoTexture!==!0,E=u.__version===void 0||c===!0,D=l.dataReady,O=w(o,h);se(e.TEXTURE_CUBE_MAP,o);let k;if(o.isDepthTexture){if(x=C(o.format===Vi,o.type),E){if(T)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,x,h.width,h.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,h.width,h.height,0,g,_,null)}}else if(f){T&&E&&n.texStorage2D(e.TEXTURE_CUBE_MAP,O,x,h.width,h.height);for(let t=0;t<6;t++){k=m[t].mipmaps;for(let r=0;r<k.length;r++){let i=k[r];o.format===1023?T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,g,_,i.data):g===null?J(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):T?D&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,i.data)}}}else{if(k=o.mipmaps,T&&E){k.length>0&&O++;let t=ye(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,O,x,t.width,t.height)}for(let t=0;t<6;t++)if(p){T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<k.length;r++){let i=k[r].image[t].image;T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,i.width,i.height,0,g,_,i.data)}}else{T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,g,_,m[t]);for(let r=0;r<k.length;r++){let i=k[r];T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,g,_,i.image[t])}}}y(o)&&o.mipmapsAutoUpdate===!0&&b(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function fe(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=S(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),ve(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,G(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function pe(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=C(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;ve(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,G(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,G(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=S(o.internalFormat,c,l,o.normalized,o.colorSpace);ve(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,G(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,G(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function me(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let c=r.get(i.depthTexture);c.__renderTarget=i;let l=o?i.depthTexture.image[0]:i.depthTexture.image;c.__webglTexture&&l.width===i.width&&l.height===i.height||(l.width=i.width,l.height=i.height,i.depthTexture.needsUpdate=!0),o?ie(i.depthTexture,0):R(i.depthTexture,0);let u=c.__webglTexture,d=G(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)ve(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)ve(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function he(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)me(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?me(i.__webglFramebuffer[0],t,0):me(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),pe(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),pe(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function ge(t,n,i){let a=r.get(t);n!==void 0&&fe(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&he(t)}function H(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,O),T(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&ve(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=S(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=G(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),pe(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),se(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)fe(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else fe(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);y(i)?b(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),se(c,a),fe(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),y(a)&&b(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),se(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)fe(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else fe(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);y(i)?b(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&he(t)}function _e(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(y(a)&&a.mipmapsAutoUpdate===!0){let t=x(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),b(t),n.unbindTexture()}}}let U=[];function W(t){if(t.samples>0){if(ve(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(U.length=0,U.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&U.push(l),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,U))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function G(e){return Math.min(i.maxSamples,e.samples)}function ve(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function K(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function q(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(To.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&J(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):$a(`WebGLTextures: Unsupported texture color space:`,n)),t}function ye(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=te,this.resetTextureUnits=I,this.getTextureUnits=ee,this.setTextureUnits=L,this.setTexture2D=R,this.setTexture2DArray=re,this.setTexture3D=z,this.setTextureCube=ie,this.rebindTextures=ge,this.setupRenderTarget=H,this.updateRenderTargetMipmap=_e,this.updateMultisampleRenderTarget=W,this.setupDepthRenderbuffer=he,this.setupFrameBufferTexture=fe,this.useMultisampledRTT=ve,this.dispose=j}function hp(e,t){function n(n,r=``){let i,a=To.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var gp=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_p=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,vp=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ol(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new _l({vertexShader:gp,fragmentShader:_p,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Kc(new cl(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},yp=class extends ro{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new vp,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new go,C=null,w=null,T=new Jl;T.viewport=new Io;let E=new Jl;E.viewport=new Io;let D=[T,E],O=new eu,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new _s,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new _s,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new _s,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function M(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,M),r.removeEventListener(`inputsourceschange`,N);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,L.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&J(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&J(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,M),r.addEventListener(`inputsourceschange`,N),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?Vi:Bi,a=_.stencil?Pi:ki);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Ro(d.textureWidth,d.textureHeight,{format:zi,type:wi,depthTexture:new il(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Ro(f.framebufferWidth,f.framebufferHeight,{format:zi,type:wi,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),L.setContext(r),L.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function N(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}function P(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;P(O,i);for(let e=0;e<a.length;e++)P(a[e],i);O.projectionMatrix.copy(T.projectionMatrix),O.projectionMatrixInverse.copy(T.projectionMatrixInverse),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),F(e,O,i)};function F(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=oo*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let I=null;function ee(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new Jl,o.layers.enable(n),o.viewport=new Io,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new ol,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}I&&I(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let L=new gu;L.setAnimationLoop(ee),this.setAnimationLoop=function(e){I=e},this.dispose=function(){}}},bp=/*@__PURE__*/ new Vo,xp=/*@__PURE__*/ new bo;xp.set(-1,0,0,0,1,0,0,0,1);function Sp(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,pl(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(bp.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(xp),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Cp(e,t,n,r){let i={},a={};function o(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function s(e,n){let o=i[e.id];o===void 0&&(m(e),o=c(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let u=t.render.frame;a[e.id]!==u&&(l(e),a[e.id]=u)}function c(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function l(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)u(t[n],e,n,a);else u(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(t,n,r,i){if(f(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=h(i,!0);d(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else d(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function d(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function f(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)p(i[n],e,n)===!0&&(t=!0);return t}return p(i,r,a)}function p(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=h(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?J(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):J(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function g(t){let n=t.target;n.removeEventListener(`dispose`,g),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);i={},a={}}return{bind:o,update:s,dispose:_}}var wp=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Tp=null;function Ep(){return Tp===null&&(Tp=new Yc(wp,16,16,Wi,ji),Tp.name=`DFG_LUT`,Tp.minFilter=xi,Tp.magFilter=xi,Tp.wrapS=gi,Tp.wrapT=gi,Tp.generateMipmaps=!1,Tp.needsUpdate=!0),Tp}var Dp=class{constructor(e={}){let{canvas:t=Ya(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=wi}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=/* @__PURE__ */ new Set([Ki,Gi,Ui]),g=/* @__PURE__ */ new Set([wi,ki,Di,Pi,Mi,Ni]),_=/* @__PURE__ */ new Uint32Array(4),v=/* @__PURE__ */ new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=La;let j=0,M=0,N=null,P=-1,F=null,I=new Io,ee=new Io,L=null,te=new Ss(0),ne=0,R=t.width,re=t.height,z=1,ie=null,ae=null,oe=new Io(0,0,R,re),B=new Io(0,0,R,re),se=!1,ce=new $c,V=new tl,le=!1,ue=!1,de=new Vo,fe=new Y,pe=new Io,me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},he=!1;function ge(){return N===null?z:1}let H=n;function _e(e,n){return t.getContext(e,n)}let U,W,G,ve,K,q,ye,be,xe,Se,Ce,we,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,Re,!1),t.addEventListener(`webglcontextrestored`,ze,!1),t.addEventListener(`webglcontextcreationerror`,Be,!1),H===null){let t=`webgl2`;if(H=_e(t,e),H===null)throw _e(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}Ie()}catch(e){throw t.removeEventListener(`webglcontextlost`,Re,!1),t.removeEventListener(`webglcontextrestored`,ze,!1),t.removeEventListener(`webglcontextcreationerror`,Be,!1),$a(`WebGLRenderer: `+e.message),e}function Ie(){U=new Ku(H),U.init(),Ne=new hp(H,U),W=new Eu(H,U,e,Ne),G=new pp(H,U),W.reversedDepthBuffer&&d&&G.buffers.depth.setReversed(!0),O=H.createFramebuffer(),k=H.createFramebuffer(),A=H.createFramebuffer(),ve=new Yu(H),K=new qf,q=new mp(H,U,G,K,W,Ne,ve),ye=new Gu(T),be=new _u(H),Pe=new wu(H,be),xe=new qu(H,be,ve,Pe),Se=new Zu(H,xe,be,Pe,ve),Ae=new Xu(H,W,q),De=new Du(K),Ce=new Kf(T,ye,U,W,Pe,De),we=new Sp(T,K),Te=new Zf,Ee=new ip(U),ke=new Cu(T,ye,G,Se,p,s),Oe=new fp(T,Se,W),Fe=new Cp(H,ve,W,G),je=new Tu(H,U,ve),Me=new Ju(H,U,ve),ve.programs=Ce.programs,T.capabilities=W,T.extensions=U,T.properties=K,T.renderLists=Te,T.shadowMap=Oe,T.state=G,T.info=ve}m!==1009&&(w=new $u(m,t.width,t.height,o,r,i));let Le=new yp(T,H);this.xr=Le,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){let e=U.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=U.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(e){e!==void 0&&(z=e,this.setSize(R,re,!1))},this.getSize=function(e){return e.set(R,re)},this.setSize=function(e,n,r=!0){Le.isPresenting?J(`WebGLRenderer: Can't change size while VR device is presenting.`):(R=e,re=n,t.width=Math.floor(e*z),t.height=Math.floor(n*z),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(R*z,re*z).floor()},this.setDrawingBufferSize=function(e,n,r){R=e,re=n,z=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)$a(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){J(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(I)},this.getViewport=function(e){return e.copy(oe)},this.setViewport=function(e,t,n,r){e.isVector4?oe.set(e.x,e.y,e.z,e.w):oe.set(e,t,n,r),G.viewport(I.copy(oe).multiplyScalar(ge()).round())},this.getScissor=function(e){return e.copy(B)},this.setScissor=function(e,t,n,r){e.isVector4?B.set(e.x,e.y,e.z,e.w):B.set(e,t,n,r),G.scissor(ee.copy(B).multiplyScalar(ge()).round())},this.getScissorTest=function(){return se},this.setScissorTest=function(e){G.setScissorTest(se=e)},this.setOpaqueSort=function(e){ie=e},this.setTransparentSort=function(e){ae=e},this.getClearColor=function(e){return e.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor(...arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=h.has(t)}if(e){let e=N.texture.type,t=g.has(e),n=ke.getClearColor(),r=ke.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,H.clearBufferuiv(H.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,H.clearBufferiv(H.COLOR,0,v))}else r|=H.COLOR_BUFFER_BIT}t&&(r|=H.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&H.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Re,!1),t.removeEventListener(`webglcontextrestored`,ze,!1),t.removeEventListener(`webglcontextcreationerror`,Be,!1),ke.dispose(),Te.dispose(),Ee.dispose(),q.dispose(),K.dispose(),ye.dispose(),Se.dispose(),xe.dispose(),Pe.dispose(),Fe.dispose(),Ce.dispose(),Le.dispose(),Le.removeEventListener(`sessionstart`,qe),Le.removeEventListener(`sessionend`,Je),Ye.stop()};function Re(e){e.preventDefault(),Za(`WebGLRenderer: Context Lost.`),E=!0}function ze(){Za(`WebGLRenderer: Context Restored.`),E=!1;let e=ve.autoReset,t=Oe.enabled,n=Oe.autoUpdate,r=Oe.needsUpdate,i=Oe.type;Ie(),ve.autoReset=e,Oe.enabled=t,Oe.autoUpdate=n,Oe.needsUpdate=r,Oe.type=i}function Be(e){$a(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Ve(e){let t=e.target;t.removeEventListener(`dispose`,Ve),He(t)}function He(e){Ue(e),K.remove(e)}function Ue(e){let t=K.get(e).programs;t!==void 0&&(t.forEach(function(e){Ce.releaseProgram(e)}),e.isShaderMaterial&&Ce.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=me);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=ot(e,t,n,r,i);G.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=xe.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Pe.setup(i,r,s,n,c);let h,g=je;if(c!==null&&(h=be.get(c),g=Me,g.setIndex(h)),i.isMesh)r.wireframe===!0?(G.setLineWidth(r.wireframeLinewidth*ge()),g.setMode(H.LINES)):g.setMode(H.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),G.setLineWidth(e*ge()),i.isLineSegments?g.setMode(H.LINES):i.isLineLoop?g.setMode(H.LINE_LOOP):g.setMode(H.LINE_STRIP)}else i.isPoints?g.setMode(H.POINTS):i.isSprite&&g.setMode(H.TRIANGLES);if(i.isBatchedMesh){if(U.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?be.get(c).bytesPerElement:1,o=K.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(H,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function We(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),le===!0&&De.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,nt(e,t,r),e.side=0,e.needsUpdate=!0,nt(e,t,r),e.side=2):nt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Ee.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),ue=this.localClippingEnabled,le=De.init(this.clippingPlanes,ue),le===!0&&De.setGlobalState(this.clippingPlanes,t),D!==null&&Oe.render(x.state.shadowsArray,n,t);let r=/* @__PURE__ */ new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];We(o,n,t,e),r.add(o)}else We(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=K.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}U.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let Ge=null;function Ke(e){Ge&&Ge(e)}function qe(){Ye.stop()}function Je(){Ye.start()}let Ye=new gu;Ye.setAnimationLoop(Ke),typeof self<`u`&&Ye.setContext(self),this.setAnimationLoop=function(e){Ge=e,Le.setAnimationLoop(e),e===null?Ye.stop():Ye.start()},Le.addEventListener(`sessionstart`,qe),Le.addEventListener(`sessionend`,Je),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){$a(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Le.enabled===!0&&Le.isPresenting===!0,r=w!==null&&(N===null||n)&&w.begin(T,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Le.enabled===!0&&Le.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Le.cameraAutoUpdate===!0&&Le.updateCamera(t),t=Le.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,N),x=Ee.get(e,C.length),x.init(t),x.state.textureUnits=q.getTextureUnits(),C.push(x),de.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?V.setFromArrayCamera(t):ce.setFromProjectionMatrix(de,Ga,t.reversedDepth),ue=this.localClippingEnabled,le=De.init(this.clippingPlanes,ue),b=Te.get(e,S.length),b.init(),S.push(b),this.info.render.frame++,Le.enabled===!0&&Le.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&Xe(e,t,-1/0,T.sortObjects)}Xe(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(ie,ae),he=Le.enabled===!1||Le.isPresenting===!1||Le.hasDepthSensing()===!1,he&&ke.addToRenderList(b,e),this.info.autoReset===!0&&this.info.reset(),le===!0&&De.beginShadows();let i=x.state.shadowsArray;if(Oe.render(i,e,t),le===!0&&De.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];Qe(n,r,e,a)}he&&ke.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];Ze(b,e,n,n.viewport)}}else r.length>0&&Qe(n,r,e,t),he&&ke.render(e),Ze(b,e,t)}N!==null&&M===0&&(q.updateMultisampleRenderTarget(N),q.updateRenderTargetMipmap(N)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Pe.resetDefaultState(),P=-1,F=null,C.pop(),C.length>0?(x=C[C.length-1],q.setTextureUnits(x.state.textureUnits),le===!0&&De.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function Xe(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?V:ce;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&pe.setFromMatrixPosition(e.matrixWorld).applyMatrix4(de);let i=Se.update(e),a=e.material;a.visible&&b.push(e,i,a,n,pe.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?V:ce;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=Se.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),pe.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),pe.copy(e.boundingSphere.center)),pe.applyMatrix4(e.matrixWorld).applyMatrix4(de)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,pe.z,s,t)}}else a.visible&&b.push(e,i,a,n,pe.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)Xe(i[e],t,n,r)}function Ze(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),le===!0&&De.setGlobalState(T.clippingPlanes,n),r&&G.viewport(I.copy(r)),i.length>0&&$e(i,t,n),a.length>0&&$e(a,t,n),o.length>0&&$e(o,t,n),G.buffers.depth.setTest(!0),G.buffers.depth.setMask(!0),G.buffers.color.setMask(!0),G.setPolygonOffset(!1)}function Qe(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=U.has(`EXT_color_buffer_half_float`)||U.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Ro(1,1,{generateMipmaps:!0,type:e?ji:wi,minFilter:Ci,samples:Math.max(4,W.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:To.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||I;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(te),ne=T.getClearAlpha(),ne<1&&T.setClearColor(16777215,.5),T.clear(),he&&ke.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),le===!0&&De.setGlobalState(T.clippingPlanes,r),$e(e,n,r),q.updateMultisampleRenderTarget(a),q.updateRenderTargetMipmap(a),U.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,et(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(q.updateMultisampleRenderTarget(a),q.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(te,ne),d!==void 0&&(r.viewport=d),T.toneMapping=u}function $e(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&et(o,t,n,s,l,c)}}function et(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function tt(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function nt(e,t,n){t.isScene!==!0&&(t=me);let r=K.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Ce.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Ce.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=ye.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Ve),l=/* @__PURE__ */ new Map,r.programs=l,r.programVariants=/* @__PURE__ */ new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return at(e,s),d}else s.uniforms=Ce.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Ce.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=De.uniform),at(e,s),r.needsLights=ct(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=tt(x.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function rt(e,t,n,r,i){let a=K.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=nt(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function it(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=lf.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function at(e,t){let n=K.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function ot(e,t,n,r,i){t.isScene!==!0&&(t=me),q.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?T.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:To.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=ye.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=K.get(r),b=x.state.lights;if(le===!0&&(ue===!0||e!==F)){let t=e===F&&r.id===P;De.setState(r,e,t)}let S=!1,C=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==b.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?S=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==De.numPlanes||v.numIntersection!==De.numIntersection)?S=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===tt(x.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(C=!0):S=!0:S=!0:(S=!0,v.__version=r.version);let w=v.currentProgram;(S===!0||C===!0)&&(w=C===!0?rt(r,t,i,s,h):nt(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,w,v));let E=!1,O=!1,k=!1,A=w.getUniforms(),j=v.uniforms;if(G.useProgram(w.program)&&(E=!0,O=!0,k=!0),r.id!==P&&(P=r.id,O=!0),E||F!==e){G.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),A.setValue(H,`projectionMatrix`,e.projectionMatrix),A.setValue(H,`viewMatrix`,e.matrixWorldInverse);let t=A.map.cameraPosition;t!==void 0&&t.setValue(H,fe.setFromMatrixPosition(e.matrixWorld)),W.logarithmicDepthBuffer&&A.setValue(H,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&A.setValue(H,`isOrthographic`,e.isOrthographicCamera===!0),F!==e&&(F=e,O=!0,k=!0)}if(v.needsLights&&(b.state.sunShadowMap.length>0&&A.setValue(H,`sunShadowMap`,b.state.sunShadowMap,q),b.state.directionalShadowMap.length>0&&A.setValue(H,`directionalShadowMap`,b.state.directionalShadowMap,q),b.state.spotShadowMap.length>0&&A.setValue(H,`spotShadowMap`,b.state.spotShadowMap,q),b.state.pointShadowMap.length>0&&A.setValue(H,`pointShadowMap`,b.state.pointShadowMap,q)),i.isSkinnedMesh){A.setOptional(H,i,`bindMatrix`),A.setOptional(H,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),A.setValue(H,`boneTexture`,e.boneTexture,q))}i.isBatchedMesh&&(A.setOptional(H,i,`batchingTexture`),A.setValue(H,`batchingTexture`,i._matricesTexture,q),A.setOptional(H,i,`batchingIdTexture`),A.setValue(H,`batchingIdTexture`,i._indirectTexture,q),A.setOptional(H,i,`batchingColorTexture`),i._colorsTexture!==null&&A.setValue(H,`batchingColorTexture`,i._colorsTexture,q));let M=n.morphAttributes;if((M.position!==void 0||M.normal!==void 0||M.color!==void 0)&&Ae.update(i,n,w),(O||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,A.setValue(H,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(j.envMapIntensity.value=t.environmentIntensity),j.dfgLUT!==void 0&&(j.dfgLUT.value=Ep()),O){if(A.setValue(H,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&st(j,k),a&&r.fog===!0&&we.refreshFogUniforms(j,a),we.refreshMaterialUniforms(j,r,z,re,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=y,t=0;for(let n of x.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;j.probesSH.value=e.textures,j.probesMin.value=e.min,j.probesMax.value=e.max,j.probesResolution.value=e.resolution}lf.upload(H,it(v),j,q)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(lf.upload(H,it(v),j,q),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&A.setValue(H,`center`,i.center),A.setValue(H,`modelViewMatrix`,i.modelViewMatrix),A.setValue(H,`normalMatrix`,i.normalMatrix),A.setValue(H,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Fe.update(n,w),Fe.bind(n,w)}}return w}function st(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function ct(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=K.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),K.get(e.texture).__webglTexture=t,K.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=K.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,j=t,M=n;let r=null,i=!1,a=!1;if(e){let o=K.get(e);if(o.__useDefaultFramebuffer!==void 0){G.bindFramebuffer(H.FRAMEBUFFER,o.__webglFramebuffer),I.copy(e.viewport),ee.copy(e.scissor),L=e.scissorTest,G.viewport(I),G.scissor(ee),G.setScissorTest(L),P=-1;return}if(o.__webglFramebuffer===void 0)q.setupRenderTarget(e);else if(o.__hasExternalTextures)q.rebindTextures(e,K.get(e.texture).__webglTexture,K.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&K.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);q.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=K.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&q.useMultisampledRTT(e)===!1?K.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,I.copy(e.viewport),ee.copy(e.scissor),L=e.scissorTest}else I.copy(oe).multiplyScalar(z).floor(),ee.copy(B).multiplyScalar(z).floor(),L=se;if(n!==0&&(r=O),G.bindFramebuffer(H.FRAMEBUFFER,r)&&G.drawBuffers(e,r),G.viewport(I),G.scissor(ee),G.setScissorTest(L),i){let r=K.get(e.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=K.get(e.textures[t]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=K.get(e.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,t.__webglTexture,n)}P=-1};function lt(e){let t=K.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=W.textureFormatReadable(e.format),t.__typeReadable=W.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){$a(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=K.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){G.bindFramebuffer(H.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+s);let u=lt(o);if(u.__formatReadable===!1){$a(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){$a(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&H.readPixels(t,n,r,i,Ne.convert(c),Ne.convert(l),a)}finally{let e=N===null?null:K.get(N).__webglFramebuffer;G.bindFramebuffer(H.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=K.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){G.bindFramebuffer(H.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+s);let d=lt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,f),H.bufferData(H.PIXEL_PACK_BUFFER,a.byteLength,H.STREAM_READ),H.readPixels(t,n,r,i,Ne.convert(l),Ne.convert(u),0),H.bindBuffer(H.PIXEL_PACK_BUFFER,null);let p=N===null?null:K.get(N).__webglFramebuffer;G.bindFramebuffer(H.FRAMEBUFFER,p);let m=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await to(H,m,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,f),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,a),H.bindBuffer(H.PIXEL_PACK_BUFFER,null),H.deleteBuffer(f),H.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;q.setTexture2D(e,0),H.copyTexSubImage2D(H.TEXTURE_2D,n,0,0,o,s,i,a),G.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Ne.convert(t.format),_=Ne.convert(t.type),v;t.isData3DTexture?(q.setTexture3D(t,0),v=H.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(q.setTexture2DArray(t,0),v=H.TEXTURE_2D_ARRAY):(q.setTexture2D(t,0),v=H.TEXTURE_2D),G.activeTexture(H.TEXTURE0),G.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,t.flipY),G.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),G.pixelStorei(H.UNPACK_ALIGNMENT,t.unpackAlignment);let y=G.getParameter(H.UNPACK_ROW_LENGTH),b=G.getParameter(H.UNPACK_IMAGE_HEIGHT),x=G.getParameter(H.UNPACK_SKIP_PIXELS),S=G.getParameter(H.UNPACK_SKIP_ROWS),C=G.getParameter(H.UNPACK_SKIP_IMAGES);G.pixelStorei(H.UNPACK_ROW_LENGTH,h.width),G.pixelStorei(H.UNPACK_IMAGE_HEIGHT,h.height),G.pixelStorei(H.UNPACK_SKIP_PIXELS,l),G.pixelStorei(H.UNPACK_SKIP_ROWS,u),G.pixelStorei(H.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=K.get(e),r=K.get(t),h=K.get(n.__renderTarget),g=K.get(r.__renderTarget);G.bindFramebuffer(H.READ_FRAMEBUFFER,h.__webglFramebuffer),G.bindFramebuffer(H.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,K.get(e).__webglTexture,i,d+n),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,K.get(t).__webglTexture,a,m+n)),H.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,H.DEPTH_BUFFER_BIT,H.NEAREST);G.bindFramebuffer(H.READ_FRAMEBUFFER,null),G.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||K.has(e)){let n=K.get(e),r=K.get(t);G.bindFramebuffer(H.READ_FRAMEBUFFER,k),G.bindFramebuffer(H.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,n.__webglTexture,i),T?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,r.__webglTexture,a),i===0?T?H.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):H.copyTexSubImage2D(v,a,f,p,l,u,o,s):H.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,H.COLOR_BUFFER_BIT,H.NEAREST);G.bindFramebuffer(H.READ_FRAMEBUFFER,null),G.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?H.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?H.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):H.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):H.texSubImage2D(H.TEXTURE_2D,a,f,p,o,s,g,_,h);G.pixelStorei(H.UNPACK_ROW_LENGTH,y),G.pixelStorei(H.UNPACK_IMAGE_HEIGHT,b),G.pixelStorei(H.UNPACK_SKIP_PIXELS,x),G.pixelStorei(H.UNPACK_SKIP_ROWS,S),G.pixelStorei(H.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&H.generateMipmap(v),G.unbindTexture()},this.initRenderTarget=function(e){K.get(e).__webglFramebuffer===void 0&&q.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?q.setTextureCube(e,0):e.isData3DTexture?q.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?q.setTexture2DArray(e,0):q.setTexture2D(e,0),G.unbindTexture()},this.resetState=function(){j=0,M=0,N=null,G.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Ga}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=To._getDrawingBufferColorSpace(e),t.unpackColorSpace=To._getUnpackColorSpace()}},Op=e=>{let t=parseInt(e.slice(1),16);return[(t>>16&255)/255,(t>>8&255)/255,(t&255)/255]},kp=e=>{let[t,n,r]=Op(e),i=Math.round((.299*t+.587*n+.114*r)*255).toString(16).padStart(2,`0`);return`#${i}${i}${i}`},Ap=[[0,`#fbefe8`],[.56,`#fbefe8`],[.68,`#f5d9c6`],[.8,`#ecb28c`],[.91,`#e2874f`],[1,`#d9682f`]],Z={color:{panel:[0,0,0,1],amber:{base:`#FF7950`,deep:`#9E2208`,mid:`#FF5510`,hot:`#FF8A1C`,core:`#FFCB72`},titleAmber:Ap,titleHot:[`#ffe6c4`,`#ffda8c`,`#ffb45c`],titleGradient:Ap.map(([e,t])=>[e,kp(t)]),cardInk:`#f2f0ec`},chain:{card:{spacing:22,edgeSpacing:22,edgeReach:120,topoArea:23e4,margin:30,zone:170,maxGen:6,spread:.74,carry:.86,rate:.5,wake:[150,150,0,1.2],inkWarm:[.75,280,.45],delay:[.12,.28],release:[.9,1.7],refractory:[.9,1.5],attack:.2},title:{spacingEm:.2,marginEm:.16,zoneEm:1.1,maxGen:9,spread:.82,carry:.9,microEm:.095,rate:.9,delay:[.14,.32],release:[1.2,2.2],refractory:[.8,1.3],attack:.24},delay:[.05,.15],refractory:[.5,1],release:[.35,.8],attack:.07},type:{range:[1.6,2.4,.65,.75],rise:.45,fall:1.1},pointer:{radius:230,touchRadius:110,attack:.12,neighbour:.25,hoverRate:7,stillRate:2.4,moveRate:1/85,jitter:.32,enterBurst:5,proximityRate:3,sourceEvery:1.6},border:{bins:96,decay:3.2,reach:46},scroll:{band:.15,drift:42,fade:1.6},loading:{duration:1.8,hurry:3.2,ignite:.14},particles:{pool:180,curl:110,perSecond:16,spark:{size:[1.6,4.4],life:[.3,.65],speed:[40,110]},shard:{size:[3,12],life:[.9,1.5],speed:[45,125]}},cells:{card:21,titleEm:.075},bloom:{scale:.5,strength:.95},post:{shoulder:.84,streak:.2,vignette:.26,grain:.016,aberration:1.4},quality:{high:{dpr:2,bloom:!0,particles:1,cellScale:1},medium:{dpr:1.5,bloom:!0,particles:.6,cellScale:1.25},low:{dpr:1,bloom:!1,particles:.35,cellScale:1.6}},slowFrame:30,focus:{ink:.18,frame:.22,photo:.55}},jp=()=>Z.color.titleAmber.flatMap(([,e])=>{let[t,n,r]=Op(e);return[t,n,r,Math.round((.299*t+.587*n+.114*r)*255)/255]}),Mp=()=>{let e=e=>Op(e).reduce((e,t)=>e+t,0)/3,t=Z.color.titleGradient;return[e(t[t.length-1][1]),e(t[0][1])]};function Np(e,t,n,r){let i=Math.min(n,Math.max(0,e)),a=Math.min(r,Math.max(0,t)),o=a,s=n-i,c=r-a,l=Math.min(o,s,c,i),u=l===o?i:l===s?n+a:l===c?n+r+(n-i):2*n+r+(r-a),d=Math.hypot(e-i,t-a);return[u/(2*(n+r)),d>0?d:l]}var Pp=class{bins=new Float32Array(Z.border.bins);level=0;tmp=new Float32Array(Z.border.bins);decay(e){let t=Math.exp(-e*Z.border.decay);for(let e=0;e<this.bins.length;e++)this.bins[e]*=t}add(e,t,n=1.5){let r=this.bins.length,i=e*r,a=Math.ceil(n*2);for(let e=-a;e<=a;e++){let a=((Math.round(i)+e)%r+r)%r,o=t*Math.exp(-(e*e)/(n*n));o>this.bins[a]&&(this.bins[a]=o)}}settle(){let e=this.bins,t=this.tmp,n=e.length,r=0;for(let r=0;r<n;r++)t[r]=Math.max(e[r],.46*(e[(r+n-1)%n]+e[(r+1)%n]));for(let i=0;i<n;i++){let n=Math.min(1.2,t[i]);e[i]=n<.004?0:n,n>r&&(r=n)}this.level=r}},Fp=e=>Math.min(1,Math.max(0,e)),Ip=(e,t,n)=>{let r=Fp((n-e)/(t-e));return r*r*(3-2*r)},Lp=e=>e-Math.floor(e);function Rp(e,t,n){return{top:Fp(e/n),bottom:Fp((t-e)/n)}}function zp(e,t){let n=Lp(e*.1031),r=Lp(t*.1031),i=Lp(e*.1031),a=n*(r+33.33)+r*(i+33.33)+i*(n+33.33);return n+=a,r+=a,i+=a,Lp((n+r)*i)}function Bp(e,t){let n=Math.floor(e),r=Math.floor(t),i=e-n,a=t-r;i=i*i*(3-2*i),a=a*a*(3-2*a);let o=zp(n,r),s=zp(n+1,r),c=zp(n,r+1),l=zp(n+1,r+1);return o+(s-o)*i+(c-o)*a+(o-s-c+l)*i*a}function Vp(e,t,n){return Fp((n+(Bp(e/250+3.7,t/250+3.7)-n)*.64)*1.16-.08)}var Hp=e=>Math.log(50)/e,Up=(e,t,n)=>e+(t-e)*n,Wp=class{net;profile;rnd;raw;shown;refract;rate;pending;vsum;queue=[];time=0;drive;driveLevel=0;level=0;propagate=!0;onIgnite;constructor(e,t,n=Math.random){this.net=e,this.profile=t,this.rnd=n;let r=e.faces,i=Z.chain;this.raw=new Float32Array(r),this.shown=new Float32Array(r),this.drive=new Float32Array(r),this.refract=new Float32Array(r),this.pending=new Uint8Array(r),this.rate=new Float32Array(r);let a=t.release??i.release;for(let t=0;t<r;t++)this.rate[t]=Hp(Up(a[0],a[1],e.seed[t]));this.vsum=new Float32Array(e.points)}get active(){return this.queue.length>0||this.level>.003||this.driveLevel>.003}ignite(e,t,n=0,r=0){e<0||this.pending[e]||t<.03||(this.pending[e]=1,this.queue.push({cell:e,at:this.time+r,s:Math.min(1,t),gen:n}))}nearest(e,t){let{cx:n,cy:r,weight:i,faces:a}=this.net,o=-1,s=1/0;for(let c=0;c<a;c++){let a=i[c];if(a<=0)continue;let l=n[c]-e,u=r[c]-t,d=(l*l+u*u)/(.15+.85*a);d<s&&(s=d,o=c)}return o}igniteAt(e,t,n,r,i=0){let a=n*Math.sqrt(-2*Math.log(1-this.rnd()*.999))*.6,o=this.rnd()*6.283;this.ignite(this.nearest(e+Math.cos(o)*a,t+Math.sin(o)*a),r,i)}quench(){for(let e of this.queue)this.pending[e.cell]=0;this.queue.length=0}step(e){this.time+=e;let{nbStart:t,nb:n,cond:r}=this.net,i=Z.chain,a=this.profile,o=this.rnd,s=a.delay??i.delay;if(this.queue.length){let e=[];this.queue=this.queue.filter(t=>t.at<=this.time?(e.push(t),!1):!0);for(let c of e){let e=c.cell;if(this.pending[e]=0,this.refract[e]>0)continue;let l=c.s*(.5+.5*r[e]);if(l<.03)continue;this.raw[e]=Math.max(this.raw[e],l);let u=a.refractory??i.refractory;if(this.refract[e]=Up(u[0],u[1],o()),this.onIgnite?.(e,l,c.gen),!(!this.propagate||c.gen>=a.maxGen))for(let i=t[e];i<t[e+1];i++){let e=n[i];this.refract[e]>0||this.pending[e]||o()<a.spread*r[e]*(.55+.45*l)&&this.ignite(e,l*a.carry,c.gen+1,Up(s[0],s[1],o()))}}}let c=1-Math.exp(-e/(a.attack??i.attack)),l=0;for(let t=0;t<this.raw.length;t++){let n=this.raw[t];n>0&&(n*=Math.exp(-e*this.rate[t]),n<.01&&(n=0),this.raw[t]=n),this.refract[t]>0&&(this.refract[t]-=e);let r=this.shown[t];r=n>r?r+(n-r)*c:n,this.shown[t]=r,r>l&&(l=r)}this.level=l}write(e){let{vertexOf:t,pfStart:n,pf:r,points:i,faces:a}=this.net,o=this.vsum,s=this.shown,c=this.drive,l=e=>s[e]>c[e]?s[e]:c[e];for(let e=0;e<i;e++){let t=0,i=0;for(let a=n[e];a<n[e+1];a++){let e=l(r[a]);t+=e,e>i&&(i=e)}let a=n[e+1]-n[e];o[e]=a?t/a*.6+i*.4:0}for(let n=0;n<a;n++)for(let r=0;r<3;r++){let i=(n*3+r)*2;e[i]=l(n),e[i+1]=o[t[n*3+r]]}}},Gp=11102230246251565e-32,Kp=134217729,qp=3.000000000000001*Gp;function Jp(e,t,n,r,i){let a,o,s,c,l=t[0],u=r[0],d=0,f=0;u>l==u>-l?(a=l,l=t[++d]):(a=u,u=r[++f]);let p=0;if(d<e&&f<n)for(u>l==u>-l?(o=l+a,s=a-(o-l),l=t[++d]):(o=u+a,s=a-(o-u),u=r[++f]),a=o,s!==0&&(i[p++]=s);d<e&&f<n;)u>l==u>-l?(o=a+l,c=o-a,s=a-(o-c)+(l-c),l=t[++d]):(o=a+u,c=o-a,s=a-(o-c)+(u-c),u=r[++f]),a=o,s!==0&&(i[p++]=s);for(;d<e;)o=a+l,c=o-a,s=a-(o-c)+(l-c),l=t[++d],a=o,s!==0&&(i[p++]=s);for(;f<n;)o=a+u,c=o-a,s=a-(o-c)+(u-c),u=r[++f],a=o,s!==0&&(i[p++]=s);return(a!==0||p===0)&&(i[p++]=a),p}function Yp(e,t){let n=t[0];for(let r=1;r<e;r++)n+=t[r];return n}function Q(e){return new Float64Array(e)}var Xp=(3+16*Gp)*Gp,Zp=(2+12*Gp)*Gp,Qp=(9+64*Gp)*Gp*Gp,$p=Q(4),em=Q(8),tm=Q(12),nm=Q(16),rm=Q(4);function im(e,t,n,r,i,a,o){let s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T=e-i,E=n-i,D=t-a,O=r-a;b=T*O,f=Kp*T,p=f-(f-T),m=T-p,f=Kp*O,h=f-(f-O),g=O-h,x=m*g-(b-p*h-m*h-p*g),S=D*E,f=Kp*D,p=f-(f-D),m=D-p,f=Kp*E,h=f-(f-E),g=E-h,C=m*g-(S-p*h-m*h-p*g),_=x-C,d=x-_,$p[0]=x-(_+d)+(d-C),v=b+_,d=v-b,y=b-(v-d)+(_-d),_=y-S,d=y-_,$p[1]=y-(_+d)+(d-S),w=v+_,d=w-v,$p[2]=v-(w-d)+(_-d),$p[3]=w;let k=Yp(4,$p),A=Zp*o;if(k>=A||-k>=A||(d=e-T,s=e-(T+d)+(d-i),d=n-E,l=n-(E+d)+(d-i),d=t-D,c=t-(D+d)+(d-a),d=r-O,u=r-(O+d)+(d-a),s===0&&c===0&&l===0&&u===0)||(A=Qp*o+qp*Math.abs(k),k+=T*u+O*s-(D*l+E*c),k>=A||-k>=A))return k;b=s*O,f=Kp*s,p=f-(f-s),m=s-p,f=Kp*O,h=f-(f-O),g=O-h,x=m*g-(b-p*h-m*h-p*g),S=c*E,f=Kp*c,p=f-(f-c),m=c-p,f=Kp*E,h=f-(f-E),g=E-h,C=m*g-(S-p*h-m*h-p*g),_=x-C,d=x-_,rm[0]=x-(_+d)+(d-C),v=b+_,d=v-b,y=b-(v-d)+(_-d),_=y-S,d=y-_,rm[1]=y-(_+d)+(d-S),w=v+_,d=w-v,rm[2]=v-(w-d)+(_-d),rm[3]=w;let j=Jp(4,$p,4,rm,em);b=T*u,f=Kp*T,p=f-(f-T),m=T-p,f=Kp*u,h=f-(f-u),g=u-h,x=m*g-(b-p*h-m*h-p*g),S=D*l,f=Kp*D,p=f-(f-D),m=D-p,f=Kp*l,h=f-(f-l),g=l-h,C=m*g-(S-p*h-m*h-p*g),_=x-C,d=x-_,rm[0]=x-(_+d)+(d-C),v=b+_,d=v-b,y=b-(v-d)+(_-d),_=y-S,d=y-_,rm[1]=y-(_+d)+(d-S),w=v+_,d=w-v,rm[2]=v-(w-d)+(_-d),rm[3]=w;let M=Jp(j,em,4,rm,tm);return b=s*u,f=Kp*s,p=f-(f-s),m=s-p,f=Kp*u,h=f-(f-u),g=u-h,x=m*g-(b-p*h-m*h-p*g),S=c*l,f=Kp*c,p=f-(f-c),m=c-p,f=Kp*l,h=f-(f-l),g=l-h,C=m*g-(S-p*h-m*h-p*g),_=x-C,d=x-_,rm[0]=x-(_+d)+(d-C),v=b+_,d=v-b,y=b-(v-d)+(_-d),_=y-S,d=y-_,rm[1]=y-(_+d)+(d-S),w=v+_,d=w-v,rm[2]=v-(w-d)+(_-d),rm[3]=w,nm[Jp(M,tm,4,rm,nm)-1]}function am(e,t,n,r,i,a){let o=(t-a)*(n-i),s=(e-i)*(r-a),c=o-s,l=Math.abs(o+s);return Math.abs(c)>=Xp*l?c:-im(e,t,n,r,i,a,l)}Q(4),Q(4),Q(4),Q(4),Q(4),Q(4),Q(4),Q(4),Q(4),Q(8),Q(8),Q(8),Q(4),Q(8),Q(8),Q(16),Q(12),Q(192),Q(192),Q(4),Q(4),Q(4),Q(4),Q(4),Q(4),Q(4),Q(4),Q(8),Q(8),Q(8),Q(8),Q(8),Q(8),Q(8),Q(8),Q(8),Q(4),Q(4),Q(4),Q(8),Q(16),Q(16),Q(16),Q(32),Q(32),Q(48),Q(64),Q(1152),Q(1152),Q(4),Q(4),Q(4),Q(4),Q(4),Q(4),Q(4),Q(4),Q(4),Q(4),Q(24),Q(24),Q(24),Q(24),Q(24),Q(24),Q(24),Q(24),Q(24),Q(24),Q(1152),Q(1152),Q(1152),Q(1152),Q(1152),Q(2304),Q(2304),Q(3456),Q(5760),Q(8),Q(8),Q(8),Q(16),Q(24),Q(48),Q(48),Q(96),Q(192),Q(384),Q(384),Q(384),Q(768),Q(96),Q(96),Q(96),Q(1152);var om=2**-52,sm=/* @__PURE__ */ new Uint32Array(512),cm=class e{static from(t,n=gm,r=_m){let i=t.length,a=new Float64Array(i*2);for(let e=0;e<i;e++){let i=t[e];a[2*e]=n(i),a[2*e+1]=r(i)}return new e(a)}constructor(e){let t=e.length>>1;if(t>0&&typeof e[0]!=`number`)throw Error(`Expected coords to contain numbers.`);this.coords=e;let n=Math.max(2*t-5,0);this._triangles=new Uint32Array(n*3),this._halfedges=new Int32Array(n*3),this._hashSize=Math.ceil(Math.sqrt(t)),this._hullPrev=new Uint32Array(t),this._hullNext=new Uint32Array(t),this._hullTri=new Uint32Array(t),this._hullHash=new Int32Array(this._hashSize),this._ids=new Uint32Array(t),this._dists=new Float64Array(t),this.trianglesLen=0,this._cx=0,this._cy=0,this._hullStart=0,this.hull=this._triangles,this.triangles=this._triangles,this.halfedges=this._halfedges,this.update()}update(){let{coords:e,_hullPrev:t,_hullNext:n,_hullTri:r,_hullHash:i}=this,a=e.length>>1,o=1/0,s=1/0,c=-1/0,l=-1/0;for(let t=0;t<a;t++){let n=e[2*t],r=e[2*t+1];n<o&&(o=n),r<s&&(s=r),n>c&&(c=n),r>l&&(l=r),this._ids[t]=t}let u=(o+c)/2,d=(s+l)/2,f=0,p=0,m=0;for(let t=0,n=1/0;t<a;t++){let r=um(u,d,e[2*t],e[2*t+1]);r<n&&(f=t,n=r)}let h=e[2*f],g=e[2*f+1];for(let t=0,n=1/0;t<a;t++){if(t===f)continue;let r=um(h,g,e[2*t],e[2*t+1]);r<n&&r>0&&(p=t,n=r)}let _=e[2*p],v=e[2*p+1],y=1/0;for(let t=0;t<a;t++){if(t===f||t===p)continue;let n=fm(h,g,_,v,e[2*t],e[2*t+1]);n<y&&(m=t,y=n)}let b=e[2*m],x=e[2*m+1];if(y===1/0){for(let t=0;t<a;t++)this._dists[t]=e[2*t]-e[0]||e[2*t+1]-e[1];mm(this._ids,this._dists,0,a-1);let t=new Uint32Array(a),n=0;for(let e=0,r=-1/0;e<a;e++){let i=this._ids[e],a=this._dists[i];a>r&&(t[n++]=i,r=a)}this.hull=t.subarray(0,n),this.triangles=/* @__PURE__ */ new Uint32Array,this.halfedges=/* @__PURE__ */ new Int32Array;return}if(am(h,g,_,v,b,x)<0){let e=p,t=_,n=v;p=m,_=b,v=x,m=e,b=t,x=n}let S=pm(h,g,_,v,b,x);this._cx=S.x,this._cy=S.y;for(let t=0;t<a;t++)this._dists[t]=um(e[2*t],e[2*t+1],S.x,S.y);mm(this._ids,this._dists,0,a-1),this._hullStart=f;let C=3;n[f]=t[m]=p,n[p]=t[f]=m,n[m]=t[p]=f,r[f]=0,r[p]=1,r[m]=2,i.fill(-1),i[this._hashKey(h,g)]=f,i[this._hashKey(_,v)]=p,i[this._hashKey(b,x)]=m,this.trianglesLen=0,this._addTriangle(f,p,m,-1,-1,-1);for(let a=0,o=0,s=0;a<this._ids.length;a++){let c=this._ids[a],l=e[2*c],u=e[2*c+1];if(a>0&&Math.abs(l-o)<=om&&Math.abs(u-s)<=om||(o=l,s=u,c===f||c===p||c===m))continue;let d=0;for(let e=0,t=this._hashKey(l,u);e<this._hashSize&&(d=i[(t+e)%this._hashSize],d===-1||d===n[d]);e++);d=t[d];let h=d,g;for(;g=n[h],am(l,u,e[2*h],e[2*h+1],e[2*g],e[2*g+1])>=0;)if(h=g,h===d){h=-1;break}if(h===-1)continue;let _=this._addTriangle(h,c,n[h],-1,-1,r[h]);r[c]=this._legalize(_+2),r[h]=_,C++;let v=n[h];for(;g=n[v],am(l,u,e[2*v],e[2*v+1],e[2*g],e[2*g+1])<0;)_=this._addTriangle(v,c,g,r[c],-1,r[v]),r[c]=this._legalize(_+2),n[v]=v,C--,v=g;if(h===d)for(;g=t[h],am(l,u,e[2*g],e[2*g+1],e[2*h],e[2*h+1])<0;)_=this._addTriangle(g,c,h,-1,r[h],r[g]),this._legalize(_+2),r[g]=_,n[h]=h,C--,h=g;this._hullStart=t[c]=h,n[h]=t[v]=c,n[c]=v,i[this._hashKey(l,u)]=c,i[this._hashKey(e[2*h],e[2*h+1])]=h}this.hull=new Uint32Array(C);for(let e=0,t=this._hullStart;e<C;e++)this.hull[e]=t,t=n[t];this.triangles=this._triangles.subarray(0,this.trianglesLen),this.halfedges=this._halfedges.subarray(0,this.trianglesLen)}_hashKey(e,t){return Math.floor(lm(e-this._cx,t-this._cy)*this._hashSize)%this._hashSize}_legalize(e){let{_triangles:t,_halfedges:n,coords:r}=this,i=0,a=0;for(;;){let o=n[e],s=e-e%3;if(a=s+(e+2)%3,o===-1){if(i===0)break;e=sm[--i];continue}let c=o-o%3,l=s+(e+1)%3,u=c+(o+2)%3,d=t[a],f=t[e],p=t[l],m=t[u];if(dm(r[2*d],r[2*d+1],r[2*f],r[2*f+1],r[2*p],r[2*p+1],r[2*m],r[2*m+1])){t[e]=m,t[o]=d;let r=n[u];if(r===-1){let t=this._hullStart;do{if(this._hullTri[t]===u){this._hullTri[t]=e;break}t=this._hullPrev[t]}while(t!==this._hullStart)}this._link(e,r),this._link(o,n[a]),this._link(a,u);let s=c+(o+1)%3;i<sm.length&&(sm[i++]=s)}else{if(i===0)break;e=sm[--i]}}return a}_link(e,t){this._halfedges[e]=t,t!==-1&&(this._halfedges[t]=e)}_addTriangle(e,t,n,r,i,a){let o=this.trianglesLen;return this._triangles[o]=e,this._triangles[o+1]=t,this._triangles[o+2]=n,this._link(o,r),this._link(o+1,i),this._link(o+2,a),this.trianglesLen+=3,o}};function lm(e,t){let n=e/(Math.abs(e)+Math.abs(t));return(t>0?3-n:1+n)/4}function um(e,t,n,r){let i=e-n,a=t-r;return i*i+a*a}function dm(e,t,n,r,i,a,o,s){let c=e-o,l=t-s,u=n-o,d=r-s,f=i-o,p=a-s,m=c*c+l*l,h=u*u+d*d,g=f*f+p*p;return c*(d*g-h*p)-l*(u*g-h*f)+m*(u*p-d*f)<0}function fm(e,t,n,r,i,a){let o=n-e,s=r-t,c=i-e,l=a-t,u=o*o+s*s,d=c*c+l*l,f=.5/(o*l-s*c),p=(l*u-s*d)*f,m=(o*d-c*u)*f;return p*p+m*m}function pm(e,t,n,r,i,a){let o=n-e,s=r-t,c=i-e,l=a-t,u=o*o+s*s,d=c*c+l*l,f=.5/(o*l-s*c);return{x:e+(l*u-s*d)*f,y:t+(o*d-c*u)*f}}function mm(e,t,n,r){if(r-n<=20)for(let i=n+1;i<=r;i++){let r=e[i],a=t[r],o=i-1;for(;o>=n&&t[e[o]]>a;)e[o+1]=e[o--];e[o+1]=r}else{let i=n+r>>1,a=n+1,o=r;hm(e,i,a),t[e[n]]>t[e[r]]&&hm(e,n,r),t[e[a]]>t[e[r]]&&hm(e,a,r),t[e[n]]>t[e[a]]&&hm(e,n,a);let s=e[a],c=t[s];for(;;){do a++;while(t[e[a]]<c);do o--;while(t[e[o]]>c);if(o<a)break;hm(e,a,o)}e[n+1]=e[o],e[o]=s,r-a+1>=o-n?(mm(e,t,a,r),mm(e,t,n,o-1)):(mm(e,t,n,o-1),mm(e,t,a,r))}}function hm(e,t,n){let r=e[t];e[t]=e[n],e[n]=r}function gm(e){return e[0]}function _m(e){return e[1]}function vm(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var ym=e=>{let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0};function bm(e,t,n){let r=(e,t)=>{let r=Math.imul(e,374761393)+Math.imul(t,668265263)+Math.imul(n,2246822519)|0;return r=Math.imul(r^r>>>13,1274126177),((r^r>>>16)>>>0)/4294967296},i=Math.floor(e),a=Math.floor(t),o=e-i,s=t-a;o=o*o*(3-2*o),s=s*s*(3-2*s);let c=r(i,a),l=r(i+1,a),u=r(i,a+1),d=r(i+1,a+1);return c+(l-c)*o+(u-c)*s+(c-l-u+d)*o*s}function xm(e,t,n){let r=/* @__PURE__ */ new Map,i=Array.from({length:t},()=>[]);for(let n=0;n<t;n++)for(let t=0;t<3;t++){let a=e[n*3+t],o=e[n*3+(t+1)%3],s=Math.min(a,o)*1048576+Math.max(a,o),c=r.get(s);c===void 0?r.set(s,n):(i[n].push(c),i[c].push(n),r.delete(s))}let a=new Uint32Array(t+1);for(let e=0;e<t;e++)a[e+1]=a[e]+i[e].length;let o=new Uint32Array(a[t]);i.forEach((e,t)=>o.set(e,a[t]));let s=new Uint32Array(n+1);for(let n=0;n<t*3;n++)s[e[n]+1]++;for(let e=0;e<n;e++)s[e+1]+=s[e];let c=new Uint32Array(t*3),l=s.slice(0,n);for(let n=0;n<t*3;n++)c[l[e[n]]++]=Math.floor(n/3);return{nbStart:a,nb:o,pfStart:s,pf:c,open:r.size}}function Sm(e,t,n,r,i,a,o){let s=vm(a),c=-r,l=-r,u=e+r*2,d=t+r*2,f=[],p=o?Math.min(n,o.spacing):n,m=e=>Math.max(1,Math.round(e/(p*(o?1.6:.85)))),h=m(u),g=m(d);for(let e=0;e<=h;e++){let t=c+u*e/h;f.push(t,l,t,l+d)}for(let e=1;e<g;e++){let t=l+d*e/g;f.push(c,t,c+u,t)}let _=(n,r)=>{if(!o)return 0;let i=Math.min(Math.abs(n),Math.abs(r),Math.abs(e-n),Math.abs(t-r));return 1-Ip(0,o.reach,i)},v=p*.62;for(let e=l+v*.5;e<l+d-v*.4;e+=v)for(let t=c+v*.5;t<c+u-v*.4;t+=v){let r=bm(t/(n*3.1),e/(n*3.1),a),i=(.4+.6*r)*.74;if(o){let s=_(t,e),c=o.spacing+(n-o.spacing)*(1-s)*(.75+.5*bm(t/90+3.3,e/90-1.7,a^40503));i=Math.min(1,(v/c)**2*(.6+.6*r))}s()<i&&f.push(t+(s()-.5)*v*.9,e+(s()-.5)*v*.9)}let y=new cm(Float64Array.from(f)).triangles,b=y.length/3,x=f.length/2,S=xm(y,b,x),C=new Float32Array(b*6),w=new Float32Array(b*12),T=new Uint32Array(b*3),E=new Float32Array(b),D=new Float32Array(b),O=new Float32Array(b),k=new Float32Array(b),A=new Float32Array(b),j=new Float32Array(b);for(let n=0;n<b;n++){let r=0,o=0;for(let e=0;e<3;e++){let t=y[n*3+e];C[(n*3+e)*2]=f[t*2],C[(n*3+e)*2+1]=f[t*2+1],T[n*3+e]=t,r+=f[t*2],o+=f[t*2+1]}E[n]=r/3,D[n]=o/3,O[n]=s(),A[n]=Ip(.3,.7,bm(E[n]/i+11.3,D[n]/i-4.1,a^23505)),k[n]=A[n];let c=E[n]>=0&&D[n]>=0&&E[n]<=e&&D[n]<=t;j[n]=+!!c;let l=Math.floor(s()*3),u=_(E[n],D[n]);for(let e=0;e<3;e++)w.set([O[n],A[n],l,u],(n*3+e)*4)}return{faces:b,points:x,position:C,cell:w,cx:E,cy:D,seed:O,cond:k,zone:A,weight:j,vertexOf:T,nbStart:S.nbStart,nb:S.nb,pfStart:S.pfStart,pf:S.pf}}var Cm=class{present=!1;touch=!1;x=-9999;y=-9999;speed=0;dirX=0;dirY=0;still=0;lastX=-9999;lastY=-9999;get radius(){return this.touch?Z.pointer.touchRadius:Z.pointer.radius}move(e,t,n){this.x=e,this.y=t,this.present=!0,this.touch=n}leave(){this.present=!1}cancel(){this.present=!1,this.speed=0}update(e){if(this.present){let t=this.x-this.lastX,n=this.y-this.lastY,r=Math.hypot(t,n),i=this.lastX<-9e3||e<=0?0:r/e;this.speed+=(i-this.speed)*(1-Math.exp(-e*14)),r>.5?(this.dirX=t/r,this.dirY=n/r,this.still=0):this.still+=e}else this.speed*=Math.exp(-e*10);this.lastX=this.present?this.x:-9999,this.lastY=this.y}},wm=12,Tm=(e,t)=>e+Math.random()*(t-e);function Em(e,t,n){let r=.011,i=.017;n[0]=-Math.sin(r*e)*Math.sin(r*t)*r-.5*Math.sin(i*e+1.7)*Math.sin(i*t-.6)*i,n[1]=-(Math.cos(r*e)*Math.cos(r*t)*r+.5*Math.cos(i*e+1.7)*Math.cos(i*t-.6)*i),n[0]*=60,n[1]*=60}var Dm=class{state=new Float32Array(Z.particles.pool*wm);gpu=new Float32Array(Z.particles.pool*7);opacity=new Float32Array(Z.particles.pool);count=0;limit=Z.particles.pool;v=[0,0];spawn(e,t,n,r,i,a=-1){if(this.count>=this.limit)return!1;let o=this.count++,s=o*wm,c=this.state,l=Z.particles[e];return c[s]=t,c[s+1]=n,c[s+2]=r,c[s+3]=i,c[s+4]=Tm(l.size[0],l.size[1]),c[s+5]=Tm(0,6.28),c[s+6]=Tm(-3,3)*(e===`shard`?.4:1),c[s+7]=1,c[s+8]=Tm(l.life[0],l.life[1]),c[s+9]=Math.random()<.5?-1:1,c[s+10]=Math.random(),c[s+11]=a,this.opacity[o]=e===`shard`?Tm(.35,.8):1,!0}each(e){let t=this.state;for(let n=0;n<this.count;n++){let r=n*wm;e(t[r],t[r+1],t[r+7],this.opacity[n],t[r+11])}}step(e){let t=this.state,n=this.v,r=Z.particles.curl;for(let i=this.count-1;i>=0;i--){let a=i*wm;if(t[a+7]-=e/t[a+8],t[a+7]<=0){let e=--this.count;e!==i&&(t.copyWithin(a,e*wm,e*wm+wm),this.opacity[i]=this.opacity[e]);continue}Em(t[a],t[a+1],n),t[a+2]+=n[0]*t[a+9]*r*e,t[a+3]+=n[1]*t[a+9]*r*e;let o=Math.exp(-e*1.6);t[a+2]*=o,t[a+3]*=o,t[a]+=t[a+2]*e,t[a+1]+=t[a+3]*e,t[a+5]+=t[a+6]*e}let i=this.gpu;for(let e=0;e<this.count;e++){let n=e*wm,r=e*7;i[r]=t[n],i[r+1]=t[n+1],i[r+2]=t[n+4]*(.55+.45*t[n+7]),i[r+3]=t[n+5],i[r+4]=t[n+7],i[r+5]=t[n+10],i[r+6]=this.opacity[e]}}clear(){this.count=0}},Om=0x56bc75e2d63100000;function km(e,t,n,r,i,a,o){a[0]=0,o[0]=-0x56bc75e2d63100000,o[1]=Om,i[0]=e[t];for(let s=1,c=0,l=0;s<r;s++){i[s]=e[t+s*n];let r=s*s;do{let e=a[c];l=(i[s]-i[e]+r-e*e)/(s-e)/2}while(l<=o[c]&&--c>-1);c++,a[c]=s,o[c]=l,o[c+1]=Om}for(let s=0,c=0;s<r;s++){for(;o[c+1]<s;)c++;let r=a[c],l=s-r;e[t+s*n]=i[r]+l*l}}function Am(e,t,n){let r=Math.max(t,n),i=new Float64Array(r),a=new Uint32Array(r),o=new Float64Array(r+1);for(let r=0;r<t;r++)km(e,r,t,n,i,a,o);for(let r=0;r<n;r++)km(e,r*t,1,t,i,a,o)}function jm(e,t,n,r=1,i=0){let a=new Float64Array(t*n),o=new Float64Array(t*n);for(let s=0;s<t*n;s++){let t=e[s*r+i]/255;if(t>=.999)a[s]=0,o[s]=Om;else if(t<=.001)a[s]=Om,o[s]=0;else{let e=.5-t;a[s]=e>0?e*e:0,o[s]=e<0?e*e:0}}Am(a,t,n),Am(o,t,n);let s=new Float32Array(t*n);for(let e=0;e<t*n;e++)s[e]=Math.sqrt(a[e])-Math.sqrt(o[e]);return s}function Mm(e,t,n){let r=new Uint8Array(e.length);for(let i=0;i<e.length;i++)r[i]=Math.max(0,Math.min(255,Math.round(255*(.5+e[i]*t/(2*n)))));return r}function Nm(e){let t=/rgba?\(([^)]+)\)/.exec(e);if(!t)return;let n=t[1].split(/[,/ ]+/).filter(Boolean).map(Number);return n.length>=3?`rgb(${n[0]},${n[1]},${n[2]})`:void 0}function Pm(e,t){let n=e.cloneNode(!0),r=e.getBoundingClientRect();n.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),n.setAttribute(`width`,String(Math.max(1,Math.round(r.width)))),n.setAttribute(`height`,String(Math.max(1,Math.round(r.height))));let i=e=>e===`none`?`none`:`#fff`;return n.setAttribute(`fill`,i(t.fill)),n.setAttribute(`stroke`,i(t.stroke)),n.setAttribute(`stroke-width`,t.strokeWidth),n.setAttribute(`stroke-linecap`,t.strokeLinecap),n.setAttribute(`stroke-linejoin`,t.strokeLinejoin),`data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(n))}`}var Fm=`.faq-item:not(:last-child), .legal-group button`,Im=/* @__PURE__ */ new Map,Lm=null,Rm=/* @__PURE__ */ new Map;function zm(e){let t=/rgba?\(([^)]+)\)/.exec(e);if(!t)return 1;let n=t[1].split(/[,/ ]+/).filter(Boolean).map(Number);return n.length>3?n[3]:1}function Bm(e){let t=Im.get(e);return t||(t=new Promise(t=>{let n=new Image;n.crossOrigin=`anonymous`,n.onload=()=>t(n),n.onerror=()=>t(null),n.src=e}),Im.set(e,t)),t}function Vm(e,t={}){Lm??=document.createElement(`canvas`).getContext(`2d`);let n=[],r=e.getBoundingClientRect(),i=/* @__PURE__ */ new Map,a=e=>{let t=i.get(e);return t||(t=getComputedStyle(e),i.set(e,t)),t},o=t=>{let n=1;for(let r=t;r&&r!==e&&e.contains(r);r=r.parentElement)n*=parseFloat(a(r).opacity)||0;return n},s=new Set(t.photos??[]),c=t=>{for(let n=t;n&&e.contains(n);n=n.parentElement){let e=a(n);if((e.webkitBackgroundClip||e.backgroundClip)===`text`)return n}return null},l=0,u=[],d=document.createRange(),f=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,{acceptNode(e){if(e.nodeType===Node.TEXT_NODE)return NodeFilter.FILTER_ACCEPT;let n=e,r=a(n);if(n.tagName===`IFRAME`||n.classList.contains(`sr-only`)||r.display===`none`||r.visibility===`hidden`||r.opacity===`0`||n.tagName===`IMG`&&s.has(n)||t.skip&&n.matches(t.skip)||n instanceof SVGElement&&!(n instanceof SVGSVGElement))return NodeFilter.FILTER_REJECT;let i=n.parentElement;return i instanceof HTMLDetailsElement&&!i.open&&n.tagName!==`SUMMARY`?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}),p=t=>{if(t.nodeType===Node.ELEMENT_NODE){let r=t,i=a(r);if(r.tagName===`IMG`||r instanceof SVGSVGElement){let e=r.getBoundingClientRect(),t=r,a=r.tagName===`IMG`?t.currentSrc||t.src:Pm(r,i),s=/matrix\(([^)]+)\)/.exec(i.transform)?.[1].split(`,`).map(Number);a&&e.width>0&&e.height>0&&n.push({type:`icon`,url:a,cx:e.left+e.width/2,cy:e.top+e.height/2,w:r.offsetWidth||e.width,h:r.offsetHeight||e.height,alpha:o(r),m:s?[s[0],s[1],s[2],s[3]]:[1,0,0,1]});return}let s=/url\((['"]?)(.+?)\1\)/.exec(i.webkitMaskImage||i.maskImage||``)?.[2],c=i.backgroundColor!==`rgba(0, 0, 0, 0)`;if(s&&(c||i.backgroundImage!==`none`)){let e=r.getBoundingClientRect(),t=/matrix\(([^)]+)\)/.exec(i.transform)?.[1].split(`,`).map(Number);n.push({type:`icon`,url:s,cx:e.left+e.width/2,cy:e.top+e.height/2,w:r.offsetWidth,h:r.offsetHeight,alpha:c?zm(i.backgroundColor):1,m:t?[t[0],t[1],t[2],t[3]]:[1,0,0,1]})}if(r!==e&&r.matches(Fm)){let e=r.getBoundingClientRect();n.push({type:`line`,x:e.left,y:e.bottom-1,w:e.width})}return}let r=t.parentElement,i=t.textContent??``;if(!r||!i.trim())return;let s=a(r),f=parseFloat(s.fontSize)||16,p=`${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`,m=Rm.get(p);m===void 0&&(Lm.font=p,m=Lm.measureText(`H`).fontBoundingBoxAscent,Rm.set(p,m));let h=c(r),g=-1;h&&(g=u.indexOf(h),g<0&&(g=u.push(h)-1));let _=(h?1:zm(s.color))*o(r),v=h?void 0:Nm(s.color),y=s.textTransform===`uppercase`;l=Math.max(l,f);for(let e=0;e<i.length;e++){let r=i[e];if(r===` `||r===`
`||r===`	`)continue;d.setStart(t,e),d.setEnd(t,e+1);let a=d.getBoundingClientRect();a.width&&n.push({type:`text`,ch:y?r.toUpperCase():r,x:a.left,y:a.top+m,font:p,alpha:_,color:v,grad:{id:g,top:a.top+m-f*.74,bottom:a.top+m+f*.03}})}};e.nodeType===Node.ELEMENT_NODE&&p(e);for(let e=f.nextNode();e;e=f.nextNode())p(e);return{ops:n,box:r,fontSize:l}}async function Hm(e,{ops:t,box:n},r,i,a){let o=[...new Set(t.filter(e=>e.type===`icon`).map(e=>e.url))],s=/* @__PURE__ */ new Map;await Promise.all(o.map(async e=>{s.set(e,await Bm(e))})),e.width=i.w,e.height=i.h;let c=e.getContext(`2d`);c.setTransform(r,0,0,r,-i.x*r,-i.y*r),c.textBaseline=`alphabetic`;let l=/* @__PURE__ */ new Map,u=(e,t,n)=>{if(a)return a;let r=e.createLinearGradient(0,t,0,n);for(let[e,t]of Z.color.titleGradient)r.addColorStop(e,t);return r},d=/* @__PURE__ */ new Map;for(let e of t)if(e.type===`text`&&e.grad.id>=0){let t=d.get(e.grad.id)??[1/0,-1/0];d.set(e.grad.id,[Math.min(t[0],e.grad.top),Math.max(t[1],e.grad.bottom)])}let f=null;for(let e of t)if(e.type===`text`){c.font=e.font;let[t,n]=e.grad.id>=0?d.get(e.grad.id):[e.grad.top,e.grad.bottom],r=`${t}|${n}`,i=l.get(r);i||(i=u(c,t,n),l.set(r,i)),c.fillStyle=a&&e.color?e.color:i,c.globalAlpha=e.alpha,c.fillText(e.ch,e.x,e.y),c.globalAlpha=1}else if(e.type===`line`){let t=c.createLinearGradient(e.x,0,e.x+e.w,0);t.addColorStop(0,`rgba(226,224,220,.22)`),t.addColorStop(.5,`rgba(226,224,220,.14)`),t.addColorStop(1,`rgba(226,224,220,0)`),c.fillStyle=t,c.fillRect(e.x,e.y,e.w,1)}else{let t=s.get(e.url);if(!t)continue;f??=document.createElement(`canvas`);let n=Math.max(1,Math.ceil(e.w*r)),i=Math.max(1,Math.ceil(e.h*r));f.width=n,f.height=i;let a=f.getContext(`2d`),o=Math.min(n,i);a.drawImage(t,(n-o)/2,(i-o)/2,o,o),a.globalCompositeOperation=`source-in`,a.fillStyle=u(a,(i-o)/2,(i+o)/2),a.fillRect(0,0,n,i),c.globalAlpha=e.alpha,c.save(),c.translate(e.cx,e.cy),c.transform(e.m[0],e.m[1],e.m[2],e.m[3],0,0),c.drawImage(f,-e.w/2,-e.h/2,e.w,e.h),c.restore(),c.globalAlpha=1}let p=.25,m=Math.max(1,Math.round(n.width*p)),h=Math.max(1,Math.round(n.height*p)),g=document.createElement(`canvas`);g.width=m,g.height=h;let _=g.getContext(`2d`,{willReadFrequently:!0});_.drawImage(e,(n.left-i.x)*r,(n.top-i.y)*r,n.width*r,n.height*r,0,0,m,h);let v=_.getImageData(0,0,m,h).data,y=new Uint8Array(m*h);for(let e=0;e<y.length;e++)y[e]=v[e*4+3];return{alpha:y,aw:m,ah:h,ascale:p}}function Um(e,t,n,r){let i=e.naturalWidth||1,a=e.naturalHeight||1,o=t.objectFit,s=n,c=r;if(o===`contain`||o===`cover`){let e=o===`contain`?Math.min(n/i,r/a):Math.max(n/i,r/a);s=i*e,c=a*e}let[l=`50%`,u=`50%`]=t.objectPosition.split(` `),d=(e,t)=>e.endsWith(`%`)?parseFloat(e)/100*t:parseFloat(e)||0,f=d(l,n-s),p=d(u,r-c);return[-f/s,-p/c,n/s,r/c]}function Wm(e,t,n,r){let i=Math.min(1,Math.sqrt(26e4/Math.max(1,t*n))),a=Math.max(2,Math.round(t*i)),o=Math.max(2,Math.round(n*i)),s=document.createElement(`canvas`);s.width=a,s.height=o;let c=s.getContext(`2d`,{willReadFrequently:!0});return c.imageSmoothingEnabled=!0,c.imageSmoothingQuality=`high`,c.drawImage(e,0,0,a,o),{data:Mm(jm(c.getImageData(0,0,a,o).data,a,o,4,3),1/i,r),w:a,h:o}}var Gm=()=>Float32Array.from([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);function Km(e,t){let n=/* @__PURE__ */ new Float32Array(16);for(let r=0;r<4;r++)for(let i=0;i<4;i++){let a=0;for(let n=0;n<4;n++)a+=e[n*4+i]*t[r*4+n];n[r*4+i]=a}return n}function qm(e,t){let n=Gm();return n[12]=e,n[13]=t,n}function Jm(e,t,n,r,i){return Km(Km(qm(r+t,i+n),e),qm(-t,-n))}function Ym(e,t,n){let r=e[0]*t+e[4]*n+e[12],i=e[1]*t+e[5]*n+e[13],a=e[3]*t+e[7]*n+e[15];return[r/a,i/a]}function Xm(e){let t=e[0],n=e[4],r=e[12],i=e[1],a=e[5],o=e[13],s=e[3],c=e[7],l=e[15],u=a*l-o*c,d=-(i*l-o*s),f=i*c-a*s,p=t*u+n*d+r*f;if(!Number.isFinite(p)||Math.abs(p)<1e-12)return null;let m=1/p;return Float64Array.from([u*m,-(n*l-r*c)*m,(n*o-r*a)*m,d*m,(t*l-r*s)*m,-(t*o-r*i)*m,f*m,-(t*c-n*s)*m,(t*a-n*i)*m])}function Zm(e,t,n){let r=e[0]*t+e[1]*n+e[2],i=e[3]*t+e[4]*n+e[5],a=e[6]*t+e[7]*n+e[8];return[r/a,i/a]}function Qm(e){let t=/^matrix(3d)?\(([^)]+)\)/.exec(e.trim());if(!t)return Gm();let n=t[2].split(`,`).map(Number);if(t[1])return Float32Array.from(n);let[r,i,a,o,s,c]=n;return Float32Array.from([r,i,0,0,a,o,0,0,0,0,1,0,s,c,0,1])}function $m(e){let t=[],n=0,r=0;for(let i=0;i<e.length;i++){let a=e[i];a===`(`?n++:a===`)`?n--:a===`,`&&n===0&&(t.push(e.slice(r,i).trim()),r=i+1)}return t.push(e.slice(r).trim()),t}var eh={top:0,right:90,bottom:180,left:270};function th(e){if(e===`transparent`)return 0;let t=/rgba?\(([^)]+)\)/.exec(e);if(t){let e=t[1].split(/[,/ ]+/).filter(Boolean);return e.length>3?e[3].endsWith(`%`)?parseFloat(e[3])/100:parseFloat(e[3]):1}let n=/^#([0-9a-f]{3,8})$/i.exec(e)?.[1];return n?n.length===4?parseInt(n[3]+n[3],16)/255:n.length===8?parseInt(n.slice(6),16)/255:1:1}function nh(e,t=1){let n=e.indexOf(`linear-gradient(`);if(n<0)return null;let r=0,i=-1;for(let t=n+15;t<e.length;t++)if(e[t]===`(`)r++;else if(e[t]===`)`&&(r--,r===0)){i=t;break}if(i<0)return null;let a=$m(e.slice(n+16,i)),o=180,s=a[0];if(/^-?[\d.]+(deg|turn|rad|grad)$/.test(s)){let e=parseFloat(s);o=s.endsWith(`turn`)?e*360:s.endsWith(`rad`)?e*180/Math.PI:s.endsWith(`grad`)?e*.9:e,a.shift()}else if(s.startsWith(`to `)){let e=s.slice(3).split(/\s+/).map(e=>eh[e]).filter(e=>e!==void 0);o=e.length===2?e.includes(0)&&e.includes(270)?315:(e[0]+e[1])/2:e[0]??180,a.shift()}let c=[];for(let e of a){let n=/^((?:rgba?|hsla?)\([^)]*\)|#[0-9a-f]{3,8}|[a-z]+)\s*(.*)$/i.exec(e);if(!n)return null;let r=th(n[1]),i=n[2].trim()?n[2].trim().split(/\s+(?![^(]*\))/):[],a=e=>{if(e.endsWith(`%`))return parseFloat(e)/100;if(e.endsWith(`px`))return parseFloat(e)/Math.max(1,t);let n=/^calc\(\s*([\d.]+)%\s*([+-])\s*([\d.]+)px\s*\)$/.exec(e);return n?parseFloat(n[1])/100+(n[2]===`-`?-1:1)*parseFloat(n[3])/Math.max(1,t):null};i.length||c.push({t:null,a:r});for(let e of i)c.push({t:a(e),a:r})}if(c.length<2)return null;c[0].t===null&&(c[0].t=0),c[c.length-1].t===null&&(c[c.length-1].t=1);let l=0;for(let e=0;e<c.length;e++){let t=c[e].t;if(t!==null){c[e].t=Math.max(t,c[l].t??0),l=e;continue}let n=e+1;for(;c[n].t===null;)n++;let r=c[l].t,i=c[n].t;for(let t=e;t<n;t++)c[t].t=r+(i-r)*(t-l)/(n-l);e=n-1}return{angle:o,stops:c.map(e=>({t:e.t,a:e.a}))}}function rh(e,t,n){let r=e*Math.PI/180,i=Math.sin(r),a=-Math.cos(r),o=Math.abs(t*i)+Math.abs(n*a);return[i,a,1/Math.max(.001,o)]}function ih(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,`value`in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function ah(e,t,n){return t&&ih(e.prototype,t),n&&ih(e,n),e}var oh,sh,ch,lh,uh,dh,fh,ph,mh,hh,gh,_h,vh,yh=function(){return oh||typeof window<`u`&&(oh=window.gsap)&&oh.registerPlugin&&oh},bh=1,xh=[],Sh=[],Ch=[],wh=Date.now,Th=function(e,t){return t},Eh=function(){var e=mh.core,t=e.bridge||{},n=e._scrollers,r=e._proxies;n.push.apply(n,Sh),r.push.apply(r,Ch),Sh=n,Ch=r,Th=function(e,n){return t[e](n)}},Dh=function(e,t){return~Ch.indexOf(e)&&Ch[Ch.indexOf(e)+1][t]},Oh=function(e){return!!~hh.indexOf(e)},kh=function(e,t,n,r,i){return e.addEventListener(t,n,{passive:r!==!1,capture:!!i})},Ah=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},jh=`scrollLeft`,Mh=`scrollTop`,Nh=function(){return gh&&gh.isPressed||Sh.cache++},Ph=function(e,t){var n=function n(r){if(r||r===0){bh&&ch.history.scrollRestoration!==`manual`&&(ch.history.scrollRestoration=`manual`);var i=gh&&gh.isPressed;r=n.v=Math.round(r)||(gh&&gh.iOS?1:0),e(r),n.cacheID=Sh.cache,i&&Th(`ss`,r)}else(t||Sh.cache!==n.cacheID||Th(`ref`))&&(n.cacheID=Sh.cache,n.v=e());return n.v+n.offset};return n.offset=0,e&&n},Fh={s:jh,p:`left`,p2:`Left`,os:`right`,os2:`Right`,d:`width`,d2:`Width`,a:`x`,sc:Ph(function(e){return arguments.length?ch.scrollTo(e,Ih.sc()):ch.pageXOffset||lh[jh]||uh[jh]||dh[jh]||0})},Ih={s:Mh,p:`top`,p2:`Top`,os:`bottom`,os2:`Bottom`,d:`height`,d2:`Height`,a:`y`,op:Fh,sc:Ph(function(e){return arguments.length?ch.scrollTo(Fh.sc(),e):ch.pageYOffset||lh[Mh]||uh[Mh]||dh[Mh]||0})},Lh=function(e,t){return(t&&t._ctx&&t._ctx.selector||oh.utils.toArray)(e)[0]||(typeof e==`string`&&oh.config().nullTargetWarn!==!1?console.warn(`Element not found:`,e):null)},Rh=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},zh=function(e,t){var n=t.s,r=t.sc;Oh(e)&&(e=lh.scrollingElement||uh);var i=Sh.indexOf(e),a=r===Ih.sc?1:2;!~i&&(i=Sh.push(e)-1),Sh[i+a]||kh(e,`scroll`,Nh);var o=Sh[i+a],s=o||(Sh[i+a]=Ph(Dh(e,n),!0)||(Oh(e)?r:Ph(function(t){return arguments.length?e[n]=t:e[n]})));return s.target=e,o||(s.smooth=oh.getProperty(e,`scrollBehavior`)===`smooth`),s},Bh=function(e,t,n){var r=e,i=e,a=wh(),o=a,s=t||50,c=Math.max(500,s*3),l=function(e,t){var c=wh();t||c-a>s?(i=r,r=e,o=a,a=c):n?r+=e:r=i+(e-i)/(c-o)*(a-o)};return{update:l,reset:function(){i=r=n?0:r,o=a=0},getVelocity:function(e){var t=o,s=i,u=wh();return(e||e===0)&&e!==r&&l(e),a===o||u-o>c?0:(r+(n?s:-s))/((n?u:a)-t)*1e3}}},Vh=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Hh=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},Uh=function(){mh=oh.core.globals().ScrollTrigger,mh&&mh.core&&Eh()},Wh=function(e){return oh=e||yh(),!sh&&oh&&typeof document<`u`&&document.body&&(ch=window,lh=document,uh=lh.documentElement,dh=lh.body,hh=[ch,lh,uh,dh],oh.utils.clamp,vh=oh.core.context||function(){},ph=`onpointerenter`in dh?`pointer`:`mouse`,fh=Gh.isTouch=ch.matchMedia&&ch.matchMedia(`(hover: none), (pointer: coarse)`).matches?1:`ontouchstart`in ch||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,_h=Gh.eventTypes=(`ontouchstart`in uh?`touchstart,touchmove,touchcancel,touchend`:`onpointerdown`in uh?`pointerdown,pointermove,pointercancel,pointerup`:`mousedown,mousemove,mouseup,mouseup`).split(`,`),setTimeout(function(){return bh=0},500),sh=1),mh||Uh(),sh};Fh.op=Ih,Sh.cache=0;var Gh=/*#__PURE__*/ function(){function e(e){this.init(e)}var t=e.prototype;return t.init=function(e){sh||Wh(oh)||console.warn(`Please gsap.registerPlugin(Observer)`),mh||Uh();var t=e.tolerance,n=e.dragMinimum,r=e.type,i=e.target,a=e.lineHeight,o=e.debounce,s=e.preventDefault,c=e.onStop,l=e.onStopDelay,u=e.ignore,d=e.wheelSpeed,f=e.event,p=e.onDragStart,m=e.onDragEnd,h=e.onDrag,g=e.onPress,_=e.onRelease,v=e.onRight,y=e.onLeft,b=e.onUp,x=e.onDown,S=e.onChangeX,C=e.onChangeY,w=e.onChange,T=e.onToggleX,E=e.onToggleY,D=e.onHover,O=e.onHoverEnd,k=e.onMove,A=e.ignoreCheck,j=e.isNormalizer,M=e.onGestureStart,N=e.onGestureEnd,P=e.onWheel,F=e.onEnable,I=e.onDisable,ee=e.onClick,L=e.scrollSpeed,te=e.capture,ne=e.allowClicks,R=e.lockAxis,re=e.onLockAxis;this.target=i=Lh(i)||uh,this.vars=e,u&&=oh.utils.toArray(u),t||=1e-9,n||=0,d||=1,L||=1,r||=`wheel,touch,pointer`,o=o!==!1,a||=parseFloat(ch.getComputedStyle(dh).lineHeight)||22;var z,ie,ae,oe,B,se,ce,V=this,le=0,ue=0,de=e.passive||!s&&e.passive!==!1,fe=zh(i,Fh),pe=zh(i,Ih),me=fe(),he=pe(),ge=~r.indexOf(`touch`)&&!~r.indexOf(`pointer`)&&_h[0]===`pointerdown`,H=Oh(i),_e=i.ownerDocument||lh,U=[0,0,0],W=[0,0,0],G=0,ve=function(){return G=wh()},K=function(e,t){return(V.event=e)&&u&&Rh(e.target,u)||t&&ge&&e.pointerType!==`touch`||A&&A(e,t)},q=function(){V._vx.reset(),V._vy.reset(),ie.pause(),c&&c(V)},ye=function(){var e=V.deltaX=Hh(U),n=V.deltaY=Hh(W),r=Math.abs(e)>=t,i=Math.abs(n)>=t;w&&(r||i)&&w(V,e,n,U,W),r&&(v&&V.deltaX>0&&v(V),y&&V.deltaX<0&&y(V),S&&S(V),T&&V.deltaX<0!=le<0&&T(V),le=V.deltaX,U[0]=U[1]=U[2]=0),i&&(x&&V.deltaY>0&&x(V),b&&V.deltaY<0&&b(V),C&&C(V),E&&V.deltaY<0!=ue<0&&E(V),ue=V.deltaY,W[0]=W[1]=W[2]=0),(oe||ae)&&(k&&k(V),ae&&=(p&&ae===1&&p(V),h&&h(V),0),oe=!1),se&&!(se=!1)&&re&&re(V),B&&=(P(V),!1),z=0},be=function(e,t,n){U[n]+=e,W[n]+=t,V._vx.update(e),V._vy.update(t),o?z||=requestAnimationFrame(ye):ye()},xe=function(e,t){R&&!ce&&(V.axis=ce=Math.abs(e)>Math.abs(t)?`x`:`y`,se=!0),ce!==`y`&&(U[2]+=e,V._vx.update(e,!0)),ce!==`x`&&(W[2]+=t,V._vy.update(t,!0)),o?z||=requestAnimationFrame(ye):ye()},Se=function(e){if(!K(e,1)){e=Vh(e,s);var t=e.clientX,r=e.clientY,i=t-V.x,a=r-V.y,o=V.isDragging;V.x=t,V.y=r,(o||(i||a)&&(Math.abs(V.startX-t)>=n||Math.abs(V.startY-r)>=n))&&(ae||=o?2:1,o||(V.isDragging=!0),xe(i,a))}},Ce=V.onPress=function(e){K(e,1)||e&&e.button||(V.axis=ce=null,ie.pause(),V.isPressed=!0,e=Vh(e),le=ue=0,V.startX=V.x=e.clientX,V.startY=V.y=e.clientY,V._vx.reset(),V._vy.reset(),kh(j?i:_e,_h[1],Se,de,!0),V.deltaX=V.deltaY=0,g&&g(V))},we=V.onRelease=function(e){if(!K(e,1)){Ah(j?i:_e,_h[1],Se,!0);var t=!isNaN(V.y-V.startY),n=V.isDragging,r=n&&(Math.abs(V.x-V.startX)>3||Math.abs(V.y-V.startY)>3),a=Vh(e);!r&&t&&(V._vx.reset(),V._vy.reset(),s&&ne&&oh.delayedCall(.08,function(){if(wh()-G>300&&!e.defaultPrevented){if(e.target.click)e.target.click();else if(_e.createEvent){var t=_e.createEvent(`MouseEvents`);t.initMouseEvent(`click`,!0,!0,ch,1,a.screenX,a.screenY,a.clientX,a.clientY,!1,!1,!1,!1,0,null),e.target.dispatchEvent(t)}}})),V.isDragging=V.isGesturing=V.isPressed=!1,c&&n&&!j&&ie.restart(!0),ae&&ye(),m&&n&&m(V),_&&_(V,r)}},Te=function(e){return e.touches&&e.touches.length>1&&(V.isGesturing=!0)&&M(e,V.isDragging)},Ee=function(){return(V.isGesturing=!1)||N(V)},De=function(e){if(!K(e)){var t=fe(),n=pe();be((t-me)*L,(n-he)*L,1),me=t,he=n,c&&ie.restart(!0)}},Oe=function(e){if(!K(e)){e=Vh(e,s),P&&(B=!0);var t=(e.deltaMode===1?a:e.deltaMode===2?ch.innerHeight:1)*d;be(e.deltaX*t,e.deltaY*t,0),c&&!j&&ie.restart(!0)}},ke=function(e){if(!K(e)){var t=e.clientX,n=e.clientY,r=t-V.x,i=n-V.y;V.x=t,V.y=n,oe=!0,c&&ie.restart(!0),(r||i)&&xe(r,i)}},Ae=function(e){V.event=e,D(V)},je=function(e){V.event=e,O(V)},Me=function(e){return K(e)||Vh(e,s)&&ee(V)};ie=V._dc=oh.delayedCall(l||.25,q).pause(),V.deltaX=V.deltaY=0,V._vx=Bh(0,50,!0),V._vy=Bh(0,50,!0),V.scrollX=fe,V.scrollY=pe,V.isDragging=V.isGesturing=V.isPressed=!1,vh(this),V.enable=function(e){return V.isEnabled||(kh(H?_e:i,`scroll`,Nh),r.indexOf(`scroll`)>=0&&kh(H?_e:i,`scroll`,De,de,te),r.indexOf(`wheel`)>=0&&kh(i,`wheel`,Oe,de,te),(r.indexOf(`touch`)>=0&&fh||r.indexOf(`pointer`)>=0)&&(kh(i,_h[0],Ce,de,te),kh(_e,_h[2],we),kh(_e,_h[3],we),ne&&kh(i,`click`,ve,!0,!0),ee&&kh(i,`click`,Me),M&&kh(_e,`gesturestart`,Te),N&&kh(_e,`gestureend`,Ee),D&&kh(i,ph+`enter`,Ae),O&&kh(i,ph+`leave`,je),k&&kh(i,ph+`move`,ke)),V.isEnabled=!0,V.isDragging=V.isGesturing=V.isPressed=oe=ae=!1,V._vx.reset(),V._vy.reset(),me=fe(),he=pe(),e&&e.type&&Ce(e),F&&F(V)),V},V.disable=function(){V.isEnabled&&(xh.filter(function(e){return e!==V&&Oh(e.target)}).length||Ah(H?_e:i,`scroll`,Nh),V.isPressed&&(V._vx.reset(),V._vy.reset(),Ah(j?i:_e,_h[1],Se,!0)),Ah(H?_e:i,`scroll`,De,te),Ah(i,`wheel`,Oe,te),Ah(i,_h[0],Ce,te),Ah(_e,_h[2],we),Ah(_e,_h[3],we),Ah(i,`click`,ve,!0),Ah(i,`click`,Me),Ah(_e,`gesturestart`,Te),Ah(_e,`gestureend`,Ee),Ah(i,ph+`enter`,Ae),Ah(i,ph+`leave`,je),Ah(i,ph+`move`,ke),V.isEnabled=V.isPressed=V.isDragging=!1,I&&I(V))},V.kill=V.revert=function(){V.disable();var e=xh.indexOf(V);e>=0&&xh.splice(e,1),gh===V&&(gh=0)},xh.push(V),j&&Oh(i)&&(gh=V),V.enable(f)},ah(e,[{key:`velocityX`,get:function(){return this._vx.getVelocity()}},{key:`velocityY`,get:function(){return this._vy.getVelocity()}}]),e}();Gh.version=`3.15.1`,Gh.create=function(e){return new Gh(e)},Gh.register=Wh,Gh.getAll=function(){return xh.slice()},Gh.getById=function(e){return xh.filter(function(t){return t.vars.id===e})[0]},yh()&&oh.registerPlugin(Gh);var $,Kh,qh,Jh,Yh,Xh,Zh,Qh,$h,eg,tg,ng,rg,ig,ag,og,sg,cg,lg,ug,dg,fg,pg,mg,hg,gg,_g,vg,yg,bg,xg,Sg,Cg,wg,Tg=1,Eg=Date.now,Dg=Eg(),Og=0,kg=0,Ag=function(e,t,n){var r=Kg(e)&&(e.substr(0,6)===`clamp(`||e.indexOf(`max`)>-1);return n[`_`+t+`Clamp`]=r,r?e.substr(6,e.length-7):e},jg=function(e,t){return t&&(!Kg(e)||e.substr(0,6)!==`clamp(`)?`clamp(`+e+`)`:e},Mg=function e(){return kg&&requestAnimationFrame(e)},Ng=function(){return ig=1},Pg=function(){return ig=0},Fg=function(e){return e},Ig=function(e){return Math.round(e*1e5)/1e5||0},Lg=function(){return typeof window<`u`},Rg=function(){return $||Lg()&&($=window.gsap)&&$.registerPlugin&&$},zg=function(e){return!!~Zh.indexOf(e)},Bg=function(e){return(e===`Height`?xg:qh[`inner`+e])||Yh[`client`+e]||Xh[`client`+e]},Vg=function(e){return Dh(e,`getBoundingClientRect`)||(zg(e)?function(){return mv.width=qh.innerWidth,mv.height=xg,mv}:function(){return __(e)})},Hg=function(e,t,n){var r=n.d,i=n.d2,a=n.a;return(a=Dh(e,`getBoundingClientRect`))?function(){return a()[r]}:function(){return(t?Bg(i):e[`client`+i])||0}},Ug=function(e,t){return!t||~Ch.indexOf(e)?Vg(e):function(){return mv}},Wg=function(e,t){var n=t.s,r=t.d2,i=t.d,a=t.a;return Math.max(0,(n=`scroll`+r)&&(a=Dh(e,n))?a()-Vg(e)()[i]:zg(e)?(Yh[n]||Xh[n])-Bg(r):e[n]-e[`offset`+r])},Gg=function(e,t){for(var n=0;n<lg.length;n+=3)(!t||~t.indexOf(lg[n+1]))&&e(lg[n],lg[n+1],lg[n+2])},Kg=function(e){return typeof e==`string`},qg=function(e){return typeof e==`function`},Jg=function(e){return typeof e==`number`},Yg=function(e){return typeof e==`object`},Xg=function(e,t,n){return e&&e.progress(+!t)&&n&&e.pause()},Zg=function(e,t,n){if(e.enabled){var r=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);r&&r.totalTime&&(e.callbackAnimation=r)}},Qg=Math.abs,$g=`left`,e_=`top`,t_=`right`,n_=`bottom`,r_=`width`,i_=`height`,a_=`Right`,o_=`Left`,s_=`Top`,c_=`Bottom`,l_=`padding`,u_=`margin`,d_=`Width`,f_=`Height`,p_=`px`,m_=function(e){return qh.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},h_=function(e){var t=m_(e).position;e.style.position=t===`absolute`||t===`fixed`?t:`relative`},g_=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},__=function(e,t){var n=t&&m_(e)[ag]!==`matrix(1, 0, 0, 1, 0, 0)`&&$.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),r},v_=function(e,t){var n=t.d2;return e[`offset`+n]||e[`client`+n]||0},y_=function(e){var t=[],n=e.labels,r=e.duration(),i;for(i in n)t.push(n[i]/r);return t},b_=function(e){return function(t){return $.utils.snap(y_(e),t)}},x_=function(e){var t=$.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(e,t){return e-t});return n?function(e,r,i){i===void 0&&(i=.001);var a;if(!r)return t(e);if(r>0){for(e-=i,a=0;a<n.length;a++)if(n[a]>=e)return n[a];return n[a-1]}for(a=n.length,e+=i;a--;)if(n[a]<=e)return n[a];return n[0]}:function(n,r,i){i===void 0&&(i=.001);var a=t(n);return!r||Math.abs(a-n)<i||a-n<0==r<0?a:t(r<0?n-e:n+e)}},S_=function(e){return function(t,n){return x_(y_(e))(t,n.direction)}},C_=function(e,t,n,r){return n.split(`,`).forEach(function(n){return e(t,n,r)})},w_=function(e,t,n,r,i){return e.addEventListener(t,n,{passive:!r,capture:!!i})},T_=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},E_=function(e,t,n){n&&=n.wheelHandler,n&&(e(t,`wheel`,n),e(t,`touchmove`,n))},D_={startColor:`green`,endColor:`red`,indent:0,fontSize:`16px`,fontWeight:`normal`},O_={toggleActions:`play`,anticipatePin:0},k_={top:0,left:0,center:.5,bottom:1,right:1},A_=function(e,t){if(Kg(e)){var n=e.indexOf(`=`),r=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf(`%`)>n&&(r*=t/100),e=e.substr(0,n-1)),e=r+(e in k_?k_[e]*t:~e.indexOf(`%`)?parseFloat(e)*t/100:parseFloat(e)||0)}return e},j_=function(e,t,n,r,i,a,o,s){var c=i.startColor,l=i.endColor,u=i.fontSize,d=i.indent,f=i.fontWeight,p=Jh.createElement(`div`),m=zg(n)||Dh(n,`pinType`)===`fixed`,h=e.indexOf(`scroller`)!==-1,g=m?Xh:n.tagName===`IFRAME`?n.contentDocument.body:n,_=e.indexOf(`start`)!==-1,v=_?c:l,y=`border-color:`+v+`;font-size:`+u+`;color:`+v+`;font-weight:`+f+`;pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;`;return y+=`position:`+((h||s)&&m?`fixed;`:`absolute;`),(h||s||!m)&&(y+=(r===Ih?t_:n_)+`:`+(a+parseFloat(d))+`px;`),o&&(y+=`box-sizing:border-box;text-align:left;width:`+o.offsetWidth+`px;`),p._isStart=_,p.setAttribute(`class`,`gsap-marker-`+e+(t?` marker-`+t:``)),p.style.cssText=y,p.innerText=t||t===0?e+`-`+t:e,g.children[0]?g.insertBefore(p,g.children[0]):g.appendChild(p),p._offset=p[`offset`+r.op.d2],M_(p,0,r,_),p},M_=function(e,t,n,r){var i={display:`block`},a=n[r?`os2`:`p2`],o=n[r?`p2`:`os2`];e._isFlipped=r,i[n.a+`Percent`]=r?-100:0,i[n.a]=r?`1px`:0,i[`border`+a+d_]=1,i[`border`+o+d_]=0,i[n.p]=t+`px`,$.set(e,i)},N_=[],P_={},F_,I_=function(){return Eg()-Og>34&&(F_||=requestAnimationFrame(av))},L_=function(){(!pg||!pg.isPressed||pg.startX>Xh.clientWidth)&&(Sh.cache++,pg?F_||=requestAnimationFrame(av):av(),Og||U_(`scrollStart`),Og=Eg())},R_=function(){gg=qh.innerWidth,hg=qh.innerHeight},z_=function(e){Sh.cache++,(e===!0||!rg&&!fg&&!Jh.fullscreenElement&&!Jh.webkitFullscreenElement&&(!mg||gg!==qh.innerWidth||Math.abs(qh.innerHeight-hg)>qh.innerHeight*.25))&&Qh.restart(!0)},B_={},V_=[],H_=function e(){return T_(xv,`scrollEnd`,e)||tv(!0)},U_=function(e){return B_[e]&&B_[e].map(function(e){return e()})||V_},W_=[],G_=function(e){for(var t=0;t<W_.length;t+=5)(!e||W_[t+4]&&W_[t+4].query===e)&&(W_[t].style.cssText=W_[t+1],W_[t].getBBox&&W_[t].setAttribute(`transform`,W_[t+2]||``),W_[t+3].uncache=1)},K_=function(){Sh.cache++,Sh.forEach(function(e){return qg(e)&&(e.rec=e())})},q_=function(e,t){var n;for(og=0;og<N_.length;og++)n=N_[og],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Sg=!0,t&&G_(t),t||U_(`revert`)},J_=function(e,t){Sh.cache++,(t||!Y_)&&Sh.forEach(function(e){return qg(e)&&e.cacheID++&&(e.rec=0)}),Kg(e)&&(yg=e,qh.history.scrollRestoration!==e&&(qh.history.scrollRestoration=e))},Y_,X_=0,Z_,Q_=function(){if(Z_!==X_){var e=Z_=X_;requestAnimationFrame(function(){return e===X_&&tv(!0)})}},$_=function(){Xh.appendChild(bg),xg=!pg&&bg.offsetHeight||qh.innerHeight,Xh.removeChild(bg)},ev=function(e){return $h(`.gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end`).forEach(function(t){return t.style.display=e?`none`:`block`})},tv=function(e,t){if(Yh=Jh.documentElement,Xh=Jh.body,Zh=[qh,Jh,Yh,Xh],Og&&!e&&!Sg)w_(xv,`scrollEnd`,H_);else{$_(),Y_=xv.isRefreshing=!0,Sg||K_();var n=U_(`refreshInit`);ug&&xv.sort(),t||q_(),Sh.forEach(function(e){qg(e)&&(e.smooth&&(e.target.style.scrollBehavior=`auto`),e(0))}),N_.slice(0).forEach(function(e){return e.refresh()}),Sg=!1,N_.forEach(function(e){if(e._subPinOffset&&e.pin){var t=e.vars.horizontal?`offsetWidth`:`offsetHeight`,n=e.pin[t];e.revert(!0,1),e.adjustPinSpacing(e.pin[t]-n),e.refresh()}}),Cg=1,ev(!0),N_.forEach(function(e){var t=Wg(e.scroller,e._dir),n=e.vars.end===`max`||e._endClamp&&e.end>t,r=e._startClamp&&e.start>=t;(n||r)&&e.setPositions(r?t-1:e.start,n?Math.max(r?t:e.start+1,t):e.end,!0)}),ev(!1),Cg=0,n.forEach(function(e){return e&&e.render&&e.render(-1)}),Sh.forEach(function(e){qg(e)&&(e.smooth&&requestAnimationFrame(function(){return e.target.style.scrollBehavior=`smooth`}),e.rec&&e(e.rec))}),J_(yg,1),Qh.pause(),X_++,Y_=2,av(2),N_.forEach(function(e){return qg(e.vars.onRefresh)&&e.vars.onRefresh(e)}),Y_=xv.isRefreshing=!1,U_(`refresh`)}},nv=0,rv=1,iv,av=function(e){if(e===2||!Y_&&!Sg){xv.isUpdating=!0,iv&&iv.update(0);var t=N_.length,n=Eg(),r=n-Dg>=50,i=t&&N_[0].scroll();if(rv=nv>i?-1:1,Y_||(nv=i),r&&(Og&&!ig&&n-Og>200&&(Og=0,U_(`scrollEnd`)),tg=Dg,Dg=n),rv<0){for(og=t;og-->0;)N_[og]&&N_[og].update(0,r);rv=1}else for(og=0;og<t;og++)N_[og]&&N_[og].update(0,r);xv.isUpdating=!1}F_=0},ov=[$g,e_,n_,t_,u_+c_,u_+a_,u_+s_,u_+o_,`display`,`flexShrink`,`float`,`zIndex`,`gridColumnStart`,`gridColumnEnd`,`gridRowStart`,`gridRowEnd`,`gridArea`,`justifySelf`,`alignSelf`,`placeSelf`,`order`],sv=ov.concat([r_,i_,`boxSizing`,`max`+d_,`max`+f_,`position`,u_,l_,l_+s_,l_+a_,l_+c_,l_+o_]),cv=function(e,t,n){dv(n);var r=e._gsap;if(r.spacerIsNative)dv(r.spacerState);else if(e._gsap.swappedIn){var i=t.parentNode;i&&(i.insertBefore(e,t),i.removeChild(t))}e._gsap.swappedIn=!1},lv=function(e,t,n,r){if(!e._gsap.swappedIn){for(var i=ov.length,a=t.style,o=e.style,s;i--;)s=ov[i],a[s]=n[s];a.position=n.position===`absolute`?`absolute`:`relative`,n.display===`inline`&&(a.display=`inline-block`),o[n_]=o[t_]=`auto`,a.flexBasis=n.flexBasis||`auto`,a.overflow=`visible`,a.boxSizing=`border-box`,a[r_]=v_(e,Fh)+p_,a[i_]=v_(e,Ih)+p_,a[l_]=o[u_]=o[e_]=o[$g]=`0`,dv(r),o[r_]=o[`max`+d_]=n[r_],o[i_]=o[`max`+f_]=n[i_],o[l_]=n[l_],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},uv=/([A-Z])/g,dv=function(e){if(e){var t=e.t.style,n=e.length,r=0,i,a;for((e.t._gsap||$.core.getCache(e.t)).uncache=1;r<n;r+=2)a=e[r+1],i=e[r],a?t[i]=a:t[i]&&t.removeProperty(i.replace(uv,`-$1`).toLowerCase())}},fv=function(e){for(var t=sv.length,n=e.style,r=[],i=0;i<t;i++)r.push(sv[i],n[sv[i]]);return r.t=e,r},pv=function(e,t,n){for(var r=[],i=e.length,a=n?8:0,o;a<i;a+=2)o=e[a],r.push(o,o in t?t[o]:e[a+1]);return r.t=e.t,r},mv={left:0,top:0},hv=function(e,t,n,r,i,a,o,s,c,l,u,d,f,p){qg(e)&&(e=e(s)),Kg(e)&&e.substr(0,3)===`max`&&(e=d+(e.charAt(4)===`=`?A_(`0`+e.substr(3),n):0));var m=f?f.time():0,h,g,_;if(f&&f.seek(0),isNaN(e)||(e=+e),Jg(e))f&&(e=$.utils.mapRange(f.scrollTrigger.start,f.scrollTrigger.end,0,d,e)),o&&M_(o,n,r,!0);else{qg(t)&&(t=t(s));var v=(e||`0`).split(` `),y,b,x,S;_=Lh(t,s)||Xh,y=__(_)||{},y&&(y.left||y.top)||m_(_).display!==`none`||(S=_.style.display,_.style.display=`block`,y=__(_),S?_.style.display=S:_.style.removeProperty(`display`)),b=A_(v[0],y[r.d]),x=A_(v[1]||`0`,n),e=y[r.p]-c[r.p]-l+b+i-x,o&&M_(o,x,r,n-x<20||o._isStart&&x>20),n-=n-x}if(p&&(s[p]=e||-.001,e<0&&(e=0)),a){var C=e+n,w=a._isStart;h=`scroll`+r.d2,M_(a,C,r,w&&C>20||!w&&(u?Math.max(Xh[h],Yh[h]):a.parentNode[h])<=C+1),u&&(c=__(o),u&&(a.style[r.op.p]=c[r.op.p]-r.op.m-a._offset+p_))}return f&&_&&(h=__(_),f.seek(d),g=__(_),f._caScrollDist=h[r.p]-g[r.p],e=e/f._caScrollDist*d),f&&f.seek(m),f?e:Math.round(e)},gv=/(webkit|moz|length|cssText|inset)/i,_v=function(e,t,n,r){if(e.parentNode!==t){var i=e.style,a,o;if(t===Xh){for(a in e._stOrig=i.cssText,o=m_(e),o)!+a&&!gv.test(a)&&o[a]&&typeof i[a]==`string`&&a!==`0`&&(i[a]=o[a]);i.top=n,i.left=r}else i.cssText=e._stOrig;$.core.getCache(e).uncache=1,t.appendChild(e)}},vv=function(e,t,n){var r=t,i=r;return function(t){var a=Math.round(e());return a!==r&&a!==i&&Math.abs(a-r)>3&&Math.abs(a-i)>3&&(t=a,n&&n()),i=r,r=Math.round(t),r}},yv=function(e,t,n){var r={};r[t.p]=`+=`+n,$.set(e,r)},bv=function(e,t){var n=zh(e,t),r=`_scroll`+t.p2,i=function t(i,a,o,s,c){var l=t.tween,u=a.onComplete,d={};o||=n();var f=vv(n,o,function(){l.kill(),t.tween=0});return c=s&&c||0,s||=i-o,l&&l.kill(),a[r]=i,a.inherit=!1,a.modifiers=d,d[r]=function(){return f(o+s*l.ratio+c*l.ratio*l.ratio)},a.onUpdate=function(){Sh.cache++,t.tween&&av()},a.onComplete=function(){t.tween=0,u&&u.call(l)},l=t.tween=$.to(e,a),l};return e[r]=n,n.wheelHandler=function(){return i.tween&&i.tween.kill()&&(i.tween=0)},w_(e,`wheel`,n.wheelHandler),xv.isTouch&&w_(e,`touchmove`,n.wheelHandler),i},xv=/*#__PURE__*/ function(){function e(t,n){Kh||e.register($)||console.warn(`Please gsap.registerPlugin(ScrollTrigger)`),vg(this),this.init(t,n)}var t=e.prototype;return t.init=function(t,n){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!kg)this.update=this.refresh=this.kill=Fg;else{t=g_(Kg(t)||Jg(t)||t.nodeType?{trigger:t}:t,O_);var r=t,i=r.onUpdate,a=r.toggleClass,o=r.id,s=r.onToggle,c=r.onRefresh,l=r.scrub,u=r.trigger,d=r.pin,f=r.pinSpacing,p=r.invalidateOnRefresh,m=r.anticipatePin,h=r.onScrubComplete,g=r.onSnapComplete,_=r.once,v=r.snap,y=r.pinReparent,b=r.pinSpacer,x=r.containerAnimation,S=r.fastScrollEnd,C=r.preventOverlaps,w=t.horizontal||t.containerAnimation&&t.horizontal!==!1?Fh:Ih,T=!l&&l!==0,E=Lh(t.scroller||qh),D=$.core.getCache(E),O=zg(E),k=(`pinType`in t?t.pinType:Dh(E,`pinType`)||O&&`fixed`)===`fixed`,A=[t.onEnter,t.onLeave,t.onEnterBack,t.onLeaveBack],j=T&&t.toggleActions.split(` `),M=`markers`in t?t.markers:O_.markers,N=O?0:parseFloat(m_(E)[`border`+w.p2+d_])||0,P=this,F=t.onRefreshInit&&function(){return t.onRefreshInit(P)},I=Hg(E,O,w),ee=Ug(E,O),L=0,te=0,ne=0,R=zh(E,w),re,z,ie,ae,oe,B,se,ce,V,le,ue,de,fe,pe,me,he,ge,H,_e,U,W,G,ve,K,q,ye,be,xe,Se,Ce,we,Te,Ee,De,Oe,ke,Ae,je,Me;if(P._startClamp=P._endClamp=!1,P._dir=w,m*=45,P.scroller=E,P.scroll=x?x.time.bind(x):R,ae=R(),Sg&&R.rec==null&&(R.rec=ae),P.vars=t,n||=t.animation,`refreshPriority`in t&&(ug=1,t.refreshPriority===-9999&&(iv=P)),D.tweenScroll=D.tweenScroll||{top:bv(E,Ih),left:bv(E,Fh)},P.tweenTo=re=D.tweenScroll[w.p],P.scrubDuration=function(e){Ee=Jg(e)&&e,Ee?Te?Te.duration(e):Te=$.to(n,{ease:`expo`,totalProgress:`+=0`,inherit:!1,duration:Ee,paused:!0,onComplete:function(){return h&&h(P)}}):(Te&&Te.progress(1).kill(),Te=0)},n&&(n.vars.lazy=!1,n._initted&&!P.isReverted||n.vars.immediateRender!==!1&&t.immediateRender!==!1&&n.duration()&&n.render(0,!0,!0),P.animation=n.pause(),n.scrollTrigger=P,P.scrubDuration(l),Ce=0,o||=n.vars.id),v&&((!Yg(v)||v.push)&&(v={snapTo:v}),`scrollBehavior`in Xh.style&&$.set(O?[Xh,Yh]:E,{scrollBehavior:`auto`}),Sh.forEach(function(e){return qg(e)&&e.target===(O?Jh.scrollingElement||Yh:E)&&(e.smooth=!1)}),ie=qg(v.snapTo)?v.snapTo:v.snapTo===`labels`?b_(n):v.snapTo===`labelsDirectional`?S_(n):v.directional===!1?$.utils.snap(v.snapTo):function(e,t){return x_(v.snapTo)(e,Eg()-te<500?0:t.direction)},De=v.duration||{min:.1,max:2},De=Yg(De)?eg(De.min,De.max):eg(De,De),Oe=$.delayedCall(v.delay||Ee/2||.1,function(){var e=R(),t=Eg()-te<500,r=re.tween;if((t||Math.abs(P.getVelocity())<10)&&!r&&!ig&&L!==e){var i=(e-B)/pe,a=n&&!T?n.totalProgress():i,o=t?0:(a-we)/(Eg()-tg)*1e3||0,s=$.utils.clamp(-i,1-i,Qg(o/2)*o/.185),c=i+(v.inertia===!1?0:s),l,u,d=v,f=d.onStart,p=d.onInterrupt,m=d.onComplete;if(l=ie(c,P),Jg(l)||(l=c),u=Math.max(0,Math.round(B+l*pe)),e<=se&&e>=B&&u!==e){if(r&&!r._initted&&r.data<=Qg(u-e))return;v.inertia===!1&&(s=l-i),re(u,{duration:De(Qg(Math.max(Qg(c-a),Qg(l-a))*.185/o/.05||0)),ease:v.ease||`power3`,data:Qg(u-e),onInterrupt:function(){return Oe.restart(!0)&&p&&Zg(P,p)},onComplete:function(){P.update(),L=R(),n&&!T&&(Te?Te.resetTo(`totalProgress`,l,n._tTime/n._tDur):n.progress(l)),Ce=we=n&&!T?n.totalProgress():P.progress,g&&g(P),m&&Zg(P,m)}},e,s*pe,u-e-s*pe),f&&Zg(P,f,re.tween)}}else P.isActive&&L!==e&&Oe.restart(!0)}).pause()),o&&(P_[o]=P),u=P.trigger=Lh(u||d!==!0&&d),Me=u&&u._gsap&&u._gsap.stRevert,Me&&=Me(P),d=d===!0?u:Lh(d),Kg(a)&&(a={targets:u,className:a}),d&&(f===!1||f===u_||(f=!f&&d.parentNode&&d.parentNode.style&&m_(d.parentNode).display===`flex`?!1:l_),P.pin=d,z=$.core.getCache(d),z.spacer?me=z.pinState:(b&&(b=Lh(b),b&&!b.nodeType&&(b=b.current||b.nativeElement),z.spacerIsNative=!!b,b&&(z.spacerState=fv(b))),z.spacer=H=b||Jh.createElement(`div`),H.classList.add(`pin-spacer`),o&&H.classList.add(`pin-spacer-`+o),z.pinState=me=fv(d)),t.force3D!==!1&&$.set(d,{force3D:!0}),P.spacer=H=z.spacer,Se=m_(d),K=Se[f+w.os2],U=$.getProperty(d),W=$.quickSetter(d,w.a,p_),lv(d,H,Se),ge=fv(d)),M){de=Yg(M)?g_(M,D_):D_,le=j_(`scroller-start`,o,E,w,de,0),ue=j_(`scroller-end`,o,E,w,de,0,le),_e=le[`offset`+w.op.d2];var Ne=Lh(Dh(E,`content`)||E);ce=this.markerStart=j_(`start`,o,Ne,w,de,_e,0,x),V=this.markerEnd=j_(`end`,o,Ne,w,de,_e,0,x),x&&(je=$.quickSetter([ce,V],w.a,p_)),!k&&!(Ch.length&&Dh(E,`fixedMarkers`)===!0)&&(h_(O?Xh:E),$.set([le,ue],{force3D:!0}),ye=$.quickSetter(le,w.a,p_),xe=$.quickSetter(ue,w.a,p_))}if(x){var Pe=x.vars.onUpdate,Fe=x.vars.onUpdateParams;x.eventCallback(`onUpdate`,function(){P.update(0,0,1),Pe&&Pe.apply(x,Fe||[])})}if(P.previous=function(){return N_[N_.indexOf(P)-1]},P.next=function(){return N_[N_.indexOf(P)+1]},P.revert=function(e,t){if(!t)return P.kill(!0);var r=e!==!1||!P.enabled,i=rg;r!==P.isReverted&&(r&&(ke=Math.max(R(),P.scroll.rec||0),ne=P.progress,Ae=n&&n.progress()),ce&&[ce,V,le,ue].forEach(function(e){return e.style.display=r?`none`:`block`}),r&&(rg=P,P.update(r)),!d||y&&P.isActive||(r?cv(d,H,me):lv(d,H,m_(d),q)),r||P.update(r),rg=i,P.isReverted=r)},P.refresh=function(r,i,a,o){if(!rg&&P.enabled||i){if(d&&r&&Og)w_(e,`scrollEnd`,H_);else{!Y_&&F&&F(P),rg=P,re.tween&&!a&&(re.tween.kill(),re.tween=0),Te&&Te.pause(),p&&n&&(n.revert({kill:!1}).invalidate(),n.getChildren?n.getChildren(!0,!0,!1).forEach(function(e){return e.vars.immediateRender&&e.render(0,!0,!0)}):n.vars.immediateRender&&n.render(0,!0,!0)),P.isReverted||P.revert(!0,!0),P._subPinOffset=!1;var s=I(),l=ee(),m=x?x.duration():Wg(E,w),h=pe<=.01||!pe,g=0,_=o||0,v=Yg(a)?a.end:t.end,b=t.endTrigger||u,S=Yg(a)?a.start:t.start||(t.start===0||!u?0:d?`0 0`:`0 100%`),C=P.pinnedContainer=t.pinnedContainer&&Lh(t.pinnedContainer,P),D=u&&Math.max(0,N_.indexOf(P))||0,A=D,j,z,ie,de,_e,W,K,ye,xe,Se,Ce,we,Ee;for(M&&Yg(a)&&(we=$.getProperty(le,w.p),Ee=$.getProperty(ue,w.p));A-->0;)W=N_[A],W.end||W.refresh(0,1)||(rg=P),K=W.pin,K&&(K===u||K===d||K===C)&&!W.isReverted&&(Se||=[],Se.unshift(W),W.revert(!0,!0)),W!==N_[A]&&(D--,A--);for(qg(S)&&(S=S(P)),S=Ag(S,`start`,P),B=hv(S,u,s,w,R(),ce,le,P,l,N,k,m,x,P._startClamp&&`_startClamp`)||(d?-.001:0),qg(v)&&(v=v(P)),Kg(v)&&!v.indexOf(`+=`)&&(~v.indexOf(` `)?v=(Kg(S)?S.split(` `)[0]:``)+v:(g=A_(v.substr(2),s),v=Kg(S)?S:(x?$.utils.mapRange(0,x.duration(),x.scrollTrigger.start,x.scrollTrigger.end,B):B)+g,b=u)),v=Ag(v,`end`,P),se=Math.max(B,hv(v||(b?`100% 0`:m),b,s,w,R()+g,V,ue,P,l,N,k,m,x,P._endClamp&&`_endClamp`))||-.001,g=0,A=D;A--;)W=N_[A]||{},K=W.pin,K&&W.start-W._pinPush<=B&&!x&&W.end>0&&(j=W.end-(P._startClamp?Math.max(0,W.start):W.start),(K===u&&W.start-W._pinPush<B||K===C)&&isNaN(S)&&(g+=j*(1-W.progress)),K===d&&(_+=j));if(B+=g,se+=g,P._startClamp&&(P._startClamp+=g),P._endClamp&&!Y_&&(P._endClamp=se||-.001,se=Math.min(se,Wg(E,w))),pe=se-B||(B-=.01)&&.001,h&&(ne=$.utils.clamp(0,1,$.utils.normalize(B,se,ke))),P._pinPush=_,ce&&g&&(j={},j[w.a]=`+=`+g,C&&(j[w.p]=`-=`+R()),$.set([ce,V],j)),d&&!(Cg&&P.end>=Wg(E,w)))j=m_(d),de=w===Ih,ie=R(),G=parseFloat(U(w.a))+_,!m&&se>1&&(Ce=(O?Jh.scrollingElement||Yh:E).style,Ce={style:Ce,value:Ce[`overflow`+w.a.toUpperCase()]},O&&m_(Xh)[`overflow`+w.a.toUpperCase()]!==`scroll`&&(Ce.style[`overflow`+w.a.toUpperCase()]=`scroll`)),lv(d,H,j),ge=fv(d),z=__(d,!0),ye=k&&zh(E,de?Fh:Ih)(),f?(q=[f+w.os2,pe+_+p_],q.t=H,A=f===l_?v_(d,w)+pe+_:0,A&&(q.push(w.d,A+p_),H.style.flexBasis!==`auto`&&(H.style.flexBasis=A+p_)),dv(q),C&&N_.forEach(function(e){e.pin===C&&e.vars.pinSpacing!==!1&&(e._subPinOffset=!0)}),k&&R(ke)):(A=v_(d,w),A&&H.style.flexBasis!==`auto`&&(H.style.flexBasis=A+p_)),k&&(_e={top:z.top+(de?ie-B:ye)+p_,left:z.left+(de?ye:ie-B)+p_,boxSizing:`border-box`,position:`fixed`},_e[r_]=_e[`max`+d_]=Math.ceil(z.width)+p_,_e[i_]=_e[`max`+f_]=Math.ceil(z.height)+p_,_e[u_]=_e[u_+s_]=_e[u_+a_]=_e[u_+c_]=_e[u_+o_]=`0`,_e[l_]=j[l_],_e[l_+s_]=j[l_+s_],_e[l_+a_]=j[l_+a_],_e[l_+c_]=j[l_+c_],_e[l_+o_]=j[l_+o_],he=pv(me,_e,y),Y_&&R(0)),n?(xe=n._initted,dg(1),n.render(n.duration(),!0,!0),ve=U(w.a)-G+pe+_,be=Math.abs(pe-ve)>1,k&&be&&he.splice(he.length-2,2),n.render(0,!0,!0),xe||n.invalidate(!0),n.parent||n.totalTime(n.totalTime()),dg(0)):ve=pe,Ce&&(Ce.value?Ce.style[`overflow`+w.a.toUpperCase()]=Ce.value:Ce.style.removeProperty(`overflow-`+w.a));else if(u&&R()&&!x)for(z=u.parentNode;z&&z!==Xh;)z._pinOffset&&(B-=z._pinOffset,se-=z._pinOffset),z=z.parentNode;Se&&Se.forEach(function(e){return e.revert(!1,!0)}),P.start=B,P.end=se,ae=oe=Y_?ke:R(),x||Y_||Sg||(ae<ke&&R(ke),P.scroll.rec=0),P.revert(!1,!0),te=Eg(),Oe&&(L=-1,Oe.restart(!0)),rg=0,n&&T&&(n._initted||Ae)&&n.progress()!==Ae&&n.progress(Ae||0,!0).render(n.time(),!0,!0),(h||ne!==P.progress||x||p||n&&!n._initted)&&(n&&!T&&(n._initted||ne||n.vars.immediateRender!==!1)&&n.totalProgress(x&&B<-.001&&!ne?$.utils.normalize(B,se,0):ne,!0),P.progress=h||(ae-B)/pe===ne?0:ne),d&&f&&(H._pinOffset=Math.round(P.progress*ve)),Te&&Te.invalidate(),isNaN(we)||(we-=$.getProperty(le,w.p),Ee-=$.getProperty(ue,w.p),yv(le,w,we),yv(ce,w,we-(o||0)),yv(ue,w,Ee),yv(V,w,Ee-(o||0))),h&&!Y_&&P.update(),c&&!Y_&&!fe&&(fe=!0,c(P),fe=!1)}}},P.getVelocity=function(){return(R()-oe)/(Eg()-tg)*1e3||0},P.endAnimation=function(){Xg(P.callbackAnimation),n&&(Te?Te.progress(1):n.paused()?T||Xg(n,P.direction<0,1):Xg(n,n.reversed()))},P.labelToScroll=function(e){return n&&n.labels&&(B||P.refresh()||B)+n.labels[e]/n.duration()*pe||0},P.getTrailing=function(e){var t=N_.indexOf(P),n=P.direction>0?N_.slice(0,t).reverse():N_.slice(t+1);return(Kg(e)?n.filter(function(t){return t.vars.preventOverlaps===e}):n).filter(function(e){return P.direction>0?e.end<=B:e.start>=se})},P.update=function(e,t,r){if(!x||r||e){var o=Y_===!0?ke:P.scroll(),c=e?0:(o-B)/pe,u=c<0?0:c>1?1:c||0,p=P.progress,h,g,b,D,O,M,N,F;if(t&&(oe=ae,ae=x?R():o,v&&(we=Ce,Ce=n&&!T?n.totalProgress():u)),m&&d&&!rg&&!Tg&&Og&&(!u&&B<o+(o-oe)/(Eg()-tg)*m?u=1e-4:u===1&&se>o+(o-oe)/(Eg()-tg)*m&&(u=.9999)),u!==p&&P.enabled){if(h=P.isActive=!!u&&u<1,g=!!p&&p<1,M=h!==g,O=M||!!u!=!!p,P.direction=u>p?1:-1,P.progress=u,O&&!rg&&(b=u&&!p?0:u===1?1:p===1?2:3,T&&(D=!M&&j[b+1]!==`none`&&j[b+1]||j[b],F=n&&(D===`complete`||D===`reset`||D in n))),C&&(M||F)&&(F||l||!n)&&(qg(C)?C(P):P.getTrailing(C).forEach(function(e){return e.endAnimation()})),T||(Te&&!rg&&!Tg?(Te._dp._time-Te._start!==Te._time&&Te.render(Te._dp._time-Te._start),Te.resetTo?Te.resetTo(`totalProgress`,u,n._tTime/n._tDur):(Te.vars.totalProgress=u,Te.invalidate().restart())):n&&n.totalProgress(u,!!(rg&&(te||e)))),d){if(e&&f&&(H.style[f+w.os2]=K),!k)W(Ig(G+ve*u));else if(O){if(N=!e&&u>p&&se+1>o&&o+1>=Wg(E,w),y){if(!e&&(h||N)){var I=__(d,!0),ee=o-B;_v(d,Xh,I.top+(w===Ih?ee:0)+p_,I.left+(w===Ih?0:ee)+p_)}else _v(d,H)}dv(h||N?he:ge),be&&u<1&&h||W(G+(u===1&&!N?ve:0))}}v&&!re.tween&&!rg&&!Tg&&Oe.restart(!0),a&&(M||_&&u&&(u<1||!wg))&&$h(a.targets).forEach(function(e){return e.classList[h||_?`add`:`remove`](a.className)}),i&&!T&&!e&&i(P),O&&!rg?(T&&(F&&(D===`complete`?n.pause().totalProgress(1):D===`reset`?n.restart(!0).pause():D===`restart`?n.restart(!0):n[D]()),i&&i(P)),(M||!wg)&&(s&&M&&Zg(P,s),A[b]&&Zg(P,A[b]),_&&(u===1?P.kill(!1,1):A[b]=0),M||(b=u===1?1:3,A[b]&&Zg(P,A[b]))),S&&!h&&Math.abs(P.getVelocity())>(Jg(S)?S:2500)&&(Xg(P.callbackAnimation),Te?Te.progress(1):Xg(n,D===`reverse`?1:!u,1))):T&&i&&!rg&&i(P)}if(xe){var L=x?o/x.duration()*(x._caScrollDist||0):o;ye(L+ +!!le._isFlipped),xe(L)}je&&je(-o/x.duration()*(x._caScrollDist||0))}},P.enable=function(t,n){P.enabled||(P.enabled=!0,w_(E,`resize`,z_),O||w_(E,`scroll`,L_),F&&w_(e,`refreshInit`,F),t!==!1&&(P.progress=ne=0,ae=oe=L=R()),n!==!1&&P.refresh())},P.getTween=function(e){return e&&re?re.tween:Te},P.setPositions=function(e,t,n,r){if(x){var i=x.scrollTrigger,a=x.duration(),o=i.end-i.start;e=i.start+o*e/a,t=i.start+o*t/a}P.refresh(!1,!1,{start:jg(e,n&&!!P._startClamp),end:jg(t,n&&!!P._endClamp)},r),P.update()},P.adjustPinSpacing=function(e){if(q&&e){var t=q.indexOf(w.d)+1;q[t]=parseFloat(q[t])+e+p_,q[1]=parseFloat(q[1])+e+p_,dv(q)}},P.disable=function(t,n){if(t!==!1&&P.revert(!0,!0),P.enabled&&(P.enabled=P.isActive=!1,n||Te&&Te.pause(),ke=0,z&&(z.uncache=1),F&&T_(e,`refreshInit`,F),Oe&&(Oe.pause(),re.tween&&re.tween.kill()&&(re.tween=0)),!O)){for(var r=N_.length;r--;)if(N_[r].scroller===E&&N_[r]!==P)return;T_(E,`resize`,z_),O||T_(E,`scroll`,L_)}},P.kill=function(e,r){P.disable(e,r),Te&&!r&&Te.kill(),o&&delete P_[o];var i=N_.indexOf(P);i>=0&&N_.splice(i,1),i===og&&rv>0&&og--,i=0,N_.forEach(function(e){return e.scroller===P.scroller&&(i=1)}),i||Y_||Sg||(P.scroll.rec=0),n&&(n.scrollTrigger=null,e&&n.revert({kill:!1}),r||n.kill()),ce&&[ce,V,le,ue].forEach(function(e){return e.parentNode&&e.parentNode.removeChild(e)}),iv===P&&(iv=0),d&&(z&&(z.uncache=1),i=0,N_.forEach(function(e){return e.pin===d&&i++}),i||(z.spacer=0)),t.onKill&&t.onKill(P)},N_.push(P),P.enable(!1,!1),Me&&Me(P),n&&n.add&&!pe){var Ie=P.update;P.update=function(){P.update=Ie,Sh.cache++,B||se||P.refresh()},$.delayedCall(.01,P.update),pe=.01,B=se=0}else P.refresh();d&&Q_()}},e.register=function(t){return Kh||=($=t||Rg(),Lg()&&window.document&&e.enable(),kg),Kh},e.defaults=function(e){if(e)for(var t in e)O_[t]=e[t];return O_},e.disable=function(e,t){kg=0,N_.forEach(function(n){return n[t?`kill`:`disable`](e)}),T_(qh,`wheel`,L_),T_(Jh,`scroll`,L_),clearInterval(ng),T_(Jh,`touchcancel`,Fg),T_(Xh,`touchstart`,Fg),C_(T_,Jh,`pointerdown,touchstart,mousedown`,Ng),C_(T_,Jh,`pointerup,touchend,mouseup`,Pg),Qh.kill(),Gg(T_);for(var n=0;n<Sh.length;n+=3)E_(T_,Sh[n],Sh[n+1]),E_(T_,Sh[n],Sh[n+2])},e.enable=function(){if(qh=window,Jh=document,Yh=Jh.documentElement,Xh=Jh.body,$){if($h=$.utils.toArray,eg=$.utils.clamp,vg=$.core.context||Fg,dg=$.core.suppressOverwrites||Fg,yg=qh.history.scrollRestoration||`auto`,nv=qh.pageYOffset||0,$.core.globals(`ScrollTrigger`,e),Xh){kg=1,bg=document.createElement(`div`),bg.style.height=`100vh`,bg.style.position=`absolute`,$_(),Mg(),Gh.register($),e.isTouch=Gh.isTouch,_g=Gh.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),mg=Gh.isTouch===1,w_(qh,`wheel`,L_),Zh=[qh,Jh,Yh,Xh],$.matchMedia?(e.matchMedia=function(e){var t=$.matchMedia(),n;for(n in e)t.add(n,e[n]);return t},$.addEventListener(`matchMediaInit`,function(){K_(),q_()}),$.addEventListener(`matchMediaRevert`,function(){return G_()}),$.addEventListener(`matchMedia`,function(){tv(0,1),U_(`matchMedia`)}),$.matchMedia().add(`(orientation: portrait)`,function(){return R_(),R_})):console.warn(`Requires GSAP 3.11.0 or later`),R_(),w_(Jh,`scroll`,L_);var t=Xh.hasAttribute(`style`),n=Xh.style,r=n.borderTopStyle,i=$.core.Animation.prototype,a,o;for(i.revert||Object.defineProperty(i,"revert",{value:function(){return this.time(-.01,!0)}}),n.borderTopStyle=`solid`,a=__(Xh),Ih.m=Math.round(a.top+Ih.sc())||0,Fh.m=Math.round(a.left+Fh.sc())||0,r?n.borderTopStyle=r:n.removeProperty(`border-top-style`),t||(Xh.setAttribute(`style`,``),Xh.removeAttribute(`style`)),ng=setInterval(I_,250),$.delayedCall(.5,function(){return Tg=0}),w_(Jh,`touchcancel`,Fg),w_(Xh,`touchstart`,Fg),C_(w_,Jh,`pointerdown,touchstart,mousedown`,Ng),C_(w_,Jh,`pointerup,touchend,mouseup`,Pg),ag=$.utils.checkPrefix(`transform`),sv.push(ag),Kh=Eg(),Qh=$.delayedCall(.2,tv).pause(),lg=[Jh,`visibilitychange`,function(){var e=qh.innerWidth,t=qh.innerHeight;Jh.hidden?(sg=e,cg=t):(sg!==e||cg!==t)&&z_()},Jh,`DOMContentLoaded`,tv,qh,`load`,tv,qh,`resize`,z_],Gg(w_),N_.forEach(function(e){return e.enable(0,1)}),o=0;o<Sh.length;o+=3)E_(T_,Sh[o],Sh[o+1]),E_(T_,Sh[o],Sh[o+2])}else Jh&&Jh.addEventListener(`DOMContentLoaded`,function t(){e.enable(),Jh.removeEventListener(`DOMContentLoaded`,t)})}},e.config=function(t){`limitCallbacks`in t&&(wg=!!t.limitCallbacks);var n=t.syncInterval;n&&clearInterval(ng)||(ng=n)&&setInterval(I_,n),`ignoreMobileResize`in t&&(mg=e.isTouch===1&&t.ignoreMobileResize),`autoRefreshEvents`in t&&(Gg(T_)||Gg(w_,t.autoRefreshEvents||`none`),fg=(t.autoRefreshEvents+``).indexOf(`resize`)===-1)},e.scrollerProxy=function(e,t){var n=Lh(e),r=Sh.indexOf(n),i=zg(n);~r&&Sh.splice(r,i?6:2),t&&(i?Ch.unshift(qh,t,Xh,t,Yh,t):Ch.unshift(n,t))},e.clearMatchMedia=function(e){N_.forEach(function(t){return t._ctx&&t._ctx.query===e&&t._ctx.kill(!0,!0)})},e.isInViewport=function(e,t,n){var r=(Kg(e)?Lh(e):e).getBoundingClientRect(),i=r[n?r_:i_]*t||0;return n?r.right-i>0&&r.left+i<qh.innerWidth:r.bottom-i>0&&r.top+i<qh.innerHeight},e.positionInViewport=function(e,t,n){Kg(e)&&(e=Lh(e));var r=e.getBoundingClientRect(),i=r[n?r_:i_],a=t==null?i/2:t in k_?k_[t]*i:~t.indexOf(`%`)?parseFloat(t)*i/100:parseFloat(t)||0;return n?(r.left+a)/qh.innerWidth:(r.top+a)/qh.innerHeight},e.killAll=function(e){if(N_.slice(0).forEach(function(e){return e.vars.id!==`ScrollSmoother`&&e.kill()}),e!==!0){var t=B_.killAll||[];B_={},t.forEach(function(e){return e()})}},e}();xv.version=`3.15.1`,xv.saveStyles=function(e){return e?$h(e).forEach(function(e){if(e&&e.style){var t=W_.indexOf(e);t>=0&&W_.splice(t,5),W_.push(e,e.style.cssText,e.getBBox&&e.getAttribute(`transform`),$.core.getCache(e),vg())}}):W_},xv.revert=function(e,t){return q_(!e,t)},xv.create=function(e,t){return new xv(e,t)},xv.refresh=function(e){return e?z_(!0):(Kh||xv.register())&&tv(!0)},xv.update=function(e){return++Sh.cache&&av(e===!0?2:0)},xv.clearScrollMemory=J_,xv.maxScroll=function(e,t){return Wg(e,t?Fh:Ih)},xv.getScrollFunc=function(e,t){return zh(Lh(e),t?Fh:Ih)},xv.getById=function(e){return P_[e]},xv.getAll=function(){return N_.filter(function(e){return e.vars.id!==`ScrollSmoother`})},xv.isScrolling=function(){return!!Og},xv.snapDirectional=x_,xv.addEventListener=function(e,t){var n=B_[e]||(B_[e]=[]);~n.indexOf(t)||n.push(t)},xv.removeEventListener=function(e,t){var n=B_[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},xv.batch=function(e,t){var n=[],r={},i=t.interval||.016,a=t.batchMax||1e9,o=function(e,t){var n=[],r=[],o=$.delayedCall(i,function(){t(n,r),n=[],r=[]}).pause();return function(e){n.length||o.restart(!0),n.push(e.trigger),r.push(e),a<=n.length&&o.progress(1)}},s;for(s in t)r[s]=s.substr(0,2)===`on`&&qg(t[s])&&s!==`onRefreshInit`?o(s,t[s]):t[s];return qg(a)&&(a=a(),w_(xv,`refresh`,function(){return a=t.batchMax()})),$h(e).forEach(function(e){var t={};for(s in r)t[s]=r[s];t.trigger=e,n.push(xv.create(t))}),n};var Sv=function(e,t,n,r){return t>r?e(r):t<0&&e(0),n>r?(r-t)/(n-t):n<0?t/(t-n):1},Cv=function e(t,n){n===!0?t.style.removeProperty(`touch-action`):t.style.touchAction=n===!0?`auto`:n?`pan-`+n+(Gh.isTouch?` pinch-zoom`:``):`none`,t===Yh&&e(Xh,n)},wv={auto:1,scroll:1},Tv=function(e){var t=e.event,n=e.target,r=e.axis,i=(t.changedTouches?t.changedTouches[0]:t).target,a=i._gsap||$.core.getCache(i),o=Eg(),s;if(!a._isScrollT||o-a._isScrollT>2e3){for(;i&&i!==Xh&&(i.scrollHeight<=i.clientHeight&&i.scrollWidth<=i.clientWidth||!(wv[(s=m_(i)).overflowY]||wv[s.overflowX]));)i=i.parentNode;a._isScroll=i&&i!==n&&!zg(i)&&(wv[(s=m_(i)).overflowY]||wv[s.overflowX]),a._isScrollT=o}(a._isScroll||r===`x`)&&(t.stopPropagation(),t._gsapAllow=!0)},Ev=function(e,t,n,r){return Gh.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:r&&=Tv,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return n&&w_(Jh,Gh.eventTypes[0],kv,!1,!0)},onDisable:function(){return T_(Jh,Gh.eventTypes[0],kv,!0)}})},Dv=/(input|label|select|textarea)/i,Ov,kv=function(e){var t=Dv.test(e.target.tagName);(t||Ov)&&(e._gsapAllow=!0,Ov=t)},Av=function(e){Yg(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type=`wheel,touch`),e.debounce=!!e.debounce,e.id=e.id||`normalizer`;var t=e,n=t.normalizeScrollX,r=t.momentum,i=t.allowNestedScroll,a=t.onRelease,o,s,c=Lh(e.target)||Yh,l=$.core.globals().ScrollSmoother,u=l&&l.get(),d=_g&&(e.content&&Lh(e.content)||u&&e.content!==!1&&!u.smooth()&&u.content()),f=zh(c,Ih),p=zh(c,Fh),m=1,h=(Gh.isTouch&&qh.visualViewport?qh.visualViewport.scale*qh.visualViewport.width:qh.outerWidth)/qh.innerWidth,g=0,_=qg(r)?function(){return r(o)}:function(){return r||2.8},v,y,b=Ev(c,e.type,!0,i),x=function(){return y=!1},S=Fg,C=Fg,w=function(){s=Wg(c,Ih),C=eg(+!!_g,s),n&&(S=eg(0,Wg(c,Fh))),v=X_},T=function(){d._gsap.y=Ig(parseFloat(d._gsap.y)+f.offset)+`px`,d.style.transform=`matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, `+parseFloat(d._gsap.y)+`, 0, 1)`,f.offset=f.cacheID=0},E=function(){if(y){requestAnimationFrame(x);var e=Ig(o.deltaY/2),t=C(f.v-e);if(d&&t!==f.v+f.offset){f.offset=t-f.v;var n=Ig((parseFloat(d&&d._gsap.y)||0)-f.offset);d.style.transform=`matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, `+n+`, 0, 1)`,d._gsap.y=n+`px`,f.cacheID=Sh.cache,av()}return!0}f.offset&&T(),y=!0},D,O,k,A,j=function(){w(),D.isActive()&&D.vars.scrollY>s&&(f()>s?D.progress(1)&&f(s):D.resetTo(`scrollY`,s))};return d&&$.set(d,{y:`+=0`}),e.ignoreCheck=function(e){return _g&&e.type===`touchmove`&&E(e)||m>1.05&&e.type!==`touchstart`||o.isGesturing||e.touches&&e.touches.length>1},e.onPress=function(){y=!1;var e=m;m=Ig((qh.visualViewport&&qh.visualViewport.scale||1)/h),D.pause(),e!==m&&Cv(c,m>1.01||!n&&`x`),O=p(),k=f(),w(),v=X_},e.onRelease=e.onGestureStart=function(e,t){if(f.offset&&T(),!t)A.restart(!0);else{Sh.cache++;var r=_(),i,o;n&&(i=p(),o=i+r*.05*-e.velocityX/.227,r*=Sv(p,i,o,Wg(c,Fh)),D.vars.scrollX=S(o)),i=f(),o=i+r*.05*-e.velocityY/.227,r*=Sv(f,i,o,Wg(c,Ih)),D.vars.scrollY=C(o),D.invalidate().duration(r).play(.01),(_g&&D.vars.scrollY>=s||i>=s-1)&&$.to({},{onUpdate:j,duration:r})}a&&a(e)},e.onWheel=function(){D._ts&&D.pause(),Eg()-g>1e3&&(v=0,g=Eg())},e.onChange=function(e,t,r,i,a){if(X_!==v&&w(),t&&n&&p(S(i[2]===t?O+(e.startX-e.x):p()+t-i[1])),r){f.offset&&T();var o=a[2]===r,s=o?k+e.startY-e.y:f()+r-a[1],c=C(s);o&&s!==c&&(k+=c-s),f(c)}(r||t)&&av()},e.onEnable=function(){Cv(c,!n&&`x`),xv.addEventListener(`refresh`,j),w_(qh,`resize`,j),f.smooth&&=(f.target.style.scrollBehavior=`auto`,p.smooth=!1),b.enable()},e.onDisable=function(){Cv(c,!0),T_(qh,`resize`,j),xv.removeEventListener(`refresh`,j),b.kill()},e.lockAxis=e.lockAxis!==!1,o=new Gh(e),o.iOS=_g,_g&&!f()&&f(1),_g&&$.ticker.add(Fg),A=o._dc,D=$.to(o,{ease:`power4`,paused:!0,inherit:!1,scrollX:n?`+=0.1`:`+=0`,scrollY:`+=0.1`,modifiers:{scrollY:vv(f,f(),function(){return D.pause()})},onUpdate:av,onComplete:A.vars.onComplete}),o};xv.sort=function(e){if(qg(e))return N_.sort(e);var t=qh.pageYOffset||0;return xv.getAll().forEach(function(e){return e._sortY=e.trigger?t+e.trigger.getBoundingClientRect().top:e.start+qh.innerHeight}),N_.sort(e||function(e,t){return(e.vars.refreshPriority||0)*-1e6+(e.vars.containerAnimation?1e6:e._sortY)-((t.vars.containerAnimation?1e6:t._sortY)+(t.vars.refreshPriority||0)*-1e6)})},xv.observe=function(e){return new Gh(e)},xv.normalizeScroll=function(e){if(e===void 0)return pg;if(e===!0&&pg)return pg.enable();if(e===!1)pg&&pg.kill(),pg=e;else{var t=e instanceof Gh?e:Av(e);return pg&&pg.target===t.target&&pg.kill(),zg(t.target)&&(pg=t),t}},xv.core={_getVelocityProp:Bh,_inputObserver:Ev,_scrollers:Sh,_proxies:Ch,bridge:{ss:function(){Og||U_(`scrollStart`),Og=Eg()},ref:function(){return rg}}},Rg()&&$.registerPlugin(xv),mi.registerPlugin(xv);var jv=class{y=0;max=0;direction=1;bandPx=120;top=0;bottom=0;trigger;constructor(e){this.y=window.scrollY,this.trigger=xv.create({start:0,end:`max`,onUpdate:t=>{this.direction=t.direction||1,e()}})}get progress(){return this.max>0?this.y/this.max:0}measure(e){this.max=Math.max(0,document.documentElement.scrollHeight-e),this.bandPx=Math.max(64,e*Z.scroll.band)}update(e){this.y=window.scrollY;let t=e?{top:0,bottom:0}:Rp(this.y,this.max,this.bandPx);this.top=t.top,this.bottom=t.bottom}destroy(){this.trigger.kill()}},Mv=`
precision highp float;
precision highp int;
uniform float uTime;
uniform float uMotion;        // 0 with prefers-reduced-motion
uniform vec3 uAmb[4];         // amber scale: deep, mid, hot, core
uniform float uEmissive;      // 1 while rendering the emission-only pass that feeds the bloom

float h11(float p){ p=fract(p*.1031); p*=p+33.33; p*=p+p; return fract(p); }
float h21(vec2 p){ vec3 p3=fract(vec3(p.xyx)*.1031); p3+=dot(p3,p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
float vnoise(vec2 p){
  vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(h21(i),h21(i+vec2(1,0)),f.x), mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x), f.y);
}
vec3 ramp(float x){
  x=clamp(x,0.,1.);
  vec3 c=mix(uAmb[0],uAmb[1],smoothstep(0.,.36,x));
  c=mix(c,uAmb[2],smoothstep(.36,.72,x));
  return mix(c,uAmb[3],smoothstep(.76,1.,x));
}
`,Nv=`
float aa(float b){ float w=fwidth(b); return 1.-smoothstep(w*.4,w*1.4,b); }
float hair(float b){ float w=fwidth(b); return 1.-smoothstep(0.,w*.85,b); }
`,Pv=`
uniform sampler2D uInk;
uniform float uHasInk;
uniform vec4 uInkMap;         // xy: local px of the surface → canvas origin offset, zw: 1 / canvas size in local px
vec2 inkUv(vec2 p){ return (p+uInkMap.xy)*uInkMap.zw; }
uniform float uInkA;          // LevelUp: type of a carousel board dims with its focus, as in the DOM (1 elsewhere)
vec4 inkAt(vec2 p){
  vec2 uv=inkUv(p);
  return uHasInk*uInkA*texture(uInk,clamp(uv,0.,1.))*step(0.,uv.x)*step(uv.x,1.)*step(0.,uv.y)*step(uv.y,1.);
}
`,Fv=`
uniform vec4 uFrag;           // css px per target px (x, y), target height (px)
uniform vec4 uClipRect;       // client px: left, top, right, bottom (right < left: no clip)
uniform float uClipFade;      // px faded at the left and right of the clip (the carousel mask)
uniform float uAlpha;         // element opacity
float layer(){
  if(uClipRect.z<uClipRect.x) return uAlpha;
  vec2 c=vec2(gl_FragCoord.x*uFrag.x,(uFrag.z-gl_FragCoord.y)*uFrag.y);
  float v=step(uClipRect.y,c.y)*step(c.y,uClipRect.w);
  float d=min(c.x-uClipRect.x,uClipRect.z-c.x);
  float m=uClipFade>0.?clamp(d/uClipFade,0.,1.):step(0.,d);
  return uAlpha*v*m;
}
`,Iv=`
float stopsAt(vec2 s[6], int n, float t){
  float a=s[0].y;
  if(t<=s[0].x) return a;
  for(int i=1;i<6;i++){
    if(i>=n) break;
    if(t<=s[i].x){ float span=s[i].x-s[i-1].x; return span<=1e-6?s[i].y:mix(s[i-1].y,s[i].y,(t-s[i-1].x)/span); }
    a=s[i].y;
  }
  return a;
}
`,Lv=`
uniform float uHover;
uniform float uGain;
float warmth(vec2 p){ return clamp(uHover*uGain,0.,1.)*(.96+.04*sin(uTime*.8+p.x*.0025)*uMotion); }
`,Rv=`
struct Tri { vec3 b; vec2 c; float id; float edge; };
const mat2 ROT=mat2(.9455,.3256,-.3256,.9455);
vec2 toL(vec2 p,float S){ p=ROT*p; float qy=p.y/.866; return vec2(p.x-.5*qy,qy)/S; }
Tri tri(vec2 q, vec2 sub){
  vec2 i=floor(q), f=fract(q);
  bool up=f.x+f.y>1.;
  vec2 v0,v1,v2; vec3 b;
  if(!up){ v0=i; v1=i+vec2(1,0); v2=i+vec2(0,1); b=vec3(1.-f.x-f.y,f.x,f.y); }
  else { v0=i+vec2(1,1); v1=i+vec2(0,1); v2=i+vec2(1,0); b=vec3(f.x+f.y-1.,1.-f.x,1.-f.y); }
  float id=h21(i+(up?vec2(.37,.61):vec2(0.))+vec2(17.3,5.9));
  float scale=1.;
  for(int l=0;l<2;l++){
    if(h11(id*91.7+float(l)*3.1)>=sub[l]) break;
    vec2 A=v0,B=v1,C=v2; float k;
    if(b.x>.5){ v1=(A+B)*.5; v2=(A+C)*.5; b=vec3(2.*b.x-1.,2.*b.y,2.*b.z); k=1.; }
    else if(b.y>.5){ v0=(A+B)*.5; v2=(B+C)*.5; b=vec3(2.*b.x,2.*b.y-1.,2.*b.z); k=2.; }
    else if(b.z>.5){ v0=(A+C)*.5; v1=(B+C)*.5; b=vec3(2.*b.x,2.*b.y,2.*b.z-1.); k=3.; }
    else { v0=(B+C)*.5; v1=(A+C)*.5; v2=(A+B)*.5; b=vec3(1.)-2.*b; k=4.; }
    id=h11(id*57.3+k*13.7); scale*=.5;
  }
  Tri t; t.b=b; t.c=(v0+v1+v2)/3.; t.id=id; t.edge=min(b.x,min(b.y,b.z))*scale;
  return t;
}
`,zv=`
uniform vec2 uView;           // viewport, CSS px
uniform float uScroll;
vec4 clipOf(vec2 doc){ vec2 c=(doc-vec2(0.,uScroll))/uView*2.-1.; return vec4(c.x,-c.y,0.,1.); }
`,Bv=`
uniform vec2 uOrigin;         // document px of the surface's top-left
uniform mat4 uXf;             // local px → document px, homogeneous (only with uHasXf)
uniform float uHasXf;
vec4 placeH(vec2 l){ return uHasXf>.5?uXf*vec4(l,0.,1.):vec4(uOrigin+l,0.,1.); }
vec2 docOf(vec2 l){ vec4 h=placeH(l); return h.xy/h.w; }
vec4 clipAt(vec2 l){ vec4 h=placeH(l); vec4 c=clipOf(h.xy/h.w); return vec4(c.xy*h.w,0.,h.w); }
`,Vv=`
uniform float uBand;          // px
uniform vec2 uBandK;          // top, bottom enable (0 at document start / end)
uniform float uLoad;
float fragAt(float cy){
  float eT=clamp(1.-cy/uBand,0.,1.)*uBandK.x, eB=clamp(1.-(uView.y-cy)/uBand,0.,1.)*uBandK.y;
  return pow(max(eT,eB),1.25);
}
float delayAt(vec2 cd, float seed){ return clamp(mix(seed,vnoise(cd/250.+3.7),.64)*1.16-.08,0.,1.); }
float loadAbs(float delay){ return 1.-smoothstep(delay-.09,delay+.09,uLoad*1.3-.15); }
`,Hv=`
uniform vec2 uSize;
uniform vec2 uCut;            // top-left, bottom-right
float sdTab(vec2 p){
  vec2 h=uSize*.5, q=p-h, d=abs(q)-h;
  float box=length(max(d,0.))+min(max(d.x,d.y),0.);
  float tl=(uCut.x-p.x-p.y)*.7071, br=(uCut.y-(uSize.x-p.x)-(uSize.y-p.y))*.7071;
  return max(box,max(tl,br));
}
/* Position 0..1 along the outline, clockwise from the top-left corner (mirrors border.ts). */
float outlineAt(vec2 p){
  float w=uSize.x, h=uSize.y;
  vec2 q=clamp(p,vec2(0.),uSize);
  float dT=q.y, dR=w-q.x, dB=h-q.y, dL=q.x, m=min(min(dT,dR),min(dB,dL));
  float s=m==dT?q.x:(m==dR?w+q.y:(m==dB?w+h+(w-q.x):2.*w+h+(h-q.y)));
  return s/(2.*(w+h));
}
`,Uv=`
uniform sampler2D uImg;
uniform float uHasImg;
uniform vec4 uImgBox;         // local px: x, y, w, h of the <img> box
uniform vec4 uImgFit;         // uv = q * zw + xy
uniform vec3 uImgStyle;       // opacity, left fade (faq), legibility gradient
/* LevelUp: the before layer of a comparison (left of uSplit), the container the photograph is clipped to, the img's
   own mask-image and the black ::after shade the DOM lays over it */
uniform sampler2D uImg2;
uniform float uHasImg2;
uniform float uSplit;         // local px
uniform vec4 uImgClip;        // local px: x0, y0, x1, y1
uniform vec4 uImgMask;        // gradient line in the img box (dir.xy, 1/length), stop count
uniform vec2 uMaskStops[6];
uniform vec4 uShadeBox;       // local px: x, y, w, h of the shaded box
uniform vec4 uShadeLine;      // dir.xy, 1/length, stop count
uniform vec2 uShade[6];
${Iv}
float shadeAt(vec2 p){
  if(uShadeLine.w<.5) return 0.;
  vec2 b=p-uShadeBox.xy;
  float inS=step(0.,b.x)*step(b.x,uShadeBox.z)*step(0.,b.y)*step(b.y,uShadeBox.w);
  return inS*stopsAt(uShade,int(uShadeLine.w),dot(b-uShadeBox.zw*.5,uShadeLine.xy)*uShadeLine.z+.5);
}
/* x: luminance, y: coverage, z: shade of the legibility gradient; phRGB keeps the colour */
vec3 phRGB=vec3(0.);
vec3 photo(vec2 p, float inside){
  vec3 r=vec3(0.);
  if(uHasImg<.5) return r;
  vec2 q=(p-uImgBox.xy)/uImgBox.zw;
  vec2 uv=q*uImgFit.zw+uImgFit.xy;
  vec2 uc=clamp(uv,0.,1.);
  // both layers sampled in uniform control flow (mipmaps need it), the split picks one
  vec4 ta=texture(uImg,uc), tb=texture(uImg2,uc);
  vec4 t=uHasImg2>.5&&p.x<uSplit?tb:ta;
  // the photographs sit on black: their box fades out over a few percent, so no edge of the image ever shows
  float inBox=smoothstep(0.,.05,q.x)*smoothstep(1.,.95,q.x)*smoothstep(0.,.06,q.y)*smoothstep(1.,.94,q.y)
             *step(0.,uv.x)*step(uv.x,1.)*step(0.,uv.y)*step(uv.y,1.);
  inBox*=step(uImgClip.x,p.x)*step(p.x,uImgClip.z)*step(uImgClip.y,p.y)*step(p.y,uImgClip.w);
  if(uImgMask.w>.5) inBox*=stopsAt(uMaskStops,int(uImgMask.w),dot((q-.5)*uImgBox.zw,uImgMask.xy)*uImgMask.z+.5);
  r.x=dot(t.rgb,vec3(.299,.587,.114)); phRGB=t.rgb;
  r.y=t.a*uImgStyle.x*inside*inBox*mix(1.,smoothstep(0.,.36,q.x),uImgStyle.y);
  if(uImgStyle.z>.5){
    float y=clamp((p.y-uSize.y*.34)/(uSize.y*.66),0.,1.);
    r.z=y<.35?mix(0.,.12,y/.35):(y<.75?mix(.12,.56,(y-.35)/.4):mix(.56,.88,(y-.75)/.25));
  }
  r.z=max(r.z,shadeAt(p));
  return r;
}
`,Wv=`
${Mv}
${zv}
${Bv}
${Vv}
in vec2 position;             // rest position, local px
in vec2 cellCenter;
in float seed;
in vec3 bary;
uniform float uPush;
uniform float uSolid;         // 1: never taken apart by scroll (the map)
uniform vec3 uDrift;          // s since the page stopped (0 while it moves), drift speed (px/s), fade time (s)
out vec2 vLocal; out vec3 vBary; out float vGone; out float vTrans; out float vOv;
vec2 curlAt(vec2 p){
  float e=.35, a=vnoise(p+vec2(0.,e)), b=vnoise(p-vec2(0.,e)), c=vnoise(p+vec2(e,0.)), d=vnoise(p-vec2(e,0.));
  vec2 v=vec2(a-b,-(c-d));
  return v/(length(v)+1e-4);
}
void main(){
  vec2 cd=docOf(cellCenter);
  float cy=cd.y-uScroll;
  // structure = f(rest position): a stop keeps the phase reached, reversing replays it
  float F=fragAt(cy);
  float th=.14+.7*seed;
  float aS=smoothstep(th-.13,th+.13,F)*(1.-uSolid);
  float aL=loadAbs(delayAt(cd,seed));
  float a=max(aS,aL);
  float eT=clamp(1.-cy/uBand,0.,1.)*uBandK.x, eB=clamp(1.-(uView.y-cy)/uBand,0.,1.)*uBandK.y;
  float dir=eT>eB?-1.:1.;
  // dispersal: the cell shrinks, turns and drifts outward carrying its own piece of content
  vec2 off=vec2((h11(seed*91.)-.5)*1.5,dir*(.45+h11(seed*37.)))*uPush*aS*aS
          +(vec2(h11(seed*53.),h11(seed*71.))-.5)*uPush*.9*aL*aL;
  // a light curl swirl on cells in transition; once the page stops, the cells on their way out become particles:
  // they leave along the curl field and fade, while the cells that stay keep the place scroll gave them
  vec2 flow=curlAt(cd*.006+vec2(uTime*.04,0.))*.85+vec2(0.,dir)*.5;
  float leaving=smoothstep(.05,.3,aS);
  float tau=uDrift.x*leaving;
  off+=flow*(tau*uDrift.y*(.6+.8*h11(seed*13.))+aS*7.*uMotion);
  float gone=max(a,leaving*smoothstep(.1,uDrift.z,uDrift.x));
  float rot=(h11(seed*17.)-.5)*(1.3*a+tau*.9);
  vec2 dv=position-cellCenter;
  dv=mat2(cos(rot),sin(rot),-sin(rot),cos(rot))*dv*(1.-.72*a)*(1.-.65*leaving*smoothstep(0.,uDrift.z,uDrift.x));
  vLocal=position; vBary=bary; vGone=gone; vTrans=4.*a*(1.-a);
  // how present the overlay is at this point (the same formula as OVERLAY_VERT's vFade, at the rest position)
  vec2 rd=docOf(position);
  vOv=(1.-smoothstep(.02,.3,fragAt(rd.y-uScroll)*(1.-uSolid)))*(1.-loadAbs(delayAt(rd,.5)));
  gl_Position=clipAt(cellCenter+dv+off);
}`,Gv=`
${Mv}
${Nv}
${Hv}
${Uv}
${Pv}
${Lv}
${Fv}
uniform float uFrameA;        // LevelUp: opacity of the frame (a carousel board's ring dims with its focus)
uniform float uSplitFocus;    // LevelUp: the comparison has keyboard focus (its divider turns amber, as in the DOM)
uniform float uPanel;         // 1 = cut-corner card with fill and border
uniform vec4 uPanelCol;
uniform vec3 uPointer;        // local px of the pointer
uniform float uNear;          // a neighbour in range: nearness of the pointer, 0..1
uniform vec3 uInkWarm;        // type on a card near the pointer: warmth, reach (px), share when only in range
uniform float uVeil;          // black veil over a card at rest (0..1), lifted on hover: it travels with the cells
in vec2 vLocal; in vec3 vBary; in float vGone; in float vTrans; in float vOv;
out vec4 o;
void main(){
  vec2 p=vLocal;
  float sd=uPanel>.5?sdTab(p):-40.;
  float inside=uPanel>.5?1.-smoothstep(-.7,.3,sd):1.;
  vec4 col=uPanel>.5?vec4(uPanelCol.rgb,1.)*uPanelCol.a*inside:vec4(0.);
  vec3 ph=photo(p,inside);
  // the photographs are objects on black: they light the void panel (the brighter of the two), so no box ever shows
  col.rgb=max(col.rgb,vec3(ph.x)*ph.y);
  col.rgb*=1.-ph.z;
  if(uPanel>.5){
    float frame=1.-smoothstep(0.,1.,abs(sd+.7)-.15);
    float k=(p.x/uSize.x+p.y/uSize.y)*.5;
    float g=mix(mix(.74,.3,smoothstep(.1,.9,k)),.62,smoothstep(.75,1.,k));
    col=mix(col,vec4(vec3(g),1.),frame*.62*uFrameA);
  }
  if(uHasImg2>.5){
    // the comparison divider (the DOM's 1 px line): light grey, faded at both ends, amber with keyboard focus
    float dx=abs(p.x-uSplit)-.5, w=fwidth(p.x);
    float line=1.-smoothstep(0.,w*1.2,dx);
    float y=(p.y-uImgClip.y-14.)/max(1.,uImgClip.w-uImgClip.y-28.);
    float fade=smoothstep(0.,.22,y)*smoothstep(1.,.78,y);
    vec3 lc=mix(vec3(.906,.867,.8)*.31,uAmb[2]*.9,uSplitFocus);
    col.rgb+=lc*line*fade*inside*(1.-col.rgb*.5);
  }
  vec4 ink=inkAt(p);
  if(uPanel>.5&&ink.a>.003){
    // type keeps its weight and its single colour; near the pointer it takes a light, very diffuse amber
    vec2 d=p-uPointer.xy;
    float k=exp(-dot(d,d)/(uInkWarm.y*uInkWarm.y))*max(uHover,uNear*uInkWarm.z)*uInkWarm.x;
    ink.rgb*=mix(vec3(1.),vec3(1.,.84,.68),k);
  }
  // large type: as the block warms, the overlay draws that share of the type with the same coverage. The content pass
  // gives it up instead of being covered, so nothing behind the anti-aliased edge is erased (no dark rim)
  if(uPanel<.5) ink*=1.-warmth(p)*vOv;
  col=ink+col*(1.-ink.a);
  // the rest veil of a card (black over panel, photograph, type and frame), inside its outline only
  col.rgb*=1.-uVeil*inside;
  // structure stays monochrome: a cell in transition shows its own seams in grey, nothing lights up
  float seam=aa(min(vBary.x,min(vBary.y,vBary.z)));
  col.rgb=col.rgb*(1.-vTrans*.28)+vec3(.62)*seam*vTrans*col.a*.35;
  float present=(1.-smoothstep(.5,.98,vGone))*layer();
  if(uEmissive>.5){ o=vec4(0.,0.,0.,col.a*present); return; }
  o=col*present;
}`,Kv=`
${Mv}
${zv}
${Bv}
${Vv}
in vec2 position;             // local px (the network extends into a margin around the surface)
in vec3 bary;
in vec4 cell;                 // seed, zone, sheen edge, -
in vec2 energy;               // face, smoothed vertex
in vec2 centre;               // the cell's centre, local px
uniform float uSolid;
out vec2 vLocal; out vec3 vBary; flat out vec4 vCell; flat out float vE; out float vEv; out float vFade; flat out vec2 vCentre;
void main(){
  vec2 d=docOf(position);
  // light belongs to content that is present: it fades where scroll or loading take the structure apart
  vFade=(1.-smoothstep(.02,.3,fragAt(d.y-uScroll)*(1.-uSolid)))*(1.-loadAbs(delayAt(d,.5)));
  vLocal=position; vBary=bary; vCell=cell; vE=energy.x; vEv=energy.y; vCentre=centre;
  gl_Position=clipAt(position);
}`,qv=`
${Mv}
${Nv}
${Hv}
${Uv}
${Pv}
${Fv}
uniform float uVeil;          // the card's rest veil (see SURFACE_FRAG): the light under it is veiled too
uniform float uHover;         // 0..1, eased
uniform float uGain;          // 1 primary, lower for neighbours in range
uniform float uNear;          // a neighbour in range: nearness of the pointer, 0..1, eased
uniform float uTopo;          // density of the topology: 1 on a card, lower on a large panel (amber is an event)
uniform vec4 uBins[24];       // light along the outline, 96 segments
uniform vec3 uPointer;        // local px
uniform float uOwn;           // 1: on hover the photograph shows its own colours (already lit in the house palette)
uniform vec4 uWake;           // reach of the pointer over the cells (px): under it, from outside; share lit across the card; strength from outside
in vec2 vLocal; in vec3 vBary; flat in vec4 vCell; flat in float vE; in float vEv; in float vFade; flat in vec2 vCentre;
out vec4 o;
float binAt(int i){ i=i<0?i+96:(i>95?i-96:i); return uBins[i/4][i-(i/4)*4]; }
float bins(float s){ float x=s*96.-.5, f=fract(x); int i=int(floor(x)); return mix(binAt(i),binAt(i+1),f); }
void main(){
  vec2 p=vLocal;
  float sd=sdTab(p);
  float inside=1.-smoothstep(-.7,.3,sd);
  float E=vE, Ev=vEv, seed=vCell.x;
  float h=h11(seed*7.1), h2=h11(seed*3.3), h3=h11(seed*11.9);
  vec4 ink=inkAt(p);
  vec3 ph=photo(p,inside);
  float lum=ph.x, ia=ph.y;
  float be=vCell.z<.5?vBary.x:(vCell.z<1.5?vBary.y:vBary.z);
  float sweep=exp(-be*3.4);
  vec2 dp=p-uPointer.xy;

  // 1 · the photograph lit from within: a warm grade of its own luminance, never a flat tint over it.
  //     A neighbour in range warms a little, on the side facing the pointer
  float lift=clamp(uHover*.72+Ev*.8,0.,1.)*uGain+uNear*.32*exp(-dot(dp,dp)/(uWake.x*uWake.x*2.6));
  float gA=ia*min(lift*(1.+.35*uOwn),1.)*(1.-ph.z*.5)*smoothstep(.015,.12,lum);   // black stays black: no visible image box
  // contained: the light lives on the crests of the object, its brightest core never burns out
  float l=pow(lum,1.05);
  vec3 graded=ramp(clamp(l*1.12+.1,0.,.84))*(l*1.7);
  graded*=1.+E*(.24*sweep-.08+.18*(h-.5));                 // each lit cell grades a little differently
  graded=mix(graded,phRGB*(.94+.3*E*sweep),uOwn);

  // 2 · one set of cells, of every size, gathered along the outline. Each cell has its own visibility: strong, faint,
  //     barely there, none. The pointer wakes them where it is (from outside too, on the side facing it) and the
  //     reaction travels through the same cells: one material, lit more or less
  float edgeK=vCell.w;
  float r=h11(seed*17.3+1.7), dens=mix(.32,1.,edgeK);
  float vis=r<dens*.14?1.:(r<dens*.36?.46:(r<dens*.64?.16:0.));
  vec2 dc=vCentre-uPointer.xy;
  float wake=uHover*uGain*(uWake.z+(1.-uWake.z)*exp(-dot(dc,dc)/(uWake.x*uWake.x)))+uNear*uWake.w*exp(-dot(dc,dc)/(uWake.y*uWake.y));
  float beat=.62+.38*sin(uTime*(.22+.3*h)+h2*6.283)*uMotion;
  // no still field of triangles: they show where the reaction passes and close to the pointer, nowhere else
  float L=clamp(vis*wake*beat*uTopo+E*(.45+.8*max(vis,.35)),0.,1.);
  float sat=.3+.7*h2;                                        // some cells deep amber, others close to neutral
  float fA=inside*L*(.05+.24*h)*(.3+.7*sweep)*(1.-ia*.4*smoothstep(.04,.3,lum));   // the object, not its box
  vec3 facet=ramp(.24+.44*L*sweep);
  facet=mix(vec3(dot(facet,vec3(.3333))),facet,sat)*(.45+.9*sweep);
  // the seams: hairlines (under half a pixel per side, so a shared edge stays under a pixel), never summed at a corner
  float edges=max(max(hair(vBary.x)*step(.45,h2),hair(vBary.y)*step(.45,h3)),hair(vBary.z)*step(.45,h));
  vec3 wc=ramp(.6+.32*L);
  vec3 wire=mix(vec3(dot(wc,vec3(.3333))),wc,sat)*edges*L*(.34+.42*edgeK)*inside;   // one scale of cells: seams even, a little more along the outline

  // 3 · the outline lights by segment: a thin bright core and a soft local halo
  float Eb=bins(outlineAt(p));
  float core=1.-smoothstep(0.,1.25,abs(sd+.6));
  float halo=sd>0.?exp(-sd/7.5):exp(sd/16.)*.35;
  vec3 glow=ramp(.5+.36*Eb)*(core*Eb*1.7+halo*Eb*.9)*vFade;

  vec4 c=vec4(graded*gA,gA);
  c=vec4(facet*fA+c.rgb*(1.-fA),fA+c.a*(1.-fA));
  c.rgb+=wire;
  // type and icons are drawn once, by the content pass: light never covers them (and never thickens them)
  c*=(1.-ink.a)*vFade;
  float veil=1.-uVeil*inside;
  float lay=layer();
  if(uEmissive>.5){ o=vec4((graded*gA*smoothstep(.4,.9,lum)*.4+facet*fA*.7+wire)*(1.-ink.a)*vFade*veil+glow,0.)*lay; return; }
  o=vec4(c.rgb*veil+glow,c.a)*lay;
}`,Jv=`
${Mv}
${Nv}
${Rv}
${Pv}
${Lv}
uniform vec2 uSize;
uniform sampler2D uDist;      // signed distance to the letters (0.5 on the outline, ±uRange px at 0 and 1), mapped like the ink
uniform float uRange;         // px
uniform float uEm;            // px, font size
uniform vec2 uGray;           // luminance of the idle gradient at the base and at the top of the block
uniform vec4 uTitle[6];       // the amber gradient, top to base: colour, luminance of its desaturated (idle) version
uniform vec3 uHot[3];         // where the range reaches: top, middle, base
uniform vec3 uPointer;        // local px, range of the pointer (px)
uniform float uMicro;         // px, micro-lattice inside the glyphs
uniform float uLoad;
in vec2 vLocal; in vec3 vBary; flat in vec4 vCell; flat in float vE; in float vEv; in float vFade;
out vec4 o;
/* px from the nearest outline: negative inside a letter; beyond the texture, the distance to it is added */
float sdAt(vec2 p){
  vec2 uv=inkUv(p), q=clamp(uv,0.,1.);
  return (texture(uDist,q).r-.5)*2.*uRange+length((uv-q)/uInkMap.zw);
}
/* The idle gradient is the amber one desaturated: its grey gives back the amber colour at the same height. */
vec3 amberOf(float lum){
  vec3 c=uTitle[0].rgb;
  for(int i=1;i<6;i++){
    float hi=uTitle[i-1].w, lo=uTitle[i].w;
    if(lum<hi) c=mix(uTitle[i-1].rgb,uTitle[i].rgb,clamp((hi-lum)/max(hi-lo,1e-4),0.,1.));
  }
  return c;
}
void main(){
  vec2 p=vLocal;
  // two levels: on hover the whole block takes its amber gradient (base) and a golden lattice inside the letters; the
  // cells the range reaches and the reaction they start go warm yellow, the lattice denser there (local). Never a disc
  float base=warmth(p);
  float local=clamp(vEv*1.12+vE*.32,0.,1.15);
  // the warmth of the block decides everything: leaving, the whole look desaturates back into the idle gradient as one
  // piece (never cell by cell, never an overlay fading out). While the page builds, a few cells flash as they join
  float W=max(base,local*clamp((1.-uLoad)*3.,0.,1.)*.8);
  if(W<.004) discard;
  float sd=sdAt(p);
  if(sd>uRange) discard;
  vec4 ink=inkAt(p);
  float a=ink.a;
  float lum=a>.003?dot(ink.rgb/a,vec3(.299,.587,.114)):1.;
  float t=clamp((lum-uGray.x)/(uGray.y-uGray.x),0.,1.);   // 0 at the base of the block, 1 at its top
  vec3 idle=vec3(lum), amber=amberOf(lum);
  // in range: warm yellow, paler at the top, deeper toward the base; it climbs from the base as the range grows
  float fill=smoothstep(t-.3,t+.06,local*1.05);
  vec3 hot=t>.5?mix(uHot[1],uHot[0],(t-.5)*2.):mix(uHot[2],uHot[1],t*2.);
  // micro-facets of mixed sizes inside the letters, switched on and off slowly: across the block on hover, denser and
  // brighter where the range is
  float reach=max(local,base*.5);
  Tri m=tri(toL(p,uMicro),vec2(.62,.42));
  float mh=h11(m.id*5.1), mh2=h11(m.id*9.7);
  float th=.18+.6*mh*mh+.05*sin(uTime*(.16+.4*mh2)+mh*40.)*uMotion;
  float lit=smoothstep(th,th+.16,reach)*step(.2,mh2);
  vec3 facet=mix(ramp(.4+.22*reach*mh),hot,.25+.3*h11(m.id*2.7))*(.8+.35*h11(m.id*4.3)-.15*m.b.y);
  float wire=(1.-smoothstep(0.,1.,m.edge*uMicro*.8))*step(.45,h11(m.id*11.3));
  vec3 col=amber;
  col=mix(col,hot,fill);
  col=mix(col,facet,lit*mix(.4,.55,clamp(local,0.,1.)));
  col=mix(col,vec3(1.,.9,.74),wire*lit*.3);
  // the overlay takes over the share W of the type, with the type's own coverage: the content pass has given up exactly
  // that share (SURFACE_FRAG), so the edges keep their anti-aliasing and nothing behind them is erased (no dark rim)
  float k=vFade;
  float cov=a*k*W;
  // warm light that follows each letter: a rim just inside the outline where the energy is, a soft glow outside.
  // Both are light only (added, no coverage): they never darken what is around the letters
  float g=clamp(local*1.1+base*.4,0.,1.)*vFade*W;
  float rim=a*exp(-max(-sd,0.)/(uEm*.02));
  float outer=(1.-a)*exp(-max(sd,0.)/(uEm*.045))*(1.-smoothstep(uRange*.5,uRange,sd));
  vec3 rimC=ramp(.56+.2*g)*rim*local*vFade*.6*W;
  vec3 glow=ramp(.42+.2*g)*outer*(.04+.17*g)*vFade*W;
  // bloom: a touch of brilliance from the reached letters, the lattice and their rim, held low
  if(uEmissive>.5){ o=vec4(((hot*a*fill*.09+facet*a*lit*.07)*vFade+rimC*.24+glow*.3)*W,0.); return; }
  o=vec4(col*cov+rimC*k+glow,cov);
}`,Yv=`
precision highp float;
${zv}
in vec2 corner;
in vec3 cbary;
in vec4 aP;                   // x, y (document px), size, rotation
in vec3 aL;                   // life 1..0, heat, opacity
out float vLife; out float vHeat; out float vOp; out vec3 vB;
void main(){
  float s=sin(aP.w), c=cos(aP.w);
  gl_Position=clipOf(aP.xy+mat2(c,s,-s,c)*corner*aP.z);
  vLife=aL.x; vHeat=aL.y; vOp=aL.z; vB=cbary;
}`,Xv=`
${Mv}
${Nv}
in float vLife; in float vHeat; in float vOp; in vec3 vB;
out vec4 o;
void main(){
  float a=smoothstep(0.,.3,vLife)*smoothstep(1.,.85,vLife)*vOp;
  // larger shards are translucent with a bright rim; sparks are solid
  float rim=aa(min(min(vB.x,vB.y),vB.z));
  float body=vOp<.99?mix(.55,1.5,rim):1.;
  vec3 c=ramp(.4+.6*vHeat)*a*body*1.3;
  o=vec4(c,uEmissive>.5?0.:a*.3);
}`,Zv=`
precision highp float;
in vec2 position;
out vec2 vUv;
void main(){ vUv=position*.5+.5; gl_Position=vec4(position,0.,1.); }`,Qv=`
precision highp float;
uniform sampler2D uTex;
uniform vec2 uStep;
in vec2 vUv; out vec4 o;
void main(){
  vec4 c=texture(uTex,vUv)*.2270;
  c+=(texture(uTex,vUv+uStep*1.385)+texture(uTex,vUv-uStep*1.385))*.3162;
  c+=(texture(uTex,vUv+uStep*3.231)+texture(uTex,vUv-uStep*3.231))*.0703;
  o=c;
}`,$v=`
precision highp float;
uniform sampler2D uScene;
uniform sampler2D uBloom;
uniform sampler2D uStreak;
uniform vec2 uRes;            // drawing buffer, px
uniform vec4 uMix;            // bloom, streak, vignette, grain
uniform vec2 uLens;           // chromatic aberration at the corners (px), shoulder
uniform float uFrame;         // grain frame (24 steps a second), fixed with reduced motion
in vec2 vUv; out vec4 o;
float ign(vec2 p){ return fract(52.9829189*fract(dot(p,vec2(.06711056,.00583715)))); }
float hash(vec2 p){ vec3 p3=fract(vec3(p.xyx)*.1031); p3+=dot(p3,p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
vec3 shoulder(vec3 c){
  float k=uLens.y;
  vec3 over=max(c-k,0.);
  return min(c,vec3(k))+(1.-k)*(1.-exp(-over/(1.-k)));
}
void main(){
  vec2 c=vUv-.5, asp=vec2(uRes.x/uRes.y,1.);
  float r=length(c*asp)/length(.5*asp);                  // 0 centre .. 1 corner
  vec4 s=texture(uScene,vUv);
  if(uLens.x>0.){
    vec2 off=normalize(c+1e-6)*uLens.x*smoothstep(.45,1.,r)*r/uRes;
    s.r=texture(uScene,vUv+off).r; s.b=texture(uScene,vUv-off).b;
  }
  vec3 col=s.rgb;
  if(uMix.x>0.) col+=texture(uBloom,vUv).rgb*uMix.x;
  if(uMix.y>0.) col+=texture(uStreak,vUv).rgb*vec3(1.,.82,.62)*uMix.y;
  col=shoulder(col);
  col*=1.-uMix.z*smoothstep(.42,1.05,r)*smoothstep(.42,1.05,r);
  float l=dot(col,vec3(.299,.587,.114));
  float grain=(hash(gl_FragCoord.xy+vec2(uFrame*17.31,uFrame*-9.73))-.5)*2.;
  col+=(grain*uMix.w*smoothstep(.004,.12,l)*(1.-.6*l)+(ign(gl_FragCoord.xy+uFrame*5.588)-.5)/255.)*s.a;   // nothing on a transparent pixel
  float a=s.a;
  if(a<1.) a=clamp(max(a,max(col.r,max(col.g,col.b))),0.,1.);
  o=vec4(max(col,0.),a);
}`,ey=(e,t,n)=>Math.min(n,Math.max(t,e)),ty=(e,t)=>{let n=e?Math.min(6,e.stops.length):0;for(let r=0;r<6;r++){let i=e?.stops[Math.min(r,n-1)];t[r*2]=i?.t??0,t[r*2+1]=i?.a??0}return n},ny=[-1e6,-1e6,1e6,1e6],ry=/* @__PURE__ */ new Map;function iy(e){let t=ry.get(e);return t||(t=new Promise(t=>{let n=new Image;n.decoding=`async`,n.onload=()=>n.decode().then(()=>t(n),()=>t(n)),n.onerror=()=>t(null),n.src=e}),ry.set(e,t)),t}var ay=(e,t)=>e+Math.random()*(t-e),oy=()=>document.documentElement,sy=e=>(e.boundingSphere=new uc(new Y,1e6),e),cy=[1,0,0,0,1,0,0,0,1],ly=e=>{let t=new Float32Array(e*9);for(let e=0;e<t.length;e++)t[e]=cy[e%9];return t},uy=class e{canvas;registry;static create(t,n){try{return new e(t,n)}catch(e){return console.warn(`Memento VFX disabled:`,e),oy().classList.remove(`vfx-boot`,`vfx-live`),oy().classList.add(`vfx-off`),null}}renderer;scene=new ws;post=new ws;camera=new Jl(52,1,.02,400);globals;lastScroll=0;still=0;parts=new Dm;partGeo=new Xl;partBuf;partMesh;rtMain;rtE;rtA;rtB;rtS1;rtS2;blur;grade;fsMesh;surfaces=/* @__PURE__ */ new Map;byIndex=[];input=new Cm;scroll;hovered=null;viewH=1;clock=0;frame=0;load={value:0};loadTween=null;live=!1;loaded=!1;lost=!1;destroyed=!1;layoutDirty=!0;renderDirty=!0;motionDirty=!0;quality=`high`;pinned=!1;slow=0;frames=0;reduced=matchMedia(`(prefers-reduced-motion: reduce)`).matches;abort=new AbortController;cleanups=[];nextIndex=0;constructor(e,t){this.canvas=e,this.registry=t;let n=new Dp({canvas:e,alpha:!0,antialias:!1,premultipliedAlpha:!0,depth:!1,stencil:!1,powerPreference:`high-performance`});if(!n.capabilities.isWebGL2)throw n.dispose(),Error(`WebGL2 unavailable`);this.renderer=n,n.autoClear=!1,n.setClearColor(0,0);let r=n.getContext(),i=r.getExtension(`WEBGL_debug_renderer_info`),a=i?String(r.getParameter(i.UNMASKED_RENDERER_WEBGL)):``;/swiftshader|llvmpipe|software|basic render/i.test(a)?this.quality=`low`:matchMedia(`(pointer: coarse)`).matches&&(this.quality=`medium`);let o=new URLSearchParams(location.search).get(`vfx`);o&&o in Z.quality&&(this.quality=o,this.pinned=!0);let s=Z.color.amber;this.globals={uTime:{value:0},uMotion:{value:+!this.reduced},uAmb:{value:[...Op(s.deep),...Op(s.mid),...Op(s.hot),...Op(s.core)]},uEmissive:{value:0},uView:{value:new go(1,1)},uScroll:{value:0},uBand:{value:120},uBandK:{value:new go(0,0)},uLoad:{value:0},uDrift:{value:new Y(0,Z.scroll.drift,Z.scroll.fade)},uFrag:{value:new Io(1,1,1,0)}};let c=new Float32Array([0,-1,.9,.62,-.9,.62]);this.partGeo.setAttribute(`corner`,new rc(c,2)),this.partGeo.setAttribute(`cbary`,new rc(new Float32Array(cy),3)),this.partBuf=new pu(this.parts.gpu,7),this.partBuf.setUsage(Ua),this.partGeo.setAttribute(`aP`,new Sc(this.partBuf,4,0)),this.partGeo.setAttribute(`aL`,new Sc(this.partBuf,3,4)),this.partGeo.instanceCount=0,sy(this.partGeo),this.partMesh=new Kc(this.partGeo,this.material(Yv,Xv,{})),this.partMesh.renderOrder=1e7,this.partMesh.frustumCulled=!1,this.scene.add(this.partMesh);let l=n.extensions,u=l.has(`EXT_color_buffer_float`)||l.has(`EXT_color_buffer_half_float`)?ji:wi,d=(e,t=0)=>new Ro(4,4,{depthBuffer:e,minFilter:xi,magFilter:xi,type:u,samples:t});this.rtMain=d(!0,4),this.rtE=d(!0),this.rtA=d(!1),this.rtB=d(!1),this.rtS1=d(!1),this.rtS2=d(!1);let f=sy(new vc);f.setAttribute(`position`,new rc(new Float32Array([-1,-1,3,-1,-1,3]),2));let p=(e,t)=>new vl({glslVersion:Wa,vertexShader:Zv,fragmentShader:e,uniforms:t,depthTest:!1,depthWrite:!1});this.blur=p(Qv,{uTex:{value:null},uStep:{value:new go}}),this.grade=p($v,{uScene:{value:this.rtMain.texture},uBloom:{value:this.rtB.texture},uStreak:{value:this.rtS1.texture},uRes:{value:new go(1,1)},uMix:{value:new Io},uLens:{value:new go},uFrame:{value:0}}),this.grade.blending=0,this.fsMesh=new Kc(f,this.blur),this.fsMesh.frustumCulled=!1,this.post.add(this.fsMesh),oy().classList.add(`vfx-ready`),this.scroll=new jv(()=>{this.renderDirty=!0}),this.listen(),new URLSearchParams(location.search).has(`vfxdebug`)&&Object.assign(window,{__vfx:this,__VFX:Z}),mi.ticker.add(this.tick),this.start()}material(e,t,n){return new vl({glslVersion:Wa,vertexShader:e,fragmentShader:t,uniforms:{...this.globals,...n},transparent:!0,premultipliedAlpha:!0,depthTest:!1,depthWrite:!1,side:2})}destroy(){this.destroyed=!0,mi.ticker.remove(this.tick),this.loadTween?.kill(),this.abort.abort(),this.cleanups.forEach(e=>e()),this.scroll.destroy(),this.surfaces.forEach(e=>this.dropSurface(e)),this.surfaces.clear(),this.partGeo.dispose(),this.partMesh.material.dispose(),this.fsMesh.geometry.dispose(),this.blur.dispose(),this.grade.dispose(),[this.rtMain,this.rtE,this.rtA,this.rtB,this.rtS1,this.rtS2].forEach(e=>e.dispose()),this.renderer.dispose(),oy().classList.remove(`vfx-live`,`vfx-boot`,`vfx-ready`)}async start(){let e=e=>new Promise(t=>setTimeout(t,e));if(await Promise.race([document.fonts.ready,e(1500)]),this.destroyed)return;this.layout();let t=[...this.surfaces.values()].filter(e=>e.y<scrollY+this.viewH*1.2&&e.y+e.h>scrollY-100),n=t.map(e=>e.el.querySelector(`img.is-active, img`)).filter(e=>!!e&&!e.complete);if(await Promise.race([Promise.all([...n.map(e=>e.decode().catch(()=>{})),this.whenPainted(t)]),e(1400)]),this.destroyed||(this.layout(),await Promise.race([this.whenPainted(t),e(400)]),this.destroyed||this.lost))return;if(this.goLive(),this.reduced){this.load.value=1,this.loaded=!0;return}this.loadTween=mi.to(this.load,{value:1,duration:Z.loading.duration,ease:`power1.inOut`,onComplete:()=>{this.loaded=!0,this.loadTween=null}});let r=()=>this.loadTween?.timeScale(Z.loading.hurry);for(let e of[`pointerdown`,`wheel`,`keydown`,`touchstart`])addEventListener(e,r,{once:!0,passive:!0,signal:this.abort.signal})}whenPainted(e){return new Promise(t=>{let n=()=>this.destroyed||e.every(e=>e.ready)?t():setTimeout(n,30);n()})}goLive(){this.live=!0,oy().classList.add(`vfx-live`),oy().classList.remove(`vfx-boot`),this.renderDirty=!0}goDom(){this.live=!1,oy().classList.remove(`vfx-live`,`vfx-boot`)}listen(){let e=this.abort.signal,t={passive:!0,signal:e},n=this.input;addEventListener(`pointermove`,e=>n.move(e.clientX,e.clientY,e.pointerType===`touch`),t),addEventListener(`pointerdown`,e=>{n.move(e.clientX,e.clientY,e.pointerType===`touch`),e.pointerType!==`mouse`&&this.pulseAt(e.clientX,e.clientY+scrollY,.9,4)},t),addEventListener(`pointerup`,e=>{e.pointerType!==`mouse`&&(this.pulseAt(e.clientX,e.clientY+scrollY,1,5),n.leave())},t),addEventListener(`pointercancel`,()=>{n.cancel(),this.surfaces.forEach(e=>e.chain?.quench())},t),addEventListener(`blur`,()=>n.leave(),t),oy().addEventListener(`mouseleave`,()=>n.leave(),t),document.addEventListener(`pointerover`,e=>{e.target?.tagName===`IFRAME`&&n.leave()},t),document.addEventListener(`focusin`,e=>{let t=e.target;if(!t.matches?.(`:focus-visible`))return;let n=t.getBoundingClientRect();this.pulseAt(n.left+n.width/2,n.top+n.height/2+scrollY,.7,3)},t),addEventListener(`resize`,()=>{this.layoutDirty=!0},t),document.fonts.addEventListener?.(`loadingdone`,()=>{this.layoutDirty=!0},{signal:e}),this.canvas.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),this.lost=!0,this.goDom()},{signal:e}),this.canvas.addEventListener(`webglcontextrestored`,()=>{this.lost=!1,this.surfaces.forEach(e=>{e.ink&&(e.ink.needsUpdate=!0),e.dist&&(e.dist.needsUpdate=!0),e.img&&(e.img.needsUpdate=!0)}),this.layoutDirty=!0,this.loaded&&this.goLive()},{signal:e});let r=new ResizeObserver(()=>{this.layoutDirty=!0});r.observe(oy());let i=document.querySelector(`main`);i&&r.observe(i),this.cleanups.push(()=>r.disconnect()),this.cleanups.push(this.registry.subscribe((e,t,n)=>{if(e===`motion`)this.motionDirty=!0,this.renderDirty=!0;else if(this.layoutDirty=!0,t&&n){let e=t.getBoundingClientRect();this.pulseAt(e.left+e.width*.3,e.top+e.height*.45+scrollY,n,6,Math.min(e.width,e.height)*.3)}})),document.addEventListener(`load`,e=>{let t=e.target;if(t?.tagName===`IMG`)for(let e of this.surfaces.values())(e.photoEl===t||e.photo2El===t)&&(e.imgDirty=!0,this.renderDirty=!0)},{capture:!0,signal:e}),document.addEventListener(`input`,e=>{e.target?.matches?.(`input[type=range]`)&&(this.renderDirty=!0)},t)}pulseAt(e,t,n,r,i=40){let a=null,o=0,s=0;for(let n of this.surfaces.values()){if(!n.chain||!n.shown)continue;let[r,i]=this.toLocal(n,e,t);r<0||r>n.w||i<0||i>n.h||!this.inClip(n,e,t)||(!a||n.z>a.z)&&(a=n,o=r,s=i)}if(a)for(let e=0;e<r;e++)a.chain.igniteAt(o,s,i,n*ay(.8,1))}toLocal(e,t,n){return e.inv?Zm(e.inv,t,n):e.xf?[-1e6,-1e6]:[t-e.x,n-e.y]}toDoc(e,t,n){return e.xf?Ym(e.xf,t,n):[e.x+t,e.y+n]}inClip(e,t,n){let r=e.clipDoc;return t>=r[0]&&t<=r[2]&&n>=r[1]&&n<=r[3]}updateMotion(e){let t=getComputedStyle(e.el),n=e.u,r=Jm(Qm(t.transform),e.origin[0],e.origin[1],e.x,e.y);e.xf.set(r),e.inv=Xm(r),e.opacity=t.visibility===`hidden`?0:parseFloat(t.opacity)||0,e.z=parseInt(t.zIndex,10)||0,e.shown=e.opacity>.003&&!!e.inv,n.uAlpha.value=e.opacity;let i=1e5+e.group*1e3+e.z*2;if(e.content.renderOrder=i,e.overlay.renderOrder=i+1,e.opt.focus){let e=ey(parseFloat(t.getPropertyValue(`--slide-focus`))||0,0,1),r=Z.focus;n.uInkA.value=ey((e-r.ink)/(1-r.ink),0,1),n.uFrameA.value=r.frame+(1-r.frame)*e,n.uImgStyle.value[0]=r.photo+(1-r.photo)*e}}setPhotos(e){e.imgDirty=!1;let t=e.u,[,,n,r]=e.photoBox,i=++e.photoVersion,a=e.photoEl,o=e.photo2El,s=e=>e&&e.complete&&e.naturalWidth?e.currentSrc||e.src:``,c=s(a),l=s(o);c?Promise.all([iy(c),l?iy(l):null]).then(([a,o])=>{if(i!==e.photoVersion||this.destroyed||e.version<0)return;let s=(e,t,n,r)=>{if(n&&t===r)return[n,r];n?.dispose();let i=new Fo(e);return i.colorSpace=``,i.flipY=!1,i.generateMipmaps=!0,i.needsUpdate=!0,[i,t]};a?([e.img,e.imgSrc]=s(a,c,e.img,e.imgSrc),t.uImgFit.value.set(...Um(a,e.photoFit,n,r)),t.uImg.value=e.img,t.uHasImg.value=1,o?([e.img2,e.img2Src]=s(o,l,e.img2,e.img2Src),t.uImg2.value=e.img2,t.uHasImg2.value=1):t.uHasImg2.value=0,this.renderDirty=!0):t.uHasImg.value=t.uHasImg2.value=0}):t.uHasImg.value=t.uHasImg2.value=0}profile(){return Z.quality[this.quality]}layout(){this.layoutDirty=!1,this.renderDirty=!0;let e=oy().clientWidth,t=innerHeight;this.viewH=t;let n=this.profile();this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,n.dpr)),this.renderer.setSize(e,t,!1);let r=Math.max(2,Math.round(e*Z.bloom.scale)),i=Math.max(2,Math.round(t*Z.bloom.scale));this.rtE.setSize(r,i),this.rtA.setSize(r,i),this.rtB.setSize(r,i),this.rtS1.setSize(Math.max(2,r>>1),Math.max(2,i>>1)),this.rtS2.setSize(Math.max(2,r>>1),Math.max(2,i>>1));let a=this.renderer.getContext();this.rtMain.setSize(a.drawingBufferWidth,a.drawingBufferHeight),this.grade.uniforms.uRes.value.set(a.drawingBufferWidth,a.drawingBufferHeight),this.parts.limit=Math.round(Z.particles.pool*n.particles),this.scroll.measure(t),this.globals.uView.value.set(e,t),this.globals.uBand.value=this.scroll.bandPx,this.camera.aspect=e/t,this.camera.updateProjectionMatrix();let o=this.live;o&&oy().classList.remove(`vfx-live`);let s=[];this.registry.surfaces.forEach((e,t)=>{if(!e.transform)return;let n=t.style;s.push([t,n.transform,n.opacity,n.visibility,n.getPropertyValue(`--slide-focus`)]),n.transform=`none`,n.opacity=`1`,n.visibility=`visible`,n.setProperty(`--slide-focus`,`1`)});let c=scrollX,l=scrollY,u=/* @__PURE__ */ new Set,d=/* @__PURE__ */ new Map;this.registry.surfaces.forEach((e,t)=>{u.add(t);let n=t.getBoundingClientRect(),r=this.surfaces.get(t);if(r||(r=this.addSurface(t,e),this.surfaces.set(t,r)),r.opt=e,r.x=n.left+c,r.y=n.top+l,r.w=n.width,r.h=n.height,r.clipEl=e.clip?t.closest(e.clip):null,r.clipEl){let e=r.clipEl.getBoundingClientRect();r.clipDoc=[e.left+c,e.top+l,e.right+c,e.bottom+l],r.clipFade=parseFloat(getComputedStyle(r.clipEl).getPropertyValue(`--vfx-fade`))||0}else r.clipDoc=ny,r.clipFade=0;if(e.transform){let e=getComputedStyle(t).transformOrigin.split(` `).map(parseFloat);r.origin=[e[0]||0,e[1]||0],r.xf??=/* @__PURE__ */ new Float32Array(16),r.u.uXf.value=r.xf,r.u.uHasXf.value=1;let n=r.clipEl??t.parentElement??t;d.has(n)||d.set(n,d.size),r.group=d.get(n)}else r.xf=null,r.inv=null,r.u.uHasXf.value=0,r.shown=!0,r.opacity=1,r.z=0;n.width<2||n.height<2?r.content.visible=!1:this.measureSurface(r)});for(let[e,t,n,r,i]of s)e.style.transform=t,e.style.opacity=n,e.style.visibility=r,i?e.style.setProperty(`--slide-focus`,i):e.style.removeProperty(`--slide-focus`);this.motionDirty=!0,o&&oy().classList.add(`vfx-live`),this.surfaces.forEach((e,t)=>{u.has(t)||(this.dropSurface(e),this.surfaces.delete(t))}),this.byIndex=[],this.surfaces.forEach(e=>{this.byIndex[e.index]=e})}addSurface(e,t){let n=t.kind===`title`,r={uOrigin:{value:new go},uSize:{value:new go(1,1)},uPush:{value:30},uPanel:{value:+!n},uCut:{value:new go},uPanelCol:{value:new Io(...Z.color.panel)},uInk:{value:null},uHasInk:{value:0},uInkMap:{value:new Io(0,0,1,1)},uVeil:{value:0},uImg:{value:null},uHasImg:{value:0},uImgBox:{value:new Io(0,0,1,1)},uImgFit:{value:new Io(0,0,1,1)},uImgStyle:{value:[1,0,0]},uHover:{value:0},uGain:{value:1},uBins:{value:new Float32Array(Z.border.bins)},uGray:{value:new go(...Mp())},uMicro:{value:12},uDist:{value:null},uRange:{value:24},uEm:{value:16},uTitle:{value:jp()},uHot:{value:Z.color.titleHot.flatMap(Op)},uSolid:{value:+!!t.solid},uTopo:{value:1},uPointer:{value:new Y(-1e4,-1e4,+!t.panel)},uOwn:{value:+!!t.ownColour},uNear:{value:0},uWake:{value:new Io(...Z.chain.card.wake)},uInkWarm:{value:new Y(...Z.chain.card.inkWarm)},uXf:{value:/* @__PURE__ */ new Float32Array(16)},uHasXf:{value:0},uAlpha:{value:1},uInkA:{value:1},uFrameA:{value:1},uClipRect:{value:new Io(0,0,-1,0)},uClipFade:{value:0},uImg2:{value:null},uHasImg2:{value:0},uSplit:{value:0},uSplitFocus:{value:0},uImgClip:{value:new Io(...ny)},uImgMask:{value:new Io},uMaskStops:{value:/* @__PURE__ */ new Float32Array(12)},uShadeBox:{value:new Io},uShadeLine:{value:new Io},uShade:{value:/* @__PURE__ */ new Float32Array(12)}},i=this.nextIndex++,a=new Kc(sy(new vc),this.material(Wv,Gv,r));a.frustumCulled=!1,a.renderOrder=10+i*2,a.visible=!1;let o=new Kc(sy(new vc),this.material(Kv,n?Jv:qv,r));return o.frustumCulled=!1,o.renderOrder=11+i*2,o.visible=!1,this.scene.add(a,o),{el:e,opt:t,index:i,u:r,content:a,overlay:o,x:0,y:0,w:0,h:0,cellKey:``,netKey:``,net:null,chain:null,energy:null,border:n?null:new Pp,edgeCells:[],born:null,delays:null,canvas:document.createElement(`canvas`),ink:null,dist:null,sourceDebt:0,img:null,imgSrc:``,alpha:null,fontSize:16,veilRest:0,lift:0,xf:null,inv:null,origin:[0,0],opacity:1,z:0,group:0,shown:!0,clipEl:null,clipDoc:ny,clipFade:0,photoEl:null,photo2El:null,img2:null,img2Src:``,photoFit:{objectFit:`fill`,objectPosition:`50% 50%`},photoBox:[0,0,1,1],range:null,rangeBox:[0,1],imgDirty:!1,photoVersion:0,hover:0,near:0,inside:!1,debt:0,budget:0,hot:!1,version:0,ready:!1}}dropSurface(e){this.scene.remove(e.content,e.overlay),e.content.geometry.dispose(),e.content.material.dispose(),e.overlay.geometry.dispose(),e.overlay.material.dispose(),e.ink?.dispose(),e.dist?.dispose(),e.img?.dispose(),e.img2?.dispose(),e.version=-1}measureSurface(e){let{el:t,u:n}=e,r=this.profile(),i=(e.opt.photo?t.querySelector(e.opt.photo):null)??t.querySelector(`img.is-active`)??t.querySelector(`img`),a=e.opt.compare?t.querySelector(`${e.opt.compare} img`):null,o=Vm(t,{photos:[i,a].filter(e=>!!e),skip:[`[data-vfx-dom]`,e.opt.compare].filter(Boolean).join(`,`)});e.fontSize=o.fontSize||16;let s=e.opt.kind===`title`,c=ym(t.id||t.className||t.tagName)+e.index,l=(s?ey(e.fontSize*Z.cells.titleEm,9,26):Z.cells.card)*r.cellScale;n.uPush.value=s?ey(e.fontSize*.16,14,34):30,n.uTopo.value=ey(Z.chain.card.topoArea/Math.max(1,e.w*e.h),.3,1),n.uEm.value=e.fontSize,n.uRange.value=ey(e.fontSize*Z.chain.title.marginEm,10,46)*.95,n.uMicro.value=ey(e.fontSize*Z.chain.title.microEm,6,18);let u=`${Math.round(e.w)}x${Math.round(e.h)}@${l.toFixed(1)}`;if(u!==e.cellKey){e.cellKey=u;let t=Sm(e.w,e.h,l,0,200,c^20973),n=new Float32Array(t.faces*6),r=new Float32Array(t.faces*3);for(let e=0;e<t.faces;e++)for(let i=0;i<3;i++)n[(e*3+i)*2]=t.cx[e],n[(e*3+i)*2+1]=t.cy[e],r[e*3+i]=t.seed[e];let i=sy(new vc);i.setAttribute(`position`,new rc(t.position,2)),i.setAttribute(`cellCenter`,new rc(n,2)),i.setAttribute(`seed`,new rc(r,1)),i.setAttribute(`bary`,new rc(ly(t.faces),3)),e.content.geometry.dispose(),e.content.geometry=i}if(this.ensureNetwork(e,c),n.uOrigin.value.set(e.x,e.y),n.uSize.value.set(e.w,e.h),!s){let r=getComputedStyle(t),i=e.opt.cut===`none`?0:parseFloat(r.getPropertyValue(`--cut`))||16;n.uCut.value.set(i,e.opt.cut===`tl`?0:i),e.veilRest=ey(parseFloat(r.getPropertyValue(`--vfx-veil`))||0,0,1)}if(e.photoEl=i,e.photo2El=a,i){let r=getComputedStyle(i),a=i.getBoundingClientRect();e.photoBox=[a.left+scrollX-e.x,a.top+scrollY-e.y,Math.max(1,a.width),Math.max(1,a.height)],e.photoFit={objectFit:r.objectFit,objectPosition:r.objectPosition},n.uImgBox.value.set(...e.photoBox),n.uImgStyle.value=[parseFloat(r.opacity)||(i.classList.contains(`is-active`)?1:.9),+!!i.closest(`.faq-visual`),+!!t.querySelector(`.card-legibility`)];let o=ny;for(let n=i.parentElement;n&&n!==t&&t.contains(n);n=n.parentElement){let t=getComputedStyle(n);if(t.overflowX!==`visible`||t.overflowY!==`visible`){let t=n.getBoundingClientRect();o=[t.left+scrollX-e.x,t.top+scrollY-e.y,t.right+scrollX-e.x,t.bottom+scrollY-e.y];break}}n.uImgClip.value.set(...o);let s=nh(r.maskImage||r.webkitMaskImage||``,a.height),c=s?rh(s.angle,a.width,a.height):[0,0,0];n.uImgMask.value.set(c[0],c[1],c[2],ty(s,n.uMaskStops.value)),this.setPhotos(e)}else n.uHasImg.value=n.uHasImg2.value=0;if(e.range=e.opt.compare?t.querySelector(`input[type=range]`):null,e.range){let t=e.range.getBoundingClientRect();e.rangeBox=[t.left+scrollX-e.x,t.width]}let d=null;for(let r of[t,...t.querySelectorAll(`*`)]){if(r.closest(`[data-vfx-dom]`))continue;let t=getComputedStyle(r,`::after`);if(t.content===`none`||!t.backgroundImage.includes(`linear-gradient`))continue;let i=r.getBoundingClientRect();if(d=nh(t.backgroundImage,i.width),!d)continue;let a=rh(d.angle,i.width,i.height);n.uShadeBox.value.set(i.left+scrollX-e.x,i.top+scrollY-e.y,i.width,i.height),n.uShadeLine.value.set(a[0],a[1],a[2],ty(d,n.uShade.value));break}d||(n.uShadeLine.value.w=0);let f=Math.max(1,e.w*e.h),p=Math.min(this.renderer.getPixelRatio(),Math.sqrt(4e6/f)),m=o.box.left,h=o.box.top,g=Math.floor((m+scrollX)*p)/p-scrollX,_=Math.floor((h+scrollY)*p)/p-scrollY,v={x:g,y:_,w:Math.max(2,Math.ceil((m-g+o.box.width)*p)),h:Math.max(2,Math.ceil((h-_+o.box.height)*p))},y=++e.version;Hm(e.canvas,o,p,v,e.opt.kind===`title`?void 0:Z.color.cardInk).then(t=>{if(e.version!==y||this.destroyed)return;e.ink?.dispose();let r=new rl(e.canvas);if(r.colorSpace=``,r.premultiplyAlpha=!0,r.flipY=!1,r.generateMipmaps=!1,r.minFilter=xi,r.magFilter=xi,this.renderer.initTexture(r),e.ink=r,e.alpha=t,n.uInk.value=r,n.uHasInk.value=1,n.uInkMap.value.set(m-g,h-_,p/v.w,p/v.h),s){let t=Wm(e.canvas,v.w/p,v.h/p,n.uRange.value);e.dist?.dispose();let r=new Yc(t.data,t.w,t.h,Hi,wi);r.minFilter=xi,r.magFilter=xi,r.flipY=!1,r.generateMipmaps=!1,r.needsUpdate=!0,e.dist=r,n.uDist.value=r,this.weightByInk(e)}e.content.visible=!0,e.ready=!0,this.renderDirty=!0}).catch(()=>{e.ready=!0})}ensureNetwork(e,t){let n=e.opt.kind===`title`,r=Z.chain,i=n?ey(e.fontSize*r.title.spacingEm,14,52):r.card.spacing,a=n?ey(e.fontSize*r.title.marginEm,10,46):r.card.margin,o=n?e.fontSize*r.title.zoneEm:r.card.zone,s=`${Math.round(e.w)}x${Math.round(e.h)}@${i.toFixed(1)}`;if(s===e.netKey)return;e.netKey=s;let c=Sm(e.w,e.h,i,a,o,t,n?void 0:{spacing:r.card.edgeSpacing,reach:r.card.edgeReach});for(let e=0;e<c.faces;e++)c.weight[e]||(c.cond[e]=0);let l=sy(new vc);l.setAttribute(`position`,new rc(c.position,2)),l.setAttribute(`bary`,new rc(ly(c.faces),3)),l.setAttribute(`cell`,new rc(c.cell,4));let u=new Float32Array(c.faces*6);for(let e=0;e<c.faces;e++)for(let t=0;t<3;t++)u[(e*3+t)*2]=c.cx[e],u[(e*3+t)*2+1]=c.cy[e];l.setAttribute(`centre`,new rc(u,2));let d=new rc(new Float32Array(c.faces*6),2);d.setUsage(Ua),l.setAttribute(`energy`,d),e.overlay.geometry.dispose(),e.overlay.geometry=l;let f=new Wp(c,n?r.title:r.card);f.onIgnite=(t,n)=>this.emitFrom(e,t,n),e.net=c,e.chain=f,e.energy=d,e.delays=new Float32Array(c.faces),e.born=new Uint8Array(c.faces);for(let t=0;t<c.faces;t++)e.delays[t]=Vp(e.x+c.cx[t],e.y+c.cy[t],c.seed[t]);if(e.edgeCells=[],!n)for(let t=0;t<c.faces;t++){if(!c.weight[t])continue;let[n,r]=Np(c.cx[t],c.cy[t],e.w,e.h);r<Z.border.reach&&e.edgeCells.push({cell:t,s:n,w:1-r/Z.border.reach})}n&&e.alpha&&this.weightByInk(e)}driveRange(e,t,n,r,i,a){let o=e.chain,s=e.net,c=o.drive,l=Z.type;if(!t&&o.driveLevel<.003){o.driveLevel&&=(c.fill(0),0);return}let u=Math.max(i*l.range[0],e.fontSize*l.range[1]),d=Math.max(i*l.range[2],e.fontSize*l.range[3]),f=1-Math.exp(-a/l.rise),p=1-Math.exp(-a/l.fall),m=0;for(let e=0;e<s.faces;e++){let i=0;if(t&&s.weight[e]>.05){let t=(s.cx[e]-n)/u,a=(s.cy[e]-r)/d;i=1-Ip(.2,1,Math.sqrt(t*t+a*a)/(.7+.6*s.seed[e]))}let a=c[e]+(i-c[e])*(i>c[e]?f:p);a<.002&&(a=0),c[e]=a,a>m&&(m=a)}o.driveLevel=m}weightByInk(e){let t=e.net,n=e.alpha;if(!t||!n)return;let r=(e,t)=>{let r=Math.floor(e*n.ascale),i=Math.floor(t*n.ascale);return r>=0&&i>=0&&r<n.aw&&i<n.ah?n.alpha[i*n.aw+r]/255:0};for(let n=0;n<t.faces;n++){if(t.cx[n]<0||t.cy[n]<0||t.cx[n]>e.w||t.cy[n]>e.h)continue;let i=r(t.cx[n],t.cy[n]);for(let e=0;e<3;e++){let a=(n*3+e)*2;i=Math.max(i,r((t.position[a]+t.cx[n])/2,(t.position[a+1]+t.cy[n])/2)*.85)}t.weight[n]=.04+.96*i,t.cond[n]=(.4+.6*t.zone[n])*(.35+.65*i)}}emitFrom(e,t,n){if(this.reduced||!e.net||e.budget<1)return;let r=this.input.present&&this.input.speed>40&&(e.inside||e===this.hovered),i=!this.loaded&&this.load.value>0;if(!r&&!i)return;let a=e.opt.kind===`title`;if(Math.random()>(a?.24:.3)*n)return;let[o,s]=this.toDoc(e,e.net.cx[t],e.net.cy[t]);if(a&&e.alpha){let n=e.alpha,r=Math.floor(e.net.cx[t]*n.ascale),i=Math.floor(e.net.cy[t]*n.ascale);if(r<0||i<0||r>=n.aw||i>=n.ah||n.alpha[i*n.aw+r]<90)return}--e.budget;let c=this.input;if(a){let t=c.x,n=c.y+this.scroll.y,r=o-t,i=s-n,a=Math.hypot(r,i)||1,l=ay(...Z.particles.spark.speed);this.parts.spawn(`spark`,o,s,r/a*l+c.dirX*c.speed*.06,i/a*l+c.dirY*c.speed*.06-12,e.index)}else{let[t,n]=this.toDoc(e,e.w/2,e.h/2),r=o-t,i=s-n,a=Math.hypot(r,i)||1,c=ay(...Z.particles.shard.speed);this.parts.spawn(`shard`,o,s,r/a*c+ay(-18,18),i/a*c+ay(-18,18),e.index)}}tick=(e,t)=>{if(this.destroyed||this.lost||window.__TIDE_VISIBLE__===!1&&this.loaded||oy().dataset.demoExpanded===`true`&&this.loaded)return;let n=Math.min(.05,t/1e3);this.clock+=n,this.frame++,this.layoutDirty&&this.layout();let r=this.globals,i=this.scroll,a=this.input,o=Z.pointer;i.update(this.reduced),a.update(n);let s=this.motionDirty;this.motionDirty=!1;for(let e of this.surfaces.values()){e.xf&&s&&this.updateMotion(e),e.imgDirty&&this.setPhotos(e);let t=e.clipDoc,n=e.u.uClipRect.value;if(e.clipEl?n.set(t[0]-scrollX,t[1]-i.y,t[2]-scrollX,t[3]-i.y):n.set(0,0,-1,0),e.u.uClipFade.value=e.clipFade,e.range){let t=(Number(e.range.value)-Number(e.range.min||0))/Math.max(1e-6,Number(e.range.max||100)-Number(e.range.min||0));e.u.uSplit.value=e.rangeBox[0]+e.rangeBox[1]*ey(t,0,1),e.u.uSplitFocus.value=+(document.activeElement===e.range)}}let c=a.radius,l=a.x,u=a.y+i.y,d=a.present,f=null,p=/* @__PURE__ */ new Map;for(let e of this.surfaces.values())p.set(e,this.toLocal(e,l,u));if(d)for(let e of this.surfaces.values()){let[t,n]=p.get(e);!e.content.visible||!e.shown||t<0||t>e.w||n<0||n>e.h||!this.inClip(e,l,u)||(!f||e.opt.kind===`card`&&(f.opt.kind===`title`||e.z>=f.z))&&(f=e)}this.hovered=f;let m=!this.loaded&&this.load.value>0,h=!1,g=1-Math.exp(-n/o.attack),_=1-Math.exp(-n*3.5),v=a.still>.6,y=1-Math.exp(-n/.12),b=document.activeElement;for(let e of this.surfaces.values()){let t=e.chain,r=e.net;if(!t||!r||!e.ready)continue;e.budget=Math.min(4,e.budget+n*Z.particles.perSecond),t.propagate=!this.reduced;let s=e===f,[x,S]=p.get(e),C=Math.max(-x,0,x-e.w),w=Math.max(-S,0,S-e.h),T=d&&!s&&e.shown&&this.inClip(e,l,u)?ey(1-Math.hypot(C,w)/c,0,1)*e.opacity:0;if(s){if(!e.inside)for(let e=0;e<o.enterBurst;e++)t.igniteAt(x,S,c*.45,ay(.85,1));if(e.opt.source&&(e.inside||(e.sourceDebt=1),e.sourceDebt+=n/Z.pointer.sourceEvery,e.sourceDebt>=1)){--e.sourceDebt;let n=e.el.querySelector(e.opt.source)?.getBoundingClientRect();if(n)for(let r=0;r<3;r++)t.igniteAt(n.left+n.width/2+scrollX-e.x,n.top+n.height/2+i.y-e.y,18,ay(.8,1))}let r=e.opt.kind===`title`,s=(this.reduced?1.5:(v?o.stillRate:o.hoverRate)+a.speed*o.moveRate)*(r?Z.chain.title.rate:Z.chain.card.rate);e.debt+=s*n;let l=c*o.jitter*(r?1.7:1);for(;e.debt>=1;)--e.debt,t.igniteAt(x,S,l,ay(.75,1))}else if(T>0)for(e.debt+=o.proximityRate*T*n;e.debt>=1;)--e.debt,t.igniteAt(ey(x,0,e.w),ey(S,0,e.h),c*.12,(.2+.2*T)*(e.opt.gain??1));else e.debt=0;if(e.inside=s,e.opt.kind===`title`&&this.driveRange(e,s,x,S,c,n),m&&e.delays&&e.born){let n=this.load.value*1.3-.15;for(let i=0;i<r.faces;i++)e.born[i]||e.delays[i]>n||(e.born[i]=1,r.weight[i]>.4&&Math.random()<Z.loading.ignite&&t.ignite(i,ay(.45,.8),3))}t.active?(t.step(n),t.write(e.energy.array),e.energy.needsUpdate=!0,e.hot=!0):e.hot&&=(e.energy.array.fill(0),e.energy.needsUpdate=!0,!1);let E=e.opt.kind===`title`;if(e.hover+=(+!!s-e.hover)*(s?E?1-Math.exp(-n/.35):g:E?1-Math.exp(-n*1.6):_),e.hover<.002&&(e.hover=0),e.u.uHover.value=this.reduced?e.hover*.6:e.hover,e.u.uGain.value=s?1:Math.max(o.neighbour,e.hover),e.veilRest>0){let t=s||b===e.el&&e.el.matches(`:focus-visible`);e.lift+=(+!!t-e.lift)*y,Math.abs(e.lift-+!!t)<.002?e.lift=+!!t:h=!0,e.u.uVeil.value=e.veilRest*(1-e.lift)}else e.u.uVeil.value=0;e.near+=(T-e.near)*(T>e.near?g:_),e.near<.002&&(e.near=0),e.u.uNear.value=e.opt.kind===`title`?0:e.near*(e.opt.gain??1),e.u.uPointer.value.set(x,S,e.opt.kind===`title`?Math.max(c*1.25,e.fontSize*1.7):+!e.opt.panel);let D=0;if(e.border){let r=e.border;r.decay(n);for(let n of e.edgeCells){let e=t.shown[n.cell]*n.w;e>.02&&r.add(n.s,e*1.15,1.6)}if(d&&(s||T>0)){let[t,n]=Np(x,S,e.w,e.h);r.add(t,ey(1-n/c,0,1)**1.3*(s?.75:.9)*(e.opt.gain??1),6)}r.settle(),D=r.level,e.u.uBins.value.set(r.bins)}e.overlay.visible=t.active||e.hover>.003||e.near>.003||D>.004,(e.overlay.visible||e.hover>.003||e.near>.003)&&(h=!0)}this.parts.count&&this.parts.each((e,t,n,r,i)=>{let a=this.byIndex[i];if(!a?.border)return;let[o,s]=this.toLocal(a,e,t),[c,l]=Np(o,s,a.w,a.h);l<14&&a.border.add(c,r*Math.min(1,n*2)*(1-l/14)*.9,1.4)}),this.parts.step(n),this.partGeo.instanceCount=this.parts.count,this.partMesh.visible=this.parts.count>0,this.partBuf.needsUpdate=!0;let x=r.uDrift.value;i.y!==this.lastScroll||this.reduced?(x.x*=Math.exp(-n*10),this.still=0):(this.still+=n,this.still>.12&&(x.x=Math.min(Z.scroll.fade*2.5,x.x+n))),x.x>.001&&x.x<Z.scroll.fade*2.5&&(h=!0),this.lastScroll=i.y,r.uTime.value=this.clock,r.uScroll.value=i.y,r.uBandK.value.set(i.top,i.bottom),r.uLoad.value=this.load.value,this.frames++,t>Z.slowFrame&&this.slow++,this.frames>=150&&(this.slow>70&&this.quality!==`low`&&!this.pinned&&(this.quality=this.quality===`high`?`medium`:`low`,this.layoutDirty=!0),this.frames=0,this.slow=0),h=h||this.parts.count>0||!this.loaded||this.renderDirty||d,(h||!this.reduced&&this.frame%2==0)&&this.render(h)};render(e){let t=this.renderer,n=this.globals,r=Z.post;this.renderDirty=!1;let i=this.scroll.y-80,a=this.scroll.y+this.viewH+80,o=this.parts.count>0;this.surfaces.forEach(e=>{let t=e.ready&&e.shown&&e.w>2&&e.y<a&&e.y+e.h>i;e.content.visible=t,e.overlay.visible=t&&e.overlay.visible,e.overlay.visible&&(o=!0)});let s=this.profile().bloom;n.uEmissive.value=0;let c=n.uView.value,l=n.uFrag.value,u=e=>l.set(c.x/e.width,c.y/e.height,e.height,0);u(this.rtMain),t.setRenderTarget(this.rtMain),t.clear(),t.render(this.scene,this.camera);let d=e&&o&&s;d&&(n.uEmissive.value=1,u(this.rtE),t.setRenderTarget(this.rtE),t.clear(),t.render(this.scene,this.camera),n.uEmissive.value=0,this.blurPasses(this.rtE,[1,2]),this.blurPass(this.rtE,this.rtS1,2,0),this.blurPass(this.rtS1,this.rtS2,5,0),this.blurPass(this.rtS2,this.rtS1,14,0));let f=this.grade.uniforms;f.uMix.value.set(d?Z.bloom.strength:0,d?r.streak:0,r.vignette,r.grain),f.uLens.value.set(s?r.aberration*t.getPixelRatio():0,r.shoulder),f.uFrame.value=this.reduced?0:Math.floor(this.clock*24)%4096,this.fsMesh.material=this.grade,t.setRenderTarget(null),t.render(this.post,this.camera)}blurPass(e,t,n,r){let i=this.renderer;this.fsMesh.material=this.blur,this.blur.uniforms.uTex.value=e.texture,this.blur.uniforms.uStep.value.set(n/e.width,r/e.height),i.setRenderTarget(t),i.clear(),i.render(this.post,this.camera)}blurPasses(e,t,n=this.rtB){t.forEach((t,r)=>{this.blurPass(r?n:e,this.rtA,t,0),this.blurPass(this.rtA,n,0,t)})}};export{uy as VfxEngine};