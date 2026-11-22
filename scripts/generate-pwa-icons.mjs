/** Genera iconos PWA PNG deterministas sin servicios externos ni dependencias nuevas. */
import {writeFileSync,mkdirSync} from "node:fs";
import {deflateSync} from "node:zlib";
const sizes=[192,512];
const crcTable=Array.from({length:256},(_,i)=>{let c=i;for(let k=0;k<8;k++)c=(c&1)?0xedb88320^(c>>>1):(c>>>1);return c>>>0;});
const crc32=data=>{let c=0xffffffff;for(const x of data)c=crcTable[(c^x)&255]^(c>>>8);return (c^0xffffffff)>>>0;};
function chunk(type,data){const b=Buffer.from(type,"ascii"),len=Buffer.alloc(4),crc=Buffer.alloc(4);len.writeUInt32BE(data.length);crc.writeUInt32BE(crc32(Buffer.concat([b,data])));return Buffer.concat([len,b,data,crc]);}
function icon(size){
 const bytes=Buffer.alloc(size*(1+size*4));const bg=[247,241,230],red=[230,59,51],white=[255,255,255];
 const circle=(x,y,cx,cy,r)=>Math.hypot(x-cx,y-cy)<=r;
 const rounded=(x,y,x1,y1,x2,y2,r)=>{const cx=Math.max(x1+r,Math.min(x,x2-r)),cy=Math.max(y1+r,Math.min(y,y2-r));return Math.hypot(x-cx,y-cy)<=r;};
 const pshape=(x,y)=>{const u=x/size,v=y/size;return (u>=.34&&u<=.46&&v>=.25&&v<=.77)||
  (u>=.39&&u<=.65&&v>=.25&&v<=.37)||
  (u>=.57&&u<=.70&&v>=.34&&v<=.51)||
  (u>=.39&&u<=.65&&v>=.48&&v<=.59);};
 for(let y=0;y<size;y++){let o=y*(size*4+1);bytes[o++]=0;for(let x=0;x<size;x++){
  const plate=rounded(x,y,size*.075,size*.075,size*.925,size*.925,size*.18);
  const ink=plate?(pshape(x,y)?white:red):bg;
  bytes[o++]=ink[0];bytes[o++]=ink[1];bytes[o++]=ink[2];bytes[o++]=255;
 }}
 const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(size,0);ihdr.writeUInt32BE(size,4);ihdr[8]=8;ihdr[9]=6;
 return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk("IHDR",ihdr),chunk("IDAT",deflateSync(bytes,{level:9})),chunk("IEND",Buffer.alloc(0))]);
}
mkdirSync("public",{recursive:true});
for(const size of sizes){const file="public/icon-"+size+".png";writeFileSync(file,icon(size));console.log("PWA icon "+file);}
writeFileSync("public/favicon.png",icon(192));
