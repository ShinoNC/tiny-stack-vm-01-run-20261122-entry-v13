import{readFileSync as f,readdirSync as d,mkdirSync as m,writeFileSync as w}from'node:fs';
const E=process.env,I=E.MAKEFUN_INPUT_DIR||'/input',O=E.MAKEFUN_OUTPUT_DIR||'/output';
const S="!2b%'+,0        *******&***&*** ***             AEEA!           &)              %%\"%";
const B=[(a,b)=>a+b,(a,b)=>a-b,Math.imul,(a,b)=>a/b|0,(a,b)=>a%b|0,(a,b)=>(a>>>0)/(b>>>0)|0,(a,b)=>(a>>>0)%(b>>>0)|0,0,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,0,(a,b)=>a<<b,(a,b)=>a>>b,(a,b)=>a>>>b,0,(a,b)=>+(a==b),(a,b)=>+(a<b),(a,b)=>+((a>>>0)<(b>>>0))];
function run(P,N){
let D=[],M=[],C=[],Q=[],s=0,c=0,p=0,n=0,i=0;
for(;;){
if(n==1e6)return[10,Q];
if(p<0||p>=P.length)return[9,Q];
let o=P[p],k=S.charCodeAt(o)-33;
if(!(k>=0))return[5,Q];
let z=k>>4,u=(k>>2)&3,v=k&3;
if(p+z>=P.length)return[9,Q];
n++;
let x=p+1+z;
if(s<u)return[2,Q];
if(s-u+v>256)return[3,Q];
p=x;
if(o<8){
if(!o)return[0,Q];
if(o==1)D[s++]=P[x-1]<<24>>24;
else if(o==2)D[s++]=P[x-4]|P[x-3]<<8|P[x-2]<<16|P[x-1]<<24;
else if(o==3)s--;
else if(o==4)D[s]=D[s-1],s++;
else if(o==5)[D[s-1],D[s-2]]=[D[s-2],D[s-1]];
else if(o==6)D[s]=D[s-2],s++;
else[D[s-3],D[s-2],D[s-1]]=[D[s-2],D[s-1],D[s-3]];
}else if(o<35){
if(o==23)D[s-1]=-D[s-1]|0;
else if(o==27)D[s-1]=~D[s-1];
else{let b=D[s-1],a=D[s-2];if(o>18&&o<23&&!b)return[4,Q];s-=2,D[s++]=B[o-16](a,b)|0;}
}
else if(o<53){
if(o==51){if(c==64)return[7,Q];C[c++]=x;p=P[x-2]|P[x-1]<<8;}
else if(o==52){if(!c)return[8,Q];p=C[--c];}
else{let r=((P[x-2]|P[x-1]<<8)<<16)>>16;if(o==48)p=x+r;else if((o==49)==!D[--s])p=x+r;}
}else if(o<66){
let a=D[s-1];
if(a<0||a>255)return[6,Q];
if(o==64)D[s-1]=M[a]||0;else{M[a]=D[s-2];s-=2;}
}else{
if(o==82)D[s++]=N[i++]??-1;
else if(o==83)return[D[--s]&255,Q];
else if(o==81){if(Q.length>65535)return[11,Q];Q.push(D[--s]&255);}
else{let t=''+D[s-1];if(Q.length+t.length>65536)return[11,Q];s--;Q.push(...Buffer.from(t));}
}
}
}
for(let g of d(I)){
let a=I+'/'+g,b=O+'/'+g,[e,q]=run(f(a+'/program.bin'),f(a+'/input.bin'));
m(b,{recursive:true});
w(b+'/stdout.bin',Buffer.from(q));
w(b+'/exit.txt',''+e);
}