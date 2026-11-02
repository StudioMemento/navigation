/* Shared Memento navigation. No dependencies on the page's framework. */
(()=>{
  const script=document.currentScript;if(!script)return;
  const options={page:script.dataset.mementoPage,hub:script.dataset.mementoHub||'https://mementonav.vercel.app'};
  const ready=()=>import(new URL('./child.mjs',script.src).href).then(({installChild})=>installChild(options)).catch(error=>console.warn('Navigazione Memento non disponibile',error));
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();
