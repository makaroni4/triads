!function(n){function e(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var t={};e.m=n,e.c=t,e.i=function(n){return n},e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:r})},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},e.p="",e(e.s=4)}([function(n,e,t){"use strict";n.exports=function(){return{openStringsNotes:["E","B","G","D","A","E"],notesProgression:["E","F",["F#","Gb"],"G",["G#","Ab"],"A",["A#","Bb"],"B","C",["C#","Db"],"D",["D#","Eb"]],scale_notes:{"c-major":["C","D","E","F","G","A","B"],"f-major":["F","G","A","Bb","C","D","E"],"g-major":["G","A","B","C","D","E","F#"],"d-major":["D","E","F#","G","A","B","C#"],"a-major":["A","B","C#","D","E","F#","G#"],"e-major":["E","F#","G#","A","B","C#","D#"],"b-major":["B","C#","D#","E","F#","G#","A#"]}}}()},function(n,e,t){"use strict";var r=t(3),o=function(n,e){function t(n,e,t,r,o){n=Math.round(n+o),e=Math.round(e+o),t=Math.round(t),u.fillStyle=r,u.beginPath(),u.arc(n,e,t,0,2*Math.PI),u.fill()}function o(n,e,t,r,o){n=Math.round(n+o),e=Math.round(e+o),t=Math.round(t+o),r=Math.round(r+o),u.beginPath(),u.moveTo(n,e),u.lineTo(t,r),u.stroke()}var i=document.createElement("div");i.className="triad__header",i.innerHTML=r(e.map(function(n){return n.note}).reverse());var a=document.createElement("div");a.className="triads__triad triad";var s=document.createElement("canvas");s.className="triad__canvas",a.appendChild(i),a.appendChild(s),n.appendChild(a);var c=window.getComputedStyle(s,null),u=s.getContext("2d"),f=function(n){return"devicePixelRatio"in window&&window.devicePixelRatio>1?window.devicePixelRatio:1}(u);s.width=parseInt(c.getPropertyValue("width"))*f,s.height=parseInt(c.getPropertyValue("height"))*f,u.translate(.5,.5),u.strokeStyle="#red",u.lineWidth=1;var l=14*f,d=9*f,p=13*f,v=(s.width-5-2*l)/4,h=(s.height-6-2*l)/5,m=4*v+5-1,g=5*h+6;o(0,g,m,g,l),o(0,0,m,0,l);for(var x=0;x<=4;x++){var E=x*v+1*x;o(E,0,E,g,l)}for(var C=[2,4,6,8],b=Math.min.apply(null,e.map(function(n){return n.fret}))||1,x=b;x<=b+4;x++)if(C.indexOf(x)>-1){var E=(x-b)*v+v/2;t(E,g/2,d,"#eee",l)}for(var x=0;x<5;x++){var y=x*h+1*x;o(0,y,m,y,l)}if(b>0){u.fillStyle="#CCC";var A=16*f;u.font=A+"px Georgia",u.fillText(Math.abs(b),5+l,s.height-l-10)}e.forEach(function(n,e){if(0!==n.fret){var r=(n.fret-b+.5)*v,o=g-n.string*h-1*(n.string+1);t(r,o,p,"#70C1B3",l),u.fillStyle="#FFF";var i=16*f;u.font=i+"px Helvetica",u.textAlign="center",u.textBaseline="middle",u.fillText(n.note,r+l,o+l)}}),s.classList.add("triad__canvas--active")};n.exports=o},function(n,e){},function(n,e,t){"use strict";var r=function(n){var e=["E","F",["F#","Gb"],"G",["G#","Ab"],"A",["A#","Bb"],"B","C",["C#","Db"],"D",["D#","Eb"]],t=n.map(function(n){return e.findIndex(function(e){return e.constructor===Array?e.indexOf(n)>-1:e===n})}),r=t[1]-t[0],o=t[2]-t[1];if(r=(r+12)%12,o=(o+12)%12,3===r&&4===o)return n[0]+" minor";if(3===r&&3===o)return n[0]+" dim";if(4===r&&3===o)return n[0]+" major";if(5===r&&3===o)return n[1]+" minor 2 inv";if(4===r&&5===o)return n[2]+" minor 1 inv";if(5===r&&4===o)return n[1]+" major 2 inv";if(3===r&&5===o)return n[2]+" major 1 inv";if(6===r&&3===o)return n[1]+" dim 2 inv";if(3===r&&6===o)return n[2]+" dim 1 inv";throw"Unknown notes distances for "+n};n.exports=r},function(n,e,t){"use strict";t(2);var r=t(1),o=t(0);!function(){var n=document.getElementsByClassName("triads")[0],e=document.getElementsByClassName("scale-select")[0],t=document.getElementsByClassName("low-string-select")[0],i=document.getElementsByClassName("triad-type-select")[0];Object.keys(o.scale_notes).forEach(function(n){var t=document.createElement("option");t.value=n,t.innerHTML=n,e.append(t)});var a=function(n,e){var t=o.openStringsNotes[n],r=(o.notesProgression.indexOf(t)+1)%o.notesProgression.length;return[t].concat(o.notesProgression.slice(r)).concat(o.notesProgression.slice(0,r)).concat(o.notesProgression.slice(r))},s=function(n){return Math.min.apply(null,n.map(function(n){return n.fret}))},c=function(){var c=e.options[e.selectedIndex].value,u=parseInt(t.options[t.selectedIndex].value,10),f=i.options[i.selectedIndex].value,l=o.scale_notes[c],d=l.map(function(n,e){var t=(e+2)%7,r=(e+4)%7,o=[n,l[t],l[r]].reverse();switch(f){case"1st-inversion":o.unshift(o.pop());break;case"2nd-inversion":o.unshift(o.pop()),o.unshift(o.pop())}return o}),p=[];d.forEach(function(n,e){var t=n[0],r=u;a(r).reduce(function(n,e,r){return e.constructor===Array&&e.indexOf(t)>-1&&r<14?n.push(r):e===t&&r<14&&n.push(r),n},[]).forEach(function(e){var o=[{fret:e,string:r,note:t}],i=e;n.slice(1).forEach(function(n,e){var t=r+e+1,s=a(t).findIndex(function(e,t){return e.constructor===Array?e.indexOf(n)>-1&&Math.abs(t-i)<3&&t>=0:e===n&&Math.abs(t-i)<3&&t>=0});s>-1&&(o.push({fret:s,string:t,note:n}),i=s)}),3===o.length&&p.push(o)})}),n.innerHTML="",p.sort(function(n,e){return s(n)>s(e)}),p.forEach(function(e,t){r(n,e)})};e.onchange=function(){c()},t.onchange=function(){c()},i.onchange=function(){c()},c()}()}]);