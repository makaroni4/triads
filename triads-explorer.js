!function(n){function e(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return n[r].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var t={};e.m=n,e.c=t,e.i=function(n){return n},e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:r})},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},e.p="/dist",e(e.s=3)}([function(n,e){},function(n,e,t){var r=t(2),a=function(n,e){function t(n,e,t,r,a){n=Math.round(n+a),e=Math.round(e+a),t=Math.round(t),s.fillStyle=r,s.beginPath(),s.arc(n,e,t,0,2*Math.PI),s.fill()}function a(n,e,t,r,a){n=Math.round(n+a),e=Math.round(e+a),t=Math.round(t+a),r=Math.round(r+a),s.beginPath(),s.moveTo(n,e),s.lineTo(t,r),s.stroke()}var i=document.createElement("div");i.className="triad__header",i.innerHTML=r(e.map(function(n){return n.note}).reverse());var o=document.createElement("div");o.className="triads__triad triad";var c=document.createElement("canvas");c.className="triad__canvas",o.appendChild(i),o.appendChild(c),n.appendChild(o);var u=window.getComputedStyle(c,null);c.width=parseInt(u.getPropertyValue("width")),c.height=parseInt(u.getPropertyValue("height"));var s=c.getContext("2d");s.translate(.5,.5),s.strokeStyle="#red",s.lineWidth=1;var f=(c.width-5-28)/4,l=(c.height-6-28)/5,d=4*f+5-1,p=5*l+6;a(0,p,d,p,14),a(0,0,d,0,14);for(var h=0;h<=4;h++){var v=h*f+1*h;a(v,0,v,p,14)}for(var m=[2,4,6,8],g=Math.min.apply(null,e.map(function(n){return n.fret}))||1,h=g;h<=g+4;h++)if(m.indexOf(h)>-1){var v=(h-g)*f+f/2;t(v,p/2,9,"#eee",14)}for(var h=0;h<5;h++){var E=h*l+1*h;a(0,E,d,E,14)}g>0&&(s.fillStyle="#CCC",s.font="16px Georgia",s.fillText(Math.abs(g),19,c.height-14-10)),e.forEach(function(n,e){if(0!==n.fret){var r=(n.fret-g+.5)*f,a=p-n.string*l-1*(n.string+1);t(r,a,13,"#70C1B3",14),s.fillStyle="#FFF",s.font="16px Helvetica",s.textAlign="center",s.textBaseline="middle",s.fillText(n.note,r+14,a+14)}}),c.classList.add("triad__canvas--active")};n.exports=a},function(n,e){var t=function(n){var e=["E","F",["F#","Gb"],"G",["G#","Ab"],"A",["A#","Bb"],"B","C",["C#","Db"],"D",["D#","Eb"]],t=n.map(function(n){return e.findIndex(function(e){return e.constructor===Array?e.indexOf(n)>-1:e===n})}),r=t[1]-t[0],a=t[2]-t[1];if(r=(r+12)%12,a=(a+12)%12,3===r&&4===a)return n[0]+" minor";if(3===r&&3===a)return n[0]+" dim";if(4===r&&3===a)return n[0]+" major";if(5===r&&3===a)return n[1]+" minor 2 inv";if(4===r&&5===a)return n[2]+" minor 1 inv";if(5===r&&4===a)return n[1]+" major 2 inv";if(3===r&&5===a)return n[2]+" major 1 inv";if(6===r&&3===a)return n[1]+" dim 2 inv";if(3===r&&6===a)return n[2]+" dim 1 inv";throw"Unknown notes distances for "+n};n.exports=t},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=t(0),a=(t.n(r),t(1));!function(){var n=["E","B","G","D","A","E"],e=["E","F",["F#","Gb"],"G",["G#","Ab"],"A",["A#","Bb"],"B","C",["C#","Db"],"D",["D#","Eb"]],t={"c-major":["C","D","E","F","G","A","B"],"f-major":["F","G","A","Bb","C","D","E"],"g-major":["G","A","B","C","D","E","F#"],"d-major":["D","E","F#","G","A","B","C#"],"a-major":["A","B","C#","D","E","F#","G#"],"e-major":["E","F#","G#","A","B","C#","D#"],"b-major":["B","C#","D#","E","F#","G#","A#"]},r=document.getElementsByClassName("triads")[0],i=document.getElementsByClassName("scale-select")[0],o=document.getElementsByClassName("low-string-select")[0],c=document.getElementsByClassName("triad-type-select")[0];Object.keys(t).forEach(function(n){var e=document.createElement("option");e.value=n,e.innerHTML=n,i.append(e)});var u=function(t,r){var a=n[t],i=(e.indexOf(a)+1)%e.length;return[a].concat(e.slice(i)).concat(e.slice(0,i)).concat(e.slice(i))},s=function(n){return Math.min.apply(null,n.map(function(n){return n.fret}))},f=function(){var n=i.options[i.selectedIndex].value,e=parseInt(o.options[o.selectedIndex].value,10),f=c.options[c.selectedIndex].value,l=t[n],d=l.map(function(n,e){var t=(e+2)%7,r=(e+4)%7,a=[n,l[t],l[r]].reverse();switch(f){case"1st-inversion":a.unshift(a.pop());break;case"2nd-inversion":a.unshift(a.pop()),a.unshift(a.pop())}return a}),p=[];d.forEach(function(n,t){var r=n[0],a=e;u(a).reduce(function(n,e,t){return e.constructor===Array&&e.indexOf(r)>-1&&t<14?n.push(t):e===r&&t<14&&n.push(t),n},[]).forEach(function(e){var t=[{fret:e,string:a,note:r}],i=e;n.slice(1).forEach(function(n,e){var r=a+e+1,o=u(r).findIndex(function(e,t){return e.constructor===Array?e.indexOf(n)>-1&&Math.abs(t-i)<3&&t>=0:e===n&&Math.abs(t-i)<3&&t>=0});o>-1&&(t.push({fret:o,string:r,note:n}),i=o)}),3===t.length&&p.push(t)})}),r.innerHTML="",p.sort(function(n,e){return s(n)>s(e)}),p.forEach(function(n,e){a(r,n)})};i.onchange=function(){f()},o.onchange=function(){f()},c.onchange=function(){f()},f()}()}]);