function t(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}let n=null;const e={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]"),body:document.querySelector("body")};e.startBtn.addEventListener("click",(function(){e.body.style.backgroundColor=t(),e.startBtn.disabled=!0,e.stopBtn.disabled=!1,n=setInterval((()=>{e.body.style.backgroundColor=t()}),1e3)})),e.stopBtn.addEventListener("click",(function(){clearInterval(n),e.startBtn.disabled=!1,e.stopBtn.disabled=!0})),e.stopBtn.disabled=!0;
//# sourceMappingURL=01-color-switcher.7c8e66af.js.map