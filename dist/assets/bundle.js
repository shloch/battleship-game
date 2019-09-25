!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);var n=(t,e)=>{const r=new Array(t).fill(0);return{length:t,cells:r,isSunk:()=>r.every(t=>"X"===t),hit:t=>(r[t]="X",r),isHorizontal:e}};var o={renderBoard:(t,e)=>{for(let r=0;r<10;r+=1)for(let n=0;n<10;n+=1){const o=document.createElement("div");null===e?(o.setAttribute("data-index",`${r}${n}`),o.classList.add("computerBoard")):(o.setAttribute("id",`${r}${n}`),o.classList.add("playerBoard"),"empty"!==e[r][n]&&"no-ship"!==e[r][n]&&o.classList.add("ship")),t.appendChild(o)}},displayShips:t=>{t.forEach(t=>{for(let e=0;e<t.cells.length;e+=1){const r=document.getElementById(`${t.cells[e][0]}${t.cells[e][1]}`);0===e&&r.classList.add("head"),t.cells.length-1===e&&r.classList.add("tail"),t.isHorizontal?r.classList.add("horizontal"):r.classList.add("vertical")}})},emptyBoard:(t,e)=>{const r=document.querySelectorAll(t),n=document.getElementById(e);[...r].forEach(t=>{n.removeChild(t)})},announceWinner:t=>{document.getElementById("flashinfo").textContent=t},displayRestartButton:()=>{const t=document.getElementById("restart");t.classList.remove("hide"),t.addEventListener("click",()=>{window.location.reload()},!1)},updateTotalShipSunkStatus:(t,e)=>{document.getElementById(t).innerHTML=`Number of ships sunk : ${e}`}};const a=(()=>{const t=()=>Math.random()<.5,e=()=>{return[Math.round(9*Math.random()),Math.round(9*Math.random())]},r=(t,e,r)=>{for(let n of t)if(n[0]==e&&n[1]==r)return!0;return!1},i={initializeBoard:r=>{let o=0;const a=[];for(;o<5;){const i=n(Math.random()>.5?3:2,t());let[l,s]=[...e()];const c=r.positionShip(i,l,s);"invalid_XY"!==c&&(o+=1,a.push(c))}return a},isThereWinner:(t,e)=>{let r=!1;return(t.board.checkIfAllShipsSunk()||e.board.checkIfAllShipsSunk())&&(r=!0,t.active=!1,e.active=!1,e.board.checkIfAllShipsSunk()?(o.updateTotalShipSunkStatus("shipsAttackedByComputer",5),o.announceWinner("GAME OVER : Player Won !!!")):(o.updateTotalShipSunkStatus("shipsAttackedByPlayer",5),o.announceWinner("GAME OVER : Computer Won !!!")),o.displayRestartButton()),r},attackShip:(t,e,r,n,o)=>{if(!t.active)return;const a=e.board.receiveAttack(r,n);let i=a?"hit":"miss";return o.classList.add(i),t.pastMoves,a||(t.active=!1,e.active=!0),a},computerAIAttack:(t,n)=>{let o,i,l=!1;for(;!l;)[o,i]=[...e()],0==r(n.pastMoves,o,i)&&(l=!0);n.pastMoves.push([o,i]);const s=document.getElementById(`${o}${i}`);a.attackShip(n,t,o,i,s),a.isThereWinner(t,n)},checkNumberOfShipSunk:t=>{let e=0;for(let r of t)r.isSunk()&&(e+=1);return e}};return i})();var i=a;var l=()=>{const t=new Array(10);for(let e=0;e<10;e+=1)t[e]=new Array(10).fill("empty");return{board:t,positionShip:(e,r,n)=>{if(r>10||n>10||!((e,r,n,o)=>{if("empty"!==t[n][o]||r&&o+e>10||!r&&n+e>10)return!1;let a=n-1;0===n&&(a=0);let i,l,s=o-1;0===o&&(s=0),r?(i=n+2,9===n&&(i=10),l=o+e+1,o+e===10&&(l=10)):(i=n+e+1,n+e===10&&(i=10),l=o+2,9===o&&(l=10));for(let e=a;e<i;e+=1)for(let r=s;r<l;r+=1)if("empty"!==t[e][r])return!1;return!0})(e.length,e.isHorizontal,r,n))return"invalid_XY";if(e.isHorizontal){const o=r;for(let r=n,a=0;r<n+e.length;r+=1,a+=1)e.cells[a]=[o,r],t[o][r]=e}else{const o=n;for(let n=r,a=0;n<r+e.length;n+=1,a+=1)e.cells[a]=[n,o],t[n][o]=e}return e},receiveAttack:(e,r)=>{let n=!1;if("empty"===t[e][r])t[e][r]="no-ship";else{const o=t[e][r],a=o.cells.findIndex(t=>t[0]===e&&t[1]===r);o.hit(a),n=!0}return n},checkIfAllShipsSunk:()=>{for(let e=0;e<t.length;e+=1)for(let r=0;r<t.length;r+=1)if("object"==typeof t[e][r]&&!t[e][r].isSunk())return!1;return!0}}};var s=(t,e,r)=>({active:t,board:e,pastMoves:r});const c=document.getElementById("play");c.addEventListener("click",(function(){[...document.querySelectorAll(".computerBoard")].forEach(t=>{t.classList.remove("inactive")}),c.classList.add("hide")}),!1);(()=>{const t=document.getElementById("playerBoard"),e=document.getElementById("computerBoard"),r=l(),n=l(),a=i.initializeBoard(r),c=i.initializeBoard(n),d=s(!0,r,null),u=s(!1,n,[]);o.renderBoard(t,d.board.board),o.renderBoard(e,null),o.displayShips(a),[...document.querySelectorAll(".computerBoard")].forEach(t=>{t.addEventListener("click",t=>{const e=t.target.getAttribute("data-index")[0],r=t.target.getAttribute("data-index")[1];i.attackShip(d,u,+e,+r,t.target);const n=i.checkNumberOfShipSunk(a);if(o.updateTotalShipSunkStatus("shipsAttackedByPlayer",n),!i.isThereWinner(d,u))for(;u.active;){i.computerAIAttack(d,u);let t=i.checkNumberOfShipSunk(c);o.updateTotalShipSunkStatus("shipsAttackedByComputer",t)}},!1),t.classList.add("inactive")})})()}]);