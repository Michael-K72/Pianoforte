import http from "node:http";
import {readFile,stat} from "node:fs/promises";
import path from "node:path";
const root=path.resolve("out");
const port=Number(process.env.PORT||4173);
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".json":"application/json",".txt":"text/plain; charset=utf-8",".webp":"image/webp",".png":"image/png",".svg":"image/svg+xml",".ico":"image/x-icon",".woff2":"font/woff2",".wasm":"application/wasm",".glb":"model/gltf-binary",".xml":"application/xml"};
http.createServer(async(req,res)=>{
 if(req.method!=="GET"&&req.method!=="HEAD"){res.writeHead(405,{Allow:"GET, HEAD"});res.end();return;}
 try{
  const requested=decodeURIComponent(new URL(req.url,"http://localhost").pathname);
  let file=path.resolve(root,"."+requested);
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  try{if((await stat(file)).isDirectory())file=path.join(file,"index.html");}
  catch{file=path.join(root,"404.html");res.statusCode=404;}
  const data=await readFile(file);
  res.setHeader("Content-Type",mime[path.extname(file)]||"application/octet-stream");
  res.setHeader("X-Content-Type-Options","nosniff");
  res.setHeader("Content-Length",data.length);
  res.end(req.method==="HEAD"?undefined:data);
 }catch{res.writeHead(404);res.end("Not found");}
}).listen(port,"127.0.0.1",()=>console.log("Local: http://127.0.0.1:"+port));
