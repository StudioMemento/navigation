(() => {
  'use strict';
  // Keep native clicks, scrolling, text entry and clipboard buttons independent of page selection.
  for (const name of ['contextmenu','selectstart']) document.addEventListener(name,event=>event.preventDefault(),true);
  const textFields='textarea,input:not([type]),input[type=text],input[type=email],input[type=tel],input[type=search],input[type=url],input[type=password],[contenteditable=true]';
  document.addEventListener('mousedown',event=>{
    if (event.button===0 && (event.detail>1 || event.shiftKey) && event.target.matches?.(textFields)) event.preventDefault();
  },true);
  document.addEventListener('keydown',event=>{
    if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase()==='a') event.preventDefault();
    if (event.shiftKey && event.target.matches?.(textFields) &&
        ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End','PageUp','PageDown'].includes(event.key)) event.preventDefault();
  },true);
  function collapseSelection() {
    const field=document.activeElement;
    if (field && (field.tagName==='TEXTAREA' || field.tagName==='INPUT') && field.selectionStart!=null && field.selectionStart!==field.selectionEnd) {
      const caret=field.selectionDirection==='backward'?field.selectionStart:field.selectionEnd;
      field.setSelectionRange(caret,caret);
    }
    const selection=window.getSelection();
    if (selection && !selection.isCollapsed) selection.collapseToEnd();
  }
  document.addEventListener('selectionchange',collapseSelection);
  document.addEventListener('select',collapseSelection,true);
})();
