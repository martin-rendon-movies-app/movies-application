"use strict";

(()=>{
    fetch("http://localhost:3000/movies").then(resp => resp.json()).then(data => console.log(data));
})();