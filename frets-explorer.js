!function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=5)}([function(e,n,t){"use strict";e.exports=function(){return{openStringsNotes:["E","B","G","D","A","E"],notesProgression:["E","F",["F#","Gb"],"G",["G#","Ab"],"A",["A#","Bb"],"B","C",["C#","Db"],"D",["D#","Eb"]],scale_notes:{"c-major":["C","D","E","F","G","A","B"],"f-major":["F","G","A","Bb","C","D","E"],"g-major":["G","A","B","C","D","E","F#"],"d-major":["D","E","F#","G","A","B","C#"],"a-major":["A","B","C#","D","E","F#","G#"],"e-major":["E","F#","G#","A","B","C#","D#"],"b-major":["B","C#","D#","E","F#","G#","A#"]}}}()},function(e,n,t){"use strict";var r=t(3),o=function(e,n){function t(e,n,t,r,o){e=Math.round(e+o),n=Math.round(n+o),t=Math.round(t),u.fillStyle=r,u.beginPath(),u.arc(e,n,t,0,2*Math.PI),u.fill()}function o(e,n,t,r,o){e=Math.round(e+o),n=Math.round(n+o),t=Math.round(t+o),r=Math.round(r+o),u.beginPath(),u.moveTo(e,n),u.lineTo(t,r),u.stroke()}var i=document.createElement("div");i.className="triad__header",i.innerHTML=r(n.map(function(e){return e.note}).reverse());var a=document.createElement("div");a.className="triads__triad triad";var c=document.createElement("canvas");c.className="triad__canvas",a.appendChild(i),a.appendChild(c),e.appendChild(a);var s=window.getComputedStyle(c,null),u=c.getContext("2d"),f=function(e){return"devicePixelRatio"in window&&window.devicePixelRatio>1?window.devicePixelRatio:1}(u);c.width=parseInt(s.getPropertyValue("width"))*f,c.height=parseInt(s.getPropertyValue("height"))*f,u.translate(.5,.5),u.strokeStyle="#red",u.lineWidth=1;var l=14*f,d=9*f,p=13*f,v=(c.width-5-2*l)/4,m=(c.height-6-2*l)/5,h=4*v+5-1,g=5*m+6;o(0,g,h,g,l),o(0,0,h,0,l);for(var E=0;E<=4;E++){var x=E*v+1*E;o(x,0,x,g,l)}for(var C=[3,5,7,9,15],b=Math.min.apply(null,n.map(function(e){return e.fret}))||1,E=b;E<=b+4;E++){if(C.indexOf(E)>-1){var x=(E-b)*v+v/2;t(x,g/2,d,"#eee",l)}if(12===E){var x=(E-b)*v+v/2;t(x,g/6-d,d,"#eee",l),t(x,5*g/6+d,d,"#eee",l)}}for(var E=0;E<5;E++){var y=E*m+1*E;o(0,y,h,y,l)}if(b>0){u.fillStyle="#CCC";var A=16*f;u.font=A+"px Georgia",u.fillText(Math.abs(b),5+l,c.height-l-10)}n.forEach(function(e,n){if(0!==e.fret){var r=(e.fret-b+.5)*v,o=g-e.string*m-1*(e.string+1);t(r,o,p,"#70C1B3",l),u.fillStyle="#FFF";var i=16*f;u.font=i+"px Helvetica",u.textAlign="center",u.textBaseline="middle",u.fillText(e.note,r+l,o+l)}}),c.classList.add("triad__canvas--active")};e.exports=o},function(e,n){},function(e,n,t){"use strict";var r=function(e){var n=["E","F",["F#","Gb"],"G",["G#","Ab"],"A",["A#","Bb"],"B","C",["C#","Db"],"D",["D#","Eb"]],t=e.map(function(e){return n.findIndex(function(n){return n.constructor===Array?n.indexOf(e)>-1:n===e})}),r=t[1]-t[0],o=t[2]-t[1];if(r=(r+12)%12,o=(o+12)%12,3===r&&4===o)return e[0]+" minor";if(3===r&&3===o)return e[0]+" dim";if(4===r&&3===o)return e[0]+" major";if(5===r&&3===o)return e[1]+" minor 2 inv";if(4===r&&5===o)return e[2]+" minor 1 inv";if(5===r&&4===o)return e[1]+" major 2 inv";if(3===r&&5===o)return e[2]+" major 1 inv";if(6===r&&3===o)return e[1]+" dim 2 inv";if(3===r&&6===o)return e[2]+" dim 1 inv";throw"Unknown notes distances for "+e};e.exports=r},,function(e,n,t){"use strict";t(2);var r=t(1),o=t(0);!function(){for(var e=document.getElementsByClassName("triads")[0],n=document.getElementsByClassName("scale-select")[0],t=document.getElementsByClassName("low-string-select")[0],i=document.getElementsByClassName("first-fret-select")[0],a=document.getElementsByClassName("last-fret-select")[0],c=0;c<12;c++){var s=document.createElement("option");s.value=c+1,s.innerHTML=c+1,i.append(s),4===c&&(s.selected=!0),s=document.createElement("option"),s.value=c+1,s.innerHTML=c+1,8===c&&(s.selected=!0),a.append(s)}Object.keys(o.scale_notes).forEach(function(e){var t=document.createElement("option");t.value=e,t.innerHTML=e,n.append(t)});var u=function(e,n){var t=o.openStringsNotes[e],r=(o.notesProgression.indexOf(t)+1)%o.notesProgression.length;return[t].concat(o.notesProgression.slice(r)).concat(o.notesProgression.slice(0,r)).concat(o.notesProgression.slice(r))},f=function(e){return Math.min.apply(null,e.map(function(e){return e.fret}))},l=function(){var c=n.options[n.selectedIndex].value,s=parseInt(t.options[t.selectedIndex].value,10),l=o.scale_notes[c],d=[];l.forEach(function(e,n){var t=(n+2)%7,r=(n+4)%7,o=[e,l[t],l[r]].reverse();d.push(o.slice(0)),o.unshift(o.pop()),d.push(o.slice(0)),o.unshift(o.pop()),d.push(o.slice(0))}),d=Array.from(new Set(d));var p=[];d.forEach(function(e,n){var t=e[0],r=s;u(r).reduce(function(e,n,r){return n.constructor===Array&&n.indexOf(t)>-1&&r<14?e.push(r):n===t&&r<14&&e.push(r),e},[]).forEach(function(n){var o=[{fret:n,string:r,note:t}],i=n;e.slice(1).forEach(function(e,n){var t=r+n+1,a=u(t).findIndex(function(n,t){return n.constructor===Array?n.indexOf(e)>-1&&Math.abs(t-i)<3&&t>=0:n===e&&Math.abs(t-i)<3&&t>=0});a>-1&&(o.push({fret:a,string:t,note:e}),i=a)}),3===o.length&&p.push(o)})}),e.innerHTML="",p.sort(function(e,n){return f(e)>f(n)});var v=i.options[i.selectedIndex].value,m=a.options[a.selectedIndex].value;p=p.filter(function(e){var n=!1;return e.forEach(function(e){e.fret>=v&&e.fret<=m&&(n=!0)}),n}),p.forEach(function(n,t){r(e,n)})};n.onchange=function(){l()},t.onchange=function(){l()},i.onchange=function(){l()},a.onchange=function(){l()},l()}()}]);