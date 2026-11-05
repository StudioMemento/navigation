var Nf=0,Wh=1,Uf=2;var Xh=1,rc=2,oi=3,$t=0,Ft=1,Ot=2,Xn=0,_i=1,xs=2,qh=3,Kh=4,Bf=5,Wi=100,Of=101,zf=102,jf=103,Vf=104,Gf=200,Hf=201,Wf=202,Xf=203,zo=204,jo=205,qf=206,Kf=207,Jf=208,Yf=209,Zf=210,Qf=211,$f=212,ep=213,tp=214,oc=0,cc=1,lc=2,fa=3,hc=4,dc=5,uc=6,fc=7,pc=0,np=1,ip=2,Pi=0,mc=1,bc=2,gc=3,vs=4,xc=5,vc=6,yc=7,Dh="attached",ap="detached",Jh=300,Sa=301,wa=302,_c=303,Mc=304,Lr=306,Xi=1e3,ei=1001,as=1002,Vt=1003,Sc=1004;var Ta=1005;var sn=1006,ys=1007;var qn=1008;var Kn=1009,Yh=1010,Zh=1011,_s=1012,wc=1013,Nn=1014,gn=1015,en=1016,Tc=1017,Ec=1018,Ms=1020,Qh=35902,$h=35899,ed=1021,td=1022,rn=1023,ss=1026,Ss=1027,Ac=1028,kr=1029,nd=1030,Rc=1031;var Cc=1033,Nr=33776,Ur=33777,Br=33778,Or=33779,Ic=35840,Pc=35841,Dc=35842,Fc=35843,Lc=36196,kc=37492,Nc=37496,Uc=37808,Bc=37809,Oc=37810,zc=37811,jc=37812,Vc=37813,Gc=37814,Hc=37815,Wc=37816,Xc=37817,qc=37818,Kc=37819,Jc=37820,Yc=37821,Zc=36492,Qc=36494,$c=36495,el=36283,tl=36284,nl=36285,il=36286;var pa=2300,ma=2301,Oo=2302,Fh=2400,Lh=2401,kh=2402,sp=2500;var id=0,zr=1,ws=2,rp=3200,op=3201;var al=0,cp=1,Di="",St="srgb",Gt="srgb-linear",ar="linear",$e="srgb";var ua=7680;var Nh=519,lp=512,hp=513,dp=514,ad=515,up=516,fp=517,pp=518,mp=519,Vo=35044;var sd="300 es",Fn=2e3,sr=2001;var Mi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,r=i.length;s<r;s++)i[s].call(this,e);e.target=null}}},Jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ku=1234567,nr=Math.PI/180,ba=180/Math.PI;function Wn(){let a=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Jt[a&255]+Jt[a>>8&255]+Jt[a>>16&255]+Jt[a>>24&255]+"-"+Jt[e&255]+Jt[e>>8&255]+"-"+Jt[e>>16&15|64]+Jt[e>>24&255]+"-"+Jt[t&63|128]+Jt[t>>8&255]+"-"+Jt[t>>16&255]+Jt[t>>24&255]+Jt[n&255]+Jt[n>>8&255]+Jt[n>>16&255]+Jt[n>>24&255]).toLowerCase()}function Fe(a,e,t){return Math.max(e,Math.min(t,a))}function rd(a,e){return(a%e+e)%e}function Rb(a,e,t,n,i){return n+(a-e)*(i-n)/(t-e)}function Cb(a,e,t){return a!==e?(t-a)/(e-a):0}function ir(a,e,t){return(1-t)*a+t*e}function Ib(a,e,t,n){return ir(a,e,1-Math.exp(-t*n))}function Pb(a,e=1){return e-Math.abs(rd(a,e*2)-e)}function Db(a,e,t){return a<=e?0:a>=t?1:(a=(a-e)/(t-e),a*a*(3-2*a))}function Fb(a,e,t){return a<=e?0:a>=t?1:(a=(a-e)/(t-e),a*a*a*(a*(a*6-15)+10))}function Lb(a,e){return a+Math.floor(Math.random()*(e-a+1))}function kb(a,e){return a+Math.random()*(e-a)}function Nb(a){return a*(.5-Math.random())}function Ub(a){a!==void 0&&(Ku=a);let e=Ku+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Bb(a){return a*nr}function Ob(a){return a*ba}function zb(a){return(a&a-1)===0&&a!==0}function jb(a){return Math.pow(2,Math.ceil(Math.log(a)/Math.LN2))}function Vb(a){return Math.pow(2,Math.floor(Math.log(a)/Math.LN2))}function Gb(a,e,t,n,i){let s=Math.cos,r=Math.sin,o=s(t/2),c=r(t/2),l=s((e+n)/2),d=r((e+n)/2),h=s((e-n)/2),u=r((e-n)/2),f=s((n-e)/2),m=r((n-e)/2);switch(i){case"XYX":a.set(o*d,c*h,c*u,o*l);break;case"YZY":a.set(c*u,o*d,c*h,o*l);break;case"ZXZ":a.set(c*h,c*u,o*d,o*l);break;case"XZX":a.set(o*d,c*m,c*f,o*l);break;case"YXY":a.set(c*f,o*d,c*m,o*l);break;case"ZYZ":a.set(c*m,c*f,o*d,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Hn(a,e){switch(e.constructor){case Float32Array:return a;case Uint32Array:return a/4294967295;case Uint16Array:return a/65535;case Uint8Array:return a/255;case Int32Array:return Math.max(a/2147483647,-1);case Int16Array:return Math.max(a/32767,-1);case Int8Array:return Math.max(a/127,-1);default:throw new Error("Invalid component type.")}}function nt(a,e){switch(e.constructor){case Float32Array:return a;case Uint32Array:return Math.round(a*4294967295);case Uint16Array:return Math.round(a*65535);case Uint8Array:return Math.round(a*255);case Int32Array:return Math.round(a*2147483647);case Int16Array:return Math.round(a*32767);case Int8Array:return Math.round(a*127);default:throw new Error("Invalid component type.")}}var et={DEG2RAD:nr,RAD2DEG:ba,generateUUID:Wn,clamp:Fe,euclideanModulo:rd,mapLinear:Rb,inverseLerp:Cb,lerp:ir,damp:Ib,pingpong:Pb,smoothstep:Db,smootherstep:Fb,randInt:Lb,randFloat:kb,randFloatSpread:Nb,seededRandom:Ub,degToRad:Bb,radToDeg:Ob,isPowerOfTwo:zb,ceilPowerOfTwo:jb,floorPowerOfTwo:Vb,setQuaternionFromProperEuler:Gb,normalize:nt,denormalize:Hn},re=class a{constructor(e=0,t=0){a.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Fe(this.x,e.x,t.x),this.y=Fe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Fe(this.x,e,t),this.y=Fe(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Fe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Fe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,r=this.y-e.y;return this.x=s*n-r*i+e.x,this.y=s*i+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},on=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,r,o){let c=n[i+0],l=n[i+1],d=n[i+2],h=n[i+3],u=s[r+0],f=s[r+1],m=s[r+2],g=s[r+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=d,e[t+3]=h;return}if(o===1){e[t+0]=u,e[t+1]=f,e[t+2]=m,e[t+3]=g;return}if(h!==g||c!==u||l!==f||d!==m){let b=1-o,p=c*u+l*f+d*m+h*g,x=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){let _=Math.sqrt(y),w=Math.atan2(_,p*x);b=Math.sin(b*w)/_,o=Math.sin(o*w)/_}let v=o*x;if(c=c*b+u*v,l=l*b+f*v,d=d*b+m*v,h=h*b+g*v,b===1-o){let _=1/Math.sqrt(c*c+l*l+d*d+h*h);c*=_,l*=_,d*=_,h*=_}}e[t]=c,e[t+1]=l,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,r){let o=n[i],c=n[i+1],l=n[i+2],d=n[i+3],h=s[r],u=s[r+1],f=s[r+2],m=s[r+3];return e[t]=o*m+d*h+c*f-l*u,e[t+1]=c*m+d*u+l*h-o*f,e[t+2]=l*m+d*f+o*u-c*h,e[t+3]=d*m-o*h-c*u-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,r=e._order,o=Math.cos,c=Math.sin,l=o(n/2),d=o(i/2),h=o(s/2),u=c(n/2),f=c(i/2),m=c(s/2);switch(r){case"XYZ":this._x=u*d*h+l*f*m,this._y=l*f*h-u*d*m,this._z=l*d*m+u*f*h,this._w=l*d*h-u*f*m;break;case"YXZ":this._x=u*d*h+l*f*m,this._y=l*f*h-u*d*m,this._z=l*d*m-u*f*h,this._w=l*d*h+u*f*m;break;case"ZXY":this._x=u*d*h-l*f*m,this._y=l*f*h+u*d*m,this._z=l*d*m+u*f*h,this._w=l*d*h-u*f*m;break;case"ZYX":this._x=u*d*h-l*f*m,this._y=l*f*h+u*d*m,this._z=l*d*m-u*f*h,this._w=l*d*h+u*f*m;break;case"YZX":this._x=u*d*h+l*f*m,this._y=l*f*h+u*d*m,this._z=l*d*m-u*f*h,this._w=l*d*h-u*f*m;break;case"XZY":this._x=u*d*h-l*f*m,this._y=l*f*h-u*d*m,this._z=l*d*m+u*f*h,this._w=l*d*h+u*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],r=t[1],o=t[5],c=t[9],l=t[2],d=t[6],h=t[10],u=n+o+h;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(d-c)*f,this._y=(s-l)*f,this._z=(r-i)*f}else if(n>o&&n>h){let f=2*Math.sqrt(1+n-o-h);this._w=(d-c)/f,this._x=.25*f,this._y=(i+r)/f,this._z=(s+l)/f}else if(o>h){let f=2*Math.sqrt(1+o-n-h);this._w=(s-l)/f,this._x=(i+r)/f,this._y=.25*f,this._z=(c+d)/f}else{let f=2*Math.sqrt(1+h-n-o);this._w=(r-i)/f,this._x=(s+l)/f,this._y=(c+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Fe(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,r=e._w,o=t._x,c=t._y,l=t._z,d=t._w;return this._x=n*d+r*o+i*l-s*c,this._y=i*d+r*c+s*o-n*l,this._z=s*d+r*l+n*c-i*o,this._w=r*d-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,r=this._w,o=r*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=r,this._x=n,this._y=i,this._z=s,this;let c=1-o*o;if(c<=Number.EPSILON){let f=1-t;return this._w=f*r+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}let l=Math.sqrt(c),d=Math.atan2(l,o),h=Math.sin((1-t)*d)/l,u=Math.sin(t*d)/l;return this._w=r*h+this._w*u,this._x=n*h+this._x*u,this._y=i*h+this._y*u,this._z=s*h+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},C=class a{constructor(e=0,t=0,n=0){a.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ju.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ju.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,r=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,r=e.y,o=e.z,c=e.w,l=2*(r*i-o*n),d=2*(o*t-s*i),h=2*(s*n-r*t);return this.x=t+c*l+r*h-o*d,this.y=n+c*d+o*l-s*h,this.z=i+c*h+s*d-r*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Fe(this.x,e.x,t.x),this.y=Fe(this.y,e.y,t.y),this.z=Fe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Fe(this.x,e,t),this.y=Fe(this.y,e,t),this.z=Fe(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Fe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,r=t.x,o=t.y,c=t.z;return this.x=i*c-s*o,this.y=s*r-n*c,this.z=n*o-i*r,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ql.copy(this).projectOnVector(e),this.sub(Ql)}reflect(e){return this.sub(Ql.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Fe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ql=new C,Ju=new on,Be=class a{constructor(e,t,n,i,s,r,o,c,l){a.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,r,o,c,l)}set(e,t,n,i,s,r,o,c,l){let d=this.elements;return d[0]=e,d[1]=i,d[2]=o,d[3]=t,d[4]=s,d[5]=c,d[6]=n,d[7]=r,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,r=n[0],o=n[3],c=n[6],l=n[1],d=n[4],h=n[7],u=n[2],f=n[5],m=n[8],g=i[0],b=i[3],p=i[6],x=i[1],y=i[4],v=i[7],_=i[2],w=i[5],T=i[8];return s[0]=r*g+o*x+c*_,s[3]=r*b+o*y+c*w,s[6]=r*p+o*v+c*T,s[1]=l*g+d*x+h*_,s[4]=l*b+d*y+h*w,s[7]=l*p+d*v+h*T,s[2]=u*g+f*x+m*_,s[5]=u*b+f*y+m*w,s[8]=u*p+f*v+m*T,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],o=e[5],c=e[6],l=e[7],d=e[8];return t*r*d-t*o*l-n*s*d+n*o*c+i*s*l-i*r*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=d*r-o*l,u=o*c-d*s,f=l*s-r*c,m=t*h+n*u+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/m;return e[0]=h*g,e[1]=(i*l-d*n)*g,e[2]=(o*n-i*r)*g,e[3]=u*g,e[4]=(d*t-i*c)*g,e[5]=(i*s-o*t)*g,e[6]=f*g,e[7]=(n*c-l*t)*g,e[8]=(r*t-n*s)*g,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,r,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*r+l*o)+r+e,-i*l,i*c,-i*(-l*r+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply($l.makeScale(e,t)),this}rotate(e){return this.premultiply($l.makeRotation(-e)),this}translate(e,t){return this.premultiply($l.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},$l=new Be;function od(a){for(let e=a.length-1;e>=0;--e)if(a[e]>=65535)return!0;return!1}function rs(a){return document.createElementNS("http://www.w3.org/1999/xhtml",a)}function bp(){let a=rs("canvas");return a.style.display="block",a}var Yu={};function os(a){a in Yu||(Yu[a]=!0,console.warn(a))}function gp(a,e,t){return new Promise(function(n,i){function s(){switch(a.clientWaitSync(e,a.SYNC_FLUSH_COMMANDS_BIT,0)){case a.WAIT_FAILED:i();break;case a.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}var Zu=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qu=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Hb(){let a={enabled:!0,workingColorSpace:Gt,spaces:{},convert:function(i,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===$e&&(i.r=yi(i.r),i.g=yi(i.g),i.b=yi(i.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===$e&&(i.r=is(i.r),i.g=is(i.g),i.b=is(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Di?ar:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,r){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return os("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),a.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return os("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),a.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return a.define({[Gt]:{primaries:e,whitePoint:n,transfer:ar,toXYZ:Zu,fromXYZ:Qu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:St},outputColorSpaceConfig:{drawingBufferColorSpace:St}},[St]:{primaries:e,whitePoint:n,transfer:$e,toXYZ:Zu,fromXYZ:Qu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:St}}}),a}var Ge=Hb();function yi(a){return a<.04045?a*.0773993808:Math.pow(a*.9478672986+.0521327014,2.4)}function is(a){return a<.0031308?a*12.92:1.055*Math.pow(a,.41666)-.055}var ja,Go=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ja===void 0&&(ja=rs("canvas")),ja.width=e.width,ja.height=e.height;let i=ja.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ja}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=rs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let r=0;r<s.length;r++)s[r]=yi(s[r]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(yi(t[n]/255)*255):t[n]=yi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Wb=0,cs=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wb++}),this.uuid=Wn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let r=0,o=i.length;r<o;r++)i[r].isDataTexture?s.push(eh(i[r].image)):s.push(eh(i[r]))}else s=eh(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function eh(a){return typeof HTMLImageElement<"u"&&a instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&a instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&a instanceof ImageBitmap?Go.getDataURL(a):a.data?{data:Array.from(a.data),width:a.width,height:a.height,type:a.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Xb=0,th=new C,Dt=class a extends Mi{constructor(e=a.DEFAULT_IMAGE,t=a.DEFAULT_MAPPING,n=ei,i=ei,s=sn,r=qn,o=rn,c=Kn,l=a.DEFAULT_ANISOTROPY,d=Di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xb++}),this.uuid=Wn(),this.name="",this.source=new cs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=r,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(th).x}get height(){return this.source.getSize(th).y}get depth(){return this.source.getSize(th).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Jh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Xi:e.x=e.x-Math.floor(e.x);break;case ei:e.x=e.x<0?0:1;break;case as:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Xi:e.y=e.y-Math.floor(e.y);break;case ei:e.y=e.y<0?0:1;break;case as:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Dt.DEFAULT_IMAGE=null;Dt.DEFAULT_MAPPING=Jh;Dt.DEFAULT_ANISOTROPY=1;var Xe=class a{constructor(e=0,t=0,n=0,i=1){a.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*t+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*t+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*t+r[7]*n+r[11]*i+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,c=e.elements,l=c[0],d=c[4],h=c[8],u=c[1],f=c[5],m=c[9],g=c[2],b=c[6],p=c[10];if(Math.abs(d-u)<.01&&Math.abs(h-g)<.01&&Math.abs(m-b)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+g)<.1&&Math.abs(m+b)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,v=(f+1)/2,_=(p+1)/2,w=(d+u)/4,T=(h+g)/4,I=(m+b)/4;return y>v&&y>_?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=w/n,s=T/n):v>_?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=w/i,s=I/i):_<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(_),n=T/s,i=I/s),this.set(n,i,s,t),this}let x=Math.sqrt((b-m)*(b-m)+(h-g)*(h-g)+(u-d)*(u-d));return Math.abs(x)<.001&&(x=1),this.x=(b-m)/x,this.y=(h-g)/x,this.z=(u-d)/x,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Fe(this.x,e.x,t.x),this.y=Fe(this.y,e.y,t.y),this.z=Fe(this.z,e.z,t.z),this.w=Fe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Fe(this.x,e,t),this.y=Fe(this.y,e,t),this.z=Fe(this.z,e,t),this.w=Fe(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Fe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ho=class extends Mi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:sn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Xe(0,0,e,t),this.scissorTest=!1,this.viewport=new Xe(0,0,e,t);let i={width:e,height:t,depth:n.depth},s=new Dt(i);this.textures=[];let r=n.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:sn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new cs(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},It=class extends Ho{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},rr=class extends Dt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Wo=class extends Dt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ke=class{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,jn):jn.fromBufferAttribute(s,r),jn.applyMatrix4(e.matrixWorld),this.expandByPoint(jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ho.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ho.copy(n.boundingBox)),ho.applyMatrix4(e.matrixWorld),this.union(ho)}let i=e.children;for(let s=0,r=i.length;s<r;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,jn),jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(qs),uo.subVectors(this.max,qs),Va.subVectors(e.a,qs),Ga.subVectors(e.b,qs),Ha.subVectors(e.c,qs),Bi.subVectors(Ga,Va),Oi.subVectors(Ha,Ga),ra.subVectors(Va,Ha);let t=[0,-Bi.z,Bi.y,0,-Oi.z,Oi.y,0,-ra.z,ra.y,Bi.z,0,-Bi.x,Oi.z,0,-Oi.x,ra.z,0,-ra.x,-Bi.y,Bi.x,0,-Oi.y,Oi.x,0,-ra.y,ra.x,0];return!nh(t,Va,Ga,Ha,uo)||(t=[1,0,0,0,1,0,0,0,1],!nh(t,Va,Ga,Ha,uo))?!1:(fo.crossVectors(Bi,Oi),t=[fo.x,fo.y,fo.z],nh(t,Va,Ga,Ha,uo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(pi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},pi=[new C,new C,new C,new C,new C,new C,new C,new C],jn=new C,ho=new Ke,Va=new C,Ga=new C,Ha=new C,Bi=new C,Oi=new C,ra=new C,qs=new C,uo=new C,fo=new C,oa=new C;function nh(a,e,t,n,i){for(let s=0,r=a.length-3;s<=r;s+=3){oa.fromArray(a,s);let o=i.x*Math.abs(oa.x)+i.y*Math.abs(oa.y)+i.z*Math.abs(oa.z),c=e.dot(oa),l=t.dot(oa),d=n.dot(oa);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}var qb=new Ke,Ks=new C,ih=new C,yt=class{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):qb.setFromPoints(e).getCenter(n);let i=0;for(let s=0,r=e.length;s<r;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ks.subVectors(e,this.center);let t=Ks.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ks,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ih.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ks.copy(e.center).add(ih)),this.expandByPoint(Ks.copy(e.center).sub(ih))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},mi=new C,ah=new C,po=new C,zi=new C,sh=new C,mo=new C,rh=new C,ni=class{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,mi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=mi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(mi.copy(this.origin).addScaledVector(this.direction,t),mi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){ah.copy(e).add(t).multiplyScalar(.5),po.copy(t).sub(e).normalize(),zi.copy(this.origin).sub(ah);let s=e.distanceTo(t)*.5,r=-this.direction.dot(po),o=zi.dot(this.direction),c=-zi.dot(po),l=zi.lengthSq(),d=Math.abs(1-r*r),h,u,f,m;if(d>0)if(h=r*c-o,u=r*o-c,m=s*d,h>=0)if(u>=-m)if(u<=m){let g=1/d;h*=g,u*=g,f=h*(h+r*u+2*o)+u*(r*h+u+2*c)+l}else u=s,h=Math.max(0,-(r*u+o)),f=-h*h+u*(u+2*c)+l;else u=-s,h=Math.max(0,-(r*u+o)),f=-h*h+u*(u+2*c)+l;else u<=-m?(h=Math.max(0,-(-r*s+o)),u=h>0?-s:Math.min(Math.max(-s,-c),s),f=-h*h+u*(u+2*c)+l):u<=m?(h=0,u=Math.min(Math.max(-s,-c),s),f=u*(u+2*c)+l):(h=Math.max(0,-(r*s+o)),u=h>0?s:Math.min(Math.max(-s,-c),s),f=-h*h+u*(u+2*c)+l);else u=r>0?-s:s,h=Math.max(0,-(r*u+o)),f=-h*h+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(ah).addScaledVector(po,u),f}intersectSphere(e,t){mi.subVectors(e.center,this.origin);let n=mi.dot(this.direction),i=mi.dot(mi)-n*n,s=e.radius*e.radius;if(i>s)return null;let r=Math.sqrt(s-i),o=n-r,c=n+r;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,r,o,c,l=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,i=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,i=(e.min.x-u.x)*l),d>=0?(s=(e.min.y-u.y)*d,r=(e.max.y-u.y)*d):(s=(e.max.y-u.y)*d,r=(e.min.y-u.y)*d),n>r||s>i||((s>n||isNaN(n))&&(n=s),(r<i||isNaN(i))&&(i=r),h>=0?(o=(e.min.z-u.z)*h,c=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,c=(e.min.z-u.z)*h),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,mi)!==null}intersectTriangle(e,t,n,i,s){sh.subVectors(t,e),mo.subVectors(n,e),rh.crossVectors(sh,mo);let r=this.direction.dot(rh),o;if(r>0){if(i)return null;o=1}else if(r<0)o=-1,r=-r;else return null;zi.subVectors(this.origin,e);let c=o*this.direction.dot(mo.crossVectors(zi,mo));if(c<0)return null;let l=o*this.direction.dot(sh.cross(zi));if(l<0||c+l>r)return null;let d=-o*zi.dot(rh);return d<0?null:this.at(d/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},de=class a{constructor(e,t,n,i,s,r,o,c,l,d,h,u,f,m,g,b){a.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,r,o,c,l,d,h,u,f,m,g,b)}set(e,t,n,i,s,r,o,c,l,d,h,u,f,m,g,b){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=r,p[9]=o,p[13]=c,p[2]=l,p[6]=d,p[10]=h,p[14]=u,p[3]=f,p[7]=m,p[11]=g,p[15]=b,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new a().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/Wa.setFromMatrixColumn(e,0).length(),s=1/Wa.setFromMatrixColumn(e,1).length(),r=1/Wa.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,r=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),d=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){let u=r*d,f=r*h,m=o*d,g=o*h;t[0]=c*d,t[4]=-c*h,t[8]=l,t[1]=f+m*l,t[5]=u-g*l,t[9]=-o*c,t[2]=g-u*l,t[6]=m+f*l,t[10]=r*c}else if(e.order==="YXZ"){let u=c*d,f=c*h,m=l*d,g=l*h;t[0]=u+g*o,t[4]=m*o-f,t[8]=r*l,t[1]=r*h,t[5]=r*d,t[9]=-o,t[2]=f*o-m,t[6]=g+u*o,t[10]=r*c}else if(e.order==="ZXY"){let u=c*d,f=c*h,m=l*d,g=l*h;t[0]=u-g*o,t[4]=-r*h,t[8]=m+f*o,t[1]=f+m*o,t[5]=r*d,t[9]=g-u*o,t[2]=-r*l,t[6]=o,t[10]=r*c}else if(e.order==="ZYX"){let u=r*d,f=r*h,m=o*d,g=o*h;t[0]=c*d,t[4]=m*l-f,t[8]=u*l+g,t[1]=c*h,t[5]=g*l+u,t[9]=f*l-m,t[2]=-l,t[6]=o*c,t[10]=r*c}else if(e.order==="YZX"){let u=r*c,f=r*l,m=o*c,g=o*l;t[0]=c*d,t[4]=g-u*h,t[8]=m*h+f,t[1]=h,t[5]=r*d,t[9]=-o*d,t[2]=-l*d,t[6]=f*h+m,t[10]=u-g*h}else if(e.order==="XZY"){let u=r*c,f=r*l,m=o*c,g=o*l;t[0]=c*d,t[4]=-h,t[8]=l*d,t[1]=u*h+g,t[5]=r*d,t[9]=f*h-m,t[2]=m*h-f,t[6]=o*d,t[10]=g*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Kb,e,Jb)}lookAt(e,t,n){let i=this.elements;return Sn.subVectors(e,t),Sn.lengthSq()===0&&(Sn.z=1),Sn.normalize(),ji.crossVectors(n,Sn),ji.lengthSq()===0&&(Math.abs(n.z)===1?Sn.x+=1e-4:Sn.z+=1e-4,Sn.normalize(),ji.crossVectors(n,Sn)),ji.normalize(),bo.crossVectors(Sn,ji),i[0]=ji.x,i[4]=bo.x,i[8]=Sn.x,i[1]=ji.y,i[5]=bo.y,i[9]=Sn.y,i[2]=ji.z,i[6]=bo.z,i[10]=Sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,r=n[0],o=n[4],c=n[8],l=n[12],d=n[1],h=n[5],u=n[9],f=n[13],m=n[2],g=n[6],b=n[10],p=n[14],x=n[3],y=n[7],v=n[11],_=n[15],w=i[0],T=i[4],I=i[8],M=i[12],S=i[1],R=i[5],D=i[9],L=i[13],U=i[2],z=i[6],j=i[10],J=i[14],H=i[3],Q=i[7],le=i[11],xe=i[15];return s[0]=r*w+o*S+c*U+l*H,s[4]=r*T+o*R+c*z+l*Q,s[8]=r*I+o*D+c*j+l*le,s[12]=r*M+o*L+c*J+l*xe,s[1]=d*w+h*S+u*U+f*H,s[5]=d*T+h*R+u*z+f*Q,s[9]=d*I+h*D+u*j+f*le,s[13]=d*M+h*L+u*J+f*xe,s[2]=m*w+g*S+b*U+p*H,s[6]=m*T+g*R+b*z+p*Q,s[10]=m*I+g*D+b*j+p*le,s[14]=m*M+g*L+b*J+p*xe,s[3]=x*w+y*S+v*U+_*H,s[7]=x*T+y*R+v*z+_*Q,s[11]=x*I+y*D+v*j+_*le,s[15]=x*M+y*L+v*J+_*xe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],r=e[1],o=e[5],c=e[9],l=e[13],d=e[2],h=e[6],u=e[10],f=e[14],m=e[3],g=e[7],b=e[11],p=e[15];return m*(+s*c*h-i*l*h-s*o*u+n*l*u+i*o*f-n*c*f)+g*(+t*c*f-t*l*u+s*r*u-i*r*f+i*l*d-s*c*d)+b*(+t*l*h-t*o*f-s*r*h+n*r*f+s*o*d-n*l*d)+p*(-i*o*d-t*c*h+t*o*u+i*r*h-n*r*u+n*c*d)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=e[9],u=e[10],f=e[11],m=e[12],g=e[13],b=e[14],p=e[15],x=h*b*l-g*u*l+g*c*f-o*b*f-h*c*p+o*u*p,y=m*u*l-d*b*l-m*c*f+r*b*f+d*c*p-r*u*p,v=d*g*l-m*h*l+m*o*f-r*g*f-d*o*p+r*h*p,_=m*h*c-d*g*c-m*o*u+r*g*u+d*o*b-r*h*b,w=t*x+n*y+i*v+s*_;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let T=1/w;return e[0]=x*T,e[1]=(g*u*s-h*b*s-g*i*f+n*b*f+h*i*p-n*u*p)*T,e[2]=(o*b*s-g*c*s+g*i*l-n*b*l-o*i*p+n*c*p)*T,e[3]=(h*c*s-o*u*s-h*i*l+n*u*l+o*i*f-n*c*f)*T,e[4]=y*T,e[5]=(d*b*s-m*u*s+m*i*f-t*b*f-d*i*p+t*u*p)*T,e[6]=(m*c*s-r*b*s-m*i*l+t*b*l+r*i*p-t*c*p)*T,e[7]=(r*u*s-d*c*s+d*i*l-t*u*l-r*i*f+t*c*f)*T,e[8]=v*T,e[9]=(m*h*s-d*g*s-m*n*f+t*g*f+d*n*p-t*h*p)*T,e[10]=(r*g*s-m*o*s+m*n*l-t*g*l-r*n*p+t*o*p)*T,e[11]=(d*o*s-r*h*s-d*n*l+t*h*l+r*n*f-t*o*f)*T,e[12]=_*T,e[13]=(d*g*i-m*h*i+m*n*u-t*g*u-d*n*b+t*h*b)*T,e[14]=(m*o*i-r*g*i-m*n*c+t*g*c+r*n*b-t*o*b)*T,e[15]=(r*h*i-d*o*i+d*n*c-t*h*c-r*n*u+t*o*u)*T,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,r=e.x,o=e.y,c=e.z,l=s*r,d=s*o;return this.set(l*r+n,l*o-i*c,l*c+i*o,0,l*o+i*c,d*o+n,d*c-i*r,0,l*c-i*o,d*c+i*r,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,r){return this.set(1,n,s,0,e,1,r,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,r=t._y,o=t._z,c=t._w,l=s+s,d=r+r,h=o+o,u=s*l,f=s*d,m=s*h,g=r*d,b=r*h,p=o*h,x=c*l,y=c*d,v=c*h,_=n.x,w=n.y,T=n.z;return i[0]=(1-(g+p))*_,i[1]=(f+v)*_,i[2]=(m-y)*_,i[3]=0,i[4]=(f-v)*w,i[5]=(1-(u+p))*w,i[6]=(b+x)*w,i[7]=0,i[8]=(m+y)*T,i[9]=(b-x)*T,i[10]=(1-(u+g))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=Wa.set(i[0],i[1],i[2]).length(),r=Wa.set(i[4],i[5],i[6]).length(),o=Wa.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Vn.copy(this);let l=1/s,d=1/r,h=1/o;return Vn.elements[0]*=l,Vn.elements[1]*=l,Vn.elements[2]*=l,Vn.elements[4]*=d,Vn.elements[5]*=d,Vn.elements[6]*=d,Vn.elements[8]*=h,Vn.elements[9]*=h,Vn.elements[10]*=h,t.setFromRotationMatrix(Vn),n.x=s,n.y=r,n.z=o,this}makePerspective(e,t,n,i,s,r,o=Fn,c=!1){let l=this.elements,d=2*s/(t-e),h=2*s/(n-i),u=(t+e)/(t-e),f=(n+i)/(n-i),m,g;if(c)m=s/(r-s),g=r*s/(r-s);else if(o===Fn)m=-(r+s)/(r-s),g=-2*r*s/(r-s);else if(o===sr)m=-r/(r-s),g=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,r,o=Fn,c=!1){let l=this.elements,d=2/(t-e),h=2/(n-i),u=-(t+e)/(t-e),f=-(n+i)/(n-i),m,g;if(c)m=1/(r-s),g=r/(r-s);else if(o===Fn)m=-2/(r-s),g=-(r+s)/(r-s);else if(o===sr)m=-1/(r-s),g=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=h,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Wa=new C,Vn=new de,Kb=new C(0,0,0),Jb=new C(1,1,1),ji=new C,bo=new C,Sn=new C,$u=new de,ef=new on,cn=class a{constructor(e=0,t=0,n=0,i=a.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],r=i[4],o=i[8],c=i[1],l=i[5],d=i[9],h=i[2],u=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Fe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Fe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Fe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-r,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Fe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-r,l));break;case"YZX":this._z=Math.asin(Fe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Fe(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return $u.makeRotationFromQuaternion(e),this.setFromRotationMatrix($u,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ef.setFromEuler(this),this.setFromQuaternion(ef,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};cn.DEFAULT_ORDER="XYZ";var ls=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Yb=0,tf=new C,Xa=new on,bi=new de,go=new C,Js=new C,Zb=new C,Qb=new on,nf=new C(1,0,0),af=new C(0,1,0),sf=new C(0,0,1),rf={type:"added"},$b={type:"removed"},qa={type:"childadded",child:null},oh={type:"childremoved",child:null},dt=class a extends Mi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yb++}),this.uuid=Wn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=a.DEFAULT_UP.clone();let e=new C,t=new cn,n=new on,i=new C(1,1,1);function s(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new de},normalMatrix:{value:new Be}}),this.matrix=new de,this.matrixWorld=new de,this.matrixAutoUpdate=a.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=a.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ls,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Xa.setFromAxisAngle(e,t),this.quaternion.multiply(Xa),this}rotateOnWorldAxis(e,t){return Xa.setFromAxisAngle(e,t),this.quaternion.premultiply(Xa),this}rotateX(e){return this.rotateOnAxis(nf,e)}rotateY(e){return this.rotateOnAxis(af,e)}rotateZ(e){return this.rotateOnAxis(sf,e)}translateOnAxis(e,t){return tf.copy(e).applyQuaternion(this.quaternion),this.position.add(tf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(nf,e)}translateY(e){return this.translateOnAxis(af,e)}translateZ(e){return this.translateOnAxis(sf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(bi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?go.copy(e):go.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Js.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bi.lookAt(Js,go,this.up):bi.lookAt(go,Js,this.up),this.quaternion.setFromRotationMatrix(bi),i&&(bi.extractRotation(i.matrixWorld),Xa.setFromRotationMatrix(bi),this.quaternion.premultiply(Xa.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(rf),qa.child=e,this.dispatchEvent(qa),qa.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent($b),oh.child=e,this.dispatchEvent(oh),oh.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),bi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),bi.multiply(e.parent.matrixWorld)),e.applyMatrix4(bi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(rf),qa.child=e,this.dispatchEvent(qa),qa.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Js,e,Zb),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Js,Qb,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){let h=c[l];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(s(e.animations,c))}}if(t){let o=r(e.geometries),c=r(e.materials),l=r(e.textures),d=r(e.images),h=r(e.shapes),u=r(e.skeletons),f=r(e.animations),m=r(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),d.length>0&&(n.images=d),h.length>0&&(n.shapes=h),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function r(o){let c=[];for(let l in o){let d=o[l];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};dt.DEFAULT_UP=new C(0,1,0);dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Gn=new C,gi=new C,ch=new C,xi=new C,Ka=new C,Ja=new C,of=new C,lh=new C,hh=new C,dh=new C,uh=new Xe,fh=new Xe,ph=new Xe,Qt=class a{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Gn.subVectors(e,t),i.cross(Gn);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Gn.subVectors(i,t),gi.subVectors(n,t),ch.subVectors(e,t);let r=Gn.dot(Gn),o=Gn.dot(gi),c=Gn.dot(ch),l=gi.dot(gi),d=gi.dot(ch),h=r*l-o*o;if(h===0)return s.set(0,0,0),null;let u=1/h,f=(l*c-o*d)*u,m=(r*d-o*c)*u;return s.set(1-f-m,m,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,xi)===null?!1:xi.x>=0&&xi.y>=0&&xi.x+xi.y<=1}static getInterpolation(e,t,n,i,s,r,o,c){return this.getBarycoord(e,t,n,i,xi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,xi.x),c.addScaledVector(r,xi.y),c.addScaledVector(o,xi.z),c)}static getInterpolatedAttribute(e,t,n,i,s,r){return uh.setScalar(0),fh.setScalar(0),ph.setScalar(0),uh.fromBufferAttribute(e,t),fh.fromBufferAttribute(e,n),ph.fromBufferAttribute(e,i),r.setScalar(0),r.addScaledVector(uh,s.x),r.addScaledVector(fh,s.y),r.addScaledVector(ph,s.z),r}static isFrontFacing(e,t,n,i){return Gn.subVectors(n,t),gi.subVectors(e,t),Gn.cross(gi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Gn.subVectors(this.c,this.b),gi.subVectors(this.a,this.b),Gn.cross(gi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return a.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return a.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return a.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return a.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return a.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,r,o;Ka.subVectors(i,n),Ja.subVectors(s,n),lh.subVectors(e,n);let c=Ka.dot(lh),l=Ja.dot(lh);if(c<=0&&l<=0)return t.copy(n);hh.subVectors(e,i);let d=Ka.dot(hh),h=Ja.dot(hh);if(d>=0&&h<=d)return t.copy(i);let u=c*h-d*l;if(u<=0&&c>=0&&d<=0)return r=c/(c-d),t.copy(n).addScaledVector(Ka,r);dh.subVectors(e,s);let f=Ka.dot(dh),m=Ja.dot(dh);if(m>=0&&f<=m)return t.copy(s);let g=f*l-c*m;if(g<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(Ja,o);let b=d*m-f*h;if(b<=0&&h-d>=0&&f-m>=0)return of.subVectors(s,i),o=(h-d)/(h-d+(f-m)),t.copy(i).addScaledVector(of,o);let p=1/(b+g+u);return r=g*p,o=u*p,t.copy(n).addScaledVector(Ka,r).addScaledVector(Ja,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},xp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vi={h:0,s:0,l:0},xo={h:0,s:0,l:0};function mh(a,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?a+(e-a)*6*t:t<1/2?e:t<2/3?a+(e-a)*6*(2/3-t):a}var fe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=St){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ge.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Ge.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ge.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Ge.workingColorSpace){if(e=rd(e,1),t=Fe(t,0,1),n=Fe(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,r=2*n-s;this.r=mh(r,s,e+1/3),this.g=mh(r,s,e),this.b=mh(r,s,e-1/3)}return Ge.colorSpaceToWorking(this,i),this}setStyle(e,t=St){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,r=i[1],o=i[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=St){let n=xp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=yi(e.r),this.g=yi(e.g),this.b=yi(e.b),this}copyLinearToSRGB(e){return this.r=is(e.r),this.g=is(e.g),this.b=is(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=St){return Ge.workingToColorSpace(Yt.copy(this),e),Math.round(Fe(Yt.r*255,0,255))*65536+Math.round(Fe(Yt.g*255,0,255))*256+Math.round(Fe(Yt.b*255,0,255))}getHexString(e=St){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ge.workingColorSpace){Ge.workingToColorSpace(Yt.copy(this),t);let n=Yt.r,i=Yt.g,s=Yt.b,r=Math.max(n,i,s),o=Math.min(n,i,s),c,l,d=(o+r)/2;if(o===r)c=0,l=0;else{let h=r-o;switch(l=d<=.5?h/(r+o):h/(2-r-o),r){case n:c=(i-s)/h+(i<s?6:0);break;case i:c=(s-n)/h+2;break;case s:c=(n-i)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=d,e}getRGB(e,t=Ge.workingColorSpace){return Ge.workingToColorSpace(Yt.copy(this),t),e.r=Yt.r,e.g=Yt.g,e.b=Yt.b,e}getStyle(e=St){Ge.workingToColorSpace(Yt.copy(this),e);let t=Yt.r,n=Yt.g,i=Yt.b;return e!==St?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Vi),this.setHSL(Vi.h+e,Vi.s+t,Vi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Vi),e.getHSL(xo);let n=ir(Vi.h,xo.h,t),i=ir(Vi.s,xo.s,t),s=ir(Vi.l,xo.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Yt=new fe;fe.NAMES=xp;var eg=0,ln=class extends Mi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:eg++}),this.uuid=Wn(),this.name="",this.type="Material",this.blending=_i,this.side=$t,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zo,this.blendDst=jo,this.blendEquation=Wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new fe(0,0,0),this.blendAlpha=0,this.depthFunc=fa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ua,this.stencilZFail=ua,this.stencilZPass=ua,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==_i&&(n.blending=this.blending),this.side!==$t&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==zo&&(n.blendSrc=this.blendSrc),this.blendDst!==jo&&(n.blendDst=this.blendDst),this.blendEquation!==Wi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==fa&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Nh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ua&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ua&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ua&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let r=[];for(let o in s){let c=s[o];delete c.metadata,r.push(c)}return r}if(t){let s=i(e.textures),r=i(e.images);s.length>0&&(n.textures=s),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},hn=class extends ln{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cn,this.combine=pc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var At=new C,vo=new re,tg=0,Je=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:tg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Vo,this.updateRanges=[],this.gpuType=gn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)vo.fromBufferAttribute(this,t),vo.applyMatrix3(e),this.setXY(t,vo.x,vo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Hn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=nt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Hn(t,this.array)),t}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Hn(t,this.array)),t}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Hn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Hn(t,this.array)),t}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array),s=nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Vo&&(e.usage=this.usage),e}};var or=class extends Je{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var cr=class extends Je{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ct=class extends Je{constructor(e,t,n){super(new Float32Array(e),t,n)}},ng=0,Dn=new de,bh=new dt,Ya=new C,wn=new Ke,Ys=new Ke,Bt=new C,wt=class a extends Mi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ng++}),this.uuid=Wn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(od(e)?cr:or)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Be().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Dn.makeRotationFromQuaternion(e),this.applyMatrix4(Dn),this}rotateX(e){return Dn.makeRotationX(e),this.applyMatrix4(Dn),this}rotateY(e){return Dn.makeRotationY(e),this.applyMatrix4(Dn),this}rotateZ(e){return Dn.makeRotationZ(e),this.applyMatrix4(Dn),this}translate(e,t,n){return Dn.makeTranslation(e,t,n),this.applyMatrix4(Dn),this}scale(e,t,n){return Dn.makeScale(e,t,n),this.applyMatrix4(Dn),this}lookAt(e){return bh.lookAt(e),bh.updateMatrix(),this.applyMatrix4(bh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ya).negate(),this.translate(Ya.x,Ya.y,Ya.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let r=e[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Ct(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ke);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];wn.setFromBufferAttribute(s),this.morphTargetsRelative?(Bt.addVectors(this.boundingBox.min,wn.min),this.boundingBox.expandByPoint(Bt),Bt.addVectors(this.boundingBox.max,wn.max),this.boundingBox.expandByPoint(Bt)):(this.boundingBox.expandByPoint(wn.min),this.boundingBox.expandByPoint(wn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){let n=this.boundingSphere.center;if(wn.setFromBufferAttribute(e),t)for(let s=0,r=t.length;s<r;s++){let o=t[s];Ys.setFromBufferAttribute(o),this.morphTargetsRelative?(Bt.addVectors(wn.min,Ys.min),wn.expandByPoint(Bt),Bt.addVectors(wn.max,Ys.max),wn.expandByPoint(Bt)):(wn.expandByPoint(Ys.min),wn.expandByPoint(Ys.max))}wn.getCenter(n);let i=0;for(let s=0,r=e.count;s<r;s++)Bt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Bt));if(t)for(let s=0,r=t.length;s<r;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)Bt.fromBufferAttribute(o,l),c&&(Ya.fromBufferAttribute(e,l),Bt.add(Ya)),i=Math.max(i,n.distanceToSquared(Bt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Je(new Float32Array(4*n.count),4));let r=this.getAttribute("tangent"),o=[],c=[];for(let I=0;I<n.count;I++)o[I]=new C,c[I]=new C;let l=new C,d=new C,h=new C,u=new re,f=new re,m=new re,g=new C,b=new C;function p(I,M,S){l.fromBufferAttribute(n,I),d.fromBufferAttribute(n,M),h.fromBufferAttribute(n,S),u.fromBufferAttribute(s,I),f.fromBufferAttribute(s,M),m.fromBufferAttribute(s,S),d.sub(l),h.sub(l),f.sub(u),m.sub(u);let R=1/(f.x*m.y-m.x*f.y);isFinite(R)&&(g.copy(d).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar(R),b.copy(h).multiplyScalar(f.x).addScaledVector(d,-m.x).multiplyScalar(R),o[I].add(g),o[M].add(g),o[S].add(g),c[I].add(b),c[M].add(b),c[S].add(b))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let I=0,M=x.length;I<M;++I){let S=x[I],R=S.start,D=S.count;for(let L=R,U=R+D;L<U;L+=3)p(e.getX(L+0),e.getX(L+1),e.getX(L+2))}let y=new C,v=new C,_=new C,w=new C;function T(I){_.fromBufferAttribute(i,I),w.copy(_);let M=o[I];y.copy(M),y.sub(_.multiplyScalar(_.dot(M))).normalize(),v.crossVectors(w,M);let R=v.dot(c[I])<0?-1:1;r.setXYZW(I,y.x,y.y,y.z,R)}for(let I=0,M=x.length;I<M;++I){let S=x[I],R=S.start,D=S.count;for(let L=R,U=R+D;L<U;L+=3)T(e.getX(L+0)),T(e.getX(L+1)),T(e.getX(L+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Je(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let i=new C,s=new C,r=new C,o=new C,c=new C,l=new C,d=new C,h=new C;if(e)for(let u=0,f=e.count;u<f;u+=3){let m=e.getX(u+0),g=e.getX(u+1),b=e.getX(u+2);i.fromBufferAttribute(t,m),s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,b),d.subVectors(r,s),h.subVectors(i,s),d.cross(h),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,g),l.fromBufferAttribute(n,b),o.add(d),c.add(d),l.add(d),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(b,l.x,l.y,l.z)}else for(let u=0,f=t.count;u<f;u+=3)i.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),r.fromBufferAttribute(t,u+2),d.subVectors(r,s),h.subVectors(i,s),d.cross(h),n.setXYZ(u+0,d.x,d.y,d.z),n.setXYZ(u+1,d.x,d.y,d.z),n.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Bt.fromBufferAttribute(e,t),Bt.normalize(),e.setXYZ(t,Bt.x,Bt.y,Bt.z)}toNonIndexed(){function e(o,c){let l=o.array,d=o.itemSize,h=o.normalized,u=new l.constructor(c.length*d),f=0,m=0;for(let g=0,b=c.length;g<b;g++){o.isInterleavedBufferAttribute?f=c[g]*o.data.stride+o.offset:f=c[g]*d;for(let p=0;p<d;p++)u[m++]=l[f++]}return new Je(u,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new a,n=this.index.array,i=this.attributes;for(let o in i){let c=i[o],l=e(c,n);t.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let d=0,h=l.length;d<h;d++){let u=l[d],f=e(u,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let o=0,c=r.length;o<c;o++){let l=r[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],d=[];for(let h=0,u=l.length;h<u;h++){let f=l[h];d.push(f.toJSON(e.data))}d.length>0&&(i[c]=d,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let d=i[l];this.setAttribute(l,d.clone(t))}let s=e.morphAttributes;for(let l in s){let d=[],h=s[l];for(let u=0,f=h.length;u<f;u++)d.push(h[u].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;let r=e.groups;for(let l=0,d=r.length;l<d;l++){let h=r[l];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},cf=new de,ca=new ni,yo=new yt,lf=new C,_o=new C,Mo=new C,So=new C,gh=new C,wo=new C,hf=new C,To=new C,ze=class extends dt{constructor(e=new wt,t=new hn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){wo.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let d=o[c],h=s[c];d!==0&&(gh.fromBufferAttribute(h,e),r?wo.addScaledVector(gh,d):wo.addScaledVector(gh.sub(t),d))}t.add(wo)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),yo.copy(n.boundingSphere),yo.applyMatrix4(s),ca.copy(e.ray).recast(e.near),!(yo.containsPoint(ca.origin)===!1&&(ca.intersectSphere(yo,lf)===null||ca.origin.distanceToSquared(lf)>(e.far-e.near)**2))&&(cf.copy(s).invert(),ca.copy(e.ray).applyMatrix4(cf),!(n.boundingBox!==null&&ca.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ca)))}_computeIntersections(e,t,n){let i,s=this.geometry,r=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,d=s.attributes.uv1,h=s.attributes.normal,u=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(r))for(let m=0,g=u.length;m<g;m++){let b=u[m],p=r[b.materialIndex],x=Math.max(b.start,f.start),y=Math.min(o.count,Math.min(b.start+b.count,f.start+f.count));for(let v=x,_=y;v<_;v+=3){let w=o.getX(v),T=o.getX(v+1),I=o.getX(v+2);i=Eo(this,p,e,n,l,d,h,w,T,I),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=b.materialIndex,t.push(i))}}else{let m=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let b=m,p=g;b<p;b+=3){let x=o.getX(b),y=o.getX(b+1),v=o.getX(b+2);i=Eo(this,r,e,n,l,d,h,x,y,v),i&&(i.faceIndex=Math.floor(b/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(r))for(let m=0,g=u.length;m<g;m++){let b=u[m],p=r[b.materialIndex],x=Math.max(b.start,f.start),y=Math.min(c.count,Math.min(b.start+b.count,f.start+f.count));for(let v=x,_=y;v<_;v+=3){let w=v,T=v+1,I=v+2;i=Eo(this,p,e,n,l,d,h,w,T,I),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=b.materialIndex,t.push(i))}}else{let m=Math.max(0,f.start),g=Math.min(c.count,f.start+f.count);for(let b=m,p=g;b<p;b+=3){let x=b,y=b+1,v=b+2;i=Eo(this,r,e,n,l,d,h,x,y,v),i&&(i.faceIndex=Math.floor(b/3),t.push(i))}}}};function ig(a,e,t,n,i,s,r,o){let c;if(e.side===Ft?c=n.intersectTriangle(r,s,i,!0,o):c=n.intersectTriangle(i,s,r,e.side===$t,o),c===null)return null;To.copy(o),To.applyMatrix4(a.matrixWorld);let l=t.ray.origin.distanceTo(To);return l<t.near||l>t.far?null:{distance:l,point:To.clone(),object:a}}function Eo(a,e,t,n,i,s,r,o,c,l){a.getVertexPosition(o,_o),a.getVertexPosition(c,Mo),a.getVertexPosition(l,So);let d=ig(a,e,t,n,_o,Mo,So,hf);if(d){let h=new C;Qt.getBarycoord(hf,_o,Mo,So,h),i&&(d.uv=Qt.getInterpolatedAttribute(i,o,c,l,h,new re)),s&&(d.uv1=Qt.getInterpolatedAttribute(s,o,c,l,h,new re)),r&&(d.normal=Qt.getInterpolatedAttribute(r,o,c,l,h,new C),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new C,materialIndex:0};Qt.getNormal(_o,Mo,So,u.normal),d.face=u,d.barycoord=h}return d}var En=class a extends wt{constructor(e=1,t=1,n=1,i=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:r};let o=this;i=Math.floor(i),s=Math.floor(s),r=Math.floor(r);let c=[],l=[],d=[],h=[],u=0,f=0;m("z","y","x",-1,-1,n,t,e,r,s,0),m("z","y","x",1,-1,n,t,-e,r,s,1),m("x","z","y",1,1,e,n,t,i,r,2),m("x","z","y",1,-1,e,n,-t,i,r,3),m("x","y","z",1,-1,e,t,n,i,s,4),m("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Ct(l,3)),this.setAttribute("normal",new Ct(d,3)),this.setAttribute("uv",new Ct(h,2));function m(g,b,p,x,y,v,_,w,T,I,M){let S=v/T,R=_/I,D=v/2,L=_/2,U=w/2,z=T+1,j=I+1,J=0,H=0,Q=new C;for(let le=0;le<j;le++){let xe=le*R-L;for(let Ne=0;Ne<z;Ne++){let it=Ne*S-D;Q[g]=it*x,Q[b]=xe*y,Q[p]=U,l.push(Q.x,Q.y,Q.z),Q[g]=0,Q[b]=0,Q[p]=w>0?1:-1,d.push(Q.x,Q.y,Q.z),h.push(Ne/T),h.push(1-le/I),J+=1}}for(let le=0;le<I;le++)for(let xe=0;xe<T;xe++){let Ne=u+xe+z*le,it=u+xe+z*(le+1),lt=u+(xe+1)+z*(le+1),Ze=u+(xe+1)+z*le;c.push(Ne,it,Ze),c.push(it,lt,Ze),H+=6}o.addGroup(f,H,M),f+=H,u+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new a(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Ea(a){let e={};for(let t in a){e[t]={};for(let n in a[t]){let i=a[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function tn(a){let e={};for(let t=0;t<a.length;t++){let n=Ea(a[t]);for(let i in n)e[i]=n[i]}return e}function ag(a){let e=[];for(let t=0;t<a.length;t++)e.push(a[t].clone());return e}function cd(a){let e=a.getRenderTarget();return e===null?a.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ge.workingColorSpace}var Fi={clone:Ea,merge:tn},sg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,rg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ut=class extends ln{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sg,this.fragmentShader=rg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ea(e.uniforms),this.uniformsGroups=ag(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let r=this.uniforms[i].value;r&&r.isTexture?t.uniforms[i]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[i]={type:"m4",value:r.toArray()}:t.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},ga=class extends dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new de,this.projectionMatrix=new de,this.projectionMatrixInverse=new de,this.coordinateSystem=Fn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Gi=new C,df=new re,uf=new re,Rt=class extends ga{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ba*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(nr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ba*2*Math.atan(Math.tan(nr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Gi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Gi.x,Gi.y).multiplyScalar(-e/Gi.z),Gi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Gi.x,Gi.y).multiplyScalar(-e/Gi.z)}getViewSize(e,t){return this.getViewBounds(e,df,uf),t.subVectors(uf,df)}setViewOffset(e,t,n,i,s,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(nr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,r=this.view;if(this.view!==null&&this.view.enabled){let c=r.fullWidth,l=r.fullHeight;s+=r.offsetX*i/c,t-=r.offsetY*n/l,i*=r.width/c,n*=r.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Za=-90,Qa=1,Xo=class extends dt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Rt(Za,Qa,e,t);i.layers=this.layers,this.add(i);let s=new Rt(Za,Qa,e,t);s.layers=this.layers,this.add(s);let r=new Rt(Za,Qa,e,t);r.layers=this.layers,this.add(r);let o=new Rt(Za,Qa,e,t);o.layers=this.layers,this.add(o);let c=new Rt(Za,Qa,e,t);c.layers=this.layers,this.add(c);let l=new Rt(Za,Qa,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,r,o,c]=t;for(let l of t)this.remove(l);if(e===Fn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===sr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,r,o,c,l,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,r),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,d),e.setRenderTarget(h,u,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},lr=class extends Dt{constructor(e=[],t=Sa,n,i,s,r,o,c,l,d){super(e,t,n,i,s,r,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},qo=class extends It{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new lr(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new En(5,5,5),s=new ut({name:"CubemapFromEquirect",uniforms:Ea(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ft,blending:Xn});s.uniforms.tEquirect.value=t;let r=new ze(i,s),o=t.minFilter;return t.minFilter===qn&&(t.minFilter=sn),new Xo(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,n,i);e.setRenderTarget(s)}},Tn=class extends dt{constructor(){super(),this.isGroup=!0,this.type="Group"}},og={type:"move"},hs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Tn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Tn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Tn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,r=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){r=!0;for(let g of e.hand.values()){let b=t.getJointPose(g,n),p=this._getHandJoint(l,g);b!==null&&(p.matrix.fromArray(b.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=b.radius),p.visible=b!==null}let d=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],u=d.position.distanceTo(h.position),f=.02,m=.005;l.inputState.pinching&&u>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(og)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Tn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},hr=class a{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new fe(e),this.density=t}clone(){return new a(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Si=class extends dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new cn,this.environmentIntensity=1,this.environmentRotation=new cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},ds=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Vo,this.updateRanges=[],this.version=0,this.uuid=Wn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},an=new C,us=class a{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)an.fromBufferAttribute(this,t),an.applyMatrix4(e),this.setXYZ(t,an.x,an.y,an.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)an.fromBufferAttribute(this,t),an.applyNormalMatrix(e),this.setXYZ(t,an.x,an.y,an.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)an.fromBufferAttribute(this,t),an.transformDirection(e),this.setXYZ(t,an.x,an.y,an.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Hn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=nt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Hn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Hn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Hn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Hn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array),s=nt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Je(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new a(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var ff=new C,pf=new Xe,mf=new Xe,cg=new C,bf=new de,Ao=new C,xh=new yt,gf=new de,vh=new ni,dr=class extends ze{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Dh,this.bindMatrix=new de,this.bindMatrixInverse=new de,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ke),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ao),this.boundingBox.expandByPoint(Ao)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new yt),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ao),this.boundingSphere.expandByPoint(Ao)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xh.copy(this.boundingSphere),xh.applyMatrix4(i),e.ray.intersectsSphere(xh)!==!1&&(gf.copy(i).invert(),vh.copy(e.ray).applyMatrix4(gf),!(this.boundingBox!==null&&vh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,vh)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Xe,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Dh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ap?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;pf.fromBufferAttribute(i.attributes.skinIndex,e),mf.fromBufferAttribute(i.attributes.skinWeight,e),ff.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let r=mf.getComponent(s);if(r!==0){let o=pf.getComponent(s);bf.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(cg.copy(ff).applyMatrix4(bf),r)}}return t.applyMatrix4(this.bindMatrixInverse)}},fs=class extends dt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Hi=class extends Dt{constructor(e=null,t=1,n=1,i,s,r,o,c,l=Vt,d=Vt,h,u){super(null,r,o,c,l,d,i,s,h,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},xf=new de,lg=new de,ur=class a{constructor(e=[],t=[]){this.uuid=Wn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new de)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new de;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,r=e.length;s<r;s++){let o=e[s]?e[s].matrixWorld:lg;xf.multiplyMatrices(o,t[s]),xf.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new a(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Hi(t,e,e,rn,gn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],r=t[s];r===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),r=new fs),this.bones.push(r),this.boneInverses.push(new de().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let r=t[i];e.bones.push(r.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},Ln=class extends Je{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},$a=new de,vf=new de,Ro=[],yf=new Ke,hg=new de,Zs=new ze,Qs=new yt,xa=class extends ze{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ln(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,hg)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ke),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,$a),yf.copy(e.boundingBox).applyMatrix4($a),this.boundingBox.union(yf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new yt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,$a),Qs.copy(e.boundingSphere).applyMatrix4($a),this.boundingSphere.union(Qs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,r=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[r+o]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Zs.geometry=this.geometry,Zs.material=this.material,Zs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qs.copy(this.boundingSphere),Qs.applyMatrix4(n),e.ray.intersectsSphere(Qs)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,$a),vf.multiplyMatrices(n,$a),Zs.matrixWorld=vf,Zs.raycast(e,Ro);for(let r=0,o=Ro.length;r<o;r++){let c=Ro[r];c.instanceId=s,c.object=this,t.push(c)}Ro.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ln(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Hi(new Float32Array(i*this.count),i,this.count,Ac,gn));let s=this.morphTexture.source.data.data,r=0;for(let l=0;l<n.length;l++)r+=n[l];let o=this.geometry.morphTargetsRelative?1:1-r,c=i*e;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},yh=new C,dg=new C,ug=new Be,bn=class{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=yh.subVectors(n,t).cross(dg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(yh),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||ug.getNormalMatrix(e),i=this.coplanarPoint(yh).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},la=new yt,fg=new re(.5,.5),Co=new C,qi=class{constructor(e=new bn,t=new bn,n=new bn,i=new bn,s=new bn,r=new bn){this.planes=[e,t,n,i,s,r]}set(e,t,n,i,s,r){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(r),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Fn,n=!1){let i=this.planes,s=e.elements,r=s[0],o=s[1],c=s[2],l=s[3],d=s[4],h=s[5],u=s[6],f=s[7],m=s[8],g=s[9],b=s[10],p=s[11],x=s[12],y=s[13],v=s[14],_=s[15];if(i[0].setComponents(l-r,f-d,p-m,_-x).normalize(),i[1].setComponents(l+r,f+d,p+m,_+x).normalize(),i[2].setComponents(l+o,f+h,p+g,_+y).normalize(),i[3].setComponents(l-o,f-h,p-g,_-y).normalize(),n)i[4].setComponents(c,u,b,v).normalize(),i[5].setComponents(l-c,f-u,p-b,_-v).normalize();else if(i[4].setComponents(l-c,f-u,p-b,_-v).normalize(),t===Fn)i[5].setComponents(l+c,f+u,p+b,_+v).normalize();else if(t===sr)i[5].setComponents(c,u,b,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),la.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),la.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(la)}intersectsSprite(e){la.center.set(0,0,0);let t=fg.distanceTo(e.center);return la.radius=.7071067811865476+t,la.applyMatrix4(e.matrixWorld),this.intersectsSphere(la)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Co.x=i.normal.x>0?e.max.x:e.min.x,Co.y=i.normal.y>0?e.max.y:e.min.y,Co.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Co)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Qn=new de,$n=new qi,Ko=class a{constructor(){this.coordinateSystem=Fn}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Qn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),$n.setFromProjectionMatrix(Qn,i.coordinateSystem,i.reversedDepth),$n.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Qn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),$n.setFromProjectionMatrix(Qn,i.coordinateSystem,i.reversedDepth),$n.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Qn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),$n.setFromProjectionMatrix(Qn,i.coordinateSystem,i.reversedDepth),$n.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Qn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),$n.setFromProjectionMatrix(Qn,i.coordinateSystem,i.reversedDepth),$n.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Qn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),$n.setFromProjectionMatrix(Qn,i.coordinateSystem,i.reversedDepth),$n.containsPoint(e))return!0}return!1}clone(){return new a}};function _h(a,e){return a-e}function pg(a,e){return a.z-e.z}function mg(a,e){return e.z-a.z}var Uh=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let s=this.pool,r=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];r.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},mn=new de,bg=new fe(1,1,1),_f=new qi,gg=new Ko,Io=new Ke,ha=new yt,$s=new C,Mf=new C,xg=new C,Mh=new Uh,Zt=new ze,Po=[];function vg(a,e,t=0){let n=e.itemSize;if(a.isInterleavedBufferAttribute||a.array.constructor!==e.array.constructor){let i=a.count;for(let s=0;s<i;s++)for(let r=0;r<n;r++)e.setComponent(s+t,r,a.getComponent(s,r))}else e.array.set(a.array,t*n);e.needsUpdate=!0}function da(a,e){if(a.constructor!==e.constructor){let t=Math.min(a.length,e.length);for(let n=0;n<t;n++)e[n]=a[n]}else{let t=Math.min(a.length,e.length);e.set(new a.constructor(a.buffer,0,t))}}var fr=class extends ze{constructor(e,t,n=t*2,i){super(new wt,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4),n=new Hi(t,e,e,rn,gn);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);let t=new Uint32Array(e*e),n=new Hi(t,e,e,kr,Nn);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);let t=new Float32Array(e*e*4).fill(1),n=new Hi(t,e,e,rn,gn);n.colorSpace=Ge.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){let t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(let s in e.attributes){let r=e.getAttribute(s),{array:o,itemSize:c,normalized:l}=r,d=new o.constructor(n*c),h=new Je(d,c,l);t.setAttribute(s,h)}if(e.getIndex()!==null){let s=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new Je(s,1))}this._geometryInitialized=!0}}_validateGeometry(e){let t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(let n in t.attributes){if(!e.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);let i=e.getAttribute(n),s=t.getAttribute(n);if(i.itemSize!==s.itemSize||i.normalized!==s.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(e){let t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){let t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ke);let e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;let s=t[n].geometryIndex;this.getMatrixAt(n,mn),this.getBoundingBoxAt(s,Io).applyMatrix4(mn),e.union(Io)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yt);let e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;let s=t[n].geometryIndex;this.getMatrixAt(n,mn),this.getBoundingSphereAt(s,ha).applyMatrix4(mn),e.union(ha)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");let n={visible:!0,active:!0,geometryIndex:e},i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(_h),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));let s=this._matricesTexture;mn.identity().toArray(s.image.data,i*16),s.needsUpdate=!0;let r=this._colorsTexture;return r&&(bg.toArray(r.image.data,i*4),r.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);let i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},s=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;let r=e.getIndex();if(r!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?r.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let c;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(_h),c=this._availableGeometryIds.shift(),s[c]=i):(c=this._geometryCount,this._geometryCount++,s.push(i)),this.setGeometryAt(c,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,c}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);let n=this.geometry,i=n.getIndex()!==null,s=n.getIndex(),r=t.getIndex(),o=this._geometryInfo[e];if(i&&r.count>o.reservedIndexCount||t.attributes.position.count>o.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");let c=o.vertexStart,l=o.reservedVertexCount;o.vertexCount=t.getAttribute("position").count;for(let d in n.attributes){let h=t.getAttribute(d),u=n.getAttribute(d);vg(h,u,c);let f=h.itemSize;for(let m=h.count,g=l;m<g;m++){let b=c+m;for(let p=0;p<f;p++)u.setComponent(b,p,0)}u.needsUpdate=!0,u.addUpdateRange(c*f,l*f)}if(i){let d=o.indexStart,h=o.reservedIndexCount;o.indexCount=t.getIndex().count;for(let u=0;u<r.count;u++)s.setX(d+u,c+r.getX(u));for(let u=r.count,f=h;u<f;u++)s.setX(d+u,c);s.needsUpdate=!0,s.addUpdateRange(d,o.reservedIndexCount)}return o.start=i?o.indexStart:o.vertexStart,o.count=i?o.indexCount:o.vertexCount,o.boundingBox=null,t.boundingBox!==null&&(o.boundingBox=t.boundingBox.clone()),o.boundingSphere=null,t.boundingSphere!==null&&(o.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){let t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;let n=this._instanceInfo;for(let i=0,s=n.length;i<s;i++)n[i].active&&n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0,n=this._geometryInfo,i=n.map((r,o)=>o).sort((r,o)=>n[r].vertexStart-n[o].vertexStart),s=this.geometry;for(let r=0,o=n.length;r<o;r++){let c=i[r],l=n[c];if(l.active!==!1){if(s.index!==null){if(l.indexStart!==t){let{indexStart:d,vertexStart:h,reservedIndexCount:u}=l,f=s.index,m=f.array,g=e-h;for(let b=d;b<d+u;b++)m[b]=m[b]+g;f.array.copyWithin(t,d,d+u),f.addUpdateRange(t,u),l.indexStart=t}t+=l.reservedIndexCount}if(l.vertexStart!==e){let{vertexStart:d,reservedVertexCount:h}=l,u=s.attributes;for(let f in u){let m=u[f],{array:g,itemSize:b}=m;g.copyWithin(e*b,d*b,(d+h)*b),m.addUpdateRange(e*b,h*b)}l.vertexStart=e}e+=l.reservedVertexCount,l.start=s.index?l.indexStart:l.vertexStart,this._nextIndexStart=s.index?l.indexStart+l.reservedIndexCount:0,this._nextVertexStart=l.vertexStart+l.reservedVertexCount}}return this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){let s=new Ke,r=n.index,o=n.attributes.position;for(let c=i.start,l=i.start+i.count;c<l;c++){let d=c;r&&(d=r.getX(d)),s.expandByPoint($s.fromBufferAttribute(o,d))}i.boundingBox=s}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){let s=new yt;this.getBoundingBoxAt(e,Io),Io.getCenter(s.center);let r=n.index,o=n.attributes.position,c=0;for(let l=i.start,d=i.start+i.count;l<d;l++){let h=l;r&&(h=r.getX(h)),$s.fromBufferAttribute(o,h),c=Math.max(c,s.center.distanceToSquared($s))}s.radius=Math.sqrt(c),i.boundingSphere=s}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);let n=this._matricesTexture,i=this._matricesTexture.image.data;return t.toArray(i,e*16),n.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);let n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){let t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(_h);t[t.length-1]===n.length-1;)n.pop(),t.pop();if(e<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);let i=new Int32Array(e),s=new Int32Array(e);da(this._multiDrawCounts,i),da(this._multiDrawStarts,s),this._multiDrawCounts=i,this._multiDrawStarts=s,this._maxInstanceCount=e;let r=this._indirectTexture,o=this._matricesTexture,c=this._colorsTexture;r.dispose(),this._initIndirectTexture(),da(r.image.data,this._indirectTexture.image.data),o.dispose(),this._initMatricesTexture(),da(o.image.data,this._matricesTexture.image.data),c&&(c.dispose(),this._initColorsTexture(),da(c.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){let n=[...this._geometryInfo].filter(o=>o.active);if(Math.max(...n.map(o=>o.vertexStart+o.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(c=>c.indexStart+c.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);let s=this.geometry;s.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new wt,this._initializeGeometry(s));let r=this.geometry;s.index&&da(s.index.array,r.index.array);for(let o in s.attributes)da(s.attributes[o].array,r.attributes[o].array)}raycast(e,t){let n=this._instanceInfo,i=this._geometryInfo,s=this.matrixWorld,r=this.geometry;Zt.material=this.material,Zt.geometry.index=r.index,Zt.geometry.attributes=r.attributes,Zt.geometry.boundingBox===null&&(Zt.geometry.boundingBox=new Ke),Zt.geometry.boundingSphere===null&&(Zt.geometry.boundingSphere=new yt);for(let o=0,c=n.length;o<c;o++){if(!n[o].visible||!n[o].active)continue;let l=n[o].geometryIndex,d=i[l];Zt.geometry.setDrawRange(d.start,d.count),this.getMatrixAt(o,Zt.matrixWorld).premultiply(s),this.getBoundingBoxAt(l,Zt.geometry.boundingBox),this.getBoundingSphereAt(l,Zt.geometry.boundingSphere),Zt.raycast(e,Po);for(let h=0,u=Po.length;h<u;h++){let f=Po[h];f.object=this,f.batchId=o,t.push(f)}Po.length=0}Zt.material=null,Zt.geometry.index=null,Zt.geometry.attributes={},Zt.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._availableInstanceIds=e._availableInstanceIds.slice(),this._availableGeometryIds=e._availableGeometryIds.slice(),this._nextIndexStart=e._nextIndexStart,this._nextVertexStart=e._nextVertexStart,this._geometryCount=e._geometryCount,this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._indirectTexture=e._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(e,t,n,i,s){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;let r=i.getIndex(),o=r===null?1:r.array.BYTES_PER_ELEMENT,c=this._instanceInfo,l=this._multiDrawStarts,d=this._multiDrawCounts,h=this._geometryInfo,u=this.perObjectFrustumCulled,f=this._indirectTexture,m=f.image.data,g=n.isArrayCamera?gg:_f;u&&!n.isArrayCamera&&(mn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),_f.setFromProjectionMatrix(mn,n.coordinateSystem,n.reversedDepth));let b=0;if(this.sortObjects){mn.copy(this.matrixWorld).invert(),$s.setFromMatrixPosition(n.matrixWorld).applyMatrix4(mn),Mf.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(mn);for(let y=0,v=c.length;y<v;y++)if(c[y].visible&&c[y].active){let _=c[y].geometryIndex;this.getMatrixAt(y,mn),this.getBoundingSphereAt(_,ha).applyMatrix4(mn);let w=!1;if(u&&(w=!g.intersectsSphere(ha,n)),!w){let T=h[_],I=xg.subVectors(ha.center,$s).dot(Mf);Mh.push(T.start,T.count,I,y)}}let p=Mh.list,x=this.customSort;x===null?p.sort(s.transparent?mg:pg):x.call(this,p,n);for(let y=0,v=p.length;y<v;y++){let _=p[y];l[b]=_.start*o,d[b]=_.count,m[b]=_.index,b++}Mh.reset()}else for(let p=0,x=c.length;p<x;p++)if(c[p].visible&&c[p].active){let y=c[p].geometryIndex,v=!1;if(u&&(this.getMatrixAt(p,mn),this.getBoundingSphereAt(y,ha).applyMatrix4(mn),v=!g.intersectsSphere(ha,n)),!v){let _=h[y];l[b]=_.start*o,d[b]=_.count,m[b]=p,b++}}f.needsUpdate=!0,this._multiDrawCount=b,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,s,r){this.onBeforeRender(e,null,i,s,r)}},ps=class extends ln{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Jo=new C,Yo=new C,Sf=new de,er=new ni,Do=new yt,Sh=new C,wf=new C,va=class extends dt{constructor(e=new wt,t=new ps){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Jo.fromBufferAttribute(t,i-1),Yo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Jo.distanceTo(Yo);e.setAttribute("lineDistance",new Ct(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Do.copy(n.boundingSphere),Do.applyMatrix4(i),Do.radius+=s,e.ray.intersectsSphere(Do)===!1)return;Sf.copy(i).invert(),er.copy(e.ray).applyMatrix4(Sf);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,d=n.index,u=n.attributes.position;if(d!==null){let f=Math.max(0,r.start),m=Math.min(d.count,r.start+r.count);for(let g=f,b=m-1;g<b;g+=l){let p=d.getX(g),x=d.getX(g+1),y=Fo(this,e,er,c,p,x,g);y&&t.push(y)}if(this.isLineLoop){let g=d.getX(m-1),b=d.getX(f),p=Fo(this,e,er,c,g,b,m-1);p&&t.push(p)}}else{let f=Math.max(0,r.start),m=Math.min(u.count,r.start+r.count);for(let g=f,b=m-1;g<b;g+=l){let p=Fo(this,e,er,c,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){let g=Fo(this,e,er,c,m-1,f,m-1);g&&t.push(g)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function Fo(a,e,t,n,i,s,r){let o=a.geometry.attributes.position;if(Jo.fromBufferAttribute(o,i),Yo.fromBufferAttribute(o,s),t.distanceSqToSegment(Jo,Yo,Sh,wf)>n)return;Sh.applyMatrix4(a.matrixWorld);let l=e.ray.origin.distanceTo(Sh);if(!(l<e.near||l>e.far))return{distance:l,point:wf.clone().applyMatrix4(a.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:a}}var Tf=new C,Ef=new C,ms=class extends va{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Tf.fromBufferAttribute(t,i),Ef.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Tf.distanceTo(Ef);e.setAttribute("lineDistance",new Ct(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},pr=class extends va{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},bs=class extends ln{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Af=new de,Bh=new ni,Lo=new yt,ko=new C,ya=class extends dt{constructor(e=new wt,t=new bs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Lo.copy(n.boundingSphere),Lo.applyMatrix4(i),Lo.radius+=s,e.ray.intersectsSphere(Lo)===!1)return;Af.copy(i).invert(),Bh.copy(e.ray).applyMatrix4(Af);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){let u=Math.max(0,r.start),f=Math.min(l.count,r.start+r.count);for(let m=u,g=f;m<g;m++){let b=l.getX(m);ko.fromBufferAttribute(h,b),Rf(ko,b,c,i,e,t,this)}}else{let u=Math.max(0,r.start),f=Math.min(h.count,r.start+r.count);for(let m=u,g=f;m<g;m++)ko.fromBufferAttribute(h,m),Rf(ko,m,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function Rf(a,e,t,n,i,s,r){let o=Bh.distanceSqToPoint(a);if(o<t){let c=new C;Bh.closestPointToPoint(a,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}var mr=class extends Dt{constructor(e,t,n,i,s,r,o,c,l){super(e,t,n,i,s,r,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Ki=class extends Dt{constructor(e,t,n=Nn,i,s,r,o=Vt,c=Vt,l,d=ss,h=1){if(d!==ss&&d!==Ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:h};super(u,i,s,r,o,c,d,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new cs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},br=class extends Dt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var gr=class a extends wt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],r=[],o=[],c=[],l=new C,d=new re;r.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,u=3;h<=t;h++,u+=3){let f=n+h/t*i;l.x=e*Math.cos(f),l.y=e*Math.sin(f),r.push(l.x,l.y,l.z),o.push(0,0,1),d.x=(r[u]/e+1)/2,d.y=(r[u+1]/e+1)/2,c.push(d.x,d.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new Ct(r,3)),this.setAttribute("normal",new Ct(o,3)),this.setAttribute("uv",new Ct(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new a(e.radius,e.segments,e.thetaStart,e.thetaLength)}};var xr=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let r=1;r<=e;r++)n=this.getPoint(r/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,s=n.length,r;t?r=t:r=e*n[s-1];let o=0,c=s-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-r,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===r)return i/(s-1);let d=n[i],u=n[i+1]-d,f=(r-d)/u;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let r=this.getPoint(i),o=this.getPoint(s),c=t||(r.isVector2?new re:new C);return c.copy(o).sub(r).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new C,i=[],s=[],r=[],o=new C,c=new de;for(let f=0;f<=e;f++){let m=f/e;i[f]=this.getTangentAt(m,new C)}s[0]=new C,r[0]=new C;let l=Number.MAX_VALUE,d=Math.abs(i[0].x),h=Math.abs(i[0].y),u=Math.abs(i[0].z);d<=l&&(l=d,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),u<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),r[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),r[f]=r[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(Fe(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(o,m))}r[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(Fe(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let m=1;m<=e;m++)s[m].applyMatrix4(c.makeRotationAxis(i[m],f*m)),r[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}};function ld(){let a=0,e=0,t=0,n=0;function i(s,r,o,c){a=s,e=o,t=-3*s+3*r-2*o-c,n=2*s-2*r+o+c}return{initCatmullRom:function(s,r,o,c,l){i(r,o,l*(o-s),l*(c-r))},initNonuniformCatmullRom:function(s,r,o,c,l,d,h){let u=(r-s)/l-(o-s)/(l+d)+(o-r)/d,f=(o-r)/d-(c-r)/(d+h)+(c-o)/h;u*=d,f*=d,i(r,o,u,f)},calc:function(s){let r=s*s,o=r*s;return a+e*s+t*r+n*o}}}var No=new C,wh=new ld,Th=new ld,Eh=new ld,vr=class extends xr{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new C){let n=t,i=this.points,s=i.length,r=(s-(this.closed?0:1))*e,o=Math.floor(r),c=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:c===0&&o===s-1&&(o=s-2,c=1);let l,d;this.closed||o>0?l=i[(o-1)%s]:(No.subVectors(i[0],i[1]).add(i[0]),l=No);let h=i[o%s],u=i[(o+1)%s];if(this.closed||o+2<s?d=i[(o+2)%s]:(No.subVectors(i[s-1],i[s-2]).add(i[s-1]),d=No),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(l.distanceToSquared(h),f),g=Math.pow(h.distanceToSquared(u),f),b=Math.pow(u.distanceToSquared(d),f);g<1e-4&&(g=1),m<1e-4&&(m=g),b<1e-4&&(b=g),wh.initNonuniformCatmullRom(l.x,h.x,u.x,d.x,m,g,b),Th.initNonuniformCatmullRom(l.y,h.y,u.y,d.y,m,g,b),Eh.initNonuniformCatmullRom(l.z,h.z,u.z,d.z,m,g,b)}else this.curveType==="catmullrom"&&(wh.initCatmullRom(l.x,h.x,u.x,d.x,this.tension),Th.initCatmullRom(l.y,h.y,u.y,d.y,this.tension),Eh.initCatmullRom(l.z,h.z,u.z,d.z,this.tension));return n.set(wh.calc(c),Th.calc(c),Eh.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new C().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function yg(a,e){let t=1-a;return t*t*e}function _g(a,e){return 2*(1-a)*a*e}function Mg(a,e){return a*a*e}function Ah(a,e,t,n){return yg(a,e)+_g(a,t)+Mg(a,n)}var yr=class extends xr{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){let n=t,i=this.v0,s=this.v1,r=this.v2;return n.set(Ah(e,i.x,s.x,r.x),Ah(e,i.y,s.y,r.y),Ah(e,i.z,s.z,r.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}};var _a=class a extends wt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,r=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,d=c+1,h=e/o,u=t/c,f=[],m=[],g=[],b=[];for(let p=0;p<d;p++){let x=p*u-r;for(let y=0;y<l;y++){let v=y*h-s;m.push(v,-x,0),g.push(0,0,1),b.push(y/o),b.push(1-p/c)}}for(let p=0;p<c;p++)for(let x=0;x<o;x++){let y=x+l*p,v=x+l*(p+1),_=x+1+l*(p+1),w=x+1+l*p;f.push(y,v,w),f.push(v,_,w)}this.setIndex(f),this.setAttribute("position",new Ct(m,3)),this.setAttribute("normal",new Ct(g,3)),this.setAttribute("uv",new Ct(b,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new a(e.width,e.height,e.widthSegments,e.heightSegments)}};var _r=class extends ut{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},kn=class extends ln{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=al,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},xn=class extends kn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new re(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Fe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new fe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new fe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new fe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Mr=class extends ln{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=al,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cn,this.combine=pc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Zo=class extends ln{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=rp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Qo=class extends ln{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Uo(a,e){return!a||a.constructor===e?a:typeof e.BYTES_PER_ELEMENT=="number"?new e(a):Array.prototype.slice.call(a)}function Sg(a){return ArrayBuffer.isView(a)&&!(a instanceof DataView)}function wg(a){function e(i,s){return a[i]-a[s]}let t=a.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Cf(a,e,t){let n=a.length,i=new a.constructor(n);for(let s=0,r=0;r!==n;++s){let o=t[s]*e;for(let c=0;c!==e;++c)i[r++]=a[o+c]}return i}function vp(a,e,t,n){let i=1,s=a[0];for(;s!==void 0&&s[n]===void 0;)s=a[i++];if(s===void 0)return;let r=s[n];if(r!==void 0)if(Array.isArray(r))do r=s[n],r!==void 0&&(e.push(s.time),t.push(...r)),s=a[i++];while(s!==void 0);else if(r.toArray!==void 0)do r=s[n],r!==void 0&&(e.push(s.time),r.toArray(t,t.length)),s=a[i++];while(s!==void 0);else do r=s[n],r!==void 0&&(e.push(s.time),t.push(r)),s=a[i++];while(s!==void 0)}var wi=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let r;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}r=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}r=n,n=0;break t}break n}for(;n<r;){let o=n+r>>>1;e<t[o]?r=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let r=0;r!==i;++r)t[r]=n[s+r];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},$o=class extends wi{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Fh,endingEnd:Fh}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,r=e+1,o=i[s],c=i[r];if(o===void 0)switch(this.getSettings_().endingStart){case Lh:s=e,o=2*t-n;break;case kh:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Lh:r=e,c=2*n-t;break;case kh:r=1,c=n+i[1]-i[0];break;default:r=e-1,c=t}let l=(n-t)*.5,d=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*d,this._offsetNext=r*d}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,d=this._offsetPrev,h=this._offsetNext,u=this._weightPrev,f=this._weightNext,m=(n-t)/(i-t),g=m*m,b=g*m,p=-u*b+2*u*g-u*m,x=(1+u)*b+(-1.5-2*u)*g+(-.5+u)*m+1,y=(-1-f)*b+(1.5+f)*g+.5*m,v=f*b-f*g;for(let _=0;_!==o;++_)s[_]=p*r[d+_]+x*r[l+_]+y*r[c+_]+v*r[h+_];return s}},ec=class extends wi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,d=(n-t)/(i-t),h=1-d;for(let u=0;u!==o;++u)s[u]=r[l+u]*h+r[c+u]*d;return s}},tc=class extends wi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},vn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Uo(t,this.TimeBufferType),this.values=Uo(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Uo(e.times,Array),values:Uo(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new tc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ec(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new $o(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case pa:t=this.InterpolantFactoryMethodDiscrete;break;case ma:t=this.InterpolantFactoryMethodLinear;break;case Oo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return pa;case this.InterpolantFactoryMethodLinear:return ma;case this.InterpolantFactoryMethodSmooth:return Oo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,r=i-1;for(;s!==i&&n[s]<e;)++s;for(;r!==-1&&n[r]>t;)--r;if(++r,s!==0||r!==i){s>=r&&(r=Math.max(r,1),s=r-1);let o=this.getValueSize();this.times=n.slice(s,r),this.values=this.values.slice(s*o,r*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let r=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(r!==null&&r>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,r),e=!1;break}r=c}if(i!==void 0&&Sg(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Oo,s=e.length-1,r=1;for(let o=1;o<s;++o){let c=!1,l=e[o],d=e[o+1];if(l!==d&&(o!==1||l!==e[0]))if(i)c=!0;else{let h=o*n,u=h-n,f=h+n;for(let m=0;m!==n;++m){let g=t[h+m];if(g!==t[u+m]||g!==t[f+m]){c=!0;break}}}if(c){if(o!==r){e[r]=e[o];let h=o*n,u=r*n;for(let f=0;f!==n;++f)t[u+f]=t[h+f]}++r}}if(s>0){e[r]=e[s];for(let o=s*n,c=r*n,l=0;l!==n;++l)t[c+l]=t[o+l];++r}return r!==e.length?(this.times=e.slice(0,r),this.values=t.slice(0,r*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};vn.prototype.ValueTypeName="";vn.prototype.TimeBufferType=Float32Array;vn.prototype.ValueBufferType=Float32Array;vn.prototype.DefaultInterpolation=ma;var Ti=class extends vn{constructor(e,t,n){super(e,t,n)}};Ti.prototype.ValueTypeName="bool";Ti.prototype.ValueBufferType=Array;Ti.prototype.DefaultInterpolation=pa;Ti.prototype.InterpolantFactoryMethodLinear=void 0;Ti.prototype.InterpolantFactoryMethodSmooth=void 0;var Sr=class extends vn{constructor(e,t,n,i){super(e,t,n,i)}};Sr.prototype.ValueTypeName="color";var ii=class extends vn{constructor(e,t,n,i){super(e,t,n,i)}};ii.prototype.ValueTypeName="number";var nc=class extends wi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let d=l+o;l!==d;l+=4)on.slerpFlat(s,0,r,l-o,r,l,c);return s}},ai=class extends vn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new nc(this.times,this.values,this.getValueSize(),e)}};ai.prototype.ValueTypeName="quaternion";ai.prototype.InterpolantFactoryMethodSmooth=void 0;var Ei=class extends vn{constructor(e,t,n){super(e,t,n)}};Ei.prototype.ValueTypeName="string";Ei.prototype.ValueBufferType=Array;Ei.prototype.DefaultInterpolation=pa;Ei.prototype.InterpolantFactoryMethodLinear=void 0;Ei.prototype.InterpolantFactoryMethodSmooth=void 0;var si=class extends vn{constructor(e,t,n,i){super(e,t,n,i)}};si.prototype.ValueTypeName="vector";var wr=class{constructor(e="",t=-1,n=[],i=sp){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Wn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let r=0,o=n.length;r!==o;++r)t.push(Eg(n[r]).scale(i));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,r=n.length;s!==r;++s)t.push(vn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let s=t.length,r=[];for(let o=0;o<s;o++){let c=[],l=[];c.push((o+s-1)%s,o,(o+1)%s),l.push(0,1,0);let d=wg(c);c=Cf(c,1,d),l=Cf(l,1,d),!i&&c[0]===0&&(c.push(s),l.push(l[0])),r.push(new ii(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,r)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],d=l.name.match(s);if(d&&d.length>1){let h=d[1],u=i[h];u||(i[h]=u=[]),u.push(l)}}let r=[];for(let o in i)r.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return r}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,u,f,m,g){if(f.length!==0){let b=[],p=[];vp(f,b,p,m),b.length!==0&&g.push(new h(u,b,p))}},i=[],s=e.name||"default",r=e.fps||30,o=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let h=0;h<l.length;h++){let u=l[h].keys;if(!(!u||u.length===0))if(u[0].morphTargets){let f={},m;for(m=0;m<u.length;m++)if(u[m].morphTargets)for(let g=0;g<u[m].morphTargets.length;g++)f[u[m].morphTargets[g]]=-1;for(let g in f){let b=[],p=[];for(let x=0;x!==u[m].morphTargets.length;++x){let y=u[m];b.push(y.time),p.push(y.morphTarget===g?1:0)}i.push(new ii(".morphTargetInfluence["+g+"]",b,p))}c=f.length*r}else{let f=".bones["+t[h].name+"]";n(si,f+".position",u,"pos",i),n(ai,f+".quaternion",u,"rot",i),n(si,f+".scale",u,"scl",i)}}return i.length===0?null:new this(s,c,i,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Tg(a){switch(a.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ii;case"vector":case"vector2":case"vector3":case"vector4":return si;case"color":return Sr;case"quaternion":return ai;case"bool":case"boolean":return Ti;case"string":return Ei}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+a)}function Eg(a){if(a.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Tg(a.type);if(a.times===void 0){let t=[],n=[];vp(a.keys,t,n,"value"),a.times=t,a.values=n}return e.parse!==void 0?e.parse(a):new e(a.name,a.times,a.values,a.interpolation)}var ti={enabled:!1,files:{},add:function(a,e){this.enabled!==!1&&(this.files[a]=e)},get:function(a){if(this.enabled!==!1)return this.files[a]},remove:function(a){delete this.files[a]},clear:function(){this.files={}}},ic=class{constructor(e,t,n){let i=this,s=!1,r=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(d){o++,s===!1&&i.onStart!==void 0&&i.onStart(d,r,o),s=!0},this.itemEnd=function(d){r++,i.onProgress!==void 0&&i.onProgress(d,r,o),r===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(d){i.onError!==void 0&&i.onError(d)},this.resolveURL=function(d){return c?c(d):d},this.setURLModifier=function(d){return c=d,this},this.addHandler=function(d,h){return l.push(d,h),this},this.removeHandler=function(d){let h=l.indexOf(d);return h!==-1&&l.splice(h,2),this},this.getHandler=function(d){for(let h=0,u=l.length;h<u;h+=2){let f=l[h],m=l[h+1];if(f.global&&(f.lastIndex=0),f.test(d))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},yp=new ic,ri=class{constructor(e){this.manager=e!==void 0?e:yp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ri.DEFAULT_MATERIAL_NAME="__DEFAULT";var vi={},Oh=class extends Error{constructor(e,t){super(e),this.response=t}},gs=class extends ri{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=ti.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(vi[e]!==void 0){vi[e].push({onLoad:t,onProgress:n,onError:i});return}vi[e]=[],vi[e].push({onLoad:t,onProgress:n,onError:i});let r=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(r).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let d=vi[e],h=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=u?parseInt(u):0,m=f!==0,g=0,b=new ReadableStream({start(p){x();function x(){h.read().then(({done:y,value:v})=>{if(y)p.close();else{g+=v.byteLength;let _=new ProgressEvent("progress",{lengthComputable:m,loaded:g,total:f});for(let w=0,T=d.length;w<T;w++){let I=d[w];I.onProgress&&I.onProgress(_)}p.enqueue(v),x()}},y=>{p.error(y)})}}});return new Response(b)}else throw new Oh(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(d=>new DOMParser().parseFromString(d,o));case"json":return l.json();default:if(o==="")return l.text();{let h=/charset="?([^;"\s]*)"?/i.exec(o),u=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(u);return l.arrayBuffer().then(m=>f.decode(m))}}}).then(l=>{ti.add(`file:${e}`,l);let d=vi[e];delete vi[e];for(let h=0,u=d.length;h<u;h++){let f=d[h];f.onLoad&&f.onLoad(l)}}).catch(l=>{let d=vi[e];if(d===void 0)throw this.manager.itemError(e),l;delete vi[e];for(let h=0,u=d.length;h<u;h++){let f=d[h];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var es=new WeakMap,ac=class extends ri{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,r=ti.get(`image:${e}`);if(r!==void 0){if(r.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0);else{let h=es.get(r);h===void 0&&(h=[],es.set(r,h)),h.push({onLoad:t,onError:i})}return r}let o=rs("img");function c(){d(),t&&t(this);let h=es.get(this)||[];for(let u=0;u<h.length;u++){let f=h[u];f.onLoad&&f.onLoad(this)}es.delete(this),s.manager.itemEnd(e)}function l(h){d(),i&&i(h),ti.remove(`image:${e}`);let u=es.get(this)||[];for(let f=0;f<u.length;f++){let m=u[f];m.onError&&m.onError(h)}es.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function d(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ti.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}};var Tr=class extends ri{constructor(e){super(e)}load(e,t,n,i){let s=new Dt,r=new ac(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}},Ma=class extends dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new fe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Er=class extends Ma{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new fe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Rh=new de,If=new C,Pf=new C,Ar=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new re(512,512),this.mapType=Kn,this.map=null,this.mapPass=null,this.matrix=new de,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qi,this._frameExtents=new re(1,1),this._viewportCount=1,this._viewports=[new Xe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;If.setFromMatrixPosition(e.matrixWorld),t.position.copy(If),Pf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Pf),t.updateMatrixWorld(),Rh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Rh,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Rh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},zh=class extends Ar{constructor(){super(new Rt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=ba*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Rr=class extends Ma{constructor(e,t,n=0,i=Math.PI/3,s=0,r=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=r,this.map=null,this.shadow=new zh}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Df=new de,tr=new C,Ch=new C,jh=class extends Ar{constructor(){super(new Rt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new re(4,2),this._viewportCount=6,this._viewports=[new Xe(2,1,1,1),new Xe(0,1,1,1),new Xe(3,1,1,1),new Xe(1,1,1,1),new Xe(3,0,1,1),new Xe(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),tr.setFromMatrixPosition(e.matrixWorld),n.position.copy(tr),Ch.copy(n.position),Ch.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ch),n.updateMatrixWorld(),i.makeTranslation(-tr.x,-tr.y,-tr.z),Df.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Df,n.coordinateSystem,n.reversedDepth)}},Ai=class extends Ma{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new jh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Ri=class extends ga{constructor(e=-1,t=1,n=1,i=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,r=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,r=s+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Vh=class extends Ar{constructor(){super(new Ri(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ci=class extends Ma{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.shadow=new Vh}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Ii=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},Cr=class extends wt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var Ih=new WeakMap,Ir=class extends ri{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,r=ti.get(`image-bitmap:${e}`);if(r!==void 0){if(s.manager.itemStart(e),r.then){r.then(l=>{if(Ih.has(r)===!0)i&&i(Ih.get(r)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(l),s.manager.itemEnd(e),l});return}return setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0),r}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){return ti.add(`image-bitmap:${e}`,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){i&&i(l),Ih.set(c,l),ti.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});ti.add(`image-bitmap:${e}`,c),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var sc=class extends Rt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Pr=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};var hd="\\[\\]\\.:\\/",Ag=new RegExp("["+hd+"]","g"),dd="[^"+hd+"]",Rg="[^"+hd.replace("\\.","")+"]",Cg=/((?:WC+[\/:])*)/.source.replace("WC",dd),Ig=/(WCOD+)?/.source.replace("WCOD",Rg),Pg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",dd),Dg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",dd),Fg=new RegExp("^"+Cg+Ig+Pg+Dg+"$"),Lg=["material","materials","bones","map"],Gh=class{constructor(e,t,n){let i=n||rt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},rt=class a{constructor(e,t,n){this.path=t,this.parsedPath=n||a.parseTrackName(t),this.node=a.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new a.Composite(e,t,n):new a(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Ag,"")}static parseTrackName(e){let t=Fg.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);Lg.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let r=0;r<s.length;r++){let o=s[r];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=a.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===l){l=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let r=e[i];if(r===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else r.fromArray!==void 0&&r.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(c=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};rt.Composite=Gh;rt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};rt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};rt.prototype.GetterByBindingType=[rt.prototype._getValue_direct,rt.prototype._getValue_array,rt.prototype._getValue_arrayElement,rt.prototype._getValue_toArray];rt.prototype.SetterByBindingTypeAndVersioning=[[rt.prototype._setValue_direct,rt.prototype._setValue_direct_setNeedsUpdate,rt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_array,rt.prototype._setValue_array_setNeedsUpdate,rt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_arrayElement,rt.prototype._setValue_arrayElement_setNeedsUpdate,rt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_fromArray,rt.prototype._setValue_fromArray_setNeedsUpdate,rt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var mM=new Float32Array(1);var Ff=new de,Dr=class{constructor(e,t,n=0,i=1/0){this.ray=new ni(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new ls,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ff.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ff),this}intersectObject(e,t=!0,n=[]){return Hh(e,this,n,t),n.sort(Lf),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)Hh(e[i],this,n,t);return n.sort(Lf),n}};function Lf(a,e){return a.distance-e.distance}function Hh(a,e,t,n){let i=!0;if(a.layers.test(e.layers)&&a.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let s=a.children;for(let r=0,o=s.length;r<o;r++)Hh(s[r],e,t,!0)}}var Fr=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Fe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Fe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var kf=new C,Bo=new C,ts=new C,ns=new C,Ph=new C,kg=new C,Ng=new C,dn=class{constructor(e=new C,t=new C){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){kf.subVectors(e,this.start),Bo.subVectors(this.end,this.start);let n=Bo.dot(Bo),s=Bo.dot(kf)/n;return t&&(s=Fe(s,0,1)),s}closestPointToPoint(e,t,n){let i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(e,t=kg,n=Ng){let i=10000000000000001e-32,s,r,o=this.start,c=e.start,l=this.end,d=e.end;ts.subVectors(l,o),ns.subVectors(d,c),Ph.subVectors(o,c);let h=ts.dot(ts),u=ns.dot(ns),f=ns.dot(Ph);if(h<=i&&u<=i)return t.copy(o),n.copy(c),t.sub(n),t.dot(t);if(h<=i)s=0,r=f/u,r=Fe(r,0,1);else{let m=ts.dot(Ph);if(u<=i)r=0,s=Fe(-m/h,0,1);else{let g=ts.dot(ns),b=h*u-g*g;b!==0?s=Fe((g*f-m*u)/b,0,1):s=0,r=(g*s+f)/u,r<0?(r=0,s=Fe(-m/h,0,1)):r>1&&(r=1,s=Fe((g-m)/h,0,1))}}return t.copy(o).add(ts.multiplyScalar(s)),n.copy(c).add(ns.multiplyScalar(r)),t.sub(n),t.dot(t)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};function ud(a,e,t,n){let i=Ug(n);switch(t){case ed:return a*e;case Ac:return a*e/i.components*i.byteLength;case kr:return a*e/i.components*i.byteLength;case nd:return a*e*2/i.components*i.byteLength;case Rc:return a*e*2/i.components*i.byteLength;case td:return a*e*3/i.components*i.byteLength;case rn:return a*e*4/i.components*i.byteLength;case Cc:return a*e*4/i.components*i.byteLength;case Nr:case Ur:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*8;case Br:case Or:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case Pc:case Fc:return Math.max(a,16)*Math.max(e,8)/4;case Ic:case Dc:return Math.max(a,8)*Math.max(e,8)/2;case Lc:case kc:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*8;case Nc:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case Uc:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case Bc:return Math.floor((a+4)/5)*Math.floor((e+3)/4)*16;case Oc:return Math.floor((a+4)/5)*Math.floor((e+4)/5)*16;case zc:return Math.floor((a+5)/6)*Math.floor((e+4)/5)*16;case jc:return Math.floor((a+5)/6)*Math.floor((e+5)/6)*16;case Vc:return Math.floor((a+7)/8)*Math.floor((e+4)/5)*16;case Gc:return Math.floor((a+7)/8)*Math.floor((e+5)/6)*16;case Hc:return Math.floor((a+7)/8)*Math.floor((e+7)/8)*16;case Wc:return Math.floor((a+9)/10)*Math.floor((e+4)/5)*16;case Xc:return Math.floor((a+9)/10)*Math.floor((e+5)/6)*16;case qc:return Math.floor((a+9)/10)*Math.floor((e+7)/8)*16;case Kc:return Math.floor((a+9)/10)*Math.floor((e+9)/10)*16;case Jc:return Math.floor((a+11)/12)*Math.floor((e+9)/10)*16;case Yc:return Math.floor((a+11)/12)*Math.floor((e+11)/12)*16;case Zc:case Qc:case $c:return Math.ceil(a/4)*Math.ceil(e/4)*16;case el:case tl:return Math.ceil(a/4)*Math.ceil(e/4)*8;case nl:case il:return Math.ceil(a/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ug(a){switch(a){case Kn:case Yh:return{byteLength:1,components:1};case _s:case Zh:case en:return{byteLength:2,components:1};case Tc:case Ec:return{byteLength:2,components:4};case Nn:case wc:case gn:return{byteLength:4,components:1};case Qh:case $h:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${a}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Hp(){let a=null,e=!1,t=null,n=null;function i(s,r){t(s,r),n=a.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=a.requestAnimationFrame(i),e=!0)},stop:function(){a.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){a=s}}}function Bg(a){let e=new WeakMap;function t(o,c){let l=o.array,d=o.usage,h=l.byteLength,u=a.createBuffer();a.bindBuffer(c,u),a.bufferData(c,l,d),o.onUploadCallback();let f;if(l instanceof Float32Array)f=a.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=a.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=a.HALF_FLOAT:f=a.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=a.SHORT;else if(l instanceof Uint32Array)f=a.UNSIGNED_INT;else if(l instanceof Int32Array)f=a.INT;else if(l instanceof Int8Array)f=a.BYTE;else if(l instanceof Uint8Array)f=a.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=a.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){let d=c.array,h=c.updateRanges;if(a.bindBuffer(l,o),h.length===0)a.bufferSubData(l,0,d);else{h.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<h.length;f++){let m=h[u],g=h[f];g.start<=m.start+m.count+1?m.count=Math.max(m.count,g.start+g.count-m.start):(++u,h[u]=g)}h.length=u+1;for(let f=0,m=h.length;f<m;f++){let g=h[f];a.bufferSubData(l,g.start*d.BYTES_PER_ELEMENT,d,g.start,g.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(a.deleteBuffer(c.buffer),e.delete(o))}function r(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:s,update:r}}var Og=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zg=`#ifdef USE_ALPHAHASH
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
#endif`,jg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Vg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Hg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wg=`#ifdef USE_AOMAP
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
#endif`,Xg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qg=`#ifdef USE_BATCHING
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
#endif`,Kg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Jg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Yg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Qg=`#ifdef USE_IRIDESCENCE
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
#endif`,$g=`#ifdef USE_BUMPMAP
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
#endif`,ex=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,tx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,nx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ix=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ax=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,sx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,rx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ox=`#if defined( USE_COLOR_ALPHA )
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
#endif`,cx=`#define PI 3.141592653589793
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
} // validated`,lx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,hx=`vec3 transformedNormal = objectNormal;
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
#endif`,dx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ux=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,px=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,mx="gl_FragColor = linearToOutputTexel( gl_FragColor );",bx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,gx=`#ifdef USE_ENVMAP
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
#endif`,xx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,vx=`#ifdef USE_ENVMAP
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
#endif`,yx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_x=`#ifdef USE_ENVMAP
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
#endif`,Mx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Sx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Tx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ex=`#ifdef USE_GRADIENTMAP
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
}`,Ax=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Rx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Cx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ix=`uniform bool receiveShadow;
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
#endif`,Px=`#ifdef USE_ENVMAP
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
#endif`,Dx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Lx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,kx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Nx=`PhysicalMaterial material;
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
#endif`,Ux=`struct PhysicalMaterial {
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
}`,Bx=`
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
#endif`,Ox=`#if defined( RE_IndirectDiffuse )
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
#endif`,zx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,jx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Vx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Wx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Xx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Kx=`#if defined( USE_POINTS_UV )
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
#endif`,Jx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Yx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Zx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Qx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$x=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ev=`#ifdef USE_MORPHTARGETS
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
#endif`,tv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,iv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,av=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ov=`#ifdef USE_NORMALMAP
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
#endif`,cv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,dv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,uv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,pv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_v=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Mv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Sv=`float getShadowMask() {
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
}`,wv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Tv=`#ifdef USE_SKINNING
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
#endif`,Ev=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Av=`#ifdef USE_SKINNING
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
#endif`,Rv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Cv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Iv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Pv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Dv=`#ifdef USE_TRANSMISSION
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
#endif`,Fv=`#ifdef USE_TRANSMISSION
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
#endif`,Lv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,kv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Uv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Bv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ov=`uniform sampler2D t2D;
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
}`,zv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Vv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hv=`#include <common>
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
}`,Wv=`#if DEPTH_PACKING == 3200
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
}`,Xv=`#define DISTANCE
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
}`,qv=`#define DISTANCE
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
}`,Kv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Jv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yv=`uniform float scale;
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
}`,Zv=`uniform vec3 diffuse;
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
}`,Qv=`#include <common>
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
}`,$v=`uniform vec3 diffuse;
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
}`,ey=`#define LAMBERT
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
}`,ty=`#define LAMBERT
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
}`,ny=`#define MATCAP
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
}`,iy=`#define MATCAP
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
}`,ay=`#define NORMAL
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
}`,sy=`#define NORMAL
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
}`,ry=`#define PHONG
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
}`,oy=`#define PHONG
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
}`,cy=`#define STANDARD
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
}`,ly=`#define STANDARD
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
}`,hy=`#define TOON
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
}`,dy=`#define TOON
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
}`,uy=`uniform float size;
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
}`,fy=`uniform vec3 diffuse;
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
}`,py=`#include <common>
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
}`,my=`uniform vec3 color;
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
}`,by=`uniform float rotation;
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
}`,gy=`uniform vec3 diffuse;
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
}`,Ve={alphahash_fragment:Og,alphahash_pars_fragment:zg,alphamap_fragment:jg,alphamap_pars_fragment:Vg,alphatest_fragment:Gg,alphatest_pars_fragment:Hg,aomap_fragment:Wg,aomap_pars_fragment:Xg,batching_pars_vertex:qg,batching_vertex:Kg,begin_vertex:Jg,beginnormal_vertex:Yg,bsdfs:Zg,iridescence_fragment:Qg,bumpmap_pars_fragment:$g,clipping_planes_fragment:ex,clipping_planes_pars_fragment:tx,clipping_planes_pars_vertex:nx,clipping_planes_vertex:ix,color_fragment:ax,color_pars_fragment:sx,color_pars_vertex:rx,color_vertex:ox,common:cx,cube_uv_reflection_fragment:lx,defaultnormal_vertex:hx,displacementmap_pars_vertex:dx,displacementmap_vertex:ux,emissivemap_fragment:fx,emissivemap_pars_fragment:px,colorspace_fragment:mx,colorspace_pars_fragment:bx,envmap_fragment:gx,envmap_common_pars_fragment:xx,envmap_pars_fragment:vx,envmap_pars_vertex:yx,envmap_physical_pars_fragment:Px,envmap_vertex:_x,fog_vertex:Mx,fog_pars_vertex:Sx,fog_fragment:wx,fog_pars_fragment:Tx,gradientmap_pars_fragment:Ex,lightmap_pars_fragment:Ax,lights_lambert_fragment:Rx,lights_lambert_pars_fragment:Cx,lights_pars_begin:Ix,lights_toon_fragment:Dx,lights_toon_pars_fragment:Fx,lights_phong_fragment:Lx,lights_phong_pars_fragment:kx,lights_physical_fragment:Nx,lights_physical_pars_fragment:Ux,lights_fragment_begin:Bx,lights_fragment_maps:Ox,lights_fragment_end:zx,logdepthbuf_fragment:jx,logdepthbuf_pars_fragment:Vx,logdepthbuf_pars_vertex:Gx,logdepthbuf_vertex:Hx,map_fragment:Wx,map_pars_fragment:Xx,map_particle_fragment:qx,map_particle_pars_fragment:Kx,metalnessmap_fragment:Jx,metalnessmap_pars_fragment:Yx,morphinstance_vertex:Zx,morphcolor_vertex:Qx,morphnormal_vertex:$x,morphtarget_pars_vertex:ev,morphtarget_vertex:tv,normal_fragment_begin:nv,normal_fragment_maps:iv,normal_pars_fragment:av,normal_pars_vertex:sv,normal_vertex:rv,normalmap_pars_fragment:ov,clearcoat_normal_fragment_begin:cv,clearcoat_normal_fragment_maps:lv,clearcoat_pars_fragment:hv,iridescence_pars_fragment:dv,opaque_fragment:uv,packing:fv,premultiplied_alpha_fragment:pv,project_vertex:mv,dithering_fragment:bv,dithering_pars_fragment:gv,roughnessmap_fragment:xv,roughnessmap_pars_fragment:vv,shadowmap_pars_fragment:yv,shadowmap_pars_vertex:_v,shadowmap_vertex:Mv,shadowmask_pars_fragment:Sv,skinbase_vertex:wv,skinning_pars_vertex:Tv,skinning_vertex:Ev,skinnormal_vertex:Av,specularmap_fragment:Rv,specularmap_pars_fragment:Cv,tonemapping_fragment:Iv,tonemapping_pars_fragment:Pv,transmission_fragment:Dv,transmission_pars_fragment:Fv,uv_pars_fragment:Lv,uv_pars_vertex:kv,uv_vertex:Nv,worldpos_vertex:Uv,background_vert:Bv,background_frag:Ov,backgroundCube_vert:zv,backgroundCube_frag:jv,cube_vert:Vv,cube_frag:Gv,depth_vert:Hv,depth_frag:Wv,distanceRGBA_vert:Xv,distanceRGBA_frag:qv,equirect_vert:Kv,equirect_frag:Jv,linedashed_vert:Yv,linedashed_frag:Zv,meshbasic_vert:Qv,meshbasic_frag:$v,meshlambert_vert:ey,meshlambert_frag:ty,meshmatcap_vert:ny,meshmatcap_frag:iy,meshnormal_vert:ay,meshnormal_frag:sy,meshphong_vert:ry,meshphong_frag:oy,meshphysical_vert:cy,meshphysical_frag:ly,meshtoon_vert:hy,meshtoon_frag:dy,points_vert:uy,points_frag:fy,shadow_vert:py,shadow_frag:my,sprite_vert:by,sprite_frag:gy},se={common:{diffuse:{value:new fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new fe(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},ci={basic:{uniforms:tn([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:tn([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new fe(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:tn([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new fe(0)},specular:{value:new fe(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:tn([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:tn([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new fe(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:tn([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:tn([se.points,se.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:tn([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:tn([se.common,se.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:tn([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:tn([se.sprite,se.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:tn([se.common,se.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:tn([se.lights,se.fog,{color:{value:new fe(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};ci.physical={uniforms:tn([ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new fe(0)},specularColor:{value:new fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};var sl={r:0,b:0,g:0},Aa=new cn,xy=new de;function vy(a,e,t,n,i,s,r){let o=new fe(0),c=s===!0?0:1,l,d,h=null,u=0,f=null;function m(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?t:e).get(v)),v}function g(y){let v=!1,_=m(y);_===null?p(o,c):_&&_.isColor&&(p(_,1),v=!0);let w=a.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(a.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil))}function b(y,v){let _=m(v);_&&(_.isCubeTexture||_.mapping===Lr)?(d===void 0&&(d=new ze(new En(1,1,1),new ut({name:"BackgroundCubeMaterial",uniforms:Ea(ci.backgroundCube.uniforms),vertexShader:ci.backgroundCube.vertexShader,fragmentShader:ci.backgroundCube.fragmentShader,side:Ft,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(w,T,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(d)),Aa.copy(v.backgroundRotation),Aa.x*=-1,Aa.y*=-1,Aa.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Aa.y*=-1,Aa.z*=-1),d.material.uniforms.envMap.value=_,d.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(xy.makeRotationFromEuler(Aa)),d.material.toneMapped=Ge.getTransfer(_.colorSpace)!==$e,(h!==_||u!==_.version||f!==a.toneMapping)&&(d.material.needsUpdate=!0,h=_,u=_.version,f=a.toneMapping),d.layers.enableAll(),y.unshift(d,d.geometry,d.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new ze(new _a(2,2),new ut({name:"BackgroundMaterial",uniforms:Ea(ci.background.uniforms),vertexShader:ci.background.vertexShader,fragmentShader:ci.background.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=Ge.getTransfer(_.colorSpace)!==$e,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||u!==_.version||f!==a.toneMapping)&&(l.material.needsUpdate=!0,h=_,u=_.version,f=a.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,v){y.getRGB(sl,cd(a)),n.buffers.color.setClear(sl.r,sl.g,sl.b,v,r)}function x(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,v=1){o.set(y),c=v,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(o,c)},render:g,addToRenderList:b,dispose:x}}function yy(a,e){let t=a.getParameter(a.MAX_VERTEX_ATTRIBS),n={},i=u(null),s=i,r=!1;function o(S,R,D,L,U){let z=!1,j=h(L,D,R);s!==j&&(s=j,l(s.object)),z=f(S,L,D,U),z&&m(S,L,D,U),U!==null&&e.update(U,a.ELEMENT_ARRAY_BUFFER),(z||r)&&(r=!1,v(S,R,D,L),U!==null&&a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function c(){return a.createVertexArray()}function l(S){return a.bindVertexArray(S)}function d(S){return a.deleteVertexArray(S)}function h(S,R,D){let L=D.wireframe===!0,U=n[S.id];U===void 0&&(U={},n[S.id]=U);let z=U[R.id];z===void 0&&(z={},U[R.id]=z);let j=z[L];return j===void 0&&(j=u(c()),z[L]=j),j}function u(S){let R=[],D=[],L=[];for(let U=0;U<t;U++)R[U]=0,D[U]=0,L[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:D,attributeDivisors:L,object:S,attributes:{},index:null}}function f(S,R,D,L){let U=s.attributes,z=R.attributes,j=0,J=D.getAttributes();for(let H in J)if(J[H].location>=0){let le=U[H],xe=z[H];if(xe===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(xe=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(xe=S.instanceColor)),le===void 0||le.attribute!==xe||xe&&le.data!==xe.data)return!0;j++}return s.attributesNum!==j||s.index!==L}function m(S,R,D,L){let U={},z=R.attributes,j=0,J=D.getAttributes();for(let H in J)if(J[H].location>=0){let le=z[H];le===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(le=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(le=S.instanceColor));let xe={};xe.attribute=le,le&&le.data&&(xe.data=le.data),U[H]=xe,j++}s.attributes=U,s.attributesNum=j,s.index=L}function g(){let S=s.newAttributes;for(let R=0,D=S.length;R<D;R++)S[R]=0}function b(S){p(S,0)}function p(S,R){let D=s.newAttributes,L=s.enabledAttributes,U=s.attributeDivisors;D[S]=1,L[S]===0&&(a.enableVertexAttribArray(S),L[S]=1),U[S]!==R&&(a.vertexAttribDivisor(S,R),U[S]=R)}function x(){let S=s.newAttributes,R=s.enabledAttributes;for(let D=0,L=R.length;D<L;D++)R[D]!==S[D]&&(a.disableVertexAttribArray(D),R[D]=0)}function y(S,R,D,L,U,z,j){j===!0?a.vertexAttribIPointer(S,R,D,U,z):a.vertexAttribPointer(S,R,D,L,U,z)}function v(S,R,D,L){g();let U=L.attributes,z=D.getAttributes(),j=R.defaultAttributeValues;for(let J in z){let H=z[J];if(H.location>=0){let Q=U[J];if(Q===void 0&&(J==="instanceMatrix"&&S.instanceMatrix&&(Q=S.instanceMatrix),J==="instanceColor"&&S.instanceColor&&(Q=S.instanceColor)),Q!==void 0){let le=Q.normalized,xe=Q.itemSize,Ne=e.get(Q);if(Ne===void 0)continue;let it=Ne.buffer,lt=Ne.type,Ze=Ne.bytesPerElement,q=lt===a.INT||lt===a.UNSIGNED_INT||Q.gpuType===wc;if(Q.isInterleavedBufferAttribute){let Z=Q.data,me=Z.stride,Le=Q.offset;if(Z.isInstancedInterleavedBuffer){for(let Te=0;Te<H.locationSize;Te++)p(H.location+Te,Z.meshPerAttribute);S.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let Te=0;Te<H.locationSize;Te++)b(H.location+Te);a.bindBuffer(a.ARRAY_BUFFER,it);for(let Te=0;Te<H.locationSize;Te++)y(H.location+Te,xe/H.locationSize,lt,le,me*Ze,(Le+xe/H.locationSize*Te)*Ze,q)}else{if(Q.isInstancedBufferAttribute){for(let Z=0;Z<H.locationSize;Z++)p(H.location+Z,Q.meshPerAttribute);S.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let Z=0;Z<H.locationSize;Z++)b(H.location+Z);a.bindBuffer(a.ARRAY_BUFFER,it);for(let Z=0;Z<H.locationSize;Z++)y(H.location+Z,xe/H.locationSize,lt,le,xe*Ze,xe/H.locationSize*Z*Ze,q)}}else if(j!==void 0){let le=j[J];if(le!==void 0)switch(le.length){case 2:a.vertexAttrib2fv(H.location,le);break;case 3:a.vertexAttrib3fv(H.location,le);break;case 4:a.vertexAttrib4fv(H.location,le);break;default:a.vertexAttrib1fv(H.location,le)}}}}x()}function _(){I();for(let S in n){let R=n[S];for(let D in R){let L=R[D];for(let U in L)d(L[U].object),delete L[U];delete R[D]}delete n[S]}}function w(S){if(n[S.id]===void 0)return;let R=n[S.id];for(let D in R){let L=R[D];for(let U in L)d(L[U].object),delete L[U];delete R[D]}delete n[S.id]}function T(S){for(let R in n){let D=n[R];if(D[S.id]===void 0)continue;let L=D[S.id];for(let U in L)d(L[U].object),delete L[U];delete D[S.id]}}function I(){M(),r=!0,s!==i&&(s=i,l(s.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:I,resetDefaultState:M,dispose:_,releaseStatesOfGeometry:w,releaseStatesOfProgram:T,initAttributes:g,enableAttribute:b,disableUnusedAttributes:x}}function _y(a,e,t){let n;function i(l){n=l}function s(l,d){a.drawArrays(n,l,d),t.update(d,n,1)}function r(l,d,h){h!==0&&(a.drawArraysInstanced(n,l,d,h),t.update(d,n,h))}function o(l,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,d,0,h);let f=0;for(let m=0;m<h;m++)f+=d[m];t.update(f,n,1)}function c(l,d,h,u){if(h===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<l.length;m++)r(l[m],d[m],u[m]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,d,0,u,0,h);let m=0;for(let g=0;g<h;g++)m+=d[g]*u[g];t.update(m,n,1)}}this.setMode=i,this.render=s,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function My(a,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let T=e.get("EXT_texture_filter_anisotropic");i=a.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(T){return!(T!==rn&&n.convert(T)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){let I=T===en&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Kn&&n.convert(T)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==gn&&!I)}function c(T){if(T==="highp"){if(a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.HIGH_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.MEDIUM_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",d=c(l);d!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);let h=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS),m=a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=a.getParameter(a.MAX_TEXTURE_SIZE),b=a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE),p=a.getParameter(a.MAX_VERTEX_ATTRIBS),x=a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS),y=a.getParameter(a.MAX_VARYING_VECTORS),v=a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS),_=m>0,w=a.getParameter(a.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:r,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:g,maxCubemapSize:b,maxAttributes:p,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:v,vertexTextures:_,maxSamples:w}}function Sy(a){let e=this,t=null,n=0,i=!1,s=!1,r=new bn,o=new Be,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let f=h.length!==0||u||n!==0||i;return i=u,n=h.length,f},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,f){let m=h.clippingPlanes,g=h.clipIntersection,b=h.clipShadows,p=a.get(h);if(!i||m===null||m.length===0||s&&!b)s?d(null):l();else{let x=s?0:n,y=x*4,v=p.clippingState||null;c.value=v,v=d(m,u,y,f);for(let _=0;_!==y;++_)v[_]=t[_];p.clippingState=v,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(h,u,f,m){let g=h!==null?h.length:0,b=null;if(g!==0){if(b=c.value,m!==!0||b===null){let p=f+g*4,x=u.matrixWorldInverse;o.getNormalMatrix(x),(b===null||b.length<p)&&(b=new Float32Array(p));for(let y=0,v=f;y!==g;++y,v+=4)r.copy(h[y]).applyMatrix4(x,o),r.normal.toArray(b,v),b[v+3]=r.constant}c.value=b,c.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,b}}function wy(a){let e=new WeakMap;function t(r,o){return o===_c?r.mapping=Sa:o===Mc&&(r.mapping=wa),r}function n(r){if(r&&r.isTexture){let o=r.mapping;if(o===_c||o===Mc)if(e.has(r)){let c=e.get(r).texture;return t(c,r.mapping)}else{let c=r.image;if(c&&c.height>0){let l=new qo(c.height);return l.fromEquirectangularTexture(a,r),e.set(r,l),r.addEventListener("dispose",i),t(l.texture,r.mapping)}else return null}}return r}function i(r){let o=r.target;o.removeEventListener("dispose",i);let c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}var Es=4,_p=[.125,.215,.35,.446,.526,.582],Ia=20,fd=new Ri,Mp=new fe,pd=null,md=0,bd=0,gd=!1,Ca=(1+Math.sqrt(5))/2,Ts=1/Ca,Sp=[new C(-Ca,Ts,0),new C(Ca,Ts,0),new C(-Ts,0,Ca),new C(Ts,0,Ca),new C(0,Ca,-Ts),new C(0,Ca,Ts),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)],Ty=new C,Rs=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){let{size:r=256,position:o=Ty}=s;pd=this._renderer.getRenderTarget(),md=this._renderer.getActiveCubeFace(),bd=this._renderer.getActiveMipmapLevel(),gd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ep(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(pd,md,bd),this._renderer.xr.enabled=gd,e.scissorTest=!1,rl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Sa||e.mapping===wa?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),pd=this._renderer.getRenderTarget(),md=this._renderer.getActiveCubeFace(),bd=this._renderer.getActiveMipmapLevel(),gd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:sn,minFilter:sn,generateMipmaps:!1,type:en,format:rn,colorSpace:Gt,depthBuffer:!1},i=wp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wp(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ey(s)),this._blurMaterial=Ay(s,e,t)}return i}_compileMaterial(e){let t=new ze(this._lodPlanes[0],e);this._renderer.compile(t,fd)}_sceneToCubeUV(e,t,n,i,s){let c=new Rt(90,1,t,n),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Mp),h.toneMapping=Pi,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(i),h.clearDepth(),h.setRenderTarget(null));let g=new hn({name:"PMREM.Background",side:Ft,depthWrite:!1,depthTest:!1}),b=new ze(new En,g),p=!1,x=e.background;x?x.isColor&&(g.color.copy(x),e.background=null,p=!0):(g.color.copy(Mp),p=!0);for(let y=0;y<6;y++){let v=y%3;v===0?(c.up.set(0,l[y],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+d[y],s.y,s.z)):v===1?(c.up.set(0,0,l[y]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+d[y],s.z)):(c.up.set(0,l[y],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+d[y]));let _=this._cubeSize;rl(i,v*_,y>2?_:0,_,_),h.setRenderTarget(i),p&&h.render(b,c),h.render(e,c)}b.geometry.dispose(),b.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=x}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Sa||e.mapping===wa;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ep()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tp());let s=i?this._cubemapMaterial:this._equirectMaterial,r=new ze(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;let c=this._cubeSize;rl(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(r,fd)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Sp[(i-s-1)%Sp.length];this._blur(e,s-1,s,r,o)}t.autoClear=n}_blur(e,t,n,i,s){let r=this._pingPongRenderTarget;this._halfBlur(e,r,t,n,i,"latitudinal",s),this._halfBlur(r,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,r,o){let c=this._renderer,l=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let d=3,h=new ze(this._lodPlanes[i],l),u=l.uniforms,f=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Ia-1),g=s/m,b=isFinite(s)?1+Math.floor(d*g):Ia;b>Ia&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${b} samples when the maximum is set to ${Ia}`);let p=[],x=0;for(let T=0;T<Ia;++T){let I=T/g,M=Math.exp(-I*I/2);p.push(M),T===0?x+=M:T<b&&(x+=2*M)}for(let T=0;T<p.length;T++)p[T]=p[T]/x;u.envMap.value=e.texture,u.samples.value=b,u.weights.value=p,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:y}=this;u.dTheta.value=m,u.mipInt.value=y-n;let v=this._sizeLods[i],_=3*v*(i>y-Es?i-y+Es:0),w=4*(this._cubeSize-v);rl(t,_,w,3*v,2*v),c.setRenderTarget(t),c.render(h,fd)}};function Ey(a){let e=[],t=[],n=[],i=a,s=a-Es+1+_p.length;for(let r=0;r<s;r++){let o=Math.pow(2,i);t.push(o);let c=1/o;r>a-Es?c=_p[r-a+Es-1]:r===0&&(c=0),n.push(c);let l=1/(o-2),d=-l,h=1+l,u=[d,d,h,d,h,h,d,d,h,h,d,h],f=6,m=6,g=3,b=2,p=1,x=new Float32Array(g*m*f),y=new Float32Array(b*m*f),v=new Float32Array(p*m*f);for(let w=0;w<f;w++){let T=w%3*2/3-1,I=w>2?0:-1,M=[T,I,0,T+2/3,I,0,T+2/3,I+1,0,T,I,0,T+2/3,I+1,0,T,I+1,0];x.set(M,g*m*w),y.set(u,b*m*w);let S=[w,w,w,w,w,w];v.set(S,p*m*w)}let _=new wt;_.setAttribute("position",new Je(x,g)),_.setAttribute("uv",new Je(y,b)),_.setAttribute("faceIndex",new Je(v,p)),e.push(_),i>Es&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function wp(a,e,t){let n=new It(a,e,t);return n.texture.mapping=Lr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function rl(a,e,t,n,i){a.viewport.set(e,t,n,i),a.scissor.set(e,t,n,i)}function Ay(a,e,t){let n=new Float32Array(Ia),i=new C(0,1,0);return new ut({name:"SphericalGaussianBlur",defines:{n:Ia,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ad(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Tp(){return new ut({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ad(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Ep(){return new ut({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ad(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Ad(){return`

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
	`}function Ry(a){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let c=o.mapping,l=c===_c||c===Mc,d=c===Sa||c===wa;if(l||d){let h=e.get(o),u=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return t===null&&(t=new Rs(a)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{let f=o.image;return l&&f&&f.height>0||d&&f&&i(f)?(t===null&&(t=new Rs(a)),h=l?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",s),h.texture):null}}}return o}function i(o){let c=0,l=6;for(let d=0;d<l;d++)o[d]!==void 0&&c++;return c===l}function s(o){let c=o.target;c.removeEventListener("dispose",s);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:r}}function Cy(a){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=a.getExtension("WEBGL_depth_texture")||a.getExtension("MOZ_WEBGL_depth_texture")||a.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=a.getExtension("EXT_texture_filter_anisotropic")||a.getExtension("MOZ_EXT_texture_filter_anisotropic")||a.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=a.getExtension("WEBGL_compressed_texture_s3tc")||a.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=a.getExtension("WEBGL_compressed_texture_pvrtc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=a.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&os("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Iy(a,e,t,n){let i={},s=new WeakMap;function r(h){let u=h.target;u.index!==null&&e.remove(u.index);for(let m in u.attributes)e.remove(u.attributes[m]);u.removeEventListener("dispose",r),delete i[u.id];let f=s.get(u);f&&(e.remove(f),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(h,u){return i[u.id]===!0||(u.addEventListener("dispose",r),i[u.id]=!0,t.memory.geometries++),u}function c(h){let u=h.attributes;for(let f in u)e.update(u[f],a.ARRAY_BUFFER)}function l(h){let u=[],f=h.index,m=h.attributes.position,g=0;if(f!==null){let x=f.array;g=f.version;for(let y=0,v=x.length;y<v;y+=3){let _=x[y+0],w=x[y+1],T=x[y+2];u.push(_,w,w,T,T,_)}}else if(m!==void 0){let x=m.array;g=m.version;for(let y=0,v=x.length/3-1;y<v;y+=3){let _=y+0,w=y+1,T=y+2;u.push(_,w,w,T,T,_)}}else return;let b=new(od(u)?cr:or)(u,1);b.version=g;let p=s.get(h);p&&e.remove(p),s.set(h,b)}function d(h){let u=s.get(h);if(u){let f=h.index;f!==null&&u.version<f.version&&l(h)}else l(h);return s.get(h)}return{get:o,update:c,getWireframeAttribute:d}}function Py(a,e,t){let n;function i(u){n=u}let s,r;function o(u){s=u.type,r=u.bytesPerElement}function c(u,f){a.drawElements(n,f,s,u*r),t.update(f,n,1)}function l(u,f,m){m!==0&&(a.drawElementsInstanced(n,f,s,u*r,m),t.update(f,n,m))}function d(u,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,u,0,m);let b=0;for(let p=0;p<m;p++)b+=f[p];t.update(b,n,1)}function h(u,f,m,g){if(m===0)return;let b=e.get("WEBGL_multi_draw");if(b===null)for(let p=0;p<u.length;p++)l(u[p]/r,f[p],g[p]);else{b.multiDrawElementsInstancedWEBGL(n,f,0,s,u,0,g,0,m);let p=0;for(let x=0;x<m;x++)p+=f[x]*g[x];t.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function Dy(a){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,r,o){switch(t.calls++,r){case a.TRIANGLES:t.triangles+=o*(s/3);break;case a.LINES:t.lines+=o*(s/2);break;case a.LINE_STRIP:t.lines+=o*(s-1);break;case a.LINE_LOOP:t.lines+=o*s;break;case a.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Fy(a,e,t){let n=new WeakMap,i=new Xe;function s(r,o,c){let l=r.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0,u=n.get(o);if(u===void 0||u.count!==h){let M=function(){T.dispose(),n.delete(o),o.removeEventListener("dispose",M)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,b=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],x=o.morphAttributes.color||[],y=0;f===!0&&(y=1),m===!0&&(y=2),g===!0&&(y=3);let v=o.attributes.position.count*y,_=1;v>e.maxTextureSize&&(_=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let w=new Float32Array(v*_*4*h),T=new rr(w,v,_,h);T.type=gn,T.needsUpdate=!0;let I=y*4;for(let S=0;S<h;S++){let R=b[S],D=p[S],L=x[S],U=v*_*4*S;for(let z=0;z<R.count;z++){let j=z*I;f===!0&&(i.fromBufferAttribute(R,z),w[U+j+0]=i.x,w[U+j+1]=i.y,w[U+j+2]=i.z,w[U+j+3]=0),m===!0&&(i.fromBufferAttribute(D,z),w[U+j+4]=i.x,w[U+j+5]=i.y,w[U+j+6]=i.z,w[U+j+7]=0),g===!0&&(i.fromBufferAttribute(L,z),w[U+j+8]=i.x,w[U+j+9]=i.y,w[U+j+10]=i.z,w[U+j+11]=L.itemSize===4?i.w:1)}}u={count:h,texture:T,size:new re(v,_)},n.set(o,u),o.addEventListener("dispose",M)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)c.getUniforms().setValue(a,"morphTexture",r.morphTexture,t);else{let f=0;for(let g=0;g<l.length;g++)f+=l[g];let m=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(a,"morphTargetBaseInfluence",m),c.getUniforms().setValue(a,"morphTargetInfluences",l)}c.getUniforms().setValue(a,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(a,"morphTargetsTextureSize",u.size)}return{update:s}}function Ly(a,e,t,n){let i=new WeakMap;function s(c){let l=n.render.frame,d=c.geometry,h=e.get(c,d);if(i.get(h)!==l&&(e.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(t.update(c.instanceMatrix,a.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,a.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let u=c.skeleton;i.get(u)!==l&&(u.update(),i.set(u,l))}return h}function r(){i=new WeakMap}function o(c){let l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:r}}var Wp=new Dt,Ap=new Ki(1,1),Xp=new rr,qp=new Wo,Kp=new lr,Rp=[],Cp=[],Ip=new Float32Array(16),Pp=new Float32Array(9),Dp=new Float32Array(4);function Cs(a,e,t){let n=a[0];if(n<=0||n>0)return a;let i=e*t,s=Rp[i];if(s===void 0&&(s=new Float32Array(i),Rp[i]=s),e!==0){n.toArray(s,0);for(let r=1,o=0;r!==e;++r)o+=t,a[r].toArray(s,o)}return s}function Lt(a,e){if(a.length!==e.length)return!1;for(let t=0,n=a.length;t<n;t++)if(a[t]!==e[t])return!1;return!0}function kt(a,e){for(let t=0,n=e.length;t<n;t++)a[t]=e[t]}function ll(a,e){let t=Cp[e];t===void 0&&(t=new Int32Array(e),Cp[e]=t);for(let n=0;n!==e;++n)t[n]=a.allocateTextureUnit();return t}function ky(a,e){let t=this.cache;t[0]!==e&&(a.uniform1f(this.addr,e),t[0]=e)}function Ny(a,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(a.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;a.uniform2fv(this.addr,e),kt(t,e)}}function Uy(a,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(a.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(a.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;a.uniform3fv(this.addr,e),kt(t,e)}}function By(a,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(a.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;a.uniform4fv(this.addr,e),kt(t,e)}}function Oy(a,e){let t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;a.uniformMatrix2fv(this.addr,!1,e),kt(t,e)}else{if(Lt(t,n))return;Dp.set(n),a.uniformMatrix2fv(this.addr,!1,Dp),kt(t,n)}}function zy(a,e){let t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;a.uniformMatrix3fv(this.addr,!1,e),kt(t,e)}else{if(Lt(t,n))return;Pp.set(n),a.uniformMatrix3fv(this.addr,!1,Pp),kt(t,n)}}function jy(a,e){let t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;a.uniformMatrix4fv(this.addr,!1,e),kt(t,e)}else{if(Lt(t,n))return;Ip.set(n),a.uniformMatrix4fv(this.addr,!1,Ip),kt(t,n)}}function Vy(a,e){let t=this.cache;t[0]!==e&&(a.uniform1i(this.addr,e),t[0]=e)}function Gy(a,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(a.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;a.uniform2iv(this.addr,e),kt(t,e)}}function Hy(a,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(a.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;a.uniform3iv(this.addr,e),kt(t,e)}}function Wy(a,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(a.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;a.uniform4iv(this.addr,e),kt(t,e)}}function Xy(a,e){let t=this.cache;t[0]!==e&&(a.uniform1ui(this.addr,e),t[0]=e)}function qy(a,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(a.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;a.uniform2uiv(this.addr,e),kt(t,e)}}function Ky(a,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(a.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;a.uniform3uiv(this.addr,e),kt(t,e)}}function Jy(a,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(a.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;a.uniform4uiv(this.addr,e),kt(t,e)}}function Yy(a,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(a.uniform1i(this.addr,i),n[0]=i);let s;this.type===a.SAMPLER_2D_SHADOW?(Ap.compareFunction=ad,s=Ap):s=Wp,t.setTexture2D(e||s,i)}function Zy(a,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(a.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||qp,i)}function Qy(a,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(a.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Kp,i)}function $y(a,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(a.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Xp,i)}function e0(a){switch(a){case 5126:return ky;case 35664:return Ny;case 35665:return Uy;case 35666:return By;case 35674:return Oy;case 35675:return zy;case 35676:return jy;case 5124:case 35670:return Vy;case 35667:case 35671:return Gy;case 35668:case 35672:return Hy;case 35669:case 35673:return Wy;case 5125:return Xy;case 36294:return qy;case 36295:return Ky;case 36296:return Jy;case 35678:case 36198:case 36298:case 36306:case 35682:return Yy;case 35679:case 36299:case 36307:return Zy;case 35680:case 36300:case 36308:case 36293:return Qy;case 36289:case 36303:case 36311:case 36292:return $y}}function t0(a,e){a.uniform1fv(this.addr,e)}function n0(a,e){let t=Cs(e,this.size,2);a.uniform2fv(this.addr,t)}function i0(a,e){let t=Cs(e,this.size,3);a.uniform3fv(this.addr,t)}function a0(a,e){let t=Cs(e,this.size,4);a.uniform4fv(this.addr,t)}function s0(a,e){let t=Cs(e,this.size,4);a.uniformMatrix2fv(this.addr,!1,t)}function r0(a,e){let t=Cs(e,this.size,9);a.uniformMatrix3fv(this.addr,!1,t)}function o0(a,e){let t=Cs(e,this.size,16);a.uniformMatrix4fv(this.addr,!1,t)}function c0(a,e){a.uniform1iv(this.addr,e)}function l0(a,e){a.uniform2iv(this.addr,e)}function h0(a,e){a.uniform3iv(this.addr,e)}function d0(a,e){a.uniform4iv(this.addr,e)}function u0(a,e){a.uniform1uiv(this.addr,e)}function f0(a,e){a.uniform2uiv(this.addr,e)}function p0(a,e){a.uniform3uiv(this.addr,e)}function m0(a,e){a.uniform4uiv(this.addr,e)}function b0(a,e,t){let n=this.cache,i=e.length,s=ll(t,i);Lt(n,s)||(a.uniform1iv(this.addr,s),kt(n,s));for(let r=0;r!==i;++r)t.setTexture2D(e[r]||Wp,s[r])}function g0(a,e,t){let n=this.cache,i=e.length,s=ll(t,i);Lt(n,s)||(a.uniform1iv(this.addr,s),kt(n,s));for(let r=0;r!==i;++r)t.setTexture3D(e[r]||qp,s[r])}function x0(a,e,t){let n=this.cache,i=e.length,s=ll(t,i);Lt(n,s)||(a.uniform1iv(this.addr,s),kt(n,s));for(let r=0;r!==i;++r)t.setTextureCube(e[r]||Kp,s[r])}function v0(a,e,t){let n=this.cache,i=e.length,s=ll(t,i);Lt(n,s)||(a.uniform1iv(this.addr,s),kt(n,s));for(let r=0;r!==i;++r)t.setTexture2DArray(e[r]||Xp,s[r])}function y0(a){switch(a){case 5126:return t0;case 35664:return n0;case 35665:return i0;case 35666:return a0;case 35674:return s0;case 35675:return r0;case 35676:return o0;case 5124:case 35670:return c0;case 35667:case 35671:return l0;case 35668:case 35672:return h0;case 35669:case 35673:return d0;case 5125:return u0;case 36294:return f0;case 36295:return p0;case 36296:return m0;case 35678:case 36198:case 36298:case 36306:case 35682:return b0;case 35679:case 36299:case 36307:return g0;case 35680:case 36300:case 36308:case 36293:return x0;case 36289:case 36303:case 36311:case 36292:return v0}}var vd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=e0(t.type)}},yd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=y0(t.type)}},_d=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,r=i.length;s!==r;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},xd=/(\w+)(\])?(\[|\.)?/g;function Fp(a,e){a.seq.push(e),a.map[e.id]=e}function _0(a,e,t){let n=a.name,i=n.length;for(xd.lastIndex=0;;){let s=xd.exec(n),r=xd.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&r+2===i){Fp(t,l===void 0?new vd(o,a,e):new yd(o,a,e));break}else{let h=t.map[o];h===void 0&&(h=new _d(o),Fp(t,h)),t=h}}}var As=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i),r=e.getUniformLocation(t,s.name);_0(s,r,this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,r=t.length;s!==r;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let r=e[i];r.id in t&&n.push(r)}return n}};function Lp(a,e,t){let n=a.createShader(e);return a.shaderSource(n,t),a.compileShader(n),n}var M0=37297,S0=0;function w0(a,e){let t=a.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let r=i;r<s;r++){let o=r+1;n.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return n.join(`
`)}var kp=new Be;function T0(a){Ge._getMatrix(kp,Ge.workingColorSpace,a);let e=`mat3( ${kp.elements.map(t=>t.toFixed(4))} )`;switch(Ge.getTransfer(a)){case ar:return[e,"LinearTransferOETF"];case $e:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",a),[e,"LinearTransferOETF"]}}function Np(a,e,t){let n=a.getShaderParameter(e,a.COMPILE_STATUS),s=(a.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+w0(a.getShaderSource(e),o)}else return s}function E0(a,e){let t=T0(e);return[`vec4 ${a}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function A0(a,e){let t;switch(e){case mc:t="Linear";break;case bc:t="Reinhard";break;case gc:t="Cineon";break;case vs:t="ACESFilmic";break;case vc:t="AgX";break;case yc:t="Neutral";break;case xc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+a+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ol=new C;function R0(){Ge.getLuminanceCoefficients(ol);let a=ol.x.toFixed(4),e=ol.y.toFixed(4),t=ol.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${a}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function C0(a){return[a.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",a.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(jr).join(`
`)}function I0(a){let e=[];for(let t in a){let n=a[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function P0(a,e){let t={},n=a.getProgramParameter(e,a.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let s=a.getActiveAttrib(e,i),r=s.name,o=1;s.type===a.FLOAT_MAT2&&(o=2),s.type===a.FLOAT_MAT3&&(o=3),s.type===a.FLOAT_MAT4&&(o=4),t[r]={type:s.type,location:a.getAttribLocation(e,r),locationSize:o}}return t}function jr(a){return a!==""}function Up(a,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return a.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Bp(a,e){return a.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var D0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Md(a){return a.replace(D0,L0)}var F0=new Map;function L0(a,e){let t=Ve[e];if(t===void 0){let n=F0.get(e);if(n!==void 0)t=Ve[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Md(t)}var k0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Op(a){return a.replace(k0,N0)}function N0(a,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function zp(a){let e=`precision ${a.precision} float;
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
#define LOW_PRECISION`),e}function U0(a){let e="SHADOWMAP_TYPE_BASIC";return a.shadowMapType===Xh?e="SHADOWMAP_TYPE_PCF":a.shadowMapType===rc?e="SHADOWMAP_TYPE_PCF_SOFT":a.shadowMapType===oi&&(e="SHADOWMAP_TYPE_VSM"),e}function B0(a){let e="ENVMAP_TYPE_CUBE";if(a.envMap)switch(a.envMapMode){case Sa:case wa:e="ENVMAP_TYPE_CUBE";break;case Lr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function O0(a){let e="ENVMAP_MODE_REFLECTION";if(a.envMap)switch(a.envMapMode){case wa:e="ENVMAP_MODE_REFRACTION";break}return e}function z0(a){let e="ENVMAP_BLENDING_NONE";if(a.envMap)switch(a.combine){case pc:e="ENVMAP_BLENDING_MULTIPLY";break;case np:e="ENVMAP_BLENDING_MIX";break;case ip:e="ENVMAP_BLENDING_ADD";break}return e}function j0(a){let e=a.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function V0(a,e,t,n){let i=a.getContext(),s=t.defines,r=t.vertexShader,o=t.fragmentShader,c=U0(t),l=B0(t),d=O0(t),h=z0(t),u=j0(t),f=C0(t),m=I0(s),g=i.createProgram(),b,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(b=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(jr).join(`
`),b.length>0&&(b+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(jr).join(`
`),p.length>0&&(p+=`
`)):(b=[zp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(jr).join(`
`),p=[zp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pi?"#define TONE_MAPPING":"",t.toneMapping!==Pi?Ve.tonemapping_pars_fragment:"",t.toneMapping!==Pi?A0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,E0("linearToOutputTexel",t.outputColorSpace),R0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(jr).join(`
`)),r=Md(r),r=Up(r,t),r=Bp(r,t),o=Md(o),o=Up(o,t),o=Bp(o,t),r=Op(r),o=Op(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,b=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+b,p=["#define varying in",t.glslVersion===sd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===sd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let y=x+b+r,v=x+p+o,_=Lp(i,i.VERTEX_SHADER,y),w=Lp(i,i.FRAGMENT_SHADER,v);i.attachShader(g,_),i.attachShader(g,w),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function T(R){if(a.debug.checkShaderErrors){let D=i.getProgramInfoLog(g)||"",L=i.getShaderInfoLog(_)||"",U=i.getShaderInfoLog(w)||"",z=D.trim(),j=L.trim(),J=U.trim(),H=!0,Q=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(H=!1,typeof a.debug.onShaderError=="function")a.debug.onShaderError(i,g,_,w);else{let le=Np(i,_,"vertex"),xe=Np(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+z+`
`+le+`
`+xe)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(j===""||J==="")&&(Q=!1);Q&&(R.diagnostics={runnable:H,programLog:z,vertexShader:{log:j,prefix:b},fragmentShader:{log:J,prefix:p}})}i.deleteShader(_),i.deleteShader(w),I=new As(i,g),M=P0(i,g)}let I;this.getUniforms=function(){return I===void 0&&T(this),I};let M;this.getAttributes=function(){return M===void 0&&T(this),M};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=i.getProgramParameter(g,M0)),S},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=S0++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=_,this.fragmentShader=w,this}var G0=0,Sd=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),r=this._getShaderCacheForMaterial(e);return r.has(i)===!1&&(r.add(i),i.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new wd(e),t.set(e,n)),n}},wd=class{constructor(e){this.id=G0++,this.code=e,this.usedTimes=0}};function H0(a,e,t,n,i,s,r){let o=new ls,c=new Sd,l=new Set,d=[],h=i.logarithmicDepthBuffer,u=i.vertexTextures,f=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(M){return l.add(M),M===0?"uv":`uv${M}`}function b(M,S,R,D,L){let U=D.fog,z=L.geometry,j=M.isMeshStandardMaterial?D.environment:null,J=(M.isMeshStandardMaterial?t:e).get(M.envMap||j),H=J&&J.mapping===Lr?J.image.height:null,Q=m[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));let le=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,xe=le!==void 0?le.length:0,Ne=0;z.morphAttributes.position!==void 0&&(Ne=1),z.morphAttributes.normal!==void 0&&(Ne=2),z.morphAttributes.color!==void 0&&(Ne=3);let it,lt,Ze,q;if(Q){let tt=ci[Q];it=tt.vertexShader,lt=tt.fragmentShader}else it=M.vertexShader,lt=M.fragmentShader,c.update(M),Ze=c.getVertexShaderID(M),q=c.getFragmentShaderID(M);let Z=a.getRenderTarget(),me=a.state.buffers.depth.getReversed(),Le=L.isInstancedMesh===!0,Te=L.isBatchedMesh===!0,qe=!!M.map,Kt=!!M.matcap,F=!!J,pt=!!M.aoMap,Ue=!!M.lightMap,Pe=!!M.bumpMap,ve=!!M.normalMap,mt=!!M.displacementMap,ye=!!M.emissiveMap,je=!!M.metalnessMap,Ut=!!M.roughnessMap,Mt=M.anisotropy>0,P=M.clearcoat>0,E=M.dispersion>0,O=M.iridescence>0,X=M.sheen>0,Y=M.transmission>0,W=Mt&&!!M.anisotropyMap,we=P&&!!M.clearcoatMap,ie=P&&!!M.clearcoatNormalMap,_e=P&&!!M.clearcoatRoughnessMap,Me=O&&!!M.iridescenceMap,te=O&&!!M.iridescenceThicknessMap,he=X&&!!M.sheenColorMap,Ie=X&&!!M.sheenRoughnessMap,Se=!!M.specularMap,oe=!!M.specularColorMap,Oe=!!M.specularIntensityMap,k=Y&&!!M.transmissionMap,ne=Y&&!!M.thicknessMap,ae=!!M.gradientMap,pe=!!M.alphaMap,$=M.alphaTest>0,K=!!M.alphaHash,ge=!!M.extensions,ke=Pi;M.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(ke=a.toneMapping);let ht={shaderID:Q,shaderType:M.type,shaderName:M.name,vertexShader:it,fragmentShader:lt,defines:M.defines,customVertexShaderID:Ze,customFragmentShaderID:q,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Te,batchingColor:Te&&L._colorsTexture!==null,instancing:Le,instancingColor:Le&&L.instanceColor!==null,instancingMorph:Le&&L.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:Z===null?a.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Gt,alphaToCoverage:!!M.alphaToCoverage,map:qe,matcap:Kt,envMap:F,envMapMode:F&&J.mapping,envMapCubeUVHeight:H,aoMap:pt,lightMap:Ue,bumpMap:Pe,normalMap:ve,displacementMap:u&&mt,emissiveMap:ye,normalMapObjectSpace:ve&&M.normalMapType===cp,normalMapTangentSpace:ve&&M.normalMapType===al,metalnessMap:je,roughnessMap:Ut,anisotropy:Mt,anisotropyMap:W,clearcoat:P,clearcoatMap:we,clearcoatNormalMap:ie,clearcoatRoughnessMap:_e,dispersion:E,iridescence:O,iridescenceMap:Me,iridescenceThicknessMap:te,sheen:X,sheenColorMap:he,sheenRoughnessMap:Ie,specularMap:Se,specularColorMap:oe,specularIntensityMap:Oe,transmission:Y,transmissionMap:k,thicknessMap:ne,gradientMap:ae,opaque:M.transparent===!1&&M.blending===_i&&M.alphaToCoverage===!1,alphaMap:pe,alphaTest:$,alphaHash:K,combine:M.combine,mapUv:qe&&g(M.map.channel),aoMapUv:pt&&g(M.aoMap.channel),lightMapUv:Ue&&g(M.lightMap.channel),bumpMapUv:Pe&&g(M.bumpMap.channel),normalMapUv:ve&&g(M.normalMap.channel),displacementMapUv:mt&&g(M.displacementMap.channel),emissiveMapUv:ye&&g(M.emissiveMap.channel),metalnessMapUv:je&&g(M.metalnessMap.channel),roughnessMapUv:Ut&&g(M.roughnessMap.channel),anisotropyMapUv:W&&g(M.anisotropyMap.channel),clearcoatMapUv:we&&g(M.clearcoatMap.channel),clearcoatNormalMapUv:ie&&g(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&g(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Me&&g(M.iridescenceMap.channel),iridescenceThicknessMapUv:te&&g(M.iridescenceThicknessMap.channel),sheenColorMapUv:he&&g(M.sheenColorMap.channel),sheenRoughnessMapUv:Ie&&g(M.sheenRoughnessMap.channel),specularMapUv:Se&&g(M.specularMap.channel),specularColorMapUv:oe&&g(M.specularColorMap.channel),specularIntensityMapUv:Oe&&g(M.specularIntensityMap.channel),transmissionMapUv:k&&g(M.transmissionMap.channel),thicknessMapUv:ne&&g(M.thicknessMap.channel),alphaMapUv:pe&&g(M.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(ve||Mt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!z.attributes.uv&&(qe||pe),fog:!!U,useFog:M.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:me,skinning:L.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:Ne,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:a.shadowMap.enabled&&R.length>0,shadowMapType:a.shadowMap.type,toneMapping:ke,decodeVideoTexture:qe&&M.map.isVideoTexture===!0&&Ge.getTransfer(M.map.colorSpace)===$e,decodeVideoTextureEmissive:ye&&M.emissiveMap.isVideoTexture===!0&&Ge.getTransfer(M.emissiveMap.colorSpace)===$e,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Ot,flipSided:M.side===Ft,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:ge&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&M.extensions.multiDraw===!0||Te)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return ht.vertexUv1s=l.has(1),ht.vertexUv2s=l.has(2),ht.vertexUv3s=l.has(3),l.clear(),ht}function p(M){let S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(let R in M.defines)S.push(R),S.push(M.defines[R]);return M.isRawShaderMaterial===!1&&(x(S,M),y(S,M),S.push(a.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function x(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function y(M,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),S.gradientMap&&o.enable(22),M.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),M.push(o.mask)}function v(M){let S=m[M.type],R;if(S){let D=ci[S];R=Fi.clone(D.uniforms)}else R=M.uniforms;return R}function _(M,S){let R;for(let D=0,L=d.length;D<L;D++){let U=d[D];if(U.cacheKey===S){R=U,++R.usedTimes;break}}return R===void 0&&(R=new V0(a,S,M,s),d.push(R)),R}function w(M){if(--M.usedTimes===0){let S=d.indexOf(M);d[S]=d[d.length-1],d.pop(),M.destroy()}}function T(M){c.remove(M)}function I(){c.dispose()}return{getParameters:b,getProgramCacheKey:p,getUniforms:v,acquireProgram:_,releaseProgram:w,releaseShaderCache:T,programs:d,dispose:I}}function W0(){let a=new WeakMap;function e(r){return a.has(r)}function t(r){let o=a.get(r);return o===void 0&&(o={},a.set(r,o)),o}function n(r){a.delete(r)}function i(r,o,c){a.get(r)[o]=c}function s(){a=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function X0(a,e){return a.groupOrder!==e.groupOrder?a.groupOrder-e.groupOrder:a.renderOrder!==e.renderOrder?a.renderOrder-e.renderOrder:a.material.id!==e.material.id?a.material.id-e.material.id:a.z!==e.z?a.z-e.z:a.id-e.id}function jp(a,e){return a.groupOrder!==e.groupOrder?a.groupOrder-e.groupOrder:a.renderOrder!==e.renderOrder?a.renderOrder-e.renderOrder:a.z!==e.z?e.z-a.z:a.id-e.id}function Vp(){let a=[],e=0,t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function r(h,u,f,m,g,b){let p=a[e];return p===void 0?(p={id:h.id,object:h,geometry:u,material:f,groupOrder:m,renderOrder:h.renderOrder,z:g,group:b},a[e]=p):(p.id=h.id,p.object=h,p.geometry=u,p.material=f,p.groupOrder=m,p.renderOrder=h.renderOrder,p.z=g,p.group=b),e++,p}function o(h,u,f,m,g,b){let p=r(h,u,f,m,g,b);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function c(h,u,f,m,g,b){let p=r(h,u,f,m,g,b);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function l(h,u){t.length>1&&t.sort(h||X0),n.length>1&&n.sort(u||jp),i.length>1&&i.sort(u||jp)}function d(){for(let h=e,u=a.length;h<u;h++){let f=a[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:o,unshift:c,finish:d,sort:l}}function q0(){let a=new WeakMap;function e(n,i){let s=a.get(n),r;return s===void 0?(r=new Vp,a.set(n,[r])):i>=s.length?(r=new Vp,s.push(r)):r=s[i],r}function t(){a=new WeakMap}return{get:e,dispose:t}}function K0(){let a={};return{get:function(e){if(a[e.id]!==void 0)return a[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new fe};break;case"SpotLight":t={position:new C,direction:new C,color:new fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new fe,groundColor:new fe};break;case"RectAreaLight":t={color:new fe,position:new C,halfWidth:new C,halfHeight:new C};break}return a[e.id]=t,t}}}function J0(){let a={};return{get:function(e){if(a[e.id]!==void 0)return a[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1e3};break}return a[e.id]=t,t}}}var Y0=0;function Z0(a,e){return(e.castShadow?2:0)-(a.castShadow?2:0)+(e.map?1:0)-(a.map?1:0)}function Q0(a){let e=new K0,t=J0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new C);let i=new C,s=new de,r=new de;function o(l){let d=0,h=0,u=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,m=0,g=0,b=0,p=0,x=0,y=0,v=0,_=0,w=0,T=0;l.sort(Z0);for(let M=0,S=l.length;M<S;M++){let R=l[M],D=R.color,L=R.intensity,U=R.distance,z=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)d+=D.r*L,h+=D.g*L,u+=D.b*L;else if(R.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(R.sh.coefficients[j],L);T++}else if(R.isDirectionalLight){let j=e.get(R);if(j.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let J=R.shadow,H=t.get(R);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,n.directionalShadow[f]=H,n.directionalShadowMap[f]=z,n.directionalShadowMatrix[f]=R.shadow.matrix,x++}n.directional[f]=j,f++}else if(R.isSpotLight){let j=e.get(R);j.position.setFromMatrixPosition(R.matrixWorld),j.color.copy(D).multiplyScalar(L),j.distance=U,j.coneCos=Math.cos(R.angle),j.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),j.decay=R.decay,n.spot[g]=j;let J=R.shadow;if(R.map&&(n.spotLightMap[_]=R.map,_++,J.updateMatrices(R),R.castShadow&&w++),n.spotLightMatrix[g]=J.matrix,R.castShadow){let H=t.get(R);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,n.spotShadow[g]=H,n.spotShadowMap[g]=z,v++}g++}else if(R.isRectAreaLight){let j=e.get(R);j.color.copy(D).multiplyScalar(L),j.halfWidth.set(R.width*.5,0,0),j.halfHeight.set(0,R.height*.5,0),n.rectArea[b]=j,b++}else if(R.isPointLight){let j=e.get(R);if(j.color.copy(R.color).multiplyScalar(R.intensity),j.distance=R.distance,j.decay=R.decay,R.castShadow){let J=R.shadow,H=t.get(R);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,H.shadowCameraNear=J.camera.near,H.shadowCameraFar=J.camera.far,n.pointShadow[m]=H,n.pointShadowMap[m]=z,n.pointShadowMatrix[m]=R.shadow.matrix,y++}n.point[m]=j,m++}else if(R.isHemisphereLight){let j=e.get(R);j.skyColor.copy(R.color).multiplyScalar(L),j.groundColor.copy(R.groundColor).multiplyScalar(L),n.hemi[p]=j,p++}}b>0&&(a.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=se.LTC_FLOAT_1,n.rectAreaLTC2=se.LTC_FLOAT_2):(n.rectAreaLTC1=se.LTC_HALF_1,n.rectAreaLTC2=se.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=h,n.ambient[2]=u;let I=n.hash;(I.directionalLength!==f||I.pointLength!==m||I.spotLength!==g||I.rectAreaLength!==b||I.hemiLength!==p||I.numDirectionalShadows!==x||I.numPointShadows!==y||I.numSpotShadows!==v||I.numSpotMaps!==_||I.numLightProbes!==T)&&(n.directional.length=f,n.spot.length=g,n.rectArea.length=b,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=v+_-w,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=T,I.directionalLength=f,I.pointLength=m,I.spotLength=g,I.rectAreaLength=b,I.hemiLength=p,I.numDirectionalShadows=x,I.numPointShadows=y,I.numSpotShadows=v,I.numSpotMaps=_,I.numLightProbes=T,n.version=Y0++)}function c(l,d){let h=0,u=0,f=0,m=0,g=0,b=d.matrixWorldInverse;for(let p=0,x=l.length;p<x;p++){let y=l[p];if(y.isDirectionalLight){let v=n.directional[h];v.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(b),h++}else if(y.isSpotLight){let v=n.spot[f];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(b),v.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(b),f++}else if(y.isRectAreaLight){let v=n.rectArea[m];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(b),r.identity(),s.copy(y.matrixWorld),s.premultiply(b),r.extractRotation(s),v.halfWidth.set(y.width*.5,0,0),v.halfHeight.set(0,y.height*.5,0),v.halfWidth.applyMatrix4(r),v.halfHeight.applyMatrix4(r),m++}else if(y.isPointLight){let v=n.point[u];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(b),u++}else if(y.isHemisphereLight){let v=n.hemi[g];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(b),g++}}}return{setup:o,setupView:c,state:n}}function Gp(a){let e=new Q0(a),t=[],n=[];function i(d){l.camera=d,t.length=0,n.length=0}function s(d){t.push(d)}function r(d){n.push(d)}function o(){e.setup(t)}function c(d){e.setupView(t,d)}let l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:r}}function $0(a){let e=new WeakMap;function t(i,s=0){let r=e.get(i),o;return r===void 0?(o=new Gp(a),e.set(i,[o])):s>=r.length?(o=new Gp(a),r.push(o)):o=r[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var e_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,t_=`uniform sampler2D shadow_pass;
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
}`;function n_(a,e,t){let n=new qi,i=new re,s=new re,r=new Xe,o=new Zo({depthPacking:op}),c=new Qo,l={},d=t.maxTextureSize,h={[$t]:Ft,[Ft]:$t,[Ot]:Ot},u=new ut({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:e_,fragmentShader:t_}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let m=new wt;m.setAttribute("position",new Je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let g=new ze(m,u),b=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xh;let p=this.type;this.render=function(w,T,I){if(b.enabled===!1||b.autoUpdate===!1&&b.needsUpdate===!1||w.length===0)return;let M=a.getRenderTarget(),S=a.getActiveCubeFace(),R=a.getActiveMipmapLevel(),D=a.state;D.setBlending(Xn),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let L=p!==oi&&this.type===oi,U=p===oi&&this.type!==oi;for(let z=0,j=w.length;z<j;z++){let J=w[z],H=J.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);let Q=H.getFrameExtents();if(i.multiply(Q),s.copy(H.mapSize),(i.x>d||i.y>d)&&(i.x>d&&(s.x=Math.floor(d/Q.x),i.x=s.x*Q.x,H.mapSize.x=s.x),i.y>d&&(s.y=Math.floor(d/Q.y),i.y=s.y*Q.y,H.mapSize.y=s.y)),H.map===null||L===!0||U===!0){let xe=this.type!==oi?{minFilter:Vt,magFilter:Vt}:{};H.map!==null&&H.map.dispose(),H.map=new It(i.x,i.y,xe),H.map.texture.name=J.name+".shadowMap",H.camera.updateProjectionMatrix()}a.setRenderTarget(H.map),a.clear();let le=H.getViewportCount();for(let xe=0;xe<le;xe++){let Ne=H.getViewport(xe);r.set(s.x*Ne.x,s.y*Ne.y,s.x*Ne.z,s.y*Ne.w),D.viewport(r),H.updateMatrices(J,xe),n=H.getFrustum(),v(T,I,H.camera,J,this.type)}H.isPointLightShadow!==!0&&this.type===oi&&x(H,I),H.needsUpdate=!1}p=this.type,b.needsUpdate=!1,a.setRenderTarget(M,S,R)};function x(w,T){let I=e.update(g);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new It(i.x,i.y)),u.uniforms.shadow_pass.value=w.map.texture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,a.setRenderTarget(w.mapPass),a.clear(),a.renderBufferDirect(T,null,I,u,g,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,a.setRenderTarget(w.map),a.clear(),a.renderBufferDirect(T,null,I,f,g,null)}function y(w,T,I,M){let S=null,R=I.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(R!==void 0)S=R;else if(S=I.isPointLight===!0?c:o,a.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){let D=S.uuid,L=T.uuid,U=l[D];U===void 0&&(U={},l[D]=U);let z=U[L];z===void 0&&(z=S.clone(),U[L]=z,T.addEventListener("dispose",_)),S=z}if(S.visible=T.visible,S.wireframe=T.wireframe,M===oi?S.side=T.shadowSide!==null?T.shadowSide:T.side:S.side=T.shadowSide!==null?T.shadowSide:h[T.side],S.alphaMap=T.alphaMap,S.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,S.map=T.map,S.clipShadows=T.clipShadows,S.clippingPlanes=T.clippingPlanes,S.clipIntersection=T.clipIntersection,S.displacementMap=T.displacementMap,S.displacementScale=T.displacementScale,S.displacementBias=T.displacementBias,S.wireframeLinewidth=T.wireframeLinewidth,S.linewidth=T.linewidth,I.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let D=a.properties.get(S);D.light=I}return S}function v(w,T,I,M,S){if(w.visible===!1)return;if(w.layers.test(T.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&S===oi)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,w.matrixWorld);let L=e.update(w),U=w.material;if(Array.isArray(U)){let z=L.groups;for(let j=0,J=z.length;j<J;j++){let H=z[j],Q=U[H.materialIndex];if(Q&&Q.visible){let le=y(w,Q,M,S);w.onBeforeShadow(a,w,T,I,L,le,H),a.renderBufferDirect(I,null,L,le,w,H),w.onAfterShadow(a,w,T,I,L,le,H)}}}else if(U.visible){let z=y(w,U,M,S);w.onBeforeShadow(a,w,T,I,L,z,null),a.renderBufferDirect(I,null,L,z,w,null),w.onAfterShadow(a,w,T,I,L,z,null)}}let D=w.children;for(let L=0,U=D.length;L<U;L++)v(D[L],T,I,M,S)}function _(w){w.target.removeEventListener("dispose",_);for(let I in l){let M=l[I],S=w.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}var i_={[oc]:cc,[lc]:uc,[hc]:fc,[fa]:dc,[cc]:oc,[uc]:lc,[fc]:hc,[dc]:fa};function a_(a,e){function t(){let k=!1,ne=new Xe,ae=null,pe=new Xe(0,0,0,0);return{setMask:function($){ae!==$&&!k&&(a.colorMask($,$,$,$),ae=$)},setLocked:function($){k=$},setClear:function($,K,ge,ke,ht){ht===!0&&($*=ke,K*=ke,ge*=ke),ne.set($,K,ge,ke),pe.equals(ne)===!1&&(a.clearColor($,K,ge,ke),pe.copy(ne))},reset:function(){k=!1,ae=null,pe.set(-1,0,0,0)}}}function n(){let k=!1,ne=!1,ae=null,pe=null,$=null;return{setReversed:function(K){if(ne!==K){let ge=e.get("EXT_clip_control");K?ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.ZERO_TO_ONE_EXT):ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.NEGATIVE_ONE_TO_ONE_EXT),ne=K;let ke=$;$=null,this.setClear(ke)}},getReversed:function(){return ne},setTest:function(K){K?Z(a.DEPTH_TEST):me(a.DEPTH_TEST)},setMask:function(K){ae!==K&&!k&&(a.depthMask(K),ae=K)},setFunc:function(K){if(ne&&(K=i_[K]),pe!==K){switch(K){case oc:a.depthFunc(a.NEVER);break;case cc:a.depthFunc(a.ALWAYS);break;case lc:a.depthFunc(a.LESS);break;case fa:a.depthFunc(a.LEQUAL);break;case hc:a.depthFunc(a.EQUAL);break;case dc:a.depthFunc(a.GEQUAL);break;case uc:a.depthFunc(a.GREATER);break;case fc:a.depthFunc(a.NOTEQUAL);break;default:a.depthFunc(a.LEQUAL)}pe=K}},setLocked:function(K){k=K},setClear:function(K){$!==K&&(ne&&(K=1-K),a.clearDepth(K),$=K)},reset:function(){k=!1,ae=null,pe=null,$=null,ne=!1}}}function i(){let k=!1,ne=null,ae=null,pe=null,$=null,K=null,ge=null,ke=null,ht=null;return{setTest:function(tt){k||(tt?Z(a.STENCIL_TEST):me(a.STENCIL_TEST))},setMask:function(tt){ne!==tt&&!k&&(a.stencilMask(tt),ne=tt)},setFunc:function(tt,fi,Zn){(ae!==tt||pe!==fi||$!==Zn)&&(a.stencilFunc(tt,fi,Zn),ae=tt,pe=fi,$=Zn)},setOp:function(tt,fi,Zn){(K!==tt||ge!==fi||ke!==Zn)&&(a.stencilOp(tt,fi,Zn),K=tt,ge=fi,ke=Zn)},setLocked:function(tt){k=tt},setClear:function(tt){ht!==tt&&(a.clearStencil(tt),ht=tt)},reset:function(){k=!1,ne=null,ae=null,pe=null,$=null,K=null,ge=null,ke=null,ht=null}}}let s=new t,r=new n,o=new i,c=new WeakMap,l=new WeakMap,d={},h={},u=new WeakMap,f=[],m=null,g=!1,b=null,p=null,x=null,y=null,v=null,_=null,w=null,T=new fe(0,0,0),I=0,M=!1,S=null,R=null,D=null,L=null,U=null,z=a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,J=0,H=a.getParameter(a.VERSION);H.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(H)[1]),j=J>=1):H.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),j=J>=2);let Q=null,le={},xe=a.getParameter(a.SCISSOR_BOX),Ne=a.getParameter(a.VIEWPORT),it=new Xe().fromArray(xe),lt=new Xe().fromArray(Ne);function Ze(k,ne,ae,pe){let $=new Uint8Array(4),K=a.createTexture();a.bindTexture(k,K),a.texParameteri(k,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(k,a.TEXTURE_MAG_FILTER,a.NEAREST);for(let ge=0;ge<ae;ge++)k===a.TEXTURE_3D||k===a.TEXTURE_2D_ARRAY?a.texImage3D(ne,0,a.RGBA,1,1,pe,0,a.RGBA,a.UNSIGNED_BYTE,$):a.texImage2D(ne+ge,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,$);return K}let q={};q[a.TEXTURE_2D]=Ze(a.TEXTURE_2D,a.TEXTURE_2D,1),q[a.TEXTURE_CUBE_MAP]=Ze(a.TEXTURE_CUBE_MAP,a.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[a.TEXTURE_2D_ARRAY]=Ze(a.TEXTURE_2D_ARRAY,a.TEXTURE_2D_ARRAY,1,1),q[a.TEXTURE_3D]=Ze(a.TEXTURE_3D,a.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),Z(a.DEPTH_TEST),r.setFunc(fa),Pe(!1),ve(Wh),Z(a.CULL_FACE),pt(Xn);function Z(k){d[k]!==!0&&(a.enable(k),d[k]=!0)}function me(k){d[k]!==!1&&(a.disable(k),d[k]=!1)}function Le(k,ne){return h[k]!==ne?(a.bindFramebuffer(k,ne),h[k]=ne,k===a.DRAW_FRAMEBUFFER&&(h[a.FRAMEBUFFER]=ne),k===a.FRAMEBUFFER&&(h[a.DRAW_FRAMEBUFFER]=ne),!0):!1}function Te(k,ne){let ae=f,pe=!1;if(k){ae=u.get(ne),ae===void 0&&(ae=[],u.set(ne,ae));let $=k.textures;if(ae.length!==$.length||ae[0]!==a.COLOR_ATTACHMENT0){for(let K=0,ge=$.length;K<ge;K++)ae[K]=a.COLOR_ATTACHMENT0+K;ae.length=$.length,pe=!0}}else ae[0]!==a.BACK&&(ae[0]=a.BACK,pe=!0);pe&&a.drawBuffers(ae)}function qe(k){return m!==k?(a.useProgram(k),m=k,!0):!1}let Kt={[Wi]:a.FUNC_ADD,[Of]:a.FUNC_SUBTRACT,[zf]:a.FUNC_REVERSE_SUBTRACT};Kt[jf]=a.MIN,Kt[Vf]=a.MAX;let F={[Gf]:a.ZERO,[Hf]:a.ONE,[Wf]:a.SRC_COLOR,[zo]:a.SRC_ALPHA,[Zf]:a.SRC_ALPHA_SATURATE,[Jf]:a.DST_COLOR,[qf]:a.DST_ALPHA,[Xf]:a.ONE_MINUS_SRC_COLOR,[jo]:a.ONE_MINUS_SRC_ALPHA,[Yf]:a.ONE_MINUS_DST_COLOR,[Kf]:a.ONE_MINUS_DST_ALPHA,[Qf]:a.CONSTANT_COLOR,[$f]:a.ONE_MINUS_CONSTANT_COLOR,[ep]:a.CONSTANT_ALPHA,[tp]:a.ONE_MINUS_CONSTANT_ALPHA};function pt(k,ne,ae,pe,$,K,ge,ke,ht,tt){if(k===Xn){g===!0&&(me(a.BLEND),g=!1);return}if(g===!1&&(Z(a.BLEND),g=!0),k!==Bf){if(k!==b||tt!==M){if((p!==Wi||v!==Wi)&&(a.blendEquation(a.FUNC_ADD),p=Wi,v=Wi),tt)switch(k){case _i:a.blendFuncSeparate(a.ONE,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case xs:a.blendFunc(a.ONE,a.ONE);break;case qh:a.blendFuncSeparate(a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ZERO,a.ONE);break;case Kh:a.blendFuncSeparate(a.DST_COLOR,a.ONE_MINUS_SRC_ALPHA,a.ZERO,a.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case _i:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case xs:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE,a.ONE,a.ONE);break;case qh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Kh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}x=null,y=null,_=null,w=null,T.set(0,0,0),I=0,b=k,M=tt}return}$=$||ne,K=K||ae,ge=ge||pe,(ne!==p||$!==v)&&(a.blendEquationSeparate(Kt[ne],Kt[$]),p=ne,v=$),(ae!==x||pe!==y||K!==_||ge!==w)&&(a.blendFuncSeparate(F[ae],F[pe],F[K],F[ge]),x=ae,y=pe,_=K,w=ge),(ke.equals(T)===!1||ht!==I)&&(a.blendColor(ke.r,ke.g,ke.b,ht),T.copy(ke),I=ht),b=k,M=!1}function Ue(k,ne){k.side===Ot?me(a.CULL_FACE):Z(a.CULL_FACE);let ae=k.side===Ft;ne&&(ae=!ae),Pe(ae),k.blending===_i&&k.transparent===!1?pt(Xn):pt(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),r.setFunc(k.depthFunc),r.setTest(k.depthTest),r.setMask(k.depthWrite),s.setMask(k.colorWrite);let pe=k.stencilWrite;o.setTest(pe),pe&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),ye(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?Z(a.SAMPLE_ALPHA_TO_COVERAGE):me(a.SAMPLE_ALPHA_TO_COVERAGE)}function Pe(k){S!==k&&(k?a.frontFace(a.CW):a.frontFace(a.CCW),S=k)}function ve(k){k!==Nf?(Z(a.CULL_FACE),k!==R&&(k===Wh?a.cullFace(a.BACK):k===Uf?a.cullFace(a.FRONT):a.cullFace(a.FRONT_AND_BACK))):me(a.CULL_FACE),R=k}function mt(k){k!==D&&(j&&a.lineWidth(k),D=k)}function ye(k,ne,ae){k?(Z(a.POLYGON_OFFSET_FILL),(L!==ne||U!==ae)&&(a.polygonOffset(ne,ae),L=ne,U=ae)):me(a.POLYGON_OFFSET_FILL)}function je(k){k?Z(a.SCISSOR_TEST):me(a.SCISSOR_TEST)}function Ut(k){k===void 0&&(k=a.TEXTURE0+z-1),Q!==k&&(a.activeTexture(k),Q=k)}function Mt(k,ne,ae){ae===void 0&&(Q===null?ae=a.TEXTURE0+z-1:ae=Q);let pe=le[ae];pe===void 0&&(pe={type:void 0,texture:void 0},le[ae]=pe),(pe.type!==k||pe.texture!==ne)&&(Q!==ae&&(a.activeTexture(ae),Q=ae),a.bindTexture(k,ne||q[k]),pe.type=k,pe.texture=ne)}function P(){let k=le[Q];k!==void 0&&k.type!==void 0&&(a.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function E(){try{a.compressedTexImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function O(){try{a.compressedTexImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function X(){try{a.texSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Y(){try{a.texSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function W(){try{a.compressedTexSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function we(){try{a.compressedTexSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ie(){try{a.texStorage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function _e(){try{a.texStorage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Me(){try{a.texImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function te(){try{a.texImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function he(k){it.equals(k)===!1&&(a.scissor(k.x,k.y,k.z,k.w),it.copy(k))}function Ie(k){lt.equals(k)===!1&&(a.viewport(k.x,k.y,k.z,k.w),lt.copy(k))}function Se(k,ne){let ae=l.get(ne);ae===void 0&&(ae=new WeakMap,l.set(ne,ae));let pe=ae.get(k);pe===void 0&&(pe=a.getUniformBlockIndex(ne,k.name),ae.set(k,pe))}function oe(k,ne){let pe=l.get(ne).get(k);c.get(ne)!==pe&&(a.uniformBlockBinding(ne,pe,k.__bindingPointIndex),c.set(ne,pe))}function Oe(){a.disable(a.BLEND),a.disable(a.CULL_FACE),a.disable(a.DEPTH_TEST),a.disable(a.POLYGON_OFFSET_FILL),a.disable(a.SCISSOR_TEST),a.disable(a.STENCIL_TEST),a.disable(a.SAMPLE_ALPHA_TO_COVERAGE),a.blendEquation(a.FUNC_ADD),a.blendFunc(a.ONE,a.ZERO),a.blendFuncSeparate(a.ONE,a.ZERO,a.ONE,a.ZERO),a.blendColor(0,0,0,0),a.colorMask(!0,!0,!0,!0),a.clearColor(0,0,0,0),a.depthMask(!0),a.depthFunc(a.LESS),r.setReversed(!1),a.clearDepth(1),a.stencilMask(4294967295),a.stencilFunc(a.ALWAYS,0,4294967295),a.stencilOp(a.KEEP,a.KEEP,a.KEEP),a.clearStencil(0),a.cullFace(a.BACK),a.frontFace(a.CCW),a.polygonOffset(0,0),a.activeTexture(a.TEXTURE0),a.bindFramebuffer(a.FRAMEBUFFER,null),a.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),a.bindFramebuffer(a.READ_FRAMEBUFFER,null),a.useProgram(null),a.lineWidth(1),a.scissor(0,0,a.canvas.width,a.canvas.height),a.viewport(0,0,a.canvas.width,a.canvas.height),d={},Q=null,le={},h={},u=new WeakMap,f=[],m=null,g=!1,b=null,p=null,x=null,y=null,v=null,_=null,w=null,T=new fe(0,0,0),I=0,M=!1,S=null,R=null,D=null,L=null,U=null,it.set(0,0,a.canvas.width,a.canvas.height),lt.set(0,0,a.canvas.width,a.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:Z,disable:me,bindFramebuffer:Le,drawBuffers:Te,useProgram:qe,setBlending:pt,setMaterial:Ue,setFlipSided:Pe,setCullFace:ve,setLineWidth:mt,setPolygonOffset:ye,setScissorTest:je,activeTexture:Ut,bindTexture:Mt,unbindTexture:P,compressedTexImage2D:E,compressedTexImage3D:O,texImage2D:Me,texImage3D:te,updateUBOMapping:Se,uniformBlockBinding:oe,texStorage2D:ie,texStorage3D:_e,texSubImage2D:X,texSubImage3D:Y,compressedTexSubImage2D:W,compressedTexSubImage3D:we,scissor:he,viewport:Ie,reset:Oe}}function s_(a,e,t,n,i,s,r){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new re,d=new WeakMap,h,u=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(P,E){return f?new OffscreenCanvas(P,E):rs("canvas")}function g(P,E,O){let X=1,Y=Mt(P);if((Y.width>O||Y.height>O)&&(X=O/Math.max(Y.width,Y.height)),X<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let W=Math.floor(X*Y.width),we=Math.floor(X*Y.height);h===void 0&&(h=m(W,we));let ie=E?m(W,we):h;return ie.width=W,ie.height=we,ie.getContext("2d").drawImage(P,0,0,W,we),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+W+"x"+we+")."),ie}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),P;return P}function b(P){return P.generateMipmaps}function p(P){a.generateMipmap(P)}function x(P){return P.isWebGLCubeRenderTarget?a.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?a.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?a.TEXTURE_2D_ARRAY:a.TEXTURE_2D}function y(P,E,O,X,Y=!1){if(P!==null){if(a[P]!==void 0)return a[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let W=E;if(E===a.RED&&(O===a.FLOAT&&(W=a.R32F),O===a.HALF_FLOAT&&(W=a.R16F),O===a.UNSIGNED_BYTE&&(W=a.R8)),E===a.RED_INTEGER&&(O===a.UNSIGNED_BYTE&&(W=a.R8UI),O===a.UNSIGNED_SHORT&&(W=a.R16UI),O===a.UNSIGNED_INT&&(W=a.R32UI),O===a.BYTE&&(W=a.R8I),O===a.SHORT&&(W=a.R16I),O===a.INT&&(W=a.R32I)),E===a.RG&&(O===a.FLOAT&&(W=a.RG32F),O===a.HALF_FLOAT&&(W=a.RG16F),O===a.UNSIGNED_BYTE&&(W=a.RG8)),E===a.RG_INTEGER&&(O===a.UNSIGNED_BYTE&&(W=a.RG8UI),O===a.UNSIGNED_SHORT&&(W=a.RG16UI),O===a.UNSIGNED_INT&&(W=a.RG32UI),O===a.BYTE&&(W=a.RG8I),O===a.SHORT&&(W=a.RG16I),O===a.INT&&(W=a.RG32I)),E===a.RGB_INTEGER&&(O===a.UNSIGNED_BYTE&&(W=a.RGB8UI),O===a.UNSIGNED_SHORT&&(W=a.RGB16UI),O===a.UNSIGNED_INT&&(W=a.RGB32UI),O===a.BYTE&&(W=a.RGB8I),O===a.SHORT&&(W=a.RGB16I),O===a.INT&&(W=a.RGB32I)),E===a.RGBA_INTEGER&&(O===a.UNSIGNED_BYTE&&(W=a.RGBA8UI),O===a.UNSIGNED_SHORT&&(W=a.RGBA16UI),O===a.UNSIGNED_INT&&(W=a.RGBA32UI),O===a.BYTE&&(W=a.RGBA8I),O===a.SHORT&&(W=a.RGBA16I),O===a.INT&&(W=a.RGBA32I)),E===a.RGB&&(O===a.UNSIGNED_INT_5_9_9_9_REV&&(W=a.RGB9_E5),O===a.UNSIGNED_INT_10F_11F_11F_REV&&(W=a.R11F_G11F_B10F)),E===a.RGBA){let we=Y?ar:Ge.getTransfer(X);O===a.FLOAT&&(W=a.RGBA32F),O===a.HALF_FLOAT&&(W=a.RGBA16F),O===a.UNSIGNED_BYTE&&(W=we===$e?a.SRGB8_ALPHA8:a.RGBA8),O===a.UNSIGNED_SHORT_4_4_4_4&&(W=a.RGBA4),O===a.UNSIGNED_SHORT_5_5_5_1&&(W=a.RGB5_A1)}return(W===a.R16F||W===a.R32F||W===a.RG16F||W===a.RG32F||W===a.RGBA16F||W===a.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function v(P,E){let O;return P?E===null||E===Nn||E===Ms?O=a.DEPTH24_STENCIL8:E===gn?O=a.DEPTH32F_STENCIL8:E===_s&&(O=a.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Nn||E===Ms?O=a.DEPTH_COMPONENT24:E===gn?O=a.DEPTH_COMPONENT32F:E===_s&&(O=a.DEPTH_COMPONENT16),O}function _(P,E){return b(P)===!0||P.isFramebufferTexture&&P.minFilter!==Vt&&P.minFilter!==sn?Math.log2(Math.max(E.width,E.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?E.mipmaps.length:1}function w(P){let E=P.target;E.removeEventListener("dispose",w),I(E),E.isVideoTexture&&d.delete(E)}function T(P){let E=P.target;E.removeEventListener("dispose",T),S(E)}function I(P){let E=n.get(P);if(E.__webglInit===void 0)return;let O=P.source,X=u.get(O);if(X){let Y=X[E.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&M(P),Object.keys(X).length===0&&u.delete(O)}n.remove(P)}function M(P){let E=n.get(P);a.deleteTexture(E.__webglTexture);let O=P.source,X=u.get(O);delete X[E.__cacheKey],r.memory.textures--}function S(P){let E=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(E.__webglFramebuffer[X]))for(let Y=0;Y<E.__webglFramebuffer[X].length;Y++)a.deleteFramebuffer(E.__webglFramebuffer[X][Y]);else a.deleteFramebuffer(E.__webglFramebuffer[X]);E.__webglDepthbuffer&&a.deleteRenderbuffer(E.__webglDepthbuffer[X])}else{if(Array.isArray(E.__webglFramebuffer))for(let X=0;X<E.__webglFramebuffer.length;X++)a.deleteFramebuffer(E.__webglFramebuffer[X]);else a.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&a.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&a.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let X=0;X<E.__webglColorRenderbuffer.length;X++)E.__webglColorRenderbuffer[X]&&a.deleteRenderbuffer(E.__webglColorRenderbuffer[X]);E.__webglDepthRenderbuffer&&a.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let O=P.textures;for(let X=0,Y=O.length;X<Y;X++){let W=n.get(O[X]);W.__webglTexture&&(a.deleteTexture(W.__webglTexture),r.memory.textures--),n.remove(O[X])}n.remove(P)}let R=0;function D(){R=0}function L(){let P=R;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),R+=1,P}function U(P){let E=[];return E.push(P.wrapS),E.push(P.wrapT),E.push(P.wrapR||0),E.push(P.magFilter),E.push(P.minFilter),E.push(P.anisotropy),E.push(P.internalFormat),E.push(P.format),E.push(P.type),E.push(P.generateMipmaps),E.push(P.premultiplyAlpha),E.push(P.flipY),E.push(P.unpackAlignment),E.push(P.colorSpace),E.join()}function z(P,E){let O=n.get(P);if(P.isVideoTexture&&je(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&O.__version!==P.version){let X=P.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(O,P,E);return}}else P.isExternalTexture&&(O.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(a.TEXTURE_2D,O.__webglTexture,a.TEXTURE0+E)}function j(P,E){let O=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&O.__version!==P.version){q(O,P,E);return}t.bindTexture(a.TEXTURE_2D_ARRAY,O.__webglTexture,a.TEXTURE0+E)}function J(P,E){let O=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&O.__version!==P.version){q(O,P,E);return}t.bindTexture(a.TEXTURE_3D,O.__webglTexture,a.TEXTURE0+E)}function H(P,E){let O=n.get(P);if(P.version>0&&O.__version!==P.version){Z(O,P,E);return}t.bindTexture(a.TEXTURE_CUBE_MAP,O.__webglTexture,a.TEXTURE0+E)}let Q={[Xi]:a.REPEAT,[ei]:a.CLAMP_TO_EDGE,[as]:a.MIRRORED_REPEAT},le={[Vt]:a.NEAREST,[Sc]:a.NEAREST_MIPMAP_NEAREST,[Ta]:a.NEAREST_MIPMAP_LINEAR,[sn]:a.LINEAR,[ys]:a.LINEAR_MIPMAP_NEAREST,[qn]:a.LINEAR_MIPMAP_LINEAR},xe={[lp]:a.NEVER,[mp]:a.ALWAYS,[hp]:a.LESS,[ad]:a.LEQUAL,[dp]:a.EQUAL,[pp]:a.GEQUAL,[up]:a.GREATER,[fp]:a.NOTEQUAL};function Ne(P,E){if(E.type===gn&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===sn||E.magFilter===ys||E.magFilter===Ta||E.magFilter===qn||E.minFilter===sn||E.minFilter===ys||E.minFilter===Ta||E.minFilter===qn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),a.texParameteri(P,a.TEXTURE_WRAP_S,Q[E.wrapS]),a.texParameteri(P,a.TEXTURE_WRAP_T,Q[E.wrapT]),(P===a.TEXTURE_3D||P===a.TEXTURE_2D_ARRAY)&&a.texParameteri(P,a.TEXTURE_WRAP_R,Q[E.wrapR]),a.texParameteri(P,a.TEXTURE_MAG_FILTER,le[E.magFilter]),a.texParameteri(P,a.TEXTURE_MIN_FILTER,le[E.minFilter]),E.compareFunction&&(a.texParameteri(P,a.TEXTURE_COMPARE_MODE,a.COMPARE_REF_TO_TEXTURE),a.texParameteri(P,a.TEXTURE_COMPARE_FUNC,xe[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Vt||E.minFilter!==Ta&&E.minFilter!==qn||E.type===gn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let O=e.get("EXT_texture_filter_anisotropic");a.texParameterf(P,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function it(P,E){let O=!1;P.__webglInit===void 0&&(P.__webglInit=!0,E.addEventListener("dispose",w));let X=E.source,Y=u.get(X);Y===void 0&&(Y={},u.set(X,Y));let W=U(E);if(W!==P.__cacheKey){Y[W]===void 0&&(Y[W]={texture:a.createTexture(),usedTimes:0},r.memory.textures++,O=!0),Y[W].usedTimes++;let we=Y[P.__cacheKey];we!==void 0&&(Y[P.__cacheKey].usedTimes--,we.usedTimes===0&&M(E)),P.__cacheKey=W,P.__webglTexture=Y[W].texture}return O}function lt(P,E,O){return Math.floor(Math.floor(P/O)/E)}function Ze(P,E,O,X){let W=P.updateRanges;if(W.length===0)t.texSubImage2D(a.TEXTURE_2D,0,0,0,E.width,E.height,O,X,E.data);else{W.sort((te,he)=>te.start-he.start);let we=0;for(let te=1;te<W.length;te++){let he=W[we],Ie=W[te],Se=he.start+he.count,oe=lt(Ie.start,E.width,4),Oe=lt(he.start,E.width,4);Ie.start<=Se+1&&oe===Oe&&lt(Ie.start+Ie.count-1,E.width,4)===oe?he.count=Math.max(he.count,Ie.start+Ie.count-he.start):(++we,W[we]=Ie)}W.length=we+1;let ie=a.getParameter(a.UNPACK_ROW_LENGTH),_e=a.getParameter(a.UNPACK_SKIP_PIXELS),Me=a.getParameter(a.UNPACK_SKIP_ROWS);a.pixelStorei(a.UNPACK_ROW_LENGTH,E.width);for(let te=0,he=W.length;te<he;te++){let Ie=W[te],Se=Math.floor(Ie.start/4),oe=Math.ceil(Ie.count/4),Oe=Se%E.width,k=Math.floor(Se/E.width),ne=oe,ae=1;a.pixelStorei(a.UNPACK_SKIP_PIXELS,Oe),a.pixelStorei(a.UNPACK_SKIP_ROWS,k),t.texSubImage2D(a.TEXTURE_2D,0,Oe,k,ne,ae,O,X,E.data)}P.clearUpdateRanges(),a.pixelStorei(a.UNPACK_ROW_LENGTH,ie),a.pixelStorei(a.UNPACK_SKIP_PIXELS,_e),a.pixelStorei(a.UNPACK_SKIP_ROWS,Me)}}function q(P,E,O){let X=a.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(X=a.TEXTURE_2D_ARRAY),E.isData3DTexture&&(X=a.TEXTURE_3D);let Y=it(P,E),W=E.source;t.bindTexture(X,P.__webglTexture,a.TEXTURE0+O);let we=n.get(W);if(W.version!==we.__version||Y===!0){t.activeTexture(a.TEXTURE0+O);let ie=Ge.getPrimaries(Ge.workingColorSpace),_e=E.colorSpace===Di?null:Ge.getPrimaries(E.colorSpace),Me=E.colorSpace===Di||ie===_e?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,E.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,E.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);let te=g(E.image,!1,i.maxTextureSize);te=Ut(E,te);let he=s.convert(E.format,E.colorSpace),Ie=s.convert(E.type),Se=y(E.internalFormat,he,Ie,E.colorSpace,E.isVideoTexture);Ne(X,E);let oe,Oe=E.mipmaps,k=E.isVideoTexture!==!0,ne=we.__version===void 0||Y===!0,ae=W.dataReady,pe=_(E,te);if(E.isDepthTexture)Se=v(E.format===Ss,E.type),ne&&(k?t.texStorage2D(a.TEXTURE_2D,1,Se,te.width,te.height):t.texImage2D(a.TEXTURE_2D,0,Se,te.width,te.height,0,he,Ie,null));else if(E.isDataTexture)if(Oe.length>0){k&&ne&&t.texStorage2D(a.TEXTURE_2D,pe,Se,Oe[0].width,Oe[0].height);for(let $=0,K=Oe.length;$<K;$++)oe=Oe[$],k?ae&&t.texSubImage2D(a.TEXTURE_2D,$,0,0,oe.width,oe.height,he,Ie,oe.data):t.texImage2D(a.TEXTURE_2D,$,Se,oe.width,oe.height,0,he,Ie,oe.data);E.generateMipmaps=!1}else k?(ne&&t.texStorage2D(a.TEXTURE_2D,pe,Se,te.width,te.height),ae&&Ze(E,te,he,Ie)):t.texImage2D(a.TEXTURE_2D,0,Se,te.width,te.height,0,he,Ie,te.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){k&&ne&&t.texStorage3D(a.TEXTURE_2D_ARRAY,pe,Se,Oe[0].width,Oe[0].height,te.depth);for(let $=0,K=Oe.length;$<K;$++)if(oe=Oe[$],E.format!==rn)if(he!==null)if(k){if(ae)if(E.layerUpdates.size>0){let ge=ud(oe.width,oe.height,E.format,E.type);for(let ke of E.layerUpdates){let ht=oe.data.subarray(ke*ge/oe.data.BYTES_PER_ELEMENT,(ke+1)*ge/oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,$,0,0,ke,oe.width,oe.height,1,he,ht)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,$,0,0,0,oe.width,oe.height,te.depth,he,oe.data)}else t.compressedTexImage3D(a.TEXTURE_2D_ARRAY,$,Se,oe.width,oe.height,te.depth,0,oe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else k?ae&&t.texSubImage3D(a.TEXTURE_2D_ARRAY,$,0,0,0,oe.width,oe.height,te.depth,he,Ie,oe.data):t.texImage3D(a.TEXTURE_2D_ARRAY,$,Se,oe.width,oe.height,te.depth,0,he,Ie,oe.data)}else{k&&ne&&t.texStorage2D(a.TEXTURE_2D,pe,Se,Oe[0].width,Oe[0].height);for(let $=0,K=Oe.length;$<K;$++)oe=Oe[$],E.format!==rn?he!==null?k?ae&&t.compressedTexSubImage2D(a.TEXTURE_2D,$,0,0,oe.width,oe.height,he,oe.data):t.compressedTexImage2D(a.TEXTURE_2D,$,Se,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):k?ae&&t.texSubImage2D(a.TEXTURE_2D,$,0,0,oe.width,oe.height,he,Ie,oe.data):t.texImage2D(a.TEXTURE_2D,$,Se,oe.width,oe.height,0,he,Ie,oe.data)}else if(E.isDataArrayTexture)if(k){if(ne&&t.texStorage3D(a.TEXTURE_2D_ARRAY,pe,Se,te.width,te.height,te.depth),ae)if(E.layerUpdates.size>0){let $=ud(te.width,te.height,E.format,E.type);for(let K of E.layerUpdates){let ge=te.data.subarray(K*$/te.data.BYTES_PER_ELEMENT,(K+1)*$/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,K,te.width,te.height,1,he,Ie,ge)}E.clearLayerUpdates()}else t.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,he,Ie,te.data)}else t.texImage3D(a.TEXTURE_2D_ARRAY,0,Se,te.width,te.height,te.depth,0,he,Ie,te.data);else if(E.isData3DTexture)k?(ne&&t.texStorage3D(a.TEXTURE_3D,pe,Se,te.width,te.height,te.depth),ae&&t.texSubImage3D(a.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,he,Ie,te.data)):t.texImage3D(a.TEXTURE_3D,0,Se,te.width,te.height,te.depth,0,he,Ie,te.data);else if(E.isFramebufferTexture){if(ne)if(k)t.texStorage2D(a.TEXTURE_2D,pe,Se,te.width,te.height);else{let $=te.width,K=te.height;for(let ge=0;ge<pe;ge++)t.texImage2D(a.TEXTURE_2D,ge,Se,$,K,0,he,Ie,null),$>>=1,K>>=1}}else if(Oe.length>0){if(k&&ne){let $=Mt(Oe[0]);t.texStorage2D(a.TEXTURE_2D,pe,Se,$.width,$.height)}for(let $=0,K=Oe.length;$<K;$++)oe=Oe[$],k?ae&&t.texSubImage2D(a.TEXTURE_2D,$,0,0,he,Ie,oe):t.texImage2D(a.TEXTURE_2D,$,Se,he,Ie,oe);E.generateMipmaps=!1}else if(k){if(ne){let $=Mt(te);t.texStorage2D(a.TEXTURE_2D,pe,Se,$.width,$.height)}ae&&t.texSubImage2D(a.TEXTURE_2D,0,0,0,he,Ie,te)}else t.texImage2D(a.TEXTURE_2D,0,Se,he,Ie,te);b(E)&&p(X),we.__version=W.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function Z(P,E,O){if(E.image.length!==6)return;let X=it(P,E),Y=E.source;t.bindTexture(a.TEXTURE_CUBE_MAP,P.__webglTexture,a.TEXTURE0+O);let W=n.get(Y);if(Y.version!==W.__version||X===!0){t.activeTexture(a.TEXTURE0+O);let we=Ge.getPrimaries(Ge.workingColorSpace),ie=E.colorSpace===Di?null:Ge.getPrimaries(E.colorSpace),_e=E.colorSpace===Di||we===ie?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,E.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,E.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);let Me=E.isCompressedTexture||E.image[0].isCompressedTexture,te=E.image[0]&&E.image[0].isDataTexture,he=[];for(let K=0;K<6;K++)!Me&&!te?he[K]=g(E.image[K],!0,i.maxCubemapSize):he[K]=te?E.image[K].image:E.image[K],he[K]=Ut(E,he[K]);let Ie=he[0],Se=s.convert(E.format,E.colorSpace),oe=s.convert(E.type),Oe=y(E.internalFormat,Se,oe,E.colorSpace),k=E.isVideoTexture!==!0,ne=W.__version===void 0||X===!0,ae=Y.dataReady,pe=_(E,Ie);Ne(a.TEXTURE_CUBE_MAP,E);let $;if(Me){k&&ne&&t.texStorage2D(a.TEXTURE_CUBE_MAP,pe,Oe,Ie.width,Ie.height);for(let K=0;K<6;K++){$=he[K].mipmaps;for(let ge=0;ge<$.length;ge++){let ke=$[ge];E.format!==rn?Se!==null?k?ae&&t.compressedTexSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge,0,0,ke.width,ke.height,Se,ke.data):t.compressedTexImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge,Oe,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?ae&&t.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge,0,0,ke.width,ke.height,Se,oe,ke.data):t.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge,Oe,ke.width,ke.height,0,Se,oe,ke.data)}}}else{if($=E.mipmaps,k&&ne){$.length>0&&pe++;let K=Mt(he[0]);t.texStorage2D(a.TEXTURE_CUBE_MAP,pe,Oe,K.width,K.height)}for(let K=0;K<6;K++)if(te){k?ae&&t.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,he[K].width,he[K].height,Se,oe,he[K].data):t.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Oe,he[K].width,he[K].height,0,Se,oe,he[K].data);for(let ge=0;ge<$.length;ge++){let ht=$[ge].image[K].image;k?ae&&t.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge+1,0,0,ht.width,ht.height,Se,oe,ht.data):t.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge+1,Oe,ht.width,ht.height,0,Se,oe,ht.data)}}else{k?ae&&t.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Se,oe,he[K]):t.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Oe,Se,oe,he[K]);for(let ge=0;ge<$.length;ge++){let ke=$[ge];k?ae&&t.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge+1,0,0,Se,oe,ke.image[K]):t.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge+1,Oe,Se,oe,ke.image[K])}}}b(E)&&p(a.TEXTURE_CUBE_MAP),W.__version=Y.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function me(P,E,O,X,Y,W){let we=s.convert(O.format,O.colorSpace),ie=s.convert(O.type),_e=y(O.internalFormat,we,ie,O.colorSpace),Me=n.get(E),te=n.get(O);if(te.__renderTarget=E,!Me.__hasExternalTextures){let he=Math.max(1,E.width>>W),Ie=Math.max(1,E.height>>W);Y===a.TEXTURE_3D||Y===a.TEXTURE_2D_ARRAY?t.texImage3D(Y,W,_e,he,Ie,E.depth,0,we,ie,null):t.texImage2D(Y,W,_e,he,Ie,0,we,ie,null)}t.bindFramebuffer(a.FRAMEBUFFER,P),ye(E)?o.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,X,Y,te.__webglTexture,0,mt(E)):(Y===a.TEXTURE_2D||Y>=a.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=a.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&a.framebufferTexture2D(a.FRAMEBUFFER,X,Y,te.__webglTexture,W),t.bindFramebuffer(a.FRAMEBUFFER,null)}function Le(P,E,O){if(a.bindRenderbuffer(a.RENDERBUFFER,P),E.depthBuffer){let X=E.depthTexture,Y=X&&X.isDepthTexture?X.type:null,W=v(E.stencilBuffer,Y),we=E.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,ie=mt(E);ye(E)?o.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,ie,W,E.width,E.height):O?a.renderbufferStorageMultisample(a.RENDERBUFFER,ie,W,E.width,E.height):a.renderbufferStorage(a.RENDERBUFFER,W,E.width,E.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,we,a.RENDERBUFFER,P)}else{let X=E.textures;for(let Y=0;Y<X.length;Y++){let W=X[Y],we=s.convert(W.format,W.colorSpace),ie=s.convert(W.type),_e=y(W.internalFormat,we,ie,W.colorSpace),Me=mt(E);O&&ye(E)===!1?a.renderbufferStorageMultisample(a.RENDERBUFFER,Me,_e,E.width,E.height):ye(E)?o.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,Me,_e,E.width,E.height):a.renderbufferStorage(a.RENDERBUFFER,_e,E.width,E.height)}}a.bindRenderbuffer(a.RENDERBUFFER,null)}function Te(P,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(a.FRAMEBUFFER,P),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let X=n.get(E.depthTexture);X.__renderTarget=E,(!X.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),z(E.depthTexture,0);let Y=X.__webglTexture,W=mt(E);if(E.depthTexture.format===ss)ye(E)?o.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,Y,0,W):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,Y,0);else if(E.depthTexture.format===Ss)ye(E)?o.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,Y,0,W):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,Y,0);else throw new Error("Unknown depthTexture format")}function qe(P){let E=n.get(P),O=P.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==P.depthTexture){let X=P.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),X){let Y=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,X.removeEventListener("dispose",Y)};X.addEventListener("dispose",Y),E.__depthDisposeCallback=Y}E.__boundDepthTexture=X}if(P.depthTexture&&!E.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");let X=P.texture.mipmaps;X&&X.length>0?Te(E.__webglFramebuffer[0],P):Te(E.__webglFramebuffer,P)}else if(O){E.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(a.FRAMEBUFFER,E.__webglFramebuffer[X]),E.__webglDepthbuffer[X]===void 0)E.__webglDepthbuffer[X]=a.createRenderbuffer(),Le(E.__webglDepthbuffer[X],P,!1);else{let Y=P.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,W=E.__webglDepthbuffer[X];a.bindRenderbuffer(a.RENDERBUFFER,W),a.framebufferRenderbuffer(a.FRAMEBUFFER,Y,a.RENDERBUFFER,W)}}else{let X=P.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(a.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(a.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=a.createRenderbuffer(),Le(E.__webglDepthbuffer,P,!1);else{let Y=P.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,W=E.__webglDepthbuffer;a.bindRenderbuffer(a.RENDERBUFFER,W),a.framebufferRenderbuffer(a.FRAMEBUFFER,Y,a.RENDERBUFFER,W)}}t.bindFramebuffer(a.FRAMEBUFFER,null)}function Kt(P,E,O){let X=n.get(P);E!==void 0&&me(X.__webglFramebuffer,P,P.texture,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,0),O!==void 0&&qe(P)}function F(P){let E=P.texture,O=n.get(P),X=n.get(E);P.addEventListener("dispose",T);let Y=P.textures,W=P.isWebGLCubeRenderTarget===!0,we=Y.length>1;if(we||(X.__webglTexture===void 0&&(X.__webglTexture=a.createTexture()),X.__version=E.version,r.memory.textures++),W){O.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(E.mipmaps&&E.mipmaps.length>0){O.__webglFramebuffer[ie]=[];for(let _e=0;_e<E.mipmaps.length;_e++)O.__webglFramebuffer[ie][_e]=a.createFramebuffer()}else O.__webglFramebuffer[ie]=a.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){O.__webglFramebuffer=[];for(let ie=0;ie<E.mipmaps.length;ie++)O.__webglFramebuffer[ie]=a.createFramebuffer()}else O.__webglFramebuffer=a.createFramebuffer();if(we)for(let ie=0,_e=Y.length;ie<_e;ie++){let Me=n.get(Y[ie]);Me.__webglTexture===void 0&&(Me.__webglTexture=a.createTexture(),r.memory.textures++)}if(P.samples>0&&ye(P)===!1){O.__webglMultisampledFramebuffer=a.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(a.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ie=0;ie<Y.length;ie++){let _e=Y[ie];O.__webglColorRenderbuffer[ie]=a.createRenderbuffer(),a.bindRenderbuffer(a.RENDERBUFFER,O.__webglColorRenderbuffer[ie]);let Me=s.convert(_e.format,_e.colorSpace),te=s.convert(_e.type),he=y(_e.internalFormat,Me,te,_e.colorSpace,P.isXRRenderTarget===!0),Ie=mt(P);a.renderbufferStorageMultisample(a.RENDERBUFFER,Ie,he,P.width,P.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+ie,a.RENDERBUFFER,O.__webglColorRenderbuffer[ie])}a.bindRenderbuffer(a.RENDERBUFFER,null),P.depthBuffer&&(O.__webglDepthRenderbuffer=a.createRenderbuffer(),Le(O.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(a.FRAMEBUFFER,null)}}if(W){t.bindTexture(a.TEXTURE_CUBE_MAP,X.__webglTexture),Ne(a.TEXTURE_CUBE_MAP,E);for(let ie=0;ie<6;ie++)if(E.mipmaps&&E.mipmaps.length>0)for(let _e=0;_e<E.mipmaps.length;_e++)me(O.__webglFramebuffer[ie][_e],P,E,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+ie,_e);else me(O.__webglFramebuffer[ie],P,E,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);b(E)&&p(a.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(we){for(let ie=0,_e=Y.length;ie<_e;ie++){let Me=Y[ie],te=n.get(Me),he=a.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(he=P.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY),t.bindTexture(he,te.__webglTexture),Ne(he,Me),me(O.__webglFramebuffer,P,Me,a.COLOR_ATTACHMENT0+ie,he,0),b(Me)&&p(he)}t.unbindTexture()}else{let ie=a.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ie=P.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY),t.bindTexture(ie,X.__webglTexture),Ne(ie,E),E.mipmaps&&E.mipmaps.length>0)for(let _e=0;_e<E.mipmaps.length;_e++)me(O.__webglFramebuffer[_e],P,E,a.COLOR_ATTACHMENT0,ie,_e);else me(O.__webglFramebuffer,P,E,a.COLOR_ATTACHMENT0,ie,0);b(E)&&p(ie),t.unbindTexture()}P.depthBuffer&&qe(P)}function pt(P){let E=P.textures;for(let O=0,X=E.length;O<X;O++){let Y=E[O];if(b(Y)){let W=x(P),we=n.get(Y).__webglTexture;t.bindTexture(W,we),p(W),t.unbindTexture()}}}let Ue=[],Pe=[];function ve(P){if(P.samples>0){if(ye(P)===!1){let E=P.textures,O=P.width,X=P.height,Y=a.COLOR_BUFFER_BIT,W=P.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,we=n.get(P),ie=E.length>1;if(ie)for(let Me=0;Me<E.length;Me++)t.bindFramebuffer(a.FRAMEBUFFER,we.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+Me,a.RENDERBUFFER,null),t.bindFramebuffer(a.FRAMEBUFFER,we.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+Me,a.TEXTURE_2D,null,0);t.bindFramebuffer(a.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer);let _e=P.texture.mipmaps;_e&&_e.length>0?t.bindFramebuffer(a.DRAW_FRAMEBUFFER,we.__webglFramebuffer[0]):t.bindFramebuffer(a.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let Me=0;Me<E.length;Me++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(Y|=a.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(Y|=a.STENCIL_BUFFER_BIT)),ie){a.framebufferRenderbuffer(a.READ_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.RENDERBUFFER,we.__webglColorRenderbuffer[Me]);let te=n.get(E[Me]).__webglTexture;a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,te,0)}a.blitFramebuffer(0,0,O,X,0,0,O,X,Y,a.NEAREST),c===!0&&(Ue.length=0,Pe.length=0,Ue.push(a.COLOR_ATTACHMENT0+Me),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Ue.push(W),Pe.push(W),a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,Pe)),a.invalidateFramebuffer(a.READ_FRAMEBUFFER,Ue))}if(t.bindFramebuffer(a.READ_FRAMEBUFFER,null),t.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),ie)for(let Me=0;Me<E.length;Me++){t.bindFramebuffer(a.FRAMEBUFFER,we.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+Me,a.RENDERBUFFER,we.__webglColorRenderbuffer[Me]);let te=n.get(E[Me]).__webglTexture;t.bindFramebuffer(a.FRAMEBUFFER,we.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+Me,a.TEXTURE_2D,te,0)}t.bindFramebuffer(a.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){let E=P.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT;a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,[E])}}}function mt(P){return Math.min(i.maxSamples,P.samples)}function ye(P){let E=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function je(P){let E=r.render.frame;d.get(P)!==E&&(d.set(P,E),P.update())}function Ut(P,E){let O=P.colorSpace,X=P.format,Y=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||O!==Gt&&O!==Di&&(Ge.getTransfer(O)===$e?(X!==rn||Y!==Kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),E}function Mt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=L,this.resetTextureUnits=D,this.setTexture2D=z,this.setTexture2DArray=j,this.setTexture3D=J,this.setTextureCube=H,this.rebindTextures=Kt,this.setupRenderTarget=F,this.updateRenderTargetMipmap=pt,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=qe,this.setupFrameBufferTexture=me,this.useMultisampledRTT=ye}function r_(a,e){function t(n,i=Di){let s,r=Ge.getTransfer(i);if(n===Kn)return a.UNSIGNED_BYTE;if(n===Tc)return a.UNSIGNED_SHORT_4_4_4_4;if(n===Ec)return a.UNSIGNED_SHORT_5_5_5_1;if(n===Qh)return a.UNSIGNED_INT_5_9_9_9_REV;if(n===$h)return a.UNSIGNED_INT_10F_11F_11F_REV;if(n===Yh)return a.BYTE;if(n===Zh)return a.SHORT;if(n===_s)return a.UNSIGNED_SHORT;if(n===wc)return a.INT;if(n===Nn)return a.UNSIGNED_INT;if(n===gn)return a.FLOAT;if(n===en)return a.HALF_FLOAT;if(n===ed)return a.ALPHA;if(n===td)return a.RGB;if(n===rn)return a.RGBA;if(n===ss)return a.DEPTH_COMPONENT;if(n===Ss)return a.DEPTH_STENCIL;if(n===Ac)return a.RED;if(n===kr)return a.RED_INTEGER;if(n===nd)return a.RG;if(n===Rc)return a.RG_INTEGER;if(n===Cc)return a.RGBA_INTEGER;if(n===Nr||n===Ur||n===Br||n===Or)if(r===$e)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Nr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ur)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Br)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Or)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Nr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ur)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Br)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Or)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ic||n===Pc||n===Dc||n===Fc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Ic)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Pc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Dc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Fc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Lc||n===kc||n===Nc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Lc||n===kc)return r===$e?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Nc)return r===$e?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Uc||n===Bc||n===Oc||n===zc||n===jc||n===Vc||n===Gc||n===Hc||n===Wc||n===Xc||n===qc||n===Kc||n===Jc||n===Yc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Uc)return r===$e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Bc)return r===$e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Oc)return r===$e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===zc)return r===$e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===jc)return r===$e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Vc)return r===$e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Gc)return r===$e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Hc)return r===$e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Wc)return r===$e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Xc)return r===$e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===qc)return r===$e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Kc)return r===$e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Jc)return r===$e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Yc)return r===$e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Zc||n===Qc||n===$c)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Zc)return r===$e?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Qc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===$c)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===el||n===tl||n===nl||n===il)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===el)return s.COMPRESSED_RED_RGTC1_EXT;if(n===tl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===nl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===il)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ms?a.UNSIGNED_INT_24_8:a[n]!==void 0?a[n]:null}return{convert:t}}var o_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,c_=`
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

}`,Td=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new br(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new ut({vertexShader:o_,fragmentShader:c_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ze(new _a(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ed=class extends Mi{constructor(e,t){super();let n=this,i=null,s=1,r=null,o="local-floor",c=1,l=null,d=null,h=null,u=null,f=null,m=null,g=typeof XRWebGLBinding<"u",b=new Td,p={},x=t.getContextAttributes(),y=null,v=null,_=[],w=[],T=new re,I=null,M=new Rt;M.viewport=new Xe;let S=new Rt;S.viewport=new Xe;let R=[M,S],D=new sc,L=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Z=_[q];return Z===void 0&&(Z=new hs,_[q]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(q){let Z=_[q];return Z===void 0&&(Z=new hs,_[q]=Z),Z.getGripSpace()},this.getHand=function(q){let Z=_[q];return Z===void 0&&(Z=new hs,_[q]=Z),Z.getHandSpace()};function z(q){let Z=w.indexOf(q.inputSource);if(Z===-1)return;let me=_[Z];me!==void 0&&(me.update(q.inputSource,q.frame,l||r),me.dispatchEvent({type:q.type,data:q.inputSource}))}function j(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",j),i.removeEventListener("inputsourceschange",J);for(let q=0;q<_.length;q++){let Z=w[q];Z!==null&&(w[q]=null,_[q].disconnect(Z))}L=null,U=null,b.reset();for(let q in p)delete p[q];e.setRenderTarget(y),f=null,u=null,h=null,i=null,v=null,Ze.stop(),n.isPresenting=!1,e.setPixelRatio(I),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return h===null&&g&&(h=new XRWebGLBinding(i,t)),h},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(q){if(i=q,i!==null){if(y=e.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",j),i.addEventListener("inputsourceschange",J),x.xrCompatible!==!0&&await t.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(T),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,Le=null,Te=null;x.depth&&(Te=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=x.stencil?Ss:ss,Le=x.stencil?Ms:Nn);let qe={colorFormat:t.RGBA8,depthFormat:Te,scaleFactor:s};h=this.getBinding(),u=h.createProjectionLayer(qe),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),v=new It(u.textureWidth,u.textureHeight,{format:rn,type:Kn,depthTexture:new Ki(u.textureWidth,u.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let me={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,me),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new It(f.framebufferWidth,f.framebufferHeight,{format:rn,type:Kn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,r=await i.requestReferenceSpace(o),Ze.setContext(i),Ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return b.getDepthTexture()};function J(q){for(let Z=0;Z<q.removed.length;Z++){let me=q.removed[Z],Le=w.indexOf(me);Le>=0&&(w[Le]=null,_[Le].disconnect(me))}for(let Z=0;Z<q.added.length;Z++){let me=q.added[Z],Le=w.indexOf(me);if(Le===-1){for(let qe=0;qe<_.length;qe++)if(qe>=w.length){w.push(me),Le=qe;break}else if(w[qe]===null){w[qe]=me,Le=qe;break}if(Le===-1)break}let Te=_[Le];Te&&Te.connect(me)}}let H=new C,Q=new C;function le(q,Z,me){H.setFromMatrixPosition(Z.matrixWorld),Q.setFromMatrixPosition(me.matrixWorld);let Le=H.distanceTo(Q),Te=Z.projectionMatrix.elements,qe=me.projectionMatrix.elements,Kt=Te[14]/(Te[10]-1),F=Te[14]/(Te[10]+1),pt=(Te[9]+1)/Te[5],Ue=(Te[9]-1)/Te[5],Pe=(Te[8]-1)/Te[0],ve=(qe[8]+1)/qe[0],mt=Kt*Pe,ye=Kt*ve,je=Le/(-Pe+ve),Ut=je*-Pe;if(Z.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ut),q.translateZ(je),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Te[10]===-1)q.projectionMatrix.copy(Z.projectionMatrix),q.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{let Mt=Kt+je,P=F+je,E=mt-Ut,O=ye+(Le-Ut),X=pt*F/P*Mt,Y=Ue*F/P*Mt;q.projectionMatrix.makePerspective(E,O,X,Y,Mt,P),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function xe(q,Z){Z===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Z.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(i===null)return;let Z=q.near,me=q.far;b.texture!==null&&(b.depthNear>0&&(Z=b.depthNear),b.depthFar>0&&(me=b.depthFar)),D.near=S.near=M.near=Z,D.far=S.far=M.far=me,(L!==D.near||U!==D.far)&&(i.updateRenderState({depthNear:D.near,depthFar:D.far}),L=D.near,U=D.far),D.layers.mask=q.layers.mask|6,M.layers.mask=D.layers.mask&3,S.layers.mask=D.layers.mask&5;let Le=q.parent,Te=D.cameras;xe(D,Le);for(let qe=0;qe<Te.length;qe++)xe(Te[qe],Le);Te.length===2?le(D,M,S):D.projectionMatrix.copy(M.projectionMatrix),Ne(q,D,Le)};function Ne(q,Z,me){me===null?q.matrix.copy(Z.matrixWorld):(q.matrix.copy(me.matrixWorld),q.matrix.invert(),q.matrix.multiply(Z.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(Z.projectionMatrix),q.projectionMatrixInverse.copy(Z.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=ba*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(q){c=q,u!==null&&(u.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return b.texture!==null},this.getDepthSensingMesh=function(){return b.getMesh(D)},this.getCameraTexture=function(q){return p[q]};let it=null;function lt(q,Z){if(d=Z.getViewerPose(l||r),m=Z,d!==null){let me=d.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let Le=!1;me.length!==D.cameras.length&&(D.cameras.length=0,Le=!0);for(let F=0;F<me.length;F++){let pt=me[F],Ue=null;if(f!==null)Ue=f.getViewport(pt);else{let ve=h.getViewSubImage(u,pt);Ue=ve.viewport,F===0&&(e.setRenderTargetTextures(v,ve.colorTexture,ve.depthStencilTexture),e.setRenderTarget(v))}let Pe=R[F];Pe===void 0&&(Pe=new Rt,Pe.layers.enable(F),Pe.viewport=new Xe,R[F]=Pe),Pe.matrix.fromArray(pt.transform.matrix),Pe.matrix.decompose(Pe.position,Pe.quaternion,Pe.scale),Pe.projectionMatrix.fromArray(pt.projectionMatrix),Pe.projectionMatrixInverse.copy(Pe.projectionMatrix).invert(),Pe.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),F===0&&(D.matrix.copy(Pe.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Le===!0&&D.cameras.push(Pe)}let Te=i.enabledFeatures;if(Te&&Te.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&g){h=n.getBinding();let F=h.getDepthInformation(me[0]);F&&F.isValid&&F.texture&&b.init(F,i.renderState)}if(Te&&Te.includes("camera-access")&&g){e.state.unbindTexture(),h=n.getBinding();for(let F=0;F<me.length;F++){let pt=me[F].camera;if(pt){let Ue=p[pt];Ue||(Ue=new br,p[pt]=Ue);let Pe=h.getCameraImage(pt);Ue.sourceTexture=Pe}}}}for(let me=0;me<_.length;me++){let Le=w[me],Te=_[me];Le!==null&&Te!==void 0&&Te.update(Le,Z,l||r)}it&&it(q,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),m=null}let Ze=new Hp;Ze.setAnimationLoop(lt),this.setAnimationLoop=function(q){it=q},this.dispose=function(){}}},Ra=new cn,l_=new de;function h_(a,e){function t(b,p){b.matrixAutoUpdate===!0&&b.updateMatrix(),p.value.copy(b.matrix)}function n(b,p){p.color.getRGB(b.fogColor.value,cd(a)),p.isFog?(b.fogNear.value=p.near,b.fogFar.value=p.far):p.isFogExp2&&(b.fogDensity.value=p.density)}function i(b,p,x,y,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(b,p):p.isMeshToonMaterial?(s(b,p),h(b,p)):p.isMeshPhongMaterial?(s(b,p),d(b,p)):p.isMeshStandardMaterial?(s(b,p),u(b,p),p.isMeshPhysicalMaterial&&f(b,p,v)):p.isMeshMatcapMaterial?(s(b,p),m(b,p)):p.isMeshDepthMaterial?s(b,p):p.isMeshDistanceMaterial?(s(b,p),g(b,p)):p.isMeshNormalMaterial?s(b,p):p.isLineBasicMaterial?(r(b,p),p.isLineDashedMaterial&&o(b,p)):p.isPointsMaterial?c(b,p,x,y):p.isSpriteMaterial?l(b,p):p.isShadowMaterial?(b.color.value.copy(p.color),b.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(b,p){b.opacity.value=p.opacity,p.color&&b.diffuse.value.copy(p.color),p.emissive&&b.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(b.map.value=p.map,t(p.map,b.mapTransform)),p.alphaMap&&(b.alphaMap.value=p.alphaMap,t(p.alphaMap,b.alphaMapTransform)),p.bumpMap&&(b.bumpMap.value=p.bumpMap,t(p.bumpMap,b.bumpMapTransform),b.bumpScale.value=p.bumpScale,p.side===Ft&&(b.bumpScale.value*=-1)),p.normalMap&&(b.normalMap.value=p.normalMap,t(p.normalMap,b.normalMapTransform),b.normalScale.value.copy(p.normalScale),p.side===Ft&&b.normalScale.value.negate()),p.displacementMap&&(b.displacementMap.value=p.displacementMap,t(p.displacementMap,b.displacementMapTransform),b.displacementScale.value=p.displacementScale,b.displacementBias.value=p.displacementBias),p.emissiveMap&&(b.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,b.emissiveMapTransform)),p.specularMap&&(b.specularMap.value=p.specularMap,t(p.specularMap,b.specularMapTransform)),p.alphaTest>0&&(b.alphaTest.value=p.alphaTest);let x=e.get(p),y=x.envMap,v=x.envMapRotation;y&&(b.envMap.value=y,Ra.copy(v),Ra.x*=-1,Ra.y*=-1,Ra.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ra.y*=-1,Ra.z*=-1),b.envMapRotation.value.setFromMatrix4(l_.makeRotationFromEuler(Ra)),b.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,b.reflectivity.value=p.reflectivity,b.ior.value=p.ior,b.refractionRatio.value=p.refractionRatio),p.lightMap&&(b.lightMap.value=p.lightMap,b.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,b.lightMapTransform)),p.aoMap&&(b.aoMap.value=p.aoMap,b.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,b.aoMapTransform))}function r(b,p){b.diffuse.value.copy(p.color),b.opacity.value=p.opacity,p.map&&(b.map.value=p.map,t(p.map,b.mapTransform))}function o(b,p){b.dashSize.value=p.dashSize,b.totalSize.value=p.dashSize+p.gapSize,b.scale.value=p.scale}function c(b,p,x,y){b.diffuse.value.copy(p.color),b.opacity.value=p.opacity,b.size.value=p.size*x,b.scale.value=y*.5,p.map&&(b.map.value=p.map,t(p.map,b.uvTransform)),p.alphaMap&&(b.alphaMap.value=p.alphaMap,t(p.alphaMap,b.alphaMapTransform)),p.alphaTest>0&&(b.alphaTest.value=p.alphaTest)}function l(b,p){b.diffuse.value.copy(p.color),b.opacity.value=p.opacity,b.rotation.value=p.rotation,p.map&&(b.map.value=p.map,t(p.map,b.mapTransform)),p.alphaMap&&(b.alphaMap.value=p.alphaMap,t(p.alphaMap,b.alphaMapTransform)),p.alphaTest>0&&(b.alphaTest.value=p.alphaTest)}function d(b,p){b.specular.value.copy(p.specular),b.shininess.value=Math.max(p.shininess,1e-4)}function h(b,p){p.gradientMap&&(b.gradientMap.value=p.gradientMap)}function u(b,p){b.metalness.value=p.metalness,p.metalnessMap&&(b.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,b.metalnessMapTransform)),b.roughness.value=p.roughness,p.roughnessMap&&(b.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,b.roughnessMapTransform)),p.envMap&&(b.envMapIntensity.value=p.envMapIntensity)}function f(b,p,x){b.ior.value=p.ior,p.sheen>0&&(b.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),b.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(b.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,b.sheenColorMapTransform)),p.sheenRoughnessMap&&(b.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,b.sheenRoughnessMapTransform))),p.clearcoat>0&&(b.clearcoat.value=p.clearcoat,b.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(b.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,b.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(b.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,b.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(b.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,b.clearcoatNormalMapTransform),b.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ft&&b.clearcoatNormalScale.value.negate())),p.dispersion>0&&(b.dispersion.value=p.dispersion),p.iridescence>0&&(b.iridescence.value=p.iridescence,b.iridescenceIOR.value=p.iridescenceIOR,b.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],b.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(b.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,b.iridescenceMapTransform)),p.iridescenceThicknessMap&&(b.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,b.iridescenceThicknessMapTransform))),p.transmission>0&&(b.transmission.value=p.transmission,b.transmissionSamplerMap.value=x.texture,b.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(b.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,b.transmissionMapTransform)),b.thickness.value=p.thickness,p.thicknessMap&&(b.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,b.thicknessMapTransform)),b.attenuationDistance.value=p.attenuationDistance,b.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(b.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(b.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,b.anisotropyMapTransform))),b.specularIntensity.value=p.specularIntensity,b.specularColor.value.copy(p.specularColor),p.specularColorMap&&(b.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,b.specularColorMapTransform)),p.specularIntensityMap&&(b.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,b.specularIntensityMapTransform))}function m(b,p){p.matcap&&(b.matcap.value=p.matcap)}function g(b,p){let x=e.get(p).light;b.referencePosition.value.setFromMatrixPosition(x.matrixWorld),b.nearDistance.value=x.shadow.camera.near,b.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function d_(a,e,t,n){let i={},s={},r=[],o=a.getParameter(a.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,y){let v=y.program;n.uniformBlockBinding(x,v)}function l(x,y){let v=i[x.id];v===void 0&&(m(x),v=d(x),i[x.id]=v,x.addEventListener("dispose",b));let _=y.program;n.updateUBOMapping(x,_);let w=e.render.frame;s[x.id]!==w&&(u(x),s[x.id]=w)}function d(x){let y=h();x.__bindingPointIndex=y;let v=a.createBuffer(),_=x.__size,w=x.usage;return a.bindBuffer(a.UNIFORM_BUFFER,v),a.bufferData(a.UNIFORM_BUFFER,_,w),a.bindBuffer(a.UNIFORM_BUFFER,null),a.bindBufferBase(a.UNIFORM_BUFFER,y,v),v}function h(){for(let x=0;x<o;x++)if(r.indexOf(x)===-1)return r.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){let y=i[x.id],v=x.uniforms,_=x.__cache;a.bindBuffer(a.UNIFORM_BUFFER,y);for(let w=0,T=v.length;w<T;w++){let I=Array.isArray(v[w])?v[w]:[v[w]];for(let M=0,S=I.length;M<S;M++){let R=I[M];if(f(R,w,M,_)===!0){let D=R.__offset,L=Array.isArray(R.value)?R.value:[R.value],U=0;for(let z=0;z<L.length;z++){let j=L[z],J=g(j);typeof j=="number"||typeof j=="boolean"?(R.__data[0]=j,a.bufferSubData(a.UNIFORM_BUFFER,D+U,R.__data)):j.isMatrix3?(R.__data[0]=j.elements[0],R.__data[1]=j.elements[1],R.__data[2]=j.elements[2],R.__data[3]=0,R.__data[4]=j.elements[3],R.__data[5]=j.elements[4],R.__data[6]=j.elements[5],R.__data[7]=0,R.__data[8]=j.elements[6],R.__data[9]=j.elements[7],R.__data[10]=j.elements[8],R.__data[11]=0):(j.toArray(R.__data,U),U+=J.storage/Float32Array.BYTES_PER_ELEMENT)}a.bufferSubData(a.UNIFORM_BUFFER,D,R.__data)}}}a.bindBuffer(a.UNIFORM_BUFFER,null)}function f(x,y,v,_){let w=x.value,T=y+"_"+v;if(_[T]===void 0)return typeof w=="number"||typeof w=="boolean"?_[T]=w:_[T]=w.clone(),!0;{let I=_[T];if(typeof w=="number"||typeof w=="boolean"){if(I!==w)return _[T]=w,!0}else if(I.equals(w)===!1)return I.copy(w),!0}return!1}function m(x){let y=x.uniforms,v=0,_=16;for(let T=0,I=y.length;T<I;T++){let M=Array.isArray(y[T])?y[T]:[y[T]];for(let S=0,R=M.length;S<R;S++){let D=M[S],L=Array.isArray(D.value)?D.value:[D.value];for(let U=0,z=L.length;U<z;U++){let j=L[U],J=g(j),H=v%_,Q=H%J.boundary,le=H+Q;v+=Q,le!==0&&_-le<J.storage&&(v+=_-le),D.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=v,v+=J.storage}}}let w=v%_;return w>0&&(v+=_-w),x.__size=v,x.__cache={},this}function g(x){let y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),y}function b(x){let y=x.target;y.removeEventListener("dispose",b);let v=r.indexOf(y.__bindingPointIndex);r.splice(v,1),a.deleteBuffer(i[y.id]),delete i[y.id],delete s[y.id]}function p(){for(let x in i)a.deleteBuffer(i[x]);r=[],i={},s={}}return{bind:c,update:l,dispose:p}}var cl=class{constructor(e={}){let{canvas:t=bp(),context:n=null,depth:i=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=r;let m=new Uint32Array(4),g=new Int32Array(4),b=null,p=null,x=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Pi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let v=this,_=!1;this._outputColorSpace=St;let w=0,T=0,I=null,M=-1,S=null,R=new Xe,D=new Xe,L=null,U=new fe(0),z=0,j=t.width,J=t.height,H=1,Q=null,le=null,xe=new Xe(0,0,j,J),Ne=new Xe(0,0,j,J),it=!1,lt=new qi,Ze=!1,q=!1,Z=new de,me=new C,Le=new Xe,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},qe=!1;function Kt(){return I===null?H:1}let F=n;function pt(A,N){return t.getContext(A,N)}try{let A={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",pe,!1),t.addEventListener("webglcontextcreationerror",$,!1),F===null){let N="webgl2";if(F=pt(N,A),F===null)throw pt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Ue,Pe,ve,mt,ye,je,Ut,Mt,P,E,O,X,Y,W,we,ie,_e,Me,te,he,Ie,Se,oe,Oe;function k(){Ue=new Cy(F),Ue.init(),Se=new r_(F,Ue),Pe=new My(F,Ue,e,Se),ve=new a_(F,Ue),Pe.reversedDepthBuffer&&u&&ve.buffers.depth.setReversed(!0),mt=new Dy(F),ye=new W0,je=new s_(F,Ue,ve,ye,Pe,Se,mt),Ut=new wy(v),Mt=new Ry(v),P=new Bg(F),oe=new yy(F,P),E=new Iy(F,P,mt,oe),O=new Ly(F,E,P,mt),te=new Fy(F,Pe,je),ie=new Sy(ye),X=new H0(v,Ut,Mt,Ue,Pe,oe,ie),Y=new h_(v,ye),W=new q0,we=new $0(Ue),Me=new vy(v,Ut,Mt,ve,O,f,c),_e=new n_(v,O,Pe),Oe=new d_(F,mt,Pe,ve),he=new _y(F,Ue,mt),Ie=new Py(F,Ue,mt),mt.programs=X.programs,v.capabilities=Pe,v.extensions=Ue,v.properties=ye,v.renderLists=W,v.shadowMap=_e,v.state=ve,v.info=mt}k();let ne=new Ed(v,F);this.xr=ne,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let A=Ue.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=Ue.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(A){A!==void 0&&(H=A,this.setSize(j,J,!1))},this.getSize=function(A){return A.set(j,J)},this.setSize=function(A,N,V=!0){if(ne.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}j=A,J=N,t.width=Math.floor(A*H),t.height=Math.floor(N*H),V===!0&&(t.style.width=A+"px",t.style.height=N+"px"),this.setViewport(0,0,A,N)},this.getDrawingBufferSize=function(A){return A.set(j*H,J*H).floor()},this.setDrawingBufferSize=function(A,N,V){j=A,J=N,H=V,t.width=Math.floor(A*V),t.height=Math.floor(N*V),this.setViewport(0,0,A,N)},this.getCurrentViewport=function(A){return A.copy(R)},this.getViewport=function(A){return A.copy(xe)},this.setViewport=function(A,N,V,G){A.isVector4?xe.set(A.x,A.y,A.z,A.w):xe.set(A,N,V,G),ve.viewport(R.copy(xe).multiplyScalar(H).round())},this.getScissor=function(A){return A.copy(Ne)},this.setScissor=function(A,N,V,G){A.isVector4?Ne.set(A.x,A.y,A.z,A.w):Ne.set(A,N,V,G),ve.scissor(D.copy(Ne).multiplyScalar(H).round())},this.getScissorTest=function(){return it},this.setScissorTest=function(A){ve.setScissorTest(it=A)},this.setOpaqueSort=function(A){Q=A},this.setTransparentSort=function(A){le=A},this.getClearColor=function(A){return A.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor(...arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha(...arguments)},this.clear=function(A=!0,N=!0,V=!0){let G=0;if(A){let B=!1;if(I!==null){let ee=I.texture.format;B=ee===Cc||ee===Rc||ee===kr}if(B){let ee=I.texture.type,ce=ee===Kn||ee===Nn||ee===_s||ee===Ms||ee===Tc||ee===Ec,be=Me.getClearColor(),ue=Me.getClearAlpha(),Ce=be.r,De=be.g,Ee=be.b;ce?(m[0]=Ce,m[1]=De,m[2]=Ee,m[3]=ue,F.clearBufferuiv(F.COLOR,0,m)):(g[0]=Ce,g[1]=De,g[2]=Ee,g[3]=ue,F.clearBufferiv(F.COLOR,0,g))}else G|=F.COLOR_BUFFER_BIT}N&&(G|=F.DEPTH_BUFFER_BIT),V&&(G|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",pe,!1),t.removeEventListener("webglcontextcreationerror",$,!1),Me.dispose(),W.dispose(),we.dispose(),ye.dispose(),Ut.dispose(),Mt.dispose(),O.dispose(),oe.dispose(),Oe.dispose(),X.dispose(),ne.dispose(),ne.removeEventListener("sessionstart",Zn),ne.removeEventListener("sessionend",Vu),aa.stop()};function ae(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),_=!0}function pe(){console.log("THREE.WebGLRenderer: Context Restored."),_=!1;let A=mt.autoReset,N=_e.enabled,V=_e.autoUpdate,G=_e.needsUpdate,B=_e.type;k(),mt.autoReset=A,_e.enabled=N,_e.autoUpdate=V,_e.needsUpdate=G,_e.type=B}function $(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function K(A){let N=A.target;N.removeEventListener("dispose",K),ge(N)}function ge(A){ke(A),ye.remove(A)}function ke(A){let N=ye.get(A).programs;N!==void 0&&(N.forEach(function(V){X.releaseProgram(V)}),A.isShaderMaterial&&X.releaseShaderCache(A))}this.renderBufferDirect=function(A,N,V,G,B,ee){N===null&&(N=Te);let ce=B.isMesh&&B.matrixWorld.determinant()<0,be=Mb(A,N,V,G,B);ve.setMaterial(G,ce);let ue=V.index,Ce=1;if(G.wireframe===!0){if(ue=E.getWireframeAttribute(V),ue===void 0)return;Ce=2}let De=V.drawRange,Ee=V.attributes.position,We=De.start*Ce,at=(De.start+De.count)*Ce;ee!==null&&(We=Math.max(We,ee.start*Ce),at=Math.min(at,(ee.start+ee.count)*Ce)),ue!==null?(We=Math.max(We,0),at=Math.min(at,ue.count)):Ee!=null&&(We=Math.max(We,0),at=Math.min(at,Ee.count));let vt=at-We;if(vt<0||vt===1/0)return;oe.setup(B,G,be,V,ue);let ft,st=he;if(ue!==null&&(ft=P.get(ue),st=Ie,st.setIndex(ft)),B.isMesh)G.wireframe===!0?(ve.setLineWidth(G.wireframeLinewidth*Kt()),st.setMode(F.LINES)):st.setMode(F.TRIANGLES);else if(B.isLine){let Ae=G.linewidth;Ae===void 0&&(Ae=1),ve.setLineWidth(Ae*Kt()),B.isLineSegments?st.setMode(F.LINES):B.isLineLoop?st.setMode(F.LINE_LOOP):st.setMode(F.LINE_STRIP)}else B.isPoints?st.setMode(F.POINTS):B.isSprite&&st.setMode(F.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)os("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),st.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(Ue.get("WEBGL_multi_draw"))st.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let Ae=B._multiDrawStarts,bt=B._multiDrawCounts,Qe=B._multiDrawCount,_n=ue?P.get(ue).bytesPerElement:1,za=ye.get(G).currentProgram.getUniforms();for(let Mn=0;Mn<Qe;Mn++)za.setValue(F,"_gl_DrawID",Mn),st.render(Ae[Mn]/_n,bt[Mn])}else if(B.isInstancedMesh)st.renderInstances(We,vt,B.count);else if(V.isInstancedBufferGeometry){let Ae=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,bt=Math.min(V.instanceCount,Ae);st.renderInstances(We,vt,bt)}else st.render(We,vt)};function ht(A,N,V){A.transparent===!0&&A.side===Ot&&A.forceSinglePass===!1?(A.side=Ft,A.needsUpdate=!0,lo(A,N,V),A.side=$t,A.needsUpdate=!0,lo(A,N,V),A.side=Ot):lo(A,N,V)}this.compile=function(A,N,V=null){V===null&&(V=A),p=we.get(V),p.init(N),y.push(p),V.traverseVisible(function(B){B.isLight&&B.layers.test(N.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),A!==V&&A.traverseVisible(function(B){B.isLight&&B.layers.test(N.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();let G=new Set;return A.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let ee=B.material;if(ee)if(Array.isArray(ee))for(let ce=0;ce<ee.length;ce++){let be=ee[ce];ht(be,V,B),G.add(be)}else ht(ee,V,B),G.add(ee)}),p=y.pop(),G},this.compileAsync=function(A,N,V=null){let G=this.compile(A,N,V);return new Promise(B=>{function ee(){if(G.forEach(function(ce){ye.get(ce).currentProgram.isReady()&&G.delete(ce)}),G.size===0){B(A);return}setTimeout(ee,10)}Ue.get("KHR_parallel_shader_compile")!==null?ee():setTimeout(ee,10)})};let tt=null;function fi(A){tt&&tt(A)}function Zn(){aa.stop()}function Vu(){aa.start()}let aa=new Hp;aa.setAnimationLoop(fi),typeof self<"u"&&aa.setContext(self),this.setAnimationLoop=function(A){tt=A,ne.setAnimationLoop(A),A===null?aa.stop():aa.start()},ne.addEventListener("sessionstart",Zn),ne.addEventListener("sessionend",Vu),this.render=function(A,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(_===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),ne.enabled===!0&&ne.isPresenting===!0&&(ne.cameraAutoUpdate===!0&&ne.updateCamera(N),N=ne.getCamera()),A.isScene===!0&&A.onBeforeRender(v,A,N,I),p=we.get(A,y.length),p.init(N),y.push(p),Z.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),lt.setFromProjectionMatrix(Z,Fn,N.reversedDepth),q=this.localClippingEnabled,Ze=ie.init(this.clippingPlanes,q),b=W.get(A,x.length),b.init(),x.push(b),ne.enabled===!0&&ne.isPresenting===!0){let ee=v.xr.getDepthSensingMesh();ee!==null&&Yl(ee,N,-1/0,v.sortObjects)}Yl(A,N,0,v.sortObjects),b.finish(),v.sortObjects===!0&&b.sort(Q,le),qe=ne.enabled===!1||ne.isPresenting===!1||ne.hasDepthSensing()===!1,qe&&Me.addToRenderList(b,A),this.info.render.frame++,Ze===!0&&ie.beginShadows();let V=p.state.shadowsArray;_e.render(V,A,N),Ze===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset();let G=b.opaque,B=b.transmissive;if(p.setupLights(),N.isArrayCamera){let ee=N.cameras;if(B.length>0)for(let ce=0,be=ee.length;ce<be;ce++){let ue=ee[ce];Hu(G,B,A,ue)}qe&&Me.render(A);for(let ce=0,be=ee.length;ce<be;ce++){let ue=ee[ce];Gu(b,A,ue,ue.viewport)}}else B.length>0&&Hu(G,B,A,N),qe&&Me.render(A),Gu(b,A,N);I!==null&&T===0&&(je.updateMultisampleRenderTarget(I),je.updateRenderTargetMipmap(I)),A.isScene===!0&&A.onAfterRender(v,A,N),oe.resetDefaultState(),M=-1,S=null,y.pop(),y.length>0?(p=y[y.length-1],Ze===!0&&ie.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?b=x[x.length-1]:b=null};function Yl(A,N,V,G){if(A.visible===!1)return;if(A.layers.test(N.layers)){if(A.isGroup)V=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(N);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||lt.intersectsSprite(A)){G&&Le.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Z);let ce=O.update(A),be=A.material;be.visible&&b.push(A,ce,be,V,Le.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||lt.intersectsObject(A))){let ce=O.update(A),be=A.material;if(G&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Le.copy(A.boundingSphere.center)):(ce.boundingSphere===null&&ce.computeBoundingSphere(),Le.copy(ce.boundingSphere.center)),Le.applyMatrix4(A.matrixWorld).applyMatrix4(Z)),Array.isArray(be)){let ue=ce.groups;for(let Ce=0,De=ue.length;Ce<De;Ce++){let Ee=ue[Ce],We=be[Ee.materialIndex];We&&We.visible&&b.push(A,ce,We,V,Le.z,Ee)}}else be.visible&&b.push(A,ce,be,V,Le.z,null)}}let ee=A.children;for(let ce=0,be=ee.length;ce<be;ce++)Yl(ee[ce],N,V,G)}function Gu(A,N,V,G){let B=A.opaque,ee=A.transmissive,ce=A.transparent;p.setupLightsView(V),Ze===!0&&ie.setGlobalState(v.clippingPlanes,V),G&&ve.viewport(R.copy(G)),B.length>0&&co(B,N,V),ee.length>0&&co(ee,N,V),ce.length>0&&co(ce,N,V),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function Hu(A,N,V,G){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new It(1,1,{generateMipmaps:!0,type:Ue.has("EXT_color_buffer_half_float")||Ue.has("EXT_color_buffer_float")?en:Kn,minFilter:qn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ge.workingColorSpace}));let ee=p.state.transmissionRenderTarget[G.id],ce=G.viewport||R;ee.setSize(ce.z*v.transmissionResolutionScale,ce.w*v.transmissionResolutionScale);let be=v.getRenderTarget(),ue=v.getActiveCubeFace(),Ce=v.getActiveMipmapLevel();v.setRenderTarget(ee),v.getClearColor(U),z=v.getClearAlpha(),z<1&&v.setClearColor(16777215,.5),v.clear(),qe&&Me.render(V);let De=v.toneMapping;v.toneMapping=Pi;let Ee=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),Ze===!0&&ie.setGlobalState(v.clippingPlanes,G),co(A,V,G),je.updateMultisampleRenderTarget(ee),je.updateRenderTargetMipmap(ee),Ue.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let at=0,vt=N.length;at<vt;at++){let ft=N[at],st=ft.object,Ae=ft.geometry,bt=ft.material,Qe=ft.group;if(bt.side===Ot&&st.layers.test(G.layers)){let _n=bt.side;bt.side=Ft,bt.needsUpdate=!0,Wu(st,V,G,Ae,bt,Qe),bt.side=_n,bt.needsUpdate=!0,We=!0}}We===!0&&(je.updateMultisampleRenderTarget(ee),je.updateRenderTargetMipmap(ee))}v.setRenderTarget(be,ue,Ce),v.setClearColor(U,z),Ee!==void 0&&(G.viewport=Ee),v.toneMapping=De}function co(A,N,V){let G=N.isScene===!0?N.overrideMaterial:null;for(let B=0,ee=A.length;B<ee;B++){let ce=A[B],be=ce.object,ue=ce.geometry,Ce=ce.group,De=ce.material;De.allowOverride===!0&&G!==null&&(De=G),be.layers.test(V.layers)&&Wu(be,N,V,ue,De,Ce)}}function Wu(A,N,V,G,B,ee){A.onBeforeRender(v,N,V,G,B,ee),A.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),B.onBeforeRender(v,N,V,G,A,ee),B.transparent===!0&&B.side===Ot&&B.forceSinglePass===!1?(B.side=Ft,B.needsUpdate=!0,v.renderBufferDirect(V,N,G,B,A,ee),B.side=$t,B.needsUpdate=!0,v.renderBufferDirect(V,N,G,B,A,ee),B.side=Ot):v.renderBufferDirect(V,N,G,B,A,ee),A.onAfterRender(v,N,V,G,B,ee)}function lo(A,N,V){N.isScene!==!0&&(N=Te);let G=ye.get(A),B=p.state.lights,ee=p.state.shadowsArray,ce=B.state.version,be=X.getParameters(A,B.state,ee,N,V),ue=X.getProgramCacheKey(be),Ce=G.programs;G.environment=A.isMeshStandardMaterial?N.environment:null,G.fog=N.fog,G.envMap=(A.isMeshStandardMaterial?Mt:Ut).get(A.envMap||G.environment),G.envMapRotation=G.environment!==null&&A.envMap===null?N.environmentRotation:A.envMapRotation,Ce===void 0&&(A.addEventListener("dispose",K),Ce=new Map,G.programs=Ce);let De=Ce.get(ue);if(De!==void 0){if(G.currentProgram===De&&G.lightsStateVersion===ce)return qu(A,be),De}else be.uniforms=X.getUniforms(A),A.onBeforeCompile(be,v),De=X.acquireProgram(be,ue),Ce.set(ue,De),G.uniforms=be.uniforms;let Ee=G.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ee.clippingPlanes=ie.uniform),qu(A,be),G.needsLights=wb(A),G.lightsStateVersion=ce,G.needsLights&&(Ee.ambientLightColor.value=B.state.ambient,Ee.lightProbe.value=B.state.probe,Ee.directionalLights.value=B.state.directional,Ee.directionalLightShadows.value=B.state.directionalShadow,Ee.spotLights.value=B.state.spot,Ee.spotLightShadows.value=B.state.spotShadow,Ee.rectAreaLights.value=B.state.rectArea,Ee.ltc_1.value=B.state.rectAreaLTC1,Ee.ltc_2.value=B.state.rectAreaLTC2,Ee.pointLights.value=B.state.point,Ee.pointLightShadows.value=B.state.pointShadow,Ee.hemisphereLights.value=B.state.hemi,Ee.directionalShadowMap.value=B.state.directionalShadowMap,Ee.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Ee.spotShadowMap.value=B.state.spotShadowMap,Ee.spotLightMatrix.value=B.state.spotLightMatrix,Ee.spotLightMap.value=B.state.spotLightMap,Ee.pointShadowMap.value=B.state.pointShadowMap,Ee.pointShadowMatrix.value=B.state.pointShadowMatrix),G.currentProgram=De,G.uniformsList=null,De}function Xu(A){if(A.uniformsList===null){let N=A.currentProgram.getUniforms();A.uniformsList=As.seqWithValue(N.seq,A.uniforms)}return A.uniformsList}function qu(A,N){let V=ye.get(A);V.outputColorSpace=N.outputColorSpace,V.batching=N.batching,V.batchingColor=N.batchingColor,V.instancing=N.instancing,V.instancingColor=N.instancingColor,V.instancingMorph=N.instancingMorph,V.skinning=N.skinning,V.morphTargets=N.morphTargets,V.morphNormals=N.morphNormals,V.morphColors=N.morphColors,V.morphTargetsCount=N.morphTargetsCount,V.numClippingPlanes=N.numClippingPlanes,V.numIntersection=N.numClipIntersection,V.vertexAlphas=N.vertexAlphas,V.vertexTangents=N.vertexTangents,V.toneMapping=N.toneMapping}function Mb(A,N,V,G,B){N.isScene!==!0&&(N=Te),je.resetTextureUnits();let ee=N.fog,ce=G.isMeshStandardMaterial?N.environment:null,be=I===null?v.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Gt,ue=(G.isMeshStandardMaterial?Mt:Ut).get(G.envMap||ce),Ce=G.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,De=!!V.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ee=!!V.morphAttributes.position,We=!!V.morphAttributes.normal,at=!!V.morphAttributes.color,vt=Pi;G.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(vt=v.toneMapping);let ft=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,st=ft!==void 0?ft.length:0,Ae=ye.get(G),bt=p.state.lights;if(Ze===!0&&(q===!0||A!==S)){let nn=A===S&&G.id===M;ie.setState(G,A,nn)}let Qe=!1;G.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==bt.state.version||Ae.outputColorSpace!==be||B.isBatchedMesh&&Ae.batching===!1||!B.isBatchedMesh&&Ae.batching===!0||B.isBatchedMesh&&Ae.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ae.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ae.instancing===!1||!B.isInstancedMesh&&Ae.instancing===!0||B.isSkinnedMesh&&Ae.skinning===!1||!B.isSkinnedMesh&&Ae.skinning===!0||B.isInstancedMesh&&Ae.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ae.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ae.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ae.instancingMorph===!1&&B.morphTexture!==null||Ae.envMap!==ue||G.fog===!0&&Ae.fog!==ee||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==ie.numPlanes||Ae.numIntersection!==ie.numIntersection)||Ae.vertexAlphas!==Ce||Ae.vertexTangents!==De||Ae.morphTargets!==Ee||Ae.morphNormals!==We||Ae.morphColors!==at||Ae.toneMapping!==vt||Ae.morphTargetsCount!==st)&&(Qe=!0):(Qe=!0,Ae.__version=G.version);let _n=Ae.currentProgram;Qe===!0&&(_n=lo(G,N,B));let za=!1,Mn=!1,Xs=!1,gt=_n.getUniforms(),In=Ae.uniforms;if(ve.useProgram(_n.program)&&(za=!0,Mn=!0,Xs=!0),G.id!==M&&(M=G.id,Mn=!0),za||S!==A){ve.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),gt.setValue(F,"projectionMatrix",A.projectionMatrix),gt.setValue(F,"viewMatrix",A.matrixWorldInverse);let pn=gt.map.cameraPosition;pn!==void 0&&pn.setValue(F,me.setFromMatrixPosition(A.matrixWorld)),Pe.logarithmicDepthBuffer&&gt.setValue(F,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&gt.setValue(F,"isOrthographic",A.isOrthographicCamera===!0),S!==A&&(S=A,Mn=!0,Xs=!0)}if(B.isSkinnedMesh){gt.setOptional(F,B,"bindMatrix"),gt.setOptional(F,B,"bindMatrixInverse");let nn=B.skeleton;nn&&(nn.boneTexture===null&&nn.computeBoneTexture(),gt.setValue(F,"boneTexture",nn.boneTexture,je))}B.isBatchedMesh&&(gt.setOptional(F,B,"batchingTexture"),gt.setValue(F,"batchingTexture",B._matricesTexture,je),gt.setOptional(F,B,"batchingIdTexture"),gt.setValue(F,"batchingIdTexture",B._indirectTexture,je),gt.setOptional(F,B,"batchingColorTexture"),B._colorsTexture!==null&&gt.setValue(F,"batchingColorTexture",B._colorsTexture,je));let Pn=V.morphAttributes;if((Pn.position!==void 0||Pn.normal!==void 0||Pn.color!==void 0)&&te.update(B,V,_n),(Mn||Ae.receiveShadow!==B.receiveShadow)&&(Ae.receiveShadow=B.receiveShadow,gt.setValue(F,"receiveShadow",B.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(In.envMap.value=ue,In.flipEnvMap.value=ue.isCubeTexture&&ue.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&N.environment!==null&&(In.envMapIntensity.value=N.environmentIntensity),Mn&&(gt.setValue(F,"toneMappingExposure",v.toneMappingExposure),Ae.needsLights&&Sb(In,Xs),ee&&G.fog===!0&&Y.refreshFogUniforms(In,ee),Y.refreshMaterialUniforms(In,G,H,J,p.state.transmissionRenderTarget[A.id]),As.upload(F,Xu(Ae),In,je)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(As.upload(F,Xu(Ae),In,je),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&gt.setValue(F,"center",B.center),gt.setValue(F,"modelViewMatrix",B.modelViewMatrix),gt.setValue(F,"normalMatrix",B.normalMatrix),gt.setValue(F,"modelMatrix",B.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){let nn=G.uniformsGroups;for(let pn=0,Zl=nn.length;pn<Zl;pn++){let sa=nn[pn];Oe.update(sa,_n),Oe.bind(sa,_n)}}return _n}function Sb(A,N){A.ambientLightColor.needsUpdate=N,A.lightProbe.needsUpdate=N,A.directionalLights.needsUpdate=N,A.directionalLightShadows.needsUpdate=N,A.pointLights.needsUpdate=N,A.pointLightShadows.needsUpdate=N,A.spotLights.needsUpdate=N,A.spotLightShadows.needsUpdate=N,A.rectAreaLights.needsUpdate=N,A.hemisphereLights.needsUpdate=N}function wb(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(A,N,V){let G=ye.get(A);G.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),ye.get(A.texture).__webglTexture=N,ye.get(A.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:V,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,N){let V=ye.get(A);V.__webglFramebuffer=N,V.__useDefaultFramebuffer=N===void 0};let Tb=F.createFramebuffer();this.setRenderTarget=function(A,N=0,V=0){I=A,w=N,T=V;let G=!0,B=null,ee=!1,ce=!1;if(A){let ue=ye.get(A);if(ue.__useDefaultFramebuffer!==void 0)ve.bindFramebuffer(F.FRAMEBUFFER,null),G=!1;else if(ue.__webglFramebuffer===void 0)je.setupRenderTarget(A);else if(ue.__hasExternalTextures)je.rebindTextures(A,ye.get(A.texture).__webglTexture,ye.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let Ee=A.depthTexture;if(ue.__boundDepthTexture!==Ee){if(Ee!==null&&ye.has(Ee)&&(A.width!==Ee.image.width||A.height!==Ee.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");je.setupDepthRenderbuffer(A)}}let Ce=A.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(ce=!0);let De=ye.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(De[N])?B=De[N][V]:B=De[N],ee=!0):A.samples>0&&je.useMultisampledRTT(A)===!1?B=ye.get(A).__webglMultisampledFramebuffer:Array.isArray(De)?B=De[V]:B=De,R.copy(A.viewport),D.copy(A.scissor),L=A.scissorTest}else R.copy(xe).multiplyScalar(H).floor(),D.copy(Ne).multiplyScalar(H).floor(),L=it;if(V!==0&&(B=Tb),ve.bindFramebuffer(F.FRAMEBUFFER,B)&&G&&ve.drawBuffers(A,B),ve.viewport(R),ve.scissor(D),ve.setScissorTest(L),ee){let ue=ye.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+N,ue.__webglTexture,V)}else if(ce){let ue=N;for(let Ce=0;Ce<A.textures.length;Ce++){let De=ye.get(A.textures[Ce]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Ce,De.__webglTexture,V,ue)}}else if(A!==null&&V!==0){let ue=ye.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ue.__webglTexture,V)}M=-1},this.readRenderTargetPixels=function(A,N,V,G,B,ee,ce,be=0){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ue=ye.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ce!==void 0&&(ue=ue[ce]),ue){ve.bindFramebuffer(F.FRAMEBUFFER,ue);try{let Ce=A.textures[be],De=Ce.format,Ee=Ce.type;if(!Pe.textureFormatReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Pe.textureTypeReadable(Ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=A.width-G&&V>=0&&V<=A.height-B&&(A.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+be),F.readPixels(N,V,G,B,Se.convert(De),Se.convert(Ee),ee))}finally{let Ce=I!==null?ye.get(I).__webglFramebuffer:null;ve.bindFramebuffer(F.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(A,N,V,G,B,ee,ce,be=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ue=ye.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ce!==void 0&&(ue=ue[ce]),ue)if(N>=0&&N<=A.width-G&&V>=0&&V<=A.height-B){ve.bindFramebuffer(F.FRAMEBUFFER,ue);let Ce=A.textures[be],De=Ce.format,Ee=Ce.type;if(!Pe.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Pe.textureTypeReadable(Ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let We=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,We),F.bufferData(F.PIXEL_PACK_BUFFER,ee.byteLength,F.STREAM_READ),A.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+be),F.readPixels(N,V,G,B,Se.convert(De),Se.convert(Ee),0);let at=I!==null?ye.get(I).__webglFramebuffer:null;ve.bindFramebuffer(F.FRAMEBUFFER,at);let vt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await gp(F,vt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,We),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,ee),F.deleteBuffer(We),F.deleteSync(vt),ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,N=null,V=0){let G=Math.pow(2,-V),B=Math.floor(A.image.width*G),ee=Math.floor(A.image.height*G),ce=N!==null?N.x:0,be=N!==null?N.y:0;je.setTexture2D(A,0),F.copyTexSubImage2D(F.TEXTURE_2D,V,0,0,ce,be,B,ee),ve.unbindTexture()};let Eb=F.createFramebuffer(),Ab=F.createFramebuffer();this.copyTextureToTexture=function(A,N,V=null,G=null,B=0,ee=null){ee===null&&(B!==0?(os("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ee=B,B=0):ee=0);let ce,be,ue,Ce,De,Ee,We,at,vt,ft=A.isCompressedTexture?A.mipmaps[ee]:A.image;if(V!==null)ce=V.max.x-V.min.x,be=V.max.y-V.min.y,ue=V.isBox3?V.max.z-V.min.z:1,Ce=V.min.x,De=V.min.y,Ee=V.isBox3?V.min.z:0;else{let Pn=Math.pow(2,-B);ce=Math.floor(ft.width*Pn),be=Math.floor(ft.height*Pn),A.isDataArrayTexture?ue=ft.depth:A.isData3DTexture?ue=Math.floor(ft.depth*Pn):ue=1,Ce=0,De=0,Ee=0}G!==null?(We=G.x,at=G.y,vt=G.z):(We=0,at=0,vt=0);let st=Se.convert(N.format),Ae=Se.convert(N.type),bt;N.isData3DTexture?(je.setTexture3D(N,0),bt=F.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(je.setTexture2DArray(N,0),bt=F.TEXTURE_2D_ARRAY):(je.setTexture2D(N,0),bt=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,N.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,N.unpackAlignment);let Qe=F.getParameter(F.UNPACK_ROW_LENGTH),_n=F.getParameter(F.UNPACK_IMAGE_HEIGHT),za=F.getParameter(F.UNPACK_SKIP_PIXELS),Mn=F.getParameter(F.UNPACK_SKIP_ROWS),Xs=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,ft.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ft.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Ce),F.pixelStorei(F.UNPACK_SKIP_ROWS,De),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ee);let gt=A.isDataArrayTexture||A.isData3DTexture,In=N.isDataArrayTexture||N.isData3DTexture;if(A.isDepthTexture){let Pn=ye.get(A),nn=ye.get(N),pn=ye.get(Pn.__renderTarget),Zl=ye.get(nn.__renderTarget);ve.bindFramebuffer(F.READ_FRAMEBUFFER,pn.__webglFramebuffer),ve.bindFramebuffer(F.DRAW_FRAMEBUFFER,Zl.__webglFramebuffer);for(let sa=0;sa<ue;sa++)gt&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ye.get(A).__webglTexture,B,Ee+sa),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ye.get(N).__webglTexture,ee,vt+sa)),F.blitFramebuffer(Ce,De,ce,be,We,at,ce,be,F.DEPTH_BUFFER_BIT,F.NEAREST);ve.bindFramebuffer(F.READ_FRAMEBUFFER,null),ve.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(B!==0||A.isRenderTargetTexture||ye.has(A)){let Pn=ye.get(A),nn=ye.get(N);ve.bindFramebuffer(F.READ_FRAMEBUFFER,Eb),ve.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ab);for(let pn=0;pn<ue;pn++)gt?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Pn.__webglTexture,B,Ee+pn):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Pn.__webglTexture,B),In?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,nn.__webglTexture,ee,vt+pn):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,nn.__webglTexture,ee),B!==0?F.blitFramebuffer(Ce,De,ce,be,We,at,ce,be,F.COLOR_BUFFER_BIT,F.NEAREST):In?F.copyTexSubImage3D(bt,ee,We,at,vt+pn,Ce,De,ce,be):F.copyTexSubImage2D(bt,ee,We,at,Ce,De,ce,be);ve.bindFramebuffer(F.READ_FRAMEBUFFER,null),ve.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else In?A.isDataTexture||A.isData3DTexture?F.texSubImage3D(bt,ee,We,at,vt,ce,be,ue,st,Ae,ft.data):N.isCompressedArrayTexture?F.compressedTexSubImage3D(bt,ee,We,at,vt,ce,be,ue,st,ft.data):F.texSubImage3D(bt,ee,We,at,vt,ce,be,ue,st,Ae,ft):A.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,ee,We,at,ce,be,st,Ae,ft.data):A.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,ee,We,at,ft.width,ft.height,st,ft.data):F.texSubImage2D(F.TEXTURE_2D,ee,We,at,ce,be,st,Ae,ft);F.pixelStorei(F.UNPACK_ROW_LENGTH,Qe),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,_n),F.pixelStorei(F.UNPACK_SKIP_PIXELS,za),F.pixelStorei(F.UNPACK_SKIP_ROWS,Mn),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Xs),ee===0&&N.generateMipmaps&&F.generateMipmap(bt),ve.unbindTexture()},this.initRenderTarget=function(A){ye.get(A).__webglFramebuffer===void 0&&je.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?je.setTextureCube(A,0):A.isData3DTexture?je.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?je.setTexture2DArray(A,0):je.setTexture2D(A,0),ve.unbindTexture()},this.resetState=function(){w=0,T=0,I=null,ve.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ge._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ge._getUnpackColorSpace()}};function Rd(a,e){if(e===id)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),a;if(e===ws||e===zr){let t=a.getIndex();if(t===null){let r=[],o=a.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)r.push(c);a.setIndex(r),t=a.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),a}let n=t.count-2,i=[];if(e===ws)for(let r=1;r<=n;r++)i.push(t.getX(0)),i.push(t.getX(r)),i.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(i.push(t.getX(r)),i.push(t.getX(r+1)),i.push(t.getX(r+2))):(i.push(t.getX(r+2)),i.push(t.getX(r+1)),i.push(t.getX(r)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=a.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),a}var hl=class extends ri{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new kd(t)}),this.register(function(t){return new Nd(t)}),this.register(function(t){return new Wd(t)}),this.register(function(t){return new Xd(t)}),this.register(function(t){return new qd(t)}),this.register(function(t){return new Bd(t)}),this.register(function(t){return new Od(t)}),this.register(function(t){return new zd(t)}),this.register(function(t){return new jd(t)}),this.register(function(t){return new Ld(t)}),this.register(function(t){return new Vd(t)}),this.register(function(t){return new Ud(t)}),this.register(function(t){return new Hd(t)}),this.register(function(t){return new Gd(t)}),this.register(function(t){return new Dd(t)}),this.register(function(t){return new Kd(t)}),this.register(function(t){return new Jd(t)})}load(e,t,n,i){let s=this,r;if(this.resourcePath!=="")r=this.resourcePath;else if(this.path!==""){let l=Ii.extractUrlBase(e);r=Ii.resolveURL(l,this.path)}else r=Ii.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){i?i(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new gs(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,r,function(d){t(d),s.manager.itemEnd(e)},o)}catch(d){o(d)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s,r={},o={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===$p){try{r[He.KHR_BINARY_GLTF]=new Yd(e)}catch(h){i&&i(h);return}s=JSON.parse(r[He.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new iu(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let d=0;d<this.pluginCallbacks.length;d++){let h=this.pluginCallbacks[d](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,r[h.name]=!0}if(s.extensionsUsed)for(let d=0;d<s.extensionsUsed.length;++d){let h=s.extensionsUsed[d],u=s.extensionsRequired||[];switch(h){case He.KHR_MATERIALS_UNLIT:r[h]=new Fd;break;case He.KHR_DRACO_MESH_COMPRESSION:r[h]=new Zd(s,this.dracoLoader);break;case He.KHR_TEXTURE_TRANSFORM:r[h]=new Qd;break;case He.KHR_MESH_QUANTIZATION:r[h]=new $d;break;default:u.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(r),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}};function u_(){let a={};return{get:function(e){return a[e]},add:function(e,t){a[e]=t},remove:function(e){delete a[e]},removeAll:function(){a={}}}}var He={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Dd=class{constructor(e){this.parser=e,this.name=He.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],l,d=new fe(16777215);c.color!==void 0&&d.setRGB(c.color[0],c.color[1],c.color[2],Gt);let h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Ci(d),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Ai(d),l.distance=h;break;case"spot":l=new Rr(d),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),li(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},Fd=class{constructor(){this.name=He.KHR_MATERIALS_UNLIT}getMaterialType(){return hn}extendParams(e,t,n){let i=[];e.color=new fe(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let r=s.baseColorFactor;e.color.setRGB(r[0],r[1],r[2],Gt),e.opacity=r[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,St))}return Promise.all(i)}},Ld=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}},kd=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];if(r.clearcoatFactor!==void 0&&(t.clearcoat=r.clearcoatFactor),r.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",r.clearcoatTexture)),r.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=r.clearcoatRoughnessFactor),r.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",r.clearcoatRoughnessTexture)),r.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",r.clearcoatNormalTexture)),r.clearcoatNormalTexture.scale!==void 0)){let o=r.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new re(o,o)}return Promise.all(s)}},Nd=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}},Ud=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];return r.iridescenceFactor!==void 0&&(t.iridescence=r.iridescenceFactor),r.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",r.iridescenceTexture)),r.iridescenceIor!==void 0&&(t.iridescenceIOR=r.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),r.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=r.iridescenceThicknessMinimum),r.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=r.iridescenceThicknessMaximum),r.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",r.iridescenceThicknessTexture)),Promise.all(s)}},Bd=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[];t.sheenColor=new fe(0,0,0),t.sheenRoughness=0,t.sheen=1;let r=i.extensions[this.name];if(r.sheenColorFactor!==void 0){let o=r.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Gt)}return r.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=r.sheenRoughnessFactor),r.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",r.sheenColorTexture,St)),r.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",r.sheenRoughnessTexture)),Promise.all(s)}},Od=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];return r.transmissionFactor!==void 0&&(t.transmission=r.transmissionFactor),r.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",r.transmissionTexture)),Promise.all(s)}},zd=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];t.thickness=r.thicknessFactor!==void 0?r.thicknessFactor:0,r.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",r.thicknessTexture)),t.attenuationDistance=r.attenuationDistance||1/0;let o=r.attenuationColor||[1,1,1];return t.attenuationColor=new fe().setRGB(o[0],o[1],o[2],Gt),Promise.all(s)}},jd=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}},Vd=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];t.specularIntensity=r.specularFactor!==void 0?r.specularFactor:1,r.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",r.specularTexture));let o=r.specularColorFactor||[1,1,1];return t.specularColor=new fe().setRGB(o[0],o[1],o[2],Gt),r.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",r.specularColorTexture,St)),Promise.all(s)}},Gd=class{constructor(e){this.parser=e,this.name=He.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];return t.bumpScale=r.bumpFactor!==void 0?r.bumpFactor:1,r.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",r.bumpTexture)),Promise.all(s)}},Hd=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],r=i.extensions[this.name];return r.anisotropyStrength!==void 0&&(t.anisotropy=r.anisotropyStrength),r.anisotropyRotation!==void 0&&(t.anisotropyRotation=r.anisotropyRotation),r.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",r.anisotropyTexture)),Promise.all(s)}},Wd=class{constructor(e){this.parser=e,this.name=He.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let s=i.extensions[this.name],r=t.options.ktx2Loader;if(!r){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,r)}},Xd=class{constructor(e){this.parser=e,this.name=He.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let r=s.extensions[t],o=i.images[r.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,r.source,c)}},qd=class{constructor(e){this.parser=e,this.name=He.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let r=s.extensions[t],o=i.images[r.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,r.source,c)}},Kd=class{constructor(e){this.name=He.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),r=this.parser.options.meshoptDecoder;if(!r||!r.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){let c=i.byteOffset||0,l=i.byteLength||0,d=i.count,h=i.byteStride,u=new Uint8Array(o,c,l);return r.decodeGltfBufferAsync?r.decodeGltfBufferAsync(d,h,u,i.mode,i.filter).then(function(f){return f.buffer}):r.ready.then(function(){let f=new ArrayBuffer(d*h);return r.decodeGltfBuffer(new Uint8Array(f),d,h,u,i.mode,i.filter),f})})}else return null}},Jd=class{constructor(e){this.name=He.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==Un.TRIANGLES&&l.mode!==Un.TRIANGLE_STRIP&&l.mode!==Un.TRIANGLE_FAN&&l.mode!==void 0)return null;let r=n.extensions[this.name].attributes,o=[],c={};for(let l in r)o.push(this.parser.getDependency("accessor",r[l]).then(d=>(c[l]=d,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let d=l.pop(),h=d.isGroup?d.children:[d],u=l[0].count,f=[];for(let m of h){let g=new de,b=new C,p=new on,x=new C(1,1,1),y=new xa(m.geometry,m.material,u);for(let v=0;v<u;v++)c.TRANSLATION&&b.fromBufferAttribute(c.TRANSLATION,v),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,v),c.SCALE&&x.fromBufferAttribute(c.SCALE,v),y.setMatrixAt(v,g.compose(b,p,x));for(let v in c)if(v==="_COLOR_0"){let _=c[v];y.instanceColor=new Ln(_.array,_.itemSize,_.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&m.geometry.setAttribute(v,c[v]);dt.prototype.copy.call(y,m),this.parser.assignFinalMaterial(y),f.push(y)}return d.isGroup?(d.clear(),d.add(...f),d):f[0]}))}},$p="glTF",Gr=12,Jp={JSON:1313821514,BIN:5130562},Yd=class{constructor(e){this.name=He.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Gr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==$p)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-Gr,s=new DataView(e,Gr),r=0;for(;r<i;){let o=s.getUint32(r,!0);r+=4;let c=s.getUint32(r,!0);if(r+=4,c===Jp.JSON){let l=new Uint8Array(e,Gr+r,o);this.content=n.decode(l)}else if(c===Jp.BIN){let l=Gr+r;this.body=e.slice(l,l+o)}r+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Zd=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=He.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,r=e.extensions[this.name].attributes,o={},c={},l={};for(let d in r){let h=tu[d]||d.toLowerCase();o[h]=r[d]}for(let d in e.attributes){let h=tu[d]||d.toLowerCase();if(r[d]!==void 0){let u=n.accessors[e.attributes[d]],f=Is[u.componentType];l[h]=f.name,c[h]=u.normalized===!0}}return t.getDependency("bufferView",s).then(function(d){return new Promise(function(h,u){i.decodeDracoFile(d,function(f){for(let m in f.attributes){let g=f.attributes[m],b=c[m];b!==void 0&&(g.normalized=b)}h(f)},o,l,Gt,u)})})}},Qd=class{constructor(){this.name=He.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},$d=class{constructor(){this.name=He.KHR_MESH_QUANTIZATION}},dl=class extends wi{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let r=0;r!==i;r++)t[r]=n[s+r];return t}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,d=i-t,h=(n-t)/d,u=h*h,f=u*h,m=e*l,g=m-l,b=-2*f+3*u,p=f-u,x=1-b,y=p-u+h;for(let v=0;v!==o;v++){let _=r[g+v+o],w=r[g+v+c]*d,T=r[m+v+o],I=r[m+v]*d;s[v]=x*_+y*w+b*T+p*I}return s}},f_=new on,eu=class extends dl{interpolate_(e,t,n,i){let s=super.interpolate_(e,t,n,i);return f_.fromArray(s).normalize().toArray(s),s}},Un={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Is={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Yp={9728:Vt,9729:sn,9984:Sc,9985:ys,9986:Ta,9987:qn},Zp={33071:ei,33648:as,10497:Xi},Cd={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},tu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Yi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},p_={CUBICSPLINE:void 0,LINEAR:ma,STEP:pa},Id={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function m_(a){return a.DefaultMaterial===void 0&&(a.DefaultMaterial=new kn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:$t})),a.DefaultMaterial}function Pa(a,e,t){for(let n in t.extensions)a[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function li(a,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(a.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function b_(a,e,t){let n=!1,i=!1,s=!1;for(let l=0,d=e.length;l<d;l++){let h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(a);let r=[],o=[],c=[];for(let l=0,d=e.length;l<d;l++){let h=e[l];if(n){let u=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):a.attributes.position;r.push(u)}if(i){let u=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):a.attributes.normal;o.push(u)}if(s){let u=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):a.attributes.color;c.push(u)}}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(c)]).then(function(l){let d=l[0],h=l[1],u=l[2];return n&&(a.morphAttributes.position=d),i&&(a.morphAttributes.normal=h),s&&(a.morphAttributes.color=u),a.morphTargetsRelative=!0,a})}function g_(a,e){if(a.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)a.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(a.morphTargetInfluences.length===t.length){a.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)a.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function x_(a){let e,t=a.extensions&&a.extensions[He.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Pd(t.attributes):e=a.indices+":"+Pd(a.attributes)+":"+a.mode,a.targets!==void 0)for(let n=0,i=a.targets.length;n<i;n++)e+=":"+Pd(a.targets[n]);return e}function Pd(a){let e="",t=Object.keys(a).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+a[t[n]]+";";return e}function nu(a){switch(a){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function v_(a){return a.search(/\.jpe?g($|\?)/i)>0||a.search(/^data\:image\/jpeg/)===0?"image/jpeg":a.search(/\.webp($|\?)/i)>0||a.search(/^data\:image\/webp/)===0?"image/webp":a.search(/\.ktx2($|\?)/i)>0||a.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var y_=new de,iu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new u_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,r=-1;if(typeof navigator<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,s=o.indexOf("Firefox")>-1,r=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&r<98?this.textureLoader=new Tr(this.options.manager):this.textureLoader=new Ir(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new gs(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(r){return r._markDefs&&r._markDefs()}),Promise.all(this._invokeAll(function(r){return r.beforeRoot&&r.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(r){let o={scene:r[0][i.scene||0],scenes:r[0],animations:r[1],cameras:r[2],asset:i.asset,parser:n,userData:{}};return Pa(s,o,i),li(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){let r=t[i].joints;for(let o=0,c=r.length;o<c;o++)e[r[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){let r=e[i];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),s=(r,o)=>{let c=this.associations.get(r);c!=null&&this.associations.set(o,c);for(let[l,d]of r.children.entries())s(d,o.children[l])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[He.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(s,r){n.load(Ii.resolveURL(t.uri,i.path),s,void 0,function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let r=Cd[i.type],o=Is[i.componentType],c=i.normalized===!0,l=new o(i.count*r);return Promise.resolve(new Je(l,r,c))}let s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(r){let o=r[0],c=Cd[i.type],l=Is[i.componentType],d=l.BYTES_PER_ELEMENT,h=d*c,u=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0,g,b;if(f&&f!==h){let p=Math.floor(u/f),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count,y=t.cache.get(x);y||(g=new l(o,p*f,i.count*f/d),y=new ds(g,f/d),t.cache.add(x,y)),b=new us(y,c,u%f/d,m)}else o===null?g=new l(i.count*c):g=new l(o,u,i.count*c),b=new Je(g,c,m);if(i.sparse!==void 0){let p=Cd.SCALAR,x=Is[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,_=new x(r[1],y,i.sparse.count*p),w=new l(r[2],v,i.sparse.count*c);o!==null&&(b=new Je(b.array.slice(),b.itemSize,b.normalized)),b.normalized=!1;for(let T=0,I=_.length;T<I;T++){let M=_[T];if(b.setX(M,w[T*c]),c>=2&&b.setY(M,w[T*c+1]),c>=3&&b.setZ(M,w[T*c+2]),c>=4&&b.setW(M,w[T*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}b.normalized=m}return b})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,r=t.images[s],o=this.textureLoader;if(r.uri){let c=n.manager.getHandler(r.uri);c!==null&&(o=c)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){let i=this,s=this.json,r=s.textures[e],o=s.images[t],c=(o.uri||o.bufferView)+":"+r.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(d){d.flipY=!1,d.name=r.name||o.name||"",d.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(d.name=o.uri);let u=(s.samplers||{})[r.sampler]||{};return d.magFilter=Yp[u.magFilter]||sn,d.minFilter=Yp[u.minFilter]||qn,d.wrapS=Zp[u.wrapS]||Xi,d.wrapT=Zp[u.wrapT]||Xi,d.generateMipmaps=!d.isCompressedTexture&&d.minFilter!==Vt&&d.minFilter!==sn,i.associations.set(d,{textures:e}),d}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let r=i.images[e],o=self.URL||self.webkitURL,c=r.uri||"",l=!1;if(r.bufferView!==void 0)c=n.getDependency("bufferView",r.bufferView).then(function(h){l=!0;let u=new Blob([h],{type:r.mimeType});return c=o.createObjectURL(u),c});else if(r.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let d=Promise.resolve(c).then(function(h){return new Promise(function(u,f){let m=u;t.isImageBitmapLoader===!0&&(m=function(g){let b=new Dt(g);b.needsUpdate=!0,u(b)}),t.load(Ii.resolveURL(h,s.path),m,void 0,f)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),li(h,r),h.userData.mimeType=r.mimeType||v_(r.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=d,d}assignTexture(e,t,n,i){let s=this;return this.getDependency("texture",n.index).then(function(r){if(!r)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(r=r.clone(),r.channel=n.texCoord),s.extensions[He.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[He.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=s.associations.get(r);r=s.extensions[He.KHR_TEXTURE_TRANSFORM].extendTexture(r,o),s.associations.set(r,c)}}return i!==void 0&&(r.colorSpace=i),e[t]=r,r})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,r=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new bs,ln.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new ps,ln.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||s||r){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),r&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),s&&(c.vertexColors=!0),r&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return kn}loadMaterial(e){let t=this,n=this.json,i=this.extensions,s=n.materials[e],r,o={},c=s.extensions||{},l=[];if(c[He.KHR_MATERIALS_UNLIT]){let h=i[He.KHR_MATERIALS_UNLIT];r=h.getMaterialType(),l.push(h.extendParams(o,s,t))}else{let h=s.pbrMetallicRoughness||{};if(o.color=new fe(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){let u=h.baseColorFactor;o.color.setRGB(u[0],u[1],u[2],Gt),o.opacity=u[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",h.baseColorTexture,St)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),r=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=Ot);let d=s.alphaMode||Id.OPAQUE;if(d===Id.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,d===Id.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&r!==hn&&(l.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new re(1,1),s.normalTexture.scale!==void 0)){let h=s.normalTexture.scale;o.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&r!==hn&&(l.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&r!==hn){let h=s.emissiveFactor;o.emissive=new fe().setRGB(h[0],h[1],h[2],Gt)}return s.emissiveTexture!==void 0&&r!==hn&&l.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,St)),Promise.all(l).then(function(){let h=new r(o);return s.name&&(h.name=s.name),li(h,s),t.associations.set(h,{materials:e}),s.extensions&&Pa(i,h,s),h})}createUniqueName(e){let t=rt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[He.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Qp(c,o,t)})}let r=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],d=x_(l),h=i[d];if(h)r.push(h.promise);else{let u;l.extensions&&l.extensions[He.KHR_DRACO_MESH_COMPRESSION]?u=s(l):u=Qp(new wt,l,t),i[d]={primitive:l,promise:u},r.push(u)}}return Promise.all(r)}loadMesh(e){let t=this,n=this.json,i=this.extensions,s=n.meshes[e],r=s.primitives,o=[];for(let c=0,l=r.length;c<l;c++){let d=r[c].material===void 0?m_(this.cache):this.getDependency("material",r[c].material);o.push(d)}return o.push(t.loadGeometries(r)),Promise.all(o).then(function(c){let l=c.slice(0,c.length-1),d=c[c.length-1],h=[];for(let f=0,m=d.length;f<m;f++){let g=d[f],b=r[f],p,x=l[f];if(b.mode===Un.TRIANGLES||b.mode===Un.TRIANGLE_STRIP||b.mode===Un.TRIANGLE_FAN||b.mode===void 0)p=s.isSkinnedMesh===!0?new dr(g,x):new ze(g,x),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),b.mode===Un.TRIANGLE_STRIP?p.geometry=Rd(p.geometry,zr):b.mode===Un.TRIANGLE_FAN&&(p.geometry=Rd(p.geometry,ws));else if(b.mode===Un.LINES)p=new ms(g,x);else if(b.mode===Un.LINE_STRIP)p=new va(g,x);else if(b.mode===Un.LINE_LOOP)p=new pr(g,x);else if(b.mode===Un.POINTS)p=new ya(g,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+b.mode);Object.keys(p.geometry.morphAttributes).length>0&&g_(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),li(p,s),b.extensions&&Pa(i,p,b),t.assignFinalMaterial(p),h.push(p)}for(let f=0,m=h.length;f<m;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return s.extensions&&Pa(i,h[0],s),h[0];let u=new Tn;s.extensions&&Pa(i,u,s),t.associations.set(u,{meshes:e});for(let f=0,m=h.length;f<m;f++)u.add(h[f]);return u})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Rt(et.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Ri(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),li(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let s=i.pop(),r=i,o=[],c=[];for(let l=0,d=r.length;l<d;l++){let h=r[l];if(h){o.push(h);let u=new de;s!==null&&u.fromArray(s.array,l*16),c.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new ur(o,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,r=[],o=[],c=[],l=[],d=[];for(let h=0,u=i.channels.length;h<u;h++){let f=i.channels[h],m=i.samplers[f.sampler],g=f.target,b=g.node,p=i.parameters!==void 0?i.parameters[m.input]:m.input,x=i.parameters!==void 0?i.parameters[m.output]:m.output;g.node!==void 0&&(r.push(this.getDependency("node",b)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",x)),l.push(m),d.push(g))}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(d)]).then(function(h){let u=h[0],f=h[1],m=h[2],g=h[3],b=h[4],p=[];for(let y=0,v=u.length;y<v;y++){let _=u[y],w=f[y],T=m[y],I=g[y],M=b[y];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();let S=n._createAnimationTracks(_,w,T,I,M);if(S)for(let R=0;R<S.length;R++)p.push(S[R])}let x=new wr(s,void 0,p);return li(x,i),x})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){let r=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&r.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),r})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),r=[],o=i.children||[];for(let l=0,d=o.length;l<d;l++)r.push(n.getDependency("node",o[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(r),c]).then(function(l){let d=l[0],h=l[1],u=l[2];u!==null&&d.traverse(function(f){f.isSkinnedMesh&&f.bind(u,y_)});for(let f=0,m=h.length;f<m;f++)d.add(h[f]);return d})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],r=s.name?i.createUniqueName(s.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(l){return i._getNodeRef(i.cameraCache,s.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let d;if(s.isBone===!0?d=new fs:l.length>1?d=new Tn:l.length===1?d=l[0]:d=new dt,d!==l[0])for(let h=0,u=l.length;h<u;h++)d.add(l[h]);if(s.name&&(d.userData.name=s.name,d.name=r),li(d,s),s.extensions&&Pa(n,d,s),s.matrix!==void 0){let h=new de;h.fromArray(s.matrix),d.applyMatrix4(h)}else s.translation!==void 0&&d.position.fromArray(s.translation),s.rotation!==void 0&&d.quaternion.fromArray(s.rotation),s.scale!==void 0&&d.scale.fromArray(s.scale);if(!i.associations.has(d))i.associations.set(d,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){let h=i.associations.get(d);i.associations.set(d,{...h})}return i.associations.get(d).nodes=e,d}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,s=new Tn;n.name&&(s.name=i.createUniqueName(n.name)),li(s,n),n.extensions&&Pa(t,s,n);let r=n.nodes||[],o=[];for(let c=0,l=r.length;c<l;c++)o.push(i.getDependency("node",r[c]));return Promise.all(o).then(function(c){for(let d=0,h=c.length;d<h;d++)s.add(c[d]);let l=d=>{let h=new Map;for(let[u,f]of i.associations)(u instanceof ln||u instanceof Dt)&&h.set(u,f);return d.traverse(u=>{let f=i.associations.get(u);f!=null&&h.set(u,f)}),h};return i.associations=l(s),s})}_createAnimationTracks(e,t,n,i,s){let r=[],o=e.name?e.name:e.uuid,c=[];Yi[s.path]===Yi.weights?e.traverse(function(u){u.morphTargetInfluences&&c.push(u.name?u.name:u.uuid)}):c.push(o);let l;switch(Yi[s.path]){case Yi.weights:l=ii;break;case Yi.rotation:l=ai;break;case Yi.translation:case Yi.scale:l=si;break;default:switch(n.itemSize){case 1:l=ii;break;case 2:case 3:default:l=si;break}break}let d=i.interpolation!==void 0?p_[i.interpolation]:ma,h=this._getArrayFromAccessor(n);for(let u=0,f=c.length;u<f;u++){let m=new l(c[u]+"."+Yi[s.path],t.array,h,d);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),r.push(m)}return r}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=nu(t.constructor),i=new Float32Array(t.length);for(let s=0,r=t.length;s<r;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof ai?eu:dl;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function __(a,e,t){let n=e.attributes,i=new Ke;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new C(c[0],c[1],c[2]),new C(l[0],l[1],l[2])),o.normalized){let d=nu(Is[o.componentType]);i.min.multiplyScalar(d),i.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let o=new C,c=new C;for(let l=0,d=s.length;l<d;l++){let h=s[l];if(h.POSITION!==void 0){let u=t.json.accessors[h.POSITION],f=u.min,m=u.max;if(f!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),u.normalized){let g=nu(Is[u.componentType]);c.multiplyScalar(g)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}a.boundingBox=i;let r=new yt;i.getCenter(r.center),r.radius=i.min.distanceTo(i.max)/2,a.boundingSphere=r}function Qp(a,e,t){let n=e.attributes,i=[];function s(r,o){return t.getDependency("accessor",r).then(function(c){a.setAttribute(o,c)})}for(let r in n){let o=tu[r]||r.toLowerCase();o in a.attributes||i.push(s(n[r],o))}if(e.indices!==void 0&&!a.index){let r=t.getDependency("accessor",e.indices).then(function(o){a.setIndex(o)});i.push(r)}return Ge.workingColorSpace!==Gt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ge.workingColorSpace}" not supported.`),li(a,e),__(a,e,t),Promise.all(i).then(function(){return e.targets!==void 0?b_(a,e.targets,t):a})}var ul=class extends Si{constructor(){super();let e=new En;e.deleteAttribute("uv");let t=new kn({side:Ft}),n=new kn,i=new Ai(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);let s=new ze(e,t);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);let r=new xa(e,n,6),o=new dt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),r.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),r.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),r.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),r.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),r.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),r.setMatrixAt(5,o.matrix),this.add(r);let c=new ze(e,Ps(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new ze(e,Ps(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let d=new ze(e,Ps(17));d.position.set(14.904,12.198,-1.832),d.scale.set(.15,4.265,6.331),this.add(d);let h=new ze(e,Ps(43));h.position.set(-.462,8.89,14.52),h.scale.set(4.38,5.441,.088),this.add(h);let u=new ze(e,Ps(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let f=new ze(e,Ps(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Ps(a){return new Mr({color:0,emissive:16777215,emissiveIntensity:a})}var Ds={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var An=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},M_=new Ri(-1,1,1,-1,0,1),au=class extends wt{constructor(){super(),this.setAttribute("position",new Ct([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ct([0,2,0,0,2,0],2))}},S_=new au,Zi=class{constructor(e){this._mesh=new ze(S_,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,M_)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Qi=class extends An{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof ut?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Fi.clone(e.uniforms),this.material=new ut({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Zi(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Hr=class extends An{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let r,o;this.inverse?(r=0,o=1):(r=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,r,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}},fl=class extends An{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var pl=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new re);this._width=n.width,this._height=n.height,t=new It(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:en}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Qi(Ds),this.copyPass.material.blending=Xn,this.clock=new Pr}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let i=0,s=this.passes.length;i<s;i++){let r=this.passes[i];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Hr!==void 0&&(r instanceof Hr?n=!0:r instanceof fl&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new re);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var ml=class extends An{constructor(e,t,n=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new fe}render(e,t,n){let i=e.autoClear;e.autoClear=!1;let s,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),e.autoClear=i}};var em={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new fe(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var Fs=class a extends An{constructor(e,t=1,n,i){super(),this.strength=t,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new re(e.x,e.y):new re(256,256),this.clearColor=new fe(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);this.renderTargetBright=new It(s,r,{type:en}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){let h=new It(s,r,{type:en});h.texture.name="UnrealBloomPass.h"+d,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);let u=new It(s,r,{type:en});u.texture.name="UnrealBloomPass.v"+d,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),s=Math.round(s/2),r=Math.round(r/2)}let o=em;this.highPassUniforms=Fi.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ut({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let c=[3,5,7,9,11];s=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new re(1/s,1/r),s=Math.round(s/2),r=Math.round(r/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Fi.clone(Ds.uniforms),this.blendMaterial=new ut({uniforms:this.copyUniforms,vertexShader:Ds.vertexShader,fragmentShader:Ds.fragmentShader,blending:xs,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new fe,this._oldClearAlpha=1,this._basic=new hn,this._fsQuad=new Zi(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new re(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let r=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[c].uniforms.direction.value=a.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=a.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=r}_getSeparableBlurMaterial(e){let t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new ut({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new re(.5,.5)},direction:{value:new re(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new ut({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};Fs.BlurDirectionX=new re(1,0);Fs.BlurDirectionY=new re(0,1);var tm={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new re(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;

		#define EDGE_STEP_COUNT 6
		#define EDGE_GUESS 8.0
		#define EDGE_STEPS 1.0, 1.5, 2.0, 2.0, 2.0, 4.0
		const float edgeSteps[EDGE_STEP_COUNT] = float[EDGE_STEP_COUNT]( EDGE_STEPS );

		float _ContrastThreshold = 0.0312;
		float _RelativeThreshold = 0.063;
		float _SubpixelBlending = 1.0;

		vec4 Sample( sampler2D  tex2D, vec2 uv ) {

			return texture( tex2D, uv );

		}

		float SampleLuminance( sampler2D tex2D, vec2 uv ) {

			return dot( Sample( tex2D, uv ).rgb, vec3( 0.3, 0.59, 0.11 ) );

		}

		float SampleLuminance( sampler2D tex2D, vec2 texSize, vec2 uv, float uOffset, float vOffset ) {

			uv += texSize * vec2(uOffset, vOffset);
			return SampleLuminance(tex2D, uv);

		}

		struct LuminanceData {

			float m, n, e, s, w;
			float ne, nw, se, sw;
			float highest, lowest, contrast;

		};

		LuminanceData SampleLuminanceNeighborhood( sampler2D tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData l;
			l.m = SampleLuminance( tex2D, uv );
			l.n = SampleLuminance( tex2D, texSize, uv,  0.0,  1.0 );
			l.e = SampleLuminance( tex2D, texSize, uv,  1.0,  0.0 );
			l.s = SampleLuminance( tex2D, texSize, uv,  0.0, -1.0 );
			l.w = SampleLuminance( tex2D, texSize, uv, -1.0,  0.0 );

			l.ne = SampleLuminance( tex2D, texSize, uv,  1.0,  1.0 );
			l.nw = SampleLuminance( tex2D, texSize, uv, -1.0,  1.0 );
			l.se = SampleLuminance( tex2D, texSize, uv,  1.0, -1.0 );
			l.sw = SampleLuminance( tex2D, texSize, uv, -1.0, -1.0 );

			l.highest = max( max( max( max( l.n, l.e ), l.s ), l.w ), l.m );
			l.lowest = min( min( min( min( l.n, l.e ), l.s ), l.w ), l.m );
			l.contrast = l.highest - l.lowest;
			return l;

		}

		bool ShouldSkipPixel( LuminanceData l ) {

			float threshold = max( _ContrastThreshold, _RelativeThreshold * l.highest );
			return l.contrast < threshold;

		}

		float DeterminePixelBlendFactor( LuminanceData l ) {

			float f = 2.0 * ( l.n + l.e + l.s + l.w );
			f += l.ne + l.nw + l.se + l.sw;
			f *= 1.0 / 12.0;
			f = abs( f - l.m );
			f = clamp( f / l.contrast, 0.0, 1.0 );

			float blendFactor = smoothstep( 0.0, 1.0, f );
			return blendFactor * blendFactor * _SubpixelBlending;

		}

		struct EdgeData {

			bool isHorizontal;
			float pixelStep;
			float oppositeLuminance, gradient;

		};

		EdgeData DetermineEdge( vec2 texSize, LuminanceData l ) {

			EdgeData e;
			float horizontal =
				abs( l.n + l.s - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.se - 2.0 * l.e ) +
				abs( l.nw + l.sw - 2.0 * l.w );
			float vertical =
				abs( l.e + l.w - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.nw - 2.0 * l.n ) +
				abs( l.se + l.sw - 2.0 * l.s );
			e.isHorizontal = horizontal >= vertical;

			float pLuminance = e.isHorizontal ? l.n : l.e;
			float nLuminance = e.isHorizontal ? l.s : l.w;
			float pGradient = abs( pLuminance - l.m );
			float nGradient = abs( nLuminance - l.m );

			e.pixelStep = e.isHorizontal ? texSize.y : texSize.x;

			if (pGradient < nGradient) {

				e.pixelStep = -e.pixelStep;
				e.oppositeLuminance = nLuminance;
				e.gradient = nGradient;

			} else {

				e.oppositeLuminance = pLuminance;
				e.gradient = pGradient;

			}

			return e;

		}

		float DetermineEdgeBlendFactor( sampler2D  tex2D, vec2 texSize, LuminanceData l, EdgeData e, vec2 uv ) {

			vec2 uvEdge = uv;
			vec2 edgeStep;
			if (e.isHorizontal) {

				uvEdge.y += e.pixelStep * 0.5;
				edgeStep = vec2( texSize.x, 0.0 );

			} else {

				uvEdge.x += e.pixelStep * 0.5;
				edgeStep = vec2( 0.0, texSize.y );

			}

			float edgeLuminance = ( l.m + e.oppositeLuminance ) * 0.5;
			float gradientThreshold = e.gradient * 0.25;

			vec2 puv = uvEdge + edgeStep * edgeSteps[0];
			float pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
			bool pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !pAtEnd; i++ ) {

				puv += edgeStep * edgeSteps[i];
				pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
				pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			}

			if ( !pAtEnd ) {

				puv += edgeStep * EDGE_GUESS;

			}

			vec2 nuv = uvEdge - edgeStep * edgeSteps[0];
			float nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
			bool nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !nAtEnd; i++ ) {

				nuv -= edgeStep * edgeSteps[i];
				nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
				nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			}

			if ( !nAtEnd ) {

				nuv -= edgeStep * EDGE_GUESS;

			}

			float pDistance, nDistance;
			if ( e.isHorizontal ) {

				pDistance = puv.x - uv.x;
				nDistance = uv.x - nuv.x;

			} else {

				pDistance = puv.y - uv.y;
				nDistance = uv.y - nuv.y;

			}

			float shortestDistance;
			bool deltaSign;
			if ( pDistance <= nDistance ) {

				shortestDistance = pDistance;
				deltaSign = pLuminanceDelta >= 0.0;

			} else {

				shortestDistance = nDistance;
				deltaSign = nLuminanceDelta >= 0.0;

			}

			if ( deltaSign == ( l.m - edgeLuminance >= 0.0 ) ) {

				return 0.0;

			}

			return 0.5 - shortestDistance / ( pDistance + nDistance );

		}

		vec4 ApplyFXAA( sampler2D  tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData luminance = SampleLuminanceNeighborhood( tex2D, texSize, uv );
			if ( ShouldSkipPixel( luminance ) ) {

				return Sample( tex2D, uv );

			}

			float pixelBlend = DeterminePixelBlendFactor( luminance );
			EdgeData edge = DetermineEdge( texSize, luminance );
			float edgeBlend = DetermineEdgeBlendFactor( tex2D, texSize, luminance, edge, uv );
			float finalBlend = max( pixelBlend, edgeBlend );

			if (edge.isHorizontal) {

				uv.y += edge.pixelStep * finalBlend;

			} else {

				uv.x += edge.pixelStep * finalBlend;

			}

			return Sample( tex2D, uv );

		}

		void main() {

			gl_FragColor = ApplyFXAA( tDiffuse, resolution.xy, vUv );

		}`};var Wr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

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

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var bl=class extends An{constructor(){super(),this.uniforms=Fi.clone(Wr.uniforms),this.material=new _r({name:Wr.name,uniforms:this.uniforms,vertexShader:Wr.vertexShader,fragmentShader:Wr.fragmentShader}),this._fsQuad=new Zi(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ge.getTransfer(this._outputColorSpace)===$e&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===mc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===bc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===gc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===vs?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===vc?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===yc?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===xc&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var BT=(function(){var a="b9H79Tebbbe9ok9Geueu9Geub9Gbb9Gruuuuuuueu9Gvuuuuueu9Gduueu9Gluuuueu9Gvuuuuub9Gouuuuuub9Gluuuub9Giuuueui8AYdilveoveovrrwrrDDoDrbqqbelve9Weiiviebeoweuec;G:Qdkr:nlAo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8F9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949c919M9MWV9mW4W2be8A9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949c919M9MWVbd8F9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949c919M9MWV9c9V919U9KbiE9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949wWV79P9V9UblY9TW79O9V9Wt9FW9U9J9V9KW69U9KW949c919M9MWVbv8E9TW79O9V9Wt9FW9U9J9V9KW69U9KW949c919M9MWV9c9V919U9Kbo8A9TW79O9V9Wt9FW9U9J9V9KW69U9KW949wWV79P9V9UbrE9TW79O9V9Wt9FW9U9J9V9KW69U9KW949tWG91W9U9JWbwa9TW79O9V9Wt9FW9U9J9V9KW69U9KW949tWG91W9U9JW9c9V919U9KbDL9TW79O9V9Wt9FW9U9J9V9KWS9P2tWV9p9JtbqK9TW79O9V9Wt9FW9U9J9V9KWS9P2tWV9r919HtbkL9TW79O9V9Wt9FW9U9J9V9KWS9P2tWVT949WbxE9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94J9H9J9OWbsa9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94J9H9J9OW9ttV9P9Wbza9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94SWt9J9O9sW9T9H9WbHK9TW79O9V9Wt9F79W9Ht9P9H29t9VVt9sW9T9H9WbOl79IV9RbCDwebcekdKLqN9OYdbk:Bhdhud9:8Jjjjjbc;qw9Rgr8KjjjjbcbhwdnaeTmbabcbyd;C:kjjbaoaocb9iEgDc:GeV86bbarc;adfcbcjdz:wjjjb8AdnaiTmbarc;adfadalz:vjjjb8Akarc;abfalfcbcbcjdal9RalcFe0Ez:wjjjb8Aarc;abfarc;adfalz:vjjjb8AarcUf9cb83ibarc8Wf9cb83ibarcyf9cb83ibarcaf9cb83ibarcKf9cb83ibarczf9cb83ibar9cb83iwar9cb83ibcj;abal9Uc;WFbGcjdalca0Ehqdnaicd6mbavcd9imbaDTmbadcefhkaqci2gxal2hmarc;alfclfhParc;qlfceVhsarc;qofclVhzarc;qofcKfhHarc;qofczfhOcbhAincdhCcbhodnavci6mbaH9cb83ibaO9cb83ibar9cb83i;yoar9cb83i;qoadaAfgoybbhXcbhQincbhwcbhLdninaoalfhKaoybbgYaX7aLVhLawcP0meaKhoaYhXawcefgwaQfai6mbkkcbhXarc;qofhwincwh8AcwhEdnaLaX93gocFeGg3cs0mbclhEa3ci0mba3cb9hcethEkdnaocw4cFeGg3cs0mbclh8Aa3ci0mba3cb9hceth8Aka8AaEfh3awydbh5cwh8AcwhEdnaocz4cFeGg8Ecs0mbclhEa8Eci0mba8Ecb9hcethEka3a5fh3dnaocFFFFb0mbclh8AaocFFF8F0mbaocFFFr0ceth8Akawa3aEfa8AfBdbawclfhwaXcefgXcw9hmbkaKhoaYhXaQczfgQai6mbkcbhocehwazhLinawaoaLydbarc;qofaocdtfydb6EhoaLclfhLawcefgwcw9hmbkcihCkcbh3arc;qlfcbcjdz:wjjjb8Aarc;alfcwfcbBdbar9cb83i;alaoclth8Fadhaaqhhakh5inarc;qlfadcba3cufgoaoa30Eal2falz:vjjjb8Aaiahaiah6Ehgdnaqaia39Ra3aqfai6EgYcsfc9WGgoaY9nmbarc;qofaYfcbaoaY9Rz:wjjjb8Akada3al2fh8Jcbh8Kina8Ka8FVcl4hQarc;alfa8Kcdtfh8LaAh8Mcbh8Nina8NaAfhwdndndndndndna8KPldebidkasa8Mc98GgLfhoa5aLfh8Aarc;qlfawc98GgLfRbbhXcwhwinaoRbbawtaXVhXaocefhoawcwfgwca9hmbkaYTmla8Ncith8Ea8JaLfhEcbhKinaERbbhLcwhoa8AhwinawRbbaotaLVhLawcefhwaocwfgoca9hmbkarc;qofaKfaLaX7aQ93a8E486bba8Aalfh8AaEalfhEaLhXaKcefgKaY9hmbxlkkaYTmia8Mc9:Ghoa8NcitcwGhEarc;qlfawceVfRbbcwtarc;qlfawc9:GfRbbVhLarc;qofhwaghXinawa5aofRbbcwtaaaofRbbVg8AaL9RgLcetaLcztcz91cs47cFFiGaE486bbaoalfhoawcefhwa8AhLa3aXcufgX9hmbxikkaYTmda8Jawfhoarc;qlfawfRbbhLarc;qofhwaghXinawaoRbbg8AaL9RgLcetaLcKtcK91cr4786bbawcefhwaoalfhoa8AhLa3aXcufgX9hmbxdkkaYTmeka8LydbhEcbhKarc;qofhoincdhLcbhwinaLaoawfRbbcb9hfhLawcefgwcz9hmbkclhXcbhwinaXaoawfRbbcd0fhXawcefgwcz9hmbkcwh8Acbhwina8AaoawfRbbcP0fh8Aawcefgwcz9hmbkaLaXaLaX6Egwa8Aawa8A6Egwczawcz6EaEfhEaoczfhoaKczfgKaY6mbka8LaEBdbka8Mcefh8Ma8Ncefg8Ncl9hmbka8Kcefg8KaC9hmbkaaamfhaahaxfhha5amfh5a3axfg3ai6mbkcbhocehwaPhLinawaoaLydbarc;alfaocdtfydb6EhoaLclfhLawcefgXhwaCaX9hmbkaraAcd4fa8FcdVaoaocdSE86bbaAclfgAal6mbkkabaefh8Kabcefhoalcd4gecbaDEhkadcefhOarc;abfceVhHcbhmdndninaiam9nmearc;qofcbcjdz:wjjjb8Aa8Kao9Rak6mdadamal2gwfhxcbh8JaOawfhzaocbakz:wjjjbghakfh5aqaiam9Ramaqfai6Egscsfgocl4cifcd4hCaoc9WGg8LThPindndndndndndndndndndnaDTmbara8Jcd4fRbbgLciGPlbedlbkasTmdaxa8Jfhoarc;abfa8JfRbbhLarc;qofhwashXinawaoRbbg8AaL9RgLcetaLcKtcK91cr4786bbawcefhwaoalfhoa8AhLaXcufgXmbxikkasTmia8JcitcwGhEarc;abfa8JceVfRbbcwtarc;abfa8Jc9:GgofRbbVhLaxaofhoarc;qofhwashXinawao8Vbbg8AaL9RgLcetaLcztcz91cs47cFFiGaE486bbawcefhwaoalfhoa8AhLaXcufgXmbxdkkaHa8Jc98GgEfhoazaEfh8Aarc;abfaEfRbbhXcwhwinaoRbbawtaXVhXaocefhoawcwfgwca9hmbkasTmbaLcl4hYa8JcitcKGh3axaEfhEcbhKinaERbbhLcwhoa8AhwinawRbbaotaLVhLawcefhwaocwfgoca9hmbkarc;qofaKfaLaX7aY93a3486bba8Aalfh8AaEalfhEaLhXaKcefgKas9hmbkkaDmbcbhoxlka8LTmbcbhodninarc;qofaofgwcwf8Pibaw8Pib:e9qTmeaoczfgoa8L9pmdxbkkdnavmbcehoxikcbhEaChKaChYinarc;qofaEfgocwf8Pibhyao8Pibh8PcdhLcbhwinaLaoawfRbbcb9hfhLawcefgwcz9hmbkclhXcbhwinaXaoawfRbbcd0fhXawcefgwcz9hmbkcwh8Acbhwina8AaoawfRbbcP0fh8Aawcefgwcz9hmbkaLaXaLaX6Egoa8Aaoa8A6Egoczaocz6EaYfhYaocucbaya8P:e9cb9sEgwaoaw6EaKfhKaEczfgEa8L9pmdxbkkaha8Jcd4fgoaoRbbcda8JcetcoGtV86bbxikdnaKas6mbaYas6mbaha8Jcd4fgoaoRbbcia8JcetcoGtV86bba8Ka59Ras6mra5arc;qofasz:vjjjbasfh5xikaKaY9phokaha8Jcd4fgwawRbbaoa8JcetcoGtV86bbka8Ka59RaC6mla5cbaCz:wjjjbgAaCfhYdndna8LmbaPhoxekdna8KaY9RcK9pmbaPhoxekaocdtc:q1jjbfcj1jjbaDEg5ydxggcetc;:FFFeGh8Fcuh3cuagtcu7cFeGhacbh8Marc;qofhLinarc;qofa8MfhQczhEdndndnagPDbeeeeeeedekcucbaQcwf8PibaQ8Pib:e9cb9sEhExekcbhoa8FhEinaEaaaLaofRbb9nfhEaocefgocz9hmbkkcih8Ecbh8Ainczhwdndndna5a8AcdtfydbgKPDbeeeeeeedekcucbaQcwf8PibaQ8Pib:e9cb9sEhwxekaKcetc;:FFFeGhwcuaKtcu7cFeGhXcbhoinawaXaLaofRbb9nfhwaocefgocz9hmbkkdndnawaE6mbaKa39hmeawaE9hmea5a8EcdtfydbcwSmeka8Ah8EawhEka8Acefg8Aci9hmbkaAa8Mco4fgoaoRbba8Ea8Mci4coGtV86bbdndndna5a8Ecdtfydbg3PDdbbbbbbbebkdncwa39Tg8ETmbcua3tcu7hwdndna3ceSmbcbh8NaLhQinaQhoa8Eh8AcbhXinaoRbbgEawcFeGgKaEaK6EaXa3tVhXaocefhoa8Acufg8AmbkaYaX86bbaQa8EfhQaYcefhYa8Na8Efg8Ncz6mbxdkkcbh8NaLhQinaQhoa8Eh8AcbhXinaoRbbgEawcFeGgKaEaK6EaXcetVhXaocefhoa8Acufg8AmbkaYaX:T9cFe:d9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:9ca188bbaQa8EfhQaYcefhYa8Na8Efg8Ncz6mbkkcbhoinaYaLaofRbbgX86bbaYaXawcFeG9pfhYaocefgocz9hmbxikkdna3ceSmbinaYcb86bbaYcefhYxbkkinaYcb86bbaYcefhYxbkkaYaQ8Pbb83bbaYcwfaQcwf8Pbb83bbaYczfhYka8Mczfg8Ma8L9pgomeaLczfhLa8KaY9RcK9pmbkkaoTmlaYh5aYTmlka8Jcefg8Jal9hmbkarc;abfaxascufal2falz:vjjjb8Aasamfhma5hoa5mbkcbhwxdkdna8Kao9RakalfgwcKcaaDEgLawaL0EgX9pmbcbhwxdkdnawaL9pmbaocbaXaw9Rgwz:wjjjbawfhokaoarc;adfalz:vjjjbalfhodnaDTmbaoaraez:vjjjbaefhokaoab9Rhwxekcbhwkarc;qwf8Kjjjjbawk5babaeadaialcdcbyd;C:kjjbz:bjjjbk9reduaecd4gdaefgicaaica0Eabcj;abae9Uc;WFbGcjdaeca0Egifcufai9Uae2aiadfaicl4cifcd4f2fcefkmbcbabBd;C:kjjbk:Ese5u8Jjjjjbc;ae9Rgl8Kjjjjbcbhvdnaici9UgocHfae0mbabcbyd;m:kjjbgrc;GeV86bbalc;abfcFecjez:wjjjb8AalcUfgw9cu83ibalc8WfgD9cu83ibalcyfgq9cu83ibalcafgk9cu83ibalcKfgx9cu83ibalczfgm9cu83ibal9cu83iwal9cu83ibabaefc9WfhPabcefgsaofhednaiTmbcmcsarcb9kgzEhHcbhOcbhAcbhCcbhXcbhQindnaeaP9nmbcbhvxikaQcufhvadaCcdtfgLydbhKaLcwfydbhYaLclfydbh8AcbhEdndndninalc;abfavcsGcitfgoydlh3dndndnaoydbgoaK9hmba3a8ASmekdnaoa8A9hmba3aY9hmbaEcefhExekaoaY9hmea3aK9hmeaEcdfhEkaEc870mdaXcufhvaLaEciGcx2goc;i1jjbfydbcdtfydbh3aLaoc;e1jjbfydbcdtfydbh8AaLaoc;a1jjbfydbcdtfydbhKcbhodnindnalavcsGcdtfydba39hmbaohYxdkcuhYavcufhvaocefgocz9hmbkkaOa3aOSgvaYce9iaYaH9oVgoGfhOdndndncbcsavEaYaoEgvcs9hmbarce9imba3a3aAa3cefaASgvEgAcefSmecmcsavEhvkasavaEcdtc;WeGV86bbavcs9hmea3aA9Rgvcetavc8F917hvinaeavcFb0crtavcFbGV86bbaecefheavcje6hoavcr4hvaoTmbka3hAxvkcPhvasaEcdtcPV86bba3hAkavTmiavaH9omicdhocehEaQhYxlkavcufhvaEclfgEc;ab9hmbkkdnaLceaYaOSceta8AaOSEcx2gvc;a1jjbfydbcdtfydbgKTaLavc;e1jjbfydbcdtfydbg8AceSGaLavc;i1jjbfydbcdtfydbg3cdSGaOcb9hGazGg5ce9hmbaw9cu83ibaD9cu83ibaq9cu83ibak9cu83ibax9cu83ibam9cu83ibal9cu83iwal9cu83ibcbhOkcbhEaXcufgvhodnindnalaocsGcdtfydba8A9hmbaEhYxdkcuhYaocufhoaEcefgEcz9hmbkkcbhodnindnalavcsGcdtfydba39hmbaohExdkcuhEavcufhvaocefgocz9hmbkkaOaKaOSg8EfhLdndnaYcm0mbaYcefhYxekcbcsa8AaLSgvEhYaLavfhLkdndnaEcm0mbaEcefhExekcbcsa3aLSgvEhEaLavfhLkc9:cua8EEh8FcbhvaEaYcltVgacFeGhodndndninavc:W1jjbfRbbaoSmeavcefgvcz9hmbxdkka5aKaO9havcm0VVmbasavc;WeV86bbxekasa8F86bbaeaa86bbaecefhekdna8EmbaKaA9Rgvcetavc8F917hvinaeavcFb0gocrtavcFbGV86bbavcr4hvaecefheaombkaKhAkdnaYcs9hmba8AaA9Rgvcetavc8F917hvinaeavcFb0gocrtavcFbGV86bbavcr4hvaecefheaombka8AhAkdnaEcs9hmba3aA9Rgvcetavc8F917hvinaeavcFb0gocrtavcFbGV86bbavcr4hvaecefheaombka3hAkalaXcdtfaKBdbaXcefcsGhvdndnaYPzbeeeeeeeeeeeeeebekalavcdtfa8ABdbaXcdfcsGhvkdndnaEPzbeeeeeeeeeeeeeebekalavcdtfa3BdbavcefcsGhvkcihoalc;abfaQcitfgEaKBdlaEa8ABdbaQcefcsGhYcdhEavhXaLhOxekcdhoalaXcdtfa3BdbcehEaXcefcsGhXaQhYkalc;abfaYcitfgva8ABdlava3Bdbalc;abfaQaEfcsGcitfgva3BdlavaKBdbascefhsaQaofcsGhQaCcifgCai6mbkkdnaeaP9nmbcbhvxekcbhvinaeavfavc:W1jjbfRbb86bbavcefgvcz9hmbkaeab9Ravfhvkalc;aef8KjjjjbavkZeeucbhddninadcefgdc8F0meceadtae6mbkkadcrfcFeGcr9Uci2cdfabci9U2cHfkmbcbabBd;m:kjjbk:Adewu8Jjjjjbcz9Rhlcbhvdnaicvfae0mbcbhvabcbRb;m:kjjbc;qeV86bbal9cb83iwabcefhoabaefc98fhrdnaiTmbcbhwcbhDindnaoar6mbcbskadaDcdtfydbgqalcwfawaqav9Rgvavc8F91gv7av9Rc507gwcdtfgkydb9Rgvc8E91c9:Gavcdt7awVhvinaoavcFb0gecrtavcFbGV86bbavcr4hvaocefhoaembkakaqBdbaqhvaDcefgDai9hmbkkdnaoar9nmbcbskaocbBbbaoab9RclfhvkavkBeeucbhddninadcefgdc8F0meceadtae6mbkkadcwfcFeGcr9Uab2cvfk:bvli99dui99ludnaeTmbcuadcetcuftcu7:Zhvdndncuaicuftcu7:ZgoJbbbZMgr:lJbbb9p9DTmbar:Ohwxekcjjjj94hwkcbhicbhDinalclfIdbgrJbbbbJbbjZalIdbgq:lar:lMalcwfIdbgk:lMgr:varJbbbb9BEgrNhxaqarNhrdndnakJbbbb9GTmbaxhqxekJbbjZar:l:tgqaq:maxJbbbb9GEhqJbbjZax:l:tgxax:marJbbbb9GEhrkdndnalcxfIdbgxJbbj:;axJbbj:;9GEgkJbbjZakJbbjZ9FEavNJbbbZJbbb:;axJbbbb9GEMgx:lJbbb9p9DTmbax:Ohmxekcjjjj94hmkdndnaqJbbj:;aqJbbj:;9GEgxJbbjZaxJbbjZ9FEaoNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:OhPxekcjjjj94hPkdndnarJbbj:;arJbbj:;9GEgqJbbjZaqJbbjZ9FEaoNJbbbZJbbb:;arJbbbb9GEMgr:lJbbb9p9DTmbar:Ohsxekcjjjj94hskdndnadcl9hmbabaifgzas86bbazcifam86bbazcdfaw86bbazcefaP86bbxekabaDfgzas87ebazcofam87ebazclfaw87ebazcdfaP87ebkalczfhlaiclfhiaDcwfhDaecufgembkkk;hlld99eud99eudnaeTmbdndncuaicuftcu7:ZgvJbbbZMgo:lJbbb9p9DTmbao:Ohixekcjjjj94hikaic;8FiGhrinabcofcicdalclfIdb:lalIdb:l9EgialcwfIdb:lalaicdtfIdb:l9EEgialcxfIdb:lalaicdtfIdb:l9EEgiarV87ebdndnJbbj:;JbbjZalaicdtfIdbJbbbb9DEgoalaicd7cdtfIdbJ;Zl:1ZNNgwJbbj:;awJbbj:;9GEgDJbbjZaDJbbjZ9FEavNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohqxekcjjjj94hqkabcdfaq87ebdndnalaicefciGcdtfIdbJ;Zl:1ZNaoNgwJbbj:;awJbbj:;9GEgDJbbjZaDJbbjZ9FEavNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohqxekcjjjj94hqkabaq87ebdndnaoalaicufciGcdtfIdbJ;Zl:1ZNNgoJbbj:;aoJbbj:;9GEgwJbbjZawJbbjZ9FEavNJbbbZJbbb:;aoJbbbb9GEMgo:lJbbb9p9DTmbao:Ohixekcjjjj94hikabclfai87ebabcwfhbalczfhlaecufgembkkk;3viDue99eu8Jjjjjbcjd9Rgo8Kjjjjbadcd4hrdndndndnavcd9hmbadcl6meaohwarhDinawc:CuBdbawclfhwaDcufgDmbkaeTmiadcl6mdarcdthqalhkcbhxinaohwakhDarhminawawydbgPcbaDIdbgs:8cL4cFeGc:cufasJbbbb9BEgzaPaz9kEBdbaDclfhDawclfhwamcufgmmbkakaqfhkaxcefgxaeSmixbkkaeTmdxekaeTmekarcdthkavce9hhqadcl6hdcbhxindndndnaqmbadmdc:CuhDalhwarhminaDcbawIdbgs:8cL4cFeGc:cufasJbbbb9BEgPaDaP9kEhDawclfhwamcufgmmbxdkkc:CuhDdndnavPleddbdkadmdaohwalhmarhPinawcbamIdbgs:8cL4cFeGgzc;:bazc;:b0Ec:cufasJbbbb9BEBdbamclfhmawclfhwaPcufgPmbxdkkadmecbhwarhminaoawfcbalawfIdbgs:8cL4cFeGgPc8AaPc8A0Ec:cufasJbbbb9BEBdbawclfhwamcufgmmbkkadmbcbhwarhPinaDhmdnavceSmbaoawfydbhmkdndnalawfIdbgscjjj;8iamai9RcefgmcLt9R::NJbbbZJbbb:;asJbbbb9GEMgs:lJbbb9p9DTmbas:Ohzxekcjjjj94hzkabawfazcFFFrGamcKtVBdbawclfhwaPcufgPmbkkabakfhbalakfhlaxcefgxae9hmbkkaocjdf8Kjjjjbk;YqdXui998Jjjjjbc:qd9Rgv8Kjjjjbavc:Sefcbc;Kbz:wjjjb8AcbhodnadTmbcbhoaiTmbdndnabaeSmbaehrxekavcuadcdtgwadcFFFFi0Ecbyd;u:kjjbHjjjjbbgrBd:SeavceBd:mdaraeawz:vjjjb8Akavc:GefcwfcbBdbav9cb83i:Geavc:Gefaradaiavc:Sefz:ojjjbavyd:GehDadci9Ugqcbyd;u:kjjbHjjjjbbheavc:Sefavyd:mdgkcdtfaeBdbavakcefgwBd:mdaecbaqz:wjjjbhxavc:SefawcdtfcuaicdtaicFFFFi0Ecbyd;u:kjjbHjjjjbbgmBdbavakcdfgPBd:mdalc;ebfhsaDheamhwinawalIdbasaeydbgzcwazcw6EcdtfIdbMUdbaeclfheawclfhwaicufgimbkavc:SefaPcdtfcuaqcdtadcFFFF970Ecbyd;u:kjjbHjjjjbbgPBdbdnadci6mbarheaPhwaqhiinawamaeydbcdtfIdbamaeclfydbcdtfIdbMamaecwfydbcdtfIdbMUdbaecxfheawclfhwaicufgimbkkakcifhoalc;ebfhHavc;qbfhOavheavyd:KehAavyd:OehCcbhzcbhwcbhXcehQinaehLcihkarawci2gKcdtfgeydbhsaeclfydbhdabaXcx2fgicwfaecwfydbgYBdbaiclfadBdbaiasBdbaxawfce86bbaOaYBdwaOadBdlaOasBdbaPawcdtfcbBdbdnazTmbcihkaLhiinaOakcdtfaiydbgeBdbakaeaY9haeas9haead9hGGfhkaiclfhiazcufgzmbkkaXcefhXcbhzinaCaAarazaKfcdtfydbcdtgifydbcdtfgYheaDaifgdydbgshidnasTmbdninaeydbawSmeaeclfheaicufgiTmdxbkkaeaYascdtfc98fydbBdbadadydbcufBdbkazcefgzci9hmbkdndnakTmbcuhwJbbbbh8Acbhdavyd:KehYavyd:OehKindndnaDaOadcdtfydbcdtgzfydbgembadcefhdxekadcs0hiamazfgsIdbhEasalcbadcefgdaiEcdtfIdbaHaecwaecw6EcdtfIdbMg3Udba3aE:th3aecdthiaKaYazfydbcdtfheinaPaeydbgzcdtfgsa3asIdbMgEUdbaEa8Aa8AaE9DgsEh8AazawasEhwaeclfheaic98fgimbkkadak9hmbkawcu9hmekaQaq9pmdindnaxaQfRbbmbaQhwxdkaqaQcefgQ9hmbxikkakczakcz6EhzaOheaLhOawcu9hmbkkaocdtavc:Seffc98fhedninaoTmeaeydbcbyd;q:kjjbH:bjjjbbaec98fheaocufhoxbkkavc:qdf8Kjjjjbk;IlevucuaicdtgvaicFFFFi0Egocbyd;u:kjjbHjjjjbbhralalyd9GgwcdtfarBdbalawcefBd9GabarBdbaocbyd;u:kjjbHjjjjbbhralalyd9GgocdtfarBdbalaocefBd9GabarBdlcuadcdtadcFFFFi0Ecbyd;u:kjjbHjjjjbbhralalyd9GgocdtfarBdbalaocefBd9GabarBdwabydbcbavz:wjjjb8Aadci9UhDdnadTmbabydbhoaehladhrinaoalydbcdtfgvavydbcefBdbalclfhlarcufgrmbkkdnaiTmbabydbhlabydlhrcbhvaihoinaravBdbarclfhralydbavfhvalclfhlaocufgombkkdnadci6mbabydlhrabydwhvcbhlinaecwfydbhoaeclfydbhdaraeydbcdtfgwawydbgwcefBdbavawcdtfalBdbaradcdtfgdadydbgdcefBdbavadcdtfalBdbaraocdtfgoaoydbgocefBdbavaocdtfalBdbaecxfheaDalcefgl9hmbkkdnaiTmbabydlheabydbhlinaeaeydbalydb9RBdbalclfhlaeclfheaicufgimbkkkQbabaeadaic;K1jjbz:njjjbkQbabaeadaic;m:jjjbz:njjjbk9DeeuabcFeaicdtz:wjjjbhlcbhbdnadTmbindnalaeydbcdtfgiydbcu9hmbaiabBdbabcefhbkaeclfheadcufgdmbkkabk:Vvioud9:du8Jjjjjbc;Wa9Rgl8Kjjjjbcbhvalcxfcbc;Kbz:wjjjb8AalcuadcitgoadcFFFFe0Ecbyd;u:kjjbHjjjjbbgrBdxalceBd2araeadaicez:tjjjbalcuaoadcjjjjoGEcbyd;u:kjjbHjjjjbbgwBdzadcdthednadTmbabhiinaiavBdbaiclfhiadavcefgv9hmbkkawaefhDalabBdwalawBdl9cbhqindnadTmbaq9cq9:hkarhvaDhiadheinaiav8Pibak1:NcFrG87ebavcwfhvaicdfhiaecufgembkkalclfaq:NceGcdtfydbhxalclfaq9ce98gq:NceGcdtfydbhmalc;Wbfcbcjaz:wjjjb8AaDhvadhidnadTmbinalc;Wbfav8VebcdtfgeaeydbcefBdbavcdfhvaicufgimbkkcbhvcbhiinalc;WbfavfgeydbhoaeaiBdbaoaifhiavclfgvcja9hmbkadhvdndnadTmbinalc;WbfaDamydbgicetf8VebcdtfgeaeydbgecefBdbaxaecdtfaiBdbamclfhmavcufgvmbkaq9cv9smdcbhvinabawydbcdtfavBdbawclfhwadavcefgv9hmbxdkkaq9cv9smekkclhvdninavc98Smealcxfavfydbcbyd;q:kjjbH:bjjjbbavc98fhvxbkkalc;Waf8Kjjjjbk:Jwliuo99iud9:cbhv8Jjjjjbca9Rgoczfcwfcbyd:8:kjjbBdbaocb8Pd:0:kjjb83izaocwfcbyd;i:kjjbBdbaocb8Pd;a:kjjb83ibaicd4hrdndnadmbJFFuFhwJFFuuhDJFFuuhqJFFuFhkJFFuuhxJFFuFhmxekarcdthPaehsincbhiinaoczfaifgzasaifIdbgwazIdbgDaDaw9EEUdbaoaifgzawazIdbgDaDaw9DEUdbaiclfgicx9hmbkasaPfhsavcefgvad9hmbkaoIdKhDaoIdwhwaoIdChqaoIdlhkaoIdzhxaoIdbhmkdnadTmbJbbbbJbFu9hJbbbbamax:tgmamJbbbb9DEgmakaq:tgkakam9DEgkawaD:tgwawak9DEgw:vawJbbbb9BEhwdnalmbarcdthoindndnaeclfIdbaq:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikai:S9cC:ghHdndnaeIdbax:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikaHai:S:ehHdndnaecwfIdbaD:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabaHai:T9cy:g:e83ibaeaofheabcwfhbadcufgdmbxdkkarcdthoindndnaeIdbax:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikai:SgH9ca:gaH9cz:g9cjjj;4s:d:eaH9cFe:d:e9cF:bj;4:pj;ar:d9c:bd9:9c:p;G:d;4j:E;ar:d9cH9:9c;d;H:W:y:m:g;d;Hb:d9cv9:9c;j:KM;j:KM;j:Kd:dhOdndnaeclfIdbaq:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikai:SgH9ca:gaH9cz:g9cjjj;4s:d:eaH9cFe:d:e9cF:bj;4:pj;ar:d9c:bd9:9c:p;G:d;4j:E;ar:d9cH9:9c;d;H:W:y:m:g;d;Hb:d9cq9:9cM;j:KM;j:KM;jl:daO:ehOdndnaecwfIdbaD:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabaOai:SgH9ca:gaH9cz:g9cjjj;4s:d:eaH9cFe:d:e9cF:bj;4:pj;ar:d9c:bd9:9c:p;G:d;4j:E;ar:d9cH9:9c;d;H:W:y:m:g;d;Hb:d9cC9:9c:KM;j:KM;j:KMD:d:e83ibaeaofheabcwfhbadcufgdmbkkk9teiucbcbyd;y:kjjbgeabcifc98GfgbBd;y:kjjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;teeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiaeydlBdlaiaeydwBdwaiaeydxBdxaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk:3eedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdxaialBdwaialBdlaialBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd;y:kjjbgeabcrfc94GfgbBd;y:kjjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik9:eiuZbhedndncbyd;y:kjjbgdaecztgi9nmbcuheadai9RcFFifcz4nbcuSmekadhekcbabae9Rcifc98Gcbyd;y:kjjbfgdBd;y:kjjbdnadZbcztge9nmbadae9RcFFifcz4nb8Akkk;Qddbcjwk;mdbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbbbbbbbbbbbbb4:h9w9N94:P:gW:j9O:ye9Pbbbbbbebbbdbbbebbbdbbbbbbbdbbbbbbbebbbbbbb:l29hZ;69:9kZ;N;76Z;rg97Z;z;o9xZ8J;B85Z;:;u9yZ;b;k9HZ:2;Z9DZ9e:l9mZ59A8KZ:r;T3Z:A:zYZ79OHZ;j4::8::Y:D9V8:bbbb9s:49:Z8R:hBZ9M9M;M8:L;z;o8:;8:PG89q;x:J878R:hQ8::M:B;e87bbbbbbjZbbjZbbjZ:E;V;N8::Y:DsZ9i;H;68:xd;R8:;h0838:;W:NoZbbbb:WV9O8:uf888:9i;H;68:9c9G;L89;n;m9m89;D8Ko8:bbbbf:8tZ9m836ZS:2AZL;zPZZ818EZ9e:lxZ;U98F8:819E;68:FFuuFFuuFFuuFFuFFFuFFFuFbc;mqkzebbbebbbdbbb9G:vbb",e=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var t,n=WebAssembly.instantiate(i(a),{}).then(function(f){t=f.instance,t.exports.__wasm_call_ctors(),t.exports.meshopt_encodeVertexVersion(0),t.exports.meshopt_encodeIndexVersion(1)});function i(f){for(var m=new Uint8Array(f.length),g=0;g<f.length;++g){var b=f.charCodeAt(g);m[g]=b>96?b-97:b>64?b-39:b+4}for(var p=0,g=0;g<f.length;++g)m[p++]=m[g]<60?e[m[g]]:(m[g]-60)*64+m[++g];return m.buffer.slice(0,p)}function s(f){if(!f)throw new Error("Assertion failed")}function r(f){return new Uint8Array(f.buffer,f.byteOffset,f.byteLength)}function o(f,m,g,b){var p=t.exports.sbrk,x=p(m.length*4),y=p(g*4),v=new Uint8Array(t.exports.memory.buffer),_=r(m);v.set(_,x),b&&b(x,x,m.length,g);var w=f(y,x,m.length,g);v=new Uint8Array(t.exports.memory.buffer);var T=new Uint32Array(g);new Uint8Array(T.buffer).set(v.subarray(y,y+g*4)),_.set(v.subarray(x,x+m.length*4)),p(x-p(0));for(var I=0;I<m.length;++I)m[I]=T[m[I]];return[T,w]}function c(f,m,g,b){var p=t.exports.sbrk,x=p(g*4),y=p(g*b),v=new Uint8Array(t.exports.memory.buffer);v.set(r(m),y),f(x,y,g,b),v=new Uint8Array(t.exports.memory.buffer);var _=new Uint32Array(g);return new Uint8Array(_.buffer).set(v.subarray(x,x+g*4)),p(x-p(0)),_}function l(f,m,g,b,p){var x=t.exports.sbrk,y=x(m),v=x(b*p),_=new Uint8Array(t.exports.memory.buffer);_.set(r(g),v);var w=f(y,m,v,b,p),T=new Uint8Array(w);return T.set(_.subarray(y,y+w)),x(y-x(0)),T}function d(f){for(var m=0,g=0;g<f.length;++g){var b=f[g];m=m<b?b:m}return m}function h(f,m){if(s(m==2||m==4),m==4)return new Uint32Array(f.buffer,f.byteOffset,f.byteLength/4);var g=new Uint16Array(f.buffer,f.byteOffset,f.byteLength/2);return new Uint32Array(g)}function u(f,m,g,b,p,x,y){var v=t.exports.sbrk,_=v(g*b),w=v(g*x),T=new Uint8Array(t.exports.memory.buffer);T.set(r(m),w),f(_,g,b,p,w,y);var I=new Uint8Array(g*b);return I.set(T.subarray(_,_+g*b)),v(_-v(0)),I}return{ready:n,supported:!0,reorderMesh:function(f,m,g){var b=m?g?t.exports.meshopt_optimizeVertexCacheStrip:t.exports.meshopt_optimizeVertexCache:void 0;return o(t.exports.meshopt_optimizeVertexFetchRemap,f,d(f)+1,b)},reorderPoints:function(f,m){return s(f instanceof Float32Array),s(f.length%m==0),s(m>=3),c(t.exports.meshopt_spatialSortRemap,f,f.length/m,m*4)},encodeVertexBuffer:function(f,m,g){s(g>0&&g<=256),s(g%4==0);var b=t.exports.meshopt_encodeVertexBufferBound(m,g);return l(t.exports.meshopt_encodeVertexBuffer,b,f,m,g)},encodeIndexBuffer:function(f,m,g){s(g==2||g==4),s(m%3==0);var b=h(f,g),p=t.exports.meshopt_encodeIndexBufferBound(m,d(b)+1);return l(t.exports.meshopt_encodeIndexBuffer,p,b,m,4)},encodeIndexSequence:function(f,m,g){s(g==2||g==4);var b=h(f,g),p=t.exports.meshopt_encodeIndexSequenceBound(m,d(b)+1);return l(t.exports.meshopt_encodeIndexSequence,p,b,m,4)},encodeGltfBuffer:function(f,m,g,b){var p={ATTRIBUTES:this.encodeVertexBuffer,TRIANGLES:this.encodeIndexBuffer,INDICES:this.encodeIndexSequence};return s(p[b]),p[b](f,m,g)},encodeFilterOct:function(f,m,g,b){return s(g==4||g==8),s(b>=1&&b<=16),u(t.exports.meshopt_encodeFilterOct,f,m,g,b,16)},encodeFilterQuat:function(f,m,g,b){return s(g==8),s(b>=4&&b<=16),u(t.exports.meshopt_encodeFilterQuat,f,m,g,b,16)},encodeFilterExp:function(f,m,g,b,p){s(g>0&&g%4==0),s(b>=1&&b<=24);var x={Separate:0,SharedVector:1,SharedComponent:2,Clamped:3};return u(t.exports.meshopt_encodeFilterExp,f,m,g,b,g,p?x[p]:1)}}})();var su=(function(){var a="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:W:Odkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:S86qdbk;jYi5ud9:du8Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz1jjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCabaOad2fhXaAcethQaxaDfhiaOaeaoaeao6E9RhLalcl4cifcd4hKazcj;cbfaAfhYcbh8AazcjdfhEaHh3incbhodnawTmbaxa8Acd4fRbbhokaocFeGh5cbh8Eazcj;cbfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcj;cbfa8EaA2fa8FaAz1jjjb8Aa8FaAfhixdkazcj;cbfa8EaA2fcbaAz:jjjjb8Aa8FhixekaPa8F9RaK6mva8FaKfhidnaCTmbaPai9RcK6mbaocdtc:q1jjbfcj1jjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bbarcwf9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfag9c8F1:NghcKtc8F91aicdfa8J9c8N1:Nfg8KRbbG86bbarcVfcba8KahcjeGcr4fghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fag9c8F1:NgicKtc8F91aha8J9c8N1:NfghRbbG86bbarc96fcbahaicjeGcr4fgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbb83bbarcwfaicwf8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasa8Acd4fRbbgociGPlbedrbkaATmdaza8Afh8Fazcj;cbfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeaza8Afhaazcj;cbfhhcbhoceh8EaYh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaLaocefgofmbka8FaQfh8FcdhoaacdfhaahaQfhha8EceGhlcbh8EalmbxdkkaATmbcbaocl49Rh8Eaza8AfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaYhainazcj;cbfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E93aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3a8Aclfg8Aad6mbkaXazcjdfaAad2z1jjjb8AazazcjdfaAcufad2fadz1jjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaok:XseHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbaxcefgOavaiaqaDcsGfRbbgscl49RcsGcdtfydbascz6gPEhDavaias9RcsGcdtfydbaOaPfgzascsGgOEhsaOThOdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiaPfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaOfhiazaOfhxxekaxcbalRbbgHEgAaDc;:eSgDfhzaHcsGhCaHcl4hXdndnaHcs0mbazcefhOxekazhOavaiaX9RcsGcdtfydbhzkdndnaCmbaOcefhxxekaOhxavaiaH9RcsGcdtfydbhOkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhAascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaAhDxekaDcefhDkasce4cbasceG9R7amfgmhAkdndnaXcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhzaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkazhsxekascefhskaPce4cbaPceG9R7amfgmhzkdndnaCcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhOaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkaOhlxekalcefhlkaPce4cbaPceG9R7amfgmhOkdndnadcd9hmbabarcetfgDaA87ebaDclfaO87ebaDcdfaz87ebxekabarcdtfgDaABdbaDcwfaOBdbaDclfazBdbkavc;abfaocitfgDazBdbaDaABdlavaicdtfaABdbavc;abfaocefcsGcitfgDaOBdbaDazBdlavaicefgicsGcdtfazBdbavc;abfaocdfcsGcitfgDaABdbaDaOBdlavaiaHcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnaecvfal9nmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;oiliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabaiavcefciGfcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavciGfgkcd7cetfaD87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavcufciGfcetfaD87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohvxekcjjjj94hvkabakcetfav87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk9teiucbcbyd:K1jjbgeabcifc98GfgbBd:K1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;teeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiaeydlBdlaiaeydwBdwaiaeydxBdxaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk:3eedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdxaialBdwaialBdlaialBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk81dbcjwk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:Kwkl8WNbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q:6dkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;G9Mqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk:183lYud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxavaialfgmar9Rgoad;8qbbcj;abad9Uc;WFbGcjdadca0EhPdndndnadTmbaoadfhscbhzinaeaz9nmdamax9RaD6miabazad2fhHaxaDfhOaPaeaz9RazaPfae6EgAcsfgocl4cifcd4hCavcj;cbfaoc9WGgXcetfhQavcj;cbfaXci2fhLavcj;cbfaXfhKcbhYaoc;ab6h8AincbhodnawTmbaxaYcd4fRbbhokaocFeGhEcbh3avcj;cbfh5indndndndnaEa3cet4ciGgoc9:fPdebdkamaO9RaX6mwavcj;cbfa3aX2faOaX;8qbbaOaAfhOxdkavcj;cbfa3aX2fcbaX;8kbxekamaO9RaC6moaoclVcbawEhraOaCfhocbhidna8Ambamao9Rc;Gb6mbcbhlina5alfhidndndndndndnaOalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaoclffahc:q:yjjbfRbbfhoxikaiaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaocwffahc:q:yjjbfRbbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaaaocdffahc:q:yjjbfRbbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaoclffahc:q:yjjbfRbbfhoxikaiczfaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaocwffahc:q:yjjbfRbbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaaaocdffahc:q:yjjbfRbbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaoclffahc:q:yjjbfRbbfhoxikaicafaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaocwffahc:q:yjjbfRbbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaaaocdffahc:q:yjjbfRbbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngicitc:q1jjbfpbibaic:q:yjjbfRbbgipsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaiaoclffaqc:q:yjjbfRbbfhoxikaic8Wfaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngicitc:q1jjbfpbibaic:q:yjjbfRbbgipsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaiaocwffaqc:q:yjjbfRbbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitc:q1jjbfpbibaic:q:yjjbfRbbgipsaoRbegqcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqc:q:yjjbfRbbfhokalc;abfhialcjefaX0meaihlamao9Rc;Fb0mbkkdnaiaX9pmbaici4hlinamao9RcK6mwa5aifhqdndndndndndnaOaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spkbbaaaoclffahc:q:yjjbfRbbfhoxikaqaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spkbbaaaocwffahc:q:yjjbfRbbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpkbbaaaocdffahc:q:yjjbfRbbfhokalcdfhlaiczfgiaX6mbkkaohOaoTmoka5aXfh5a3cefg3cl9hmbkdndndndnawTmbasaYcd4fRbbglciGPlbedwbkaXTmdavcjdfaYfhlavaYfpbdbhgcbhoinalavcj;cbfaofpblbg8JaKaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaQaofpblbg8MaLaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Ecep9Ta8Epxeeeeeeeeeeeeeeeeg8Fp9op9Hp9rg8Eagp9Uggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp9Uggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp9Uggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9Abbbaladfglaga8LaypmwDKYqk8AExm35Ps8E8Fg8Ecep9Ta8Ea8Fp9op9Hp9rg8Ep9Uggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp9Uggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp9Uggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9Abbbaladfglaga8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Ecep9Ta8Ea8Fp9op9Hp9rg8Ep9Uggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp9Uggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp9Uggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9Abbbaladfglaga8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Ecep9Ta8Ea8Fp9op9Hp9rg8Ep9Ug8Fp9Abbbaladfgla8Fa8Ea8Epmlvorlvorlvorlvorp9Ug8Fp9Abbbaladfgla8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9Ug8Fp9Abbbaladfgla8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9AbbbaladfhlaoczfgoaX6mbxikkaXTmeavcjdfaYfhlavaYfpbdbhgcbhoinalavcj;cbfaofpblbg8JaKaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaQaofpblbg8MaLaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Ecep:nea8Epxebebebebebebebebg8Fp9op:bep9rg8Eagp:oeggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp:oeggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp:oeggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9Abbbaladfglaga8LaypmwDKYqk8AExm35Ps8E8Fg8Ecep:nea8Ea8Fp9op:bep9rg8Ep:oeggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp:oeggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp:oeggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9Abbbaladfglaga8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Ecep:nea8Ea8Fp9op:bep9rg8Ep:oeggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp:oeggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp:oeggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9Abbbaladfglaga8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Ecep:nea8Ea8Fp9op:bep9rg8Ep:oeg8Fp9Abbbaladfgla8Fa8Ea8Epmlvorlvorlvorlvorp:oeg8Fp9Abbbaladfgla8Fa8Ea8EpmwDqkwDqkwDqkwDqkp:oeg8Fp9Abbbaladfgla8Fa8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9AbbbaladfhlaoczfgoaX6mbxdkkaXTmbcbhocbalcl4gl9Rc8FGhiavcjdfaYfhravaYfpbdbh8Finaravcj;cbfaofpblbggaKaofpblbg8JpmbzeHdOiAlCvXoQrLg8KaQaofpblbg8LaLaofpblbg8MpmbzeHdOiAlCvXoQrLg8NpmbezHdiOAlvCXorQLg8Eaip:Rea8Ealp:Sep9qg8Ea8Fp9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9Abbbaradfgra8Fa8Ka8NpmwDKYqk8AExm35Ps8E8Fg8Eaip:Rea8Ealp:Sep9qg8Ep9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9Abbbaradfgra8Faga8JpmwKDYq8AkEx3m5P8Es8Fgga8La8MpmwKDYq8AkEx3m5P8Es8Fg8JpmbezHdiOAlvCXorQLg8Eaip:Rea8Ealp:Sep9qg8Ep9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9Abbbaradfgra8Faga8JpmwDKYqk8AExm35Ps8E8Fg8Eaip:Rea8Ealp:Sep9qg8Ep9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9AbbbaradfhraoczfgoaX6mbkkaYclfgYad6mbkaHavcjdfaAad2;8qbbavavcjdfaAcufad2fad;8qbbaAazfhzc9:hoaOhxaOmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdaPaeao9RaoaPfae6Eaofgoae6mbkaial9Rhxkcbc99amax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbk:TseHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbaxcefgOavaiaqaDcsGfRbbgscl49RcsGcdtfydbascz6gPEhDavaias9RcsGcdtfydbaOaPfgzascsGgOEhsaOThOdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiaPfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaOfhiazaOfhxxekaxcbalRbbgHEgAaDc;:eSgDfhzaHcsGhCaHcl4hXdndnaHcs0mbazcefhOxekazhOavaiaX9RcsGcdtfydbhzkdndnaCmbaOcefhxxekaOhxavaiaH9RcsGcdtfydbhOkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhAascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaAhDxekaDcefhDkasce4cbasceG9R7amfgmhAkdndnaXcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhzaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkazhsxekascefhskaPce4cbaPceG9R7amfgmhzkdndnaCcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhOaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkaOhlxekalcefhlkaPce4cbaPceG9R7amfgmhOkdndnadcd9hmbabarcetfgDaA87ebaDclfaO87ebaDcdfaz87ebxekabarcdtfgDaABdbaDcwfaOBdbaDclfazBdbkavc;abfaocitfgDazBdbaDaABdlavaicdtfaABdbavc;abfaocefcsGcitfgDaOBdbaDazBdlavaicefgicsGcdtfazBdbavc;abfaocdfcsGcitfgDaABdbaDaOBdlavaiaHcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnaecvfal9nmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:SPliuo97eue978Jjjjjbca9Rhiaec98Ghldndnadcl9hmbdnalTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalaeSmeaipxbbbbbbbbbbbbbbbbgqpklbaiabalcdtfgdaeciGglcdtgv;8qbbdnalTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDaqp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkadaiav;8qbbskdnalTmbcbhvabhdinadczfgxaxpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;7eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oaoarpmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgval6mbkkalaeSmbaiczfpxbbbbbbbbbbbbbbbbgopklbaiaopklbaiabalcitfgdaeciGglcitgv;8qbbdnalTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;7eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oaoarpmbezHdiOAlvCXorQLp9qpklbkadaiav;8qbbkk:oDllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalaeSmbaiczfpxbbbbbbbbbbbbbbbbgkpklbaiakpklbaiabalcitfgoaeciGgvcitgw;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkaoaiaw;8qbbkk;uddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbheabhdinadadpbbbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbadczfhdaeclfgeav6mbkkdnavalSmbaic8WfpxbbbbbbbbbbbbbbbbgopklbaicafaopklbaiczfaopklbaiaopklbaiabavcdtfgdalciGgecdtgv;8qbbdnaeTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepklbkadaiav;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz:Dbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var i=WebAssembly.validate(t)?o(e):o(a),s,r=WebAssembly.instantiate(i,{}).then(function(p){s=p.instance,s.exports.__wasm_call_ctors()});function o(p){for(var x=new Uint8Array(p.length),y=0;y<p.length;++y){var v=p.charCodeAt(y);x[y]=v>96?v-97:v>64?v-39:v+4}for(var _=0,y=0;y<p.length;++y)x[_++]=x[y]<60?n[x[y]]:(x[y]-60)*64+x[++y];return x.buffer.slice(0,_)}function c(p,x,y,v,_,w,T){var I=p.exports.sbrk,M=v+3&-4,S=I(M*_),R=I(w.length),D=new Uint8Array(p.exports.memory.buffer);D.set(w,R);var L=x(S,v,_,R,w.length);if(L==0&&T&&T(S,M,_),y.set(D.subarray(S,S+v*_)),I(S-I(0)),L!=0)throw new Error("Malformed buffer data: "+L)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},d={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},h=[],u=0;function f(p){var x={object:new Worker(p),pending:0,requests:{}};return x.object.onmessage=function(y){var v=y.data;x.pending-=v.count,x.requests[v.id][v.action](v.value),delete x.requests[v.id]},x}function m(p){for(var x="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(i)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+b.name+";"+c.toString()+b.toString(),y=new Blob([x],{type:"text/javascript"}),v=URL.createObjectURL(y),_=h.length;_<p;++_)h[_]=f(v);for(var _=p;_<h.length;++_)h[_].object.postMessage({});h.length=p,URL.revokeObjectURL(v)}function g(p,x,y,v,_){for(var w=h[0],T=1;T<h.length;++T)h[T].pending<w.pending&&(w=h[T]);return new Promise(function(I,M){var S=new Uint8Array(y),R=++u;w.pending+=p,w.requests[R]={resolve:I,reject:M},w.object.postMessage({id:R,count:p,size:x,source:S,mode:v,filter:_},[S.buffer])})}function b(p){var x=p.data;if(!x.id)return self.close();self.ready.then(function(y){try{var v=new Uint8Array(x.count*x.size);c(y,y.exports[x.mode],v,x.count,x.size,x.source,y.exports[x.filter]),self.postMessage({id:x.id,count:x.count,action:"resolve",value:v},[v.buffer])}catch(_){self.postMessage({id:x.id,count:x.count,action:"reject",value:_})}})}return{ready:r,supported:!0,useWorkers:function(p){m(p)},decodeVertexBuffer:function(p,x,y,v,_){c(s,s.exports.meshopt_decodeVertexBuffer,p,x,y,v,s.exports[l[_]])},decodeIndexBuffer:function(p,x,y,v){c(s,s.exports.meshopt_decodeIndexBuffer,p,x,y,v)},decodeIndexSequence:function(p,x,y,v){c(s,s.exports.meshopt_decodeIndexSequence,p,x,y,v)},decodeGltfBuffer:function(p,x,y,v,_,w){c(s,s.exports[d[_]],p,x,y,v,s.exports[l[w]])},decodeGltfBufferAsync:function(p,x,y,v,_){return h.length>0?g(p,x,y,d[v],l[_]):r.then(function(){var w=new Uint8Array(p*x);return c(s,s.exports[d[v]],w,p,x,y,s.exports[l[_]]),w})}}})();var jT=(function(){var a="b9H79Tebbbetm9Geueu9Geub9Gbb9Gsuuuuuuuuuuuu99uueu9Gvuuuuub9Gruuuuuuub9Gvuuuuue999Gvuuuuueu9Gquuuuuuu99uueu9Gwuuuuuu99ueu9Giuuue999Gluuuueu9GiuuueuiOHdilvorlwiDqkbxxbelve9Weiiviebeoweuec:G:Pdkr:Tewo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bbz9TW79O9V9Wt9F79P9T9W29P9M95br8E9TW79O9V9Wt9F79P9T9W29P9M959x9Pt9OcttV9P9I91tW7bwQ9TW79O9V9Wt9F79P9T9W29P9M959q9V9P9Ut7bDX9TW79O9V9Wt9F79P9T9W29P9M959t9J9H2Wbqa9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94SWt9J9O9sW9T9H9Wbkl79IV9RbxDwebcekdzsq;B:xeHdbkM9Hi8Au8A99Au8Jjjjjbc;W;qb9Rgs8Kjjjjbcbhzascxfcbc;Kbz:ojjjb8AdnabaeSmbabaeadcdtz:njjjb8AkdndnamcdGmbascxfhHcbhOxekasalcrfci4gecbyd:m:jjjbHjjjjbbgABdxasceBd2aAcbaez:ojjjbhCcbhlcbhednadTmbcbhlabheadhAinaCaeydbgXci4fgQaQRbbgQceaXcrGgXtV86bbaQcu7aX4ceGalfhlaeclfheaAcufgAmbkcualcdtalcFFFFi0EhekascCfhHasaecbyd:m:jjjbHjjjjbbgOBdzascdBd2alcd4alfhXcehAinaAgecethAaeaX6mbkcdhzcbhLascuaecdtgAaecFFFFi0Ecbyd:m:jjjbHjjjjbbgXBdCasciBd2aXcFeaAz:ojjjbhKdnadTmbaecufhYcbh8AindndnaKabaLcdtfgEydbgQc:v;t;h;Ev2aYGgXcdtfgCydbgAcuSmbceheinaOaAcdtfydbaQSmdaXaefhAaecefheaKaAaYGgXcdtfgCydbgAcu9hmbkkaOa8AcdtfaQBdbaCa8ABdba8AhAa8Acefh8AkaEaABdbaLcefgLad9hmbkkaKcbyd1:jjjbH:bjjjbbascdBd2kcbh3aHcualcefgecdtaecFFFFi0Ecbyd:m:jjjbHjjjjbbg5Bdbasa5BdlasazceVgeBd2ascxfaecdtfcuadcitadcFFFFe0Ecbyd:m:jjjbHjjjjbbg8EBdbasa8EBdwasazcdfgeBd2asclfabadalcbz:cjjjbascxfaecdtfcualcdtgealcFFFFi0Eg8Fcbyd:m:jjjbHjjjjbbgABdbasazcifgXBd2ascxfaXcdtfa8Fcbyd:m:jjjbHjjjjbbgaBdbasazclVBd2aAaaaialavaOascxfz:djjjbalcbyd:m:jjjbHjjjjbbhCascxfasyd2ghcdtfaCBdbasahcefgXBd2ascxfaXcdtfa8Fcbyd:m:jjjbHjjjjbbgXBdbasahcdfgQBd2ascxfaQcdtfa8Fcbyd:m:jjjbHjjjjbbgQBdbasahcifggBd2aXcFeaez:ojjjbh8JaQcFeaez:ojjjbh8KdnalTmba8Ecwfh8Lindna5a3gQcefg3cdtfydbgKa5aQcdtgefydbgXSmbaKaX9Rhza8EaXcitfhHa8Kaefh8Ma8JaefhEcbhYindndnaHaYcitfydbg8AaQ9hmbaEaQBdba8MaQBdbxekdna5a8Acdtg8NfgeclfydbgXaeydbgeSmba8EaecitgKfydbaQSmeaXae9Rhyaecu7aXfhLa8LaKfhXcbheinaLaeSmeaecefheaXydbhKaXcwfhXaKaQ9hmbkaeay6meka8Ka8NfgeaQa8AaeydbcuSEBdbaEa8AaQaEydbcuSEBdbkaYcefgYaz9hmbkka3al9hmbkaAhXaahQa8KhKa8JhYcbheindndnaeaXydbg8A9hmbdnaeaQydbg8A9hmbaYydbh8AdnaKydbgLcu9hmba8Acu9hmbaCaefcb86bbxikaCaefhEdnaeaLSmbaea8ASmbaEce86bbxikaEcl86bbxdkdnaeaaa8AcdtgLfydb9hmbdnaKydbgEcuSmbaeaESmbaYydbgzcuSmbaeazSmba8KaLfydbgHcuSmbaHa8ASmba8JaLfydbgLcuSmbaLa8ASmbdnaAaEcdtfydbg8AaAaLcdtfydb9hmba8AaAazcdtfydbgLSmbaLaAaHcdtfydb9hmbaCaefcd86bbxlkaCaefcl86bbxikaCaefcl86bbxdkaCaefcl86bbxekaCaefaCa8AfRbb86bbkaXclfhXaQclfhQaKclfhKaYclfhYalaecefge9hmbkdnaqTmbdndnaOTmbaOheaAhXalhQindnaqaeydbfRbbTmbaCaXydbfcl86bbkaeclfheaXclfhXaQcufgQmbxdkkaAhealhXindnaqRbbTmbaCaeydbfcl86bbkaqcefhqaeclfheaXcufgXmbkkaAhealhQaChXindnaCaeydbfRbbcl9hmbaXcl86bbkaeclfheaXcefhXaQcufgQmbkkamceGTmbaChealhXindnaeRbbce9hmbaecl86bbkaecefheaXcufgXmbkkascxfagcdtfcualcx2alc;v:Q;v:Qe0Ecbyd:m:jjjbHjjjjbbg3BdbasahclfgHBd2a3aialavaOz:ejjjbh8PdndnaDmbcbhgcbh8Lxekcbh8LawhecbhXindnaeIdbJbbbb9ETmbasc;Wbfa8LcdtfaXBdba8Lcefh8LkaeclfheaDaXcefgX9hmbkascxfaHcdtfcua8Lal2gecdtaecFFFFi0Ecbyd:m:jjjbHjjjjbbggBdbasahcvfgHBd2alTmba8LTmbarcd4hEdnaOTmba8Lcdthzcbh8AaghLinaoaOa8AcdtfydbaE2cdtfhYasc;WbfheaLhXa8LhQinaXaYaeydbcdtgKfIdbawaKfIdbNUdbaeclfheaXclfhXaQcufgQmbkaLazfhLa8Acefg8Aal9hmbxdkka8Lcdthzcbh8AaghLinaoa8AaE2cdtfhYasc;WbfheaLhXa8LhQinaXaYaeydbcdtgKfIdbawaKfIdbNUdbaeclfheaXclfhXaQcufgQmbkaLazfhLa8Acefg8Aal9hmbkkascxfaHcdtfcualc8S2gealc;D;O;f8U0EgQcbyd:m:jjjbHjjjjbbgXBdbasaHcefgKBd2aXcbaez:ojjjbhqdndndna8LTmbascxfaKcdtfaQcbyd:m:jjjbHjjjjbbgvBdbasaHcdfgXBd2avcbaez:ojjjb8AascxfaXcdtfcua8Lal2gecltgXaecFFFFb0Ecbyd:m:jjjbHjjjjbbgiBdbasaHcifBd2aicbaXz:ojjjb8AadmexdkcbhvcbhiadTmekcbhYabhXindna3aXclfydbg8Acx2fgeIdba3aXydbgLcx2fgQIdbgI:tg8Ra3aXcwfydbgEcx2fgKIdlaQIdlg8S:tgRNaKIdbaI:tg8UaeIdla8S:tg8VN:tg8Wa8WNa8VaKIdwaQIdwg8X:tg8YNaRaeIdwa8X:tg8VN:tgRaRNa8Va8UNa8Ya8RN:tg8Ra8RNMM:rg8UJbbbb9ETmba8Wa8U:vh8Wa8Ra8U:vh8RaRa8U:vhRkaqaAaLcdtfydbc8S2fgeaRa8U:rg8UaRNNg8VaeIdbMUdbaea8Ra8Ua8RNg8ZNg8YaeIdlMUdlaea8Wa8Ua8WNg80Ng81aeIdwMUdwaea8ZaRNg8ZaeIdxMUdxaea80aRNgBaeIdzMUdzaea80a8RNg80aeIdCMUdCaeaRa8Ua8Wa8XNaRaINa8Sa8RNMM:mg8SNgINgRaeIdKMUdKaea8RaINg8RaeId3MUd3aea8WaINg8WaeIdaMUdaaeaIa8SNgIaeId8KMUd8Kaea8UaeIdyMUdyaqaAa8Acdtfydbc8S2fgea8VaeIdbMUdbaea8YaeIdlMUdlaea81aeIdwMUdwaea8ZaeIdxMUdxaeaBaeIdzMUdzaea80aeIdCMUdCaeaRaeIdKMUdKaea8RaeId3MUd3aea8WaeIdaMUdaaeaIaeId8KMUd8Kaea8UaeIdyMUdyaqaAaEcdtfydbc8S2fgea8VaeIdbMUdbaea8YaeIdlMUdlaea81aeIdwMUdwaea8ZaeIdxMUdxaeaBaeIdzMUdzaea80aeIdCMUdCaeaRaeIdKMUdKaea8RaeId3MUd3aea8WaeIdaMUdaaeaIaeId8KMUd8Kaea8UaeIdyMUdyaXcxfhXaYcifgYad6mbkcbhzabhLinabazcdtfh8AcbhXinaCa8AaXc;a1jjbfydbcdtfydbgQfRbbhedndnaCaLaXfydbgKfRbbgYc99fcFeGcpe0mbaec99fcFeGc;:e6mekdnaYcufcFeGce0mba8JaKcdtfydbaQ9hmekdnaecufcFeGce0mba8KaQcdtfydbaK9hmekdnaYcv2aefc:G1jjbfRbbTmbaAaQcdtfydbaAaKcdtfydb0mekJbbacJbbacJbbjZaecFeGceSEaYceSEh80dna3a8AaXc;e1jjbfydbcdtfydbcx2fgeIdwa3aKcx2fgYIdwg8S:tg8Wa3aQcx2fgEIdwa8S:tgRaRNaEIdbaYIdbg8X:tg8Ra8RNaEIdlaYIdlg8V:tg8Ua8UNMMgINa8WaRNaeIdba8X:tg81a8RNa8UaeIdla8V:tg8ZNMMg8YaRN:tg8Wa8WNa81aINa8Ya8RN:tgRaRNa8ZaINa8Ya8UN:tg8Ra8RNMM:rg8UJbbbb9ETmba8Wa8U:vh8Wa8Ra8U:vh8RaRa8U:vhRkaqaAaKcdtfydbc8S2fgeaRa80aI:rNg8UaRNNg8YaeIdbMUdbaea8Ra8Ua8RNg80Ng81aeIdlMUdlaea8Wa8Ua8WNgINg8ZaeIdwMUdwaea80aRNg80aeIdxMUdxaeaIaRNgBaeIdzMUdzaeaIa8RNg83aeIdCMUdCaeaRa8Ua8Wa8SNaRa8XNa8Va8RNMM:mg8SNgINgRaeIdKMUdKaea8RaINg8RaeId3MUd3aea8WaINg8WaeIdaMUdaaeaIa8SNgIaeId8KMUd8Kaea8UaeIdyMUdyaqaAaQcdtfydbc8S2fgea8YaeIdbMUdbaea81aeIdlMUdlaea8ZaeIdwMUdwaea80aeIdxMUdxaeaBaeIdzMUdzaea83aeIdCMUdCaeaRaeIdKMUdKaea8RaeId3MUd3aea8WaeIdaMUdaaeaIaeId8KMUd8Kaea8UaeIdyMUdykaXclfgXcx9hmbkaLcxfhLazcifgzad6mbka8LTmbcbhLinJbbbbh8Xa3abaLcdtfgeclfydbgEcx2fgXIdwa3aeydbgzcx2fgQIdwg8Z:tg8Ra8RNaXIdbaQIdbgB:tg8Wa8WNaXIdlaQIdlg83:tg8Ua8UNMMg80a3aecwfydbgHcx2fgeIdwa8Z:tgINa8Ra8RaINa8WaeIdbaB:tg8SNa8UaeIdla83:tg8VNMMgRN:tJbbbbJbbjZa80aIaINa8Sa8SNa8Va8VNMMg81NaRaRN:tg8Y:va8YJbbbb9BEg8YNhUa81a8RNaIaRN:ta8YNh85a80a8VNa8UaRN:ta8YNh86a81a8UNa8VaRN:ta8YNh87a80a8SNa8WaRN:ta8YNh88a81a8WNa8SaRN:ta8YNh89a8Wa8VNa8Sa8UN:tgRaRNa8UaINa8Va8RN:tgRaRNa8Ra8SNaIa8WN:tgRaRNMM:rJbbbZNhRagaza8L2gwcdtfhXagaHa8L2g8NcdtfhQagaEa8L2g5cdtfhKa8Z:mh8:a83:mhZaB:mhncbhYa8Lh8AJbbbbh8VJbbbbh8YJbbbbh80Jbbbbh81Jbbbbh8ZJbbbbhBJbbbbh83JbbbbhcJbbbbh9cinasc;WbfaYfgecwfaRa85aKIdbaXIdbgI:tg8UNaUaQIdbaI:tg8SNMg8RNUdbaeclfaRa87a8UNa86a8SNMg8WNUdbaeaRa89a8UNa88a8SNMg8UNUdbaecxfaRa8:a8RNaZa8WNaIana8UNMMMgINUdbaRa8Ra8WNNa81Mh81aRa8Ra8UNNa8ZMh8ZaRa8Wa8UNNaBMhBaRaIaINNa8XMh8XaRa8RaINNa8VMh8VaRa8WaINNa8YMh8YaRa8UaINNa80Mh80aRa8Ra8RNNa83Mh83aRa8Wa8WNNacMhcaRa8Ua8UNNa9cMh9caXclfhXaKclfhKaQclfhQaYczfhYa8Acufg8Ambkavazc8S2fgea9caeIdbMUdbaeacaeIdlMUdlaea83aeIdwMUdwaeaBaeIdxMUdxaea8ZaeIdzMUdzaea81aeIdCMUdCaea80aeIdKMUdKaea8YaeId3MUd3aea8VaeIdaMUdaaea8XaeId8KMUd8KaeaRaeIdyMUdyavaEc8S2fgea9caeIdbMUdbaeacaeIdlMUdlaea83aeIdwMUdwaeaBaeIdxMUdxaea8ZaeIdzMUdzaea81aeIdCMUdCaea80aeIdKMUdKaea8YaeId3MUd3aea8VaeIdaMUdaaea8XaeId8KMUd8KaeaRaeIdyMUdyavaHc8S2fgea9caeIdbMUdbaeacaeIdlMUdlaea83aeIdwMUdwaeaBaeIdxMUdxaea8ZaeIdzMUdzaea81aeIdCMUdCaea80aeIdKMUdKaea8YaeId3MUd3aea8VaeIdaMUdaaea8XaeId8KMUd8KaeaRaeIdyMUdyaiawcltfh8AcbhXa8LhKina8AaXfgeasc;WbfaXfgQIdbaeIdbMUdbaeclfgYaQclfIdbaYIdbMUdbaecwfgYaQcwfIdbaYIdbMUdbaecxfgeaQcxfIdbaeIdbMUdbaXczfhXaKcufgKmbkaia5cltfh8AcbhXa8LhKina8AaXfgeasc;WbfaXfgQIdbaeIdbMUdbaeclfgYaQclfIdbaYIdbMUdbaecwfgYaQcwfIdbaYIdbMUdbaecxfgeaQcxfIdbaeIdbMUdbaXczfhXaKcufgKmbkaia8Ncltfh8AcbhXa8LhKina8AaXfgeasc;WbfaXfgQIdbaeIdbMUdbaeclfgYaQclfIdbaYIdbMUdbaecwfgYaQcwfIdbaYIdbMUdbaecxfgeaQcxfIdbaeIdbMUdbaXczfhXaKcufgKmbkaLcifgLad6mbkkcbhQdndnamcwGgJmbJbbbbh8Vcbh9ecbhocbhhxekcbh9ea8Fcbyd:m:jjjbHjjjjbbhhascxfasyd2gecdtfahBdbasaecefgXBd2ascxfaXcdtfcuahalabadaAz:fjjjbgKcltaKcjjjjiGEcbyd:m:jjjbHjjjjbbgoBdbasaecdfBd2aoaKaha3alz:gjjjbJFFuuh8VaKTmbaoheaKhXinaeIdbgRa8Va8VaR9EEh8VaeclfheaXcufgXmbkaKh9ekasydlhTdnalTmbaTclfheaTydbhKaChXalhYcbhQincbaeydbg8AaK9RaXRbbcpeGEaQfhQaXcefhXaeclfhea8AhKaYcufgYmbkaQce4hQkcuadaQ9RcifgScx2aSc;v:Q;v:Qe0Ecbyd:m:jjjbHjjjjbbhDascxfasyd2g9hcdtfaDBdbasa9hcefgeBd2ascxfaecdtfcuaScdtaScFFFFi0Ecbyd:m:jjjbHjjjjbbgrBdbasa9hcdfgeBd2ascxfaecdtfa8Fcbyd:m:jjjbHjjjjbbgyBdbasa9hcifgeBd2ascxfaecdtfalcbyd:m:jjjbHjjjjbbg9iBdbasa9hclfg6Bd2axaxNa8PJbbjZamclGEgUaUN:vh9cJbbbbhcdnadak9nmbdnaSci6mba8Lclth9kaDcwfh0Jbbbbh83JbbbbhcinasclfabadalaAz:cjjjbabhzcbh8Ecbh8Finaba8FcdtfhHcbheindnaAazaefydbgQcdtgEfydbgYaAaHaec;q1jjbfydbcdtfydbgXcdtgwfydbg8ASmbaCaXfRbbgLcv2aCaQfRbbgKfc;G1jjbfRbbg5aKcv2aLfg8Nc;G1jjbfRbbg8MVcFeGTmbdna8AaY9nmba8Nc:G1jjbfRbbcFeGmekaKcufhYdnaKaL9hmbaYcFeGce0mba8JaEfydbaX9hmekdndnaKclSmbaLcl9hmekdnaYcFeGce0mba8JaEfydbaX9hmdkaLcufcFeGce0mba8KawfydbaQ9hmekaDa8Ecx2fgKaXaQa8McFeGgYEBdlaKaQaXaYEBdbaKaYa5Gcb9hBdwa8Ecefh8Ekaeclfgecx9hmbkdna8Fcifg8Fad9pmbazcxfhza8EcifaS9nmekka8ETmdcbhLinaqaAaDaLcx2fgKydbgYcdtgzfydbc8S2fgeIdwa3aKydlg8Acx2fgXIdwg8WNaeIdzaXIdbg8UNaeIdaMgRaRMMa8WNaeIdlaXIdlgINaeIdCa8WNaeId3MgRaRMMaINaeIdba8UNaeIdxaINaeIdKMgRaRMMa8UNaeId8KMMM:lhRJbbbbJbbjZaeIdyg8R:va8RJbbbb9BEh8RdndnaKydwgEmbJFFuuh8YxekJbbbbJbbjZaqaAa8Acdtfydbc8S2fgeIdyg8S:va8SJbbbb9BEaeIdwa3aYcx2fgXIdwg8SNaeIdzaXIdbg8XNaeIdaMg8Ya8YMMa8SNaeIdlaXIdlg8YNaeIdCa8SNaeId3Mg8Sa8SMMa8YNaeIdba8XNaeIdxa8YNaeIdKMg8Sa8SMMa8XNaeId8KMMM:lNh8Yka8RaRNh80dna8LTmbavaYc8S2fgQIdwa8WNaQIdza8UNaQIdaMgRaRMMa8WNaQIdlaINaQIdCa8WNaQId3MgRaRMMaINaQIdba8UNaQIdxaINaQIdKMgRaRMMa8UNaQId8KMMMhRaga8Aa8L2gHcdtfhXaiaYa8L2gwcltfheaQIdyh8Sa8LhQinaXIdbg8Ra8Ra8SNaecxfIdba8WaecwfIdbNa8UaeIdbNaIaeclfIdbNMMMg8Ra8RM:tNaRMhRaXclfhXaeczfheaQcufgQmbkdndnaEmbJbbbbh8Rxekava8Ac8S2fgQIdwa3aYcx2fgeIdwg8UNaQIdzaeIdbgINaQIdaMg8Ra8RMMa8UNaQIdlaeIdlg8SNaQIdCa8UNaQId3Mg8Ra8RMMa8SNaQIdbaINaQIdxa8SNaQIdKMg8Ra8RMMaINaQId8KMMMh8RagawcdtfhXaiaHcltfheaQIdyh8Xa8LhQinaXIdbg8Wa8Wa8XNaecxfIdba8UaecwfIdbNaIaeIdbNa8SaeclfIdbNMMMg8Wa8WM:tNa8RMh8RaXclfhXaeczfheaQcufgQmbka8R:lh8Rka80aR:lMh80a8Ya8RMh8YaCaYfRbbcd9hmbdna8Ka8Ja8Jazfydba8ASEaaazfydbgHcdtfydbgzcu9hmbaaa8AcdtfydbhzkavaHc8S2fgQIdwa3azcx2fgeIdwg8WNaQIdzaeIdbg8UNaQIdaMgRaRMMa8WNaQIdlaeIdlgINaQIdCa8WNaQId3MgRaRMMaINaQIdba8UNaQIdxaINaQIdKMgRaRMMa8UNaQId8KMMMhRagaza8L2gwcdtfhXaiaHa8L2g8NcltfheaQIdyh8Sa8LhQinaXIdbg8Ra8Ra8SNaecxfIdba8WaecwfIdbNa8UaeIdbNaIaeclfIdbNMMMg8Ra8RM:tNaRMhRaXclfhXaeczfheaQcufgQmbkdndnaEmbJbbbbh8Rxekavazc8S2fgQIdwa3aHcx2fgeIdwg8UNaQIdzaeIdbgINaQIdaMg8Ra8RMMa8UNaQIdlaeIdlg8SNaQIdCa8UNaQId3Mg8Ra8RMMa8SNaQIdbaINaQIdxa8SNaQIdKMg8Ra8RMMaINaQId8KMMMh8Raga8NcdtfhXaiawcltfheaQIdyh8Xa8LhQinaXIdbg8Wa8Wa8XNaecxfIdba8UaecwfIdbNaIaeIdbNa8SaeclfIdbNMMMg8Wa8WM:tNa8RMh8RaXclfhXaeczfheaQcufgQmbka8R:lh8Rka80aR:lMh80a8Ya8RMh8YkaKa80a8Ya80a8Y9FgeEUdwaKa8AaYaeaETVgeEBdlaKaYa8AaeEBdbaLcefgLa8E9hmbkasc;Wbfcbcj;qbz:ojjjb8Aa0hea8EhXinasc;WbfaeydbcA4cF8FGgQcFAaQcFA6EcdtfgQaQydbcefBdbaecxfheaXcufgXmbkcbhecbhXinasc;WbfaefgQydbhKaQaXBdbaKaXfhXaeclfgecj;qb9hmbkcbhea0hXinasc;WbfaXydbcA4cF8FGgQcFAaQcFA6EcdtfgQaQydbgQcefBdbaraQcdtfaeBdbaXcxfhXa8Eaecefge9hmbkadak9RgQci9Uh9mdnalTmbcbheayhXinaXaeBdbaXclfhXalaecefge9hmbkkcbh9na9icbalz:ojjjbh8FaQcO9Uh9oa9mce4h9pasydwh9qcbh8Mcbh5dninaDara5cdtfydbcx2fg8NIdwgRa9c9Emea8Ma9m9pmeJFFuuh8Rdna9pa8E9pmbaDara9pcdtfydbcx2fIdwJbb;aZNh8RkdnaRa8R9ETmbaRac9ETmba8Ma9o0mdkdna8FaAa8NydlgHcdtg9rfydbgKfg9sRbba8FaAa8Nydbgzcdtg9tfydbgefg9uRbbVmbaCazfRbbh9vdnaTaecdtfgXclfydbgQaXydbgXSmbaQaX9RhYa3aKcx2fhLa3aecx2fhEa9qaXcitfhecbhXcehwdnindnayaeydbcdtfydbgQaKSmbayaeclfydbcdtfydbg8AaKSmbaQa8ASmba3a8Acx2fg8AIdba3aQcx2fgQIdbg8W:tgRaEIdlaQIdlg8U:tg8XNaEIdba8W:tg8Ya8AIdla8U:tg8RN:tgIaRaLIdla8U:tg80NaLIdba8W:tg81a8RN:tg8UNa8RaEIdwaQIdwg8S:tg8ZNa8Xa8AIdwa8S:tg8WN:tg8Xa8RaLIdwa8S:tgBNa80a8WN:tg8RNa8Wa8YNa8ZaRN:tg8Sa8Wa81NaBaRN:tgRNMMaIaINa8Xa8XNa8Sa8SNMMa8Ua8UNa8Ra8RNaRaRNMMN:rJbbj8:N9FmdkaecwfheaXcefgXaY6hwaYaX9hmbkkawceGTmba9pcefh9pxekdndndndna9vc9:fPdebdkazheinayaecdtgefaHBdbaaaefydbgeaz9hmbxikkdna8Ka8Ja8Ja9tfydbaHSEaaa9tfydbgzcdtfydbgecu9hmbaaa9rfydbhekaya9tfaHBdbaehHkayazcdtfaHBdbka9uce86bba9sce86bba8NIdwgRacacaR9DEhca9ncefh9ncecda9vceSEa8Mfh8Mka5cefg5a8E9hmbkka9nTmddnalTmbcbh8AcbhEindnayaEcdtgefydbgQaESmbaAaQcdtfydbhzdnaEaAaefydb9hgHmbaqazc8S2fgeaqaEc8S2fgXIdbaeIdbMUdbaeaXIdlaeIdlMUdlaeaXIdwaeIdwMUdwaeaXIdxaeIdxMUdxaeaXIdzaeIdzMUdzaeaXIdCaeIdCMUdCaeaXIdKaeIdKMUdKaeaXId3aeId3MUd3aeaXIdaaeIdaMUdaaeaXId8KaeId8KMUd8KaeaXIdyaeIdyMUdyka8LTmbavaQc8S2fgeavaEc8S2gwfgXIdbaeIdbMUdbaeaXIdlaeIdlMUdlaeaXIdwaeIdwMUdwaeaXIdxaeIdxMUdxaeaXIdzaeIdzMUdzaeaXIdCaeIdCMUdCaeaXIdKaeIdKMUdKaeaXId3aeId3MUd3aeaXIdaaeIdaMUdaaeaXId8KaeId8KMUd8KaeaXIdyaeIdyMUdya9kaQ2hLaihXa8LhKinaXaLfgeaXa8AfgQIdbaeIdbMUdbaeclfgYaQclfIdbaYIdbMUdbaecwfgYaQcwfIdbaYIdbMUdbaecxfgeaQcxfIdbaeIdbMUdbaXczfhXaKcufgKmbkaHmbJbbbbJbbjZaqawfgeIdygR:vaRJbbbb9BEaeIdwa3azcx2fgXIdwgRNaeIdzaXIdbg8RNaeIdaMg8Wa8WMMaRNaeIdlaXIdlg8WNaeIdCaRNaeId3MgRaRMMa8WNaeIdba8RNaeIdxa8WNaeIdKMgRaRMMa8RNaeId8KMMM:lNgRa83a83aR9DEh83ka8Aa9kfh8AaEcefgEal9hmbkcbhXa8JheindnaeydbgQcuSmbdnaXayaQcdtgKfydbgQ9hmbcuhQa8JaKfydbgKcuSmbayaKcdtfydbhQkaeaQBdbkaeclfhealaXcefgX9hmbkcbhXa8KheindnaeydbgQcuSmbdnaXayaQcdtgKfydbgQ9hmbcuhQa8KaKfydbgKcuSmbayaKcdtfydbhQkaeaQBdbkaeclfhealaXcefgX9hmbkka83aca8LEh83cbhKabhecbhYindnayaeydbcdtfydbgXayaeclfydbcdtfydbgQSmbaXayaecwfydbcdtfydbg8ASmbaQa8ASmbabaKcdtfgLaXBdbaLcwfa8ABdbaLclfaQBdbaKcifhKkaecxfheaYcifgYad6mbkdndnaJTmbaKak9nmba8Va839FTmbcbhdabhecbhXindnaoahaeydbgQcdtfydbcdtfIdba839ETmbabadcdtfgYaQBdbaYclfaeclfydbBdbaYcwfaecwfydbBdbadcifhdkaecxfheaXcifgXaK6mbkJFFuuh8Va9eTmeaohea9ehXJFFuuhRinaeIdbg8RaRaRa8R9EEg8WaRa8Ra839EgQEhRa8Wa8VaQEh8VaeclfheaXcufgXmbxdkkaKhdkadak0mbxdkkasclfabadalaAz:cjjjbkdndnadak0mbadhXxekdnaJmbadhXxekdna8Va9c9FmbadhXxekina8VJbb;aZNgRa9caRa9c9DEh8WJbbbbhRdna9eTmbaohea9ehAinaeIdbg8RaRa8Ra8W9FEaRa8RaR9EEhRaeclfheaAcufgAmbkkcbhXabhecbhAindnaoahaeydbgQcdtfydbcdtfIdba8W9ETmbabaXcdtfgKaQBdbaKclfaeclfydbBdbaKcwfaecwfydbBdbaXcifhXkaecxfheaAcifgAad6mbkJFFuuh8Vdna9eTmbaohea9ehAJFFuuh8RinaeIdbg8Ua8Ra8Ra8U9EEgIa8Ra8Ua8W9EgQEh8RaIa8VaQEh8VaeclfheaAcufgAmbkkdnaXad9hmbadhXxdkaRacacaR9DEhcaXak9nmeaXhda8Va9c9FmbkkdnamcjjjjlGTmbaOmbaXTmbcbh8AabheinaCaeydbgKfRbbc3thLaecwfgEydbhAdndna8JaKcdtgHfydbaeclfgzydbgQSmbcbhYa8KaQcdtfydbaK9hmekcjjjj94hYkaeaLaYVaKVBdbaCaQfRbbc3thLdndna8JaQcdtfydbaASmbcbhYa8KaAcdtfydbaQ9hmekcjjjj94hYkazaLaYVaQVBdbaCaAfRbbc3thYdndna8JaAcdtfydbaKSmbcbhQa8KaHfydbaA9hmekcjjjj94hQkaEaYaQVaAVBdbaecxfhea8Acifg8AaX6mbkkdnaOTmbaXTmbaXheinabaOabydbcdtfydbBdbabclfhbaecufgembkkdnaPTmbaPaUac:rNUdbka9hcdtascxffcxfhednina6Tmeaeydbcbyd1:jjjbH:bjjjbbaec98fhea6cufh6xbkkasc;W;qbf8KjjjjbaXk;Yieouabydlhvabydbclfcbaicdtz:ojjjbhoadci9UhrdnadTmbdnalTmbaehwadhDinaoalawydbcdtfydbcdtfgqaqydbcefBdbawclfhwaDcufgDmbxdkkaehwadhDinaoawydbcdtfgqaqydbcefBdbawclfhwaDcufgDmbkkdnaiTmbcbhDaohwinawydbhqawaDBdbawclfhwaqaDfhDaicufgimbkkdnadci6mbinaecwfydbhwaeclfydbhDaeydbhidnalTmbalawcdtfydbhwalaDcdtfydbhDalaicdtfydbhikavaoaicdtfgqydbcitfaDBdbavaqydbcitfawBdlaqaqydbcefBdbavaoaDcdtfgqydbcitfawBdbavaqydbcitfaiBdlaqaqydbcefBdbavaoawcdtfgwydbcitfaiBdbavawydbcitfaDBdlawawydbcefBdbaecxfhearcufgrmbkkabydbcbBdbk:todDue99aicd4aifhrcehwinawgDcethwaDar6mbkcuaDcdtgraDcFFFFi0Ecbyd:m:jjjbHjjjjbbhwaoaoyd9GgqcefBd9GaoaqcdtfawBdbawcFearz:ojjjbhkdnaiTmbalcd4hlaDcufhxcbhminamhDdnavTmbavamcdtfydbhDkcbadaDal2cdtfgDydlgwawcjjjj94SEgwcH4aw7c:F:b:DD2cbaDydbgwawcjjjj94SEgwcH4aw7c;D;O:B8J27cbaDydwgDaDcjjjj94SEgDcH4aD7c:3F;N8N27axGhwamcdthPdndndnavTmbakawcdtfgrydbgDcuSmeadavaPfydbal2cdtfgsIdbhzcehqinaqhrdnadavaDcdtfydbal2cdtfgqIdbaz9CmbaqIdlasIdl9CmbaqIdwasIdw9BmlkarcefhqakawarfaxGgwcdtfgrydbgDcu9hmbxdkkakawcdtfgrydbgDcuSmbadamal2cdtfgsIdbhzcehqinaqhrdnadaDal2cdtfgqIdbaz9CmbaqIdlasIdl9CmbaqIdwasIdw9BmikarcefhqakawarfaxGgwcdtfgrydbgDcu9hmbkkaramBdbamhDkabaPfaDBdbamcefgmai9hmbkkakcbyd1:jjjbH:bjjjbbaoaoyd9GcufBd9GdnaeTmbaiTmbcbhDaehwinawaDBdbawclfhwaiaDcefgD9hmbkcbhDaehwindnaDabydbgrSmbawaearcdtfgrydbBdbaraDBdbkawclfhwabclfhbaiaDcefgD9hmbkkk;Qodvuv998Jjjjjbca9Rgvczfcwfcbyd11jjbBdbavcb8Pdj1jjb83izavcwfcbydN1jjbBdbavcb8Pd:m1jjb83ibdnadTmbaicd4hodnabmbdnalTmbcbhrinaealarcdtfydbao2cdtfhwcbhiinavczfaifgDawaifIdbgqaDIdbgkakaq9EEUdbavaifgDaqaDIdbgkakaq9DEUdbaiclfgicx9hmbkarcefgrad9hmbxikkaocdthrcbhwincbhiinavczfaifgDaeaifIdbgqaDIdbgkakaq9EEUdbavaifgDaqaDIdbgkakaq9DEUdbaiclfgicx9hmbkaearfheawcefgwad9hmbxdkkdnalTmbcbhrinabarcx2fgiaealarcdtfydbao2cdtfgwIdbUdbaiawIdlUdlaiawIdwUdwcbhiinavczfaifgDawaifIdbgqaDIdbgkakaq9EEUdbavaifgDaqaDIdbgkakaq9DEUdbaiclfgicx9hmbkarcefgrad9hmbxdkkaocdthlcbhraehwinabarcx2fgiaearao2cdtfgDIdbUdbaiaDIdlUdlaiaDIdwUdwcbhiinavczfaifgDawaifIdbgqaDIdbgkakaq9EEUdbavaifgDaqaDIdbgkakaq9DEUdbaiclfgicx9hmbkawalfhwarcefgrad9hmbkkJbbbbavIdbavIdzgk:tgqaqJbbbb9DEgqavIdlavIdCgx:tgmamaq9DEgqavIdwavIdKgm:tgPaPaq9DEhPdnabTmbadTmbJbbbbJbbjZaP:vaPJbbbb9BEhqinabaqabIdbak:tNUdbabclfgvaqavIdbax:tNUdbabcwfgvaqavIdbam:tNUdbabcxfhbadcufgdmbkkaPk:ZlewudnaeTmbcbhvabhoinaoavBdbaoclfhoaeavcefgv9hmbkkdnaiTmbcbhrinadarcdtfhwcbhDinalawaDcdtgvc;a1jjbfydbcdtfydbcdtfydbhodnabalawavfydbcdtfydbgqcdtfgkydbgvaqSmbinakabavgqcdtfgxydbgvBdbaxhkaqav9hmbkkdnabaocdtfgkydbgvaoSmbinakabavgocdtfgxydbgvBdbaxhkaoav9hmbkkdnaqaoSmbabaqaoaqao0Ecdtfaqaoaqao6EBdbkaDcefgDci9hmbkarcifgrai6mbkkdnaembcbskcbhxindnalaxcdtgvfydbax9hmbaxhodnabavfgDydbgvaxSmbaDhqinaqabavgocdtfgkydbgvBdbakhqaoav9hmbkkaDaoBdbkaxcefgxae9hmbkcbhvabhocbhkindndnavalydbgq9hmbdnavaoydbgq9hmbaoakBdbakcefhkxdkaoabaqcdtfydbBdbxekaoabaqcdtfydbBdbkaoclfhoalclfhlaeavcefgv9hmbkakk;Jiilud99duabcbaecltz:ojjjbhvdnalTmbadhoaihralhwinarcwfIdbhDarclfIdbhqavaoydbcltfgkarIdbakIdbMUdbakclfgxaqaxIdbMUdbakcwfgxaDaxIdbMUdbakcxfgkakIdbJbbjZMUdbaoclfhoarcxfhrawcufgwmbkkdnaeTmbavhraehkinarcxfgoIdbhDaocbBdbararIdbJbbbbJbbjZaD:vaDJbbbb9BEgDNUdbarclfgoaDaoIdbNUdbarcwfgoaDaoIdbNUdbarczfhrakcufgkmbkkdnalTmbinavadydbcltfgrcxfgkaicwfIdbarcwfIdb:tgDaDNaiIdbarIdb:tgDaDNaiclfIdbarclfIdb:tgDaDNMMgDakIdbgqaqaD9DEUdbadclfhdaicxfhialcufglmbkkdnaeTmbavcxfhrinabarIdbUdbarczfhrabclfhbaecufgembkkk8MbabaeadaialavcbcbcbcbcbaoarawaDz:bjjjbk8MbabaeadaialavaoarawaDaqakaxamaPz:bjjjbk:DCoDud99rue99iul998Jjjjjbc;Wb9Rgw8KjjjjbdndnarmbcbhDxekawcxfcbc;Kbz:ojjjb8Aawcuadcx2adc;v:Q;v:Qe0Ecbyd:m:jjjbHjjjjbbgqBdxawceBd2aqaeadaicbz:ejjjb8AawcuadcdtadcFFFFi0Egkcbyd:m:jjjbHjjjjbbgxBdzawcdBd2adcd4adfhmceheinaegicetheaiam6mbkcbhPawcuaicdtgsaicFFFFi0Ecbyd:m:jjjbHjjjjbbgzBdCawciBd2dndnar:ZgH:rJbbbZMgO:lJbbb9p9DTmbaO:Ohexekcjjjj94hekaicufhAc:bwhmcbhCadhXcbhQinaChLaeamgKcufaeaK9iEaPgDcefaeaD9kEhYdndnadTmbaYcuf:YhOaqhiaxheadhmindndnaiIdbaONJbbbZMg8A:lJbbb9p9DTmba8A:OhCxekcjjjj94hCkaCcCthCdndnaiclfIdbaONJbbbZMg8A:lJbbb9p9DTmba8A:OhExekcjjjj94hEkaEcqtaCVhCdndnaicwfIdbaONJbbbZMg8A:lJbbb9p9DTmba8A:OhExekcjjjj94hEkaeaCaEVBdbaicxfhiaeclfheamcufgmmbkazcFeasz:ojjjbh3cbh5cbhPindna3axaPcdtfydbgCcm4aC7c:v;t;h;Ev2gics4ai7aAGgmcdtfgEydbgecuSmbaeaCSmbcehiina3amaifaAGgmcdtfgEydbgecuSmeaicefhiaeaC9hmbkkaEaCBdba5aecuSfh5aPcefgPad9hmbxdkkazcFeasz:ojjjb8Acbh5kaDaYa5ar0giEhPaLa5aiEhCdna5arSmbaYaKaiEgmaP9Rcd9imbdndnaQcl0mbdnaX:ZgOaL:Zg8A:taY:Yg8EaD:Y:tg8Fa8EaK:Y:tgaa5:ZghaH:tNNNaOaH:taaNa8Aah:tNa8AaH:ta8FNahaO:tNM:va8EMJbbbZMgO:lJbbb9p9DTmbaO:Ohexdkcjjjj94hexekaPamfcd9Theka5aXaiEhXaQcefgQcs9hmekkdndnaCmbcihicbhDxekcbhiawakcbyd:m:jjjbHjjjjbbg5BdKawclBd2aPcuf:Yh8AdndnadTmbaqhiaxheadhmindndnaiIdba8ANJbbbZMgO:lJbbb9p9DTmbaO:OhCxekcjjjj94hCkaCcCthCdndnaiclfIdba8ANJbbbZMgO:lJbbb9p9DTmbaO:OhExekcjjjj94hEkaEcqtaCVhCdndnaicwfIdba8ANJbbbZMgO:lJbbb9p9DTmbaO:OhExekcjjjj94hEkaeaCaEVBdbaicxfhiaeclfheamcufgmmbkazcFeasz:ojjjbh3cbhDcbhYindndndna3axaYcdtgKfydbgCcm4aC7c:v;t;h;Ev2gics4ai7aAGgmcdtfgEydbgecuSmbcehiinaxaecdtgefydbaCSmdamaifheaicefhia3aeaAGgmcdtfgEydbgecu9hmbkkaEaYBdbaDhiaDcefhDxeka5aefydbhika5aKfaiBdbaYcefgYad9hmbkcuaDc32giaDc;j:KM;jb0EhexekazcFeasz:ojjjb8AcbhDcbhekawaecbyd:m:jjjbHjjjjbbgeBd3awcvBd2aecbaiz:ojjjbhEavcd4hKdnadTmbdnalTmbaKcdth3a5hCaqhealhmadhAinaEaCydbc32fgiaeIdbaiIdbMUdbaiaeclfIdbaiIdlMUdlaiaecwfIdbaiIdwMUdwaiamIdbaiIdxMUdxaiamclfIdbaiIdzMUdzaiamcwfIdbaiIdCMUdCaiaiIdKJbbjZMUdKaCclfhCaecxfheama3fhmaAcufgAmbxdkka5hmaqheadhCinaEamydbc32fgiaeIdbaiIdbMUdbaiaeclfIdbaiIdlMUdlaiaecwfIdbaiIdwMUdwaiaiIdxJbbbbMUdxaiaiIdzJbbbbMUdzaiaiIdCJbbbbMUdCaiaiIdKJbbjZMUdKamclfhmaecxfheaCcufgCmbkkdnaDTmbaEhiaDheinaiaiIdbJbbbbJbbjZaicKfIdbgO:vaOJbbbb9BEgONUdbaiclfgmaOamIdbNUdbaicwfgmaOamIdbNUdbaicxfgmaOamIdbNUdbaiczfgmaOamIdbNUdbaicCfgmaOamIdbNUdbaic3fhiaecufgembkkcbhCawcuaDcdtgYaDcFFFFi0Egicbyd:m:jjjbHjjjjbbgeBdaawcoBd2awaicbyd:m:jjjbHjjjjbbg3Bd8KaecFeaYz:ojjjbhxdnadTmbJbbjZJbbjZa8A:vaPceSEaoNgOaONh8AaKcdthPalheina8Aaec;81jjbalEgmIdwaEa5ydbgAc32fgiIdC:tgOaONamIdbaiIdx:tgOaONamIdlaiIdz:tgOaONMMNaqcwfIdbaiIdw:tgOaONaqIdbaiIdb:tgOaONaqclfIdbaiIdl:tgOaONMMMhOdndnaxaAcdtgifgmydbcuSmba3aifIdbaO9ETmekamaCBdba3aifaOUdbka5clfh5aqcxfhqaeaPfheadaCcefgC9hmbkkabaxaYz:njjjb8AcrhikaicdthiinaiTmeaic98fgiawcxffydbcbyd1:jjjbH:bjjjbbxbkkawc;Wbf8KjjjjbaDk:Ydidui99ducbhi8Jjjjjbca9Rglczfcwfcbyd11jjbBdbalcb8Pdj1jjb83izalcwfcbydN1jjbBdbalcb8Pd:m1jjb83ibdndnaembJbbjFhvJbbjFhoJbbjFhrxekadcd4cdthwincbhdinalczfadfgDabadfIdbgvaDIdbgoaoav9EEUdbaladfgDavaDIdbgoaoav9DEUdbadclfgdcx9hmbkabawfhbaicefgiae9hmbkalIdwalIdK:thralIdlalIdC:thoalIdbalIdz:thvkJbbbbavavJbbbb9DEgvaoaoav9DEgvararav9DEk9DeeuabcFeaicdtz:ojjjbhlcbhbdnadTmbindnalaeydbcdtfgiydbcu9hmbaiabBdbabcefhbkaeclfheadcufgdmbkkabk9teiucbcbyd:q:jjjbgeabcifc98GfgbBd:q:jjjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;teeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiaeydlBdlaiaeydwBdwaiaeydxBdxaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk:3eedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdxaialBdwaialBdlaialBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd:q:jjjbgeabcrfc94GfgbBd:q:jjjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik9:eiuZbhedndncbyd:q:jjjbgdaecztgi9nmbcuheadai9RcFFifcz4nbcuSmekadhekcbabae9Rcifc98Gcbyd:q:jjjbfgdBd:q:jjjbdnadZbcztge9nmbadae9RcFFifcz4nb8Akkk:Iedbcjwk1eFFuuFFuuFFuuFFuFFFuFFFuFbbbbbbbbeeebeebebbeeebebbbbbebebbbbbbbbbebbbdbbbbbbbebbbebbbdbbbbbbbbbbbeeeeebebbebbebebbbeebbbbbbbbbbbbbbbbbbbbbc1Dkxebbbdbbb:GNbb",e=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var t,n=WebAssembly.instantiate(i(a),{}).then(function(m){t=m.instance,t.exports.__wasm_call_ctors()});function i(m){for(var g=new Uint8Array(m.length),b=0;b<m.length;++b){var p=m.charCodeAt(b);g[b]=p>96?p-97:p>64?p-39:p+4}for(var x=0,b=0;b<m.length;++b)g[x++]=g[b]<60?e[g[b]]:(g[b]-60)*64+g[++b];return g.buffer.slice(0,x)}function s(m){if(!m)throw new Error("Assertion failed")}function r(m){return new Uint8Array(m.buffer,m.byteOffset,m.byteLength)}function o(m,g,b){var p=t.exports.sbrk,x=p(g.length*4),y=p(b*4),v=new Uint8Array(t.exports.memory.buffer),_=r(g);v.set(_,x);var w=m(y,x,g.length,b);v=new Uint8Array(t.exports.memory.buffer);var T=new Uint32Array(b);new Uint8Array(T.buffer).set(v.subarray(y,y+b*4)),_.set(v.subarray(x,x+g.length*4)),p(x-p(0));for(var I=0;I<g.length;++I)g[I]=T[g[I]];return[T,w]}function c(m){for(var g=0,b=0;b<m.length;++b){var p=m[b];g=g<p?p:g}return g}function l(m,g,b,p,x,y,v,_,w){var T=t.exports.sbrk,I=T(4),M=T(b*4),S=T(x*y),R=T(b*4),D=new Uint8Array(t.exports.memory.buffer);D.set(r(p),S),D.set(r(g),R);var L=m(M,R,b,S,x,y,v,_,w,I);D=new Uint8Array(t.exports.memory.buffer);var U=new Uint32Array(L);r(U).set(D.subarray(M,M+L*4));var z=new Float32Array(1);return r(z).set(D.subarray(I,I+4)),T(I-T(0)),[U,z[0]]}function d(m,g,b,p,x,y,v,_,w,T,I,M,S){var R=t.exports.sbrk,D=R(4),L=R(b*4),U=R(x*y),z=R(x*_),j=R(w.length*4),J=R(b*4),H=T?R(x):0,Q=new Uint8Array(t.exports.memory.buffer);Q.set(r(p),U),Q.set(r(v),z),Q.set(r(w),j),Q.set(r(g),J),T&&Q.set(r(T),H);var le=m(L,J,b,U,x,y,z,_,j,w.length,H,I,M,S,D);Q=new Uint8Array(t.exports.memory.buffer);var xe=new Uint32Array(le);r(xe).set(Q.subarray(L,L+le*4));var Ne=new Float32Array(1);return r(Ne).set(Q.subarray(D,D+4)),R(D-R(0)),[xe,Ne[0]]}function h(m,g,b,p){var x=t.exports.sbrk,y=x(b*p),v=new Uint8Array(t.exports.memory.buffer);v.set(r(g),y);var _=m(y,b,p);return x(y-x(0)),_}function u(m,g,b,p,x,y,v,_){var w=t.exports.sbrk,T=w(_*4),I=w(b*p),M=w(b*y),S=new Uint8Array(t.exports.memory.buffer);S.set(r(g),I),x&&S.set(r(x),M);var R=m(T,I,b,p,M,y,v,_);S=new Uint8Array(t.exports.memory.buffer);var D=new Uint32Array(R);return r(D).set(S.subarray(T,T+R*4)),w(T-w(0)),D}var f={LockBorder:1,Sparse:2,ErrorAbsolute:4,Prune:8,_InternalDebug:1<<30};return{ready:n,supported:!0,compactMesh:function(m){s(m instanceof Uint32Array||m instanceof Int32Array||m instanceof Uint16Array||m instanceof Int16Array),s(m.length%3==0);var g=m.BYTES_PER_ELEMENT==4?m:new Uint32Array(m);return o(t.exports.meshopt_optimizeVertexFetchRemap,g,c(m)+1)},simplify:function(m,g,b,p,x,y){s(m instanceof Uint32Array||m instanceof Int32Array||m instanceof Uint16Array||m instanceof Int16Array),s(m.length%3==0),s(g instanceof Float32Array),s(g.length%b==0),s(b>=3),s(p>=0&&p<=m.length),s(p%3==0),s(x>=0);for(var v=0,_=0;_<(y?y.length:0);++_)s(y[_]in f),v|=f[y[_]];var w=m.BYTES_PER_ELEMENT==4?m:new Uint32Array(m),T=l(t.exports.meshopt_simplify,w,m.length,g,g.length/b,b*4,p,x,v);return T[0]=m instanceof Uint32Array?T[0]:new m.constructor(T[0]),T},simplifyWithAttributes:function(m,g,b,p,x,y,v,_,w,T){s(m instanceof Uint32Array||m instanceof Int32Array||m instanceof Uint16Array||m instanceof Int16Array),s(m.length%3==0),s(g instanceof Float32Array),s(g.length%b==0),s(b>=3),s(p instanceof Float32Array),s(p.length%x==0),s(x>=0),s(v==null||v instanceof Uint8Array),s(v==null||v.length==g.length/b),s(_>=0&&_<=m.length),s(_%3==0),s(w>=0),s(Array.isArray(y)),s(x>=y.length),s(y.length<=32);for(var I=0;I<y.length;++I)s(y[I]>=0);for(var M=0,I=0;I<(T?T.length:0);++I)s(T[I]in f),M|=f[T[I]];var S=m.BYTES_PER_ELEMENT==4?m:new Uint32Array(m),R=d(t.exports.meshopt_simplifyWithAttributes,S,m.length,g,g.length/b,b*4,p,x*4,new Float32Array(y),v?new Uint8Array(v):null,_,w,M);return R[0]=m instanceof Uint32Array?R[0]:new m.constructor(R[0]),R},getScale:function(m,g){return s(m instanceof Float32Array),s(m.length%g==0),s(g>=3),h(t.exports.meshopt_simplifyScale,m,m.length/g,g*4)},simplifyPoints:function(m,g,b,p,x,y){return s(m instanceof Float32Array),s(m.length%g==0),s(g>=3),s(b>=0&&b<=m.length/g),p?(s(p instanceof Float32Array),s(p.length%x==0),s(x>=3),s(m.length/g==p.length/x),u(t.exports.meshopt_simplifyPoints,m,m.length/g,g*4,p,x*4,y,b)):u(t.exports.meshopt_simplifyPoints,m,m.length/g,g*4,void 0,0,0,b)}}})();var GT=(function(){var a="b9H79TebbbeVx9Geueu9Geub9Gbb9Giuuueu9Gmuuuuuuuuuuu9999eu9Gvuuuuueu9Gwuuuuuuuub9Gxuuuuuuuuuuuueu9Gkuuuuuuuuuu99eu9Gouuuuuub9Gruuuuuuub9GluuuubiOHdilvorwDqqkbiibeilve9Weiiviebeoweuec;G:Odkr:Yewo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9I919P29K9nW79O2Wt79c9V919U9KbeX9TW79O9V9Wt9F9I919P29K9nW79O2Wt7bo39TW79O9V9Wt9F9J9V9T9W91tWJ2917tWV9c9V919U9K7br39TW79O9V9Wt9F9J9V9T9W91tW9nW79O2Wt9c9V919U9K7bDL9TW79O9V9Wt9F9V9Wt9P9T9P96W9nW79O2Wtbql79IV9RbkDwebcekdsPq;Q9BHdbkIbabaec9:fgefcufae9Ugeabci9Uadfcufad9Ugbaeab0Ek:w8KDPue99eux99dui99euo99iu8Jjjjjbc:WD9Rgm8KjjjjbdndnalmbcbhPxekamc:Cwfcbc;Kbz:njjjb8Adndnalcb9imbaoal9nmbamcuaocdtaocFFFFi0Egscbyd;y1jjbHjjjjbbgzBd:CwamceBd;8wamascbyd;y1jjbHjjjjbbgHBd:GwamcdBd;8wamcualcdtalcFFFFi0Ecbyd;y1jjbHjjjjbbgOBd:KwamciBd;8waihsalhAinazasydbcdtfcbBdbasclfhsaAcufgAmbkaihsalhAinazasydbcdtfgCaCydbcefBdbasclfhsaAcufgAmbkaihsalhCcbhXindnazasydbcdtgQfgAydbcb9imbaHaQfaXBdbaAaAydbgQcjjjj94VBdbaQaXfhXkasclfhsaCcufgCmbkalci9UhLdnalci6mbcbhsaihAinaAcwfydbhCaAclfydbhXaHaAydbcdtfgQaQydbgQcefBdbaOaQcdtfasBdbaHaXcdtfgXaXydbgXcefBdbaOaXcdtfasBdbaHaCcdtfgCaCydbgCcefBdbaOaCcdtfasBdbaAcxfhAaLascefgs9hmbkkaihsalhAindnazasydbcdtgCfgXydbgQcu9kmbaXaQcFFFFrGgQBdbaHaCfgCaCydbaQ9RBdbkasclfhsaAcufgAmbxdkkamcuaocdtgsaocFFFFi0EgAcbyd;y1jjbHjjjjbbgzBd:CwamceBd;8wamaAcbyd;y1jjbHjjjjbbgHBd:GwamcdBd;8wamcualcdtalcFFFFi0Ecbyd;y1jjbHjjjjbbgOBd:KwamciBd;8wazcbasz:njjjbhXalci9UhLaihsalhAinaXasydbcdtfgCaCydbcefBdbasclfhsaAcufgAmbkdnaoTmbcbhsaHhAaXhCaohQinaAasBdbaAclfhAaCydbasfhsaCclfhCaQcufgQmbkkdnalci6mbcbhsaihAinaAcwfydbhCaAclfydbhQaHaAydbcdtfgKaKydbgKcefBdbaOaKcdtfasBdbaHaQcdtfgQaQydbgQcefBdbaOaQcdtfasBdbaHaCcdtfgCaCydbgCcefBdbaOaCcdtfasBdbaAcxfhAaLascefgs9hmbkkaoTmbcbhsaohAinaHasfgCaCydbaXasfydb9RBdbasclfhsaAcufgAmbkkamaLcbyd;y1jjbHjjjjbbgsBd:OwamclBd;8wascbaLz:njjjbhYamcuaLcK2alcjjjjd0Ecbyd;y1jjbHjjjjbbg8ABd:SwamcvBd;8wJbbbbhEdnalci6g3mbarcd4hKaihAa8AhsaLhrJbbbbh5inavaAclfydbaK2cdtfgCIdlh8EavaAydbaK2cdtfgXIdlhEavaAcwfydbaK2cdtfgQIdlh8FaCIdwhaaXIdwhhaQIdwhgasaCIdbg8JaXIdbg8KMaQIdbg8LMJbbnn:vUdbasclfaXIdlaCIdlMaQIdlMJbbnn:vUdbaQIdwh8MaCIdwh8NaXIdwhyascxfa8EaE:tg8Eagah:tggNa8FaE:tg8Faaah:tgaN:tgEJbbbbJbbjZa8Ja8K:tg8Ja8FNa8La8K:tg8Ka8EN:tghahNaEaENaaa8KNaga8JN:tgEaENMM:rg8K:va8KJbbbb9BEg8ENUdbasczfaEa8ENUdbascCfaha8ENUdbascwfa8Maya8NMMJbbnn:vUdba5a8KMh5aAcxfhAascKfhsarcufgrmbka5aL:Z:vJbbbZNhEkamcuaLcdtalcFFFF970Ecbyd;y1jjbHjjjjbbgCBd:WwamcoBd;8waEaq:ZNhEdna3mbcbhsaChAinaAasBdbaAclfhAaLascefgs9hmbkkaE:rhhcuh8PamcuaLcltalcFFFFd0Ecbyd;y1jjbHjjjjbbgIBd:0wamcrBd;8wcbaIa8AaCaLz:djjjb8AJFFuuhyJFFuuh8RJFFuuh8Sdnalci6gXmbJFFuuh8Sa8AhsaLhAJFFuuh8RJFFuuhyinascwfIdbgEayayaE9EEhyasclfIdbgEa8Ra8RaE9EEh8RasIdbgEa8Sa8SaE9EEh8SascKfhsaAcufgAmbkkahJbbbZNhgamaocetgscuaocu9kEcbyd;y1jjbHjjjjbbgABd:4waAcFeasz:njjjbhCdnaXmbcbhAJFFuuhEa8Ahscuh8PinascwfIdbay:tghahNasIdba8S:tghahNasclfIdba8R:tghahNMM:rghaEa8PcuSahaE9DVgXEhEaAa8PaXEh8PascKfhsaLaAcefgA9hmbkkamczfcbcjwz:njjjb8Aamcwf9cb83ibam9cb83ibagaxNhRJbbjZak:th8Ncbh8UJbbbbh8VJbbbbh8WJbbbbh8XJbbbbh8YJbbbbh8ZJbbbbh80cbh81cbhPinJbbbbhEdna8UTmbJbbjZa8U:Z:vhEkJbbbbhhdna80a80Na8Ya8YNa8Za8ZNMMg8KJbbbb9BmbJbbjZa8K:r:vhhka8XaENh5a8WaENh8Fa8VaENhaa8PhQdndndndndna8UaPVTmbamydwgBTmea80ahNh8Ja8ZahNh8La8YahNh8Maeamydbcdtfh83cbh3JFFuuhEcvhXcuhQindnaza83a3cdtfydbcdtgsfydbgvTmbaOaHasfydbcdtfhAindndnaCaiaAydbgKcx2fgsclfydbgrcetf8Vebcs4aCasydbgLcetf8Vebcs4faCascwfydbglcetf8Vebcs4fgombcbhsxekcehsazaLcdtfydbgLceSmbcehsazarcdtfydbgrceSmbcehsazalcdtfydbglceSmbdnarcdSaLcdSfalcdSfcd6mbaocefhsxekaocdfhskdnasaX9kmba8AaKcK2fgLIdwa5:thhaLIdla8F:th8KaLIdbaa:th8EdndnakJbbbb9DTmba8E:lg8Ea8K:lg8Ka8Ea8K9EEg8Kah:lgha8Kah9EEag:vJbbjZMhhxekahahNa8Ea8ENa8Ka8KNMM:rag:va8NNJbbjZMJ9VO:d86JbbjZaLIdCa8JNaLIdxa8MNa8LaLIdzNMMakN:tghahJ9VO:d869DENhhkaKaQasaX6ahaE9DVgLEhQasaXaLEhXahaEaLEhEkaAclfhAavcufgvmbkka3cefg3aB9hmbkkaQcu9hmekama5Ud:ODama8FUd:KDamaaUd:GDamcuBd:qDamcFFF;7rBdjDaIcba8AaYamc:GDfakJbbbb9Damc:qDfamcjDfz:ejjjbamyd:qDhQdndnaxJbbbb9ETmba8UaD6mbaQcuSmeceh3amIdjDaR9EmixdkaQcu9hmekdna8UTmbdnamydlgza8Uci2fgsciGTmbadasfcba8Uazcu7fciGcefz:njjjb8AkabaPcltfgzam8Pib83dbazcwfamcwf8Pib83dbaPcefhPkc3hzinazc98Smvamc:Cwfazfydbcbyd;u1jjbH:bjjjbbazc98fhzxbkkcbh3a8Uaq9pmbamydwaCaiaQcx2fgsydbcetf8Vebcs4aCascwfydbcetf8Vebcs4faCasclfydbcetf8Vebcs4ffaw9nmekcbhscbhAdna81TmbcbhAamczfhXinamczfaAcdtfaXydbgLBdbaXclfhXaAaYaLfRbbTfhAa81cufg81mbkkamydwhlamydbhXam9cu83i:GDam9cu83i:ODam9cu83i:qDam9cu83i:yDaAc;8eaAclfc:bd6Eh81inamcjDfasfcFFF;7rBdbasclfgscz9hmbka81cdthBdnalTmbaeaXcdtfhocbhrindnazaoarcdtfydbcdtgsfydbgvTmbaOaHasfydbcdtfhAcuhLcuhsinazaiaAydbgKcx2fgXclfydbcdtfydbazaXydbcdtfydbfazaXcwfydbcdtfydbfgXasaXas6gXEhsaKaLaXEhLaAclfhAavcufgvmbkaLcuSmba8AaLcK2fgAIdway:tgEaENaAIdba8S:tgEaENaAIdla8R:tgEaENMM:rhEcbhAindndnasamc:qDfaAfgvydbgX6mbasaX9hmeaEamcjDfaAfIdb9FTmekavasBdbamc:GDfaAfaLBdbamcjDfaAfaEUdbxdkaAclfgAcz9hmbkkarcefgral9hmbkkamczfaBfhLcbhscbhAindnamc:GDfasfydbgXcuSmbaLaAcdtfaXBdbaAcefhAkasclfgscz9hmbkaAa81fg81TmbJFFuuhhcuhKamczfhsa81hvcuhLina8AasydbgXcK2fgAIdway:tgEaENaAIdba8S:tgEaENaAIdla8R:tgEaENMM:rhEdndnazaiaXcx2fgAclfydbcdtfydbazaAydbcdtfydbfazaAcwfydbcdtfydbfgAaL6mbaAaL9hmeaEah9DTmekaEhhaAhLaXhKkasclfhsavcufgvmbkaKcuSmbaKhQkdnamaiaQcx2fgrydbarclfydbarcwfydbaCabaeadaPawaqa3z:fjjjbTmbaPcefhPJbbbbh8VJbbbbh8WJbbbbh8XJbbbbh8YJbbbbh8ZJbbbbh80kcbhXinaOaHaraXcdtfydbcdtgAfydbcdtfgKhsazaAfgvydbgLhAdnaLTmbdninasydbaQSmeasclfhsaAcufgATmdxbkkasaKaLcdtfc98fydbBdbavavydbcufBdbkaXcefgXci9hmbka8AaQcK2fgsIdbhEasIdlhhasIdwh8KasIdxh8EasIdzh5asIdCh8FaYaQfce86bba80a8FMh80a8Za5Mh8Za8Ya8EMh8Ya8Xa8KMh8Xa8WahMh8Wa8VaEMh8Vamydxh8Uxbkkamc:WDf8KjjjjbaPk;Vvivuv99lu8Jjjjjbca9Rgv8Kjjjjbdndnalcw0mbaiydbhoaeabcitfgralcdtcufBdlaraoBdbdnalcd6mbaiclfhoalcufhwarcxfhrinaoydbhDarcuBdbarc98faDBdbarcwfhraoclfhoawcufgwmbkkalabfhrxekcbhDavczfcwfcbBdbav9cb83izavcwfcbBdbav9cb83ibJbbjZhqJbbjZhkinadaiaDcdtfydbcK2fhwcbhrinavczfarfgoawarfIdbgxaoIdbgm:tgPakNamMgmUdbavarfgoaPaxam:tNaoIdbMUdbarclfgrcx9hmbkJbbjZaqJbbjZMgq:vhkaDcefgDal9hmbkcbhoadcbcecdavIdlgxavIdwgm9GEgravIdbgPam9GEaraPax9GEgscdtgrfhzavczfarfIdbhxaihralhwinaiaocdtfgDydbhHaDarydbgOBdbaraHBdbarclfhraoazaOcK2fIdbax9Dfhoawcufgwmbkaeabcitfhrdndnaocv6mbaoalc98f6mekaraiydbBdbaralcdtcufBdlaiclfhoalcufhwarcxfhrinaoydbhDarcuBdbarc98faDBdbarcwfhraoclfhoawcufgwmbkalabfhrxekaraxUdbararydlc98GasVBdlabcefaeadaiaoz:djjjbhwararydlciGawabcu7fcdtVBdlawaeadaiaocdtfalao9Rz:djjjbhrkavcaf8Kjjjjbark:;idiud99dndnabaecitfgwydlgDciGgqciSmbinabcbaDcd4gDalaqcdtfIdbawIdb:tgkJbbbb9FEgwaecefgefadaialavaoarz:ejjjbak:larIdb9FTmdabawaD7aefgecitfgwydlgDciGgqci9hmbkkabaecitfgeclfhbdnavmbcuhwindnaiaeydbgDfRbbmbadaDcK2fgqIdwalIdw:tgkakNaqIdbalIdb:tgkakNaqIdlalIdl:tgkakNMM:rgkarIdb9DTmbarakUdbaoaDBdbkaecwfheawcefgwabydbcd46mbxdkkcuhwindnaiaeydbgDfRbbmbadaDcK2fgqIdbalIdb:t:lgkaqIdlalIdl:t:lgxakax9EEgkaqIdwalIdw:t:lgxakax9EEgkarIdb9DTmbarakUdbaoaDBdbkaecwfheawcefgwabydbcd46mbkkk;llevudnabydwgxaladcetfgm8Vebcs4alaecetfgP8Vebgscs4falaicetfgz8Vebcs4ffaD0abydxaq9pVakVgDce9hmbavawcltfgxab8Pdb83dbaxcwfabcwfgx8Pdb83dbdnaxydbgqTmbaoabydbcdtfhxaqhsinalaxydbcetfcFFi87ebaxclfhxascufgsmbkkdnabydxglci2gsabydlgxfgkciGTmbarakfcbalaxcu7fciGcefz:njjjb8Aabydxci2hsabydlhxabydwhqkab9cb83dwababydbaqfBdbabascifc98GaxfBdlaP8Vebhscbhxkdnascztcz91cu9kmbabaxcefBdwaPax87ebaoabydbcdtfaxcdtfaeBdbkdnam8Uebcu9kmbababydwgxcefBdwamax87ebaoabydbcdtfaxcdtfadBdbkdnaz8Uebcu9kmbababydwgxcefBdwazax87ebaoabydbcdtfaxcdtfaiBdbkarabydlfabydxci2faPRbb86bbarabydlfabydxci2fcefamRbb86bbarabydlfabydxci2fcdfazRbb86bbababydxcefBdxaDk8LbabaeadaialavaoarawaDaDaqJbbbbz:cjjjbk;Nkovud99euv99eul998Jjjjjbc:W;ae9Rgo8KjjjjbdndnadTmbavcd4hrcbhwcbhDindnaiaeclfydbar2cdtfgvIdbaiaeydbar2cdtfgqIdbgk:tgxaiaecwfydbar2cdtfgmIdlaqIdlgP:tgsNamIdbak:tgzavIdlaP:tgPN:tgkakNaPamIdwaqIdwgH:tgONasavIdwaH:tgHN:tgPaPNaHazNaOaxN:tgxaxNMM:rgsJbbbb9Bmbaoc:W:qefawcx2fgAakas:vUdwaAaxas:vUdlaAaPas:vUdbaoc8Wfawc8K2fgAaq8Pdb83dbaAav8Pdb83dxaAam8Pdb83dKaAcwfaqcwfydbBdbaAcCfavcwfydbBdbaAcafamcwfydbBdbawcefhwkaecxfheaDcifgDad6mbkab9cb83dbabcyf9cb83dbabcaf9cb83dbabcKf9cb83dbabczf9cb83dbabcwf9cb83dbawTmeaocbBd8Sao9cb83iKao9cb83izaoczfaoc8Wfawci2cxaoc8Sfcbcrz1jjjbaoIdKhCaoIdChXaoIdzhQao9cb83iwao9cb83ibaoaoc:W:qefawcxaoc8Sfcbciz1jjjbJbbjZhkaoIdwgPJbbbbJbbjZaPaPNaoIdbgPaPNaoIdlgsasNMM:rgx:vaxJbbbb9BEgzNhxasazNhsaPazNhzaoc:W:qefheawhvinaecwfIdbaxNaeIdbazNasaeclfIdbNMMgPakaPak9DEhkaecxfheavcufgvmbkabaCUdwabaXUdlabaQUdbabaoId3UdxdndnakJ;n;m;m899FmbJbbbbhPaoc:W:qefheaoc8WfhvinaCavcwfIdb:taecwfIdbgHNaQavIdb:taeIdbgONaXavclfIdb:taeclfIdbgLNMMaxaHNazaONasaLNMM:vgHaPaHaP9EEhPavc8KfhvaecxfheawcufgwmbkabaxUd8KabasUdaabazUd3abaCaxaPN:tUdKabaXasaPN:tUdCabaQazaPN:tUdzabJbbjZakakN:t:rgkUdydndnaxJbbj:;axJbbj:;9GEgPJbbjZaPJbbjZ9FEJbb;:9cNJbbbZJbbb:;axJbbbb9GEMgP:lJbbb9p9DTmbaP:Ohexekcjjjj94hekabae86b8UdndnasJbbj:;asJbbj:;9GEgPJbbjZaPJbbjZ9FEJbb;:9cNJbbbZJbbb:;asJbbbb9GEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkabav86bRdndnazJbbj:;azJbbj:;9GEgPJbbjZaPJbbjZ9FEJbb;:9cNJbbbZJbbb:;azJbbbb9GEMgP:lJbbb9p9DTmbaP:Ohqxekcjjjj94hqkabaq86b8SdndnaecKtcK91:YJbb;:9c:vax:t:lavcKtcK91:YJbb;:9c:vas:t:laqcKtcK91:YJbb;:9c:vaz:t:lakMMMJbb;:9cNJbbjZMgk:lJbbb9p9DTmbak:Ohexekcjjjj94hekaecFbaecFb9iEhexekabcjjj;8iBdycFbhekabae86b8Vxekab9cb83dbabcyf9cb83dbabcaf9cb83dbabcKf9cb83dbabczf9cb83dbabcwf9cb83dbkaoc:W;aef8Kjjjjbk;Iwwvul99iud99eue99eul998Jjjjjbcje9Rgr8Kjjjjbavcd4hwaicd4hDdndnaoTmbarc;abfcbaocdtgvz:njjjb8Aarc;Gbfcbavz:njjjb8AarhvarcafhiaohqinavcFFF97BdbaicFFF;7rBdbaiclfhiavclfhvaqcufgqmbkdnadTmbcbhkinaeakaD2cdtfgvIdwhxavIdlhmavIdbhPalakaw2cdtfIdbhsarc;abfhzarhiarc;GbfhHarcafhqcj1jjbhvaohOinasavcwfIdbaxNavIdbaPNavclfIdbamNMMgAMhCakhXdnaAas:tgAaqIdbgQ9DgLmbaHydbhXkaHaXBdbakhXdnaCaiIdbgK9EmbazydbhXaKhCkazaXBdbaiaCUdbaqaAaQaLEUdbavcxfhvaqclfhqaHclfhHaiclfhiazclfhzaOcufgOmbkakcefgkad9hmbkkadThkJbbbbhCcbhXarc;abfhvarc;Gbfhicbhqinalavydbgzaw2cdtfIdbalaiydbgHaw2cdtfIdbaeazaD2cdtfgzIdwaeaHaD2cdtfgHIdw:tgsasNazIdbaHIdb:tgsasNazIdlaHIdl:tgsasNMM:rMMgsaCasaC9EgzEhCaqaXazEhXaiclfhiavclfhvaoaqcefgq9hmbkaCJbbbZNhKxekadThkcbhXJbbbbhKkJbbbbhCdnaearc;abfaXcdtgifydbgqaD2cdtfgvIdwaearc;GbfaifydbgzaD2cdtfgiIdwgm:tgsasNavIdbaiIdbgY:tgAaANavIdlaiIdlgP:tgQaQNMM:rgxJbbbb9ETmbaxalaqaw2cdtfIdbMalazaw2cdtfIdb:taxaxM:vhCkasaCNamMhmaQaCNaPMhPaAaCNaYMhYdnakmbaDcdthvawcdthiindnalIdbg8AaecwfIdbam:tgCaCNaeIdbaY:tgsasNaeclfIdbaP:tgAaANMM:rgQMgEaK9ETmbJbbbbhxdnaQJbbbb9ETmbaEaK:taQaQM:vhxkaxaCNamMhmaxaANaPMhPaxasNaYMhYa8AaKaQMMJbbbZNhKkaeavfhealaifhladcufgdmbkkabaKUdxabamUdwabaPUdlabaYUdbarcjef8Kjjjjbkjeeiu8Jjjjjbcj8W9Rgr8Kjjjjbaici2hwdnaiTmbawceawce0EhDarhiinaiaeadRbbcdtfydbBdbadcefhdaiclfhiaDcufgDmbkkabarawaladaoz:hjjjbarcj8Wf8Kjjjjbk:3lequ8JjjjjbcjP9Rgl8Kjjjjbcbhvalcjxfcbaiz:njjjb8AdndnadTmbcjehoaehrincuhwarhDcuhqavhkdninawakaoalcjxfaDcefRbbfRbb9RcFeGci6aoalcjxfaDRbbfRbb9RcFeGci6faoalcjxfaDcdfRbbfRbb9RcFeGci6fgxaq9mgmEhwdnammbaxce0mdkaxaqaxaq9kEhqaDcifhDadakcefgk9hmbkkaeawci2fgDcdfRbbhqaDcefRbbhxaDRbbhkaeavci2fgDcifaDawav9Rci2z:qjjjb8Aakalcjxffaocefgo86bbaxalcjxffao86bbaDcdfaq86bbaDcefax86bbaDak86bbaqalcjxffao86bbarcifhravcefgvad9hmbkalcFeaicetz:njjjbhoadci2gDceaDce0EhqcbhxindnaoaeRbbgkcetfgw8UebgDcu9kmbawax87ebaocjlfaxcdtfabakcdtfydbBdbaxhDaxcefhxkaeaD86bbaecefheaqcufgqmbkaxcdthDxekcbhDkabalcjlfaDz:mjjjb8AalcjPf8Kjjjjbk9teiucbcbyd;C1jjbgeabcifc98GfgbBd;C1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;teeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiaeydlBdlaiaeydwBdwaiaeydxBdxaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk:3eedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdxaialBdwaialBdlaialBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd;C1jjbgeabcrfc94GfgbBd;C1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik9:eiuZbhedndncbyd;C1jjbgdaecztgi9nmbcuheadai9RcFFifcz4nbcuSmekadhekcbabae9Rcifc98Gcbyd;C1jjbfgdBd;C1jjbdnadZbcztge9nmbadae9RcFFifcz4nb8Akk:;Deludndndnadch9pmbabaeSmdaeabadfgi9Rcbadcet9R0mekabaead;8qbbxekaeab7ciGhldndndnabae9pmbdnalTmbadhvabhixikdnabciGmbadhvabhixdkadTmiabaeRbb86bbadcufhvdnabcefgiciGmbaecefhexdkavTmiabaeRbe86beadc9:fhvdnabcdfgiciGmbaecdfhexdkavTmiabaeRbd86bdadc99fhvdnabcifgiciGmbaecifhexdkavTmiabaeRbi86biabclfhiaeclfheadc98fhvxekdnalmbdnaiciGTmbadTmlabadcufgifglaeaifRbb86bbdnalciGmbaihdxekaiTmlabadc9:fgifglaeaifRbb86bbdnalciGmbaihdxekaiTmlabadc99fgifglaeaifRbb86bbdnalciGmbaihdxekaiTmlabadc98fgdfaeadfRbb86bbkadcl6mbdnadc98fgocd4cefciGgiTmbaec98fhlabc98fhvinavadfaladfydbBdbadc98fhdaicufgimbkkaocx6mbaec9Wfhvabc9WfhoinaoadfgicxfavadfglcxfydbBdbaicwfalcwfydbBdbaiclfalclfydbBdbaialydbBdbadc9Wfgdci0mbkkadTmdadhidnadciGglTmbaecufhvabcufhoadhiinaoaifavaifRbb86bbaicufhialcufglmbkkadcl6mdaec98fhlabc98fhvinavaifgecifalaifgdcifRbb86bbaecdfadcdfRbb86bbaecefadcefRbb86bbaeadRbb86bbaic98fgimbxikkavcl6mbdnavc98fglcd4cefcrGgdTmbavadcdt9RhvinaiaeydbBdbaeclfheaiclfhiadcufgdmbkkalc36mbinaiaeydbBdbaiaeydlBdlaiaeydwBdwaiaeydxBdxaiaeydzBdzaiaeydCBdCaiaeydKBdKaiaeyd3Bd3aecafheaicafhiavc9Gfgvci0mbkkavTmbdndnavcrGgdmbavhlxekavc94GhlinaiaeRbb86bbaicefhiaecefheadcufgdmbkkavcw6mbinaiaeRbb86bbaiaeRbe86beaiaeRbd86bdaiaeRbi86biaiaeRbl86blaiaeRbv86bvaiaeRbo86boaiaeRbr86braicwfhiaecwfhealc94fglmbkkabkk9Tdbcjwk9ubbjZbbbbbbbbbbbbbbjZbbbbbbbbbbbbbbjZ86;nAZ86;nAZ86;nAZ86;nA:;86;nAZ86;nAZ86;nAZ86;nA:;86;nAZ86;nAZ86;nAZ86;nA:;bc;uwkxebbbdbbb9GNbb",e=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var t,n=WebAssembly.instantiate(i(a),{}).then(function(m){t=m.instance,t.exports.__wasm_call_ctors()});function i(m){for(var g=new Uint8Array(m.length),b=0;b<m.length;++b){var p=m.charCodeAt(b);g[b]=p>96?p-97:p>64?p-39:p+4}for(var x=0,b=0;b<m.length;++b)g[x++]=g[b]<60?e[g[b]]:(g[b]-60)*64+g[++b];return g.buffer.slice(0,x)}function s(m){if(!m)throw new Error("Assertion failed")}function r(m){return new Uint8Array(m.buffer,m.byteOffset,m.byteLength)}var o=48,c=16;function l(m,g){var b=m.meshlets[g*4+0],p=m.meshlets[g*4+1],x=m.meshlets[g*4+2],y=m.meshlets[g*4+3];return{vertices:m.vertices.subarray(b,b+x),triangles:m.triangles.subarray(p,p+y*3)}}function d(m,g,b,p,x,y,v){var _=t.exports.sbrk,w=t.exports.meshopt_buildMeshletsBound(m.length,x,y),T=_(w*c),I=_(w*x*4),M=_(w*y*3),S=_(m.byteLength),R=_(g.byteLength),D=new Uint8Array(t.exports.memory.buffer);D.set(r(m),S),D.set(r(g),R);var L=t.exports.meshopt_buildMeshlets(T,I,M,S,m.length,R,b,p,x,y,v);D=new Uint8Array(t.exports.memory.buffer);for(var U=D.subarray(T,T+L*c),z=new Uint32Array(U.buffer,U.byteOffset,U.byteLength/4).slice(),j=0;j<L;++j){var J=z[j*4+0],H=z[j*4+1],b=z[j*4+2],Q=z[j*4+3];t.exports.meshopt_optimizeMeshlet(I+J*4,M+H,Q,b)}var le=z[(L-1)*4+0],xe=z[(L-1)*4+1],Ne=z[(L-1)*4+2],it=z[(L-1)*4+3],lt=le+Ne,Ze=xe+(it*3+3&-4),q={meshlets:z,vertices:new Uint32Array(D.buffer,I,lt).slice(),triangles:new Uint8Array(D.buffer,M,Ze*3).slice(),meshletCount:L};return _(T-_(0)),q}function h(m){var g=new Float32Array(t.exports.memory.buffer,m,o/4);return{centerX:g[0],centerY:g[1],centerZ:g[2],radius:g[3],coneApexX:g[4],coneApexY:g[5],coneApexZ:g[6],coneAxisX:g[7],coneAxisY:g[8],coneAxisZ:g[9],coneCutoff:g[10]}}function u(m,g,b,p){var x=t.exports.sbrk,y=[],v=x(g.byteLength),_=x(m.vertices.byteLength),w=x(m.triangles.byteLength),T=x(o),I=new Uint8Array(t.exports.memory.buffer);I.set(r(g),v),I.set(r(m.vertices),_),I.set(r(m.triangles),w);for(var M=0;M<m.meshletCount;++M){var S=m.meshlets[M*4+0],R=m.meshlets[M*4+0+1],D=m.meshlets[M*4+0+3];t.exports.meshopt_computeMeshletBounds(T,_+S*4,w+R,D,v,b,p),y.push(h(T))}return x(v-x(0)),y}function f(m,g,b,p){var x=t.exports.sbrk,y=x(o),v=x(m.byteLength),_=x(g.byteLength),w=new Uint8Array(t.exports.memory.buffer);w.set(r(m),v),w.set(r(g),_),t.exports.meshopt_computeClusterBounds(y,v,m.length,_,b,p);var T=h(y);return x(y-x(0)),T}return{ready:n,supported:!0,buildMeshlets:function(m,g,b,p,x,y){s(m.length%3==0),s(g instanceof Float32Array),s(g.length%b==0),s(b>=3),s(p<=256||p>0),s(x<=512),s(x%4==0),y=y||0;var v=m.BYTES_PER_ELEMENT==4?m:new Uint32Array(m);return d(v,g,g.length/b,b*4,p,x,y)},computeClusterBounds:function(m,g,b){s(m.length%3==0),s(m.length/3<=512),s(g instanceof Float32Array),s(g.length%b==0),s(b>=3);var p=m.BYTES_PER_ELEMENT==4?m:new Uint32Array(m);return f(p,g,g.length/b,b*4)},computeMeshletBounds:function(m,g,b){return s(m.meshletCount!=0),s(g instanceof Float32Array),s(g.length%b==0),s(b>=3),u(m,g,g.length/b,b*4)},extractMeshlet:function(m,g){return s(g>=0&&g<m.meshletCount),l(m,g)}}})();var nm=Math.pow(2,-24),gl=Symbol("SKIP_GENERATION");function w_(a){return a.index?a.index.count:a.attributes.position.count}function hi(a){return w_(a)/3}function T_(a,e=ArrayBuffer){return a>65535?new Uint32Array(new e(4*a)):new Uint16Array(new e(2*a))}function im(a,e){if(!a.index){let t=a.attributes.position.count,n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=T_(t,n);a.setIndex(new Je(i,1));for(let s=0;s<t;s++)i[s]=s}}function ru(a,e){let t=hi(a),n=e||a.drawRange,i=n.start/3,s=(n.start+n.count)/3,r=Math.max(0,i),o=Math.min(t,s)-r;return[{offset:Math.floor(r),count:Math.floor(o)}]}function ou(a,e){if(!a.groups||!a.groups.length)return ru(a,e);let t=[],n=new Set,i=e||a.drawRange,s=i.start/3,r=(i.start+i.count)/3;for(let c of a.groups){let l=c.start/3,d=(c.start+c.count)/3;n.add(Math.max(s,l)),n.add(Math.min(r,d))}let o=Array.from(n.values()).sort((c,l)=>c-l);for(let c=0;c<o.length-1;c++){let l=o[c],d=o[c+1];t.push({offset:Math.floor(l),count:Math.floor(d-l)})}return t}function am(a,e){let t=hi(a),n=ou(a,e).sort((r,o)=>r.offset-o.offset),i=n[n.length-1];i.count=Math.min(t-i.offset,i.count);let s=0;return n.forEach(({count:r})=>s+=r),t!==s}function xl(a,e,t,n,i){let s=1/0,r=1/0,o=1/0,c=-1/0,l=-1/0,d=-1/0,h=1/0,u=1/0,f=1/0,m=-1/0,g=-1/0,b=-1/0;for(let p=e*6,x=(e+t)*6;p<x;p+=6){let y=a[p+0],v=a[p+1],_=y-v,w=y+v;_<s&&(s=_),w>c&&(c=w),y<h&&(h=y),y>m&&(m=y);let T=a[p+2],I=a[p+3],M=T-I,S=T+I;M<r&&(r=M),S>l&&(l=S),T<u&&(u=T),T>g&&(g=T);let R=a[p+4],D=a[p+5],L=R-D,U=R+D;L<o&&(o=L),U>d&&(d=U),R<f&&(f=R),R>b&&(b=R)}n[0]=s,n[1]=r,n[2]=o,n[3]=c,n[4]=l,n[5]=d,i[0]=h,i[1]=u,i[2]=f,i[3]=m,i[4]=g,i[5]=b}function sm(a,e=null,t=null,n=null){let i=a.attributes.position,s=a.index?a.index.array:null,r=hi(a),o=i.normalized,c;e===null?(c=new Float32Array(r*6),t=0,n=r):(c=e,t=t||0,n=n||r);let l=i.array,d=i.offset||0,h=3;i.isInterleavedBufferAttribute&&(h=i.data.stride);let u=["getX","getY","getZ"];for(let f=t;f<t+n;f++){let m=f*3,g=f*6,b=m+0,p=m+1,x=m+2;s&&(b=s[b],p=s[p],x=s[x]),o||(b=b*h+d,p=p*h+d,x=x*h+d);for(let y=0;y<3;y++){let v,_,w;o?(v=i[u[y]](b),_=i[u[y]](p),w=i[u[y]](x)):(v=l[b+y],_=l[p+y],w=l[x+y]);let T=v;_<T&&(T=_),w<T&&(T=w);let I=v;_>I&&(I=_),w>I&&(I=w);let M=(I-T)/2,S=y*2;c[g+S+0]=T+M,c[g+S+1]=M+(Math.abs(T)+M)*nm}}return c}function ot(a,e,t){return t.min.x=e[a],t.min.y=e[a+1],t.min.z=e[a+2],t.max.x=e[a+3],t.max.y=e[a+4],t.max.z=e[a+5],t}function cu(a){let e=-1,t=-1/0;for(let n=0;n<3;n++){let i=a[n+3]-a[n];i>t&&(t=i,e=n)}return e}function lu(a,e){e.set(a)}function hu(a,e,t){let n,i;for(let s=0;s<3;s++){let r=s+3;n=a[s],i=e[s],t[s]=n<i?n:i,n=a[r],i=e[r],t[r]=n>i?n:i}}function Xr(a,e,t){for(let n=0;n<3;n++){let i=e[a+2*n],s=e[a+2*n+1],r=i-s,o=i+s;r<t[n]&&(t[n]=r),o>t[n+3]&&(t[n+3]=o)}}function Ls(a){let e=a[3]-a[0],t=a[4]-a[1],n=a[5]-a[2];return 2*(e*t+t*n+n*e)}var Li=32,A_=(a,e)=>a.candidate-e.candidate,$i=new Array(Li).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),vl=new Float32Array(6);function cm(a,e,t,n,i,s){let r=-1,o=0;if(s===0)r=cu(e),r!==-1&&(o=(e[r]+e[r+3])/2);else if(s===1)r=cu(a),r!==-1&&(o=R_(t,n,i,r));else if(s===2){let c=Ls(a),l=1.25*i,d=n*6,h=(n+i)*6;for(let u=0;u<3;u++){let f=e[u],b=(e[u+3]-f)/Li;if(i<Li/4){let p=[...$i];p.length=i;let x=0;for(let v=d;v<h;v+=6,x++){let _=p[x];_.candidate=t[v+2*u],_.count=0;let{bounds:w,leftCacheBounds:T,rightCacheBounds:I}=_;for(let M=0;M<3;M++)I[M]=1/0,I[M+3]=-1/0,T[M]=1/0,T[M+3]=-1/0,w[M]=1/0,w[M+3]=-1/0;Xr(v,t,w)}p.sort(A_);let y=i;for(let v=0;v<y;v++){let _=p[v];for(;v+1<y&&p[v+1].candidate===_.candidate;)p.splice(v+1,1),y--}for(let v=d;v<h;v+=6){let _=t[v+2*u];for(let w=0;w<y;w++){let T=p[w];_>=T.candidate?Xr(v,t,T.rightCacheBounds):(Xr(v,t,T.leftCacheBounds),T.count++)}}for(let v=0;v<y;v++){let _=p[v],w=_.count,T=i-_.count,I=_.leftCacheBounds,M=_.rightCacheBounds,S=0;w!==0&&(S=Ls(I)/c);let R=0;T!==0&&(R=Ls(M)/c);let D=1+1.25*(S*w+R*T);D<l&&(r=u,l=D,o=_.candidate)}}else{for(let y=0;y<Li;y++){let v=$i[y];v.count=0,v.candidate=f+b+y*b;let _=v.bounds;for(let w=0;w<3;w++)_[w]=1/0,_[w+3]=-1/0}for(let y=d;y<h;y+=6){let w=~~((t[y+2*u]-f)/b);w>=Li&&(w=Li-1);let T=$i[w];T.count++,Xr(y,t,T.bounds)}let p=$i[Li-1];lu(p.bounds,p.rightCacheBounds);for(let y=Li-2;y>=0;y--){let v=$i[y],_=$i[y+1];hu(v.bounds,_.rightCacheBounds,v.rightCacheBounds)}let x=0;for(let y=0;y<Li-1;y++){let v=$i[y],_=v.count,w=v.bounds,I=$i[y+1].rightCacheBounds;_!==0&&(x===0?lu(w,vl):hu(w,vl,vl)),x+=_;let M=0,S=0;x!==0&&(M=Ls(vl)/c);let R=i-x;R!==0&&(S=Ls(I)/c);let D=1+1.25*(M*x+S*R);D<l&&(r=u,l=D,o=v.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${s} used.`);return{axis:r,pos:o}}function R_(a,e,t,n){let i=0;for(let s=e,r=e+t;s<r;s++)i+=a[s*6+n*2];return i/t}var ks=class{constructor(){this.boundingData=new Float32Array(6)}};function lm(a,e,t,n,i,s){let r=n,o=n+i-1,c=s.pos,l=s.axis*2;for(;;){for(;r<=o&&t[r*6+l]<c;)r++;for(;r<=o&&t[o*6+l]>=c;)o--;if(r<o){for(let d=0;d<3;d++){let h=e[r*3+d];e[r*3+d]=e[o*3+d],e[o*3+d]=h}for(let d=0;d<6;d++){let h=t[r*6+d];t[r*6+d]=t[o*6+d],t[o*6+d]=h}r++,o--}else return r}}function hm(a,e,t,n,i,s){let r=n,o=n+i-1,c=s.pos,l=s.axis*2;for(;;){for(;r<=o&&t[r*6+l]<c;)r++;for(;r<=o&&t[o*6+l]>=c;)o--;if(r<o){let d=a[r];a[r]=a[o],a[o]=d;for(let h=0;h<6;h++){let u=t[r*6+h];t[r*6+h]=t[o*6+h],t[o*6+h]=u}r++,o--}else return r}}function xt(a,e){return e[a+15]===65535}function Tt(a,e){return e[a+6]}function Pt(a,e){return e[a+14]}function zt(a){return a+8}function jt(a,e){return e[a+6]}function yl(a,e){return e[a+7]}var dm,qr,_l,um,C_=Math.pow(2,32);function Ml(a){return"count"in a?1:1+Ml(a.left)+Ml(a.right)}function fm(a,e,t){return dm=new Float32Array(t),qr=new Uint32Array(t),_l=new Uint16Array(t),um=new Uint8Array(t),du(a,e)}function du(a,e){let t=a/4,n=a/2,i="count"in e,s=e.boundingData;for(let r=0;r<6;r++)dm[t+r]=s[r];if(i)if(e.buffer){let r=e.buffer;um.set(new Uint8Array(r),a);for(let o=a,c=a+r.byteLength;o<c;o+=32){let l=o/2;xt(l,_l)||(qr[o/4+6]+=t)}return a+r.byteLength}else{let r=e.offset,o=e.count;return qr[t+6]=r,_l[n+14]=o,_l[n+15]=65535,a+32}else{let r=e.left,o=e.right,c=e.splitAxis,l;if(l=du(a+32,r),l/4>C_)throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return qr[t+6]=l/4,l=du(l,o),qr[t+7]=c,l}}function I_(a,e){let t=(a.index?a.index.count:a.attributes.position.count)/3,n=t>2**16,i=n?4:2,s=e?new SharedArrayBuffer(t*i):new ArrayBuffer(t*i),r=n?new Uint32Array(s):new Uint16Array(s);for(let o=0,c=r.length;o<c;o++)r[o]=o;return r}function P_(a,e,t,n,i){let{maxDepth:s,verbose:r,maxLeafTris:o,strategy:c,onProgress:l,indirect:d}=i,h=a._indirectBuffer,u=a.geometry,f=u.index?u.index.array:null,m=d?hm:lm,g=hi(u),b=new Float32Array(6),p=!1,x=new ks;return xl(e,t,n,x.boundingData,b),v(x,t,n,b),x;function y(_){l&&l(_/g)}function v(_,w,T,I=null,M=0){if(!p&&M>=s&&(p=!0,r&&(console.warn(`MeshBVH: Max depth of ${s} reached when generating BVH. Consider increasing maxDepth.`),console.warn(u))),T<=o||M>=s)return y(w+T),_.offset=w,_.count=T,_;let S=cm(_.boundingData,I,e,w,T,c);if(S.axis===-1)return y(w+T),_.offset=w,_.count=T,_;let R=m(h,f,e,w,T,S);if(R===w||R===w+T)y(w+T),_.offset=w,_.count=T;else{_.splitAxis=S.axis;let D=new ks,L=w,U=R-w;_.left=D,xl(e,L,U,D.boundingData,b),v(D,L,U,b,M+1);let z=new ks,j=R,J=T-U;_.right=z,xl(e,j,J,z.boundingData,b),v(z,j,J,b,M+1)}return _}}function pm(a,e){let t=a.geometry;e.indirect&&(a._indirectBuffer=I_(t,e.useSharedArrayBuffer),am(t,e.range)&&!e.verbose&&console.warn('MeshBVH: Provided geometry contains groups or a range that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.')),a._indirectBuffer||im(t,e);let n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=sm(t),s=e.indirect?ru(t,e.range):ou(t,e.range);a._roots=s.map(r=>{let o=P_(a,i,r.offset,r.count,e),c=Ml(o),l=new n(32*c);return fm(0,o,l),l})}var yn=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,i=-1/0;for(let s=0,r=e.length;s<r;s++){let c=e[s][t];n=c<n?c:n,i=c>i?c:i}this.min=n,this.max=i}setFromPoints(e,t){let n=1/0,i=-1/0;for(let s=0,r=t.length;s<r;s++){let o=t[s],c=e.dot(o);n=c<n?c:n,i=c>i?c:i}this.min=n,this.max=i}isSeparated(e){return this.min>e.max||e.min>this.max}};yn.prototype.setFromBox=(function(){let a=new C;return function(t,n){let i=n.min,s=n.max,r=1/0,o=-1/0;for(let c=0;c<=1;c++)for(let l=0;l<=1;l++)for(let d=0;d<=1;d++){a.x=i.x*c+s.x*(1-c),a.y=i.y*l+s.y*(1-l),a.z=i.z*d+s.z*(1-d);let h=t.dot(a);r=Math.min(h,r),o=Math.max(h,o)}this.min=r,this.max=o}})();var ME=(function(){let a=new yn;return function(t,n){let i=t.points,s=t.satAxes,r=t.satBounds,o=n.points,c=n.satAxes,l=n.satBounds;for(let d=0;d<3;d++){let h=r[d],u=s[d];if(a.setFromPoints(u,o),h.isSeparated(a))return!1}for(let d=0;d<3;d++){let h=l[d],u=c[d];if(a.setFromPoints(u,i),h.isSeparated(a))return!1}}})();var D_=(function(){let a=new C,e=new C,t=new C;return function(i,s,r){let o=i.start,c=a,l=s.start,d=e;t.subVectors(o,l),a.subVectors(i.end,i.start),e.subVectors(s.end,s.start);let h=t.dot(d),u=d.dot(c),f=d.dot(d),m=t.dot(c),b=c.dot(c)*f-u*u,p,x;b!==0?p=(h*u-m*f)/b:p=0,x=(h+p*u)/f,r.x=p,r.y=x}})(),Jr=(function(){let a=new re,e=new C,t=new C;return function(i,s,r,o){D_(i,s,a);let c=a.x,l=a.y;if(c>=0&&c<=1&&l>=0&&l<=1){i.at(c,r),s.at(l,o);return}else if(c>=0&&c<=1){l<0?s.at(0,o):s.at(1,o),i.closestPointToPoint(o,!0,r);return}else if(l>=0&&l<=1){c<0?i.at(0,r):i.at(1,r),s.closestPointToPoint(r,!0,o);return}else{let d;c<0?d=i.start:d=i.end;let h;l<0?h=s.start:h=s.end;let u=e,f=t;if(i.closestPointToPoint(h,!0,e),s.closestPointToPoint(d,!0,t),u.distanceToSquared(h)<=f.distanceToSquared(d)){r.copy(u),o.copy(h);return}else{r.copy(d),o.copy(f);return}}}})(),mm=(function(){let a=new C,e=new C,t=new bn,n=new dn;return function(s,r){let{radius:o,center:c}=s,{a:l,b:d,c:h}=r;if(n.start=l,n.end=d,n.closestPointToPoint(c,!0,a).distanceTo(c)<=o||(n.start=l,n.end=h,n.closestPointToPoint(c,!0,a).distanceTo(c)<=o)||(n.start=d,n.end=h,n.closestPointToPoint(c,!0,a).distanceTo(c)<=o))return!0;let g=r.getPlane(t);if(Math.abs(g.distanceToPoint(c))<=o){let p=g.projectPoint(c,e);if(r.containsPoint(p))return!0}return!1}})();var F_=1e-15;function uu(a){return Math.abs(a)<F_}var Ht=class extends Qt{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new C),this.satBounds=new Array(4).fill().map(()=>new yn),this.points=[this.a,this.b,this.c],this.sphere=new yt,this.plane=new bn,this.needsUpdate=!0}intersectsSphere(e){return mm(e,this)}update(){let e=this.a,t=this.b,n=this.c,i=this.points,s=this.satAxes,r=this.satBounds,o=s[0],c=r[0];this.getNormal(o),c.setFromPoints(o,i);let l=s[1],d=r[1];l.subVectors(e,t),d.setFromPoints(l,i);let h=s[2],u=r[2];h.subVectors(t,n),u.setFromPoints(h,i);let f=s[3],m=r[3];f.subVectors(n,e),m.setFromPoints(f,i),this.sphere.setFromPoints(this.points),this.plane.setFromNormalAndCoplanarPoint(o,e),this.needsUpdate=!1}};Ht.prototype.closestPointToSegment=(function(){let a=new C,e=new C,t=new dn;return function(i,s=null,r=null){let{start:o,end:c}=i,l=this.points,d,h=1/0;for(let u=0;u<3;u++){let f=(u+1)%3;t.start.copy(l[u]),t.end.copy(l[f]),Jr(t,i,a,e),d=a.distanceToSquared(e),d<h&&(h=d,s&&s.copy(a),r&&r.copy(e))}return this.closestPointToPoint(o,a),d=o.distanceToSquared(a),d<h&&(h=d,s&&s.copy(a),r&&r.copy(o)),this.closestPointToPoint(c,a),d=c.distanceToSquared(a),d<h&&(h=d,s&&s.copy(a),r&&r.copy(c)),Math.sqrt(h)}})();Ht.prototype.intersectsTriangle=(function(){let a=new Ht,e=new Array(3),t=new Array(3),n=new yn,i=new yn,s=new C,r=new C,o=new C,c=new C,l=new C,d=new dn,h=new dn,u=new dn,f=new C;function m(g,b,p){let x=g.points,y=0,v=-1;for(let _=0;_<3;_++){let{start:w,end:T}=d;w.copy(x[_]),T.copy(x[(_+1)%3]),d.delta(r);let I=uu(b.distanceToPoint(w));if(uu(b.normal.dot(r))&&I){p.copy(d),y=2;break}let M=b.intersectLine(d,f);if(!M&&I&&f.copy(w),(M||I)&&!uu(f.distanceTo(T))){if(y<=1)(y===1?p.start:p.end).copy(f),I&&(v=y);else if(y>=2){(v===1?p.start:p.end).copy(f),y=2;break}if(y++,y===2&&v===-1)break}}return y}return function(b,p=null,x=!1){this.needsUpdate&&this.update(),b.isExtendedTriangle?b.needsUpdate&&b.update():(a.copy(b),a.update(),b=a);let y=this.plane,v=b.plane;if(Math.abs(y.normal.dot(v.normal))>1-1e-10){let _=this.satBounds,w=this.satAxes;t[0]=b.a,t[1]=b.b,t[2]=b.c;for(let M=0;M<4;M++){let S=_[M],R=w[M];if(n.setFromPoints(R,t),S.isSeparated(n))return!1}let T=b.satBounds,I=b.satAxes;e[0]=this.a,e[1]=this.b,e[2]=this.c;for(let M=0;M<4;M++){let S=T[M],R=I[M];if(n.setFromPoints(R,e),S.isSeparated(n))return!1}for(let M=0;M<4;M++){let S=w[M];for(let R=0;R<4;R++){let D=I[R];if(s.crossVectors(S,D),n.setFromPoints(s,e),i.setFromPoints(s,t),n.isSeparated(i))return!1}}return p&&(x||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),p.start.set(0,0,0),p.end.set(0,0,0)),!0}else{let _=m(this,v,h);if(_===1&&b.containsPoint(h.end))return p&&(p.start.copy(h.end),p.end.copy(h.end)),!0;if(_!==2)return!1;let w=m(b,y,u);if(w===1&&this.containsPoint(u.end))return p&&(p.start.copy(u.end),p.end.copy(u.end)),!0;if(w!==2)return!1;if(h.delta(o),u.delta(c),o.dot(c)<0){let L=u.start;u.start=u.end,u.end=L}let T=h.start.dot(o),I=h.end.dot(o),M=u.start.dot(o),S=u.end.dot(o),R=I<M,D=T<S;return T!==S&&M!==I&&R===D?!1:(p&&(l.subVectors(h.start,u.start),l.dot(o)>0?p.start.copy(h.start):p.start.copy(u.start),l.subVectors(h.end,u.end),l.dot(o)<0?p.end.copy(h.end):p.end.copy(u.end)),!0)}}})();Ht.prototype.distanceToPoint=(function(){let a=new C;return function(t){return this.closestPointToPoint(t,a),t.distanceTo(a)}})();Ht.prototype.distanceToTriangle=(function(){let a=new C,e=new C,t=["a","b","c"],n=new dn,i=new dn;return function(r,o=null,c=null){let l=o||c?n:null;if(this.intersectsTriangle(r,l))return(o||c)&&(o&&l.getCenter(o),c&&l.getCenter(c)),0;let d=1/0;for(let h=0;h<3;h++){let u,f=t[h],m=r[f];this.closestPointToPoint(m,a),u=m.distanceToSquared(a),u<d&&(d=u,o&&o.copy(a),c&&c.copy(m));let g=this[f];r.closestPointToPoint(g,a),u=g.distanceToSquared(a),u<d&&(d=u,o&&o.copy(g),c&&c.copy(a))}for(let h=0;h<3;h++){let u=t[h],f=t[(h+1)%3];n.set(this[u],this[f]);for(let m=0;m<3;m++){let g=t[m],b=t[(m+1)%3];i.set(r[g],r[b]),Jr(n,i,a,e);let p=a.distanceToSquared(e);p<d&&(d=p,o&&o.copy(a),c&&c.copy(e))}}return Math.sqrt(d)}})();var _t=class{constructor(e,t,n){this.isOrientedBox=!0,this.min=new C,this.max=new C,this.matrix=new de,this.invMatrix=new de,this.points=new Array(8).fill().map(()=>new C),this.satAxes=new Array(3).fill().map(()=>new C),this.satBounds=new Array(3).fill().map(()=>new yn),this.alignedSatBounds=new Array(3).fill().map(()=>new yn),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),n&&this.matrix.copy(n)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};_t.prototype.update=(function(){return function(){let e=this.matrix,t=this.min,n=this.max,i=this.points;for(let l=0;l<=1;l++)for(let d=0;d<=1;d++)for(let h=0;h<=1;h++){let u=1*l|2*d|4*h,f=i[u];f.x=l?n.x:t.x,f.y=d?n.y:t.y,f.z=h?n.z:t.z,f.applyMatrix4(e)}let s=this.satBounds,r=this.satAxes,o=i[0];for(let l=0;l<3;l++){let d=r[l],h=s[l],u=1<<l,f=i[u];d.subVectors(o,f),h.setFromPoints(d,i)}let c=this.alignedSatBounds;c[0].setFromPointsField(i,"x"),c[1].setFromPointsField(i,"y"),c[2].setFromPointsField(i,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})();_t.prototype.intersectsBox=(function(){let a=new yn;return function(t){this.needsUpdate&&this.update();let n=t.min,i=t.max,s=this.satBounds,r=this.satAxes,o=this.alignedSatBounds;if(a.min=n.x,a.max=i.x,o[0].isSeparated(a)||(a.min=n.y,a.max=i.y,o[1].isSeparated(a))||(a.min=n.z,a.max=i.z,o[2].isSeparated(a)))return!1;for(let c=0;c<3;c++){let l=r[c],d=s[c];if(a.setFromBox(l,t),d.isSeparated(a))return!1}return!0}})();_t.prototype.intersectsTriangle=(function(){let a=new Ht,e=new Array(3),t=new yn,n=new yn,i=new C;return function(r){this.needsUpdate&&this.update(),r.isExtendedTriangle?r.needsUpdate&&r.update():(a.copy(r),a.update(),r=a);let o=this.satBounds,c=this.satAxes;e[0]=r.a,e[1]=r.b,e[2]=r.c;for(let u=0;u<3;u++){let f=o[u],m=c[u];if(t.setFromPoints(m,e),f.isSeparated(t))return!1}let l=r.satBounds,d=r.satAxes,h=this.points;for(let u=0;u<3;u++){let f=l[u],m=d[u];if(t.setFromPoints(m,h),f.isSeparated(t))return!1}for(let u=0;u<3;u++){let f=c[u];for(let m=0;m<4;m++){let g=d[m];if(i.crossVectors(f,g),t.setFromPoints(i,e),n.setFromPoints(i,h),t.isSeparated(n))return!1}}return!0}})();_t.prototype.closestPointToPoint=(function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}})();_t.prototype.distanceToPoint=(function(){let a=new C;return function(t){return this.closestPointToPoint(t,a),t.distanceTo(a)}})();_t.prototype.distanceToBox=(function(){let a=["x","y","z"],e=new Array(12).fill().map(()=>new dn),t=new Array(12).fill().map(()=>new dn),n=new C,i=new C;return function(r,o=0,c=null,l=null){if(this.needsUpdate&&this.update(),this.intersectsBox(r))return(c||l)&&(r.getCenter(i),this.closestPointToPoint(i,n),r.closestPointToPoint(n,i),c&&c.copy(n),l&&l.copy(i)),0;let d=o*o,h=r.min,u=r.max,f=this.points,m=1/0;for(let b=0;b<8;b++){let p=f[b];i.copy(p).clamp(h,u);let x=p.distanceToSquared(i);if(x<m&&(m=x,c&&c.copy(p),l&&l.copy(i),x<d))return Math.sqrt(x)}let g=0;for(let b=0;b<3;b++)for(let p=0;p<=1;p++)for(let x=0;x<=1;x++){let y=(b+1)%3,v=(b+2)%3,_=p<<y|x<<v,w=1<<b|p<<y|x<<v,T=f[_],I=f[w];e[g].set(T,I);let S=a[b],R=a[y],D=a[v],L=t[g],U=L.start,z=L.end;U[S]=h[S],U[R]=p?h[R]:u[R],U[D]=x?h[D]:u[R],z[S]=u[S],z[R]=p?h[R]:u[R],z[D]=x?h[D]:u[R],g++}for(let b=0;b<=1;b++)for(let p=0;p<=1;p++)for(let x=0;x<=1;x++){i.x=b?u.x:h.x,i.y=p?u.y:h.y,i.z=x?u.z:h.z,this.closestPointToPoint(i,n);let y=i.distanceToSquared(n);if(y<m&&(m=y,c&&c.copy(n),l&&l.copy(i),y<d))return Math.sqrt(y)}for(let b=0;b<12;b++){let p=e[b];for(let x=0;x<12;x++){let y=t[x];Jr(p,y,n,i);let v=n.distanceToSquared(i);if(v<m&&(m=v,c&&c.copy(n),l&&l.copy(i),v<d))return Math.sqrt(v)}}return Math.sqrt(m)}})();var ea=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}};var fu=class extends ea{constructor(){super(()=>new Ht)}},un=new fu;var pu=class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],t=null;this.setBuffer=n=>{t&&e.push(t),t=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},Ye=new pu;var ta,Us,Ns=[],wl=new ea(()=>new Ke);function bm(a,e,t,n,i,s){ta=wl.getPrimitive(),Us=wl.getPrimitive(),Ns.push(ta,Us),Ye.setBuffer(a._roots[e]);let r=mu(0,a.geometry,t,n,i,s);Ye.clearBuffer(),wl.releasePrimitive(ta),wl.releasePrimitive(Us),Ns.pop(),Ns.pop();let o=Ns.length;return o>0&&(Us=Ns[o-1],ta=Ns[o-2]),r}function mu(a,e,t,n,i=null,s=0,r=0){let{float32Array:o,uint16Array:c,uint32Array:l}=Ye,d=a*2;if(xt(d,c)){let u=Tt(a,l),f=Pt(d,c);return ot(a,o,ta),n(u,f,!1,r,s+a,ta)}else{let S=function(D){let{uint16Array:L,uint32Array:U}=Ye,z=D*2;for(;!xt(z,L);)D=zt(D),z=D*2;return Tt(D,U)},R=function(D){let{uint16Array:L,uint32Array:U}=Ye,z=D*2;for(;!xt(z,L);)D=jt(D,U),z=D*2;return Tt(D,U)+Pt(z,L)},u=zt(a),f=jt(a,l),m=u,g=f,b,p,x,y;if(i&&(x=ta,y=Us,ot(m,o,x),ot(g,o,y),b=i(x),p=i(y),p<b)){m=f,g=u;let D=b;b=p,p=D,x=y}x||(x=ta,ot(m,o,x));let v=xt(m*2,c),_=t(x,v,b,r+1,s+m),w;if(_===2){let D=S(m),U=R(m)-D;w=n(D,U,!0,r+1,s+m,x)}else w=_&&mu(m,e,t,n,i,s,r+1);if(w)return!0;y=Us,ot(g,o,y);let T=xt(g*2,c),I=t(y,T,p,r+1,s+g),M;if(I===2){let D=S(g),U=R(g)-D;M=n(D,U,!0,r+1,s+g,y)}else M=I&&mu(g,e,t,n,i,s,r+1);return!!M}}var Yr=new C,gu=new C;function gm(a,e,t={},n=0,i=1/0){let s=n*n,r=i*i,o=1/0,c=null;if(a.shapecast({boundsTraverseOrder:d=>(Yr.copy(e).clamp(d.min,d.max),Yr.distanceToSquared(e)),intersectsBounds:(d,h,u)=>u<o&&u<r,intersectsTriangle:(d,h)=>{d.closestPointToPoint(e,Yr);let u=e.distanceToSquared(Yr);return u<o&&(gu.copy(Yr),o=u,c=h),u<s}}),o===1/0)return null;let l=Math.sqrt(o);return t.point?t.point.copy(gu):t.point=gu.clone(),t.distance=l,t.faceIndex=c,t}var k_=parseInt("180")>=169,Da=new C,Fa=new C,La=new C,Tl=new re,El=new re,Al=new re,xm=new C,vm=new C,ym=new C,Zr=new C;function N_(a,e,t,n,i,s,r,o){let c;if(s===Ft?c=a.intersectTriangle(n,t,e,!0,i):c=a.intersectTriangle(e,t,n,s!==Ot,i),c===null)return null;let l=a.origin.distanceTo(i);return l<r||l>o?null:{distance:l,point:i.clone()}}function U_(a,e,t,n,i,s,r,o,c,l,d){Da.fromBufferAttribute(e,s),Fa.fromBufferAttribute(e,r),La.fromBufferAttribute(e,o);let h=N_(a,Da,Fa,La,Zr,c,l,d);if(h){let u=new C;Qt.getBarycoord(Zr,Da,Fa,La,u),n&&(Tl.fromBufferAttribute(n,s),El.fromBufferAttribute(n,r),Al.fromBufferAttribute(n,o),h.uv=Qt.getInterpolation(Zr,Da,Fa,La,Tl,El,Al,new re)),i&&(Tl.fromBufferAttribute(i,s),El.fromBufferAttribute(i,r),Al.fromBufferAttribute(i,o),h.uv1=Qt.getInterpolation(Zr,Da,Fa,La,Tl,El,Al,new re)),t&&(xm.fromBufferAttribute(t,s),vm.fromBufferAttribute(t,r),ym.fromBufferAttribute(t,o),h.normal=Qt.getInterpolation(Zr,Da,Fa,La,xm,vm,ym,new C),h.normal.dot(a.direction)>0&&h.normal.multiplyScalar(-1));let f={a:s,b:r,c:o,normal:new C,materialIndex:0};Qt.getNormal(Da,Fa,La,f.normal),h.face=f,h.faceIndex=s,k_&&(h.barycoord=u)}return h}function Bs(a,e,t,n,i,s,r){let o=n*3,c=o+0,l=o+1,d=o+2,h=a.index;a.index&&(c=h.getX(c),l=h.getX(l),d=h.getX(d));let{position:u,normal:f,uv:m,uv1:g}=a.attributes,b=U_(t,u,f,m,g,c,l,d,e,s,r);return b?(b.faceIndex=n,i&&i.push(b),b):null}function ct(a,e,t,n){let i=a.a,s=a.b,r=a.c,o=e,c=e+1,l=e+2;t&&(o=t.getX(o),c=t.getX(c),l=t.getX(l)),i.x=n.getX(o),i.y=n.getY(o),i.z=n.getZ(o),s.x=n.getX(c),s.y=n.getY(c),s.z=n.getZ(c),r.x=n.getX(l),r.y=n.getY(l),r.z=n.getZ(l)}function _m(a,e,t,n,i,s,r,o){let{geometry:c,_indirectBuffer:l}=a;for(let d=n,h=n+i;d<h;d++)Bs(c,e,t,d,s,r,o)}function Mm(a,e,t,n,i,s,r){let{geometry:o,_indirectBuffer:c}=a,l=1/0,d=null;for(let h=n,u=n+i;h<u;h++){let f;f=Bs(o,e,t,h,null,s,r),f&&f.distance<l&&(d=f,l=f.distance)}return d}function Sm(a,e,t,n,i,s,r){let{geometry:o}=t,{index:c}=o,l=o.attributes.position;for(let d=a,h=e+a;d<h;d++){let u;if(u=d,ct(r,u*3,c,l),r.needsUpdate=!0,n(r,u,i,s))return!0}return!1}function wm(a,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=a.geometry,n=t.index?t.index.array:null,i=t.attributes.position,s,r,o,c,l=0,d=a._roots;for(let u=0,f=d.length;u<f;u++)s=d[u],r=new Uint32Array(s),o=new Uint16Array(s),c=new Float32Array(s),h(0,l),l+=s.byteLength;function h(u,f,m=!1){let g=u*2;if(o[g+15]===65535){let p=r[u+6],x=o[g+14],y=1/0,v=1/0,_=1/0,w=-1/0,T=-1/0,I=-1/0;for(let M=3*p,S=3*(p+x);M<S;M++){let R=n[M],D=i.getX(R),L=i.getY(R),U=i.getZ(R);D<y&&(y=D),D>w&&(w=D),L<v&&(v=L),L>T&&(T=L),U<_&&(_=U),U>I&&(I=U)}return c[u+0]!==y||c[u+1]!==v||c[u+2]!==_||c[u+3]!==w||c[u+4]!==T||c[u+5]!==I?(c[u+0]=y,c[u+1]=v,c[u+2]=_,c[u+3]=w,c[u+4]=T,c[u+5]=I,!0):!1}else{let p=u+8,x=r[u+6],y=p+f,v=x+f,_=m,w=!1,T=!1;e?_||(w=e.has(y),T=e.has(v),_=!w&&!T):(w=!0,T=!0);let I=_||w,M=_||T,S=!1;I&&(S=h(p,f,_));let R=!1;M&&(R=h(x,f,_));let D=S||R;if(D)for(let L=0;L<3;L++){let U=p+L,z=x+L,j=c[U],J=c[U+3],H=c[z],Q=c[z+3];c[u+L]=j<H?j:H,c[u+L+3]=J>Q?J:Q}return D}}}function Bn(a,e,t,n,i){let s,r,o,c,l,d,h=1/t.direction.x,u=1/t.direction.y,f=1/t.direction.z,m=t.origin.x,g=t.origin.y,b=t.origin.z,p=e[a],x=e[a+3],y=e[a+1],v=e[a+3+1],_=e[a+2],w=e[a+3+2];return h>=0?(s=(p-m)*h,r=(x-m)*h):(s=(x-m)*h,r=(p-m)*h),u>=0?(o=(y-g)*u,c=(v-g)*u):(o=(v-g)*u,c=(y-g)*u),s>c||o>r||((o>s||isNaN(s))&&(s=o),(c<r||isNaN(r))&&(r=c),f>=0?(l=(_-b)*f,d=(w-b)*f):(l=(w-b)*f,d=(_-b)*f),s>d||l>r)?!1:((l>s||s!==s)&&(s=l),(d<r||r!==r)&&(r=d),s<=i&&r>=n)}function Tm(a,e,t,n,i,s,r,o){let{geometry:c,_indirectBuffer:l}=a;for(let d=n,h=n+i;d<h;d++){let u=l?l[d]:d;Bs(c,e,t,u,s,r,o)}}function Em(a,e,t,n,i,s,r){let{geometry:o,_indirectBuffer:c}=a,l=1/0,d=null;for(let h=n,u=n+i;h<u;h++){let f;f=Bs(o,e,t,c?c[h]:h,null,s,r),f&&f.distance<l&&(d=f,l=f.distance)}return d}function Am(a,e,t,n,i,s,r){let{geometry:o}=t,{index:c}=o,l=o.attributes.position;for(let d=a,h=e+a;d<h;d++){let u;if(u=t.resolveTriangleIndex(d),ct(r,u*3,c,l),r.needsUpdate=!0,n(r,u,i,s))return!0}return!1}function Rm(a,e,t,n,i,s,r){Ye.setBuffer(a._roots[e]),xu(0,a,t,n,i,s,r),Ye.clearBuffer()}function xu(a,e,t,n,i,s,r){let{float32Array:o,uint16Array:c,uint32Array:l}=Ye,d=a*2;if(xt(d,c)){let u=Tt(a,l),f=Pt(d,c);_m(e,t,n,u,f,i,s,r)}else{let u=zt(a);Bn(u,o,n,s,r)&&xu(u,e,t,n,i,s,r);let f=jt(a,l);Bn(f,o,n,s,r)&&xu(f,e,t,n,i,s,r)}}var B_=["x","y","z"];function Cm(a,e,t,n,i,s){Ye.setBuffer(a._roots[e]);let r=vu(0,a,t,n,i,s);return Ye.clearBuffer(),r}function vu(a,e,t,n,i,s){let{float32Array:r,uint16Array:o,uint32Array:c}=Ye,l=a*2;if(xt(l,o)){let h=Tt(a,c),u=Pt(l,o);return Mm(e,t,n,h,u,i,s)}else{let h=yl(a,c),u=B_[h],m=n.direction[u]>=0,g,b;m?(g=zt(a),b=jt(a,c)):(g=jt(a,c),b=zt(a));let x=Bn(g,r,n,i,s)?vu(g,e,t,n,i,s):null;if(x){let _=x.point[u];if(m?_<=r[b+h]:_>=r[b+h+3])return x}let v=Bn(b,r,n,i,s)?vu(b,e,t,n,i,s):null;return x&&v?x.distance<=v.distance?x:v:x||v||null}}var Rl=new Ke,Os=new Ht,zs=new Ht,Qr=new de,Im=new _t,Cl=new _t;function Pm(a,e,t,n){Ye.setBuffer(a._roots[e]);let i=yu(0,a,t,n);return Ye.clearBuffer(),i}function yu(a,e,t,n,i=null){let{float32Array:s,uint16Array:r,uint32Array:o}=Ye,c=a*2;if(i===null&&(t.boundingBox||t.computeBoundingBox(),Im.set(t.boundingBox.min,t.boundingBox.max,n),i=Im),xt(c,r)){let d=e.geometry,h=d.index,u=d.attributes.position,f=t.index,m=t.attributes.position,g=Tt(a,o),b=Pt(c,r);if(Qr.copy(n).invert(),t.boundsTree)return ot(a,s,Cl),Cl.matrix.copy(Qr),Cl.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:x=>Cl.intersectsBox(x),intersectsTriangle:x=>{x.a.applyMatrix4(n),x.b.applyMatrix4(n),x.c.applyMatrix4(n),x.needsUpdate=!0;for(let y=g*3,v=(b+g)*3;y<v;y+=3)if(ct(zs,y,h,u),zs.needsUpdate=!0,x.intersectsTriangle(zs))return!0;return!1}});for(let p=g*3,x=(b+g)*3;p<x;p+=3){ct(Os,p,h,u),Os.a.applyMatrix4(Qr),Os.b.applyMatrix4(Qr),Os.c.applyMatrix4(Qr),Os.needsUpdate=!0;for(let y=0,v=f.count;y<v;y+=3)if(ct(zs,y,f,m),zs.needsUpdate=!0,Os.intersectsTriangle(zs))return!0}}else{let d=a+8,h=o[a+6];return ot(d,s,Rl),!!(i.intersectsBox(Rl)&&yu(d,e,t,n,i)||(ot(h,s,Rl),i.intersectsBox(Rl)&&yu(h,e,t,n,i)))}}var Il=new de,_u=new _t,$r=new _t,O_=new C,z_=new C,j_=new C,V_=new C;function Dm(a,e,t,n={},i={},s=0,r=1/0){e.boundingBox||e.computeBoundingBox(),_u.set(e.boundingBox.min,e.boundingBox.max,t),_u.needsUpdate=!0;let o=a.geometry,c=o.attributes.position,l=o.index,d=e.attributes.position,h=e.index,u=un.getPrimitive(),f=un.getPrimitive(),m=O_,g=z_,b=null,p=null;i&&(b=j_,p=V_);let x=1/0,y=null,v=null;return Il.copy(t).invert(),$r.matrix.copy(Il),a.shapecast({boundsTraverseOrder:_=>_u.distanceToBox(_),intersectsBounds:(_,w,T)=>T<x&&T<r?(w&&($r.min.copy(_.min),$r.max.copy(_.max),$r.needsUpdate=!0),!0):!1,intersectsRange:(_,w)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:I=>$r.distanceToBox(I),intersectsBounds:(I,M,S)=>S<x&&S<r,intersectsRange:(I,M)=>{for(let S=I,R=I+M;S<R;S++){ct(f,3*S,h,d),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let D=_,L=_+w;D<L;D++){ct(u,3*D,l,c),u.needsUpdate=!0;let U=u.distanceToTriangle(f,m,b);if(U<x&&(g.copy(m),p&&p.copy(b),x=U,y=D,v=S),U<s)return!0}}}});{let T=hi(e);for(let I=0,M=T;I<M;I++){ct(f,3*I,h,d),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let S=_,R=_+w;S<R;S++){ct(u,3*S,l,c),u.needsUpdate=!0;let D=u.distanceToTriangle(f,m,b);if(D<x&&(g.copy(m),p&&p.copy(b),x=D,y=S,v=I),D<s)return!0}}}}}),un.releasePrimitive(u),un.releasePrimitive(f),x===1/0?null:(n.point?n.point.copy(g):n.point=g.clone(),n.distance=x,n.faceIndex=y,i&&(i.point?i.point.copy(p):i.point=p.clone(),i.point.applyMatrix4(Il),g.applyMatrix4(Il),i.distance=g.sub(i.point).length(),i.faceIndex=v),n)}function Fm(a,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=a.geometry,n=t.index?t.index.array:null,i=t.attributes.position,s,r,o,c,l=0,d=a._roots;for(let u=0,f=d.length;u<f;u++)s=d[u],r=new Uint32Array(s),o=new Uint16Array(s),c=new Float32Array(s),h(0,l),l+=s.byteLength;function h(u,f,m=!1){let g=u*2;if(o[g+15]===65535){let p=r[u+6],x=o[g+14],y=1/0,v=1/0,_=1/0,w=-1/0,T=-1/0,I=-1/0;for(let M=p,S=p+x;M<S;M++){let R=3*a.resolveTriangleIndex(M);for(let D=0;D<3;D++){let L=R+D;L=n?n[L]:L;let U=i.getX(L),z=i.getY(L),j=i.getZ(L);U<y&&(y=U),U>w&&(w=U),z<v&&(v=z),z>T&&(T=z),j<_&&(_=j),j>I&&(I=j)}}return c[u+0]!==y||c[u+1]!==v||c[u+2]!==_||c[u+3]!==w||c[u+4]!==T||c[u+5]!==I?(c[u+0]=y,c[u+1]=v,c[u+2]=_,c[u+3]=w,c[u+4]=T,c[u+5]=I,!0):!1}else{let p=u+8,x=r[u+6],y=p+f,v=x+f,_=m,w=!1,T=!1;e?_||(w=e.has(y),T=e.has(v),_=!w&&!T):(w=!0,T=!0);let I=_||w,M=_||T,S=!1;I&&(S=h(p,f,_));let R=!1;M&&(R=h(x,f,_));let D=S||R;if(D)for(let L=0;L<3;L++){let U=p+L,z=x+L,j=c[U],J=c[U+3],H=c[z],Q=c[z+3];c[u+L]=j<H?j:H,c[u+L+3]=J>Q?J:Q}return D}}}function Lm(a,e,t,n,i,s,r){Ye.setBuffer(a._roots[e]),Mu(0,a,t,n,i,s,r),Ye.clearBuffer()}function Mu(a,e,t,n,i,s,r){let{float32Array:o,uint16Array:c,uint32Array:l}=Ye,d=a*2;if(xt(d,c)){let u=Tt(a,l),f=Pt(d,c);Tm(e,t,n,u,f,i,s,r)}else{let u=zt(a);Bn(u,o,n,s,r)&&Mu(u,e,t,n,i,s,r);let f=jt(a,l);Bn(f,o,n,s,r)&&Mu(f,e,t,n,i,s,r)}}var G_=["x","y","z"];function km(a,e,t,n,i,s){Ye.setBuffer(a._roots[e]);let r=Su(0,a,t,n,i,s);return Ye.clearBuffer(),r}function Su(a,e,t,n,i,s){let{float32Array:r,uint16Array:o,uint32Array:c}=Ye,l=a*2;if(xt(l,o)){let h=Tt(a,c),u=Pt(l,o);return Em(e,t,n,h,u,i,s)}else{let h=yl(a,c),u=G_[h],m=n.direction[u]>=0,g,b;m?(g=zt(a),b=jt(a,c)):(g=jt(a,c),b=zt(a));let x=Bn(g,r,n,i,s)?Su(g,e,t,n,i,s):null;if(x){let _=x.point[u];if(m?_<=r[b+h]:_>=r[b+h+3])return x}let v=Bn(b,r,n,i,s)?Su(b,e,t,n,i,s):null;return x&&v?x.distance<=v.distance?x:v:x||v||null}}var Pl=new Ke,js=new Ht,Vs=new Ht,eo=new de,Nm=new _t,Dl=new _t;function Um(a,e,t,n){Ye.setBuffer(a._roots[e]);let i=wu(0,a,t,n);return Ye.clearBuffer(),i}function wu(a,e,t,n,i=null){let{float32Array:s,uint16Array:r,uint32Array:o}=Ye,c=a*2;if(i===null&&(t.boundingBox||t.computeBoundingBox(),Nm.set(t.boundingBox.min,t.boundingBox.max,n),i=Nm),xt(c,r)){let d=e.geometry,h=d.index,u=d.attributes.position,f=t.index,m=t.attributes.position,g=Tt(a,o),b=Pt(c,r);if(eo.copy(n).invert(),t.boundsTree)return ot(a,s,Dl),Dl.matrix.copy(eo),Dl.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:x=>Dl.intersectsBox(x),intersectsTriangle:x=>{x.a.applyMatrix4(n),x.b.applyMatrix4(n),x.c.applyMatrix4(n),x.needsUpdate=!0;for(let y=g,v=b+g;y<v;y++)if(ct(Vs,3*e.resolveTriangleIndex(y),h,u),Vs.needsUpdate=!0,x.intersectsTriangle(Vs))return!0;return!1}});for(let p=g,x=b+g;p<x;p++){let y=e.resolveTriangleIndex(p);ct(js,3*y,h,u),js.a.applyMatrix4(eo),js.b.applyMatrix4(eo),js.c.applyMatrix4(eo),js.needsUpdate=!0;for(let v=0,_=f.count;v<_;v+=3)if(ct(Vs,v,f,m),Vs.needsUpdate=!0,js.intersectsTriangle(Vs))return!0}}else{let d=a+8,h=o[a+6];return ot(d,s,Pl),!!(i.intersectsBox(Pl)&&wu(d,e,t,n,i)||(ot(h,s,Pl),i.intersectsBox(Pl)&&wu(h,e,t,n,i)))}}var Fl=new de,Tu=new _t,to=new _t,H_=new C,W_=new C,X_=new C,q_=new C;function Bm(a,e,t,n={},i={},s=0,r=1/0){e.boundingBox||e.computeBoundingBox(),Tu.set(e.boundingBox.min,e.boundingBox.max,t),Tu.needsUpdate=!0;let o=a.geometry,c=o.attributes.position,l=o.index,d=e.attributes.position,h=e.index,u=un.getPrimitive(),f=un.getPrimitive(),m=H_,g=W_,b=null,p=null;i&&(b=X_,p=q_);let x=1/0,y=null,v=null;return Fl.copy(t).invert(),to.matrix.copy(Fl),a.shapecast({boundsTraverseOrder:_=>Tu.distanceToBox(_),intersectsBounds:(_,w,T)=>T<x&&T<r?(w&&(to.min.copy(_.min),to.max.copy(_.max),to.needsUpdate=!0),!0):!1,intersectsRange:(_,w)=>{if(e.boundsTree){let T=e.boundsTree;return T.shapecast({boundsTraverseOrder:I=>to.distanceToBox(I),intersectsBounds:(I,M,S)=>S<x&&S<r,intersectsRange:(I,M)=>{for(let S=I,R=I+M;S<R;S++){let D=T.resolveTriangleIndex(S);ct(f,3*D,h,d),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let L=_,U=_+w;L<U;L++){let z=a.resolveTriangleIndex(L);ct(u,3*z,l,c),u.needsUpdate=!0;let j=u.distanceToTriangle(f,m,b);if(j<x&&(g.copy(m),p&&p.copy(b),x=j,y=L,v=S),j<s)return!0}}}})}else{let T=hi(e);for(let I=0,M=T;I<M;I++){ct(f,3*I,h,d),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let S=_,R=_+w;S<R;S++){let D=a.resolveTriangleIndex(S);ct(u,3*D,l,c),u.needsUpdate=!0;let L=u.distanceToTriangle(f,m,b);if(L<x&&(g.copy(m),p&&p.copy(b),x=L,y=S,v=I),L<s)return!0}}}}}),un.releasePrimitive(u),un.releasePrimitive(f),x===1/0?null:(n.point?n.point.copy(g):n.point=g.clone(),n.distance=x,n.faceIndex=y,i&&(i.point?i.point.copy(p):i.point=p.clone(),i.point.applyMatrix4(Fl),g.applyMatrix4(Fl),i.distance=g.sub(i.point).length(),i.faceIndex=v),n)}function Om(){return typeof SharedArrayBuffer<"u"}var no=new Ye.constructor,Ll=new Ye.constructor,na=new ea(()=>new Ke),Gs=new Ke,Hs=new Ke,Eu=new Ke,Au=new Ke,Ru=!1;function zm(a,e,t,n){if(Ru)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");Ru=!0;let i=a._roots,s=e._roots,r,o=0,c=0,l=new de().copy(t).invert();for(let d=0,h=i.length;d<h;d++){no.setBuffer(i[d]),c=0;let u=na.getPrimitive();ot(0,no.float32Array,u),u.applyMatrix4(l);for(let f=0,m=s.length;f<m&&(Ll.setBuffer(s[f]),r=Jn(0,0,t,l,n,o,c,0,0,u),Ll.clearBuffer(),c+=s[f].length,!r);f++);if(na.releasePrimitive(u),no.clearBuffer(),o+=i[d].length,r)break}return Ru=!1,r}function Jn(a,e,t,n,i,s=0,r=0,o=0,c=0,l=null,d=!1){let h,u;d?(h=Ll,u=no):(h=no,u=Ll);let f=h.float32Array,m=h.uint32Array,g=h.uint16Array,b=u.float32Array,p=u.uint32Array,x=u.uint16Array,y=a*2,v=e*2,_=xt(y,g),w=xt(v,x),T=!1;if(w&&_)d?T=i(Tt(e,p),Pt(e*2,x),Tt(a,m),Pt(a*2,g),c,r+e,o,s+a):T=i(Tt(a,m),Pt(a*2,g),Tt(e,p),Pt(e*2,x),o,s+a,c,r+e);else if(w){let I=na.getPrimitive();ot(e,b,I),I.applyMatrix4(t);let M=zt(a),S=jt(a,m);ot(M,f,Gs),ot(S,f,Hs);let R=I.intersectsBox(Gs),D=I.intersectsBox(Hs);T=R&&Jn(e,M,n,t,i,r,s,c,o+1,I,!d)||D&&Jn(e,S,n,t,i,r,s,c,o+1,I,!d),na.releasePrimitive(I)}else{let I=zt(e),M=jt(e,p);ot(I,b,Eu),ot(M,b,Au);let S=l.intersectsBox(Eu),R=l.intersectsBox(Au);if(S&&R)T=Jn(a,I,t,n,i,s,r,o,c+1,l,d)||Jn(a,M,t,n,i,s,r,o,c+1,l,d);else if(S)if(_)T=Jn(a,I,t,n,i,s,r,o,c+1,l,d);else{let D=na.getPrimitive();D.copy(Eu).applyMatrix4(t);let L=zt(a),U=jt(a,m);ot(L,f,Gs),ot(U,f,Hs);let z=D.intersectsBox(Gs),j=D.intersectsBox(Hs);T=z&&Jn(I,L,n,t,i,r,s,c,o+1,D,!d)||j&&Jn(I,U,n,t,i,r,s,c,o+1,D,!d),na.releasePrimitive(D)}else if(R)if(_)T=Jn(a,M,t,n,i,s,r,o,c+1,l,d);else{let D=na.getPrimitive();D.copy(Au).applyMatrix4(t);let L=zt(a),U=jt(a,m);ot(L,f,Gs),ot(U,f,Hs);let z=D.intersectsBox(Gs),j=D.intersectsBox(Hs);T=z&&Jn(M,L,n,t,i,r,s,c,o+1,D,!d)||j&&Jn(M,U,n,t,i,r,s,c,o+1,D,!d),na.releasePrimitive(D)}}return T}var kl=new _t,jm=new Ke,K_={strategy:0,maxDepth:40,maxLeafTris:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null},io=class a{static serialize(e,t={}){t={cloneBuffers:!0,...t};let n=e.geometry,i=e._roots,s=e._indirectBuffer,r=n.getIndex(),o;return t.cloneBuffers?o={roots:i.map(c=>c.slice()),index:r?r.array.slice():null,indirectBuffer:s?s.slice():null}:o={roots:i,index:r?r.array:null,indirectBuffer:s},o}static deserialize(e,t,n={}){n={setIndex:!0,indirect:!!e.indirectBuffer,...n};let{index:i,roots:s,indirectBuffer:r}=e,o=new a(t,{...n,[gl]:!0});if(o._roots=s,o._indirectBuffer=r||null,n.setIndex){let c=t.getIndex();if(c===null){let l=new Je(e.index,1,!1);t.setIndex(l)}else c.array!==i&&(c.array.set(i),c.needsUpdate=!0)}return o}get indirect(){return!!this._indirectBuffer}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("MeshBVH: Only BufferGeometries are supported.");if(t=Object.assign({...K_,[gl]:!1},t),t.useSharedArrayBuffer&&!Om())throw new Error("MeshBVH: SharedArrayBuffer is not available.");this.geometry=e,this._roots=null,this._indirectBuffer=null,t[gl]||(pm(this,t),!e.boundingBox&&t.setBoundingBox&&(e.boundingBox=this.getBoundingBox(new Ke))),this.resolveTriangleIndex=t.indirect?n=>this._indirectBuffer[n]:n=>n}refit(e=null){return(this.indirect?Fm:wm)(this,e)}traverse(e,t=0){let n=this._roots[t],i=new Uint32Array(n),s=new Uint16Array(n);r(0);function r(o,c=0){let l=o*2,d=s[l+15]===65535;if(d){let h=i[o+6],u=s[l+14];e(c,d,new Float32Array(n,o*4,6),h,u)}else{let h=o+32/4,u=i[o+6],f=i[o+7];e(c,d,new Float32Array(n,o*4,6),f)||(r(h,c+1),r(u,c+1))}}}raycast(e,t=$t,n=0,i=1/0){let s=this._roots,r=this.geometry,o=[],c=t.isMaterial,l=Array.isArray(t),d=r.groups,h=c?t.side:t,u=this.indirect?Lm:Rm;for(let f=0,m=s.length;f<m;f++){let g=l?t[d[f].materialIndex].side:h,b=o.length;if(u(this,f,g,e,o,n,i),l){let p=d[f].materialIndex;for(let x=b,y=o.length;x<y;x++)o[x].face.materialIndex=p}}return o}raycastFirst(e,t=$t,n=0,i=1/0){let s=this._roots,r=this.geometry,o=t.isMaterial,c=Array.isArray(t),l=null,d=r.groups,h=o?t.side:t,u=this.indirect?km:Cm;for(let f=0,m=s.length;f<m;f++){let g=c?t[d[f].materialIndex].side:h,b=u(this,f,g,e,n,i);b!=null&&(l==null||b.distance<l.distance)&&(l=b,c&&(b.face.materialIndex=d[f].materialIndex))}return l}intersectsGeometry(e,t){let n=!1,i=this._roots,s=this.indirect?Um:Pm;for(let r=0,o=i.length;r<o&&(n=s(this,r,e,t),!n);r++);return n}shapecast(e){let t=un.getPrimitive(),n=this.indirect?Am:Sm,{boundsTraverseOrder:i,intersectsBounds:s,intersectsRange:r,intersectsTriangle:o}=e;if(r&&o){let h=r;r=(u,f,m,g,b)=>h(u,f,m,g,b)?!0:n(u,f,this,o,m,g,t)}else r||(o?r=(h,u,f,m)=>n(h,u,this,o,f,m,t):r=(h,u,f)=>f);let c=!1,l=0,d=this._roots;for(let h=0,u=d.length;h<u;h++){let f=d[h];if(c=bm(this,h,s,r,i,l),c)break;l+=f.byteLength}return un.releasePrimitive(t),c}bvhcast(e,t,n){let{intersectsRanges:i,intersectsTriangles:s}=n,r=un.getPrimitive(),o=this.geometry.index,c=this.geometry.attributes.position,l=this.indirect?m=>{let g=this.resolveTriangleIndex(m);ct(r,g*3,o,c)}:m=>{ct(r,m*3,o,c)},d=un.getPrimitive(),h=e.geometry.index,u=e.geometry.attributes.position,f=e.indirect?m=>{let g=e.resolveTriangleIndex(m);ct(d,g*3,h,u)}:m=>{ct(d,m*3,h,u)};if(s){let m=(g,b,p,x,y,v,_,w)=>{for(let T=p,I=p+x;T<I;T++){f(T),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let M=g,S=g+b;M<S;M++)if(l(M),r.needsUpdate=!0,s(r,d,M,T,y,v,_,w))return!0}return!1};if(i){let g=i;i=function(b,p,x,y,v,_,w,T){return g(b,p,x,y,v,_,w,T)?!0:m(b,p,x,y,v,_,w,T)}}else i=m}return zm(this,e,t,i)}intersectsBox(e,t){return kl.set(e.min,e.max,t),kl.needsUpdate=!0,this.shapecast({intersectsBounds:n=>kl.intersectsBox(n),intersectsTriangle:n=>kl.intersectsTriangle(n)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},i={},s=0,r=1/0){return(this.indirect?Bm:Dm)(this,e,t,n,i,s,r)}closestPointToPoint(e,t={},n=0,i=1/0){return gm(this,e,t,n,i)}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(n=>{ot(0,new Float32Array(n),jm),e.union(jm)}),e}};function Cu(a,e,t){return a===null?null:(a.point.applyMatrix4(e.matrixWorld),a.distance=a.point.distanceTo(t.ray.origin),a.object=e,a)}var L1=parseInt("180")>=166,Nl=new ni,Vm=new C,Gm=new de,J_=ze.prototype.raycast,Y_=fr.prototype.raycast,Hm=new C,Wt=new ze,Ul=[];function Wm(a,e){this.isBatchedMesh?Z_.call(this,a,e):Q_.call(this,a,e)}function Z_(a,e){if(this.boundsTrees){let t=this.boundsTrees,n=this._drawInfo||this._instanceInfo,i=this._drawRanges||this._geometryInfo,s=this.matrixWorld;Wt.material=this.material,Wt.geometry=this.geometry;let r=Wt.geometry.boundsTree,o=Wt.geometry.drawRange;Wt.geometry.boundingSphere===null&&(Wt.geometry.boundingSphere=new yt);for(let c=0,l=n.length;c<l;c++){if(!this.getVisibleAt(c))continue;let d=n[c].geometryIndex;if(Wt.geometry.boundsTree=t[d],this.getMatrixAt(c,Wt.matrixWorld).premultiply(s),!Wt.geometry.boundsTree){this.getBoundingBoxAt(d,Wt.geometry.boundingBox),this.getBoundingSphereAt(d,Wt.geometry.boundingSphere);let h=i[d];Wt.geometry.setDrawRange(h.start,h.count)}Wt.raycast(a,Ul);for(let h=0,u=Ul.length;h<u;h++){let f=Ul[h];f.object=this,f.batchId=c,e.push(f)}Ul.length=0}Wt.geometry.boundsTree=r,Wt.geometry.drawRange=o,Wt.material=null,Wt.geometry=null}else Y_.call(this,a,e)}function Q_(a,e){if(this.geometry.boundsTree){if(this.material===void 0)return;Gm.copy(this.matrixWorld).invert(),Nl.copy(a.ray).applyMatrix4(Gm),Hm.setFromMatrixScale(this.matrixWorld),Vm.copy(Nl.direction).multiply(Hm);let t=Vm.length(),n=a.near/t,i=a.far/t,s=this.geometry.boundsTree;if(a.firstHitOnly===!0){let r=Cu(s.raycastFirst(Nl,this.material,n,i),this,a);r&&e.push(r)}else{let r=s.raycast(Nl,this.material,n,i);for(let o=0,c=r.length;o<c;o++){let l=Cu(r[o],this,a);l&&e.push(l)}}}else J_.call(this,a,e)}var Xm=`

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
`;var z1=`
	${Xm}
	${qm}
`;var ao=[{id:0,key:"carbon",name:"Carbone vivo",detail:"Venature di luce",accent:"#d3936f"},{id:1,key:"cel",name:"Cel studio",detail:"Facce, inchiostro, retino",accent:"#e9cba6"},{id:2,key:"voxel",name:"Voxel noir",detail:"Cubi in risonanza",accent:"#c6b5a5"},{id:3,key:"shards",name:"Frammenti",detail:"Scomposizione ciclica",accent:"#efc7ab"},{id:4,key:"nebula",name:"Nebulosa",detail:"Materia in particelle",accent:"#bdcddd"},{id:5,key:"glitch",name:"Glitch",detail:"Interferenze digitali",accent:"#b0e4e5"},{id:6,key:"hologram",name:"Ologramma",detail:"Scansione luminosa",accent:"#80cad6"},{id:7,key:"blueprint",name:"Blueprint",detail:"Disegno in costruzione",accent:"#7eacdf"},{id:8,key:"contour",name:"Topografia",detail:"Onde di livello",accent:"#dbc9ab"},{id:9,key:"ink",name:"Inchiostro",detail:"Tratti in espansione",accent:"#e4e1d8"},{id:10,key:"liquid",name:"Cromo fluido",detail:"Riflessi in movimento",accent:"#bbc9d8"},{id:11,key:"aurora",name:"Aurora",detail:"Flussi iridescenti",accent:"#b5a5e0"},{id:12,key:"ember",name:"Braci",detail:"Fratture incandescenti",accent:"#ff996b"},{id:13,key:"crystal",name:"Cristallo",detail:"Risonanza prismatica",accent:"#bedde4"},{id:14,key:"xray",name:"Raggi X",detail:"Strutture traslucide",accent:"#9dc8b8"}],Rn=[{id:"overview",name:"Esterno",title:"Lo spazio delle idee.",copy:"Uno studio. Infinite forme.",position:[7.682,5.498,8.664],target:[-.05,1.12,-.55],fov:28},{id:"workspace",name:"Postazioni",title:"Due visioni. Uno studio.",copy:"Idee che si incontrano, ogni giorno.",position:[.37,1.48,-.62],target:[.37,1.12,-2.6],fov:78},{id:"gian",name:"Gian",title:"Workstation Gian",copy:"Dall\u2019intuizione alla forma.",position:[1.25,1.48,-.94],target:[1.42,1.05,-2.4],fov:76},{id:"nuru",name:"Nuru",title:"Workstation Nuru",copy:"Un altro sguardo. Nuove possibilit\xE0.",position:[-.5,1.48,-1.55],target:[-.85,1.05,-2.42],fov:76},{id:"lounge",name:"Salotto",title:"Lasciamo spazio alle idee.",copy:"Le conversazioni migliori iniziano qui.",position:[.45,1.44,-.42],target:[1.57,.62,1.08],fov:78},{id:"project",name:"Progetto",title:"Le idee prendono forma.",copy:"Prove, materia, nuove prospettive.",position:[-.58,1.48,.11],target:[-1.44,1.16,-.93],fov:78},{id:"coffee",name:"Caff\xE8",title:"Una pausa. Un nuovo inizio.",copy:"Anche il prossimo progetto parte da qui.",position:[-2.04,1.48,.37],target:[-2.68,1.03,1.32],fov:78}],Bl=1.48,Iu={ARCHITECTURE:{color:3684410,roughness:.86,metalness:.1},FURNITURE:{color:3421496,roughness:.57,metalness:.32},FOLIAGE:{color:3488819,roughness:.76,metalness:.06},HARDWARE:{color:3422269,roughness:.35,metalness:.66},LIGHTING:{color:3486514,roughness:.38,metalness:.58},SCREEN:{color:1119513,roughness:.2,metalness:.42},POLYMER:{color:2369323,roughness:.48,metalness:.18},TEXTILE:{color:4473157,roughness:.92,metalness:.04}},Km={DYSON:"Dyson",SOFTBOX1:"Softbox",LAMPADA_SALOTTO:"Lampada",LAMPADA_SHELF:"Lampada",LAMPADA_SALE:"Luce bar",LUCI_SOFFITTO:"Luci soffitto",TV_55:"TV",DESK_GIAN:"Postazione Gian",DESK_NURU:"Postazione Nuru",POLTRONA_ONE:"Poltrona",POLTRONA_TWO:"Poltrona",TAVOLO_SALOTTO:"Tavolino",COFFE_MACHINE:"Caff\xE8",BANCO_CAFFE:"Angolo caff\xE8",SHELF:"Libreria",TAVOLO_DISPENSA:"Zona progetto"};function Jm(a){return Km[a]?Km[a]:/DISPLAY|ULTRAWIDE/.test(a)?"Monitor":/CHAIR|SEDIA/.test(a)?"Sedia":/PLANT|PIANTINA/.test(a)?"Pianta":/PC_/.test(a)?"Workstation":/KEYBOARD/.test(a)?"Tastiera":"Dettaglio"}var ki=a=>a*a*a*(a*(a*6-15)+10),Cn=(a,e,t,n)=>a+(e-a)*(1-Math.exp(-t*n));function Ym(a){return-Math.PI*.5*Math.cos(a*Math.PI/18)}function Qm(a,e,t,n=0,i=0){let s=et.clamp(e,0,1),r=Math.max(.1,t),o=a.near,c=a.far,l=2*r*Math.tan(a.fov*Math.PI/360),d=1-s+s*o/r,u=-(1-s+s*c/r+d)/(c-o),f=-d+u*o;a.projectionMatrix.set(2/(l*a.aspect),0,-n*s/r,n*(1-s),0,2/l,-i*s/r,i*(1-s),0,0,u,f,0,0,-s/r,1-s),a.projectionMatrixInverse.copy(a.projectionMatrix).invert(),a.userData.projectionDistance=r,a.userData.perspective=s}var Zm=new C;function $m(a,e,t){a.camera=t,a.ray.origin.set(e.x,e.y,-1).unproject(t),Zm.set(e.x,e.y,1).unproject(t),a.ray.direction.copy(Zm).sub(a.ray.origin).normalize()}function eb(a){return Math.max(1,1.4/a)}var Pu=new C(0,1,0),zl=class{constructor(e){Object.assign(this,e),this.valid=[],this.data.forEach((t,n)=>{t&&this.valid.push(n)})}index(e,t){let n=Math.round((e-this.minX)/this.cell),i=Math.round((t-this.minZ)/this.cell);return n<0||i<0||n>=this.cols||i>=this.rows?-1:i*this.cols+n}point(e,t=Bl){return new C(this.minX+e%this.cols*this.cell,t,this.minZ+Math.floor(e/this.cols)*this.cell)}isFree(e,t){return this.data[this.index(e,t)]===1}nearest(e){let t=1/0,n=this.valid[0];for(let i of this.valid){let s=this.minX+i%this.cols*this.cell,r=this.minZ+Math.floor(i/this.cols)*this.cell,o=(e.x-s)**2+(e.z-r)**2;o<t&&(t=o,n=i)}return this.point(n,e.y)}lineFree(e,t){let n=Math.ceil(e.distanceTo(t)/(this.cell*.4));for(let i=0;i<=n;i++){let s=n?i/n:0;if(!this.isFree(et.lerp(e.x,t.x,s),et.lerp(e.z,t.z,s)))return!1}return!0}path(e,t){let n=this.index(e.x,e.z),i=this.index(t.x,t.z);if(n<0||i<0||!this.data[n]||!this.data[i])return[];if(this.lineFree(e,t))return[e.clone(),t.clone()];let s=[n],r=new Int32Array(this.data.length).fill(-1),o=new Float32Array(this.data.length).fill(1/0),c=new Uint8Array(this.data.length);o[n]=0;let l=f=>Math.hypot(f%this.cols-i%this.cols,Math.floor(f/this.cols)-Math.floor(i/this.cols)),d=!1;for(;s.length;){let f=0;for(let p=1;p<s.length;p++)o[s[p]]+l(s[p])<o[s[f]]+l(s[f])&&(f=p);let m=s.splice(f,1)[0];if(m===i){d=!0;break}if(c[m])continue;c[m]=1;let g=m%this.cols,b=Math.floor(m/this.cols);for(let[p,x]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){let y=g+p,v=b+x,_=v*this.cols+y;if(y<0||v<0||y>=this.cols||v>=this.rows||!this.data[_]||c[_]||p&&x&&(!this.data[b*this.cols+y]||!this.data[v*this.cols+g]))continue;let w=o[m]+Math.hypot(p,x);w<o[_]&&(o[_]=w,r[_]=m,s.push(_))}}if(!d)return[];let h=[];for(let f=i;f!==-1&&(h.push(this.point(f,e.y)),f!==n);f=r[f]);h.reverse(),h[0]=e.clone(),h[h.length-1]=t.clone();let u=[h[0]];for(let f=0;f<h.length-1;){let m=h.length-1;for(;m>f+1&&!this.lineFree(h[f],h[m]);)m--;u.push(h[m]),f=m}return u}move(e,t,n){let i=e.clone(),s=Math.max(1,Math.ceil(Math.hypot(t,n)/(this.cell*.4)));for(let r=0;r<s;r++){let o=i.x+t/s,c=i.z+n/s;this.isFree(o,c)?(i.x=o,i.z=c):(this.isFree(o,i.z)&&(i.x=o),this.isFree(i.x,c)&&(i.z=c))}return i}};function Ol(a,e,t){return a.isFree(e,t)||t>1.03&&t<2.65&&e>.4&&e<.78||t>=2.25&&t<6.2&&Math.abs(e)<4.6}function tb(a,e,t,n){let i=e.clone(),s=Math.max(1,Math.ceil(Math.hypot(t,n)/.035));for(let r=0;r<s;r++){let o=i.x+t/s,c=i.z+n/s;Ol(a,o,c)?(i.x=o,i.z=c):(Ol(a,o,i.z)&&(i.x=o),Ol(a,i.x,c)&&(i.z=c))}return i}function so(a,e=null){let t=a.filter((s,r)=>!r||s.distanceTo(a[r-1])>1e-4);if(t.length<2)return t;if(t.length===2){let[s,r]=t,o=r.clone().sub(s),c=s.clone().lerp(r,.5),l=new C(-o.z,0,o.x).normalize().multiplyScalar(Math.min(.28,o.length()*.14));c.add(l),(!e||e.lineFree(s,c)&&e.lineFree(c,r))&&t.splice(1,0,c)}let n=new vr(t,!1,"centripetal").getPoints(Math.max(80,t.length*32));if(!e||n.every((s,r)=>e.isFree(s.x,s.z)&&(!r||e.lineFree(n[r-1],s))))return n;let i=[t[0].clone()];for(let s=1;s<t.length-1;s++){let r=t[s-1],o=t[s],c=t[s+1],l=Math.min(.85,r.distanceTo(o)*.42,o.distanceTo(c)*.42),d=[o.clone()];for(let h=0;h<8;h++){let u=o.clone().lerp(r,l/Math.max(1e-4,o.distanceTo(r))),f=o.clone().lerp(c,l/Math.max(1e-4,o.distanceTo(c))),m=new yr(u,o,f).getPoints(20);if(m.every((g,b)=>e.isFree(g.x,g.z)&&(!b||e.lineFree(m[b-1],g)))){d=m;break}l*=.5}i.push(...d)}return i.push(t.at(-1).clone()),i}function eM(a){return a.slice(1).reduce((e,t,n)=>e+t.distanceTo(a[n]),0)}var jl=class{constructor(e,t,{onChange:n=()=>{},onFocus:i=()=>{}}={}){this.camera=e,this.grid=t,this.onChange=n,this.onFocus=i,this.state="exterior",this.view=0,this.focus=null,this.transition=null,this.keys=new Set,this.touchMove=new re,this.yaw=0,this.pitch=0,this.targetYaw=0,this.targetPitch=0,this.orbit=new Fr,this.orbitTarget=new re,this.center=new C(...Rn[0].target),this.position=new C(...Rn[0].position),this.quaternion=new on,this.lookAt(this.center),this.frameFactor=1,this.syncOrbit(),this.fov=Rn[0].fov,this.perspective=0,this.shell=0,this.focusAmount=0,this.focusDistance=2,this.focusRange=.12,this.saved=null,this.idle=0}lookAt(e){this.quaternion.setFromRotationMatrix(new de().lookAt(this.position,e,Pu)),this.syncAngles()}syncAngles(){let e=new cn().setFromQuaternion(this.quaternion,"YXZ");this.yaw=this.targetYaw=e.y,this.pitch=this.targetPitch=e.x}syncOrbit(){this.orbit.setFromVector3(this.position.clone().sub(this.center)),this.orbitTarget.set(this.orbit.theta,this.orbit.phi),this.radius=this.targetRadius=this.orbit.radius/this.frameFactor}cancelTransition(){this.transition&&(this.transition=null,(this.state==="entering"||this.state==="leaving")&&(this.grid.isFree(this.position.x,this.position.z)&&this.position.y<1.9?this.state="interior":Ol(this.grid,this.position.x,this.position.z)&&this.position.y<1.9?this.state="walk-exterior":(this.state="exterior",this.syncOrbit())),this.syncAngles(),this.view=this.state==="exterior"?0:-1,this.onChange(this))}start(e,t,{duration:n=2.6,fov:i=78,index:s,finish:r,focus:o=!1,perspective:c=s===0?0:1}={}){let l=e.slice(1).map((d,h)=>d.distanceTo(e[h]));this.transition={elapsed:0,duration:n,route:e,lengths:l,total:l.reduce((d,h)=>d+h,0),fromQ:this.quaternion.clone(),toQ:new on().setFromRotationMatrix(new de().lookAt(e.at(-1),t,Pu)),fromFov:this.fov,toFov:i,fromPerspective:this.perspective,toPerspective:c,index:s,finish:r,focus:o},this.keys.clear(),this.touchMove.set(0,0),this.onChange(this)}go(e,{instant:t=!1}={}){if(!Rn[e])return!1;this.focus&&this.clearFocus(!1);let n=Rn[e],i=new C(...n.target),s=new C(...n.position),r=this.position.clone(),o=this.grid.isFree(r.x,r.z)&&r.y<2;this.view=e,this.focusAmount=0;let c,l=this.camera.aspect<.75,d=l&&e>0?Math.min(100,n.fov+18):n.fov;if(l&&e===1&&s.set(.32,1.6,.4),e===0){s.sub(this.center).multiplyScalar(this.frameFactor).add(this.center);let h=o?[r,new C(.6,2.15,2.6),new C(3.2,4.4,5.6),s]:[r,r.clone().lerp(s,.5).add(new C(.7,.4,.4)),s];c=so(h),this.state="leaving"}else{s.copy(this.grid.nearest(s));let h=this.grid.nearest(new C(.56,Bl,1));if(o)c=so(this.grid.path(this.grid.nearest(r),s),this.grid),this.state="interior";else{let u=this.grid.path(h,s);c=so([r,new C(1.7,2.9,4),new C(.6,1.65,2.3),h,...u.slice(1)]),this.state="entering"}}return c?.length?(this.start(c,i,{duration:t?0:e===0||!o?3.7:et.clamp(eM(c)/.75,2.2,3.7),fov:d,index:e,finish:e===0?"exterior":"interior"}),!0):(this.onChange(this),!1)}focusObject(e){if(this.focus?.uuid===e.uuid){this.clearFocus();return}let t=new Ke().setFromObject(e),n=t.getSize(new C),i=t.getCenter(new C);if(n.length()>6)return;this.focus||(this.saved={position:this.position.clone(),quaternion:this.quaternion.clone(),fov:this.fov,perspective:this.perspective,view:this.view,state:this.state==="entering"?"interior":this.state==="leaving"?"exterior":this.state}),this.focus=e;let s=this.position.clone().sub(i).normalize(),r=et.clamp(n.length()*.46,.07,1.1),o=et.clamp(r*2.6,.46,2),c=i.clone().addScaledVector(s,o);c.y=et.clamp(c.y,.5,2.15);let l=this.state==="interior";if(l){let h=this.grid.nearest(c);c.x=h.x,c.z=h.z}let d=l?this.grid.path(this.grid.nearest(this.position),this.grid.nearest(c)):[this.position.clone(),c];d.length||(d=[this.position.clone(),this.position.clone()]),d[0]=this.position.clone(),d[d.length-1]=c,this.state=l?"interior":"focus-exterior",this.focusRange=et.clamp(n.length()*.19,.035,.35),this.focusPoint=i,this.start(so(d,l?this.grid:null),i,{duration:2.05,fov:45,focus:!0}),this.onFocus(e)}clearFocus(e=!0){if(!this.focus)return;let t=this.saved;if(this.focus=null,this.saved=null,this.onFocus(null),!!t){if(this.state=t.state,this.view=t.view,e){let n=t.state==="interior",i=n?this.grid.path(this.grid.nearest(this.position),this.grid.nearest(t.position)):[this.position.clone(),t.position];i.length||(i=[this.position.clone(),t.position]),i[0]=this.position.clone(),i[i.length-1]=t.position;let s=t.position.clone().add(new C(0,0,-2).applyQuaternion(t.quaternion));this.start(so(i,n?this.grid:null),s,{duration:1.8,fov:t.fov,perspective:t.perspective,index:t.view,finish:t.state})}else this.transition=null,this.fov=t.fov,this.state==="exterior"&&this.syncOrbit(),this.syncAngles();this.onChange(this)}}exit(){this.go(0)}drag(e,t){this.focus&&this.clearFocus(!1),this.transition&&this.cancelTransition(),this.idle=0,this.state==="exterior"?(this.orbitTarget.x-=e*.004,this.orbitTarget.y=et.clamp(this.orbitTarget.y-t*.0035,.38,1.43)):(this.targetYaw-=e*.0027,this.targetPitch=et.clamp(this.targetPitch-t*.0025,-1.02,1.1),this.view=-1),this.onChange(this)}zoom(e){if(this.focus){e>0&&this.clearFocus();return}if(this.transition&&this.cancelTransition(),this.state==="exterior")this.targetRadius=et.clamp(this.targetRadius*Math.exp(e*7e-4),5,19),e<0&&this.targetRadius<=5.05&&this.go(1);else{let t=new C(0,0,e*.0018).applyQuaternion(this.quaternion);this.position.copy(tb(this.grid,this.position,t.x,t.z)),this.walkState(),e>0&&this.position.z>3.6&&this.go(0),this.view=-1,this.onChange(this)}}walkState(){this.focus||(this.state=this.position.z>1.13?"walk-exterior":"interior")}update(e,t=!1,n=e){let i=!1;if(this.idle+=e,this.transition){let c=this.transition;c.elapsed+=n;let l=c.duration?Math.min(1,c.elapsed/c.duration):1,d=t?1:ki(l),h=d*c.total,u=0;for(;u<c.lengths.length-1&&h>c.lengths[u];)h-=c.lengths[u],u++;c.route.length>1?this.position.lerpVectors(c.route[u],c.route[u+1],c.lengths[u]?h/c.lengths[u]:1):this.position.copy(c.route[0]),this.quaternion.slerpQuaternions(c.fromQ,c.toQ,t?1:ki(Math.min(1,l*1.05))),this.fov=et.lerp(c.fromFov,c.toFov,d),this.perspective=et.lerp(c.fromPerspective,c.toPerspective,d),this.syncAngles(),i=!0,(l===1||t)&&(c.finish&&(this.state=c.finish),this.state==="exterior"&&this.syncOrbit(),this.transition=null,this.onChange(this))}else if(!this.focus)if(this.state==="exterior")this.orbit.theta=Cn(this.orbit.theta,this.orbitTarget.x,6,n),this.orbit.phi=Cn(this.orbit.phi,this.orbitTarget.y,6,n),this.radius=Cn(this.radius,this.targetRadius,6,n),this.orbit.radius=this.radius*this.frameFactor,this.position.setFromSpherical(this.orbit).add(this.center),this.quaternion.setFromRotationMatrix(new de().lookAt(this.position,this.center,Pu));else{this.yaw=Cn(this.yaw,this.targetYaw,9,n),this.pitch=Cn(this.pitch,this.targetPitch,9,n),this.quaternion.setFromEuler(new cn(this.pitch,this.yaw,0,"YXZ"));let c=(this.keys.has("KeyW")||this.keys.has("ArrowUp")?1:0)-(this.keys.has("KeyS")||this.keys.has("ArrowDown")?1:0)-this.touchMove.y,l=(this.keys.has("KeyD")||this.keys.has("ArrowRight")?1:0)-(this.keys.has("KeyA")||this.keys.has("ArrowLeft")?1:0)+this.touchMove.x;if(c||l){let d=(this.keys.has("ShiftLeft")?1.7:1)*e/Math.max(1,Math.hypot(c,l));this.position.copy(tb(this.grid,this.position,(-Math.sin(this.yaw)*c+Math.cos(this.yaw)*l)*d,(-Math.cos(this.yaw)*c-Math.sin(this.yaw)*l)*d)),this.position.y=Cn(this.position.y,Bl,5,n),this.walkState(),this.view=-1,i=!0,this.onChange(this)}}let s=this.position.y<2.35&&this.position.z<1.2&&this.grid.isFree(this.position.x,this.position.z)&&this.state!=="exterior"&&this.state!=="focus-exterior";this.shell=Cn(this.shell,s?1:0,t?100:2.3,n),this.focusAmount=Cn(this.focusAmount,this.focus?1:0,t?100:4,n),this.focusPoint&&this.focus&&(this.focusDistance=Math.max(.1,this.focusPoint.clone().sub(this.position).dot(new C(0,0,-1).applyQuaternion(this.quaternion)))),this.camera.position.copy(this.position),this.camera.quaternion.copy(this.quaternion),this.camera.fov=this.fov;let r=1-this.perspective,o=(this.camera.aspect>1.3?et.clamp(.94-1.31/this.camera.aspect,0,.14):0)*r;return Qm(this.camera,this.perspective,this.position.distanceTo(this.center),o,this.camera.aspect<.75?.2*r:0),this.camera.updateMatrixWorld(),i}};var ka=`
float hash31(vec3 p){p=fract(p*.1031);p+=dot(p,p.yzx+33.33);return fract((p.x+p.y)*p.z);}
float noise3(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);return mix(mix(mix(hash31(i),hash31(i+vec3(1,0,0)),f.x),mix(hash31(i+vec3(0,1,0)),hash31(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash31(i+vec3(0,0,1)),hash31(i+vec3(1,0,1)),f.x),mix(hash31(i+vec3(0,1,1)),hash31(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){return noise3(p)*.57+noise3(p*2.13)*.28+noise3(p*4.37)*.15;}
float isStyle(float a,float b){return 1.-step(.2,abs(a-b));}
`,tM=`
uniform float uTime,uStyleFrom,uStyleTo,uStyleMix,uShellObject;
attribute vec3 aShardCenter,aBary;varying vec3 vStudio,vStudioNormal,vBary;varying float vShard;
${ka}
vec3 deform(float id,vec3 p,vec3 n,vec3 center){
 float t=uTime,seed=hash31(floor(center*4.));
 if(id>2.5&&id<3.5){float wave=pow(.5+.5*sin(t*.73+length(center.xz)*1.4+center.y*1.7),4.);vec3 dir=normalize(center-vec3(0.,1.,-.5)+n*.5);p=mix(p,center,.08*wave)+dir*wave*(.11+seed*.14);}
 if(id>4.5&&id<5.5){float event=smoothstep(.91,.99,sin(t*1.65));float slab=floor(p.y*14.);p.x+=(hash31(vec3(slab,floor(t*7.),0.))-.5)*event*.19;p.z+=sin(slab*7.)*event*.035;}
 if(id>10.5&&id<11.5)p+=n*sin(p.y*3.+t*.7+p.x)*.014;
 if(id>12.5&&id<13.5)p+=(p-center)*sin(t*.7+seed*6.28)*.04+n*pow(.5+.5*sin(t*.85+center.y*3.),5.)*.025;
 return p;}
`,nM=`
uniform float uTime,uReveal,uStyleFrom,uStyleTo,uStyleMix,uShell,uShellObject,uContact,uRadius,uTravel,uFixture,uFixtureKind,uScreenBase,uDay,uDayPulse;
uniform vec3 uCursor,uObjectMin,uObjectMax;
varying vec3 vStudio,vStudioNormal,vBary;varying float vShard;
${ka}
float revealField(vec3 p){return clamp(length((p.xz-vec2(.25,-.8))*vec2(.75,1.))*.127+p.y*.075,0.,.88);}
struct Surface{vec3 color;float rough;float metal;float facet;float alpha;vec3 emission;};
Surface surface(float id,vec3 base,float rough,float metal,vec3 p,vec3 n,float rim,float wire){
 Surface s;s.color=base;s.rough=rough;s.metal=metal;s.facet=0.;s.alpha=1.;s.emission=vec3(0.);float t=uTime;
 float grain=noise3(p*115.),cloud=fbm(p*3.6),flow=fbm(p*2.+vec3(0.,t*.16,t*.08));vec3 warm=vec3(1.,.27,.085);
 if(id<.5){float veins=pow(1.-abs(sin(p.y*6.+p.x*3.+flow*12.)),22.);float pulse=pow(.5+.5*sin(t*.6-length(p.xz)*1.5),3.);s.color*=.88+cloud*.25;s.rough=clamp(rough+(grain-.5)*.07,.18,1.);s.emission=warm*veins*(.018+pulse*.13)+warm*rim*.025;}
 else if(id<1.5){s.color=mix(base*3.,vec3(.45,.36,.24),.35);s.rough=1.;s.metal=0.;s.facet=1.;float hatch=step(.73,fract((p.x+p.z+p.y)*42.+sin(t*.6)*.35));s.color*=1.-hatch*.18;float sweep=pow(.5+.5*sin(p.y*2.-t*.65),8.);s.emission=vec3(.09,.065,.03)*sweep;}
 else if(id<2.5){s.color=vec3(.045,.052,.06);s.rough=.83;s.metal=.12;s.alpha=0.;s.emission=vec3(.012,.016,.02);}
 else if(id<3.5){float h=vShard;s.color=mix(vec3(.055,.075,.095),vec3(.20,.18,.15),h);s.facet=1.;s.metal=.55;s.rough=.29;float pulse=pow(.5+.5*sin(t*.73+length(p.xz)*1.4+p.y*1.7),4.);s.emission=vec3(.65,.73,.85)*wire*(.035+pulse*.35);}
 else if(id<4.5){s.color=vec3(.012,.021,.03);s.metal=.1;s.rough=.8;s.alpha=0.;s.emission=vec3(.08,.17,.23)*rim*.2;}
 else if(id<5.5){float slab=floor(p.y*24.);float event=smoothstep(.85,.99,sin(t*1.65));float scan=step(.94,fract(p.y*35.-t*.12));s.color=base*.8;float split=hash31(vec3(slab,floor(t*7.),2.));s.emission=mix(vec3(.1,.8,.9),vec3(1.,.2,.25),split)*event*step(.68,split)*.8+vec3(.07,.11,.13)*scan;}
 else if(id<6.5){float scan=pow(.5+.5*sin(p.y*150.-t*2.),18.);float head=exp(-pow(p.y-mod(t*.30,3.2),2.)*120.);s.color=vec3(.004,.015,.023);s.metal=.2;s.rough=.65;s.alpha=.42+scan*.4;s.emission=vec3(.08,.60,.8)*(rim*.8+scan*.24+head*.9+wire*.06);}
 else if(id<7.5){float plot=1.-smoothstep(.0,.055,abs(fract((p.x+p.y+p.z)*.65-t*.14)-.5));vec2 uv=p.xz+p.yy;vec2 q=abs(fract(uv*12.)-.5);float grid=step(.485,max(q.x,q.y));s.color=vec3(.005,.018,.07);s.metal=0.;s.rough=1.;s.emission=vec3(.19,.42,.90)*(wire*.5+rim*.7+grid*.075+plot*.45);}
 else if(id<8.5){float contour=pow(.5+.5*sin((p.y+flow*.13)*80.-t*.9),16.);s.color=vec3(.065,.072,.075);s.metal=.25;s.rough=.65;s.emission=vec3(.75,.60,.40)*contour*(.23+.35*flow)+vec3(.12,.15,.17)*rim;}
 else if(id<9.5){float ink=pow(1.-abs(sin((p.x+p.y+p.z)*4.+flow*8.)),18.)*.85;ink+=smoothstep(.60,.85,fbm(p*3.+vec3(t*.13,0.,t*.05)))*.3;float hatch=step(.73,fract((p.x+p.y+p.z)*65.));s.color=mix(vec3(.64,.59,.48),vec3(.012,.018,.022),ink);s.color*=1.-hatch*.25;s.rough=1.;s.metal=0.;s.facet=.7;s.emission=vec3(.04,.032,.02)*(1.-ink);}
 else if(id<10.5){float ribbon=.5+.5*sin(p.x*4.+p.y*5.+flow*9.-t*.48);s.color=mix(vec3(.14,.19,.23),vec3(.76,.82,.88),ribbon);s.metal=1.;s.rough=.07+.12*cloud;s.emission=vec3(.035,.055,.08)*pow(ribbon,12.);}
 else if(id<11.5){vec3 spectrum=.5+.5*cos(vec3(0.,2.1,4.2)+p.y*2.+flow*5.+t*.35+rim*3.);s.color=.04+spectrum*.2;s.metal=.65;s.rough=.23;s.emission=spectrum*(.18+rim*.55)*(.5+.5*sin(p.x*2.+p.z*2.-t*.6));}
 else if(id<12.5){vec3 an=abs(n);vec2 uv=(an.y>.55?p.xz:an.x>.55?p.zy:p.xy)*5.;vec2 cell=floor(uv),f=fract(uv);float d1=9.,d2=9.;for(int ix=-1;ix<=1;ix++)for(int iy=-1;iy<=1;iy++){vec2 g=vec2(float(ix),float(iy));vec2 offset=vec2(hash31(vec3(cell+g,1.)),hash31(vec3(cell+g,4.)));vec2 q=g+offset-f;float dist=dot(q,q);if(dist<d1){d2=d1;d1=dist;}else d2=min(d2,dist);}float edge=sqrt(d2)-sqrt(d1);float cracks=1.-smoothstep(.01,.045+flow*.025,edge);float heat=pow(.5+.5*sin(t*.9+flow*7.+p.y*1.8),3.);s.color=vec3(.025,.019,.016);s.rough=.86;s.metal=.12;s.emission=warm*cracks*(.06+heat*1.9)+warm*rim*.05;}
 else if(id<13.5){float crystal=vShard*.55+noise3(p*1.7)*.45;s.color=mix(vec3(.035,.10,.15),vec3(.24,.40,.49),crystal);s.metal=.62;s.rough=.13;s.facet=1.;float resonance=pow(.5+.5*sin(t*.85+p.y*3.+p.x),6.);s.emission=vec3(.25,.65,.75)*(wire*.28+rim*.28)*(.3+resonance);}
 else{float scan=pow(.5+.5*sin(length(p-vec3(0.,1.,-.5))*9.-t*1.1),18.);s.color=vec3(.006,.018,.015);s.metal=0.;s.rough=.7;s.alpha=.06+rim*.36+wire*.12;s.emission=vec3(.30,.85,.66)*(rim*.85+wire*.22+scan*.18);}
 return s;}
`;function nb(){return{uPerspective:{value:0},uProjectionDistance:{value:12},uTime:{value:0},uReveal:{value:0},uStyleFrom:{value:0},uStyleTo:{value:0},uStyleMix:{value:1},uShell:{value:0},uCursor:{value:new C(99,99,99)},uContact:{value:0},uRadius:{value:.55},uTravel:{value:0},uDay:{value:0},uDayPulse:{value:0}}}var Vl=class{constructor(e){this.u=e,this.materials=[],this.from=0,this.to=0,this.progress=1,this.queued=null,this.selected=0}create(e,{shell:t=!1,fixtureKind:n=0,bounds:i=null,screenBase:s=.24}={}){let r=Iu[e]||Iu.FURNITURE,o=new kn({...r,vertexColors:!0,side:e==="FOLIAGE"||t?Ot:$t,envMapIntensity:e==="HARDWARE"?1.1:e==="SCREEN"?.2:e==="ARCHITECTURE"?.4:.8,transparent:t,depthWrite:!t});o.name=e;let c={uShellObject:{value:t?1:0},uFixture:{value:0},uFixtureKind:{value:n},uScreenBase:{value:s},uObjectMin:{value:i?.min.clone()||new C},uObjectMax:{value:i?.max.clone()||new C(1,1,1)}};return o.userData.local=c,o.onBeforeCompile=l=>{Object.assign(l.uniforms,this.u,c),l.vertexShader=tM+`
`+l.vertexShader,l.vertexShader=l.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 vStudio=(modelMatrix*vec4(position,1.)).xyz;vStudioNormal=normalize(mat3(modelMatrix)*normal);vBary=aBary;vShard=hash31(floor(aShardCenter*4.));
 vec3 oldP=deform(uStyleFrom,transformed,normal,aShardCenter),newP=deform(uStyleTo,transformed,normal,aShardCenter);
 transformed=mix(oldP,newP,uStyleMix);
 `),l.fragmentShader=nM+`
`+l.fragmentShader,l.fragmentShader=l.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
 float field=revealField(vStudio);float coverage=smoothstep(field-.07,field+.09,uReveal*1.1);if(coverage<hash31(floor(vStudio*180.)))discard;
 float heat=exp(-dot(vStudio-uCursor,vStudio-uCursor)/(uRadius*uRadius))*uContact;
 float styleBlend=smoothstep(field*.20,field*.20+.80,uStyleMix);
 vec3 wn=normalize(vStudioNormal);vec3 eye=normalize(cameraPosition-vStudio);float rim=pow(1.-abs(dot(wn,eye)),3.);
 vec3 d=fwidth(vBary);vec3 bary=smoothstep(vec3(0.),d*1.0,vBary);float detailFade=1.-smoothstep(.08,.28,max(max(d.x,d.y),d.z));float meshWire=(1.-min(min(bary.x,bary.y),bary.z))*detailFade;
 Surface next=surface(uStyleTo,diffuse,roughness,metalness,vStudio,wn,rim,meshWire);Surface previous=next;if(uStyleMix<.999&&abs(uStyleFrom-uStyleTo)>.2)previous=surface(uStyleFrom,diffuse,roughness,metalness,vStudio,wn,rim,meshWire);
 float alphaFX=mix(previous.alpha,next.alpha,styleBlend);if(uFixtureKind<.5&&alphaFX<.002)discard;
 float styleFacet=mix(previous.facet,next.facet,styleBlend);
 `),l.fragmentShader=l.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
 vec3 vertexAO=diffuseColor.rgb/max(diffuse,vec3(.0001));diffuseColor.rgb=mix(previous.color,next.color,styleBlend)*vertexAO;
 diffuseColor.a*=mix(1.,uShell,uShellObject)*mix(alphaFX,1.,step(.5,uFixtureKind));
 `),l.fragmentShader=l.fragmentShader.replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
roughnessFactor=mix(previous.rough,next.rough,styleBlend);`),l.fragmentShader=l.fragmentShader.replace("#include <metalnessmap_fragment>",`#include <metalnessmap_fragment>
metalnessFactor=mix(previous.metal,next.metal,styleBlend);`),l.fragmentShader=l.fragmentShader.replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
 vec3 facetNormal=normalize(cross(dFdx(-vViewPosition),dFdy(-vViewPosition)));normal=normalize(mix(normal,facetNormal,styleFacet));
 float liquid=mix(isStyle(uStyleFrom,10.),isStyle(uStyleTo,10.),styleBlend);
 normal=normalize(normal+vec3(sin(vStudio.y*13.+uTime*.7),cos(vStudio.x*12.-uTime*.6),sin(vStudio.z*11.+uTime*.5))*.16*liquid);
 `),l.fragmentShader=l.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
 vec3 amber=vec3(1.,.25,.075);vec3 worldNormal=normalize(vStudioNormal);float fresnel=pow(1.-abs(dot(normal,normalize(vViewPosition))),3.);
 vec3 absN=abs(worldNormal);vec2 planar=absN.y>.55?vStudio.xz:absN.x>.55?vStudio.zy:vStudio.xy;planar+=vec2(noise3(vec3(planar*2.8,2.1)),noise3(vec3(planar*2.8,7.4)))*.12;
 vec2 cell=fract(planar*7.);float edge=min(min(min(cell.x,1.-cell.x),min(cell.y,1.-cell.y)),abs(cell.x-cell.y)*.707);float wire=1.-smoothstep(0.,max(.012,fwidth(edge)*1.15),edge);
 float revealBand=(1.-smoothstep(.0,.08,abs(field-uReveal*1.1)))*(1.-step(.99,uReveal));float changeBand=sin(uStyleMix*3.14159)*(1.-smoothstep(.0,.12,abs(field-uStyleMix)));
 totalEmissiveRadiance+=mix(previous.emission,next.emission,styleBlend);
 totalEmissiveRadiance+=amber*(heat*(fresnel*.8+wire*.18)+(revealBand*.6+changeBand*.6)*(wire*.5+fresnel*.5));
 totalEmissiveRadiance+=vec3(1.,.38,.12)*uDayPulse*(fresnel*.14+wire*.025);
 if(uFixtureKind>1.5&&uFixtureKind<2.5){vec3 uvw=(vStudio-uObjectMin)/max(uObjectMax-uObjectMin,vec3(.001));float front=smoothstep(.25,.78,worldNormal.z);float border=smoothstep(.015,.035,uvw.x)*(1.-smoothstep(.965,.99,uvw.x))*smoothstep(uScreenBase,uScreenBase+.02,uvw.y)*(1.-smoothstep(.975,.995,uvw.y));float wave=.53+sin(uvw.x*5.+uTime*.15)*.12;float band=exp(-abs(uvw.y-wave)*35.);vec3 screen=vec3(.016,.026,.035)+vec3(.80,.26,.08)*band+vec3(.20,.36,.43)*pow(.5+.5*sin(uvw.x*5.-uvw.y*4.+uTime*.12),8.)*.24;totalEmissiveRadiance+=screen*front*border*uFixture*2.6;}
 if(uFixtureKind>.5&&uFixtureKind<1.5){float down=smoothstep(0.,.55,-worldNormal.y);float height=(vStudio.y-uObjectMin.y)/max(.001,uObjectMax.y-uObjectMin.y);totalEmissiveRadiance+=vec3(1.8,.85,.30)*uFixture*down*smoothstep(.65,.74,height);}
 if(uFixtureKind>2.5&&uFixtureKind<3.5)totalEmissiveRadiance+=vec3(2.4,1.3,.55)*uFixture;
 if(uFixtureKind>3.5){float bottom=1.-smoothstep(uObjectMin.y+.05,uObjectMin.y+.17,vStudio.y);totalEmissiveRadiance+=vec3(2.6,2.0,1.25)*uFixture*bottom;}
 `),l.fragmentShader=l.fragmentShader.replace("#include <opaque_fragment>",`float toonWeight=mix(isStyle(uStyleFrom,1.),isStyle(uStyleTo,1.),styleBlend);if(toonWeight>.001){float luminance=dot(outgoingLight,vec3(.2126,.7152,.0722));float band=floor(luminance*4.)/4.;vec3 toon=outgoingLight*(band+.06)/max(luminance,.04);float ink=pow(1.-abs(dot(normal,normalize(vViewPosition))),6.);outgoingLight=mix(outgoingLight,toon*(1.-ink*.85),toonWeight);}
 #include <opaque_fragment>`)},o.customProgramCacheKey=()=>"memento-v4-fx",this.materials.push(o),o}choose(e){if(!(!Number.isInteger(e)||e<0||e>14)){if(this.selected=e,this.progress<1){this.queued=e;return}e!==this.to&&(this.from=this.to,this.to=e,this.progress=0,this.u.uStyleFrom.value=this.from,this.u.uStyleTo.value=this.to)}}update(e,t=!1){if(this.progress<1&&(this.progress=t?1:Math.min(1,this.progress+e/1.8),this.u.uStyleMix.value=ki(this.progress),this.progress===1&&this.queued!==null)){let s=this.queued;this.queued=null,this.choose(s)}let n=[2,4,6,14],i=n.includes(this.to)||this.progress<1&&n.includes(this.from);for(let s of this.materials){let r=!!s.userData.local.uShellObject.value,o=r||i;s.transparent!==o&&(s.transparent=o,s.needsUpdate=!0),s.depthWrite=r?this.u.uShell.value>.985&&!i:!i,r&&(s.visible=this.u.uShell.value>.001)}}};var Du=[["lamps","Lampade"],["shelf","Libreria"],["softbox","Softbox"],["ceiling","Soffitto"],["screens","Monitor"],["tv","TV"]];function ib(a){return a==="TV_55"?{group:"tv",kind:2}:/DISPLAY|ULTRAWIDE|MONITOR/.test(a)&&!/^PARETE/.test(a)?{group:"screens",kind:2}:a==="SOFTBOX1"?{group:"softbox",kind:4}:a==="LUCI_SOFFITTO"?{group:"ceiling",kind:3}:/^LAMPADA_/.test(a)?{group:"lamps",kind:a==="LAMPADA_SALE"?3:1}:null}var Gl=class{constructor(e,t,n){this.scene=e,this.renderer=t,this.day=0,this.dayTarget=0,this.dayFrom=0,this.dayProgress=1,this.dayPulse=0,this.bindings=[],this.sources=[],this.emitters=[],this.lastShadowDay=-1,this.groups=Object.fromEntries(Du.map(([s])=>[s,{target:1,value:1}])),this.hemi=new Er(10927832,2364942,.45),e.add(this.hemi),this.key=new Ci(14476788,1.8),this.key.position.set(-2.5,7,4),this.key.castShadow=!0,this.key.shadow.mapSize.setScalar(n?1024:2048),Object.assign(this.key.shadow.camera,{left:-5,right:5,top:5,bottom:-5,near:.1,far:20}),this.key.shadow.bias=-35e-5,this.key.shadow.normalBias=.018,this.key.shadow.radius=3,e.add(this.key),this.rim=new Ci(16753257,1.4),this.rim.position.set(4,4,-4),e.add(this.rim),this.fill=new Ci(11716835,.45),this.fill.position.set(-4,2,-1),e.add(this.fill);let i=(s,r,o,c,l)=>{let d=new Ai(o,c,l,2);d.position.set(...r),e.add(d),this.sources.push({group:s,light:d,base:c})};i("lamps",[2.055,.9,1.39],16756332,3,3),i("lamps",[-1.86,1.45,-.09],16758647,1.3,2.3),i("lamps",[-.2,1.19,1.79],16750151,.4,1.4),i("shelf",[-1.63,1.15,-.62],16760970,.85,1.7),i("softbox",[-1.05,1.5,-.94],16768954,3.4,3.2),i("ceiling",[-.9,2.48,-1.8],16770510,3.2,4.8),i("ceiling",[1.25,2.48,-1.8],16770510,3.2,4.8),i("ceiling",[.1,2.48,.15],16770510,2,4.2),i("screens",[-.9,1.12,-2.35],10928847,.55,1.6),i("screens",[1.45,1.12,-2.35],10928847,.55,1.6),i("tv",[.37,1.75,-2.78],16762011,.75,1.9)}addEmitter(e,t,n,i,s=3.5){let r=new hn({color:i,side:Ot}),o=new ze(t,r);return o.position.set(...n),o.name=`EMITTER_${e}_${this.emitters.length}`,o.userData.lightGroup=e,this.scene.add(o),this.emitters.push({mesh:o,group:e,power:s,color:new fe(i)}),o}createEmitters(){let e=(t,n,i,s,r)=>{let o=this.addEmitter(t,new gr(i,40),n,s,r);return o.rotation.x=-Math.PI/2,o};e("lamps",[2.055,.943,1.39],.193,16758392,4.2),e("lamps",[2.055,1.193,1.39],.115,16764054,2),e("lamps",[-1.865,1.487,-.094],.105,16761227,3.6),e("softbox",[-1.052,1.573,-.943],.515,16770501,3.2);for(let t of[-.99,-.255])this.addEmitter("shelf",new En(.007,1.73,.007),[-1.727,.91,t],16761230,4.8);for(let t of[.055,.61,1.17,1.79])this.addEmitter("shelf",new En(.007,.007,.735),[-1.727,t,-.622],16761230,4.8)}bind(e,t){t&&(e.userData.lightGroup=t.group,this.bindings.push({material:e.material,...t})),e.name==="SHELF"&&(e.userData.lightGroup="shelf")}toggle(e){this.groups[e]&&(this.groups[e].target=1-this.groups[e].target)}setDay(e){this.dayFrom=this.day,this.dayTarget=e?1:0,this.dayProgress=0}update(e,t,n=!1){this.dayProgress=n?1:Math.min(1,this.dayProgress+e/4.2),this.day=et.lerp(this.dayFrom,this.dayTarget,ki(this.dayProgress)),this.dayPulse=this.dayProgress<1?Math.sin(this.dayProgress*Math.PI)*Math.abs(this.dayTarget-this.dayFrom):0;for(let s of Object.values(this.groups))s.value=Cn(s.value,s.target,n?100:4,e);let i=et.lerp(1,.42,this.day);for(let s of this.bindings)s.material.userData.local.uFixture.value=this.groups[s.group].value*i*(s.kind===3&&s.group==="lamps"?.35:1);for(let s of this.sources)s.light.intensity=s.base*this.groups[s.group].value*(s.group==="ceiling"?t:1)*i;for(let s of this.emitters)s.mesh.material.color.copy(s.color).multiplyScalar(.02+s.power*this.groups[s.group].value*i);this.hemi.intensity=et.lerp(.34,1.5,this.day),this.hemi.color.set(10927832).lerp(new fe(15199985),this.day),this.key.intensity=et.lerp(1.9,3.4,this.day),this.key.position.set(et.lerp(3,-3.5,this.day),et.lerp(4,6.7,this.day),et.lerp(-2,4.5,this.day)),this.key.color.set(11584482).lerp(new fe(16769725),this.day).lerp(new fe(16747850),this.dayPulse*.55),this.rim.intensity=et.lerp(1.45,.6,this.day),this.fill.intensity=et.lerp(.4,.75,this.day),this.renderer.toneMappingExposure=et.lerp(1.02,.98,this.day),this.scene.environmentIntensity=et.lerp(.38,.64,this.day),this.scene.fog&&this.scene.fog.color.set(527638).lerp(new fe(10398640),this.day),(Math.abs(this.day-this.lastShadowDay)>.035||this.dayProgress===1&&this.lastShadowDay!==this.day)&&(this.renderer.shadowMap.needsUpdate=!0,this.lastShadowDay=this.day)}};var iM={uniforms:{inverseProjection:{value:new de},tDiffuse:{value:null},tDepth:{value:null},resolution:{value:new re(1,1)},focusDistance:{value:2},focusRange:{value:.12},amount:{value:0},nearClip:{value:.025},farClip:{value:90},maxRadius:{value:14}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`
 #include <packing>
 varying vec2 vUv;uniform mat4 inverseProjection;uniform sampler2D tDiffuse,tDepth;uniform vec2 resolution;uniform float focusDistance,focusRange,amount,nearClip,farClip,maxRadius;
 float depthAt(vec2 uv){vec4 p=inverseProjection*vec4(uv*2.-1.,textureLod(tDepth,uv,0.).r*2.-1.,1.);return -p.z/p.w;}
 float coc(float z){return min(maxRadius,max(0.,abs(z-focusDistance)-focusRange)/max(z,.1)*maxRadius*2.8)*amount;}
 void main(){float depth=depthAt(vUv);float radius=coc(depth);vec4 center=textureLod(tDiffuse,vUv,0.);if(radius<.3){gl_FragColor=center;return;}vec3 color=center.rgb;float total=1.;
 for(int i=0;i<18;i++){float f=float(i)+.5;float a=f*2.39996323;vec2 off=vec2(cos(a),sin(a))*sqrt(f/18.)*radius/resolution;vec2 uv=clamp(vUv+off,vec2(.001),vec2(.999));float other=depthAt(uv);float weight=other<depth-.15&&coc(other)<radius*.35?.06:1.;color+=textureLod(tDiffuse,uv,0.).rgb*weight;total+=weight;}
 gl_FragColor=vec4(color/total,center.a);}`},Hl=class extends Qi{constructor(){super(iM),this.enabled=!1}render(e,t,n,i,s){this.uniforms.tDepth.value=n.depthTexture,super.render(e,t,n,i,s)}};var aM=`
 uniform float uTime,uReveal,uHeight,uDpr,uStyleFrom,uStyleTo,uStyleMix,uPerspective,uProjectionDistance;uniform vec4 uHits[16],uForces[16];attribute vec3 aNormal;attribute vec2 aSeed;varying float vHeat,vAlpha,vMode;
 ${ka}
 float weight(float id){return mix(isStyle(uStyleFrom,id),isStyle(uStyleTo,id),uStyleMix);}
 void main(){vec3 p=position+aNormal*.007;float field=clamp(length((p.xz-vec2(.25,-.8))*vec2(.75,1.))*.127+p.y*.075,0.,.88);float a=smoothstep(field-.12,field+.06,uReveal*1.1);vec3 dispersion=vec3(sin(aSeed.x*33.),aSeed.y*.6,cos(aSeed.x*31.))*(1.-a)*.62;float heat=0.;
 for(int i=0;i<16;i++){float age=uTime-uHits[i].w;vec3 delta=position-uHits[i].xyz;float influence=exp(-dot(delta,delta)/(uForces[i].w*uForces[i].w+.001));float alive=step(0.,age),life=alive*exp(-age*2.3),force=influence*age*exp(-age*3.3)*alive;dispersion+=(normalize(delta+aNormal*.1+vec3(.001))*.8+uForces[i].xyz*.12)*force;heat+=influence*life;}
 float nebula=weight(4.),ember=weight(12.),holo=weight(6.);float phase=uTime*.65+aSeed.x*6.283;float swell=pow(.5+.5*sin(phase+position.y*2.),4.);
 dispersion+=nebula*(aNormal*swell*.30+vec3(sin(phase+position.z),cos(phase*.77+position.x),cos(phase+position.y))*.075);
 float life=fract(uTime*.16+aSeed.x);dispersion+=ember*(aNormal*life*.08+vec3(sin(life*5.+aSeed.x*22.)*.06,life*life*.48,cos(life*4.)*.03));
 p+=dispersion;vHeat=min(heat,1.6);vMode=nebula+holo*2.+ember*3.;
 float ambient=.012+nebula*(.58+aSeed.y*.35)+holo*.12+ember*sin(life*3.14159)*step(.83,aSeed.y)*.8;
 vAlpha=max(heat*.9,ambient)+(1.-a)*smoothstep(0.,.18,uReveal)*.45;vAlpha*=smoothstep(0.,.12,uReveal);
 vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp((.7+aSeed.y+vHeat*.8+nebula*1.4)*uDpr*uHeight*.015/max(1.,mix(uProjectionDistance,-mv.z,uPerspective)),.65,5.5);}`,sM="uniform float uDay;varying float vHeat,vAlpha,vMode;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;vec3 tint=mix(vec3(.75,.92,1.1),vec3(.018,.045,.07),uDay);if(vMode>2.5)tint=vec3(2.6,.53,.08);else if(vMode>1.5)tint=vec3(.12,.65,.90);gl_FragColor=vec4(mix(tint,vec3(1.8,.40,.10),min(1.,vHeat)),(1.-smoothstep(.12,.5,d))*min(vAlpha,.95));}",rM=`
 uniform float uTime,uStyleFrom,uStyleTo,uStyleMix,uReveal;attribute vec3 aOffset,aSurfaceNormal;attribute float aSeed;varying vec3 vNormal,vLocal,vCenter;varying float vPulse,vAlpha;
 ${ka}
 void main(){float w=mix(isStyle(uStyleFrom,2.),isStyle(uStyleTo,2.),uStyleMix);float pulse=pow(.5+.5*sin(uTime*.78+length(aOffset.xz)*1.6+aOffset.y*2.),5.);vec3 p=position*(.96+pulse*.04)+aOffset+aSurfaceNormal*pulse*.035;vPulse=pulse;vNormal=normal;vLocal=position/.066;vCenter=aOffset;vAlpha=w*smoothstep(0.,.8,uReveal);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,oM=`
 uniform float uDay;varying vec3 vNormal,vLocal,vCenter;varying float vPulse,vAlpha;
 void main(){if(vAlpha<.01)discard;float edge=max(max(abs(vLocal.x),abs(vLocal.y)),abs(vLocal.z));vec3 a=abs(vLocal);float joint=smoothstep(.42,.5,min(max(a.x,a.y),min(max(a.x,a.z),max(a.y,a.z))));float lighting=.22+max(0.,dot(vNormal,normalize(vec3(-.4,.8,.5))))*.75;vec3 color=mix(vec3(.19,.21,.23),vec3(.44,.42,.37),uDay)*lighting;float wave=pow(.5+.5*sin(vCenter.y*8.+vCenter.x*3.-vPulse*5.),12.);color+=vec3(.85,.30,.10)*joint*(.08+vPulse*.42)+vec3(.09,.12,.14)*wave;gl_FragColor=vec4(color,vAlpha);}`;async function ab(a,e,t){let n=await fetch("./assets/surface-v2.bin.gz");if(!n.ok)throw new Error("Surface field unavailable");let i=await n.arrayBuffer(),s=await new Response(new Blob([i]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer(),r=new Float32Array(s),o=t?2:1,c=r.length/8/o,l=new Float32Array(c*3),d=new Float32Array(c*3),h=new Float32Array(c*2);for(let R=0;R<c;R++){let D=R*o*8;l.set(r.subarray(D,D+3),R*3),d.set(r.subarray(D+3,D+6),R*3),h.set(r.subarray(D+6,D+8),R*2)}let u=new wt;u.setAttribute("position",new Je(l,3)),u.setAttribute("aNormal",new Je(d,3)),u.setAttribute("aSeed",new Je(h,2));let f={...e,uHeight:{value:innerHeight},uDpr:{value:1},uHits:{value:Array.from({length:16},()=>new Xe(99,99,99,-100))},uForces:{value:Array.from({length:16},()=>new Xe(0,0,0,.4))}},m=new ut({uniforms:f,vertexShader:aM,fragmentShader:sM,transparent:!0,depthWrite:!1,blending:_i}),g=new ya(u,m);g.frustumCulled=!1,a.add(g);let b=await fetch(`./assets/voxels-v4-${t?"mobile":"desktop"}.bin.gz`);if(!b.ok)throw new Error("Voxel field unavailable");let p=await b.arrayBuffer(),x=new Float32Array(await new Response(new Blob([p]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer()),y=t?.09:.065,v=new En(y,y,y),_=new Cr().copy(v);_.instanceCount=x.length/8;let w=[],T=[],I=[];for(let R=0;R<x.length;R+=8)w.push(x[R],x[R+1],x[R+2]),T.push(x[R+3],x[R+4],x[R+5]),I.push(x[R+6]);_.setAttribute("aOffset",new Ln(new Float32Array(w),3)),_.setAttribute("aSurfaceNormal",new Ln(new Float32Array(T),3)),_.setAttribute("aSeed",new Ln(new Float32Array(I),1));let M=new ze(_,new ut({uniforms:e,vertexShader:rM,fragmentShader:oM,transparent:!0,depthWrite:!0}));M.frustumCulled=!1,M.visible=!1,a.add(M);let S=0;return{mesh:g,voxel:M,u:f,update(){M.visible=e.uStyleFrom.value===2&&e.uStyleMix.value<1||e.uStyleTo.value===2},hit(R,D,L,U){f.uHits.value[S].set(R.x,R.y,R.z,U),f.uForces.value[S].set(D.x,D.y,D.z,L),S=(S+1)%16}}}var Fu={vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,1.,1.);}",fragmentShader:`
 varying vec2 vUv;uniform float uTime,uDay,uDayPulse,uAspect,uTanFov,uInside;uniform vec3 uEye;uniform mat4 uCamera,uInverseProjection;uniform sampler2D uNetwork;
 ${ka}
 float density(vec3 p){float phase=uTime*.104719755;vec3 q=p*.33+vec3(sin(phase)*.5,cos(phase)*.12,cos(phase)*.5);float n=noise3(q)*.68+noise3(q*2.17)*.32;float lower=exp(-pow((p.y+2.4)/2.2,2.));float upper=exp(-pow((p.y-7.8)/2.1,2.))*.64;float horizon=smoothstep(1.2,4.,length(p.xz));return smoothstep(.38,.72,n)*(lower+upper)*horizon;}
 void main(){
 vec2 p=vUv*2.-1.;vec4 nearP=uInverseProjection*vec4(p,-1.,1.),farP=uInverseProjection*vec4(p,1.,1.);vec3 origin=uEye+mat3(uCamera)*(nearP.xyz/nearP.w);vec3 ray=normalize(mat3(uCamera)*(farP.xyz/farP.w-nearP.xyz/nearP.w));
 float elevation=clamp(ray.y*.5+.5,0.,1.);vec3 night=mix(vec3(.017,.024,.035),vec3(.003,.007,.015),elevation);vec3 day=mix(vec3(.42,.48,.50),vec3(.12,.26,.34),elevation);vec3 sky=mix(night,day,uDay);
 vec3 sun=normalize(vec3(-.6,.62,.35));float halo=pow(max(0.,dot(ray,sun)),12.);sky+=mix(vec3(.014,.020,.034),vec3(.44,.29,.14),uDay)*halo;
 vec2 starUv=ray.xz/max(.2,abs(ray.y)+.2)*240.;vec2 st=fract(starUv)-.5;float star=pow(max(0.,1.-length(st)*3.),12.)*step(.995,hash31(vec3(floor(starUv),1.)));sky+=star*vec3(.48,.57,.68)*(1.-uDay)*smoothstep(-.3,.6,ray.y);
 vec3 accum=vec3(0.);float trans=1.;float distance=2.5+hash31(vec3(gl_FragCoord.xy,0.))*.012;
 for(int i=0;i<CLOUD_STEPS;i++){vec3 pos=origin+ray*distance;float d=density(pos);float stepSize=.72+distance*.065;
 if(d>.015){float sunDensity=density(pos+sun*1.5);float shade=clamp(1.-sunDensity*1.8,.18,1.);vec3 moonLight=mix(vec3(.008,.013,.022),vec3(.070,.085,.11),shade);vec3 daylight=mix(vec3(.21,.27,.32),vec3(.88,.78,.61),shade);vec3 light=mix(moonLight,daylight,uDay);light+=vec3(.34,.12,.035)*uDayPulse*(.35+shade*.65);float a=1.-exp(-d*stepSize*.48);accum+=trans*a*light;trans*=1.-a;}
 distance+=stepSize;if(trans<.025)break;}
 vec3 color=sky*trans+accum;float twilight=exp(-pow(p.y+sin(uDay*3.14159)*.2,2.)*4.);color+=vec3(.25,.07,.017)*uDayPulse*twilight;
 vec4 net=texture2D(uNetwork,vUv);color=mix(color,net.rgb,net.a*(1.-uInside*.6));float vignette=1.-smoothstep(.25,1.5,length(p*.78));color*=.78+vignette*.22;
 gl_FragColor=vec4(color,1.);
 }`};function cM(a){let e=a;return()=>(e=Math.imul(e,1664525)+1013904223>>>0)/4294967296}var Lu=class{constructor(){this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d",{alpha:!0}),this.texture=new mr(this.canvas),this.pointer=new re(-3,-3),this.smooth=new re(-3,-3),this.active=!1,this.lastTime=-1,this.onMove=e=>{this.pointer.set(e.clientX/innerWidth,1-e.clientY/innerHeight),this.active=!0},document.addEventListener("pointermove",this.onMove,{passive:!0}),document.addEventListener("pointerdown",this.onMove,{passive:!0}),document.addEventListener("pointerleave",()=>{this.active=!1}),window.addEventListener("blur",()=>{this.active=!1}),this.resize(innerWidth,innerHeight)}resize(e,t){this.canvas.width=Math.min(1400,e),this.canvas.height=Math.round(this.canvas.width*t/e),this.nodes=[],this.edges=[];let n=cM(185),i=Math.max(11,Math.round(16*e/t)),s=16;for(let r=0;r<=s;r++)for(let o=0;o<=i;o++)if(this.nodes.push({x:(o+(n()-.5)*.8)/i,y:(r+(n()-.5)*.8)/s,phase:n()*Math.PI*2,seed:n()}),o&&r){let c=r*(i+1)+o;this.edges.push([c,c-1],[c,c-i-1],(o+r)%2?[c-1,c-i-1]:[c,c-i-2])}this.lastTime=-1}update(e,t,n,i){if(this.smooth.lerp(this.active?this.pointer:new re(-3,-3),1-Math.exp(-i*7)),e===this.lastTime&&!this.active||e-this.lastTime<1/30&&e!==this.lastTime)return;this.lastTime=e;let s=this.ctx,r=this.canvas.width,o=this.canvas.height;s.clearRect(0,0,r,o);let c=e*Math.PI/24,l=this.nodes.map(d=>{let h=d.x+Math.sin(c+d.phase)*.009,u=d.y+Math.cos(c+d.phase)*.009,f=h-this.smooth.x,m=(u-this.smooth.y)*o/r,g=Math.hypot(f,m),b=Math.exp(-g*g/.011);return h+=f*b*.18,u+=(u-this.smooth.y)*b*.18,{x:h*r,y:(1-u)*o,heat:b,edge:Math.min(1,Math.hypot((h-.5)*1.45,(u-.5)*1.1)*1.5),seed:d.seed}});for(let[d,h]of this.edges){let u=l[d],f=l[h],m=Math.max(u.heat,f.heat),g=(.05+(u.edge+f.edge)*.07)*(1-t*.35)+m*.56;s.strokeStyle=m>.05?`rgba(255,${Math.round(166-m*45)},${Math.round(124-m*54)},${g})`:`rgba(132,148,162,${g})`,s.lineWidth=.45+m*.7,s.beginPath(),s.moveTo(u.x,u.y),s.lineTo(f.x,f.y),s.stroke()}for(let d of l)if((d.seed<.43||d.heat>.1)&&(s.fillStyle=`rgba(${d.heat>.1?"255,165,100":"180,192,201"},${.15+d.edge*.18+d.heat*.65})`,s.beginPath(),s.arc(d.x,d.y,.65+d.heat,0,Math.PI*2),s.fill()),d.seed>.96&&d.heat>.02){let h=2+d.heat*3;s.fillStyle=`rgba(255,161,92,${d.heat*.7})`,s.beginPath(),s.moveTo(d.x,d.y-h),s.lineTo(d.x-h*.6,d.y+h*.4),s.lineTo(d.x+h*.6,d.y+h*.4),s.closePath(),s.fill()}this.texture.needsUpdate=!0}};function sb(a,e,t){let n=new Lu,i=new It(1,1,{depthBuffer:!1,type:en}),s={...e,uAspect:{value:1},uTanFov:{value:1},uEye:{value:new C},uCamera:{value:new de},uInverseProjection:{value:new de},uNetwork:{value:n.texture},uInside:{value:0}},r=new ut({uniforms:s,vertexShader:Fu.vertexShader,fragmentShader:Fu.fragmentShader,defines:{CLOUD_STEPS:t?22:34},depthWrite:!1,depthTest:!1}),o=new Si,c=new ga,l=new _a(2,2);o.add(new ze(l,r));let d=new ze(l,new ut({uniforms:{map:{value:i.texture}},vertexShader:Fu.vertexShader,fragmentShader:"varying vec2 vUv;uniform sampler2D map;void main(){gl_FragColor=texture2D(map,vUv);}",depthTest:!1,depthWrite:!1}));return d.frustumCulled=!1,d.renderOrder=-1e3,a.add(d),{uniforms:s,resize(h,u){let f=Math.min(t?.4:.36,640/h);i.setSize(Math.ceil(h*f),Math.ceil(u*f)),n.resize(h,u)},update(h,u,f,m){s.uAspect.value=u.aspect,s.uTanFov.value=Math.tan(u.fov*Math.PI/360),s.uEye.value.copy(u.position),s.uCamera.value.copy(u.matrixWorld),s.uInverseProjection.value.copy(u.projectionMatrixInverse),n.update(f,s.uDay.value,s.uInside.value,m);let g=h.getRenderTarget();h.setRenderTarget(i),h.render(o,c),h.setRenderTarget(g)},lattice:n,target:i}}function rb(a){let e=new Float32Array(a.count*a.itemSize);for(let t=0;t<a.count;t++)for(let n=0;n<a.itemSize;n++)e[t*a.itemSize+n]=a.getComponent(t,n);return new Je(e,a.itemSize)}function ob(a,e,t){a.updateMatrixWorld(!0);let n=new Tn;n.name="MEMENTO_STUDIO";let i=[],s=[],r=null;return a.traverse(o=>{if(!o.isMesh)return;let c=o.geometry.clone();c.setAttribute("position",rb(c.attributes.position)),c.setAttribute("normal",rb(c.attributes.normal)),c.applyMatrix4(o.matrixWorld),c.index&&(c=c.toNonIndexed());let l=c.attributes.position,d=new Float32Array(l.count*3),h=new Float32Array(l.count*3);for(let x=0;x<l.count;x+=3){let y=new C;for(let v=0;v<3;v++)y.add(new C().fromBufferAttribute(l,x+v));y.multiplyScalar(1/3);for(let v=0;v<3;v++)d.set(y.toArray(),(x+v)*3),h[(x+v)*3+v]=1}c.setAttribute("aShardCenter",new Je(d,3)),c.setAttribute("aBary",new Je(h,3)),c.computeBoundingBox(),c.computeBoundingSphere();let u=c.boundingBox.clone(),f=o.userData.zone==="BACKFACE_REVEAL",m=ib(o.name),g=o.material.name.replace("MEMENTO_",""),b=e.create(g,{shell:f,fixtureKind:m?.kind||0,bounds:u,screenBase:o.name==="TV_55"?.025:.24}),p=new ze(c,b);if(p.name=o.name,p.userData={...o.userData},p.castShadow=!f,p.receiveShadow=!0,f&&(s.push(p),p.renderOrder=1),o.name==="DYSON"){let x=u.getCenter(new C);x.y=u.min.y,c.translate(-x.x,-x.y,-x.z);let y=c.attributes.aShardCenter;for(let v=0;v<y.count;v++)y.setXYZ(v,y.getX(v)-x.x,y.getY(v)-x.y,y.getZ(v)-x.z);c.computeBoundingBox(),c.computeBoundingSphere(),p.position.copy(x),r=p}t?.bind(p,m),i.push(p),n.add(p)}),{root:n,meshes:i,shell:s,dyson:r}}var lM={left:"m14 5-7 7 7 7",right:"m10 5 7 7-7 7",home:"M3 10 12 3l9 7v10H3Z M9 20v-6h6v6",workspace:"M2 5h8v9H2z M14 5h8v9h-8z M6 14v4m-3 0h6m9-4v4m-3 0h6",lounge:"M5 9V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3 M3 9h3v6h12V9h3v11H3Z M6 20v1m12-1v1",project:"M3 17 17 3l4 4L7 21Z M13 7l3 3m-6 0 3 3m-6 0 3 3",coffee:"M4 5h12v11a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z M16 7h2a3 3 0 0 1 0 6h-2 M2 22h17",light:"M9 18h6m-5 3h4 M8 14a6 6 0 1 1 8 0l-1 3H9Z",moon:"M20 15a8 8 0 0 1-11-11 8 8 0 1 0 11 11Z",sun:"M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5 M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0",magic:"m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z M21 2v4m-2-2h4",close:"m6 6 12 12M6 18 18 6",pause:"M9 5v14M15 5v14",play:"m8 5 11 7-11 7Z"},Yn=a=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${lM[a]}"/></svg>`;function cb(a){let e=f=>document.getElementById(f),t=e("views"),n=e("shot-caption"),i=0,s=-2,r=!1,o=0,c=!1,l=[["view-panel","views-toggle"],["light-panel","lights"],["shader-panel","shaders"]];function d(f){for(let[m,g]of l){let b=m===f&&e(m).hidden;e(m).hidden=!b,e(g).setAttribute("aria-expanded",String(b))}document.body.classList.toggle("panel-open",l.some(([m])=>!e(m).hidden))}function h(f){i=(f+Rn.length)%Rn.length,d(null),a.view(i)}Rn.forEach((f,m)=>{let g=document.createElement("button");g.setAttribute("aria-label",m===2||m===3?f.title:f.name),g.setAttribute("aria-pressed",String(m===0)),g.innerHTML=`<small>${String(m).padStart(2,"0")}</small><span>${m===2||m===3?"Workstation "+f.name:f.name}</span>`,g.onclick=()=>h(m),t.append(g)}),e("views-toggle").onclick=()=>d("view-panel"),e("previous-view").innerHTML=Yn("left"),e("previous-view").onclick=()=>h(i-1),e("next-view").innerHTML=Yn("right"),e("next-view").onclick=()=>h(i+1),e("lights").innerHTML=Yn("light"),e("shaders").innerHTML=Yn("magic")+"<span>Carbone vivo</span>",e("day").innerHTML=Yn("moon")+"<span>Notte</span>",e("lights").onclick=()=>d("light-panel"),e("shaders").onclick=()=>d("shader-panel"),document.querySelectorAll(".close-panel").forEach(f=>{f.innerHTML=Yn("close"),f.onclick=()=>d(null)});for(let[f,m]of Du){let g=document.createElement("button");g.className="light-option",g.dataset.light=f,g.setAttribute("aria-pressed","true"),g.innerHTML=`<span>${m}</span><i class="switch" aria-hidden="true"></i>`,g.onclick=()=>a.light(f),e("light-options").append(g)}for(let f of ao){let m=document.createElement("button");m.className="shader-option",m.dataset.shader=f.id,m.style.setProperty("--fx",f.accent),m.setAttribute("aria-pressed",String(f.id===0)),m.setAttribute("aria-label",f.name+" \u2014 "+f.detail),m.innerHTML=`<span class="fx-number">${String(f.id+1).padStart(2,"0")}</span><span class="fx-name">${f.name}</span><span class="fx-detail">${f.detail}</span>`,m.onclick=()=>{a.shader(f.id),d(null)},e("shader-options").append(m)}e("day").onclick=()=>a.day(),e("motion").innerHTML=Yn("pause"),e("motion").onclick=()=>a.motion(),e("enter").onclick=()=>h(1),e("exit").onclick=()=>{d(null),a.exit()},e("focus-close").innerHTML=Yn("close"),e("focus-close").onclick=()=>a.unfocus(),e("retry").onclick=()=>location.reload();for(let f=0;f<14;f++){let m=document.createElement("i");m.style.setProperty("--i",f),document.querySelector(".caption-fragments").append(m)}function u(f){let m=Rn[f]||{title:"Segui la tua curiosit\xE0.",copy:"Esplora lo spazio, avvicinati ai dettagli.",id:"free"};n.classList.remove("reveal"),e("shot-title").replaceChildren(),m.title.split(" ").forEach((x,y)=>{let v=document.createElement("span");v.className="word",v.style.setProperty("--word",y),v.textContent=x+" ",e("shot-title").append(v)}),e("shot-copy").textContent=m.copy;let g=(f>=0?String(f).padStart(2,"0"):"\u2197")+" / "+(f===0?"MEMENTO STUDIO":f<0?"ESPLORAZIONE LIBERA":Rn[f].name.toUpperCase());e("shot-index").textContent=g;let b=++o,p=performance.now();if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&!document.body.classList.contains("paused")){let x="ABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789",y=v=>{if(b!==o)return;let _=Math.min(1,(v-p)/640);e("shot-index").textContent=[...g].map((w,T)=>w===" "||T/g.length<_?w:x[(Math.floor(v/58)+T*7)%x.length]).join(""),_<1&&requestAnimationFrame(y)};requestAnimationFrame(y)}requestAnimationFrame(()=>{n.classList.add("reveal"),n.classList.remove("traveling")}),s=f}return document.addEventListener("pointerdown",f=>{f.target.closest(".dock")||d(null)}),document.addEventListener("keydown",f=>{if(f.code==="Escape"){let m=l.some(([g])=>!e(g).hidden);d(null),m||a.escape()}}),document.addEventListener("pointermove",f=>{document.querySelectorAll(".cut-surface,.cut-button").forEach(m=>{let g=m.getBoundingClientRect();f.clientX>g.left-150&&f.clientX<g.right+150&&f.clientY>g.top-150&&f.clientY<g.bottom+150&&(m.style.setProperty("--mx",`${f.clientX-g.left}px`),m.style.setProperty("--my",`${f.clientY-g.top}px`))})},{passive:!0}),{fxBusy(f){c!==f&&(c=f,e("shaders").setAttribute("aria-busy",String(f)))},progress(f){e("load-percent").textContent=`${Math.round(f*100)}%`,e("load-bar").style.width=`${f*100}%`},ready(){this.progress(1),e("controls").hidden=!1,document.body.classList.add("ready")},error(f){e("error-message").textContent=f,e("error").hidden=!1,e("loading").hidden=!0},navigation(f){let m=f.state!=="exterior";document.querySelector(".entry").inert=m||!!f.focus,document.querySelector(".entry").setAttribute("aria-hidden",String(m||!!f.focus)),e("exit").hidden=!m,document.body.classList.toggle("inside",m),[...t.children].forEach((b,p)=>b.setAttribute("aria-pressed",String(p===f.view))),f.view>=0?(i=f.view,e("view-current").textContent=i===0?"Inquadrature":Rn[i].name):e("view-current").textContent="Esplora",!!f.transition&&!f.focus?(n.classList.add("traveling"),r=!0):(r||f.view!==s)&&(r=!1,u(f.view))},focus(f){document.body.classList.toggle("focused",!!f),e("focus-card").hidden=!f,f&&(e("focus-name").textContent=Jm(f.name))},lights(f){document.querySelectorAll("[data-light]").forEach(m=>m.setAttribute("aria-pressed",String(!!f[m.dataset.light].target)))},shader(f){document.querySelectorAll("[data-shader]").forEach(m=>m.setAttribute("aria-pressed",String(Number(m.dataset.shader)===f))),e("shaders").innerHTML=Yn("magic")+`<span>${ao[f].name}</span>`,e("status").textContent=ao[f].name+". "+ao[f].detail},day(f){e("day").setAttribute("aria-label",f?"Attiva notte":"Attiva giorno"),e("day").setAttribute("aria-pressed",String(f)),e("day").innerHTML=Yn(f?"sun":"moon")+`<span>${f?"Giorno":"Notte"}</span>`,document.body.classList.toggle("day",f)},motion(f){document.body.classList.toggle("paused",f),e("motion").setAttribute("aria-pressed",String(f)),e("motion").setAttribute("aria-label",f?"Riprendi le animazioni":"Metti in pausa le animazioni"),e("motion").innerHTML=Yn(f?"play":"pause")},announce(f){e("status").textContent=f}}}var fn=document.getElementById("scene"),hM=matchMedia("(pointer:coarse)").matches,ia=hM||innerWidth<700,Ba=matchMedia("(prefers-reduced-motion: reduce)"),Ui=Ba.matches,oo=!1,Re,qt,Ws,zn,Oa,Xt,di,On,Ni,lb,Xl,zu,Na=0,Wl=0,ku=0,Nu=16,Uu=0,Bu=0,hb=0,db=-1,ub=!1,ui=Math.min(devicePixelRatio||1,ia?1.25:1.65),Et=nb(),yb=new re(2,2),Ou=new Dr,fb=new C(99,99,99),pb=new C,mb=new C,ql=!1,bb=null,gb=!1,Ua=!1,ro=null,Nt=cb({view:a=>{Re&&(Re.go(a),Et.uTravel.value=.001)},light:a=>{qt?.toggle(a),qt&&Nt.lights(qt.groups)},shader:a=>{Ws?.choose(a),Nt.shader(a)},day:()=>{qt&&(qt.setDay(!qt.dayTarget),Nt.day(!!qt.dayTarget))},motion:()=>{Ui=!Ui,Nt.motion(Ui)},unfocus:()=>Re?.clearFocus(),exit:()=>Re?.exit(),escape:()=>{Re?.focus?Re.clearFocus():Re&&Re.state!=="exterior"&&Re.exit()}});Nt.motion(Ui);Ba.addEventListener("change",()=>{Ui=Ba.matches,Nt.motion(Ui)});async function dM(){let a=ia?"mobile":"desktop",e=typeof DecompressionStream<"u",t=await fetch(`./assets/studio-v2-${a}.glb${e?".gz":""}`);if(!t.ok)throw new Error("Asset HTTP "+t.status);let n=Number(t.headers.get("content-length"))||(ia?1743485:2103473),i;if(t.body){let o=[],c=0,l=t.body.getReader();for(;;){let{done:h,value:u}=await l.read();if(h)break;o.push(u),c+=u.length,Nt.progress(Math.min(.72,c/n*.72))}i=new Uint8Array(c);let d=0;for(let h of o)i.set(h,d),d+=h.length}else i=new Uint8Array(await t.arrayBuffer());let s=e?await new Response(new Blob([i]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer():i.buffer;return Nt.progress(.76),await su.ready,new hl().setMeshoptDecoder(su).parseAsync(s,"")}function Kl(){if(!Xt)return;let a=innerWidth,e=innerHeight;Xt.setPixelRatio(ui),Xt.setSize(a,e,!1),di.setPixelRatio(ui),di.setSize(a,e),On.aspect=a/e,On.updateProjectionMatrix(),Re&&(Re.frameFactor=eb(On.aspect)),zu.uniforms.resolution.value.set(1/(a*ui),1/(e*ui)),Ni.uniforms.resolution.value.set(a*ui,e*ui),Ni.uniforms.maxRadius.value=ia?10:15,Xl?.resize(a,e),Oa&&(Oa.u.uHeight.value=e,Oa.u.uDpr.value=ui)}function Jl(a){let e=fn.getBoundingClientRect();yb.set((a.clientX-e.left)/e.width*2-1,-(a.clientY-e.top)/e.height*2+1),ql=!0}function ju(){return!zn||!Re?null:(On.updateMatrixWorld(),zn.root.updateMatrixWorld(!0),$m(Ou,yb,On),Ou.firstHitOnly=!0,Ou.intersectObjects([...zn.meshes.filter(a=>a.material.visible&&(!a.userData.zone?.includes("BACKFACE")||Re.shell>.5)),...qt.emitters.map(a=>a.mesh)],!1)[0]||null)}function xb(a){if(!oo)return;clearTimeout(ro),Jl(a);let e=ju();if(e){if(e.object.name.startsWith("EMITTER_"))return;Re.focusObject(e.object,e.point),Et.uContact.value=0}}function vb(a){Jl(a);let e=ju();e?.object.userData.lightGroup&&(qt.toggle(e.object.userData.lightGroup),Nt.lights(qt.groups))}function uM(){let a=new Map,e=null,t=null,n=0,i={at:0,x:0,y:0};fn.addEventListener("pointerdown",h=>{if(oo&&(fn.focus({preventScroll:!0}),fn.setPointerCapture(h.pointerId),a.set(h.pointerId,{x:h.clientX,y:h.clientY}),e={x:h.clientX,y:h.clientY},t=e,Ua=!1,Jl(h),fn.classList.add("dragging"),a.size===2)){let u=[...a.values()];n=Math.hypot(u[0].x-u[1].x,u[0].y-u[1].y)}}),fn.addEventListener("pointermove",h=>{if(Jl(h),!a.has(h.pointerId))return;if(a.set(h.pointerId,{x:h.clientX,y:h.clientY}),a.size===2){let m=[...a.values()],g=Math.hypot(m[0].x-m[1].x,m[0].y-m[1].y);Re.zoom((n-g)*5),n=g,Ua=!0;return}if(!t)return;let u=h.clientX-t.x,f=h.clientY-t.y;Math.hypot(h.clientX-e.x,h.clientY-e.y)>4&&(Ua=!0),Ua&&Re.drag(u,f),t={x:h.clientX,y:h.clientY}});let s=h=>{if(a.delete(h.pointerId),fn.classList.remove("dragging"),!Ua&&h.type==="pointerup")if(h.pointerType==="touch"){let u=performance.now();u-i.at<320&&Math.hypot(h.clientX-i.x,h.clientY-i.y)<28?(xb(h),i.at=0):(clearTimeout(ro),ro=setTimeout(()=>vb(h),330),i={at:u,x:h.clientX,y:h.clientY})}else h.detail<2&&(clearTimeout(ro),ro=setTimeout(()=>vb(h),260));t=a.size?[...a.values()][0]:null,e=t,a.size||(Ua=!1),h.pointerType==="touch"&&(ql=!1)};fn.addEventListener("pointerup",s),fn.addEventListener("pointercancel",s),fn.addEventListener("dblclick",xb),fn.addEventListener("pointerleave",()=>{a.size||(ql=!1)}),fn.addEventListener("wheel",h=>{h.preventDefault(),Re?.zoom(h.deltaY)},{passive:!1});let r=["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ShiftLeft"];document.addEventListener("keydown",h=>{if(!(!Re||!r.includes(h.code)||h.target.closest("input,select,textarea,[contenteditable=true]"))){if(h.preventDefault(),Re.state==="exterior"){Re.go(1);return}Re.focus&&Re.clearFocus(!1),Re.transition&&Re.cancelTransition(),Re.keys.add(h.code)}}),document.addEventListener("keyup",h=>Re?.keys.delete(h.code)),window.addEventListener("blur",()=>{Re?.keys.clear(),Re?.touchMove.set(0,0)});let o=document.getElementById("stick"),c=document.getElementById("stick-knob"),l=null,d=h=>{let u=o.getBoundingClientRect(),f=h.clientX-u.left-u.width/2,m=h.clientY-u.top-u.height/2,g=Math.max(1,Math.hypot(f,m)/27);Re.touchMove.set(f/g/27,m/g/27),c.style.transform=`translate(${f/g}px,${m/g}px)`};o.addEventListener("pointerdown",h=>{Re&&(h.stopPropagation(),o.setPointerCapture(h.pointerId),l=h.pointerId,Re.transition&&Re.cancelTransition(),Re.clearFocus(!1),d(h))}),o.addEventListener("pointermove",h=>{h.pointerId===l&&d(h)});for(let h of["pointerup","pointercancel"])o.addEventListener(h,()=>{l=null,Re?.touchMove.set(0,0),c.style.transform=""});document.addEventListener("visibilitychange",()=>{Wl=0,document.hidden&&(Re?.keys.clear(),Re?.touchMove.set(0,0))})}function fM(){let a=0,e=n=>{let i=0;for(;a<zn.meshes.length&&(i<2||n.timeRemaining()>5);){let s=zn.meshes[a++];s.geometry.boundsTree=new io(s.geometry,{maxLeafTris:12}),s.raycast=Wm,i++}a<zn.meshes.length&&t(e)},t=n=>window.requestIdleCallback?requestIdleCallback(n,{timeout:500}):setTimeout(()=>n({timeRemaining:()=>0}),20);t(e)}function _b(a){if(requestAnimationFrame(_b),document.hidden||!oo)return;let e=Wl?(a-Wl)/1e3:1/60;Wl=a;let t=Math.min(e,.05);Ui||(Na+=e),Et.uTime.value=Na,ku+=e,Et.uReveal.value=Ba.matches?1:ki(Math.min(1,ku/2.3)),Re.update(t,Ba.matches,e),Et.uPerspective.value=Re.perspective,Et.uProjectionDistance.value=On.userData.projectionDistance,Et.uShell.value=Re.shell,Ws.update(e,Ba.matches),Nt.fxBusy(Ws.progress<1),qt.update(e,Re.shell,Ba.matches),Et.uDay.value=qt.day,Et.uDayPulse.value=qt.dayPulse,Et.uTravel.value>0&&(Et.uTravel.value=Math.min(1,Et.uTravel.value+t*.42),Et.uTravel.value===1&&(Et.uTravel.value=0)),Xl.uniforms.uInside.value=Re.shell,Xl.update(Xt,On,Na,t),Oa?.update(),zn.dyson&&!Ui&&(zn.dyson.rotation.y=Ym(Na));let n=Re.shell>.97;if(n!==ub){ub=n;for(let i of zn.shell)i.castShadow=n&&i.name!=="LUCI_SOFFITTO";Xt.shadowMap.needsUpdate=!0}if(a-hb>60){hb=a;let i=ql&&!Ua&&!Re.transition?ju():null;bb=i?.object||null,i&&fb.copy(i.point),Et.uContact.value=Cn(Et.uContact.value,i?1:0,5,.06),fn.classList.toggle("light-hover",!!bb?.userData.lightGroup),i&&Oa&&!Ui&&Na-db>.16&&(mb.copy(i.point).sub(gb?pb:i.point).multiplyScalar(1/.16).clampLength(0,2),Oa.hit(i.point,mb,Et.uRadius.value,Na),pb.copy(i.point),gb=!0,db=Na)}Et.uCursor.value.lerp(fb,1-Math.exp(-12*t)),Ni.uniforms.inverseProjection.value.copy(On.projectionMatrixInverse),Ni.enabled=Re.focusAmount>.005,Ni.uniforms.amount.value=Re.focusAmount,Ni.uniforms.focusDistance.value=Re.focusDistance,Ni.uniforms.focusRange.value=Re.focusRange,di.render(t),ku>5&&(Nu=Nu*.9+Math.min(e,.5)*1e3*.1,Bu+=e,Uu++,Bu>3&&Uu>5&&(Nu>29&&ui>.8&&(ui=Math.max(.8,ui-.15),Kl()),Bu=0,Uu=0))}async function pM(){try{Xt=new cl({canvas:fn,antialias:!1,powerPreference:"high-performance",alpha:!1})}catch(a){console.error(a),Nt.error("La grafica 3D non \xE8 disponibile in questo browser. Attiva l\u2019accelerazione hardware o apri la pagina in un browser compatibile.");return}try{Xt.setClearColor(65794),Xt.outputColorSpace=St,Xt.toneMapping=vs,Xt.shadowMap.enabled=!0,Xt.shadowMap.type=rc,Xt.shadowMap.autoUpdate=!1,Xt.shadowMap.needsUpdate=!0;let a=new Si;a.fog=new hr(527638,.012),On=new Rt(35,innerWidth/innerHeight,.025,90);let e=new Rs(Xt),t=new ul,n=e.fromScene(t,.04);a.environment=n.texture,a.environmentIntensity=.38,t.dispose(),e.dispose();let i=new It(1,1,{type:en,depthBuffer:!0});i.depthTexture=new Ki(1,1,Nn),di=new pl(Xt,i),di.renderTarget2.depthTexture=new Ki(1,1,Nn),di.addPass(new ml(a,On)),Ni=new Hl,di.addPass(Ni),lb=new Fs(new re(1,1),.3,.55,1.05),di.addPass(lb),di.addPass(new bl),zu=new Qi(tm),di.addPass(zu),Ws=new Vl(Et),qt=new Gl(a,Xt,ia),Xl=sb(a,Et,ia);let[s,r]=await Promise.all([dM(),fetch("./assets/navigation-grid.json").then(o=>{if(!o.ok)throw new Error("Navigation unavailable");return o.json()})]);zn=ob(s.scene,Ws,qt),a.add(zn.root),qt.createEmitters(),Nt.progress(.86),Re=new jl(On,new zl(r),{onChange:o=>Nt.navigation(o),onFocus:o=>Nt.focus(o)}),Kl(),Re.update(.016),uM(),await Xt.compileAsync(a,On),Nt.progress(.97),qt.update(.016,0),Ws.update(.016),oo=!0,Nt.ready(),Nt.navigation(Re),requestAnimationFrame(_b),ab(a,Et,ia).then(o=>{Oa=o,Kl()}).catch(o=>console.warn("Optional surface field:",o.message)),fM(),fn.addEventListener("webglcontextlost",o=>{o.preventDefault(),oo=!1,Nt.error("La sessione 3D \xE8 stata interrotta. Ricarica lo studio per riprendere.")}),console.info("Memento Studio V4 ready",{objects:zn.meshes.length,lod:ia?"mobile":"desktop"})}catch(a){console.error("Studio load:",a),Nt.error("Lo studio non si \xE8 caricato. Controlla la connessione e riprova.")}}window.addEventListener("resize",Kl);pM();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
