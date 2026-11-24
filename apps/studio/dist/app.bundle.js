var Tf=0,kh=1,Rf=2;var Fh=1,tc=2,ii=3,Yt=0,Vt=1,Nt=2,On=0,ha=1,Er=2,Lh=3,Nh=4,Cf=5,zi=100,If=101,Pf=102,Df=103,kf=104,Ff=200,Lf=201,Nf=202,Uf=203,Fo=204,Lo=205,Bf=206,Of=207,zf=208,jf=209,Vf=210,Gf=211,Hf=212,Wf=213,Xf=214,nc=0,ic=1,ac=2,da=3,sc=4,rc=5,oc=6,cc=7,Uh=0,qf=1,Kf=2,Ai=0,Jf=1,Yf=2,Zf=3,lc=4,Qf=5,$f=6,ep=7,yh="attached",tp="detached",Bh=300,ya=301,_a=302,hc=303,dc=304,Ar=306,ji=1e3,Jn=1001,Qa=1002,zt=1003,uc=1004;var Ma=1005;var an=1006,ds=1007;var zn=1008;var jn=1009,Oh=1010,zh=1011,us=1012,fc=1013,Cn=1014,fn=1015,ai=1016,pc=1017,mc=1018,fs=1020,jh=35902,Vh=35899,Gh=1021,Hh=1022,sn=1023,$a=1026,ps=1027,bc=1028,Tr=1029,Wh=1030,gc=1031;var xc=1033,Rr=33776,Cr=33777,Ir=33778,Pr=33779,vc=35840,yc=35841,_c=35842,Mc=35843,wc=36196,Sc=37492,Ec=37496,Ac=37808,Tc=37809,Rc=37810,Cc=37811,Ic=37812,Pc=37813,Dc=37814,kc=37815,Fc=37816,Lc=37817,Nc=37818,Uc=37819,Bc=37820,Oc=37821,zc=36492,jc=36494,Vc=36495,Gc=36283,Hc=36284,Wc=36285,Xc=36286;var ua=2300,fa=2301,ko=2302,_h=2400,Mh=2401,wh=2402,np=2500;var Xh=0,Dr=1,ms=2,ip=3200,ap=3201;var qh=0,sp=1,Ti="",wt="srgb",jt="srgb-linear",Js="linear",it="srgb";var la=7680;var Sh=519,rp=512,op=513,cp=514,Kh=515,lp=516,hp=517,dp=518,up=519,No=35044;var Jh="300 es",Rn=2e3,Ys=2001;var xi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,r=i.length;s<r;s++)i[s].call(this,e);e.target=null}}},Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ou=1234567,qs=Math.PI/180,pa=180/Math.PI;function Un(){let a=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xt[a&255]+Xt[a>>8&255]+Xt[a>>16&255]+Xt[a>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]).toLowerCase()}function Fe(a,e,t){return Math.max(e,Math.min(t,a))}function Yh(a,e){return(a%e+e)%e}function wb(a,e,t,n,i){return n+(a-e)*(i-n)/(t-e)}function Sb(a,e,t){return a!==e?(t-a)/(e-a):0}function Ks(a,e,t){return(1-t)*a+t*e}function Eb(a,e,t,n){return Ks(a,e,1-Math.exp(-t*n))}function Ab(a,e=1){return e-Math.abs(Yh(a,e*2)-e)}function Tb(a,e,t){return a<=e?0:a>=t?1:(a=(a-e)/(t-e),a*a*(3-2*a))}function Rb(a,e,t){return a<=e?0:a>=t?1:(a=(a-e)/(t-e),a*a*a*(a*(a*6-15)+10))}function Cb(a,e){return a+Math.floor(Math.random()*(e-a+1))}function Ib(a,e){return a+Math.random()*(e-a)}function Pb(a){return a*(.5-Math.random())}function Db(a){a!==void 0&&(Ou=a);let e=Ou+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function kb(a){return a*qs}function Fb(a){return a*pa}function Lb(a){return(a&a-1)===0&&a!==0}function Nb(a){return Math.pow(2,Math.ceil(Math.log(a)/Math.LN2))}function Ub(a){return Math.pow(2,Math.floor(Math.log(a)/Math.LN2))}function Bb(a,e,t,n,i){let s=Math.cos,r=Math.sin,o=s(t/2),c=r(t/2),l=s((e+n)/2),d=r((e+n)/2),h=s((e-n)/2),u=r((e-n)/2),f=s((n-e)/2),b=r((n-e)/2);switch(i){case"XYX":a.set(o*d,c*h,c*u,o*l);break;case"YZY":a.set(c*u,o*d,c*h,o*l);break;case"ZXZ":a.set(c*h,c*u,o*d,o*l);break;case"XZX":a.set(o*d,c*b,c*f,o*l);break;case"YXY":a.set(c*f,o*d,c*b,o*l);break;case"ZYZ":a.set(c*b,c*f,o*d,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Nn(a,e){switch(e.constructor){case Float32Array:return a;case Uint32Array:return a/4294967295;case Uint16Array:return a/65535;case Uint8Array:return a/255;case Int32Array:return Math.max(a/2147483647,-1);case Int16Array:return Math.max(a/32767,-1);case Int8Array:return Math.max(a/127,-1);default:throw new Error("Invalid component type.")}}function nt(a,e){switch(e.constructor){case Float32Array:return a;case Uint32Array:return Math.round(a*4294967295);case Uint16Array:return Math.round(a*65535);case Uint8Array:return Math.round(a*255);case Int32Array:return Math.round(a*2147483647);case Int16Array:return Math.round(a*32767);case Int8Array:return Math.round(a*127);default:throw new Error("Invalid component type.")}}var Ut={DEG2RAD:qs,RAD2DEG:pa,generateUUID:Un,clamp:Fe,euclideanModulo:Yh,mapLinear:wb,inverseLerp:Sb,lerp:Ks,damp:Eb,pingpong:Ab,smoothstep:Tb,smootherstep:Rb,randInt:Cb,randFloat:Ib,randFloatSpread:Pb,seededRandom:Db,degToRad:kb,radToDeg:Fb,isPowerOfTwo:Lb,ceilPowerOfTwo:Nb,floorPowerOfTwo:Ub,setQuaternionFromProperEuler:Bb,normalize:nt,denormalize:Nn},be=class a{constructor(e=0,t=0){a.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Fe(this.x,e.x,t.x),this.y=Fe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Fe(this.x,e,t),this.y=Fe(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Fe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Fe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,r=this.y-e.y;return this.x=s*n-r*i+e.x,this.y=s*i+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},rn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,r,o){let c=n[i+0],l=n[i+1],d=n[i+2],h=n[i+3],u=s[r+0],f=s[r+1],b=s[r+2],g=s[r+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=d,e[t+3]=h;return}if(o===1){e[t+0]=u,e[t+1]=f,e[t+2]=b,e[t+3]=g;return}if(h!==g||c!==u||l!==f||d!==b){let m=1-o,p=c*u+l*f+d*b+h*g,v=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){let _=Math.sqrt(y),S=Math.atan2(_,p*v);m=Math.sin(m*S)/_,o=Math.sin(o*S)/_}let x=o*v;if(c=c*m+u*x,l=l*m+f*x,d=d*m+b*x,h=h*m+g*x,m===1-o){let _=1/Math.sqrt(c*c+l*l+d*d+h*h);c*=_,l*=_,d*=_,h*=_}}e[t]=c,e[t+1]=l,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,r){let o=n[i],c=n[i+1],l=n[i+2],d=n[i+3],h=s[r],u=s[r+1],f=s[r+2],b=s[r+3];return e[t]=o*b+d*h+c*f-l*u,e[t+1]=c*b+d*u+l*h-o*f,e[t+2]=l*b+d*f+o*u-c*h,e[t+3]=d*b-o*h-c*u-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,r=e._order,o=Math.cos,c=Math.sin,l=o(n/2),d=o(i/2),h=o(s/2),u=c(n/2),f=c(i/2),b=c(s/2);switch(r){case"XYZ":this._x=u*d*h+l*f*b,this._y=l*f*h-u*d*b,this._z=l*d*b+u*f*h,this._w=l*d*h-u*f*b;break;case"YXZ":this._x=u*d*h+l*f*b,this._y=l*f*h-u*d*b,this._z=l*d*b-u*f*h,this._w=l*d*h+u*f*b;break;case"ZXY":this._x=u*d*h-l*f*b,this._y=l*f*h+u*d*b,this._z=l*d*b+u*f*h,this._w=l*d*h-u*f*b;break;case"ZYX":this._x=u*d*h-l*f*b,this._y=l*f*h+u*d*b,this._z=l*d*b-u*f*h,this._w=l*d*h+u*f*b;break;case"YZX":this._x=u*d*h+l*f*b,this._y=l*f*h+u*d*b,this._z=l*d*b-u*f*h,this._w=l*d*h-u*f*b;break;case"XZY":this._x=u*d*h-l*f*b,this._y=l*f*h-u*d*b,this._z=l*d*b+u*f*h,this._w=l*d*h+u*f*b;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],r=t[1],o=t[5],c=t[9],l=t[2],d=t[6],h=t[10],u=n+o+h;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(d-c)*f,this._y=(s-l)*f,this._z=(r-i)*f}else if(n>o&&n>h){let f=2*Math.sqrt(1+n-o-h);this._w=(d-c)/f,this._x=.25*f,this._y=(i+r)/f,this._z=(s+l)/f}else if(o>h){let f=2*Math.sqrt(1+o-n-h);this._w=(s-l)/f,this._x=(i+r)/f,this._y=.25*f,this._z=(c+d)/f}else{let f=2*Math.sqrt(1+h-n-o);this._w=(r-i)/f,this._x=(s+l)/f,this._y=(c+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Fe(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,r=e._w,o=t._x,c=t._y,l=t._z,d=t._w;return this._x=n*d+r*o+i*l-s*c,this._y=i*d+r*c+s*o-n*l,this._z=s*d+r*l+n*c-i*o,this._w=r*d-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,r=this._w,o=r*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=r,this._x=n,this._y=i,this._z=s,this;let c=1-o*o;if(c<=Number.EPSILON){let f=1-t;return this._w=f*r+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}let l=Math.sqrt(c),d=Math.atan2(l,o),h=Math.sin((1-t)*d)/l,u=Math.sin(t*d)/l;return this._w=r*h+this._w*u,this._x=n*h+this._x*u,this._y=i*h+this._y*u,this._z=s*h+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},C=class a{constructor(e=0,t=0,n=0){a.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(zu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(zu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,r=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,r=e.y,o=e.z,c=e.w,l=2*(r*i-o*n),d=2*(o*t-s*i),h=2*(s*n-r*t);return this.x=t+c*l+r*h-o*d,this.y=n+c*d+o*l-s*h,this.z=i+c*h+s*d-r*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Fe(this.x,e.x,t.x),this.y=Fe(this.y,e.y,t.y),this.z=Fe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Fe(this.x,e,t),this.y=Fe(this.y,e,t),this.z=Fe(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Fe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,r=t.x,o=t.y,c=t.z;return this.x=i*c-s*o,this.y=s*r-n*c,this.z=n*o-i*r,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return zl.copy(this).projectOnVector(e),this.sub(zl)}reflect(e){return this.sub(zl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Fe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},zl=new C,zu=new rn,Oe=class a{constructor(e,t,n,i,s,r,o,c,l){a.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,r,o,c,l)}set(e,t,n,i,s,r,o,c,l){let d=this.elements;return d[0]=e,d[1]=i,d[2]=o,d[3]=t,d[4]=s,d[5]=c,d[6]=n,d[7]=r,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,r=n[0],o=n[3],c=n[6],l=n[1],d=n[4],h=n[7],u=n[2],f=n[5],b=n[8],g=i[0],m=i[3],p=i[6],v=i[1],y=i[4],x=i[7],_=i[2],S=i[5],E=i[8];return s[0]=r*g+o*v+c*_,s[3]=r*m+o*y+c*S,s[6]=r*p+o*x+c*E,s[1]=l*g+d*v+h*_,s[4]=l*m+d*y+h*S,s[7]=l*p+d*x+h*E,s[2]=u*g+f*v+b*_,s[5]=u*m+f*y+b*S,s[8]=u*p+f*x+b*E,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],o=e[5],c=e[6],l=e[7],d=e[8];return t*r*d-t*o*l-n*s*d+n*o*c+i*s*l-i*r*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=d*r-o*l,u=o*c-d*s,f=l*s-r*c,b=t*h+n*u+i*f;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/b;return e[0]=h*g,e[1]=(i*l-d*n)*g,e[2]=(o*n-i*r)*g,e[3]=u*g,e[4]=(d*t-i*c)*g,e[5]=(i*s-o*t)*g,e[6]=f*g,e[7]=(n*c-l*t)*g,e[8]=(r*t-n*s)*g,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,r,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*r+l*o)+r+e,-i*l,i*c,-i*(-l*r+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(jl.makeScale(e,t)),this}rotate(e){return this.premultiply(jl.makeRotation(-e)),this}translate(e,t){return this.premultiply(jl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},jl=new Oe;function Zh(a){for(let e=a.length-1;e>=0;--e)if(a[e]>=65535)return!0;return!1}function es(a){return document.createElementNS("http://www.w3.org/1999/xhtml",a)}function fp(){let a=es("canvas");return a.style.display="block",a}var ju={};function ts(a){a in ju||(ju[a]=!0,console.warn(a))}function pp(a,e,t){return new Promise(function(n,i){function s(){switch(a.clientWaitSync(e,a.SYNC_FLUSH_COMMANDS_BIT,0)){case a.WAIT_FAILED:i();break;case a.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}var Vu=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gu=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ob(){let a={enabled:!0,workingColorSpace:jt,spaces:{},convert:function(i,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===it&&(i.r=gi(i.r),i.g=gi(i.g),i.b=gi(i.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===it&&(i.r=Za(i.r),i.g=Za(i.g),i.b=Za(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ti?Js:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,r){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return ts("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),a.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return ts("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),a.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return a.define({[jt]:{primaries:e,whitePoint:n,transfer:Js,toXYZ:Vu,fromXYZ:Gu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:wt},outputColorSpaceConfig:{drawingBufferColorSpace:wt}},[wt]:{primaries:e,whitePoint:n,transfer:it,toXYZ:Vu,fromXYZ:Gu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:wt}}}),a}var Ge=Ob();function gi(a){return a<.04045?a*.0773993808:Math.pow(a*.9478672986+.0521327014,2.4)}function Za(a){return a<.0031308?a*12.92:1.055*Math.pow(a,.41666)-.055}var La,Uo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{La===void 0&&(La=es("canvas")),La.width=e.width,La.height=e.height;let i=La.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=La}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=es("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let r=0;r<s.length;r++)s[r]=gi(s[r]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(gi(t[n]/255)*255):t[n]=gi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},zb=0,ns=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zb++}),this.uuid=Un(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let r=0,o=i.length;r<o;r++)i[r].isDataTexture?s.push(Vl(i[r].image)):s.push(Vl(i[r]))}else s=Vl(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function Vl(a){return typeof HTMLImageElement<"u"&&a instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&a instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&a instanceof ImageBitmap?Uo.getDataURL(a):a.data?{data:Array.from(a.data),width:a.width,height:a.height,type:a.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var jb=0,Gl=new C,Ft=class a extends xi{constructor(e=a.DEFAULT_IMAGE,t=a.DEFAULT_MAPPING,n=Jn,i=Jn,s=an,r=zn,o=sn,c=jn,l=a.DEFAULT_ANISOTROPY,d=Ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jb++}),this.uuid=Un(),this.name="",this.source=new ns(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=r,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new be(0,0),this.repeat=new be(1,1),this.center=new be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Gl).x}get height(){return this.source.getSize(Gl).y}get depth(){return this.source.getSize(Gl).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Bh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ji:e.x=e.x-Math.floor(e.x);break;case Jn:e.x=e.x<0?0:1;break;case Qa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ji:e.y=e.y-Math.floor(e.y);break;case Jn:e.y=e.y<0?0:1;break;case Qa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ft.DEFAULT_IMAGE=null;Ft.DEFAULT_MAPPING=Bh;Ft.DEFAULT_ANISOTROPY=1;var $e=class a{constructor(e=0,t=0,n=0,i=1){a.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*t+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*t+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*t+r[7]*n+r[11]*i+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,c=e.elements,l=c[0],d=c[4],h=c[8],u=c[1],f=c[5],b=c[9],g=c[2],m=c[6],p=c[10];if(Math.abs(d-u)<.01&&Math.abs(h-g)<.01&&Math.abs(b-m)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+g)<.1&&Math.abs(b+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,x=(f+1)/2,_=(p+1)/2,S=(d+u)/4,E=(h+g)/4,R=(b+m)/4;return y>x&&y>_?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=S/n,s=E/n):x>_?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=S/i,s=R/i):_<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(_),n=E/s,i=R/s),this.set(n,i,s,t),this}let v=Math.sqrt((m-b)*(m-b)+(h-g)*(h-g)+(u-d)*(u-d));return Math.abs(v)<.001&&(v=1),this.x=(m-b)/v,this.y=(h-g)/v,this.z=(u-d)/v,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Fe(this.x,e.x,t.x),this.y=Fe(this.y,e.y,t.y),this.z=Fe(this.z,e.z,t.z),this.w=Fe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Fe(this.x,e,t),this.y=Fe(this.y,e,t),this.z=Fe(this.z,e,t),this.w=Fe(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Fe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Bo=class extends xi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:an,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new $e(0,0,e,t),this.scissorTest=!1,this.viewport=new $e(0,0,e,t);let i={width:e,height:t,depth:n.depth},s=new Ft(i);this.textures=[];let r=n.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:an,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new ns(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},pn=class extends Bo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Zs=class extends Ft{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=zt,this.minFilter=zt,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Oo=class extends Ft{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=zt,this.minFilter=zt,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Xe=class{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(kn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(kn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=kn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,kn):kn.fromBufferAttribute(s,r),kn.applyMatrix4(e.matrixWorld),this.expandByPoint(kn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ao.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ao.copy(n.boundingBox)),ao.applyMatrix4(e.matrixWorld),this.union(ao)}let i=e.children;for(let s=0,r=i.length;s<r;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,kn),kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Bs),so.subVectors(this.max,Bs),Na.subVectors(e.a,Bs),Ua.subVectors(e.b,Bs),Ba.subVectors(e.c,Bs),ki.subVectors(Ua,Na),Fi.subVectors(Ba,Ua),ia.subVectors(Na,Ba);let t=[0,-ki.z,ki.y,0,-Fi.z,Fi.y,0,-ia.z,ia.y,ki.z,0,-ki.x,Fi.z,0,-Fi.x,ia.z,0,-ia.x,-ki.y,ki.x,0,-Fi.y,Fi.x,0,-ia.y,ia.x,0];return!Hl(t,Na,Ua,Ba,so)||(t=[1,0,0,0,1,0,0,0,1],!Hl(t,Na,Ua,Ba,so))?!1:(ro.crossVectors(ki,Fi),t=[ro.x,ro.y,ro.z],Hl(t,Na,Ua,Ba,so))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(di),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},di=[new C,new C,new C,new C,new C,new C,new C,new C],kn=new C,ao=new Xe,Na=new C,Ua=new C,Ba=new C,ki=new C,Fi=new C,ia=new C,Bs=new C,so=new C,ro=new C,aa=new C;function Hl(a,e,t,n,i){for(let s=0,r=a.length-3;s<=r;s+=3){aa.fromArray(a,s);let o=i.x*Math.abs(aa.x)+i.y*Math.abs(aa.y)+i.z*Math.abs(aa.z),c=e.dot(aa),l=t.dot(aa),d=n.dot(aa);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}var Vb=new Xe,Os=new C,Wl=new C,yt=class{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Vb.setFromPoints(e).getCenter(n);let i=0;for(let s=0,r=e.length;s<r;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Os.subVectors(e,this.center);let t=Os.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Os,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Wl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Os.copy(e.center).add(Wl)),this.expandByPoint(Os.copy(e.center).sub(Wl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},ui=new C,Xl=new C,oo=new C,Li=new C,ql=new C,co=new C,Kl=new C,Zn=class{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ui)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ui.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ui.copy(this.origin).addScaledVector(this.direction,t),ui.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Xl.copy(e).add(t).multiplyScalar(.5),oo.copy(t).sub(e).normalize(),Li.copy(this.origin).sub(Xl);let s=e.distanceTo(t)*.5,r=-this.direction.dot(oo),o=Li.dot(this.direction),c=-Li.dot(oo),l=Li.lengthSq(),d=Math.abs(1-r*r),h,u,f,b;if(d>0)if(h=r*c-o,u=r*o-c,b=s*d,h>=0)if(u>=-b)if(u<=b){let g=1/d;h*=g,u*=g,f=h*(h+r*u+2*o)+u*(r*h+u+2*c)+l}else u=s,h=Math.max(0,-(r*u+o)),f=-h*h+u*(u+2*c)+l;else u=-s,h=Math.max(0,-(r*u+o)),f=-h*h+u*(u+2*c)+l;else u<=-b?(h=Math.max(0,-(-r*s+o)),u=h>0?-s:Math.min(Math.max(-s,-c),s),f=-h*h+u*(u+2*c)+l):u<=b?(h=0,u=Math.min(Math.max(-s,-c),s),f=u*(u+2*c)+l):(h=Math.max(0,-(r*s+o)),u=h>0?s:Math.min(Math.max(-s,-c),s),f=-h*h+u*(u+2*c)+l);else u=r>0?-s:s,h=Math.max(0,-(r*u+o)),f=-h*h+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Xl).addScaledVector(oo,u),f}intersectSphere(e,t){ui.subVectors(e.center,this.origin);let n=ui.dot(this.direction),i=ui.dot(ui)-n*n,s=e.radius*e.radius;if(i>s)return null;let r=Math.sqrt(s-i),o=n-r,c=n+r;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,r,o,c,l=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,i=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,i=(e.min.x-u.x)*l),d>=0?(s=(e.min.y-u.y)*d,r=(e.max.y-u.y)*d):(s=(e.max.y-u.y)*d,r=(e.min.y-u.y)*d),n>r||s>i||((s>n||isNaN(n))&&(n=s),(r<i||isNaN(i))&&(i=r),h>=0?(o=(e.min.z-u.z)*h,c=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,c=(e.min.z-u.z)*h),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,ui)!==null}intersectTriangle(e,t,n,i,s){ql.subVectors(t,e),co.subVectors(n,e),Kl.crossVectors(ql,co);let r=this.direction.dot(Kl),o;if(r>0){if(i)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Li.subVectors(this.origin,e);let c=o*this.direction.dot(co.crossVectors(Li,co));if(c<0)return null;let l=o*this.direction.dot(ql.cross(Li));if(l<0||c+l>r)return null;let d=-o*Li.dot(Kl);return d<0?null:this.at(d/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},he=class a{constructor(e,t,n,i,s,r,o,c,l,d,h,u,f,b,g,m){a.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,r,o,c,l,d,h,u,f,b,g,m)}set(e,t,n,i,s,r,o,c,l,d,h,u,f,b,g,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=r,p[9]=o,p[13]=c,p[2]=l,p[6]=d,p[10]=h,p[14]=u,p[3]=f,p[7]=b,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new a().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/Oa.setFromMatrixColumn(e,0).length(),s=1/Oa.setFromMatrixColumn(e,1).length(),r=1/Oa.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,r=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),d=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){let u=r*d,f=r*h,b=o*d,g=o*h;t[0]=c*d,t[4]=-c*h,t[8]=l,t[1]=f+b*l,t[5]=u-g*l,t[9]=-o*c,t[2]=g-u*l,t[6]=b+f*l,t[10]=r*c}else if(e.order==="YXZ"){let u=c*d,f=c*h,b=l*d,g=l*h;t[0]=u+g*o,t[4]=b*o-f,t[8]=r*l,t[1]=r*h,t[5]=r*d,t[9]=-o,t[2]=f*o-b,t[6]=g+u*o,t[10]=r*c}else if(e.order==="ZXY"){let u=c*d,f=c*h,b=l*d,g=l*h;t[0]=u-g*o,t[4]=-r*h,t[8]=b+f*o,t[1]=f+b*o,t[5]=r*d,t[9]=g-u*o,t[2]=-r*l,t[6]=o,t[10]=r*c}else if(e.order==="ZYX"){let u=r*d,f=r*h,b=o*d,g=o*h;t[0]=c*d,t[4]=b*l-f,t[8]=u*l+g,t[1]=c*h,t[5]=g*l+u,t[9]=f*l-b,t[2]=-l,t[6]=o*c,t[10]=r*c}else if(e.order==="YZX"){let u=r*c,f=r*l,b=o*c,g=o*l;t[0]=c*d,t[4]=g-u*h,t[8]=b*h+f,t[1]=h,t[5]=r*d,t[9]=-o*d,t[2]=-l*d,t[6]=f*h+b,t[10]=u-g*h}else if(e.order==="XZY"){let u=r*c,f=r*l,b=o*c,g=o*l;t[0]=c*d,t[4]=-h,t[8]=l*d,t[1]=u*h+g,t[5]=r*d,t[9]=f*h-b,t[2]=b*h-f,t[6]=o*d,t[10]=g*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Gb,e,Hb)}lookAt(e,t,n){let i=this.elements;return wn.subVectors(e,t),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),Ni.crossVectors(n,wn),Ni.lengthSq()===0&&(Math.abs(n.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),Ni.crossVectors(n,wn)),Ni.normalize(),lo.crossVectors(wn,Ni),i[0]=Ni.x,i[4]=lo.x,i[8]=wn.x,i[1]=Ni.y,i[5]=lo.y,i[9]=wn.y,i[2]=Ni.z,i[6]=lo.z,i[10]=wn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,r=n[0],o=n[4],c=n[8],l=n[12],d=n[1],h=n[5],u=n[9],f=n[13],b=n[2],g=n[6],m=n[10],p=n[14],v=n[3],y=n[7],x=n[11],_=n[15],S=i[0],E=i[4],R=i[8],M=i[12],w=i[1],I=i[5],P=i[9],F=i[13],N=i[2],O=i[6],j=i[10],J=i[14],H=i[3],Q=i[7],ce=i[11],xe=i[15];return s[0]=r*S+o*w+c*N+l*H,s[4]=r*E+o*I+c*O+l*Q,s[8]=r*R+o*P+c*j+l*ce,s[12]=r*M+o*F+c*J+l*xe,s[1]=d*S+h*w+u*N+f*H,s[5]=d*E+h*I+u*O+f*Q,s[9]=d*R+h*P+u*j+f*ce,s[13]=d*M+h*F+u*J+f*xe,s[2]=b*S+g*w+m*N+p*H,s[6]=b*E+g*I+m*O+p*Q,s[10]=b*R+g*P+m*j+p*ce,s[14]=b*M+g*F+m*J+p*xe,s[3]=v*S+y*w+x*N+_*H,s[7]=v*E+y*I+x*O+_*Q,s[11]=v*R+y*P+x*j+_*ce,s[15]=v*M+y*F+x*J+_*xe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],r=e[1],o=e[5],c=e[9],l=e[13],d=e[2],h=e[6],u=e[10],f=e[14],b=e[3],g=e[7],m=e[11],p=e[15];return b*(+s*c*h-i*l*h-s*o*u+n*l*u+i*o*f-n*c*f)+g*(+t*c*f-t*l*u+s*r*u-i*r*f+i*l*d-s*c*d)+m*(+t*l*h-t*o*f-s*r*h+n*r*f+s*o*d-n*l*d)+p*(-i*o*d-t*c*h+t*o*u+i*r*h-n*r*u+n*c*d)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=e[9],u=e[10],f=e[11],b=e[12],g=e[13],m=e[14],p=e[15],v=h*m*l-g*u*l+g*c*f-o*m*f-h*c*p+o*u*p,y=b*u*l-d*m*l-b*c*f+r*m*f+d*c*p-r*u*p,x=d*g*l-b*h*l+b*o*f-r*g*f-d*o*p+r*h*p,_=b*h*c-d*g*c-b*o*u+r*g*u+d*o*m-r*h*m,S=t*v+n*y+i*x+s*_;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let E=1/S;return e[0]=v*E,e[1]=(g*u*s-h*m*s-g*i*f+n*m*f+h*i*p-n*u*p)*E,e[2]=(o*m*s-g*c*s+g*i*l-n*m*l-o*i*p+n*c*p)*E,e[3]=(h*c*s-o*u*s-h*i*l+n*u*l+o*i*f-n*c*f)*E,e[4]=y*E,e[5]=(d*m*s-b*u*s+b*i*f-t*m*f-d*i*p+t*u*p)*E,e[6]=(b*c*s-r*m*s-b*i*l+t*m*l+r*i*p-t*c*p)*E,e[7]=(r*u*s-d*c*s+d*i*l-t*u*l-r*i*f+t*c*f)*E,e[8]=x*E,e[9]=(b*h*s-d*g*s-b*n*f+t*g*f+d*n*p-t*h*p)*E,e[10]=(r*g*s-b*o*s+b*n*l-t*g*l-r*n*p+t*o*p)*E,e[11]=(d*o*s-r*h*s-d*n*l+t*h*l+r*n*f-t*o*f)*E,e[12]=_*E,e[13]=(d*g*i-b*h*i+b*n*u-t*g*u-d*n*m+t*h*m)*E,e[14]=(b*o*i-r*g*i-b*n*c+t*g*c+r*n*m-t*o*m)*E,e[15]=(r*h*i-d*o*i+d*n*c-t*h*c-r*n*u+t*o*u)*E,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,r=e.x,o=e.y,c=e.z,l=s*r,d=s*o;return this.set(l*r+n,l*o-i*c,l*c+i*o,0,l*o+i*c,d*o+n,d*c-i*r,0,l*c-i*o,d*c+i*r,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,r){return this.set(1,n,s,0,e,1,r,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,r=t._y,o=t._z,c=t._w,l=s+s,d=r+r,h=o+o,u=s*l,f=s*d,b=s*h,g=r*d,m=r*h,p=o*h,v=c*l,y=c*d,x=c*h,_=n.x,S=n.y,E=n.z;return i[0]=(1-(g+p))*_,i[1]=(f+x)*_,i[2]=(b-y)*_,i[3]=0,i[4]=(f-x)*S,i[5]=(1-(u+p))*S,i[6]=(m+v)*S,i[7]=0,i[8]=(b+y)*E,i[9]=(m-v)*E,i[10]=(1-(u+g))*E,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=Oa.set(i[0],i[1],i[2]).length(),r=Oa.set(i[4],i[5],i[6]).length(),o=Oa.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Fn.copy(this);let l=1/s,d=1/r,h=1/o;return Fn.elements[0]*=l,Fn.elements[1]*=l,Fn.elements[2]*=l,Fn.elements[4]*=d,Fn.elements[5]*=d,Fn.elements[6]*=d,Fn.elements[8]*=h,Fn.elements[9]*=h,Fn.elements[10]*=h,t.setFromRotationMatrix(Fn),n.x=s,n.y=r,n.z=o,this}makePerspective(e,t,n,i,s,r,o=Rn,c=!1){let l=this.elements,d=2*s/(t-e),h=2*s/(n-i),u=(t+e)/(t-e),f=(n+i)/(n-i),b,g;if(c)b=s/(r-s),g=r*s/(r-s);else if(o===Rn)b=-(r+s)/(r-s),g=-2*r*s/(r-s);else if(o===Ys)b=-r/(r-s),g=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=b,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,r,o=Rn,c=!1){let l=this.elements,d=2/(t-e),h=2/(n-i),u=-(t+e)/(t-e),f=-(n+i)/(n-i),b,g;if(c)b=1/(r-s),g=r/(r-s);else if(o===Rn)b=-2/(r-s),g=-(r+s)/(r-s);else if(o===Ys)b=-1/(r-s),g=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=h,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=b,l[14]=g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Oa=new C,Fn=new he,Gb=new C(0,0,0),Hb=new C(1,1,1),Ni=new C,lo=new C,wn=new C,Hu=new he,Wu=new rn,mn=class a{constructor(e=0,t=0,n=0,i=a.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],r=i[4],o=i[8],c=i[1],l=i[5],d=i[9],h=i[2],u=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Fe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Fe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Fe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-r,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Fe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-r,l));break;case"YZX":this._z=Math.asin(Fe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Fe(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Hu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Hu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Wu.setFromEuler(this),this.setFromQuaternion(Wu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};mn.DEFAULT_ORDER="XYZ";var is=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Wb=0,Xu=new C,za=new rn,fi=new he,ho=new C,zs=new C,Xb=new C,qb=new rn,qu=new C(1,0,0),Ku=new C(0,1,0),Ju=new C(0,0,1),Yu={type:"added"},Kb={type:"removed"},ja={type:"childadded",child:null},Jl={type:"childremoved",child:null},mt=class a extends xi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wb++}),this.uuid=Un(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=a.DEFAULT_UP.clone();let e=new C,t=new mn,n=new rn,i=new C(1,1,1);function s(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new he},normalMatrix:{value:new Oe}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=a.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=a.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new is,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return za.setFromAxisAngle(e,t),this.quaternion.multiply(za),this}rotateOnWorldAxis(e,t){return za.setFromAxisAngle(e,t),this.quaternion.premultiply(za),this}rotateX(e){return this.rotateOnAxis(qu,e)}rotateY(e){return this.rotateOnAxis(Ku,e)}rotateZ(e){return this.rotateOnAxis(Ju,e)}translateOnAxis(e,t){return Xu.copy(e).applyQuaternion(this.quaternion),this.position.add(Xu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(qu,e)}translateY(e){return this.translateOnAxis(Ku,e)}translateZ(e){return this.translateOnAxis(Ju,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(fi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ho.copy(e):ho.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),zs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fi.lookAt(zs,ho,this.up):fi.lookAt(ho,zs,this.up),this.quaternion.setFromRotationMatrix(fi),i&&(fi.extractRotation(i.matrixWorld),za.setFromRotationMatrix(fi),this.quaternion.premultiply(za.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Yu),ja.child=e,this.dispatchEvent(ja),ja.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Kb),Jl.child=e,this.dispatchEvent(Jl),Jl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),fi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),fi.multiply(e.parent.matrixWorld)),e.applyMatrix4(fi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Yu),ja.child=e,this.dispatchEvent(ja),ja.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zs,e,Xb),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zs,qb,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){let h=c[l];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(s(e.animations,c))}}if(t){let o=r(e.geometries),c=r(e.materials),l=r(e.textures),d=r(e.images),h=r(e.shapes),u=r(e.skeletons),f=r(e.animations),b=r(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),d.length>0&&(n.images=d),h.length>0&&(n.shapes=h),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),b.length>0&&(n.nodes=b)}return n.object=i,n;function r(o){let c=[];for(let l in o){let d=o[l];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};mt.DEFAULT_UP=new C(0,1,0);mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ln=new C,pi=new C,Yl=new C,mi=new C,Va=new C,Ga=new C,Zu=new C,Zl=new C,Ql=new C,$l=new C,eh=new $e,th=new $e,nh=new $e,Jt=class a{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Ln.subVectors(e,t),i.cross(Ln);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Ln.subVectors(i,t),pi.subVectors(n,t),Yl.subVectors(e,t);let r=Ln.dot(Ln),o=Ln.dot(pi),c=Ln.dot(Yl),l=pi.dot(pi),d=pi.dot(Yl),h=r*l-o*o;if(h===0)return s.set(0,0,0),null;let u=1/h,f=(l*c-o*d)*u,b=(r*d-o*c)*u;return s.set(1-f-b,b,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,mi)===null?!1:mi.x>=0&&mi.y>=0&&mi.x+mi.y<=1}static getInterpolation(e,t,n,i,s,r,o,c){return this.getBarycoord(e,t,n,i,mi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,mi.x),c.addScaledVector(r,mi.y),c.addScaledVector(o,mi.z),c)}static getInterpolatedAttribute(e,t,n,i,s,r){return eh.setScalar(0),th.setScalar(0),nh.setScalar(0),eh.fromBufferAttribute(e,t),th.fromBufferAttribute(e,n),nh.fromBufferAttribute(e,i),r.setScalar(0),r.addScaledVector(eh,s.x),r.addScaledVector(th,s.y),r.addScaledVector(nh,s.z),r}static isFrontFacing(e,t,n,i){return Ln.subVectors(n,t),pi.subVectors(e,t),Ln.cross(pi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ln.subVectors(this.c,this.b),pi.subVectors(this.a,this.b),Ln.cross(pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return a.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return a.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return a.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return a.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return a.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,r,o;Va.subVectors(i,n),Ga.subVectors(s,n),Zl.subVectors(e,n);let c=Va.dot(Zl),l=Ga.dot(Zl);if(c<=0&&l<=0)return t.copy(n);Ql.subVectors(e,i);let d=Va.dot(Ql),h=Ga.dot(Ql);if(d>=0&&h<=d)return t.copy(i);let u=c*h-d*l;if(u<=0&&c>=0&&d<=0)return r=c/(c-d),t.copy(n).addScaledVector(Va,r);$l.subVectors(e,s);let f=Va.dot($l),b=Ga.dot($l);if(b>=0&&f<=b)return t.copy(s);let g=f*l-c*b;if(g<=0&&l>=0&&b<=0)return o=l/(l-b),t.copy(n).addScaledVector(Ga,o);let m=d*b-f*h;if(m<=0&&h-d>=0&&f-b>=0)return Zu.subVectors(s,i),o=(h-d)/(h-d+(f-b)),t.copy(i).addScaledVector(Zu,o);let p=1/(m+g+u);return r=g*p,o=u*p,t.copy(n).addScaledVector(Va,r).addScaledVector(Ga,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},mp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ui={h:0,s:0,l:0},uo={h:0,s:0,l:0};function ih(a,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?a+(e-a)*6*t:t<1/2?e:t<2/3?a+(e-a)*6*(2/3-t):a}var Me=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ge.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Ge.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ge.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Ge.workingColorSpace){if(e=Yh(e,1),t=Fe(t,0,1),n=Fe(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,r=2*n-s;this.r=ih(r,s,e+1/3),this.g=ih(r,s,e),this.b=ih(r,s,e-1/3)}return Ge.colorSpaceToWorking(this,i),this}setStyle(e,t=wt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,r=i[1],o=i[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=wt){let n=mp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=gi(e.r),this.g=gi(e.g),this.b=gi(e.b),this}copyLinearToSRGB(e){return this.r=Za(e.r),this.g=Za(e.g),this.b=Za(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wt){return Ge.workingToColorSpace(qt.copy(this),e),Math.round(Fe(qt.r*255,0,255))*65536+Math.round(Fe(qt.g*255,0,255))*256+Math.round(Fe(qt.b*255,0,255))}getHexString(e=wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ge.workingColorSpace){Ge.workingToColorSpace(qt.copy(this),t);let n=qt.r,i=qt.g,s=qt.b,r=Math.max(n,i,s),o=Math.min(n,i,s),c,l,d=(o+r)/2;if(o===r)c=0,l=0;else{let h=r-o;switch(l=d<=.5?h/(r+o):h/(2-r-o),r){case n:c=(i-s)/h+(i<s?6:0);break;case i:c=(s-n)/h+2;break;case s:c=(n-i)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=d,e}getRGB(e,t=Ge.workingColorSpace){return Ge.workingToColorSpace(qt.copy(this),t),e.r=qt.r,e.g=qt.g,e.b=qt.b,e}getStyle(e=wt){Ge.workingToColorSpace(qt.copy(this),e);let t=qt.r,n=qt.g,i=qt.b;return e!==wt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Ui),this.setHSL(Ui.h+e,Ui.s+t,Ui.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ui),e.getHSL(uo);let n=Ks(Ui.h,uo.h,t),i=Ks(Ui.s,uo.s,t),s=Ks(Ui.l,uo.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},qt=new Me;Me.NAMES=mp;var Jb=0,bn=class extends xi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jb++}),this.uuid=Un(),this.name="",this.type="Material",this.blending=ha,this.side=Yt,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fo,this.blendDst=Lo,this.blendEquation=zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Me(0,0,0),this.blendAlpha=0,this.depthFunc=da,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Sh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=la,this.stencilZFail=la,this.stencilZPass=la,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ha&&(n.blending=this.blending),this.side!==Yt&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Fo&&(n.blendSrc=this.blendSrc),this.blendDst!==Lo&&(n.blendDst=this.blendDst),this.blendEquation!==zi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==da&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Sh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==la&&(n.stencilFail=this.stencilFail),this.stencilZFail!==la&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==la&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let r=[];for(let o in s){let c=s[o];delete c.metadata,r.push(c)}return r}if(t){let s=i(e.textures),r=i(e.images);s.length>0&&(n.textures=s),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Bn=class extends bn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Me(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mn,this.combine=Uh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var At=new C,fo=new be,Yb=0,Ke=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Yb++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=No,this.updateRanges=[],this.gpuType=fn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)fo.fromBufferAttribute(this,t),fo.applyMatrix3(e),this.setXY(t,fo.x,fo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Nn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=nt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Nn(t,this.array)),t}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Nn(t,this.array)),t}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Nn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Nn(t,this.array)),t}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array),s=nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==No&&(e.usage=this.usage),e}};var Qs=class extends Ke{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var $s=class extends Ke{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ct=class extends Ke{constructor(e,t,n){super(new Float32Array(e),t,n)}},Zb=0,Tn=new he,ah=new mt,Ha=new C,Sn=new Xe,js=new Xe,kt=new C,St=class a extends xi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zb++}),this.uuid=Un(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Zh(e)?$s:Qs)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Oe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Tn.makeRotationFromQuaternion(e),this.applyMatrix4(Tn),this}rotateX(e){return Tn.makeRotationX(e),this.applyMatrix4(Tn),this}rotateY(e){return Tn.makeRotationY(e),this.applyMatrix4(Tn),this}rotateZ(e){return Tn.makeRotationZ(e),this.applyMatrix4(Tn),this}translate(e,t,n){return Tn.makeTranslation(e,t,n),this.applyMatrix4(Tn),this}scale(e,t,n){return Tn.makeScale(e,t,n),this.applyMatrix4(Tn),this}lookAt(e){return ah.lookAt(e),ah.updateMatrix(),this.applyMatrix4(ah.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ha).negate(),this.translate(Ha.x,Ha.y,Ha.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let r=e[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Ct(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xe);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];Sn.setFromBufferAttribute(s),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){let n=this.boundingSphere.center;if(Sn.setFromBufferAttribute(e),t)for(let s=0,r=t.length;s<r;s++){let o=t[s];js.setFromBufferAttribute(o),this.morphTargetsRelative?(kt.addVectors(Sn.min,js.min),Sn.expandByPoint(kt),kt.addVectors(Sn.max,js.max),Sn.expandByPoint(kt)):(Sn.expandByPoint(js.min),Sn.expandByPoint(js.max))}Sn.getCenter(n);let i=0;for(let s=0,r=e.count;s<r;s++)kt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(kt));if(t)for(let s=0,r=t.length;s<r;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)kt.fromBufferAttribute(o,l),c&&(Ha.fromBufferAttribute(e,l),kt.add(Ha)),i=Math.max(i,n.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ke(new Float32Array(4*n.count),4));let r=this.getAttribute("tangent"),o=[],c=[];for(let R=0;R<n.count;R++)o[R]=new C,c[R]=new C;let l=new C,d=new C,h=new C,u=new be,f=new be,b=new be,g=new C,m=new C;function p(R,M,w){l.fromBufferAttribute(n,R),d.fromBufferAttribute(n,M),h.fromBufferAttribute(n,w),u.fromBufferAttribute(s,R),f.fromBufferAttribute(s,M),b.fromBufferAttribute(s,w),d.sub(l),h.sub(l),f.sub(u),b.sub(u);let I=1/(f.x*b.y-b.x*f.y);isFinite(I)&&(g.copy(d).multiplyScalar(b.y).addScaledVector(h,-f.y).multiplyScalar(I),m.copy(h).multiplyScalar(f.x).addScaledVector(d,-b.x).multiplyScalar(I),o[R].add(g),o[M].add(g),o[w].add(g),c[R].add(m),c[M].add(m),c[w].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let R=0,M=v.length;R<M;++R){let w=v[R],I=w.start,P=w.count;for(let F=I,N=I+P;F<N;F+=3)p(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let y=new C,x=new C,_=new C,S=new C;function E(R){_.fromBufferAttribute(i,R),S.copy(_);let M=o[R];y.copy(M),y.sub(_.multiplyScalar(_.dot(M))).normalize(),x.crossVectors(S,M);let I=x.dot(c[R])<0?-1:1;r.setXYZW(R,y.x,y.y,y.z,I)}for(let R=0,M=v.length;R<M;++R){let w=v[R],I=w.start,P=w.count;for(let F=I,N=I+P;F<N;F+=3)E(e.getX(F+0)),E(e.getX(F+1)),E(e.getX(F+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ke(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let i=new C,s=new C,r=new C,o=new C,c=new C,l=new C,d=new C,h=new C;if(e)for(let u=0,f=e.count;u<f;u+=3){let b=e.getX(u+0),g=e.getX(u+1),m=e.getX(u+2);i.fromBufferAttribute(t,b),s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,m),d.subVectors(r,s),h.subVectors(i,s),d.cross(h),o.fromBufferAttribute(n,b),c.fromBufferAttribute(n,g),l.fromBufferAttribute(n,m),o.add(d),c.add(d),l.add(d),n.setXYZ(b,o.x,o.y,o.z),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,f=t.count;u<f;u+=3)i.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),r.fromBufferAttribute(t,u+2),d.subVectors(r,s),h.subVectors(i,s),d.cross(h),n.setXYZ(u+0,d.x,d.y,d.z),n.setXYZ(u+1,d.x,d.y,d.z),n.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)kt.fromBufferAttribute(e,t),kt.normalize(),e.setXYZ(t,kt.x,kt.y,kt.z)}toNonIndexed(){function e(o,c){let l=o.array,d=o.itemSize,h=o.normalized,u=new l.constructor(c.length*d),f=0,b=0;for(let g=0,m=c.length;g<m;g++){o.isInterleavedBufferAttribute?f=c[g]*o.data.stride+o.offset:f=c[g]*d;for(let p=0;p<d;p++)u[b++]=l[f++]}return new Ke(u,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new a,n=this.index.array,i=this.attributes;for(let o in i){let c=i[o],l=e(c,n);t.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let d=0,h=l.length;d<h;d++){let u=l[d],f=e(u,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let o=0,c=r.length;o<c;o++){let l=r[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],d=[];for(let h=0,u=l.length;h<u;h++){let f=l[h];d.push(f.toJSON(e.data))}d.length>0&&(i[c]=d,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let d=i[l];this.setAttribute(l,d.clone(t))}let s=e.morphAttributes;for(let l in s){let d=[],h=s[l];for(let u=0,f=h.length;u<f;u++)d.push(h[u].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;let r=e.groups;for(let l=0,d=r.length;l<d;l++){let h=r[l];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Qu=new he,sa=new Zn,po=new yt,$u=new C,mo=new C,bo=new C,go=new C,sh=new C,xo=new C,ef=new C,vo=new C,tt=class extends mt{constructor(e=new St,t=new Bn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){xo.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let d=o[c],h=s[c];d!==0&&(sh.fromBufferAttribute(h,e),r?xo.addScaledVector(sh,d):xo.addScaledVector(sh.sub(t),d))}t.add(xo)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),po.copy(n.boundingSphere),po.applyMatrix4(s),sa.copy(e.ray).recast(e.near),!(po.containsPoint(sa.origin)===!1&&(sa.intersectSphere(po,$u)===null||sa.origin.distanceToSquared($u)>(e.far-e.near)**2))&&(Qu.copy(s).invert(),sa.copy(e.ray).applyMatrix4(Qu),!(n.boundingBox!==null&&sa.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,sa)))}_computeIntersections(e,t,n){let i,s=this.geometry,r=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,d=s.attributes.uv1,h=s.attributes.normal,u=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(r))for(let b=0,g=u.length;b<g;b++){let m=u[b],p=r[m.materialIndex],v=Math.max(m.start,f.start),y=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let x=v,_=y;x<_;x+=3){let S=o.getX(x),E=o.getX(x+1),R=o.getX(x+2);i=yo(this,p,e,n,l,d,h,S,E,R),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let b=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let m=b,p=g;m<p;m+=3){let v=o.getX(m),y=o.getX(m+1),x=o.getX(m+2);i=yo(this,r,e,n,l,d,h,v,y,x),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(r))for(let b=0,g=u.length;b<g;b++){let m=u[b],p=r[m.materialIndex],v=Math.max(m.start,f.start),y=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let x=v,_=y;x<_;x+=3){let S=x,E=x+1,R=x+2;i=yo(this,p,e,n,l,d,h,S,E,R),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let b=Math.max(0,f.start),g=Math.min(c.count,f.start+f.count);for(let m=b,p=g;m<p;m+=3){let v=m,y=m+1,x=m+2;i=yo(this,r,e,n,l,d,h,v,y,x),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}};function Qb(a,e,t,n,i,s,r,o){let c;if(e.side===Vt?c=n.intersectTriangle(r,s,i,!0,o):c=n.intersectTriangle(i,s,r,e.side===Yt,o),c===null)return null;vo.copy(o),vo.applyMatrix4(a.matrixWorld);let l=t.ray.origin.distanceTo(vo);return l<t.near||l>t.far?null:{distance:l,point:vo.clone(),object:a}}function yo(a,e,t,n,i,s,r,o,c,l){a.getVertexPosition(o,mo),a.getVertexPosition(c,bo),a.getVertexPosition(l,go);let d=Qb(a,e,t,n,mo,bo,go,ef);if(d){let h=new C;Jt.getBarycoord(ef,mo,bo,go,h),i&&(d.uv=Jt.getInterpolatedAttribute(i,o,c,l,h,new be)),s&&(d.uv1=Jt.getInterpolatedAttribute(s,o,c,l,h,new be)),r&&(d.normal=Jt.getInterpolatedAttribute(r,o,c,l,h,new C),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new C,materialIndex:0};Jt.getNormal(mo,bo,go,u.normal),d.face=u,d.barycoord=h}return d}var Vi=class a extends St{constructor(e=1,t=1,n=1,i=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:r};let o=this;i=Math.floor(i),s=Math.floor(s),r=Math.floor(r);let c=[],l=[],d=[],h=[],u=0,f=0;b("z","y","x",-1,-1,n,t,e,r,s,0),b("z","y","x",1,-1,n,t,-e,r,s,1),b("x","z","y",1,1,e,n,t,i,r,2),b("x","z","y",1,-1,e,n,-t,i,r,3),b("x","y","z",1,-1,e,t,n,i,s,4),b("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Ct(l,3)),this.setAttribute("normal",new Ct(d,3)),this.setAttribute("uv",new Ct(h,2));function b(g,m,p,v,y,x,_,S,E,R,M){let w=x/E,I=_/R,P=x/2,F=_/2,N=S/2,O=E+1,j=R+1,J=0,H=0,Q=new C;for(let ce=0;ce<j;ce++){let xe=ce*I-F;for(let Ue=0;Ue<O;Ue++){let at=Ue*w-P;Q[g]=at*v,Q[m]=xe*y,Q[p]=N,l.push(Q.x,Q.y,Q.z),Q[g]=0,Q[m]=0,Q[p]=S>0?1:-1,d.push(Q.x,Q.y,Q.z),h.push(Ue/E),h.push(1-ce/R),J+=1}}for(let ce=0;ce<R;ce++)for(let xe=0;xe<E;xe++){let Ue=u+xe+O*ce,at=u+xe+O*(ce+1),ht=u+(xe+1)+O*(ce+1),Ze=u+(xe+1)+O*ce;c.push(Ue,at,Ze),c.push(at,ht,Ze),H+=6}o.addGroup(f,H,M),f+=H,u+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new a(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function wa(a){let e={};for(let t in a){e[t]={};for(let n in a[t]){let i=a[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Zt(a){let e={};for(let t=0;t<a.length;t++){let n=wa(a[t]);for(let i in n)e[i]=n[i]}return e}function $b(a){let e=[];for(let t=0;t<a.length;t++)e.push(a[t].clone());return e}function Qh(a){let e=a.getRenderTarget();return e===null?a.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ge.workingColorSpace}var qc={clone:wa,merge:Zt},eg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Lt=class extends bn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=eg,this.fragmentShader=tg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=wa(e.uniforms),this.uniformsGroups=$b(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let r=this.uniforms[i].value;r&&r.isTexture?t.uniforms[i]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[i]={type:"m4",value:r.toArray()}:t.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},er=class extends mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=Rn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Bi=new C,tf=new be,nf=new be,Tt=class extends er{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=pa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(qs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return pa*2*Math.atan(Math.tan(qs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Bi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bi.x,Bi.y).multiplyScalar(-e/Bi.z),Bi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bi.x,Bi.y).multiplyScalar(-e/Bi.z)}getViewSize(e,t){return this.getViewBounds(e,tf,nf),t.subVectors(nf,tf)}setViewOffset(e,t,n,i,s,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(qs*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,r=this.view;if(this.view!==null&&this.view.enabled){let c=r.fullWidth,l=r.fullHeight;s+=r.offsetX*i/c,t-=r.offsetY*n/l,i*=r.width/c,n*=r.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Wa=-90,Xa=1,zo=class extends mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Tt(Wa,Xa,e,t);i.layers=this.layers,this.add(i);let s=new Tt(Wa,Xa,e,t);s.layers=this.layers,this.add(s);let r=new Tt(Wa,Xa,e,t);r.layers=this.layers,this.add(r);let o=new Tt(Wa,Xa,e,t);o.layers=this.layers,this.add(o);let c=new Tt(Wa,Xa,e,t);c.layers=this.layers,this.add(c);let l=new Tt(Wa,Xa,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,r,o,c]=t;for(let l of t)this.remove(l);if(e===Rn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ys)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,r,o,c,l,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),b=e.xr.enabled;e.xr.enabled=!1;let g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,r),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,d),e.setRenderTarget(h,u,f),e.xr.enabled=b,n.texture.needsPMREMUpdate=!0}},tr=class extends Ft{constructor(e=[],t=ya,n,i,s,r,o,c,l,d){super(e,t,n,i,s,r,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},jo=class extends pn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new tr(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Vi(5,5,5),s=new Lt({name:"CubemapFromEquirect",uniforms:wa(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Vt,blending:On});s.uniforms.tEquirect.value=t;let r=new tt(i,s),o=t.minFilter;return t.minFilter===zn&&(t.minFilter=an),new zo(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,n,i);e.setRenderTarget(s)}},un=class extends mt{constructor(){super(),this.isGroup=!0,this.type="Group"}},ng={type:"move"},as=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new un,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new un,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new un,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,r=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){r=!0;for(let g of e.hand.values()){let m=t.getJointPose(g,n),p=this._getHandJoint(l,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let d=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],u=d.position.distanceTo(h.position),f=.02,b=.005;l.inputState.pinching&&u>f+b?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=f-b&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ng)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new un;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var nr=class extends mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new mn,this.environmentIntensity=1,this.environmentRotation=new mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},ss=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=No,this.updateRanges=[],this.version=0,this.uuid=Un()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Un()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Un()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},nn=new C,rs=class a{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyMatrix4(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyNormalMatrix(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.transformDirection(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Nn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=nt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Nn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Nn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Nn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Nn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array),s=nt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Ke(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new a(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var af=new C,sf=new $e,rf=new $e,ig=new C,of=new he,_o=new C,rh=new yt,cf=new he,oh=new Zn,ir=class extends tt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=yh,this.bindMatrix=new he,this.bindMatrixInverse=new he,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Xe),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,_o),this.boundingBox.expandByPoint(_o)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new yt),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,_o),this.boundingSphere.expandByPoint(_o)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rh.copy(this.boundingSphere),rh.applyMatrix4(i),e.ray.intersectsSphere(rh)!==!1&&(cf.copy(i).invert(),oh.copy(e.ray).applyMatrix4(cf),!(this.boundingBox!==null&&oh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,oh)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new $e,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===yh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===tp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;sf.fromBufferAttribute(i.attributes.skinIndex,e),rf.fromBufferAttribute(i.attributes.skinWeight,e),af.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let r=rf.getComponent(s);if(r!==0){let o=sf.getComponent(s);of.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(ig.copy(af).applyMatrix4(of),r)}}return t.applyMatrix4(this.bindMatrixInverse)}},os=class extends mt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Oi=class extends Ft{constructor(e=null,t=1,n=1,i,s,r,o,c,l=zt,d=zt,h,u){super(null,r,o,c,l,d,i,s,h,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},lf=new he,ag=new he,ar=class a{constructor(e=[],t=[]){this.uuid=Un(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new he)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new he;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,r=e.length;s<r;s++){let o=e[s]?e[s].matrixWorld:ag;lf.multiplyMatrices(o,t[s]),lf.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new a(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Oi(t,e,e,sn,fn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],r=t[s];r===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),r=new os),this.bones.push(r),this.boneInverses.push(new he().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let r=t[i];e.bones.push(r.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},Qn=class extends Ke{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},qa=new he,hf=new he,Mo=[],df=new Xe,sg=new he,Vs=new tt,Gs=new yt,sr=class extends tt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Qn(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,sg)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Xe),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,qa),df.copy(e.boundingBox).applyMatrix4(qa),this.boundingBox.union(df)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new yt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,qa),Gs.copy(e.boundingSphere).applyMatrix4(qa),this.boundingSphere.union(Gs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,r=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[r+o]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Vs.geometry=this.geometry,Vs.material=this.material,Vs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Gs.copy(this.boundingSphere),Gs.applyMatrix4(n),e.ray.intersectsSphere(Gs)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,qa),hf.multiplyMatrices(n,qa),Vs.matrixWorld=hf,Vs.raycast(e,Mo);for(let r=0,o=Mo.length;r<o;r++){let c=Mo[r];c.instanceId=s,c.object=this,t.push(c)}Mo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Qn(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Oi(new Float32Array(i*this.count),i,this.count,bc,fn));let s=this.morphTexture.source.data.data,r=0;for(let l=0;l<n.length;l++)r+=n[l];let o=this.geometry.morphTargetsRelative?1:1-r,c=i*e;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ch=new C,rg=new C,og=new Oe,dn=class{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=ch.subVectors(n,t).cross(rg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(ch),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||og.getNormalMatrix(e),i=this.coplanarPoint(ch).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ra=new yt,cg=new be(.5,.5),wo=new C,Gi=class{constructor(e=new dn,t=new dn,n=new dn,i=new dn,s=new dn,r=new dn){this.planes=[e,t,n,i,s,r]}set(e,t,n,i,s,r){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(r),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Rn,n=!1){let i=this.planes,s=e.elements,r=s[0],o=s[1],c=s[2],l=s[3],d=s[4],h=s[5],u=s[6],f=s[7],b=s[8],g=s[9],m=s[10],p=s[11],v=s[12],y=s[13],x=s[14],_=s[15];if(i[0].setComponents(l-r,f-d,p-b,_-v).normalize(),i[1].setComponents(l+r,f+d,p+b,_+v).normalize(),i[2].setComponents(l+o,f+h,p+g,_+y).normalize(),i[3].setComponents(l-o,f-h,p-g,_-y).normalize(),n)i[4].setComponents(c,u,m,x).normalize(),i[5].setComponents(l-c,f-u,p-m,_-x).normalize();else if(i[4].setComponents(l-c,f-u,p-m,_-x).normalize(),t===Rn)i[5].setComponents(l+c,f+u,p+m,_+x).normalize();else if(t===Ys)i[5].setComponents(c,u,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ra.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ra.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ra)}intersectsSprite(e){ra.center.set(0,0,0);let t=cg.distanceTo(e.center);return ra.radius=.7071067811865476+t,ra.applyMatrix4(e.matrixWorld),this.intersectsSphere(ra)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(wo.x=i.normal.x>0?e.max.x:e.min.x,wo.y=i.normal.y>0?e.max.y:e.min.y,wo.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(wo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},qn=new he,Kn=new Gi,Vo=class a{constructor(){this.coordinateSystem=Rn}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(qn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Kn.setFromProjectionMatrix(qn,i.coordinateSystem,i.reversedDepth),Kn.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(qn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Kn.setFromProjectionMatrix(qn,i.coordinateSystem,i.reversedDepth),Kn.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(qn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Kn.setFromProjectionMatrix(qn,i.coordinateSystem,i.reversedDepth),Kn.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(qn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Kn.setFromProjectionMatrix(qn,i.coordinateSystem,i.reversedDepth),Kn.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(qn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Kn.setFromProjectionMatrix(qn,i.coordinateSystem,i.reversedDepth),Kn.containsPoint(e))return!0}return!1}clone(){return new a}};function lh(a,e){return a-e}function lg(a,e){return a.z-e.z}function hg(a,e){return e.z-a.z}var Eh=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let s=this.pool,r=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];r.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},hn=new he,dg=new Me(1,1,1),uf=new Gi,ug=new Vo,So=new Xe,oa=new yt,Hs=new C,ff=new C,fg=new C,hh=new Eh,Kt=new tt,Eo=[];function pg(a,e,t=0){let n=e.itemSize;if(a.isInterleavedBufferAttribute||a.array.constructor!==e.array.constructor){let i=a.count;for(let s=0;s<i;s++)for(let r=0;r<n;r++)e.setComponent(s+t,r,a.getComponent(s,r))}else e.array.set(a.array,t*n);e.needsUpdate=!0}function ca(a,e){if(a.constructor!==e.constructor){let t=Math.min(a.length,e.length);for(let n=0;n<t;n++)e[n]=a[n]}else{let t=Math.min(a.length,e.length);e.set(new a.constructor(a.buffer,0,t))}}var rr=class extends tt{constructor(e,t,n=t*2,i){super(new St,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4),n=new Oi(t,e,e,sn,fn);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);let t=new Uint32Array(e*e),n=new Oi(t,e,e,Tr,Cn);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);let t=new Float32Array(e*e*4).fill(1),n=new Oi(t,e,e,sn,fn);n.colorSpace=Ge.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){let t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(let s in e.attributes){let r=e.getAttribute(s),{array:o,itemSize:c,normalized:l}=r,d=new o.constructor(n*c),h=new Ke(d,c,l);t.setAttribute(s,h)}if(e.getIndex()!==null){let s=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new Ke(s,1))}this._geometryInitialized=!0}}_validateGeometry(e){let t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(let n in t.attributes){if(!e.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);let i=e.getAttribute(n),s=t.getAttribute(n);if(i.itemSize!==s.itemSize||i.normalized!==s.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(e){let t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){let t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xe);let e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;let s=t[n].geometryIndex;this.getMatrixAt(n,hn),this.getBoundingBoxAt(s,So).applyMatrix4(hn),e.union(So)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yt);let e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;let s=t[n].geometryIndex;this.getMatrixAt(n,hn),this.getBoundingSphereAt(s,oa).applyMatrix4(hn),e.union(oa)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");let n={visible:!0,active:!0,geometryIndex:e},i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(lh),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));let s=this._matricesTexture;hn.identity().toArray(s.image.data,i*16),s.needsUpdate=!0;let r=this._colorsTexture;return r&&(dg.toArray(r.image.data,i*4),r.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);let i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},s=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;let r=e.getIndex();if(r!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?r.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let c;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(lh),c=this._availableGeometryIds.shift(),s[c]=i):(c=this._geometryCount,this._geometryCount++,s.push(i)),this.setGeometryAt(c,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,c}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);let n=this.geometry,i=n.getIndex()!==null,s=n.getIndex(),r=t.getIndex(),o=this._geometryInfo[e];if(i&&r.count>o.reservedIndexCount||t.attributes.position.count>o.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");let c=o.vertexStart,l=o.reservedVertexCount;o.vertexCount=t.getAttribute("position").count;for(let d in n.attributes){let h=t.getAttribute(d),u=n.getAttribute(d);pg(h,u,c);let f=h.itemSize;for(let b=h.count,g=l;b<g;b++){let m=c+b;for(let p=0;p<f;p++)u.setComponent(m,p,0)}u.needsUpdate=!0,u.addUpdateRange(c*f,l*f)}if(i){let d=o.indexStart,h=o.reservedIndexCount;o.indexCount=t.getIndex().count;for(let u=0;u<r.count;u++)s.setX(d+u,c+r.getX(u));for(let u=r.count,f=h;u<f;u++)s.setX(d+u,c);s.needsUpdate=!0,s.addUpdateRange(d,o.reservedIndexCount)}return o.start=i?o.indexStart:o.vertexStart,o.count=i?o.indexCount:o.vertexCount,o.boundingBox=null,t.boundingBox!==null&&(o.boundingBox=t.boundingBox.clone()),o.boundingSphere=null,t.boundingSphere!==null&&(o.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){let t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;let n=this._instanceInfo;for(let i=0,s=n.length;i<s;i++)n[i].active&&n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0,n=this._geometryInfo,i=n.map((r,o)=>o).sort((r,o)=>n[r].vertexStart-n[o].vertexStart),s=this.geometry;for(let r=0,o=n.length;r<o;r++){let c=i[r],l=n[c];if(l.active!==!1){if(s.index!==null){if(l.indexStart!==t){let{indexStart:d,vertexStart:h,reservedIndexCount:u}=l,f=s.index,b=f.array,g=e-h;for(let m=d;m<d+u;m++)b[m]=b[m]+g;f.array.copyWithin(t,d,d+u),f.addUpdateRange(t,u),l.indexStart=t}t+=l.reservedIndexCount}if(l.vertexStart!==e){let{vertexStart:d,reservedVertexCount:h}=l,u=s.attributes;for(let f in u){let b=u[f],{array:g,itemSize:m}=b;g.copyWithin(e*m,d*m,(d+h)*m),b.addUpdateRange(e*m,h*m)}l.vertexStart=e}e+=l.reservedVertexCount,l.start=s.index?l.indexStart:l.vertexStart,this._nextIndexStart=s.index?l.indexStart+l.reservedIndexCount:0,this._nextVertexStart=l.vertexStart+l.reservedVertexCount}}return this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){let s=new Xe,r=n.index,o=n.attributes.position;for(let c=i.start,l=i.start+i.count;c<l;c++){let d=c;r&&(d=r.getX(d)),s.expandByPoint(Hs.fromBufferAttribute(o,d))}i.boundingBox=s}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){let s=new yt;this.getBoundingBoxAt(e,So),So.getCenter(s.center);let r=n.index,o=n.attributes.position,c=0;for(let l=i.start,d=i.start+i.count;l<d;l++){let h=l;r&&(h=r.getX(h)),Hs.fromBufferAttribute(o,h),c=Math.max(c,s.center.distanceToSquared(Hs))}s.radius=Math.sqrt(c),i.boundingSphere=s}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);let n=this._matricesTexture,i=this._matricesTexture.image.data;return t.toArray(i,e*16),n.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);let n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){let t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(lh);t[t.length-1]===n.length-1;)n.pop(),t.pop();if(e<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);let i=new Int32Array(e),s=new Int32Array(e);ca(this._multiDrawCounts,i),ca(this._multiDrawStarts,s),this._multiDrawCounts=i,this._multiDrawStarts=s,this._maxInstanceCount=e;let r=this._indirectTexture,o=this._matricesTexture,c=this._colorsTexture;r.dispose(),this._initIndirectTexture(),ca(r.image.data,this._indirectTexture.image.data),o.dispose(),this._initMatricesTexture(),ca(o.image.data,this._matricesTexture.image.data),c&&(c.dispose(),this._initColorsTexture(),ca(c.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){let n=[...this._geometryInfo].filter(o=>o.active);if(Math.max(...n.map(o=>o.vertexStart+o.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(c=>c.indexStart+c.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);let s=this.geometry;s.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new St,this._initializeGeometry(s));let r=this.geometry;s.index&&ca(s.index.array,r.index.array);for(let o in s.attributes)ca(s.attributes[o].array,r.attributes[o].array)}raycast(e,t){let n=this._instanceInfo,i=this._geometryInfo,s=this.matrixWorld,r=this.geometry;Kt.material=this.material,Kt.geometry.index=r.index,Kt.geometry.attributes=r.attributes,Kt.geometry.boundingBox===null&&(Kt.geometry.boundingBox=new Xe),Kt.geometry.boundingSphere===null&&(Kt.geometry.boundingSphere=new yt);for(let o=0,c=n.length;o<c;o++){if(!n[o].visible||!n[o].active)continue;let l=n[o].geometryIndex,d=i[l];Kt.geometry.setDrawRange(d.start,d.count),this.getMatrixAt(o,Kt.matrixWorld).premultiply(s),this.getBoundingBoxAt(l,Kt.geometry.boundingBox),this.getBoundingSphereAt(l,Kt.geometry.boundingSphere),Kt.raycast(e,Eo);for(let h=0,u=Eo.length;h<u;h++){let f=Eo[h];f.object=this,f.batchId=o,t.push(f)}Eo.length=0}Kt.material=null,Kt.geometry.index=null,Kt.geometry.attributes={},Kt.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._availableInstanceIds=e._availableInstanceIds.slice(),this._availableGeometryIds=e._availableGeometryIds.slice(),this._nextIndexStart=e._nextIndexStart,this._nextVertexStart=e._nextVertexStart,this._geometryCount=e._geometryCount,this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._indirectTexture=e._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(e,t,n,i,s){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;let r=i.getIndex(),o=r===null?1:r.array.BYTES_PER_ELEMENT,c=this._instanceInfo,l=this._multiDrawStarts,d=this._multiDrawCounts,h=this._geometryInfo,u=this.perObjectFrustumCulled,f=this._indirectTexture,b=f.image.data,g=n.isArrayCamera?ug:uf;u&&!n.isArrayCamera&&(hn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),uf.setFromProjectionMatrix(hn,n.coordinateSystem,n.reversedDepth));let m=0;if(this.sortObjects){hn.copy(this.matrixWorld).invert(),Hs.setFromMatrixPosition(n.matrixWorld).applyMatrix4(hn),ff.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(hn);for(let y=0,x=c.length;y<x;y++)if(c[y].visible&&c[y].active){let _=c[y].geometryIndex;this.getMatrixAt(y,hn),this.getBoundingSphereAt(_,oa).applyMatrix4(hn);let S=!1;if(u&&(S=!g.intersectsSphere(oa,n)),!S){let E=h[_],R=fg.subVectors(oa.center,Hs).dot(ff);hh.push(E.start,E.count,R,y)}}let p=hh.list,v=this.customSort;v===null?p.sort(s.transparent?hg:lg):v.call(this,p,n);for(let y=0,x=p.length;y<x;y++){let _=p[y];l[m]=_.start*o,d[m]=_.count,b[m]=_.index,m++}hh.reset()}else for(let p=0,v=c.length;p<v;p++)if(c[p].visible&&c[p].active){let y=c[p].geometryIndex,x=!1;if(u&&(this.getMatrixAt(p,hn),this.getBoundingSphereAt(y,oa).applyMatrix4(hn),x=!g.intersectsSphere(oa,n)),!x){let _=h[y];l[m]=_.start*o,d[m]=_.count,b[m]=p,m++}}f.needsUpdate=!0,this._multiDrawCount=m,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,s,r){this.onBeforeRender(e,null,i,s,r)}},cs=class extends bn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Me(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Go=new C,Ho=new C,pf=new he,Ws=new Zn,Ao=new yt,dh=new C,mf=new C,ma=class extends mt{constructor(e=new St,t=new cs){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Go.fromBufferAttribute(t,i-1),Ho.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Go.distanceTo(Ho);e.setAttribute("lineDistance",new Ct(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ao.copy(n.boundingSphere),Ao.applyMatrix4(i),Ao.radius+=s,e.ray.intersectsSphere(Ao)===!1)return;pf.copy(i).invert(),Ws.copy(e.ray).applyMatrix4(pf);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,d=n.index,u=n.attributes.position;if(d!==null){let f=Math.max(0,r.start),b=Math.min(d.count,r.start+r.count);for(let g=f,m=b-1;g<m;g+=l){let p=d.getX(g),v=d.getX(g+1),y=To(this,e,Ws,c,p,v,g);y&&t.push(y)}if(this.isLineLoop){let g=d.getX(b-1),m=d.getX(f),p=To(this,e,Ws,c,g,m,b-1);p&&t.push(p)}}else{let f=Math.max(0,r.start),b=Math.min(u.count,r.start+r.count);for(let g=f,m=b-1;g<m;g+=l){let p=To(this,e,Ws,c,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){let g=To(this,e,Ws,c,b-1,f,b-1);g&&t.push(g)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function To(a,e,t,n,i,s,r){let o=a.geometry.attributes.position;if(Go.fromBufferAttribute(o,i),Ho.fromBufferAttribute(o,s),t.distanceSqToSegment(Go,Ho,dh,mf)>n)return;dh.applyMatrix4(a.matrixWorld);let l=e.ray.origin.distanceTo(dh);if(!(l<e.near||l>e.far))return{distance:l,point:mf.clone().applyMatrix4(a.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:a}}var bf=new C,gf=new C,or=class extends ma{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)bf.fromBufferAttribute(t,i),gf.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+bf.distanceTo(gf);e.setAttribute("lineDistance",new Ct(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},cr=class extends ma{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},ls=class extends bn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Me(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},xf=new he,Ah=new Zn,Ro=new yt,Co=new C,ba=class extends mt{constructor(e=new St,t=new ls){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ro.copy(n.boundingSphere),Ro.applyMatrix4(i),Ro.radius+=s,e.ray.intersectsSphere(Ro)===!1)return;xf.copy(i).invert(),Ah.copy(e.ray).applyMatrix4(xf);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){let u=Math.max(0,r.start),f=Math.min(l.count,r.start+r.count);for(let b=u,g=f;b<g;b++){let m=l.getX(b);Co.fromBufferAttribute(h,m),vf(Co,m,c,i,e,t,this)}}else{let u=Math.max(0,r.start),f=Math.min(h.count,r.start+r.count);for(let b=u,g=f;b<g;b++)Co.fromBufferAttribute(h,b),vf(Co,b,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function vf(a,e,t,n,i,s,r){let o=Ah.distanceSqToPoint(a);if(o<t){let c=new C;Ah.closestPointToPoint(a,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}var Hi=class extends Ft{constructor(e,t,n=Cn,i,s,r,o=zt,c=zt,l,d=$a,h=1){if(d!==$a&&d!==ps)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:h};super(u,i,s,r,o,c,d,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ns(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},lr=class extends Ft{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var Wo=class a extends St{constructor(e=1,t=1,n=1,i=32,s=1,r=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),s=Math.floor(s);let d=[],h=[],u=[],f=[],b=0,g=[],m=n/2,p=0;v(),r===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(d),this.setAttribute("position",new Ct(h,3)),this.setAttribute("normal",new Ct(u,3)),this.setAttribute("uv",new Ct(f,2));function v(){let x=new C,_=new C,S=0,E=(t-e)/n;for(let R=0;R<=s;R++){let M=[],w=R/s,I=w*(t-e)+e;for(let P=0;P<=i;P++){let F=P/i,N=F*c+o,O=Math.sin(N),j=Math.cos(N);_.x=I*O,_.y=-w*n+m,_.z=I*j,h.push(_.x,_.y,_.z),x.set(O,E,j).normalize(),u.push(x.x,x.y,x.z),f.push(F,1-w),M.push(b++)}g.push(M)}for(let R=0;R<i;R++)for(let M=0;M<s;M++){let w=g[M][R],I=g[M+1][R],P=g[M+1][R+1],F=g[M][R+1];(e>0||M!==0)&&(d.push(w,I,F),S+=3),(t>0||M!==s-1)&&(d.push(I,P,F),S+=3)}l.addGroup(p,S,0),p+=S}function y(x){let _=b,S=new be,E=new C,R=0,M=x===!0?e:t,w=x===!0?1:-1;for(let P=1;P<=i;P++)h.push(0,m*w,0),u.push(0,w,0),f.push(.5,.5),b++;let I=b;for(let P=0;P<=i;P++){let N=P/i*c+o,O=Math.cos(N),j=Math.sin(N);E.x=M*j,E.y=m*w,E.z=M*O,h.push(E.x,E.y,E.z),u.push(0,w,0),S.x=O*.5+.5,S.y=j*.5*w+.5,f.push(S.x,S.y),b++}for(let P=0;P<i;P++){let F=_+P,N=I+P;x===!0?d.push(N,N+1,F):d.push(N+1,N,F),R+=3}l.addGroup(p,R,x===!0?1:2),p+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new a(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},hr=class a extends Wo{constructor(e=1,t=1,n=32,i=1,s=!1,r=0,o=Math.PI*2){super(0,e,t,n,i,s,r,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:r,thetaLength:o}}static fromJSON(e){return new a(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var dr=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let r=1;r<=e;r++)n=this.getPoint(r/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,s=n.length,r;t?r=t:r=e*n[s-1];let o=0,c=s-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-r,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===r)return i/(s-1);let d=n[i],u=n[i+1]-d,f=(r-d)/u;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let r=this.getPoint(i),o=this.getPoint(s),c=t||(r.isVector2?new be:new C);return c.copy(o).sub(r).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new C,i=[],s=[],r=[],o=new C,c=new he;for(let f=0;f<=e;f++){let b=f/e;i[f]=this.getTangentAt(b,new C)}s[0]=new C,r[0]=new C;let l=Number.MAX_VALUE,d=Math.abs(i[0].x),h=Math.abs(i[0].y),u=Math.abs(i[0].z);d<=l&&(l=d,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),u<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),r[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),r[f]=r[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let b=Math.acos(Fe(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(o,b))}r[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(Fe(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let b=1;b<=e;b++)s[b].applyMatrix4(c.makeRotationAxis(i[b],f*b)),r[b].crossVectors(i[b],s[b])}return{tangents:i,normals:s,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}};function $h(){let a=0,e=0,t=0,n=0;function i(s,r,o,c){a=s,e=o,t=-3*s+3*r-2*o-c,n=2*s-2*r+o+c}return{initCatmullRom:function(s,r,o,c,l){i(r,o,l*(o-s),l*(c-r))},initNonuniformCatmullRom:function(s,r,o,c,l,d,h){let u=(r-s)/l-(o-s)/(l+d)+(o-r)/d,f=(o-r)/d-(c-r)/(d+h)+(c-o)/h;u*=d,f*=d,i(r,o,u,f)},calc:function(s){let r=s*s,o=r*s;return a+e*s+t*r+n*o}}}var Io=new C,uh=new $h,fh=new $h,ph=new $h,ur=class extends dr{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new C){let n=t,i=this.points,s=i.length,r=(s-(this.closed?0:1))*e,o=Math.floor(r),c=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:c===0&&o===s-1&&(o=s-2,c=1);let l,d;this.closed||o>0?l=i[(o-1)%s]:(Io.subVectors(i[0],i[1]).add(i[0]),l=Io);let h=i[o%s],u=i[(o+1)%s];if(this.closed||o+2<s?d=i[(o+2)%s]:(Io.subVectors(i[s-1],i[s-2]).add(i[s-1]),d=Io),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,b=Math.pow(l.distanceToSquared(h),f),g=Math.pow(h.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(d),f);g<1e-4&&(g=1),b<1e-4&&(b=g),m<1e-4&&(m=g),uh.initNonuniformCatmullRom(l.x,h.x,u.x,d.x,b,g,m),fh.initNonuniformCatmullRom(l.y,h.y,u.y,d.y,b,g,m),ph.initNonuniformCatmullRom(l.z,h.z,u.z,d.z,b,g,m)}else this.curveType==="catmullrom"&&(uh.initCatmullRom(l.x,h.x,u.x,d.x,this.tension),fh.initCatmullRom(l.y,h.y,u.y,d.y,this.tension),ph.initCatmullRom(l.z,h.z,u.z,d.z,this.tension));return n.set(uh.calc(c),fh.calc(c),ph.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new C().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function mg(a,e){let t=1-a;return t*t*e}function bg(a,e){return 2*(1-a)*a*e}function gg(a,e){return a*a*e}function mh(a,e,t,n){return mg(a,e)+bg(a,t)+gg(a,n)}var fr=class extends dr{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){let n=t,i=this.v0,s=this.v1,r=this.v2;return n.set(mh(e,i.x,s.x,r.x),mh(e,i.y,s.y,r.y),mh(e,i.z,s.z,r.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}};var pr=class a extends St{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,r=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,d=c+1,h=e/o,u=t/c,f=[],b=[],g=[],m=[];for(let p=0;p<d;p++){let v=p*u-r;for(let y=0;y<l;y++){let x=y*h-s;b.push(x,-v,0),g.push(0,0,1),m.push(y/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<o;v++){let y=v+l*p,x=v+l*(p+1),_=v+1+l*(p+1),S=v+1+l*p;f.push(y,x,S),f.push(x,_,S)}this.setIndex(f),this.setAttribute("position",new Ct(b,3)),this.setAttribute("normal",new Ct(g,3)),this.setAttribute("uv",new Ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new a(e.width,e.height,e.widthSegments,e.heightSegments)}};var vi=class extends bn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Me(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Me(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qh,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},gn=class extends vi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new be(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Fe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Me(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Me(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Me(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Xo=class extends bn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ip,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},qo=class extends bn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Po(a,e){return!a||a.constructor===e?a:typeof e.BYTES_PER_ELEMENT=="number"?new e(a):Array.prototype.slice.call(a)}function xg(a){return ArrayBuffer.isView(a)&&!(a instanceof DataView)}function vg(a){function e(i,s){return a[i]-a[s]}let t=a.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function yf(a,e,t){let n=a.length,i=new a.constructor(n);for(let s=0,r=0;r!==n;++s){let o=t[s]*e;for(let c=0;c!==e;++c)i[r++]=a[o+c]}return i}function bp(a,e,t,n){let i=1,s=a[0];for(;s!==void 0&&s[n]===void 0;)s=a[i++];if(s===void 0)return;let r=s[n];if(r!==void 0)if(Array.isArray(r))do r=s[n],r!==void 0&&(e.push(s.time),t.push(...r)),s=a[i++];while(s!==void 0);else if(r.toArray!==void 0)do r=s[n],r!==void 0&&(e.push(s.time),r.toArray(t,t.length)),s=a[i++];while(s!==void 0);else do r=s[n],r!==void 0&&(e.push(s.time),t.push(r)),s=a[i++];while(s!==void 0)}var yi=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let r;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}r=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}r=n,n=0;break t}break n}for(;n<r;){let o=n+r>>>1;e<t[o]?r=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let r=0;r!==i;++r)t[r]=n[s+r];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ko=class extends yi{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:_h,endingEnd:_h}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,r=e+1,o=i[s],c=i[r];if(o===void 0)switch(this.getSettings_().endingStart){case Mh:s=e,o=2*t-n;break;case wh:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Mh:r=e,c=2*n-t;break;case wh:r=1,c=n+i[1]-i[0];break;default:r=e-1,c=t}let l=(n-t)*.5,d=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*d,this._offsetNext=r*d}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,d=this._offsetPrev,h=this._offsetNext,u=this._weightPrev,f=this._weightNext,b=(n-t)/(i-t),g=b*b,m=g*b,p=-u*m+2*u*g-u*b,v=(1+u)*m+(-1.5-2*u)*g+(-.5+u)*b+1,y=(-1-f)*m+(1.5+f)*g+.5*b,x=f*m-f*g;for(let _=0;_!==o;++_)s[_]=p*r[d+_]+v*r[l+_]+y*r[c+_]+x*r[h+_];return s}},Jo=class extends yi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,d=(n-t)/(i-t),h=1-d;for(let u=0;u!==o;++u)s[u]=r[l+u]*h+r[c+u]*d;return s}},Yo=class extends yi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},xn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Po(t,this.TimeBufferType),this.values=Po(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Po(e.times,Array),values:Po(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Yo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Jo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ko(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ua:t=this.InterpolantFactoryMethodDiscrete;break;case fa:t=this.InterpolantFactoryMethodLinear;break;case ko:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ua;case this.InterpolantFactoryMethodLinear:return fa;case this.InterpolantFactoryMethodSmooth:return ko}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,r=i-1;for(;s!==i&&n[s]<e;)++s;for(;r!==-1&&n[r]>t;)--r;if(++r,s!==0||r!==i){s>=r&&(r=Math.max(r,1),s=r-1);let o=this.getValueSize();this.times=n.slice(s,r),this.values=this.values.slice(s*o,r*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let r=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(r!==null&&r>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,r),e=!1;break}r=c}if(i!==void 0&&xg(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ko,s=e.length-1,r=1;for(let o=1;o<s;++o){let c=!1,l=e[o],d=e[o+1];if(l!==d&&(o!==1||l!==e[0]))if(i)c=!0;else{let h=o*n,u=h-n,f=h+n;for(let b=0;b!==n;++b){let g=t[h+b];if(g!==t[u+b]||g!==t[f+b]){c=!0;break}}}if(c){if(o!==r){e[r]=e[o];let h=o*n,u=r*n;for(let f=0;f!==n;++f)t[u+f]=t[h+f]}++r}}if(s>0){e[r]=e[s];for(let o=s*n,c=r*n,l=0;l!==n;++l)t[c+l]=t[o+l];++r}return r!==e.length?(this.times=e.slice(0,r),this.values=t.slice(0,r*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};xn.prototype.ValueTypeName="";xn.prototype.TimeBufferType=Float32Array;xn.prototype.ValueBufferType=Float32Array;xn.prototype.DefaultInterpolation=fa;var _i=class extends xn{constructor(e,t,n){super(e,t,n)}};_i.prototype.ValueTypeName="bool";_i.prototype.ValueBufferType=Array;_i.prototype.DefaultInterpolation=ua;_i.prototype.InterpolantFactoryMethodLinear=void 0;_i.prototype.InterpolantFactoryMethodSmooth=void 0;var mr=class extends xn{constructor(e,t,n,i){super(e,t,n,i)}};mr.prototype.ValueTypeName="color";var $n=class extends xn{constructor(e,t,n,i){super(e,t,n,i)}};$n.prototype.ValueTypeName="number";var Zo=class extends yi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let d=l+o;l!==d;l+=4)rn.slerpFlat(s,0,r,l-o,r,l,c);return s}},ei=class extends xn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Zo(this.times,this.values,this.getValueSize(),e)}};ei.prototype.ValueTypeName="quaternion";ei.prototype.InterpolantFactoryMethodSmooth=void 0;var Mi=class extends xn{constructor(e,t,n){super(e,t,n)}};Mi.prototype.ValueTypeName="string";Mi.prototype.ValueBufferType=Array;Mi.prototype.DefaultInterpolation=ua;Mi.prototype.InterpolantFactoryMethodLinear=void 0;Mi.prototype.InterpolantFactoryMethodSmooth=void 0;var ti=class extends xn{constructor(e,t,n,i){super(e,t,n,i)}};ti.prototype.ValueTypeName="vector";var br=class{constructor(e="",t=-1,n=[],i=np){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Un(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let r=0,o=n.length;r!==o;++r)t.push(_g(n[r]).scale(i));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,r=n.length;s!==r;++s)t.push(xn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let s=t.length,r=[];for(let o=0;o<s;o++){let c=[],l=[];c.push((o+s-1)%s,o,(o+1)%s),l.push(0,1,0);let d=vg(c);c=yf(c,1,d),l=yf(l,1,d),!i&&c[0]===0&&(c.push(s),l.push(l[0])),r.push(new $n(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,r)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],d=l.name.match(s);if(d&&d.length>1){let h=d[1],u=i[h];u||(i[h]=u=[]),u.push(l)}}let r=[];for(let o in i)r.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return r}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,u,f,b,g){if(f.length!==0){let m=[],p=[];bp(f,m,p,b),m.length!==0&&g.push(new h(u,m,p))}},i=[],s=e.name||"default",r=e.fps||30,o=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let h=0;h<l.length;h++){let u=l[h].keys;if(!(!u||u.length===0))if(u[0].morphTargets){let f={},b;for(b=0;b<u.length;b++)if(u[b].morphTargets)for(let g=0;g<u[b].morphTargets.length;g++)f[u[b].morphTargets[g]]=-1;for(let g in f){let m=[],p=[];for(let v=0;v!==u[b].morphTargets.length;++v){let y=u[b];m.push(y.time),p.push(y.morphTarget===g?1:0)}i.push(new $n(".morphTargetInfluence["+g+"]",m,p))}c=f.length*r}else{let f=".bones["+t[h].name+"]";n(ti,f+".position",u,"pos",i),n(ei,f+".quaternion",u,"rot",i),n(ti,f+".scale",u,"scl",i)}}return i.length===0?null:new this(s,c,i,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function yg(a){switch(a.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return $n;case"vector":case"vector2":case"vector3":case"vector4":return ti;case"color":return mr;case"quaternion":return ei;case"bool":case"boolean":return _i;case"string":return Mi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+a)}function _g(a){if(a.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=yg(a.type);if(a.times===void 0){let t=[],n=[];bp(a.keys,t,n,"value"),a.times=t,a.values=n}return e.parse!==void 0?e.parse(a):new e(a.name,a.times,a.values,a.interpolation)}var Yn={enabled:!1,files:{},add:function(a,e){this.enabled!==!1&&(this.files[a]=e)},get:function(a){if(this.enabled!==!1)return this.files[a]},remove:function(a){delete this.files[a]},clear:function(){this.files={}}},Qo=class{constructor(e,t,n){let i=this,s=!1,r=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(d){o++,s===!1&&i.onStart!==void 0&&i.onStart(d,r,o),s=!0},this.itemEnd=function(d){r++,i.onProgress!==void 0&&i.onProgress(d,r,o),r===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(d){i.onError!==void 0&&i.onError(d)},this.resolveURL=function(d){return c?c(d):d},this.setURLModifier=function(d){return c=d,this},this.addHandler=function(d,h){return l.push(d,h),this},this.removeHandler=function(d){let h=l.indexOf(d);return h!==-1&&l.splice(h,2),this},this.getHandler=function(d){for(let h=0,u=l.length;h<u;h+=2){let f=l[h],b=l[h+1];if(f.global&&(f.lastIndex=0),f.test(d))return b}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},gp=new Qo,ni=class{constructor(e){this.manager=e!==void 0?e:gp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ni.DEFAULT_MATERIAL_NAME="__DEFAULT";var bi={},Th=class extends Error{constructor(e,t){super(e),this.response=t}},hs=class extends ni{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=Yn.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(bi[e]!==void 0){bi[e].push({onLoad:t,onProgress:n,onError:i});return}bi[e]=[],bi[e].push({onLoad:t,onProgress:n,onError:i});let r=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(r).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let d=bi[e],h=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=u?parseInt(u):0,b=f!==0,g=0,m=new ReadableStream({start(p){v();function v(){h.read().then(({done:y,value:x})=>{if(y)p.close();else{g+=x.byteLength;let _=new ProgressEvent("progress",{lengthComputable:b,loaded:g,total:f});for(let S=0,E=d.length;S<E;S++){let R=d[S];R.onProgress&&R.onProgress(_)}p.enqueue(x),v()}},y=>{p.error(y)})}}});return new Response(m)}else throw new Th(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(d=>new DOMParser().parseFromString(d,o));case"json":return l.json();default:if(o==="")return l.text();{let h=/charset="?([^;"\s]*)"?/i.exec(o),u=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(u);return l.arrayBuffer().then(b=>f.decode(b))}}}).then(l=>{Yn.add(`file:${e}`,l);let d=bi[e];delete bi[e];for(let h=0,u=d.length;h<u;h++){let f=d[h];f.onLoad&&f.onLoad(l)}}).catch(l=>{let d=bi[e];if(d===void 0)throw this.manager.itemError(e),l;delete bi[e];for(let h=0,u=d.length;h<u;h++){let f=d[h];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Ka=new WeakMap,$o=class extends ni{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,r=Yn.get(`image:${e}`);if(r!==void 0){if(r.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0);else{let h=Ka.get(r);h===void 0&&(h=[],Ka.set(r,h)),h.push({onLoad:t,onError:i})}return r}let o=es("img");function c(){d(),t&&t(this);let h=Ka.get(this)||[];for(let u=0;u<h.length;u++){let f=h[u];f.onLoad&&f.onLoad(this)}Ka.delete(this),s.manager.itemEnd(e)}function l(h){d(),i&&i(h),Yn.remove(`image:${e}`);let u=Ka.get(this)||[];for(let f=0;f<u.length;f++){let b=u[f];b.onError&&b.onError(h)}Ka.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function d(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Yn.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}};var gr=class extends ni{constructor(e){super(e)}load(e,t,n,i){let s=new Ft,r=new $o(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}},ga=class extends mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Me(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},xr=class extends ga{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Me(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},bh=new he,_f=new C,Mf=new C,vr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new be(512,512),this.mapType=jn,this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gi,this._frameExtents=new be(1,1),this._viewportCount=1,this._viewports=[new $e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;_f.setFromMatrixPosition(e.matrixWorld),t.position.copy(_f),Mf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Mf),t.updateMatrixWorld(),bh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bh,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(bh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Rh=class extends vr{constructor(){super(new Tt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=pa*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},xa=class extends ga{constructor(e,t,n=0,i=Math.PI/3,s=0,r=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=r,this.map=null,this.shadow=new Rh}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},wf=new he,Xs=new C,gh=new C,Ch=class extends vr{constructor(){super(new Tt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new be(4,2),this._viewportCount=6,this._viewports=[new $e(2,1,1,1),new $e(0,1,1,1),new $e(3,1,1,1),new $e(1,1,1,1),new $e(3,0,1,1),new $e(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Xs.setFromMatrixPosition(e.matrixWorld),n.position.copy(Xs),gh.copy(n.position),gh.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(gh),n.updateMatrixWorld(),i.makeTranslation(-Xs.x,-Xs.y,-Xs.z),wf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wf,n.coordinateSystem,n.reversedDepth)}},va=class extends ga{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Ch}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},wi=class extends er{constructor(e=-1,t=1,n=1,i=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,r=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,r=s+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ih=class extends vr{constructor(){super(new wi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Si=class extends ga{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.shadow=new Ih}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Ei=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},yr=class extends St{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var xh=new WeakMap,_r=class extends ni{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,r=Yn.get(`image-bitmap:${e}`);if(r!==void 0){if(s.manager.itemStart(e),r.then){r.then(l=>{if(xh.has(r)===!0)i&&i(xh.get(r)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(l),s.manager.itemEnd(e),l});return}return setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0),r}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){return Yn.add(`image-bitmap:${e}`,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){i&&i(l),xh.set(c,l),Yn.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Yn.add(`image-bitmap:${e}`,c),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var ec=class extends Tt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Mr=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};var ed="\\[\\]\\.:\\/",Mg=new RegExp("["+ed+"]","g"),td="[^"+ed+"]",wg="[^"+ed.replace("\\.","")+"]",Sg=/((?:WC+[\/:])*)/.source.replace("WC",td),Eg=/(WCOD+)?/.source.replace("WCOD",wg),Ag=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",td),Tg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",td),Rg=new RegExp("^"+Sg+Eg+Ag+Tg+"$"),Cg=["material","materials","bones","map"],Ph=class{constructor(e,t,n){let i=n||ot.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ot=class a{constructor(e,t,n){this.path=t,this.parsedPath=n||a.parseTrackName(t),this.node=a.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new a.Composite(e,t,n):new a(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Mg,"")}static parseTrackName(e){let t=Rg.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);Cg.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let r=0;r<s.length;r++){let o=s[r];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=a.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===l){l=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let r=e[i];if(r===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else r.fromArray!==void 0&&r.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(c=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ot.Composite=Ph;ot.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ot.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ot.prototype.GetterByBindingType=[ot.prototype._getValue_direct,ot.prototype._getValue_array,ot.prototype._getValue_arrayElement,ot.prototype._getValue_toArray];ot.prototype.SetterByBindingTypeAndVersioning=[[ot.prototype._setValue_direct,ot.prototype._setValue_direct_setNeedsUpdate,ot.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_array,ot.prototype._setValue_array_setNeedsUpdate,ot.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_arrayElement,ot.prototype._setValue_arrayElement_setNeedsUpdate,ot.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_fromArray,ot.prototype._setValue_fromArray_setNeedsUpdate,ot.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var uM=new Float32Array(1);var Sf=new he,wr=class{constructor(e,t,n=0,i=1/0){this.ray=new Zn(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new is,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Sf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Sf),this}intersectObject(e,t=!0,n=[]){return Dh(e,this,n,t),n.sort(Ef),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)Dh(e[i],this,n,t);return n.sort(Ef),n}};function Ef(a,e){return a.distance-e.distance}function Dh(a,e,t,n){let i=!0;if(a.layers.test(e.layers)&&a.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let s=a.children;for(let r=0,o=s.length;r<o;r++)Dh(s[r],e,t,!0)}}var Sr=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Fe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Fe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Af=new C,Do=new C,Ja=new C,Ya=new C,vh=new C,Ig=new C,Pg=new C,on=class{constructor(e=new C,t=new C){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Af.subVectors(e,this.start),Do.subVectors(this.end,this.start);let n=Do.dot(Do),s=Do.dot(Af)/n;return t&&(s=Fe(s,0,1)),s}closestPointToPoint(e,t,n){let i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(e,t=Ig,n=Pg){let i=10000000000000001e-32,s,r,o=this.start,c=e.start,l=this.end,d=e.end;Ja.subVectors(l,o),Ya.subVectors(d,c),vh.subVectors(o,c);let h=Ja.dot(Ja),u=Ya.dot(Ya),f=Ya.dot(vh);if(h<=i&&u<=i)return t.copy(o),n.copy(c),t.sub(n),t.dot(t);if(h<=i)s=0,r=f/u,r=Fe(r,0,1);else{let b=Ja.dot(vh);if(u<=i)r=0,s=Fe(-b/h,0,1);else{let g=Ja.dot(Ya),m=h*u-g*g;m!==0?s=Fe((g*f-b*u)/m,0,1):s=0,r=(g*s+f)/u,r<0?(r=0,s=Fe(-b/h,0,1)):r>1&&(r=1,s=Fe((g-b)/h,0,1))}}return t.copy(o).add(Ja.multiplyScalar(s)),n.copy(c).add(Ya.multiplyScalar(r)),t.sub(n),t.dot(t)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};function nd(a,e,t,n){let i=Dg(n);switch(t){case Gh:return a*e;case bc:return a*e/i.components*i.byteLength;case Tr:return a*e/i.components*i.byteLength;case Wh:return a*e*2/i.components*i.byteLength;case gc:return a*e*2/i.components*i.byteLength;case Hh:return a*e*3/i.components*i.byteLength;case sn:return a*e*4/i.components*i.byteLength;case xc:return a*e*4/i.components*i.byteLength;case Rr:case Cr:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*8;case Ir:case Pr:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case yc:case Mc:return Math.max(a,16)*Math.max(e,8)/4;case vc:case _c:return Math.max(a,8)*Math.max(e,8)/2;case wc:case Sc:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*8;case Ec:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case Ac:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case Tc:return Math.floor((a+4)/5)*Math.floor((e+3)/4)*16;case Rc:return Math.floor((a+4)/5)*Math.floor((e+4)/5)*16;case Cc:return Math.floor((a+5)/6)*Math.floor((e+4)/5)*16;case Ic:return Math.floor((a+5)/6)*Math.floor((e+5)/6)*16;case Pc:return Math.floor((a+7)/8)*Math.floor((e+4)/5)*16;case Dc:return Math.floor((a+7)/8)*Math.floor((e+5)/6)*16;case kc:return Math.floor((a+7)/8)*Math.floor((e+7)/8)*16;case Fc:return Math.floor((a+9)/10)*Math.floor((e+4)/5)*16;case Lc:return Math.floor((a+9)/10)*Math.floor((e+5)/6)*16;case Nc:return Math.floor((a+9)/10)*Math.floor((e+7)/8)*16;case Uc:return Math.floor((a+9)/10)*Math.floor((e+9)/10)*16;case Bc:return Math.floor((a+11)/12)*Math.floor((e+9)/10)*16;case Oc:return Math.floor((a+11)/12)*Math.floor((e+11)/12)*16;case zc:case jc:case Vc:return Math.ceil(a/4)*Math.ceil(e/4)*16;case Gc:case Hc:return Math.ceil(a/4)*Math.ceil(e/4)*8;case Wc:case Xc:return Math.ceil(a/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Dg(a){switch(a){case jn:case Oh:return{byteLength:1,components:1};case us:case zh:case ai:return{byteLength:2,components:1};case pc:case mc:return{byteLength:2,components:4};case Cn:case fc:case fn:return{byteLength:4,components:1};case jh:case Vh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${a}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function jp(){let a=null,e=!1,t=null,n=null;function i(s,r){t(s,r),n=a.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=a.requestAnimationFrame(i),e=!0)},stop:function(){a.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){a=s}}}function kg(a){let e=new WeakMap;function t(o,c){let l=o.array,d=o.usage,h=l.byteLength,u=a.createBuffer();a.bindBuffer(c,u),a.bufferData(c,l,d),o.onUploadCallback();let f;if(l instanceof Float32Array)f=a.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=a.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=a.HALF_FLOAT:f=a.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=a.SHORT;else if(l instanceof Uint32Array)f=a.UNSIGNED_INT;else if(l instanceof Int32Array)f=a.INT;else if(l instanceof Int8Array)f=a.BYTE;else if(l instanceof Uint8Array)f=a.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=a.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){let d=c.array,h=c.updateRanges;if(a.bindBuffer(l,o),h.length===0)a.bufferSubData(l,0,d);else{h.sort((f,b)=>f.start-b.start);let u=0;for(let f=1;f<h.length;f++){let b=h[u],g=h[f];g.start<=b.start+b.count+1?b.count=Math.max(b.count,g.start+g.count-b.start):(++u,h[u]=g)}h.length=u+1;for(let f=0,b=h.length;f<b;f++){let g=h[f];a.bufferSubData(l,g.start*d.BYTES_PER_ELEMENT,d,g.start,g.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(a.deleteBuffer(c.buffer),e.delete(o))}function r(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:s,update:r}}var Fg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Lg=`#ifdef USE_ALPHAHASH
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
#endif`,Ng=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ug=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Og=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zg=`#ifdef USE_AOMAP
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
#endif`,jg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vg=`#ifdef USE_BATCHING
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
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Gg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Hg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Wg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Xg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,qg=`#ifdef USE_IRIDESCENCE
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
#endif`,Kg=`#ifdef USE_BUMPMAP
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
#endif`,Jg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Yg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$g=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ex=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,tx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,nx=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,ix=`#define PI 3.141592653589793
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
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
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
} // validated`,ax=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,sx=`vec3 transformedNormal = objectNormal;
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
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,rx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ox=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hx="gl_FragColor = linearToOutputTexel( gl_FragColor );",dx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ux=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,fx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,px=`#ifdef USE_ENVMAP
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
#endif`,mx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,gx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_x=`#ifdef USE_GRADIENTMAP
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
}`,Mx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Sx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ex=`uniform bool receiveShadow;
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
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
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
#endif`,Ax=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Tx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ix=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Px=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`,Dx=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
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
		vec3 iridescenceF0;
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
		float v = 0.5 / ( gv + gl );
		return saturate(v);
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
		float roughness = material.clearcoatRoughness;
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
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
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
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,kx=`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
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
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Fx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Lx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Nx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ux=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ox=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,zx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Gx=`#if defined( USE_POINTS_UV )
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
#endif`,Hx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Wx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Xx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Kx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jx=`#ifdef USE_MORPHTARGETS
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
#endif`,Yx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Qx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,$x=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ev=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,nv=`#ifdef USE_NORMALMAP
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
#endif`,iv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,av=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,sv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,rv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ov=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,lv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,uv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
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
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
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
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
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
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,bv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
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
#endif`,gv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
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
#endif`,xv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
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
	#if NUM_POINT_LIGHT_SHADOWS > 0
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
}`,vv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yv=`#ifdef USE_SKINNING
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
#endif`,_v=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Mv=`#ifdef USE_SKINNING
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
#endif`,wv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Sv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ev=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Av=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Tv=`#ifdef USE_TRANSMISSION
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
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Rv=`#ifdef USE_TRANSMISSION
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
#endif`,Cv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Iv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,kv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Fv=`uniform sampler2D t2D;
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
}`,Lv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Nv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Uv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ov=`#include <common>
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
}`,zv=`#if DEPTH_PACKING == 3200
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
}`,jv=`#define DISTANCE
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
}`,Vv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Gv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Hv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wv=`uniform float scale;
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
}`,Xv=`uniform vec3 diffuse;
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
}`,qv=`#include <common>
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
}`,Kv=`uniform vec3 diffuse;
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
}`,Jv=`#define LAMBERT
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
}`,Yv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
}`,Zv=`#define MATCAP
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
}`,Qv=`#define MATCAP
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
}`,$v=`#define NORMAL
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
}`,ey=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
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
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ty=`#define PHONG
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
}`,ny=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
}`,iy=`#define STANDARD
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
}`,ay=`#define STANDARD
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
#ifdef USE_DISPERSION
	uniform float dispersion;
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
#include <packing>
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
#include <cube_uv_reflection_fragment>
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`,sy=`#define TOON
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
}`,ry=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
}`,oy=`uniform float size;
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
}`,cy=`uniform vec3 diffuse;
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
}`,ly=`#include <common>
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
}`,hy=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`,dy=`uniform float rotation;
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
}`,uy=`uniform vec3 diffuse;
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
}`,ze={alphahash_fragment:Fg,alphahash_pars_fragment:Lg,alphamap_fragment:Ng,alphamap_pars_fragment:Ug,alphatest_fragment:Bg,alphatest_pars_fragment:Og,aomap_fragment:zg,aomap_pars_fragment:jg,batching_pars_vertex:Vg,batching_vertex:Gg,begin_vertex:Hg,beginnormal_vertex:Wg,bsdfs:Xg,iridescence_fragment:qg,bumpmap_pars_fragment:Kg,clipping_planes_fragment:Jg,clipping_planes_pars_fragment:Yg,clipping_planes_pars_vertex:Zg,clipping_planes_vertex:Qg,color_fragment:$g,color_pars_fragment:ex,color_pars_vertex:tx,color_vertex:nx,common:ix,cube_uv_reflection_fragment:ax,defaultnormal_vertex:sx,displacementmap_pars_vertex:rx,displacementmap_vertex:ox,emissivemap_fragment:cx,emissivemap_pars_fragment:lx,colorspace_fragment:hx,colorspace_pars_fragment:dx,envmap_fragment:ux,envmap_common_pars_fragment:fx,envmap_pars_fragment:px,envmap_pars_vertex:mx,envmap_physical_pars_fragment:Ax,envmap_vertex:bx,fog_vertex:gx,fog_pars_vertex:xx,fog_fragment:vx,fog_pars_fragment:yx,gradientmap_pars_fragment:_x,lightmap_pars_fragment:Mx,lights_lambert_fragment:wx,lights_lambert_pars_fragment:Sx,lights_pars_begin:Ex,lights_toon_fragment:Tx,lights_toon_pars_fragment:Rx,lights_phong_fragment:Cx,lights_phong_pars_fragment:Ix,lights_physical_fragment:Px,lights_physical_pars_fragment:Dx,lights_fragment_begin:kx,lights_fragment_maps:Fx,lights_fragment_end:Lx,logdepthbuf_fragment:Nx,logdepthbuf_pars_fragment:Ux,logdepthbuf_pars_vertex:Bx,logdepthbuf_vertex:Ox,map_fragment:zx,map_pars_fragment:jx,map_particle_fragment:Vx,map_particle_pars_fragment:Gx,metalnessmap_fragment:Hx,metalnessmap_pars_fragment:Wx,morphinstance_vertex:Xx,morphcolor_vertex:qx,morphnormal_vertex:Kx,morphtarget_pars_vertex:Jx,morphtarget_vertex:Yx,normal_fragment_begin:Zx,normal_fragment_maps:Qx,normal_pars_fragment:$x,normal_pars_vertex:ev,normal_vertex:tv,normalmap_pars_fragment:nv,clearcoat_normal_fragment_begin:iv,clearcoat_normal_fragment_maps:av,clearcoat_pars_fragment:sv,iridescence_pars_fragment:rv,opaque_fragment:ov,packing:cv,premultiplied_alpha_fragment:lv,project_vertex:hv,dithering_fragment:dv,dithering_pars_fragment:uv,roughnessmap_fragment:fv,roughnessmap_pars_fragment:pv,shadowmap_pars_fragment:mv,shadowmap_pars_vertex:bv,shadowmap_vertex:gv,shadowmask_pars_fragment:xv,skinbase_vertex:vv,skinning_pars_vertex:yv,skinning_vertex:_v,skinnormal_vertex:Mv,specularmap_fragment:wv,specularmap_pars_fragment:Sv,tonemapping_fragment:Ev,tonemapping_pars_fragment:Av,transmission_fragment:Tv,transmission_pars_fragment:Rv,uv_pars_fragment:Cv,uv_pars_vertex:Iv,uv_vertex:Pv,worldpos_vertex:Dv,background_vert:kv,background_frag:Fv,backgroundCube_vert:Lv,backgroundCube_frag:Nv,cube_vert:Uv,cube_frag:Bv,depth_vert:Ov,depth_frag:zv,distanceRGBA_vert:jv,distanceRGBA_frag:Vv,equirect_vert:Gv,equirect_frag:Hv,linedashed_vert:Wv,linedashed_frag:Xv,meshbasic_vert:qv,meshbasic_frag:Kv,meshlambert_vert:Jv,meshlambert_frag:Yv,meshmatcap_vert:Zv,meshmatcap_frag:Qv,meshnormal_vert:$v,meshnormal_frag:ey,meshphong_vert:ty,meshphong_frag:ny,meshphysical_vert:iy,meshphysical_frag:ay,meshtoon_vert:sy,meshtoon_frag:ry,points_vert:oy,points_frag:cy,shadow_vert:ly,shadow_frag:hy,sprite_vert:dy,sprite_frag:uy},se={common:{diffuse:{value:new Me(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Me(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Me(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new Me(16777215)},opacity:{value:1},center:{value:new be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},si={basic:{uniforms:Zt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:Zt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Me(0)}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:Zt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Me(0)},specular:{value:new Me(1118481)},shininess:{value:30}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:Zt([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new Me(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:Zt([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new Me(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:Zt([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:Zt([se.points,se.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:Zt([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:Zt([se.common,se.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:Zt([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:Zt([se.sprite,se.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distanceRGBA:{uniforms:Zt([se.common,se.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distanceRGBA_vert,fragmentShader:ze.distanceRGBA_frag},shadow:{uniforms:Zt([se.lights,se.fog,{color:{value:new Me(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};si.physical={uniforms:Zt([si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new Me(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new Me(0)},specularColor:{value:new Me(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};var Kc={r:0,b:0,g:0},Sa=new mn,fy=new he;function py(a,e,t,n,i,s,r){let o=new Me(0),c=s===!0?0:1,l,d,h=null,u=0,f=null;function b(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?t:e).get(x)),x}function g(y){let x=!1,_=b(y);_===null?p(o,c):_&&_.isColor&&(p(_,1),x=!0);let S=a.xr.getEnvironmentBlendMode();S==="additive"?n.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(a.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil))}function m(y,x){let _=b(x);_&&(_.isCubeTexture||_.mapping===Ar)?(d===void 0&&(d=new tt(new Vi(1,1,1),new Lt({name:"BackgroundCubeMaterial",uniforms:wa(si.backgroundCube.uniforms),vertexShader:si.backgroundCube.vertexShader,fragmentShader:si.backgroundCube.fragmentShader,side:Vt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(S,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(d)),Sa.copy(x.backgroundRotation),Sa.x*=-1,Sa.y*=-1,Sa.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Sa.y*=-1,Sa.z*=-1),d.material.uniforms.envMap.value=_,d.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(fy.makeRotationFromEuler(Sa)),d.material.toneMapped=Ge.getTransfer(_.colorSpace)!==it,(h!==_||u!==_.version||f!==a.toneMapping)&&(d.material.needsUpdate=!0,h=_,u=_.version,f=a.toneMapping),d.layers.enableAll(),y.unshift(d,d.geometry,d.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new tt(new pr(2,2),new Lt({name:"BackgroundMaterial",uniforms:wa(si.background.uniforms),vertexShader:si.background.vertexShader,fragmentShader:si.background.fragmentShader,side:Yt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=Ge.getTransfer(_.colorSpace)!==it,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||u!==_.version||f!==a.toneMapping)&&(l.material.needsUpdate=!0,h=_,u=_.version,f=a.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,x){y.getRGB(Kc,Qh(a)),n.buffers.color.setClear(Kc.r,Kc.g,Kc.b,x,r)}function v(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,x=1){o.set(y),c=x,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(o,c)},render:g,addToRenderList:m,dispose:v}}function my(a,e){let t=a.getParameter(a.MAX_VERTEX_ATTRIBS),n={},i=u(null),s=i,r=!1;function o(w,I,P,F,N){let O=!1,j=h(F,P,I);s!==j&&(s=j,l(s.object)),O=f(w,F,P,N),O&&b(w,F,P,N),N!==null&&e.update(N,a.ELEMENT_ARRAY_BUFFER),(O||r)&&(r=!1,x(w,I,P,F),N!==null&&a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function c(){return a.createVertexArray()}function l(w){return a.bindVertexArray(w)}function d(w){return a.deleteVertexArray(w)}function h(w,I,P){let F=P.wireframe===!0,N=n[w.id];N===void 0&&(N={},n[w.id]=N);let O=N[I.id];O===void 0&&(O={},N[I.id]=O);let j=O[F];return j===void 0&&(j=u(c()),O[F]=j),j}function u(w){let I=[],P=[],F=[];for(let N=0;N<t;N++)I[N]=0,P[N]=0,F[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:P,attributeDivisors:F,object:w,attributes:{},index:null}}function f(w,I,P,F){let N=s.attributes,O=I.attributes,j=0,J=P.getAttributes();for(let H in J)if(J[H].location>=0){let ce=N[H],xe=O[H];if(xe===void 0&&(H==="instanceMatrix"&&w.instanceMatrix&&(xe=w.instanceMatrix),H==="instanceColor"&&w.instanceColor&&(xe=w.instanceColor)),ce===void 0||ce.attribute!==xe||xe&&ce.data!==xe.data)return!0;j++}return s.attributesNum!==j||s.index!==F}function b(w,I,P,F){let N={},O=I.attributes,j=0,J=P.getAttributes();for(let H in J)if(J[H].location>=0){let ce=O[H];ce===void 0&&(H==="instanceMatrix"&&w.instanceMatrix&&(ce=w.instanceMatrix),H==="instanceColor"&&w.instanceColor&&(ce=w.instanceColor));let xe={};xe.attribute=ce,ce&&ce.data&&(xe.data=ce.data),N[H]=xe,j++}s.attributes=N,s.attributesNum=j,s.index=F}function g(){let w=s.newAttributes;for(let I=0,P=w.length;I<P;I++)w[I]=0}function m(w){p(w,0)}function p(w,I){let P=s.newAttributes,F=s.enabledAttributes,N=s.attributeDivisors;P[w]=1,F[w]===0&&(a.enableVertexAttribArray(w),F[w]=1),N[w]!==I&&(a.vertexAttribDivisor(w,I),N[w]=I)}function v(){let w=s.newAttributes,I=s.enabledAttributes;for(let P=0,F=I.length;P<F;P++)I[P]!==w[P]&&(a.disableVertexAttribArray(P),I[P]=0)}function y(w,I,P,F,N,O,j){j===!0?a.vertexAttribIPointer(w,I,P,N,O):a.vertexAttribPointer(w,I,P,F,N,O)}function x(w,I,P,F){g();let N=F.attributes,O=P.getAttributes(),j=I.defaultAttributeValues;for(let J in O){let H=O[J];if(H.location>=0){let Q=N[J];if(Q===void 0&&(J==="instanceMatrix"&&w.instanceMatrix&&(Q=w.instanceMatrix),J==="instanceColor"&&w.instanceColor&&(Q=w.instanceColor)),Q!==void 0){let ce=Q.normalized,xe=Q.itemSize,Ue=e.get(Q);if(Ue===void 0)continue;let at=Ue.buffer,ht=Ue.type,Ze=Ue.bytesPerElement,q=ht===a.INT||ht===a.UNSIGNED_INT||Q.gpuType===fc;if(Q.isInterleavedBufferAttribute){let Z=Q.data,pe=Z.stride,Le=Q.offset;if(Z.isInstancedInterleavedBuffer){for(let Ae=0;Ae<H.locationSize;Ae++)p(H.location+Ae,Z.meshPerAttribute);w.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let Ae=0;Ae<H.locationSize;Ae++)m(H.location+Ae);a.bindBuffer(a.ARRAY_BUFFER,at);for(let Ae=0;Ae<H.locationSize;Ae++)y(H.location+Ae,xe/H.locationSize,ht,ce,pe*Ze,(Le+xe/H.locationSize*Ae)*Ze,q)}else{if(Q.isInstancedBufferAttribute){for(let Z=0;Z<H.locationSize;Z++)p(H.location+Z,Q.meshPerAttribute);w.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let Z=0;Z<H.locationSize;Z++)m(H.location+Z);a.bindBuffer(a.ARRAY_BUFFER,at);for(let Z=0;Z<H.locationSize;Z++)y(H.location+Z,xe/H.locationSize,ht,ce,xe*Ze,xe/H.locationSize*Z*Ze,q)}}else if(j!==void 0){let ce=j[J];if(ce!==void 0)switch(ce.length){case 2:a.vertexAttrib2fv(H.location,ce);break;case 3:a.vertexAttrib3fv(H.location,ce);break;case 4:a.vertexAttrib4fv(H.location,ce);break;default:a.vertexAttrib1fv(H.location,ce)}}}}v()}function _(){R();for(let w in n){let I=n[w];for(let P in I){let F=I[P];for(let N in F)d(F[N].object),delete F[N];delete I[P]}delete n[w]}}function S(w){if(n[w.id]===void 0)return;let I=n[w.id];for(let P in I){let F=I[P];for(let N in F)d(F[N].object),delete F[N];delete I[P]}delete n[w.id]}function E(w){for(let I in n){let P=n[I];if(P[w.id]===void 0)continue;let F=P[w.id];for(let N in F)d(F[N].object),delete F[N];delete P[w.id]}}function R(){M(),r=!0,s!==i&&(s=i,l(s.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:R,resetDefaultState:M,dispose:_,releaseStatesOfGeometry:S,releaseStatesOfProgram:E,initAttributes:g,enableAttribute:m,disableUnusedAttributes:v}}function by(a,e,t){let n;function i(l){n=l}function s(l,d){a.drawArrays(n,l,d),t.update(d,n,1)}function r(l,d,h){h!==0&&(a.drawArraysInstanced(n,l,d,h),t.update(d,n,h))}function o(l,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,d,0,h);let f=0;for(let b=0;b<h;b++)f+=d[b];t.update(f,n,1)}function c(l,d,h,u){if(h===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let b=0;b<l.length;b++)r(l[b],d[b],u[b]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,d,0,u,0,h);let b=0;for(let g=0;g<h;g++)b+=d[g]*u[g];t.update(b,n,1)}}this.setMode=i,this.render=s,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function gy(a,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let E=e.get("EXT_texture_filter_anisotropic");i=a.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(E){return!(E!==sn&&n.convert(E)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){let R=E===ai&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==jn&&n.convert(E)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==fn&&!R)}function c(E){if(E==="highp"){if(a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.HIGH_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.MEDIUM_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",d=c(l);d!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);let h=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS),b=a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=a.getParameter(a.MAX_TEXTURE_SIZE),m=a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE),p=a.getParameter(a.MAX_VERTEX_ATTRIBS),v=a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS),y=a.getParameter(a.MAX_VARYING_VECTORS),x=a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS),_=b>0,S=a.getParameter(a.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:r,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:b,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:_,maxSamples:S}}function xy(a){let e=this,t=null,n=0,i=!1,s=!1,r=new dn,o=new Oe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let f=h.length!==0||u||n!==0||i;return i=u,n=h.length,f},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,f){let b=h.clippingPlanes,g=h.clipIntersection,m=h.clipShadows,p=a.get(h);if(!i||b===null||b.length===0||s&&!m)s?d(null):l();else{let v=s?0:n,y=v*4,x=p.clippingState||null;c.value=x,x=d(b,u,y,f);for(let _=0;_!==y;++_)x[_]=t[_];p.clippingState=x,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(h,u,f,b){let g=h!==null?h.length:0,m=null;if(g!==0){if(m=c.value,b!==!0||m===null){let p=f+g*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,x=f;y!==g;++y,x+=4)r.copy(h[y]).applyMatrix4(v,o),r.normal.toArray(m,x),m[x+3]=r.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function vy(a){let e=new WeakMap;function t(r,o){return o===hc?r.mapping=ya:o===dc&&(r.mapping=_a),r}function n(r){if(r&&r.isTexture){let o=r.mapping;if(o===hc||o===dc)if(e.has(r)){let c=e.get(r).texture;return t(c,r.mapping)}else{let c=r.image;if(c&&c.height>0){let l=new jo(c.height);return l.fromEquirectangularTexture(a,r),e.set(r,l),r.addEventListener("dispose",i),t(l.texture,r.mapping)}else return null}}return r}function i(r){let o=r.target;o.removeEventListener("dispose",i);let c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}var gs=4,xp=[.125,.215,.35,.446,.526,.582],Ta=20,id=new wi,vp=new Me,ad=null,sd=0,rd=0,od=!1,Aa=(1+Math.sqrt(5))/2,bs=1/Aa,yp=[new C(-Aa,bs,0),new C(Aa,bs,0),new C(-bs,0,Aa),new C(bs,0,Aa),new C(0,Aa,-bs),new C(0,Aa,bs),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)],yy=new C,Zc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){let{size:r=256,position:o=yy}=s;ad=this._renderer.getRenderTarget(),sd=this._renderer.getActiveCubeFace(),rd=this._renderer.getActiveMipmapLevel(),od=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Mp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ad,sd,rd),this._renderer.xr.enabled=od,e.scissorTest=!1,Jc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ya||e.mapping===_a?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ad=this._renderer.getRenderTarget(),sd=this._renderer.getActiveCubeFace(),rd=this._renderer.getActiveMipmapLevel(),od=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:an,minFilter:an,generateMipmaps:!1,type:ai,format:sn,colorSpace:jt,depthBuffer:!1},i=_p(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_p(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=_y(s)),this._blurMaterial=My(s,e,t)}return i}_compileMaterial(e){let t=new tt(this._lodPlanes[0],e);this._renderer.compile(t,id)}_sceneToCubeUV(e,t,n,i,s){let c=new Tt(90,1,t,n),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(vp),h.toneMapping=Ai,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(i),h.clearDepth(),h.setRenderTarget(null));let g=new Bn({name:"PMREM.Background",side:Vt,depthWrite:!1,depthTest:!1}),m=new tt(new Vi,g),p=!1,v=e.background;v?v.isColor&&(g.color.copy(v),e.background=null,p=!0):(g.color.copy(vp),p=!0);for(let y=0;y<6;y++){let x=y%3;x===0?(c.up.set(0,l[y],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+d[y],s.y,s.z)):x===1?(c.up.set(0,0,l[y]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+d[y],s.z)):(c.up.set(0,l[y],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+d[y]));let _=this._cubeSize;Jc(i,x*_,y>2?_:0,_,_),h.setRenderTarget(i),p&&h.render(m,c),h.render(e,c)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=v}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===ya||e.mapping===_a;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=wp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Mp());let s=i?this._cubemapMaterial:this._equirectMaterial,r=new tt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;let c=this._cubeSize;Jc(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(r,id)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=yp[(i-s-1)%yp.length];this._blur(e,s-1,s,r,o)}t.autoClear=n}_blur(e,t,n,i,s){let r=this._pingPongRenderTarget;this._halfBlur(e,r,t,n,i,"latitudinal",s),this._halfBlur(r,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,r,o){let c=this._renderer,l=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let d=3,h=new tt(this._lodPlanes[i],l),u=l.uniforms,f=this._sizeLods[n]-1,b=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Ta-1),g=s/b,m=isFinite(s)?1+Math.floor(d*g):Ta;m>Ta&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ta}`);let p=[],v=0;for(let E=0;E<Ta;++E){let R=E/g,M=Math.exp(-R*R/2);p.push(M),E===0?v+=M:E<m&&(v+=2*M)}for(let E=0;E<p.length;E++)p[E]=p[E]/v;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:y}=this;u.dTheta.value=b,u.mipInt.value=y-n;let x=this._sizeLods[i],_=3*x*(i>y-gs?i-y+gs:0),S=4*(this._cubeSize-x);Jc(t,_,S,3*x,2*x),c.setRenderTarget(t),c.render(h,id)}};function _y(a){let e=[],t=[],n=[],i=a,s=a-gs+1+xp.length;for(let r=0;r<s;r++){let o=Math.pow(2,i);t.push(o);let c=1/o;r>a-gs?c=xp[r-a+gs-1]:r===0&&(c=0),n.push(c);let l=1/(o-2),d=-l,h=1+l,u=[d,d,h,d,h,h,d,d,h,h,d,h],f=6,b=6,g=3,m=2,p=1,v=new Float32Array(g*b*f),y=new Float32Array(m*b*f),x=new Float32Array(p*b*f);for(let S=0;S<f;S++){let E=S%3*2/3-1,R=S>2?0:-1,M=[E,R,0,E+2/3,R,0,E+2/3,R+1,0,E,R,0,E+2/3,R+1,0,E,R+1,0];v.set(M,g*b*S),y.set(u,m*b*S);let w=[S,S,S,S,S,S];x.set(w,p*b*S)}let _=new St;_.setAttribute("position",new Ke(v,g)),_.setAttribute("uv",new Ke(y,m)),_.setAttribute("faceIndex",new Ke(x,p)),e.push(_),i>gs&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function _p(a,e,t){let n=new pn(a,e,t);return n.texture.mapping=Ar,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Jc(a,e,t,n,i){a.viewport.set(e,t,n,i),a.scissor.set(e,t,n,i)}function My(a,e,t){let n=new Float32Array(Ta),i=new C(0,1,0);return new Lt({name:"SphericalGaussianBlur",defines:{n:Ta,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:gd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function Mp(){return new Lt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:gd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function wp(){return new Lt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:gd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function gd(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function wy(a){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let c=o.mapping,l=c===hc||c===dc,d=c===ya||c===_a;if(l||d){let h=e.get(o),u=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return t===null&&(t=new Zc(a)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{let f=o.image;return l&&f&&f.height>0||d&&f&&i(f)?(t===null&&(t=new Zc(a)),h=l?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",s),h.texture):null}}}return o}function i(o){let c=0,l=6;for(let d=0;d<l;d++)o[d]!==void 0&&c++;return c===l}function s(o){let c=o.target;c.removeEventListener("dispose",s);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:r}}function Sy(a){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=a.getExtension("WEBGL_depth_texture")||a.getExtension("MOZ_WEBGL_depth_texture")||a.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=a.getExtension("EXT_texture_filter_anisotropic")||a.getExtension("MOZ_EXT_texture_filter_anisotropic")||a.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=a.getExtension("WEBGL_compressed_texture_s3tc")||a.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=a.getExtension("WEBGL_compressed_texture_pvrtc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=a.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&ts("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Ey(a,e,t,n){let i={},s=new WeakMap;function r(h){let u=h.target;u.index!==null&&e.remove(u.index);for(let b in u.attributes)e.remove(u.attributes[b]);u.removeEventListener("dispose",r),delete i[u.id];let f=s.get(u);f&&(e.remove(f),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(h,u){return i[u.id]===!0||(u.addEventListener("dispose",r),i[u.id]=!0,t.memory.geometries++),u}function c(h){let u=h.attributes;for(let f in u)e.update(u[f],a.ARRAY_BUFFER)}function l(h){let u=[],f=h.index,b=h.attributes.position,g=0;if(f!==null){let v=f.array;g=f.version;for(let y=0,x=v.length;y<x;y+=3){let _=v[y+0],S=v[y+1],E=v[y+2];u.push(_,S,S,E,E,_)}}else if(b!==void 0){let v=b.array;g=b.version;for(let y=0,x=v.length/3-1;y<x;y+=3){let _=y+0,S=y+1,E=y+2;u.push(_,S,S,E,E,_)}}else return;let m=new(Zh(u)?$s:Qs)(u,1);m.version=g;let p=s.get(h);p&&e.remove(p),s.set(h,m)}function d(h){let u=s.get(h);if(u){let f=h.index;f!==null&&u.version<f.version&&l(h)}else l(h);return s.get(h)}return{get:o,update:c,getWireframeAttribute:d}}function Ay(a,e,t){let n;function i(u){n=u}let s,r;function o(u){s=u.type,r=u.bytesPerElement}function c(u,f){a.drawElements(n,f,s,u*r),t.update(f,n,1)}function l(u,f,b){b!==0&&(a.drawElementsInstanced(n,f,s,u*r,b),t.update(f,n,b))}function d(u,f,b){if(b===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,u,0,b);let m=0;for(let p=0;p<b;p++)m+=f[p];t.update(m,n,1)}function h(u,f,b,g){if(b===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)l(u[p]/r,f[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,s,u,0,g,0,b);let p=0;for(let v=0;v<b;v++)p+=f[v]*g[v];t.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function Ty(a){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,r,o){switch(t.calls++,r){case a.TRIANGLES:t.triangles+=o*(s/3);break;case a.LINES:t.lines+=o*(s/2);break;case a.LINE_STRIP:t.lines+=o*(s-1);break;case a.LINE_LOOP:t.lines+=o*s;break;case a.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Ry(a,e,t){let n=new WeakMap,i=new $e;function s(r,o,c){let l=r.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0,u=n.get(o);if(u===void 0||u.count!==h){let M=function(){E.dispose(),n.delete(o),o.removeEventListener("dispose",M)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,b=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],y=0;f===!0&&(y=1),b===!0&&(y=2),g===!0&&(y=3);let x=o.attributes.position.count*y,_=1;x>e.maxTextureSize&&(_=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let S=new Float32Array(x*_*4*h),E=new Zs(S,x,_,h);E.type=fn,E.needsUpdate=!0;let R=y*4;for(let w=0;w<h;w++){let I=m[w],P=p[w],F=v[w],N=x*_*4*w;for(let O=0;O<I.count;O++){let j=O*R;f===!0&&(i.fromBufferAttribute(I,O),S[N+j+0]=i.x,S[N+j+1]=i.y,S[N+j+2]=i.z,S[N+j+3]=0),b===!0&&(i.fromBufferAttribute(P,O),S[N+j+4]=i.x,S[N+j+5]=i.y,S[N+j+6]=i.z,S[N+j+7]=0),g===!0&&(i.fromBufferAttribute(F,O),S[N+j+8]=i.x,S[N+j+9]=i.y,S[N+j+10]=i.z,S[N+j+11]=F.itemSize===4?i.w:1)}}u={count:h,texture:E,size:new be(x,_)},n.set(o,u),o.addEventListener("dispose",M)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)c.getUniforms().setValue(a,"morphTexture",r.morphTexture,t);else{let f=0;for(let g=0;g<l.length;g++)f+=l[g];let b=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(a,"morphTargetBaseInfluence",b),c.getUniforms().setValue(a,"morphTargetInfluences",l)}c.getUniforms().setValue(a,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(a,"morphTargetsTextureSize",u.size)}return{update:s}}function Cy(a,e,t,n){let i=new WeakMap;function s(c){let l=n.render.frame,d=c.geometry,h=e.get(c,d);if(i.get(h)!==l&&(e.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(t.update(c.instanceMatrix,a.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,a.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let u=c.skeleton;i.get(u)!==l&&(u.update(),i.set(u,l))}return h}function r(){i=new WeakMap}function o(c){let l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:r}}var Vp=new Ft,Sp=new Hi(1,1),Gp=new Zs,Hp=new Oo,Wp=new tr,Ep=[],Ap=[],Tp=new Float32Array(16),Rp=new Float32Array(9),Cp=new Float32Array(4);function vs(a,e,t){let n=a[0];if(n<=0||n>0)return a;let i=e*t,s=Ep[i];if(s===void 0&&(s=new Float32Array(i),Ep[i]=s),e!==0){n.toArray(s,0);for(let r=1,o=0;r!==e;++r)o+=t,a[r].toArray(s,o)}return s}function It(a,e){if(a.length!==e.length)return!1;for(let t=0,n=a.length;t<n;t++)if(a[t]!==e[t])return!1;return!0}function Pt(a,e){for(let t=0,n=e.length;t<n;t++)a[t]=e[t]}function $c(a,e){let t=Ap[e];t===void 0&&(t=new Int32Array(e),Ap[e]=t);for(let n=0;n!==e;++n)t[n]=a.allocateTextureUnit();return t}function Iy(a,e){let t=this.cache;t[0]!==e&&(a.uniform1f(this.addr,e),t[0]=e)}function Py(a,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(a.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;a.uniform2fv(this.addr,e),Pt(t,e)}}function Dy(a,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(a.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(a.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(It(t,e))return;a.uniform3fv(this.addr,e),Pt(t,e)}}function ky(a,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(a.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;a.uniform4fv(this.addr,e),Pt(t,e)}}function Fy(a,e){let t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;a.uniformMatrix2fv(this.addr,!1,e),Pt(t,e)}else{if(It(t,n))return;Cp.set(n),a.uniformMatrix2fv(this.addr,!1,Cp),Pt(t,n)}}function Ly(a,e){let t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;a.uniformMatrix3fv(this.addr,!1,e),Pt(t,e)}else{if(It(t,n))return;Rp.set(n),a.uniformMatrix3fv(this.addr,!1,Rp),Pt(t,n)}}function Ny(a,e){let t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;a.uniformMatrix4fv(this.addr,!1,e),Pt(t,e)}else{if(It(t,n))return;Tp.set(n),a.uniformMatrix4fv(this.addr,!1,Tp),Pt(t,n)}}function Uy(a,e){let t=this.cache;t[0]!==e&&(a.uniform1i(this.addr,e),t[0]=e)}function By(a,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(a.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;a.uniform2iv(this.addr,e),Pt(t,e)}}function Oy(a,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(a.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;a.uniform3iv(this.addr,e),Pt(t,e)}}function zy(a,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(a.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;a.uniform4iv(this.addr,e),Pt(t,e)}}function jy(a,e){let t=this.cache;t[0]!==e&&(a.uniform1ui(this.addr,e),t[0]=e)}function Vy(a,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(a.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;a.uniform2uiv(this.addr,e),Pt(t,e)}}function Gy(a,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(a.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;a.uniform3uiv(this.addr,e),Pt(t,e)}}function Hy(a,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(a.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;a.uniform4uiv(this.addr,e),Pt(t,e)}}function Wy(a,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(a.uniform1i(this.addr,i),n[0]=i);let s;this.type===a.SAMPLER_2D_SHADOW?(Sp.compareFunction=Kh,s=Sp):s=Vp,t.setTexture2D(e||s,i)}function Xy(a,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(a.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Hp,i)}function qy(a,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(a.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Wp,i)}function Ky(a,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(a.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Gp,i)}function Jy(a){switch(a){case 5126:return Iy;case 35664:return Py;case 35665:return Dy;case 35666:return ky;case 35674:return Fy;case 35675:return Ly;case 35676:return Ny;case 5124:case 35670:return Uy;case 35667:case 35671:return By;case 35668:case 35672:return Oy;case 35669:case 35673:return zy;case 5125:return jy;case 36294:return Vy;case 36295:return Gy;case 36296:return Hy;case 35678:case 36198:case 36298:case 36306:case 35682:return Wy;case 35679:case 36299:case 36307:return Xy;case 35680:case 36300:case 36308:case 36293:return qy;case 36289:case 36303:case 36311:case 36292:return Ky}}function Yy(a,e){a.uniform1fv(this.addr,e)}function Zy(a,e){let t=vs(e,this.size,2);a.uniform2fv(this.addr,t)}function Qy(a,e){let t=vs(e,this.size,3);a.uniform3fv(this.addr,t)}function $y(a,e){let t=vs(e,this.size,4);a.uniform4fv(this.addr,t)}function e0(a,e){let t=vs(e,this.size,4);a.uniformMatrix2fv(this.addr,!1,t)}function t0(a,e){let t=vs(e,this.size,9);a.uniformMatrix3fv(this.addr,!1,t)}function n0(a,e){let t=vs(e,this.size,16);a.uniformMatrix4fv(this.addr,!1,t)}function i0(a,e){a.uniform1iv(this.addr,e)}function a0(a,e){a.uniform2iv(this.addr,e)}function s0(a,e){a.uniform3iv(this.addr,e)}function r0(a,e){a.uniform4iv(this.addr,e)}function o0(a,e){a.uniform1uiv(this.addr,e)}function c0(a,e){a.uniform2uiv(this.addr,e)}function l0(a,e){a.uniform3uiv(this.addr,e)}function h0(a,e){a.uniform4uiv(this.addr,e)}function d0(a,e,t){let n=this.cache,i=e.length,s=$c(t,i);It(n,s)||(a.uniform1iv(this.addr,s),Pt(n,s));for(let r=0;r!==i;++r)t.setTexture2D(e[r]||Vp,s[r])}function u0(a,e,t){let n=this.cache,i=e.length,s=$c(t,i);It(n,s)||(a.uniform1iv(this.addr,s),Pt(n,s));for(let r=0;r!==i;++r)t.setTexture3D(e[r]||Hp,s[r])}function f0(a,e,t){let n=this.cache,i=e.length,s=$c(t,i);It(n,s)||(a.uniform1iv(this.addr,s),Pt(n,s));for(let r=0;r!==i;++r)t.setTextureCube(e[r]||Wp,s[r])}function p0(a,e,t){let n=this.cache,i=e.length,s=$c(t,i);It(n,s)||(a.uniform1iv(this.addr,s),Pt(n,s));for(let r=0;r!==i;++r)t.setTexture2DArray(e[r]||Gp,s[r])}function m0(a){switch(a){case 5126:return Yy;case 35664:return Zy;case 35665:return Qy;case 35666:return $y;case 35674:return e0;case 35675:return t0;case 35676:return n0;case 5124:case 35670:return i0;case 35667:case 35671:return a0;case 35668:case 35672:return s0;case 35669:case 35673:return r0;case 5125:return o0;case 36294:return c0;case 36295:return l0;case 36296:return h0;case 35678:case 36198:case 36298:case 36306:case 35682:return d0;case 35679:case 36299:case 36307:return u0;case 35680:case 36300:case 36308:case 36293:return f0;case 36289:case 36303:case 36311:case 36292:return p0}}var ld=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Jy(t.type)}},hd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=m0(t.type)}},dd=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,r=i.length;s!==r;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},cd=/(\w+)(\])?(\[|\.)?/g;function Ip(a,e){a.seq.push(e),a.map[e.id]=e}function b0(a,e,t){let n=a.name,i=n.length;for(cd.lastIndex=0;;){let s=cd.exec(n),r=cd.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&r+2===i){Ip(t,l===void 0?new ld(o,a,e):new hd(o,a,e));break}else{let h=t.map[o];h===void 0&&(h=new dd(o),Ip(t,h)),t=h}}}var xs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i),r=e.getUniformLocation(t,s.name);b0(s,r,this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,r=t.length;s!==r;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let r=e[i];r.id in t&&n.push(r)}return n}};function Pp(a,e,t){let n=a.createShader(e);return a.shaderSource(n,t),a.compileShader(n),n}var g0=37297,x0=0;function v0(a,e){let t=a.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let r=i;r<s;r++){let o=r+1;n.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return n.join(`
`)}var Dp=new Oe;function y0(a){Ge._getMatrix(Dp,Ge.workingColorSpace,a);let e=`mat3( ${Dp.elements.map(t=>t.toFixed(4))} )`;switch(Ge.getTransfer(a)){case Js:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",a),[e,"LinearTransferOETF"]}}function kp(a,e,t){let n=a.getShaderParameter(e,a.COMPILE_STATUS),s=(a.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+v0(a.getShaderSource(e),o)}else return s}function _0(a,e){let t=y0(e);return[`vec4 ${a}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function M0(a,e){let t;switch(e){case Jf:t="Linear";break;case Yf:t="Reinhard";break;case Zf:t="Cineon";break;case lc:t="ACESFilmic";break;case $f:t="AgX";break;case ep:t="Neutral";break;case Qf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+a+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Yc=new C;function w0(){Ge.getLuminanceCoefficients(Yc);let a=Yc.x.toFixed(4),e=Yc.y.toFixed(4),t=Yc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${a}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function S0(a){return[a.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",a.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(kr).join(`
`)}function E0(a){let e=[];for(let t in a){let n=a[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function A0(a,e){let t={},n=a.getProgramParameter(e,a.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let s=a.getActiveAttrib(e,i),r=s.name,o=1;s.type===a.FLOAT_MAT2&&(o=2),s.type===a.FLOAT_MAT3&&(o=3),s.type===a.FLOAT_MAT4&&(o=4),t[r]={type:s.type,location:a.getAttribLocation(e,r),locationSize:o}}return t}function kr(a){return a!==""}function Fp(a,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return a.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Lp(a,e){return a.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var T0=/^[ \t]*#include +<([\w\d./]+)>/gm;function ud(a){return a.replace(T0,C0)}var R0=new Map;function C0(a,e){let t=ze[e];if(t===void 0){let n=R0.get(e);if(n!==void 0)t=ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ud(t)}var I0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Np(a){return a.replace(I0,P0)}function P0(a,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Up(a){let e=`precision ${a.precision} float;
	precision ${a.precision} int;
	precision ${a.precision} sampler2D;
	precision ${a.precision} samplerCube;
	precision ${a.precision} sampler3D;
	precision ${a.precision} sampler2DArray;
	precision ${a.precision} sampler2DShadow;
	precision ${a.precision} samplerCubeShadow;
	precision ${a.precision} sampler2DArrayShadow;
	precision ${a.precision} isampler2D;
	precision ${a.precision} isampler3D;
	precision ${a.precision} isamplerCube;
	precision ${a.precision} isampler2DArray;
	precision ${a.precision} usampler2D;
	precision ${a.precision} usampler3D;
	precision ${a.precision} usamplerCube;
	precision ${a.precision} usampler2DArray;
	`;return a.precision==="highp"?e+=`
#define HIGH_PRECISION`:a.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:a.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function D0(a){let e="SHADOWMAP_TYPE_BASIC";return a.shadowMapType===Fh?e="SHADOWMAP_TYPE_PCF":a.shadowMapType===tc?e="SHADOWMAP_TYPE_PCF_SOFT":a.shadowMapType===ii&&(e="SHADOWMAP_TYPE_VSM"),e}function k0(a){let e="ENVMAP_TYPE_CUBE";if(a.envMap)switch(a.envMapMode){case ya:case _a:e="ENVMAP_TYPE_CUBE";break;case Ar:e="ENVMAP_TYPE_CUBE_UV";break}return e}function F0(a){let e="ENVMAP_MODE_REFLECTION";if(a.envMap)switch(a.envMapMode){case _a:e="ENVMAP_MODE_REFRACTION";break}return e}function L0(a){let e="ENVMAP_BLENDING_NONE";if(a.envMap)switch(a.combine){case Uh:e="ENVMAP_BLENDING_MULTIPLY";break;case qf:e="ENVMAP_BLENDING_MIX";break;case Kf:e="ENVMAP_BLENDING_ADD";break}return e}function N0(a){let e=a.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function U0(a,e,t,n){let i=a.getContext(),s=t.defines,r=t.vertexShader,o=t.fragmentShader,c=D0(t),l=k0(t),d=F0(t),h=L0(t),u=N0(t),f=S0(t),b=E0(s),g=i.createProgram(),m,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(kr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(kr).join(`
`),p.length>0&&(p+=`
`)):(m=[Up(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(kr).join(`
`),p=[Up(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ai?"#define TONE_MAPPING":"",t.toneMapping!==Ai?ze.tonemapping_pars_fragment:"",t.toneMapping!==Ai?M0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,_0("linearToOutputTexel",t.outputColorSpace),w0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(kr).join(`
`)),r=ud(r),r=Fp(r,t),r=Lp(r,t),o=ud(o),o=Fp(o,t),o=Lp(o,t),r=Np(r),o=Np(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Jh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Jh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let y=v+m+r,x=v+p+o,_=Pp(i,i.VERTEX_SHADER,y),S=Pp(i,i.FRAGMENT_SHADER,x);i.attachShader(g,_),i.attachShader(g,S),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function E(I){if(a.debug.checkShaderErrors){let P=i.getProgramInfoLog(g)||"",F=i.getShaderInfoLog(_)||"",N=i.getShaderInfoLog(S)||"",O=P.trim(),j=F.trim(),J=N.trim(),H=!0,Q=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(H=!1,typeof a.debug.onShaderError=="function")a.debug.onShaderError(i,g,_,S);else{let ce=kp(i,_,"vertex"),xe=kp(i,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+O+`
`+ce+`
`+xe)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(j===""||J==="")&&(Q=!1);Q&&(I.diagnostics={runnable:H,programLog:O,vertexShader:{log:j,prefix:m},fragmentShader:{log:J,prefix:p}})}i.deleteShader(_),i.deleteShader(S),R=new xs(i,g),M=A0(i,g)}let R;this.getUniforms=function(){return R===void 0&&E(this),R};let M;this.getAttributes=function(){return M===void 0&&E(this),M};let w=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=i.getProgramParameter(g,g0)),w},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=x0++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=_,this.fragmentShader=S,this}var B0=0,fd=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),r=this._getShaderCacheForMaterial(e);return r.has(i)===!1&&(r.add(i),i.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new pd(e),t.set(e,n)),n}},pd=class{constructor(e){this.id=B0++,this.code=e,this.usedTimes=0}};function O0(a,e,t,n,i,s,r){let o=new is,c=new fd,l=new Set,d=[],h=i.logarithmicDepthBuffer,u=i.vertexTextures,f=i.precision,b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(M){return l.add(M),M===0?"uv":`uv${M}`}function m(M,w,I,P,F){let N=P.fog,O=F.geometry,j=M.isMeshStandardMaterial?P.environment:null,J=(M.isMeshStandardMaterial?t:e).get(M.envMap||j),H=J&&J.mapping===Ar?J.image.height:null,Q=b[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));let ce=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,xe=ce!==void 0?ce.length:0,Ue=0;O.morphAttributes.position!==void 0&&(Ue=1),O.morphAttributes.normal!==void 0&&(Ue=2),O.morphAttributes.color!==void 0&&(Ue=3);let at,ht,Ze,q;if(Q){let et=si[Q];at=et.vertexShader,ht=et.fragmentShader}else at=M.vertexShader,ht=M.fragmentShader,c.update(M),Ze=c.getVertexShaderID(M),q=c.getFragmentShaderID(M);let Z=a.getRenderTarget(),pe=a.state.buffers.depth.getReversed(),Le=F.isInstancedMesh===!0,Ae=F.isBatchedMesh===!0,qe=!!M.map,Wt=!!M.matcap,k=!!J,ft=!!M.aoMap,Be=!!M.lightMap,De=!!M.bumpMap,ve=!!M.normalMap,pt=!!M.displacementMap,ye=!!M.emissiveMap,Ve=!!M.metalnessMap,Dt=!!M.roughnessMap,Mt=M.anisotropy>0,D=M.clearcoat>0,A=M.dispersion>0,z=M.iridescence>0,X=M.sheen>0,Y=M.transmission>0,W=Mt&&!!M.anisotropyMap,Ee=D&&!!M.clearcoatMap,ie=D&&!!M.clearcoatNormalMap,_e=D&&!!M.clearcoatRoughnessMap,we=z&&!!M.iridescenceMap,te=z&&!!M.iridescenceThicknessMap,le=X&&!!M.sheenColorMap,Pe=X&&!!M.sheenRoughnessMap,Se=!!M.specularMap,re=!!M.specularColorMap,je=!!M.specularIntensityMap,L=Y&&!!M.transmissionMap,ne=Y&&!!M.thicknessMap,ae=!!M.gradientMap,fe=!!M.alphaMap,$=M.alphaTest>0,K=!!M.alphaHash,ge=!!M.extensions,Ne=Ai;M.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Ne=a.toneMapping);let dt={shaderID:Q,shaderType:M.type,shaderName:M.name,vertexShader:at,fragmentShader:ht,defines:M.defines,customVertexShaderID:Ze,customFragmentShaderID:q,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Ae,batchingColor:Ae&&F._colorsTexture!==null,instancing:Le,instancingColor:Le&&F.instanceColor!==null,instancingMorph:Le&&F.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:Z===null?a.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:jt,alphaToCoverage:!!M.alphaToCoverage,map:qe,matcap:Wt,envMap:k,envMapMode:k&&J.mapping,envMapCubeUVHeight:H,aoMap:ft,lightMap:Be,bumpMap:De,normalMap:ve,displacementMap:u&&pt,emissiveMap:ye,normalMapObjectSpace:ve&&M.normalMapType===sp,normalMapTangentSpace:ve&&M.normalMapType===qh,metalnessMap:Ve,roughnessMap:Dt,anisotropy:Mt,anisotropyMap:W,clearcoat:D,clearcoatMap:Ee,clearcoatNormalMap:ie,clearcoatRoughnessMap:_e,dispersion:A,iridescence:z,iridescenceMap:we,iridescenceThicknessMap:te,sheen:X,sheenColorMap:le,sheenRoughnessMap:Pe,specularMap:Se,specularColorMap:re,specularIntensityMap:je,transmission:Y,transmissionMap:L,thicknessMap:ne,gradientMap:ae,opaque:M.transparent===!1&&M.blending===ha&&M.alphaToCoverage===!1,alphaMap:fe,alphaTest:$,alphaHash:K,combine:M.combine,mapUv:qe&&g(M.map.channel),aoMapUv:ft&&g(M.aoMap.channel),lightMapUv:Be&&g(M.lightMap.channel),bumpMapUv:De&&g(M.bumpMap.channel),normalMapUv:ve&&g(M.normalMap.channel),displacementMapUv:pt&&g(M.displacementMap.channel),emissiveMapUv:ye&&g(M.emissiveMap.channel),metalnessMapUv:Ve&&g(M.metalnessMap.channel),roughnessMapUv:Dt&&g(M.roughnessMap.channel),anisotropyMapUv:W&&g(M.anisotropyMap.channel),clearcoatMapUv:Ee&&g(M.clearcoatMap.channel),clearcoatNormalMapUv:ie&&g(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&g(M.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&g(M.iridescenceMap.channel),iridescenceThicknessMapUv:te&&g(M.iridescenceThicknessMap.channel),sheenColorMapUv:le&&g(M.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&g(M.sheenRoughnessMap.channel),specularMapUv:Se&&g(M.specularMap.channel),specularColorMapUv:re&&g(M.specularColorMap.channel),specularIntensityMapUv:je&&g(M.specularIntensityMap.channel),transmissionMapUv:L&&g(M.transmissionMap.channel),thicknessMapUv:ne&&g(M.thicknessMap.channel),alphaMapUv:fe&&g(M.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(ve||Mt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!O.attributes.uv&&(qe||fe),fog:!!N,useFog:M.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:pe,skinning:F.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:Ue,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:a.shadowMap.enabled&&I.length>0,shadowMapType:a.shadowMap.type,toneMapping:Ne,decodeVideoTexture:qe&&M.map.isVideoTexture===!0&&Ge.getTransfer(M.map.colorSpace)===it,decodeVideoTextureEmissive:ye&&M.emissiveMap.isVideoTexture===!0&&Ge.getTransfer(M.emissiveMap.colorSpace)===it,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Nt,flipSided:M.side===Vt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:ge&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&M.extensions.multiDraw===!0||Ae)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return dt.vertexUv1s=l.has(1),dt.vertexUv2s=l.has(2),dt.vertexUv3s=l.has(3),l.clear(),dt}function p(M){let w=[];if(M.shaderID?w.push(M.shaderID):(w.push(M.customVertexShaderID),w.push(M.customFragmentShaderID)),M.defines!==void 0)for(let I in M.defines)w.push(I),w.push(M.defines[I]);return M.isRawShaderMaterial===!1&&(v(w,M),y(w,M),w.push(a.outputColorSpace)),w.push(M.customProgramCacheKey),w.join()}function v(M,w){M.push(w.precision),M.push(w.outputColorSpace),M.push(w.envMapMode),M.push(w.envMapCubeUVHeight),M.push(w.mapUv),M.push(w.alphaMapUv),M.push(w.lightMapUv),M.push(w.aoMapUv),M.push(w.bumpMapUv),M.push(w.normalMapUv),M.push(w.displacementMapUv),M.push(w.emissiveMapUv),M.push(w.metalnessMapUv),M.push(w.roughnessMapUv),M.push(w.anisotropyMapUv),M.push(w.clearcoatMapUv),M.push(w.clearcoatNormalMapUv),M.push(w.clearcoatRoughnessMapUv),M.push(w.iridescenceMapUv),M.push(w.iridescenceThicknessMapUv),M.push(w.sheenColorMapUv),M.push(w.sheenRoughnessMapUv),M.push(w.specularMapUv),M.push(w.specularColorMapUv),M.push(w.specularIntensityMapUv),M.push(w.transmissionMapUv),M.push(w.thicknessMapUv),M.push(w.combine),M.push(w.fogExp2),M.push(w.sizeAttenuation),M.push(w.morphTargetsCount),M.push(w.morphAttributeCount),M.push(w.numDirLights),M.push(w.numPointLights),M.push(w.numSpotLights),M.push(w.numSpotLightMaps),M.push(w.numHemiLights),M.push(w.numRectAreaLights),M.push(w.numDirLightShadows),M.push(w.numPointLightShadows),M.push(w.numSpotLightShadows),M.push(w.numSpotLightShadowsWithMaps),M.push(w.numLightProbes),M.push(w.shadowMapType),M.push(w.toneMapping),M.push(w.numClippingPlanes),M.push(w.numClipIntersection),M.push(w.depthPacking)}function y(M,w){o.disableAll(),w.supportsVertexTextures&&o.enable(0),w.instancing&&o.enable(1),w.instancingColor&&o.enable(2),w.instancingMorph&&o.enable(3),w.matcap&&o.enable(4),w.envMap&&o.enable(5),w.normalMapObjectSpace&&o.enable(6),w.normalMapTangentSpace&&o.enable(7),w.clearcoat&&o.enable(8),w.iridescence&&o.enable(9),w.alphaTest&&o.enable(10),w.vertexColors&&o.enable(11),w.vertexAlphas&&o.enable(12),w.vertexUv1s&&o.enable(13),w.vertexUv2s&&o.enable(14),w.vertexUv3s&&o.enable(15),w.vertexTangents&&o.enable(16),w.anisotropy&&o.enable(17),w.alphaHash&&o.enable(18),w.batching&&o.enable(19),w.dispersion&&o.enable(20),w.batchingColor&&o.enable(21),w.gradientMap&&o.enable(22),M.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reversedDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),M.push(o.mask)}function x(M){let w=b[M.type],I;if(w){let P=si[w];I=qc.clone(P.uniforms)}else I=M.uniforms;return I}function _(M,w){let I;for(let P=0,F=d.length;P<F;P++){let N=d[P];if(N.cacheKey===w){I=N,++I.usedTimes;break}}return I===void 0&&(I=new U0(a,w,M,s),d.push(I)),I}function S(M){if(--M.usedTimes===0){let w=d.indexOf(M);d[w]=d[d.length-1],d.pop(),M.destroy()}}function E(M){c.remove(M)}function R(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:_,releaseProgram:S,releaseShaderCache:E,programs:d,dispose:R}}function z0(){let a=new WeakMap;function e(r){return a.has(r)}function t(r){let o=a.get(r);return o===void 0&&(o={},a.set(r,o)),o}function n(r){a.delete(r)}function i(r,o,c){a.get(r)[o]=c}function s(){a=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function j0(a,e){return a.groupOrder!==e.groupOrder?a.groupOrder-e.groupOrder:a.renderOrder!==e.renderOrder?a.renderOrder-e.renderOrder:a.material.id!==e.material.id?a.material.id-e.material.id:a.z!==e.z?a.z-e.z:a.id-e.id}function Bp(a,e){return a.groupOrder!==e.groupOrder?a.groupOrder-e.groupOrder:a.renderOrder!==e.renderOrder?a.renderOrder-e.renderOrder:a.z!==e.z?e.z-a.z:a.id-e.id}function Op(){let a=[],e=0,t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function r(h,u,f,b,g,m){let p=a[e];return p===void 0?(p={id:h.id,object:h,geometry:u,material:f,groupOrder:b,renderOrder:h.renderOrder,z:g,group:m},a[e]=p):(p.id=h.id,p.object=h,p.geometry=u,p.material=f,p.groupOrder=b,p.renderOrder=h.renderOrder,p.z=g,p.group=m),e++,p}function o(h,u,f,b,g,m){let p=r(h,u,f,b,g,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function c(h,u,f,b,g,m){let p=r(h,u,f,b,g,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function l(h,u){t.length>1&&t.sort(h||j0),n.length>1&&n.sort(u||Bp),i.length>1&&i.sort(u||Bp)}function d(){for(let h=e,u=a.length;h<u;h++){let f=a[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:o,unshift:c,finish:d,sort:l}}function V0(){let a=new WeakMap;function e(n,i){let s=a.get(n),r;return s===void 0?(r=new Op,a.set(n,[r])):i>=s.length?(r=new Op,s.push(r)):r=s[i],r}function t(){a=new WeakMap}return{get:e,dispose:t}}function G0(){let a={};return{get:function(e){if(a[e.id]!==void 0)return a[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new Me};break;case"SpotLight":t={position:new C,direction:new C,color:new Me,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new Me,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new Me,groundColor:new Me};break;case"RectAreaLight":t={color:new Me,position:new C,halfWidth:new C,halfHeight:new C};break}return a[e.id]=t,t}}}function H0(){let a={};return{get:function(e){if(a[e.id]!==void 0)return a[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be,shadowCameraNear:1,shadowCameraFar:1e3};break}return a[e.id]=t,t}}}var W0=0;function X0(a,e){return(e.castShadow?2:0)-(a.castShadow?2:0)+(e.map?1:0)-(a.map?1:0)}function q0(a){let e=new G0,t=H0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new C);let i=new C,s=new he,r=new he;function o(l){let d=0,h=0,u=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,b=0,g=0,m=0,p=0,v=0,y=0,x=0,_=0,S=0,E=0;l.sort(X0);for(let M=0,w=l.length;M<w;M++){let I=l[M],P=I.color,F=I.intensity,N=I.distance,O=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)d+=P.r*F,h+=P.g*F,u+=P.b*F;else if(I.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(I.sh.coefficients[j],F);E++}else if(I.isDirectionalLight){let j=e.get(I);if(j.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let J=I.shadow,H=t.get(I);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,n.directionalShadow[f]=H,n.directionalShadowMap[f]=O,n.directionalShadowMatrix[f]=I.shadow.matrix,v++}n.directional[f]=j,f++}else if(I.isSpotLight){let j=e.get(I);j.position.setFromMatrixPosition(I.matrixWorld),j.color.copy(P).multiplyScalar(F),j.distance=N,j.coneCos=Math.cos(I.angle),j.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),j.decay=I.decay,n.spot[g]=j;let J=I.shadow;if(I.map&&(n.spotLightMap[_]=I.map,_++,J.updateMatrices(I),I.castShadow&&S++),n.spotLightMatrix[g]=J.matrix,I.castShadow){let H=t.get(I);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,n.spotShadow[g]=H,n.spotShadowMap[g]=O,x++}g++}else if(I.isRectAreaLight){let j=e.get(I);j.color.copy(P).multiplyScalar(F),j.halfWidth.set(I.width*.5,0,0),j.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=j,m++}else if(I.isPointLight){let j=e.get(I);if(j.color.copy(I.color).multiplyScalar(I.intensity),j.distance=I.distance,j.decay=I.decay,I.castShadow){let J=I.shadow,H=t.get(I);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,H.shadowCameraNear=J.camera.near,H.shadowCameraFar=J.camera.far,n.pointShadow[b]=H,n.pointShadowMap[b]=O,n.pointShadowMatrix[b]=I.shadow.matrix,y++}n.point[b]=j,b++}else if(I.isHemisphereLight){let j=e.get(I);j.skyColor.copy(I.color).multiplyScalar(F),j.groundColor.copy(I.groundColor).multiplyScalar(F),n.hemi[p]=j,p++}}m>0&&(a.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=se.LTC_FLOAT_1,n.rectAreaLTC2=se.LTC_FLOAT_2):(n.rectAreaLTC1=se.LTC_HALF_1,n.rectAreaLTC2=se.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=h,n.ambient[2]=u;let R=n.hash;(R.directionalLength!==f||R.pointLength!==b||R.spotLength!==g||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==v||R.numPointShadows!==y||R.numSpotShadows!==x||R.numSpotMaps!==_||R.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=g,n.rectArea.length=m,n.point.length=b,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=x+_-S,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=E,R.directionalLength=f,R.pointLength=b,R.spotLength=g,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=v,R.numPointShadows=y,R.numSpotShadows=x,R.numSpotMaps=_,R.numLightProbes=E,n.version=W0++)}function c(l,d){let h=0,u=0,f=0,b=0,g=0,m=d.matrixWorldInverse;for(let p=0,v=l.length;p<v;p++){let y=l[p];if(y.isDirectionalLight){let x=n.directional[h];x.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),h++}else if(y.isSpotLight){let x=n.spot[f];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),f++}else if(y.isRectAreaLight){let x=n.rectArea[b];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),r.identity(),s.copy(y.matrixWorld),s.premultiply(m),r.extractRotation(s),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(r),x.halfHeight.applyMatrix4(r),b++}else if(y.isPointLight){let x=n.point[u];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),u++}else if(y.isHemisphereLight){let x=n.hemi[g];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(m),g++}}}return{setup:o,setupView:c,state:n}}function zp(a){let e=new q0(a),t=[],n=[];function i(d){l.camera=d,t.length=0,n.length=0}function s(d){t.push(d)}function r(d){n.push(d)}function o(){e.setup(t)}function c(d){e.setupView(t,d)}let l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:r}}function K0(a){let e=new WeakMap;function t(i,s=0){let r=e.get(i),o;return r===void 0?(o=new zp(a),e.set(i,[o])):s>=r.length?(o=new zp(a),r.push(o)):o=r[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var J0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Y0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Z0(a,e,t){let n=new Gi,i=new be,s=new be,r=new $e,o=new Xo({depthPacking:ap}),c=new qo,l={},d=t.maxTextureSize,h={[Yt]:Vt,[Vt]:Yt,[Nt]:Nt},u=new Lt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new be},radius:{value:4}},vertexShader:J0,fragmentShader:Y0}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let b=new St;b.setAttribute("position",new Ke(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let g=new tt(b,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fh;let p=this.type;this.render=function(S,E,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;let M=a.getRenderTarget(),w=a.getActiveCubeFace(),I=a.getActiveMipmapLevel(),P=a.state;P.setBlending(On),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);let F=p!==ii&&this.type===ii,N=p===ii&&this.type!==ii;for(let O=0,j=S.length;O<j;O++){let J=S[O],H=J.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);let Q=H.getFrameExtents();if(i.multiply(Q),s.copy(H.mapSize),(i.x>d||i.y>d)&&(i.x>d&&(s.x=Math.floor(d/Q.x),i.x=s.x*Q.x,H.mapSize.x=s.x),i.y>d&&(s.y=Math.floor(d/Q.y),i.y=s.y*Q.y,H.mapSize.y=s.y)),H.map===null||F===!0||N===!0){let xe=this.type!==ii?{minFilter:zt,magFilter:zt}:{};H.map!==null&&H.map.dispose(),H.map=new pn(i.x,i.y,xe),H.map.texture.name=J.name+".shadowMap",H.camera.updateProjectionMatrix()}a.setRenderTarget(H.map),a.clear();let ce=H.getViewportCount();for(let xe=0;xe<ce;xe++){let Ue=H.getViewport(xe);r.set(s.x*Ue.x,s.y*Ue.y,s.x*Ue.z,s.y*Ue.w),P.viewport(r),H.updateMatrices(J,xe),n=H.getFrustum(),x(E,R,H.camera,J,this.type)}H.isPointLightShadow!==!0&&this.type===ii&&v(H,R),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,a.setRenderTarget(M,w,I)};function v(S,E){let R=e.update(g);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new pn(i.x,i.y)),u.uniforms.shadow_pass.value=S.map.texture,u.uniforms.resolution.value=S.mapSize,u.uniforms.radius.value=S.radius,a.setRenderTarget(S.mapPass),a.clear(),a.renderBufferDirect(E,null,R,u,g,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,a.setRenderTarget(S.map),a.clear(),a.renderBufferDirect(E,null,R,f,g,null)}function y(S,E,R,M){let w=null,I=R.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(I!==void 0)w=I;else if(w=R.isPointLight===!0?c:o,a.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){let P=w.uuid,F=E.uuid,N=l[P];N===void 0&&(N={},l[P]=N);let O=N[F];O===void 0&&(O=w.clone(),N[F]=O,E.addEventListener("dispose",_)),w=O}if(w.visible=E.visible,w.wireframe=E.wireframe,M===ii?w.side=E.shadowSide!==null?E.shadowSide:E.side:w.side=E.shadowSide!==null?E.shadowSide:h[E.side],w.alphaMap=E.alphaMap,w.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,w.map=E.map,w.clipShadows=E.clipShadows,w.clippingPlanes=E.clippingPlanes,w.clipIntersection=E.clipIntersection,w.displacementMap=E.displacementMap,w.displacementScale=E.displacementScale,w.displacementBias=E.displacementBias,w.wireframeLinewidth=E.wireframeLinewidth,w.linewidth=E.linewidth,R.isPointLight===!0&&w.isMeshDistanceMaterial===!0){let P=a.properties.get(w);P.light=R}return w}function x(S,E,R,M,w){if(S.visible===!1)return;if(S.layers.test(E.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&w===ii)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,S.matrixWorld);let F=e.update(S),N=S.material;if(Array.isArray(N)){let O=F.groups;for(let j=0,J=O.length;j<J;j++){let H=O[j],Q=N[H.materialIndex];if(Q&&Q.visible){let ce=y(S,Q,M,w);S.onBeforeShadow(a,S,E,R,F,ce,H),a.renderBufferDirect(R,null,F,ce,S,H),S.onAfterShadow(a,S,E,R,F,ce,H)}}}else if(N.visible){let O=y(S,N,M,w);S.onBeforeShadow(a,S,E,R,F,O,null),a.renderBufferDirect(R,null,F,O,S,null),S.onAfterShadow(a,S,E,R,F,O,null)}}let P=S.children;for(let F=0,N=P.length;F<N;F++)x(P[F],E,R,M,w)}function _(S){S.target.removeEventListener("dispose",_);for(let R in l){let M=l[R],w=S.target.uuid;w in M&&(M[w].dispose(),delete M[w])}}}var Q0={[nc]:ic,[ac]:oc,[sc]:cc,[da]:rc,[ic]:nc,[oc]:ac,[cc]:sc,[rc]:da};function $0(a,e){function t(){let L=!1,ne=new $e,ae=null,fe=new $e(0,0,0,0);return{setMask:function($){ae!==$&&!L&&(a.colorMask($,$,$,$),ae=$)},setLocked:function($){L=$},setClear:function($,K,ge,Ne,dt){dt===!0&&($*=Ne,K*=Ne,ge*=Ne),ne.set($,K,ge,Ne),fe.equals(ne)===!1&&(a.clearColor($,K,ge,Ne),fe.copy(ne))},reset:function(){L=!1,ae=null,fe.set(-1,0,0,0)}}}function n(){let L=!1,ne=!1,ae=null,fe=null,$=null;return{setReversed:function(K){if(ne!==K){let ge=e.get("EXT_clip_control");K?ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.ZERO_TO_ONE_EXT):ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.NEGATIVE_ONE_TO_ONE_EXT),ne=K;let Ne=$;$=null,this.setClear(Ne)}},getReversed:function(){return ne},setTest:function(K){K?Z(a.DEPTH_TEST):pe(a.DEPTH_TEST)},setMask:function(K){ae!==K&&!L&&(a.depthMask(K),ae=K)},setFunc:function(K){if(ne&&(K=Q0[K]),fe!==K){switch(K){case nc:a.depthFunc(a.NEVER);break;case ic:a.depthFunc(a.ALWAYS);break;case ac:a.depthFunc(a.LESS);break;case da:a.depthFunc(a.LEQUAL);break;case sc:a.depthFunc(a.EQUAL);break;case rc:a.depthFunc(a.GEQUAL);break;case oc:a.depthFunc(a.GREATER);break;case cc:a.depthFunc(a.NOTEQUAL);break;default:a.depthFunc(a.LEQUAL)}fe=K}},setLocked:function(K){L=K},setClear:function(K){$!==K&&(ne&&(K=1-K),a.clearDepth(K),$=K)},reset:function(){L=!1,ae=null,fe=null,$=null,ne=!1}}}function i(){let L=!1,ne=null,ae=null,fe=null,$=null,K=null,ge=null,Ne=null,dt=null;return{setTest:function(et){L||(et?Z(a.STENCIL_TEST):pe(a.STENCIL_TEST))},setMask:function(et){ne!==et&&!L&&(a.stencilMask(et),ne=et)},setFunc:function(et,hi,Xn){(ae!==et||fe!==hi||$!==Xn)&&(a.stencilFunc(et,hi,Xn),ae=et,fe=hi,$=Xn)},setOp:function(et,hi,Xn){(K!==et||ge!==hi||Ne!==Xn)&&(a.stencilOp(et,hi,Xn),K=et,ge=hi,Ne=Xn)},setLocked:function(et){L=et},setClear:function(et){dt!==et&&(a.clearStencil(et),dt=et)},reset:function(){L=!1,ne=null,ae=null,fe=null,$=null,K=null,ge=null,Ne=null,dt=null}}}let s=new t,r=new n,o=new i,c=new WeakMap,l=new WeakMap,d={},h={},u=new WeakMap,f=[],b=null,g=!1,m=null,p=null,v=null,y=null,x=null,_=null,S=null,E=new Me(0,0,0),R=0,M=!1,w=null,I=null,P=null,F=null,N=null,O=a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,J=0,H=a.getParameter(a.VERSION);H.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(H)[1]),j=J>=1):H.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),j=J>=2);let Q=null,ce={},xe=a.getParameter(a.SCISSOR_BOX),Ue=a.getParameter(a.VIEWPORT),at=new $e().fromArray(xe),ht=new $e().fromArray(Ue);function Ze(L,ne,ae,fe){let $=new Uint8Array(4),K=a.createTexture();a.bindTexture(L,K),a.texParameteri(L,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(L,a.TEXTURE_MAG_FILTER,a.NEAREST);for(let ge=0;ge<ae;ge++)L===a.TEXTURE_3D||L===a.TEXTURE_2D_ARRAY?a.texImage3D(ne,0,a.RGBA,1,1,fe,0,a.RGBA,a.UNSIGNED_BYTE,$):a.texImage2D(ne+ge,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,$);return K}let q={};q[a.TEXTURE_2D]=Ze(a.TEXTURE_2D,a.TEXTURE_2D,1),q[a.TEXTURE_CUBE_MAP]=Ze(a.TEXTURE_CUBE_MAP,a.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[a.TEXTURE_2D_ARRAY]=Ze(a.TEXTURE_2D_ARRAY,a.TEXTURE_2D_ARRAY,1,1),q[a.TEXTURE_3D]=Ze(a.TEXTURE_3D,a.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),Z(a.DEPTH_TEST),r.setFunc(da),De(!1),ve(kh),Z(a.CULL_FACE),ft(On);function Z(L){d[L]!==!0&&(a.enable(L),d[L]=!0)}function pe(L){d[L]!==!1&&(a.disable(L),d[L]=!1)}function Le(L,ne){return h[L]!==ne?(a.bindFramebuffer(L,ne),h[L]=ne,L===a.DRAW_FRAMEBUFFER&&(h[a.FRAMEBUFFER]=ne),L===a.FRAMEBUFFER&&(h[a.DRAW_FRAMEBUFFER]=ne),!0):!1}function Ae(L,ne){let ae=f,fe=!1;if(L){ae=u.get(ne),ae===void 0&&(ae=[],u.set(ne,ae));let $=L.textures;if(ae.length!==$.length||ae[0]!==a.COLOR_ATTACHMENT0){for(let K=0,ge=$.length;K<ge;K++)ae[K]=a.COLOR_ATTACHMENT0+K;ae.length=$.length,fe=!0}}else ae[0]!==a.BACK&&(ae[0]=a.BACK,fe=!0);fe&&a.drawBuffers(ae)}function qe(L){return b!==L?(a.useProgram(L),b=L,!0):!1}let Wt={[zi]:a.FUNC_ADD,[If]:a.FUNC_SUBTRACT,[Pf]:a.FUNC_REVERSE_SUBTRACT};Wt[Df]=a.MIN,Wt[kf]=a.MAX;let k={[Ff]:a.ZERO,[Lf]:a.ONE,[Nf]:a.SRC_COLOR,[Fo]:a.SRC_ALPHA,[Vf]:a.SRC_ALPHA_SATURATE,[zf]:a.DST_COLOR,[Bf]:a.DST_ALPHA,[Uf]:a.ONE_MINUS_SRC_COLOR,[Lo]:a.ONE_MINUS_SRC_ALPHA,[jf]:a.ONE_MINUS_DST_COLOR,[Of]:a.ONE_MINUS_DST_ALPHA,[Gf]:a.CONSTANT_COLOR,[Hf]:a.ONE_MINUS_CONSTANT_COLOR,[Wf]:a.CONSTANT_ALPHA,[Xf]:a.ONE_MINUS_CONSTANT_ALPHA};function ft(L,ne,ae,fe,$,K,ge,Ne,dt,et){if(L===On){g===!0&&(pe(a.BLEND),g=!1);return}if(g===!1&&(Z(a.BLEND),g=!0),L!==Cf){if(L!==m||et!==M){if((p!==zi||x!==zi)&&(a.blendEquation(a.FUNC_ADD),p=zi,x=zi),et)switch(L){case ha:a.blendFuncSeparate(a.ONE,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case Er:a.blendFunc(a.ONE,a.ONE);break;case Lh:a.blendFuncSeparate(a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ZERO,a.ONE);break;case Nh:a.blendFuncSeparate(a.DST_COLOR,a.ONE_MINUS_SRC_ALPHA,a.ZERO,a.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case ha:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case Er:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE,a.ONE,a.ONE);break;case Lh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Nh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}v=null,y=null,_=null,S=null,E.set(0,0,0),R=0,m=L,M=et}return}$=$||ne,K=K||ae,ge=ge||fe,(ne!==p||$!==x)&&(a.blendEquationSeparate(Wt[ne],Wt[$]),p=ne,x=$),(ae!==v||fe!==y||K!==_||ge!==S)&&(a.blendFuncSeparate(k[ae],k[fe],k[K],k[ge]),v=ae,y=fe,_=K,S=ge),(Ne.equals(E)===!1||dt!==R)&&(a.blendColor(Ne.r,Ne.g,Ne.b,dt),E.copy(Ne),R=dt),m=L,M=!1}function Be(L,ne){L.side===Nt?pe(a.CULL_FACE):Z(a.CULL_FACE);let ae=L.side===Vt;ne&&(ae=!ae),De(ae),L.blending===ha&&L.transparent===!1?ft(On):ft(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),r.setFunc(L.depthFunc),r.setTest(L.depthTest),r.setMask(L.depthWrite),s.setMask(L.colorWrite);let fe=L.stencilWrite;o.setTest(fe),fe&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),ye(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Z(a.SAMPLE_ALPHA_TO_COVERAGE):pe(a.SAMPLE_ALPHA_TO_COVERAGE)}function De(L){w!==L&&(L?a.frontFace(a.CW):a.frontFace(a.CCW),w=L)}function ve(L){L!==Tf?(Z(a.CULL_FACE),L!==I&&(L===kh?a.cullFace(a.BACK):L===Rf?a.cullFace(a.FRONT):a.cullFace(a.FRONT_AND_BACK))):pe(a.CULL_FACE),I=L}function pt(L){L!==P&&(j&&a.lineWidth(L),P=L)}function ye(L,ne,ae){L?(Z(a.POLYGON_OFFSET_FILL),(F!==ne||N!==ae)&&(a.polygonOffset(ne,ae),F=ne,N=ae)):pe(a.POLYGON_OFFSET_FILL)}function Ve(L){L?Z(a.SCISSOR_TEST):pe(a.SCISSOR_TEST)}function Dt(L){L===void 0&&(L=a.TEXTURE0+O-1),Q!==L&&(a.activeTexture(L),Q=L)}function Mt(L,ne,ae){ae===void 0&&(Q===null?ae=a.TEXTURE0+O-1:ae=Q);let fe=ce[ae];fe===void 0&&(fe={type:void 0,texture:void 0},ce[ae]=fe),(fe.type!==L||fe.texture!==ne)&&(Q!==ae&&(a.activeTexture(ae),Q=ae),a.bindTexture(L,ne||q[L]),fe.type=L,fe.texture=ne)}function D(){let L=ce[Q];L!==void 0&&L.type!==void 0&&(a.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function A(){try{a.compressedTexImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function z(){try{a.compressedTexImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function X(){try{a.texSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Y(){try{a.texSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function W(){try{a.compressedTexSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ee(){try{a.compressedTexSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ie(){try{a.texStorage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function _e(){try{a.texStorage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function we(){try{a.texImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function te(){try{a.texImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function le(L){at.equals(L)===!1&&(a.scissor(L.x,L.y,L.z,L.w),at.copy(L))}function Pe(L){ht.equals(L)===!1&&(a.viewport(L.x,L.y,L.z,L.w),ht.copy(L))}function Se(L,ne){let ae=l.get(ne);ae===void 0&&(ae=new WeakMap,l.set(ne,ae));let fe=ae.get(L);fe===void 0&&(fe=a.getUniformBlockIndex(ne,L.name),ae.set(L,fe))}function re(L,ne){let fe=l.get(ne).get(L);c.get(ne)!==fe&&(a.uniformBlockBinding(ne,fe,L.__bindingPointIndex),c.set(ne,fe))}function je(){a.disable(a.BLEND),a.disable(a.CULL_FACE),a.disable(a.DEPTH_TEST),a.disable(a.POLYGON_OFFSET_FILL),a.disable(a.SCISSOR_TEST),a.disable(a.STENCIL_TEST),a.disable(a.SAMPLE_ALPHA_TO_COVERAGE),a.blendEquation(a.FUNC_ADD),a.blendFunc(a.ONE,a.ZERO),a.blendFuncSeparate(a.ONE,a.ZERO,a.ONE,a.ZERO),a.blendColor(0,0,0,0),a.colorMask(!0,!0,!0,!0),a.clearColor(0,0,0,0),a.depthMask(!0),a.depthFunc(a.LESS),r.setReversed(!1),a.clearDepth(1),a.stencilMask(4294967295),a.stencilFunc(a.ALWAYS,0,4294967295),a.stencilOp(a.KEEP,a.KEEP,a.KEEP),a.clearStencil(0),a.cullFace(a.BACK),a.frontFace(a.CCW),a.polygonOffset(0,0),a.activeTexture(a.TEXTURE0),a.bindFramebuffer(a.FRAMEBUFFER,null),a.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),a.bindFramebuffer(a.READ_FRAMEBUFFER,null),a.useProgram(null),a.lineWidth(1),a.scissor(0,0,a.canvas.width,a.canvas.height),a.viewport(0,0,a.canvas.width,a.canvas.height),d={},Q=null,ce={},h={},u=new WeakMap,f=[],b=null,g=!1,m=null,p=null,v=null,y=null,x=null,_=null,S=null,E=new Me(0,0,0),R=0,M=!1,w=null,I=null,P=null,F=null,N=null,at.set(0,0,a.canvas.width,a.canvas.height),ht.set(0,0,a.canvas.width,a.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:Z,disable:pe,bindFramebuffer:Le,drawBuffers:Ae,useProgram:qe,setBlending:ft,setMaterial:Be,setFlipSided:De,setCullFace:ve,setLineWidth:pt,setPolygonOffset:ye,setScissorTest:Ve,activeTexture:Dt,bindTexture:Mt,unbindTexture:D,compressedTexImage2D:A,compressedTexImage3D:z,texImage2D:we,texImage3D:te,updateUBOMapping:Se,uniformBlockBinding:re,texStorage2D:ie,texStorage3D:_e,texSubImage2D:X,texSubImage3D:Y,compressedTexSubImage2D:W,compressedTexSubImage3D:Ee,scissor:le,viewport:Pe,reset:je}}function e_(a,e,t,n,i,s,r){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new be,d=new WeakMap,h,u=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(D,A){return f?new OffscreenCanvas(D,A):es("canvas")}function g(D,A,z){let X=1,Y=Mt(D);if((Y.width>z||Y.height>z)&&(X=z/Math.max(Y.width,Y.height)),X<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){let W=Math.floor(X*Y.width),Ee=Math.floor(X*Y.height);h===void 0&&(h=b(W,Ee));let ie=A?b(W,Ee):h;return ie.width=W,ie.height=Ee,ie.getContext("2d").drawImage(D,0,0,W,Ee),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+W+"x"+Ee+")."),ie}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),D;return D}function m(D){return D.generateMipmaps}function p(D){a.generateMipmap(D)}function v(D){return D.isWebGLCubeRenderTarget?a.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?a.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?a.TEXTURE_2D_ARRAY:a.TEXTURE_2D}function y(D,A,z,X,Y=!1){if(D!==null){if(a[D]!==void 0)return a[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let W=A;if(A===a.RED&&(z===a.FLOAT&&(W=a.R32F),z===a.HALF_FLOAT&&(W=a.R16F),z===a.UNSIGNED_BYTE&&(W=a.R8)),A===a.RED_INTEGER&&(z===a.UNSIGNED_BYTE&&(W=a.R8UI),z===a.UNSIGNED_SHORT&&(W=a.R16UI),z===a.UNSIGNED_INT&&(W=a.R32UI),z===a.BYTE&&(W=a.R8I),z===a.SHORT&&(W=a.R16I),z===a.INT&&(W=a.R32I)),A===a.RG&&(z===a.FLOAT&&(W=a.RG32F),z===a.HALF_FLOAT&&(W=a.RG16F),z===a.UNSIGNED_BYTE&&(W=a.RG8)),A===a.RG_INTEGER&&(z===a.UNSIGNED_BYTE&&(W=a.RG8UI),z===a.UNSIGNED_SHORT&&(W=a.RG16UI),z===a.UNSIGNED_INT&&(W=a.RG32UI),z===a.BYTE&&(W=a.RG8I),z===a.SHORT&&(W=a.RG16I),z===a.INT&&(W=a.RG32I)),A===a.RGB_INTEGER&&(z===a.UNSIGNED_BYTE&&(W=a.RGB8UI),z===a.UNSIGNED_SHORT&&(W=a.RGB16UI),z===a.UNSIGNED_INT&&(W=a.RGB32UI),z===a.BYTE&&(W=a.RGB8I),z===a.SHORT&&(W=a.RGB16I),z===a.INT&&(W=a.RGB32I)),A===a.RGBA_INTEGER&&(z===a.UNSIGNED_BYTE&&(W=a.RGBA8UI),z===a.UNSIGNED_SHORT&&(W=a.RGBA16UI),z===a.UNSIGNED_INT&&(W=a.RGBA32UI),z===a.BYTE&&(W=a.RGBA8I),z===a.SHORT&&(W=a.RGBA16I),z===a.INT&&(W=a.RGBA32I)),A===a.RGB&&(z===a.UNSIGNED_INT_5_9_9_9_REV&&(W=a.RGB9_E5),z===a.UNSIGNED_INT_10F_11F_11F_REV&&(W=a.R11F_G11F_B10F)),A===a.RGBA){let Ee=Y?Js:Ge.getTransfer(X);z===a.FLOAT&&(W=a.RGBA32F),z===a.HALF_FLOAT&&(W=a.RGBA16F),z===a.UNSIGNED_BYTE&&(W=Ee===it?a.SRGB8_ALPHA8:a.RGBA8),z===a.UNSIGNED_SHORT_4_4_4_4&&(W=a.RGBA4),z===a.UNSIGNED_SHORT_5_5_5_1&&(W=a.RGB5_A1)}return(W===a.R16F||W===a.R32F||W===a.RG16F||W===a.RG32F||W===a.RGBA16F||W===a.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function x(D,A){let z;return D?A===null||A===Cn||A===fs?z=a.DEPTH24_STENCIL8:A===fn?z=a.DEPTH32F_STENCIL8:A===us&&(z=a.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===Cn||A===fs?z=a.DEPTH_COMPONENT24:A===fn?z=a.DEPTH_COMPONENT32F:A===us&&(z=a.DEPTH_COMPONENT16),z}function _(D,A){return m(D)===!0||D.isFramebufferTexture&&D.minFilter!==zt&&D.minFilter!==an?Math.log2(Math.max(A.width,A.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?A.mipmaps.length:1}function S(D){let A=D.target;A.removeEventListener("dispose",S),R(A),A.isVideoTexture&&d.delete(A)}function E(D){let A=D.target;A.removeEventListener("dispose",E),w(A)}function R(D){let A=n.get(D);if(A.__webglInit===void 0)return;let z=D.source,X=u.get(z);if(X){let Y=X[A.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&M(D),Object.keys(X).length===0&&u.delete(z)}n.remove(D)}function M(D){let A=n.get(D);a.deleteTexture(A.__webglTexture);let z=D.source,X=u.get(z);delete X[A.__cacheKey],r.memory.textures--}function w(D){let A=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(A.__webglFramebuffer[X]))for(let Y=0;Y<A.__webglFramebuffer[X].length;Y++)a.deleteFramebuffer(A.__webglFramebuffer[X][Y]);else a.deleteFramebuffer(A.__webglFramebuffer[X]);A.__webglDepthbuffer&&a.deleteRenderbuffer(A.__webglDepthbuffer[X])}else{if(Array.isArray(A.__webglFramebuffer))for(let X=0;X<A.__webglFramebuffer.length;X++)a.deleteFramebuffer(A.__webglFramebuffer[X]);else a.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&a.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&a.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let X=0;X<A.__webglColorRenderbuffer.length;X++)A.__webglColorRenderbuffer[X]&&a.deleteRenderbuffer(A.__webglColorRenderbuffer[X]);A.__webglDepthRenderbuffer&&a.deleteRenderbuffer(A.__webglDepthRenderbuffer)}let z=D.textures;for(let X=0,Y=z.length;X<Y;X++){let W=n.get(z[X]);W.__webglTexture&&(a.deleteTexture(W.__webglTexture),r.memory.textures--),n.remove(z[X])}n.remove(D)}let I=0;function P(){I=0}function F(){let D=I;return D>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+i.maxTextures),I+=1,D}function N(D){let A=[];return A.push(D.wrapS),A.push(D.wrapT),A.push(D.wrapR||0),A.push(D.magFilter),A.push(D.minFilter),A.push(D.anisotropy),A.push(D.internalFormat),A.push(D.format),A.push(D.type),A.push(D.generateMipmaps),A.push(D.premultiplyAlpha),A.push(D.flipY),A.push(D.unpackAlignment),A.push(D.colorSpace),A.join()}function O(D,A){let z=n.get(D);if(D.isVideoTexture&&Ve(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&z.__version!==D.version){let X=D.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(z,D,A);return}}else D.isExternalTexture&&(z.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(a.TEXTURE_2D,z.__webglTexture,a.TEXTURE0+A)}function j(D,A){let z=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&z.__version!==D.version){q(z,D,A);return}t.bindTexture(a.TEXTURE_2D_ARRAY,z.__webglTexture,a.TEXTURE0+A)}function J(D,A){let z=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&z.__version!==D.version){q(z,D,A);return}t.bindTexture(a.TEXTURE_3D,z.__webglTexture,a.TEXTURE0+A)}function H(D,A){let z=n.get(D);if(D.version>0&&z.__version!==D.version){Z(z,D,A);return}t.bindTexture(a.TEXTURE_CUBE_MAP,z.__webglTexture,a.TEXTURE0+A)}let Q={[ji]:a.REPEAT,[Jn]:a.CLAMP_TO_EDGE,[Qa]:a.MIRRORED_REPEAT},ce={[zt]:a.NEAREST,[uc]:a.NEAREST_MIPMAP_NEAREST,[Ma]:a.NEAREST_MIPMAP_LINEAR,[an]:a.LINEAR,[ds]:a.LINEAR_MIPMAP_NEAREST,[zn]:a.LINEAR_MIPMAP_LINEAR},xe={[rp]:a.NEVER,[up]:a.ALWAYS,[op]:a.LESS,[Kh]:a.LEQUAL,[cp]:a.EQUAL,[dp]:a.GEQUAL,[lp]:a.GREATER,[hp]:a.NOTEQUAL};function Ue(D,A){if(A.type===fn&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===an||A.magFilter===ds||A.magFilter===Ma||A.magFilter===zn||A.minFilter===an||A.minFilter===ds||A.minFilter===Ma||A.minFilter===zn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),a.texParameteri(D,a.TEXTURE_WRAP_S,Q[A.wrapS]),a.texParameteri(D,a.TEXTURE_WRAP_T,Q[A.wrapT]),(D===a.TEXTURE_3D||D===a.TEXTURE_2D_ARRAY)&&a.texParameteri(D,a.TEXTURE_WRAP_R,Q[A.wrapR]),a.texParameteri(D,a.TEXTURE_MAG_FILTER,ce[A.magFilter]),a.texParameteri(D,a.TEXTURE_MIN_FILTER,ce[A.minFilter]),A.compareFunction&&(a.texParameteri(D,a.TEXTURE_COMPARE_MODE,a.COMPARE_REF_TO_TEXTURE),a.texParameteri(D,a.TEXTURE_COMPARE_FUNC,xe[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===zt||A.minFilter!==Ma&&A.minFilter!==zn||A.type===fn&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){let z=e.get("EXT_texture_filter_anisotropic");a.texParameterf(D,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function at(D,A){let z=!1;D.__webglInit===void 0&&(D.__webglInit=!0,A.addEventListener("dispose",S));let X=A.source,Y=u.get(X);Y===void 0&&(Y={},u.set(X,Y));let W=N(A);if(W!==D.__cacheKey){Y[W]===void 0&&(Y[W]={texture:a.createTexture(),usedTimes:0},r.memory.textures++,z=!0),Y[W].usedTimes++;let Ee=Y[D.__cacheKey];Ee!==void 0&&(Y[D.__cacheKey].usedTimes--,Ee.usedTimes===0&&M(A)),D.__cacheKey=W,D.__webglTexture=Y[W].texture}return z}function ht(D,A,z){return Math.floor(Math.floor(D/z)/A)}function Ze(D,A,z,X){let W=D.updateRanges;if(W.length===0)t.texSubImage2D(a.TEXTURE_2D,0,0,0,A.width,A.height,z,X,A.data);else{W.sort((te,le)=>te.start-le.start);let Ee=0;for(let te=1;te<W.length;te++){let le=W[Ee],Pe=W[te],Se=le.start+le.count,re=ht(Pe.start,A.width,4),je=ht(le.start,A.width,4);Pe.start<=Se+1&&re===je&&ht(Pe.start+Pe.count-1,A.width,4)===re?le.count=Math.max(le.count,Pe.start+Pe.count-le.start):(++Ee,W[Ee]=Pe)}W.length=Ee+1;let ie=a.getParameter(a.UNPACK_ROW_LENGTH),_e=a.getParameter(a.UNPACK_SKIP_PIXELS),we=a.getParameter(a.UNPACK_SKIP_ROWS);a.pixelStorei(a.UNPACK_ROW_LENGTH,A.width);for(let te=0,le=W.length;te<le;te++){let Pe=W[te],Se=Math.floor(Pe.start/4),re=Math.ceil(Pe.count/4),je=Se%A.width,L=Math.floor(Se/A.width),ne=re,ae=1;a.pixelStorei(a.UNPACK_SKIP_PIXELS,je),a.pixelStorei(a.UNPACK_SKIP_ROWS,L),t.texSubImage2D(a.TEXTURE_2D,0,je,L,ne,ae,z,X,A.data)}D.clearUpdateRanges(),a.pixelStorei(a.UNPACK_ROW_LENGTH,ie),a.pixelStorei(a.UNPACK_SKIP_PIXELS,_e),a.pixelStorei(a.UNPACK_SKIP_ROWS,we)}}function q(D,A,z){let X=a.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(X=a.TEXTURE_2D_ARRAY),A.isData3DTexture&&(X=a.TEXTURE_3D);let Y=at(D,A),W=A.source;t.bindTexture(X,D.__webglTexture,a.TEXTURE0+z);let Ee=n.get(W);if(W.version!==Ee.__version||Y===!0){t.activeTexture(a.TEXTURE0+z);let ie=Ge.getPrimaries(Ge.workingColorSpace),_e=A.colorSpace===Ti?null:Ge.getPrimaries(A.colorSpace),we=A.colorSpace===Ti||ie===_e?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,A.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,A.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);let te=g(A.image,!1,i.maxTextureSize);te=Dt(A,te);let le=s.convert(A.format,A.colorSpace),Pe=s.convert(A.type),Se=y(A.internalFormat,le,Pe,A.colorSpace,A.isVideoTexture);Ue(X,A);let re,je=A.mipmaps,L=A.isVideoTexture!==!0,ne=Ee.__version===void 0||Y===!0,ae=W.dataReady,fe=_(A,te);if(A.isDepthTexture)Se=x(A.format===ps,A.type),ne&&(L?t.texStorage2D(a.TEXTURE_2D,1,Se,te.width,te.height):t.texImage2D(a.TEXTURE_2D,0,Se,te.width,te.height,0,le,Pe,null));else if(A.isDataTexture)if(je.length>0){L&&ne&&t.texStorage2D(a.TEXTURE_2D,fe,Se,je[0].width,je[0].height);for(let $=0,K=je.length;$<K;$++)re=je[$],L?ae&&t.texSubImage2D(a.TEXTURE_2D,$,0,0,re.width,re.height,le,Pe,re.data):t.texImage2D(a.TEXTURE_2D,$,Se,re.width,re.height,0,le,Pe,re.data);A.generateMipmaps=!1}else L?(ne&&t.texStorage2D(a.TEXTURE_2D,fe,Se,te.width,te.height),ae&&Ze(A,te,le,Pe)):t.texImage2D(a.TEXTURE_2D,0,Se,te.width,te.height,0,le,Pe,te.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){L&&ne&&t.texStorage3D(a.TEXTURE_2D_ARRAY,fe,Se,je[0].width,je[0].height,te.depth);for(let $=0,K=je.length;$<K;$++)if(re=je[$],A.format!==sn)if(le!==null)if(L){if(ae)if(A.layerUpdates.size>0){let ge=nd(re.width,re.height,A.format,A.type);for(let Ne of A.layerUpdates){let dt=re.data.subarray(Ne*ge/re.data.BYTES_PER_ELEMENT,(Ne+1)*ge/re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,$,0,0,Ne,re.width,re.height,1,le,dt)}A.clearLayerUpdates()}else t.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,$,0,0,0,re.width,re.height,te.depth,le,re.data)}else t.compressedTexImage3D(a.TEXTURE_2D_ARRAY,$,Se,re.width,re.height,te.depth,0,re.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?ae&&t.texSubImage3D(a.TEXTURE_2D_ARRAY,$,0,0,0,re.width,re.height,te.depth,le,Pe,re.data):t.texImage3D(a.TEXTURE_2D_ARRAY,$,Se,re.width,re.height,te.depth,0,le,Pe,re.data)}else{L&&ne&&t.texStorage2D(a.TEXTURE_2D,fe,Se,je[0].width,je[0].height);for(let $=0,K=je.length;$<K;$++)re=je[$],A.format!==sn?le!==null?L?ae&&t.compressedTexSubImage2D(a.TEXTURE_2D,$,0,0,re.width,re.height,le,re.data):t.compressedTexImage2D(a.TEXTURE_2D,$,Se,re.width,re.height,0,re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?ae&&t.texSubImage2D(a.TEXTURE_2D,$,0,0,re.width,re.height,le,Pe,re.data):t.texImage2D(a.TEXTURE_2D,$,Se,re.width,re.height,0,le,Pe,re.data)}else if(A.isDataArrayTexture)if(L){if(ne&&t.texStorage3D(a.TEXTURE_2D_ARRAY,fe,Se,te.width,te.height,te.depth),ae)if(A.layerUpdates.size>0){let $=nd(te.width,te.height,A.format,A.type);for(let K of A.layerUpdates){let ge=te.data.subarray(K*$/te.data.BYTES_PER_ELEMENT,(K+1)*$/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,K,te.width,te.height,1,le,Pe,ge)}A.clearLayerUpdates()}else t.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,le,Pe,te.data)}else t.texImage3D(a.TEXTURE_2D_ARRAY,0,Se,te.width,te.height,te.depth,0,le,Pe,te.data);else if(A.isData3DTexture)L?(ne&&t.texStorage3D(a.TEXTURE_3D,fe,Se,te.width,te.height,te.depth),ae&&t.texSubImage3D(a.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,le,Pe,te.data)):t.texImage3D(a.TEXTURE_3D,0,Se,te.width,te.height,te.depth,0,le,Pe,te.data);else if(A.isFramebufferTexture){if(ne)if(L)t.texStorage2D(a.TEXTURE_2D,fe,Se,te.width,te.height);else{let $=te.width,K=te.height;for(let ge=0;ge<fe;ge++)t.texImage2D(a.TEXTURE_2D,ge,Se,$,K,0,le,Pe,null),$>>=1,K>>=1}}else if(je.length>0){if(L&&ne){let $=Mt(je[0]);t.texStorage2D(a.TEXTURE_2D,fe,Se,$.width,$.height)}for(let $=0,K=je.length;$<K;$++)re=je[$],L?ae&&t.texSubImage2D(a.TEXTURE_2D,$,0,0,le,Pe,re):t.texImage2D(a.TEXTURE_2D,$,Se,le,Pe,re);A.generateMipmaps=!1}else if(L){if(ne){let $=Mt(te);t.texStorage2D(a.TEXTURE_2D,fe,Se,$.width,$.height)}ae&&t.texSubImage2D(a.TEXTURE_2D,0,0,0,le,Pe,te)}else t.texImage2D(a.TEXTURE_2D,0,Se,le,Pe,te);m(A)&&p(X),Ee.__version=W.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function Z(D,A,z){if(A.image.length!==6)return;let X=at(D,A),Y=A.source;t.bindTexture(a.TEXTURE_CUBE_MAP,D.__webglTexture,a.TEXTURE0+z);let W=n.get(Y);if(Y.version!==W.__version||X===!0){t.activeTexture(a.TEXTURE0+z);let Ee=Ge.getPrimaries(Ge.workingColorSpace),ie=A.colorSpace===Ti?null:Ge.getPrimaries(A.colorSpace),_e=A.colorSpace===Ti||Ee===ie?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,A.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,A.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);let we=A.isCompressedTexture||A.image[0].isCompressedTexture,te=A.image[0]&&A.image[0].isDataTexture,le=[];for(let K=0;K<6;K++)!we&&!te?le[K]=g(A.image[K],!0,i.maxCubemapSize):le[K]=te?A.image[K].image:A.image[K],le[K]=Dt(A,le[K]);let Pe=le[0],Se=s.convert(A.format,A.colorSpace),re=s.convert(A.type),je=y(A.internalFormat,Se,re,A.colorSpace),L=A.isVideoTexture!==!0,ne=W.__version===void 0||X===!0,ae=Y.dataReady,fe=_(A,Pe);Ue(a.TEXTURE_CUBE_MAP,A);let $;if(we){L&&ne&&t.texStorage2D(a.TEXTURE_CUBE_MAP,fe,je,Pe.width,Pe.height);for(let K=0;K<6;K++){$=le[K].mipmaps;for(let ge=0;ge<$.length;ge++){let Ne=$[ge];A.format!==sn?Se!==null?L?ae&&t.compressedTexSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge,0,0,Ne.width,Ne.height,Se,Ne.data):t.compressedTexImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge,je,Ne.width,Ne.height,0,Ne.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?ae&&t.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge,0,0,Ne.width,Ne.height,Se,re,Ne.data):t.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge,je,Ne.width,Ne.height,0,Se,re,Ne.data)}}}else{if($=A.mipmaps,L&&ne){$.length>0&&fe++;let K=Mt(le[0]);t.texStorage2D(a.TEXTURE_CUBE_MAP,fe,je,K.width,K.height)}for(let K=0;K<6;K++)if(te){L?ae&&t.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,le[K].width,le[K].height,Se,re,le[K].data):t.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,je,le[K].width,le[K].height,0,Se,re,le[K].data);for(let ge=0;ge<$.length;ge++){let dt=$[ge].image[K].image;L?ae&&t.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge+1,0,0,dt.width,dt.height,Se,re,dt.data):t.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge+1,je,dt.width,dt.height,0,Se,re,dt.data)}}else{L?ae&&t.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Se,re,le[K]):t.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,je,Se,re,le[K]);for(let ge=0;ge<$.length;ge++){let Ne=$[ge];L?ae&&t.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge+1,0,0,Se,re,Ne.image[K]):t.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge+1,je,Se,re,Ne.image[K])}}}m(A)&&p(a.TEXTURE_CUBE_MAP),W.__version=Y.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function pe(D,A,z,X,Y,W){let Ee=s.convert(z.format,z.colorSpace),ie=s.convert(z.type),_e=y(z.internalFormat,Ee,ie,z.colorSpace),we=n.get(A),te=n.get(z);if(te.__renderTarget=A,!we.__hasExternalTextures){let le=Math.max(1,A.width>>W),Pe=Math.max(1,A.height>>W);Y===a.TEXTURE_3D||Y===a.TEXTURE_2D_ARRAY?t.texImage3D(Y,W,_e,le,Pe,A.depth,0,Ee,ie,null):t.texImage2D(Y,W,_e,le,Pe,0,Ee,ie,null)}t.bindFramebuffer(a.FRAMEBUFFER,D),ye(A)?o.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,X,Y,te.__webglTexture,0,pt(A)):(Y===a.TEXTURE_2D||Y>=a.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=a.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&a.framebufferTexture2D(a.FRAMEBUFFER,X,Y,te.__webglTexture,W),t.bindFramebuffer(a.FRAMEBUFFER,null)}function Le(D,A,z){if(a.bindRenderbuffer(a.RENDERBUFFER,D),A.depthBuffer){let X=A.depthTexture,Y=X&&X.isDepthTexture?X.type:null,W=x(A.stencilBuffer,Y),Ee=A.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,ie=pt(A);ye(A)?o.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,ie,W,A.width,A.height):z?a.renderbufferStorageMultisample(a.RENDERBUFFER,ie,W,A.width,A.height):a.renderbufferStorage(a.RENDERBUFFER,W,A.width,A.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,Ee,a.RENDERBUFFER,D)}else{let X=A.textures;for(let Y=0;Y<X.length;Y++){let W=X[Y],Ee=s.convert(W.format,W.colorSpace),ie=s.convert(W.type),_e=y(W.internalFormat,Ee,ie,W.colorSpace),we=pt(A);z&&ye(A)===!1?a.renderbufferStorageMultisample(a.RENDERBUFFER,we,_e,A.width,A.height):ye(A)?o.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,we,_e,A.width,A.height):a.renderbufferStorage(a.RENDERBUFFER,_e,A.width,A.height)}}a.bindRenderbuffer(a.RENDERBUFFER,null)}function Ae(D,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(a.FRAMEBUFFER,D),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let X=n.get(A.depthTexture);X.__renderTarget=A,(!X.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),O(A.depthTexture,0);let Y=X.__webglTexture,W=pt(A);if(A.depthTexture.format===$a)ye(A)?o.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,Y,0,W):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,Y,0);else if(A.depthTexture.format===ps)ye(A)?o.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,Y,0,W):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,Y,0);else throw new Error("Unknown depthTexture format")}function qe(D){let A=n.get(D),z=D.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==D.depthTexture){let X=D.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),X){let Y=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,X.removeEventListener("dispose",Y)};X.addEventListener("dispose",Y),A.__depthDisposeCallback=Y}A.__boundDepthTexture=X}if(D.depthTexture&&!A.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");let X=D.texture.mipmaps;X&&X.length>0?Ae(A.__webglFramebuffer[0],D):Ae(A.__webglFramebuffer,D)}else if(z){A.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(a.FRAMEBUFFER,A.__webglFramebuffer[X]),A.__webglDepthbuffer[X]===void 0)A.__webglDepthbuffer[X]=a.createRenderbuffer(),Le(A.__webglDepthbuffer[X],D,!1);else{let Y=D.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,W=A.__webglDepthbuffer[X];a.bindRenderbuffer(a.RENDERBUFFER,W),a.framebufferRenderbuffer(a.FRAMEBUFFER,Y,a.RENDERBUFFER,W)}}else{let X=D.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(a.FRAMEBUFFER,A.__webglFramebuffer[0]):t.bindFramebuffer(a.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=a.createRenderbuffer(),Le(A.__webglDepthbuffer,D,!1);else{let Y=D.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,W=A.__webglDepthbuffer;a.bindRenderbuffer(a.RENDERBUFFER,W),a.framebufferRenderbuffer(a.FRAMEBUFFER,Y,a.RENDERBUFFER,W)}}t.bindFramebuffer(a.FRAMEBUFFER,null)}function Wt(D,A,z){let X=n.get(D);A!==void 0&&pe(X.__webglFramebuffer,D,D.texture,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,0),z!==void 0&&qe(D)}function k(D){let A=D.texture,z=n.get(D),X=n.get(A);D.addEventListener("dispose",E);let Y=D.textures,W=D.isWebGLCubeRenderTarget===!0,Ee=Y.length>1;if(Ee||(X.__webglTexture===void 0&&(X.__webglTexture=a.createTexture()),X.__version=A.version,r.memory.textures++),W){z.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(A.mipmaps&&A.mipmaps.length>0){z.__webglFramebuffer[ie]=[];for(let _e=0;_e<A.mipmaps.length;_e++)z.__webglFramebuffer[ie][_e]=a.createFramebuffer()}else z.__webglFramebuffer[ie]=a.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){z.__webglFramebuffer=[];for(let ie=0;ie<A.mipmaps.length;ie++)z.__webglFramebuffer[ie]=a.createFramebuffer()}else z.__webglFramebuffer=a.createFramebuffer();if(Ee)for(let ie=0,_e=Y.length;ie<_e;ie++){let we=n.get(Y[ie]);we.__webglTexture===void 0&&(we.__webglTexture=a.createTexture(),r.memory.textures++)}if(D.samples>0&&ye(D)===!1){z.__webglMultisampledFramebuffer=a.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(a.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ie=0;ie<Y.length;ie++){let _e=Y[ie];z.__webglColorRenderbuffer[ie]=a.createRenderbuffer(),a.bindRenderbuffer(a.RENDERBUFFER,z.__webglColorRenderbuffer[ie]);let we=s.convert(_e.format,_e.colorSpace),te=s.convert(_e.type),le=y(_e.internalFormat,we,te,_e.colorSpace,D.isXRRenderTarget===!0),Pe=pt(D);a.renderbufferStorageMultisample(a.RENDERBUFFER,Pe,le,D.width,D.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+ie,a.RENDERBUFFER,z.__webglColorRenderbuffer[ie])}a.bindRenderbuffer(a.RENDERBUFFER,null),D.depthBuffer&&(z.__webglDepthRenderbuffer=a.createRenderbuffer(),Le(z.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(a.FRAMEBUFFER,null)}}if(W){t.bindTexture(a.TEXTURE_CUBE_MAP,X.__webglTexture),Ue(a.TEXTURE_CUBE_MAP,A);for(let ie=0;ie<6;ie++)if(A.mipmaps&&A.mipmaps.length>0)for(let _e=0;_e<A.mipmaps.length;_e++)pe(z.__webglFramebuffer[ie][_e],D,A,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+ie,_e);else pe(z.__webglFramebuffer[ie],D,A,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);m(A)&&p(a.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let ie=0,_e=Y.length;ie<_e;ie++){let we=Y[ie],te=n.get(we),le=a.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(le=D.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY),t.bindTexture(le,te.__webglTexture),Ue(le,we),pe(z.__webglFramebuffer,D,we,a.COLOR_ATTACHMENT0+ie,le,0),m(we)&&p(le)}t.unbindTexture()}else{let ie=a.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(ie=D.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY),t.bindTexture(ie,X.__webglTexture),Ue(ie,A),A.mipmaps&&A.mipmaps.length>0)for(let _e=0;_e<A.mipmaps.length;_e++)pe(z.__webglFramebuffer[_e],D,A,a.COLOR_ATTACHMENT0,ie,_e);else pe(z.__webglFramebuffer,D,A,a.COLOR_ATTACHMENT0,ie,0);m(A)&&p(ie),t.unbindTexture()}D.depthBuffer&&qe(D)}function ft(D){let A=D.textures;for(let z=0,X=A.length;z<X;z++){let Y=A[z];if(m(Y)){let W=v(D),Ee=n.get(Y).__webglTexture;t.bindTexture(W,Ee),p(W),t.unbindTexture()}}}let Be=[],De=[];function ve(D){if(D.samples>0){if(ye(D)===!1){let A=D.textures,z=D.width,X=D.height,Y=a.COLOR_BUFFER_BIT,W=D.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,Ee=n.get(D),ie=A.length>1;if(ie)for(let we=0;we<A.length;we++)t.bindFramebuffer(a.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+we,a.RENDERBUFFER,null),t.bindFramebuffer(a.FRAMEBUFFER,Ee.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+we,a.TEXTURE_2D,null,0);t.bindFramebuffer(a.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer);let _e=D.texture.mipmaps;_e&&_e.length>0?t.bindFramebuffer(a.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer[0]):t.bindFramebuffer(a.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let we=0;we<A.length;we++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(Y|=a.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(Y|=a.STENCIL_BUFFER_BIT)),ie){a.framebufferRenderbuffer(a.READ_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.RENDERBUFFER,Ee.__webglColorRenderbuffer[we]);let te=n.get(A[we]).__webglTexture;a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,te,0)}a.blitFramebuffer(0,0,z,X,0,0,z,X,Y,a.NEAREST),c===!0&&(Be.length=0,De.length=0,Be.push(a.COLOR_ATTACHMENT0+we),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Be.push(W),De.push(W),a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,De)),a.invalidateFramebuffer(a.READ_FRAMEBUFFER,Be))}if(t.bindFramebuffer(a.READ_FRAMEBUFFER,null),t.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),ie)for(let we=0;we<A.length;we++){t.bindFramebuffer(a.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+we,a.RENDERBUFFER,Ee.__webglColorRenderbuffer[we]);let te=n.get(A[we]).__webglTexture;t.bindFramebuffer(a.FRAMEBUFFER,Ee.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+we,a.TEXTURE_2D,te,0)}t.bindFramebuffer(a.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&c){let A=D.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT;a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,[A])}}}function pt(D){return Math.min(i.maxSamples,D.samples)}function ye(D){let A=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Ve(D){let A=r.render.frame;d.get(D)!==A&&(d.set(D,A),D.update())}function Dt(D,A){let z=D.colorSpace,X=D.format,Y=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||z!==jt&&z!==Ti&&(Ge.getTransfer(z)===it?(X!==sn||Y!==jn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),A}function Mt(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=P,this.setTexture2D=O,this.setTexture2DArray=j,this.setTexture3D=J,this.setTextureCube=H,this.rebindTextures=Wt,this.setupRenderTarget=k,this.updateRenderTargetMipmap=ft,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=qe,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=ye}function t_(a,e){function t(n,i=Ti){let s,r=Ge.getTransfer(i);if(n===jn)return a.UNSIGNED_BYTE;if(n===pc)return a.UNSIGNED_SHORT_4_4_4_4;if(n===mc)return a.UNSIGNED_SHORT_5_5_5_1;if(n===jh)return a.UNSIGNED_INT_5_9_9_9_REV;if(n===Vh)return a.UNSIGNED_INT_10F_11F_11F_REV;if(n===Oh)return a.BYTE;if(n===zh)return a.SHORT;if(n===us)return a.UNSIGNED_SHORT;if(n===fc)return a.INT;if(n===Cn)return a.UNSIGNED_INT;if(n===fn)return a.FLOAT;if(n===ai)return a.HALF_FLOAT;if(n===Gh)return a.ALPHA;if(n===Hh)return a.RGB;if(n===sn)return a.RGBA;if(n===$a)return a.DEPTH_COMPONENT;if(n===ps)return a.DEPTH_STENCIL;if(n===bc)return a.RED;if(n===Tr)return a.RED_INTEGER;if(n===Wh)return a.RG;if(n===gc)return a.RG_INTEGER;if(n===xc)return a.RGBA_INTEGER;if(n===Rr||n===Cr||n===Ir||n===Pr)if(r===it)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Rr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Cr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ir)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Pr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Rr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Cr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ir)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Pr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===vc||n===yc||n===_c||n===Mc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===vc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===yc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===_c)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Mc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===wc||n===Sc||n===Ec)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===wc||n===Sc)return r===it?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ec)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ac||n===Tc||n===Rc||n===Cc||n===Ic||n===Pc||n===Dc||n===kc||n===Fc||n===Lc||n===Nc||n===Uc||n===Bc||n===Oc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ac)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Tc)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Rc)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Cc)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ic)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Pc)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Dc)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===kc)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Fc)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Lc)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Nc)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Uc)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Bc)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Oc)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===zc||n===jc||n===Vc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===zc)return r===it?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===jc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Vc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Gc||n===Hc||n===Wc||n===Xc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Gc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Hc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Wc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Xc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===fs?a.UNSIGNED_INT_24_8:a[n]!==void 0?a[n]:null}return{convert:t}}var n_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,i_=`
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

}`,md=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new lr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Lt({vertexShader:n_,fragmentShader:i_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new tt(new pr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},bd=class extends xi{constructor(e,t){super();let n=this,i=null,s=1,r=null,o="local-floor",c=1,l=null,d=null,h=null,u=null,f=null,b=null,g=typeof XRWebGLBinding<"u",m=new md,p={},v=t.getContextAttributes(),y=null,x=null,_=[],S=[],E=new be,R=null,M=new Tt;M.viewport=new $e;let w=new Tt;w.viewport=new $e;let I=[M,w],P=new ec,F=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Z=_[q];return Z===void 0&&(Z=new as,_[q]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(q){let Z=_[q];return Z===void 0&&(Z=new as,_[q]=Z),Z.getGripSpace()},this.getHand=function(q){let Z=_[q];return Z===void 0&&(Z=new as,_[q]=Z),Z.getHandSpace()};function O(q){let Z=S.indexOf(q.inputSource);if(Z===-1)return;let pe=_[Z];pe!==void 0&&(pe.update(q.inputSource,q.frame,l||r),pe.dispatchEvent({type:q.type,data:q.inputSource}))}function j(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",j),i.removeEventListener("inputsourceschange",J);for(let q=0;q<_.length;q++){let Z=S[q];Z!==null&&(S[q]=null,_[q].disconnect(Z))}F=null,N=null,m.reset();for(let q in p)delete p[q];e.setRenderTarget(y),f=null,u=null,h=null,i=null,x=null,Ze.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return h===null&&g&&(h=new XRWebGLBinding(i,t)),h},this.getFrame=function(){return b},this.getSession=function(){return i},this.setSession=async function(q){if(i=q,i!==null){if(y=e.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",j),i.addEventListener("inputsourceschange",J),v.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(E),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,Le=null,Ae=null;v.depth&&(Ae=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=v.stencil?ps:$a,Le=v.stencil?fs:Cn);let qe={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:s};h=this.getBinding(),u=h.createProjectionLayer(qe),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),x=new pn(u.textureWidth,u.textureHeight,{format:sn,type:jn,depthTexture:new Hi(u.textureWidth,u.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let pe={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,pe),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new pn(f.framebufferWidth,f.framebufferHeight,{format:sn,type:jn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,r=await i.requestReferenceSpace(o),Ze.setContext(i),Ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function J(q){for(let Z=0;Z<q.removed.length;Z++){let pe=q.removed[Z],Le=S.indexOf(pe);Le>=0&&(S[Le]=null,_[Le].disconnect(pe))}for(let Z=0;Z<q.added.length;Z++){let pe=q.added[Z],Le=S.indexOf(pe);if(Le===-1){for(let qe=0;qe<_.length;qe++)if(qe>=S.length){S.push(pe),Le=qe;break}else if(S[qe]===null){S[qe]=pe,Le=qe;break}if(Le===-1)break}let Ae=_[Le];Ae&&Ae.connect(pe)}}let H=new C,Q=new C;function ce(q,Z,pe){H.setFromMatrixPosition(Z.matrixWorld),Q.setFromMatrixPosition(pe.matrixWorld);let Le=H.distanceTo(Q),Ae=Z.projectionMatrix.elements,qe=pe.projectionMatrix.elements,Wt=Ae[14]/(Ae[10]-1),k=Ae[14]/(Ae[10]+1),ft=(Ae[9]+1)/Ae[5],Be=(Ae[9]-1)/Ae[5],De=(Ae[8]-1)/Ae[0],ve=(qe[8]+1)/qe[0],pt=Wt*De,ye=Wt*ve,Ve=Le/(-De+ve),Dt=Ve*-De;if(Z.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Dt),q.translateZ(Ve),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Ae[10]===-1)q.projectionMatrix.copy(Z.projectionMatrix),q.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{let Mt=Wt+Ve,D=k+Ve,A=pt-Dt,z=ye+(Le-Dt),X=ft*k/D*Mt,Y=Be*k/D*Mt;q.projectionMatrix.makePerspective(A,z,X,Y,Mt,D),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function xe(q,Z){Z===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Z.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(i===null)return;let Z=q.near,pe=q.far;m.texture!==null&&(m.depthNear>0&&(Z=m.depthNear),m.depthFar>0&&(pe=m.depthFar)),P.near=w.near=M.near=Z,P.far=w.far=M.far=pe,(F!==P.near||N!==P.far)&&(i.updateRenderState({depthNear:P.near,depthFar:P.far}),F=P.near,N=P.far),P.layers.mask=q.layers.mask|6,M.layers.mask=P.layers.mask&3,w.layers.mask=P.layers.mask&5;let Le=q.parent,Ae=P.cameras;xe(P,Le);for(let qe=0;qe<Ae.length;qe++)xe(Ae[qe],Le);Ae.length===2?ce(P,M,w):P.projectionMatrix.copy(M.projectionMatrix),Ue(q,P,Le)};function Ue(q,Z,pe){pe===null?q.matrix.copy(Z.matrixWorld):(q.matrix.copy(pe.matrixWorld),q.matrix.invert(),q.matrix.multiply(Z.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(Z.projectionMatrix),q.projectionMatrixInverse.copy(Z.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=pa*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(q){c=q,u!==null&&(u.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(P)},this.getCameraTexture=function(q){return p[q]};let at=null;function ht(q,Z){if(d=Z.getViewerPose(l||r),b=Z,d!==null){let pe=d.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let Le=!1;pe.length!==P.cameras.length&&(P.cameras.length=0,Le=!0);for(let k=0;k<pe.length;k++){let ft=pe[k],Be=null;if(f!==null)Be=f.getViewport(ft);else{let ve=h.getViewSubImage(u,ft);Be=ve.viewport,k===0&&(e.setRenderTargetTextures(x,ve.colorTexture,ve.depthStencilTexture),e.setRenderTarget(x))}let De=I[k];De===void 0&&(De=new Tt,De.layers.enable(k),De.viewport=new $e,I[k]=De),De.matrix.fromArray(ft.transform.matrix),De.matrix.decompose(De.position,De.quaternion,De.scale),De.projectionMatrix.fromArray(ft.projectionMatrix),De.projectionMatrixInverse.copy(De.projectionMatrix).invert(),De.viewport.set(Be.x,Be.y,Be.width,Be.height),k===0&&(P.matrix.copy(De.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),Le===!0&&P.cameras.push(De)}let Ae=i.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&g){h=n.getBinding();let k=h.getDepthInformation(pe[0]);k&&k.isValid&&k.texture&&m.init(k,i.renderState)}if(Ae&&Ae.includes("camera-access")&&g){e.state.unbindTexture(),h=n.getBinding();for(let k=0;k<pe.length;k++){let ft=pe[k].camera;if(ft){let Be=p[ft];Be||(Be=new lr,p[ft]=Be);let De=h.getCameraImage(ft);Be.sourceTexture=De}}}}for(let pe=0;pe<_.length;pe++){let Le=S[pe],Ae=_[pe];Le!==null&&Ae!==void 0&&Ae.update(Le,Z,l||r)}at&&at(q,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),b=null}let Ze=new jp;Ze.setAnimationLoop(ht),this.setAnimationLoop=function(q){at=q},this.dispose=function(){}}},Ea=new mn,a_=new he;function s_(a,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Qh(a)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,v,y,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),d(m,p)):p.isMeshStandardMaterial?(s(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(s(m,p),b(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(r(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,v,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Vt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Vt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let v=e.get(p),y=v.envMap,x=v.envMapRotation;y&&(m.envMap.value=y,Ea.copy(x),Ea.x*=-1,Ea.y*=-1,Ea.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ea.y*=-1,Ea.z*=-1),m.envMapRotation.value.setFromMatrix4(a_.makeRotationFromEuler(Ea)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function r(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Vt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function b(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){let v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function r_(a,e,t,n){let i={},s={},r=[],o=a.getParameter(a.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,y){let x=y.program;n.uniformBlockBinding(v,x)}function l(v,y){let x=i[v.id];x===void 0&&(b(v),x=d(v),i[v.id]=x,v.addEventListener("dispose",m));let _=y.program;n.updateUBOMapping(v,_);let S=e.render.frame;s[v.id]!==S&&(u(v),s[v.id]=S)}function d(v){let y=h();v.__bindingPointIndex=y;let x=a.createBuffer(),_=v.__size,S=v.usage;return a.bindBuffer(a.UNIFORM_BUFFER,x),a.bufferData(a.UNIFORM_BUFFER,_,S),a.bindBuffer(a.UNIFORM_BUFFER,null),a.bindBufferBase(a.UNIFORM_BUFFER,y,x),x}function h(){for(let v=0;v<o;v++)if(r.indexOf(v)===-1)return r.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){let y=i[v.id],x=v.uniforms,_=v.__cache;a.bindBuffer(a.UNIFORM_BUFFER,y);for(let S=0,E=x.length;S<E;S++){let R=Array.isArray(x[S])?x[S]:[x[S]];for(let M=0,w=R.length;M<w;M++){let I=R[M];if(f(I,S,M,_)===!0){let P=I.__offset,F=Array.isArray(I.value)?I.value:[I.value],N=0;for(let O=0;O<F.length;O++){let j=F[O],J=g(j);typeof j=="number"||typeof j=="boolean"?(I.__data[0]=j,a.bufferSubData(a.UNIFORM_BUFFER,P+N,I.__data)):j.isMatrix3?(I.__data[0]=j.elements[0],I.__data[1]=j.elements[1],I.__data[2]=j.elements[2],I.__data[3]=0,I.__data[4]=j.elements[3],I.__data[5]=j.elements[4],I.__data[6]=j.elements[5],I.__data[7]=0,I.__data[8]=j.elements[6],I.__data[9]=j.elements[7],I.__data[10]=j.elements[8],I.__data[11]=0):(j.toArray(I.__data,N),N+=J.storage/Float32Array.BYTES_PER_ELEMENT)}a.bufferSubData(a.UNIFORM_BUFFER,P,I.__data)}}}a.bindBuffer(a.UNIFORM_BUFFER,null)}function f(v,y,x,_){let S=v.value,E=y+"_"+x;if(_[E]===void 0)return typeof S=="number"||typeof S=="boolean"?_[E]=S:_[E]=S.clone(),!0;{let R=_[E];if(typeof S=="number"||typeof S=="boolean"){if(R!==S)return _[E]=S,!0}else if(R.equals(S)===!1)return R.copy(S),!0}return!1}function b(v){let y=v.uniforms,x=0,_=16;for(let E=0,R=y.length;E<R;E++){let M=Array.isArray(y[E])?y[E]:[y[E]];for(let w=0,I=M.length;w<I;w++){let P=M[w],F=Array.isArray(P.value)?P.value:[P.value];for(let N=0,O=F.length;N<O;N++){let j=F[N],J=g(j),H=x%_,Q=H%J.boundary,ce=H+Q;x+=Q,ce!==0&&_-ce<J.storage&&(x+=_-ce),P.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=x,x+=J.storage}}}let S=x%_;return S>0&&(x+=_-S),v.__size=x,v.__cache={},this}function g(v){let y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function m(v){let y=v.target;y.removeEventListener("dispose",m);let x=r.indexOf(y.__bindingPointIndex);r.splice(x,1),a.deleteBuffer(i[y.id]),delete i[y.id],delete s[y.id]}function p(){for(let v in i)a.deleteBuffer(i[v]);r=[],i={},s={}}return{bind:c,update:l,dispose:p}}var Qc=class{constructor(e={}){let{canvas:t=fp(),context:n=null,depth:i=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=r;let b=new Uint32Array(4),g=new Int32Array(4),m=null,p=null,v=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ai,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,_=!1;this._outputColorSpace=wt;let S=0,E=0,R=null,M=-1,w=null,I=new $e,P=new $e,F=null,N=new Me(0),O=0,j=t.width,J=t.height,H=1,Q=null,ce=null,xe=new $e(0,0,j,J),Ue=new $e(0,0,j,J),at=!1,ht=new Gi,Ze=!1,q=!1,Z=new he,pe=new C,Le=new $e,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},qe=!1;function Wt(){return R===null?H:1}let k=n;function ft(T,U){return t.getContext(T,U)}try{let T={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",fe,!1),t.addEventListener("webglcontextcreationerror",$,!1),k===null){let U="webgl2";if(k=ft(U,T),k===null)throw ft(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Be,De,ve,pt,ye,Ve,Dt,Mt,D,A,z,X,Y,W,Ee,ie,_e,we,te,le,Pe,Se,re,je;function L(){Be=new Sy(k),Be.init(),Se=new t_(k,Be),De=new gy(k,Be,e,Se),ve=new $0(k,Be),De.reversedDepthBuffer&&u&&ve.buffers.depth.setReversed(!0),pt=new Ty(k),ye=new z0,Ve=new e_(k,Be,ve,ye,De,Se,pt),Dt=new vy(x),Mt=new wy(x),D=new kg(k),re=new my(k,D),A=new Ey(k,D,pt,re),z=new Cy(k,A,D,pt),te=new Ry(k,De,Ve),ie=new xy(ye),X=new O0(x,Dt,Mt,Be,De,re,ie),Y=new s_(x,ye),W=new V0,Ee=new K0(Be),we=new py(x,Dt,Mt,ve,z,f,c),_e=new Z0(x,z,De),je=new r_(k,pt,De,ve),le=new by(k,Be,pt),Pe=new Ay(k,Be,pt),pt.programs=X.programs,x.capabilities=De,x.extensions=Be,x.properties=ye,x.renderLists=W,x.shadowMap=_e,x.state=ve,x.info=pt}L();let ne=new bd(x,k);this.xr=ne,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){let T=Be.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=Be.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(T){T!==void 0&&(H=T,this.setSize(j,J,!1))},this.getSize=function(T){return T.set(j,J)},this.setSize=function(T,U,V=!0){if(ne.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}j=T,J=U,t.width=Math.floor(T*H),t.height=Math.floor(U*H),V===!0&&(t.style.width=T+"px",t.style.height=U+"px"),this.setViewport(0,0,T,U)},this.getDrawingBufferSize=function(T){return T.set(j*H,J*H).floor()},this.setDrawingBufferSize=function(T,U,V){j=T,J=U,H=V,t.width=Math.floor(T*V),t.height=Math.floor(U*V),this.setViewport(0,0,T,U)},this.getCurrentViewport=function(T){return T.copy(I)},this.getViewport=function(T){return T.copy(xe)},this.setViewport=function(T,U,V,G){T.isVector4?xe.set(T.x,T.y,T.z,T.w):xe.set(T,U,V,G),ve.viewport(I.copy(xe).multiplyScalar(H).round())},this.getScissor=function(T){return T.copy(Ue)},this.setScissor=function(T,U,V,G){T.isVector4?Ue.set(T.x,T.y,T.z,T.w):Ue.set(T,U,V,G),ve.scissor(P.copy(Ue).multiplyScalar(H).round())},this.getScissorTest=function(){return at},this.setScissorTest=function(T){ve.setScissorTest(at=T)},this.setOpaqueSort=function(T){Q=T},this.setTransparentSort=function(T){ce=T},this.getClearColor=function(T){return T.copy(we.getClearColor())},this.setClearColor=function(){we.setClearColor(...arguments)},this.getClearAlpha=function(){return we.getClearAlpha()},this.setClearAlpha=function(){we.setClearAlpha(...arguments)},this.clear=function(T=!0,U=!0,V=!0){let G=0;if(T){let B=!1;if(R!==null){let ee=R.texture.format;B=ee===xc||ee===gc||ee===Tr}if(B){let ee=R.texture.type,oe=ee===jn||ee===Cn||ee===us||ee===fs||ee===pc||ee===mc,me=we.getClearColor(),ue=we.getClearAlpha(),Ce=me.r,ke=me.g,Te=me.b;oe?(b[0]=Ce,b[1]=ke,b[2]=Te,b[3]=ue,k.clearBufferuiv(k.COLOR,0,b)):(g[0]=Ce,g[1]=ke,g[2]=Te,g[3]=ue,k.clearBufferiv(k.COLOR,0,g))}else G|=k.COLOR_BUFFER_BIT}U&&(G|=k.DEPTH_BUFFER_BIT),V&&(G|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",fe,!1),t.removeEventListener("webglcontextcreationerror",$,!1),we.dispose(),W.dispose(),Ee.dispose(),ye.dispose(),Dt.dispose(),Mt.dispose(),z.dispose(),re.dispose(),je.dispose(),X.dispose(),ne.dispose(),ne.removeEventListener("sessionstart",Xn),ne.removeEventListener("sessionend",ku),ta.stop()};function ae(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),_=!0}function fe(){console.log("THREE.WebGLRenderer: Context Restored."),_=!1;let T=pt.autoReset,U=_e.enabled,V=_e.autoUpdate,G=_e.needsUpdate,B=_e.type;L(),pt.autoReset=T,_e.enabled=U,_e.autoUpdate=V,_e.needsUpdate=G,_e.type=B}function $(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function K(T){let U=T.target;U.removeEventListener("dispose",K),ge(U)}function ge(T){Ne(T),ye.remove(T)}function Ne(T){let U=ye.get(T).programs;U!==void 0&&(U.forEach(function(V){X.releaseProgram(V)}),T.isShaderMaterial&&X.releaseShaderCache(T))}this.renderBufferDirect=function(T,U,V,G,B,ee){U===null&&(U=Ae);let oe=B.isMesh&&B.matrixWorld.determinant()<0,me=gb(T,U,V,G,B);ve.setMaterial(G,oe);let ue=V.index,Ce=1;if(G.wireframe===!0){if(ue=A.getWireframeAttribute(V),ue===void 0)return;Ce=2}let ke=V.drawRange,Te=V.attributes.position,We=ke.start*Ce,st=(ke.start+ke.count)*Ce;ee!==null&&(We=Math.max(We,ee.start*Ce),st=Math.min(st,(ee.start+ee.count)*Ce)),ue!==null?(We=Math.max(We,0),st=Math.min(st,ue.count)):Te!=null&&(We=Math.max(We,0),st=Math.min(st,Te.count));let vt=st-We;if(vt<0||vt===1/0)return;re.setup(B,G,me,V,ue);let ut,rt=le;if(ue!==null&&(ut=D.get(ue),rt=Pe,rt.setIndex(ut)),B.isMesh)G.wireframe===!0?(ve.setLineWidth(G.wireframeLinewidth*Wt()),rt.setMode(k.LINES)):rt.setMode(k.TRIANGLES);else if(B.isLine){let Re=G.linewidth;Re===void 0&&(Re=1),ve.setLineWidth(Re*Wt()),B.isLineSegments?rt.setMode(k.LINES):B.isLineLoop?rt.setMode(k.LINE_LOOP):rt.setMode(k.LINE_STRIP)}else B.isPoints?rt.setMode(k.POINTS):B.isSprite&&rt.setMode(k.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)ts("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),rt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(Be.get("WEBGL_multi_draw"))rt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let Re=B._multiDrawStarts,bt=B._multiDrawCounts,Qe=B._multiDrawCount,_n=ue?D.get(ue).bytesPerElement:1,Fa=ye.get(G).currentProgram.getUniforms();for(let Mn=0;Mn<Qe;Mn++)Fa.setValue(k,"_gl_DrawID",Mn),rt.render(Re[Mn]/_n,bt[Mn])}else if(B.isInstancedMesh)rt.renderInstances(We,vt,B.count);else if(V.isInstancedBufferGeometry){let Re=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,bt=Math.min(V.instanceCount,Re);rt.renderInstances(We,vt,bt)}else rt.render(We,vt)};function dt(T,U,V){T.transparent===!0&&T.side===Nt&&T.forceSinglePass===!1?(T.side=Vt,T.needsUpdate=!0,io(T,U,V),T.side=Yt,T.needsUpdate=!0,io(T,U,V),T.side=Nt):io(T,U,V)}this.compile=function(T,U,V=null){V===null&&(V=T),p=Ee.get(V),p.init(U),y.push(p),V.traverseVisible(function(B){B.isLight&&B.layers.test(U.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),T!==V&&T.traverseVisible(function(B){B.isLight&&B.layers.test(U.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();let G=new Set;return T.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let ee=B.material;if(ee)if(Array.isArray(ee))for(let oe=0;oe<ee.length;oe++){let me=ee[oe];dt(me,V,B),G.add(me)}else dt(ee,V,B),G.add(ee)}),p=y.pop(),G},this.compileAsync=function(T,U,V=null){let G=this.compile(T,U,V);return new Promise(B=>{function ee(){if(G.forEach(function(oe){ye.get(oe).currentProgram.isReady()&&G.delete(oe)}),G.size===0){B(T);return}setTimeout(ee,10)}Be.get("KHR_parallel_shader_compile")!==null?ee():setTimeout(ee,10)})};let et=null;function hi(T){et&&et(T)}function Xn(){ta.stop()}function ku(){ta.start()}let ta=new jp;ta.setAnimationLoop(hi),typeof self<"u"&&ta.setContext(self),this.setAnimationLoop=function(T){et=T,ne.setAnimationLoop(T),T===null?ta.stop():ta.start()},ne.addEventListener("sessionstart",Xn),ne.addEventListener("sessionend",ku),this.render=function(T,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(_===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),ne.enabled===!0&&ne.isPresenting===!0&&(ne.cameraAutoUpdate===!0&&ne.updateCamera(U),U=ne.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,U,R),p=Ee.get(T,y.length),p.init(U),y.push(p),Z.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),ht.setFromProjectionMatrix(Z,Rn,U.reversedDepth),q=this.localClippingEnabled,Ze=ie.init(this.clippingPlanes,q),m=W.get(T,v.length),m.init(),v.push(m),ne.enabled===!0&&ne.isPresenting===!0){let ee=x.xr.getDepthSensingMesh();ee!==null&&Bl(ee,U,-1/0,x.sortObjects)}Bl(T,U,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(Q,ce),qe=ne.enabled===!1||ne.isPresenting===!1||ne.hasDepthSensing()===!1,qe&&we.addToRenderList(m,T),this.info.render.frame++,Ze===!0&&ie.beginShadows();let V=p.state.shadowsArray;_e.render(V,T,U),Ze===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset();let G=m.opaque,B=m.transmissive;if(p.setupLights(),U.isArrayCamera){let ee=U.cameras;if(B.length>0)for(let oe=0,me=ee.length;oe<me;oe++){let ue=ee[oe];Lu(G,B,T,ue)}qe&&we.render(T);for(let oe=0,me=ee.length;oe<me;oe++){let ue=ee[oe];Fu(m,T,ue,ue.viewport)}}else B.length>0&&Lu(G,B,T,U),qe&&we.render(T),Fu(m,T,U);R!==null&&E===0&&(Ve.updateMultisampleRenderTarget(R),Ve.updateRenderTargetMipmap(R)),T.isScene===!0&&T.onAfterRender(x,T,U),re.resetDefaultState(),M=-1,w=null,y.pop(),y.length>0?(p=y[y.length-1],Ze===!0&&ie.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function Bl(T,U,V,G){if(T.visible===!1)return;if(T.layers.test(U.layers)){if(T.isGroup)V=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(U);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||ht.intersectsSprite(T)){G&&Le.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Z);let oe=z.update(T),me=T.material;me.visible&&m.push(T,oe,me,V,Le.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||ht.intersectsObject(T))){let oe=z.update(T),me=T.material;if(G&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Le.copy(T.boundingSphere.center)):(oe.boundingSphere===null&&oe.computeBoundingSphere(),Le.copy(oe.boundingSphere.center)),Le.applyMatrix4(T.matrixWorld).applyMatrix4(Z)),Array.isArray(me)){let ue=oe.groups;for(let Ce=0,ke=ue.length;Ce<ke;Ce++){let Te=ue[Ce],We=me[Te.materialIndex];We&&We.visible&&m.push(T,oe,We,V,Le.z,Te)}}else me.visible&&m.push(T,oe,me,V,Le.z,null)}}let ee=T.children;for(let oe=0,me=ee.length;oe<me;oe++)Bl(ee[oe],U,V,G)}function Fu(T,U,V,G){let B=T.opaque,ee=T.transmissive,oe=T.transparent;p.setupLightsView(V),Ze===!0&&ie.setGlobalState(x.clippingPlanes,V),G&&ve.viewport(I.copy(G)),B.length>0&&no(B,U,V),ee.length>0&&no(ee,U,V),oe.length>0&&no(oe,U,V),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function Lu(T,U,V,G){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new pn(1,1,{generateMipmaps:!0,type:Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float")?ai:jn,minFilter:zn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ge.workingColorSpace}));let ee=p.state.transmissionRenderTarget[G.id],oe=G.viewport||I;ee.setSize(oe.z*x.transmissionResolutionScale,oe.w*x.transmissionResolutionScale);let me=x.getRenderTarget(),ue=x.getActiveCubeFace(),Ce=x.getActiveMipmapLevel();x.setRenderTarget(ee),x.getClearColor(N),O=x.getClearAlpha(),O<1&&x.setClearColor(16777215,.5),x.clear(),qe&&we.render(V);let ke=x.toneMapping;x.toneMapping=Ai;let Te=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),Ze===!0&&ie.setGlobalState(x.clippingPlanes,G),no(T,V,G),Ve.updateMultisampleRenderTarget(ee),Ve.updateRenderTargetMipmap(ee),Be.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let st=0,vt=U.length;st<vt;st++){let ut=U[st],rt=ut.object,Re=ut.geometry,bt=ut.material,Qe=ut.group;if(bt.side===Nt&&rt.layers.test(G.layers)){let _n=bt.side;bt.side=Vt,bt.needsUpdate=!0,Nu(rt,V,G,Re,bt,Qe),bt.side=_n,bt.needsUpdate=!0,We=!0}}We===!0&&(Ve.updateMultisampleRenderTarget(ee),Ve.updateRenderTargetMipmap(ee))}x.setRenderTarget(me,ue,Ce),x.setClearColor(N,O),Te!==void 0&&(G.viewport=Te),x.toneMapping=ke}function no(T,U,V){let G=U.isScene===!0?U.overrideMaterial:null;for(let B=0,ee=T.length;B<ee;B++){let oe=T[B],me=oe.object,ue=oe.geometry,Ce=oe.group,ke=oe.material;ke.allowOverride===!0&&G!==null&&(ke=G),me.layers.test(V.layers)&&Nu(me,U,V,ue,ke,Ce)}}function Nu(T,U,V,G,B,ee){T.onBeforeRender(x,U,V,G,B,ee),T.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),B.onBeforeRender(x,U,V,G,T,ee),B.transparent===!0&&B.side===Nt&&B.forceSinglePass===!1?(B.side=Vt,B.needsUpdate=!0,x.renderBufferDirect(V,U,G,B,T,ee),B.side=Yt,B.needsUpdate=!0,x.renderBufferDirect(V,U,G,B,T,ee),B.side=Nt):x.renderBufferDirect(V,U,G,B,T,ee),T.onAfterRender(x,U,V,G,B,ee)}function io(T,U,V){U.isScene!==!0&&(U=Ae);let G=ye.get(T),B=p.state.lights,ee=p.state.shadowsArray,oe=B.state.version,me=X.getParameters(T,B.state,ee,U,V),ue=X.getProgramCacheKey(me),Ce=G.programs;G.environment=T.isMeshStandardMaterial?U.environment:null,G.fog=U.fog,G.envMap=(T.isMeshStandardMaterial?Mt:Dt).get(T.envMap||G.environment),G.envMapRotation=G.environment!==null&&T.envMap===null?U.environmentRotation:T.envMapRotation,Ce===void 0&&(T.addEventListener("dispose",K),Ce=new Map,G.programs=Ce);let ke=Ce.get(ue);if(ke!==void 0){if(G.currentProgram===ke&&G.lightsStateVersion===oe)return Bu(T,me),ke}else me.uniforms=X.getUniforms(T),T.onBeforeCompile(me,x),ke=X.acquireProgram(me,ue),Ce.set(ue,ke),G.uniforms=me.uniforms;let Te=G.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Te.clippingPlanes=ie.uniform),Bu(T,me),G.needsLights=vb(T),G.lightsStateVersion=oe,G.needsLights&&(Te.ambientLightColor.value=B.state.ambient,Te.lightProbe.value=B.state.probe,Te.directionalLights.value=B.state.directional,Te.directionalLightShadows.value=B.state.directionalShadow,Te.spotLights.value=B.state.spot,Te.spotLightShadows.value=B.state.spotShadow,Te.rectAreaLights.value=B.state.rectArea,Te.ltc_1.value=B.state.rectAreaLTC1,Te.ltc_2.value=B.state.rectAreaLTC2,Te.pointLights.value=B.state.point,Te.pointLightShadows.value=B.state.pointShadow,Te.hemisphereLights.value=B.state.hemi,Te.directionalShadowMap.value=B.state.directionalShadowMap,Te.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Te.spotShadowMap.value=B.state.spotShadowMap,Te.spotLightMatrix.value=B.state.spotLightMatrix,Te.spotLightMap.value=B.state.spotLightMap,Te.pointShadowMap.value=B.state.pointShadowMap,Te.pointShadowMatrix.value=B.state.pointShadowMatrix),G.currentProgram=ke,G.uniformsList=null,ke}function Uu(T){if(T.uniformsList===null){let U=T.currentProgram.getUniforms();T.uniformsList=xs.seqWithValue(U.seq,T.uniforms)}return T.uniformsList}function Bu(T,U){let V=ye.get(T);V.outputColorSpace=U.outputColorSpace,V.batching=U.batching,V.batchingColor=U.batchingColor,V.instancing=U.instancing,V.instancingColor=U.instancingColor,V.instancingMorph=U.instancingMorph,V.skinning=U.skinning,V.morphTargets=U.morphTargets,V.morphNormals=U.morphNormals,V.morphColors=U.morphColors,V.morphTargetsCount=U.morphTargetsCount,V.numClippingPlanes=U.numClippingPlanes,V.numIntersection=U.numClipIntersection,V.vertexAlphas=U.vertexAlphas,V.vertexTangents=U.vertexTangents,V.toneMapping=U.toneMapping}function gb(T,U,V,G,B){U.isScene!==!0&&(U=Ae),Ve.resetTextureUnits();let ee=U.fog,oe=G.isMeshStandardMaterial?U.environment:null,me=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:jt,ue=(G.isMeshStandardMaterial?Mt:Dt).get(G.envMap||oe),Ce=G.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,ke=!!V.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Te=!!V.morphAttributes.position,We=!!V.morphAttributes.normal,st=!!V.morphAttributes.color,vt=Ai;G.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(vt=x.toneMapping);let ut=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,rt=ut!==void 0?ut.length:0,Re=ye.get(G),bt=p.state.lights;if(Ze===!0&&(q===!0||T!==w)){let tn=T===w&&G.id===M;ie.setState(G,T,tn)}let Qe=!1;G.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==bt.state.version||Re.outputColorSpace!==me||B.isBatchedMesh&&Re.batching===!1||!B.isBatchedMesh&&Re.batching===!0||B.isBatchedMesh&&Re.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Re.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Re.instancing===!1||!B.isInstancedMesh&&Re.instancing===!0||B.isSkinnedMesh&&Re.skinning===!1||!B.isSkinnedMesh&&Re.skinning===!0||B.isInstancedMesh&&Re.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Re.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Re.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Re.instancingMorph===!1&&B.morphTexture!==null||Re.envMap!==ue||G.fog===!0&&Re.fog!==ee||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==ie.numPlanes||Re.numIntersection!==ie.numIntersection)||Re.vertexAlphas!==Ce||Re.vertexTangents!==ke||Re.morphTargets!==Te||Re.morphNormals!==We||Re.morphColors!==st||Re.toneMapping!==vt||Re.morphTargetsCount!==rt)&&(Qe=!0):(Qe=!0,Re.__version=G.version);let _n=Re.currentProgram;Qe===!0&&(_n=io(G,U,B));let Fa=!1,Mn=!1,Us=!1,gt=_n.getUniforms(),En=Re.uniforms;if(ve.useProgram(_n.program)&&(Fa=!0,Mn=!0,Us=!0),G.id!==M&&(M=G.id,Mn=!0),Fa||w!==T){ve.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),gt.setValue(k,"projectionMatrix",T.projectionMatrix),gt.setValue(k,"viewMatrix",T.matrixWorldInverse);let ln=gt.map.cameraPosition;ln!==void 0&&ln.setValue(k,pe.setFromMatrixPosition(T.matrixWorld)),De.logarithmicDepthBuffer&&gt.setValue(k,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&gt.setValue(k,"isOrthographic",T.isOrthographicCamera===!0),w!==T&&(w=T,Mn=!0,Us=!0)}if(B.isSkinnedMesh){gt.setOptional(k,B,"bindMatrix"),gt.setOptional(k,B,"bindMatrixInverse");let tn=B.skeleton;tn&&(tn.boneTexture===null&&tn.computeBoneTexture(),gt.setValue(k,"boneTexture",tn.boneTexture,Ve))}B.isBatchedMesh&&(gt.setOptional(k,B,"batchingTexture"),gt.setValue(k,"batchingTexture",B._matricesTexture,Ve),gt.setOptional(k,B,"batchingIdTexture"),gt.setValue(k,"batchingIdTexture",B._indirectTexture,Ve),gt.setOptional(k,B,"batchingColorTexture"),B._colorsTexture!==null&&gt.setValue(k,"batchingColorTexture",B._colorsTexture,Ve));let An=V.morphAttributes;if((An.position!==void 0||An.normal!==void 0||An.color!==void 0)&&te.update(B,V,_n),(Mn||Re.receiveShadow!==B.receiveShadow)&&(Re.receiveShadow=B.receiveShadow,gt.setValue(k,"receiveShadow",B.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(En.envMap.value=ue,En.flipEnvMap.value=ue.isCubeTexture&&ue.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&U.environment!==null&&(En.envMapIntensity.value=U.environmentIntensity),Mn&&(gt.setValue(k,"toneMappingExposure",x.toneMappingExposure),Re.needsLights&&xb(En,Us),ee&&G.fog===!0&&Y.refreshFogUniforms(En,ee),Y.refreshMaterialUniforms(En,G,H,J,p.state.transmissionRenderTarget[T.id]),xs.upload(k,Uu(Re),En,Ve)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(xs.upload(k,Uu(Re),En,Ve),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&gt.setValue(k,"center",B.center),gt.setValue(k,"modelViewMatrix",B.modelViewMatrix),gt.setValue(k,"normalMatrix",B.normalMatrix),gt.setValue(k,"modelMatrix",B.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){let tn=G.uniformsGroups;for(let ln=0,Ol=tn.length;ln<Ol;ln++){let na=tn[ln];je.update(na,_n),je.bind(na,_n)}}return _n}function xb(T,U){T.ambientLightColor.needsUpdate=U,T.lightProbe.needsUpdate=U,T.directionalLights.needsUpdate=U,T.directionalLightShadows.needsUpdate=U,T.pointLights.needsUpdate=U,T.pointLightShadows.needsUpdate=U,T.spotLights.needsUpdate=U,T.spotLightShadows.needsUpdate=U,T.rectAreaLights.needsUpdate=U,T.hemisphereLights.needsUpdate=U}function vb(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(T,U,V){let G=ye.get(T);G.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),ye.get(T.texture).__webglTexture=U,ye.get(T.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:V,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,U){let V=ye.get(T);V.__webglFramebuffer=U,V.__useDefaultFramebuffer=U===void 0};let yb=k.createFramebuffer();this.setRenderTarget=function(T,U=0,V=0){R=T,S=U,E=V;let G=!0,B=null,ee=!1,oe=!1;if(T){let ue=ye.get(T);if(ue.__useDefaultFramebuffer!==void 0)ve.bindFramebuffer(k.FRAMEBUFFER,null),G=!1;else if(ue.__webglFramebuffer===void 0)Ve.setupRenderTarget(T);else if(ue.__hasExternalTextures)Ve.rebindTextures(T,ye.get(T.texture).__webglTexture,ye.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let Te=T.depthTexture;if(ue.__boundDepthTexture!==Te){if(Te!==null&&ye.has(Te)&&(T.width!==Te.image.width||T.height!==Te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ve.setupDepthRenderbuffer(T)}}let Ce=T.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(oe=!0);let ke=ye.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(ke[U])?B=ke[U][V]:B=ke[U],ee=!0):T.samples>0&&Ve.useMultisampledRTT(T)===!1?B=ye.get(T).__webglMultisampledFramebuffer:Array.isArray(ke)?B=ke[V]:B=ke,I.copy(T.viewport),P.copy(T.scissor),F=T.scissorTest}else I.copy(xe).multiplyScalar(H).floor(),P.copy(Ue).multiplyScalar(H).floor(),F=at;if(V!==0&&(B=yb),ve.bindFramebuffer(k.FRAMEBUFFER,B)&&G&&ve.drawBuffers(T,B),ve.viewport(I),ve.scissor(P),ve.setScissorTest(F),ee){let ue=ye.get(T.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+U,ue.__webglTexture,V)}else if(oe){let ue=U;for(let Ce=0;Ce<T.textures.length;Ce++){let ke=ye.get(T.textures[Ce]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+Ce,ke.__webglTexture,V,ue)}}else if(T!==null&&V!==0){let ue=ye.get(T.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,ue.__webglTexture,V)}M=-1},this.readRenderTargetPixels=function(T,U,V,G,B,ee,oe,me=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ue=ye.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&oe!==void 0&&(ue=ue[oe]),ue){ve.bindFramebuffer(k.FRAMEBUFFER,ue);try{let Ce=T.textures[me],ke=Ce.format,Te=Ce.type;if(!De.textureFormatReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!De.textureTypeReadable(Te)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=T.width-G&&V>=0&&V<=T.height-B&&(T.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+me),k.readPixels(U,V,G,B,Se.convert(ke),Se.convert(Te),ee))}finally{let Ce=R!==null?ye.get(R).__webglFramebuffer:null;ve.bindFramebuffer(k.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(T,U,V,G,B,ee,oe,me=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ue=ye.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&oe!==void 0&&(ue=ue[oe]),ue)if(U>=0&&U<=T.width-G&&V>=0&&V<=T.height-B){ve.bindFramebuffer(k.FRAMEBUFFER,ue);let Ce=T.textures[me],ke=Ce.format,Te=Ce.type;if(!De.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!De.textureTypeReadable(Te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let We=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,We),k.bufferData(k.PIXEL_PACK_BUFFER,ee.byteLength,k.STREAM_READ),T.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+me),k.readPixels(U,V,G,B,Se.convert(ke),Se.convert(Te),0);let st=R!==null?ye.get(R).__webglFramebuffer:null;ve.bindFramebuffer(k.FRAMEBUFFER,st);let vt=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await pp(k,vt,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,We),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,ee),k.deleteBuffer(We),k.deleteSync(vt),ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,U=null,V=0){let G=Math.pow(2,-V),B=Math.floor(T.image.width*G),ee=Math.floor(T.image.height*G),oe=U!==null?U.x:0,me=U!==null?U.y:0;Ve.setTexture2D(T,0),k.copyTexSubImage2D(k.TEXTURE_2D,V,0,0,oe,me,B,ee),ve.unbindTexture()};let _b=k.createFramebuffer(),Mb=k.createFramebuffer();this.copyTextureToTexture=function(T,U,V=null,G=null,B=0,ee=null){ee===null&&(B!==0?(ts("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ee=B,B=0):ee=0);let oe,me,ue,Ce,ke,Te,We,st,vt,ut=T.isCompressedTexture?T.mipmaps[ee]:T.image;if(V!==null)oe=V.max.x-V.min.x,me=V.max.y-V.min.y,ue=V.isBox3?V.max.z-V.min.z:1,Ce=V.min.x,ke=V.min.y,Te=V.isBox3?V.min.z:0;else{let An=Math.pow(2,-B);oe=Math.floor(ut.width*An),me=Math.floor(ut.height*An),T.isDataArrayTexture?ue=ut.depth:T.isData3DTexture?ue=Math.floor(ut.depth*An):ue=1,Ce=0,ke=0,Te=0}G!==null?(We=G.x,st=G.y,vt=G.z):(We=0,st=0,vt=0);let rt=Se.convert(U.format),Re=Se.convert(U.type),bt;U.isData3DTexture?(Ve.setTexture3D(U,0),bt=k.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Ve.setTexture2DArray(U,0),bt=k.TEXTURE_2D_ARRAY):(Ve.setTexture2D(U,0),bt=k.TEXTURE_2D),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,U.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,U.unpackAlignment);let Qe=k.getParameter(k.UNPACK_ROW_LENGTH),_n=k.getParameter(k.UNPACK_IMAGE_HEIGHT),Fa=k.getParameter(k.UNPACK_SKIP_PIXELS),Mn=k.getParameter(k.UNPACK_SKIP_ROWS),Us=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,ut.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ut.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Ce),k.pixelStorei(k.UNPACK_SKIP_ROWS,ke),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Te);let gt=T.isDataArrayTexture||T.isData3DTexture,En=U.isDataArrayTexture||U.isData3DTexture;if(T.isDepthTexture){let An=ye.get(T),tn=ye.get(U),ln=ye.get(An.__renderTarget),Ol=ye.get(tn.__renderTarget);ve.bindFramebuffer(k.READ_FRAMEBUFFER,ln.__webglFramebuffer),ve.bindFramebuffer(k.DRAW_FRAMEBUFFER,Ol.__webglFramebuffer);for(let na=0;na<ue;na++)gt&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ye.get(T).__webglTexture,B,Te+na),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ye.get(U).__webglTexture,ee,vt+na)),k.blitFramebuffer(Ce,ke,oe,me,We,st,oe,me,k.DEPTH_BUFFER_BIT,k.NEAREST);ve.bindFramebuffer(k.READ_FRAMEBUFFER,null),ve.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(B!==0||T.isRenderTargetTexture||ye.has(T)){let An=ye.get(T),tn=ye.get(U);ve.bindFramebuffer(k.READ_FRAMEBUFFER,_b),ve.bindFramebuffer(k.DRAW_FRAMEBUFFER,Mb);for(let ln=0;ln<ue;ln++)gt?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,An.__webglTexture,B,Te+ln):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,An.__webglTexture,B),En?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,tn.__webglTexture,ee,vt+ln):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,tn.__webglTexture,ee),B!==0?k.blitFramebuffer(Ce,ke,oe,me,We,st,oe,me,k.COLOR_BUFFER_BIT,k.NEAREST):En?k.copyTexSubImage3D(bt,ee,We,st,vt+ln,Ce,ke,oe,me):k.copyTexSubImage2D(bt,ee,We,st,Ce,ke,oe,me);ve.bindFramebuffer(k.READ_FRAMEBUFFER,null),ve.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else En?T.isDataTexture||T.isData3DTexture?k.texSubImage3D(bt,ee,We,st,vt,oe,me,ue,rt,Re,ut.data):U.isCompressedArrayTexture?k.compressedTexSubImage3D(bt,ee,We,st,vt,oe,me,ue,rt,ut.data):k.texSubImage3D(bt,ee,We,st,vt,oe,me,ue,rt,Re,ut):T.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,ee,We,st,oe,me,rt,Re,ut.data):T.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,ee,We,st,ut.width,ut.height,rt,ut.data):k.texSubImage2D(k.TEXTURE_2D,ee,We,st,oe,me,rt,Re,ut);k.pixelStorei(k.UNPACK_ROW_LENGTH,Qe),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,_n),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Fa),k.pixelStorei(k.UNPACK_SKIP_ROWS,Mn),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Us),ee===0&&U.generateMipmaps&&k.generateMipmap(bt),ve.unbindTexture()},this.initRenderTarget=function(T){ye.get(T).__webglFramebuffer===void 0&&Ve.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Ve.setTextureCube(T,0):T.isData3DTexture?Ve.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Ve.setTexture2DArray(T,0):Ve.setTexture2D(T,0),ve.unbindTexture()},this.resetState=function(){S=0,E=0,R=null,ve.reset(),re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ge._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ge._getUnpackColorSpace()}};function xd(a,e){if(e===Xh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),a;if(e===ms||e===Dr){let t=a.getIndex();if(t===null){let r=[],o=a.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)r.push(c);a.setIndex(r),t=a.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),a}let n=t.count-2,i=[];if(e===ms)for(let r=1;r<=n;r++)i.push(t.getX(0)),i.push(t.getX(r)),i.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(i.push(t.getX(r)),i.push(t.getX(r+1)),i.push(t.getX(r+2))):(i.push(t.getX(r+2)),i.push(t.getX(r+1)),i.push(t.getX(r)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=a.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),a}var el=class extends ni{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Ed(t)}),this.register(function(t){return new Ad(t)}),this.register(function(t){return new Ld(t)}),this.register(function(t){return new Nd(t)}),this.register(function(t){return new Ud(t)}),this.register(function(t){return new Rd(t)}),this.register(function(t){return new Cd(t)}),this.register(function(t){return new Id(t)}),this.register(function(t){return new Pd(t)}),this.register(function(t){return new Sd(t)}),this.register(function(t){return new Dd(t)}),this.register(function(t){return new Td(t)}),this.register(function(t){return new Fd(t)}),this.register(function(t){return new kd(t)}),this.register(function(t){return new Md(t)}),this.register(function(t){return new Bd(t)}),this.register(function(t){return new Od(t)})}load(e,t,n,i){let s=this,r;if(this.resourcePath!=="")r=this.resourcePath;else if(this.path!==""){let l=Ei.extractUrlBase(e);r=Ei.resolveURL(l,this.path)}else r=Ei.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){i?i(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new hs(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,r,function(d){t(d),s.manager.itemEnd(e)},o)}catch(d){o(d)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s,r={},o={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Yp){try{r[He.KHR_BINARY_GLTF]=new zd(e)}catch(h){i&&i(h);return}s=JSON.parse(r[He.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new qd(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let d=0;d<this.pluginCallbacks.length;d++){let h=this.pluginCallbacks[d](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,r[h.name]=!0}if(s.extensionsUsed)for(let d=0;d<s.extensionsUsed.length;++d){let h=s.extensionsUsed[d],u=s.extensionsRequired||[];switch(h){case He.KHR_MATERIALS_UNLIT:r[h]=new wd;break;case He.KHR_DRACO_MESH_COMPRESSION:r[h]=new jd(s,this.dracoLoader);break;case He.KHR_TEXTURE_TRANSFORM:r[h]=new Vd;break;case He.KHR_MESH_QUANTIZATION:r[h]=new Gd;break;default:u.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(r),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}};function o_(){let a={};return{get:function(e){return a[e]},add:function(e,t){a[e]=t},remove:function(e){delete a[e]},removeAll:function(){a={}}}}var He={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Md=class{constructor(e){this.parser=e,this.name=He.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],l,d=new Me(16777215);c.color!==void 0&&d.setRGB(c.color[0],c.color[1],c.color[2],jt);let h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Si(d),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new va(d),l.distance=h;break;case"spot":l=new xa(d),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),ri(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},wd=class{constructor(){this.name=He.KHR_MATERIALS_UNLIT}getMaterialType(){return Bn}extendParams(e,t,n){let i=[];e.color=new Me(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let r=s.baseColorFactor;e.color.setRGB(r[0],r[1],r[2],jt),e.opacity=r[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,wt))}return Promise.all(i)}},Sd=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}},Ed=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];if(r.clearcoatFactor!==void 0&&(t.clearcoat=r.clearcoatFactor),r.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",r.clearcoatTexture)),r.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=r.clearcoatRoughnessFactor),r.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",r.clearcoatRoughnessTexture)),r.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",r.clearcoatNormalTexture)),r.clearcoatNormalTexture.scale!==void 0)){let o=r.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new be(o,o)}return Promise.all(s)}},Ad=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gn}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}},Td=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];return r.iridescenceFactor!==void 0&&(t.iridescence=r.iridescenceFactor),r.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",r.iridescenceTexture)),r.iridescenceIor!==void 0&&(t.iridescenceIOR=r.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),r.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=r.iridescenceThicknessMinimum),r.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=r.iridescenceThicknessMaximum),r.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",r.iridescenceThicknessTexture)),Promise.all(s)}},Rd=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[];t.sheenColor=new Me(0,0,0),t.sheenRoughness=0,t.sheen=1;let r=i.extensions[this.name];if(r.sheenColorFactor!==void 0){let o=r.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],jt)}return r.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=r.sheenRoughnessFactor),r.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",r.sheenColorTexture,wt)),r.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",r.sheenRoughnessTexture)),Promise.all(s)}},Cd=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];return r.transmissionFactor!==void 0&&(t.transmission=r.transmissionFactor),r.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",r.transmissionTexture)),Promise.all(s)}},Id=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];t.thickness=r.thicknessFactor!==void 0?r.thicknessFactor:0,r.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",r.thicknessTexture)),t.attenuationDistance=r.attenuationDistance||1/0;let o=r.attenuationColor||[1,1,1];return t.attenuationColor=new Me().setRGB(o[0],o[1],o[2],jt),Promise.all(s)}},Pd=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gn}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}},Dd=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];t.specularIntensity=r.specularFactor!==void 0?r.specularFactor:1,r.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",r.specularTexture));let o=r.specularColorFactor||[1,1,1];return t.specularColor=new Me().setRGB(o[0],o[1],o[2],jt),r.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",r.specularColorTexture,wt)),Promise.all(s)}},kd=class{constructor(e){this.parser=e,this.name=He.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];return t.bumpScale=r.bumpFactor!==void 0?r.bumpFactor:1,r.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",r.bumpTexture)),Promise.all(s)}},Fd=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];return r.anisotropyStrength!==void 0&&(t.anisotropy=r.anisotropyStrength),r.anisotropyRotation!==void 0&&(t.anisotropyRotation=r.anisotropyRotation),r.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",r.anisotropyTexture)),Promise.all(s)}},Ld=class{constructor(e){this.parser=e,this.name=He.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let s=i.extensions[this.name],r=t.options.ktx2Loader;if(!r){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,r)}},Nd=class{constructor(e){this.parser=e,this.name=He.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let r=s.extensions[t],o=i.images[r.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,r.source,c)}},Ud=class{constructor(e){this.parser=e,this.name=He.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let r=s.extensions[t],o=i.images[r.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,r.source,c)}},Bd=class{constructor(e){this.name=He.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),r=this.parser.options.meshoptDecoder;if(!r||!r.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){let c=i.byteOffset||0,l=i.byteLength||0,d=i.count,h=i.byteStride,u=new Uint8Array(o,c,l);return r.decodeGltfBufferAsync?r.decodeGltfBufferAsync(d,h,u,i.mode,i.filter).then(function(f){return f.buffer}):r.ready.then(function(){let f=new ArrayBuffer(d*h);return r.decodeGltfBuffer(new Uint8Array(f),d,h,u,i.mode,i.filter),f})})}else return null}},Od=class{constructor(e){this.name=He.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==In.TRIANGLES&&l.mode!==In.TRIANGLE_STRIP&&l.mode!==In.TRIANGLE_FAN&&l.mode!==void 0)return null;let r=n.extensions[this.name].attributes,o=[],c={};for(let l in r)o.push(this.parser.getDependency("accessor",r[l]).then(d=>(c[l]=d,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let d=l.pop(),h=d.isGroup?d.children:[d],u=l[0].count,f=[];for(let b of h){let g=new he,m=new C,p=new rn,v=new C(1,1,1),y=new sr(b.geometry,b.material,u);for(let x=0;x<u;x++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,x),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,x),c.SCALE&&v.fromBufferAttribute(c.SCALE,x),y.setMatrixAt(x,g.compose(m,p,v));for(let x in c)if(x==="_COLOR_0"){let _=c[x];y.instanceColor=new Qn(_.array,_.itemSize,_.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&b.geometry.setAttribute(x,c[x]);mt.prototype.copy.call(y,b),this.parser.assignFinalMaterial(y),f.push(y)}return d.isGroup?(d.clear(),d.add(...f),d):f[0]}))}},Yp="glTF",Lr=12,Xp={JSON:1313821514,BIN:5130562},zd=class{constructor(e){this.name=He.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Lr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Yp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-Lr,s=new DataView(e,Lr),r=0;for(;r<i;){let o=s.getUint32(r,!0);r+=4;let c=s.getUint32(r,!0);if(r+=4,c===Xp.JSON){let l=new Uint8Array(e,Lr+r,o);this.content=n.decode(l)}else if(c===Xp.BIN){let l=Lr+r;this.body=e.slice(l,l+o)}r+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},jd=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=He.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,r=e.extensions[this.name].attributes,o={},c={},l={};for(let d in r){let h=Wd[d]||d.toLowerCase();o[h]=r[d]}for(let d in e.attributes){let h=Wd[d]||d.toLowerCase();if(r[d]!==void 0){let u=n.accessors[e.attributes[d]],f=ys[u.componentType];l[h]=f.name,c[h]=u.normalized===!0}}return t.getDependency("bufferView",s).then(function(d){return new Promise(function(h,u){i.decodeDracoFile(d,function(f){for(let b in f.attributes){let g=f.attributes[b],m=c[b];m!==void 0&&(g.normalized=m)}h(f)},o,l,jt,u)})})}},Vd=class{constructor(){this.name=He.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Gd=class{constructor(){this.name=He.KHR_MESH_QUANTIZATION}},tl=class extends yi{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let r=0;r!==i;r++)t[r]=n[s+r];return t}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,d=i-t,h=(n-t)/d,u=h*h,f=u*h,b=e*l,g=b-l,m=-2*f+3*u,p=f-u,v=1-m,y=p-u+h;for(let x=0;x!==o;x++){let _=r[g+x+o],S=r[g+x+c]*d,E=r[b+x+o],R=r[b+x]*d;s[x]=v*_+y*S+m*E+p*R}return s}},c_=new rn,Hd=class extends tl{interpolate_(e,t,n,i){let s=super.interpolate_(e,t,n,i);return c_.fromArray(s).normalize().toArray(s),s}},In={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ys={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},qp={9728:zt,9729:an,9984:uc,9985:ds,9986:Ma,9987:zn},Kp={33071:Jn,33648:Qa,10497:ji},vd={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Wd={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Wi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},l_={CUBICSPLINE:void 0,LINEAR:fa,STEP:ua},yd={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function h_(a){return a.DefaultMaterial===void 0&&(a.DefaultMaterial=new vi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Yt})),a.DefaultMaterial}function Ra(a,e,t){for(let n in t.extensions)a[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ri(a,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(a.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function d_(a,e,t){let n=!1,i=!1,s=!1;for(let l=0,d=e.length;l<d;l++){let h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(a);let r=[],o=[],c=[];for(let l=0,d=e.length;l<d;l++){let h=e[l];if(n){let u=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):a.attributes.position;r.push(u)}if(i){let u=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):a.attributes.normal;o.push(u)}if(s){let u=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):a.attributes.color;c.push(u)}}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(c)]).then(function(l){let d=l[0],h=l[1],u=l[2];return n&&(a.morphAttributes.position=d),i&&(a.morphAttributes.normal=h),s&&(a.morphAttributes.color=u),a.morphTargetsRelative=!0,a})}function u_(a,e){if(a.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)a.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(a.morphTargetInfluences.length===t.length){a.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)a.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function f_(a){let e,t=a.extensions&&a.extensions[He.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+_d(t.attributes):e=a.indices+":"+_d(a.attributes)+":"+a.mode,a.targets!==void 0)for(let n=0,i=a.targets.length;n<i;n++)e+=":"+_d(a.targets[n]);return e}function _d(a){let e="",t=Object.keys(a).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+a[t[n]]+";";return e}function Xd(a){switch(a){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function p_(a){return a.search(/\.jpe?g($|\?)/i)>0||a.search(/^data\:image\/jpeg/)===0?"image/jpeg":a.search(/\.webp($|\?)/i)>0||a.search(/^data\:image\/webp/)===0?"image/webp":a.search(/\.ktx2($|\?)/i)>0||a.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var m_=new he,qd=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new o_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,r=-1;if(typeof navigator<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,s=o.indexOf("Firefox")>-1,r=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&r<98?this.textureLoader=new gr(this.options.manager):this.textureLoader=new _r(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new hs(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(r){return r._markDefs&&r._markDefs()}),Promise.all(this._invokeAll(function(r){return r.beforeRoot&&r.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(r){let o={scene:r[0][i.scene||0],scenes:r[0],animations:r[1],cameras:r[2],asset:i.asset,parser:n,userData:{}};return Ra(s,o,i),ri(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){let r=t[i].joints;for(let o=0,c=r.length;o<c;o++)e[r[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){let r=e[i];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),s=(r,o)=>{let c=this.associations.get(r);c!=null&&this.associations.set(o,c);for(let[l,d]of r.children.entries())s(d,o.children[l])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[He.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(s,r){n.load(Ei.resolveURL(t.uri,i.path),s,void 0,function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let r=vd[i.type],o=ys[i.componentType],c=i.normalized===!0,l=new o(i.count*r);return Promise.resolve(new Ke(l,r,c))}let s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(r){let o=r[0],c=vd[i.type],l=ys[i.componentType],d=l.BYTES_PER_ELEMENT,h=d*c,u=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,b=i.normalized===!0,g,m;if(f&&f!==h){let p=Math.floor(u/f),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count,y=t.cache.get(v);y||(g=new l(o,p*f,i.count*f/d),y=new ss(g,f/d),t.cache.add(v,y)),m=new rs(y,c,u%f/d,b)}else o===null?g=new l(i.count*c):g=new l(o,u,i.count*c),m=new Ke(g,c,b);if(i.sparse!==void 0){let p=vd.SCALAR,v=ys[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,x=i.sparse.values.byteOffset||0,_=new v(r[1],y,i.sparse.count*p),S=new l(r[2],x,i.sparse.count*c);o!==null&&(m=new Ke(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let E=0,R=_.length;E<R;E++){let M=_[E];if(m.setX(M,S[E*c]),c>=2&&m.setY(M,S[E*c+1]),c>=3&&m.setZ(M,S[E*c+2]),c>=4&&m.setW(M,S[E*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=b}return m})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,r=t.images[s],o=this.textureLoader;if(r.uri){let c=n.manager.getHandler(r.uri);c!==null&&(o=c)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){let i=this,s=this.json,r=s.textures[e],o=s.images[t],c=(o.uri||o.bufferView)+":"+r.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(d){d.flipY=!1,d.name=r.name||o.name||"",d.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(d.name=o.uri);let u=(s.samplers||{})[r.sampler]||{};return d.magFilter=qp[u.magFilter]||an,d.minFilter=qp[u.minFilter]||zn,d.wrapS=Kp[u.wrapS]||ji,d.wrapT=Kp[u.wrapT]||ji,d.generateMipmaps=!d.isCompressedTexture&&d.minFilter!==zt&&d.minFilter!==an,i.associations.set(d,{textures:e}),d}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let r=i.images[e],o=self.URL||self.webkitURL,c=r.uri||"",l=!1;if(r.bufferView!==void 0)c=n.getDependency("bufferView",r.bufferView).then(function(h){l=!0;let u=new Blob([h],{type:r.mimeType});return c=o.createObjectURL(u),c});else if(r.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let d=Promise.resolve(c).then(function(h){return new Promise(function(u,f){let b=u;t.isImageBitmapLoader===!0&&(b=function(g){let m=new Ft(g);m.needsUpdate=!0,u(m)}),t.load(Ei.resolveURL(h,s.path),b,void 0,f)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),ri(h,r),h.userData.mimeType=r.mimeType||p_(r.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=d,d}assignTexture(e,t,n,i){let s=this;return this.getDependency("texture",n.index).then(function(r){if(!r)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(r=r.clone(),r.channel=n.texCoord),s.extensions[He.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[He.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=s.associations.get(r);r=s.extensions[He.KHR_TEXTURE_TRANSFORM].extendTexture(r,o),s.associations.set(r,c)}}return i!==void 0&&(r.colorSpace=i),e[t]=r,r})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,r=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new ls,bn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new cs,bn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||s||r){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),r&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),s&&(c.vertexColors=!0),r&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return vi}loadMaterial(e){let t=this,n=this.json,i=this.extensions,s=n.materials[e],r,o={},c=s.extensions||{},l=[];if(c[He.KHR_MATERIALS_UNLIT]){let h=i[He.KHR_MATERIALS_UNLIT];r=h.getMaterialType(),l.push(h.extendParams(o,s,t))}else{let h=s.pbrMetallicRoughness||{};if(o.color=new Me(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){let u=h.baseColorFactor;o.color.setRGB(u[0],u[1],u[2],jt),o.opacity=u[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",h.baseColorTexture,wt)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),r=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=Nt);let d=s.alphaMode||yd.OPAQUE;if(d===yd.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,d===yd.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&r!==Bn&&(l.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new be(1,1),s.normalTexture.scale!==void 0)){let h=s.normalTexture.scale;o.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&r!==Bn&&(l.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&r!==Bn){let h=s.emissiveFactor;o.emissive=new Me().setRGB(h[0],h[1],h[2],jt)}return s.emissiveTexture!==void 0&&r!==Bn&&l.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,wt)),Promise.all(l).then(function(){let h=new r(o);return s.name&&(h.name=s.name),ri(h,s),t.associations.set(h,{materials:e}),s.extensions&&Ra(i,h,s),h})}createUniqueName(e){let t=ot.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[He.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Jp(c,o,t)})}let r=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],d=f_(l),h=i[d];if(h)r.push(h.promise);else{let u;l.extensions&&l.extensions[He.KHR_DRACO_MESH_COMPRESSION]?u=s(l):u=Jp(new St,l,t),i[d]={primitive:l,promise:u},r.push(u)}}return Promise.all(r)}loadMesh(e){let t=this,n=this.json,i=this.extensions,s=n.meshes[e],r=s.primitives,o=[];for(let c=0,l=r.length;c<l;c++){let d=r[c].material===void 0?h_(this.cache):this.getDependency("material",r[c].material);o.push(d)}return o.push(t.loadGeometries(r)),Promise.all(o).then(function(c){let l=c.slice(0,c.length-1),d=c[c.length-1],h=[];for(let f=0,b=d.length;f<b;f++){let g=d[f],m=r[f],p,v=l[f];if(m.mode===In.TRIANGLES||m.mode===In.TRIANGLE_STRIP||m.mode===In.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new ir(g,v):new tt(g,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===In.TRIANGLE_STRIP?p.geometry=xd(p.geometry,Dr):m.mode===In.TRIANGLE_FAN&&(p.geometry=xd(p.geometry,ms));else if(m.mode===In.LINES)p=new or(g,v);else if(m.mode===In.LINE_STRIP)p=new ma(g,v);else if(m.mode===In.LINE_LOOP)p=new cr(g,v);else if(m.mode===In.POINTS)p=new ba(g,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&u_(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),ri(p,s),m.extensions&&Ra(i,p,m),t.assignFinalMaterial(p),h.push(p)}for(let f=0,b=h.length;f<b;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return s.extensions&&Ra(i,h[0],s),h[0];let u=new un;s.extensions&&Ra(i,u,s),t.associations.set(u,{meshes:e});for(let f=0,b=h.length;f<b;f++)u.add(h[f]);return u})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Tt(Ut.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new wi(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ri(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let s=i.pop(),r=i,o=[],c=[];for(let l=0,d=r.length;l<d;l++){let h=r[l];if(h){o.push(h);let u=new he;s!==null&&u.fromArray(s.array,l*16),c.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new ar(o,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,r=[],o=[],c=[],l=[],d=[];for(let h=0,u=i.channels.length;h<u;h++){let f=i.channels[h],b=i.samplers[f.sampler],g=f.target,m=g.node,p=i.parameters!==void 0?i.parameters[b.input]:b.input,v=i.parameters!==void 0?i.parameters[b.output]:b.output;g.node!==void 0&&(r.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",v)),l.push(b),d.push(g))}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(d)]).then(function(h){let u=h[0],f=h[1],b=h[2],g=h[3],m=h[4],p=[];for(let y=0,x=u.length;y<x;y++){let _=u[y],S=f[y],E=b[y],R=g[y],M=m[y];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();let w=n._createAnimationTracks(_,S,E,R,M);if(w)for(let I=0;I<w.length;I++)p.push(w[I])}let v=new br(s,void 0,p);return ri(v,i),v})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){let r=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&r.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),r})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),r=[],o=i.children||[];for(let l=0,d=o.length;l<d;l++)r.push(n.getDependency("node",o[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(r),c]).then(function(l){let d=l[0],h=l[1],u=l[2];u!==null&&d.traverse(function(f){f.isSkinnedMesh&&f.bind(u,m_)});for(let f=0,b=h.length;f<b;f++)d.add(h[f]);return d})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],r=s.name?i.createUniqueName(s.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(l){return i._getNodeRef(i.cameraCache,s.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let d;if(s.isBone===!0?d=new os:l.length>1?d=new un:l.length===1?d=l[0]:d=new mt,d!==l[0])for(let h=0,u=l.length;h<u;h++)d.add(l[h]);if(s.name&&(d.userData.name=s.name,d.name=r),ri(d,s),s.extensions&&Ra(n,d,s),s.matrix!==void 0){let h=new he;h.fromArray(s.matrix),d.applyMatrix4(h)}else s.translation!==void 0&&d.position.fromArray(s.translation),s.rotation!==void 0&&d.quaternion.fromArray(s.rotation),s.scale!==void 0&&d.scale.fromArray(s.scale);if(!i.associations.has(d))i.associations.set(d,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){let h=i.associations.get(d);i.associations.set(d,{...h})}return i.associations.get(d).nodes=e,d}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,s=new un;n.name&&(s.name=i.createUniqueName(n.name)),ri(s,n),n.extensions&&Ra(t,s,n);let r=n.nodes||[],o=[];for(let c=0,l=r.length;c<l;c++)o.push(i.getDependency("node",r[c]));return Promise.all(o).then(function(c){for(let d=0,h=c.length;d<h;d++)s.add(c[d]);let l=d=>{let h=new Map;for(let[u,f]of i.associations)(u instanceof bn||u instanceof Ft)&&h.set(u,f);return d.traverse(u=>{let f=i.associations.get(u);f!=null&&h.set(u,f)}),h};return i.associations=l(s),s})}_createAnimationTracks(e,t,n,i,s){let r=[],o=e.name?e.name:e.uuid,c=[];Wi[s.path]===Wi.weights?e.traverse(function(u){u.morphTargetInfluences&&c.push(u.name?u.name:u.uuid)}):c.push(o);let l;switch(Wi[s.path]){case Wi.weights:l=$n;break;case Wi.rotation:l=ei;break;case Wi.translation:case Wi.scale:l=ti;break;default:switch(n.itemSize){case 1:l=$n;break;case 2:case 3:default:l=ti;break}break}let d=i.interpolation!==void 0?l_[i.interpolation]:fa,h=this._getArrayFromAccessor(n);for(let u=0,f=c.length;u<f;u++){let b=new l(c[u]+"."+Wi[s.path],t.array,h,d);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(b),r.push(b)}return r}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Xd(t.constructor),i=new Float32Array(t.length);for(let s=0,r=t.length;s<r;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof ei?Hd:tl;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function b_(a,e,t){let n=e.attributes,i=new Xe;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new C(c[0],c[1],c[2]),new C(l[0],l[1],l[2])),o.normalized){let d=Xd(ys[o.componentType]);i.min.multiplyScalar(d),i.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let o=new C,c=new C;for(let l=0,d=s.length;l<d;l++){let h=s[l];if(h.POSITION!==void 0){let u=t.json.accessors[h.POSITION],f=u.min,b=u.max;if(f!==void 0&&b!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(b[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(b[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(b[2]))),u.normalized){let g=Xd(ys[u.componentType]);c.multiplyScalar(g)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}a.boundingBox=i;let r=new yt;i.getCenter(r.center),r.radius=i.min.distanceTo(i.max)/2,a.boundingSphere=r}function Jp(a,e,t){let n=e.attributes,i=[];function s(r,o){return t.getDependency("accessor",r).then(function(c){a.setAttribute(o,c)})}for(let r in n){let o=Wd[r]||r.toLowerCase();o in a.attributes||i.push(s(n[r],o))}if(e.indices!==void 0&&!a.index){let r=t.getDependency("accessor",e.indices).then(function(o){a.setIndex(o)});i.push(r)}return Ge.workingColorSpace!==jt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ge.workingColorSpace}" not supported.`),ri(a,e),b_(a,e,t),Promise.all(i).then(function(){return e.targets!==void 0?d_(a,e.targets,t):a})}var Zp={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var Ci=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},g_=new wi(-1,1,1,-1,0,1),Kd=class extends St{constructor(){super(),this.setAttribute("position",new Ct([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ct([0,2,0,0,2,0],2))}},x_=new Kd,nl=class{constructor(e){this._mesh=new tt(x_,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,g_)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Xi=class extends Ci{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Lt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=qc.clone(e.uniforms),this.material=new Lt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new nl(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Nr=class extends Ci{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let r,o;this.inverse?(r=0,o=1):(r=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,r,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}},il=class extends Ci{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var al=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new be);this._width=n.width,this._height=n.height,t=new pn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ai}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Xi(Zp),this.copyPass.material.blending=On,this.clock=new Mr}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let i=0,s=this.passes.length;i<s;i++){let r=this.passes[i];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Nr!==void 0&&(r instanceof Nr?n=!0:r instanceof il&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new be);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var sl=class extends Ci{constructor(e,t,n=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Me}render(e,t,n){let i=e.autoClear;e.autoClear=!1;let s,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),e.autoClear=i}};var _s=`
uniform sampler2D uMap,uEmit;
uniform float uMode,uTime,uA,uB,uC,uEmission,uCell;
uniform vec3 uOrigin;
varying vec3 vP,vN,vBary;
varying vec2 vUv;
varying vec3 vAffine;
float hash(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
vec3 studio(vec3 r,float rough){
 float top=pow(max(0.,dot(r,normalize(vec3(-.5,1.,.5)))),mix(80.,3.,rough));
 float strip=pow(max(0.,1.-abs(r.x-.45)),mix(120.,8.,rough))*smoothstep(-.6,.1,r.y);
 float side=pow(max(0.,dot(r,normalize(vec3(-1.,.2,.3)))),mix(100.,5.,rough));
 float panel=exp(-pow((r.x-.25)/mix(.14,.6,rough),4.)-pow((r.y-.15)/.8,4.))*smoothstep(.1,.6,r.z);
 float opposite=exp(-pow((r.x+.6)/mix(.12,.5,rough),4.)-pow((r.y+.1)/.6,4.))*smoothstep(.1,.5,r.z);
 return mix(vec3(.008,.012,.02),vec3(.09,.12,.15),r.y*.5+.5)+top*vec3(2.8,2.7,2.5)+strip*vec3(1.8,2.1,2.5)+side*vec3(2.,1.1,.5)+panel*vec3(2.2,2.2,2.15)+opposite*vec3(1.4,.8,.4);
}
float lines(float x,float width){float d=abs(fract(x)-.5);return 1.-smoothstep(width,width+fwidth(x),d);}
void main(){
 vec2 uv=vUv;if(uMode==7.)uv=mix(uv,vAffine.xy/vAffine.z,uC);
 vec3 base=texture2D(uMap,uv).rgb;vec3 emit=texture2D(uEmit,uv).rgb;
 vec3 n=normalize(vN);vec3 fn=normalize(cross(dFdx(vP),dFdy(vP)));if(dot(fn,n)<0.)fn=-fn;
 float facet=0.;if(uMode==1.||uMode==21.)facet=uA;if(uMode==5.||uMode==7.)facet=1.;if(uMode==18.)facet=uC;
 n=normalize(mix(n,fn,facet));
 vec3 view=normalize(cameraPosition-vP);float fres=pow(1.-abs(dot(n,view)),3.);
 float grain=noise(vP*230.)-.5;float key=max(0.,dot(n,normalize(vec3(-2.,3.,4.))));float fill=max(0.,dot(n,normalize(vec3(3.,2.,1.))));
 float shade=.2+key*.88+fill*.24;
 vec3 light=vec3(.17,.19,.23)+key*vec3(1.05,.86,.69)+fill*vec3(.24,.31,.48);
 vec3 col=base*light;float alpha=1.;float shine=pow(max(0.,dot(n,normalize(view+normalize(vec3(-2.,3.,4.))))),45.);
 if(uMode==1.){col=base*mix(vec3(shade),light*vec3(1.25,.88,.57),uB)*(1.+grain*uC*.3);}
 if(uMode==2.){float cavity=.76+.24*pow(max(.001,dot(base,vec3(.2126,.7152,.0722))),.22);base=mix(vec3(.28,.3,.31),vec3(.48,.4,.3),uA);col=base*(mix(shade,.18+shade*.65,uB)+grain*uC*.15)*cavity;emit*=0.;}
 if(uMode==3.){vec3 q=(vP-uOrigin)/uCell;vec3 an=abs(n);vec2 g=an.y>max(an.x,an.z)?q.xz:an.x>an.z?q.yz:q.xy;vec2 edge=min(fract(g),1.-fract(g));float fw=max(fwidth(g.x),fwidth(g.y));float seam=(1.-smoothstep(.025,.025+fw*.5,min(edge.x,edge.y)))*(1.-smoothstep(.48,1.3,fw));col*=1.-seam*uA*.7;col*=mix(vec3(1),vec3(1.18,.86,.65),uB);col+=fres*uC*vec3(.35,.2,.1);emit*=1.-seam*uA*.5;}
 if(uMode==4.){float band=floor(clamp(shade,0.,1.)*uA)/max(1.,uA-1.);float l=dot(base,vec3(.2126,.7152,.0722));col=mix(vec3(l),base,uC)*(.25+band*.85);}
 if(uMode==5.){vec3 paper=vec3(.72,.57,.38);col=mix(paper,base*.8+paper*.25,uC)*shade*(1.+grain*uB*.5);vec3 aa=fwidth(vBary);float edge=1.-min(min(smoothstep(vec3(0),aa*1.2,vBary).x,smoothstep(vec3(0),aa*1.2,vBary).y),smoothstep(vec3(0),aa*1.2,vBary).z);col*=1.-edge*uA*.32;emit*=.5;}
 if(uMode==8.){float rings=sin((vP.x+vP.y*.4+noise(vP*9.)*.1)*240.);vec3 clay=mix(base,vec3(.4,.26,.14),.15+uC*.15);col=clay*(shade+grain*.2+rings*.035*uA);emit*=.65;}
 if(uMode==9.||uMode==10.){float l=dot(base,vec3(.2126,.7152,.0722));col=uMode==10.?vec3(.35+l*.5)*shade:mix(vec3(l),base,uC)*shade;}
 if(uMode==11.){col=mix(vec3(.6,.52,.4),base,.7)*(.55+shade*.5)*(1.+(noise(vP*25.)-.5)*uA*.55);emit*=.55;}
 if(uMode==12.){col=base*shade;}
 if(uMode==13.){vec3 aa=fwidth(vBary)*uA;vec3 e=smoothstep(vec3(0),aa,vBary);float line=1.-min(e.x,min(e.y,e.z));col=vec3(1.,.32,.035)*line*(1.+uB*3.)+base*uC*.2;alpha=max(line,uC);emit*=0.;}
 if(uMode==14.){float d=length(gl_PointCoord-.5)*2.;if(d>1.)discard;vec3 split=mix(vec3(.04,.3,.9),vec3(1.,.4,.06),smoothstep(-.7,.6,vP.x));col=mix(base*.9+emit*2.,split,uC)*1.3;alpha=(1.-smoothstep(.45,1.,d))*.85;}
 if(uMode==15.){float scan=.5+.5*sin(vP.y*480.);float beam=pow(.5+.5*sin(vP.y*7.-uTime*(.3+uC*2.)),18.);col=vec3(.02,.65,1.1)*(.13+fres*uB*3.+scan*uA*.3+beam*.6);alpha=.24+fres*.65;emit*=.12;}
 if(uMode==16.){vec3 env=studio(reflect(-view,n),.3+uA*.7);vec3 tint=mix(vec3(.7,.74,.76),vec3(.3,.65,.8),uC);col=tint*(.08+shade*.18)+env*(.12+fres*.55);alpha=clamp(1.-uB*.7+fres*.5,.25,1.);emit*=.35;}
 if(uMode==17.){vec3 ripple=vec3(sin(vP.y*25.+uTime*uC),sin(vP.z*30.+uTime*uC*1.3),cos(vP.x*22.+uTime*uC));n=normalize(n+ripple*uB*.08);col=studio(reflect(-view,n),uA)*(.65+fres*.4);emit*=.6;}
 if(uMode==18.){float vein=pow(1.-abs(sin((vP.y+noise(vP*5.)*.4)*95.)),18.);col=vec3(.008,.012,.017)*shade+studio(reflect(-view,n),.2)*(fres*.13+.012)*uA+vec3(.24,.17,.1)*vein*uB*.3;}
 if(uMode==19.){vec3 porcelain=mix(vec3(.65,.61,.5),base*.7+vec3(.15),uC);float crack=pow(1.-abs(sin((vP.x+vP.y+noise(vP*35.)*.04)*480.)),25.);col=porcelain*shade*(1.-crack*uB*.25)+studio(reflect(-view,n),.12)*(fres*.35+.035)*uA;emit*=.5;}
 if(uMode==20.){float pulse=1.+sin(uTime*1.7)*uC*.25;col=base*vec3(.16,.08,.3)*shade+fres*mix(vec3(.02,.8,1.),vec3(1.,.015,.5),smoothstep(-.6,.6,vP.x))*uA*2.*pulse;emit=mix(emit*vec3(1.4,.1,.9),vec3(.02,.5,.8)*length(emit),step(vP.x,0.))*pulse;}
 if(uMode==21.){col=vec3(.022,.024,.027)*shade+studio(reflect(-view,n),.55)*(fres*.11+.015)*uB;col*=mix(vec3(1),vec3(1.3,.91,.58),uC);}
 if(uMode==22.){col=vec3(.009+uC*.028)*shade+studio(reflect(-view,n),.2+uB*.55)*(fres*.1+.022)*uA;}
 if(uMode!=14.)col+=emit*uEmission;
 gl_FragColor=vec4(max(col,vec3(0)),alpha);
}`,Qp="varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}",$p=`
uniform sampler2D uScene;uniform vec2 uResolution;uniform float uDpr,uMode,uA,uB,uC,uExposure,uTransparent;
varying vec2 vUv;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
vec3 tone(vec3 c){c*=uExposure;return pow(clamp((c*(2.51*c+.03))/(c*(2.43*c+.59)+.14),0.,1.),vec3(1./2.2));}
float lum(vec3 c){return dot(c,vec3(.2126,.7152,.0722));}
vec3 sampleColor(vec2 p){return tone(texture2D(uScene,p).rgb);}
void main(){vec2 uv=vUv;vec2 px=1./uResolution;float pixel=uMode==6.?uA*uDpr:uMode==7.?max(1.,uDpr*2.):1.;if(pixel>1.)uv=(floor(uv*uResolution/pixel)+.5)*pixel/uResolution;
 vec4 raw=texture2D(uScene,uv);vec3 col=tone(raw.rgb);float grain=hash(gl_FragCoord.xy)-.5;
 float edge=0.;if(uMode==4.||uMode==9.||uMode==10.||uMode==11.){vec3 l=sampleColor(uv-vec2(px.x,0)*1.4*uDpr),r=sampleColor(uv+vec2(px.x,0)*1.4*uDpr),t=sampleColor(uv+vec2(0,px.y)*1.4*uDpr),b=sampleColor(uv-vec2(0,px.y)*1.4*uDpr);edge=length(l-r)+length(t-b);}
 if(uMode==4.)col*=1.-clamp(edge*uB*2.5,0.,.9);
 if(uMode==6.||uMode==7.){float levels=uMode==6.?uB:mix(32.,5.,uB);vec2 ip=floor(uv*uResolution/pixel);float d=mod(ip.x+mod(ip.y,2.)*2.,4.)/4.-.375;col=floor(clamp(col+d/levels*(uMode==6.?uC:.65),0.,1.)*levels+.5)/levels;}
 if(uMode==9.||uMode==10.){vec2 p=gl_FragCoord.xy/uDpr;float l=lum(col);float h1=step(.63,fract((p.x+p.y)/5.)),h2=step(.72,fract((p.x-p.y)/6.));float hatch=h1*(1.-smoothstep(.25,.85,l))+h2*(1.-smoothstep(.1,.55,l));float ink=uMode==9.?uA:uA*.75;col*=1.-clamp(edge*ink*2.5,0.,.94);col*=1.-hatch*uB*.55;if(uMode==10.)col=mix(vec3(.94,.92,.87),vec3(.16,.15,.14),clamp((1.-lum(col))*(.65+uA*.7),0.,1.));col+=grain*(uMode==10.?uC:.3)*.12;}
 if(uMode==11.){vec2 d=vec2(px.x,px.y)*(1.+uB*5.)*uDpr;vec3 bleed=(sampleColor(uv+d)+sampleColor(uv-d)+sampleColor(uv+vec2(d.x,-d.y))+sampleColor(uv+vec2(-d.x,d.y)))*.25;col=mix(col,bleed,uB*.5);col=mix(col,vec3(.94,.9,.8),.17);col*=1.-clamp(edge*uA*.4,0.,.25);col+=grain*uC*.14;}
 if(uMode==12.){vec3 shifted=sampleColor(uv+vec2(uB*5.*uDpr,0)*px);float orange=clamp((shifted.r-shifted.b)*2.,0.,1.);float dark=1.-lum(col);vec2 p=fract(gl_FragCoord.xy/(uA*uDpr))-.5;float dotMask=1.-smoothstep(sqrt(max(.01,dark))*.48,sqrt(max(.01,dark))*.48+.06,length(p));vec3 paper=vec3(.92,.86,.73),blue=vec3(.07,.17,.28),warm=vec3(.86,.28,.09);col=mix(paper,mix(blue,warm,orange),dotMask*(.35+uC*.65));col+=grain*.05;}
 if(uMode==3.||uMode==13.||uMode==14.||uMode==15.||uMode==20.){vec3 bloom=vec3(0);for(int x=-1;x<=1;x++){for(int y=-1;y<=1;y++){vec3 s=texture2D(uScene,uv+vec2(float(x),float(y))*px*4.*uDpr).rgb;bloom+=max(s-vec3(.75),vec3(0));}}col+=bloom/9.*.055*(uTransparent>.5?0.:1.);}
 gl_FragColor=vec4(clamp(col,0.,1.),raw.a);
}`;var v_=_s.slice(_s.indexOf("float hash("),_s.indexOf("void main(){")),Ii=_s.slice(_s.indexOf(" float facet=0.;"));Ii=Ii.replace(/ float grain=noise[\s\S]*?vec3 col=base\*light;/," float grain=noise(vP*230.)-.5;vec3 col=base*light;");Ii=Ii.replace("n=normalize(mix(n,fn,facet));","n=normalize(mix(n,fn,facet));float fg=mix(1.,clamp((.25+max(0.,dot(n,uKeyDir)))/(.25+max(0.,dot(normalize(vN),uKeyDir))),.3,2.),facet);light*=fg;shade*=fg;").replaceAll("vN","vStudioNormal");Ii=Ii.replace("gl_FragColor=vec4(max(col,vec3(0)),alpha);","return vec4(max(col,vec3(0)),alpha);");Ii=Ii.replace(" if(uMode!=14.)col+=emit*uEmission;",`
 if(uMode==23.){float hatch=lines((vP.x+vP.y*.6)*75.,.12);col=vec3(.52,.22,.09)*shade*(1.-hatch*.28)+studio(reflect(-view,n),.45)*(.035+fres*.2);}
 if(uMode==24.){col=vec3(.25+dot(base,vec3(.2126,.7152,.0722))*.6)*shade;}
 if(uMode==25.){vec3 iridescence=.5+.5*cos(vec3(.1,2.2,4.4)+fres*7.+vP.y*.3);col=vec3(.35,.34,.32)*shade+studio(reflect(-view,n),.32)*(.04+fres*.16)+iridescence*fres*uA*.7;}
 if(uMode==26.){col=vec3(.3+dot(base,vec3(.2126,.7152,.0722))*.7)*shade;}
 if(uMode==27.){float brushing=noise(vec3(vP.x*550.,vP.y*5.,vP.z*8.));n=normalize(n+vec3((brushing-.5)*.08,0.,0.));col=vec3(.10,.13,.17)*shade+studio(reflect(-view,n),.35)*(.24+fres*.25)*(1.-brushing*.16);}
 if(uMode==28.){float relief=lines((vP.y+noise(vP*5.)*.012)*95.,.18);col=vec3(.32,.30,.27)*shade*(.82+relief*.16)+studio(reflect(-view,n),.26)*(.055+fres*.2);}
 // Reflective and emissive families retain the chosen lighting's intensity/tint.
 if(uMode==13.||uMode==15.||uMode>=16.&&uMode<=22.||uMode==25.||uMode==27.||uMode==28.)col*=mix(vec3(1.),uRigTint,.65)*clamp(uRigEnergy,.28,1.7);
 if(uMode!=14.)col+=emit*uEmission;
`);var em=(v_+`vec4 atlasSurface(float uMode,float uA,float uB,float uC,vec3 base,vec3 emit,vec3 n,vec3 light,float shade){
 vec3 fn=normalize(cross(dFdx(vP),dFdy(vP)));if(dot(fn,n)<0.)fn=-fn;
`+Ii).replaceAll("vP","vStudio").replaceAll("vBary","vStudioBary").replace(/\bhash\(/g,"atlasHash(").replace(/\bnoise\(/g,"atlasNoise(").replace(/\bstudio\(/g,"atlasReflections(").replace(/\blines\(/g,"atlasLines("),tm=$p.replace("uniform sampler2D uScene;","uniform sampler2D uScene;uniform float uFade;").replace("void main(){vec2 uv=vUv;","void main(){vec2 uv=vUv;").replace("vec4 raw=texture2D(uScene,uv);","vec4 raw=texture2D(uScene,uv);if(raw.a<.001){gl_FragColor=vec4(0.);return;}").replace(" gl_FragColor=vec4(clamp(col,0.,1.),raw.a);",`
 if(uMode==24.){float l=lum(col);vec2 p=gl_FragCoord.xy/uDpr;float h=step(.75,fract((p.x+p.y)/5.));l*=1.-h*(1.-l)*.32;col=mix(vec3(.015,.055,.15),vec3(.80,.90,.94),smoothstep(.05,.95,l));}
 if(uMode==26.){float l=lum(col);vec2 p=fract(gl_FragCoord.xy/(uA*uDpr))-.5;float dotMask=1.-smoothstep(sqrt(max(.01,1.-l))*.48,sqrt(max(.01,1.-l))*.48+.07,length(p));col=mix(vec3(.85,.82,.76),vec3(.022,.025,.03),dotMask);}
 float coverage=smoothstep(0.,.65,raw.a);
 gl_FragColor=vec4(clamp(col*uFade,0.,1.)*coverage,coverage);
`);var rl=class extends Xi{constructor(e){super({uniforms:{...e,uScene:{value:null},uResolution:{value:new be(1,1)},uDpr:{value:1},uTransparent:{value:0}},vertexShader:Qp,fragmentShader:tm},"uScene"),Object.assign(this.uniforms,e),this.material.depthWrite=!1,this.material.depthTest=!1}setSize(e,t){this.uniforms.uResolution.value.set(e,t)}};var CE=(function(){var a="b9H79Tebbbe9ok9Geueu9Geub9Gbb9Gruuuuuuueu9Gvuuuuueu9Gduueu9Gluuuueu9Gvuuuuub9Gouuuuuub9Gluuuub9Giuuueui8AYdilveoveovrrwrrDDoDrbqqbelve9Weiiviebeoweuec;G:Qdkr:nlAo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8F9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949c919M9MWV9mW4W2be8A9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949c919M9MWVbd8F9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949c919M9MWV9c9V919U9KbiE9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949wWV79P9V9UblY9TW79O9V9Wt9FW9U9J9V9KW69U9KW949c919M9MWVbv8E9TW79O9V9Wt9FW9U9J9V9KW69U9KW949c919M9MWV9c9V919U9Kbo8A9TW79O9V9Wt9FW9U9J9V9KW69U9KW949wWV79P9V9UbrE9TW79O9V9Wt9FW9U9J9V9KW69U9KW949tWG91W9U9JWbwa9TW79O9V9Wt9FW9U9J9V9KW69U9KW949tWG91W9U9JW9c9V919U9KbDL9TW79O9V9Wt9FW9U9J9V9KWS9P2tWV9p9JtbqK9TW79O9V9Wt9FW9U9J9V9KWS9P2tWV9r919HtbkL9TW79O9V9Wt9FW9U9J9V9KWS9P2tWVT949WbxE9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94J9H9J9OWbsa9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94J9H9J9OW9ttV9P9Wbza9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94SWt9J9O9sW9T9H9WbHK9TW79O9V9Wt9F79W9Ht9P9H29t9VVt9sW9T9H9WbOl79IV9RbCDwebcekdKLqN9OYdbk:Bhdhud9:8Jjjjjbc;qw9Rgr8KjjjjbcbhwdnaeTmbabcbyd;C:kjjbaoaocb9iEgDc:GeV86bbarc;adfcbcjdz:wjjjb8AdnaiTmbarc;adfadalz:vjjjb8Akarc;abfalfcbcbcjdal9RalcFe0Ez:wjjjb8Aarc;abfarc;adfalz:vjjjb8AarcUf9cb83ibarc8Wf9cb83ibarcyf9cb83ibarcaf9cb83ibarcKf9cb83ibarczf9cb83ibar9cb83iwar9cb83ibcj;abal9Uc;WFbGcjdalca0Ehqdnaicd6mbavcd9imbaDTmbadcefhkaqci2gxal2hmarc;alfclfhParc;qlfceVhsarc;qofclVhzarc;qofcKfhHarc;qofczfhOcbhAincdhCcbhodnavci6mbaH9cb83ibaO9cb83ibar9cb83i;yoar9cb83i;qoadaAfgoybbhXcbhQincbhwcbhLdninaoalfhKaoybbgYaX7aLVhLawcP0meaKhoaYhXawcefgwaQfai6mbkkcbhXarc;qofhwincwh8AcwhEdnaLaX93gocFeGg3cs0mbclhEa3ci0mba3cb9hcethEkdnaocw4cFeGg3cs0mbclh8Aa3ci0mba3cb9hceth8Aka8AaEfh3awydbh5cwh8AcwhEdnaocz4cFeGg8Ecs0mbclhEa8Eci0mba8Ecb9hcethEka3a5fh3dnaocFFFFb0mbclh8AaocFFF8F0mbaocFFFr0ceth8Akawa3aEfa8AfBdbawclfhwaXcefgXcw9hmbkaKhoaYhXaQczfgQai6mbkcbhocehwazhLinawaoaLydbarc;qofaocdtfydb6EhoaLclfhLawcefgwcw9hmbkcihCkcbh3arc;qlfcbcjdz:wjjjb8Aarc;alfcwfcbBdbar9cb83i;alaoclth8Fadhaaqhhakh5inarc;qlfadcba3cufgoaoa30Eal2falz:vjjjb8Aaiahaiah6Ehgdnaqaia39Ra3aqfai6EgYcsfc9WGgoaY9nmbarc;qofaYfcbaoaY9Rz:wjjjb8Akada3al2fh8Jcbh8Kina8Ka8FVcl4hQarc;alfa8Kcdtfh8LaAh8Mcbh8Nina8NaAfhwdndndndndndna8KPldebidkasa8Mc98GgLfhoa5aLfh8Aarc;qlfawc98GgLfRbbhXcwhwinaoRbbawtaXVhXaocefhoawcwfgwca9hmbkaYTmla8Ncith8Ea8JaLfhEcbhKinaERbbhLcwhoa8AhwinawRbbaotaLVhLawcefhwaocwfgoca9hmbkarc;qofaKfaLaX7aQ93a8E486bba8Aalfh8AaEalfhEaLhXaKcefgKaY9hmbxlkkaYTmia8Mc9:Ghoa8NcitcwGhEarc;qlfawceVfRbbcwtarc;qlfawc9:GfRbbVhLarc;qofhwaghXinawa5aofRbbcwtaaaofRbbVg8AaL9RgLcetaLcztcz91cs47cFFiGaE486bbaoalfhoawcefhwa8AhLa3aXcufgX9hmbxikkaYTmda8Jawfhoarc;qlfawfRbbhLarc;qofhwaghXinawaoRbbg8AaL9RgLcetaLcKtcK91cr4786bbawcefhwaoalfhoa8AhLa3aXcufgX9hmbxdkkaYTmeka8LydbhEcbhKarc;qofhoincdhLcbhwinaLaoawfRbbcb9hfhLawcefgwcz9hmbkclhXcbhwinaXaoawfRbbcd0fhXawcefgwcz9hmbkcwh8Acbhwina8AaoawfRbbcP0fh8Aawcefgwcz9hmbkaLaXaLaX6Egwa8Aawa8A6Egwczawcz6EaEfhEaoczfhoaKczfgKaY6mbka8LaEBdbka8Mcefh8Ma8Ncefg8Ncl9hmbka8Kcefg8KaC9hmbkaaamfhaahaxfhha5amfh5a3axfg3ai6mbkcbhocehwaPhLinawaoaLydbarc;alfaocdtfydb6EhoaLclfhLawcefgXhwaCaX9hmbkaraAcd4fa8FcdVaoaocdSE86bbaAclfgAal6mbkkabaefh8Kabcefhoalcd4gecbaDEhkadcefhOarc;abfceVhHcbhmdndninaiam9nmearc;qofcbcjdz:wjjjb8Aa8Kao9Rak6mdadamal2gwfhxcbh8JaOawfhzaocbakz:wjjjbghakfh5aqaiam9Ramaqfai6Egscsfgocl4cifcd4hCaoc9WGg8LThPindndndndndndndndndndnaDTmbara8Jcd4fRbbgLciGPlbedlbkasTmdaxa8Jfhoarc;abfa8JfRbbhLarc;qofhwashXinawaoRbbg8AaL9RgLcetaLcKtcK91cr4786bbawcefhwaoalfhoa8AhLaXcufgXmbxikkasTmia8JcitcwGhEarc;abfa8JceVfRbbcwtarc;abfa8Jc9:GgofRbbVhLaxaofhoarc;qofhwashXinawao8Vbbg8AaL9RgLcetaLcztcz91cs47cFFiGaE486bbawcefhwaoalfhoa8AhLaXcufgXmbxdkkaHa8Jc98GgEfhoazaEfh8Aarc;abfaEfRbbhXcwhwinaoRbbawtaXVhXaocefhoawcwfgwca9hmbkasTmbaLcl4hYa8JcitcKGh3axaEfhEcbhKinaERbbhLcwhoa8AhwinawRbbaotaLVhLawcefhwaocwfgoca9hmbkarc;qofaKfaLaX7aY93a3486bba8Aalfh8AaEalfhEaLhXaKcefgKas9hmbkkaDmbcbhoxlka8LTmbcbhodninarc;qofaofgwcwf8Pibaw8Pib:e9qTmeaoczfgoa8L9pmdxbkkdnavmbcehoxikcbhEaChKaChYinarc;qofaEfgocwf8Pibhyao8Pibh8PcdhLcbhwinaLaoawfRbbcb9hfhLawcefgwcz9hmbkclhXcbhwinaXaoawfRbbcd0fhXawcefgwcz9hmbkcwh8Acbhwina8AaoawfRbbcP0fh8Aawcefgwcz9hmbkaLaXaLaX6Egoa8Aaoa8A6Egoczaocz6EaYfhYaocucbaya8P:e9cb9sEgwaoaw6EaKfhKaEczfgEa8L9pmdxbkkaha8Jcd4fgoaoRbbcda8JcetcoGtV86bbxikdnaKas6mbaYas6mbaha8Jcd4fgoaoRbbcia8JcetcoGtV86bba8Ka59Ras6mra5arc;qofasz:vjjjbasfh5xikaKaY9phokaha8Jcd4fgwawRbbaoa8JcetcoGtV86bbka8Ka59RaC6mla5cbaCz:wjjjbgAaCfhYdndna8LmbaPhoxekdna8KaY9RcK9pmbaPhoxekaocdtc:q1jjbfcj1jjbaDEg5ydxggcetc;:FFFeGh8Fcuh3cuagtcu7cFeGhacbh8Marc;qofhLinarc;qofa8MfhQczhEdndndnagPDbeeeeeeedekcucbaQcwf8PibaQ8Pib:e9cb9sEhExekcbhoa8FhEinaEaaaLaofRbb9nfhEaocefgocz9hmbkkcih8Ecbh8Ainczhwdndndna5a8AcdtfydbgKPDbeeeeeeedekcucbaQcwf8PibaQ8Pib:e9cb9sEhwxekaKcetc;:FFFeGhwcuaKtcu7cFeGhXcbhoinawaXaLaofRbb9nfhwaocefgocz9hmbkkdndnawaE6mbaKa39hmeawaE9hmea5a8EcdtfydbcwSmeka8Ah8EawhEka8Acefg8Aci9hmbkaAa8Mco4fgoaoRbba8Ea8Mci4coGtV86bbdndndna5a8Ecdtfydbg3PDdbbbbbbbebkdncwa39Tg8ETmbcua3tcu7hwdndna3ceSmbcbh8NaLhQinaQhoa8Eh8AcbhXinaoRbbgEawcFeGgKaEaK6EaXa3tVhXaocefhoa8Acufg8AmbkaYaX86bbaQa8EfhQaYcefhYa8Na8Efg8Ncz6mbxdkkcbh8NaLhQinaQhoa8Eh8AcbhXinaoRbbgEawcFeGgKaEaK6EaXcetVhXaocefhoa8Acufg8AmbkaYaX:T9cFe:d9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:9ca188bbaQa8EfhQaYcefhYa8Na8Efg8Ncz6mbkkcbhoinaYaLaofRbbgX86bbaYaXawcFeG9pfhYaocefgocz9hmbxikkdna3ceSmbinaYcb86bbaYcefhYxbkkinaYcb86bbaYcefhYxbkkaYaQ8Pbb83bbaYcwfaQcwf8Pbb83bbaYczfhYka8Mczfg8Ma8L9pgomeaLczfhLa8KaY9RcK9pmbkkaoTmlaYh5aYTmlka8Jcefg8Jal9hmbkarc;abfaxascufal2falz:vjjjb8Aasamfhma5hoa5mbkcbhwxdkdna8Kao9RakalfgwcKcaaDEgLawaL0EgX9pmbcbhwxdkdnawaL9pmbaocbaXaw9Rgwz:wjjjbawfhokaoarc;adfalz:vjjjbalfhodnaDTmbaoaraez:vjjjbaefhokaoab9Rhwxekcbhwkarc;qwf8Kjjjjbawk5babaeadaialcdcbyd;C:kjjbz:bjjjbk9reduaecd4gdaefgicaaica0Eabcj;abae9Uc;WFbGcjdaeca0Egifcufai9Uae2aiadfaicl4cifcd4f2fcefkmbcbabBd;C:kjjbk:Ese5u8Jjjjjbc;ae9Rgl8Kjjjjbcbhvdnaici9UgocHfae0mbabcbyd;m:kjjbgrc;GeV86bbalc;abfcFecjez:wjjjb8AalcUfgw9cu83ibalc8WfgD9cu83ibalcyfgq9cu83ibalcafgk9cu83ibalcKfgx9cu83ibalczfgm9cu83ibal9cu83iwal9cu83ibabaefc9WfhPabcefgsaofhednaiTmbcmcsarcb9kgzEhHcbhOcbhAcbhCcbhXcbhQindnaeaP9nmbcbhvxikaQcufhvadaCcdtfgLydbhKaLcwfydbhYaLclfydbh8AcbhEdndndninalc;abfavcsGcitfgoydlh3dndndnaoydbgoaK9hmba3a8ASmekdnaoa8A9hmba3aY9hmbaEcefhExekaoaY9hmea3aK9hmeaEcdfhEkaEc870mdaXcufhvaLaEciGcx2goc;i1jjbfydbcdtfydbh3aLaoc;e1jjbfydbcdtfydbh8AaLaoc;a1jjbfydbcdtfydbhKcbhodnindnalavcsGcdtfydba39hmbaohYxdkcuhYavcufhvaocefgocz9hmbkkaOa3aOSgvaYce9iaYaH9oVgoGfhOdndndncbcsavEaYaoEgvcs9hmbarce9imba3a3aAa3cefaASgvEgAcefSmecmcsavEhvkasavaEcdtc;WeGV86bbavcs9hmea3aA9Rgvcetavc8F917hvinaeavcFb0crtavcFbGV86bbaecefheavcje6hoavcr4hvaoTmbka3hAxvkcPhvasaEcdtcPV86bba3hAkavTmiavaH9omicdhocehEaQhYxlkavcufhvaEclfgEc;ab9hmbkkdnaLceaYaOSceta8AaOSEcx2gvc;a1jjbfydbcdtfydbgKTaLavc;e1jjbfydbcdtfydbg8AceSGaLavc;i1jjbfydbcdtfydbg3cdSGaOcb9hGazGg5ce9hmbaw9cu83ibaD9cu83ibaq9cu83ibak9cu83ibax9cu83ibam9cu83ibal9cu83iwal9cu83ibcbhOkcbhEaXcufgvhodnindnalaocsGcdtfydba8A9hmbaEhYxdkcuhYaocufhoaEcefgEcz9hmbkkcbhodnindnalavcsGcdtfydba39hmbaohExdkcuhEavcufhvaocefgocz9hmbkkaOaKaOSg8EfhLdndnaYcm0mbaYcefhYxekcbcsa8AaLSgvEhYaLavfhLkdndnaEcm0mbaEcefhExekcbcsa3aLSgvEhEaLavfhLkc9:cua8EEh8FcbhvaEaYcltVgacFeGhodndndninavc:W1jjbfRbbaoSmeavcefgvcz9hmbxdkka5aKaO9havcm0VVmbasavc;WeV86bbxekasa8F86bbaeaa86bbaecefhekdna8EmbaKaA9Rgvcetavc8F917hvinaeavcFb0gocrtavcFbGV86bbavcr4hvaecefheaombkaKhAkdnaYcs9hmba8AaA9Rgvcetavc8F917hvinaeavcFb0gocrtavcFbGV86bbavcr4hvaecefheaombka8AhAkdnaEcs9hmba3aA9Rgvcetavc8F917hvinaeavcFb0gocrtavcFbGV86bbavcr4hvaecefheaombka3hAkalaXcdtfaKBdbaXcefcsGhvdndnaYPzbeeeeeeeeeeeeeebekalavcdtfa8ABdbaXcdfcsGhvkdndnaEPzbeeeeeeeeeeeeeebekalavcdtfa3BdbavcefcsGhvkcihoalc;abfaQcitfgEaKBdlaEa8ABdbaQcefcsGhYcdhEavhXaLhOxekcdhoalaXcdtfa3BdbcehEaXcefcsGhXaQhYkalc;abfaYcitfgva8ABdlava3Bdbalc;abfaQaEfcsGcitfgva3BdlavaKBdbascefhsaQaofcsGhQaCcifgCai6mbkkdnaeaP9nmbcbhvxekcbhvinaeavfavc:W1jjbfRbb86bbavcefgvcz9hmbkaeab9Ravfhvkalc;aef8KjjjjbavkZeeucbhddninadcefgdc8F0meceadtae6mbkkadcrfcFeGcr9Uci2cdfabci9U2cHfkmbcbabBd;m:kjjbk:Adewu8Jjjjjbcz9Rhlcbhvdnaicvfae0mbcbhvabcbRb;m:kjjbc;qeV86bbal9cb83iwabcefhoabaefc98fhrdnaiTmbcbhwcbhDindnaoar6mbcbskadaDcdtfydbgqalcwfawaqav9Rgvavc8F91gv7av9Rc507gwcdtfgkydb9Rgvc8E91c9:Gavcdt7awVhvinaoavcFb0gecrtavcFbGV86bbavcr4hvaocefhoaembkakaqBdbaqhvaDcefgDai9hmbkkdnaoar9nmbcbskaocbBbbaoab9RclfhvkavkBeeucbhddninadcefgdc8F0meceadtae6mbkkadcwfcFeGcr9Uab2cvfk:bvli99dui99ludnaeTmbcuadcetcuftcu7:Zhvdndncuaicuftcu7:ZgoJbbbZMgr:lJbbb9p9DTmbar:Ohwxekcjjjj94hwkcbhicbhDinalclfIdbgrJbbbbJbbjZalIdbgq:lar:lMalcwfIdbgk:lMgr:varJbbbb9BEgrNhxaqarNhrdndnakJbbbb9GTmbaxhqxekJbbjZar:l:tgqaq:maxJbbbb9GEhqJbbjZax:l:tgxax:marJbbbb9GEhrkdndnalcxfIdbgxJbbj:;axJbbj:;9GEgkJbbjZakJbbjZ9FEavNJbbbZJbbb:;axJbbbb9GEMgx:lJbbb9p9DTmbax:Ohmxekcjjjj94hmkdndnaqJbbj:;aqJbbj:;9GEgxJbbjZaxJbbjZ9FEaoNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:OhPxekcjjjj94hPkdndnarJbbj:;arJbbj:;9GEgqJbbjZaqJbbjZ9FEaoNJbbbZJbbb:;arJbbbb9GEMgr:lJbbb9p9DTmbar:Ohsxekcjjjj94hskdndnadcl9hmbabaifgzas86bbazcifam86bbazcdfaw86bbazcefaP86bbxekabaDfgzas87ebazcofam87ebazclfaw87ebazcdfaP87ebkalczfhlaiclfhiaDcwfhDaecufgembkkk;hlld99eud99eudnaeTmbdndncuaicuftcu7:ZgvJbbbZMgo:lJbbb9p9DTmbao:Ohixekcjjjj94hikaic;8FiGhrinabcofcicdalclfIdb:lalIdb:l9EgialcwfIdb:lalaicdtfIdb:l9EEgialcxfIdb:lalaicdtfIdb:l9EEgiarV87ebdndnJbbj:;JbbjZalaicdtfIdbJbbbb9DEgoalaicd7cdtfIdbJ;Zl:1ZNNgwJbbj:;awJbbj:;9GEgDJbbjZaDJbbjZ9FEavNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohqxekcjjjj94hqkabcdfaq87ebdndnalaicefciGcdtfIdbJ;Zl:1ZNaoNgwJbbj:;awJbbj:;9GEgDJbbjZaDJbbjZ9FEavNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohqxekcjjjj94hqkabaq87ebdndnaoalaicufciGcdtfIdbJ;Zl:1ZNNgoJbbj:;aoJbbj:;9GEgwJbbjZawJbbjZ9FEavNJbbbZJbbb:;aoJbbbb9GEMgo:lJbbb9p9DTmbao:Ohixekcjjjj94hikabclfai87ebabcwfhbalczfhlaecufgembkkk;3viDue99eu8Jjjjjbcjd9Rgo8Kjjjjbadcd4hrdndndndnavcd9hmbadcl6meaohwarhDinawc:CuBdbawclfhwaDcufgDmbkaeTmiadcl6mdarcdthqalhkcbhxinaohwakhDarhminawawydbgPcbaDIdbgs:8cL4cFeGc:cufasJbbbb9BEgzaPaz9kEBdbaDclfhDawclfhwamcufgmmbkakaqfhkaxcefgxaeSmixbkkaeTmdxekaeTmekarcdthkavce9hhqadcl6hdcbhxindndndnaqmbadmdc:CuhDalhwarhminaDcbawIdbgs:8cL4cFeGc:cufasJbbbb9BEgPaDaP9kEhDawclfhwamcufgmmbxdkkc:CuhDdndnavPleddbdkadmdaohwalhmarhPinawcbamIdbgs:8cL4cFeGgzc;:bazc;:b0Ec:cufasJbbbb9BEBdbamclfhmawclfhwaPcufgPmbxdkkadmecbhwarhminaoawfcbalawfIdbgs:8cL4cFeGgPc8AaPc8A0Ec:cufasJbbbb9BEBdbawclfhwamcufgmmbkkadmbcbhwarhPinaDhmdnavceSmbaoawfydbhmkdndnalawfIdbgscjjj;8iamai9RcefgmcLt9R::NJbbbZJbbb:;asJbbbb9GEMgs:lJbbb9p9DTmbas:Ohzxekcjjjj94hzkabawfazcFFFrGamcKtVBdbawclfhwaPcufgPmbkkabakfhbalakfhlaxcefgxae9hmbkkaocjdf8Kjjjjbk;YqdXui998Jjjjjbc:qd9Rgv8Kjjjjbavc:Sefcbc;Kbz:wjjjb8AcbhodnadTmbcbhoaiTmbdndnabaeSmbaehrxekavcuadcdtgwadcFFFFi0Ecbyd;u:kjjbHjjjjbbgrBd:SeavceBd:mdaraeawz:vjjjb8Akavc:GefcwfcbBdbav9cb83i:Geavc:Gefaradaiavc:Sefz:ojjjbavyd:GehDadci9Ugqcbyd;u:kjjbHjjjjbbheavc:Sefavyd:mdgkcdtfaeBdbavakcefgwBd:mdaecbaqz:wjjjbhxavc:SefawcdtfcuaicdtaicFFFFi0Ecbyd;u:kjjbHjjjjbbgmBdbavakcdfgPBd:mdalc;ebfhsaDheamhwinawalIdbasaeydbgzcwazcw6EcdtfIdbMUdbaeclfheawclfhwaicufgimbkavc:SefaPcdtfcuaqcdtadcFFFF970Ecbyd;u:kjjbHjjjjbbgPBdbdnadci6mbarheaPhwaqhiinawamaeydbcdtfIdbamaeclfydbcdtfIdbMamaecwfydbcdtfIdbMUdbaecxfheawclfhwaicufgimbkkakcifhoalc;ebfhHavc;qbfhOavheavyd:KehAavyd:OehCcbhzcbhwcbhXcehQinaehLcihkarawci2gKcdtfgeydbhsaeclfydbhdabaXcx2fgicwfaecwfydbgYBdbaiclfadBdbaiasBdbaxawfce86bbaOaYBdwaOadBdlaOasBdbaPawcdtfcbBdbdnazTmbcihkaLhiinaOakcdtfaiydbgeBdbakaeaY9haeas9haead9hGGfhkaiclfhiazcufgzmbkkaXcefhXcbhzinaCaAarazaKfcdtfydbcdtgifydbcdtfgYheaDaifgdydbgshidnasTmbdninaeydbawSmeaeclfheaicufgiTmdxbkkaeaYascdtfc98fydbBdbadadydbcufBdbkazcefgzci9hmbkdndnakTmbcuhwJbbbbh8Acbhdavyd:KehYavyd:OehKindndnaDaOadcdtfydbcdtgzfydbgembadcefhdxekadcs0hiamazfgsIdbhEasalcbadcefgdaiEcdtfIdbaHaecwaecw6EcdtfIdbMg3Udba3aE:th3aecdthiaKaYazfydbcdtfheinaPaeydbgzcdtfgsa3asIdbMgEUdbaEa8Aa8AaE9DgsEh8AazawasEhwaeclfheaic98fgimbkkadak9hmbkawcu9hmekaQaq9pmdindnaxaQfRbbmbaQhwxdkaqaQcefgQ9hmbxikkakczakcz6EhzaOheaLhOawcu9hmbkkaocdtavc:Seffc98fhedninaoTmeaeydbcbyd;q:kjjbH:bjjjbbaec98fheaocufhoxbkkavc:qdf8Kjjjjbk;IlevucuaicdtgvaicFFFFi0Egocbyd;u:kjjbHjjjjbbhralalyd9GgwcdtfarBdbalawcefBd9GabarBdbaocbyd;u:kjjbHjjjjbbhralalyd9GgocdtfarBdbalaocefBd9GabarBdlcuadcdtadcFFFFi0Ecbyd;u:kjjbHjjjjbbhralalyd9GgocdtfarBdbalaocefBd9GabarBdwabydbcbavz:wjjjb8Aadci9UhDdnadTmbabydbhoaehladhrinaoalydbcdtfgvavydbcefBdbalclfhlarcufgrmbkkdnaiTmbabydbhlabydlhrcbhvaihoinaravBdbarclfhralydbavfhvalclfhlaocufgombkkdnadci6mbabydlhrabydwhvcbhlinaecwfydbhoaeclfydbhdaraeydbcdtfgwawydbgwcefBdbavawcdtfalBdbaradcdtfgdadydbgdcefBdbavadcdtfalBdbaraocdtfgoaoydbgocefBdbavaocdtfalBdbaecxfheaDalcefgl9hmbkkdnaiTmbabydlheabydbhlinaeaeydbalydb9RBdbalclfhlaeclfheaicufgimbkkkQbabaeadaic;K1jjbz:njjjbkQbabaeadaic;m:jjjbz:njjjbk9DeeuabcFeaicdtz:wjjjbhlcbhbdnadTmbindnalaeydbcdtfgiydbcu9hmbaiabBdbabcefhbkaeclfheadcufgdmbkkabk:Vvioud9:du8Jjjjjbc;Wa9Rgl8Kjjjjbcbhvalcxfcbc;Kbz:wjjjb8AalcuadcitgoadcFFFFe0Ecbyd;u:kjjbHjjjjbbgrBdxalceBd2araeadaicez:tjjjbalcuaoadcjjjjoGEcbyd;u:kjjbHjjjjbbgwBdzadcdthednadTmbabhiinaiavBdbaiclfhiadavcefgv9hmbkkawaefhDalabBdwalawBdl9cbhqindnadTmbaq9cq9:hkarhvaDhiadheinaiav8Pibak1:NcFrG87ebavcwfhvaicdfhiaecufgembkkalclfaq:NceGcdtfydbhxalclfaq9ce98gq:NceGcdtfydbhmalc;Wbfcbcjaz:wjjjb8AaDhvadhidnadTmbinalc;Wbfav8VebcdtfgeaeydbcefBdbavcdfhvaicufgimbkkcbhvcbhiinalc;WbfavfgeydbhoaeaiBdbaoaifhiavclfgvcja9hmbkadhvdndnadTmbinalc;WbfaDamydbgicetf8VebcdtfgeaeydbgecefBdbaxaecdtfaiBdbamclfhmavcufgvmbkaq9cv9smdcbhvinabawydbcdtfavBdbawclfhwadavcefgv9hmbxdkkaq9cv9smekkclhvdninavc98Smealcxfavfydbcbyd;q:kjjbH:bjjjbbavc98fhvxbkkalc;Waf8Kjjjjbk:Jwliuo99iud9:cbhv8Jjjjjbca9Rgoczfcwfcbyd:8:kjjbBdbaocb8Pd:0:kjjb83izaocwfcbyd;i:kjjbBdbaocb8Pd;a:kjjb83ibaicd4hrdndnadmbJFFuFhwJFFuuhDJFFuuhqJFFuFhkJFFuuhxJFFuFhmxekarcdthPaehsincbhiinaoczfaifgzasaifIdbgwazIdbgDaDaw9EEUdbaoaifgzawazIdbgDaDaw9DEUdbaiclfgicx9hmbkasaPfhsavcefgvad9hmbkaoIdKhDaoIdwhwaoIdChqaoIdlhkaoIdzhxaoIdbhmkdnadTmbJbbbbJbFu9hJbbbbamax:tgmamJbbbb9DEgmakaq:tgkakam9DEgkawaD:tgwawak9DEgw:vawJbbbb9BEhwdnalmbarcdthoindndnaeclfIdbaq:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikai:S9cC:ghHdndnaeIdbax:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikaHai:S:ehHdndnaecwfIdbaD:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabaHai:T9cy:g:e83ibaeaofheabcwfhbadcufgdmbxdkkarcdthoindndnaeIdbax:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikai:SgH9ca:gaH9cz:g9cjjj;4s:d:eaH9cFe:d:e9cF:bj;4:pj;ar:d9c:bd9:9c:p;G:d;4j:E;ar:d9cH9:9c;d;H:W:y:m:g;d;Hb:d9cv9:9c;j:KM;j:KM;j:Kd:dhOdndnaeclfIdbaq:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikai:SgH9ca:gaH9cz:g9cjjj;4s:d:eaH9cFe:d:e9cF:bj;4:pj;ar:d9c:bd9:9c:p;G:d;4j:E;ar:d9cH9:9c;d;H:W:y:m:g;d;Hb:d9cq9:9cM;j:KM;j:KM;jl:daO:ehOdndnaecwfIdbaD:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabaOai:SgH9ca:gaH9cz:g9cjjj;4s:d:eaH9cFe:d:e9cF:bj;4:pj;ar:d9c:bd9:9c:p;G:d;4j:E;ar:d9cH9:9c;d;H:W:y:m:g;d;Hb:d9cC9:9c:KM;j:KM;j:KMD:d:e83ibaeaofheabcwfhbadcufgdmbkkk9teiucbcbyd;y:kjjbgeabcifc98GfgbBd;y:kjjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;teeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiaeydlBdlaiaeydwBdwaiaeydxBdxaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk:3eedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdxaialBdwaialBdlaialBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd;y:kjjbgeabcrfc94GfgbBd;y:kjjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik9:eiuZbhedndncbyd;y:kjjbgdaecztgi9nmbcuheadai9RcFFifcz4nbcuSmekadhekcbabae9Rcifc98Gcbyd;y:kjjbfgdBd;y:kjjbdnadZbcztge9nmbadae9RcFFifcz4nb8Akkk;Qddbcjwk;mdbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbbbbbbbbbbbbb4:h9w9N94:P:gW:j9O:ye9Pbbbbbbebbbdbbbebbbdbbbbbbbdbbbbbbbebbbbbbb:l29hZ;69:9kZ;N;76Z;rg97Z;z;o9xZ8J;B85Z;:;u9yZ;b;k9HZ:2;Z9DZ9e:l9mZ59A8KZ:r;T3Z:A:zYZ79OHZ;j4::8::Y:D9V8:bbbb9s:49:Z8R:hBZ9M9M;M8:L;z;o8:;8:PG89q;x:J878R:hQ8::M:B;e87bbbbbbjZbbjZbbjZ:E;V;N8::Y:DsZ9i;H;68:xd;R8:;h0838:;W:NoZbbbb:WV9O8:uf888:9i;H;68:9c9G;L89;n;m9m89;D8Ko8:bbbbf:8tZ9m836ZS:2AZL;zPZZ818EZ9e:lxZ;U98F8:819E;68:FFuuFFuuFFuuFFuFFFuFFFuFbc;mqkzebbbebbbdbbb9G:vbb",e=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var t,n=WebAssembly.instantiate(i(a),{}).then(function(f){t=f.instance,t.exports.__wasm_call_ctors(),t.exports.meshopt_encodeVertexVersion(0),t.exports.meshopt_encodeIndexVersion(1)});function i(f){for(var b=new Uint8Array(f.length),g=0;g<f.length;++g){var m=f.charCodeAt(g);b[g]=m>96?m-97:m>64?m-39:m+4}for(var p=0,g=0;g<f.length;++g)b[p++]=b[g]<60?e[b[g]]:(b[g]-60)*64+b[++g];return b.buffer.slice(0,p)}function s(f){if(!f)throw new Error("Assertion failed")}function r(f){return new Uint8Array(f.buffer,f.byteOffset,f.byteLength)}function o(f,b,g,m){var p=t.exports.sbrk,v=p(b.length*4),y=p(g*4),x=new Uint8Array(t.exports.memory.buffer),_=r(b);x.set(_,v),m&&m(v,v,b.length,g);var S=f(y,v,b.length,g);x=new Uint8Array(t.exports.memory.buffer);var E=new Uint32Array(g);new Uint8Array(E.buffer).set(x.subarray(y,y+g*4)),_.set(x.subarray(v,v+b.length*4)),p(v-p(0));for(var R=0;R<b.length;++R)b[R]=E[b[R]];return[E,S]}function c(f,b,g,m){var p=t.exports.sbrk,v=p(g*4),y=p(g*m),x=new Uint8Array(t.exports.memory.buffer);x.set(r(b),y),f(v,y,g,m),x=new Uint8Array(t.exports.memory.buffer);var _=new Uint32Array(g);return new Uint8Array(_.buffer).set(x.subarray(v,v+g*4)),p(v-p(0)),_}function l(f,b,g,m,p){var v=t.exports.sbrk,y=v(b),x=v(m*p),_=new Uint8Array(t.exports.memory.buffer);_.set(r(g),x);var S=f(y,b,x,m,p),E=new Uint8Array(S);return E.set(_.subarray(y,y+S)),v(y-v(0)),E}function d(f){for(var b=0,g=0;g<f.length;++g){var m=f[g];b=b<m?m:b}return b}function h(f,b){if(s(b==2||b==4),b==4)return new Uint32Array(f.buffer,f.byteOffset,f.byteLength/4);var g=new Uint16Array(f.buffer,f.byteOffset,f.byteLength/2);return new Uint32Array(g)}function u(f,b,g,m,p,v,y){var x=t.exports.sbrk,_=x(g*m),S=x(g*v),E=new Uint8Array(t.exports.memory.buffer);E.set(r(b),S),f(_,g,m,p,S,y);var R=new Uint8Array(g*m);return R.set(E.subarray(_,_+g*m)),x(_-x(0)),R}return{ready:n,supported:!0,reorderMesh:function(f,b,g){var m=b?g?t.exports.meshopt_optimizeVertexCacheStrip:t.exports.meshopt_optimizeVertexCache:void 0;return o(t.exports.meshopt_optimizeVertexFetchRemap,f,d(f)+1,m)},reorderPoints:function(f,b){return s(f instanceof Float32Array),s(f.length%b==0),s(b>=3),c(t.exports.meshopt_spatialSortRemap,f,f.length/b,b*4)},encodeVertexBuffer:function(f,b,g){s(g>0&&g<=256),s(g%4==0);var m=t.exports.meshopt_encodeVertexBufferBound(b,g);return l(t.exports.meshopt_encodeVertexBuffer,m,f,b,g)},encodeIndexBuffer:function(f,b,g){s(g==2||g==4),s(b%3==0);var m=h(f,g),p=t.exports.meshopt_encodeIndexBufferBound(b,d(m)+1);return l(t.exports.meshopt_encodeIndexBuffer,p,m,b,4)},encodeIndexSequence:function(f,b,g){s(g==2||g==4);var m=h(f,g),p=t.exports.meshopt_encodeIndexSequenceBound(b,d(m)+1);return l(t.exports.meshopt_encodeIndexSequence,p,m,b,4)},encodeGltfBuffer:function(f,b,g,m){var p={ATTRIBUTES:this.encodeVertexBuffer,TRIANGLES:this.encodeIndexBuffer,INDICES:this.encodeIndexSequence};return s(p[m]),p[m](f,b,g)},encodeFilterOct:function(f,b,g,m){return s(g==4||g==8),s(m>=1&&m<=16),u(t.exports.meshopt_encodeFilterOct,f,b,g,m,16)},encodeFilterQuat:function(f,b,g,m){return s(g==8),s(m>=4&&m<=16),u(t.exports.meshopt_encodeFilterQuat,f,b,g,m,16)},encodeFilterExp:function(f,b,g,m,p){s(g>0&&g%4==0),s(m>=1&&m<=24);var v={Separate:0,SharedVector:1,SharedComponent:2,Clamped:3};return u(t.exports.meshopt_encodeFilterExp,f,b,g,m,g,p?v[p]:1)}}})();var Jd=(function(){var a="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:W:Odkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:S86qdbk;jYi5ud9:du8Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz1jjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCabaOad2fhXaAcethQaxaDfhiaOaeaoaeao6E9RhLalcl4cifcd4hKazcj;cbfaAfhYcbh8AazcjdfhEaHh3incbhodnawTmbaxa8Acd4fRbbhokaocFeGh5cbh8Eazcj;cbfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcj;cbfa8EaA2fa8FaAz1jjjb8Aa8FaAfhixdkazcj;cbfa8EaA2fcbaAz:jjjjb8Aa8FhixekaPa8F9RaK6mva8FaKfhidnaCTmbaPai9RcK6mbaocdtc:q1jjbfcj1jjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bbarcwf9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfag9c8F1:NghcKtc8F91aicdfa8J9c8N1:Nfg8KRbbG86bbarcVfcba8KahcjeGcr4fghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fag9c8F1:NgicKtc8F91aha8J9c8N1:NfghRbbG86bbarc96fcbahaicjeGcr4fgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbb83bbarcwfaicwf8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasa8Acd4fRbbgociGPlbedrbkaATmdaza8Afh8Fazcj;cbfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeaza8Afhaazcj;cbfhhcbhoceh8EaYh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaLaocefgofmbka8FaQfh8FcdhoaacdfhaahaQfhha8EceGhlcbh8EalmbxdkkaATmbcbaocl49Rh8Eaza8AfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaYhainazcj;cbfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E93aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3a8Aclfg8Aad6mbkaXazcjdfaAad2z1jjjb8AazazcjdfaAcufad2fadz1jjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaok:XseHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbaxcefgOavaiaqaDcsGfRbbgscl49RcsGcdtfydbascz6gPEhDavaias9RcsGcdtfydbaOaPfgzascsGgOEhsaOThOdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiaPfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaOfhiazaOfhxxekaxcbalRbbgHEgAaDc;:eSgDfhzaHcsGhCaHcl4hXdndnaHcs0mbazcefhOxekazhOavaiaX9RcsGcdtfydbhzkdndnaCmbaOcefhxxekaOhxavaiaH9RcsGcdtfydbhOkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhAascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaAhDxekaDcefhDkasce4cbasceG9R7amfgmhAkdndnaXcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhzaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkazhsxekascefhskaPce4cbaPceG9R7amfgmhzkdndnaCcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhOaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkaOhlxekalcefhlkaPce4cbaPceG9R7amfgmhOkdndnadcd9hmbabarcetfgDaA87ebaDclfaO87ebaDcdfaz87ebxekabarcdtfgDaABdbaDcwfaOBdbaDclfazBdbkavc;abfaocitfgDazBdbaDaABdlavaicdtfaABdbavc;abfaocefcsGcitfgDaOBdbaDazBdlavaicefgicsGcdtfazBdbavc;abfaocdfcsGcitfgDaABdbaDaOBdlavaiaHcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnaecvfal9nmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;oiliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabaiavcefciGfcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavciGfgkcd7cetfaD87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavcufciGfcetfaD87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohvxekcjjjj94hvkabakcetfav87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk9teiucbcbyd:K1jjbgeabcifc98GfgbBd:K1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;teeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiaeydlBdlaiaeydwBdwaiaeydxBdxaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk:3eedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdxaialBdwaialBdlaialBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk81dbcjwk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:Kwkl8WNbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q:6dkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;G9Mqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk:183lYud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxavaialfgmar9Rgoad;8qbbcj;abad9Uc;WFbGcjdadca0EhPdndndnadTmbaoadfhscbhzinaeaz9nmdamax9RaD6miabazad2fhHaxaDfhOaPaeaz9RazaPfae6EgAcsfgocl4cifcd4hCavcj;cbfaoc9WGgXcetfhQavcj;cbfaXci2fhLavcj;cbfaXfhKcbhYaoc;ab6h8AincbhodnawTmbaxaYcd4fRbbhokaocFeGhEcbh3avcj;cbfh5indndndndnaEa3cet4ciGgoc9:fPdebdkamaO9RaX6mwavcj;cbfa3aX2faOaX;8qbbaOaAfhOxdkavcj;cbfa3aX2fcbaX;8kbxekamaO9RaC6moaoclVcbawEhraOaCfhocbhidna8Ambamao9Rc;Gb6mbcbhlina5alfhidndndndndndnaOalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaoclffahc:q:yjjbfRbbfhoxikaiaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaocwffahc:q:yjjbfRbbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaaaocdffahc:q:yjjbfRbbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaoclffahc:q:yjjbfRbbfhoxikaiczfaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaocwffahc:q:yjjbfRbbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaaaocdffahc:q:yjjbfRbbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaoclffahc:q:yjjbfRbbfhoxikaicafaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaocwffahc:q:yjjbfRbbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaaaocdffahc:q:yjjbfRbbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngicitc:q1jjbfpbibaic:q:yjjbfRbbgipsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaiaoclffaqc:q:yjjbfRbbfhoxikaic8Wfaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngicitc:q1jjbfpbibaic:q:yjjbfRbbgipsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaiaocwffaqc:q:yjjbfRbbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitc:q1jjbfpbibaic:q:yjjbfRbbgipsaoRbegqcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqc:q:yjjbfRbbfhokalc;abfhialcjefaX0meaihlamao9Rc;Fb0mbkkdnaiaX9pmbaici4hlinamao9RcK6mwa5aifhqdndndndndndnaOaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spkbbaaaoclffahc:q:yjjbfRbbfhoxikaqaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spkbbaaaocwffahc:q:yjjbfRbbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpkbbaaaocdffahc:q:yjjbfRbbfhokalcdfhlaiczfgiaX6mbkkaohOaoTmoka5aXfh5a3cefg3cl9hmbkdndndndnawTmbasaYcd4fRbbglciGPlbedwbkaXTmdavcjdfaYfhlavaYfpbdbhgcbhoinalavcj;cbfaofpblbg8JaKaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaQaofpblbg8MaLaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Ecep9Ta8Epxeeeeeeeeeeeeeeeeg8Fp9op9Hp9rg8Eagp9Uggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp9Uggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp9Uggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9Abbbaladfglaga8LaypmwDKYqk8AExm35Ps8E8Fg8Ecep9Ta8Ea8Fp9op9Hp9rg8Ep9Uggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp9Uggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp9Uggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9Abbbaladfglaga8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Ecep9Ta8Ea8Fp9op9Hp9rg8Ep9Uggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp9Uggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp9Uggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9Abbbaladfglaga8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Ecep9Ta8Ea8Fp9op9Hp9rg8Ep9Ug8Fp9Abbbaladfgla8Fa8Ea8Epmlvorlvorlvorlvorp9Ug8Fp9Abbbaladfgla8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9Ug8Fp9Abbbaladfgla8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9AbbbaladfhlaoczfgoaX6mbxikkaXTmeavcjdfaYfhlavaYfpbdbhgcbhoinalavcj;cbfaofpblbg8JaKaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaQaofpblbg8MaLaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Ecep:nea8Epxebebebebebebebebg8Fp9op:bep9rg8Eagp:oeggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp:oeggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp:oeggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9Abbbaladfglaga8LaypmwDKYqk8AExm35Ps8E8Fg8Ecep:nea8Ea8Fp9op:bep9rg8Ep:oeggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp:oeggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp:oeggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9Abbbaladfglaga8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Ecep:nea8Ea8Fp9op:bep9rg8Ep:oeggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp:oeggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp:oeggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9Abbbaladfglaga8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Ecep:nea8Ea8Fp9op:bep9rg8Ep:oeg8Fp9Abbbaladfgla8Fa8Ea8Epmlvorlvorlvorlvorp:oeg8Fp9Abbbaladfgla8Fa8Ea8EpmwDqkwDqkwDqkwDqkp:oeg8Fp9Abbbaladfgla8Fa8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9AbbbaladfhlaoczfgoaX6mbxdkkaXTmbcbhocbalcl4gl9Rc8FGhiavcjdfaYfhravaYfpbdbh8Finaravcj;cbfaofpblbggaKaofpblbg8JpmbzeHdOiAlCvXoQrLg8KaQaofpblbg8LaLaofpblbg8MpmbzeHdOiAlCvXoQrLg8NpmbezHdiOAlvCXorQLg8Eaip:Rea8Ealp:Sep9qg8Ea8Fp9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9Abbbaradfgra8Fa8Ka8NpmwDKYqk8AExm35Ps8E8Fg8Eaip:Rea8Ealp:Sep9qg8Ep9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9Abbbaradfgra8Faga8JpmwKDYq8AkEx3m5P8Es8Fgga8La8MpmwKDYq8AkEx3m5P8Es8Fg8JpmbezHdiOAlvCXorQLg8Eaip:Rea8Ealp:Sep9qg8Ep9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9Abbbaradfgra8Faga8JpmwDKYqk8AExm35Ps8E8Fg8Eaip:Rea8Ealp:Sep9qg8Ep9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9AbbbaradfhraoczfgoaX6mbkkaYclfgYad6mbkaHavcjdfaAad2;8qbbavavcjdfaAcufad2fad;8qbbaAazfhzc9:hoaOhxaOmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdaPaeao9RaoaPfae6Eaofgoae6mbkaial9Rhxkcbc99amax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbk:TseHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbaxcefgOavaiaqaDcsGfRbbgscl49RcsGcdtfydbascz6gPEhDavaias9RcsGcdtfydbaOaPfgzascsGgOEhsaOThOdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiaPfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaOfhiazaOfhxxekaxcbalRbbgHEgAaDc;:eSgDfhzaHcsGhCaHcl4hXdndnaHcs0mbazcefhOxekazhOavaiaX9RcsGcdtfydbhzkdndnaCmbaOcefhxxekaOhxavaiaH9RcsGcdtfydbhOkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhAascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaAhDxekaDcefhDkasce4cbasceG9R7amfgmhAkdndnaXcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhzaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkazhsxekascefhskaPce4cbaPceG9R7amfgmhzkdndnaCcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhOaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkaOhlxekalcefhlkaPce4cbaPceG9R7amfgmhOkdndnadcd9hmbabarcetfgDaA87ebaDclfaO87ebaDcdfaz87ebxekabarcdtfgDaABdbaDcwfaOBdbaDclfazBdbkavc;abfaocitfgDazBdbaDaABdlavaicdtfaABdbavc;abfaocefcsGcitfgDaOBdbaDazBdlavaicefgicsGcdtfazBdbavc;abfaocdfcsGcitfgDaABdbaDaOBdlavaiaHcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnaecvfal9nmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:SPliuo97eue978Jjjjjbca9Rhiaec98Ghldndnadcl9hmbdnalTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalaeSmeaipxbbbbbbbbbbbbbbbbgqpklbaiabalcdtfgdaeciGglcdtgv;8qbbdnalTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDaqp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkadaiav;8qbbskdnalTmbcbhvabhdinadczfgxaxpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;7eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oaoarpmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgval6mbkkalaeSmbaiczfpxbbbbbbbbbbbbbbbbgopklbaiaopklbaiabalcitfgdaeciGglcitgv;8qbbdnalTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;7eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oaoarpmbezHdiOAlvCXorQLp9qpklbkadaiav;8qbbkk:oDllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalaeSmbaiczfpxbbbbbbbbbbbbbbbbgkpklbaiakpklbaiabalcitfgoaeciGgvcitgw;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkaoaiaw;8qbbkk;uddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbheabhdinadadpbbbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbadczfhdaeclfgeav6mbkkdnavalSmbaic8WfpxbbbbbbbbbbbbbbbbgopklbaicafaopklbaiczfaopklbaiaopklbaiabavcdtfgdalciGgecdtgv;8qbbdnaeTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepklbkadaiav;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz:Dbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var i=WebAssembly.validate(t)?o(e):o(a),s,r=WebAssembly.instantiate(i,{}).then(function(p){s=p.instance,s.exports.__wasm_call_ctors()});function o(p){for(var v=new Uint8Array(p.length),y=0;y<p.length;++y){var x=p.charCodeAt(y);v[y]=x>96?x-97:x>64?x-39:x+4}for(var _=0,y=0;y<p.length;++y)v[_++]=v[y]<60?n[v[y]]:(v[y]-60)*64+v[++y];return v.buffer.slice(0,_)}function c(p,v,y,x,_,S,E){var R=p.exports.sbrk,M=x+3&-4,w=R(M*_),I=R(S.length),P=new Uint8Array(p.exports.memory.buffer);P.set(S,I);var F=v(w,x,_,I,S.length);if(F==0&&E&&E(w,M,_),y.set(P.subarray(w,w+x*_)),R(w-R(0)),F!=0)throw new Error("Malformed buffer data: "+F)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},d={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},h=[],u=0;function f(p){var v={object:new Worker(p),pending:0,requests:{}};return v.object.onmessage=function(y){var x=y.data;v.pending-=x.count,v.requests[x.id][x.action](x.value),delete v.requests[x.id]},v}function b(p){for(var v="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(i)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+m.name+";"+c.toString()+m.toString(),y=new Blob([v],{type:"text/javascript"}),x=URL.createObjectURL(y),_=h.length;_<p;++_)h[_]=f(x);for(var _=p;_<h.length;++_)h[_].object.postMessage({});h.length=p,URL.revokeObjectURL(x)}function g(p,v,y,x,_){for(var S=h[0],E=1;E<h.length;++E)h[E].pending<S.pending&&(S=h[E]);return new Promise(function(R,M){var w=new Uint8Array(y),I=++u;S.pending+=p,S.requests[I]={resolve:R,reject:M},S.object.postMessage({id:I,count:p,size:v,source:w,mode:x,filter:_},[w.buffer])})}function m(p){var v=p.data;if(!v.id)return self.close();self.ready.then(function(y){try{var x=new Uint8Array(v.count*v.size);c(y,y.exports[v.mode],x,v.count,v.size,v.source,y.exports[v.filter]),self.postMessage({id:v.id,count:v.count,action:"resolve",value:x},[x.buffer])}catch(_){self.postMessage({id:v.id,count:v.count,action:"reject",value:_})}})}return{ready:r,supported:!0,useWorkers:function(p){b(p)},decodeVertexBuffer:function(p,v,y,x,_){c(s,s.exports.meshopt_decodeVertexBuffer,p,v,y,x,s.exports[l[_]])},decodeIndexBuffer:function(p,v,y,x){c(s,s.exports.meshopt_decodeIndexBuffer,p,v,y,x)},decodeIndexSequence:function(p,v,y,x){c(s,s.exports.meshopt_decodeIndexSequence,p,v,y,x)},decodeGltfBuffer:function(p,v,y,x,_,S){c(s,s.exports[d[_]],p,v,y,x,s.exports[l[S]])},decodeGltfBufferAsync:function(p,v,y,x,_){return h.length>0?g(p,v,y,d[x],l[_]):r.then(function(){var S=new Uint8Array(p*v);return c(s,s.exports[d[x]],S,p,v,y,s.exports[l[_]]),S})}}})();var DE=(function(){var a="b9H79Tebbbetm9Geueu9Geub9Gbb9Gsuuuuuuuuuuuu99uueu9Gvuuuuub9Gruuuuuuub9Gvuuuuue999Gvuuuuueu9Gquuuuuuu99uueu9Gwuuuuuu99ueu9Giuuue999Gluuuueu9GiuuueuiOHdilvorlwiDqkbxxbelve9Weiiviebeoweuec:G:Pdkr:Tewo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bbz9TW79O9V9Wt9F79P9T9W29P9M95br8E9TW79O9V9Wt9F79P9T9W29P9M959x9Pt9OcttV9P9I91tW7bwQ9TW79O9V9Wt9F79P9T9W29P9M959q9V9P9Ut7bDX9TW79O9V9Wt9F79P9T9W29P9M959t9J9H2Wbqa9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94SWt9J9O9sW9T9H9Wbkl79IV9RbxDwebcekdzsq;B:xeHdbkM9Hi8Au8A99Au8Jjjjjbc;W;qb9Rgs8Kjjjjbcbhzascxfcbc;Kbz:ojjjb8AdnabaeSmbabaeadcdtz:njjjb8AkdndnamcdGmbascxfhHcbhOxekasalcrfci4gecbyd:m:jjjbHjjjjbbgABdxasceBd2aAcbaez:ojjjbhCcbhlcbhednadTmbcbhlabheadhAinaCaeydbgXci4fgQaQRbbgQceaXcrGgXtV86bbaQcu7aX4ceGalfhlaeclfheaAcufgAmbkcualcdtalcFFFFi0EhekascCfhHasaecbyd:m:jjjbHjjjjbbgOBdzascdBd2alcd4alfhXcehAinaAgecethAaeaX6mbkcdhzcbhLascuaecdtgAaecFFFFi0Ecbyd:m:jjjbHjjjjbbgXBdCasciBd2aXcFeaAz:ojjjbhKdnadTmbaecufhYcbh8AindndnaKabaLcdtfgEydbgQc:v;t;h;Ev2aYGgXcdtfgCydbgAcuSmbceheinaOaAcdtfydbaQSmdaXaefhAaecefheaKaAaYGgXcdtfgCydbgAcu9hmbkkaOa8AcdtfaQBdbaCa8ABdba8AhAa8Acefh8AkaEaABdbaLcefgLad9hmbkkaKcbyd1:jjjbH:bjjjbbascdBd2kcbh3aHcualcefgecdtaecFFFFi0Ecbyd:m:jjjbHjjjjbbg5Bdbasa5BdlasazceVgeBd2ascxfaecdtfcuadcitadcFFFFe0Ecbyd:m:jjjbHjjjjbbg8EBdbasa8EBdwasazcdfgeBd2asclfabadalcbz:cjjjbascxfaecdtfcualcdtgealcFFFFi0Eg8Fcbyd:m:jjjbHjjjjbbgABdbasazcifgXBd2ascxfaXcdtfa8Fcbyd:m:jjjbHjjjjbbgaBdbasazclVBd2aAaaaialavaOascxfz:djjjbalcbyd:m:jjjbHjjjjbbhCascxfasyd2ghcdtfaCBdbasahcefgXBd2ascxfaXcdtfa8Fcbyd:m:jjjbHjjjjbbgXBdbasahcdfgQBd2ascxfaQcdtfa8Fcbyd:m:jjjbHjjjjbbgQBdbasahcifggBd2aXcFeaez:ojjjbh8JaQcFeaez:ojjjbh8KdnalTmba8Ecwfh8Lindna5a3gQcefg3cdtfydbgKa5aQcdtgefydbgXSmbaKaX9Rhza8EaXcitfhHa8Kaefh8Ma8JaefhEcbhYindndnaHaYcitfydbg8AaQ9hmbaEaQBdba8MaQBdbxekdna5a8Acdtg8NfgeclfydbgXaeydbgeSmba8EaecitgKfydbaQSmeaXae9Rhyaecu7aXfhLa8LaKfhXcbheinaLaeSmeaecefheaXydbhKaXcwfhXaKaQ9hmbkaeay6meka8Ka8NfgeaQa8AaeydbcuSEBdbaEa8AaQaEydbcuSEBdbkaYcefgYaz9hmbkka3al9hmbkaAhXaahQa8KhKa8JhYcbheindndnaeaXydbg8A9hmbdnaeaQydbg8A9hmbaYydbh8AdnaKydbgLcu9hmba8Acu9hmbaCaefcb86bbxikaCaefhEdnaeaLSmbaea8ASmbaEce86bbxikaEcl86bbxdkdnaeaaa8AcdtgLfydb9hmbdnaKydbgEcuSmbaeaESmbaYydbgzcuSmbaeazSmba8KaLfydbgHcuSmbaHa8ASmba8JaLfydbgLcuSmbaLa8ASmbdnaAaEcdtfydbg8AaAaLcdtfydb9hmba8AaAazcdtfydbgLSmbaLaAaHcdtfydb9hmbaCaefcd86bbxlkaCaefcl86bbxikaCaefcl86bbxdkaCaefcl86bbxekaCaefaCa8AfRbb86bbkaXclfhXaQclfhQaKclfhKaYclfhYalaecefge9hmbkdnaqTmbdndnaOTmbaOheaAhXalhQindnaqaeydbfRbbTmbaCaXydbfcl86bbkaeclfheaXclfhXaQcufgQmbxdkkaAhealhXindnaqRbbTmbaCaeydbfcl86bbkaqcefhqaeclfheaXcufgXmbkkaAhealhQaChXindnaCaeydbfRbbcl9hmbaXcl86bbkaeclfheaXcefhXaQcufgQmbkkamceGTmbaChealhXindnaeRbbce9hmbaecl86bbkaecefheaXcufgXmbkkascxfagcdtfcualcx2alc;v:Q;v:Qe0Ecbyd:m:jjjbHjjjjbbg3BdbasahclfgHBd2a3aialavaOz:ejjjbh8PdndnaDmbcbhgcbh8Lxekcbh8LawhecbhXindnaeIdbJbbbb9ETmbasc;Wbfa8LcdtfaXBdba8Lcefh8LkaeclfheaDaXcefgX9hmbkascxfaHcdtfcua8Lal2gecdtaecFFFFi0Ecbyd:m:jjjbHjjjjbbggBdbasahcvfgHBd2alTmba8LTmbarcd4hEdnaOTmba8Lcdthzcbh8AaghLinaoaOa8AcdtfydbaE2cdtfhYasc;WbfheaLhXa8LhQinaXaYaeydbcdtgKfIdbawaKfIdbNUdbaeclfheaXclfhXaQcufgQmbkaLazfhLa8Acefg8Aal9hmbxdkka8Lcdthzcbh8AaghLinaoa8AaE2cdtfhYasc;WbfheaLhXa8LhQinaXaYaeydbcdtgKfIdbawaKfIdbNUdbaeclfheaXclfhXaQcufgQmbkaLazfhLa8Acefg8Aal9hmbkkascxfaHcdtfcualc8S2gealc;D;O;f8U0EgQcbyd:m:jjjbHjjjjbbgXBdbasaHcefgKBd2aXcbaez:ojjjbhqdndndna8LTmbascxfaKcdtfaQcbyd:m:jjjbHjjjjbbgvBdbasaHcdfgXBd2avcbaez:ojjjb8AascxfaXcdtfcua8Lal2gecltgXaecFFFFb0Ecbyd:m:jjjbHjjjjbbgiBdbasaHcifBd2aicbaXz:ojjjb8AadmexdkcbhvcbhiadTmekcbhYabhXindna3aXclfydbg8Acx2fgeIdba3aXydbgLcx2fgQIdbgI:tg8Ra3aXcwfydbgEcx2fgKIdlaQIdlg8S:tgRNaKIdbaI:tg8UaeIdla8S:tg8VN:tg8Wa8WNa8VaKIdwaQIdwg8X:tg8YNaRaeIdwa8X:tg8VN:tgRaRNa8Va8UNa8Ya8RN:tg8Ra8RNMM:rg8UJbbbb9ETmba8Wa8U:vh8Wa8Ra8U:vh8RaRa8U:vhRkaqaAaLcdtfydbc8S2fgeaRa8U:rg8UaRNNg8VaeIdbMUdbaea8Ra8Ua8RNg8ZNg8YaeIdlMUdlaea8Wa8Ua8WNg80Ng81aeIdwMUdwaea8ZaRNg8ZaeIdxMUdxaea80aRNgBaeIdzMUdzaea80a8RNg80aeIdCMUdCaeaRa8Ua8Wa8XNaRaINa8Sa8RNMM:mg8SNgINgRaeIdKMUdKaea8RaINg8RaeId3MUd3aea8WaINg8WaeIdaMUdaaeaIa8SNgIaeId8KMUd8Kaea8UaeIdyMUdyaqaAa8Acdtfydbc8S2fgea8VaeIdbMUdbaea8YaeIdlMUdlaea81aeIdwMUdwaea8ZaeIdxMUdxaeaBaeIdzMUdzaea80aeIdCMUdCaeaRaeIdKMUdKaea8RaeId3MUd3aea8WaeIdaMUdaaeaIaeId8KMUd8Kaea8UaeIdyMUdyaqaAaEcdtfydbc8S2fgea8VaeIdbMUdbaea8YaeIdlMUdlaea81aeIdwMUdwaea8ZaeIdxMUdxaeaBaeIdzMUdzaea80aeIdCMUdCaeaRaeIdKMUdKaea8RaeId3MUd3aea8WaeIdaMUdaaeaIaeId8KMUd8Kaea8UaeIdyMUdyaXcxfhXaYcifgYad6mbkcbhzabhLinabazcdtfh8AcbhXinaCa8AaXc;a1jjbfydbcdtfydbgQfRbbhedndnaCaLaXfydbgKfRbbgYc99fcFeGcpe0mbaec99fcFeGc;:e6mekdnaYcufcFeGce0mba8JaKcdtfydbaQ9hmekdnaecufcFeGce0mba8KaQcdtfydbaK9hmekdnaYcv2aefc:G1jjbfRbbTmbaAaQcdtfydbaAaKcdtfydb0mekJbbacJbbacJbbjZaecFeGceSEaYceSEh80dna3a8AaXc;e1jjbfydbcdtfydbcx2fgeIdwa3aKcx2fgYIdwg8S:tg8Wa3aQcx2fgEIdwa8S:tgRaRNaEIdbaYIdbg8X:tg8Ra8RNaEIdlaYIdlg8V:tg8Ua8UNMMgINa8WaRNaeIdba8X:tg81a8RNa8UaeIdla8V:tg8ZNMMg8YaRN:tg8Wa8WNa81aINa8Ya8RN:tgRaRNa8ZaINa8Ya8UN:tg8Ra8RNMM:rg8UJbbbb9ETmba8Wa8U:vh8Wa8Ra8U:vh8RaRa8U:vhRkaqaAaKcdtfydbc8S2fgeaRa80aI:rNg8UaRNNg8YaeIdbMUdbaea8Ra8Ua8RNg80Ng81aeIdlMUdlaea8Wa8Ua8WNgINg8ZaeIdwMUdwaea80aRNg80aeIdxMUdxaeaIaRNgBaeIdzMUdzaeaIa8RNg83aeIdCMUdCaeaRa8Ua8Wa8SNaRa8XNa8Va8RNMM:mg8SNgINgRaeIdKMUdKaea8RaINg8RaeId3MUd3aea8WaINg8WaeIdaMUdaaeaIa8SNgIaeId8KMUd8Kaea8UaeIdyMUdyaqaAaQcdtfydbc8S2fgea8YaeIdbMUdbaea81aeIdlMUdlaea8ZaeIdwMUdwaea80aeIdxMUdxaeaBaeIdzMUdzaea83aeIdCMUdCaeaRaeIdKMUdKaea8RaeId3MUd3aea8WaeIdaMUdaaeaIaeId8KMUd8Kaea8UaeIdyMUdykaXclfgXcx9hmbkaLcxfhLazcifgzad6mbka8LTmbcbhLinJbbbbh8Xa3abaLcdtfgeclfydbgEcx2fgXIdwa3aeydbgzcx2fgQIdwg8Z:tg8Ra8RNaXIdbaQIdbgB:tg8Wa8WNaXIdlaQIdlg83:tg8Ua8UNMMg80a3aecwfydbgHcx2fgeIdwa8Z:tgINa8Ra8RaINa8WaeIdbaB:tg8SNa8UaeIdla83:tg8VNMMgRN:tJbbbbJbbjZa80aIaINa8Sa8SNa8Va8VNMMg81NaRaRN:tg8Y:va8YJbbbb9BEg8YNhUa81a8RNaIaRN:ta8YNh85a80a8VNa8UaRN:ta8YNh86a81a8UNa8VaRN:ta8YNh87a80a8SNa8WaRN:ta8YNh88a81a8WNa8SaRN:ta8YNh89a8Wa8VNa8Sa8UN:tgRaRNa8UaINa8Va8RN:tgRaRNa8Ra8SNaIa8WN:tgRaRNMM:rJbbbZNhRagaza8L2gwcdtfhXagaHa8L2g8NcdtfhQagaEa8L2g5cdtfhKa8Z:mh8:a83:mhZaB:mhncbhYa8Lh8AJbbbbh8VJbbbbh8YJbbbbh80Jbbbbh81Jbbbbh8ZJbbbbhBJbbbbh83JbbbbhcJbbbbh9cinasc;WbfaYfgecwfaRa85aKIdbaXIdbgI:tg8UNaUaQIdbaI:tg8SNMg8RNUdbaeclfaRa87a8UNa86a8SNMg8WNUdbaeaRa89a8UNa88a8SNMg8UNUdbaecxfaRa8:a8RNaZa8WNaIana8UNMMMgINUdbaRa8Ra8WNNa81Mh81aRa8Ra8UNNa8ZMh8ZaRa8Wa8UNNaBMhBaRaIaINNa8XMh8XaRa8RaINNa8VMh8VaRa8WaINNa8YMh8YaRa8UaINNa80Mh80aRa8Ra8RNNa83Mh83aRa8Wa8WNNacMhcaRa8Ua8UNNa9cMh9caXclfhXaKclfhKaQclfhQaYczfhYa8Acufg8Ambkavazc8S2fgea9caeIdbMUdbaeacaeIdlMUdlaea83aeIdwMUdwaeaBaeIdxMUdxaea8ZaeIdzMUdzaea81aeIdCMUdCaea80aeIdKMUdKaea8YaeId3MUd3aea8VaeIdaMUdaaea8XaeId8KMUd8KaeaRaeIdyMUdyavaEc8S2fgea9caeIdbMUdbaeacaeIdlMUdlaea83aeIdwMUdwaeaBaeIdxMUdxaea8ZaeIdzMUdzaea81aeIdCMUdCaea80aeIdKMUdKaea8YaeId3MUd3aea8VaeIdaMUdaaea8XaeId8KMUd8KaeaRaeIdyMUdyavaHc8S2fgea9caeIdbMUdbaeacaeIdlMUdlaea83aeIdwMUdwaeaBaeIdxMUdxaea8ZaeIdzMUdzaea81aeIdCMUdCaea80aeIdKMUdKaea8YaeId3MUd3aea8VaeIdaMUdaaea8XaeId8KMUd8KaeaRaeIdyMUdyaiawcltfh8AcbhXa8LhKina8AaXfgeasc;WbfaXfgQIdbaeIdbMUdbaeclfgYaQclfIdbaYIdbMUdbaecwfgYaQcwfIdbaYIdbMUdbaecxfgeaQcxfIdbaeIdbMUdbaXczfhXaKcufgKmbkaia5cltfh8AcbhXa8LhKina8AaXfgeasc;WbfaXfgQIdbaeIdbMUdbaeclfgYaQclfIdbaYIdbMUdbaecwfgYaQcwfIdbaYIdbMUdbaecxfgeaQcxfIdbaeIdbMUdbaXczfhXaKcufgKmbkaia8Ncltfh8AcbhXa8LhKina8AaXfgeasc;WbfaXfgQIdbaeIdbMUdbaeclfgYaQclfIdbaYIdbMUdbaecwfgYaQcwfIdbaYIdbMUdbaecxfgeaQcxfIdbaeIdbMUdbaXczfhXaKcufgKmbkaLcifgLad6mbkkcbhQdndnamcwGgJmbJbbbbh8Vcbh9ecbhocbhhxekcbh9ea8Fcbyd:m:jjjbHjjjjbbhhascxfasyd2gecdtfahBdbasaecefgXBd2ascxfaXcdtfcuahalabadaAz:fjjjbgKcltaKcjjjjiGEcbyd:m:jjjbHjjjjbbgoBdbasaecdfBd2aoaKaha3alz:gjjjbJFFuuh8VaKTmbaoheaKhXinaeIdbgRa8Va8VaR9EEh8VaeclfheaXcufgXmbkaKh9ekasydlhTdnalTmbaTclfheaTydbhKaChXalhYcbhQincbaeydbg8AaK9RaXRbbcpeGEaQfhQaXcefhXaeclfhea8AhKaYcufgYmbkaQce4hQkcuadaQ9RcifgScx2aSc;v:Q;v:Qe0Ecbyd:m:jjjbHjjjjbbhDascxfasyd2g9hcdtfaDBdbasa9hcefgeBd2ascxfaecdtfcuaScdtaScFFFFi0Ecbyd:m:jjjbHjjjjbbgrBdbasa9hcdfgeBd2ascxfaecdtfa8Fcbyd:m:jjjbHjjjjbbgyBdbasa9hcifgeBd2ascxfaecdtfalcbyd:m:jjjbHjjjjbbg9iBdbasa9hclfg6Bd2axaxNa8PJbbjZamclGEgUaUN:vh9cJbbbbhcdnadak9nmbdnaSci6mba8Lclth9kaDcwfh0Jbbbbh83JbbbbhcinasclfabadalaAz:cjjjbabhzcbh8Ecbh8Finaba8FcdtfhHcbheindnaAazaefydbgQcdtgEfydbgYaAaHaec;q1jjbfydbcdtfydbgXcdtgwfydbg8ASmbaCaXfRbbgLcv2aCaQfRbbgKfc;G1jjbfRbbg5aKcv2aLfg8Nc;G1jjbfRbbg8MVcFeGTmbdna8AaY9nmba8Nc:G1jjbfRbbcFeGmekaKcufhYdnaKaL9hmbaYcFeGce0mba8JaEfydbaX9hmekdndnaKclSmbaLcl9hmekdnaYcFeGce0mba8JaEfydbaX9hmdkaLcufcFeGce0mba8KawfydbaQ9hmekaDa8Ecx2fgKaXaQa8McFeGgYEBdlaKaQaXaYEBdbaKaYa5Gcb9hBdwa8Ecefh8Ekaeclfgecx9hmbkdna8Fcifg8Fad9pmbazcxfhza8EcifaS9nmekka8ETmdcbhLinaqaAaDaLcx2fgKydbgYcdtgzfydbc8S2fgeIdwa3aKydlg8Acx2fgXIdwg8WNaeIdzaXIdbg8UNaeIdaMgRaRMMa8WNaeIdlaXIdlgINaeIdCa8WNaeId3MgRaRMMaINaeIdba8UNaeIdxaINaeIdKMgRaRMMa8UNaeId8KMMM:lhRJbbbbJbbjZaeIdyg8R:va8RJbbbb9BEh8RdndnaKydwgEmbJFFuuh8YxekJbbbbJbbjZaqaAa8Acdtfydbc8S2fgeIdyg8S:va8SJbbbb9BEaeIdwa3aYcx2fgXIdwg8SNaeIdzaXIdbg8XNaeIdaMg8Ya8YMMa8SNaeIdlaXIdlg8YNaeIdCa8SNaeId3Mg8Sa8SMMa8YNaeIdba8XNaeIdxa8YNaeIdKMg8Sa8SMMa8XNaeId8KMMM:lNh8Yka8RaRNh80dna8LTmbavaYc8S2fgQIdwa8WNaQIdza8UNaQIdaMgRaRMMa8WNaQIdlaINaQIdCa8WNaQId3MgRaRMMaINaQIdba8UNaQIdxaINaQIdKMgRaRMMa8UNaQId8KMMMhRaga8Aa8L2gHcdtfhXaiaYa8L2gwcltfheaQIdyh8Sa8LhQinaXIdbg8Ra8Ra8SNaecxfIdba8WaecwfIdbNa8UaeIdbNaIaeclfIdbNMMMg8Ra8RM:tNaRMhRaXclfhXaeczfheaQcufgQmbkdndnaEmbJbbbbh8Rxekava8Ac8S2fgQIdwa3aYcx2fgeIdwg8UNaQIdzaeIdbgINaQIdaMg8Ra8RMMa8UNaQIdlaeIdlg8SNaQIdCa8UNaQId3Mg8Ra8RMMa8SNaQIdbaINaQIdxa8SNaQIdKMg8Ra8RMMaINaQId8KMMMh8RagawcdtfhXaiaHcltfheaQIdyh8Xa8LhQinaXIdbg8Wa8Wa8XNaecxfIdba8UaecwfIdbNaIaeIdbNa8SaeclfIdbNMMMg8Wa8WM:tNa8RMh8RaXclfhXaeczfheaQcufgQmbka8R:lh8Rka80aR:lMh80a8Ya8RMh8YaCaYfRbbcd9hmbdna8Ka8Ja8Jazfydba8ASEaaazfydbgHcdtfydbgzcu9hmbaaa8AcdtfydbhzkavaHc8S2fgQIdwa3azcx2fgeIdwg8WNaQIdzaeIdbg8UNaQIdaMgRaRMMa8WNaQIdlaeIdlgINaQIdCa8WNaQId3MgRaRMMaINaQIdba8UNaQIdxaINaQIdKMgRaRMMa8UNaQId8KMMMhRagaza8L2gwcdtfhXaiaHa8L2g8NcltfheaQIdyh8Sa8LhQinaXIdbg8Ra8Ra8SNaecxfIdba8WaecwfIdbNa8UaeIdbNaIaeclfIdbNMMMg8Ra8RM:tNaRMhRaXclfhXaeczfheaQcufgQmbkdndnaEmbJbbbbh8Rxekavazc8S2fgQIdwa3aHcx2fgeIdwg8UNaQIdzaeIdbgINaQIdaMg8Ra8RMMa8UNaQIdlaeIdlg8SNaQIdCa8UNaQId3Mg8Ra8RMMa8SNaQIdbaINaQIdxa8SNaQIdKMg8Ra8RMMaINaQId8KMMMh8Raga8NcdtfhXaiawcltfheaQIdyh8Xa8LhQinaXIdbg8Wa8Wa8XNaecxfIdba8UaecwfIdbNaIaeIdbNa8SaeclfIdbNMMMg8Wa8WM:tNa8RMh8RaXclfhXaeczfheaQcufgQmbka8R:lh8Rka80aR:lMh80a8Ya8RMh8YkaKa80a8Ya80a8Y9FgeEUdwaKa8AaYaeaETVgeEBdlaKaYa8AaeEBdbaLcefgLa8E9hmbkasc;Wbfcbcj;qbz:ojjjb8Aa0hea8EhXinasc;WbfaeydbcA4cF8FGgQcFAaQcFA6EcdtfgQaQydbcefBdbaecxfheaXcufgXmbkcbhecbhXinasc;WbfaefgQydbhKaQaXBdbaKaXfhXaeclfgecj;qb9hmbkcbhea0hXinasc;WbfaXydbcA4cF8FGgQcFAaQcFA6EcdtfgQaQydbgQcefBdbaraQcdtfaeBdbaXcxfhXa8Eaecefge9hmbkadak9RgQci9Uh9mdnalTmbcbheayhXinaXaeBdbaXclfhXalaecefge9hmbkkcbh9na9icbalz:ojjjbh8FaQcO9Uh9oa9mce4h9pasydwh9qcbh8Mcbh5dninaDara5cdtfydbcx2fg8NIdwgRa9c9Emea8Ma9m9pmeJFFuuh8Rdna9pa8E9pmbaDara9pcdtfydbcx2fIdwJbb;aZNh8RkdnaRa8R9ETmbaRac9ETmba8Ma9o0mdkdna8FaAa8NydlgHcdtg9rfydbgKfg9sRbba8FaAa8Nydbgzcdtg9tfydbgefg9uRbbVmbaCazfRbbh9vdnaTaecdtfgXclfydbgQaXydbgXSmbaQaX9RhYa3aKcx2fhLa3aecx2fhEa9qaXcitfhecbhXcehwdnindnayaeydbcdtfydbgQaKSmbayaeclfydbcdtfydbg8AaKSmbaQa8ASmba3a8Acx2fg8AIdba3aQcx2fgQIdbg8W:tgRaEIdlaQIdlg8U:tg8XNaEIdba8W:tg8Ya8AIdla8U:tg8RN:tgIaRaLIdla8U:tg80NaLIdba8W:tg81a8RN:tg8UNa8RaEIdwaQIdwg8S:tg8ZNa8Xa8AIdwa8S:tg8WN:tg8Xa8RaLIdwa8S:tgBNa80a8WN:tg8RNa8Wa8YNa8ZaRN:tg8Sa8Wa81NaBaRN:tgRNMMaIaINa8Xa8XNa8Sa8SNMMa8Ua8UNa8Ra8RNaRaRNMMN:rJbbj8:N9FmdkaecwfheaXcefgXaY6hwaYaX9hmbkkawceGTmba9pcefh9pxekdndndndna9vc9:fPdebdkazheinayaecdtgefaHBdbaaaefydbgeaz9hmbxikkdna8Ka8Ja8Ja9tfydbaHSEaaa9tfydbgzcdtfydbgecu9hmbaaa9rfydbhekaya9tfaHBdbaehHkayazcdtfaHBdbka9uce86bba9sce86bba8NIdwgRacacaR9DEhca9ncefh9ncecda9vceSEa8Mfh8Mka5cefg5a8E9hmbkka9nTmddnalTmbcbh8AcbhEindnayaEcdtgefydbgQaESmbaAaQcdtfydbhzdnaEaAaefydb9hgHmbaqazc8S2fgeaqaEc8S2fgXIdbaeIdbMUdbaeaXIdlaeIdlMUdlaeaXIdwaeIdwMUdwaeaXIdxaeIdxMUdxaeaXIdzaeIdzMUdzaeaXIdCaeIdCMUdCaeaXIdKaeIdKMUdKaeaXId3aeId3MUd3aeaXIdaaeIdaMUdaaeaXId8KaeId8KMUd8KaeaXIdyaeIdyMUdyka8LTmbavaQc8S2fgeavaEc8S2gwfgXIdbaeIdbMUdbaeaXIdlaeIdlMUdlaeaXIdwaeIdwMUdwaeaXIdxaeIdxMUdxaeaXIdzaeIdzMUdzaeaXIdCaeIdCMUdCaeaXIdKaeIdKMUdKaeaXId3aeId3MUd3aeaXIdaaeIdaMUdaaeaXId8KaeId8KMUd8KaeaXIdyaeIdyMUdya9kaQ2hLaihXa8LhKinaXaLfgeaXa8AfgQIdbaeIdbMUdbaeclfgYaQclfIdbaYIdbMUdbaecwfgYaQcwfIdbaYIdbMUdbaecxfgeaQcxfIdbaeIdbMUdbaXczfhXaKcufgKmbkaHmbJbbbbJbbjZaqawfgeIdygR:vaRJbbbb9BEaeIdwa3azcx2fgXIdwgRNaeIdzaXIdbg8RNaeIdaMg8Wa8WMMaRNaeIdlaXIdlg8WNaeIdCaRNaeId3MgRaRMMa8WNaeIdba8RNaeIdxa8WNaeIdKMgRaRMMa8RNaeId8KMMM:lNgRa83a83aR9DEh83ka8Aa9kfh8AaEcefgEal9hmbkcbhXa8JheindnaeydbgQcuSmbdnaXayaQcdtgKfydbgQ9hmbcuhQa8JaKfydbgKcuSmbayaKcdtfydbhQkaeaQBdbkaeclfhealaXcefgX9hmbkcbhXa8KheindnaeydbgQcuSmbdnaXayaQcdtgKfydbgQ9hmbcuhQa8KaKfydbgKcuSmbayaKcdtfydbhQkaeaQBdbkaeclfhealaXcefgX9hmbkka83aca8LEh83cbhKabhecbhYindnayaeydbcdtfydbgXayaeclfydbcdtfydbgQSmbaXayaecwfydbcdtfydbg8ASmbaQa8ASmbabaKcdtfgLaXBdbaLcwfa8ABdbaLclfaQBdbaKcifhKkaecxfheaYcifgYad6mbkdndnaJTmbaKak9nmba8Va839FTmbcbhdabhecbhXindnaoahaeydbgQcdtfydbcdtfIdba839ETmbabadcdtfgYaQBdbaYclfaeclfydbBdbaYcwfaecwfydbBdbadcifhdkaecxfheaXcifgXaK6mbkJFFuuh8Va9eTmeaohea9ehXJFFuuhRinaeIdbg8RaRaRa8R9EEg8WaRa8Ra839EgQEhRa8Wa8VaQEh8VaeclfheaXcufgXmbxdkkaKhdkadak0mbxdkkasclfabadalaAz:cjjjbkdndnadak0mbadhXxekdnaJmbadhXxekdna8Va9c9FmbadhXxekina8VJbb;aZNgRa9caRa9c9DEh8WJbbbbhRdna9eTmbaohea9ehAinaeIdbg8RaRa8Ra8W9FEaRa8RaR9EEhRaeclfheaAcufgAmbkkcbhXabhecbhAindnaoahaeydbgQcdtfydbcdtfIdba8W9ETmbabaXcdtfgKaQBdbaKclfaeclfydbBdbaKcwfaecwfydbBdbaXcifhXkaecxfheaAcifgAad6mbkJFFuuh8Vdna9eTmbaohea9ehAJFFuuh8RinaeIdbg8Ua8Ra8Ra8U9EEgIa8Ra8Ua8W9EgQEh8RaIa8VaQEh8VaeclfheaAcufgAmbkkdnaXad9hmbadhXxdkaRacacaR9DEhcaXak9nmeaXhda8Va9c9FmbkkdnamcjjjjlGTmbaOmbaXTmbcbh8AabheinaCaeydbgKfRbbc3thLaecwfgEydbhAdndna8JaKcdtgHfydbaeclfgzydbgQSmbcbhYa8KaQcdtfydbaK9hmekcjjjj94hYkaeaLaYVaKVBdbaCaQfRbbc3thLdndna8JaQcdtfydbaASmbcbhYa8KaAcdtfydbaQ9hmekcjjjj94hYkazaLaYVaQVBdbaCaAfRbbc3thYdndna8JaAcdtfydbaKSmbcbhQa8KaHfydbaA9hmekcjjjj94hQkaEaYaQVaAVBdbaecxfhea8Acifg8AaX6mbkkdnaOTmbaXTmbaXheinabaOabydbcdtfydbBdbabclfhbaecufgembkkdnaPTmbaPaUac:rNUdbka9hcdtascxffcxfhednina6Tmeaeydbcbyd1:jjjbH:bjjjbbaec98fhea6cufh6xbkkasc;W;qbf8KjjjjbaXk;Yieouabydlhvabydbclfcbaicdtz:ojjjbhoadci9UhrdnadTmbdnalTmbaehwadhDinaoalawydbcdtfydbcdtfgqaqydbcefBdbawclfhwaDcufgDmbxdkkaehwadhDinaoawydbcdtfgqaqydbcefBdbawclfhwaDcufgDmbkkdnaiTmbcbhDaohwinawydbhqawaDBdbawclfhwaqaDfhDaicufgimbkkdnadci6mbinaecwfydbhwaeclfydbhDaeydbhidnalTmbalawcdtfydbhwalaDcdtfydbhDalaicdtfydbhikavaoaicdtfgqydbcitfaDBdbavaqydbcitfawBdlaqaqydbcefBdbavaoaDcdtfgqydbcitfawBdbavaqydbcitfaiBdlaqaqydbcefBdbavaoawcdtfgwydbcitfaiBdbavawydbcitfaDBdlawawydbcefBdbaecxfhearcufgrmbkkabydbcbBdbk:todDue99aicd4aifhrcehwinawgDcethwaDar6mbkcuaDcdtgraDcFFFFi0Ecbyd:m:jjjbHjjjjbbhwaoaoyd9GgqcefBd9GaoaqcdtfawBdbawcFearz:ojjjbhkdnaiTmbalcd4hlaDcufhxcbhminamhDdnavTmbavamcdtfydbhDkcbadaDal2cdtfgDydlgwawcjjjj94SEgwcH4aw7c:F:b:DD2cbaDydbgwawcjjjj94SEgwcH4aw7c;D;O:B8J27cbaDydwgDaDcjjjj94SEgDcH4aD7c:3F;N8N27axGhwamcdthPdndndnavTmbakawcdtfgrydbgDcuSmeadavaPfydbal2cdtfgsIdbhzcehqinaqhrdnadavaDcdtfydbal2cdtfgqIdbaz9CmbaqIdlasIdl9CmbaqIdwasIdw9BmlkarcefhqakawarfaxGgwcdtfgrydbgDcu9hmbxdkkakawcdtfgrydbgDcuSmbadamal2cdtfgsIdbhzcehqinaqhrdnadaDal2cdtfgqIdbaz9CmbaqIdlasIdl9CmbaqIdwasIdw9BmikarcefhqakawarfaxGgwcdtfgrydbgDcu9hmbkkaramBdbamhDkabaPfaDBdbamcefgmai9hmbkkakcbyd1:jjjbH:bjjjbbaoaoyd9GcufBd9GdnaeTmbaiTmbcbhDaehwinawaDBdbawclfhwaiaDcefgD9hmbkcbhDaehwindnaDabydbgrSmbawaearcdtfgrydbBdbaraDBdbkawclfhwabclfhbaiaDcefgD9hmbkkk;Qodvuv998Jjjjjbca9Rgvczfcwfcbyd11jjbBdbavcb8Pdj1jjb83izavcwfcbydN1jjbBdbavcb8Pd:m1jjb83ibdnadTmbaicd4hodnabmbdnalTmbcbhrinaealarcdtfydbao2cdtfhwcbhiinavczfaifgDawaifIdbgqaDIdbgkakaq9EEUdbavaifgDaqaDIdbgkakaq9DEUdbaiclfgicx9hmbkarcefgrad9hmbxikkaocdthrcbhwincbhiinavczfaifgDaeaifIdbgqaDIdbgkakaq9EEUdbavaifgDaqaDIdbgkakaq9DEUdbaiclfgicx9hmbkaearfheawcefgwad9hmbxdkkdnalTmbcbhrinabarcx2fgiaealarcdtfydbao2cdtfgwIdbUdbaiawIdlUdlaiawIdwUdwcbhiinavczfaifgDawaifIdbgqaDIdbgkakaq9EEUdbavaifgDaqaDIdbgkakaq9DEUdbaiclfgicx9hmbkarcefgrad9hmbxdkkaocdthlcbhraehwinabarcx2fgiaearao2cdtfgDIdbUdbaiaDIdlUdlaiaDIdwUdwcbhiinavczfaifgDawaifIdbgqaDIdbgkakaq9EEUdbavaifgDaqaDIdbgkakaq9DEUdbaiclfgicx9hmbkawalfhwarcefgrad9hmbkkJbbbbavIdbavIdzgk:tgqaqJbbbb9DEgqavIdlavIdCgx:tgmamaq9DEgqavIdwavIdKgm:tgPaPaq9DEhPdnabTmbadTmbJbbbbJbbjZaP:vaPJbbbb9BEhqinabaqabIdbak:tNUdbabclfgvaqavIdbax:tNUdbabcwfgvaqavIdbam:tNUdbabcxfhbadcufgdmbkkaPk:ZlewudnaeTmbcbhvabhoinaoavBdbaoclfhoaeavcefgv9hmbkkdnaiTmbcbhrinadarcdtfhwcbhDinalawaDcdtgvc;a1jjbfydbcdtfydbcdtfydbhodnabalawavfydbcdtfydbgqcdtfgkydbgvaqSmbinakabavgqcdtfgxydbgvBdbaxhkaqav9hmbkkdnabaocdtfgkydbgvaoSmbinakabavgocdtfgxydbgvBdbaxhkaoav9hmbkkdnaqaoSmbabaqaoaqao0Ecdtfaqaoaqao6EBdbkaDcefgDci9hmbkarcifgrai6mbkkdnaembcbskcbhxindnalaxcdtgvfydbax9hmbaxhodnabavfgDydbgvaxSmbaDhqinaqabavgocdtfgkydbgvBdbakhqaoav9hmbkkaDaoBdbkaxcefgxae9hmbkcbhvabhocbhkindndnavalydbgq9hmbdnavaoydbgq9hmbaoakBdbakcefhkxdkaoabaqcdtfydbBdbxekaoabaqcdtfydbBdbkaoclfhoalclfhlaeavcefgv9hmbkakk;Jiilud99duabcbaecltz:ojjjbhvdnalTmbadhoaihralhwinarcwfIdbhDarclfIdbhqavaoydbcltfgkarIdbakIdbMUdbakclfgxaqaxIdbMUdbakcwfgxaDaxIdbMUdbakcxfgkakIdbJbbjZMUdbaoclfhoarcxfhrawcufgwmbkkdnaeTmbavhraehkinarcxfgoIdbhDaocbBdbararIdbJbbbbJbbjZaD:vaDJbbbb9BEgDNUdbarclfgoaDaoIdbNUdbarcwfgoaDaoIdbNUdbarczfhrakcufgkmbkkdnalTmbinavadydbcltfgrcxfgkaicwfIdbarcwfIdb:tgDaDNaiIdbarIdb:tgDaDNaiclfIdbarclfIdb:tgDaDNMMgDakIdbgqaqaD9DEUdbadclfhdaicxfhialcufglmbkkdnaeTmbavcxfhrinabarIdbUdbarczfhrabclfhbaecufgembkkk8MbabaeadaialavcbcbcbcbcbaoarawaDz:bjjjbk8MbabaeadaialavaoarawaDaqakaxamaPz:bjjjbk:DCoDud99rue99iul998Jjjjjbc;Wb9Rgw8KjjjjbdndnarmbcbhDxekawcxfcbc;Kbz:ojjjb8Aawcuadcx2adc;v:Q;v:Qe0Ecbyd:m:jjjbHjjjjbbgqBdxawceBd2aqaeadaicbz:ejjjb8AawcuadcdtadcFFFFi0Egkcbyd:m:jjjbHjjjjbbgxBdzawcdBd2adcd4adfhmceheinaegicetheaiam6mbkcbhPawcuaicdtgsaicFFFFi0Ecbyd:m:jjjbHjjjjbbgzBdCawciBd2dndnar:ZgH:rJbbbZMgO:lJbbb9p9DTmbaO:Ohexekcjjjj94hekaicufhAc:bwhmcbhCadhXcbhQinaChLaeamgKcufaeaK9iEaPgDcefaeaD9kEhYdndnadTmbaYcuf:YhOaqhiaxheadhmindndnaiIdbaONJbbbZMg8A:lJbbb9p9DTmba8A:OhCxekcjjjj94hCkaCcCthCdndnaiclfIdbaONJbbbZMg8A:lJbbb9p9DTmba8A:OhExekcjjjj94hEkaEcqtaCVhCdndnaicwfIdbaONJbbbZMg8A:lJbbb9p9DTmba8A:OhExekcjjjj94hEkaeaCaEVBdbaicxfhiaeclfheamcufgmmbkazcFeasz:ojjjbh3cbh5cbhPindna3axaPcdtfydbgCcm4aC7c:v;t;h;Ev2gics4ai7aAGgmcdtfgEydbgecuSmbaeaCSmbcehiina3amaifaAGgmcdtfgEydbgecuSmeaicefhiaeaC9hmbkkaEaCBdba5aecuSfh5aPcefgPad9hmbxdkkazcFeasz:ojjjb8Acbh5kaDaYa5ar0giEhPaLa5aiEhCdna5arSmbaYaKaiEgmaP9Rcd9imbdndnaQcl0mbdnaX:ZgOaL:Zg8A:taY:Yg8EaD:Y:tg8Fa8EaK:Y:tgaa5:ZghaH:tNNNaOaH:taaNa8Aah:tNa8AaH:ta8FNahaO:tNM:va8EMJbbbZMgO:lJbbb9p9DTmbaO:Ohexdkcjjjj94hexekaPamfcd9Theka5aXaiEhXaQcefgQcs9hmekkdndnaCmbcihicbhDxekcbhiawakcbyd:m:jjjbHjjjjbbg5BdKawclBd2aPcuf:Yh8AdndnadTmbaqhiaxheadhmindndnaiIdba8ANJbbbZMgO:lJbbb9p9DTmbaO:OhCxekcjjjj94hCkaCcCthCdndnaiclfIdba8ANJbbbZMgO:lJbbb9p9DTmbaO:OhExekcjjjj94hEkaEcqtaCVhCdndnaicwfIdba8ANJbbbZMgO:lJbbb9p9DTmbaO:OhExekcjjjj94hEkaeaCaEVBdbaicxfhiaeclfheamcufgmmbkazcFeasz:ojjjbh3cbhDcbhYindndndna3axaYcdtgKfydbgCcm4aC7c:v;t;h;Ev2gics4ai7aAGgmcdtfgEydbgecuSmbcehiinaxaecdtgefydbaCSmdamaifheaicefhia3aeaAGgmcdtfgEydbgecu9hmbkkaEaYBdbaDhiaDcefhDxeka5aefydbhika5aKfaiBdbaYcefgYad9hmbkcuaDc32giaDc;j:KM;jb0EhexekazcFeasz:ojjjb8AcbhDcbhekawaecbyd:m:jjjbHjjjjbbgeBd3awcvBd2aecbaiz:ojjjbhEavcd4hKdnadTmbdnalTmbaKcdth3a5hCaqhealhmadhAinaEaCydbc32fgiaeIdbaiIdbMUdbaiaeclfIdbaiIdlMUdlaiaecwfIdbaiIdwMUdwaiamIdbaiIdxMUdxaiamclfIdbaiIdzMUdzaiamcwfIdbaiIdCMUdCaiaiIdKJbbjZMUdKaCclfhCaecxfheama3fhmaAcufgAmbxdkka5hmaqheadhCinaEamydbc32fgiaeIdbaiIdbMUdbaiaeclfIdbaiIdlMUdlaiaecwfIdbaiIdwMUdwaiaiIdxJbbbbMUdxaiaiIdzJbbbbMUdzaiaiIdCJbbbbMUdCaiaiIdKJbbjZMUdKamclfhmaecxfheaCcufgCmbkkdnaDTmbaEhiaDheinaiaiIdbJbbbbJbbjZaicKfIdbgO:vaOJbbbb9BEgONUdbaiclfgmaOamIdbNUdbaicwfgmaOamIdbNUdbaicxfgmaOamIdbNUdbaiczfgmaOamIdbNUdbaicCfgmaOamIdbNUdbaic3fhiaecufgembkkcbhCawcuaDcdtgYaDcFFFFi0Egicbyd:m:jjjbHjjjjbbgeBdaawcoBd2awaicbyd:m:jjjbHjjjjbbg3Bd8KaecFeaYz:ojjjbhxdnadTmbJbbjZJbbjZa8A:vaPceSEaoNgOaONh8AaKcdthPalheina8Aaec;81jjbalEgmIdwaEa5ydbgAc32fgiIdC:tgOaONamIdbaiIdx:tgOaONamIdlaiIdz:tgOaONMMNaqcwfIdbaiIdw:tgOaONaqIdbaiIdb:tgOaONaqclfIdbaiIdl:tgOaONMMMhOdndnaxaAcdtgifgmydbcuSmba3aifIdbaO9ETmekamaCBdba3aifaOUdbka5clfh5aqcxfhqaeaPfheadaCcefgC9hmbkkabaxaYz:njjjb8AcrhikaicdthiinaiTmeaic98fgiawcxffydbcbyd1:jjjbH:bjjjbbxbkkawc;Wbf8KjjjjbaDk:Ydidui99ducbhi8Jjjjjbca9Rglczfcwfcbyd11jjbBdbalcb8Pdj1jjb83izalcwfcbydN1jjbBdbalcb8Pd:m1jjb83ibdndnaembJbbjFhvJbbjFhoJbbjFhrxekadcd4cdthwincbhdinalczfadfgDabadfIdbgvaDIdbgoaoav9EEUdbaladfgDavaDIdbgoaoav9DEUdbadclfgdcx9hmbkabawfhbaicefgiae9hmbkalIdwalIdK:thralIdlalIdC:thoalIdbalIdz:thvkJbbbbavavJbbbb9DEgvaoaoav9DEgvararav9DEk9DeeuabcFeaicdtz:ojjjbhlcbhbdnadTmbindnalaeydbcdtfgiydbcu9hmbaiabBdbabcefhbkaeclfheadcufgdmbkkabk9teiucbcbyd:q:jjjbgeabcifc98GfgbBd:q:jjjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;teeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiaeydlBdlaiaeydwBdwaiaeydxBdxaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk:3eedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdxaialBdwaialBdlaialBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd:q:jjjbgeabcrfc94GfgbBd:q:jjjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik9:eiuZbhedndncbyd:q:jjjbgdaecztgi9nmbcuheadai9RcFFifcz4nbcuSmekadhekcbabae9Rcifc98Gcbyd:q:jjjbfgdBd:q:jjjbdnadZbcztge9nmbadae9RcFFifcz4nb8Akkk:Iedbcjwk1eFFuuFFuuFFuuFFuFFFuFFFuFbbbbbbbbeeebeebebbeeebebbbbbebebbbbbbbbbebbbdbbbbbbbebbbebbbdbbbbbbbbbbbeeeeebebbebbebebbbeebbbbbbbbbbbbbbbbbbbbbc1Dkxebbbdbbb:GNbb",e=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var t,n=WebAssembly.instantiate(i(a),{}).then(function(b){t=b.instance,t.exports.__wasm_call_ctors()});function i(b){for(var g=new Uint8Array(b.length),m=0;m<b.length;++m){var p=b.charCodeAt(m);g[m]=p>96?p-97:p>64?p-39:p+4}for(var v=0,m=0;m<b.length;++m)g[v++]=g[m]<60?e[g[m]]:(g[m]-60)*64+g[++m];return g.buffer.slice(0,v)}function s(b){if(!b)throw new Error("Assertion failed")}function r(b){return new Uint8Array(b.buffer,b.byteOffset,b.byteLength)}function o(b,g,m){var p=t.exports.sbrk,v=p(g.length*4),y=p(m*4),x=new Uint8Array(t.exports.memory.buffer),_=r(g);x.set(_,v);var S=b(y,v,g.length,m);x=new Uint8Array(t.exports.memory.buffer);var E=new Uint32Array(m);new Uint8Array(E.buffer).set(x.subarray(y,y+m*4)),_.set(x.subarray(v,v+g.length*4)),p(v-p(0));for(var R=0;R<g.length;++R)g[R]=E[g[R]];return[E,S]}function c(b){for(var g=0,m=0;m<b.length;++m){var p=b[m];g=g<p?p:g}return g}function l(b,g,m,p,v,y,x,_,S){var E=t.exports.sbrk,R=E(4),M=E(m*4),w=E(v*y),I=E(m*4),P=new Uint8Array(t.exports.memory.buffer);P.set(r(p),w),P.set(r(g),I);var F=b(M,I,m,w,v,y,x,_,S,R);P=new Uint8Array(t.exports.memory.buffer);var N=new Uint32Array(F);r(N).set(P.subarray(M,M+F*4));var O=new Float32Array(1);return r(O).set(P.subarray(R,R+4)),E(R-E(0)),[N,O[0]]}function d(b,g,m,p,v,y,x,_,S,E,R,M,w){var I=t.exports.sbrk,P=I(4),F=I(m*4),N=I(v*y),O=I(v*_),j=I(S.length*4),J=I(m*4),H=E?I(v):0,Q=new Uint8Array(t.exports.memory.buffer);Q.set(r(p),N),Q.set(r(x),O),Q.set(r(S),j),Q.set(r(g),J),E&&Q.set(r(E),H);var ce=b(F,J,m,N,v,y,O,_,j,S.length,H,R,M,w,P);Q=new Uint8Array(t.exports.memory.buffer);var xe=new Uint32Array(ce);r(xe).set(Q.subarray(F,F+ce*4));var Ue=new Float32Array(1);return r(Ue).set(Q.subarray(P,P+4)),I(P-I(0)),[xe,Ue[0]]}function h(b,g,m,p){var v=t.exports.sbrk,y=v(m*p),x=new Uint8Array(t.exports.memory.buffer);x.set(r(g),y);var _=b(y,m,p);return v(y-v(0)),_}function u(b,g,m,p,v,y,x,_){var S=t.exports.sbrk,E=S(_*4),R=S(m*p),M=S(m*y),w=new Uint8Array(t.exports.memory.buffer);w.set(r(g),R),v&&w.set(r(v),M);var I=b(E,R,m,p,M,y,x,_);w=new Uint8Array(t.exports.memory.buffer);var P=new Uint32Array(I);return r(P).set(w.subarray(E,E+I*4)),S(E-S(0)),P}var f={LockBorder:1,Sparse:2,ErrorAbsolute:4,Prune:8,_InternalDebug:1<<30};return{ready:n,supported:!0,compactMesh:function(b){s(b instanceof Uint32Array||b instanceof Int32Array||b instanceof Uint16Array||b instanceof Int16Array),s(b.length%3==0);var g=b.BYTES_PER_ELEMENT==4?b:new Uint32Array(b);return o(t.exports.meshopt_optimizeVertexFetchRemap,g,c(b)+1)},simplify:function(b,g,m,p,v,y){s(b instanceof Uint32Array||b instanceof Int32Array||b instanceof Uint16Array||b instanceof Int16Array),s(b.length%3==0),s(g instanceof Float32Array),s(g.length%m==0),s(m>=3),s(p>=0&&p<=b.length),s(p%3==0),s(v>=0);for(var x=0,_=0;_<(y?y.length:0);++_)s(y[_]in f),x|=f[y[_]];var S=b.BYTES_PER_ELEMENT==4?b:new Uint32Array(b),E=l(t.exports.meshopt_simplify,S,b.length,g,g.length/m,m*4,p,v,x);return E[0]=b instanceof Uint32Array?E[0]:new b.constructor(E[0]),E},simplifyWithAttributes:function(b,g,m,p,v,y,x,_,S,E){s(b instanceof Uint32Array||b instanceof Int32Array||b instanceof Uint16Array||b instanceof Int16Array),s(b.length%3==0),s(g instanceof Float32Array),s(g.length%m==0),s(m>=3),s(p instanceof Float32Array),s(p.length%v==0),s(v>=0),s(x==null||x instanceof Uint8Array),s(x==null||x.length==g.length/m),s(_>=0&&_<=b.length),s(_%3==0),s(S>=0),s(Array.isArray(y)),s(v>=y.length),s(y.length<=32);for(var R=0;R<y.length;++R)s(y[R]>=0);for(var M=0,R=0;R<(E?E.length:0);++R)s(E[R]in f),M|=f[E[R]];var w=b.BYTES_PER_ELEMENT==4?b:new Uint32Array(b),I=d(t.exports.meshopt_simplifyWithAttributes,w,b.length,g,g.length/m,m*4,p,v*4,new Float32Array(y),x?new Uint8Array(x):null,_,S,M);return I[0]=b instanceof Uint32Array?I[0]:new b.constructor(I[0]),I},getScale:function(b,g){return s(b instanceof Float32Array),s(b.length%g==0),s(g>=3),h(t.exports.meshopt_simplifyScale,b,b.length/g,g*4)},simplifyPoints:function(b,g,m,p,v,y){return s(b instanceof Float32Array),s(b.length%g==0),s(g>=3),s(m>=0&&m<=b.length/g),p?(s(p instanceof Float32Array),s(p.length%v==0),s(v>=3),s(b.length/g==p.length/v),u(t.exports.meshopt_simplifyPoints,b,b.length/g,g*4,p,v*4,y,m)):u(t.exports.meshopt_simplifyPoints,b,b.length/g,g*4,void 0,0,0,m)}}})();var FE=(function(){var a="b9H79TebbbeVx9Geueu9Geub9Gbb9Giuuueu9Gmuuuuuuuuuuu9999eu9Gvuuuuueu9Gwuuuuuuuub9Gxuuuuuuuuuuuueu9Gkuuuuuuuuuu99eu9Gouuuuuub9Gruuuuuuub9GluuuubiOHdilvorwDqqkbiibeilve9Weiiviebeoweuec;G:Odkr:Yewo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9I919P29K9nW79O2Wt79c9V919U9KbeX9TW79O9V9Wt9F9I919P29K9nW79O2Wt7bo39TW79O9V9Wt9F9J9V9T9W91tWJ2917tWV9c9V919U9K7br39TW79O9V9Wt9F9J9V9T9W91tW9nW79O2Wt9c9V919U9K7bDL9TW79O9V9Wt9F9V9Wt9P9T9P96W9nW79O2Wtbql79IV9RbkDwebcekdsPq;Q9BHdbkIbabaec9:fgefcufae9Ugeabci9Uadfcufad9Ugbaeab0Ek:w8KDPue99eux99dui99euo99iu8Jjjjjbc:WD9Rgm8KjjjjbdndnalmbcbhPxekamc:Cwfcbc;Kbz:njjjb8Adndnalcb9imbaoal9nmbamcuaocdtaocFFFFi0Egscbyd;y1jjbHjjjjbbgzBd:CwamceBd;8wamascbyd;y1jjbHjjjjbbgHBd:GwamcdBd;8wamcualcdtalcFFFFi0Ecbyd;y1jjbHjjjjbbgOBd:KwamciBd;8waihsalhAinazasydbcdtfcbBdbasclfhsaAcufgAmbkaihsalhAinazasydbcdtfgCaCydbcefBdbasclfhsaAcufgAmbkaihsalhCcbhXindnazasydbcdtgQfgAydbcb9imbaHaQfaXBdbaAaAydbgQcjjjj94VBdbaQaXfhXkasclfhsaCcufgCmbkalci9UhLdnalci6mbcbhsaihAinaAcwfydbhCaAclfydbhXaHaAydbcdtfgQaQydbgQcefBdbaOaQcdtfasBdbaHaXcdtfgXaXydbgXcefBdbaOaXcdtfasBdbaHaCcdtfgCaCydbgCcefBdbaOaCcdtfasBdbaAcxfhAaLascefgs9hmbkkaihsalhAindnazasydbcdtgCfgXydbgQcu9kmbaXaQcFFFFrGgQBdbaHaCfgCaCydbaQ9RBdbkasclfhsaAcufgAmbxdkkamcuaocdtgsaocFFFFi0EgAcbyd;y1jjbHjjjjbbgzBd:CwamceBd;8wamaAcbyd;y1jjbHjjjjbbgHBd:GwamcdBd;8wamcualcdtalcFFFFi0Ecbyd;y1jjbHjjjjbbgOBd:KwamciBd;8wazcbasz:njjjbhXalci9UhLaihsalhAinaXasydbcdtfgCaCydbcefBdbasclfhsaAcufgAmbkdnaoTmbcbhsaHhAaXhCaohQinaAasBdbaAclfhAaCydbasfhsaCclfhCaQcufgQmbkkdnalci6mbcbhsaihAinaAcwfydbhCaAclfydbhQaHaAydbcdtfgKaKydbgKcefBdbaOaKcdtfasBdbaHaQcdtfgQaQydbgQcefBdbaOaQcdtfasBdbaHaCcdtfgCaCydbgCcefBdbaOaCcdtfasBdbaAcxfhAaLascefgs9hmbkkaoTmbcbhsaohAinaHasfgCaCydbaXasfydb9RBdbasclfhsaAcufgAmbkkamaLcbyd;y1jjbHjjjjbbgsBd:OwamclBd;8wascbaLz:njjjbhYamcuaLcK2alcjjjjd0Ecbyd;y1jjbHjjjjbbg8ABd:SwamcvBd;8wJbbbbhEdnalci6g3mbarcd4hKaihAa8AhsaLhrJbbbbh5inavaAclfydbaK2cdtfgCIdlh8EavaAydbaK2cdtfgXIdlhEavaAcwfydbaK2cdtfgQIdlh8FaCIdwhaaXIdwhhaQIdwhgasaCIdbg8JaXIdbg8KMaQIdbg8LMJbbnn:vUdbasclfaXIdlaCIdlMaQIdlMJbbnn:vUdbaQIdwh8MaCIdwh8NaXIdwhyascxfa8EaE:tg8Eagah:tggNa8FaE:tg8Faaah:tgaN:tgEJbbbbJbbjZa8Ja8K:tg8Ja8FNa8La8K:tg8Ka8EN:tghahNaEaENaaa8KNaga8JN:tgEaENMM:rg8K:va8KJbbbb9BEg8ENUdbasczfaEa8ENUdbascCfaha8ENUdbascwfa8Maya8NMMJbbnn:vUdba5a8KMh5aAcxfhAascKfhsarcufgrmbka5aL:Z:vJbbbZNhEkamcuaLcdtalcFFFF970Ecbyd;y1jjbHjjjjbbgCBd:WwamcoBd;8waEaq:ZNhEdna3mbcbhsaChAinaAasBdbaAclfhAaLascefgs9hmbkkaE:rhhcuh8PamcuaLcltalcFFFFd0Ecbyd;y1jjbHjjjjbbgIBd:0wamcrBd;8wcbaIa8AaCaLz:djjjb8AJFFuuhyJFFuuh8RJFFuuh8Sdnalci6gXmbJFFuuh8Sa8AhsaLhAJFFuuh8RJFFuuhyinascwfIdbgEayayaE9EEhyasclfIdbgEa8Ra8RaE9EEh8RasIdbgEa8Sa8SaE9EEh8SascKfhsaAcufgAmbkkahJbbbZNhgamaocetgscuaocu9kEcbyd;y1jjbHjjjjbbgABd:4waAcFeasz:njjjbhCdnaXmbcbhAJFFuuhEa8Ahscuh8PinascwfIdbay:tghahNasIdba8S:tghahNasclfIdba8R:tghahNMM:rghaEa8PcuSahaE9DVgXEhEaAa8PaXEh8PascKfhsaLaAcefgA9hmbkkamczfcbcjwz:njjjb8Aamcwf9cb83ibam9cb83ibagaxNhRJbbjZak:th8Ncbh8UJbbbbh8VJbbbbh8WJbbbbh8XJbbbbh8YJbbbbh8ZJbbbbh80cbh81cbhPinJbbbbhEdna8UTmbJbbjZa8U:Z:vhEkJbbbbhhdna80a80Na8Ya8YNa8Za8ZNMMg8KJbbbb9BmbJbbjZa8K:r:vhhka8XaENh5a8WaENh8Fa8VaENhaa8PhQdndndndndna8UaPVTmbamydwgBTmea80ahNh8Ja8ZahNh8La8YahNh8Maeamydbcdtfh83cbh3JFFuuhEcvhXcuhQindnaza83a3cdtfydbcdtgsfydbgvTmbaOaHasfydbcdtfhAindndnaCaiaAydbgKcx2fgsclfydbgrcetf8Vebcs4aCasydbgLcetf8Vebcs4faCascwfydbglcetf8Vebcs4fgombcbhsxekcehsazaLcdtfydbgLceSmbcehsazarcdtfydbgrceSmbcehsazalcdtfydbglceSmbdnarcdSaLcdSfalcdSfcd6mbaocefhsxekaocdfhskdnasaX9kmba8AaKcK2fgLIdwa5:thhaLIdla8F:th8KaLIdbaa:th8EdndnakJbbbb9DTmba8E:lg8Ea8K:lg8Ka8Ea8K9EEg8Kah:lgha8Kah9EEag:vJbbjZMhhxekahahNa8Ea8ENa8Ka8KNMM:rag:va8NNJbbjZMJ9VO:d86JbbjZaLIdCa8JNaLIdxa8MNa8LaLIdzNMMakN:tghahJ9VO:d869DENhhkaKaQasaX6ahaE9DVgLEhQasaXaLEhXahaEaLEhEkaAclfhAavcufgvmbkka3cefg3aB9hmbkkaQcu9hmekama5Ud:ODama8FUd:KDamaaUd:GDamcuBd:qDamcFFF;7rBdjDaIcba8AaYamc:GDfakJbbbb9Damc:qDfamcjDfz:ejjjbamyd:qDhQdndnaxJbbbb9ETmba8UaD6mbaQcuSmeceh3amIdjDaR9EmixdkaQcu9hmekdna8UTmbdnamydlgza8Uci2fgsciGTmbadasfcba8Uazcu7fciGcefz:njjjb8AkabaPcltfgzam8Pib83dbazcwfamcwf8Pib83dbaPcefhPkc3hzinazc98Smvamc:Cwfazfydbcbyd;u1jjbH:bjjjbbazc98fhzxbkkcbh3a8Uaq9pmbamydwaCaiaQcx2fgsydbcetf8Vebcs4aCascwfydbcetf8Vebcs4faCasclfydbcetf8Vebcs4ffaw9nmekcbhscbhAdna81TmbcbhAamczfhXinamczfaAcdtfaXydbgLBdbaXclfhXaAaYaLfRbbTfhAa81cufg81mbkkamydwhlamydbhXam9cu83i:GDam9cu83i:ODam9cu83i:qDam9cu83i:yDaAc;8eaAclfc:bd6Eh81inamcjDfasfcFFF;7rBdbasclfgscz9hmbka81cdthBdnalTmbaeaXcdtfhocbhrindnazaoarcdtfydbcdtgsfydbgvTmbaOaHasfydbcdtfhAcuhLcuhsinazaiaAydbgKcx2fgXclfydbcdtfydbazaXydbcdtfydbfazaXcwfydbcdtfydbfgXasaXas6gXEhsaKaLaXEhLaAclfhAavcufgvmbkaLcuSmba8AaLcK2fgAIdway:tgEaENaAIdba8S:tgEaENaAIdla8R:tgEaENMM:rhEcbhAindndnasamc:qDfaAfgvydbgX6mbasaX9hmeaEamcjDfaAfIdb9FTmekavasBdbamc:GDfaAfaLBdbamcjDfaAfaEUdbxdkaAclfgAcz9hmbkkarcefgral9hmbkkamczfaBfhLcbhscbhAindnamc:GDfasfydbgXcuSmbaLaAcdtfaXBdbaAcefhAkasclfgscz9hmbkaAa81fg81TmbJFFuuhhcuhKamczfhsa81hvcuhLina8AasydbgXcK2fgAIdway:tgEaENaAIdba8S:tgEaENaAIdla8R:tgEaENMM:rhEdndnazaiaXcx2fgAclfydbcdtfydbazaAydbcdtfydbfazaAcwfydbcdtfydbfgAaL6mbaAaL9hmeaEah9DTmekaEhhaAhLaXhKkasclfhsavcufgvmbkaKcuSmbaKhQkdnamaiaQcx2fgrydbarclfydbarcwfydbaCabaeadaPawaqa3z:fjjjbTmbaPcefhPJbbbbh8VJbbbbh8WJbbbbh8XJbbbbh8YJbbbbh8ZJbbbbh80kcbhXinaOaHaraXcdtfydbcdtgAfydbcdtfgKhsazaAfgvydbgLhAdnaLTmbdninasydbaQSmeasclfhsaAcufgATmdxbkkasaKaLcdtfc98fydbBdbavavydbcufBdbkaXcefgXci9hmbka8AaQcK2fgsIdbhEasIdlhhasIdwh8KasIdxh8EasIdzh5asIdCh8FaYaQfce86bba80a8FMh80a8Za5Mh8Za8Ya8EMh8Ya8Xa8KMh8Xa8WahMh8Wa8VaEMh8Vamydxh8Uxbkkamc:WDf8KjjjjbaPk;Vvivuv99lu8Jjjjjbca9Rgv8Kjjjjbdndnalcw0mbaiydbhoaeabcitfgralcdtcufBdlaraoBdbdnalcd6mbaiclfhoalcufhwarcxfhrinaoydbhDarcuBdbarc98faDBdbarcwfhraoclfhoawcufgwmbkkalabfhrxekcbhDavczfcwfcbBdbav9cb83izavcwfcbBdbav9cb83ibJbbjZhqJbbjZhkinadaiaDcdtfydbcK2fhwcbhrinavczfarfgoawarfIdbgxaoIdbgm:tgPakNamMgmUdbavarfgoaPaxam:tNaoIdbMUdbarclfgrcx9hmbkJbbjZaqJbbjZMgq:vhkaDcefgDal9hmbkcbhoadcbcecdavIdlgxavIdwgm9GEgravIdbgPam9GEaraPax9GEgscdtgrfhzavczfarfIdbhxaihralhwinaiaocdtfgDydbhHaDarydbgOBdbaraHBdbarclfhraoazaOcK2fIdbax9Dfhoawcufgwmbkaeabcitfhrdndnaocv6mbaoalc98f6mekaraiydbBdbaralcdtcufBdlaiclfhoalcufhwarcxfhrinaoydbhDarcuBdbarc98faDBdbarcwfhraoclfhoawcufgwmbkalabfhrxekaraxUdbararydlc98GasVBdlabcefaeadaiaoz:djjjbhwararydlciGawabcu7fcdtVBdlawaeadaiaocdtfalao9Rz:djjjbhrkavcaf8Kjjjjbark:;idiud99dndnabaecitfgwydlgDciGgqciSmbinabcbaDcd4gDalaqcdtfIdbawIdb:tgkJbbbb9FEgwaecefgefadaialavaoarz:ejjjbak:larIdb9FTmdabawaD7aefgecitfgwydlgDciGgqci9hmbkkabaecitfgeclfhbdnavmbcuhwindnaiaeydbgDfRbbmbadaDcK2fgqIdwalIdw:tgkakNaqIdbalIdb:tgkakNaqIdlalIdl:tgkakNMM:rgkarIdb9DTmbarakUdbaoaDBdbkaecwfheawcefgwabydbcd46mbxdkkcuhwindnaiaeydbgDfRbbmbadaDcK2fgqIdbalIdb:t:lgkaqIdlalIdl:t:lgxakax9EEgkaqIdwalIdw:t:lgxakax9EEgkarIdb9DTmbarakUdbaoaDBdbkaecwfheawcefgwabydbcd46mbkkk;llevudnabydwgxaladcetfgm8Vebcs4alaecetfgP8Vebgscs4falaicetfgz8Vebcs4ffaD0abydxaq9pVakVgDce9hmbavawcltfgxab8Pdb83dbaxcwfabcwfgx8Pdb83dbdnaxydbgqTmbaoabydbcdtfhxaqhsinalaxydbcetfcFFi87ebaxclfhxascufgsmbkkdnabydxglci2gsabydlgxfgkciGTmbarakfcbalaxcu7fciGcefz:njjjb8Aabydxci2hsabydlhxabydwhqkab9cb83dwababydbaqfBdbabascifc98GaxfBdlaP8Vebhscbhxkdnascztcz91cu9kmbabaxcefBdwaPax87ebaoabydbcdtfaxcdtfaeBdbkdnam8Uebcu9kmbababydwgxcefBdwamax87ebaoabydbcdtfaxcdtfadBdbkdnaz8Uebcu9kmbababydwgxcefBdwazax87ebaoabydbcdtfaxcdtfaiBdbkarabydlfabydxci2faPRbb86bbarabydlfabydxci2fcefamRbb86bbarabydlfabydxci2fcdfazRbb86bbababydxcefBdxaDk8LbabaeadaialavaoarawaDaDaqJbbbbz:cjjjbk;Nkovud99euv99eul998Jjjjjbc:W;ae9Rgo8KjjjjbdndnadTmbavcd4hrcbhwcbhDindnaiaeclfydbar2cdtfgvIdbaiaeydbar2cdtfgqIdbgk:tgxaiaecwfydbar2cdtfgmIdlaqIdlgP:tgsNamIdbak:tgzavIdlaP:tgPN:tgkakNaPamIdwaqIdwgH:tgONasavIdwaH:tgHN:tgPaPNaHazNaOaxN:tgxaxNMM:rgsJbbbb9Bmbaoc:W:qefawcx2fgAakas:vUdwaAaxas:vUdlaAaPas:vUdbaoc8Wfawc8K2fgAaq8Pdb83dbaAav8Pdb83dxaAam8Pdb83dKaAcwfaqcwfydbBdbaAcCfavcwfydbBdbaAcafamcwfydbBdbawcefhwkaecxfheaDcifgDad6mbkab9cb83dbabcyf9cb83dbabcaf9cb83dbabcKf9cb83dbabczf9cb83dbabcwf9cb83dbawTmeaocbBd8Sao9cb83iKao9cb83izaoczfaoc8Wfawci2cxaoc8Sfcbcrz1jjjbaoIdKhCaoIdChXaoIdzhQao9cb83iwao9cb83ibaoaoc:W:qefawcxaoc8Sfcbciz1jjjbJbbjZhkaoIdwgPJbbbbJbbjZaPaPNaoIdbgPaPNaoIdlgsasNMM:rgx:vaxJbbbb9BEgzNhxasazNhsaPazNhzaoc:W:qefheawhvinaecwfIdbaxNaeIdbazNasaeclfIdbNMMgPakaPak9DEhkaecxfheavcufgvmbkabaCUdwabaXUdlabaQUdbabaoId3UdxdndnakJ;n;m;m899FmbJbbbbhPaoc:W:qefheaoc8WfhvinaCavcwfIdb:taecwfIdbgHNaQavIdb:taeIdbgONaXavclfIdb:taeclfIdbgLNMMaxaHNazaONasaLNMM:vgHaPaHaP9EEhPavc8KfhvaecxfheawcufgwmbkabaxUd8KabasUdaabazUd3abaCaxaPN:tUdKabaXasaPN:tUdCabaQazaPN:tUdzabJbbjZakakN:t:rgkUdydndnaxJbbj:;axJbbj:;9GEgPJbbjZaPJbbjZ9FEJbb;:9cNJbbbZJbbb:;axJbbbb9GEMgP:lJbbb9p9DTmbaP:Ohexekcjjjj94hekabae86b8UdndnasJbbj:;asJbbj:;9GEgPJbbjZaPJbbjZ9FEJbb;:9cNJbbbZJbbb:;asJbbbb9GEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkabav86bRdndnazJbbj:;azJbbj:;9GEgPJbbjZaPJbbjZ9FEJbb;:9cNJbbbZJbbb:;azJbbbb9GEMgP:lJbbb9p9DTmbaP:Ohqxekcjjjj94hqkabaq86b8SdndnaecKtcK91:YJbb;:9c:vax:t:lavcKtcK91:YJbb;:9c:vas:t:laqcKtcK91:YJbb;:9c:vaz:t:lakMMMJbb;:9cNJbbjZMgk:lJbbb9p9DTmbak:Ohexekcjjjj94hekaecFbaecFb9iEhexekabcjjj;8iBdycFbhekabae86b8Vxekab9cb83dbabcyf9cb83dbabcaf9cb83dbabcKf9cb83dbabczf9cb83dbabcwf9cb83dbkaoc:W;aef8Kjjjjbk;Iwwvul99iud99eue99eul998Jjjjjbcje9Rgr8Kjjjjbavcd4hwaicd4hDdndnaoTmbarc;abfcbaocdtgvz:njjjb8Aarc;Gbfcbavz:njjjb8AarhvarcafhiaohqinavcFFF97BdbaicFFF;7rBdbaiclfhiavclfhvaqcufgqmbkdnadTmbcbhkinaeakaD2cdtfgvIdwhxavIdlhmavIdbhPalakaw2cdtfIdbhsarc;abfhzarhiarc;GbfhHarcafhqcj1jjbhvaohOinasavcwfIdbaxNavIdbaPNavclfIdbamNMMgAMhCakhXdnaAas:tgAaqIdbgQ9DgLmbaHydbhXkaHaXBdbakhXdnaCaiIdbgK9EmbazydbhXaKhCkazaXBdbaiaCUdbaqaAaQaLEUdbavcxfhvaqclfhqaHclfhHaiclfhiazclfhzaOcufgOmbkakcefgkad9hmbkkadThkJbbbbhCcbhXarc;abfhvarc;Gbfhicbhqinalavydbgzaw2cdtfIdbalaiydbgHaw2cdtfIdbaeazaD2cdtfgzIdwaeaHaD2cdtfgHIdw:tgsasNazIdbaHIdb:tgsasNazIdlaHIdl:tgsasNMM:rMMgsaCasaC9EgzEhCaqaXazEhXaiclfhiavclfhvaoaqcefgq9hmbkaCJbbbZNhKxekadThkcbhXJbbbbhKkJbbbbhCdnaearc;abfaXcdtgifydbgqaD2cdtfgvIdwaearc;GbfaifydbgzaD2cdtfgiIdwgm:tgsasNavIdbaiIdbgY:tgAaANavIdlaiIdlgP:tgQaQNMM:rgxJbbbb9ETmbaxalaqaw2cdtfIdbMalazaw2cdtfIdb:taxaxM:vhCkasaCNamMhmaQaCNaPMhPaAaCNaYMhYdnakmbaDcdthvawcdthiindnalIdbg8AaecwfIdbam:tgCaCNaeIdbaY:tgsasNaeclfIdbaP:tgAaANMM:rgQMgEaK9ETmbJbbbbhxdnaQJbbbb9ETmbaEaK:taQaQM:vhxkaxaCNamMhmaxaANaPMhPaxasNaYMhYa8AaKaQMMJbbbZNhKkaeavfhealaifhladcufgdmbkkabaKUdxabamUdwabaPUdlabaYUdbarcjef8Kjjjjbkjeeiu8Jjjjjbcj8W9Rgr8Kjjjjbaici2hwdnaiTmbawceawce0EhDarhiinaiaeadRbbcdtfydbBdbadcefhdaiclfhiaDcufgDmbkkabarawaladaoz:hjjjbarcj8Wf8Kjjjjbk:3lequ8JjjjjbcjP9Rgl8Kjjjjbcbhvalcjxfcbaiz:njjjb8AdndnadTmbcjehoaehrincuhwarhDcuhqavhkdninawakaoalcjxfaDcefRbbfRbb9RcFeGci6aoalcjxfaDRbbfRbb9RcFeGci6faoalcjxfaDcdfRbbfRbb9RcFeGci6fgxaq9mgmEhwdnammbaxce0mdkaxaqaxaq9kEhqaDcifhDadakcefgk9hmbkkaeawci2fgDcdfRbbhqaDcefRbbhxaDRbbhkaeavci2fgDcifaDawav9Rci2z:qjjjb8Aakalcjxffaocefgo86bbaxalcjxffao86bbaDcdfaq86bbaDcefax86bbaDak86bbaqalcjxffao86bbarcifhravcefgvad9hmbkalcFeaicetz:njjjbhoadci2gDceaDce0EhqcbhxindnaoaeRbbgkcetfgw8UebgDcu9kmbawax87ebaocjlfaxcdtfabakcdtfydbBdbaxhDaxcefhxkaeaD86bbaecefheaqcufgqmbkaxcdthDxekcbhDkabalcjlfaDz:mjjjb8AalcjPf8Kjjjjbk9teiucbcbyd;C1jjbgeabcifc98GfgbBd;C1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;teeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiaeydlBdlaiaeydwBdwaiaeydxBdxaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk:3eedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdxaialBdwaialBdlaialBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd;C1jjbgeabcrfc94GfgbBd;C1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik9:eiuZbhedndncbyd;C1jjbgdaecztgi9nmbcuheadai9RcFFifcz4nbcuSmekadhekcbabae9Rcifc98Gcbyd;C1jjbfgdBd;C1jjbdnadZbcztge9nmbadae9RcFFifcz4nb8Akk:;Deludndndnadch9pmbabaeSmdaeabadfgi9Rcbadcet9R0mekabaead;8qbbxekaeab7ciGhldndndnabae9pmbdnalTmbadhvabhixikdnabciGmbadhvabhixdkadTmiabaeRbb86bbadcufhvdnabcefgiciGmbaecefhexdkavTmiabaeRbe86beadc9:fhvdnabcdfgiciGmbaecdfhexdkavTmiabaeRbd86bdadc99fhvdnabcifgiciGmbaecifhexdkavTmiabaeRbi86biabclfhiaeclfheadc98fhvxekdnalmbdnaiciGTmbadTmlabadcufgifglaeaifRbb86bbdnalciGmbaihdxekaiTmlabadc9:fgifglaeaifRbb86bbdnalciGmbaihdxekaiTmlabadc99fgifglaeaifRbb86bbdnalciGmbaihdxekaiTmlabadc98fgdfaeadfRbb86bbkadcl6mbdnadc98fgocd4cefciGgiTmbaec98fhlabc98fhvinavadfaladfydbBdbadc98fhdaicufgimbkkaocx6mbaec9Wfhvabc9WfhoinaoadfgicxfavadfglcxfydbBdbaicwfalcwfydbBdbaiclfalclfydbBdbaialydbBdbadc9Wfgdci0mbkkadTmdadhidnadciGglTmbaecufhvabcufhoadhiinaoaifavaifRbb86bbaicufhialcufglmbkkadcl6mdaec98fhlabc98fhvinavaifgecifalaifgdcifRbb86bbaecdfadcdfRbb86bbaecefadcefRbb86bbaeadRbb86bbaic98fgimbxikkavcl6mbdnavc98fglcd4cefcrGgdTmbavadcdt9RhvinaiaeydbBdbaeclfheaiclfhiadcufgdmbkkalc36mbinaiaeydbBdbaiaeydlBdlaiaeydwBdwaiaeydxBdxaiaeydzBdzaiaeydCBdCaiaeydKBdKaiaeyd3Bd3aecafheaicafhiavc9Gfgvci0mbkkavTmbdndnavcrGgdmbavhlxekavc94GhlinaiaeRbb86bbaicefhiaecefheadcufgdmbkkavcw6mbinaiaeRbb86bbaiaeRbe86beaiaeRbd86bdaiaeRbi86biaiaeRbl86blaiaeRbv86bvaiaeRbo86boaiaeRbr86braicwfhiaecwfhealc94fglmbkkabkk9Tdbcjwk9ubbjZbbbbbbbbbbbbbbjZbbbbbbbbbbbbbbjZ86;nAZ86;nAZ86;nAZ86;nA:;86;nAZ86;nAZ86;nAZ86;nA:;86;nAZ86;nAZ86;nAZ86;nA:;bc;uwkxebbbdbbb9GNbb",e=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var t,n=WebAssembly.instantiate(i(a),{}).then(function(b){t=b.instance,t.exports.__wasm_call_ctors()});function i(b){for(var g=new Uint8Array(b.length),m=0;m<b.length;++m){var p=b.charCodeAt(m);g[m]=p>96?p-97:p>64?p-39:p+4}for(var v=0,m=0;m<b.length;++m)g[v++]=g[m]<60?e[g[m]]:(g[m]-60)*64+g[++m];return g.buffer.slice(0,v)}function s(b){if(!b)throw new Error("Assertion failed")}function r(b){return new Uint8Array(b.buffer,b.byteOffset,b.byteLength)}var o=48,c=16;function l(b,g){var m=b.meshlets[g*4+0],p=b.meshlets[g*4+1],v=b.meshlets[g*4+2],y=b.meshlets[g*4+3];return{vertices:b.vertices.subarray(m,m+v),triangles:b.triangles.subarray(p,p+y*3)}}function d(b,g,m,p,v,y,x){var _=t.exports.sbrk,S=t.exports.meshopt_buildMeshletsBound(b.length,v,y),E=_(S*c),R=_(S*v*4),M=_(S*y*3),w=_(b.byteLength),I=_(g.byteLength),P=new Uint8Array(t.exports.memory.buffer);P.set(r(b),w),P.set(r(g),I);var F=t.exports.meshopt_buildMeshlets(E,R,M,w,b.length,I,m,p,v,y,x);P=new Uint8Array(t.exports.memory.buffer);for(var N=P.subarray(E,E+F*c),O=new Uint32Array(N.buffer,N.byteOffset,N.byteLength/4).slice(),j=0;j<F;++j){var J=O[j*4+0],H=O[j*4+1],m=O[j*4+2],Q=O[j*4+3];t.exports.meshopt_optimizeMeshlet(R+J*4,M+H,Q,m)}var ce=O[(F-1)*4+0],xe=O[(F-1)*4+1],Ue=O[(F-1)*4+2],at=O[(F-1)*4+3],ht=ce+Ue,Ze=xe+(at*3+3&-4),q={meshlets:O,vertices:new Uint32Array(P.buffer,R,ht).slice(),triangles:new Uint8Array(P.buffer,M,Ze*3).slice(),meshletCount:F};return _(E-_(0)),q}function h(b){var g=new Float32Array(t.exports.memory.buffer,b,o/4);return{centerX:g[0],centerY:g[1],centerZ:g[2],radius:g[3],coneApexX:g[4],coneApexY:g[5],coneApexZ:g[6],coneAxisX:g[7],coneAxisY:g[8],coneAxisZ:g[9],coneCutoff:g[10]}}function u(b,g,m,p){var v=t.exports.sbrk,y=[],x=v(g.byteLength),_=v(b.vertices.byteLength),S=v(b.triangles.byteLength),E=v(o),R=new Uint8Array(t.exports.memory.buffer);R.set(r(g),x),R.set(r(b.vertices),_),R.set(r(b.triangles),S);for(var M=0;M<b.meshletCount;++M){var w=b.meshlets[M*4+0],I=b.meshlets[M*4+0+1],P=b.meshlets[M*4+0+3];t.exports.meshopt_computeMeshletBounds(E,_+w*4,S+I,P,x,m,p),y.push(h(E))}return v(x-v(0)),y}function f(b,g,m,p){var v=t.exports.sbrk,y=v(o),x=v(b.byteLength),_=v(g.byteLength),S=new Uint8Array(t.exports.memory.buffer);S.set(r(b),x),S.set(r(g),_),t.exports.meshopt_computeClusterBounds(y,x,b.length,_,m,p);var E=h(y);return v(y-v(0)),E}return{ready:n,supported:!0,buildMeshlets:function(b,g,m,p,v,y){s(b.length%3==0),s(g instanceof Float32Array),s(g.length%m==0),s(m>=3),s(p<=256||p>0),s(v<=512),s(v%4==0),y=y||0;var x=b.BYTES_PER_ELEMENT==4?b:new Uint32Array(b);return d(x,g,g.length/m,m*4,p,v,y)},computeClusterBounds:function(b,g,m){s(b.length%3==0),s(b.length/3<=512),s(g instanceof Float32Array),s(g.length%m==0),s(m>=3);var p=b.BYTES_PER_ELEMENT==4?b:new Uint32Array(b);return f(p,g,g.length/m,m*4)},computeMeshletBounds:function(b,g,m){return s(b.meshletCount!=0),s(g instanceof Float32Array),s(g.length%m==0),s(m>=3),u(b,g,g.length/m,m*4)},extractMeshlet:function(b,g){return s(g>=0&&g<b.meshletCount),l(b,g)}}})();var nm=Math.pow(2,-24),ol=Symbol("SKIP_GENERATION");function y_(a){return a.index?a.index.count:a.attributes.position.count}function oi(a){return y_(a)/3}function __(a,e=ArrayBuffer){return a>65535?new Uint32Array(new e(4*a)):new Uint16Array(new e(2*a))}function im(a,e){if(!a.index){let t=a.attributes.position.count,n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=__(t,n);a.setIndex(new Ke(i,1));for(let s=0;s<t;s++)i[s]=s}}function Yd(a,e){let t=oi(a),n=e||a.drawRange,i=n.start/3,s=(n.start+n.count)/3,r=Math.max(0,i),o=Math.min(t,s)-r;return[{offset:Math.floor(r),count:Math.floor(o)}]}function Zd(a,e){if(!a.groups||!a.groups.length)return Yd(a,e);let t=[],n=new Set,i=e||a.drawRange,s=i.start/3,r=(i.start+i.count)/3;for(let c of a.groups){let l=c.start/3,d=(c.start+c.count)/3;n.add(Math.max(s,l)),n.add(Math.min(r,d))}let o=Array.from(n.values()).sort((c,l)=>c-l);for(let c=0;c<o.length-1;c++){let l=o[c],d=o[c+1];t.push({offset:Math.floor(l),count:Math.floor(d-l)})}return t}function am(a,e){let t=oi(a),n=Zd(a,e).sort((r,o)=>r.offset-o.offset),i=n[n.length-1];i.count=Math.min(t-i.offset,i.count);let s=0;return n.forEach(({count:r})=>s+=r),t!==s}function cl(a,e,t,n,i){let s=1/0,r=1/0,o=1/0,c=-1/0,l=-1/0,d=-1/0,h=1/0,u=1/0,f=1/0,b=-1/0,g=-1/0,m=-1/0;for(let p=e*6,v=(e+t)*6;p<v;p+=6){let y=a[p+0],x=a[p+1],_=y-x,S=y+x;_<s&&(s=_),S>c&&(c=S),y<h&&(h=y),y>b&&(b=y);let E=a[p+2],R=a[p+3],M=E-R,w=E+R;M<r&&(r=M),w>l&&(l=w),E<u&&(u=E),E>g&&(g=E);let I=a[p+4],P=a[p+5],F=I-P,N=I+P;F<o&&(o=F),N>d&&(d=N),I<f&&(f=I),I>m&&(m=I)}n[0]=s,n[1]=r,n[2]=o,n[3]=c,n[4]=l,n[5]=d,i[0]=h,i[1]=u,i[2]=f,i[3]=b,i[4]=g,i[5]=m}function sm(a,e=null,t=null,n=null){let i=a.attributes.position,s=a.index?a.index.array:null,r=oi(a),o=i.normalized,c;e===null?(c=new Float32Array(r*6),t=0,n=r):(c=e,t=t||0,n=n||r);let l=i.array,d=i.offset||0,h=3;i.isInterleavedBufferAttribute&&(h=i.data.stride);let u=["getX","getY","getZ"];for(let f=t;f<t+n;f++){let b=f*3,g=f*6,m=b+0,p=b+1,v=b+2;s&&(m=s[m],p=s[p],v=s[v]),o||(m=m*h+d,p=p*h+d,v=v*h+d);for(let y=0;y<3;y++){let x,_,S;o?(x=i[u[y]](m),_=i[u[y]](p),S=i[u[y]](v)):(x=l[m+y],_=l[p+y],S=l[v+y]);let E=x;_<E&&(E=_),S<E&&(E=S);let R=x;_>R&&(R=_),S>R&&(R=S);let M=(R-E)/2,w=y*2;c[g+w+0]=E+M,c[g+w+1]=M+(Math.abs(E)+M)*nm}}return c}function ct(a,e,t){return t.min.x=e[a],t.min.y=e[a+1],t.min.z=e[a+2],t.max.x=e[a+3],t.max.y=e[a+4],t.max.z=e[a+5],t}function Qd(a){let e=-1,t=-1/0;for(let n=0;n<3;n++){let i=a[n+3]-a[n];i>t&&(t=i,e=n)}return e}function $d(a,e){e.set(a)}function eu(a,e,t){let n,i;for(let s=0;s<3;s++){let r=s+3;n=a[s],i=e[s],t[s]=n<i?n:i,n=a[r],i=e[r],t[r]=n>i?n:i}}function Ur(a,e,t){for(let n=0;n<3;n++){let i=e[a+2*n],s=e[a+2*n+1],r=i-s,o=i+s;r<t[n]&&(t[n]=r),o>t[n+3]&&(t[n+3]=o)}}function Ms(a){let e=a[3]-a[0],t=a[4]-a[1],n=a[5]-a[2];return 2*(e*t+t*n+n*e)}var Pi=32,w_=(a,e)=>a.candidate-e.candidate,qi=new Array(Pi).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),ll=new Float32Array(6);function cm(a,e,t,n,i,s){let r=-1,o=0;if(s===0)r=Qd(e),r!==-1&&(o=(e[r]+e[r+3])/2);else if(s===1)r=Qd(a),r!==-1&&(o=S_(t,n,i,r));else if(s===2){let c=Ms(a),l=1.25*i,d=n*6,h=(n+i)*6;for(let u=0;u<3;u++){let f=e[u],m=(e[u+3]-f)/Pi;if(i<Pi/4){let p=[...qi];p.length=i;let v=0;for(let x=d;x<h;x+=6,v++){let _=p[v];_.candidate=t[x+2*u],_.count=0;let{bounds:S,leftCacheBounds:E,rightCacheBounds:R}=_;for(let M=0;M<3;M++)R[M]=1/0,R[M+3]=-1/0,E[M]=1/0,E[M+3]=-1/0,S[M]=1/0,S[M+3]=-1/0;Ur(x,t,S)}p.sort(w_);let y=i;for(let x=0;x<y;x++){let _=p[x];for(;x+1<y&&p[x+1].candidate===_.candidate;)p.splice(x+1,1),y--}for(let x=d;x<h;x+=6){let _=t[x+2*u];for(let S=0;S<y;S++){let E=p[S];_>=E.candidate?Ur(x,t,E.rightCacheBounds):(Ur(x,t,E.leftCacheBounds),E.count++)}}for(let x=0;x<y;x++){let _=p[x],S=_.count,E=i-_.count,R=_.leftCacheBounds,M=_.rightCacheBounds,w=0;S!==0&&(w=Ms(R)/c);let I=0;E!==0&&(I=Ms(M)/c);let P=1+1.25*(w*S+I*E);P<l&&(r=u,l=P,o=_.candidate)}}else{for(let y=0;y<Pi;y++){let x=qi[y];x.count=0,x.candidate=f+m+y*m;let _=x.bounds;for(let S=0;S<3;S++)_[S]=1/0,_[S+3]=-1/0}for(let y=d;y<h;y+=6){let S=~~((t[y+2*u]-f)/m);S>=Pi&&(S=Pi-1);let E=qi[S];E.count++,Ur(y,t,E.bounds)}let p=qi[Pi-1];$d(p.bounds,p.rightCacheBounds);for(let y=Pi-2;y>=0;y--){let x=qi[y],_=qi[y+1];eu(x.bounds,_.rightCacheBounds,x.rightCacheBounds)}let v=0;for(let y=0;y<Pi-1;y++){let x=qi[y],_=x.count,S=x.bounds,R=qi[y+1].rightCacheBounds;_!==0&&(v===0?$d(S,ll):eu(S,ll,ll)),v+=_;let M=0,w=0;v!==0&&(M=Ms(ll)/c);let I=i-v;I!==0&&(w=Ms(R)/c);let P=1+1.25*(M*v+w*I);P<l&&(r=u,l=P,o=x.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${s} used.`);return{axis:r,pos:o}}function S_(a,e,t,n){let i=0;for(let s=e,r=e+t;s<r;s++)i+=a[s*6+n*2];return i/t}var ws=class{constructor(){this.boundingData=new Float32Array(6)}};function lm(a,e,t,n,i,s){let r=n,o=n+i-1,c=s.pos,l=s.axis*2;for(;;){for(;r<=o&&t[r*6+l]<c;)r++;for(;r<=o&&t[o*6+l]>=c;)o--;if(r<o){for(let d=0;d<3;d++){let h=e[r*3+d];e[r*3+d]=e[o*3+d],e[o*3+d]=h}for(let d=0;d<6;d++){let h=t[r*6+d];t[r*6+d]=t[o*6+d],t[o*6+d]=h}r++,o--}else return r}}function hm(a,e,t,n,i,s){let r=n,o=n+i-1,c=s.pos,l=s.axis*2;for(;;){for(;r<=o&&t[r*6+l]<c;)r++;for(;r<=o&&t[o*6+l]>=c;)o--;if(r<o){let d=a[r];a[r]=a[o],a[o]=d;for(let h=0;h<6;h++){let u=t[r*6+h];t[r*6+h]=t[o*6+h],t[o*6+h]=u}r++,o--}else return r}}function xt(a,e){return e[a+15]===65535}function Et(a,e){return e[a+6]}function Rt(a,e){return e[a+14]}function Bt(a){return a+8}function Ot(a,e){return e[a+6]}function hl(a,e){return e[a+7]}var dm,Br,dl,um,E_=Math.pow(2,32);function ul(a){return"count"in a?1:1+ul(a.left)+ul(a.right)}function fm(a,e,t){return dm=new Float32Array(t),Br=new Uint32Array(t),dl=new Uint16Array(t),um=new Uint8Array(t),tu(a,e)}function tu(a,e){let t=a/4,n=a/2,i="count"in e,s=e.boundingData;for(let r=0;r<6;r++)dm[t+r]=s[r];if(i)if(e.buffer){let r=e.buffer;um.set(new Uint8Array(r),a);for(let o=a,c=a+r.byteLength;o<c;o+=32){let l=o/2;xt(l,dl)||(Br[o/4+6]+=t)}return a+r.byteLength}else{let r=e.offset,o=e.count;return Br[t+6]=r,dl[n+14]=o,dl[n+15]=65535,a+32}else{let r=e.left,o=e.right,c=e.splitAxis,l;if(l=tu(a+32,r),l/4>E_)throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return Br[t+6]=l/4,l=tu(l,o),Br[t+7]=c,l}}function A_(a,e){let t=(a.index?a.index.count:a.attributes.position.count)/3,n=t>2**16,i=n?4:2,s=e?new SharedArrayBuffer(t*i):new ArrayBuffer(t*i),r=n?new Uint32Array(s):new Uint16Array(s);for(let o=0,c=r.length;o<c;o++)r[o]=o;return r}function T_(a,e,t,n,i){let{maxDepth:s,verbose:r,maxLeafTris:o,strategy:c,onProgress:l,indirect:d}=i,h=a._indirectBuffer,u=a.geometry,f=u.index?u.index.array:null,b=d?hm:lm,g=oi(u),m=new Float32Array(6),p=!1,v=new ws;return cl(e,t,n,v.boundingData,m),x(v,t,n,m),v;function y(_){l&&l(_/g)}function x(_,S,E,R=null,M=0){if(!p&&M>=s&&(p=!0,r&&(console.warn(`MeshBVH: Max depth of ${s} reached when generating BVH. Consider increasing maxDepth.`),console.warn(u))),E<=o||M>=s)return y(S+E),_.offset=S,_.count=E,_;let w=cm(_.boundingData,R,e,S,E,c);if(w.axis===-1)return y(S+E),_.offset=S,_.count=E,_;let I=b(h,f,e,S,E,w);if(I===S||I===S+E)y(S+E),_.offset=S,_.count=E;else{_.splitAxis=w.axis;let P=new ws,F=S,N=I-S;_.left=P,cl(e,F,N,P.boundingData,m),x(P,F,N,m,M+1);let O=new ws,j=I,J=E-N;_.right=O,cl(e,j,J,O.boundingData,m),x(O,j,J,m,M+1)}return _}}function pm(a,e){let t=a.geometry;e.indirect&&(a._indirectBuffer=A_(t,e.useSharedArrayBuffer),am(t,e.range)&&!e.verbose&&console.warn('MeshBVH: Provided geometry contains groups or a range that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.')),a._indirectBuffer||im(t,e);let n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=sm(t),s=e.indirect?Yd(t,e.range):Zd(t,e.range);a._roots=s.map(r=>{let o=T_(a,i,r.offset,r.count,e),c=ul(o),l=new n(32*c);return fm(0,o,l),l})}var vn=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,i=-1/0;for(let s=0,r=e.length;s<r;s++){let c=e[s][t];n=c<n?c:n,i=c>i?c:i}this.min=n,this.max=i}setFromPoints(e,t){let n=1/0,i=-1/0;for(let s=0,r=t.length;s<r;s++){let o=t[s],c=e.dot(o);n=c<n?c:n,i=c>i?c:i}this.min=n,this.max=i}isSeparated(e){return this.min>e.max||e.min>this.max}};vn.prototype.setFromBox=(function(){let a=new C;return function(t,n){let i=n.min,s=n.max,r=1/0,o=-1/0;for(let c=0;c<=1;c++)for(let l=0;l<=1;l++)for(let d=0;d<=1;d++){a.x=i.x*c+s.x*(1-c),a.y=i.y*l+s.y*(1-l),a.z=i.z*d+s.z*(1-d);let h=t.dot(a);r=Math.min(h,r),o=Math.max(h,o)}this.min=r,this.max=o}})();var fA=(function(){let a=new vn;return function(t,n){let i=t.points,s=t.satAxes,r=t.satBounds,o=n.points,c=n.satAxes,l=n.satBounds;for(let d=0;d<3;d++){let h=r[d],u=s[d];if(a.setFromPoints(u,o),h.isSeparated(a))return!1}for(let d=0;d<3;d++){let h=l[d],u=c[d];if(a.setFromPoints(u,i),h.isSeparated(a))return!1}}})();var R_=(function(){let a=new C,e=new C,t=new C;return function(i,s,r){let o=i.start,c=a,l=s.start,d=e;t.subVectors(o,l),a.subVectors(i.end,i.start),e.subVectors(s.end,s.start);let h=t.dot(d),u=d.dot(c),f=d.dot(d),b=t.dot(c),m=c.dot(c)*f-u*u,p,v;m!==0?p=(h*u-b*f)/m:p=0,v=(h+p*u)/f,r.x=p,r.y=v}})(),zr=(function(){let a=new be,e=new C,t=new C;return function(i,s,r,o){R_(i,s,a);let c=a.x,l=a.y;if(c>=0&&c<=1&&l>=0&&l<=1){i.at(c,r),s.at(l,o);return}else if(c>=0&&c<=1){l<0?s.at(0,o):s.at(1,o),i.closestPointToPoint(o,!0,r);return}else if(l>=0&&l<=1){c<0?i.at(0,r):i.at(1,r),s.closestPointToPoint(r,!0,o);return}else{let d;c<0?d=i.start:d=i.end;let h;l<0?h=s.start:h=s.end;let u=e,f=t;if(i.closestPointToPoint(h,!0,e),s.closestPointToPoint(d,!0,t),u.distanceToSquared(h)<=f.distanceToSquared(d)){r.copy(u),o.copy(h);return}else{r.copy(d),o.copy(f);return}}}})(),mm=(function(){let a=new C,e=new C,t=new dn,n=new on;return function(s,r){let{radius:o,center:c}=s,{a:l,b:d,c:h}=r;if(n.start=l,n.end=d,n.closestPointToPoint(c,!0,a).distanceTo(c)<=o||(n.start=l,n.end=h,n.closestPointToPoint(c,!0,a).distanceTo(c)<=o)||(n.start=d,n.end=h,n.closestPointToPoint(c,!0,a).distanceTo(c)<=o))return!0;let g=r.getPlane(t);if(Math.abs(g.distanceToPoint(c))<=o){let p=g.projectPoint(c,e);if(r.containsPoint(p))return!0}return!1}})();var C_=1e-15;function nu(a){return Math.abs(a)<C_}var Gt=class extends Jt{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new C),this.satBounds=new Array(4).fill().map(()=>new vn),this.points=[this.a,this.b,this.c],this.sphere=new yt,this.plane=new dn,this.needsUpdate=!0}intersectsSphere(e){return mm(e,this)}update(){let e=this.a,t=this.b,n=this.c,i=this.points,s=this.satAxes,r=this.satBounds,o=s[0],c=r[0];this.getNormal(o),c.setFromPoints(o,i);let l=s[1],d=r[1];l.subVectors(e,t),d.setFromPoints(l,i);let h=s[2],u=r[2];h.subVectors(t,n),u.setFromPoints(h,i);let f=s[3],b=r[3];f.subVectors(n,e),b.setFromPoints(f,i),this.sphere.setFromPoints(this.points),this.plane.setFromNormalAndCoplanarPoint(o,e),this.needsUpdate=!1}};Gt.prototype.closestPointToSegment=(function(){let a=new C,e=new C,t=new on;return function(i,s=null,r=null){let{start:o,end:c}=i,l=this.points,d,h=1/0;for(let u=0;u<3;u++){let f=(u+1)%3;t.start.copy(l[u]),t.end.copy(l[f]),zr(t,i,a,e),d=a.distanceToSquared(e),d<h&&(h=d,s&&s.copy(a),r&&r.copy(e))}return this.closestPointToPoint(o,a),d=o.distanceToSquared(a),d<h&&(h=d,s&&s.copy(a),r&&r.copy(o)),this.closestPointToPoint(c,a),d=c.distanceToSquared(a),d<h&&(h=d,s&&s.copy(a),r&&r.copy(c)),Math.sqrt(h)}})();Gt.prototype.intersectsTriangle=(function(){let a=new Gt,e=new Array(3),t=new Array(3),n=new vn,i=new vn,s=new C,r=new C,o=new C,c=new C,l=new C,d=new on,h=new on,u=new on,f=new C;function b(g,m,p){let v=g.points,y=0,x=-1;for(let _=0;_<3;_++){let{start:S,end:E}=d;S.copy(v[_]),E.copy(v[(_+1)%3]),d.delta(r);let R=nu(m.distanceToPoint(S));if(nu(m.normal.dot(r))&&R){p.copy(d),y=2;break}let M=m.intersectLine(d,f);if(!M&&R&&f.copy(S),(M||R)&&!nu(f.distanceTo(E))){if(y<=1)(y===1?p.start:p.end).copy(f),R&&(x=y);else if(y>=2){(x===1?p.start:p.end).copy(f),y=2;break}if(y++,y===2&&x===-1)break}}return y}return function(m,p=null,v=!1){this.needsUpdate&&this.update(),m.isExtendedTriangle?m.needsUpdate&&m.update():(a.copy(m),a.update(),m=a);let y=this.plane,x=m.plane;if(Math.abs(y.normal.dot(x.normal))>1-1e-10){let _=this.satBounds,S=this.satAxes;t[0]=m.a,t[1]=m.b,t[2]=m.c;for(let M=0;M<4;M++){let w=_[M],I=S[M];if(n.setFromPoints(I,t),w.isSeparated(n))return!1}let E=m.satBounds,R=m.satAxes;e[0]=this.a,e[1]=this.b,e[2]=this.c;for(let M=0;M<4;M++){let w=E[M],I=R[M];if(n.setFromPoints(I,e),w.isSeparated(n))return!1}for(let M=0;M<4;M++){let w=S[M];for(let I=0;I<4;I++){let P=R[I];if(s.crossVectors(w,P),n.setFromPoints(s,e),i.setFromPoints(s,t),n.isSeparated(i))return!1}}return p&&(v||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),p.start.set(0,0,0),p.end.set(0,0,0)),!0}else{let _=b(this,x,h);if(_===1&&m.containsPoint(h.end))return p&&(p.start.copy(h.end),p.end.copy(h.end)),!0;if(_!==2)return!1;let S=b(m,y,u);if(S===1&&this.containsPoint(u.end))return p&&(p.start.copy(u.end),p.end.copy(u.end)),!0;if(S!==2)return!1;if(h.delta(o),u.delta(c),o.dot(c)<0){let F=u.start;u.start=u.end,u.end=F}let E=h.start.dot(o),R=h.end.dot(o),M=u.start.dot(o),w=u.end.dot(o),I=R<M,P=E<w;return E!==w&&M!==R&&I===P?!1:(p&&(l.subVectors(h.start,u.start),l.dot(o)>0?p.start.copy(h.start):p.start.copy(u.start),l.subVectors(h.end,u.end),l.dot(o)<0?p.end.copy(h.end):p.end.copy(u.end)),!0)}}})();Gt.prototype.distanceToPoint=(function(){let a=new C;return function(t){return this.closestPointToPoint(t,a),t.distanceTo(a)}})();Gt.prototype.distanceToTriangle=(function(){let a=new C,e=new C,t=["a","b","c"],n=new on,i=new on;return function(r,o=null,c=null){let l=o||c?n:null;if(this.intersectsTriangle(r,l))return(o||c)&&(o&&l.getCenter(o),c&&l.getCenter(c)),0;let d=1/0;for(let h=0;h<3;h++){let u,f=t[h],b=r[f];this.closestPointToPoint(b,a),u=b.distanceToSquared(a),u<d&&(d=u,o&&o.copy(a),c&&c.copy(b));let g=this[f];r.closestPointToPoint(g,a),u=g.distanceToSquared(a),u<d&&(d=u,o&&o.copy(g),c&&c.copy(a))}for(let h=0;h<3;h++){let u=t[h],f=t[(h+1)%3];n.set(this[u],this[f]);for(let b=0;b<3;b++){let g=t[b],m=t[(b+1)%3];i.set(r[g],r[m]),zr(n,i,a,e);let p=a.distanceToSquared(e);p<d&&(d=p,o&&o.copy(a),c&&c.copy(e))}}return Math.sqrt(d)}})();var _t=class{constructor(e,t,n){this.isOrientedBox=!0,this.min=new C,this.max=new C,this.matrix=new he,this.invMatrix=new he,this.points=new Array(8).fill().map(()=>new C),this.satAxes=new Array(3).fill().map(()=>new C),this.satBounds=new Array(3).fill().map(()=>new vn),this.alignedSatBounds=new Array(3).fill().map(()=>new vn),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),n&&this.matrix.copy(n)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};_t.prototype.update=(function(){return function(){let e=this.matrix,t=this.min,n=this.max,i=this.points;for(let l=0;l<=1;l++)for(let d=0;d<=1;d++)for(let h=0;h<=1;h++){let u=1*l|2*d|4*h,f=i[u];f.x=l?n.x:t.x,f.y=d?n.y:t.y,f.z=h?n.z:t.z,f.applyMatrix4(e)}let s=this.satBounds,r=this.satAxes,o=i[0];for(let l=0;l<3;l++){let d=r[l],h=s[l],u=1<<l,f=i[u];d.subVectors(o,f),h.setFromPoints(d,i)}let c=this.alignedSatBounds;c[0].setFromPointsField(i,"x"),c[1].setFromPointsField(i,"y"),c[2].setFromPointsField(i,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})();_t.prototype.intersectsBox=(function(){let a=new vn;return function(t){this.needsUpdate&&this.update();let n=t.min,i=t.max,s=this.satBounds,r=this.satAxes,o=this.alignedSatBounds;if(a.min=n.x,a.max=i.x,o[0].isSeparated(a)||(a.min=n.y,a.max=i.y,o[1].isSeparated(a))||(a.min=n.z,a.max=i.z,o[2].isSeparated(a)))return!1;for(let c=0;c<3;c++){let l=r[c],d=s[c];if(a.setFromBox(l,t),d.isSeparated(a))return!1}return!0}})();_t.prototype.intersectsTriangle=(function(){let a=new Gt,e=new Array(3),t=new vn,n=new vn,i=new C;return function(r){this.needsUpdate&&this.update(),r.isExtendedTriangle?r.needsUpdate&&r.update():(a.copy(r),a.update(),r=a);let o=this.satBounds,c=this.satAxes;e[0]=r.a,e[1]=r.b,e[2]=r.c;for(let u=0;u<3;u++){let f=o[u],b=c[u];if(t.setFromPoints(b,e),f.isSeparated(t))return!1}let l=r.satBounds,d=r.satAxes,h=this.points;for(let u=0;u<3;u++){let f=l[u],b=d[u];if(t.setFromPoints(b,h),f.isSeparated(t))return!1}for(let u=0;u<3;u++){let f=c[u];for(let b=0;b<4;b++){let g=d[b];if(i.crossVectors(f,g),t.setFromPoints(i,e),n.setFromPoints(i,h),t.isSeparated(n))return!1}}return!0}})();_t.prototype.closestPointToPoint=(function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}})();_t.prototype.distanceToPoint=(function(){let a=new C;return function(t){return this.closestPointToPoint(t,a),t.distanceTo(a)}})();_t.prototype.distanceToBox=(function(){let a=["x","y","z"],e=new Array(12).fill().map(()=>new on),t=new Array(12).fill().map(()=>new on),n=new C,i=new C;return function(r,o=0,c=null,l=null){if(this.needsUpdate&&this.update(),this.intersectsBox(r))return(c||l)&&(r.getCenter(i),this.closestPointToPoint(i,n),r.closestPointToPoint(n,i),c&&c.copy(n),l&&l.copy(i)),0;let d=o*o,h=r.min,u=r.max,f=this.points,b=1/0;for(let m=0;m<8;m++){let p=f[m];i.copy(p).clamp(h,u);let v=p.distanceToSquared(i);if(v<b&&(b=v,c&&c.copy(p),l&&l.copy(i),v<d))return Math.sqrt(v)}let g=0;for(let m=0;m<3;m++)for(let p=0;p<=1;p++)for(let v=0;v<=1;v++){let y=(m+1)%3,x=(m+2)%3,_=p<<y|v<<x,S=1<<m|p<<y|v<<x,E=f[_],R=f[S];e[g].set(E,R);let w=a[m],I=a[y],P=a[x],F=t[g],N=F.start,O=F.end;N[w]=h[w],N[I]=p?h[I]:u[I],N[P]=v?h[P]:u[I],O[w]=u[w],O[I]=p?h[I]:u[I],O[P]=v?h[P]:u[I],g++}for(let m=0;m<=1;m++)for(let p=0;p<=1;p++)for(let v=0;v<=1;v++){i.x=m?u.x:h.x,i.y=p?u.y:h.y,i.z=v?u.z:h.z,this.closestPointToPoint(i,n);let y=i.distanceToSquared(n);if(y<b&&(b=y,c&&c.copy(n),l&&l.copy(i),y<d))return Math.sqrt(y)}for(let m=0;m<12;m++){let p=e[m];for(let v=0;v<12;v++){let y=t[v];zr(p,y,n,i);let x=n.distanceToSquared(i);if(x<b&&(b=x,c&&c.copy(n),l&&l.copy(i),x<d))return Math.sqrt(x)}}return Math.sqrt(b)}})();var Ki=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}};var iu=class extends Ki{constructor(){super(()=>new Gt)}},cn=new iu;var au=class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],t=null;this.setBuffer=n=>{t&&e.push(t),t=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},Ye=new au;var Ji,Es,Ss=[],pl=new Ki(()=>new Xe);function bm(a,e,t,n,i,s){Ji=pl.getPrimitive(),Es=pl.getPrimitive(),Ss.push(Ji,Es),Ye.setBuffer(a._roots[e]);let r=su(0,a.geometry,t,n,i,s);Ye.clearBuffer(),pl.releasePrimitive(Ji),pl.releasePrimitive(Es),Ss.pop(),Ss.pop();let o=Ss.length;return o>0&&(Es=Ss[o-1],Ji=Ss[o-2]),r}function su(a,e,t,n,i=null,s=0,r=0){let{float32Array:o,uint16Array:c,uint32Array:l}=Ye,d=a*2;if(xt(d,c)){let u=Et(a,l),f=Rt(d,c);return ct(a,o,Ji),n(u,f,!1,r,s+a,Ji)}else{let w=function(P){let{uint16Array:F,uint32Array:N}=Ye,O=P*2;for(;!xt(O,F);)P=Bt(P),O=P*2;return Et(P,N)},I=function(P){let{uint16Array:F,uint32Array:N}=Ye,O=P*2;for(;!xt(O,F);)P=Ot(P,N),O=P*2;return Et(P,N)+Rt(O,F)},u=Bt(a),f=Ot(a,l),b=u,g=f,m,p,v,y;if(i&&(v=Ji,y=Es,ct(b,o,v),ct(g,o,y),m=i(v),p=i(y),p<m)){b=f,g=u;let P=m;m=p,p=P,v=y}v||(v=Ji,ct(b,o,v));let x=xt(b*2,c),_=t(v,x,m,r+1,s+b),S;if(_===2){let P=w(b),N=I(b)-P;S=n(P,N,!0,r+1,s+b,v)}else S=_&&su(b,e,t,n,i,s,r+1);if(S)return!0;y=Es,ct(g,o,y);let E=xt(g*2,c),R=t(y,E,p,r+1,s+g),M;if(R===2){let P=w(g),N=I(g)-P;M=n(P,N,!0,r+1,s+g,y)}else M=R&&su(g,e,t,n,i,s,r+1);return!!M}}var jr=new C,ou=new C;function gm(a,e,t={},n=0,i=1/0){let s=n*n,r=i*i,o=1/0,c=null;if(a.shapecast({boundsTraverseOrder:d=>(jr.copy(e).clamp(d.min,d.max),jr.distanceToSquared(e)),intersectsBounds:(d,h,u)=>u<o&&u<r,intersectsTriangle:(d,h)=>{d.closestPointToPoint(e,jr);let u=e.distanceToSquared(jr);return u<o&&(ou.copy(jr),o=u,c=h),u<s}}),o===1/0)return null;let l=Math.sqrt(o);return t.point?t.point.copy(ou):t.point=ou.clone(),t.distance=l,t.faceIndex=c,t}var P_=parseInt("180")>=169,Ca=new C,Ia=new C,Pa=new C,ml=new be,bl=new be,gl=new be,xm=new C,vm=new C,ym=new C,Vr=new C;function D_(a,e,t,n,i,s,r,o){let c;if(s===Vt?c=a.intersectTriangle(n,t,e,!0,i):c=a.intersectTriangle(e,t,n,s!==Nt,i),c===null)return null;let l=a.origin.distanceTo(i);return l<r||l>o?null:{distance:l,point:i.clone()}}function k_(a,e,t,n,i,s,r,o,c,l,d){Ca.fromBufferAttribute(e,s),Ia.fromBufferAttribute(e,r),Pa.fromBufferAttribute(e,o);let h=D_(a,Ca,Ia,Pa,Vr,c,l,d);if(h){let u=new C;Jt.getBarycoord(Vr,Ca,Ia,Pa,u),n&&(ml.fromBufferAttribute(n,s),bl.fromBufferAttribute(n,r),gl.fromBufferAttribute(n,o),h.uv=Jt.getInterpolation(Vr,Ca,Ia,Pa,ml,bl,gl,new be)),i&&(ml.fromBufferAttribute(i,s),bl.fromBufferAttribute(i,r),gl.fromBufferAttribute(i,o),h.uv1=Jt.getInterpolation(Vr,Ca,Ia,Pa,ml,bl,gl,new be)),t&&(xm.fromBufferAttribute(t,s),vm.fromBufferAttribute(t,r),ym.fromBufferAttribute(t,o),h.normal=Jt.getInterpolation(Vr,Ca,Ia,Pa,xm,vm,ym,new C),h.normal.dot(a.direction)>0&&h.normal.multiplyScalar(-1));let f={a:s,b:r,c:o,normal:new C,materialIndex:0};Jt.getNormal(Ca,Ia,Pa,f.normal),h.face=f,h.faceIndex=s,P_&&(h.barycoord=u)}return h}function As(a,e,t,n,i,s,r){let o=n*3,c=o+0,l=o+1,d=o+2,h=a.index;a.index&&(c=h.getX(c),l=h.getX(l),d=h.getX(d));let{position:u,normal:f,uv:b,uv1:g}=a.attributes,m=k_(t,u,f,b,g,c,l,d,e,s,r);return m?(m.faceIndex=n,i&&i.push(m),m):null}function lt(a,e,t,n){let i=a.a,s=a.b,r=a.c,o=e,c=e+1,l=e+2;t&&(o=t.getX(o),c=t.getX(c),l=t.getX(l)),i.x=n.getX(o),i.y=n.getY(o),i.z=n.getZ(o),s.x=n.getX(c),s.y=n.getY(c),s.z=n.getZ(c),r.x=n.getX(l),r.y=n.getY(l),r.z=n.getZ(l)}function _m(a,e,t,n,i,s,r,o){let{geometry:c,_indirectBuffer:l}=a;for(let d=n,h=n+i;d<h;d++)As(c,e,t,d,s,r,o)}function Mm(a,e,t,n,i,s,r){let{geometry:o,_indirectBuffer:c}=a,l=1/0,d=null;for(let h=n,u=n+i;h<u;h++){let f;f=As(o,e,t,h,null,s,r),f&&f.distance<l&&(d=f,l=f.distance)}return d}function wm(a,e,t,n,i,s,r){let{geometry:o}=t,{index:c}=o,l=o.attributes.position;for(let d=a,h=e+a;d<h;d++){let u;if(u=d,lt(r,u*3,c,l),r.needsUpdate=!0,n(r,u,i,s))return!0}return!1}function Sm(a,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=a.geometry,n=t.index?t.index.array:null,i=t.attributes.position,s,r,o,c,l=0,d=a._roots;for(let u=0,f=d.length;u<f;u++)s=d[u],r=new Uint32Array(s),o=new Uint16Array(s),c=new Float32Array(s),h(0,l),l+=s.byteLength;function h(u,f,b=!1){let g=u*2;if(o[g+15]===65535){let p=r[u+6],v=o[g+14],y=1/0,x=1/0,_=1/0,S=-1/0,E=-1/0,R=-1/0;for(let M=3*p,w=3*(p+v);M<w;M++){let I=n[M],P=i.getX(I),F=i.getY(I),N=i.getZ(I);P<y&&(y=P),P>S&&(S=P),F<x&&(x=F),F>E&&(E=F),N<_&&(_=N),N>R&&(R=N)}return c[u+0]!==y||c[u+1]!==x||c[u+2]!==_||c[u+3]!==S||c[u+4]!==E||c[u+5]!==R?(c[u+0]=y,c[u+1]=x,c[u+2]=_,c[u+3]=S,c[u+4]=E,c[u+5]=R,!0):!1}else{let p=u+8,v=r[u+6],y=p+f,x=v+f,_=b,S=!1,E=!1;e?_||(S=e.has(y),E=e.has(x),_=!S&&!E):(S=!0,E=!0);let R=_||S,M=_||E,w=!1;R&&(w=h(p,f,_));let I=!1;M&&(I=h(v,f,_));let P=w||I;if(P)for(let F=0;F<3;F++){let N=p+F,O=v+F,j=c[N],J=c[N+3],H=c[O],Q=c[O+3];c[u+F]=j<H?j:H,c[u+F+3]=J>Q?J:Q}return P}}}function Pn(a,e,t,n,i){let s,r,o,c,l,d,h=1/t.direction.x,u=1/t.direction.y,f=1/t.direction.z,b=t.origin.x,g=t.origin.y,m=t.origin.z,p=e[a],v=e[a+3],y=e[a+1],x=e[a+3+1],_=e[a+2],S=e[a+3+2];return h>=0?(s=(p-b)*h,r=(v-b)*h):(s=(v-b)*h,r=(p-b)*h),u>=0?(o=(y-g)*u,c=(x-g)*u):(o=(x-g)*u,c=(y-g)*u),s>c||o>r||((o>s||isNaN(s))&&(s=o),(c<r||isNaN(r))&&(r=c),f>=0?(l=(_-m)*f,d=(S-m)*f):(l=(S-m)*f,d=(_-m)*f),s>d||l>r)?!1:((l>s||s!==s)&&(s=l),(d<r||r!==r)&&(r=d),s<=i&&r>=n)}function Em(a,e,t,n,i,s,r,o){let{geometry:c,_indirectBuffer:l}=a;for(let d=n,h=n+i;d<h;d++){let u=l?l[d]:d;As(c,e,t,u,s,r,o)}}function Am(a,e,t,n,i,s,r){let{geometry:o,_indirectBuffer:c}=a,l=1/0,d=null;for(let h=n,u=n+i;h<u;h++){let f;f=As(o,e,t,c?c[h]:h,null,s,r),f&&f.distance<l&&(d=f,l=f.distance)}return d}function Tm(a,e,t,n,i,s,r){let{geometry:o}=t,{index:c}=o,l=o.attributes.position;for(let d=a,h=e+a;d<h;d++){let u;if(u=t.resolveTriangleIndex(d),lt(r,u*3,c,l),r.needsUpdate=!0,n(r,u,i,s))return!0}return!1}function Rm(a,e,t,n,i,s,r){Ye.setBuffer(a._roots[e]),cu(0,a,t,n,i,s,r),Ye.clearBuffer()}function cu(a,e,t,n,i,s,r){let{float32Array:o,uint16Array:c,uint32Array:l}=Ye,d=a*2;if(xt(d,c)){let u=Et(a,l),f=Rt(d,c);_m(e,t,n,u,f,i,s,r)}else{let u=Bt(a);Pn(u,o,n,s,r)&&cu(u,e,t,n,i,s,r);let f=Ot(a,l);Pn(f,o,n,s,r)&&cu(f,e,t,n,i,s,r)}}var F_=["x","y","z"];function Cm(a,e,t,n,i,s){Ye.setBuffer(a._roots[e]);let r=lu(0,a,t,n,i,s);return Ye.clearBuffer(),r}function lu(a,e,t,n,i,s){let{float32Array:r,uint16Array:o,uint32Array:c}=Ye,l=a*2;if(xt(l,o)){let h=Et(a,c),u=Rt(l,o);return Mm(e,t,n,h,u,i,s)}else{let h=hl(a,c),u=F_[h],b=n.direction[u]>=0,g,m;b?(g=Bt(a),m=Ot(a,c)):(g=Ot(a,c),m=Bt(a));let v=Pn(g,r,n,i,s)?lu(g,e,t,n,i,s):null;if(v){let _=v.point[u];if(b?_<=r[m+h]:_>=r[m+h+3])return v}let x=Pn(m,r,n,i,s)?lu(m,e,t,n,i,s):null;return v&&x?v.distance<=x.distance?v:x:v||x||null}}var xl=new Xe,Ts=new Gt,Rs=new Gt,Gr=new he,Im=new _t,vl=new _t;function Pm(a,e,t,n){Ye.setBuffer(a._roots[e]);let i=hu(0,a,t,n);return Ye.clearBuffer(),i}function hu(a,e,t,n,i=null){let{float32Array:s,uint16Array:r,uint32Array:o}=Ye,c=a*2;if(i===null&&(t.boundingBox||t.computeBoundingBox(),Im.set(t.boundingBox.min,t.boundingBox.max,n),i=Im),xt(c,r)){let d=e.geometry,h=d.index,u=d.attributes.position,f=t.index,b=t.attributes.position,g=Et(a,o),m=Rt(c,r);if(Gr.copy(n).invert(),t.boundsTree)return ct(a,s,vl),vl.matrix.copy(Gr),vl.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:v=>vl.intersectsBox(v),intersectsTriangle:v=>{v.a.applyMatrix4(n),v.b.applyMatrix4(n),v.c.applyMatrix4(n),v.needsUpdate=!0;for(let y=g*3,x=(m+g)*3;y<x;y+=3)if(lt(Rs,y,h,u),Rs.needsUpdate=!0,v.intersectsTriangle(Rs))return!0;return!1}});for(let p=g*3,v=(m+g)*3;p<v;p+=3){lt(Ts,p,h,u),Ts.a.applyMatrix4(Gr),Ts.b.applyMatrix4(Gr),Ts.c.applyMatrix4(Gr),Ts.needsUpdate=!0;for(let y=0,x=f.count;y<x;y+=3)if(lt(Rs,y,f,b),Rs.needsUpdate=!0,Ts.intersectsTriangle(Rs))return!0}}else{let d=a+8,h=o[a+6];return ct(d,s,xl),!!(i.intersectsBox(xl)&&hu(d,e,t,n,i)||(ct(h,s,xl),i.intersectsBox(xl)&&hu(h,e,t,n,i)))}}var yl=new he,du=new _t,Hr=new _t,L_=new C,N_=new C,U_=new C,B_=new C;function Dm(a,e,t,n={},i={},s=0,r=1/0){e.boundingBox||e.computeBoundingBox(),du.set(e.boundingBox.min,e.boundingBox.max,t),du.needsUpdate=!0;let o=a.geometry,c=o.attributes.position,l=o.index,d=e.attributes.position,h=e.index,u=cn.getPrimitive(),f=cn.getPrimitive(),b=L_,g=N_,m=null,p=null;i&&(m=U_,p=B_);let v=1/0,y=null,x=null;return yl.copy(t).invert(),Hr.matrix.copy(yl),a.shapecast({boundsTraverseOrder:_=>du.distanceToBox(_),intersectsBounds:(_,S,E)=>E<v&&E<r?(S&&(Hr.min.copy(_.min),Hr.max.copy(_.max),Hr.needsUpdate=!0),!0):!1,intersectsRange:(_,S)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:R=>Hr.distanceToBox(R),intersectsBounds:(R,M,w)=>w<v&&w<r,intersectsRange:(R,M)=>{for(let w=R,I=R+M;w<I;w++){lt(f,3*w,h,d),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let P=_,F=_+S;P<F;P++){lt(u,3*P,l,c),u.needsUpdate=!0;let N=u.distanceToTriangle(f,b,m);if(N<v&&(g.copy(b),p&&p.copy(m),v=N,y=P,x=w),N<s)return!0}}}});{let E=oi(e);for(let R=0,M=E;R<M;R++){lt(f,3*R,h,d),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let w=_,I=_+S;w<I;w++){lt(u,3*w,l,c),u.needsUpdate=!0;let P=u.distanceToTriangle(f,b,m);if(P<v&&(g.copy(b),p&&p.copy(m),v=P,y=w,x=R),P<s)return!0}}}}}),cn.releasePrimitive(u),cn.releasePrimitive(f),v===1/0?null:(n.point?n.point.copy(g):n.point=g.clone(),n.distance=v,n.faceIndex=y,i&&(i.point?i.point.copy(p):i.point=p.clone(),i.point.applyMatrix4(yl),g.applyMatrix4(yl),i.distance=g.sub(i.point).length(),i.faceIndex=x),n)}function km(a,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=a.geometry,n=t.index?t.index.array:null,i=t.attributes.position,s,r,o,c,l=0,d=a._roots;for(let u=0,f=d.length;u<f;u++)s=d[u],r=new Uint32Array(s),o=new Uint16Array(s),c=new Float32Array(s),h(0,l),l+=s.byteLength;function h(u,f,b=!1){let g=u*2;if(o[g+15]===65535){let p=r[u+6],v=o[g+14],y=1/0,x=1/0,_=1/0,S=-1/0,E=-1/0,R=-1/0;for(let M=p,w=p+v;M<w;M++){let I=3*a.resolveTriangleIndex(M);for(let P=0;P<3;P++){let F=I+P;F=n?n[F]:F;let N=i.getX(F),O=i.getY(F),j=i.getZ(F);N<y&&(y=N),N>S&&(S=N),O<x&&(x=O),O>E&&(E=O),j<_&&(_=j),j>R&&(R=j)}}return c[u+0]!==y||c[u+1]!==x||c[u+2]!==_||c[u+3]!==S||c[u+4]!==E||c[u+5]!==R?(c[u+0]=y,c[u+1]=x,c[u+2]=_,c[u+3]=S,c[u+4]=E,c[u+5]=R,!0):!1}else{let p=u+8,v=r[u+6],y=p+f,x=v+f,_=b,S=!1,E=!1;e?_||(S=e.has(y),E=e.has(x),_=!S&&!E):(S=!0,E=!0);let R=_||S,M=_||E,w=!1;R&&(w=h(p,f,_));let I=!1;M&&(I=h(v,f,_));let P=w||I;if(P)for(let F=0;F<3;F++){let N=p+F,O=v+F,j=c[N],J=c[N+3],H=c[O],Q=c[O+3];c[u+F]=j<H?j:H,c[u+F+3]=J>Q?J:Q}return P}}}function Fm(a,e,t,n,i,s,r){Ye.setBuffer(a._roots[e]),uu(0,a,t,n,i,s,r),Ye.clearBuffer()}function uu(a,e,t,n,i,s,r){let{float32Array:o,uint16Array:c,uint32Array:l}=Ye,d=a*2;if(xt(d,c)){let u=Et(a,l),f=Rt(d,c);Em(e,t,n,u,f,i,s,r)}else{let u=Bt(a);Pn(u,o,n,s,r)&&uu(u,e,t,n,i,s,r);let f=Ot(a,l);Pn(f,o,n,s,r)&&uu(f,e,t,n,i,s,r)}}var O_=["x","y","z"];function Lm(a,e,t,n,i,s){Ye.setBuffer(a._roots[e]);let r=fu(0,a,t,n,i,s);return Ye.clearBuffer(),r}function fu(a,e,t,n,i,s){let{float32Array:r,uint16Array:o,uint32Array:c}=Ye,l=a*2;if(xt(l,o)){let h=Et(a,c),u=Rt(l,o);return Am(e,t,n,h,u,i,s)}else{let h=hl(a,c),u=O_[h],b=n.direction[u]>=0,g,m;b?(g=Bt(a),m=Ot(a,c)):(g=Ot(a,c),m=Bt(a));let v=Pn(g,r,n,i,s)?fu(g,e,t,n,i,s):null;if(v){let _=v.point[u];if(b?_<=r[m+h]:_>=r[m+h+3])return v}let x=Pn(m,r,n,i,s)?fu(m,e,t,n,i,s):null;return v&&x?v.distance<=x.distance?v:x:v||x||null}}var _l=new Xe,Cs=new Gt,Is=new Gt,Wr=new he,Nm=new _t,Ml=new _t;function Um(a,e,t,n){Ye.setBuffer(a._roots[e]);let i=pu(0,a,t,n);return Ye.clearBuffer(),i}function pu(a,e,t,n,i=null){let{float32Array:s,uint16Array:r,uint32Array:o}=Ye,c=a*2;if(i===null&&(t.boundingBox||t.computeBoundingBox(),Nm.set(t.boundingBox.min,t.boundingBox.max,n),i=Nm),xt(c,r)){let d=e.geometry,h=d.index,u=d.attributes.position,f=t.index,b=t.attributes.position,g=Et(a,o),m=Rt(c,r);if(Wr.copy(n).invert(),t.boundsTree)return ct(a,s,Ml),Ml.matrix.copy(Wr),Ml.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:v=>Ml.intersectsBox(v),intersectsTriangle:v=>{v.a.applyMatrix4(n),v.b.applyMatrix4(n),v.c.applyMatrix4(n),v.needsUpdate=!0;for(let y=g,x=m+g;y<x;y++)if(lt(Is,3*e.resolveTriangleIndex(y),h,u),Is.needsUpdate=!0,v.intersectsTriangle(Is))return!0;return!1}});for(let p=g,v=m+g;p<v;p++){let y=e.resolveTriangleIndex(p);lt(Cs,3*y,h,u),Cs.a.applyMatrix4(Wr),Cs.b.applyMatrix4(Wr),Cs.c.applyMatrix4(Wr),Cs.needsUpdate=!0;for(let x=0,_=f.count;x<_;x+=3)if(lt(Is,x,f,b),Is.needsUpdate=!0,Cs.intersectsTriangle(Is))return!0}}else{let d=a+8,h=o[a+6];return ct(d,s,_l),!!(i.intersectsBox(_l)&&pu(d,e,t,n,i)||(ct(h,s,_l),i.intersectsBox(_l)&&pu(h,e,t,n,i)))}}var wl=new he,mu=new _t,Xr=new _t,z_=new C,j_=new C,V_=new C,G_=new C;function Bm(a,e,t,n={},i={},s=0,r=1/0){e.boundingBox||e.computeBoundingBox(),mu.set(e.boundingBox.min,e.boundingBox.max,t),mu.needsUpdate=!0;let o=a.geometry,c=o.attributes.position,l=o.index,d=e.attributes.position,h=e.index,u=cn.getPrimitive(),f=cn.getPrimitive(),b=z_,g=j_,m=null,p=null;i&&(m=V_,p=G_);let v=1/0,y=null,x=null;return wl.copy(t).invert(),Xr.matrix.copy(wl),a.shapecast({boundsTraverseOrder:_=>mu.distanceToBox(_),intersectsBounds:(_,S,E)=>E<v&&E<r?(S&&(Xr.min.copy(_.min),Xr.max.copy(_.max),Xr.needsUpdate=!0),!0):!1,intersectsRange:(_,S)=>{if(e.boundsTree){let E=e.boundsTree;return E.shapecast({boundsTraverseOrder:R=>Xr.distanceToBox(R),intersectsBounds:(R,M,w)=>w<v&&w<r,intersectsRange:(R,M)=>{for(let w=R,I=R+M;w<I;w++){let P=E.resolveTriangleIndex(w);lt(f,3*P,h,d),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let F=_,N=_+S;F<N;F++){let O=a.resolveTriangleIndex(F);lt(u,3*O,l,c),u.needsUpdate=!0;let j=u.distanceToTriangle(f,b,m);if(j<v&&(g.copy(b),p&&p.copy(m),v=j,y=F,x=w),j<s)return!0}}}})}else{let E=oi(e);for(let R=0,M=E;R<M;R++){lt(f,3*R,h,d),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let w=_,I=_+S;w<I;w++){let P=a.resolveTriangleIndex(w);lt(u,3*P,l,c),u.needsUpdate=!0;let F=u.distanceToTriangle(f,b,m);if(F<v&&(g.copy(b),p&&p.copy(m),v=F,y=w,x=R),F<s)return!0}}}}}),cn.releasePrimitive(u),cn.releasePrimitive(f),v===1/0?null:(n.point?n.point.copy(g):n.point=g.clone(),n.distance=v,n.faceIndex=y,i&&(i.point?i.point.copy(p):i.point=p.clone(),i.point.applyMatrix4(wl),g.applyMatrix4(wl),i.distance=g.sub(i.point).length(),i.faceIndex=x),n)}function Om(){return typeof SharedArrayBuffer<"u"}var qr=new Ye.constructor,Sl=new Ye.constructor,Yi=new Ki(()=>new Xe),Ps=new Xe,Ds=new Xe,bu=new Xe,gu=new Xe,xu=!1;function zm(a,e,t,n){if(xu)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");xu=!0;let i=a._roots,s=e._roots,r,o=0,c=0,l=new he().copy(t).invert();for(let d=0,h=i.length;d<h;d++){qr.setBuffer(i[d]),c=0;let u=Yi.getPrimitive();ct(0,qr.float32Array,u),u.applyMatrix4(l);for(let f=0,b=s.length;f<b&&(Sl.setBuffer(s[f]),r=Vn(0,0,t,l,n,o,c,0,0,u),Sl.clearBuffer(),c+=s[f].length,!r);f++);if(Yi.releasePrimitive(u),qr.clearBuffer(),o+=i[d].length,r)break}return xu=!1,r}function Vn(a,e,t,n,i,s=0,r=0,o=0,c=0,l=null,d=!1){let h,u;d?(h=Sl,u=qr):(h=qr,u=Sl);let f=h.float32Array,b=h.uint32Array,g=h.uint16Array,m=u.float32Array,p=u.uint32Array,v=u.uint16Array,y=a*2,x=e*2,_=xt(y,g),S=xt(x,v),E=!1;if(S&&_)d?E=i(Et(e,p),Rt(e*2,v),Et(a,b),Rt(a*2,g),c,r+e,o,s+a):E=i(Et(a,b),Rt(a*2,g),Et(e,p),Rt(e*2,v),o,s+a,c,r+e);else if(S){let R=Yi.getPrimitive();ct(e,m,R),R.applyMatrix4(t);let M=Bt(a),w=Ot(a,b);ct(M,f,Ps),ct(w,f,Ds);let I=R.intersectsBox(Ps),P=R.intersectsBox(Ds);E=I&&Vn(e,M,n,t,i,r,s,c,o+1,R,!d)||P&&Vn(e,w,n,t,i,r,s,c,o+1,R,!d),Yi.releasePrimitive(R)}else{let R=Bt(e),M=Ot(e,p);ct(R,m,bu),ct(M,m,gu);let w=l.intersectsBox(bu),I=l.intersectsBox(gu);if(w&&I)E=Vn(a,R,t,n,i,s,r,o,c+1,l,d)||Vn(a,M,t,n,i,s,r,o,c+1,l,d);else if(w)if(_)E=Vn(a,R,t,n,i,s,r,o,c+1,l,d);else{let P=Yi.getPrimitive();P.copy(bu).applyMatrix4(t);let F=Bt(a),N=Ot(a,b);ct(F,f,Ps),ct(N,f,Ds);let O=P.intersectsBox(Ps),j=P.intersectsBox(Ds);E=O&&Vn(R,F,n,t,i,r,s,c,o+1,P,!d)||j&&Vn(R,N,n,t,i,r,s,c,o+1,P,!d),Yi.releasePrimitive(P)}else if(I)if(_)E=Vn(a,M,t,n,i,s,r,o,c+1,l,d);else{let P=Yi.getPrimitive();P.copy(gu).applyMatrix4(t);let F=Bt(a),N=Ot(a,b);ct(F,f,Ps),ct(N,f,Ds);let O=P.intersectsBox(Ps),j=P.intersectsBox(Ds);E=O&&Vn(M,F,n,t,i,r,s,c,o+1,P,!d)||j&&Vn(M,N,n,t,i,r,s,c,o+1,P,!d),Yi.releasePrimitive(P)}}return E}var El=new _t,jm=new Xe,H_={strategy:0,maxDepth:40,maxLeafTris:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null},Kr=class a{static serialize(e,t={}){t={cloneBuffers:!0,...t};let n=e.geometry,i=e._roots,s=e._indirectBuffer,r=n.getIndex(),o;return t.cloneBuffers?o={roots:i.map(c=>c.slice()),index:r?r.array.slice():null,indirectBuffer:s?s.slice():null}:o={roots:i,index:r?r.array:null,indirectBuffer:s},o}static deserialize(e,t,n={}){n={setIndex:!0,indirect:!!e.indirectBuffer,...n};let{index:i,roots:s,indirectBuffer:r}=e,o=new a(t,{...n,[ol]:!0});if(o._roots=s,o._indirectBuffer=r||null,n.setIndex){let c=t.getIndex();if(c===null){let l=new Ke(e.index,1,!1);t.setIndex(l)}else c.array!==i&&(c.array.set(i),c.needsUpdate=!0)}return o}get indirect(){return!!this._indirectBuffer}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("MeshBVH: Only BufferGeometries are supported.");if(t=Object.assign({...H_,[ol]:!1},t),t.useSharedArrayBuffer&&!Om())throw new Error("MeshBVH: SharedArrayBuffer is not available.");this.geometry=e,this._roots=null,this._indirectBuffer=null,t[ol]||(pm(this,t),!e.boundingBox&&t.setBoundingBox&&(e.boundingBox=this.getBoundingBox(new Xe))),this.resolveTriangleIndex=t.indirect?n=>this._indirectBuffer[n]:n=>n}refit(e=null){return(this.indirect?km:Sm)(this,e)}traverse(e,t=0){let n=this._roots[t],i=new Uint32Array(n),s=new Uint16Array(n);r(0);function r(o,c=0){let l=o*2,d=s[l+15]===65535;if(d){let h=i[o+6],u=s[l+14];e(c,d,new Float32Array(n,o*4,6),h,u)}else{let h=o+32/4,u=i[o+6],f=i[o+7];e(c,d,new Float32Array(n,o*4,6),f)||(r(h,c+1),r(u,c+1))}}}raycast(e,t=Yt,n=0,i=1/0){let s=this._roots,r=this.geometry,o=[],c=t.isMaterial,l=Array.isArray(t),d=r.groups,h=c?t.side:t,u=this.indirect?Fm:Rm;for(let f=0,b=s.length;f<b;f++){let g=l?t[d[f].materialIndex].side:h,m=o.length;if(u(this,f,g,e,o,n,i),l){let p=d[f].materialIndex;for(let v=m,y=o.length;v<y;v++)o[v].face.materialIndex=p}}return o}raycastFirst(e,t=Yt,n=0,i=1/0){let s=this._roots,r=this.geometry,o=t.isMaterial,c=Array.isArray(t),l=null,d=r.groups,h=o?t.side:t,u=this.indirect?Lm:Cm;for(let f=0,b=s.length;f<b;f++){let g=c?t[d[f].materialIndex].side:h,m=u(this,f,g,e,n,i);m!=null&&(l==null||m.distance<l.distance)&&(l=m,c&&(m.face.materialIndex=d[f].materialIndex))}return l}intersectsGeometry(e,t){let n=!1,i=this._roots,s=this.indirect?Um:Pm;for(let r=0,o=i.length;r<o&&(n=s(this,r,e,t),!n);r++);return n}shapecast(e){let t=cn.getPrimitive(),n=this.indirect?Tm:wm,{boundsTraverseOrder:i,intersectsBounds:s,intersectsRange:r,intersectsTriangle:o}=e;if(r&&o){let h=r;r=(u,f,b,g,m)=>h(u,f,b,g,m)?!0:n(u,f,this,o,b,g,t)}else r||(o?r=(h,u,f,b)=>n(h,u,this,o,f,b,t):r=(h,u,f)=>f);let c=!1,l=0,d=this._roots;for(let h=0,u=d.length;h<u;h++){let f=d[h];if(c=bm(this,h,s,r,i,l),c)break;l+=f.byteLength}return cn.releasePrimitive(t),c}bvhcast(e,t,n){let{intersectsRanges:i,intersectsTriangles:s}=n,r=cn.getPrimitive(),o=this.geometry.index,c=this.geometry.attributes.position,l=this.indirect?b=>{let g=this.resolveTriangleIndex(b);lt(r,g*3,o,c)}:b=>{lt(r,b*3,o,c)},d=cn.getPrimitive(),h=e.geometry.index,u=e.geometry.attributes.position,f=e.indirect?b=>{let g=e.resolveTriangleIndex(b);lt(d,g*3,h,u)}:b=>{lt(d,b*3,h,u)};if(s){let b=(g,m,p,v,y,x,_,S)=>{for(let E=p,R=p+v;E<R;E++){f(E),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let M=g,w=g+m;M<w;M++)if(l(M),r.needsUpdate=!0,s(r,d,M,E,y,x,_,S))return!0}return!1};if(i){let g=i;i=function(m,p,v,y,x,_,S,E){return g(m,p,v,y,x,_,S,E)?!0:b(m,p,v,y,x,_,S,E)}}else i=b}return zm(this,e,t,i)}intersectsBox(e,t){return El.set(e.min,e.max,t),El.needsUpdate=!0,this.shapecast({intersectsBounds:n=>El.intersectsBox(n),intersectsTriangle:n=>El.intersectsTriangle(n)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},i={},s=0,r=1/0){return(this.indirect?Bm:Dm)(this,e,t,n,i,s,r)}closestPointToPoint(e,t={},n=0,i=1/0){return gm(this,e,t,n,i)}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(n=>{ct(0,new Float32Array(n),jm),e.union(jm)}),e}};function vu(a,e,t){return a===null?null:(a.point.applyMatrix4(e.matrixWorld),a.distance=a.point.distanceTo(t.ray.origin),a.object=e,a)}var E1=parseInt("180")>=166,Al=new Zn,Vm=new C,Gm=new he,W_=tt.prototype.raycast,X_=rr.prototype.raycast,Hm=new C,Ht=new tt,Tl=[];function Wm(a,e){this.isBatchedMesh?q_.call(this,a,e):K_.call(this,a,e)}function q_(a,e){if(this.boundsTrees){let t=this.boundsTrees,n=this._drawInfo||this._instanceInfo,i=this._drawRanges||this._geometryInfo,s=this.matrixWorld;Ht.material=this.material,Ht.geometry=this.geometry;let r=Ht.geometry.boundsTree,o=Ht.geometry.drawRange;Ht.geometry.boundingSphere===null&&(Ht.geometry.boundingSphere=new yt);for(let c=0,l=n.length;c<l;c++){if(!this.getVisibleAt(c))continue;let d=n[c].geometryIndex;if(Ht.geometry.boundsTree=t[d],this.getMatrixAt(c,Ht.matrixWorld).premultiply(s),!Ht.geometry.boundsTree){this.getBoundingBoxAt(d,Ht.geometry.boundingBox),this.getBoundingSphereAt(d,Ht.geometry.boundingSphere);let h=i[d];Ht.geometry.setDrawRange(h.start,h.count)}Ht.raycast(a,Tl);for(let h=0,u=Tl.length;h<u;h++){let f=Tl[h];f.object=this,f.batchId=c,e.push(f)}Tl.length=0}Ht.geometry.boundsTree=r,Ht.geometry.drawRange=o,Ht.material=null,Ht.geometry=null}else X_.call(this,a,e)}function K_(a,e){if(this.geometry.boundsTree){if(this.material===void 0)return;Gm.copy(this.matrixWorld).invert(),Al.copy(a.ray).applyMatrix4(Gm),Hm.setFromMatrixScale(this.matrixWorld),Vm.copy(Al.direction).multiply(Hm);let t=Vm.length(),n=a.near/t,i=a.far/t,s=this.geometry.boundsTree;if(a.firstHitOnly===!0){let r=vu(s.raycastFirst(Al,this.material,n,i),this,a);r&&e.push(r)}else{let r=s.raycast(Al,this.material,n,i);for(let o=0,c=r.length;o<c;o++){let l=vu(r[o],this,a);l&&e.push(l)}}}else W_.call(this,a,e)}var Xm=`

// A stack of uint32 indices can can store the indices for
// a perfectly balanced tree with a depth up to 31. Lower stack
// depth gets higher performance.
//
// However not all trees are balanced. Best value to set this to
// is the trees max depth.
#ifndef BVH_STACK_DEPTH
#define BVH_STACK_DEPTH 60
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}
`;var qm=`

#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

// Raycasting
bool intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax, out float dist ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	dist = max( t0, 0.0 );

	return t1 >= dist;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// outputs
	inout float minDistance, inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

bool intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, sampler2D bvhBounds, uint currNodeIndex, out float dist ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax, dist );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhIntersectFirstHit(		bvh,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)	_bvhIntersectFirstHit(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)

bool _bvhIntersectFirstHit(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// output variables split into separate variables due to output precision
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( ptr > - 1 && ptr < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance;
		if (
			! intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh_bvhBounds, currNodeIndex, boundsHitDistance )
			|| boundsHitDistance > triangleDistance
		) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh_position, bvh_index, offset, count,
				rayOrigin, rayDirection, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;

			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return found;

}
`;var P1=`
	${Xm}
	${qm}
`;var de=(a,e,t,n,i,s,r)=>({key:a,label:e,min:t,max:n,step:i,value:s,hint:r}),yu=[{id:"low-poly",name:"Low-poly amber",family:"Sculpted",mode:1,asset:"faceted",bg:"#11100e",accent:"#f4a856",description:"Warm light catches every facet. A sculptural, stripped-back take on the workstation.",controls:[de("a","Faceting",0,1,.01,1,"Blend smooth normals into flat triangle normals."),de("b","Amber warmth",0,1,.01,.7,"Tint the key light and highlights amber."),de("c","Surface grain",0,1,.01,.1,"Fine procedural texture across the surface.")]},{id:"clay",name:"Monochrome clay",family:"Sculpted",mode:2,bg:"#dcd8d0",accent:"#b8afa1",description:"One soft ivory material. Quiet shadows reveal the shape without the texture.",controls:[de("a","Ivory tone",0,1,.01,.5,"Shift the clay from cool grey to warm ivory."),de("b","Softness",0,1,.01,.75,"Lift the diffuse shadows."),de("c","Surface grain",0,1,.01,.12,"Add subtle clay texture.")]},{id:"voxel",name:"Voxel noir",family:"Digital",mode:3,asset:"voxel",bg:"#08090b",accent:"#ffae51",description:"A real voxel mesh, charcoal surfaces, and screens glowing in the dark.",controls:[de("a","Cell seams",0,1,.01,.65,"Darken the anti-aliased seams between voxel cells."),de("b","Amber warmth",0,1,.01,.45,"Warm the workstation lighting."),de("c","Edge glow",0,1,.01,.12,"Add a subtle grazing-angle highlight.")]},{id:"cel",name:"Cel shaded",family:"Illustrated",mode:4,bg:"#d7d4cd",accent:"#f2a257",description:"Stepped lighting and clean ink contours, like a frame from an animated film.",controls:[de("a","Light bands",2,7,1,4,"Number of discrete lighting levels."),de("b","Outline",0,1,.01,.65,"Strength of the screen-space contours."),de("c","Saturation",0,1,.01,.75,"Strength of the illustrated color.")]},{id:"paper",name:"Papercraft",family:"Sculpted",mode:5,asset:"faceted",bg:"#e5d9c3",accent:"#d19b63",description:"Folded planes, warm paper fibers, and delicate crease lines.",controls:[de("a","Fold lines",0,1,.01,.4,"Reveal the triangle edges as paper folds."),de("b","Paper grain",0,1,.01,.45,"Texture the paper fibers."),de("c","Color wash",0,1,.01,.45,"Mix the original colors into the paper.")]},{id:"pixel",name:"Pixel art",family:"Digital",mode:6,bg:"#111526",accent:"#f29b59",description:"Crisp pixel blocks and a reduced palette turn the scene into a tiny game world.",controls:[de("a","Pixel size",2,14,1,5,"Size of each pixel in CSS pixels."),de("b","Palette levels",3,12,1,6,"Color levels per channel."),de("c","Dithering",0,1,.01,.45,"Ordered dither between palette steps.")]},{id:"ps1",name:"Retro PS1",family:"Digital",mode:7,asset:"faceted",bg:"#15151d",accent:"#c99e75",description:"Low-poly geometry, snapped vertices, affine texture mapping, and noisy color.",controls:[de("a","Vertex snap",0,1,.01,.45,"Snap projected vertices to a low-resolution grid."),de("b","Color crunch",0,1,.01,.65,"Reduce the color precision."),de("c","Texture warp",0,1,.01,.85,"Blend toward affine, non-perspective-correct UVs.")]},{id:"claymation",name:"Claymation",family:"Sculpted",mode:8,bg:"#c8b59c",accent:"#c38d58",animated:!0,description:"A handmade miniature with fingerprint grain and a subtle stop-motion wobble.",controls:[de("a","Fingerprints",0,1,.01,.55,"Intensity of the ridges in the clay."),de("b","Handmade wobble",0,1,.01,.3,"Small stepped displacements of the surface."),de("c","Warmth",0,1,.01,.65,"Warm the clay palette.")]},{id:"ink",name:"Hand inked",family:"Illustrated",mode:9,bg:"#e6d8bb",accent:"#d19049",description:"Heavy contours and crosshatching on warm, grainy paper.",controls:[de("a","Ink weight",0,1,.01,.8,"Strength of the ink contours."),de("b","Hatching",0,1,.01,.6,"Density of the diagonal ink shading."),de("c","Color",0,1,.01,.6,"Blend between monochrome ink and tinted illustration.")]},{id:"graphite",name:"Graphite sketch",family:"Illustrated",mode:10,bg:"#e5e1d9",accent:"#9b978e",description:"A pencil study with fine layered hatching and graphite edges.",controls:[de("a","Pencil pressure",0,1,.01,.65,"Contrast of the pencil marks."),de("b","Hatching",0,1,.01,.65,"Crosshatch density in shaded areas."),de("c","Paper grain",0,1,.01,.55,"Grain visible in the sketch.")]},{id:"watercolor",name:"Watercolor",family:"Illustrated",mode:11,bg:"#e7dfcb",accent:"#c7a271",description:"Soft color washes, uneven pigment, and edges that settle into the paper.",controls:[de("a","Pigment",0,1,.01,.55,"Variation of pigment across the wash."),de("b","Bleed",0,1,.01,.5,"How far adjacent colors blend."),de("c","Paper texture",0,1,.01,.5,"Grain beneath the watercolor.")]},{id:"riso",name:"Three-ink risograph",family:"Illustrated",mode:12,bg:"#e9dfc8",accent:"#dc703e",description:"Orange, midnight blue, and cream. Halftone dots and imperfect ink registration.",controls:[de("a","Dot size",2,10,1,4,"Spacing of the printed halftone dots."),de("b","Misregistration",0,1,.01,.45,"Offset the orange plate from the blue plate."),de("c","Ink density",0,1,.01,.7,"Strength of the printed inks.")]},{id:"wireframe",name:"Amber wireframe",family:"Digital",mode:13,asset:"faceted",bg:"#06090c",accent:"#ffb149",description:"The actual mesh topology, drawn as luminous amber lines.",controls:[de("a","Line width",.5,3,.05,1.15,"Anti-aliased width of the triangle edges."),de("b","Glow",0,1,.01,.6,"Brightness and bloom of the wire."),de("c","Surface fill",0,1,.01,.08,"Reveal a faint solid surface behind the wire.")]},{id:"points",name:"Point cloud",family:"Digital",mode:14,bg:"#050910",accent:"#f3b06f",description:"Thousands of surface-sampled points, suspended in an amber and blue constellation.",controls:[de("a","Point size",.5,4,.05,1.5,"Size of each round particle."),de("b","Density",.15,1,.01,.75,"Proportion of the sampled surface points shown."),de("c","Color split",0,1,.01,.6,"Mix source colors with amber and blue.")]},{id:"hologram",name:"Holographic light",family:"Digital",mode:15,bg:"#04131c",accent:"#54d9ff",animated:!0,description:"Cyan contours, scanning bands, and a translucent electronic silhouette.",controls:[de("a","Scanlines",0,1,.01,.65,"Contrast of the horizontal scan lines."),de("b","Fresnel glow",0,1,.01,.75,"Brightness at grazing angles."),de("c","Scan speed",0,1,.01,.4,"Speed of the traveling scan band.")]},{id:"glass",name:"Frosted glass",family:"Materials",mode:16,bg:"#c9d3d9",accent:"#9bcbde",description:"Milky translucent surfaces, broad reflections, and cool glass edges.",controls:[de("a","Frost",0,1,.01,.65,"Blur the analytic studio reflections."),de("b","Transmission",0,1,.01,.65,"Thin-surface transparency; not volumetric refraction."),de("c","Blue tint",0,1,.01,.35,"Tint the glass toward pale blue.")]},{id:"chrome",name:"Liquid chrome",family:"Materials",mode:17,bg:"#11151a",accent:"#b3c9da",animated:!0,description:"Mirror-like silver with flowing normals and long studio reflections.",controls:[de("a","Roughness",0,1,.01,.15,"Broaden the reflection highlights."),de("b","Ripple",0,1,.01,.25,"Distort reflection normals with soft waves."),de("c","Flow speed",0,1,.01,.2,"Speed of the reflection ripple.")]},{id:"obsidian",name:"Obsidian",family:"Materials",mode:18,asset:"faceted",bg:"#0a0b0d",accent:"#d5a36e",description:"Dark volcanic facets, fine mineral veins, and a warm electronic core.",controls:[de("a","Polish",0,1,.01,.7,"Strength of glossy stone reflections."),de("b","Mineral veins",0,1,.01,.35,"Reveal thin veins in the obsidian."),de("c","Faceting",0,1,.01,.8,"Blend toward hard triangle normals.")]},{id:"ceramic",name:"Glazed ceramic",family:"Materials",mode:19,bg:"#d8d3c6",accent:"#c3a87d",description:"Porcelain forms beneath a glossy glaze, with a fine crazed surface.",controls:[de("a","Glaze",0,1,.01,.75,"Strength of the clear glaze highlights."),de("b","Crackle",0,1,.01,.3,"Fine procedural lines in the glaze."),de("c","Color",0,1,.01,.6,"Amount of original color in the ceramic.")]},{id:"synthwave",name:"Synthwave",family:"Digital",mode:20,bg:"#0e0723",accent:"#ec65dc",animated:!0,description:"Electric magenta, cyan edges, and a neon grid after midnight.",controls:[de("a","Neon glow",0,1,.01,.65,"Strength of the colored edge light."),de("b","Grid",0,1,.01,.65,"Brightness of the neon floor grid."),de("c","Pulse",0,1,.01,.35,"Amount of rhythmic screen and edge glow.")]},{id:"charcoal",name:"Charcoal facets",family:"Studio",mode:21,asset:"faceted",bg:"#101113",accent:"#b89366",description:"A charcoal surface study: hard planes, restrained sheen, and amber accents.",controls:[de("a","Faceting",0,1,.01,.9,"Emphasize the low-poly planes."),de("b","Sheen",0,1,.01,.35,"Subtle highlights on the dark surface."),de("c","Amber accent",0,1,.01,.55,"Warm the reflected key light.")]},{id:"softbox",name:"Softbox studio",family:"Studio",mode:22,bg:"#15171a",accent:"#c7cbd2",description:"Satin black, broad softbox highlights, and clean product-studio lighting.",controls:[de("a","Satin sheen",0,1,.01,.65,"Intensity of the wide studio reflections."),de("b","Softbox width",0,1,.01,.7,"Broaden the reflected white light."),de("c","Black level",0,1,.01,.3,"Lift the dark surface tone.")]}],z1=Object.fromEntries(yu.map(a=>[a.id,a]));function Km(a){return{...Object.fromEntries(a.controls.map(e=>[e.key,e.value])),exposure:1.05,emission:a.mode===2?0:1.3}}var ci=[{id:"overview",name:"Studio isometrico",position:[7.682,5.498,8.664],target:[-.05,1.12,-.55],fov:28},{id:"duo",name:"Le due postazioni",position:[.37,1.62,.35],target:[.37,1.18,-2.55],fov:61,range:.75},{id:"gian",name:"Workstation Gian",position:[.65,1.48,-.82],target:[1.35,1.04,-2.48],fov:49,range:.32},{id:"nuru",name:"Workstation Nuru",position:[.1,1.43,-.85],target:[-.65,1.05,-2.47],fov:48,range:.3},{id:"lounge",name:"Salotto",position:[.48,1.38,-.44],target:[1.65,.56,1.08],fov:57,range:.7},{id:"softbox",name:"Softbox",position:[.3,1.75,.36],target:[-1.05,1.91,-.84],fov:46,range:.28},{id:"coffee",name:"Angolo caff\xE8",position:[-1.92,1.42,.19],target:[-2.5,1.04,1.3],fov:53,range:.26},{id:"tv",name:"TV e postazioni",position:[.5,1.75,-.75],target:[.38,1.72,-2.95],fov:48,range:.18},{id:"library",name:"Libreria",position:[-.2,1.33,.2],target:[-1.74,1.1,-.62],fov:52,range:.25},{id:"project",name:"Zona progettazione",position:[-.28,1.55,.65],target:[-1.65,.92,-.62],fov:58,range:.55},{id:"lounge-lamp",name:"Lampada del salotto",position:[.7,1.35,.03],target:[2.05,1.06,1.39],fov:43,range:.22},{id:"armchairs",name:"Le poltrone",position:[.45,1.1,-.32],target:[1.78,.43,1.13],fov:50,range:.38},{id:"gian-display",name:"Display Gian",position:[1.2,1.34,-1.46],target:[1.28,1.06,-2.73],fov:49,range:.15},{id:"nuru-display",name:"Display Nuru",position:[-.38,1.36,-1.42],target:[-.62,1.1,-2.68],fov:48,range:.15},{id:"gian-keyboard",name:"Tastiera Gian",position:[1.1,1.24,-1.66],target:[1.23,.752,-2.42],fov:42,range:.08},{id:"nuru-keyboard",name:"Tastiera Nuru",position:[-.47,1.25,-1.7],target:[-.52,.752,-2.42],fov:41,range:.08},{id:"books",name:"Libri e materiali",position:[-.45,1.58,-.2],target:[-1.7,1.38,-.64],fov:38,range:.17},{id:"coffee-detail",name:"Macchina del caff\xE8",position:[-1.95,1.2,.62],target:[-2.52,1.04,1.3],fov:36,range:.12},{id:"cross-studio",name:"Attraverso lo studio",position:[-1.94,1.58,.1],target:[1.15,1.03,-1.6],fov:62,range:.9},{id:"lounge-reverse",name:"Salotto e architettura",position:[.54,1.7,-.73],target:[1.62,.65,1.29],fov:55,range:.6}];var Jr=yu.map(a=>({id:a.mode,key:a.id,name:a.name,accent:a.accent,values:Km(a),source:"atlas"}));Jr.find(a=>a.key==="graphite").values={a:1,b:.49,c:.2,exposure:1,emission:1.1};Jr.push({id:23,key:"copper-etch",name:"Copper etching",accent:"#e6a275",values:{a:.65,b:.5,c:.35,exposure:1,emission:1.1}},{id:24,key:"cyanotype",name:"Cyanotype",accent:"#76b7e8",values:{a:.7,b:.6,c:.25,exposure:1,emission:1.1}},{id:25,key:"pearl",name:"Iridescent porcelain",accent:"#d1bdf0",values:{a:.65,b:.5,c:.4,exposure:1,emission:1.2}},{id:26,key:"halftone-noir",name:"Halftone noir",accent:"#d9d3c7",values:{a:4,b:.6,c:.7,exposure:1,emission:1.1}},{id:27,key:"titanium",name:"Brushed titanium",accent:"#c5d1df",values:{a:.6,b:.65,c:.35,exposure:1,emission:1.2}},{id:28,key:"silver-relief",name:"Silver relief",accent:"#c6b7a7",values:{a:.7,b:.5,c:.35,exposure:1,emission:1.1}});var ks=Object.fromEntries(Jr.map(a=>[a.id,a])),Rl=1.48;var Yr=a=>a*a*a*(a*(a*6-15)+10),yn=(a,e,t,n)=>a+(e-a)*(1-Math.exp(-t*n));function Jm(a){return-Math.PI*.5*Math.cos(a*Math.PI/18)}function Zm(a,e,t,n=0,i=0){let s=Ut.clamp(e,0,1),r=Math.max(.1,t),o=a.near,c=a.far,l=2*r*Math.tan(a.fov*Math.PI/360),d=1-s+s*o/r,u=-(1-s+s*c/r+d)/(c-o),f=-d+u*o;a.projectionMatrix.set(2/(l*a.aspect),0,-n*s/r,n*(1-s),0,2/l,-i*s/r,i*(1-s),0,0,u,f,0,0,-s/r,1-s),a.projectionMatrixInverse.copy(a.projectionMatrix).invert(),a.userData.projectionDistance=r,a.userData.perspective=s}var Ym=new C;function Qm(a,e,t){a.camera=t,a.ray.origin.set(e.x,e.y,-1).unproject(t),Ym.set(e.x,e.y,1).unproject(t),a.ray.direction.copy(Ym).sub(a.ray.origin).normalize()}function $m(a){return Math.max(a>1.3&&a<=2?1.2:1,1.4/a)}var _u=new C(0,1,0),Il=class{constructor(e){Object.assign(this,e),this.valid=[],this.data.forEach((t,n)=>{t&&this.valid.push(n)})}index(e,t){let n=Math.round((e-this.minX)/this.cell),i=Math.round((t-this.minZ)/this.cell);return n<0||i<0||n>=this.cols||i>=this.rows?-1:i*this.cols+n}point(e,t=Rl){return new C(this.minX+e%this.cols*this.cell,t,this.minZ+Math.floor(e/this.cols)*this.cell)}isFree(e,t){return this.data[this.index(e,t)]===1}nearest(e){let t=1/0,n=this.valid[0];for(let i of this.valid){let s=this.minX+i%this.cols*this.cell,r=this.minZ+Math.floor(i/this.cols)*this.cell,o=(e.x-s)**2+(e.z-r)**2;o<t&&(t=o,n=i)}return this.point(n,e.y)}lineFree(e,t){let n=Math.ceil(e.distanceTo(t)/(this.cell*.4));for(let i=0;i<=n;i++){let s=n?i/n:0;if(!this.isFree(Ut.lerp(e.x,t.x,s),Ut.lerp(e.z,t.z,s)))return!1}return!0}path(e,t){let n=this.index(e.x,e.z),i=this.index(t.x,t.z);if(n<0||i<0||!this.data[n]||!this.data[i])return[];if(this.lineFree(e,t))return[e.clone(),t.clone()];let s=[n],r=new Int32Array(this.data.length).fill(-1),o=new Float32Array(this.data.length).fill(1/0),c=new Uint8Array(this.data.length);o[n]=0;let l=f=>Math.hypot(f%this.cols-i%this.cols,Math.floor(f/this.cols)-Math.floor(i/this.cols)),d=!1;for(;s.length;){let f=0;for(let p=1;p<s.length;p++)o[s[p]]+l(s[p])<o[s[f]]+l(s[f])&&(f=p);let b=s.splice(f,1)[0];if(b===i){d=!0;break}if(c[b])continue;c[b]=1;let g=b%this.cols,m=Math.floor(b/this.cols);for(let[p,v]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){let y=g+p,x=m+v,_=x*this.cols+y;if(y<0||x<0||y>=this.cols||x>=this.rows||!this.data[_]||c[_]||p&&v&&(!this.data[m*this.cols+y]||!this.data[x*this.cols+g]))continue;let S=o[b]+Math.hypot(p,v);S<o[_]&&(o[_]=S,r[_]=b,s.push(_))}}if(!d)return[];let h=[];for(let f=i;f!==-1&&(h.push(this.point(f,e.y)),f!==n);f=r[f]);h.reverse(),h[0]=e.clone(),h[h.length-1]=t.clone();let u=[h[0]];for(let f=0;f<h.length-1;){let b=h.length-1;for(;b>f+1&&!this.lineFree(h[f],h[b]);)b--;u.push(h[b]),f=b}return u}move(e,t,n){let i=e.clone(),s=Math.max(1,Math.ceil(Math.hypot(t,n)/(this.cell*.4)));for(let r=0;r<s;r++){let o=i.x+t/s,c=i.z+n/s;this.isFree(o,c)?(i.x=o,i.z=c):(this.isFree(o,i.z)&&(i.x=o),this.isFree(i.x,c)&&(i.z=c))}return i}};function Cl(a,e,t){return a.isFree(e,t)||t>1.03&&t<2.65&&e>.4&&e<.78||t>=2.25&&t<6.2&&Math.abs(e)<4.6}function eb(a,e,t,n){let i=e.clone(),s=Math.max(1,Math.ceil(Math.hypot(t,n)/.035));for(let r=0;r<s;r++){let o=i.x+t/s,c=i.z+n/s;Cl(a,o,c)?(i.x=o,i.z=c):(Cl(a,o,i.z)&&(i.x=o),Cl(a,i.x,c)&&(i.z=c))}return i}function Zr(a,e=null){let t=a.filter((s,r)=>!r||s.distanceTo(a[r-1])>1e-4);if(t.length<2)return t;if(t.length===2){let[s,r]=t,o=r.clone().sub(s),c=s.clone().lerp(r,.5),l=new C(-o.z,0,o.x).normalize().multiplyScalar(Math.min(.28,o.length()*.14));c.add(l),(!e||e.lineFree(s,c)&&e.lineFree(c,r))&&t.splice(1,0,c)}let n=new ur(t,!1,"centripetal").getPoints(Math.max(80,t.length*32));if(!e||n.every((s,r)=>e.isFree(s.x,s.z)&&(!r||e.lineFree(n[r-1],s))))return n;let i=[t[0].clone()];for(let s=1;s<t.length-1;s++){let r=t[s-1],o=t[s],c=t[s+1],l=Math.min(.85,r.distanceTo(o)*.42,o.distanceTo(c)*.42),d=[o.clone()];for(let h=0;h<8;h++){let u=o.clone().lerp(r,l/Math.max(1e-4,o.distanceTo(r))),f=o.clone().lerp(c,l/Math.max(1e-4,o.distanceTo(c))),b=new fr(u,o,f).getPoints(20);if(b.every((g,m)=>e.isFree(g.x,g.z)&&(!m||e.lineFree(b[m-1],g)))){d=b;break}l*=.5}i.push(...d)}return i.push(t.at(-1).clone()),i}function Y_(a){return a.slice(1).reduce((e,t,n)=>e+t.distanceTo(a[n]),0)}var Pl=class{constructor(e,t,{onChange:n=()=>{},onFocus:i=()=>{}}={}){this.camera=e,this.grid=t,this.onChange=n,this.onFocus=i,this.state="exterior",this.view=0,this.focus=null,this.cinematic=null,this.transition=null,this.keys=new Set,this.touchMove=new be,this.yaw=0,this.pitch=0,this.targetYaw=0,this.targetPitch=0,this.orbit=new Sr,this.orbitTarget=new be,this.center=new C(...ci[0].target),this.position=new C(...ci[0].position),this.quaternion=new rn,this.lookAt(this.center),this.frameFactor=1,this.syncOrbit(),this.fov=ci[0].fov,this.perspective=0,this.shell=0,this.focusAmount=0,this.focusDistance=2,this.focusRange=.12,this.saved=null,this.idle=0}lookAt(e){this.quaternion.setFromRotationMatrix(new he().lookAt(this.position,e,_u)),this.syncAngles()}syncAngles(){let e=new mn().setFromQuaternion(this.quaternion,"YXZ");this.yaw=this.targetYaw=e.y,this.pitch=this.targetPitch=e.x}syncOrbit(){this.orbit.setFromVector3(this.position.clone().sub(this.center)),this.orbitTarget.set(this.orbit.theta,this.orbit.phi),this.radius=this.targetRadius=this.orbit.radius/this.frameFactor}cancelTransition(){this.transition&&(this.transition=null,(this.state==="entering"||this.state==="leaving")&&(this.grid.isFree(this.position.x,this.position.z)&&this.position.y<1.9?this.state="interior":Cl(this.grid,this.position.x,this.position.z)&&this.position.y<1.9?this.state="walk-exterior":(this.state="exterior",this.syncOrbit())),this.syncAngles(),this.view=this.state==="exterior"?0:-1,this.onChange(this))}start(e,t,{duration:n=2.6,fov:i=78,index:s,finish:r,focus:o=!1,perspective:c=s===0?0:1}={}){let l=e.slice(1).map((d,h)=>d.distanceTo(e[h]));this.transition={elapsed:0,duration:n,route:e,lengths:l,total:l.reduce((d,h)=>d+h,0),fromQ:this.quaternion.clone(),toQ:new rn().setFromRotationMatrix(new he().lookAt(e.at(-1),t,_u)),fromFov:this.fov,toFov:i,fromPerspective:this.perspective,toPerspective:c,index:s,finish:r,focus:o},this.keys.clear(),this.touchMove.set(0,0),this.onChange(this)}go(e,{instant:t=!1}={}){if(!ci[e])return!1;this.focus&&this.clearFocus(!1);let n=ci[e],i=new C(...n.target),s=new C(...n.position),r=this.position.clone(),o=this.grid.isFree(r.x,r.z)&&r.y<2;this.view=e,this.cinematic=e>0?{point:i.clone(),range:n.range||.35}:null,this.focusAmount=0;let c,l=this.camera.aspect<.75,d=l&&e>0?Math.min(87,n.fov+14):n.fov;if(l&&e===1&&s.set(.32,1.6,.55),e===0){s.sub(this.center).multiplyScalar(this.frameFactor).add(this.center);let h=o?[r,new C(.6,2.15,2.6),new C(3.2,4.4,5.6),s]:[r,r.clone().lerp(s,.5).add(new C(.7,.4,.4)),s];c=Zr(h),this.state="leaving"}else{s.copy(this.grid.nearest(s));let h=this.grid.nearest(new C(.56,Rl,1));if(o)c=Zr(this.grid.path(this.grid.nearest(r),s),this.grid),this.state="interior";else{let u=this.grid.path(h,s);c=Zr([r,new C(1.7,2.9,4),new C(.6,1.65,2.3),h,...u.slice(1)]),this.state="entering"}}return c?.length?(this.start(c,i,{duration:t?0:e===0||!o?3.7:Ut.clamp(Y_(c)/.75,2.2,3.7),fov:d,index:e,finish:e===0?"exterior":"interior"}),!0):(this.onChange(this),!1)}focusObject(e){if(this.focus?.uuid===e.uuid){this.clearFocus();return}let t=new Xe().setFromObject(e),n=t.getSize(new C),i=t.getCenter(new C);if(n.length()>6)return;this.focus||(this.saved={cinematic:this.cinematic,position:this.position.clone(),quaternion:this.quaternion.clone(),fov:this.fov,perspective:this.perspective,view:this.view,state:this.state==="entering"?"interior":this.state==="leaving"?"exterior":this.state}),this.cinematic=null,this.focus=e;let s=this.position.clone().sub(i).normalize(),r=Ut.clamp(n.length()*.46,.07,1.1),o=Ut.clamp(r*2.6,.46,2),c=i.clone().addScaledVector(s,o);c.y=Ut.clamp(c.y,.5,2.15);let l=this.state==="interior";if(l){let h=this.grid.nearest(c);c.x=h.x,c.z=h.z}let d=l?this.grid.path(this.grid.nearest(this.position),this.grid.nearest(c)):[this.position.clone(),c];d.length||(d=[this.position.clone(),this.position.clone()]),d[0]=this.position.clone(),d[d.length-1]=c,this.state=l?"interior":"focus-exterior",this.focusRange=Ut.clamp(n.length()*.19,.035,.35),this.focusPoint=i,this.start(Zr(d,l?this.grid:null),i,{duration:2.05,fov:45,focus:!0}),this.onFocus(e)}clearFocus(e=!0){if(!this.focus)return;let t=this.saved;if(this.focus=null,this.saved=null,this.onFocus(null),!!t){if(this.state=t.state,this.view=t.view,this.cinematic=t.cinematic,e){let n=t.state==="interior",i=n?this.grid.path(this.grid.nearest(this.position),this.grid.nearest(t.position)):[this.position.clone(),t.position];i.length||(i=[this.position.clone(),t.position]),i[0]=this.position.clone(),i[i.length-1]=t.position;let s=t.position.clone().add(new C(0,0,-2).applyQuaternion(t.quaternion));this.start(Zr(i,n?this.grid:null),s,{duration:1.8,fov:t.fov,perspective:t.perspective,index:t.view,finish:t.state})}else this.transition=null,this.fov=t.fov,this.state==="exterior"&&this.syncOrbit(),this.syncAngles();this.onChange(this)}}exit(){this.go(0)}drag(e,t){this.cinematic=null,this.focus&&this.clearFocus(!1),this.transition&&this.cancelTransition(),this.idle=0,this.state==="exterior"?(this.orbitTarget.x-=e*.004,this.orbitTarget.y=Ut.clamp(this.orbitTarget.y-t*.0035,.38,1.43)):(this.targetYaw-=e*.0027,this.targetPitch=Ut.clamp(this.targetPitch-t*.0025,-1.02,1.1),this.view=-1),this.onChange(this)}zoom(e){if(this.cinematic=null,this.focus){e>0&&this.clearFocus();return}if(this.transition&&this.cancelTransition(),this.state==="exterior")this.targetRadius=Ut.clamp(this.targetRadius*Math.exp(e*7e-4),5,19),e<0&&this.targetRadius<=5.05&&this.go(1);else{let t=new C(0,0,e*.0018).applyQuaternion(this.quaternion);this.position.copy(eb(this.grid,this.position,t.x,t.z)),this.walkState(),e>0&&this.position.z>3.6&&this.go(0),this.view=-1,this.onChange(this)}}walkState(){this.focus||(this.state=this.position.z>1.13?"walk-exterior":"interior")}update(e,t=!1,n=e){let i=!1;if(this.idle+=e,this.transition){let c=this.transition;c.elapsed+=n;let l=c.duration?Math.min(1,c.elapsed/c.duration):1,d=t?1:Yr(l),h=d*c.total,u=0;for(;u<c.lengths.length-1&&h>c.lengths[u];)h-=c.lengths[u],u++;c.route.length>1?this.position.lerpVectors(c.route[u],c.route[u+1],c.lengths[u]?h/c.lengths[u]:1):this.position.copy(c.route[0]),this.quaternion.slerpQuaternions(c.fromQ,c.toQ,t?1:Yr(Math.min(1,l*1.05))),this.fov=Ut.lerp(c.fromFov,c.toFov,d),this.perspective=Ut.lerp(c.fromPerspective,c.toPerspective,d),this.syncAngles(),i=!0,(l===1||t)&&(c.finish&&(this.state=c.finish),this.state==="exterior"&&this.syncOrbit(),this.transition=null,this.onChange(this))}else if(!this.focus)if(this.state==="exterior")this.orbit.theta=yn(this.orbit.theta,this.orbitTarget.x,6,n),this.orbit.phi=yn(this.orbit.phi,this.orbitTarget.y,6,n),this.radius=yn(this.radius,this.targetRadius,6,n),this.orbit.radius=this.radius*this.frameFactor,this.position.setFromSpherical(this.orbit).add(this.center),this.quaternion.setFromRotationMatrix(new he().lookAt(this.position,this.center,_u));else{this.yaw=yn(this.yaw,this.targetYaw,9,n),this.pitch=yn(this.pitch,this.targetPitch,9,n),this.quaternion.setFromEuler(new mn(this.pitch,this.yaw,0,"YXZ"));let c=(this.keys.has("KeyW")||this.keys.has("ArrowUp")?1:0)-(this.keys.has("KeyS")||this.keys.has("ArrowDown")?1:0)-this.touchMove.y,l=(this.keys.has("KeyD")||this.keys.has("ArrowRight")?1:0)-(this.keys.has("KeyA")||this.keys.has("ArrowLeft")?1:0)+this.touchMove.x;if(c||l){this.cinematic=null;let d=(this.keys.has("ShiftLeft")?1.7:1)*e/Math.max(1,Math.hypot(c,l));this.position.copy(eb(this.grid,this.position,(-Math.sin(this.yaw)*c+Math.cos(this.yaw)*l)*d,(-Math.cos(this.yaw)*c-Math.sin(this.yaw)*l)*d)),this.position.y=yn(this.position.y,Rl,5,n),this.walkState(),this.view=-1,i=!0,this.onChange(this)}}let s=this.position.y<2.35&&this.position.z<1.2&&this.grid.isFree(this.position.x,this.position.z)&&this.state!=="exterior"&&this.state!=="focus-exterior";this.shell=yn(this.shell,s?1:0,t?100:2.3,n),this.focusAmount=yn(this.focusAmount,this.focus?1:this.cinematic&&!this.transition?.58:0,t?100:4,n),this.focusPoint&&this.focus&&(this.focusDistance=Math.max(.1,this.focusPoint.clone().sub(this.position).dot(new C(0,0,-1).applyQuaternion(this.quaternion)))),this.cinematic&&!this.focus&&(this.focusRange=this.cinematic.range,this.focusDistance=Math.max(.1,this.cinematic.point.clone().sub(this.position).dot(new C(0,0,-1).applyQuaternion(this.quaternion)))),this.camera.position.copy(this.position),this.camera.quaternion.copy(this.quaternion),this.camera.fov=this.fov;let r=1-this.perspective;return Zm(this.camera,this.perspective,this.position.distanceTo(this.center),0,this.camera.aspect<.75?-.02*r:this.camera.aspect>1.3&&this.camera.aspect<=2?.07*r:0),this.camera.updateMatrixWorld(),i}};function tb(a){let e=2166136261;for(let t of a)e^=t.charCodeAt(0),e=Math.imul(e,16777619);return(e>>>0)%1e3/97}var nb=`
vec3 displayArt(vec2 uv,float seed){
 float t=uTime*.20+seed;vec2 p=uv*2.-1.;p.x*=1.7;
 float field=sin(p.x*2.2+sin(p.y*2.6+t)*.8+t*.7);
 float contour=abs(fract(field*2.5+p.y*.8)-.5);
 float fw=max(fwidth(contour),.008);float contourInk=1.-smoothstep(.012,.012+fw,contour);
 float orb=1.-smoothstep(.29,.32,length(p-vec2(sin(t*.7)*.48,cos(t*.9)*.2)));
 float ring=1.-smoothstep(.012,.025,abs(length(p-vec2(-.35,.08))-(.48+sin(t)*.06)));
 float scan=exp(-pow((p.y-sin(p.x*.8+t)*.3)*9.,2.));
 float design=mod(floor(seed),3.);float pattern=design<1.?contourInk*.5+orb*.8:design<2.?ring*.9+scan*.55:contourInk*.22+scan*.8+orb*.25;
 vec3 primary=uAccent,secondary=mix(vec3(.05,.35,.65),primary,.35);
 if(uMode==9.||uMode==10.||uMode==26.){primary=vec3(.94,.9,.81);secondary=vec3(.27,.3,.32);}
 if(uMode==24.){primary=vec3(.65,.84,1.);secondary=vec3(.025,.1,.33);}
 if(uMode==20.){primary=vec3(1.,.035,.5);secondary=vec3(.02,.7,1.);}
 if(uMode==2.||uMode==5.||uMode==11.||uMode==19.)primary=mix(primary,vec3(1.,.84,.64),.65);
 vec3 color=mix(secondary,primary,.5+.5*sin(field+t*.4))*pattern;
 float vignette=smoothstep(1.6,.25,length(p*vec2(.55,.9)));
 return (vec3(.004,.006,.009)+color*vignette)*2.4;
}
float screenMask(vec3 p,vec3 n){
 vec3 q=(p-uObjectMin)/max(uObjectMax-uObjectMin,vec3(.001));
 float front=smoothstep(.4,.85,n.z);
 return front*smoothstep(.018,.04,q.x)*(1.-smoothstep(.96,.985,q.x))*smoothstep(uScreenBase,uScreenBase+.025,q.y)*(1.-smoothstep(.97,.995,q.y));
}
`;function ab(){let a=ks[10].values;return{uMode:{value:10},uA:{value:a.a},uB:{value:a.b},uC:{value:a.c},uEmission:{value:a.emission},uExposure:{value:a.exposure},uAccent:{value:new Me("#e1d9c9")},uTime:{value:0},uReveal:{value:0},uShell:{value:0},uFade:{value:1},uCell:{value:.065},uOrigin:{value:new C},uPointScale:{value:450},uPerspective:{value:0},uProjectionDistance:{value:12},uKeyDir:{value:new C(-3,6,4).normalize()},uRigTint:{value:new Me(1,1,1)},uRigEnergy:{value:1},uGobo:{value:0},uGoboMix:{value:0},uGoboTime:{value:0},uScreenPower:{value:1}}}var ib={ARCHITECTURE:9867915,FURNITURE:6645097,FOLIAGE:6123612,HARDWARE:7831690,LIGHTING:9078657,SCREEN:3488579,POLYMER:5331297,TEXTILE:10064265},Z_=`
 uniform float uTime,uMode,uA,uB,uC,uPointScale,uPerspective,uProjectionDistance;
 attribute vec3 aBary;
 #ifdef STUDIO_VOXEL
 attribute vec3 aOffset;
 #endif
 varying vec3 vStudio,vStudioNormal,vStudioBary;
 varying vec3 vAffine;
`,Q_=`
 uniform float uTime,uMode,uA,uB,uC,uEmission,uCell,uReveal,uShell,uShellObject,uFixture,uFixtureKind,uScreenBase,uScreenSeed,uRigEnergy,uGobo,uGoboMix,uGoboTime,uScreenPower;
 uniform vec3 uObjectMin,uObjectMax,uAlbedo,uOrigin,uAccent,uRigTint,uKeyDir;
 varying vec3 vStudio,vStudioNormal,vStudioBary;varying vec3 vAffine;
 ${em}
 ${nb}
 float projectedLight(vec3 p){
  float pattern=1.;vec2 q=vec2(p.z+p.x*.34,p.y+p.x*.24);
  if(uGobo==1.){vec2 cell=abs(fract(q*vec2(.7,.85))-.5);pattern=.12+.88*smoothstep(.04,.09,min(cell.x,cell.y));}
  if(uGobo==2.){float v=sin((q.y+q.x*.3)*22.);pattern=.07+.93*smoothstep(-.12,.15,v);}
  if(uGobo==3.){float leaf=atlasNoise(vec3(q*5.,uGoboTime*.06));pattern=.12+.88*smoothstep(.40,.64,leaf);}
  return mix(1.,pattern,uGoboMix);
 }
`,Dl=class{constructor(e){this.u=e,this.materials=[],this.selected=10,this.progress=1,this.pending=null,this.elapsed=0}create(e,{shell:t=!1,fixtureKind:n=0,bounds:i=null,screenBase:s=.24,normalMap:r=null,graphiteAlbedo:o=[.214,.214,.214],screenSeed:c=0,voxel:l=!1}={}){let d=new vi({color:ib[e]||ib.FURNITURE,roughness:1,metalness:0,normalMap:r,normalScale:new be(.65,.65),fog:!1,vertexColors:!l,side:e==="FOLIAGE"||t?Nt:Yt,envMapIntensity:0,transparent:!0,forceSinglePass:!0,depthWrite:!t});d.name=e,d.defines={...l?{STUDIO_VOXEL:1}:{}};let h={uAlbedo:{value:new C(...o)},uShellObject:{value:t?1:0},uFixture:{value:1},uFixtureKind:{value:n},uScreenBase:{value:s},uScreenSeed:{value:c},uObjectMin:{value:i?.min.clone()||new C},uObjectMax:{value:i?.max.clone()||new C(1,1,1)}};return d.userData.local=h,d.userData.voxel=l,d.onBeforeCompile=u=>{Object.assign(u.uniforms,this.u,h),u.vertexShader=Z_+`
`+u.vertexShader,u.vertexShader=u.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 #ifdef STUDIO_VOXEL
 transformed+=aOffset;
 #endif
 if(uMode==8.){float t=floor(uTime*8.)/8.;transformed+=normal*sin(transformed.y*55.+transformed.x*23.+t*2.)*.0028*uB;}
 vStudio=(modelMatrix*vec4(transformed,1.)).xyz;vStudioNormal=normalize(mat3(modelMatrix)*normal);vStudioBary=aBary;
 `).replace("#include <project_vertex>",`#include <project_vertex>
 vAffine=vec3(0.,0.,1.);
 #ifdef USE_NORMALMAP
 vAffine=vec3(uv*gl_Position.w,gl_Position.w);
 #endif
 if(uMode==7.){float res=mix(1200.,140.,uA);gl_Position.xy=floor(gl_Position.xy/gl_Position.w*res+.5)/res*gl_Position.w;}
 `),u.fragmentShader=Q_+`
`+u.fragmentShader,u.fragmentShader=u.fragmentShader.replace("#include <normal_fragment_maps>",ze.normal_fragment_maps.replace("texture2D( normalMap, vNormalMapUv )","texture2D( normalMap, mix(vNormalMapUv,vAffine.xy/vAffine.z,uMode==7.?uC:0.) )")),u.fragmentShader=u.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
 if(uShellObject>.5&&uShell<.004)discard;
 `).replace("#include <color_fragment>",`#include <color_fragment>
 diffuseColor.a*=mix(1.,uShell,uShellObject)*uReveal;
 `).replace("#include <opaque_fragment>",`
 vec3 atlasNormal=normalize(inverseTransformDirection(normal,viewMatrix));
 vec3 atlasBase=diffuseColor.rgb;
 vec3 atlasLight=(reflectedLight.directDiffuse+reflectedLight.indirectDiffuse)/max(diffuseColor.rgb,vec3(.008));
 atlasLight=clamp(atlasLight,vec3(.015),vec3(5.))*projectedLight(vStudio);
 float atlasShade=dot(atlasLight,vec3(.2126,.7152,.0722));
 vec3 emission=vec3(0.);float displayCoverage=0.;
 if(uFixtureKind==2.){vec3 uvw=(vStudio-uObjectMin)/max(uObjectMax-uObjectMin,vec3(.001));displayCoverage=screenMask(vStudio,normalize(vStudioNormal));emission=displayArt(vec2(uvw.x,(uvw.y-uScreenBase)/(1.-uScreenBase)),uScreenSeed)*displayCoverage*uFixture*min(2.,uScreenPower);}
 if(uFixtureKind==1.){float h=(vStudio.y-uObjectMin.y)/max(.001,uObjectMax.y-uObjectMin.y);emission=vec3(1.8,.9,.35)*uFixture*smoothstep(.0,.65,-atlasNormal.y)*smoothstep(.64,.8,h);}
 if(uFixtureKind==3.)emission=vec3(1.8,.9,.4)*uFixture;
 if(uFixtureKind==4.){float bottom=1.-smoothstep(uObjectMin.y+.025,uObjectMin.y+.10,vStudio.y);emission=vec3(2.3,1.8,1.2)*uFixture*bottom*smoothstep(.02,.6,-atlasNormal.y);}
 vec4 styled=atlasSurface(uMode,uA,uB,uC,atlasBase,vec3(0.),atlasNormal,atlasLight,atlasShade);
 // Screens and real fixture surfaces stay emissive even in the pencil/clay modes.
 outgoingLight=styled.rgb*(1.-displayCoverage*.92)+emission*uEmission;
 diffuseColor.a*=styled.a;
 #include <opaque_fragment>`)},d.customProgramCacheKey=()=>l?"studio-atlas-voxel-v1":"studio-atlas-surface-v1",this.materials.push(d),d}apply(e){let t=ks[e];if(t){this.u.uMode.value=e;for(let n of["a","b","c","emission","exposure"])this.u["u"+n[0].toUpperCase()+n.slice(1)].value=t.values[n];this.u.uAccent.value.set(t.accent)}}choose(e){ks[e]&&(this.selected=e,this.pending=e,this.elapsed=0,this.progress=0)}update(e,t=!1){this.pending!==null&&(this.elapsed+=e,(this.elapsed>.13||t)&&(this.apply(this.pending),this.pending=null)),this.progress=t?1:Math.min(1,this.progress+e/.48),this.u.uFade.value=.83+.17*Math.abs(Math.cos(this.progress*Math.PI));let n=this.u.uMode.value,i=[13,15,16].includes(n);for(let s of this.materials){let r=s.userData.local,o=r.uShellObject.value>.5;s.depthWrite=(!o||this.u.uShell.value>.985)&&!i,s.visible=(!o||this.u.uShell.value>.001)&&(s.userData.voxel||![3,14].includes(n)||r.uFixtureKind.value===2)}}};var Je=(a,e,t)=>({id:a,name:e,key:2.7,fill:.7,rim:.7,ambient:.35,keyColor:16769728,fillColor:12111079,rimColor:16756343,keyPos:[-3,6,4],fillPos:[4,2,2],rimPos:[2,4,-4],practicals:.4,screens:1,softbox:.35,spot:0,spotColor:16770757,spotPos:[-2,3,1],spotTarget:[0,.6,-1],angle:.55,penumbra:.8,gobo:0,motion:0,volume:0,...t}),Fs=[Je(1,"High key",{key:3.4,fill:2.3,rim:.4,ambient:.9,keyColor:16774117}),Je(2,"Low key",{key:2.3,fill:.07,rim:.3,ambient:.05,keyPos:[-4,3,1],practicals:.25}),Je(3,"Rembrandt",{key:3.1,fill:.22,rim:.3,ambient:.12,keyPos:[-4,4,3]}),Je(4,"Butterfly",{key:3,fill:.5,rim:.2,ambient:.2,keyPos:[0,7,5]}),Je(5,"Split light",{key:3.6,fill:.04,rim:.15,ambient:.04,keyPos:[-6,1.6,0],practicals:.1}),Je(6,"Loop light",{key:2.8,fill:.48,rim:.4,ambient:.22,keyPos:[-2.5,3.8,5]}),Je(7,"Broad light",{key:3.3,fill:.5,rim:.3,ambient:.2,keyPos:[4,3,5]}),Je(8,"Short light",{key:3,fill:.15,rim:.7,ambient:.09,keyPos:[-4,2.8,-1.5]}),Je(9,"Chiaroscuro",{key:3.4,fill:.015,rim:.25,ambient:.025,keyColor:16761227,keyPos:[-5,5,2],practicals:.1,spot:5,angle:.38}),Je(10,"Silhouette",{key:0,fill:.01,rim:6.5,ambient:.015,rimPos:[0,3,-5],rimColor:14937343,practicals:0,screens:.1,softbox:0}),Je(11,"Rim light",{key:.45,fill:.12,rim:5,ambient:.08,rimPos:[4,4,-3],rimColor:16760204,practicals:.1}),Je(12,"Hard light",{key:4.3,fill:.1,rim:.1,ambient:.1,keyPos:[-4,5,3],penumbra:0,spot:8,angle:.45}),Je(13,"Soft light",{key:2.4,fill:1.6,rim:.8,ambient:.65,keyPos:[0,5,4],penumbra:1,softbox:1.2}),Je(14,"Bounce light",{key:1,fill:2.5,rim:.2,ambient:.55,keyPos:[-3,1,-1],fillPos:[1,-2,4],fillColor:16765866}),Je(15,"Top light",{key:3.8,fill:.08,rim:.2,ambient:.08,keyPos:[0,8,-.5],practicals:.1,spot:4,spotPos:[0,3.2,-.7],spotTarget:[0,0,-.7]}),Je(16,"Underlight",{key:3.2,fill:.08,rim:.35,ambient:.04,keyPos:[0,-4,3],keyColor:12178927,practicals:0}),Je(17,"Golden hour",{key:3.5,fill:.5,rim:1.3,ambient:.25,keyPos:[-6,1.2,2],keyColor:16754266,fillColor:12899565,rimColor:16764545}),Je(18,"Blue hour",{key:1.8,fill:.65,rim:.7,ambient:.2,keyColor:7184095,fillColor:9745133,rimColor:11847679,practicals:.9}),Je(19,"Day for night",{key:1.1,fill:.16,rim:.8,ambient:.07,keyColor:8696031,fillColor:5532557,rimColor:7445466,keyPos:[-3,7,4],practicals:.15}),Je(20,"Moonlight",{key:2,fill:.1,rim:1.2,ambient:.07,keyColor:11916799,keyPos:[4,6,-3],rimColor:5931477,practicals:.2}),Je(21,"Window light",{key:3.1,fill:.4,rim:.25,ambient:.2,keyPos:[-5,3,2],keyColor:16049874,gobo:1}),Je(22,"Practical light",{key:.2,fill:.1,rim:.25,ambient:.08,practicals:2.6,screens:.8,softbox:1.2,keyColor:16761229}),Je(23,"Firelight",{key:1.3,fill:.05,rim:.8,ambient:.055,keyPos:[-2,.3,3],keyColor:16747831,rimColor:15166764,practicals:1.5,motion:1}),Je(24,"Venetian blinds",{key:3.5,fill:.12,rim:.4,ambient:.09,keyPos:[-4,3,3],gobo:2}),Je(25,"Dappled light",{key:3.4,fill:.45,rim:.5,ambient:.18,keyColor:16178082,keyPos:[-3,6,1],gobo:3,motion:2}),Je(26,"Volumetric light",{key:.6,fill:.1,rim:1.4,ambient:.08,spot:18,angle:.32,penumbra:.65,spotPos:[-1.6,3.2,1.1],spotTarget:[.7,.1,-1.6],volume:1,practicals:.25}),Je(27,"Flat light",{key:1.8,fill:1.8,rim:.15,ambient:1,keyPos:[0,2,6],fillPos:[0,2,-6],keyColor:16777215,fillColor:16777215,practicals:.1}),Je(28,"Neon light",{key:2.4,fill:1.8,rim:2.1,ambient:.08,keyColor:15091409,fillColor:3787231,rimColor:9794291,keyPos:[-4,2,1],fillPos:[4,2,-1],practicals:.2,screens:1.7}),Je(29,"Teal and orange",{key:3,fill:1.5,rim:1.5,ambient:.12,keyColor:16750675,fillColor:3783359,rimColor:6937819,keyPos:[-4,4,3]}),Je(30,"Monochrome red",{key:3.2,fill:.7,rim:1.4,ambient:.08,keyColor:16724005,fillColor:11015189,rimColor:16732731,practicals:.05,screens:.4}),Je(31,"Screen glow",{key:.08,fill:.03,rim:.12,ambient:.025,practicals:0,softbox:0,screens:4,keyColor:10080255}),Je(32,"Passing light",{key:2.8,fill:.15,rim:.3,ambient:.1,keyPos:[-6,2,2],keyColor:16767410,motion:3}),Je(33,"Strobe light",{key:3.4,fill:.18,rim:.5,ambient:.1,keyColor:15200767,motion:4,practicals:.15}),Je(34,"Theatrical light",{key:.6,fill:.1,rim:2,ambient:.045,keyColor:15380857,rimColor:9074157,spot:24,spotColor:16767664,spotPos:[3,4,3],spotTarget:[.8,.6,.3],angle:.3,penumbra:.2,volume:.35})];var $_=[["lamps","Lampade"],["shelf","Libreria"],["softbox","Softbox"],["ceiling","Soffitto"],["screens","Monitor"],["tv","TV"]];function sb(a){return a==="TV_55"?{group:"tv",kind:2}:/DISPLAY|ULTRAWIDE|MONITOR/.test(a)&&!/^PARETE/.test(a)?{group:"screens",kind:2}:a==="SOFTBOX1"?{group:"softbox",kind:4}:a==="LUCI_SOFFITTO"?{group:"ceiling",kind:3}:/^LAMPADA_/.test(a)?{group:"lamps",kind:a==="LAMPADA_SALE"?3:1}:null}var kl=class{constructor(e,t,n,i){this.scene=e,this.renderer=t,this.u=i,this.bindings=[],this.sources=[],this.emitters=[],this.groups=Object.fromEntries($_.map(([c])=>[c,{target:1,value:1}])),this.selected=13,this.target=Fs[12],this.rig=structuredClone(this.target),this.age=9,this.shadowAge=0,this.hemi=new xr(13687268,3155743,.45),e.add(this.hemi),this.key=new Si(16769728,2.4),this.fill=new Si(12111079,1.6),this.rim=new Si(16756343,.8),e.add(this.key,this.fill,this.rim),this.key.castShadow=!0,this.key.shadow.mapSize.setScalar(n?1024:2048),Object.assign(this.key.shadow.camera,{left:-4.5,right:4.5,top:4,bottom:-4,near:.1,far:22}),this.key.shadow.bias=-3e-4,this.key.shadow.normalBias=.016,this.key.shadow.radius=3,this.spot=new xa(16770757,0,10,.55,.8,2),e.add(this.spot,this.spot.target);let s=(c,l,d,h,u)=>{let f=new va(u,d,h,2);f.position.set(...l),e.add(f),this.sources.push({group:c,light:f,power:d})};s("lamps",[2.055,.91,1.39],3,3,16760198),s("lamps",[-1.76,1.5,-.09],1.4,2.5,16760456),s("shelf",[-1.63,1.15,-.62],.9,1.7,16762255),s("softbox",[-1.05,1.66,-.84],3.5,3.1,16770505),s("screens",[.32,1.4,-2.55],1.8,3.2,9681663);let r=new hr(.9,3,32,1,!0);r.translate(0,-1.5,0);let o=new Lt({uniforms:{uColor:{value:new Me(16768949)},uPower:{value:0}},vertexShader:"varying vec3 vP,vN;void main(){vP=(modelMatrix*vec4(position,1.)).xyz;vN=normalize(mat3(modelMatrix)*normal);gl_Position=projectionMatrix*viewMatrix*vec4(vP,1.);}",fragmentShader:"uniform vec3 uColor;uniform float uPower;varying vec3 vP,vN;void main(){float side=pow(abs(dot(normalize(vN),normalize(cameraPosition-vP))),1.5);float ground=smoothstep(0.,.35,vP.y);gl_FragColor=vec4(uColor,uPower*.075*side*ground);}",transparent:!0,depthWrite:!1,side:Nt,blending:Er});this.beam=new tt(r,o),this.beam.name="VOLUMETRIC_LIGHT",this.beam.visible=!1,e.add(this.beam),this.tint=new Me,this.temporary=new Me,this.beamDirection=new C,this.down=new C(0,-1,0)}createEmitters(){}bind(e,t){t&&(e.userData.lightGroup=t.group,this.bindings.push({material:e.material,...t})),e.name==="SHELF"&&(e.userData.lightGroup="shelf")}toggle(e){this.groups[e]&&(this.groups[e].target=1-this.groups[e].target)}choose(e){let t=Fs.find(n=>n.id===e);t&&(this.target=t,this.selected=e,this.age=0,this.u.uGobo.value=t.gobo)}update(e,t,n=!1,i=0){this.age+=e,this.shadowAge+=e;let s=n?100:3.8;for(let d of["key","fill","rim","ambient","practicals","screens","softbox","spot","angle","penumbra","volume"])this.rig[d]=yn(this.rig[d],this.target[d],s,e);for(let d of["keyPos","fillPos","rimPos","spotPos","spotTarget"])for(let h=0;h<3;h++)this.rig[d][h]=yn(this.rig[d][h],this.target[d][h],s,e);for(let d of Object.values(this.groups))d.value=yn(d.value,d.target,s,e);let r=1,o=n?0:this.target.motion;o===1&&(r=.83+.1*Math.sin(i*5.3)+.07*Math.sin(i*9.7)),o===4&&(r=.28+.72*Math.exp(-Math.pow(Math.sin(i*Math.PI/2.8)*5,2)));for(let d of["key","fill","rim"]){let h=this[d];h.intensity=this.rig[d]*(d==="key"?r:1),h.color.lerp(this.temporary.set(this.target[d+"Color"]),1-Math.exp(-s*e)),h.position.set(...this.rig[d+"Pos"])}o===3&&(this.key.position.x+=Math.sin(i*.42)*4.8),this.hemi.intensity=this.rig.ambient,this.hemi.color.copy(this.fill.color).lerp(this.temporary.set(16777215),.5),this.spot.intensity=this.rig.spot,this.spot.color.lerp(this.temporary.set(this.target.spotColor),1-Math.exp(-s*e)),this.spot.position.set(...this.rig.spotPos),this.spot.target.position.set(...this.rig.spotTarget),this.spot.angle=this.rig.angle,this.spot.penumbra=this.rig.penumbra;for(let d of this.bindings){let h=d.kind===2?this.rig.screens:d.group==="softbox"?this.rig.softbox:d.group==="ceiling"?this.rig.practicals*t*.6:this.rig.practicals;d.material.userData.local.uFixture.value=this.groups[d.group].value*h}for(let d of this.sources){let h=d.group==="screens"?this.rig.screens:d.group==="softbox"?this.rig.softbox:this.rig.practicals;d.light.intensity=d.power*h*this.groups[d.group].value*(d.group==="lamps"?r:1),d.group==="screens"&&d.light.color.copy(this.u.uAccent.value).lerp(this.temporary.set(10865407),.55)}this.u.uScreenPower.value=this.rig.screens,this.u.uGoboTime.value=i,this.u.uGoboMix.value=yn(this.u.uGoboMix.value,this.target.gobo?1:0,s,e),this.u.uRigEnergy.value=Math.min(1.7,.23+(this.rig.key+this.rig.fill+this.rig.rim)*.2+this.rig.practicals*.12)*r,this.tint.copy(this.key.color).multiplyScalar(this.rig.key).add(this.temporary.copy(this.fill.color).multiplyScalar(this.rig.fill)).add(this.temporary.copy(this.rim.color).multiplyScalar(this.rig.rim));let c=Math.max(this.tint.r,this.tint.g,this.tint.b,.001);this.u.uRigTint.value.copy(this.tint).multiplyScalar(1/c),this.u.uKeyDir.value.copy(this.key.position).normalize(),this.beam.visible=this.rig.volume>.005,this.beam.material.uniforms.uPower.value=this.rig.volume,this.beam.material.uniforms.uColor.value.copy(this.spot.color),this.beam.position.copy(this.spot.position),this.beamDirection.copy(this.spot.target.position).sub(this.spot.position).normalize(),this.beam.quaternion.setFromUnitVectors(this.down,this.beamDirection);let l=this.age<2||o===3;this.shadowAge>.12&&l&&(this.renderer.shadowMap.needsUpdate=!0,this.shadowAge=0)}};var eM={uniforms:{inverseProjection:{value:new he},tDiffuse:{value:null},tDepth:{value:null},resolution:{value:new be(1,1)},focusDistance:{value:2},focusRange:{value:.12},amount:{value:0},nearClip:{value:.025},farClip:{value:90},maxRadius:{value:14}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`
 #include <packing>
 varying vec2 vUv;uniform mat4 inverseProjection;uniform sampler2D tDiffuse,tDepth;uniform vec2 resolution;uniform float focusDistance,focusRange,amount,nearClip,farClip,maxRadius;
 float depthAt(vec2 uv){vec4 p=inverseProjection*vec4(uv*2.-1.,textureLod(tDepth,uv,0.).r*2.-1.,1.);return -p.z/p.w;}
 float coc(float z){return min(maxRadius,max(0.,abs(z-focusDistance)-focusRange)/max(z,.1)*maxRadius*2.8)*amount;}
 void main(){float depth=depthAt(vUv);float radius=coc(depth);vec4 center=textureLod(tDiffuse,vUv,0.);if(radius<.3){gl_FragColor=center;return;}vec3 color=center.rgb;float total=1.;
 for(int i=0;i<18;i++){float f=float(i)+.5;float a=f*2.39996323;vec2 off=vec2(cos(a),sin(a))*sqrt(f/18.)*radius/resolution;vec2 uv=clamp(vUv+off,vec2(.001),vec2(.999));float other=depthAt(uv);float weight=other<depth-.15&&coc(other)<radius*.35?.06:1.;color+=textureLod(tDiffuse,uv,0.).rgb*weight;total+=weight;}
 gl_FragColor=vec4(color/total,center.a);}`},Fl=class extends Xi{constructor(){super(eM),this.enabled=!1}render(e,t,n,i,s){this.uniforms.tDepth.value=n.depthTexture,super.render(e,t,n,i,s)}};async function rb(a,e,t,n){async function i(E){let R=await fetch(E);if(!R.ok)throw new Error("Surface asset unavailable");let M=await R.arrayBuffer();return new Float32Array(await new Response(new Blob([M]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer())}let[s,r]=await Promise.all([i("./assets/surface-v4.bin.gz"),i(`./assets/voxels-v4-${t?"mobile":"desktop"}.bin.gz`)]),o=t?2:1,c=Math.floor(s.length/8/o),l=new Float32Array(c*3),d=new Float32Array(c);for(let E=0;E<c;E++){let R=E*o*8;l.set(s.subarray(R,R+3),E*3),d[E]=s[R+6]}let h=new St;h.setAttribute("position",new Ke(l,3)),h.setAttribute("aSeed",new Ke(d,1));let u=new Lt({uniforms:e,transparent:!0,depthWrite:!0,vertexShader:"uniform float uA,uB,uPointScale,uPerspective,uProjectionDistance;attribute float aSeed;varying vec3 vP;varying float vSeed;void main(){vP=(modelMatrix*vec4(position,1.)).xyz;vSeed=aSeed;vec4 mv=viewMatrix*vec4(vP,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(uA*uPointScale/max(.3,mix(uProjectionDistance,-mv.z,uPerspective)),1.,8.);}",fragmentShader:"uniform float uB,uC,uRigEnergy;uniform vec3 uRigTint;varying vec3 vP;varying float vSeed;void main(){if(vSeed>uB)discard;float d=length(gl_PointCoord-.5)*2.;if(d>1.)discard;vec3 split=mix(vec3(.04,.3,.9),vec3(1.,.4,.06),smoothstep(-.7,.6,vP.x));vec3 col=mix(vec3(.32),split,uC)*1.3*mix(vec3(1.),uRigTint,.35)*clamp(uRigEnergy,.45,1.5);gl_FragColor=vec4(col,(1.-smoothstep(.45,1.,d))*.85);}"}),f=new ba(h,u);f.frustumCulled=!1,f.visible=!1,a.add(f);let g=(await fetch("./assets/studio-v4-info.json").then(E=>E.json())).objects.filter(E=>E.name==="TV_55"||/^(DISPLAY_27|ULTRAWIDE)_/.test(E.name)),m=[];for(let E=0;E<r.length;E+=8){let R=r.subarray(E,E+3);g.some(M=>R.every((w,I)=>w>M.min[I]-.09&&w<M.max[I]+.09))||m.push(...R)}let p=t?.09:.065,v=new Vi(p,p,p).toNonIndexed(),y=new yr().copy(v),x=new Float32Array(v.attributes.position.count*3);for(let E=0;E<v.attributes.position.count;E++)x[E*3+E%3]=1;y.setAttribute("aBary",new Ke(x,3)),y.instanceCount=m.length/3;let _=new Float32Array(m);y.setAttribute("aOffset",new Qn(_,3));let S=new tt(y,n.create("FURNITURE",{voxel:!0}));return S.frustumCulled=!1,S.visible=!1,a.add(S),e.uCell.value=p,{points:f,voxel:S,update(){f.visible=e.uMode.value===14,S.visible=e.uMode.value===3},resize(E,R){e.uPointScale.value=E*R*.019}}}var Ls=class{constructor(e,{current:t=null,random:n=Math.random}={}){if(this.values=[...e],this.random=n,this.last=t,this.bag=[],!this.values.length||new Set(this.values).size!==this.values.length)throw new Error("A slot requires unique values")}next(){if(!this.bag.length){this.bag=[...this.values];for(let e=this.bag.length-1;e>0;e--){let t=Math.floor(this.random()*(e+1));[this.bag[e],this.bag[t]]=[this.bag[t],this.bag[e]]}if(this.bag.length>1&&this.bag.at(-1)===this.last){let e=Math.floor(this.random()*(this.bag.length-1));[this.bag[e],this.bag[this.bag.length-1]]=[this.bag.at(-1),this.bag[e]]}}return this.last=this.bag.pop(),this.last}};function Mu(a){let e=new Float32Array(a.count*a.itemSize);for(let t=0;t<a.count;t++)for(let n=0;n<a.itemSize;n++)e[t*a.itemSize+n]=a.getComponent(t,n);return new Ke(e,a.itemSize)}function ob(a,e,t){a.updateMatrixWorld(!0);let n=new un;n.name="MEMENTO_STUDIO";let i=[],s=[],r=null,o=[];if(a.traverse(c=>{if(!c.isMesh)return;let l=c.geometry.clone();if(l.setAttribute("position",Mu(l.attributes.position)),l.setAttribute("normal",Mu(l.attributes.normal)),l.applyMatrix4(c.matrixWorld),c.material.normalMap&&l.attributes.uv){let x=Mu(l.attributes.uv);for(let _=0;_<x.count;_++)x.setY(_,1-x.getY(_));l.setAttribute("uv",x)}l.index&&(l=l.toNonIndexed());let d=l.attributes.position,h=new Float32Array(d.count*3),u=new Float32Array(d.count*3);for(let x=0;x<d.count;x+=3){let _=new C;for(let S=0;S<3;S++)_.add(new C().fromBufferAttribute(d,x+S));_.multiplyScalar(1/3);for(let S=0;S<3;S++)h.set(_.toArray(),(x+S)*3),u[(x+S)*3+S]=1}l.setAttribute("aShardCenter",new Ke(h,3)),l.setAttribute("aBary",new Ke(u,3)),l.computeBoundingBox(),l.computeBoundingSphere();let f=l.boundingBox.clone(),b=c.userData.zone==="BACKFACE_REVEAL",g=c.userData.logicalName||c.name,m=sb(g),p=c.userData.category||c.material.name.replace("MEMENTO_","").split("__")[0],v=e.create(p,{shell:b,fixtureKind:m?.kind||0,bounds:f,screenBase:g==="TV_55"?.025:g.includes("ULTRAWIDE")?.24:.025,screenSeed:tb(g),normalMap:c.material.normalMap,graphiteAlbedo:c.material.userData.graphiteAlbedo}),y=new tt(l,v);y.name=c.userData.name||c.name,y.userData={...c.userData},y.castShadow=!b,y.receiveShadow=!0,b&&(s.push(y),y.renderOrder=1),g==="DYSON"&&o.push(y),t?.bind(y,m),i.push(y),n.add(y)}),o.length){let c=new Xe;o.forEach(d=>c.expandByObject(d));let l=c.getCenter(new C);l.y=c.min.y,r=new un,r.name="DYSON_PIVOT",r.position.copy(l);for(let d of o)d.position.sub(l),r.add(d);n.add(r)}return{root:n,meshes:i,shell:s,dyson:r}}var tM={camera:"M3 7h4l2-3h6l2 3h4v13H3Z M16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0",light:"M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5 M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0",magic:"m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z M21 2v4m-2-2h4",exit:"m15 4-8 8 8 8M7 12h14",close:"m6 6 12 12M6 18 18 6",pause:"M9 5v14M15 5v14",play:"m8 5 11 7-11 7Z",retry:"M20 8a8 8 0 1 0 0 8M20 3v5h-5"},Qr=a=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${tM[a]}"/></svg>`;function cb(a){let e=n=>document.getElementById(n),t=e("status");for(let[n,i,s]of[["views-toggle","camera","camera"],["lights","light","lighting"],["shaders","magic","shader"]]){let r=e(n);r.innerHTML=Qr(i),r.addEventListener("click",()=>{let o=a[s]();o&&(s==="lighting"&&r.setAttribute("aria-busy","true"),r.dataset.result=o.key||String(o.id),r.setAttribute("aria-description",o.name),t.textContent=o.name,r.getAnimations().forEach(c=>c.cancel()),matchMedia("(prefers-reduced-motion: reduce)").matches||(r.animate([{transform:"translateY(0)"},{transform:"translateY(2px)",background:"#ff7950aa",offset:.2},{transform:"translateY(-2px)",offset:.65},{transform:"translateY(0)"}],{duration:420,easing:"cubic-bezier(.2,.7,.2,1)"}),r.querySelector("svg").animate([{transform:"translateY(0)",opacity:1},{transform:"translateY(-12px)",opacity:0,offset:.25},{transform:"translateY(12px) scale(.85)",opacity:0,offset:.45},{transform:"translateY(0)",opacity:1}],{duration:420})))})}return e("exit").innerHTML=Qr("exit"),e("exit").onclick=()=>a.exit(),e("motion").onclick=()=>a.motion(),e("focus-close").innerHTML=Qr("close"),e("focus-close").onclick=()=>a.unfocus(),e("retry").innerHTML=Qr("retry"),e("retry").onclick=()=>location.reload(),document.addEventListener("keydown",n=>{n.code==="Escape"&&a.escape()}),{progress(n){e("load-bar").style.transform=`scaleX(${Math.max(0,Math.min(1,n))})`},ready(){this.progress(1),e("controls").hidden=!1,document.body.classList.add("ready");for(let n of["views-toggle","lights","shaders"])e(n).disabled=!1},error(n){e("error").hidden=!1,e("loading").hidden=!0,t.textContent=n,e("error").setAttribute("aria-label",n)},navigation(n){e("exit").hidden=n.state==="exterior",document.body.classList.toggle("inside",n.state!=="exterior"),e("views-toggle").setAttribute("aria-busy",String(!!n.transition))},focus(n){document.body.classList.toggle("focused",!!n),e("focus-close").hidden=!n},shader(n){e("shaders").dataset.requested=String(n),e("shaders").setAttribute("aria-busy","true")},rendered(n,i,s){e("shaders").dataset.active!==String(n)&&(e("shaders").dataset.active=String(n));let r=String(i);e("shaders").getAttribute("aria-busy")!==r&&e("shaders").setAttribute("aria-busy",r);let o=String(!s);e("lights").getAttribute("aria-busy")!==o&&e("lights").setAttribute("aria-busy",o)},motion(n){document.body.classList.toggle("paused",n),e("motion").setAttribute("aria-pressed",String(n)),e("motion").setAttribute("aria-label",n?"Riprendi le animazioni":"Metti in pausa le animazioni"),e("motion").innerHTML=Qr(n?"play":"pause")},announce(n){t.textContent=n}}}var Qt=document.getElementById("scene"),mb=document.documentElement.dataset.mementoNative==="studio",lb=!0,nM=matchMedia("(pointer:coarse)").matches,Qi=nM||innerWidth<700,ka=matchMedia("(prefers-reduced-motion: reduce)"),ea=ka.matches,Ns=!1,Ie,Di,$i,Dn,Iu,$t,Zi,Wn,Hn,Ru,Ll=0,$r=0,wu=0,Su=16,Eu=0,Au=0,hb=0,db=!1,Gn=Math.min(devicePixelRatio||1,Qi?1.25:1.65),li=ab(),bb=new be(2,2),Tu=new wr,iM=new Ls(Jr.map(a=>a.id),{current:10}),aM=new Ls(Fs.map(a=>a.id),{current:13}),sM=new Ls(ci.map((a,e)=>e),{current:0}),Nl=!1,ub=null,Da=!1,eo=null,en=cb({camera:()=>{if(!Ie)return;let a=sM.next();return Ie.go(a),ci[a]},lighting:()=>{if(!Di)return;let a=aM.next();return Di.choose(a),Fs.find(e=>e.id===a)},shader:()=>{if(!$i)return;let a=iM.next();return $i.choose(a),en.shader(a),ks[a]},motion:()=>{ea=!ea,en.motion(ea)},unfocus:()=>Ie?.clearFocus(),exit:()=>Ie?.exit(),escape:()=>{Ie?.focus?Ie.clearFocus():Ie&&Ie.state!=="exterior"&&Ie.exit()}});en.motion(ea);ka.addEventListener("change",()=>{ea=ka.matches,en.motion(ea)});async function rM(){let e="./assets/studio-v4-"+(Qi?"mobile":"desktop")+".glb"+(typeof DecompressionStream>"u"?"":".gz"),t=document.getElementById("studio-model")?.href||e,n=t.endsWith(".gz"),i=await fetch(t);if(!i.ok)throw new Error("Asset HTTP "+i.status);let s=Number(i.headers.get("content-length"))||(Qi?5233250:6096729),r;if(i.body){let l=[],d=0,h=i.body.getReader();for(;;){let{done:f,value:b}=await h.read();if(f)break;l.push(b),d+=b.length,en.progress(Math.min(.72,d/s*.72))}r=new Uint8Array(d);let u=0;for(let f of l)r.set(f,u),u+=f.length}else r=new Uint8Array(await i.arrayBuffer());let o=n?await new Response(new Blob([r]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer():r.buffer;return en.progress(.76),await Jd.ready,new el().setMeshoptDecoder(Jd).parseAsync(o,"")}function Pu(){if(!$t)return;let a=innerWidth,e=innerHeight;$t.setPixelRatio(Gn),$t.setSize(a,e,!1),Zi.setPixelRatio(Gn),Zi.setSize(a,e),Wn.aspect=a/e,Wn.updateProjectionMatrix(),Ie&&(Ie.frameFactor=$m(Wn.aspect)),Hn.uniforms.resolution.value.set(a*Gn,e*Gn),Hn.uniforms.maxRadius.value=Qi?10:15,Ru.uniforms.uDpr.value=Gn,Iu?.resize(e,Gn)}function Ul(a){let e=Qt.getBoundingClientRect();bb.set((a.clientX-e.left)/e.width*2-1,-(a.clientY-e.top)/e.height*2+1),Nl=!0}function Du(){return!Dn||!Ie?null:(Wn.updateMatrixWorld(),Dn.root.updateMatrixWorld(!0),Qm(Tu,bb,Wn),Tu.firstHitOnly=!0,Tu.intersectObjects([...Dn.meshes.filter(a=>a.material.visible&&(!a.userData.zone?.includes("BACKFACE")||Ie.shell>.5)),...Di.emitters.map(a=>a.mesh)],!1)[0]||null)}function fb(a){if(!Ns)return;clearTimeout(eo),Ul(a);let e=Du();if(e){if(e.object.name.startsWith("EMITTER_"))return;Ie.focusObject(e.object,e.point)}}function pb(a){Ul(a);let e=Du();e?.object.userData.lightGroup&&Di.toggle(e.object.userData.lightGroup)}function oM(){let a=new Map,e=null,t=null,n=0,i={at:0,x:0,y:0};Qt.addEventListener("pointerdown",h=>{if(Ns&&(Qt.focus({preventScroll:!0}),Qt.setPointerCapture(h.pointerId),a.set(h.pointerId,{x:h.clientX,y:h.clientY}),e={x:h.clientX,y:h.clientY},t=e,Da=!1,Ul(h),Qt.classList.add("dragging"),a.size===2)){let u=[...a.values()];n=Math.hypot(u[0].x-u[1].x,u[0].y-u[1].y)}}),Qt.addEventListener("pointermove",h=>{if(Ul(h),!a.has(h.pointerId))return;if(a.set(h.pointerId,{x:h.clientX,y:h.clientY}),a.size===2){let b=[...a.values()],g=Math.hypot(b[0].x-b[1].x,b[0].y-b[1].y);Ie.zoom((n-g)*5),n=g,Da=!0;return}if(!t)return;let u=h.clientX-t.x,f=h.clientY-t.y;Math.hypot(h.clientX-e.x,h.clientY-e.y)>4&&(Da=!0),Da&&Ie.drag(u,f),t={x:h.clientX,y:h.clientY}});let s=h=>{if(a.delete(h.pointerId),Qt.classList.remove("dragging"),!Da&&h.type==="pointerup")if(h.pointerType==="touch"){let u=performance.now();u-i.at<320&&Math.hypot(h.clientX-i.x,h.clientY-i.y)<28?(fb(h),i.at=0):(clearTimeout(eo),eo=setTimeout(()=>pb(h),330),i={at:u,x:h.clientX,y:h.clientY})}else h.detail<2&&(clearTimeout(eo),eo=setTimeout(()=>pb(h),260));t=a.size?[...a.values()][0]:null,e=t,a.size||(Da=!1),h.pointerType==="touch"&&(Nl=!1)};Qt.addEventListener("pointerup",s),Qt.addEventListener("pointercancel",s),Qt.addEventListener("dblclick",fb),Qt.addEventListener("pointerleave",()=>{a.size||(Nl=!1)}),Qt.addEventListener("wheel",h=>{h.preventDefault(),Ie?.zoom(h.deltaY)},{passive:!1});let r=["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ShiftLeft"];document.addEventListener("keydown",h=>{if(!(!Ie||!r.includes(h.code)||document.activeElement!==Qt)){if(h.preventDefault(),Ie.state==="exterior"){Ie.go(1);return}Ie.focus&&Ie.clearFocus(!1),Ie.transition&&Ie.cancelTransition(),Ie.keys.add(h.code)}}),document.addEventListener("keyup",h=>Ie?.keys.delete(h.code)),window.addEventListener("blur",()=>{Ie?.keys.clear(),Ie?.touchMove.set(0,0)});let o=document.getElementById("stick"),c=document.getElementById("stick-knob"),l=null,d=h=>{let u=o.getBoundingClientRect(),f=h.clientX-u.left-u.width/2,b=h.clientY-u.top-u.height/2,g=Math.max(1,Math.hypot(f,b)/27);Ie.touchMove.set(f/g/27,b/g/27),c.style.transform=`translate(${f/g}px,${b/g}px)`};o.addEventListener("pointerdown",h=>{Ie&&(h.stopPropagation(),o.setPointerCapture(h.pointerId),l=h.pointerId,Ie.transition&&Ie.cancelTransition(),Ie.clearFocus(!1),d(h))}),o.addEventListener("pointermove",h=>{h.pointerId===l&&d(h)});for(let h of["pointerup","pointercancel"])o.addEventListener(h,()=>{l=null,Ie?.touchMove.set(0,0),c.style.transform=""});document.addEventListener("visibilitychange",()=>{$r=0,document.hidden&&(Ie?.keys.clear(),Ie?.touchMove.set(0,0))})}function cM(){let a=0,e=n=>{let i=0;for(;a<Dn.meshes.length&&(i<2||n.timeRemaining()>5);){let s=Dn.meshes[a++];s.geometry.boundsTree=new Kr(s.geometry,{maxLeafTris:12}),s.raycast=Wm,i++}a<Dn.meshes.length&&t(e)},t=n=>window.requestIdleCallback?requestIdleCallback(n,{timeout:500}):setTimeout(()=>n({timeRemaining:()=>0}),20);t(e)}var Cu=0;function to(){!Cu&&Ns&&!document.hidden&&!document.documentElement.hasAttribute("data-mm-phase")&&(Cu=requestAnimationFrame(lM))}document.addEventListener("visibilitychange",to);document.addEventListener("memento:surface-visibility",to);window.addEventListener("pageshow",to);function lM(a){if(Cu=0,document.hidden||!Ns||document.documentElement.hasAttribute("data-mm-phase")){$r=0;return}to();let e=$r?(a-$r)/1e3:1/60;$r=a;let t=Math.min(e,.05);ea||(Ll+=e),li.uTime.value=Ll,wu+=e,li.uReveal.value=mb||ka.matches?1:Yr(Math.min(1,wu/2.3)),Ie.update(t,ka.matches,e),li.uPerspective.value=Ie.perspective,li.uProjectionDistance.value=Wn.userData.projectionDistance,li.uShell.value=Ie.shell,$i.update(e,ka.matches),Di.update(e,Ie.shell,ka.matches,Ll),Iu?.update(),en.rendered(li.uMode.value,$i.progress<1,Di.age>2),Dn.dyson&&!ea&&(Dn.dyson.rotation.y=Jm(Ll));let n=Ie.shell>.97;if(n!==db){db=n;for(let i of Dn.shell)i.castShadow=n&&i.name!=="LUCI_SOFFITTO";$t.shadowMap.needsUpdate=!0}a-hb>90&&(hb=a,ub=(Nl&&!Da&&!Ie.transition?Du():null)?.object||null,Qt.classList.toggle("light-hover",!!ub?.userData.lightGroup)),Hn.uniforms.inverseProjection.value.copy(Wn.projectionMatrixInverse),Hn.enabled=Ie.focusAmount>.005,Hn.uniforms.amount.value=Ie.focusAmount,Hn.uniforms.focusDistance.value=Ie.focusDistance,Hn.uniforms.focusRange.value=Ie.focusRange,Zi.render(t),lb&&(lb=!1,en.ready()),wu>5&&(Su=Su*.9+Math.min(e,.5)*1e3*.1,Au+=e,Eu++,Au>3&&Eu>5&&(Su>36&&Gn>1&&(Gn=Math.max(1,Gn-.15),Pu()),Au=0,Eu=0))}async function hM(){try{$t=new Qc({canvas:Qt,antialias:!1,powerPreference:"high-performance",alpha:!0})}catch(a){console.error(a),en.error("La grafica 3D non \xE8 disponibile in questo browser. Attiva l\u2019accelerazione hardware o apri la pagina in un browser compatibile.");return}try{let a=$t.getContext(),e=a.getExtension("WEBGL_debug_renderer_info"),t=e&&/swiftshader|llvmpipe|softpipe|software|basic render|\bwarp\b/i.test(a.getParameter(e.UNMASKED_RENDERER_WEBGL));t&&(Gn=Math.min(Gn,.75)),$t.setClearColor(0,0),$t.outputColorSpace=wt,$t.toneMapping=lc,$t.shadowMap.enabled=!0,$t.shadowMap.type=tc,$t.shadowMap.autoUpdate=!1,$t.shadowMap.needsUpdate=!0;let n=new nr;Wn=new Tt(35,innerWidth/innerHeight,.025,90);let i=new pn(1,1,{type:ai,depthBuffer:!0,samples:t?0:Qi?2:4});i.depthTexture=new Hi(1,1,Cn),Zi=new al($t,i),Zi.renderTarget2.depthTexture=new Hi(1,1,Cn),Zi.addPass(new sl(n,Wn)),Hn=new Fl,Hn.material.depthWrite=!1,Hn.material.depthTest=!1,Zi.addPass(Hn),Ru=new rl(li),Zi.addPass(Ru),$i=new Dl(li),Di=new kl(n,$t,Qi,li);let s=rb(n,li,Qi,$i),[r,o]=await Promise.all([rM(),fetch("./assets/navigation-grid.json").then(c=>{if(!c.ok)throw new Error("Navigation unavailable");return c.json()})]);Dn=ob(r.scene,$i,Di),n.add(Dn.root),en.progress(.86),Iu=await s,Ie=new Pl(Wn,new Il(o),{onChange:c=>en.navigation(c),onFocus:c=>en.focus(c)}),Pu(),Ie.update(.016),oM(),Di.update(1,0,!0,0),$i.update(.016),await $t.compileAsync(n,Wn),en.progress(.97),Ns=!0,en.navigation(Ie),to(),cM(),Qt.addEventListener("webglcontextlost",c=>{c.preventDefault(),Ns=!1,en.error("La sessione 3D \xE8 stata interrotta. Ricarica lo studio per riprendere.")}),console.info("Memento Studio Slots ready",{objects:Dn.meshes.length,lod:Qi?"mobile":"desktop"})}catch(a){console.error("Studio load:",a),en.error("Lo studio non si \xE8 caricato. Controlla la connessione e riprova.")}}window.addEventListener("resize",Pu);async function dM(){mb&&(await new Promise(a=>requestAnimationFrame(()=>requestAnimationFrame(a))),await window.mementoSceneFinished),hM()}dM();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
