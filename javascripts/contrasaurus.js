/*!
 * jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Sat Feb 13 22:33:48 2010 -0500
 */
(function(A,w){function ma(){if(!c.isReady){try{s.documentElement.doScroll("left")}catch(a){setTimeout(ma,1);return}c.ready()}}function Qa(a,b){b.src?c.ajax({url:b.src,async:false,dataType:"script"}):c.globalEval(b.text||b.textContent||b.innerHTML||"");b.parentNode&&b.parentNode.removeChild(b)}function X(a,b,d,f,e,j){var i=a.length;if(typeof b==="object"){for(var o in b)X(a,o,b[o],f,e,d);return a}if(d!==w){f=!j&&f&&c.isFunction(d);for(o=0;o<i;o++)e(a[o],b,f?d.call(a[o],o,e(a[o],b)):d,j);return a}return i?
e(a[0],b):w}function J(){return(new Date).getTime()}function Y(){return false}function Z(){return true}function na(a,b,d){d[0].type=a;return c.event.handle.apply(b,d)}function oa(a){var b,d=[],f=[],e=arguments,j,i,o,k,n,r;i=c.data(this,"events");if(!(a.liveFired===this||!i||!i.live||a.button&&a.type==="click")){a.liveFired=this;var u=i.live.slice(0);for(k=0;k<u.length;k++){i=u[k];i.origType.replace(O,"")===a.type?f.push(i.selector):u.splice(k--,1)}j=c(a.target).closest(f,a.currentTarget);n=0;for(r=
j.length;n<r;n++)for(k=0;k<u.length;k++){i=u[k];if(j[n].selector===i.selector){o=j[n].elem;f=null;if(i.preType==="mouseenter"||i.preType==="mouseleave")f=c(a.relatedTarget).closest(i.selector)[0];if(!f||f!==o)d.push({elem:o,handleObj:i})}}n=0;for(r=d.length;n<r;n++){j=d[n];a.currentTarget=j.elem;a.data=j.handleObj.data;a.handleObj=j.handleObj;if(j.handleObj.origHandler.apply(j.elem,e)===false){b=false;break}}return b}}function pa(a,b){return"live."+(a&&a!=="*"?a+".":"")+b.replace(/\./g,"`").replace(/ /g,
"&")}function qa(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function ra(a,b){var d=0;b.each(function(){if(this.nodeName===(a[d]&&a[d].nodeName)){var f=c.data(a[d++]),e=c.data(this,f);if(f=f&&f.events){delete e.handle;e.events={};for(var j in f)for(var i in f[j])c.event.add(this,j,f[j][i],f[j][i].data)}}})}function sa(a,b,d){var f,e,j;b=b&&b[0]?b[0].ownerDocument||b[0]:s;if(a.length===1&&typeof a[0]==="string"&&a[0].length<512&&b===s&&!ta.test(a[0])&&(c.support.checkClone||!ua.test(a[0]))){e=
true;if(j=c.fragments[a[0]])if(j!==1)f=j}if(!f){f=b.createDocumentFragment();c.clean(a,b,f,d)}if(e)c.fragments[a[0]]=j?f:1;return{fragment:f,cacheable:e}}function K(a,b){var d={};c.each(va.concat.apply([],va.slice(0,b)),function(){d[this]=a});return d}function wa(a){return"scrollTo"in a&&a.document?a:a.nodeType===9?a.defaultView||a.parentWindow:false}var c=function(a,b){return new c.fn.init(a,b)},Ra=A.jQuery,Sa=A.$,s=A.document,T,Ta=/^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,Ua=/^.[^:#\[\.,]*$/,Va=/\S/,
Wa=/^(\s|\u00A0)+|(\s|\u00A0)+$/g,Xa=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,P=navigator.userAgent,xa=false,Q=[],L,$=Object.prototype.toString,aa=Object.prototype.hasOwnProperty,ba=Array.prototype.push,R=Array.prototype.slice,ya=Array.prototype.indexOf;c.fn=c.prototype={init:function(a,b){var d,f;if(!a)return this;if(a.nodeType){this.context=this[0]=a;this.length=1;return this}if(a==="body"&&!b){this.context=s;this[0]=s.body;this.selector="body";this.length=1;return this}if(typeof a==="string")if((d=Ta.exec(a))&&
(d[1]||!b))if(d[1]){f=b?b.ownerDocument||b:s;if(a=Xa.exec(a))if(c.isPlainObject(b)){a=[s.createElement(a[1])];c.fn.attr.call(a,b,true)}else a=[f.createElement(a[1])];else{a=sa([d[1]],[f]);a=(a.cacheable?a.fragment.cloneNode(true):a.fragment).childNodes}return c.merge(this,a)}else{if(b=s.getElementById(d[2])){if(b.id!==d[2])return T.find(a);this.length=1;this[0]=b}this.context=s;this.selector=a;return this}else if(!b&&/^\w+$/.test(a)){this.selector=a;this.context=s;a=s.getElementsByTagName(a);return c.merge(this,
a)}else return!b||b.jquery?(b||T).find(a):c(b).find(a);else if(c.isFunction(a))return T.ready(a);if(a.selector!==w){this.selector=a.selector;this.context=a.context}return c.makeArray(a,this)},selector:"",jquery:"1.4.2",length:0,size:function(){return this.length},toArray:function(){return R.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this.slice(a)[0]:this[a]},pushStack:function(a,b,d){var f=c();c.isArray(a)?ba.apply(f,a):c.merge(f,a);f.prevObject=this;f.context=this.context;if(b===
"find")f.selector=this.selector+(this.selector?" ":"")+d;else if(b)f.selector=this.selector+"."+b+"("+d+")";return f},each:function(a,b){return c.each(this,a,b)},ready:function(a){c.bindReady();if(c.isReady)a.call(s,c);else Q&&Q.push(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(R.apply(this,arguments),"slice",R.call(arguments).join(","))},map:function(a){return this.pushStack(c.map(this,
function(b,d){return a.call(b,d,b)}))},end:function(){return this.prevObject||c(null)},push:ba,sort:[].sort,splice:[].splice};c.fn.init.prototype=c.fn;c.extend=c.fn.extend=function(){var a=arguments[0]||{},b=1,d=arguments.length,f=false,e,j,i,o;if(typeof a==="boolean"){f=a;a=arguments[1]||{};b=2}if(typeof a!=="object"&&!c.isFunction(a))a={};if(d===b){a=this;--b}for(;b<d;b++)if((e=arguments[b])!=null)for(j in e){i=a[j];o=e[j];if(a!==o)if(f&&o&&(c.isPlainObject(o)||c.isArray(o))){i=i&&(c.isPlainObject(i)||
c.isArray(i))?i:c.isArray(o)?[]:{};a[j]=c.extend(f,i,o)}else if(o!==w)a[j]=o}return a};c.extend({noConflict:function(a){A.$=Sa;if(a)A.jQuery=Ra;return c},isReady:false,ready:function(){if(!c.isReady){if(!s.body)return setTimeout(c.ready,13);c.isReady=true;if(Q){for(var a,b=0;a=Q[b++];)a.call(s,c);Q=null}c.fn.triggerHandler&&c(s).triggerHandler("ready")}},bindReady:function(){if(!xa){xa=true;if(s.readyState==="complete")return c.ready();if(s.addEventListener){s.addEventListener("DOMContentLoaded",
L,false);A.addEventListener("load",c.ready,false)}else if(s.attachEvent){s.attachEvent("onreadystatechange",L);A.attachEvent("onload",c.ready);var a=false;try{a=A.frameElement==null}catch(b){}s.documentElement.doScroll&&a&&ma()}}},isFunction:function(a){return $.call(a)==="[object Function]"},isArray:function(a){return $.call(a)==="[object Array]"},isPlainObject:function(a){if(!a||$.call(a)!=="[object Object]"||a.nodeType||a.setInterval)return false;if(a.constructor&&!aa.call(a,"constructor")&&!aa.call(a.constructor.prototype,
"isPrototypeOf"))return false;var b;for(b in a);return b===w||aa.call(a,b)},isEmptyObject:function(a){for(var b in a)return false;return true},error:function(a){throw a;},parseJSON:function(a){if(typeof a!=="string"||!a)return null;a=c.trim(a);if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return A.JSON&&A.JSON.parse?A.JSON.parse(a):(new Function("return "+
a))();else c.error("Invalid JSON: "+a)},noop:function(){},globalEval:function(a){if(a&&Va.test(a)){var b=s.getElementsByTagName("head")[0]||s.documentElement,d=s.createElement("script");d.type="text/javascript";if(c.support.scriptEval)d.appendChild(s.createTextNode(a));else d.text=a;b.insertBefore(d,b.firstChild);b.removeChild(d)}},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,b,d){var f,e=0,j=a.length,i=j===w||c.isFunction(a);if(d)if(i)for(f in a){if(b.apply(a[f],
d)===false)break}else for(;e<j;){if(b.apply(a[e++],d)===false)break}else if(i)for(f in a){if(b.call(a[f],f,a[f])===false)break}else for(d=a[0];e<j&&b.call(d,e,d)!==false;d=a[++e]);return a},trim:function(a){return(a||"").replace(Wa,"")},makeArray:function(a,b){b=b||[];if(a!=null)a.length==null||typeof a==="string"||c.isFunction(a)||typeof a!=="function"&&a.setInterval?ba.call(b,a):c.merge(b,a);return b},inArray:function(a,b){if(b.indexOf)return b.indexOf(a);for(var d=0,f=b.length;d<f;d++)if(b[d]===
a)return d;return-1},merge:function(a,b){var d=a.length,f=0;if(typeof b.length==="number")for(var e=b.length;f<e;f++)a[d++]=b[f];else for(;b[f]!==w;)a[d++]=b[f++];a.length=d;return a},grep:function(a,b,d){for(var f=[],e=0,j=a.length;e<j;e++)!d!==!b(a[e],e)&&f.push(a[e]);return f},map:function(a,b,d){for(var f=[],e,j=0,i=a.length;j<i;j++){e=b(a[j],j,d);if(e!=null)f[f.length]=e}return f.concat.apply([],f)},guid:1,proxy:function(a,b,d){if(arguments.length===2)if(typeof b==="string"){d=a;a=d[b];b=w}else if(b&&
!c.isFunction(b)){d=b;b=w}if(!b&&a)b=function(){return a.apply(d||this,arguments)};if(a)b.guid=a.guid=a.guid||b.guid||c.guid++;return b},uaMatch:function(a){a=a.toLowerCase();a=/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||!/compatible/.test(a)&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(a)||[];return{browser:a[1]||"",version:a[2]||"0"}},browser:{}});P=c.uaMatch(P);if(P.browser){c.browser[P.browser]=true;c.browser.version=P.version}if(c.browser.webkit)c.browser.safari=
true;if(ya)c.inArray=function(a,b){return ya.call(b,a)};T=c(s);if(s.addEventListener)L=function(){s.removeEventListener("DOMContentLoaded",L,false);c.ready()};else if(s.attachEvent)L=function(){if(s.readyState==="complete"){s.detachEvent("onreadystatechange",L);c.ready()}};(function(){c.support={};var a=s.documentElement,b=s.createElement("script"),d=s.createElement("div"),f="script"+J();d.style.display="none";d.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
var e=d.getElementsByTagName("*"),j=d.getElementsByTagName("a")[0];if(!(!e||!e.length||!j)){c.support={leadingWhitespace:d.firstChild.nodeType===3,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/red/.test(j.getAttribute("style")),hrefNormalized:j.getAttribute("href")==="/a",opacity:/^0.55$/.test(j.style.opacity),cssFloat:!!j.style.cssFloat,checkOn:d.getElementsByTagName("input")[0].value==="on",optSelected:s.createElement("select").appendChild(s.createElement("option")).selected,
parentNode:d.removeChild(d.appendChild(s.createElement("div"))).parentNode===null,deleteExpando:true,checkClone:false,scriptEval:false,noCloneEvent:true,boxModel:null};b.type="text/javascript";try{b.appendChild(s.createTextNode("window."+f+"=1;"))}catch(i){}a.insertBefore(b,a.firstChild);if(A[f]){c.support.scriptEval=true;delete A[f]}try{delete b.test}catch(o){c.support.deleteExpando=false}a.removeChild(b);if(d.attachEvent&&d.fireEvent){d.attachEvent("onclick",function k(){c.support.noCloneEvent=
false;d.detachEvent("onclick",k)});d.cloneNode(true).fireEvent("onclick")}d=s.createElement("div");d.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";a=s.createDocumentFragment();a.appendChild(d.firstChild);c.support.checkClone=a.cloneNode(true).cloneNode(true).lastChild.checked;c(function(){var k=s.createElement("div");k.style.width=k.style.paddingLeft="1px";s.body.appendChild(k);c.boxModel=c.support.boxModel=k.offsetWidth===2;s.body.removeChild(k).style.display="none"});a=function(k){var n=
s.createElement("div");k="on"+k;var r=k in n;if(!r){n.setAttribute(k,"return;");r=typeof n[k]==="function"}return r};c.support.submitBubbles=a("submit");c.support.changeBubbles=a("change");a=b=d=e=j=null}})();c.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};var G="jQuery"+J(),Ya=0,za={};c.extend({cache:{},expando:G,noData:{embed:true,object:true,
applet:true},data:function(a,b,d){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==A?za:a;var f=a[G],e=c.cache;if(!f&&typeof b==="string"&&d===w)return null;f||(f=++Ya);if(typeof b==="object"){a[G]=f;e[f]=c.extend(true,{},b)}else if(!e[f]){a[G]=f;e[f]={}}a=e[f];if(d!==w)a[b]=d;return typeof b==="string"?a[b]:a}},removeData:function(a,b){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==A?za:a;var d=a[G],f=c.cache,e=f[d];if(b){if(e){delete e[b];c.isEmptyObject(e)&&c.removeData(a)}}else{if(c.support.deleteExpando)delete a[c.expando];
else a.removeAttribute&&a.removeAttribute(c.expando);delete f[d]}}}});c.fn.extend({data:function(a,b){if(typeof a==="undefined"&&this.length)return c.data(this[0]);else if(typeof a==="object")return this.each(function(){c.data(this,a)});var d=a.split(".");d[1]=d[1]?"."+d[1]:"";if(b===w){var f=this.triggerHandler("getData"+d[1]+"!",[d[0]]);if(f===w&&this.length)f=c.data(this[0],a);return f===w&&d[1]?this.data(d[0]):f}else return this.trigger("setData"+d[1]+"!",[d[0],b]).each(function(){c.data(this,
a,b)})},removeData:function(a){return this.each(function(){c.removeData(this,a)})}});c.extend({queue:function(a,b,d){if(a){b=(b||"fx")+"queue";var f=c.data(a,b);if(!d)return f||[];if(!f||c.isArray(d))f=c.data(a,b,c.makeArray(d));else f.push(d);return f}},dequeue:function(a,b){b=b||"fx";var d=c.queue(a,b),f=d.shift();if(f==="inprogress")f=d.shift();if(f){b==="fx"&&d.unshift("inprogress");f.call(a,function(){c.dequeue(a,b)})}}});c.fn.extend({queue:function(a,b){if(typeof a!=="string"){b=a;a="fx"}if(b===
w)return c.queue(this[0],a);return this.each(function(){var d=c.queue(this,a,b);a==="fx"&&d[0]!=="inprogress"&&c.dequeue(this,a)})},dequeue:function(a){return this.each(function(){c.dequeue(this,a)})},delay:function(a,b){a=c.fx?c.fx.speeds[a]||a:a;b=b||"fx";return this.queue(b,function(){var d=this;setTimeout(function(){c.dequeue(d,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])}});var Aa=/[\n\t]/g,ca=/\s+/,Za=/\r/g,$a=/href|src|style/,ab=/(button|input)/i,bb=/(button|input|object|select|textarea)/i,
cb=/^(a|area)$/i,Ba=/radio|checkbox/;c.fn.extend({attr:function(a,b){return X(this,a,b,true,c.attr)},removeAttr:function(a){return this.each(function(){c.attr(this,a,"");this.nodeType===1&&this.removeAttribute(a)})},addClass:function(a){if(c.isFunction(a))return this.each(function(n){var r=c(this);r.addClass(a.call(this,n,r.attr("class")))});if(a&&typeof a==="string")for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1)if(e.className){for(var j=" "+e.className+" ",
i=e.className,o=0,k=b.length;o<k;o++)if(j.indexOf(" "+b[o]+" ")<0)i+=" "+b[o];e.className=c.trim(i)}else e.className=a}return this},removeClass:function(a){if(c.isFunction(a))return this.each(function(k){var n=c(this);n.removeClass(a.call(this,k,n.attr("class")))});if(a&&typeof a==="string"||a===w)for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1&&e.className)if(a){for(var j=(" "+e.className+" ").replace(Aa," "),i=0,o=b.length;i<o;i++)j=j.replace(" "+b[i]+" ",
" ");e.className=c.trim(j)}else e.className=""}return this},toggleClass:function(a,b){var d=typeof a,f=typeof b==="boolean";if(c.isFunction(a))return this.each(function(e){var j=c(this);j.toggleClass(a.call(this,e,j.attr("class"),b),b)});return this.each(function(){if(d==="string")for(var e,j=0,i=c(this),o=b,k=a.split(ca);e=k[j++];){o=f?o:!i.hasClass(e);i[o?"addClass":"removeClass"](e)}else if(d==="undefined"||d==="boolean"){this.className&&c.data(this,"__className__",this.className);this.className=
this.className||a===false?"":c.data(this,"__className__")||""}})},hasClass:function(a){a=" "+a+" ";for(var b=0,d=this.length;b<d;b++)if((" "+this[b].className+" ").replace(Aa," ").indexOf(a)>-1)return true;return false},val:function(a){if(a===w){var b=this[0];if(b){if(c.nodeName(b,"option"))return(b.attributes.value||{}).specified?b.value:b.text;if(c.nodeName(b,"select")){var d=b.selectedIndex,f=[],e=b.options;b=b.type==="select-one";if(d<0)return null;var j=b?d:0;for(d=b?d+1:e.length;j<d;j++){var i=
e[j];if(i.selected){a=c(i).val();if(b)return a;f.push(a)}}return f}if(Ba.test(b.type)&&!c.support.checkOn)return b.getAttribute("value")===null?"on":b.value;return(b.value||"").replace(Za,"")}return w}var o=c.isFunction(a);return this.each(function(k){var n=c(this),r=a;if(this.nodeType===1){if(o)r=a.call(this,k,n.val());if(typeof r==="number")r+="";if(c.isArray(r)&&Ba.test(this.type))this.checked=c.inArray(n.val(),r)>=0;else if(c.nodeName(this,"select")){var u=c.makeArray(r);c("option",this).each(function(){this.selected=
c.inArray(c(this).val(),u)>=0});if(!u.length)this.selectedIndex=-1}else this.value=r}})}});c.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(a,b,d,f){if(!a||a.nodeType===3||a.nodeType===8)return w;if(f&&b in c.attrFn)return c(a)[b](d);f=a.nodeType!==1||!c.isXMLDoc(a);var e=d!==w;b=f&&c.props[b]||b;if(a.nodeType===1){var j=$a.test(b);if(b in a&&f&&!j){if(e){b==="type"&&ab.test(a.nodeName)&&a.parentNode&&c.error("type property can't be changed");
a[b]=d}if(c.nodeName(a,"form")&&a.getAttributeNode(b))return a.getAttributeNode(b).nodeValue;if(b==="tabIndex")return(b=a.getAttributeNode("tabIndex"))&&b.specified?b.value:bb.test(a.nodeName)||cb.test(a.nodeName)&&a.href?0:w;return a[b]}if(!c.support.style&&f&&b==="style"){if(e)a.style.cssText=""+d;return a.style.cssText}e&&a.setAttribute(b,""+d);a=!c.support.hrefNormalized&&f&&j?a.getAttribute(b,2):a.getAttribute(b);return a===null?w:a}return c.style(a,b,d)}});var O=/\.(.*)$/,db=function(a){return a.replace(/[^\w\s\.\|`]/g,
function(b){return"\\"+b})};c.event={add:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){if(a.setInterval&&a!==A&&!a.frameElement)a=A;var e,j;if(d.handler){e=d;d=e.handler}if(!d.guid)d.guid=c.guid++;if(j=c.data(a)){var i=j.events=j.events||{},o=j.handle;if(!o)j.handle=o=function(){return typeof c!=="undefined"&&!c.event.triggered?c.event.handle.apply(o.elem,arguments):w};o.elem=a;b=b.split(" ");for(var k,n=0,r;k=b[n++];){j=e?c.extend({},e):{handler:d,data:f};if(k.indexOf(".")>-1){r=k.split(".");
k=r.shift();j.namespace=r.slice(0).sort().join(".")}else{r=[];j.namespace=""}j.type=k;j.guid=d.guid;var u=i[k],z=c.event.special[k]||{};if(!u){u=i[k]=[];if(!z.setup||z.setup.call(a,f,r,o)===false)if(a.addEventListener)a.addEventListener(k,o,false);else a.attachEvent&&a.attachEvent("on"+k,o)}if(z.add){z.add.call(a,j);if(!j.handler.guid)j.handler.guid=d.guid}u.push(j);c.event.global[k]=true}a=null}}},global:{},remove:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){var e,j=0,i,o,k,n,r,u,z=c.data(a),
C=z&&z.events;if(z&&C){if(b&&b.type){d=b.handler;b=b.type}if(!b||typeof b==="string"&&b.charAt(0)==="."){b=b||"";for(e in C)c.event.remove(a,e+b)}else{for(b=b.split(" ");e=b[j++];){n=e;i=e.indexOf(".")<0;o=[];if(!i){o=e.split(".");e=o.shift();k=new RegExp("(^|\\.)"+c.map(o.slice(0).sort(),db).join("\\.(?:.*\\.)?")+"(\\.|$)")}if(r=C[e])if(d){n=c.event.special[e]||{};for(B=f||0;B<r.length;B++){u=r[B];if(d.guid===u.guid){if(i||k.test(u.namespace)){f==null&&r.splice(B--,1);n.remove&&n.remove.call(a,u)}if(f!=
null)break}}if(r.length===0||f!=null&&r.length===1){if(!n.teardown||n.teardown.call(a,o)===false)Ca(a,e,z.handle);delete C[e]}}else for(var B=0;B<r.length;B++){u=r[B];if(i||k.test(u.namespace)){c.event.remove(a,n,u.handler,B);r.splice(B--,1)}}}if(c.isEmptyObject(C)){if(b=z.handle)b.elem=null;delete z.events;delete z.handle;c.isEmptyObject(z)&&c.removeData(a)}}}}},trigger:function(a,b,d,f){var e=a.type||a;if(!f){a=typeof a==="object"?a[G]?a:c.extend(c.Event(e),a):c.Event(e);if(e.indexOf("!")>=0){a.type=
e=e.slice(0,-1);a.exclusive=true}if(!d){a.stopPropagation();c.event.global[e]&&c.each(c.cache,function(){this.events&&this.events[e]&&c.event.trigger(a,b,this.handle.elem)})}if(!d||d.nodeType===3||d.nodeType===8)return w;a.result=w;a.target=d;b=c.makeArray(b);b.unshift(a)}a.currentTarget=d;(f=c.data(d,"handle"))&&f.apply(d,b);f=d.parentNode||d.ownerDocument;try{if(!(d&&d.nodeName&&c.noData[d.nodeName.toLowerCase()]))if(d["on"+e]&&d["on"+e].apply(d,b)===false)a.result=false}catch(j){}if(!a.isPropagationStopped()&&
f)c.event.trigger(a,b,f,true);else if(!a.isDefaultPrevented()){f=a.target;var i,o=c.nodeName(f,"a")&&e==="click",k=c.event.special[e]||{};if((!k._default||k._default.call(d,a)===false)&&!o&&!(f&&f.nodeName&&c.noData[f.nodeName.toLowerCase()])){try{if(f[e]){if(i=f["on"+e])f["on"+e]=null;c.event.triggered=true;f[e]()}}catch(n){}if(i)f["on"+e]=i;c.event.triggered=false}}},handle:function(a){var b,d,f,e;a=arguments[0]=c.event.fix(a||A.event);a.currentTarget=this;b=a.type.indexOf(".")<0&&!a.exclusive;
if(!b){d=a.type.split(".");a.type=d.shift();f=new RegExp("(^|\\.)"+d.slice(0).sort().join("\\.(?:.*\\.)?")+"(\\.|$)")}e=c.data(this,"events");d=e[a.type];if(e&&d){d=d.slice(0);e=0;for(var j=d.length;e<j;e++){var i=d[e];if(b||f.test(i.namespace)){a.handler=i.handler;a.data=i.data;a.handleObj=i;i=i.handler.apply(this,arguments);if(i!==w){a.result=i;if(i===false){a.preventDefault();a.stopPropagation()}}if(a.isImmediatePropagationStopped())break}}}return a.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
fix:function(a){if(a[G])return a;var b=a;a=c.Event(b);for(var d=this.props.length,f;d;){f=this.props[--d];a[f]=b[f]}if(!a.target)a.target=a.srcElement||s;if(a.target.nodeType===3)a.target=a.target.parentNode;if(!a.relatedTarget&&a.fromElement)a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;if(a.pageX==null&&a.clientX!=null){b=s.documentElement;d=s.body;a.pageX=a.clientX+(b&&b.scrollLeft||d&&d.scrollLeft||0)-(b&&b.clientLeft||d&&d.clientLeft||0);a.pageY=a.clientY+(b&&b.scrollTop||
d&&d.scrollTop||0)-(b&&b.clientTop||d&&d.clientTop||0)}if(!a.which&&(a.charCode||a.charCode===0?a.charCode:a.keyCode))a.which=a.charCode||a.keyCode;if(!a.metaKey&&a.ctrlKey)a.metaKey=a.ctrlKey;if(!a.which&&a.button!==w)a.which=a.button&1?1:a.button&2?3:a.button&4?2:0;return a},guid:1E8,proxy:c.proxy,special:{ready:{setup:c.bindReady,teardown:c.noop},live:{add:function(a){c.event.add(this,a.origType,c.extend({},a,{handler:oa}))},remove:function(a){var b=true,d=a.origType.replace(O,"");c.each(c.data(this,
"events").live||[],function(){if(d===this.origType.replace(O,""))return b=false});b&&c.event.remove(this,a.origType,oa)}},beforeunload:{setup:function(a,b,d){if(this.setInterval)this.onbeforeunload=d;return false},teardown:function(a,b){if(this.onbeforeunload===b)this.onbeforeunload=null}}}};var Ca=s.removeEventListener?function(a,b,d){a.removeEventListener(b,d,false)}:function(a,b,d){a.detachEvent("on"+b,d)};c.Event=function(a){if(!this.preventDefault)return new c.Event(a);if(a&&a.type){this.originalEvent=
a;this.type=a.type}else this.type=a;this.timeStamp=J();this[G]=true};c.Event.prototype={preventDefault:function(){this.isDefaultPrevented=Z;var a=this.originalEvent;if(a){a.preventDefault&&a.preventDefault();a.returnValue=false}},stopPropagation:function(){this.isPropagationStopped=Z;var a=this.originalEvent;if(a){a.stopPropagation&&a.stopPropagation();a.cancelBubble=true}},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z;this.stopPropagation()},isDefaultPrevented:Y,isPropagationStopped:Y,
isImmediatePropagationStopped:Y};var Da=function(a){var b=a.relatedTarget;try{for(;b&&b!==this;)b=b.parentNode;if(b!==this){a.type=a.data;c.event.handle.apply(this,arguments)}}catch(d){}},Ea=function(a){a.type=a.data;c.event.handle.apply(this,arguments)};c.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){c.event.special[a]={setup:function(d){c.event.add(this,b,d&&d.selector?Ea:Da,a)},teardown:function(d){c.event.remove(this,b,d&&d.selector?Ea:Da)}}});if(!c.support.submitBubbles)c.event.special.submit=
{setup:function(){if(this.nodeName.toLowerCase()!=="form"){c.event.add(this,"click.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="submit"||d==="image")&&c(b).closest("form").length)return na("submit",this,arguments)});c.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="text"||d==="password")&&c(b).closest("form").length&&a.keyCode===13)return na("submit",this,arguments)})}else return false},teardown:function(){c.event.remove(this,".specialSubmit")}};
if(!c.support.changeBubbles){var da=/textarea|input|select/i,ea,Fa=function(a){var b=a.type,d=a.value;if(b==="radio"||b==="checkbox")d=a.checked;else if(b==="select-multiple")d=a.selectedIndex>-1?c.map(a.options,function(f){return f.selected}).join("-"):"";else if(a.nodeName.toLowerCase()==="select")d=a.selectedIndex;return d},fa=function(a,b){var d=a.target,f,e;if(!(!da.test(d.nodeName)||d.readOnly)){f=c.data(d,"_change_data");e=Fa(d);if(a.type!=="focusout"||d.type!=="radio")c.data(d,"_change_data",
e);if(!(f===w||e===f))if(f!=null||e){a.type="change";return c.event.trigger(a,b,d)}}};c.event.special.change={filters:{focusout:fa,click:function(a){var b=a.target,d=b.type;if(d==="radio"||d==="checkbox"||b.nodeName.toLowerCase()==="select")return fa.call(this,a)},keydown:function(a){var b=a.target,d=b.type;if(a.keyCode===13&&b.nodeName.toLowerCase()!=="textarea"||a.keyCode===32&&(d==="checkbox"||d==="radio")||d==="select-multiple")return fa.call(this,a)},beforeactivate:function(a){a=a.target;c.data(a,
"_change_data",Fa(a))}},setup:function(){if(this.type==="file")return false;for(var a in ea)c.event.add(this,a+".specialChange",ea[a]);return da.test(this.nodeName)},teardown:function(){c.event.remove(this,".specialChange");return da.test(this.nodeName)}};ea=c.event.special.change.filters}s.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(f){f=c.event.fix(f);f.type=b;return c.event.handle.call(this,f)}c.event.special[b]={setup:function(){this.addEventListener(a,
d,true)},teardown:function(){this.removeEventListener(a,d,true)}}});c.each(["bind","one"],function(a,b){c.fn[b]=function(d,f,e){if(typeof d==="object"){for(var j in d)this[b](j,f,d[j],e);return this}if(c.isFunction(f)){e=f;f=w}var i=b==="one"?c.proxy(e,function(k){c(this).unbind(k,i);return e.apply(this,arguments)}):e;if(d==="unload"&&b!=="one")this.one(d,f,e);else{j=0;for(var o=this.length;j<o;j++)c.event.add(this[j],d,i,f)}return this}});c.fn.extend({unbind:function(a,b){if(typeof a==="object"&&
!a.preventDefault)for(var d in a)this.unbind(d,a[d]);else{d=0;for(var f=this.length;d<f;d++)c.event.remove(this[d],a,b)}return this},delegate:function(a,b,d,f){return this.live(b,d,f,a)},undelegate:function(a,b,d){return arguments.length===0?this.unbind("live"):this.die(b,null,d,a)},trigger:function(a,b){return this.each(function(){c.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){a=c.Event(a);a.preventDefault();a.stopPropagation();c.event.trigger(a,b,this[0]);return a.result}},
toggle:function(a){for(var b=arguments,d=1;d<b.length;)c.proxy(a,b[d++]);return this.click(c.proxy(a,function(f){var e=(c.data(this,"lastToggle"+a.guid)||0)%d;c.data(this,"lastToggle"+a.guid,e+1);f.preventDefault();return b[e].apply(this,arguments)||false}))},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var Ga={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};c.each(["live","die"],function(a,b){c.fn[b]=function(d,f,e,j){var i,o=0,k,n,r=j||this.selector,
u=j?this:c(this.context);if(c.isFunction(f)){e=f;f=w}for(d=(d||"").split(" ");(i=d[o++])!=null;){j=O.exec(i);k="";if(j){k=j[0];i=i.replace(O,"")}if(i==="hover")d.push("mouseenter"+k,"mouseleave"+k);else{n=i;if(i==="focus"||i==="blur"){d.push(Ga[i]+k);i+=k}else i=(Ga[i]||i)+k;b==="live"?u.each(function(){c.event.add(this,pa(i,r),{data:f,selector:r,handler:e,origType:i,origHandler:e,preType:n})}):u.unbind(pa(i,r),e)}}return this}});c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),
function(a,b){c.fn[b]=function(d){return d?this.bind(b,d):this.trigger(b)};if(c.attrFn)c.attrFn[b]=true});A.attachEvent&&!A.addEventListener&&A.attachEvent("onunload",function(){for(var a in c.cache)if(c.cache[a].handle)try{c.event.remove(c.cache[a].handle.elem)}catch(b){}});(function(){function a(g){for(var h="",l,m=0;g[m];m++){l=g[m];if(l.nodeType===3||l.nodeType===4)h+=l.nodeValue;else if(l.nodeType!==8)h+=a(l.childNodes)}return h}function b(g,h,l,m,q,p){q=0;for(var v=m.length;q<v;q++){var t=m[q];
if(t){t=t[g];for(var y=false;t;){if(t.sizcache===l){y=m[t.sizset];break}if(t.nodeType===1&&!p){t.sizcache=l;t.sizset=q}if(t.nodeName.toLowerCase()===h){y=t;break}t=t[g]}m[q]=y}}}function d(g,h,l,m,q,p){q=0;for(var v=m.length;q<v;q++){var t=m[q];if(t){t=t[g];for(var y=false;t;){if(t.sizcache===l){y=m[t.sizset];break}if(t.nodeType===1){if(!p){t.sizcache=l;t.sizset=q}if(typeof h!=="string"){if(t===h){y=true;break}}else if(k.filter(h,[t]).length>0){y=t;break}}t=t[g]}m[q]=y}}}var f=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
e=0,j=Object.prototype.toString,i=false,o=true;[0,0].sort(function(){o=false;return 0});var k=function(g,h,l,m){l=l||[];var q=h=h||s;if(h.nodeType!==1&&h.nodeType!==9)return[];if(!g||typeof g!=="string")return l;for(var p=[],v,t,y,S,H=true,M=x(h),I=g;(f.exec(""),v=f.exec(I))!==null;){I=v[3];p.push(v[1]);if(v[2]){S=v[3];break}}if(p.length>1&&r.exec(g))if(p.length===2&&n.relative[p[0]])t=ga(p[0]+p[1],h);else for(t=n.relative[p[0]]?[h]:k(p.shift(),h);p.length;){g=p.shift();if(n.relative[g])g+=p.shift();
t=ga(g,t)}else{if(!m&&p.length>1&&h.nodeType===9&&!M&&n.match.ID.test(p[0])&&!n.match.ID.test(p[p.length-1])){v=k.find(p.shift(),h,M);h=v.expr?k.filter(v.expr,v.set)[0]:v.set[0]}if(h){v=m?{expr:p.pop(),set:z(m)}:k.find(p.pop(),p.length===1&&(p[0]==="~"||p[0]==="+")&&h.parentNode?h.parentNode:h,M);t=v.expr?k.filter(v.expr,v.set):v.set;if(p.length>0)y=z(t);else H=false;for(;p.length;){var D=p.pop();v=D;if(n.relative[D])v=p.pop();else D="";if(v==null)v=h;n.relative[D](y,v,M)}}else y=[]}y||(y=t);y||k.error(D||
g);if(j.call(y)==="[object Array]")if(H)if(h&&h.nodeType===1)for(g=0;y[g]!=null;g++){if(y[g]&&(y[g]===true||y[g].nodeType===1&&E(h,y[g])))l.push(t[g])}else for(g=0;y[g]!=null;g++)y[g]&&y[g].nodeType===1&&l.push(t[g]);else l.push.apply(l,y);else z(y,l);if(S){k(S,q,l,m);k.uniqueSort(l)}return l};k.uniqueSort=function(g){if(B){i=o;g.sort(B);if(i)for(var h=1;h<g.length;h++)g[h]===g[h-1]&&g.splice(h--,1)}return g};k.matches=function(g,h){return k(g,null,null,h)};k.find=function(g,h,l){var m,q;if(!g)return[];
for(var p=0,v=n.order.length;p<v;p++){var t=n.order[p];if(q=n.leftMatch[t].exec(g)){var y=q[1];q.splice(1,1);if(y.substr(y.length-1)!=="\\"){q[1]=(q[1]||"").replace(/\\/g,"");m=n.find[t](q,h,l);if(m!=null){g=g.replace(n.match[t],"");break}}}}m||(m=h.getElementsByTagName("*"));return{set:m,expr:g}};k.filter=function(g,h,l,m){for(var q=g,p=[],v=h,t,y,S=h&&h[0]&&x(h[0]);g&&h.length;){for(var H in n.filter)if((t=n.leftMatch[H].exec(g))!=null&&t[2]){var M=n.filter[H],I,D;D=t[1];y=false;t.splice(1,1);if(D.substr(D.length-
1)!=="\\"){if(v===p)p=[];if(n.preFilter[H])if(t=n.preFilter[H](t,v,l,p,m,S)){if(t===true)continue}else y=I=true;if(t)for(var U=0;(D=v[U])!=null;U++)if(D){I=M(D,t,U,v);var Ha=m^!!I;if(l&&I!=null)if(Ha)y=true;else v[U]=false;else if(Ha){p.push(D);y=true}}if(I!==w){l||(v=p);g=g.replace(n.match[H],"");if(!y)return[];break}}}if(g===q)if(y==null)k.error(g);else break;q=g}return v};k.error=function(g){throw"Syntax error, unrecognized expression: "+g;};var n=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(g){return g.getAttribute("href")}},
relative:{"+":function(g,h){var l=typeof h==="string",m=l&&!/\W/.test(h);l=l&&!m;if(m)h=h.toLowerCase();m=0;for(var q=g.length,p;m<q;m++)if(p=g[m]){for(;(p=p.previousSibling)&&p.nodeType!==1;);g[m]=l||p&&p.nodeName.toLowerCase()===h?p||false:p===h}l&&k.filter(h,g,true)},">":function(g,h){var l=typeof h==="string";if(l&&!/\W/.test(h)){h=h.toLowerCase();for(var m=0,q=g.length;m<q;m++){var p=g[m];if(p){l=p.parentNode;g[m]=l.nodeName.toLowerCase()===h?l:false}}}else{m=0;for(q=g.length;m<q;m++)if(p=g[m])g[m]=
l?p.parentNode:p.parentNode===h;l&&k.filter(h,g,true)}},"":function(g,h,l){var m=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("parentNode",h,m,g,p,l)},"~":function(g,h,l){var m=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("previousSibling",h,m,g,p,l)}},find:{ID:function(g,h,l){if(typeof h.getElementById!=="undefined"&&!l)return(g=h.getElementById(g[1]))?[g]:[]},NAME:function(g,h){if(typeof h.getElementsByName!=="undefined"){var l=[];
h=h.getElementsByName(g[1]);for(var m=0,q=h.length;m<q;m++)h[m].getAttribute("name")===g[1]&&l.push(h[m]);return l.length===0?null:l}},TAG:function(g,h){return h.getElementsByTagName(g[1])}},preFilter:{CLASS:function(g,h,l,m,q,p){g=" "+g[1].replace(/\\/g,"")+" ";if(p)return g;p=0;for(var v;(v=h[p])!=null;p++)if(v)if(q^(v.className&&(" "+v.className+" ").replace(/[\t\n]/g," ").indexOf(g)>=0))l||m.push(v);else if(l)h[p]=false;return false},ID:function(g){return g[1].replace(/\\/g,"")},TAG:function(g){return g[1].toLowerCase()},
CHILD:function(g){if(g[1]==="nth"){var h=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2]==="even"&&"2n"||g[2]==="odd"&&"2n+1"||!/\D/.test(g[2])&&"0n+"+g[2]||g[2]);g[2]=h[1]+(h[2]||1)-0;g[3]=h[3]-0}g[0]=e++;return g},ATTR:function(g,h,l,m,q,p){h=g[1].replace(/\\/g,"");if(!p&&n.attrMap[h])g[1]=n.attrMap[h];if(g[2]==="~=")g[4]=" "+g[4]+" ";return g},PSEUDO:function(g,h,l,m,q){if(g[1]==="not")if((f.exec(g[3])||"").length>1||/^\w/.test(g[3]))g[3]=k(g[3],null,null,h);else{g=k.filter(g[3],h,l,true^q);l||m.push.apply(m,
g);return false}else if(n.match.POS.test(g[0])||n.match.CHILD.test(g[0]))return true;return g},POS:function(g){g.unshift(true);return g}},filters:{enabled:function(g){return g.disabled===false&&g.type!=="hidden"},disabled:function(g){return g.disabled===true},checked:function(g){return g.checked===true},selected:function(g){return g.selected===true},parent:function(g){return!!g.firstChild},empty:function(g){return!g.firstChild},has:function(g,h,l){return!!k(l[3],g).length},header:function(g){return/h\d/i.test(g.nodeName)},
text:function(g){return"text"===g.type},radio:function(g){return"radio"===g.type},checkbox:function(g){return"checkbox"===g.type},file:function(g){return"file"===g.type},password:function(g){return"password"===g.type},submit:function(g){return"submit"===g.type},image:function(g){return"image"===g.type},reset:function(g){return"reset"===g.type},button:function(g){return"button"===g.type||g.nodeName.toLowerCase()==="button"},input:function(g){return/input|select|textarea|button/i.test(g.nodeName)}},
setFilters:{first:function(g,h){return h===0},last:function(g,h,l,m){return h===m.length-1},even:function(g,h){return h%2===0},odd:function(g,h){return h%2===1},lt:function(g,h,l){return h<l[3]-0},gt:function(g,h,l){return h>l[3]-0},nth:function(g,h,l){return l[3]-0===h},eq:function(g,h,l){return l[3]-0===h}},filter:{PSEUDO:function(g,h,l,m){var q=h[1],p=n.filters[q];if(p)return p(g,l,h,m);else if(q==="contains")return(g.textContent||g.innerText||a([g])||"").indexOf(h[3])>=0;else if(q==="not"){h=
h[3];l=0;for(m=h.length;l<m;l++)if(h[l]===g)return false;return true}else k.error("Syntax error, unrecognized expression: "+q)},CHILD:function(g,h){var l=h[1],m=g;switch(l){case "only":case "first":for(;m=m.previousSibling;)if(m.nodeType===1)return false;if(l==="first")return true;m=g;case "last":for(;m=m.nextSibling;)if(m.nodeType===1)return false;return true;case "nth":l=h[2];var q=h[3];if(l===1&&q===0)return true;h=h[0];var p=g.parentNode;if(p&&(p.sizcache!==h||!g.nodeIndex)){var v=0;for(m=p.firstChild;m;m=
m.nextSibling)if(m.nodeType===1)m.nodeIndex=++v;p.sizcache=h}g=g.nodeIndex-q;return l===0?g===0:g%l===0&&g/l>=0}},ID:function(g,h){return g.nodeType===1&&g.getAttribute("id")===h},TAG:function(g,h){return h==="*"&&g.nodeType===1||g.nodeName.toLowerCase()===h},CLASS:function(g,h){return(" "+(g.className||g.getAttribute("class"))+" ").indexOf(h)>-1},ATTR:function(g,h){var l=h[1];g=n.attrHandle[l]?n.attrHandle[l](g):g[l]!=null?g[l]:g.getAttribute(l);l=g+"";var m=h[2];h=h[4];return g==null?m==="!=":m===
"="?l===h:m==="*="?l.indexOf(h)>=0:m==="~="?(" "+l+" ").indexOf(h)>=0:!h?l&&g!==false:m==="!="?l!==h:m==="^="?l.indexOf(h)===0:m==="$="?l.substr(l.length-h.length)===h:m==="|="?l===h||l.substr(0,h.length+1)===h+"-":false},POS:function(g,h,l,m){var q=n.setFilters[h[2]];if(q)return q(g,l,h,m)}}},r=n.match.POS;for(var u in n.match){n.match[u]=new RegExp(n.match[u].source+/(?![^\[]*\])(?![^\(]*\))/.source);n.leftMatch[u]=new RegExp(/(^(?:.|\r|\n)*?)/.source+n.match[u].source.replace(/\\(\d+)/g,function(g,
h){return"\\"+(h-0+1)}))}var z=function(g,h){g=Array.prototype.slice.call(g,0);if(h){h.push.apply(h,g);return h}return g};try{Array.prototype.slice.call(s.documentElement.childNodes,0)}catch(C){z=function(g,h){h=h||[];if(j.call(g)==="[object Array]")Array.prototype.push.apply(h,g);else if(typeof g.length==="number")for(var l=0,m=g.length;l<m;l++)h.push(g[l]);else for(l=0;g[l];l++)h.push(g[l]);return h}}var B;if(s.documentElement.compareDocumentPosition)B=function(g,h){if(!g.compareDocumentPosition||
!h.compareDocumentPosition){if(g==h)i=true;return g.compareDocumentPosition?-1:1}g=g.compareDocumentPosition(h)&4?-1:g===h?0:1;if(g===0)i=true;return g};else if("sourceIndex"in s.documentElement)B=function(g,h){if(!g.sourceIndex||!h.sourceIndex){if(g==h)i=true;return g.sourceIndex?-1:1}g=g.sourceIndex-h.sourceIndex;if(g===0)i=true;return g};else if(s.createRange)B=function(g,h){if(!g.ownerDocument||!h.ownerDocument){if(g==h)i=true;return g.ownerDocument?-1:1}var l=g.ownerDocument.createRange(),m=
h.ownerDocument.createRange();l.setStart(g,0);l.setEnd(g,0);m.setStart(h,0);m.setEnd(h,0);g=l.compareBoundaryPoints(Range.START_TO_END,m);if(g===0)i=true;return g};(function(){var g=s.createElement("div"),h="script"+(new Date).getTime();g.innerHTML="<a name='"+h+"'/>";var l=s.documentElement;l.insertBefore(g,l.firstChild);if(s.getElementById(h)){n.find.ID=function(m,q,p){if(typeof q.getElementById!=="undefined"&&!p)return(q=q.getElementById(m[1]))?q.id===m[1]||typeof q.getAttributeNode!=="undefined"&&
q.getAttributeNode("id").nodeValue===m[1]?[q]:w:[]};n.filter.ID=function(m,q){var p=typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id");return m.nodeType===1&&p&&p.nodeValue===q}}l.removeChild(g);l=g=null})();(function(){var g=s.createElement("div");g.appendChild(s.createComment(""));if(g.getElementsByTagName("*").length>0)n.find.TAG=function(h,l){l=l.getElementsByTagName(h[1]);if(h[1]==="*"){h=[];for(var m=0;l[m];m++)l[m].nodeType===1&&h.push(l[m]);l=h}return l};g.innerHTML="<a href='#'></a>";
if(g.firstChild&&typeof g.firstChild.getAttribute!=="undefined"&&g.firstChild.getAttribute("href")!=="#")n.attrHandle.href=function(h){return h.getAttribute("href",2)};g=null})();s.querySelectorAll&&function(){var g=k,h=s.createElement("div");h.innerHTML="<p class='TEST'></p>";if(!(h.querySelectorAll&&h.querySelectorAll(".TEST").length===0)){k=function(m,q,p,v){q=q||s;if(!v&&q.nodeType===9&&!x(q))try{return z(q.querySelectorAll(m),p)}catch(t){}return g(m,q,p,v)};for(var l in g)k[l]=g[l];h=null}}();
(function(){var g=s.createElement("div");g.innerHTML="<div class='test e'></div><div class='test'></div>";if(!(!g.getElementsByClassName||g.getElementsByClassName("e").length===0)){g.lastChild.className="e";if(g.getElementsByClassName("e").length!==1){n.order.splice(1,0,"CLASS");n.find.CLASS=function(h,l,m){if(typeof l.getElementsByClassName!=="undefined"&&!m)return l.getElementsByClassName(h[1])};g=null}}})();var E=s.compareDocumentPosition?function(g,h){return!!(g.compareDocumentPosition(h)&16)}:
function(g,h){return g!==h&&(g.contains?g.contains(h):true)},x=function(g){return(g=(g?g.ownerDocument||g:0).documentElement)?g.nodeName!=="HTML":false},ga=function(g,h){var l=[],m="",q;for(h=h.nodeType?[h]:h;q=n.match.PSEUDO.exec(g);){m+=q[0];g=g.replace(n.match.PSEUDO,"")}g=n.relative[g]?g+"*":g;q=0;for(var p=h.length;q<p;q++)k(g,h[q],l);return k.filter(m,l)};c.find=k;c.expr=k.selectors;c.expr[":"]=c.expr.filters;c.unique=k.uniqueSort;c.text=a;c.isXMLDoc=x;c.contains=E})();var eb=/Until$/,fb=/^(?:parents|prevUntil|prevAll)/,
gb=/,/;R=Array.prototype.slice;var Ia=function(a,b,d){if(c.isFunction(b))return c.grep(a,function(e,j){return!!b.call(e,j,e)===d});else if(b.nodeType)return c.grep(a,function(e){return e===b===d});else if(typeof b==="string"){var f=c.grep(a,function(e){return e.nodeType===1});if(Ua.test(b))return c.filter(b,f,!d);else b=c.filter(b,f)}return c.grep(a,function(e){return c.inArray(e,b)>=0===d})};c.fn.extend({find:function(a){for(var b=this.pushStack("","find",a),d=0,f=0,e=this.length;f<e;f++){d=b.length;
c.find(a,this[f],b);if(f>0)for(var j=d;j<b.length;j++)for(var i=0;i<d;i++)if(b[i]===b[j]){b.splice(j--,1);break}}return b},has:function(a){var b=c(a);return this.filter(function(){for(var d=0,f=b.length;d<f;d++)if(c.contains(this,b[d]))return true})},not:function(a){return this.pushStack(Ia(this,a,false),"not",a)},filter:function(a){return this.pushStack(Ia(this,a,true),"filter",a)},is:function(a){return!!a&&c.filter(a,this).length>0},closest:function(a,b){if(c.isArray(a)){var d=[],f=this[0],e,j=
{},i;if(f&&a.length){e=0;for(var o=a.length;e<o;e++){i=a[e];j[i]||(j[i]=c.expr.match.POS.test(i)?c(i,b||this.context):i)}for(;f&&f.ownerDocument&&f!==b;){for(i in j){e=j[i];if(e.jquery?e.index(f)>-1:c(f).is(e)){d.push({selector:i,elem:f});delete j[i]}}f=f.parentNode}}return d}var k=c.expr.match.POS.test(a)?c(a,b||this.context):null;return this.map(function(n,r){for(;r&&r.ownerDocument&&r!==b;){if(k?k.index(r)>-1:c(r).is(a))return r;r=r.parentNode}return null})},index:function(a){if(!a||typeof a===
"string")return c.inArray(this[0],a?c(a):this.parent().children());return c.inArray(a.jquery?a[0]:a,this)},add:function(a,b){a=typeof a==="string"?c(a,b||this.context):c.makeArray(a);b=c.merge(this.get(),a);return this.pushStack(qa(a[0])||qa(b[0])?b:c.unique(b))},andSelf:function(){return this.add(this.prevObject)}});c.each({parent:function(a){return(a=a.parentNode)&&a.nodeType!==11?a:null},parents:function(a){return c.dir(a,"parentNode")},parentsUntil:function(a,b,d){return c.dir(a,"parentNode",
d)},next:function(a){return c.nth(a,2,"nextSibling")},prev:function(a){return c.nth(a,2,"previousSibling")},nextAll:function(a){return c.dir(a,"nextSibling")},prevAll:function(a){return c.dir(a,"previousSibling")},nextUntil:function(a,b,d){return c.dir(a,"nextSibling",d)},prevUntil:function(a,b,d){return c.dir(a,"previousSibling",d)},siblings:function(a){return c.sibling(a.parentNode.firstChild,a)},children:function(a){return c.sibling(a.firstChild)},contents:function(a){return c.nodeName(a,"iframe")?
a.contentDocument||a.contentWindow.document:c.makeArray(a.childNodes)}},function(a,b){c.fn[a]=function(d,f){var e=c.map(this,b,d);eb.test(a)||(f=d);if(f&&typeof f==="string")e=c.filter(f,e);e=this.length>1?c.unique(e):e;if((this.length>1||gb.test(f))&&fb.test(a))e=e.reverse();return this.pushStack(e,a,R.call(arguments).join(","))}});c.extend({filter:function(a,b,d){if(d)a=":not("+a+")";return c.find.matches(a,b)},dir:function(a,b,d){var f=[];for(a=a[b];a&&a.nodeType!==9&&(d===w||a.nodeType!==1||!c(a).is(d));){a.nodeType===
1&&f.push(a);a=a[b]}return f},nth:function(a,b,d){b=b||1;for(var f=0;a;a=a[d])if(a.nodeType===1&&++f===b)break;return a},sibling:function(a,b){for(var d=[];a;a=a.nextSibling)a.nodeType===1&&a!==b&&d.push(a);return d}});var Ja=/ jQuery\d+="(?:\d+|null)"/g,V=/^\s+/,Ka=/(<([\w:]+)[^>]*?)\/>/g,hb=/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,La=/<([\w:]+)/,ib=/<tbody/i,jb=/<|&#?\w+;/,ta=/<script|<object|<embed|<option|<style/i,ua=/checked\s*(?:[^=]|=\s*.checked.)/i,Ma=function(a,b,d){return hb.test(d)?
a:b+"></"+d+">"},F={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};F.optgroup=F.option;F.tbody=F.tfoot=F.colgroup=F.caption=F.thead;F.th=F.td;if(!c.support.htmlSerialize)F._default=[1,"div<div>","</div>"];c.fn.extend({text:function(a){if(c.isFunction(a))return this.each(function(b){var d=
c(this);d.text(a.call(this,b,d.text()))});if(typeof a!=="object"&&a!==w)return this.empty().append((this[0]&&this[0].ownerDocument||s).createTextNode(a));return c.text(this)},wrapAll:function(a){if(c.isFunction(a))return this.each(function(d){c(this).wrapAll(a.call(this,d))});if(this[0]){var b=c(a,this[0].ownerDocument).eq(0).clone(true);this[0].parentNode&&b.insertBefore(this[0]);b.map(function(){for(var d=this;d.firstChild&&d.firstChild.nodeType===1;)d=d.firstChild;return d}).append(this)}return this},
wrapInner:function(a){if(c.isFunction(a))return this.each(function(b){c(this).wrapInner(a.call(this,b))});return this.each(function(){var b=c(this),d=b.contents();d.length?d.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){c(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){c.nodeName(this,"body")||c(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.appendChild(a)})},
prepend:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,this)});else if(arguments.length){var a=c(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,
this.nextSibling)});else if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,c(arguments[0]).toArray());return a}},remove:function(a,b){for(var d=0,f;(f=this[d])!=null;d++)if(!a||c.filter(a,[f]).length){if(!b&&f.nodeType===1){c.cleanData(f.getElementsByTagName("*"));c.cleanData([f])}f.parentNode&&f.parentNode.removeChild(f)}return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++)for(b.nodeType===1&&c.cleanData(b.getElementsByTagName("*"));b.firstChild;)b.removeChild(b.firstChild);
return this},clone:function(a){var b=this.map(function(){if(!c.support.noCloneEvent&&!c.isXMLDoc(this)){var d=this.outerHTML,f=this.ownerDocument;if(!d){d=f.createElement("div");d.appendChild(this.cloneNode(true));d=d.innerHTML}return c.clean([d.replace(Ja,"").replace(/=([^="'>\s]+\/)>/g,'="$1">').replace(V,"")],f)[0]}else return this.cloneNode(true)});if(a===true){ra(this,b);ra(this.find("*"),b.find("*"))}return b},html:function(a){if(a===w)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(Ja,
""):null;else if(typeof a==="string"&&!ta.test(a)&&(c.support.leadingWhitespace||!V.test(a))&&!F[(La.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Ka,Ma);try{for(var b=0,d=this.length;b<d;b++)if(this[b].nodeType===1){c.cleanData(this[b].getElementsByTagName("*"));this[b].innerHTML=a}}catch(f){this.empty().append(a)}}else c.isFunction(a)?this.each(function(e){var j=c(this),i=j.html();j.empty().append(function(){return a.call(this,e,i)})}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&
this[0].parentNode){if(c.isFunction(a))return this.each(function(b){var d=c(this),f=d.html();d.replaceWith(a.call(this,b,f))});if(typeof a!=="string")a=c(a).detach();return this.each(function(){var b=this.nextSibling,d=this.parentNode;c(this).remove();b?c(b).before(a):c(d).append(a)})}else return this.pushStack(c(c.isFunction(a)?a():a),"replaceWith",a)},detach:function(a){return this.remove(a,true)},domManip:function(a,b,d){function f(u){return c.nodeName(u,"table")?u.getElementsByTagName("tbody")[0]||
u.appendChild(u.ownerDocument.createElement("tbody")):u}var e,j,i=a[0],o=[],k;if(!c.support.checkClone&&arguments.length===3&&typeof i==="string"&&ua.test(i))return this.each(function(){c(this).domManip(a,b,d,true)});if(c.isFunction(i))return this.each(function(u){var z=c(this);a[0]=i.call(this,u,b?z.html():w);z.domManip(a,b,d)});if(this[0]){e=i&&i.parentNode;e=c.support.parentNode&&e&&e.nodeType===11&&e.childNodes.length===this.length?{fragment:e}:sa(a,this,o);k=e.fragment;if(j=k.childNodes.length===
1?(k=k.firstChild):k.firstChild){b=b&&c.nodeName(j,"tr");for(var n=0,r=this.length;n<r;n++)d.call(b?f(this[n],j):this[n],n>0||e.cacheable||this.length>1?k.cloneNode(true):k)}o.length&&c.each(o,Qa)}return this}});c.fragments={};c.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){c.fn[a]=function(d){var f=[];d=c(d);var e=this.length===1&&this[0].parentNode;if(e&&e.nodeType===11&&e.childNodes.length===1&&d.length===1){d[b](this[0]);
return this}else{e=0;for(var j=d.length;e<j;e++){var i=(e>0?this.clone(true):this).get();c.fn[b].apply(c(d[e]),i);f=f.concat(i)}return this.pushStack(f,a,d.selector)}}});c.extend({clean:function(a,b,d,f){b=b||s;if(typeof b.createElement==="undefined")b=b.ownerDocument||b[0]&&b[0].ownerDocument||s;for(var e=[],j=0,i;(i=a[j])!=null;j++){if(typeof i==="number")i+="";if(i){if(typeof i==="string"&&!jb.test(i))i=b.createTextNode(i);else if(typeof i==="string"){i=i.replace(Ka,Ma);var o=(La.exec(i)||["",
""])[1].toLowerCase(),k=F[o]||F._default,n=k[0],r=b.createElement("div");for(r.innerHTML=k[1]+i+k[2];n--;)r=r.lastChild;if(!c.support.tbody){n=ib.test(i);o=o==="table"&&!n?r.firstChild&&r.firstChild.childNodes:k[1]==="<table>"&&!n?r.childNodes:[];for(k=o.length-1;k>=0;--k)c.nodeName(o[k],"tbody")&&!o[k].childNodes.length&&o[k].parentNode.removeChild(o[k])}!c.support.leadingWhitespace&&V.test(i)&&r.insertBefore(b.createTextNode(V.exec(i)[0]),r.firstChild);i=r.childNodes}if(i.nodeType)e.push(i);else e=
c.merge(e,i)}}if(d)for(j=0;e[j];j++)if(f&&c.nodeName(e[j],"script")&&(!e[j].type||e[j].type.toLowerCase()==="text/javascript"))f.push(e[j].parentNode?e[j].parentNode.removeChild(e[j]):e[j]);else{e[j].nodeType===1&&e.splice.apply(e,[j+1,0].concat(c.makeArray(e[j].getElementsByTagName("script"))));d.appendChild(e[j])}return e},cleanData:function(a){for(var b,d,f=c.cache,e=c.event.special,j=c.support.deleteExpando,i=0,o;(o=a[i])!=null;i++)if(d=o[c.expando]){b=f[d];if(b.events)for(var k in b.events)e[k]?
c.event.remove(o,k):Ca(o,k,b.handle);if(j)delete o[c.expando];else o.removeAttribute&&o.removeAttribute(c.expando);delete f[d]}}});var kb=/z-?index|font-?weight|opacity|zoom|line-?height/i,Na=/alpha\([^)]*\)/,Oa=/opacity=([^)]*)/,ha=/float/i,ia=/-([a-z])/ig,lb=/([A-Z])/g,mb=/^-?\d+(?:px)?$/i,nb=/^-?\d/,ob={position:"absolute",visibility:"hidden",display:"block"},pb=["Left","Right"],qb=["Top","Bottom"],rb=s.defaultView&&s.defaultView.getComputedStyle,Pa=c.support.cssFloat?"cssFloat":"styleFloat",ja=
function(a,b){return b.toUpperCase()};c.fn.css=function(a,b){return X(this,a,b,true,function(d,f,e){if(e===w)return c.curCSS(d,f);if(typeof e==="number"&&!kb.test(f))e+="px";c.style(d,f,e)})};c.extend({style:function(a,b,d){if(!a||a.nodeType===3||a.nodeType===8)return w;if((b==="width"||b==="height")&&parseFloat(d)<0)d=w;var f=a.style||a,e=d!==w;if(!c.support.opacity&&b==="opacity"){if(e){f.zoom=1;b=parseInt(d,10)+""==="NaN"?"":"alpha(opacity="+d*100+")";a=f.filter||c.curCSS(a,"filter")||"";f.filter=
Na.test(a)?a.replace(Na,b):b}return f.filter&&f.filter.indexOf("opacity=")>=0?parseFloat(Oa.exec(f.filter)[1])/100+"":""}if(ha.test(b))b=Pa;b=b.replace(ia,ja);if(e)f[b]=d;return f[b]},css:function(a,b,d,f){if(b==="width"||b==="height"){var e,j=b==="width"?pb:qb;function i(){e=b==="width"?a.offsetWidth:a.offsetHeight;f!=="border"&&c.each(j,function(){f||(e-=parseFloat(c.curCSS(a,"padding"+this,true))||0);if(f==="margin")e+=parseFloat(c.curCSS(a,"margin"+this,true))||0;else e-=parseFloat(c.curCSS(a,
"border"+this+"Width",true))||0})}a.offsetWidth!==0?i():c.swap(a,ob,i);return Math.max(0,Math.round(e))}return c.curCSS(a,b,d)},curCSS:function(a,b,d){var f,e=a.style;if(!c.support.opacity&&b==="opacity"&&a.currentStyle){f=Oa.test(a.currentStyle.filter||"")?parseFloat(RegExp.$1)/100+"":"";return f===""?"1":f}if(ha.test(b))b=Pa;if(!d&&e&&e[b])f=e[b];else if(rb){if(ha.test(b))b="float";b=b.replace(lb,"-$1").toLowerCase();e=a.ownerDocument.defaultView;if(!e)return null;if(a=e.getComputedStyle(a,null))f=
a.getPropertyValue(b);if(b==="opacity"&&f==="")f="1"}else if(a.currentStyle){d=b.replace(ia,ja);f=a.currentStyle[b]||a.currentStyle[d];if(!mb.test(f)&&nb.test(f)){b=e.left;var j=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;e.left=d==="fontSize"?"1em":f||0;f=e.pixelLeft+"px";e.left=b;a.runtimeStyle.left=j}}return f},swap:function(a,b,d){var f={};for(var e in b){f[e]=a.style[e];a.style[e]=b[e]}d.call(a);for(e in b)a.style[e]=f[e]}});if(c.expr&&c.expr.filters){c.expr.filters.hidden=function(a){var b=
a.offsetWidth,d=a.offsetHeight,f=a.nodeName.toLowerCase()==="tr";return b===0&&d===0&&!f?true:b>0&&d>0&&!f?false:c.curCSS(a,"display")==="none"};c.expr.filters.visible=function(a){return!c.expr.filters.hidden(a)}}var sb=J(),tb=/<script(.|\s)*?\/script>/gi,ub=/select|textarea/i,vb=/color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,N=/=\?(&|$)/,ka=/\?/,wb=/(\?|&)_=.*?(&|$)/,xb=/^(\w+:)?\/\/([^\/?#]+)/,yb=/%20/g,zb=c.fn.load;c.fn.extend({load:function(a,b,d){if(typeof a!==
"string")return zb.call(this,a);else if(!this.length)return this;var f=a.indexOf(" ");if(f>=0){var e=a.slice(f,a.length);a=a.slice(0,f)}f="GET";if(b)if(c.isFunction(b)){d=b;b=null}else if(typeof b==="object"){b=c.param(b,c.ajaxSettings.traditional);f="POST"}var j=this;c.ajax({url:a,type:f,dataType:"html",data:b,complete:function(i,o){if(o==="success"||o==="notmodified")j.html(e?c("<div />").append(i.responseText.replace(tb,"")).find(e):i.responseText);d&&j.each(d,[i.responseText,o,i])}});return this},
serialize:function(){return c.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?c.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||ub.test(this.nodeName)||vb.test(this.type))}).map(function(a,b){a=c(this).val();return a==null?null:c.isArray(a)?c.map(a,function(d){return{name:b.name,value:d}}):{name:b.name,value:a}}).get()}});c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
function(a,b){c.fn[b]=function(d){return this.bind(b,d)}});c.extend({get:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b=null}return c.ajax({type:"GET",url:a,data:b,success:d,dataType:f})},getScript:function(a,b){return c.get(a,null,b,"script")},getJSON:function(a,b,d){return c.get(a,b,d,"json")},post:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b={}}return c.ajax({type:"POST",url:a,data:b,success:d,dataType:f})},ajaxSetup:function(a){c.extend(c.ajaxSettings,a)},ajaxSettings:{url:location.href,
global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:A.XMLHttpRequest&&(A.location.protocol!=="file:"||!A.ActiveXObject)?function(){return new A.XMLHttpRequest}:function(){try{return new A.ActiveXObject("Microsoft.XMLHTTP")}catch(a){}},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},etag:{},ajax:function(a){function b(){e.success&&
e.success.call(k,o,i,x);e.global&&f("ajaxSuccess",[x,e])}function d(){e.complete&&e.complete.call(k,x,i);e.global&&f("ajaxComplete",[x,e]);e.global&&!--c.active&&c.event.trigger("ajaxStop")}function f(q,p){(e.context?c(e.context):c.event).trigger(q,p)}var e=c.extend(true,{},c.ajaxSettings,a),j,i,o,k=a&&a.context||e,n=e.type.toUpperCase();if(e.data&&e.processData&&typeof e.data!=="string")e.data=c.param(e.data,e.traditional);if(e.dataType==="jsonp"){if(n==="GET")N.test(e.url)||(e.url+=(ka.test(e.url)?
"&":"?")+(e.jsonp||"callback")+"=?");else if(!e.data||!N.test(e.data))e.data=(e.data?e.data+"&":"")+(e.jsonp||"callback")+"=?";e.dataType="json"}if(e.dataType==="json"&&(e.data&&N.test(e.data)||N.test(e.url))){j=e.jsonpCallback||"jsonp"+sb++;if(e.data)e.data=(e.data+"").replace(N,"="+j+"$1");e.url=e.url.replace(N,"="+j+"$1");e.dataType="script";A[j]=A[j]||function(q){o=q;b();d();A[j]=w;try{delete A[j]}catch(p){}z&&z.removeChild(C)}}if(e.dataType==="script"&&e.cache===null)e.cache=false;if(e.cache===
false&&n==="GET"){var r=J(),u=e.url.replace(wb,"$1_="+r+"$2");e.url=u+(u===e.url?(ka.test(e.url)?"&":"?")+"_="+r:"")}if(e.data&&n==="GET")e.url+=(ka.test(e.url)?"&":"?")+e.data;e.global&&!c.active++&&c.event.trigger("ajaxStart");r=(r=xb.exec(e.url))&&(r[1]&&r[1]!==location.protocol||r[2]!==location.host);if(e.dataType==="script"&&n==="GET"&&r){var z=s.getElementsByTagName("head")[0]||s.documentElement,C=s.createElement("script");C.src=e.url;if(e.scriptCharset)C.charset=e.scriptCharset;if(!j){var B=
false;C.onload=C.onreadystatechange=function(){if(!B&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){B=true;b();d();C.onload=C.onreadystatechange=null;z&&C.parentNode&&z.removeChild(C)}}}z.insertBefore(C,z.firstChild);return w}var E=false,x=e.xhr();if(x){e.username?x.open(n,e.url,e.async,e.username,e.password):x.open(n,e.url,e.async);try{if(e.data||a&&a.contentType)x.setRequestHeader("Content-Type",e.contentType);if(e.ifModified){c.lastModified[e.url]&&x.setRequestHeader("If-Modified-Since",
c.lastModified[e.url]);c.etag[e.url]&&x.setRequestHeader("If-None-Match",c.etag[e.url])}r||x.setRequestHeader("X-Requested-With","XMLHttpRequest");x.setRequestHeader("Accept",e.dataType&&e.accepts[e.dataType]?e.accepts[e.dataType]+", */*":e.accepts._default)}catch(ga){}if(e.beforeSend&&e.beforeSend.call(k,x,e)===false){e.global&&!--c.active&&c.event.trigger("ajaxStop");x.abort();return false}e.global&&f("ajaxSend",[x,e]);var g=x.onreadystatechange=function(q){if(!x||x.readyState===0||q==="abort"){E||
d();E=true;if(x)x.onreadystatechange=c.noop}else if(!E&&x&&(x.readyState===4||q==="timeout")){E=true;x.onreadystatechange=c.noop;i=q==="timeout"?"timeout":!c.httpSuccess(x)?"error":e.ifModified&&c.httpNotModified(x,e.url)?"notmodified":"success";var p;if(i==="success")try{o=c.httpData(x,e.dataType,e)}catch(v){i="parsererror";p=v}if(i==="success"||i==="notmodified")j||b();else c.handleError(e,x,i,p);d();q==="timeout"&&x.abort();if(e.async)x=null}};try{var h=x.abort;x.abort=function(){x&&h.call(x);
g("abort")}}catch(l){}e.async&&e.timeout>0&&setTimeout(function(){x&&!E&&g("timeout")},e.timeout);try{x.send(n==="POST"||n==="PUT"||n==="DELETE"?e.data:null)}catch(m){c.handleError(e,x,null,m);d()}e.async||g();return x}},handleError:function(a,b,d,f){if(a.error)a.error.call(a.context||a,b,d,f);if(a.global)(a.context?c(a.context):c.event).trigger("ajaxError",[b,a,f])},active:0,httpSuccess:function(a){try{return!a.status&&location.protocol==="file:"||a.status>=200&&a.status<300||a.status===304||a.status===
1223||a.status===0}catch(b){}return false},httpNotModified:function(a,b){var d=a.getResponseHeader("Last-Modified"),f=a.getResponseHeader("Etag");if(d)c.lastModified[b]=d;if(f)c.etag[b]=f;return a.status===304||a.status===0},httpData:function(a,b,d){var f=a.getResponseHeader("content-type")||"",e=b==="xml"||!b&&f.indexOf("xml")>=0;a=e?a.responseXML:a.responseText;e&&a.documentElement.nodeName==="parsererror"&&c.error("parsererror");if(d&&d.dataFilter)a=d.dataFilter(a,b);if(typeof a==="string")if(b===
"json"||!b&&f.indexOf("json")>=0)a=c.parseJSON(a);else if(b==="script"||!b&&f.indexOf("javascript")>=0)c.globalEval(a);return a},param:function(a,b){function d(i,o){if(c.isArray(o))c.each(o,function(k,n){b||/\[\]$/.test(i)?f(i,n):d(i+"["+(typeof n==="object"||c.isArray(n)?k:"")+"]",n)});else!b&&o!=null&&typeof o==="object"?c.each(o,function(k,n){d(i+"["+k+"]",n)}):f(i,o)}function f(i,o){o=c.isFunction(o)?o():o;e[e.length]=encodeURIComponent(i)+"="+encodeURIComponent(o)}var e=[];if(b===w)b=c.ajaxSettings.traditional;
if(c.isArray(a)||a.jquery)c.each(a,function(){f(this.name,this.value)});else for(var j in a)d(j,a[j]);return e.join("&").replace(yb,"+")}});var la={},Ab=/toggle|show|hide/,Bb=/^([+-]=)?([\d+-.]+)(.*)$/,W,va=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];c.fn.extend({show:function(a,b){if(a||a===0)return this.animate(K("show",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");
this[a].style.display=d||"";if(c.css(this[a],"display")==="none"){d=this[a].nodeName;var f;if(la[d])f=la[d];else{var e=c("<"+d+" />").appendTo("body");f=e.css("display");if(f==="none")f="block";e.remove();la[d]=f}c.data(this[a],"olddisplay",f)}}a=0;for(b=this.length;a<b;a++)this[a].style.display=c.data(this[a],"olddisplay")||"";return this}},hide:function(a,b){if(a||a===0)return this.animate(K("hide",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");!d&&d!=="none"&&c.data(this[a],
"olddisplay",c.css(this[a],"display"))}a=0;for(b=this.length;a<b;a++)this[a].style.display="none";return this}},_toggle:c.fn.toggle,toggle:function(a,b){var d=typeof a==="boolean";if(c.isFunction(a)&&c.isFunction(b))this._toggle.apply(this,arguments);else a==null||d?this.each(function(){var f=d?a:c(this).is(":hidden");c(this)[f?"show":"hide"]()}):this.animate(K("toggle",3),a,b);return this},fadeTo:function(a,b,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,d)},
animate:function(a,b,d,f){var e=c.speed(b,d,f);if(c.isEmptyObject(a))return this.each(e.complete);return this[e.queue===false?"each":"queue"](function(){var j=c.extend({},e),i,o=this.nodeType===1&&c(this).is(":hidden"),k=this;for(i in a){var n=i.replace(ia,ja);if(i!==n){a[n]=a[i];delete a[i];i=n}if(a[i]==="hide"&&o||a[i]==="show"&&!o)return j.complete.call(this);if((i==="height"||i==="width")&&this.style){j.display=c.css(this,"display");j.overflow=this.style.overflow}if(c.isArray(a[i])){(j.specialEasing=
j.specialEasing||{})[i]=a[i][1];a[i]=a[i][0]}}if(j.overflow!=null)this.style.overflow="hidden";j.curAnim=c.extend({},a);c.each(a,function(r,u){var z=new c.fx(k,j,r);if(Ab.test(u))z[u==="toggle"?o?"show":"hide":u](a);else{var C=Bb.exec(u),B=z.cur(true)||0;if(C){u=parseFloat(C[2]);var E=C[3]||"px";if(E!=="px"){k.style[r]=(u||1)+E;B=(u||1)/z.cur(true)*B;k.style[r]=B+E}if(C[1])u=(C[1]==="-="?-1:1)*u+B;z.custom(B,u,E)}else z.custom(B,u,"")}});return true})},stop:function(a,b){var d=c.timers;a&&this.queue([]);
this.each(function(){for(var f=d.length-1;f>=0;f--)if(d[f].elem===this){b&&d[f](true);d.splice(f,1)}});b||this.dequeue();return this}});c.each({slideDown:K("show",1),slideUp:K("hide",1),slideToggle:K("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(a,b){c.fn[a]=function(d,f){return this.animate(b,d,f)}});c.extend({speed:function(a,b,d){var f=a&&typeof a==="object"?a:{complete:d||!d&&b||c.isFunction(a)&&a,duration:a,easing:d&&b||b&&!c.isFunction(b)&&b};f.duration=c.fx.off?0:typeof f.duration===
"number"?f.duration:c.fx.speeds[f.duration]||c.fx.speeds._default;f.old=f.complete;f.complete=function(){f.queue!==false&&c(this).dequeue();c.isFunction(f.old)&&f.old.call(this)};return f},easing:{linear:function(a,b,d,f){return d+f*a},swing:function(a,b,d,f){return(-Math.cos(a*Math.PI)/2+0.5)*f+d}},timers:[],fx:function(a,b,d){this.options=b;this.elem=a;this.prop=d;if(!b.orig)b.orig={}}});c.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this);(c.fx.step[this.prop]||
c.fx.step._default)(this);if((this.prop==="height"||this.prop==="width")&&this.elem.style)this.elem.style.display="block"},cur:function(a){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];return(a=parseFloat(c.css(this.elem,this.prop,a)))&&a>-10000?a:parseFloat(c.curCSS(this.elem,this.prop))||0},custom:function(a,b,d){function f(j){return e.step(j)}this.startTime=J();this.start=a;this.end=b;this.unit=d||this.unit||"px";this.now=this.start;
this.pos=this.state=0;var e=this;f.elem=this.elem;if(f()&&c.timers.push(f)&&!W)W=setInterval(c.fx.tick,13)},show:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.show=true;this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());c(this.elem).show()},hide:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(a){var b=J(),d=true;if(a||b>=this.options.duration+this.startTime){this.now=
this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;for(var f in this.options.curAnim)if(this.options.curAnim[f]!==true)d=false;if(d){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;a=c.data(this.elem,"olddisplay");this.elem.style.display=a?a:this.options.display;if(c.css(this.elem,"display")==="none")this.elem.style.display="block"}this.options.hide&&c(this.elem).hide();if(this.options.hide||this.options.show)for(var e in this.options.curAnim)c.style(this.elem,
e,this.options.orig[e]);this.options.complete.call(this.elem)}return false}else{e=b-this.startTime;this.state=e/this.options.duration;a=this.options.easing||(c.easing.swing?"swing":"linear");this.pos=c.easing[this.options.specialEasing&&this.options.specialEasing[this.prop]||a](this.state,e,0,1,this.options.duration);this.now=this.start+(this.end-this.start)*this.pos;this.update()}return true}};c.extend(c.fx,{tick:function(){for(var a=c.timers,b=0;b<a.length;b++)a[b]()||a.splice(b--,1);a.length||
c.fx.stop()},stop:function(){clearInterval(W);W=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){c.style(a.elem,"opacity",a.now)},_default:function(a){if(a.elem.style&&a.elem.style[a.prop]!=null)a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit;else a.elem[a.prop]=a.now}}});if(c.expr&&c.expr.filters)c.expr.filters.animated=function(a){return c.grep(c.timers,function(b){return a===b.elem}).length};c.fn.offset="getBoundingClientRect"in s.documentElement?
function(a){var b=this[0];if(a)return this.each(function(e){c.offset.setOffset(this,a,e)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);var d=b.getBoundingClientRect(),f=b.ownerDocument;b=f.body;f=f.documentElement;return{top:d.top+(self.pageYOffset||c.support.boxModel&&f.scrollTop||b.scrollTop)-(f.clientTop||b.clientTop||0),left:d.left+(self.pageXOffset||c.support.boxModel&&f.scrollLeft||b.scrollLeft)-(f.clientLeft||b.clientLeft||0)}}:function(a){var b=
this[0];if(a)return this.each(function(r){c.offset.setOffset(this,a,r)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);c.offset.initialize();var d=b.offsetParent,f=b,e=b.ownerDocument,j,i=e.documentElement,o=e.body;f=(e=e.defaultView)?e.getComputedStyle(b,null):b.currentStyle;for(var k=b.offsetTop,n=b.offsetLeft;(b=b.parentNode)&&b!==o&&b!==i;){if(c.offset.supportsFixedPosition&&f.position==="fixed")break;j=e?e.getComputedStyle(b,null):b.currentStyle;
k-=b.scrollTop;n-=b.scrollLeft;if(b===d){k+=b.offsetTop;n+=b.offsetLeft;if(c.offset.doesNotAddBorder&&!(c.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(b.nodeName))){k+=parseFloat(j.borderTopWidth)||0;n+=parseFloat(j.borderLeftWidth)||0}f=d;d=b.offsetParent}if(c.offset.subtractsBorderForOverflowNotVisible&&j.overflow!=="visible"){k+=parseFloat(j.borderTopWidth)||0;n+=parseFloat(j.borderLeftWidth)||0}f=j}if(f.position==="relative"||f.position==="static"){k+=o.offsetTop;n+=o.offsetLeft}if(c.offset.supportsFixedPosition&&
f.position==="fixed"){k+=Math.max(i.scrollTop,o.scrollTop);n+=Math.max(i.scrollLeft,o.scrollLeft)}return{top:k,left:n}};c.offset={initialize:function(){var a=s.body,b=s.createElement("div"),d,f,e,j=parseFloat(c.curCSS(a,"marginTop",true))||0;c.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"});b.innerHTML="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
a.insertBefore(b,a.firstChild);d=b.firstChild;f=d.firstChild;e=d.nextSibling.firstChild.firstChild;this.doesNotAddBorder=f.offsetTop!==5;this.doesAddBorderForTableAndCells=e.offsetTop===5;f.style.position="fixed";f.style.top="20px";this.supportsFixedPosition=f.offsetTop===20||f.offsetTop===15;f.style.position=f.style.top="";d.style.overflow="hidden";d.style.position="relative";this.subtractsBorderForOverflowNotVisible=f.offsetTop===-5;this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==j;a.removeChild(b);
c.offset.initialize=c.noop},bodyOffset:function(a){var b=a.offsetTop,d=a.offsetLeft;c.offset.initialize();if(c.offset.doesNotIncludeMarginInBodyOffset){b+=parseFloat(c.curCSS(a,"marginTop",true))||0;d+=parseFloat(c.curCSS(a,"marginLeft",true))||0}return{top:b,left:d}},setOffset:function(a,b,d){if(/static/.test(c.curCSS(a,"position")))a.style.position="relative";var f=c(a),e=f.offset(),j=parseInt(c.curCSS(a,"top",true),10)||0,i=parseInt(c.curCSS(a,"left",true),10)||0;if(c.isFunction(b))b=b.call(a,
d,e);d={top:b.top-e.top+j,left:b.left-e.left+i};"using"in b?b.using.call(a,d):f.css(d)}};c.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),d=this.offset(),f=/^body|html$/i.test(b[0].nodeName)?{top:0,left:0}:b.offset();d.top-=parseFloat(c.curCSS(a,"marginTop",true))||0;d.left-=parseFloat(c.curCSS(a,"marginLeft",true))||0;f.top+=parseFloat(c.curCSS(b[0],"borderTopWidth",true))||0;f.left+=parseFloat(c.curCSS(b[0],"borderLeftWidth",true))||0;return{top:d.top-
f.top,left:d.left-f.left}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||s.body;a&&!/^body|html$/i.test(a.nodeName)&&c.css(a,"position")==="static";)a=a.offsetParent;return a})}});c.each(["Left","Top"],function(a,b){var d="scroll"+b;c.fn[d]=function(f){var e=this[0],j;if(!e)return null;if(f!==w)return this.each(function(){if(j=wa(this))j.scrollTo(!a?f:c(j).scrollLeft(),a?f:c(j).scrollTop());else this[d]=f});else return(j=wa(e))?"pageXOffset"in j?j[a?"pageYOffset":
"pageXOffset"]:c.support.boxModel&&j.document.documentElement[d]||j.document.body[d]:e[d]}});c.each(["Height","Width"],function(a,b){var d=b.toLowerCase();c.fn["inner"+b]=function(){return this[0]?c.css(this[0],d,false,"padding"):null};c.fn["outer"+b]=function(f){return this[0]?c.css(this[0],d,false,f?"margin":"border"):null};c.fn[d]=function(f){var e=this[0];if(!e)return f==null?null:this;if(c.isFunction(f))return this.each(function(j){var i=c(this);i[d](f.call(this,j,i[d]()))});return"scrollTo"in
e&&e.document?e.document.compatMode==="CSS1Compat"&&e.document.documentElement["client"+b]||e.document.body["client"+b]:e.nodeType===9?Math.max(e.documentElement["client"+b],e.body["scroll"+b],e.documentElement["scroll"+b],e.body["offset"+b],e.documentElement["offset"+b]):f===w?c.css(e,d):this.css(d,typeof f==="string"?f:f+"px")}});A.jQuery=A.$=c})(window);/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/

(function(jQuery){
	
	jQuery.hotkeys = {
		version: "0.8",

		specialKeys: {
			8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 
      188: ",", 190: ".", 191: "/", 222: "'", 224: "meta"
		},
	
		shiftNums: {
			"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", 
			"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<", 
			".": ">",  "/": "?",  "\\": "|"
		}
	};

	function keyHandler( handleObj ) {
		// Only care when a possible input has been specified
		if ( typeof handleObj.data !== "string" ) {
			return;
		}
		
		var origHandler = handleObj.handler,
			keys = handleObj.data.toLowerCase().split(" ");
	
		handleObj.handler = function( event ) {
			// Don't fire in text-accepting inputs that we didn't directly bind to
			if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
				 event.target.type === "text") ) {
				return;
			}
			
			// Keypress represents characters, not special keys
			var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
				character = String.fromCharCode( event.which ).toLowerCase(),
				key, modif = "", possible = {};

			// check combinations (alt|ctrl|shift+anything)
			if ( event.altKey && special !== "alt" ) {
				modif += "alt+";
			}

			if ( event.ctrlKey && special !== "ctrl" ) {
				modif += "ctrl+";
			}
			
			// TODO: Need to make sure this works consistently across platforms
			if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
				modif += "meta+";
			}

			if ( event.shiftKey && special !== "shift" ) {
				modif += "shift+";
			}

			if ( special ) {
				possible[ modif + special ] = true;

			} else {
				possible[ modif + character ] = true;
				possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

				// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
				if ( modif === "shift+" ) {
					possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
				}
			}

			for ( var i = 0, l = keys.length; i < l; i++ ) {
				if ( possible[ keys[i] ] ) {
					return origHandler.apply( this, arguments );
				}
			}
		};
	}

	jQuery.each([ "keydown", "keyup", "keypress" ], function() {
		jQuery.event.special[ this ] = { add: keyHandler };
	});

})( jQuery );/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 *
 * Version: 3.0.3-pre
 * 
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener )
            for ( var i=types.length; i; )
                this.addEventListener( types[--i], handler, false );
        else
            this.onmousewheel = handler;
    },
    
    teardown: function() {
        if ( this.removeEventListener )
            for ( var i=types.length; i; )
                this.removeEventListener( types[--i], handler, false );
        else
            this.onmousewheel = null;
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true;
    
    event = $.event.fix(event || window.event);
    event.type = "mousewheel";
    
    if ( event.wheelDelta ) delta = event.wheelDelta/120;
    if ( event.detail     ) delta = -event.detail/3;
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta);

    return $.event.handle.apply(this, args);
}

})(jQuery);/**
 * Matrix v0.9.1
 * 
 * Loosely based on flash:
 * http://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/flash/geom/Matrix.html
 */
(function() {
  function Point(x, y) {
    return {
      x: x || 0,
      y: y || 0,
      add: function(other) {
        return Point(this.x + other.x, this.y + other.y);
      },
      subtract: function(other) {
        return Point(this.x - other.x, this.y - other.y);
      },
      equal: function(other) {
        return this.x == other.x && this.y == other.y;
      }
    }
  }

  Point.distance = function(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  /**
   * Returns the direction from p1 to p2 in radians.
   */
  Point.direction = function(p1, p2) {
    return Math.atan2(
      p2.y - p1.y,
      p2.x - p1.x
    );
  }

  /**
   * Creates a matrix for 2d affine transformations.
   *  _        _
   * | a  c tx  |
   * | b  d ty  |
   * |_0  0  1 _|
   *
   * concat, inverse, rotate, scale and translate return new matrices with the
   * transformations applied. The matrix is not modified in place.
   *
   * Returns the identity matrix when called with no arguments.
   */
  function Matrix(a, b, c, d, tx, ty) {
    a = a !== undefined ? a : 1;
    d = d !== undefined ? d : 1;

    return {
      a: a,
      b: b || 0,
      c: c || 0,
      d: d,
      tx: tx || 0,
      ty: ty || 0,

      /**
       * Return the result of this matrix (A) multiplied by another matrix (B), i.e. A x B
       * http://mathworld.wolfram.com/MatrixMultiplication.html
       */
      concat: function(matrix) {
        return Matrix(
          this.a * matrix.a + this.c * matrix.b,
          this.b * matrix.a + this.d * matrix.b,
          this.a * matrix.c + this.c * matrix.d,
          this.b * matrix.c + this.d * matrix.d,
          this.a * matrix.tx + this.c * matrix.ty + this.tx,
          this.b * matrix.tx + this.d * matrix.ty + this.ty
        );
      },

      deltaTransformPoint: function(point) {
        return Point(
          this.a * point.x + this.c * point.y,
          this.b * point.x + this.d * point.y
        );
      },

      /**
       * Returns the inverse of the matrix.
       * http://mathworld.wolfram.com/MatrixInverse.html
       */
      inverse: function() {
        var determinant = this.a * this.d - this.b * this.c;
        return Matrix(
          this.d / determinant,
          -this.b / determinant,
          -this.c / determinant,
          this.a / determinant,
          (this.c * this.ty - this.d * this.tx) / determinant,
          (this.b * this.tx - this.a * this.ty) / determinant
        );
      },

      rotate: function(theta, aboutPoint) {
        return Matrix.rotation(theta, aboutPoint).concat(this);
      },

      scale: function(sx, sy) {
        return Matrix.scale(sx, sy).concat(this);
      },

      /**
       * Transforms a point by multiplying it through the matrix.
       * Returns the new point.
       */
      transformPoint: function(point) {
        return Point(
          this.a * point.x + this.c * point.y + this.tx,
          this.b * point.x + this.d * point.y + this.ty
        );
      },

      translate: function(tx, ty) {
        return Matrix.translation(tx, ty).concat(this);
      }
    }
  }

  /**
   * Returns a matrix that corresponds to a rotation of angle theta in radians.
   * If optional aboutPoint argument is given, the rotation takes place about
   * that point.
   */
  Matrix.rotation = function(theta, aboutPoint) {
    var rotationMatrix = Matrix(
      Math.cos(theta),
      Math.sin(theta),
      -Math.sin(theta),
      Math.cos(theta)
    );

    if(aboutPoint) {
      rotationMatrix =
        Matrix.translation(aboutPoint.x, aboutPoint.y).concat(
          rotationMatrix
        ).concat(
          Matrix.translation(-aboutPoint.x, -aboutPoint.y)
        );
    }

    return rotationMatrix;
  };

  /**
   * Returns a matrix that corresponds to a scaling by factors of sx, sy.
   * If only one parameter is given the matrix is scaled uniformly.
   */
  Matrix.scale = function(sx, sy) {
    sy = sy || sx;

    return Matrix(sx, 0, 0, sy);
  };

  /**
   * Returns a matrix that corresponds to a translation of tx, ty.
   */
  Matrix.translation = function(tx, ty) {
    return Matrix(1, 0, 0, 1, tx, ty);
  };

  Matrix.IDENTITY = Matrix();
  Matrix.HORIZONTAL_FLIP = Matrix(-1, 0, 0, 1);
  Matrix.VERTICAL_FLIP = Matrix(1, 0, 0, -1);

  // Export to window
  window['Matrix'] = Matrix;
  window['Point'] = Point;
}());
(function($){
  $.fn.powerCanvas = function(options) {
    options = options || {};

    var canvas = this.get(0);

    if(!canvas) {
      return this;
    }

    var context;

    /**
     * @name PowerCanvas
     * @constructor
     */
    var $canvas = $(canvas).extend({
      drawLine: function(x1, y1, x2, y2, width) {
        width = width || 3;

        context.lineWidth = width;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.closePath();
        context.stroke();
      },

      drawImage: function(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        try {
          context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        } catch(e) {
          debugger
        }

        return this;
      },

      /**
       * Passes this canvas to the block with the given matrix transformation
       * applied. All drawing methods called within the block will draw
       * into the canvas with the transformation applied. The transformation
       * is removed at the end of the block, even if the block throws an error.
       *
       * @name withTransform
       * @methodOf PowerCanvas#
       *
       * @param {Matrix} matrix
       * @param {Function} block
       * @returns this
       */
      withTransform: function(matrix, block) {
        context.save();

        context.transform(
          matrix.a,
          matrix.b,
          matrix.c,
          matrix.d,
          matrix.tx,
          matrix.ty
        );

        try {
          block(this);
        } finally {
          context.restore();
        }

        return this;
      },

      clear: function() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        return this;
      },

      fill: function(color) {
        context.fillStyle = color;
        context.fillRect(0, 0, canvas.width, canvas.height);

        return this;
      },

      fillCircle: function(x, y, radius, color) {
        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI*2, true);
        context.closePath();
        context.fill();

        return this;
      },

      fillRect: function(x, y, width, height) {
        context.fillRect(x, y, width, height);

        return this;
      },

      centerText: function(text, y) {
        var textWidth = $canvas.measureText(text);

        $canvas.fillText(text, (canvas.width - textWidth) / 2, y);
      },

      fillText: function(text, x, y) {
        context.fillText(text, x, y);

        return this;
      },

      fillWrappedText: function(text, x, y, width) {
        var tokens = text.split(" ");
        var tokens2 = text.split(" ");
        var lineHeight = 16;

        if ($canvas.measureText(text) > width) {
          if (tokens.length % 2 == 0) {
            tokens2 = tokens.splice(tokens.length / 2, (tokens.length / 2), "");
          } else {
            tokens2 = tokens.splice(tokens.length / 2 + 1, (tokens.length / 2) + 1, "");
          }
          context.fillText(tokens.join(" "), x, y);
          context.fillText(tokens2.join(" "), x, y + lineHeight);
        } else {
          context.fillText(tokens.join(" "), x, y + lineHeight);
        }
      },

      fillColor: function(color) {
        if(color) {
          context.fillStyle = color;
          return this;
        } else {
          return context.fillStyle;
        }
      },

      font: function(font) {
        context.font = font;
      },

      measureText: function(text) {
        return context.measureText(text).width;
      },

      putImageData: function(imageData, x, y) {
        context.putImageData(imageData, x, y);

        return this;
      },

      strokeColor: function(color) {
        if(color) {
          context.strokeStyle = color;
          return this;
        } else {
          return context.strokeStyle;
        }
      },

      textAlign: function(textAlign) {
        context.textAlign = textAlign;
        return this;
      },

      height: function() {
        return canvas.height;
      },

      width: function() {
        return canvas.width;
      }
    });

    if(canvas.getContext) {
      context = canvas.getContext('2d');

      if(options.init) {
        options.init($canvas);
      }

      return $canvas;
    } else {
      return false;
    }

  };
})(jQuery);
/*
 * QUnit - A JavaScript Unit Testing Framework
 * 
 * http://docs.jquery.com/QUnit
 *
 * Copyright (c) 2009 John Resig, Jörn Zaefferer
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */

(function(window) {

var QUnit = {

	// call on start of module test to prepend name to all tests
	module: function(name, testEnvironment) {
		config.currentModule = name;

		synchronize(function() {
			if ( config.currentModule ) {
				QUnit.moduleDone( config.currentModule, config.moduleStats.bad, config.moduleStats.all );
			}

			config.currentModule = name;
			config.moduleTestEnvironment = testEnvironment;
			config.moduleStats = { all: 0, bad: 0 };

			QUnit.moduleStart( name, testEnvironment );
		});
	},

	asyncTest: function(testName, expected, callback) {
		if ( arguments.length === 2 ) {
			callback = expected;
			expected = 0;
		}

		QUnit.test(testName, expected, callback, true);
	},
	
	test: function(testName, expected, callback, async) {
		var name = '<span class="test-name">' + testName + '</span>', testEnvironment, testEnvironmentArg;

		if ( arguments.length === 2 ) {
			callback = expected;
			expected = null;
		}
		// is 2nd argument a testEnvironment?
		if ( expected && typeof expected === 'object') {
			testEnvironmentArg =  expected;
			expected = null;
		}

		if ( config.currentModule ) {
			name = '<span class="module-name">' + config.currentModule + "</span>: " + name;
		}

		if ( !validTest(config.currentModule + ": " + testName) ) {
			return;
		}

		synchronize(function() {

			testEnvironment = extend({
				setup: function() {},
				teardown: function() {}
			}, config.moduleTestEnvironment);
			if (testEnvironmentArg) {
				extend(testEnvironment,testEnvironmentArg);
			}

			QUnit.testStart( testName, testEnvironment );

			// allow utility functions to access the current test environment
			QUnit.current_testEnvironment = testEnvironment;
			
			config.assertions = [];
			config.expected = expected;
			
			var tests = id("qunit-tests");
			if (tests) {
				var b = document.createElement("strong");
					b.innerHTML = "Running " + name;
				var li = document.createElement("li");
					li.appendChild( b );
					li.id = "current-test-output";
				tests.appendChild( li )
			}

			try {
				if ( !config.pollution ) {
					saveGlobal();
				}

				testEnvironment.setup.call(testEnvironment);
			} catch(e) {
				QUnit.ok( false, "Setup failed on " + name + ": " + e.message );
			}
	    });
	
	    synchronize(function() {
			if ( async ) {
				QUnit.stop();
			}

			try {
				callback.call(testEnvironment);
			} catch(e) {
				fail("Test " + name + " died, exception and test follows", e, callback);
				QUnit.ok( false, "Died on test #" + (config.assertions.length + 1) + ": " + e.message );
				// else next test will carry the responsibility
				saveGlobal();

				// Restart the tests if they're blocking
				if ( config.blocking ) {
					start();
				}
			}
		});

		synchronize(function() {
			try {
				checkPollution();
				testEnvironment.teardown.call(testEnvironment);
			} catch(e) {
				QUnit.ok( false, "Teardown failed on " + name + ": " + e.message );
			}
	    });
	
	    synchronize(function() {
			try {
				QUnit.reset();
			} catch(e) {
				fail("reset() failed, following Test " + name + ", exception and reset fn follows", e, reset);
			}

			if ( config.expected && config.expected != config.assertions.length ) {
				QUnit.ok( false, "Expected " + config.expected + " assertions, but " + config.assertions.length + " were run" );
			}

			var good = 0, bad = 0,
				tests = id("qunit-tests");

			config.stats.all += config.assertions.length;
			config.moduleStats.all += config.assertions.length;

			if ( tests ) {
				var ol  = document.createElement("ol");

				for ( var i = 0; i < config.assertions.length; i++ ) {
					var assertion = config.assertions[i];

					var li = document.createElement("li");
					li.className = assertion.result ? "pass" : "fail";
					li.innerHTML = assertion.message || "(no message)";
					ol.appendChild( li );

					if ( assertion.result ) {
						good++;
					} else {
						bad++;
						config.stats.bad++;
						config.moduleStats.bad++;
					}
				}
				if (bad == 0) {
					ol.style.display = "none";
				}

				var b = document.createElement("strong");
				b.innerHTML = name + " <b style='color:black;'>(<b class='fail'>" + bad + "</b>, <b class='pass'>" + good + "</b>, " + config.assertions.length + ")</b>";
				
				addEvent(b, "click", function() {
					var next = b.nextSibling, display = next.style.display;
					next.style.display = display === "none" ? "block" : "none";
				});
				
				addEvent(b, "dblclick", function(e) {
					var target = e && e.target ? e.target : window.event.srcElement;
					if ( target.nodeName.toLowerCase() == "span" || target.nodeName.toLowerCase() == "b" ) {
						target = target.parentNode;
					}
					if ( window.location && target.nodeName.toLowerCase() === "strong" ) {
						window.location.search = "?" + encodeURIComponent(getText([target]).replace(/\(.+\)$/, "").replace(/(^\s*|\s*$)/g, ""));
					}
				});

				var li = id("current-test-output");
				li.id = "";
				li.className = bad ? "fail" : "pass";
				li.removeChild( li.firstChild );
				li.appendChild( b );
				li.appendChild( ol );

				if ( bad ) {
					var toolbar = id("qunit-testrunner-toolbar");
					if ( toolbar ) {
						toolbar.style.display = "block";
						id("qunit-filter-pass").disabled = null;
						id("qunit-filter-missing").disabled = null;
					}
				}

			} else {
				for ( var i = 0; i < config.assertions.length; i++ ) {
					if ( !config.assertions[i].result ) {
						bad++;
						config.stats.bad++;
						config.moduleStats.bad++;
					}
				}
			}

			QUnit.testDone( testName, bad, config.assertions.length );

			if ( !window.setTimeout && !config.queue.length ) {
				done();
			}
		});

		if ( window.setTimeout && !config.doneTimer ) {
			config.doneTimer = window.setTimeout(function(){
				if ( !config.queue.length ) {
					done();
				} else {
					synchronize( done );
				}
			}, 13);
		}
	},
	
	/**
	 * Specify the number of expected assertions to gurantee that failed test (no assertions are run at all) don't slip through.
	 */
	expect: function(asserts) {
		config.expected = asserts;
	},

	/**
	 * Asserts true.
	 * @example ok( "asdfasdf".length > 5, "There must be at least 5 chars" );
	 */
	ok: function(a, msg) {
		msg = escapeHtml(msg);
		QUnit.log(a, msg);

		config.assertions.push({
			result: !!a,
			message: msg
		});
	},

	/**
	 * Checks that the first two arguments are equal, with an optional message.
	 * Prints out both actual and expected values.
	 *
	 * Prefered to ok( actual == expected, message )
	 *
	 * @example equal( format("Received {0} bytes.", 2), "Received 2 bytes." );
	 *
	 * @param Object actual
	 * @param Object expected
	 * @param String message (optional)
	 */
	equal: function(actual, expected, message) {
		push(expected == actual, actual, expected, message);
	},

	notEqual: function(actual, expected, message) {
		push(expected != actual, actual, expected, message);
	},
	
	deepEqual: function(actual, expected, message) {
		push(QUnit.equiv(actual, expected), actual, expected, message);
	},

	notDeepEqual: function(actual, expected, message) {
		push(!QUnit.equiv(actual, expected), actual, expected, message);
	},

	strictEqual: function(actual, expected, message) {
		push(expected === actual, actual, expected, message);
	},

	notStrictEqual: function(actual, expected, message) {
		push(expected !== actual, actual, expected, message);
	},

	raises: function(fn,  message) {
		try {
			fn();
			ok( false, message );
		}
		catch (e) {
			ok( true, message );
		}
	},

	start: function() {
		// A slight delay, to avoid any current callbacks
		if ( window.setTimeout ) {
			window.setTimeout(function() {
				if ( config.timeout ) {
					clearTimeout(config.timeout);
				}

				config.blocking = false;
				process();
			}, 13);
		} else {
			config.blocking = false;
			process();
		}
	},
	
	stop: function(timeout) {
		config.blocking = true;

		if ( timeout && window.setTimeout ) {
			config.timeout = window.setTimeout(function() {
				QUnit.ok( false, "Test timed out" );
				QUnit.start();
			}, timeout);
		}
	}

};

// Backwards compatibility, deprecated
QUnit.equals = QUnit.equal;
QUnit.same = QUnit.deepEqual;

// Maintain internal state
var config = {
	// The queue of tests to run
	queue: [],

	// block until document ready
	blocking: true
};

// Load paramaters
(function() {
	var location = window.location || { search: "", protocol: "file:" },
		GETParams = location.search.slice(1).split('&');

	for ( var i = 0; i < GETParams.length; i++ ) {
		GETParams[i] = decodeURIComponent( GETParams[i] );
		if ( GETParams[i] === "noglobals" ) {
			GETParams.splice( i, 1 );
			i--;
			config.noglobals = true;
		} else if ( GETParams[i].search('=') > -1 ) {
			GETParams.splice( i, 1 );
			i--;
		}
	}
	
	// restrict modules/tests by get parameters
	config.filters = GETParams;
	
	// Figure out if we're running the tests from a server or not
	QUnit.isLocal = !!(location.protocol === 'file:');
})();

// Expose the API as global variables, unless an 'exports'
// object exists, in that case we assume we're in CommonJS
if ( typeof exports === "undefined" || typeof require === "undefined" ) {
	extend(window, QUnit);
	window.QUnit = QUnit;
} else {
	extend(exports, QUnit);
	exports.QUnit = QUnit;
}

// define these after exposing globals to keep them in these QUnit namespace only
extend(QUnit, {
	config: config,

	// Initialize the configuration options
	init: function() {
		extend(config, {
			stats: { all: 0, bad: 0 },
			moduleStats: { all: 0, bad: 0 },
			started: +new Date,
			updateRate: 1000,
			blocking: false,
			autostart: true,
			autorun: false,
			assertions: [],
			filters: [],
			queue: []
		});

		var tests = id("qunit-tests"),
			banner = id("qunit-banner"),
			result = id("qunit-testresult");

		if ( tests ) {
			tests.innerHTML = "";
		}

		if ( banner ) {
			banner.className = "";
		}

		if ( result ) {
			result.parentNode.removeChild( result );
		}
	},
	
	/**
	 * Resets the test setup. Useful for tests that modify the DOM.
	 */
	reset: function() {
		if ( window.jQuery ) {
			jQuery("#main, #qunit-fixture").html( config.fixture );
		}
	},
	
	/**
	 * Trigger an event on an element.
	 *
	 * @example triggerEvent( document.body, "click" );
	 *
	 * @param DOMElement elem
	 * @param String type
	 */
	triggerEvent: function( elem, type, event ) {
		if ( document.createEvent ) {
			event = document.createEvent("MouseEvents");
			event.initMouseEvent(type, true, true, elem.ownerDocument.defaultView,
				0, 0, 0, 0, 0, false, false, false, false, 0, null);
			elem.dispatchEvent( event );

		} else if ( elem.fireEvent ) {
			elem.fireEvent("on"+type);
		}
	},
	
	// Safe object type checking
	is: function( type, obj ) {
		return QUnit.objectType( obj ) == type;
	},
	
	objectType: function( obj ) {
		if (typeof obj === "undefined") {
				return "undefined";

		// consider: typeof null === object
		}
		if (obj === null) {
				return "null";
		}

		var type = Object.prototype.toString.call( obj )
			.match(/^\[object\s(.*)\]$/)[1] || '';

		switch (type) {
				case 'Number':
						if (isNaN(obj)) {
								return "nan";
						} else {
								return "number";
						}
				case 'String':
				case 'Boolean':
				case 'Array':
				case 'Date':
				case 'RegExp':
				case 'Function':
						return type.toLowerCase();
		}
		if (typeof obj === "object") {
				return "object";
		}
		return undefined;
	},
	
	// Logging callbacks
	begin: function() {},
	done: function(failures, total) {},
	log: function(result, message) {},
	testStart: function(name, testEnvironment) {},
	testDone: function(name, failures, total) {},
	moduleStart: function(name, testEnvironment) {},
	moduleDone: function(name, failures, total) {}
});

if ( typeof document === "undefined" || document.readyState === "complete" ) {
	config.autorun = true;
}

addEvent(window, "load", function() {
	QUnit.begin();
	
	// Initialize the config, saving the execution queue
	var oldconfig = extend({}, config);
	QUnit.init();
	extend(config, oldconfig);

	config.blocking = false;

	var userAgent = id("qunit-userAgent");
	if ( userAgent ) {
		userAgent.innerHTML = navigator.userAgent;
	}
	
	var toolbar = id("qunit-testrunner-toolbar");
	if ( toolbar ) {
		toolbar.style.display = "none";
		
		var filter = document.createElement("input");
		filter.type = "checkbox";
		filter.id = "qunit-filter-pass";
		filter.disabled = true;
		addEvent( filter, "click", function() {
			var li = document.getElementsByTagName("li");
			for ( var i = 0; i < li.length; i++ ) {
				if ( li[i].className.indexOf("pass") > -1 ) {
					li[i].style.display = filter.checked ? "none" : "";
				}
			}
		});
		toolbar.appendChild( filter );

		var label = document.createElement("label");
		label.setAttribute("for", "qunit-filter-pass");
		label.innerHTML = "Hide passed tests";
		toolbar.appendChild( label );

		var missing = document.createElement("input");
		missing.type = "checkbox";
		missing.id = "qunit-filter-missing";
		missing.disabled = true;
		addEvent( missing, "click", function() {
			var li = document.getElementsByTagName("li");
			for ( var i = 0; i < li.length; i++ ) {
				if ( li[i].className.indexOf("fail") > -1 && li[i].innerHTML.indexOf('missing test - untested code is broken code') > - 1 ) {
					li[i].parentNode.parentNode.style.display = missing.checked ? "none" : "block";
				}
			}
		});
		toolbar.appendChild( missing );

		label = document.createElement("label");
		label.setAttribute("for", "qunit-filter-missing");
		label.innerHTML = "Hide missing tests (untested code is broken code)";
		toolbar.appendChild( label );
	}

	var main = id('main') || id('qunit-fixture');
	if ( main ) {
		config.fixture = main.innerHTML;
	}

	if (config.autostart) {
		QUnit.start();
	}
});

function done() {
	if ( config.doneTimer && window.clearTimeout ) {
		window.clearTimeout( config.doneTimer );
		config.doneTimer = null;
	}

	if ( config.queue.length ) {
		config.doneTimer = window.setTimeout(function(){
			if ( !config.queue.length ) {
				done();
			} else {
				synchronize( done );
			}
		}, 13);

		return;
	}

	config.autorun = true;

	// Log the last module results
	if ( config.currentModule ) {
		QUnit.moduleDone( config.currentModule, config.moduleStats.bad, config.moduleStats.all );
	}

	var banner = id("qunit-banner"),
		tests = id("qunit-tests"),
		html = ['Tests completed in ',
		+new Date - config.started, ' milliseconds.<br/>',
		'<span class="passed">', config.stats.all - config.stats.bad, '</span> tests of <span class="total">', config.stats.all, '</span> passed, <span class="failed">', config.stats.bad,'</span> failed.'].join('');

	if ( banner ) {
		banner.className = (config.stats.bad ? "qunit-fail" : "qunit-pass");
	}

	if ( tests ) {	
		var result = id("qunit-testresult");

		if ( !result ) {
			result = document.createElement("p");
			result.id = "qunit-testresult";
			result.className = "result";
			tests.parentNode.insertBefore( result, tests.nextSibling );
		}

		result.innerHTML = html;
	}

	QUnit.done( config.stats.bad, config.stats.all );
}

function validTest( name ) {
	var i = config.filters.length,
		run = false;

	if ( !i ) {
		return true;
	}
	
	while ( i-- ) {
		var filter = config.filters[i],
			not = filter.charAt(0) == '!';

		if ( not ) {
			filter = filter.slice(1);
		}

		if ( name.indexOf(filter) !== -1 ) {
			return !not;
		}

		if ( not ) {
			run = true;
		}
	}

	return run;
}

function escapeHtml(s) {
	s = s === null ? "" : s + "";
	return s.replace(/[\&"<>\\]/g, function(s) {
		switch(s) {
			case "&": return "&amp;";
			case "\\": return "\\\\";;
			case '"': return '\"';;
			case "<": return "&lt;";
			case ">": return "&gt;";
			default: return s;
		}
	});
}

function push(result, actual, expected, message) {
	message = escapeHtml(message) || (result ? "okay" : "failed");
	message = '<span class="test-message">' + message + "</span>";
	expected = escapeHtml(QUnit.jsDump.parse(expected));
	actual = escapeHtml(QUnit.jsDump.parse(actual));
	var output = message + ', expected: <span class="test-expected">' + expected + '</span>';
	if (actual != expected) {
		output += ' result: <span class="test-actual">' + actual + '</span>, diff: ' + QUnit.diff(expected, actual);
	}
	
	// can't use ok, as that would double-escape messages
	QUnit.log(result, output);
	config.assertions.push({
		result: !!result,
		message: output
	});
}

function synchronize( callback ) {
	config.queue.push( callback );

	if ( config.autorun && !config.blocking ) {
		process();
	}
}

function process() {
	var start = (new Date()).getTime();

	while ( config.queue.length && !config.blocking ) {
		if ( config.updateRate <= 0 || (((new Date()).getTime() - start) < config.updateRate) ) {
			config.queue.shift()();

		} else {
			setTimeout( process, 13 );
			break;
		}
	}
}

function saveGlobal() {
	config.pollution = [];
	
	if ( config.noglobals ) {
		for ( var key in window ) {
			config.pollution.push( key );
		}
	}
}

function checkPollution( name ) {
	var old = config.pollution;
	saveGlobal();
	
	var newGlobals = diff( old, config.pollution );
	if ( newGlobals.length > 0 ) {
		ok( false, "Introduced global variable(s): " + newGlobals.join(", ") );
		config.expected++;
	}

	var deletedGlobals = diff( config.pollution, old );
	if ( deletedGlobals.length > 0 ) {
		ok( false, "Deleted global variable(s): " + deletedGlobals.join(", ") );
		config.expected++;
	}
}

// returns a new Array with the elements that are in a but not in b
function diff( a, b ) {
	var result = a.slice();
	for ( var i = 0; i < result.length; i++ ) {
		for ( var j = 0; j < b.length; j++ ) {
			if ( result[i] === b[j] ) {
				result.splice(i, 1);
				i--;
				break;
			}
		}
	}
	return result;
}

function fail(message, exception, callback) {
	if ( typeof console !== "undefined" && console.error && console.warn ) {
		console.error(message);
		console.error(exception);
		console.warn(callback.toString());

	} else if ( window.opera && opera.postError ) {
		opera.postError(message, exception, callback.toString);
	}
}

function extend(a, b) {
	for ( var prop in b ) {
		a[prop] = b[prop];
	}

	return a;
}

function addEvent(elem, type, fn) {
	if ( elem.addEventListener ) {
		elem.addEventListener( type, fn, false );
	} else if ( elem.attachEvent ) {
		elem.attachEvent( "on" + type, fn );
	} else {
		fn();
	}
}

function id(name) {
	return !!(typeof document !== "undefined" && document && document.getElementById) &&
		document.getElementById( name );
}

// Test for equality any JavaScript type.
// Discussions and reference: http://philrathe.com/articles/equiv
// Test suites: http://philrathe.com/tests/equiv
// Author: Philippe Rathé <prathe@gmail.com>
QUnit.equiv = function () {

    var innerEquiv; // the real equiv function
    var callers = []; // stack to decide between skip/abort functions
    var parents = []; // stack to avoiding loops from circular referencing

    // Call the o related callback with the given arguments.
    function bindCallbacks(o, callbacks, args) {
        var prop = QUnit.objectType(o);
        if (prop) {
            if (QUnit.objectType(callbacks[prop]) === "function") {
                return callbacks[prop].apply(callbacks, args);
            } else {
                return callbacks[prop]; // or undefined
            }
        }
    }
    
    var callbacks = function () {

        // for string, boolean, number and null
        function useStrictEquality(b, a) {
            if (b instanceof a.constructor || a instanceof b.constructor) {
                // to catch short annotaion VS 'new' annotation of a declaration
                // e.g. var i = 1;
                //      var j = new Number(1);
                return a == b;
            } else {
                return a === b;
            }
        }

        return {
            "string": useStrictEquality,
            "boolean": useStrictEquality,
            "number": useStrictEquality,
            "null": useStrictEquality,
            "undefined": useStrictEquality,

            "nan": function (b) {
                return isNaN(b);
            },

            "date": function (b, a) {
                return QUnit.objectType(b) === "date" && a.valueOf() === b.valueOf();
            },

            "regexp": function (b, a) {
                return QUnit.objectType(b) === "regexp" &&
                    a.source === b.source && // the regex itself
                    a.global === b.global && // and its modifers (gmi) ...
                    a.ignoreCase === b.ignoreCase &&
                    a.multiline === b.multiline;
            },

            // - skip when the property is a method of an instance (OOP)
            // - abort otherwise,
            //   initial === would have catch identical references anyway
            "function": function () {
                var caller = callers[callers.length - 1];
                return caller !== Object &&
                        typeof caller !== "undefined";
            },

            "array": function (b, a) {
                var i, j, loop;
                var len;

                // b could be an object literal here
                if ( ! (QUnit.objectType(b) === "array")) {
                    return false;
                }   
                
                len = a.length;
                if (len !== b.length) { // safe and faster
                    return false;
                }
                
                //track reference to avoid circular references
                parents.push(a);
                for (i = 0; i < len; i++) {
                    loop = false;
                    for(j=0;j<parents.length;j++){
                        if(parents[j] === a[i]){
                            loop = true;//dont rewalk array
                        }
                    }
                    if (!loop && ! innerEquiv(a[i], b[i])) {
                        parents.pop();
                        return false;
                    }
                }
                parents.pop();
                return true;
            },

            "object": function (b, a) {
                var i, j, loop;
                var eq = true; // unless we can proove it
                var aProperties = [], bProperties = []; // collection of strings

                // comparing constructors is more strict than using instanceof
                if ( a.constructor !== b.constructor) {
                    return false;
                }

                // stack constructor before traversing properties
                callers.push(a.constructor);
                //track reference to avoid circular references
                parents.push(a);
                
                for (i in a) { // be strict: don't ensures hasOwnProperty and go deep
                    loop = false;
                    for(j=0;j<parents.length;j++){
                        if(parents[j] === a[i])
                            loop = true; //don't go down the same path twice
                    }
                    aProperties.push(i); // collect a's properties

                    if (!loop && ! innerEquiv(a[i], b[i])) {
                        eq = false;
                        break;
                    }
                }

                callers.pop(); // unstack, we are done
                parents.pop();

                for (i in b) {
                    bProperties.push(i); // collect b's properties
                }

                // Ensures identical properties name
                return eq && innerEquiv(aProperties.sort(), bProperties.sort());
            }
        };
    }();

    innerEquiv = function () { // can take multiple arguments
        var args = Array.prototype.slice.apply(arguments);
        if (args.length < 2) {
            return true; // end transition
        }

        return (function (a, b) {
            if (a === b) {
                return true; // catch the most you can
            } else if (a === null || b === null || typeof a === "undefined" || typeof b === "undefined" || QUnit.objectType(a) !== QUnit.objectType(b)) {
                return false; // don't lose time with error prone cases
            } else {
                return bindCallbacks(a, callbacks, [b, a]);
            }

        // apply transition with (1..n) arguments
        })(args[0], args[1]) && arguments.callee.apply(this, args.splice(1, args.length -1));
    };

    return innerEquiv;

}();

/**
 * jsDump
 * Copyright (c) 2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Licensed under BSD (http://www.opensource.org/licenses/bsd-license.php)
 * Date: 5/15/2008
 * @projectDescription Advanced and extensible data dumping for Javascript.
 * @version 1.0.0
 * @author Ariel Flesler
 * @link {http://flesler.blogspot.com/2008/05/jsdump-pretty-dump-of-any-javascript.html}
 */
QUnit.jsDump = (function() {
	function quote( str ) {
		return '"' + str.toString().replace(/"/g, '\\"') + '"';
	};
	function literal( o ) {
		return o + '';	
	};
	function join( pre, arr, post ) {
		var s = jsDump.separator(),
			base = jsDump.indent(),
			inner = jsDump.indent(1);
		if ( arr.join )
			arr = arr.join( ',' + s + inner );
		if ( !arr )
			return pre + post;
		return [ pre, inner + arr, base + post ].join(s);
	};
	function array( arr ) {
		var i = arr.length,	ret = Array(i);					
		this.up();
		while ( i-- )
			ret[i] = this.parse( arr[i] );				
		this.down();
		return join( '[', ret, ']' );
	};
	
	var reName = /^function (\w+)/;
	
	var jsDump = {
		parse:function( obj, type ) { //type is used mostly internally, you can fix a (custom)type in advance
			var	parser = this.parsers[ type || this.typeOf(obj) ];
			type = typeof parser;			
			
			return type == 'function' ? parser.call( this, obj ) :
				   type == 'string' ? parser :
				   this.parsers.error;
		},
		typeOf:function( obj ) {
			var type;
			if ( obj === null ) {
				type = "null";
			} else if (typeof obj === "undefined") {
				type = "undefined";
			} else if (QUnit.is("RegExp", obj)) {
				type = "regexp";
			} else if (QUnit.is("Date", obj)) {
				type = "date";
			} else if (QUnit.is("Function", obj)) {
				type = "function";
			} else if (obj.setInterval && obj.document && !obj.nodeType) {
				type = "window";
			} else if (obj.nodeType === 9) {
				type = "document";
			} else if (obj.nodeType) {
				type = "node";
			} else if (typeof obj === "object" && typeof obj.length === "number" && obj.length >= 0) {
				type = "array";
			} else {
				type = typeof obj;
			}
			return type;
		},
		separator:function() {
			return this.multiline ?	this.HTML ? '<br />' : '\n' : this.HTML ? '&nbsp;' : ' ';
		},
		indent:function( extra ) {// extra can be a number, shortcut for increasing-calling-decreasing
			if ( !this.multiline )
				return '';
			var chr = this.indentChar;
			if ( this.HTML )
				chr = chr.replace(/\t/g,'   ').replace(/ /g,'&nbsp;');
			return Array( this._depth_ + (extra||0) ).join(chr);
		},
		up:function( a ) {
			this._depth_ += a || 1;
		},
		down:function( a ) {
			this._depth_ -= a || 1;
		},
		setParser:function( name, parser ) {
			this.parsers[name] = parser;
		},
		// The next 3 are exposed so you can use them
		quote:quote, 
		literal:literal,
		join:join,
		//
		_depth_: 1,
		// This is the list of parsers, to modify them, use jsDump.setParser
		parsers:{
			window: '[Window]',
			document: '[Document]',
			error:'[ERROR]', //when no parser is found, shouldn't happen
			unknown: '[Unknown]',
			'null':'null',
			undefined:'undefined',
			'function':function( fn ) {
				var ret = 'function',
					name = 'name' in fn ? fn.name : (reName.exec(fn)||[])[1];//functions never have name in IE
				if ( name )
					ret += ' ' + name;
				ret += '(';
				
				ret = [ ret, this.parse( fn, 'functionArgs' ), '){'].join('');
				return join( ret, this.parse(fn,'functionCode'), '}' );
			},
			array: array,
			nodelist: array,
			arguments: array,
			object:function( map ) {
				var ret = [ ];
				this.up();
				for ( var key in map )
					ret.push( this.parse(key,'key') + ': ' + this.parse(map[key]) );
				this.down();
				return join( '{', ret, '}' );
			},
			node:function( node ) {
				var open = this.HTML ? '&lt;' : '<',
					close = this.HTML ? '&gt;' : '>';
					
				var tag = node.nodeName.toLowerCase(),
					ret = open + tag;
					
				for ( var a in this.DOMAttrs ) {
					var val = node[this.DOMAttrs[a]];
					if ( val )
						ret += ' ' + a + '=' + this.parse( val, 'attribute' );
				}
				return ret + close + open + '/' + tag + close;
			},
			functionArgs:function( fn ) {//function calls it internally, it's the arguments part of the function
				var l = fn.length;
				if ( !l ) return '';				
				
				var args = Array(l);
				while ( l-- )
					args[l] = String.fromCharCode(97+l);//97 is 'a'
				return ' ' + args.join(', ') + ' ';
			},
			key:quote, //object calls it internally, the key part of an item in a map
			functionCode:'[code]', //function calls it internally, it's the content of the function
			attribute:quote, //node calls it internally, it's an html attribute value
			string:quote,
			date:quote,
			regexp:literal, //regex
			number:literal,
			'boolean':literal
		},
		DOMAttrs:{//attributes to dump from nodes, name=>realName
			id:'id',
			name:'name',
			'class':'className'
		},
		HTML:false,//if true, entities are escaped ( <, >, \t, space and \n )
		indentChar:'   ',//indentation unit
		multiline:false //if true, items in a collection, are separated by a \n, else just a space.
	};

	return jsDump;
})();

// from Sizzle.js
function getText( elems ) {
	var ret = "", elem;

	for ( var i = 0; elems[i]; i++ ) {
		elem = elems[i];

		// Get the text from text nodes and CDATA nodes
		if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
			ret += elem.nodeValue;

		// Traverse everything else, except comment nodes
		} else if ( elem.nodeType !== 8 ) {
			ret += getText( elem.childNodes );
		}
	}

	return ret;
};

/*
 * Javascript Diff Algorithm
 *  By John Resig (http://ejohn.org/)
 *  Modified by Chu Alan "sprite"
 *
 * Released under the MIT license.
 *
 * More Info:
 *  http://ejohn.org/projects/javascript-diff-algorithm/
 *  
 * Usage: QUnit.diff(expected, actual)
 * 
 * QUnit.diff("the quick brown fox jumped over", "the quick fox jumps over") == "the  quick <del>brown </del> fox <del>jumped </del><ins>jumps </ins> over"
 */
QUnit.diff = (function() {
	function escape(s){
		var n = s;
		n = n.replace(/&/g, "&amp;");
		n = n.replace(/</g, "&lt;");
		n = n.replace(/>/g, "&gt;");
		n = n.replace(/"/g, "&quot;");
		
		return n;
	}
	
	function diff(o, n){
		var ns = new Object();
		var os = new Object();
		
		for (var i = 0; i < n.length; i++) {
			if (ns[n[i]] == null) 
				ns[n[i]] = {
					rows: new Array(),
					o: null
				};
			ns[n[i]].rows.push(i);
		}
		
		for (var i = 0; i < o.length; i++) {
			if (os[o[i]] == null) 
				os[o[i]] = {
					rows: new Array(),
					n: null
				};
			os[o[i]].rows.push(i);
		}
		
		for (var i in ns) {
			if (ns[i].rows.length == 1 && typeof(os[i]) != "undefined" && os[i].rows.length == 1) {
				n[ns[i].rows[0]] = {
					text: n[ns[i].rows[0]],
					row: os[i].rows[0]
				};
				o[os[i].rows[0]] = {
					text: o[os[i].rows[0]],
					row: ns[i].rows[0]
				};
			}
		}
		
		for (var i = 0; i < n.length - 1; i++) {
			if (n[i].text != null && n[i + 1].text == null && n[i].row + 1 < o.length && o[n[i].row + 1].text == null &&
			n[i + 1] == o[n[i].row + 1]) {
				n[i + 1] = {
					text: n[i + 1],
					row: n[i].row + 1
				};
				o[n[i].row + 1] = {
					text: o[n[i].row + 1],
					row: i + 1
				};
			}
		}
		
		for (var i = n.length - 1; i > 0; i--) {
			if (n[i].text != null && n[i - 1].text == null && n[i].row > 0 && o[n[i].row - 1].text == null &&
			n[i - 1] == o[n[i].row - 1]) {
				n[i - 1] = {
					text: n[i - 1],
					row: n[i].row - 1
				};
				o[n[i].row - 1] = {
					text: o[n[i].row - 1],
					row: i - 1
				};
			}
		}
		
		return {
			o: o,
			n: n
		};
	}
	
	return function(o, n){
		o = o.replace(/\s+$/, '');
		n = n.replace(/\s+$/, '');
		var out = diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/));

		var str = "";
		
		var oSpace = o.match(/\s+/g);
		if (oSpace == null) {
			oSpace = ["\n"];
		}
		else {
			oSpace.push("\n");
		}
		var nSpace = n.match(/\s+/g);
		if (nSpace == null) {
			nSpace = ["\n"];
		}
		else {
			nSpace.push("\n");
		}
		
		if (out.n.length == 0) {
			for (var i = 0; i < out.o.length; i++) {
				str += '<del>' + escape(out.o[i]) + oSpace[i] + "</del>";
			}
		}
		else {
			if (out.n[0].text == null) {
				for (n = 0; n < out.o.length && out.o[n].text == null; n++) {
					str += '<del>' + escape(out.o[n]) + oSpace[n] + "</del>";
				}
			}
			
			for (var i = 0; i < out.n.length; i++) {
				if (out.n[i].text == null) {
					str += '<ins>' + escape(out.n[i]) + nSpace[i] + "</ins>";
				}
				else {
					var pre = "";
					
					for (n = out.n[i].row + 1; n < out.o.length && out.o[n].text == null; n++) {
						pre += '<del>' + escape(out.o[n]) + oSpace[n] + "</del>";
					}
					str += " " + out.n[i].text + nSpace[i] + pre;
				}
			}
		}
		
		return str;
	}
})();

})(this);
$('#gameCanvas').powerCanvas({init: function(_canvas) {

  canvas = _canvas;
  canvas.font("bold 1.2em 'Monaco', 'Inconsolata', 'consolas', 'Courier New', 'andale mono', 'lucida console', 'monospace'");

  var started = false;
  var loaded = false;
  var titleScreen = Sprite.load("images/titlescreen.png");
  var dots = "";

  var loadingInterval = setInterval(function() {
    if(dots.length % 4 == 3) {
      dots = "";
    } else {
      dots = dots + ".";
    }

    var status = AssetTracker.count();

    if(status[0] >= status[1]) {
      loaded = true;
      clearInterval(loadingInterval);
    }

    titleScreen.draw(canvas, 0, 0);
    canvas.fillColor("#FFF");
    if(loaded) {
      canvas.centerText("PRESS SPACE TO START", 360);
    } else {
      canvas.fillText("LOADING" + dots, 280, 360);
    }
  }, 500);

  $('.continue_yes').click(function() {
    dino.heal(500);
    score = Math.floor(score / 2);
    currentLevel.continueResume();
    $("#game_container").css("cursor", "none");
    $('#continue').hide();
  });

  $('.continue_no').click(function() {
    $('#continue').hide();
    endGameDisplay();
  });

  $(document).bind("keydown", "space", function() {
    if(loaded && !started) {
      started = true;
      nextStage();
    }
  })
}});
(function(){
  function LoaderProxy() {
    return {
      draw: $.noop,
      frame: $.noop,
      update: $.noop,
      width: null,
      height: null
    };
  }

  var brokenImageWarning = function(url) {
    return function() {
      if(warning) {
        warning("Could not load: " + url);
      }
    }
  }

  // Asset Tracking for load progress
  var assetCount = 0;
  var loadedAssets = 0;
  function track(asset) {
    assetCount++;

    asset.load(function() {
      loadedAssets++;
    });
  }

  window["AssetTracker"] = {
    count: function() {
      return [loadedAssets, assetCount];
    }
  }

  var Sprite = function(image, sourceX, sourceY, width, height) {
    sourceX = sourceX || 0;
    sourceY = sourceY || 0;
    width = width || image.width;
    height = height || image.height;

    return {
      update: $.noop,

      draw: function(canvas, x, y, sx, sy, swidth, sheight) {
        canvas.drawImage(image,
          sx || sourceX,
          sy || sourceY,
          swidth || width,
          sheight || height,
          x,
          y,
          swidth || width,
          sheight || height
        );
      },

      frame: function(newFrame) {
        if(newFrame !== undefined) {
          return this;
        } else {
          return 0;
        }
      },

      frameCount: function() {
        return 1;
      },
      
      width: width,
      height: height
    };
  };

  Sprite.load = function(url, loadedCallback) {
    var img = new Image();
    var proxy = LoaderProxy();

    img.onload = function() {
      var tile = Sprite(this);

      $.extend(proxy, tile);

      if(loadedCallback) {
        loadedCallback(proxy);
      }
    };

    if(url) {
      track($(img));
    }
    img.onerror = brokenImageWarning(url);

    img.src = url;

    return proxy;
  };

  Sprite.EMPTY = LoaderProxy();

  window["Sprite"] = Sprite;
  

  window["Composite"] = function(tileData) {
    var tileCount = tileData.length;

    var self = {
      update: function() {},

      draw: function(canvas, x, y, options) {
        var datum;

        for(var i = 0; i < tileCount; i++) {
          datum = tileData[i];

          canvas.withState(x, y, options, function() {
            datum.tile.draw(canvas, datum.x, datum.y, datum.options);
          });
        }
      }
    };

    return self;
  };

  var Animation = function(options) {
    var frameData = options.frameData;
    var delay = options.delay;
    var destinationOffset = options.destinationOffset || Point(0, 0);

    var count = 0;
    var currentFrame = 0;
    var frameCount = frameData.length;
    delay = delay || 1;

    return {
      draw: function(canvas, x, y, options) {
        frameData[currentFrame].draw(canvas, 
          x + destinationOffset.x,
          y + destinationOffset.y,
          options
        );
      },

      duration: function() {
        return frameCount * delay;
      },

      frame: function(newFrame) {
        if(newFrame !== undefined) {
          currentFrame = newFrame % frameCount;
          return this;
        } else {
          return currentFrame;
        }
      },

      frameCount: function() {
        return frameCount;
      },

      update: function() {
        count++;

        if(count % delay == 0) {
          currentFrame = (currentFrame + 1) % frameCount;
          count = 0;
        }
      }
    };
  };

  Animation.load = function(options, proxy, callback) {
    var img = new Image();
    proxy = proxy || LoaderProxy();

    var url = options.url;
    var frames = options.frames;
    var delay = options.delay;
    var width = options.width;
    var height = options.height;

    proxy.width = width;
    proxy.height = height;

    img.onload = function() {
      var frameData = [];

      frames.times(function(i) {
        frameData[i] = Sprite(img, i * width, 0, width, height);
      });

      $.extend(proxy, Animation({
        delay: delay,
        destinationOffset: options.destinationOffset,
        frameData: frameData
      }));

      if(callback) {
        callback(proxy);
      }
    };

    if(url) {
      track($(img));
    }
    img.onerror = brokenImageWarning(url);

    img.src = url;

    return proxy;
  };

  Animation.loadJSON = function(data, proxy, callback) {
    proxy = proxy || LoaderProxy();

    var animCallback = function(animation) {
      if(callback) {
        callback(animation, data);
      }
    };

    Animation.load(data, proxy, animCallback);

    return proxy;
  };

  Animation.loadJSONUrl = function(url, callback) {
    var proxy = LoaderProxy();

    $.getJSON(url, function(data, status) {
      Animation.loadJSON(data, proxy, callback);
    });

    return proxy;
  };

  window["Animation"] = Animation;

  window["Actor"] = function(states, defaultState, callbacks) {
    var state = defaultState || "default";

    return {
      update: function() {
        if(states[state]) {
          states[state].update();
        }
        callbacks.update.call(this, state);
      },

      draw: callbacks.draw,

      state: function(newState) {
        if(newState === undefined) {
          return state;
        } else {
          state = newState;
          return this;
        }
      }
    };
  };

  window["loadAnimation"] = function(url, frames, width, height, delay) {
    return Animation.load({
      url: url,
      frames: frames,
      width: width,
      height: height,
      delay: delay
    });
  };
})();/**
 * Generate uniformly distributed random numbers.
 *
 * @param {Number} [n]
 * @returns A Random integers from [0, n) if n is given, otherwise a random float
 * between 0 and 1.
 * @type Number
 */
function rand(n) {
  if(n !== undefined) {
    return Math.floor(Math.random() * n);
  } else {
    return Math.random();
  }
}

function isNaN(x) {
  return typeof(x) === "number" && !(x <= 0) && !(x >= 0);
}

function warning(message) {
  if(console && console.warn) {
    console.warn(message);
  }
}

/**
 * Randomly select an element from the array. The array remains unmodified.
 *
 * @returns A random element from an array, or undefined if the array is empty.
 */
Array.prototype.rand = function() {
  return this[rand(this.length)];
};

/**
 * Remove the first occurance of the given object from the array if it is
 * present.
 *
 * @param {Object} object The object to remove from the array if present.
 * @returns The removed object if present otherwise undefined.
 */
Array.prototype.remove = function(object) {
  var index = this.indexOf(object);
  if(index >= 0) {
    return this.splice(index, 1)[0];
  } else {
    return undefined;
  }
};

/**
 * Call the given iterator once for each element in the array,
 * passing in the element as the first argument, the index of
 * the element as the second argument, and this array as the
 * third argument.
 *
 * @param {Function} iterator Function to be called once for
 * each element in the array.
 * @param {Object} [context] Optional context parameter to be
 * used as `this` when calling the iterator function.
 *
 * @returns `this` to enable method chaining.
 */
Array.prototype.each = function(iterator, context) {
  if(this.forEach) {
    this.forEach(iterator, context);
  } else {
    var len = this.length;
    for(var i = 0; i < len; i++) {
      iterator.call(context, this[i], i, this);
    }
  }

  return this;
};

/**
 * Partitions the elements into two groups: those for which the iterator returns
 * true, and those for which it returns false.
 * @param {Function} iterator
 * @param {Object} [context] Optional context parameter to be
 * used as `this` when calling the iterator function.
 *
 * @type Array
 * @returns An array in the form of [trueCollection, falseCollection]
 */
Array.prototype.partition = function(iterator, context) {
  var trueCollection = [];
  var falseCollection = [];

  this.each(function(element) {
    if(iterator.call(context, element)) {
      trueCollection.push(element);
    } else {
      falseCollection.push(element);
    }
  });

  return [trueCollection, falseCollection];
};

Array.prototype.select = function(iterator, context) {
  return this.partition(iterator, context)[0];
};

Array.prototype.reject = function(iterator, context) {
  return this.partition(iterator, context)[1];
};

/**
 * A mod method useful for array wrapping. The range of the function is
 * constrained to remain in bounds of array indices.
 *
 * <pre>
 * Example:
 * Math.mod(-1, 5) === 4
 * </pre>
 *
 * @param {Number} n
 * @param {Number} base
 * @returns An integer between 0 and (base - 1) if base is positive.
 * @type Number
 */
Math.mod = function(n, base) {
  var result = n % base;

  if(result < 0 && base > 0) {
    result += base;
  }

  return result;
};

/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

/**
 * Calls iterator the specified number of times, passing in a number of the
 * current iteration as a parameter. The number will be 0 on first call, 1 on
 * second call, etc.
 *
 * @param {Function} iterator The iterator takes a single parameter, the number
 * of the current iteration.
 * @param {Object} [context] The optional context parameter specifies an object
 * to treat as <code>this</code> in the iterator block.
 *
 * @returns The number of times the iterator was called.
 */
Number.prototype.times = function(iterator, context) {
  for(var i = 0; i < this; i++) {
    iterator.call(context, i);
  }
  return i;
};

/**
 * @returns The sign of this number, 0 if the number is 0.
 */
Number.prototype.sign = function() {
  if(this > 0) {
    return 1;
  } else if (this < 0) {
    return -1;
  } else {
    return 0;
  }
};

Number.prototype.abs = function() {
  return Math.abs(this);
};

Number.prototype.floor = function() {
  return Math.floor(this);
};

Number.prototype.ceil = function() {
  return Math.ceil(this);
};

Number.prototype.approach = function(target, maxDelta) {
  return (target - this).clamp(-maxDelta, maxDelta) + this;
};

Number.prototype.approachRotation = function(target, maxDelta) {
  var twoPi = 2 * Math.PI;

  while(target > this + Math.PI) {
    target -= twoPi
  }

  while(target < this - Math.PI) {
    target += twoPi
  }

  return (target - this).clamp(-maxDelta, maxDelta) + this;
};

function before(method, interception) {
  return function() {
    interception.apply(this, arguments);
    return method.apply(this, arguments);
  };
}

function after(method, interception) {
  return function() {
    var returnValue = method.apply(this, arguments);
    interception.apply(this, arguments);
    return returnValue;
  };
}

/**
 * Merges properties from objects into target without overiding.
 * First come, first served.
 * @return target
 */
jQuery.extend({
  reverseMerge: function(target) {
    var i = 1, length = arguments.length;

    for( ; i < length; i++) {
      var object = arguments[i];

      for(var name in object) {
        if(!target.hasOwnProperty(name)) {
          target[name] = object[name];
        }
      }
    }

    return target;
  }
});

function circleCollision(gameObject1, gameObject2) {
  var hit = false;
  var component1;
  var component2;

  $.each(gameObject1.getCircles(), function(i, c1) {
    if(hit) {
      return;
    }

    $.each(gameObject2.getCircles(), function(i, c2) {
      if(hit) {
        return;
      }

      var dx = c1.x - c2.x;
      var dy = c1.y - c2.y;
      var dist = c1.radius + c2.radius;

      if(dx * dx + dy * dy <= dist * dist) {
        hit = true;
        component1 = c1.component;
        component2 = c2.component;
      }
    });
  });

  if(hit) {
    component1.hit(component2);
    component2.hit(component1);
  }

  return hit;
}

function planeCollision(gameObject, plane) {
  var circles = gameObject.getCircles();
  var hit = false;
  var component;

  $.each(circles, function(i, circle) {
    if(hit) {
      return;
    }

    if(circle.y + circle.radius >= plane.y) {
      hit = true;
      component = circle.component;
    }
  });

  if(hit) {
    component.hit(plane);
    plane.hit(component);
  }

  return hit;
}
function ProgressBar(I) {
  function completeness() {
    return I.value / I.max;
  }

  function update() {
    I.element.css({
      'background-color': I.colorMap(completeness()),
      'width': Math.floor(completeness() * 100) + "%"
    });
  }

  // Init Defaults
  I = $.extend({
    colorMap: function() {
      return I.color;
    },
    vertical: false,
    element: $("#health")
  }, I);

  var self = {
    value: function(newValue) {
      if(newValue != undefined) {
        I.value = Math.min(newValue, I.max);
        update();
        return self;
      } else {
        return I.value;
      }
    }
  };

  return self;
}

function GameText(text, I) {
  I.y -= 30;
  I.width = 1;
  I.height = 1;

  return GameObject(I).extend({
    draw: function(canvas) {
      canvas.fillColor("#000");
      canvas.fillText(text, I.x, I.y);
    },

    after: {
      update: function() {
        if(I.age > 30) {
          I.active = false;
        }
      }
    }
  });
}

function healthColorMap(completeness) {
  var r = Math.floor((1.5 - 2 * completeness).clamp(0, 1) * 255).toString(16);
  if(r.length == 1) {
    r = "0" + r;
  }

  var g = Math.floor((completeness * 0.75).clamp(0, 1) * 255).toString(16);
  if(g.length == 1) {
    g = "0" + g;
  }

  return "#" + r + g + "00";
}
function Bindable() {

  var eventCallbacks = {};

  return {
    bind: function(event, callback) {
      eventCallbacks[event] = eventCallbacks[event] || [];

      eventCallbacks[event].push(callback);
    },

    trigger: function(event) {
      var callbacks = eventCallbacks[event];

      if(callbacks && callbacks.length) {
        var self = this;
        $.each(callbacks, function(i, callback) {
          callback(self);
        });
      }
    }
  };
}
var CANVAS_WIDTH = 640;
var CANVAS_HEIGHT = 480;

var GRAVITY = 0.8;
var MILLISECONDS_PER_FRAME = 33;

var DEVELOPMENT = true;
function Control(character, keyDown) {
  $.each({
    "return": function() {
      shooting = !shooting;
    },

    "w up ,": function() {
      keyDown.up = true;

      if (character.hasJetpack() && (character.currentState() !== character.states().bite)) {
        character.transition(character.states().fly);
      }
    },

    "t": function() {
      keyDown.t = true;
      character.toss();
    },

    "left a": function() {
      keyDown.left = true;

      if (!character.airborne() && (character.currentState() !== character.states().bite)) {
        character.xVelocity(-WALK_VELOCITY);
        character.transition(character.states().walk);
      } else {
        if (!character.states().flyBite) {
          character.transition(character.state().fly);
        }
      }
    },

    "right d e": function() {
      keyDown.right = true;

      if (!character.airborne() && (character.currentState() !== character.states().bite)) {
        character.xVelocity(WALK_VELOCITY);
        character.transition(character.states().walk);
      } else {
        if (!character.states().flyBite) {
          character.transition(character.state().fly);
        }
      }
    },

    "down s o": function() {
      keyDown.down = true;
    },

    "space": function() {
      keyDown.space = true;
      character.bite();
    },
    "'": function() {
      keyDown.aimAntiClockwise = true;
    },
    ".": function() {
      keyDown.aimClockwise = true;
    }
  }, function(key, fn) {
    $(document).bind('keydown', key, function() {
      fn();
      return false;
    });
  });

  $.each({
    "w up ,": function() {
      keyDown.up = false;
    },
    "down s o": function() {
      keyDown.down = false;
    },
    "'": function() {
      keyboardAiming = true;
      keyDown.aimAntiClockwise = false;
    },
    ".": function() {
      keyboardAiming = true;
      keyDown.aimClockwise = false;
    }
  }, function(key, fn) {
    $(document).bind('keyup', key, function(event) {
      event.preventDefault();

      fn();
    });
  });

  $(document).bind('keyup', 'left a', function() {
    keyDown.left = false;

    if(!character.airborne()) {
      character.xVelocity(0);
      character.transition(character.states().idle1);
    }
  });

  $(document).bind('keyup', 'right d e', function() {
    keyDown.right = false;
    if(!character.airborne()) {
      character.xVelocity(0);
      character.transition(character.states().idle1);
    }
  });

  $(document).mousedown(function(event) {
    event.preventDefault();

    if(event.button != 0) {
      character.bite();
    }
  });

  $("#game_container").mousedown(function(event) {
    event.preventDefault();

    if(event.button == 0) {
      shooting = true;
    }
  }).mouseup(function(event) {
    event.preventDefault();

    if(event.button == 0) {
      shooting = false;
    }
  }).bind("mousewheel", function(event, delta) {
    if(delta > 0) {
      character.nextWeapon();
    } else {
      character.prevWeapon();
    }
  });
}
function Core(I) {
  var __slice = Array.prototype.slice;
  I = I || {};

  var self = {
    attrAccessor: function() {
      var attrNames;
      attrNames = __slice.call(arguments, 0);

      attrNames.each(function(attrName) {
        (self[attrName] = function(newValue) {
          if (typeof newValue !== "undefined" && newValue !== null) {
            I[attrName] = newValue;
            return self;
          } else {
            return I[attrName];
          }
        });
      });
    },

    attrReader: function() {
      var attrNames;
      attrNames = __slice.call(arguments, 0);

      attrNames.each(function(attrName) {
        (self[attrName] = function() {
          return I[attrName];
        });
      });
    },

    extend: function(options) {
      var afterMethods = options.after;
      var beforeMethods = options.before;

      delete options.after;
      delete options.before;

      $.each(options, function(name, method) {
        self[name] = method;
      });

      if(beforeMethods) {
        $.each(beforeMethods, function(name, method) {
          self[name] = before(self[name], method);
        });
      }

      if(afterMethods) {
        $.each(afterMethods, function(name, method) {
          self[name] = after(self[name], method);
        });
      }

      return self;
    }
  };

  return self;
}
function DialogBox(I) {
  I = I || {};

  $.reverseMerge(I, {
    avatar: null,
    backgroundColor: "#000",
    blinkRate: 16,
    cursor: true,
    cursorWidth: 10,
    height: 480,
    lineHeight: 20,
    paddingX: 36,
    paddingY: 32,
    sprite: Sprite.load("images/dialogbox_75.png"),
    text: "",
    textColor: "#FFF",
    width: 640,
    x: 0,
    y: 320
  });

  I.textWidth = I.width - 2*(I.paddingX) - (I.avatar ? I.avatar.width : 0);
  I.textHeight = I.height - 2*(I.paddingY);

  var blinkCount = 0;
  var cursorOn = true;

  var pageOffset = 0;
  var displayChars = 0;

  return {
    complete: function() {
      return displayChars >= I.text.length - 1;
    },

    draw: function(canvas) {
      //TODO: A lot of the logic in here should be moved into the
      // update method and pre-computed.
      var textStart = Point((I.avatar) ? I.paddingX + I.avatar.width : I.paddingX, I.paddingY + I.lineHeight);

      canvas.withTransform(Matrix.translation(I.x, I.y), function() {

        if (I.sprite) {
          I.sprite.draw(canvas, 0, 0);
        } else {
          canvas.fillColor(I.backgroundColor);
          canvas.fillRect(0, 0, I.width, I.height);
        }

        canvas.fillColor(I.textColor);

        var pageCharCount = 0;
        var displayText = I.text.substr(pageOffset, displayChars);

        var piecesRemaining = displayText.split(' ');
        var lineWidth = 0;
        var line = 0;

        while(piecesRemaining.length > 0) {
          var currentLine = piecesRemaining.shift();

          while((canvas.measureText(currentLine) <= I.textWidth) && (piecesRemaining.length > 0)) {
            var proposedLine = currentLine + " " + piecesRemaining[0];

            if(canvas.measureText(proposedLine) <= I.textWidth) {
              piecesRemaining.shift();
              currentLine = proposedLine;
            } else {
              break;
                ;//NOOP
            }
          }

          pageCharCount += currentLine.length;

          canvas.fillText(currentLine, textStart.x, textStart.y + line * I.lineHeight);
          lineWidth = canvas.measureText(currentLine);

          if(line * I.lineHeight < I.textHeight) {
            line += 1;
          } else {
            pageOffset += pageCharCount + line;
            line = 0;
            pageCharCount = 0;
            displayChars = 0;
            break;
              ;
          }
        }

        if(cursorOn && I.cursor) {
          canvas.fillRect(textStart.x + lineWidth, textStart.y + (line - 2) *I.lineHeight, I.cursorWidth, I.lineHeight);
        }
      });

      if (I.avatar) {
        I.avatar.draw(canvas, 0, I.y);
      }
    },

    flush: function() {
      displayChars = I.text.length;
    },

    setText: function(text) {
      pageOffset = 0;
      displayChars = 0;
      I.text = text;
    },

    update: function() {
      displayChars++;
      blinkCount++;

      if(blinkCount >= I.blinkRate) {
        blinkCount = 0;
        cursorOn = !cursorOn;
      }
    }
  };
}var WALK_VELOCITY = 6;

var shooting = false;
var secondaryShooting = false;

function Dinosaur(I) {
  I = I || {};

  var width = 128;
  var height = 128;

  var jetpack;
  var jetpackOn = false;
  var jetpackAngle = 0;

  var currentHealth = 0;

  var parasailing = false;
  var boss = false;
  var airborne = true;

  var weapons = [];
  var selectedWeapon;

  var keyDown = {};

  var modelPath = "data/dinosaur/";
  var extension = ".model.json";
  var walkModel = Model.loadJSONUrl(modelPath + "walk" + extension);
  var flyModel = Model.loadJSONUrl(modelPath + "fly" + extension);
  var biteModel = Model.loadJSONUrl(modelPath + "bite" + extension);
  var flyBiteModel = Model.loadJSONUrl(modelPath + "fly_bite" + extension);
  var cryModel = Model.loadJSONUrl(modelPath + "cry" + extension);
  var idle1Model = Model.loadJSONUrl(modelPath + "idle1" + extension);
  var idle2Model = Model.loadJSONUrl(modelPath + "idle2" + extension);

  var parasailTile = Sprite.load("images/levels/parasail/sail.png");

  var states = {
    bite: State({
      complete: function() {
        I.currentState = states.idle1;
      },
      duration: 24,
      model: biteModel,
      update: function() {
        var bitePoint = states.bite.model().attachment("bite");
        if(bitePoint) {
          var t = self.getTransform();
          var p = t.transformPoint(bitePoint);

          addGameObject(Bullet({
            collideDamage: 10,
            damageType: "bite",
            dispersion: 30,
            effectCount: 5,
            duration: 1,
            radius: 30,
            speed: 0,
            sprite: Sprite.EMPTY,
            x: p.x,
            y: p.y
          }).extend({
            before: {
              hit: function(other) {
                if(other.bite) {
                  other.bite();
                }

                if(other.nutrify) {
                  other.nutrify(self);
                }
              }
            }
          }));
        }
      }
    }),
    cry: State({
      complete: function() {
        I.currentState = states.idle1;
      },
      duration: 16,
      model: cryModel,
      update: function() {
        I.xVelocity = 0;
      }
    }),
    fly: State({
      model: flyModel
    }),
    flyBite: State({
      complete: function() {
        I.currentState = states.fly;
      },
      duration: 15,
      model: flyBiteModel,
      update: function() {
        var bitePoint = states.flyBite.model().attachment("bite");
        if(bitePoint) {
          var t = self.getTransform();
          var p = t.transformPoint(bitePoint);

          addGameObject(Bullet({
            collideDamage: 10,
            damageType: "bite",
            dispersion: 30,
            effectCount: 5,
            duration: 1,
            radius: 30,
            speed: 0,
            sprite: Sprite.EMPTY,
            x: p.x,
            y: p.y
          }).extend({
            before: {
              hit: function(other) {
                if(other.bite) {
                  other.bite();
                }

                if(other.nutrify) {
                  other.nutrify(self);
                }
              }
            }
          }));
        }
      }
    }),
    idle1: State({
      model: idle1Model,
      update: function() {
        if (Math.random() < 0.01) {
          I.currentState = states.idle2;
        }
      }
    }),
    idle2: State({
      complete: function() {
        I.currentState = states.idle1;
      },
      duration: 36,
      model: idle2Model
    }),
    walk: State({
      model: walkModel,
      update: function() {
        if (I.xVelocity > WALK_VELOCITY) {
          I.xVelocity = (I.xVelocity - 0.2).clamp(WALK_VELOCITY, I.xVelocity);
        }
      }
    })
  };

  states.bite.allowedTransitions = [states.idle1, states.walk, states.cry];
  states.fly.allowedTransitions = [states.flyBite, states.cry, states.idle1, states.walk];
  states.flyBite.allowedTransitions = [states.fly, states.idle1, states.walk];
  states.idle1.allowedTransitions = [states.bite, states.fly, states.idle1, states.idle2, states.walk];
  states.idle2.allowedTransitions = [states.bite, states.fly, states.idle1, states.walk];
  states.walk.allowedTransitions = [states.bite, states.fly, states.idle1];

  var timeTravelling = false;
  var timeTravel = TimeTravel();

  var healthMax = 500;

  $.reverseMerge(I, {
    collideDamage: 2,
    collisionType: "dino",
    currentState: states.idle1,
    health: healthMax,
    loadedWeapons: [],
    poisoned: false,
    radius: 72,
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT - Floor.LEVEL,
    xVelocity: 0,
    yVelocity: 6
  });

  var accessories = [];

  var lastDirection = 1;

  function nextWeapon() {
    var selectedIndex = weapons.indexOf(selectedWeapon);

    var selectablesBefore = [];
    var selectablesAfter = [];

    $.each(weapons, function(index, weapon) {
      if(weapon.selectable()) {
        if(index < selectedIndex) {
          selectablesBefore.push(index);
        } else if(index > selectedIndex) {
          selectablesAfter.push(index);
        }
      }
    });

    if(selectablesAfter.length > 0) {
      selectedWeapon = weapons[Math.min.apply(null, selectablesAfter)];
    } else if(selectablesBefore.length > 0) {
      selectedWeapon = weapons[Math.min.apply(null, selectablesBefore)];
    }
  }

  function prevWeapon() {
    var selectedIndex = weapons.indexOf(selectedWeapon);

    var selectablesBefore = [];
    var selectablesAfter = [];

    $.each(weapons, function(index, weapon) {
      if(weapon.selectable()) {
        if(index < selectedIndex) {
          selectablesBefore.push(index);
        } else if(index > selectedIndex) {
          selectablesAfter.push(index);
        }
      }
    });

    if(selectablesBefore.length > 0) {
      selectedWeapon = weapons[Math.max.apply(null, selectablesBefore)];
    } else if(selectablesAfter.length > 0) {
      selectedWeapon = weapons[Math.max.apply(null, selectablesAfter)];
    }
  }

  function heal(amount) {
    I.health = (I.health + amount).clamp(0, healthMax);
  }

  function toss() {
    var tossed = false;
    secondaryShooting = false;

    $.each(weapons, function(i, weapon) {
      if(tossed) {
        return;
      }

      tossed = tossed || weapon.toss();
    });
  }

  function updateWeapons(levelPosition) {
    var activeWeapons = [];
    $.each(weapons, function(i, weapon) {
      if(!weapon.selectable() || weapon == selectedWeapon) {
        weapon.update(self, levelPosition);
      }

      if(weapon.active()) {
        activeWeapons.push(weapon);
      }
    });

    weapons = activeWeapons;
  }

  var self = GameObject(I).extend({
    addAccessory: function(accessory) {
      accessories.push(accessory);
    },

    addJetpack: function() {
      if(!jetpack) {
        jetpack = Jetpack({
          keyDown: keyDown
        });

        self.addWeapon(jetpack);
      }
    },

    addMoney: function(amount) {
      money += amount;
    },

    addWeapon: function(weapon) {
      if(weapon == "jetpack") {
        self.addJetpack();
      } else {
        weapons.push(weapon);

        if(weapon.selectable()) {
          selectedWeapon = weapon;
        }
      }

      Sound.play("reload");

      showCrosshair = true;
    },

    airborne: function(value) {
      if (value !== undefined) {
        airborne = value;
      } else {
        return airborne;
      }
    },

    bite: function() {
      if (airborne) {
        I.currentState = states.flyBite;
      } else {
        I.currentState = states.bite;
        I.xVelocity = 0;
      }
    },

    boss: function(value) {
      if (value !== undefined) {
        boss = value;

        if (boss) {
          boss.healthBar()
          $("#boss").show();
        } else {
          $("#boss").hide();
        }
        return self;
      } else {
        return boss;
      }
    },

    bulletHitEffect: Enemy.bloodSprayEffect,

    components: function() {
      return weapons;
    },

    currentState: function() {
      return I.currentState;
    },

    getTransform: function() {
      var transform;

      if (parasailing || I.xVelocity > 0 || lastDirection > 0) {
        var rotationAngle = jetpackAngle;
        if(parasailing) {
          rotationAngle = rotationAngle + Math.PI / 24;
        }

        if (airborne) {
          transform = Matrix.rotation(rotationAngle).concat(Matrix.IDENTITY);
        } else {
          transform = Matrix.IDENTITY;
        }
      } else {
        if (airborne) {
          transform = Matrix.rotation(jetpackAngle).concat(Matrix.HORIZONTAL_FLIP);
        } else {
          transform = Matrix.HORIZONTAL_FLIP;
        }
      }

      return transform.translate(I.x, I.y);
    },

    hasJetpack: function() {
      return jetpack;
    },

    healthMax: function() {
      return healthMax;
    },

    hit: function(other) {
      I.health = I.health - other.collideDamage();

      if (I.health <= 0) {
        self.destroy();
        addScore(I.pointsWorth);
        continueGame();
      }
    },

    heal: heal,

    jetpackAngle: function(value) {
      if (value !== undefined) {
        jetpackAngle = value;
        return self;
      } else {
        return jetpackAngle;
      }
    },

    jetpackOn: function(value) {
      if (value !== undefined) {
        jetpackOn = value;
        return self;
      } else {
        return jetpackOn;
      }
    },

    land: function(h) {
      if (airborne) {
        I.y = h - (I.radius + 1);
        I.yVelocity = 0;
        airborne = false;
        jetpackOn = false;
        jetpackAngle = 0;
        if (I.xVelocity != 0 && (keyDown.left || keyDown.right)) {
          self.transition(states.walk);
        } else {
          I.xVelocity = 0;
          self.transition(states.idle1);
        }
      }
    },

    nextWeapon: nextWeapon,

    parasailing: function(newValue) {
      if(newValue != undefined) {
        parasailing = newValue;
        if(parasailing) {
          I.x = (CANVAS_WIDTH - width) / 2 - 100;
          I.y = 200;
          airborne = true;
          I.currentState = states.fly;
        }
        return self;
      } else {
        return parasailing;
      }
    },

    skyBattle: function() {
      I.x = (CANVAS_WIDTH - width) / 2 - 100;
      I.y = 400;
      airborne = true;
      I.currentState = states.fly;

      I.yVelocity = -15;
      I.xVelocity = 5;

      self.addJetpack();
    },

    sink: $.noop,

    poison: function(amount) {
      self.transition(states.cry);
    },

    prevWeapon: prevWeapon,

    states: function() {
      return states;
    },

    timeTravel: function(val) {
      timeTravelling = val;
    },

    toss: toss,

    weaponNames: function() {
      return weapons.map(function(weapon) {
        return weapon.name();
      });
    },

    xVelocity: function(value) {
      if(value !== undefined) {
        I.xVelocity = value;
        return I.xVelocity;
      } else {
        return I.xVelocity;
      }
    },

    yVelocity: function(value) {
      if(value !== undefined) {
        I.yVelocity = value;
        return I.yVelocity;
      } else {
        return I.yVelocity;
      }
    },
    before: {
      update: function() {
        if(timeTravelling) {
          timeTravel.update();
        }

        if(I.xVelocity != 0) {
          lastDirection = I.xVelocity;
        }

        currentHealth = I.health;
      }
    },
    after: {
      update: function(levelPosition) {
        // Keyboard aiming
        if(keyDown.aimClockwise) {
          targetAngle += Math.PI / 36;
        }
        if(keyDown.aimAntiClockwise) {
          targetAngle -= Math.PI / 36;
        }

        // Flight velocities
        if(parasailing) {
          I.yVelocity = 0;
          I.xVelocity = 4;

          if(keyDown.down) {
            I.y += 6;
          }
          if(keyDown.up) {
            I.y -= 6;
          }
          if(keyDown.left) {
            I.xVelocity = 0;
          }
          if(keyDown.right) {
            I.xVelocity = 10;
          }

        } else if(airborne && !jetpackOn) {
          I.yVelocity += GRAVITY * 3;
        } else if(airborne && jetpackOn) {
          I.yVelocity += GRAVITY / 2;
        }

        if (parasailing) {
          I.y = I.y.clamp(30, CANVAS_HEIGHT - Floor.LEVEL);
        } else {
          I.y = I.y.clamp(levelPosition.y + 30, levelPosition.y + CANVAS_HEIGHT);
        }

        updateWeapons(levelPosition);

        // Stay in screen
        if (I.x < levelPosition.x + I.radius) {
          I.x = levelPosition.x + I.radius;
          I.xVelocity = Math.abs(I.xVelocity);
        } else if (I.x > levelPosition.x + CANVAS_WIDTH - I.radius) {
          I.x = levelPosition.x + CANVAS_WIDTH - I.radius;
          I.xVelocity = -Math.abs(I.xVelocity);
        }
      }
    }
  });

  var tophat = Accessory({
    attachment: "hat",
    sprite: Sprite.load("images/accessories/tophat.png")
  });

  if(false) {
    self.addAccessory(tophat);
  }

  I.loadedWeapons.each(function(weaponName) {
    self.addWeapon(weaponMap[weaponName]());
  });

  Control(self, keyDown);
  self.extend(Stateful(I));

  self.draw = function(canvas) {

    canvas.withTransform(self.getTransform(), function() {
      if(parasailing) {
        parasailTile.draw(canvas, -150, -170);
      }

      I.currentState.draw(canvas);

      if(timeTravelling) {
        canvas.withTransform(Matrix.scale(8, 8), function() {
          timeTravel.draw(canvas, -I.currentState.sprite().width/16 - 5, -I.currentState.sprite().height/16 - 10);
        });
      }

      $.each(accessories, function(i, accessory) {
        accessory.attachment(I.currentState.model());
        accessory.draw(canvas);
      });

      $.each(weapons, function(i, weapon) {
        if(!weapon.selectable() || weapon == selectedWeapon) {
          weapon.attachment(I.currentState.model());
          weapon.draw(canvas);
        }
      });
    });

    if (GameObject.DEBUG_HIT) {
      self.drawHitCircles(canvas);
    }
  };

  return self;
}
function Floor(I) {
  I = I || {};
  var height = Floor.LEVEL; // Rule of thirds

  $.reverseMerge(I, {
    x: 0,
    y: CANVAS_HEIGHT - height,
    width: CANVAS_WIDTH,
    height: height,
    color: "#0F0",
    collideDamage: 0,
    collisionType: "platform",
    water: false,
    sprite: Sprite.load("images/levels/ground.png")
  });

  var self = GameObject(I).extend({
    bulletHitEffect: function(bullet) {
      if(!I.water) {

        var sprite;
        sprite = loadAnimation("images/effects/dirtEffect1_8x8.png", 8, 8, 8);

        var effect = Effect($.extend(bullet.position(), {
          duration: 8,
          sprite: sprite,
          velocity: Point()
        }));

        addGameObject(effect);
      }
    },
    draw: function(canvas) {
      if (I.sprite) {
        I.sprite.draw(canvas, I.x, I.y);
      }
    },
    hit: function(other) {
      if(I.water) {
        if(other.sink) {
          other.sink(self);
        }
      } else {
        if(other.land) {
          other.land(I.y);
        }
      }
    },
    y: I.y
  });

  return self;
}

Floor.LEVEL = 160;
function GameObject(I) {
  I = I || {};

  $.reverseMerge(I, {
    active: true,
    age: 0,
    collideDamage: 0,
    collisionType: "none",
    color: "#880",
    duration: -1,
    health: 1,
    height: 10,
    pointsWorth: 0,
    radius: 5,
    type: '',
    width: 10,
    x: 0,
    xVelocity: 0,
    y: 0,
    yVelocity: 0
  });

  function move() {
    I.x += I.xVelocity;
    I.y += I.yVelocity;
  }

  var self = Core(I).extend({
    active: function(newActive) {
      if(newActive != undefined) {
        I.active = newActive;
        return this;
      } else {
        return I.active;
      }
    },

    collideDamage: function() { return I.collideDamage },

    collisionType: function() {
      return I.collisionType;
    },

    components: function() {
      return [];
    },

    destroy: function() {
      if (I.active) {
        I.active = false;
        self.trigger('destroy');
      }
    },

    draw: function(canvas) {
      canvas.withTransform(self.getTransform(), function() {
        if (I.sprite) {
          I.sprite.draw(canvas, -I.sprite.width/2, -I.sprite.height/2);
        } else {
          canvas.fillColor(I.color);
          canvas.fillRect(-I.width/2, -I.height/2, I.width, I.height);
        }
      });

      if (GameObject.DEBUG_HIT) {
        self.drawHitCircles(canvas);
      }
    },

    drawHitCircles: function(canvas) {
      $.each(self.getCircles(), function(i, circle) {
        canvas.fillCircle(circle.x, circle.y, circle.radius, GameObject.circleColor(I.collisionType));
      });
    },

    getCircles: function() {
      var componentCircles = $.map(self.components(), function(component) {
        var transform = component.getTransform();
        return $.map(component.getCircles(), function(circle) {
          var point = transform.transformPoint(component.position());
          return {
            radius: circle.radius,
            x: point.x,
            y: point.y,
            component: component
          };
        });
      });

      var objectCircles;

      if(I.hitCircles) {
        objectCircles = I.hitCircles;
      } else {
        objectCircles = [{
          radius: I.radius,
          x: 0,
          y: 0,
          component: self
        }];
      }

      var circles = componentCircles.concat(objectCircles);

      var transform = self.getTransform();
      return $.map(circles, function(circle) {
        var point = transform.transformPoint(circle);
        return {
          x: point.x,
          y: point.y,
          radius: circle.radius,
          component: circle.component || self
        };
      });
    },

    getTransform: function() {
      return Matrix.translation(I.x, I.y);
    },

    hit: $.noop,

    midpoint: function() {
      return {
        x: I.x,
        y: I.y
      }
    },

    // TODO: Encapsulate these better
    pointsWorth: function() { return I.pointsWorth },

    position: function(newPoint) {
      if (newPoint !== undefined) {
        I.x = newPoint.x;
        I.y = newPoint.y;
        return self;
      } else {
        return Point(I.x, I.y);
      }
    },

    sink: function(water) {
      self.active(false);

      var effect = Effect($.extend(self.position(), {
        duration: 8,
        sprite: loadAnimation("images/effects/waterEffect_16x16.png", 12, 16, 16),
        velocity: Point()
      }));

      addGameObject(effect);
    },

    update: function() {
      I.age++;
      move();

      if(I.sprite) {
        I.sprite.update();
      }

      if(I.duration != -1 && I.age > I.duration) {
        I.active = false;
      }
    },

    velocity: function() {
      return {
        x: I.xVelocity,
        y: I.yVelocity
      }
    }
  });

  self.attrAccessor('health', 'sprite');
  self.attrReader('age');

  self.extend(Bindable());

  return self;
}

GameObject.DEBUG_HIT = false;
GameObject.generateCheckBounds = function(I, buffer) {
  buffer = buffer || I.buffer || 0;
  return function(position) {
    var xMax = position.x + CANVAS_WIDTH;
    var yMax = position.y + CANVAS_HEIGHT;
    // Check Bounds
    if (
      I.x + buffer < position.x - I.radius ||
      I.x - buffer > xMax + I.radius ||
      I.y + buffer + 100 < position.y - I.radius ||
      I.y - buffer > yMax + I.radius
    ) {
      I.active = false;
    }

    return I.active;
  };
};

GameObject.velocityGetTransform = function(I) {
  return function() {
    return Matrix.rotation(Math.atan2(I.yVelocity, I.xVelocity)).translate(I.x, I.y);
  };
};

GameObject.rotationGetTransform = function(I) {
  return function() {
    var t = Matrix.rotation(I.rotation).translate(I.x, I.y);

    if(I.hFlip) {
      t = t.concat(Matrix.HORIZONTAL_FLIP);
    }

    return t;
  };
};

GameObject.circleColor = function(collisionType) {
  if(collisionType == "enemy" || collisionType == "dino") {
    return "rgba(255, 0, 0, 0.5)";
  } else if(collisionType == "enemyBullet" || collisionType == "dinoBullet") {
    return "rgba(0, 255, 0, 0.5)";
  } else {
    return "rgba(255, 255, 0, 0.5)";
  }
}
var score = 0;
var money = 1000;
var canvas;
var dino;
var healthBar;

Array.prototype.unique = function () {
  var r = new Array();
  o:for(var i = 0, n = this.length; i < n; i++)
  {
    for(var x = 0, y = r.length; x < y; x++)
    {
      if(r[x]==this[i])
      {
        continue o;
      }
    }
    r[r.length] = this[i];
  }
  return r;
}

var pauseDisplay = {
  draw: function(canvas) {
    canvas.fill("rgba(0, 0, 0, 0.66)");
    canvas.fillColor("#FFF");
    canvas.centerText("PAUSED", 180);
  }
};
var debugHalt = false;
var currentLevel;
var displayTexts = [];
var stages = [];

var highScores = [];
var cookieScores = [];

var weapons = [];

var weaponMap = {
  "battleAxe": BattleAxe,
  "missileLauncher": MissileLauncher,
  "chainsaw": Chainsaw,
  "flamethrower": Flamethrower,
  "jetpack": function() { return "jetpack"; },
  "laserGun": LaserGun,
  "machineGun": MachineGun,
  "meat": Meat
};

$.each(weaponMap, function(name) {
  weapons.push(name);
});

var target;
var targetAngle = 0;
var crosshair;
var showCrosshair = false;
var keyboardAiming = false;

var gameOver = false;
var currentStage = -1;

function addScore(points) {
  score += points;
}

function updateTarget() {
  if(keyboardAiming) {
    var deltaPoint = Point(Math.cos(targetAngle) * 150, Math.sin(targetAngle) * 150);
    var localDinoPosition = Point().add(dino.position()).subtract(currentLevel.position());
    target = localDinoPosition.add(deltaPoint);
  }
}

function drawOverlay() {
  var activeTexts = [];
  $.each(displayTexts, function(i, displayText) {
    //TODO: Move update out of draw
    displayText.update();

    if(displayText.active()) {
      displayText.draw(canvas);
      activeTexts.push(displayText);
    }
  });
  displayTexts = activeTexts;

  healthBar.value(dino.health());

  if(showCrosshair) {
    crosshair.draw(canvas, target.x - crosshair.width/2, target.y - crosshair.height/2);
  }

  // Score display
  $("#score").text(score);
  $("#money .amount").text(money);
}

var payStage = 7;
var loggedIn = false;
var hasPaid = true;

function checkPayStatus() {
  if(hasPaid) {
    currentLevel = stages[currentStage];
    stages[currentStage].start(canvas);
  } else {
    $("#purchase_prompt").show();
    _gaq.push(['_trackEvent', 'purchase', "Purchase Prompt"]);
  }
}

function nextStage(choice) {
  if(choice !== undefined) {
    if(currentLevel && currentLevel.stop) {
      currentLevel.stop();
    }

    currentStage = choice;
    currentLevel = stages[currentStage];
    stages[currentStage].start(canvas);
  } else {
    if(!gameOver) {
      currentStage++;

      saveGame();

      if(currentStage == payStage) {
        checkPayStatus();
      } else if(currentStage >= stages.length) {
        endGame();
        alert("You Win!");
      } else {
        currentLevel = stages[currentStage];
        stages[currentStage].start(canvas);
      }
    } else {
      // Game Over
    }
  }
}

function endGame() {
  clearSavedGame();

  if (readCookie("highScore")) {
    cookieScores = (readCookie("highScore").split(",")).unique();
  }

  cookieScores.push(score);
  createCookie("highScore", cookieScores.join(","));

  highScores = $.map(cookieScores, function(cookie) {
    return [[parseInt(cookie), "You"]];
  });

  highScores = highScores.concat([[100000, "Zuch"], [200000, "Dr. Werewolf"], [300000, "Condor"]]);

  gameOver = true;
  currentLevel.stop();
}

function endGameDisplay() {
  endGame();

  var leaderDisplay = {
    draw: function(canvas) {
      highScores.sort(function(a, b) {return a[0] - b[0]});
      highScores.reverse();

      canvas.fill("rgba(0, 0, 0, 0.66)");
      canvas.fillColor("#FFF");
      canvas.centerText("ALL TIME LEADERS:", 200);
      canvas.centerText(highScores[0][1] + ": " + highScores[0][0], 230);
      canvas.centerText(highScores[1][1] + ": " + highScores[1][0], 260);
      canvas.centerText(highScores[2][1] + ": " + highScores[2][0], 290);
    }
  };

  leaderDisplay.draw(canvas);
}

function continueGame() {
  currentLevel.continuePause();
  $('#continue').show();
  $("#game_container").css("cursor", "default");
  dino.active(true);
}

function overlayUpdate(){
  drawOverlay();
}

function addLevel(I) {
  var level = Level($.extend({
    canvas: canvas,
    completed: nextStage
  }, I));

  level.bind("afterStep", overlayUpdate);
  level.addGameObject(dino);

  stages.push(level);

  return level;
}

function addCutscene(image, text, duration, avatar) {
  stages.push(Cutscene(image, text, duration, avatar, nextStage));
}

function addGameObject(gameObject) {
  if(currentLevel.addGameObject) {
    currentLevel.addGameObject(gameObject);
  }
}

function display(text) {
  displayTexts.push(GameText(text, dino.position()));
}

function createCookie(name, value, days) {
  var expires;
  var cookie;

  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }

  cookie = name + "=" + value + expires + "; path=/";

  return document.cookie = cookie;
}

function readCookie(name) {
  var nameEquals = name + "=";
  var cookies = document.cookie.replace(/\s/g, "").split(';');
  var result;

  $.each(cookies, function(i, cookie) {
    if (cookie.indexOf(nameEquals) == 0) {
      result = cookie.substring(nameEquals.length, cookie.length);
    }
  });

  return result;
}

function eraseCookie(name) {
  createCookie(name, "", -1);
}

function addHighScore(score, player) {
  return highScores.push([parseInt(score), player]);
}

function saveGame() {
  localStorage.setItem("savedGame", JSON.stringify({
    level: currentStage,
    score: score,
    health: dino.health(),
    weapons: dino.weaponNames(),
    timestamp: new Date().getTime()
  }));
}

function loadSavedGameData() {
  var savedData = localStorage.getItem("savedGame");

  if(savedData) {
    savedData = JSON.parse(savedData);
    // Save game lasts for 15 min, just so player can authorize/purchase
    if(new Date().getTime() - savedData.timestamp > 1000 * 60 * 15) {
      clearSavedGame();
    } else {
      return savedData;
    }
  }

  return undefined;
}

function clearSavedGame() {
  localStorage.removeItem("savedGame");
}

savedGameData = loadSavedGameData();

$(function() {
  if(savedGameData) {
    dino = Dinosaur({
      health: savedGameData.health,
      loadedWeapons: savedGameData.weapons
    });

    score = savedGameData.score || 0;
  } else {
    dino = Dinosaur();
  }

  healthBar = ProgressBar({
    colorMap: healthColorMap,
    max: dino.healthMax(),
    value: dino.health()
  });

  target = Point();
  crosshair = Sprite.load("images/crosshair.png");

  $(document).bind('keydown', "0", function() {
    if(DEVELOPMENT) {
      GameObject.DEBUG_HIT = !GameObject.DEBUG_HIT;
    }
  });

  $(document).bind('keydown', "esc p", function() {
    if(currentLevel.togglePause()) {
      pauseDisplay.draw(canvas);
      $("#level_objectives").show();
    } else {
      $("#level_objectives").hide();
    }
  });

  // Level select
  $(document).keydown(function(e) {
    if(DEVELOPMENT && e.keyCode >= 49 && e.keyCode <= 57) {
      nextStage(e.keyCode - 48);
    }
  });

  $("#game_container").bind("mousemove", function(event) {
    keyboardAiming = false;
    var offset = $(this).offset();

    var localY = event.pageY - offset.top;
    var localX = event.pageX - offset.left;

    target = Point(localX, localY);
  });

  $(document).bind("contextmenu", function(event) {
    event.preventDefault();
  });
});
/**
 * A Model is an animation and the list of hit circles that go with each frame.
 *
 * It includes a convenient update method to keep the hitFrame and current
 * animation frame in sync.
 */
function Model(animation, frames, hitFrames) {
  var warnings = false;

  return {
    animation: animation,
    draw: function(canvas) {
      animation.draw(canvas, -animation.width/2, -animation.height/2);
    },
    frames: frames,
    /**
     * Returns the array of circles representing the current hit frame.
     */
    hitFrame: function() {
      var curFrame = frames[animation.frame()];

      if(curFrame) {
        return curFrame.circles;
      } else {
        return [];
      }
    },

    hitFrames: hitFrames,

    attachment: function(name) {
      var currentFrame = frames[animation.frame()];
      if(currentFrame && currentFrame.attachmentPoints) {
        if(currentFrame.attachmentPoints[name]) {
          return currentFrame.attachmentPoints[name];
        } else {
          if(warnings) {
            warning("no attachment point for " + name + " in " + this.url);
          }
          
          return undefined;
        }
      } else {
        if(warnings) {
          warning("no attachment points for " + this.url);
        }

        return undefined;
      }

    },

    update: function() {
      animation.update();
    }
  }
}

/**
 * Loads a model from the JSON data at a specified URL.
 */
Model.loadJSONUrl = function(url, callback) {
  var proxy = {
    attachment: $.noop,
    draw: $.noop,
    hitFrame: function() {
      return [];
    },
    hitFrames: $.noop,
    update: $.noop,
    url: url
  };

  var animCallback = function(animation, animationData) {
    if(callback) {
      callback(proxy, animationData)
    }
  };

  $.getJSON(url, function(data) {
    var model = Model(Animation.loadJSON(data.animation, null, animCallback), data.frames, data.hitFrames);

    $.extend(proxy, model);

    if(data.animation.destinationOffset) {
      $.each(proxy.frames, function(i, frame) {
        $.each(frame.circles, function(j, circle) {
          circle.x += data.animation.destinationOffset.x;
          circle.y += data.animation.destinationOffset.y;
        });

        $.each(frame.attachmentPoints, function(key, point) {
          point.x += data.animation.destinationOffset.x;
          point.y += data.animation.destinationOffset.y;
        });
      });
    }
  });

  return proxy;
};
function Plasma(element) {
  var p1 = 0,
      p2 = 0,
      p3 = 0,
      p4 = 0,
      t1, t2, t3, t4,
      aSin = [],
      timeout = 1,
      canvas = element.getContext('2d'),
      canvasImageData = canvas.createImageData(element.width, element.height),
      index,
      as = 2.6, fd = 0.4, as1 = 4.4, fd1 = 2.2, ps = -4.4, ps2 = 3.3;


  function init() {
    var i = 512, rad;
    while (i--) {
      rad = (i * 0.703125) * 0.0174532;
      aSin[i] = Math.sin(rad) * 1024;
    }
  }

  function main() {
    init();
    draw();
  }

  function rand(va) {
    return Math.random(va);
  }

  document.onclick = function(){
    as = rand(300)*5;
    fd = rand(300)*10;
    as1 = rand(200)*50;
    fd2 = rand(300)*50;
    ps = (rand(200)*20)-10;
    ps2 = (rand(200)*40)-20;
  };

  function draw() {
    var i, j, x;

    var data = canvasImageData.data;

    t4 = p4;
    t3 = p3;

    i = 320; while(i--) {
      t1 = p1 + 5;
      t2 = p2 + 3;

      t3 &= 511;
      t4 &= 511;

      j = 240; while(j--) {
        t1 &= 511;
        t2 &= 511;

        x = aSin[t1] + aSin[t2] + aSin[t3] + aSin[t4];

        index = (i + j * element.width) * 4;

        data[index + 0] = x/as;
        data[index + 1] = x/fd;
        data[index + 2] = x/ps;
        data[index + 3] = 255;

        t1 += 5;
        t2 += 3;
      }

      t4 += as1;
      t3 += fd1;

    }

    canvasImageData.data = data;

    canvas.putImageData(canvasImageData, 0, 0);

    p1 += ps;
    p3 += ps2;



    setTimeout ( draw, timeout);
  }
  main();
}

function TimeTravel() {
  var c = $("<canvas />").get(0);
  var size = c.width = c.height = 50;
  var context = c.getContext("2d");
  context.globalCompositeOperation = "destination-in";
  var imageData = context.createImageData(size, size);
  var source = Point(size/2, size/2);
  var t = 0;
  var phases = 3;
  var phase = 0;
  var movement = 1;

  return {
    update: function() {
      var j = size; while(j--) {
        var i = size + phase; while((i-=phases) >= 0) {
          var index = (i + j * size) * 4;

          var dx = i - source.x;
          var dy = j - source.y;

          var d = Math.sqrt(dx*dx + dy*dy);

          var d2sine = Math.sin((d + t)/8);

          var alpha = 255;

          if(d > 19) {
            alpha = ((24 - d)/5*255).clamp(0, 255);
          }

          imageData.data[index + 0] = (d2sine * 255).clamp(0, 255);
          imageData.data[index + 1] = (125 + d2sine * 80).clamp(0, 255);
          imageData.data[index + 2] = (235 + d2sine * 20).clamp(0, 255);
          imageData.data[index + 3] = alpha;
        }
      }

      context.putImageData(imageData, 0, 0);

      t -= 1;
      source.x = size/2 + movement*Math.cos(t/20);
      source.y = size/2 + movement*Math.sin(t/20);
      phase = (phase + 1) % phases;
    },

    draw: function(canvas, x, y) {
      canvas.drawImage(c, 0, 0, size, size, x, y, size, size);
    },

    frame: function(newFrame) {
      if(newFrame !== undefined) {
        return this;
      } else {
        return 0;
      }
    },

    frameCount: function() {
      return 1;
    },

    width: size,
    height: size
  };
}

var Sound = (function($) {
  // TODO: detecting audio with canPlay is f***ed
  // Hopefully get more robust later
  // audio.canPlayType("audio/ogg") === "maybe" WTF?
  // http://ajaxian.com/archives/the-doctor-subscribes-html-5-audio-cross-browser-support
  var format = $.browser.webkit ? ".mp3" : ".wav";

  var soundChannels = [];
  var maxChannels = 4;

  maxChannels.times(function() {
    soundChannels.push(new Audio());
  });

  function nameToFile(name) {
    return "sounds/" + name + format;
  }

  var availableToPlay = function(sound) {
    return sound.currentTime == sound.duration || sound.currentTime == 0;
  };

  function Sound(name, maxChannels) {
    return {
      play: function() {
        Sound.play(name, maxChannels);
      }
    }
  }

  return $.extend(Sound, {
    play: function(name, maxChannels) {
      maxChannels = maxChannels || 2;

      var file = nameToFile(name);

      var splitChannels = soundChannels.partition(function(channel) {
        return channel.src.indexOf(file) != -1;
      });

      var sameSounds = splitChannels[0];

      var freeChannels = sameSounds.select(availableToPlay);

      // Don't play if sound is already playing on max # of channels
      if(sameSounds.length - freeChannels.length >= maxChannels) {
        return;
      }

      if(freeChannels[0]) {
        // Recycle an existing channel that has finished.
        freeChannels[0].play();
        return;
      }
      
      if(sameSounds.length >= maxChannels) {
        // This sound is playing on it's maximum channels allowed.
        return;
      }

      var otherSounds = splitChannels[1];

      freeChannels = otherSounds.select(availableToPlay);

      if(freeChannels[0]) {
        // Provision an available channel
        freeChannels[0].src = file;
        freeChannels[0].load();
        freeChannels[0].play();
      }
    }
  });
}(jQuery));
function State(I) {
  I = I || {};

  $.reverseMerge(I, {
    age: 0,
    allowedTransitions: null,
    complete: $.noop,
    duration: 1,
    hitCircles: [],
    model: null,
    shootLogic: $.noop,
    sprite: Sprite.EMPTY,
    update: $.noop
  });

  var self = Core(I).extend({
    draw: function(canvas) {
      I.model.draw(canvas);
    },
    frame: function(newFrame) {
      return I.model.animation.frame(newFrame);
    },
    reset: function() {
      I.age = 0;
      I.model.animation.frame(0);
    },
    update: function(levelPosition) {
      I.model.update();
      I.sprite = I.model.animation;
      I.hitCircles = I.model.hitFrame();

      I.update(levelPosition);
      I.age++;

      if (I.age == I.duration) {
        self.trigger("complete");
      }
    }
  });

  self.attrAccessor('age', 'sprite');
  self.attrReader('hitCircles', 'model', 'shootLogic');

  self.extend(Bindable());

  self.bind("complete", function() {
    I.complete();
    I.age = 0;
  });

  return self;
}
function Stateful(I) {
  I = I || {};

  $.reverseMerge(I, {
    currentState: null
  });

  return {
    currentModel: function() {
      if(I.currentState) {
        return I.currentState.model();
      } else {
        return undefined;
      }
    },

    draw: function(canvas) {
      var self = this;

      canvas.withTransform(self.getTransform(), function() {
        I.currentState.draw(canvas);
      });

      if (GameObject.DEBUG_HIT) {
        self.drawHitCircles(canvas);
      }
    },

    getCircles: function() {
      var self = this;

      var componentCircles = $.map(self.components(), function(component) {
        var transform = component.getTransform();
        return $.map(component.getCircles(), function(circle) {
          var point = transform.transformPoint(component.position());
          return {
            radius: circle.radius,
            x: point.x,
            y: point.y,
            component: component
          };
        });
      });

      var objectCircles;

      if(I.currentState.hitCircles()) {
        objectCircles = I.currentState.hitCircles();
      } else {
        objectCircles = [{
          radius: I.radius,
          x: 0,
          y: 0,
          component: self
        }];
      }

      var circles = componentCircles.concat(objectCircles);

      var transform = self.getTransform();
      return $.map(circles, function(circle) {
        var point = transform.transformPoint(circle);
        return {
          x: point.x,
          y: point.y,
          radius: circle.radius,
          component: circle.component || self
        };
      });
    },
    transition: function(state) {
      if (I.currentState.allowedTransitions) {
        if (I.currentState.allowedTransitions.indexOf(state) > 0) {
          // TODO: Handle resetting inside the state class with more robust transitions
          I.currentState.reset();

          I.currentState = state;
          
          // TODO: Handle resetting inside the state class with more robust transitions
          I.currentState.reset();
        }
      }
    },
    before: {
      update: function(levelPosition) {
        I.currentState.update(levelPosition);
      }
    }
  };
}
function Effect(I) {
  I = I || {};

  $.reverseMerge(I, {
    duration: 33
  });

  if(I.rotation == undefined) {
    I.rotation = Math.atan2(I.velocity.y, I.velocity.x);
  }

  var self = GameObject(I).extend({
    getTransform: function() {
      var t;

      if(I.hFlip) {
        t =  Matrix.HORIZONTAL_FLIP;
      } else {
        t = Matrix.IDENTITY;
      }

      return t.rotate(I.rotation).translate(I.x, I.y);
    }
  });

  return self;
}
function EffectGenerator(I) {
  I = I || {};

  $.reverseMerge(I, {
    delay: 6,
    duration: 100,
    objectGenerator: function(I) {
      return Effect($.extend(I, {
        duration: I.spawnDuration,
        rotation: 0,
        sprite: loadAnimation("images/effects/small_explosion.png", 5, 44, 41, 2)
      }));
    },
    spawnDuration: 25
  });

  function spawnEffect() {
    var point = Circle(I.x, I.y, I.radius).randomPoint();

    addGameObject(I.objectGenerator(point));
  }

  var self = GameObject(I).extend({
    draw: function(canvas) {
      if (GameObject.DEBUG_HIT) {
        self.drawHitCircles(canvas);
      }
    },

    after: {
      update: function() {
        if(I.age % I.delay == 0)
        spawnEffect();
      }
    }
  });

  return self;
}
function Area51Agent(I) {
  I = I || {};

  var standModel = Model.loadJSONUrl("data/secret_service/stand.model.json");
  var runModel = Model.loadJSONUrl("data/secret_service/run.model.json");
  var bitInHalfModel = Model.loadJSONUrl("data/secret_service/bit_in_half.model.json");
  var deathModel = Model.loadJSONUrl("data/secret_service/death.model.json");
  var burningAnimation = Animation.load({
    url: "images/enemies/burning_man.png",
    frames: 20,
    width: 57,
    height: 89,
    delay: 3
  });

  var states = {
    run: State({
      duration: Infinity,
      model: runModel
    }),
    stand: State({
      complete: function() {
        I.currentState = states.run;
        I.xVelocity = 4;
      },
      duration: 60,
      model: standModel,
      update: function() {
        I.xVelocity = 0;
      }
    })
  };

  $.reverseMerge(I, {
    currentState: states.stand,
    nutrition: 50,
    type: 'area 51 agent',
    x: rand(CANVAS_WIDTH),
    y: CANVAS_HEIGHT - Floor.LEVEL - 20,
  });

  var self = Enemy(I).extend({});

  self.bind('destroy', function(self) {
    var deathAnimation;
    var xOffset = 0;
    var yOffset = 0;

    if(I.onFire) {
      deathAnimation = burningAnimation;
      yOffset = -13;
      xOffset = 2;
    } else if(I.bitInHalf) {
      deathAnimation = bitInHalfModel.animation;
      xOffset = 20;
    } else {
      Sound.play("die");
      deathAnimation = deathModel.animation;
    }

    var effectI = self.position();

    var effect = Effect($.extend(effectI, {
      //TODO: This -1 is probably symptomatic of a deeper error
      duration: deathAnimation.duration() - 1,
      hFlip: I.hFlip,
      sprite: deathAnimation,
      velocity: Point(0, 0),
      x: I.x + xOffset,
      y: I.y + yOffset
    }));

    addGameObject(effect);
  });

  self.extend(Biteable(I));
  self.extend(Burnable(I));
  self.extend(Chopable(I));
  self.extend(Stateful(I));

  return self;
}
function Biteable(I) {
  I = I || {};

  $.reverseMerge(I, {
    bitInHalf: false
  });

  return {
    bite: function() {
      I.bitInHalf = true;
      Sound.play("chomp", 1);
    },
  };
}
function Boat(I) {
  I = I || {};

  var boatModel = Model.loadJSONUrl("data/boat/boat.model.json", function(model) {
    I.sprite = model.animation;
  });

  $.reverseMerge(I, {
    collideDamage: 20,
    collisionType: "dinoBullet",
    damageType: "boat",
    health: Infinity,
    hitCircles: boatModel.hitFrames,
    onFire: false,
    sprite: boatModel.animation
  });

  var maxHealth = I.health;
  var jumping = false;
  var jumpImpulse = -10;

  var self = Enemy(I).extend({
    bounce: function (ramp) {
      if(I.yVelocity > 3) {
        ramp.crush();
      } else {
        jumping = true;

        I.yVelocity = jumpImpulse;
        I.y += I.yVelocity;
      }
    },

    bulletHitEffect: Enemy.sparkSprayEffect,

    getTransform: function() {
      var t;
      if(jumping) {
        t =  Matrix.rotation((Math.PI / 6) * I.yVelocity / -jumpImpulse);
      } else {
        t = Matrix.IDENTITY;
      }
      return t.translate(I.x, I.y);
    },

    sink: $.noop,

    before: {
      update: function(position) {
        // Oscillate
        I.x = position.x + boatTarget.x + 20 * Math.sin(I.age/20);

        if(jumping) {
          I.yVelocity += GRAVITY / 2;

          if(I.y >= boatTarget.y) {
            I.y = boatTarget.y;
            I.yVelocity = 0;
            jumping = false;
          }
        } else {
          I.y = position.y + boatTarget.y + 5 * Math.sin(I.age/13);
        }

        if((I.health < maxHealth / 2) && (Math.random() < 0.4)) {
          //Smoke/flame
          var smokePosition = Point(
            I.x - 80 - rand(20),
            I.y + 20
          );

          addGameObject(Effect($.extend(smokePosition.add(Circle(0, 0, 5).randomPoint()), {
            sprite: Sprite.load("images/effects/smoke.png"),
            velocity: Point(0, 0)
          })));
        }

        I.hitCircles = boatModel.hitFrame();
      }
    }
  });

  self.bind('destroy', function() {
    addGameObject(EffectGenerator($.extend(self.position(), {
      radius: 100
    })));

    var effectI = self.position();

    var effect = Effect($.extend(effectI, {
      duration: 150,
      rotation: - Math.PI / 2.25,
      sprite: boatModel.animation,
      velocity: Point(0, 0)
    })).extend({
      getTransform: GameObject.rotationGetTransform(effectI)
    });

    addGameObject(effect);
  });

  self.attrReader('damageType');

  var boatTarget = Point(I.x, I.y);

  return self;
}
function Bomber(I) {
  I = I || {};

  var bombs = 6;
  var cooldown = 0;

  function dropBomb() {
    cooldown += 10;
    bombs--;
    addGameObject(Bomb({
      xVelocity: I.xVelocity,
      x: self.position().x,
      y: self.position().y
    }));
  }

  $.reverseMerge(I, {
    checkBounds: GameObject.generateCheckBounds(I, 200),
    damageTable: {
      fire: 0,
    },
    health: 20,
    height: 44,
    pointsWorth: 5000,
    shootLogic: function() {
      if (cooldown > 0) {
        cooldown--;
      }
      // Shoot
      if (cooldown == 0 && I.age > 20 && bombs > 0) {
        dropBomb();
      }
    },
    type: 'bomber',
    radius: 22,
    width: 71,
    xVelocity: 5,
    yVelocity: 0
  });

  I.model = Model.loadJSONUrl("data/planes/" + I.type + ".model.json", function(model) {
    I.sprite = model.animation;
  });

  var self = Enemy(I).extend({
    bulletHitEffect: Enemy.sparkSprayEffect,

    after: {
      update: function() {
        I.hitCircles = I.model.hitFrame();
      }
    }
  });

  self.bind('destroy', function() {
    addGameObject(Grenade({
      collisionType: "dinoBullet",
      contactTrigger: false,
      rotationalVelocity: Math.random() * Math.PI / 12,
      sprite: I.sprite,
      x: I.x,
      xVelocity: I.xVelocity,
      y: I.y,
      yVelocity: 0
    }));
  });

  return self;
}
function Boss(I) {
  I = I || {};

  $.reverseMerge(I, {
    checkBounds: $.noop,
    type: 'boss'
  });

  var healthBar;

  var self = Enemy(I).extend({
    healthBar: function() {
      if(!healthBar) {
        healthBar = ProgressBar({
          colorMap: healthColorMap,
          element: $("#bossHealth"),
          max: self.health(),
          value: self.health()
        });
      }

      return healthBar;
    },

    sink: $.noop,

    after: {
      update: function() {
        if(healthBar) {
          healthBar.value(I.health);
        }
      }
    }
  });

  return self;
}function Brontosaurus(I) {
  I = I || {};

  $.reverseMerge(I, {
    health: 500,
    nutrition: 0,
    pointsWorth: 50000,
    radius: 90,
    shootLogic: function() {
      self.shootFrom("boom", {
        collideDamage: 15,
        duration: 1,
        radius: 100,
        // TODO: Shockwave sprite
        sprite: Sprite.EMPTY,
        velocity: 0
      });
    },
    xVelocity: 0,
    y: 170
  });

  var states = {
    angry: State({
      complete: function() {
        I.currentState = states.attack;
      },
      duration: 18,
      model: Model.loadJSONUrl("data/brontosaurus/angry.model.json"),
      update: function() {
        I.xVelocity = 0;
      }
    }),
    attack: State({
      complete: function() {
        I.currentState = states.stand;
      },
      duration: 48,
      model: Model.loadJSONUrl("data/brontosaurus/attack.model.json"),
      update: function() {
        I.xVelocity = 0;
      }
    }),
    stand: State({
      complete: function() {
        I.currentState = states.angry;
      },
      duration: 96,
      model: Model.loadJSONUrl("data/brontosaurus/stand.model.json"),
      update: function() {
        I.xVelocity = 0;
      }
    }),
    walk: State({
      complete: function() {
        I.currentState = states.stand;
      },
      duration: 54,
      model: Model.loadJSONUrl("data/brontosaurus/walk.model.json"),
      update: function() {
        I.xVelocity = -1;
      }
    })
  };

  I.currentState = states.walk;

  var self = Boss(I).extend({
    bulletHitEffect: Enemy.bloodSprayEffect,

    getTransform: function() {
      return Matrix.translation(I.x, I.y);
    }
  });

  self.extend(Biteable(I));
  self.extend(Stateful(I));

  var sadSprite = Sprite.load("images/enemies/brontosaurus/pain.png");

  self.bind('destroy', function() {
    addGameObject(EffectGenerator($.extend(self.position(), {
      radius: 100
    })));

    addGameObject(Effect($.extend(self.position(), {
      duration: 100,
      rotation: 0,
      sprite: sadSprite,
      velocity: Point(0, 0)
    })));
  });

  return self;
}
function Burnable(I) {
  return {
    burn: function(flame) {
      I.onFire = true;
    },

    after: {
      update: function() {
        if(I.onFire) {
          I.health--;

          if(Math.random() < 0.1) {
            //Smoke/flame
            addGameObject(Effect($.extend(Circle(I.x, I.y, I.radius || 10).randomPoint(), {
              sprite: Sprite.load("images/effects/smoke.png"),
              velocity: Point(0, 0)
            })));
          }
        }
      }
    }
  };
}
function Chopable(I) {
  I = I || {};

  $.reverseMerge(I, {
    bitInHalf: false
  });

  return {
    chop: function() {
      I.bitInHalf = true;
    },
  };
}
function Commando(I) {
  I = I || {};

  $.reverseMerge(I, {
    damageTable: {
      bite: 5,
    },
    health: 1000,
    nutrition: 1,
    pointsWorth: 100000,
    radius: 90,
    shootLogic: defaultShootLogic,
    xVelocity: 0,
    y: CANVAS_HEIGHT - Floor.LEVEL - 20
  });

  var states = {
    grenade: State({
      complete: function() {
        I.currentState = states.idle;
      },
      duration: 21,
      model: Model.loadJSONUrl("data/commando/commando_grenade.model.json"),
      update: function() {
        I.xVelocity = 0;
      }
    }),
    idle: State({
      complete: function() {
        I.currentState = states.idle;
      },
      duration: 15,
      model: Model.loadJSONUrl("data/commando/commando_idle.model.json"),
      update: function() {
        I.xVelocity = 0;
      }
    }),
    run: State({
      complete: function() {
        I.currentState = states.idle;
      },
      duration: 36,
      model: Model.loadJSONUrl("data/commando/commando_run.model.json")
    }),
    shoot: State({
      complete: function() {
        if (Math.random() < 0.4) {
          I.currentState = states.grenade;
          I.shootLogic = grenadeShootLogic
        } else {
          I.currentState = states.idle;
        }
      },
      duration: 33,
      model: Model.loadJSONUrl("data/commando/commando_shoot.model.json"),
      update: function() {
        I.xVelocity = 0;
      }
    })
  };

  I.currentState = states.idle;

  function distanceFromDino() {
    return self.position().x - dino.position().x;
  }

  function manageState() {
    var targetDistance = distanceFromDino();

    if (Math.abs(targetDistance) > 0 && Math.abs(targetDistance) < 180) {
      I.xVelocity = 13 * -targetDistance.sign();
      I.currentState = states.run;
    } else {
      if (I.currentState !== states.grenade) {
        I.currentState = states.shoot;
        I.shootLogic = defaultShootLogic;
      }
    }
  }

  function distanceFromDino() {
    return self.position().x - dino.position().x;
  }

  function manageState() {
    var targetDistance = distanceFromDino();

    if (Math.abs(targetDistance) > 0 && Math.abs(targetDistance) < 180) {
      I.xVelocity = 13 * -targetDistance.sign();
      I.currentState = states.run;
    } else {
      if (I.currentState !== states.grenade) {
        I.currentState = states.shoot;
        I.shootLogic = defaultShootLogic;
      }
    }
  }

  function defaultShootLogic() {
    self.shootFrom("shot", {
      sprite: Sprite.load("images/effects/enemybullet1_small.png")
    });
  }

  function grenadeShootLogic() {
    var grenadePoint = self.currentModel().attachment("grenade");

    if(I.currentState.age() % 3 == 0 && grenadePoint) {
      var t = self.getTransform();
      var direction = grenadePoint.direction;

      var p = t.transformPoint(grenadePoint);

      var tmpPoint = t.deltaTransformPoint(Point(Math.cos(direction), Math.sin(direction)));
      var theta = Point.direction(Point(0,0), tmpPoint);
      var rotationalVelocity = (Math.cos(theta) <= 0) ? -Math.PI / 32 : Math.PI / 32

      if (Math.random() < 0.1) {
        theta += Math.PI / 8;
      }

      if (Math.random() < 0.1) {
        theta -= Math.PI / 8;
      }

      var grenade = Grenade({
        collisionType: "enemyBullet",
        explosionDamage: 15,
        rotationalVelocity: rotationalVelocity,
        speed: 13,
        theta: theta,
        x: self.position().x,
        y: self.position().y - 30
      });

      var flare = Flare({
        rotationalVelocity: rotationalVelocity,
        speed: 13,
        theta: theta,
        x: self.position().x,
        y: self.position().y - 30
      });

      addGameObject([grenade, flare].rand());
    }
  }

  var self = Boss(I).extend({
    bulletHitEffect: Enemy.bloodSprayEffect,

    getTransform: function() {
      var t;
      if(I.xVelocity <= 0) {
        t = Matrix.HORIZONTAL_FLIP;
      } else {
        t = Matrix.IDENTITY;
      }

      if (I.currentState !== states.run) {
        if(self.position().x - dino.position().x >= 0) {
          t = Matrix.HORIZONTAL_FLIP;
        } else {
          t = Matrix.IDENTITY;
        }
      }

      return t.translate(I.x, I.y);
    },

    after: {
      update: function() {
        if (I.currentState !== states.run) {
          manageState();
        }
      }
    }
  });

  self.extend(Biteable(I));
  self.extend(Stateful(I));

  self.bind('destroy', function() {
    I.currentState = states.idle;

    addGameObject(EffectGenerator($.extend(self.position(), {
      radius: 20
    })));

    addGameObject(Effect($.extend(self.position(), {
      duration: 100,
      rotation: 0,
      sprite: I.currentState.sprite(),
      velocity: Point(0, 0)
    })));
  });

  return self;
}
function Crate(I) {
  I = I || {};

  var normalSprite = Sprite.load("images/enemies/crate/normal.png");
  var damagedSprite = Sprite.load("images/enemies/crate/damaged.png");

  $.reverseMerge(I, {
    checkBounds: $.noop,
    collideDamage: 0,
    damageTable: {
      fire: 0.25,
      boat: 0
    },
    health: 100,
    maxShakeAmplitude: 7,
    pointsWorth: 5000,
    radius: 34,
    sprite: normalSprite,
    type: 'crate',
    weaponClass: MissileLauncher,
    y: CANVAS_HEIGHT - Floor.LEVEL
  });

  var healthMax = I.health;

  var self = Enemy(I).extend({
    bulletHitEffect: Enemy.crateSmashEffect,

    before: {
      update: function() {
        if(I.health < healthMax / 2) {
          I.sprite = damagedSprite;
        }
      }
    }
  });

  self.extend(Shakeable(I));

  self.bind("destroy", function() {
    if(I.weaponClass) {
      dino.addWeapon(I.weaponClass());
    }
  });

  return self;
}
function Enemy(I) {
  I = I || {};

  $.reverseMerge(I, {
    checkBounds: GameObject.generateCheckBounds(I, 100),
    collideDamage: 1,
    collisionType: "enemy",
    damageTable: {},
    health: 3,
    nutrition: 0,
    onFire: false,
    pointsWorth: 1000,
    radius: 18,
    shootLogic: $.noop,
    type: '',
    x: rand(CANVAS_WIDTH),
    y: CANVAS_HEIGHT - Floor.LEVEL - 20,
  });

  var self = GameObject(I).extend({
    bulletHitEffect: Enemy.bloodSprayEffect,

    currentModel: function() {
      return I.model;
    },

    hit: function(other) {
      var damageFactor;

      if(other.damageType) {
        damageFactor = I.damageTable[other.damageType()]
      }

      if(damageFactor === undefined) {
        damageFactor = 1;
      }

      I.health = I.health - other.collideDamage() * damageFactor;

      if (I.health <= 0) {
        self.destroy();
        addScore(I.pointsWorth);
      }
    },

    land: $.noop,

    shoot: function(angle, bulletData) {
      var bullet = Bullet($.extend(bulletData, {
        collisionType: "enemyBullet",
        theta: angle
      }));

      addGameObject(bullet);
    },

    shootFrom: function (attachment, bulletData) {
      var shootPoint = self.currentModel().attachment(attachment);

      if(shootPoint) {
        var t = self.getTransform();
        var direction = shootPoint.direction;

        var p = t.transformPoint(shootPoint);

        var tmpPoint = t.deltaTransformPoint(Point(Math.cos(direction), Math.sin(direction)));
        var theta = Point.direction(Point(0,0), tmpPoint);

        addGameObject(Bullet($.extend({
          collisionType: "enemyBullet",
          theta: theta,
          x: p.x,
          y: p.y
        }, bulletData)));
      }
    },

    getTransform: function() {
      var t;
      if(I.xVelocity <= 0) {
        t = Matrix.HORIZONTAL_FLIP;
      } else {
        t = Matrix.IDENTITY;
      }
      return t.translate(I.x, I.y);
    },

    nutrify: function(other) {
      if (I.nutrition < 0) {
        other.poison();
      }
      other.heal(I.nutrition);
    },

    after: {
      update: function() {
        I.shootLogic();

        I.checkBounds.apply(self, arguments);
      }
    }
  });

  return self;
}

Enemy.bloodSprayEffect = function(bullet) {

  bullet.effectCount().times(function() {
    var point = bullet.position();
    var offset = Circle(0, 0, bullet.dispersion()).randomPoint();

    if(offset) {
      point = point.add(offset);
    }

    var effect = Effect($.extend(point, {
      duration: 10,
      sprite: [
        loadAnimation("images/effects/bloodEffect3_16x16.png", 9, 16, 16),
        loadAnimation("images/effects/bloodEffect2_8x8.png", 10, 8, 8),
        loadAnimation("images/effects/bloodEffect1_8x8.png", 8, 8, 8),
        loadAnimation("images/effects/bloodEffect4_16x16.png", 10, 16, 16)
      ].rand(),
      velocity: bullet.velocity()
    }));

    addGameObject(effect);
  });
};

Enemy.sparkSprayEffect = function(bullet) {
  Sound.play("ricochet" + (rand(4) + 2), 1);

  var effect = Effect($.extend(bullet.position(), {
    duration: 9,
    sprite: loadAnimation("images/effects/sparkEffect2_16x16.png", 7, 16, 16),
    velocity: bullet.velocity()
  }));

  addGameObject(effect);
};

Enemy.debrisSprayEffect = function(bullet) {
  var effect = Effect($.extend(bullet.position(), {
    duration: 9,
    sprite: loadAnimation("images/effects/vehicle_debris_32x32.png", 1, 32, 32),
    velocity: bullet.velocity()
  }));

  addGameObject(effect);
};

Enemy.crateSmashEffect = function(bullet) {
  Sound.play("crate_smash", 1);
};function Fighter(I) {
  I = I || {};

  var cooldown = 0;

  $.reverseMerge(I, {
    cooldown: 3,
    shootLogic: function() {
      if (cooldown > 0) {
        cooldown--;
      } else {
        cooldown += I.cooldown;

        self.shootFrom("shot", {
          speed: 15,
          sprite: Sprite.load("images/projectiles/plane_bullet.png")
        });
      }
    },
    type: 'fighter'
  });

  var self = Bomber(I).extend({

  });

  return self;
}
function FinalReagan(I) {
  I = I || {};

  var chargeModel = Model.loadJSONUrl("data/robo_reagan/charge.model.json");
  var energyBeamModel = Model.loadJSONUrl("data/robo_reagan/energy_beam.model.json");
  var hoverModel = Model.loadJSONUrl("data/robo_reagan/hover.model.json");

  var beamSprite = Sprite.load('images/projectiles/beam.png');
  var missileSprite = Sprite.load("images/projectiles/homing_missile_red.png");

  var xAmplitude = 100;
  var yAmplitude = 25;

  var maxDisplacementScale = 1;
  var displacementScale = 0;
  var displacementDelta = 0.025;

  var missilePos = 0;
  var stateChooser = 0;

  var ragingShootLogic = function() {
    self.shoot(
      Math.random() * (Math.PI), {
        buffer: 500,
        speed: 25,
        sprite: beamSprite,
        x: self.midpoint().x,
        y: self.midpoint().y
      }
    );
  };

  function approachTargetLocation(levelPosition, xMax, yMax) {
    var relativePoint = centralPoint.add(levelPosition);
    var currentScale = Math.min(maxDisplacementScale, displacementScale);

    var targetY = relativePoint.y + currentScale * yAmplitude * Math.cos(I.age / 13);

    if(targetY > I.y) {
      yMax += 7;
    }

    I.x = I.x.approach(relativePoint.x + currentScale * xAmplitude * Math.sin(I.age / 11), xMax);
    I.y = I.y.approach(targetY, yMax);
  }

  var states = {
    battle: State({
      model: hoverModel,
      update: function(position) {
        I.rotation = 0;

        if(displacementScale >= 2 && displacementDelta > 0) {
          displacementDelta = -displacementDelta;
        } else if(displacementScale <= 0 && displacementDelta < 0){
          displacementDelta = -displacementDelta;

          stateChooser = !stateChooser;

          if(stateChooser) {
            I.currentState = states.charge;
          } else {
            I.currentState = states.missileCharge;
          }
          I.shootLogic = $.noop;
        }

        displacementScale += displacementDelta;
        maxDisplacementScale = Math.min((6000 - I.health) / 1000, 2);

        approachTargetLocation(position, 10, 7);
      }
    }),
    charge: State({
      complete: function() {
        I.currentState = states.energyBeam;
      },
      duration: 40,
      model: chargeModel,
      update: function(position) {
        I.rotation = I.rotation.approachRotation(Point.direction(self.position(), dino.position()) - Math.PI/2, Math.PI/24);

        approachTargetLocation(position, 7, 7);
      }
    }),
    energyBeam: State({
      complete: function() {
        I.currentState = states.battle;
        I.shootLogic = ragingShootLogic;
        self.trigger("beamComplete");
      },
      duration: 40,
      model: energyBeamModel,
      update: function() {
        self.shoot(I.rotation + Math.PI/2, $.extend(self.position(), {
          buffer: 500,
          collisionType: 'enemyBullet',
          health: Infinity,
          radius: 8,
          speed: 14,
          sprite: Sprite.load('images/projectiles/beam.png'),
        }));
      }
    }),
    missileBarrage: State({
      complete: function() {
        I.currentState = states.battle;
      },
      duration: 12,
      model: energyBeamModel,
      update: function() {
        addGameObject(HomingMissile($.extend({
          buffer: 150,
          collisionType: "enemyBullet",
          sprite: missileSprite,
          theta: (missilePos++) * Math.PI / 6
        }, self.position())));
      }
    }),
    missileCharge: State({
      complete: function() {
        I.currentState = states.missileBarrage;
      },
      duration: 40,
      model: chargeModel,
      update: function(position) {
        approachTargetLocation(position, 7, 7);
      }
    }),
  };

  $.reverseMerge(I, {
    collideDamage: 1,
    health: 5000,
    pointsWorth: 1000000,
    radius: 40,
    rotation: 0,
    x: CANVAS_WIDTH/2,
    y: 100
  });

  I.currentState = states.battle;

  var self = Boss(I).extend({
    getTransform: GameObject.rotationGetTransform(I)
  });

  self.extend(Stateful(I));

  self.bind('destroy', function() {
    addGameObject(EffectGenerator($.extend(self.position(), {
      duration: Infinity,
      radius: 50
    })));

    addGameObject(Effect($.extend(self.position(), {
      duration: Infinity,
      rotation: 0,
      sprite: chargeModel.animation,
      velocity: Point(0, 0)
    })));
  });

  var centralPoint = self.position().add(Point());

  return self;
}
function FloatingCrate(I) {
  I = I || {};

  $.reverseMerge(I, {
    health: 25,
    theta: Math.PI / 4
  });

  var self = Crate(I).extend({
    before: {
      update: function() {
        I.y += Math.sin(I.age / 7);
      }
    },

    getTransform: function() {
      var transform;

      transform = Matrix.rotation(I.theta).concat(Matrix.IDENTITY);

      return transform.translate(I.x, I.y);
    },

    sink: $.noop
  });

  return self;
}
function Gunship(I) {
  I = I || {};

  $.reverseMerge(I, {
    components: [],
    health: 2000,
    hFlip: false,
    hitCircles: [],
    maxShakeAmplitude: 50,
    shakeAmplitude: 0,
    x: 550,
    xVelocity: 0,
    y: 240
  });

  var damageTable = {
    bite: 5,
    fire: 0.05
  };

  var sparkSprayEffect = function(bullet) {
    if(!rand(3)) {
      Sound.play("ricochet" + (rand(4) + 2), 1);

      var effect = Effect($.extend(bullet.position(), {
        duration: 9,
        sprite: loadAnimation("images/effects/sparkEffect2_16x16.png", 7, 16, 16),
        velocity: bullet.velocity()
      }));

      addGameObject(effect);
    }
  };

  var healthBar;
  var ship;
  var shipComponents;
  var aggro = false;

  var cannonDead = false;
  var componentsDestroyed = 0;

  var smallBulletSprite = Sprite.load("images/effects/enemybullet1_small.png");
  var bulletSprite = Sprite.load("images/projectiles/plane_bullet.png");

  var hullModel = Model.loadJSONUrl("data/gunship/hull.model.json");
  var lob1Model = Model.loadJSONUrl("data/gunship/lob1.model.json");
  var lob1Destroyed = Sprite.load("images/enemies/gunship/lob1_dead.png");
  var lob2Model = Model.loadJSONUrl("data/gunship/lob2.model.json");
  var lob2Destroyed = Sprite.load("images/enemies/gunship/lob2_dead.png");
  var bunkerModel = Model.loadJSONUrl("data/gunship/bunker.model.json");
  var bunkerDestroyed = Sprite.load("images/enemies/gunship/bunker_dead.png");
  var cannonModel = Model.loadJSONUrl("data/gunship/cannon.model.json");
  var cannonBaseModel = Model.loadJSONUrl("data/gunship/cannon_base.model.json");
  var cannonBaseDestroyed = Sprite.load("images/enemies/gunship/cannon_base_dead.png");
  var machineGunModel = Model.loadJSONUrl("data/gunship/machine_gun.model.json");
  var machineGunDestroyed = Sprite.load("images/enemies/gunship/machine_gun_dead.png");

  var onPath = false;

  var states = {
    attack: State({
      duration: Infinity,
      model: hullModel,
      update: function(levelPosition) {
        var targetPosition = levelPosition.x + boatTarget.x + 20 * Math.sin(I.age/20);

        if(onPath) {
          I.x = targetPosition;
        } else {
          I.x = I.x.approach(targetPosition, 5);

          if(I.x == targetPosition) {
            onPath = true;
          }
        }

        I.components.each(function(component) {
          component.update();
          component.shoot(self.getTransform());
        });

        if(!cannonDead) {
          cannon.update();
          cannon.shoot(self.getTransform());
        }
      }
    }),
    enter: State({
      complete: function() {
        I.currentState = states.attack;
      },
      duration: 66,
      model: hullModel,
      update: function(levelPosition) {
        I.x = levelPosition.x + CANVAS_WIDTH + 120 - 4 * I.age;

        I.components.each(function(component) {
          component.setAnimation();
        });

        cannon.update();
      }
    })
  };

  function ShipComponent(I) {
    I = I || {};

    $.reverseMerge(I, {
      genBulletData: function() {
        return {
          sprite: smallBulletSprite
        };
      },
      collideDamage: 1,
      cooldown: 0,
      fireRate: 3,
      health: 500,
      muzzleFlash: false,
      shot: {
        count: 1,
        dispersion: 0
      },
      shotLocations: ["exit"]
    });

    var self = GameObject(I).extend({
      bulletHitEffect: sparkSprayEffect,

      getCircles: function() {
        var transform = self.getTransform();

        return $.map(I.model.hitFrame(), function(circle) {
          var point = transform.transformPoint(circle);
          return {
            x: point.x,
            y: point.y,
            radius: circle.radius,
            component: self
          };
        });
      },

      hit: function(other) {
        var damageFactor;

        if(other.damageType) {
          damageFactor = damageTable[other.damageType()]
        }

        if(damageFactor === undefined) {
          damageFactor = 1;
        }

        I.health = I.health - other.collideDamage() * damageFactor;

        if (I.health <= 0) {
          self.destroy();
        }
      },

      shootFrom: function (attachment, bulletData, transform, muzzleFlash) {
        var shootPoint = I.model.attachment(attachment);

        if(shootPoint) {
          var t = transform.concat(self.getTransform());
          var direction = shootPoint.direction;

          var p = t.transformPoint(shootPoint);

          var tmpPoint = t.deltaTransformPoint(Point(Math.cos(direction), Math.sin(direction)));
          var theta = Point.direction(Point(0,0), tmpPoint);

          var dispersion = Circle.randomPoint(I.shot.dispersion);

          var bullet = Bullet($.extend({
            collisionType: "enemyBullet",
            theta: theta,
            x: p.x + dispersion.x,
            y: p.y + dispersion.y
          }, bulletData));

          addGameObject(bullet);

          if(muzzleFlash) {
            addGameObject(Effect({
              duration: 26,
              sprite: Animation.load({
                url: "images/effects/cannon_blast.png",
                frames: 9,
                width: 177,
                height: 106,
                delay: 3
              }),
              velocity: bullet.velocity(),
              x: p.x,
              y: p.y
            }));
          }

          return bullet;
        } else {
          return undefined;
        }
      },

      shoot: function(transform) {
        if(I.cooldown >= I.fireRate) {

          var bulletData;

          if(aggro && I.genAggroBulletData) {
            bulletData = I.genAggroBulletData();
          } else {
            bulletData = I.genBulletData();
          }

          I.shot.count.times(function(i) {
            I.shotLocations.each(function(location) {
              self.shootFrom(location, bulletData, transform, !i && I.muzzleFlash);
            });
          });

          I.cooldown = 0;
        } else {
          if(aggro) {
            I.cooldown += 3;
          } else {
            I.cooldown += 1;
          }
        }
      },

      setAnimation: function() {
        I.sprite = I.model.animation;
      },

      before: {
        update: function() {
          self.setAnimation();
        }
      }
    });

    self.bind("destroy", function() {
      self.hit = $.noop;
      self.shoot = $.noop;
      self.update = $.noop;
      self.getCircles = function() {
        return [];
      };
      I.health = 0;
      I.sprite = I.destroyedSprite;

      componentsDestroyed += 1;

      if(componentsDestroyed == 3) {
        aggro = true;
        ship.shudder();
      }

      if(componentsDestroyed == shipComponents.length) {
        ship.destroy();
      }
    });

    return self;
  }

  var machineGunRotation = Math.PI;

  var machineGun = ShipComponent({
    destroyedSprite: machineGunDestroyed,
    fireRate: 2,
    model: machineGunModel,
    shotLocations: ["exit", "exit1"],
    x: 50,
    y: 16
  }).extend({
    getTransform: function() {
      var position = machineGun.position();
      
      var t = Matrix.rotation(machineGunRotation, Point(-25, 0)).translate(position.x, position.y);

      return t;
    },
    before: {
      update: function() {
        // Aim at dino
        machineGunRotation = Point.direction(ship.position().add(machineGun.position()), dino.position());
      }
    }
  });

  // Add some decoy circles to soak up floating homing missiles
  machineGun.bind("destroy", function() {
    machineGun.getCircles = function() {
      return [{x: 20, y: 16, radius: 20}];
    };
  });

  var cannonRotation = - 5/6 * Math.PI;

  var cannon = ShipComponent({
    fireRate: 66,
    genBulletData: (function() {
      return function() {
        return {
          collideDamage: 5,
          speed: 12,
          sprite: bulletSprite,
          yAcceleration: GRAVITY / 4
        };
      };
    }()),
    model: cannonModel,
    muzzleFlash: true,
    shot: {
      count: 4,
      dispersion: 6,
    },
    x: 60,
    y: -70
  }).extend({
    getTransform: function() {
      var position = cannon.position();
      
      var t = Matrix.rotation(cannonRotation, Point(-42, 0)).translate(position.x, position.y);

      return t;
    },

    before: {
      update: function() {
        cannonRotation = 2/3 * Math.PI * (1 + Math.abs(Math.sin(this.age() / 90)));
      }
    }
  });

  var cannonBase = ShipComponent({
    destroyedSprite: cannonBaseDestroyed,
    fireRate: Infinity,
    model: cannonBaseModel,
    shot: {
      count: 0
    }
  });

  cannonBase.bind("destroy", function() {
    cannonDead = true;

    var position = cannon.position().add(ship.position());

    addGameObject(Grenade($.extend(position, {
      contactTrigger: false,
      rotation: cannonRotation,
      rotationalVelocity: Math.PI / 12,
      speed: 15,
      sprite: cannonModel.animation,
      theta: -2/3 * Math.PI
    })));
  });

  I.components.push(
    ShipComponent({
      genBulletData: (function() {
        var count = 0;
        return function() {
          count += 1;
          return {
            collideDamage: 5,
            speed: 10 + 12 * (count % 2),
            sprite: bulletSprite,
            yAcceleration: GRAVITY / 2
          };
        };
      }()),
      destroyedSprite: lob1Destroyed,
      fireRate: 99,
      model: lob1Model,
      shot: {
        count: 10,
        dispersion: 8,
      }
    }), ShipComponent({
      genBulletData: (function() {
        var count = 0;
        return function() {
          if(count == 6) {
            count = 0;
          }
          count += 1;
          
          return {
            collideDamage: 5,
            speed: count * 2,
            sprite: bulletSprite,
            yAcceleration: GRAVITY / 2
          };
        }
      }()),
      destroyedSprite: lob2Destroyed,
      fireRate: 33,
      model: lob2Model,
      shot: {
        count: 10,
        dispersion: 15,
      }
    }), ShipComponent({
      destroyedSprite: bunkerDestroyed,
      fireRate: 0,
      model: bunkerModel,
      x: -70,
      y: -66
    }),
    cannonBase,
    machineGun
  );

  shipComponents = I.components;

  var boatTarget = Point(I.x - 25, I.y);
  I.currentState = states.enter;

  var self = ship = Boss(I).extend({
    bulletHitEffect: sparkSprayEffect,

    getTransform: function() {
      return Matrix.translation(I.x, I.y);
    },

    health: function() {
      var total = 0;

      I.components.each(function(component) {
        total += component.health();
      });

      return total;
    },

    healthBar: function() {
      if(!healthBar) {
        healthBar = ProgressBar({
          colorMap: healthColorMap,
          element: $("#bossHealth"),
          max: self.health(),
          value: self.health()
        });
      }

      return healthBar;
    },

    shudder: function() {
      I.shakeAmplitude = 300;
    },

    after: {
      update: function() {
        if(healthBar) {
          healthBar.value(self.health());
        }

        if(I.shakeAmplitude > 10) {
          I.shakeAmplitude = I.shakeAmplitude * 0.7;
          I.x += (Math.min(I.maxShakeAmplitude, I.shakeAmplitude) * Math.sin(I.age)).abs();
        } else {
          I.shakeAmplitude = 0;
        }
      }
    }
  });

  self.attrReader('components');

  self.extend(Stateful(I));

  self.extend({
    getCircles: function() {
      var transform = self.getTransform();

      var componentCircles = $.map(self.components(), function(component) {
        return $.map(component.getCircles(), function(circle) {
          var point = transform.transformPoint(circle);
          return {
            radius: circle.radius,
            x: point.x,
            y: point.y,
            component: component
          };
        });
      });

      return componentCircles;
    },

    after: {
      draw: function(canvas) {
        canvas.withTransform(self.getTransform(), function() {
          $.each(I.components, function(i, component) {
            component.draw(canvas);
          });

          if(!cannonDead) {
            cannon.draw(canvas);
          }
        });
      }
    }
  });

  self.bind('destroy', function() {
    addGameObject(EffectGenerator($.extend(self.position(), {
      radius: 100
    })));

    I.active = true;
    I.rotation = Math.PI / 2.25;
    self.update = $.noop;
    self.getTransform = GameObject.rotationGetTransform(I);
  });

  return self;
}
function Mutant(I) {
  I = I || {};

  var walkModel = Model.loadJSONUrl("data/mutant/walk.model.json", function(model) {
    I.sprite = model.animation;
  });
  var deathModel = Model.loadJSONUrl("data/mutant/death.model.json");

  $.reverseMerge(I, {
    checkBounds: function(position) {
      if (I.x < position.x + I.radius) {
        I.x = position.x + I.radius;
        I.xVelocity = Math.abs(I.xVelocity);
      } else if (I.x > position.x + CANVAS_WIDTH - I.radius) {
        I.x = position.x + CANVAS_WIDTH - I.radius;
        I.xVelocity = -Math.abs(I.xVelocity);
      }
    },
    hitCircles: walkModel.hitFrames,
    health: 50,
    nutrition: -7,
    pointsWorth: 5000,
    radius: 20,
    sprite: walkModel.animation,
    type: 'mutant',
    xVelocity: -(rand(11) + 1) / 4,
    y: CANVAS_HEIGHT - Floor.LEVEL,
  });

  var self = Enemy(I).extend({

    bulletHitEffect: Enemy.bloodSprayEffect,

    land: function(h) {
      if(I.yVelocity >= 0) {
        I.y = h - (I.radius + 1);
        I.yVelocity = 0;
      }
    },

    after: {
      update: function() {
        if (I.yVelocity > 0) {
          I.yVelocity += GRAVITY;
        }

        if (walkModel.hitFrame) {
          I.hitCircles = walkModel.hitFrame();
        }
      }
    }
  });

  self.bind('destroy', function(self) {
    var deathAnimation;

    Sound.play("die");
    deathAnimation = deathModel.animation;

    var effectI = self.position();

    var effect = Effect($.extend(effectI, {
      //TODO: This -1 is probably symptomatic of a deeper error
      duration: deathAnimation.duration() - 1,
      hFlip: I.hFlip,
      sprite: deathAnimation,
      velocity: Point(0, 0),
      x: I.x
    }));

    addGameObject(effect);
  });

  self.extend(Biteable(I));
  self.extend(Burnable(I));
  self.extend(Chopable(I));

  return self;
}
function Ramp(I) {
  I = I || {};

  $.reverseMerge(I, {
    collisionType: "enemy",
    health: 25,
    hitCircles: [{"x": 28, "y": 6, "radius": 20}],
    sprite: Sprite.load("images/enemies/ramp.png")
  });

  var checkBounds = GameObject.generateCheckBounds(I, 100);

  var self = Enemy(I).extend({
    bulletHitEffect: Enemy.sparkSprayEffect,

    crush: function() {
      I.active = false;
      //TODO Debris
    },

    getTransform: function() {
      var t = Matrix.IDENTITY;

      return t.translate(I.x, I.y);
    },

    sink: $.noop,

    after: {
      hit: function(other) {
        if(other.bounce) {
          other.bounce(self);
        }
      },

      update: function() {
        checkBounds.apply(self, arguments);
      }
    }
  });

  return self;
}
function RoboReagan(I) {
  I = I || {};

  var chargeModel = Model.loadJSONUrl("data/robo_reagan/charge.model.json");
  var energyBeamModel = Model.loadJSONUrl("data/robo_reagan/energy_beam.model.json");
  var hoverModel = Model.loadJSONUrl("data/robo_reagan/hover.model.json");
  var kneelModel = Model.loadJSONUrl("data/robo_reagan/kneel.model.json");

  var xAmplitude = 100;
  var yAmplitude = 25;

  var maxDisplacementScale = 1;
  var displacementScale = 0;
  var displacementDelta = 0.025;

  var missileFrequency = 0;

  var ragingShootLogic = function() {
    self.shoot(
      Math.random() * (Math.PI), {
        x: self.midpoint().x,
        y: self.midpoint().y,
        sprite: Sprite.load("images/effects/enemybullet1_small.png")
      }
    );

    if(rand() < missileFrequency) {
      addGameObject(HomingMissile($.extend({
        collisionType: "enemyBullet",
        sprite: Sprite.load("images/projectiles/homing_missile_red.png")
      }, self.position())));
    }
  };

  var states = {
    battle: State({
      model: hoverModel,
      update: function() {
        if(displacementScale >= 2 && displacementDelta > 0) {
          displacementDelta = -displacementDelta;
        } else if(displacementScale <= 0 && displacementDelta < 0){
          displacementDelta = -displacementDelta;
          I.currentState = states.charge;
          I.shootLogic = $.noop;
        }

        displacementScale += displacementDelta;

        var currentScale = Math.min(maxDisplacementScale, displacementScale);

        I.x = centralPoint.x + currentScale * xAmplitude * Math.sin(I.age / 11);
        I.y = centralPoint.y + currentScale * yAmplitude * Math.cos(I.age / 13);

        maxDisplacementScale = Math.min((6000 - I.health) / 1000, 2);
        missileFrequency = ((5000 - I.health) / 1000).floor() * 0.025;
      }
    }),
    charge: State({
      complete: function() {
        I.currentState = states.energyBeam;
      },
      duration: 40,
      model: chargeModel
    }),
    energyBeam: State({
      complete: function() {
        I.currentState = states.battle;
        I.shootLogic = ragingShootLogic;
        self.trigger("beamComplete");
      },
      duration: 40,
      model: energyBeamModel,
      update: function() {
        addGameObject(EnergyBeam(self.position()));
      }
    }),
    takeOff: State({
      complete: function() {
        I.currentState = states.battle;
        I.shootLogic = ragingShootLogic;
      },
      duration: 80,
      model: hoverModel,
      update: function() {
        I.y -= 2;
      }
    }),
    shakeFist: State({
      complete: function() {
        I.currentState = states.takeOff;
      },
      duration: 50,
      model: kneelModel,
      update: function() {
        I.currentState.frame((I.currentState.frame() % 2) + 8);
      }
    }),
    stand: State({
      complete: function() {
        I.currentState = states.shakeFist;
      },
      duration: 20,
      model: kneelModel,
      update: function() {

      }
    }),
    kneel: State({
      complete: function() {
        I.currentState = states.stand;
      },
      duration: 100,
      model: kneelModel,
      update: function() {
        I.y = CANVAS_HEIGHT - Floor.LEVEL - 40;

        I.currentState.frame(0);
      }
    })
  };

  $.reverseMerge(I, {
    collideDamage: 1,
    health: 5000,
    pointsWorth: 1000000,
    radius: 40,
    sprite: kneelModel.animation,
    x: rand(CANVAS_WIDTH),
    y: 100
  });

  I.currentState = states.kneel;

  var self = Boss(I).extend({});

  self.extend(Stateful(I));

  self.bind('destroy', function() {
    addGameObject(EffectGenerator($.extend(self.position(), {
      duration: Infinity,
      radius: 50
    })));

    addGameObject(Effect($.extend(self.position(), {
      duration: Infinity,
      rotation: 0,
      sprite: chargeModel.animation,
      velocity: Point(0, 0)
    })));
  });

  var centralPoint = self.position().add(Point());

  return self;
}
function SecretService(I) {
  I = I || {};

  var standModel = Model.loadJSONUrl("data/secret_service/stand.model.json");
  var runModel = Model.loadJSONUrl("data/secret_service/run.model.json");
  var shootModel = Model.loadJSONUrl("data/secret_service/shoot.model.json");
  var bitInHalfModel = Model.loadJSONUrl("data/secret_service/bit_in_half.model.json");
  var deathModel = Model.loadJSONUrl("data/secret_service/death.model.json");
  var burningAnimation = Animation.load({
    url: "images/enemies/burning_man.png",
    frames: 20,
    width: 57,
    height: 89,
    delay: 3
  });

  var states = {
    shoot: State({
      complete: function() {
        I.currentState = states.run;
      },
      duration: 24,
      model: shootModel,
      shootLogic: function() {
        if(I.currentState.age() % 3 == 0) {
          self.shootFrom("shot", {
            sprite: Sprite.load("images/effects/enemybullet1_small.png")
          });
        }
      }
    }),
    run: State({
      complete: function() {
        if (rand() < 0.25) {
          I.currentState = states.stand;
        } else {
          I.currentState = states.shoot;
        }
      },
      duration: 24,
      model: runModel
    }),
    stand: State({
      complete: function() {
        I.currentState = states.run;
        I.xVelocity = -2;
        addGameObject([
          Tank({
            x: currentLevel.position().x + CANVAS_WIDTH + 40
          }),
          Fighter({
            xVelocity: -3,
            x: currentLevel.position().x + CANVAS_WIDTH + 40,
            y: 60,
          })
        ].rand());
      },
      duration: 48,
      model: standModel,
      update: function() {
        I.xVelocity = 0;
      }
    })
  };

  $.reverseMerge(I, {
    currentState: states.run,
    nutrition: 25,
    type: 'secret service',
    x: rand(CANVAS_WIDTH),
    y: CANVAS_HEIGHT - Floor.LEVEL - 20,
  });

  var self = Enemy(I).extend({
    after: {
      update: function() {
        I.shootLogic = I.currentState.shootLogic();
      }
    }
  });

  self.bind('destroy', function(self) {
    var deathAnimation;
    var xOffset = 0;
    var yOffset = 0;

    if(I.onFire) {
      deathAnimation = burningAnimation;
      yOffset = -13;
      xOffset = 2;
    } else if(I.bitInHalf) {
      deathAnimation = bitInHalfModel.animation;
      xOffset = 20;
    } else {
      Sound.play("die");
      deathAnimation = deathModel.animation;
    }

    var effectI = self.position();

    var effect = Effect($.extend(effectI, {
      //TODO: This -1 is probably symptomatic of a deeper error
      duration: deathAnimation.duration() - 1,
      hFlip: I.hFlip,
      sprite: deathAnimation,
      velocity: Point(0, 0),
      x: I.x + xOffset,
      y: I.y + yOffset
    }));

    addGameObject(effect);
  });

  self.extend(Biteable(I));
  self.extend(Burnable(I));
  self.extend(Chopable(I));
  self.extend(Stateful(I));

  return self;
}
function Shakeable(I) {
  I = I || {};

  $.reverseMerge(I, {
    maxShakeAmplitude: 100,
    shakeAmplitude: 0
  });

  return {
    before: {
      update: function() {
        if(I.shakeAmplitude > 0.1) {
          I.shakeAmplitude = I.shakeAmplitude * 0.7;
          I.x += Math.min(I.maxShakeAmplitude, I.shakeAmplitude) * Math.sin(I.age);
        } else {
          I.shakeAmplitude = 0;
        }
      }
    },

    after: {
      hit: function(other) {
        I.shakeAmplitude += other.collideDamage();
      }
    }
  };
}
function Soldier(I) {
  I = I || {};

  var runModel = Model.loadJSONUrl("data/sandinista/run.model.json");
  var shootModel = Model.loadJSONUrl("data/sandinista/shoot.model.json");
  var bitInHalfModel = Model.loadJSONUrl("data/sandinista/bit_in_half.model.json");
  var deathModel = Model.loadJSONUrl("data/sandinista/normal_death.model.json");
  var parachuteFallModel = Model.loadJSONUrl("data/sandinista/parasoldier_fall.model.json");
  var parachuteShootModel = Model.loadJSONUrl("data/sandinista/parasoldier_shoot.model.json");

  var parachuteSprite = Animation.load({
    url: "images/enemies/soldier_parachute.png",
    frames: 4,
    width: 76,
    height: 41,
    delay: 3
  });

  var burningAnimation = Animation.load({
    url: "images/enemies/burning_man.png",
    frames: 20,
    width: 57,
    height: 89,
    delay: 3
  });

  var states = {
    parachuteFall: State({
      model: parachuteFallModel,
      update: function() {
        if (Math.random() < 0.015) {
          I.currentState = states.parachuteShoot;
        }
      }
    }),
    parachuteShoot: State({
      complete: function() {
        I.currentState = states.parachuteFall;
      },
      duration: 12,
      model: parachuteShootModel,
      shootLogic: function() {
        if(I.currentState.age() % 3 == 0) {
          self.shootFrom("shot", {
            sprite: Sprite.load("images/effects/enemybullet1_small.png")
          });
        }
      }
    }),
    shoot: State({
      complete: function() {
        I.currentState = states.run;
      },
      duration: 24,
      model: shootModel,
      shootLogic: function() {
        if(I.currentState.age() % 3 == 0) {
          self.shootFrom("shot", {
            sprite: Sprite.load("images/effects/enemybullet1_small.png")
          });
        }
      }
    }),
    run: State({
      complete: function() {
        if (Math.random() < 0.15) {
          I.currentState = states.shoot;
        }
      },
      duration: 24,
      model: runModel,
    })
  };

  $.reverseMerge(I, {
    airborne: false,
    currentState: states.run,
    nutrition: 50,
    type: 'sandinista',
    x: rand(CANVAS_WIDTH),
    y: CANVAS_HEIGHT - Floor.LEVEL - 20,
    yVelocity: 0
  });

  var self = Enemy(I).extend({
    land: function(h) {
      if(I.airborne) {
        I.y = h - (I.radius + 1);
        I.yVelocity = 0;
        I.xVelocity = -2;
        I.airborne = false;
        I.currentState = states.run;
      }
    },
    after: {
      update: function() {
        I.shootLogic = I.currentState.shootLogic();
        parachuteSprite.update();

        if (I.airborne && I.currentState !== states.parachuteShoot) {
          I.currentState = states.parachuteFall;
        }
      }
    }
  });

  self.bind('destroy', function(self) {
    var deathAnimation;
    var xOffset = 0;
    var yOffset = 0;

    if(I.onFire) {
      deathAnimation = burningAnimation;
      yOffset = -13;
      xOffset = 2;
    } else if(I.bitInHalf) {
      deathAnimation = bitInHalfModel.animation;
      xOffset = 20;
    } else {
      Sound.play("die");
      deathAnimation = deathModel.animation;
    }

    var effectI = self.position();

    var effect = Effect($.extend(effectI, {
      //TODO: This -1 is probably symptomatic of a deeper error
      duration: deathAnimation.duration() - 1,
      hFlip: I.hFlip,
      sprite: deathAnimation,
      velocity: Point(0, 0),
      x: I.x + xOffset,
      y: I.y + yOffset
    }));

    if(I.airborne) {
      effect.extend({
        getTransform: GameObject.velocityGetTransform(effectI),
        before: {
          update: function() {
            if(effectI.y >= CANVAS_HEIGHT - Floor.LEVEL) {
              effectI.y = CANVAS_HEIGHT - Floor.LEVEL;
              effectI.yVelocity = 0;
            } else {
              effectI.yVelocity += GRAVITY / 2;
            }
          }
        }
      });
    }

    addGameObject(effect);
  });

  self.extend(Biteable(I));
  self.extend(Burnable(I));
  self.extend(Chopable(I));
  self.extend(Stateful(I));

  self.draw = function(canvas) {
    var self = this;

    canvas.withTransform(self.getTransform(), function() {
      I.currentState.draw(canvas);

      if (I.airborne) {
        parachuteSprite.draw(canvas, -40, -56);
      }
    });

    if (GameObject.DEBUG_HIT) {
      self.drawHitCircles(canvas);
    }
  }

  return self;
}
function Tank(I) {
  I = I || {};

  var gunAngle = 13 * Math.PI / 12;
  var exitPoint = Point(60, -23);

  var tankModel = Model.loadJSONUrl("data/tank/tank.model.json", function(model) {
    I.sprite = model.animation;
  });

  $.reverseMerge(I, {
    damageTable: {
      fire: 0,
    },
    health: 60,
    hitCircles: tankModel.hitFrames,
    maxShakeAmplitude: 7,
    nutrition: -10,
    pointsWorth: 5000,
    shootLogic: function() {
      // Shoot
      if (Math.random() < 0.02) {
        var transform = self.getTransform();

        var p = transform.transformPoint(exitPoint);

        self.shoot(gunAngle, {
          x: p.x,
          y: p.y,
          sprite: Sprite.load("images/projectiles/tank_shell.png"),
          collideDamage: 7
        });
      }
    },
    sprite: tankModel.animation,
    type: 'tank',
    xVelocity: -0.5,
    y: CANVAS_HEIGHT - Floor.LEVEL
  });

  var self = Enemy(I).extend({
    bulletHitEffect: Enemy.sparkSprayEffect,

    after: {
      update: function() {
        I.hitCircles = tankModel.hitFrame();
      }
    }
  });

  self.extend(Shakeable(I));

  self.bind('destroy', function() {
    addGameObject(Grenade({
      collideDamage: 5,
      collisionType: "dinoBullet",
      sprite: Sprite.load([
        "images/effects/debris1.png",
        "images/effects/debris2.png",
        "images/effects/debris3.png",
        "images/effects/debris4.png"
      ].rand()),
      x: self.position().x,
      xVelocity: (Math.random() < 0.5) ? rand(10) : -1*rand(10),
      y: self.position().y - 50,
      yVelocity: -1*rand(10) - 5
    }));
  });

  return self;
}
function Utahraptor(I) {
  I = I || {};

  var raptorAnimation = Animation.load({
    url: "images/enemies/dinofodder_run.png",
    frames: 8,
    width: 69,
    height: 34,
    delay: 3
  });

  $.reverseMerge(I, {
    bitInHalf: false,
    collideDamage: 0,
    health: 1,
    nutrition: 10,
    radius: 18,
    sprite: raptorAnimation,
    type: 'utahraptor',
    xVelocity: -0.5,
    y: CANVAS_HEIGHT - Floor.LEVEL,
  });

  var self = Enemy(I).extend({
    bulletHitEffect: Enemy.bloodSprayEffect,

    after: {
      update: function() {
        if (Math.random() < 0.5 && I.xVelocity > 0) {
          I.xVelocity += Math.random() * 0.1;
        }

        if (Math.random() < 0.01) {
          I.xVelocity = -I.xVelocity;
        }
      }
    }
  });

  self.extend(Biteable(I));

  return self;
}
function WhiteHouse(I) {
  I = I || {};

  var fullSprite = Sprite.load('images/levels/washington_dc/whiteHouse_full.png');
  var damagedSprite = Sprite.load('images/levels/washington_dc/whiteHouse_damaged.png');

  $.reverseMerge(I, {
    damageTable: {
      fire: 0.1,
    },
    health: 1000,
    hitCircles: [
      { "x": -132, "y": 32, "radius": 140 },
      { "x": 133, "y": 32, "radius": 139 },
      { "x": 0, "y": -98, "radius": 60 },
      { "x": 0, "y": 132, "radius": 40 },
      { "x": -238, "y": -80, "radius": 48 },
      { "x": 238, "y": -78, "radius": 48 },
      { "x": -239, "y": 145, "radius": 27 },
      { "x": 238, "y": 144, "radius": 28 }
    ],
    y: 170,
    sprite: fullSprite
  });

  var healthMax = I.health;

  var self = Boss(I).extend({
    bulletHitEffect: Enemy.sparkSprayEffect,

    before: {
      update: function() {
        if(I.health < healthMax / 2) {
          I.sprite = damagedSprite;
        }
      }
    }
  });

  self.extend(Shakeable(I));

  return self;
}
$(function() {
  var imgPath = "images/levels/prehistoric/";

  var meteorsActive = false;

  function generateRunningEnemies(level, count) {
    count.times(function(i) {
      level.addGameObject(
        Utahraptor({
          xVelocity: -(rand(6) + 0.5),
          x: level.position().x + CANVAS_WIDTH + i*20
        }
      ));
    });
  }

  function generateForegroundScenary() {
    var foregrounds = [];
    (2).times(function() {
      foregrounds.push({
        image: Sprite.load(imgPath + "rock.png"),
        parallaxRate: 1,
        position: {
          x: rand(1920),
          y: 325 + rand(150)
        },
        every: 1920
      });
    });

    (5).times(function(i) {
      foregrounds.push({
        image: Sprite.load([
          imgPath + "plant3.png",
          imgPath + "plant4.png",
          imgPath + "plant4.png"
        ].rand()),
        parallaxRate: 1,
        position: {
          x: i * 150 + rand(50),
          y: 225 + rand(80)
        },
        every: 1000
      });
    });

    (6).times(function(i) {
      foregrounds.push({
        image: Sprite.load([
          imgPath + "plant1.png",
          imgPath + "plant2.png"
        ].rand()),
        parallaxRate: 2,
        position: {
          x: i * 200 + rand(100) - 50,
          y: 400
        },
        every: 1200
      });
    });

    return foregrounds;
  }

  var scene = Scene([
    {
      image: Sprite.load(imgPath + 'ground.png'),
      parallaxRate: 0,
      position: {
        x: 0,
        y: CANVAS_HEIGHT - Floor.LEVEL
      }
    },
    {
      image: Sprite.load(imgPath + "volcano_background.png"),
      parallaxRate: 0.25,
      position: {
        x: 0,
        y: 0
      },
      repeat: true
    },
    {
      image: Sprite.load(imgPath + "volcano_midground.png"),
      parallaxRate: 0.5,
      position: {
        x: 0,
        y: 0
      },
      repeat: true
    },
    {
      image: Sprite.load(imgPath + "volcano_grassy_foreground.png"),
      parallaxRate: 1,
      position: {
        x: 0,
        y: 4
      },
      repeat: true
    }
  ], generateForegroundScenary());

  var floor = Floor();

  var brontosaurus;

  var triggers = [{
    every: 1,
    event: function(level) {
      if(Math.random() < 0.01) {
        generateRunningEnemies(level, rand(5));
      }

      if(meteorsActive) {
        if (Math.random() < 0.03) {
          level.addGameObject(Meteor({
            x: level.position().x + rand(CANVAS_WIDTH)
          }));
        }
      }
    }
  }, {
    every: 50,
    event: function(level) {

      if (dino.boss()) {
        level.addGameObject(
          Utahraptor({
            xVelocity: -6, x: level.position().x + CANVAS_WIDTH + 30
          })
        );
      }
    }
  }, {
    at: 300,
    event: function() {
      level.dialog(DialogBox({
        text: "Press space to CHOMP!"
      }), 200);
    }
  }, {
    at: 495,
    event: function() {
      meteorsActive = true;
    }
  }, {
    at: 1200,
    event: function(level) {
      brontosaurus = Brontosaurus({
        x: level.position().x + CANVAS_WIDTH + 160
      });

      brontosaurus.bind('destroy', function() {
        dino.timeTravel(true);
        dino.boss(false);

        level.after(140, function() {
          level.fadeOut(10);
        });

        level.after(150, function() {
          level.complete();
        });
      });

      dino.boss(brontosaurus);

      level.addGameObject(brontosaurus);
      level.lockCamera(level.position().x, level.position().x + 250);
    }
  }];

  addCutscene("images/levels/cutscenes/triassic.png", "Thousands of years ago... the search for a champion begins.", 4000);

  var level = addLevel({
    audio: "1",
    description: "BC 3,700: Prehistoric Utah",
    scene: scene,
    objective: "Eat",
    objectiveImage: 'images/enemies/dinofodder.png',
    platforms: [floor],
    triggers: triggers
  });
});
$(function() {
  var imgPath = "images/levels/area51/";

  var scene = Scene([
    {
      image: Sprite.load(imgPath + 'ground.png'),
      parallaxRate: 0,
      position: Point(0, CANVAS_HEIGHT - Floor.LEVEL)
    },
    {
      image: Sprite.load(imgPath + "background.png"),
      parallaxRate: 0.25,
      position: Point(0, 0),
      repeat: true
    },
    {
      image: Sprite.load(imgPath + "midground.png"),
      parallaxRate: 0.5,
      position: Point(0, 0),
      repeat: true
    },
    {
      image: Sprite.load(imgPath + "foreground.png"),
      parallaxRate: 1,
      position: Point(0, 0),
      repeat: true
    }
  ], []);

  function generateMutants(level, number, annihilationCallback) {
    var destroyedCount = 0;

    number.times(function(i) {
      var mutant = Mutant({
        hFlip: true,
        x: level.position().x + CANVAS_WIDTH / 2 + rand(CANVAS_WIDTH / 2),
        y: 0,
        yVelocity: 0.01
      });

      mutant.bind('destroy', function() {
        destroyedCount += 1;

        if(destroyedCount == number && annihilationCallback) {
          annihilationCallback();
        }
      });

      level.addGameObject(mutant);
    });
  }

  function generateAgents() {
    level.addGameObject(Area51Agent({
      x: 500
    }));

    level.addGameObject(Area51Agent({
      x: 520
    }));
  }

  function addCrate(weaponClass, onDestroy) {
    var crate = Crate({
      weaponClass: weaponClass,
      x: level.position().x + CANVAS_WIDTH,
      y: 320
    });

    if(onDestroy) {
      crate.bind('destroy', onDestroy);
    }

    addGameObject(crate);
  }

  function machineGunTrial(level) {
    level.lockCamera(level.position().x, level.position().x + 250);

    level.after(180, function() {
      generateMutants(level, 3, function() {
        level.unlockCamera();

        level.after(300, flameThrowerTrial);
      });
    });

    addCrate(MachineGun, function() {
      level.dialog(DialogBox({
        text: "No weapon in the arsenals of the world is so formidable as a tyrannosaurus rex with a machine gun.",
        avatar: reaganAvatar
      }), 150);

      level.after(220, function() {
        level.dialog(DialogBox({ text: "Aim with the mouse. Left click to fire weapons" }), 90);
      });
    });
  }

  function flameThrowerTrial(level) {
    level.lockCamera(level.position().x, level.position().x + 250);

    level.after(180, function() {
      generateMutants(level, 5, function() {
        level.unlockCamera();

        level.after(300, chainsawTrial);
      });
    });

    addCrate(Flamethrower, function() {
      level.dialog(DialogBox({
        avatar: reaganAvatar,
        text: "FLAME JAW!"
      }), 150);
    });
  }

  function chainsawTrial(level) {
    level.dialog(DialogBox({
      avatar: reaganAvatar,
      text: "Release the abominations!"
    }), 100);

    level.after(30, function() {
      level.lockCamera(level.position().x, level.position().x + 250);

      generateMutants(level, 20, function() {
        level.unlockCamera();

        level.after(30, function() {
          level.fadeOut(10);

          level.after(10, function() {
            level.complete();
          });
        });
      });
    });

    addCrate(Chainsaw, function() {
      level.dialog(DialogBox({
        avatar: reaganAvatar,
        text: "CH-CH-CH-CH-CHAINSAW!"
      }), 150);
    });
  }

  var floor = Floor({sprite: Sprite.EMPTY});

  var triggers = [{
      at: 0,
      event: function(level) {
        level.addGameObject(GameObject({
          sprite: Sprite.load("images/teleporter.png"),
          x: 345,
          y: 312
        }));

        generateAgents();
      }
  }, {
    at: 60,
    event: function() {
      dino.timeTravel(false);
    }
  }, {
    at: 100,
    event: machineGunTrial
  }];

  addCutscene("images/levels/cutscenes/time_travel.png", "By the power of science!", 4000);

  var reaganAvatar = Sprite.load("images/avatars/reagan.png");

  var level = addLevel({
    audio: "2",
    description: "AD 1984: Area 51",
    objective: "Annihilate",
    objectiveImage: 'images/enemies/mutant/mutant_thumb.png',
    platforms: [floor],
    scene: scene,
    triggers: triggers
  });
});
$(function() {
  var imgPath = "images/levels/jungle/";

  var bossActive = false;

  var scene = Scene([
    {
      image: Sprite.load(imgPath + "ground.png"),
      parallaxRate: 0,
      position: {
        x: 0,
        y: CANVAS_HEIGHT - Floor.LEVEL
      },
      repeat: true,
      width: 640
    },
    {
      image: Sprite.load(imgPath + "background.png"),
      parallaxRate: 0.25,
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      width: 2700
    },
    {
      image: Sprite.load(imgPath + "midground.png"),
      parallaxRate: 0.5,
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      width: 4670
    },
    {
      image: Sprite.load(imgPath + "foreground.png"),
      parallaxRate: 1,
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      width: 5600
    }
  ], []);

  var bombingRunActive = false;
  var bombingRunCount = 0;
  var maxPlanes = 10;
  var numPlanes = 1;
  var planeDelay = 15;

  function generateEnemies(level) {
    if (!bossActive) {
      if (Math.random() < 0.03) {
        if (Math.random() < 0.5) {
          var soldier = Soldier({
            hFlip: true,
            x: level.position().x + CANVAS_WIDTH + 20,
            xVelocity: -2
          });

          level.addGameObject(soldier);
        } else {
          level.addGameObject(Soldier({
            airborne: true,
            hFlip: true,
            xVelocity: 0,
            x: level.position().x + rand(CANVAS_WIDTH - 40) + 20,
            y: -100,
            yVelocity: 2
          }));
        }
      }

      if (Math.random() < 0.01) {
        level.addGameObject(Tank({
          x: level.position().x + CANVAS_WIDTH + 20
        }));
      }

      if (bombingRunActive) {
        var PlaneClass = (numPlanes % 2) ? Fighter : Bomber;

        if (bombingRunCount % planeDelay == 0) {
          level.addGameObject(PlaneClass({
            x: level.position().x - 50 - bombingRunCount,
            y: 40
          }));
        }

        bombingRunCount++;

        if (bombingRunCount >= planeDelay * numPlanes) {
          bombingRunActive = false;
          bombingRunCount = 0;
          if (numPlanes < maxPlanes) {
            numPlanes++;
          }
        }
      }
    }
  }

  var floor = Floor({sprite: Sprite.EMPTY});

  var triggers = [{
    every: 500,
    event: function() {
      bombingRunActive = true;
    }
  }, {
    every: 1,
    event: function(level) {
      generateEnemies(level);
    }
  }, {
    at: 1000,
    event: function(level) {
      var jetPackCrate = Crate({
        weaponClass: function() {return "jetpack";},
        x: level.position().x + CANVAS_WIDTH,
        y: 320
      });

      jetPackCrate.bind('destroy', function() {
        level.unlockCamera();

        level.dialog(DialogBox({
          text: "With the jetpack you can take to the skies! Press up to fly!"
        }), 200);
      });

      addGameObject(jetPackCrate);

      level.lockCamera(level.position().x, level.position().x + 250);
    }
  }, {
    at: 2000,
    event: function(level) {
      addGameObject(Crate({
        weaponClass: MissileLauncher,
        x: level.position().x + CANVAS_WIDTH,
        y: 320
      }));
    }
  }, {
    at: 3000,
    event: function(level) {
      var commando = Commando({
        x: level.position().x + CANVAS_WIDTH + 40
      });

      commando.bind('destroy', function() {
        dino.boss(false);

        level.after(140, function() {
          level.fadeOut(10);
        });

        level.after(150, function() {
          level.complete();
        });
      });

      bossActive = true;
      dino.boss(commando);

      level.addGameObject(commando);
      level.lockCamera(level.position().x, level.position().x + 160);
    }
  }];

  addCutscene(
    "images/levels/cutscenes/south_america.png",
    "He will be a great asset to us in assisting the Contras...",
    5000
  );

  addLevel({
    audio: "3",
    scene: scene,
    objective: "Defeat",
    objectiveImage: "images/enemies/commando/commando_thumb.png",
    platforms: [floor],
    triggers: triggers
  });
});
$(function() {
  var imgPath = "images/levels/parasail/";
  var levelVelocity = Point(-6, 0);

  var bossBattle = false;
  var bossDefeated = false;

  ThirdLaserEyeBlind = (function() {
    var count = 0;
    return function() {
      count += 1;

      if(count == 3) {
        return LaserGun();
      } else {
        return BattleAxe();
      }
    }
  }());

  function addCrate(weaponClass) {
    var crate = FloatingCrate({
      weaponClass: weaponClass,
      x: level.position().x + CANVAS_WIDTH,
      xVelocity: 1,
      y: 320
    });

    addGameObject(crate);
  }

  function addPlane(x, y, options) {
    options || (options = {
      hFlip: true,
      xVelocity: -4
    });

    level.addGameObject(Fighter($.extend({
      cooldown: 1,
      type: "fighter2",
      x: level.position().x + x,
      y: 160 + y,
    }, options)));
  }

  function addFrontFighterWave(n) {
    (n + 1).times(function(i) {
      if(i) {
        var negative = i % 2 ? -1 : 1;
        var halfI = (i / 2).floor();
        addPlane(i * 20 + CANVAS_WIDTH, negative * 40 * halfI);
      }
    });
  }

  function addRearFighterWave(n) {
    (n + 1).times(function(i) {
      if(i) {
        var negative = i % 2 ? -1 : 1;
        var halfI = (i / 2).floor();
        addPlane(-i * 20, negative * 40 * halfI, {xVelocity: 8});
      }
    });
  }

  function addFighterSquadron(n) {
    addFrontFighterWave(Math.min(n, 7));
    addRearFighterWave(Math.max(0, n - 7));
  }

  function addParasoldier(x, y) {
    level.addGameObject(Soldier({
      airborne: true,
      xVelocity: 0,
      x: level.position().x + x,
      y: -20 + y,
      yVelocity: 3
    }));
  }

  function addParasoldierFormation(n) {
    (n).times(function(i) {
      addParasoldier(580 + 45 * i, -15 * i);
    });
  }

  var boat;
  var fighterCount = 0;

  var scene = Scene([
    {
      image: Sprite.load(imgPath + "background.png"),
      parallaxRate: 0.25,
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      velocity: levelVelocity
    },
    {
      image: Sprite.load(imgPath + "midground.png"),
      parallaxRate: 0.5,
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      velocity: levelVelocity
    },
    {
      image: Sprite.load(imgPath + "foreground.png"),
      parallaxRate: 1,
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      velocity: levelVelocity
    }
  ], [
    {
      image: Sprite.load(imgPath + "water_background.png"),
      parallaxRate: 1,
      position: {
        x: 0,
        y: 320,
      },
      repeat: true,
      velocity: levelVelocity
    },
    {
      image: Sprite.load(imgPath + "water_midground.png"),
      parallaxRate: 1,
      position: {
        x: 0,
        y: 320
      },
      repeat: true,
      velocity: levelVelocity
    },
    {
      image: Sprite.load(imgPath + "water_foreground.png"),
      parallaxRate: 4,
      position: {
        x: 0,
        y: 320
      },
      repeat: true,
      velocity: levelVelocity
    }
  ]);

  var floor = Floor({
    sprite: null,
    water: true
  });

  var triggers = [{
    at: 0,
    event: function(level) {
      dino.parasailing(true);

      boat = Boat({
        x: 540,
        y: 285
      });

      level.addGameObject(boat);
    }
  }, {
    every: 100,
    event: function(level) {
      if(level.age() < 2300) {
        level.addGameObject(Ramp({
          x: level.position().x + CANVAS_WIDTH,
          xVelocity: -2,
          y: CANVAS_HEIGHT - Floor.LEVEL
        }));
      }
    }
  }, {
    every: 120,
    event: function(level) {
      if(!bossDefeated) {
        if(bossBattle) {
          addParasoldierFormation(rand(4));
        } else {
          addParasoldierFormation(2 + rand(4));
        }
      }
    }
  }, {
    every: 150,
    event: function(level) {
      if(level.age() > 0 && !bossDefeated && level.age() != 2400) {
        fighterCount += 1;

        if(bossBattle) {
          addFighterSquadron(1 + rand(3));
        } else {
          if(fighterCount == 12 || fighterCount == 13) {
            addRearFighterWave(fighterCount - 9);
          } else {
            addFighterSquadron(Math.min(fighterCount, 14));
          }
        }
      }
    }
  }, {
    every: 200,
    event: function(level) {
      if (Math.random() < 0.5 && level.age() > 0 && !bossDefeated) {
        addCrate(ThirdLaserEyeBlind);
      }
    }
  }, {
    at: 2400,
    event: function(level) {
      var gunship = Gunship();
      level.prependGameObject(gunship);

      dino.boss(gunship);
      bossBattle = true;

      level.after(20, function() {
        boat.destroy();
      });

      gunship.bind("destroy", function() {
        bossDefeated = true;

        level.after(140, function() {
          level.fadeOut(10);
        });

        level.after(150, function() {
          level.complete();

          dino.boss(false);
          dino.parasailing(false);
        });
      });
    }
  }];

  addCutscene(
    null,
    "Contrasaur, we've located your final objective. Procede to Lake Xolotlán and destroy the Floating Fortress.",
    6000
  );

  var level = addLevel({
    audio: "4",
    description: "AD 1984: Lake Xolotlán",
    objective: "Parasail",
    objectiveImage: "images/levels/parasail/sail_thumb.png",
    platforms: [floor],
    scene: scene,
    triggers: triggers
  });
});
$(function() {
  var imgPath = "images/levels/washington_dc/";

  var destroyedWhiteHouseSprite = Sprite.load('images/levels/washington_dc/whiteHouse_destroyed.png');

  var enemiesActive = true;

  function addParasoldier(x, y) {
    level.addGameObject(Soldier({
      airborne: true,
      xVelocity: 0,
      x: level.position().x + x,
      y: -20 + y,
      yVelocity: 3
    }));
  }

  function addParasoldierFormation(n, x) {
    (n).times(function(i) {
      addParasoldier(x + 45 * i, -15 * i);
    });
  }

  function addCrate(weaponClass) {
    var crate = Crate({
      weaponClass: weaponClass,
      x: level.position().x + rand(CANVAS_WIDTH) + 20,
      y: 320
    });

    addGameObject(crate);
  }

  function generateEnemies(level) {
    if (enemiesActive && rand() < 0.03) {
      var secretService = SecretService({
        hFlip: true,
        x: level.position().x + CANVAS_WIDTH + 20,
        xVelocity: -2
      });

      level.addGameObject(secretService);
    }
  }

  function generateForegroundScenary() {
    var foregrounds = [];

    (5).times(function(i) {
      foregrounds.push({
        image: Sprite.load([
          imgPath + "bush.png",
          imgPath + "hedge.png"
        ].rand()),
        parallaxRate: 1,
        position: {
          x: i * 150 + rand(50),
          y: 300 + rand(80)
        },
        every: 1000
      });
    });

    return foregrounds;
  }

  var scene = Scene(
    [{
      image: Sprite.load(imgPath + 'background.png'),
      parallaxRate: 0.25,
      position: Point(0, 0),
      repeat: true
    }, {
      image: Sprite.load(imgPath + 'midground.png'),
      parallaxRate: 0.5,
      position: Point(0, 0),
      repeat: true
    }, {
      image: Sprite.load(imgPath + 'foreground.png'),
      parallaxRate: 1,
      position: Point(0, 0),
      repeat: true
    }, {
      image: Sprite.load(imgPath + 'ground.png'),
      parallaxRate: 0,
      position: {
        x: 0,
        y: CANVAS_HEIGHT - Floor.LEVEL
      }
    }], generateForegroundScenary());

  var floor = Floor({
    sprite: Sprite.EMPTY
  });

  var triggers = [{
    at: 1000,
    event: function(level) {
      var whiteHouse = WhiteHouse({
        x: level.position().x + CANVAS_WIDTH + 100
      });

      level.addGameObject(GameObject({
        sprite: Sprite.load(imgPath + "minitreebush.png"),
        x: dino.position().x + CANVAS_WIDTH + 25,
        y: 300
      }));

      level.addGameObject(GameObject({
        sprite: Sprite.load(imgPath + "minitreebush.png"),
        x: dino.position().x + CANVAS_WIDTH - 586 - 25,
        y: 300
      }));

      dino.boss(whiteHouse);

      whiteHouse.bind('destroy', function() {
        enemiesActive = false;

        var lockPosition = whiteHouse.position().x - CANVAS_WIDTH/2;
        level.lockCamera(lockPosition - 160, lockPosition + 160);

        level.prependGameObject(Effect($.extend(whiteHouse.position(), {
          duration: -1,
          sprite: destroyedWhiteHouseSprite,
          velocity: Point()
        })));

        level.after(60, function() {
          level.dialog(DialogBox({
            avatar: roboReaganAvatar,
            text: "Do you truly think you can defeat me? I made you what you are."
          }), 150);
        });

        var roboReagan = RoboReagan({
          x: whiteHouse.position().x
        });

        dino.boss(roboReagan);

        roboReagan.bind('beamComplete', function() {
          if(rand() < 0.5) {
            addParasoldierFormation(rand(4) + 1, 160);
          } else {
            addParasoldierFormation(rand(4) + 1, 480);
          }
        });

        roboReagan.bind('destroy', function() {
          dino.boss(false);

          level.fadeOutMusic();

          level.dialog(DialogBox({
            avatar: roboReaganAvatar,
            text: "HA HA HA! This is only the beginning! You have seen but 1% of my True Power!"
          }), 150);

          level.after(130, function() {
            level.fadeOut(100);

            level.after(130, function() {
              level.complete();
            });
          });
        });

        level.addGameObject(roboReagan);
      });

      level.prependGameObject(whiteHouse);
    }
  }, {
    every: 1,
    event: function(level) {
      generateEnemies(level);
    }
  }, {
    every: 400,
    event: function(level) {
      if(level.age() > 0) {
        addCrate(Chainsaw);
      }
    }
  }];

  addCutscene(
    "images/levels/cutscenes/hero_ceremony.png",
    "To Contrasaur, the greatest of American heros, for his victory in Nicaragua",
    6000
  );

  addCutscene(
    "",
    "Later that night...",
    3000
  );

  addCutscene(
    "images/levels/cutscenes/lincoln_memorial.png",
    "Contrasaur! I know the terrible Truth behind Reagan's plan!",
    4000
  );

  addCutscene("images/levels/cutscenes/tyrannosaurus_rex.png", "?!", 1250);

  var roboReaganAvatar = Sprite.load("images/avatars/roboreagan.png");

  var level = addLevel({
    audio: "5",
    backgroundColor: "#00A800",
    description: "AD 1984: Washington D.C.",
    fadeWhite: true,
    objective: "Destroy",
    objectiveImage: 'images/levels/washington_dc/whiteHouse_thumb.png',
    platforms: [floor],
    scene: scene,
    triggers: triggers
  });

});
$(function() {
  var imgPath = "images/levels/washington_dc/sky/";

  var scene = Scene([
    {
      image: Sprite.load(imgPath + "background.png"),
      parallaxRate: 0.25,
      position: {
        x: 0,
        y: 0
      },
      sky: true
    },
    {
      image: Sprite.load(imgPath + "midground.png"),
      parallaxRate: 0.5,
      position: {
        x: 0,
        y: 0
      },
      sky: true
    }
  ], [
    {
      image: Sprite.load(imgPath + "foreground.png"),
      parallaxRate: 1,
      position: {
        x: 0,
        y: 0
      },
      sky: true
    }
  ]);

  var triggers = [
    {
      at: 0,
      event: function() {
        var finalReagan = FinalReagan();
        dino.skyBattle();
        dino.boss(finalReagan);

        level.addGameObject(finalReagan);

        finalReagan.bind('destroy', function() {
          dino.boss(false);

          level.after(150, function() {
            level.fadeOut(50);

            level.after(50, function() {
              level.complete();
            });
          });
        });
      }
    }
  ];

  var level = addLevel({
    audio: "5",
    description: "AD 1984: D.C. Sky",
    skyMode: true,
    scene: scene,
    objective: "Defeat",
    objectiveImage: "images/enemies/robo_reagan/reagan_thumb.png",
    platforms: [],
    triggers: triggers
  });

  addCutscene("images/levels/cutscenes/finale.png", "Everything is going according to plan...", 6000);
});
function Cutscene(imageURL, text, duration, avatar, completedCallback) {
  var imageTile = Sprite.load(imageURL);
  var dialogBox = DialogBox({
    text: text,
    avatar: avatar
  });
  var stopped = true;
  var intervalId;

  var self = {
    complete: function() {
      if(!stopped) {
        self.stop();

        completedCallback();
      }
    },

    draw: function(canvas) {
      imageTile.draw(canvas, (canvas.width() - imageTile.width)/2, 0);
      dialogBox.update();
      dialogBox.draw(canvas);
    },

    start: function(canvas) {
      stopped = false;

      setTimeout(function() {
        self.complete();
      }, duration);

      $("#game_info").hide();

      intervalId = setInterval(function() {
        canvas.fill("#000");
        self.draw(canvas);
      }, MILLISECONDS_PER_FRAME);
    },

    stop: function() {
      clearInterval(intervalId);
      stopped = true;
    }
  };

  return self;
}
debugCounts = false;
hideBackgrounds = false;

function Level(I) {
  var position = {
    x: 0,
    y: 0
  };

  var gameObjects = [];
  var gameObjectsQueue = [];
  var prependGameObjectsQueue = [];
  var oldEnemies = [];
  var collidables;

  var step = 0;
  var paused = false;
  var intervalId;

  var fadeAmount = 0;
  var fadeDuration;
  var fadeStart;

  var dialogStop;
  var displayDialog;

  var prevDelta = 0;

  var cameraLock = {
    min: -Infinity,
    max: Infinity
  };

  $.reverseMerge(I, {
    backgroundColor: "#A2EEFF",
    textColor: "#FFF",
    triggers: []
  });

  function BGMusic(name) {
    var format = $.browser.webkit ? ".mp3" : ".ogg";
    var audio = $('<audio loop src="audio/' + name + format + '"></audio>').appendTo('#game_container');

    return {
      fadeOut: function() {
        audio.animate({volume: 0}, 5000, function() {
          this.pause();
        });
      },

      play: function() {
        try {
          audio.get(0).play();
        } catch(e) {
          console.log(e);
        }
      },

      pause: function() {
        try {
          audio.get(0).pause();
        } catch(e) {
          console.log(e);
        }
      }
    };
  }

  if (I.audio) {
    var backgroundMusic = BGMusic(I.audio);
  }

  function activateTriggers() {
    $.each(I.triggers, function(i, trigger) {
      if(step === trigger.at) {
        trigger.event(self);
      }

      if(trigger.every && step % trigger.every == 0) {
        trigger.event(self);
      }
    });
  }

  function trackDino() {
    if(dino.parasailing()) {
      position.x += 4;
    } else {
      var dinoVelocity = dino.velocity();
      var dinoPosition = dino.position();

      var weightedX = dinoPosition.x + (1.25 * dinoVelocity.x * dinoVelocity.x * dinoVelocity.x.sign());

      var wiggle = 80;
      var screenCenterX = position.x + CANVAS_WIDTH / 2;

      var delta = 0;

      if(weightedX > screenCenterX + wiggle) {
        delta = ((weightedX - wiggle) - CANVAS_WIDTH / 2) - position.x;
      } else if(weightedX < screenCenterX - wiggle) {
        delta = (weightedX + wiggle) - CANVAS_WIDTH / 2 - position.x;
      }

      delta = delta.clamp(-2 + prevDelta, 2 + prevDelta);

      var oldPosition = position.x;

      position.x += delta;
      position.x = position.x.clamp(cameraLock.min, cameraLock.max);

      prevDelta = position.x - oldPosition;

      if(I.skyMode) {
        position.y = (dinoPosition.y - CANVAS_HEIGHT / 2).clamp(0, 5390 - CANVAS_HEIGHT);
      }
    }
  }

  function getTransform() {
    return Matrix.translation(-position.x, -position.y);
  }

  function draw(canvas) {
    // Draw Backgrounds
    canvas.fill(I.backgroundColor);

    if(!hideBackgrounds) {
      I.scene.drawBackgrounds(position, canvas);
    }

    canvas.withTransform(getTransform(), function() {
      $.each(gameObjects, function(i, gameObject) {
        gameObject.draw(canvas);
      });
    });

    if(!hideBackgrounds) {
      I.scene.drawForegrounds(position, canvas);
    }

    // Draw Overlays
    if(I.description) {
      var textMargin = 12;
      var descriptionWidth = canvas.measureText(I.description);

      // Draw drop-shadow and description text
      canvas.fillColor("#000");
      canvas.fillText(I.description, CANVAS_WIDTH - (descriptionWidth + textMargin) + 1, CANVAS_HEIGHT - textMargin + 1);
      canvas.fillColor(I.textColor);
      canvas.fillText(I.description, CANVAS_WIDTH - (descriptionWidth + textMargin), CANVAS_HEIGHT - textMargin);
    }

    if(displayDialog) {
      if (displayDialog.update) {
        displayDialog.update();
      }
      displayDialog.draw(canvas);
    }

    if(fadeAmount != 0) {
      var fadeColor;
      if(I.fadeWhite) {
        fadeColor = "rgba(255, 255, 255, " + fadeAmount.clamp(0, 1) + ")";
      } else {
        fadeColor = "rgba(0, 0, 0, " + fadeAmount.clamp(0, 1) + ")";
      }

      canvas.fill(fadeColor);
    }
  }

  function resetCollidables() {
    collidables = {
      platform: [],
      enemy: [],
      enemyBullet: [],
      dino: [],
      dinoBullet: [],
      biteTrigger: [],
      levelHazard: []
    };
  }

  function handleCollisions(collidables) {
    // Most things can hit platforms
    $.each(collidables.platform, function(i, platform) {
      $.each(collidables.enemyBullet, function(j, bullet) {
        planeCollision(bullet, platform);
      });

      $.each(collidables.dinoBullet, function(j, bullet) {
        planeCollision(bullet, platform);
      });

      $.each(collidables.enemy, function(j, enemy) {
        planeCollision(enemy, platform);
      });

      $.each(collidables.dino, function(j, dino) {
        planeCollision(dino, platform);
      });
    });

    // Enemy bullets can hit dinos
    $.each(collidables.enemyBullet, function(i, bullet) {
      $.each(collidables.dino, function(j, dino) {
        circleCollision(bullet, dino);
      });
    });

    // Level hazards can hit everything
    $.each(collidables.levelHazard, function(i, bullet) {
      $.each(collidables.dino, function(j, dino) {
        circleCollision(bullet, dino);
      });

      $.each(collidables.enemy, function(j, enemy) {
        circleCollision(bullet, enemy);
      });

      $.each(collidables.platform, function(i, platform) {
        planeCollision(bullet, platform);
      });
    });

    // Dino bullets can hit enemies
    $.each(collidables.dinoBullet, function(i, bullet) {
      $.each(collidables.enemy, function(j, enemy) {
        circleCollision(bullet, enemy);
      });
    });

    // Bite triggers can hit enemies
    $.each(collidables.biteTrigger, function(i, bullet) {
      $.each(collidables.enemy, function(j, enemy) {
        circleCollision(bullet, enemy);
      });
    });
  }

  resetCollidables();

  var self = {
    addGameObject: function(gameObject) {
      gameObjectsQueue.push(gameObject);
    },

    prependGameObject: function(gameObject) {
      prependGameObjectsQueue.push(gameObject);
    },

    after: function(steps, fn) {
      I.triggers.push({
        at: step + steps,
        event: fn
      })
    },

    age: function() {
      return step;
    },

    complete: function() {
      self.stop();

      I.completed();
    },

    debugCounts: function() {
      var results = {};
      $.each(collidables, function(key, value) {
        results[key] = value.length;
      });

      return results;
    },

    dialog: function(dialog, duration) {
      duration = duration || 100;

      displayDialog = dialog;
      dialogStop = step + duration;
    },

    enemies: function() {
      return oldEnemies;
    },

    fadeOut: function(duration) {
      fadeStart = step;
      fadeDuration = duration;
    },

    fadeOutMusic: function() {
      if (backgroundMusic) {
        backgroundMusic.fadeOut();
      }
    },

    lockCamera: function(min, max) {
      cameraLock.min = min;
      cameraLock.max = max;
    },

    unlockCamera: function() {
      cameraLock.min = -Infinity;
      cameraLock.max = Infinity;
    },

    position: function() {
      return position;
    },

    nearestEnemy: function(currentPosition) {
      return self.nearestTarget(currentPosition, "dinoBullet");
    },

    nearestTarget: function(currentPosition, collisionType) {
      var selection = [];

      if(collisionType == "enemyBullet") {
        selection = collidables.dino;
      } else if(collisionType == "dinoBullet") {
        selection = self.enemies();
      }

      var nearest;
      var nearestDistance;

      $.each(selection, function(i, target) {
        var targetDistance = Point.distance(currentPosition, target.position());
        if(nearest) {
          if(nearestDistance > targetDistance) {
            nearest = target;
            nearestDistance = targetDistance;
          }
        } else {
          nearest = target;
          nearestDistance = targetDistance;
        }
      });

      return nearest;
    },

    start: function() {
      $("#game_info").show();
      $("#level_objectives").delay(4500).fadeIn('fast').delay(1800).fadeOut('slow');

      if (backgroundMusic) {
        backgroundMusic.play();
        $('#level_objectives img').remove();

        if(I.objectiveImage) {
          $('<img src=' + I.objectiveImage + '>').appendTo('#level_objectives');
        }
        $('#level_objectives span').remove();
        if(I.objective) {
          $('<span>' + I.objective + '</span>').appendTo('#level_objectives');
        }
      }

      dino.position(Point(CANVAS_WIDTH / 2, dino.position().y));

      intervalId = setInterval(function() {
        if (paused) {
          return;
        }
        activateTriggers();
        self.trigger("beforeStep");
        self.step();
        self.trigger("afterStep");
        step++;
      }, MILLISECONDS_PER_FRAME);
    },

    stop: function() {
      self.fadeOutMusic();

      clearInterval(intervalId);
    },

    step: function() {
      if (debugHalt) {
        debugger;
      }

      I.scene.update();

      resetCollidables();

      var liveGameObjects = [];
      $.each(gameObjects, function(i, gameObject) {
        gameObject.update(position);

        if(gameObject.active()) {
          liveGameObjects.push(gameObject);

          // Add to hit detection queues
          if(collidables[gameObject.collisionType()]) {
            collidables[gameObject.collisionType()].push(gameObject);
          }
        }
      });
      gameObjects = liveGameObjects;

      handleCollisions(collidables);

      // Add Queued Game Objects
      Array.prototype.unshift.apply(gameObjects, prependGameObjectsQueue);
      prependGameObjectsQueue = [];
      Array.prototype.push.apply(gameObjects, gameObjectsQueue);
      gameObjectsQueue = [];

      trackDino();

      // Update fade
      if(fadeStart) {
        fadeAmount = (step - fadeStart) / fadeDuration;
      }

      // TODO: Move this somewhere
      score += collidables.dinoBullet.length;

      oldEnemies = collidables.enemy;

      // Update debug
      if(debugCounts) {
        var html = "";
        $.each(self.debugCounts(), function(key, value) {
          html += key + ": " + value + "<br />"
        });

        $("#debug").html(html);
      }

      // Update dialogs
      if(step > dialogStop) {
        displayDialog = null;
      }

      updateTarget();

      draw(canvas);
    },

    continuePause: function() {
      backgroundMusic.pause();
      paused = true;
    },

    continueResume: function() {
      backgroundMusic.play();
      paused = false;
    },

    togglePause: function() {
      paused = !paused;

      if(paused) {
        backgroundMusic.pause();
      } else {
        backgroundMusic.play();
      }

      return paused;
    }
  };

  $.extend(self, Bindable());

  $.each(I.platforms, function(i, platform) {
    self.addGameObject(platform);
  });

  return self;
}
function Scene(backgrounds, foregrounds) {
  function drawLayersGenerator(layers) {
    return function(position, canvas) {
      $.each(layers, function(i, layer) {
        var x = layer.position.x - (position.x * layer.parallaxRate);
        var y = layer.position.y - (position.y * layer.parallaxRate);

        var imgHeight = layer.image.height;
        var imgWidth = layer.image.width;
        var x1 = Math.floor(Math.mod(-x, imgWidth));
        var x2 = Math.ceil(Math.mod(-x + CANVAS_WIDTH, imgWidth));

        if(layer.repeat) {
          if(x2 < x1) {
            if(CANVAS_WIDTH - x2 > 0) {
              layer.image.draw(canvas, 0, y, x1, 0, CANVAS_WIDTH - x2);
            }
            layer.image.draw(canvas, CANVAS_WIDTH - x2, y, 0, 0, x2);
          } else {
            layer.image.draw(canvas, 0, y, x1, 0, CANVAS_WIDTH);
          }
        } else if(layer.sky) {
          y = y.ceil();

          var sHeight = Math.min(CANVAS_HEIGHT, imgHeight + y);

          if(sHeight <= 0) {
            return;
          }

          if(x2 < x1) {
            if(CANVAS_WIDTH - x2 > 0) {
              layer.image.draw(canvas, 0, 0, x1, -y, CANVAS_WIDTH - x2, sHeight);
            }
            layer.image.draw(canvas, CANVAS_WIDTH - x2, 0, 0, -y, x2, sHeight);
          } else {
            layer.image.draw(canvas, 0, 0, x1, -y, CANVAS_WIDTH, sHeight);
          }
        } else if(layer.every) {
          x1 = Math.floor(Math.mod(x, layer.every));
          x2 = Math.ceil(Math.mod(x + imgWidth, layer.every));

          if(x1 < CANVAS_WIDTH) {
            layer.image.draw(canvas, x1, y);
          }

          // TODO: This is grody.
          if(x2 > 0 && x2 < x1) {
            var r = Math.mod(-x2, imgWidth);
            layer.image.draw(canvas, 0, y, r, 0, imgWidth - r);
          }
        } else {
          x = layer.position.x;
          y = layer.position.y;

          layer.image.draw(canvas, x, y);
        }
      });
    }
  }

  function updateIterator(i, layer) {
    if(layer.velocity) {
      layer.position.x += layer.velocity.x;
      layer.position.y += layer.velocity.y;
    }
  }

  return {
    drawBackgrounds: drawLayersGenerator(backgrounds),
    drawForegrounds: drawLayersGenerator(foregrounds),
    update: function() {
      $.each(backgrounds, updateIterator);
      $.each(foregrounds, updateIterator);
    }
  };
}
function Bomb(I) {
  I = I || {};

  var bombTile = Sprite.load("images/projectiles/bomb.png");

  $.reverseMerge(I, {
    collideDamage: 0,
    radius: 8,
    sprite: bombTile,
    xVelocity: I.xVelocity,
    yAcceleration: GRAVITY,
    yVelocity: 0
  });

  function explode() {
    if(I.active) {
      I.active = false;
      addGameObject(Explosion({x: I.x, y: I.y - 50}));
    }
  }

  var self = Bullet(I).extend({
    getTransform: GameObject.velocityGetTransform(I),

    hit: $.noop,

    land: function() {
      explode();
    }
  });

  return self;
}
function Bullet(I) {
  I = I || {}

   $.reverseMerge(I, {
     speed: 10,
     theta: 0
   });

  $.reverseMerge(I, {
    collideDamage: 1,
    collisionType: "dinoBullet",
    damageType: "normal",
    dispersion: 0,
    effectCount: 1,
    radius: 2,
    sprite: Sprite.load("images/projectiles/playerbullet.png"),
    xVelocity: Math.cos(I.theta)*I.speed,
    yVelocity: Math.sin(I.theta)*I.speed,
    yAcceleration: 0
  });

  var self = GameObject(I).extend({
    getTransform: GameObject.velocityGetTransform(I),

    hit: function(other) {
      I.health = I.health - other.collideDamage();

      if (I.health <= 0) {
        self.destroy();
        addScore(I.pointsWorth);
      }
    },

    land: function() {
      I.active = false;
    },

    before: {
      update: function() {
        I.yVelocity += I.yAcceleration;
      }
    },

    after: {
      hit: function(other) {
        if(other.bulletHitEffect) {
          other.bulletHitEffect(self);
        }
      },

      update: GameObject.generateCheckBounds(I)
    }
  });

  self.attrReader('damageType', 'dispersion', 'effectCount');

  return self;
}
function EnergyBeam(I) {
  I = I || {};

  $.reverseMerge(I, {
    collisionType: 'enemyBullet',
    health: Infinity,
    radius: 8,
    speed: 14,
    sprite: Sprite.load('images/projectiles/beam.png'),
    theta: Math.PI / 2
  });

  var self = Bullet(I).extend({

  });

  return self;
}
function Explodable(I) {

  function explode() {
    if(I.active) {
      I.active = false;
      addGameObject(Explosion({
        x: I.x,
        y: I.y,
        collisionType: I.collisionType,
        duration: 10,
        sprite: loadAnimation("images/effects/small_explosion.png", 5, 44, 41, 2)
      }));
    }
  }

  return {
    before: {
      hit: function() {
        explode();
      }
    }
  };
}
function Explosion(I) {
  I = I || {};

  $.reverseMerge(I, {
    collideDamage: 1,
    collisionType: "enemyBullet",
    duration: 21,
    height: 171,
    hitCircles: [{"x": 0, "y": 20, "radius": 25}, {"x": 0, "y": -40, "radius": 25}],
    radius: 20,
    sound: "explosion",
    sprite: loadAnimation("images/effects/tall_explosion.png", 11, 48, 110, 2),
    width: 67
  });

  var self = GameObject(I).extend({
    hit: $.noop,

    after: {
      update: function() {
        if(I.age > 6) {
          I.collideDamage = 0;
        }

        if(I.age > I.duration) {
          I.active = false;
          self.trigger('complete');
        }
      }
    }
  });

  Sound.play(I.sound, 1);

  return self;
}
function Flame(I) {
  I = I || {};

  $.reverseMerge(I, {
    theta: Math.PI/4
  });

  $.reverseMerge(I, {
    collideDamage: 0,
    damageType: "fire",
    duration: 20,
    sprite: Sprite.load("images/projectiles/flame.png"),
    radius: 18
  });

  var self = Bullet(I).extend({
    land: $.noop,

    hit: function(other) {
      if(other.burn) {
        other.burn(self);
      }
    }
  });

  return self;
}
function Flare(I) {
  I = I || {};

  $.reverseMerge(I, {
    collideDamage: 0,
    collisionType: "enemy",
    contactTrigger: false,
    explosionDamage: 10,
    fuse: 20,
    rotation: 0,
    rotationalVelocity: Math.PI / 32,
    speed: 15,
    sprite: Sprite.load("images/projectiles/grenade.png")
  });

  function detonate() {
    if(I.active) {
      I.active = false;
      addGameObject(FlareExplosion({
        x: I.x,
        y: I.y - 50
      }));
    }
  }

  var self = Bullet(I).extend({
    land: $.noop,

    hit: $.noop,

    after: {
      update: function() {
        I.rotation += I.rotationalVelocity;
        I.yVelocity += GRAVITY;

        if(I.age > I.fuse) {
          detonate();
        }
      }
    }
  });
  return self;
}
function FlareExplosion(I) {
  I = I || {};

  $.reverseMerge(I, {
    collideDamage: 1,
    collisionType: "enemy",
    duration: 200,
    sprite: loadAnimation("images/effects/small_explosion.png", 5, 44, 41, 2)
  });

  var self = GameObject(I).extend({
    hit: $.noop,

    after: {
      update: function() {
        if(I.age > 6) {
          I.collideDamage = 0;
        }

        // if(I.age > I.duration) {
        //   I.active = false;
        //   self.trigger('complete');
        // }
      }
    }
  });

  Sound.play(I.sound, 1);

  return self;
}
function Grenade(I) {
  I = I || {};

  $.reverseMerge(I, {
    collideDamage: 0,
    contactTrigger: true,
    explosionDamage: 10,
    fuse: 45,
    radius: 8,
    rotation: 0,
    rotationalVelocity: Math.PI / 32,
    speed: 5,
    sprite: Sprite.load("images/projectiles/grenade.png")
  });

  function detonate() {
    if(I.active) {
      I.active = false;
      addGameObject(Explosion({
        collideDamage: I.explosionDamage,
        collisionType: I.collisionType,
        sprite: loadAnimation("images/effects/large_explosion.png", 27, 124, 98, 3),
        x: I.x,
        y: I.y - 50
      }));
    }
  }

  var self = Bullet(I).extend({
    getTransform: GameObject.rotationGetTransform(I),

    land: function() {
      detonate();
    },

    hit: function() {
      if(I.contactTrigger) {
        detonate();
      }
    },

    after: {
      update: function() {
        I.rotation += I.rotationalVelocity;
        I.yVelocity += GRAVITY;

        if(I.age > I.fuse) {
          detonate();
        }
      }
    }
  });
  return self;
}
function HomingMissile(I) {
  I = I || {};

  $.reverseMerge(I, {
    collideDamage: 5,
    getDirection: function() {
      var direction;
      var target = currentLevel.nearestTarget(self.position(), I.collisionType);
      if(target) {
        var targetPosition = target.position();

        direction = Math.atan2(
          targetPosition.y - I.y,
          targetPosition.x - I.x
        );
      } else {
        direction = Math.atan2(I.yVelocity, I.xVelocity);
      }

      return direction;
    },
    radius: 5,
    speed: 5,
    sprite: Sprite.load("images/projectiles/homing_missile.png")
  });

  var self = Bullet(I).extend({
    after: {
      update: function() {
        var direction = I.getDirection();
        if(direction) {
          I.xVelocity = (I.xVelocity * 0.95) + Math.cos(direction);
          I.yVelocity = (I.yVelocity * 0.95) + Math.sin(direction);
        }
      }
    }
  });

  self.extend(Explodable(I));

  return self;
}
function Laser(I) {
  I = I || {};

  $.reverseMerge(I, {
    speed: 15,
    theta: 0
  });

  $.reverseMerge(I, {
    amplitude: 10,
    collideDamage: 3,
    health: Infinity,
    hitCircles: [{"x": -15, "y": 0, "radius": 3}, {"x": 0, "y": 0, "radius": 3}, {"x": 15, "y": 0, "radius": 3}],
    radius: 2,
    sprite: Sprite.load("images/projectiles/laser.png")
  });

  var self = Bullet(I).extend({
    before: {
      update: function() {
        var point = Point(0, I.amplitude*Math.sin(I.age));
        self.position(self.getTransform().transformPoint(point));
      }
    }
  });

  return self;
}
function Meteor(I) {
  I = I || {};

  var meteorA = loadAnimation("images/levels/prehistoric/meteorA.png", 4, 50, 30);
  var meteorB = loadAnimation("images/levels/prehistoric/meteorB.png", 4, 50, 30);

  $.reverseMerge(I, {
    width: 50,
    health: 1,
    height: 30,
    radius: 15,
    collideDamage: 5,
    collisionType: "levelHazard",
    xVelocity: [
      3,
      -3
    ].rand(),
    yVelocity: 5,
    sprite: meteorA
  })

  var self = Bullet(I).extend({
    explode: function() {
      addGameObject(Explosion({
        x: I.x,
        y: I.y,
        collisionType: "enemyBullet",
        duration: 10,
        sprite: loadAnimation("images/effects/small_explosion.png", 5, 44, 41, 2)
      }));
    },

    after: {
      hit: function(other) {
        self.trigger('destroy');
      },
      land: function() {
        self.trigger('destroy');
      },
      update: function() {
        I.sprite = I.xVelocity < 0 ? meteorA : meteorB;
        I.yVelocity += GRAVITY/2;
      }
    }
  });

  self.bind('destroy', function() {
    self.explode();
  });

  return self;
}
function Missile(I) {
  var speed = 3;

  $.reverseMerge(I, {
    radius: 8,
    collideDamage: 40,
    sprite: Sprite.load("images/projectiles/missile.png")
  });

  var self = Bullet(I).extend({
    after: {
      update: function() {
        I.xVelocity = I.xVelocity * 1.1;
        I.yVelocity = I.yVelocity * 1.1;
      }
    }
  });

  self.extend(Explodable(I));

  return self;
}
function ThrownItem(I) {
  I = I || {};

  var position = dino.position();
  var levelPosition = currentLevel.position();

  var throwAngle = Point.direction(position, target.add(levelPosition));

  var throwSpeed = Point.distance(position, target.add(levelPosition)) / 10;

  $.reverseMerge(I, {
    speed: throwSpeed,
    theta: throwAngle,
    weaponName: "battleAxe"
  });

  $.reverseMerge(I, {
    collideDamage: 20,
    collisionType: "dinoBullet",
    explodeDamage: 20,
    radius: 30,
    rotation: 0,
    rotationalVelocity: Math.PI/10,
    shoot: $.noop,
    sprite: Sprite.load("images/weapons/" + I.weaponName + ".png")
  });

  function detonate() {
    if(I.active) {
      I.active = false;
      addGameObject(Explosion({
        collideDamage: I.explodeDamage,
        collisionType: "dinoBullet",
        sprite: loadAnimation("images/effects/small_explosion.png", 5, 44, 41, 2),
        x: I.x + 10,
        y: I.y
      }));
    }
  }

  var self = Bullet(I).extend({
    getTransform: GameObject.rotationGetTransform(I),

    land: function() {
      I.active = false;
    },

    before: {
      hit: function(other) {
        detonate();
      },

      update: function() {
        I.rotation += I.rotationalVelocity;
        I.yVelocity += GRAVITY;
        I.shoot(I);
      }
    }
  });

  return self;
}
function Circle(x, y, radius) {
  return {
    x: x,
    y: y,
    radius: radius,
    randomPoint: function() {
      var m = Math.max(rand(), rand()) * this.radius;
      var theta = rand() * 2 * Math.PI;

      return Point(m * Math.cos(theta) + this.x, m * Math.sin(theta) + this.y);
    }
  }
}

Circle.randomPoint = function(radius) {
  return Circle(0, 0, radius).randomPoint();
};

// Need to test patched jQuery more

//Object.prototype.each = function(iterator) {
//  for(var key in this) {
//    if(this.hasOwnProperty(key)) {
//      iterator(key, this[key]);
//    }
//  }
//
//  return this;
//};
//
//Object.prototype.merge = function(source) {
//  for(var key in source) {
//    if(source.hasOwnProperty(key)) {
//      this[key] = source[key];
//    }
//  }
//
//  return this;
//};
//
//Object.prototype.reverseMerge = function(source) {
//  for(var key in source) {
//    if(source.hasOwnProperty(key) && !(key in this)) {
//      this[key] = source[key];
//    }
//  }
//
//  return this;
//};
function Accessory(I) {
  I = I || {};

  $.reverseMerge(I, {
    attachment: "hand",
    direction: 0,
    hitCircles: [],
    rotation: 0
  });

  var self = GameObject(I).extend({
    attachment: function(model) {
      var attachmentPoint = model.attachment(I.attachment);

      self.position(attachmentPoint);
      I.direction = attachmentPoint.direction || 0;
    },

    getTransform: function() {
      return Matrix.rotation(I.rotation + I.direction).translate(I.x, I.y);
    },

    toss: $.noop
  });

  return self;
}function BattleAxe(I) {
  I = I || {};

  $.reverseMerge(I, {
    ammo: 600,
    autofire: true,
    exitPoints: [Point(10, -30)],
    name: "battleAxe",
    radius: 5,
    theta: 0,
    throwable: {}
  });

  var self = Weapon(I).extend({
    getTransform: function() {
      return Matrix.rotation(I.theta, Point(60, 0)).concat(Matrix.translation(70, -50));
    },

    generateProjectile: function(direction, position) {
      return Bullet({
        duration: 1,
        speed: 0,
        sprite: Sprite.EMPTY,
        radius: 20,
        theta: direction,
        x: position.x,
        y: position.y
      });
    },

    before: {
      update: function() {
        if(I.ammo <= 0) {
          self.toss();
        }

        I.theta = Math.sin(I.age / 4) * (Math.PI / 2) + Math.PI / 4;
      }
    }
  });

  return self;
}
function Chainsaw(I) {
  I = I || {};

  $.reverseMerge(I, {
    ammo: 2100,
    autofire: true,
    duration: 1000,
    exitPoints: [Point(5, 10), Point(25, 10), Point(45, 10)],
    name: "chainsaw",
    offset: Point(50, -5),
    radius: 5,
    rotation: 0,
    rotationPoint: Point(-52, -12),
    throwable: {}
  });

  var self = Weapon(I).extend({
    getTransform: function() {
      var p = self.position().add(I.offset);
      return Matrix.rotation(I.rotation + I.direction, I.rotationPoint).translate(p.x, p.y);
    },

    generateProjectile: function(direction, position) {
      return Bullet({
        collideDamage: 3,
        dispersion: 30,
        duration: 1,
        effectCount: 7,
        speed: 0,
        sprite: Sprite.EMPTY,
        radius: 10,
        theta: direction,
        x: position.x,
        y: position.y
      }).extend({
        before: {
          hit: function(other) {
            if(other.chop) {
              other.chop();
            }
          }
        }
      });
    },

    before: {
      update: function() {
        if(I.ammo <= 0) {
          self.toss();
        }

        I.rotation = Math.sin(I.age / 4) * (Math.PI / 6) + (Math.PI / 12);
      }
    }
  });

  return self;
}
function Flamethrower(I) {
  I = I || {};

  $.reverseMerge(I, {
    ammo: Infinity,
    attachment: "jaw",
    cooldown: 6,
    exitPoints: [Point(25, 0)],
    name: "flamethrower",
    sprite: Animation.load({
      url: "images/weapons/flame_jaw.png",
      frames: 2,
      width: 58,
      height: 31,
      delay: 3
    })
  });

  var self = Weapon(I).extend({
    generateProjectile: function(direction, position) {
      Sound.play("flame");
      return Flame({ theta: direction, x: position.x, y: position.y });
    }
  });
  return self;
}
function Jetpack(I) {
  I = I || {};

  var fireSprite = Animation.load({
    url: "images/weapons/jetpack_fire.png",
    frames: 4,
    width: 91,
    height: 89,
    delay: 2
  });
  var jetpackSprite = Sprite.load("images/weapons/jetpack.png");

  var acceleration = 0;
  var keyDown = I.keyDown;

  var keyImpulses = {
    left: Point(-0.5, 0),
    right: Point(0.5, 0),
    up: Point(0, -1.25),
    down: Point()
  };

  $.reverseMerge(I, {
    attachment: "back",
    duration: -1,
    name: "jetpack",
    sprite: jetpackSprite
  });

  var self = Weapon(I).extend({
    data: $.noop,

    shoot: $.noop,

    update: function() {
      var impulse = Point(0, 0);
      $.each(keyImpulses, function(key, value) {
        if (keyDown[key]) {
          impulse = impulse.add(value);
        }
      });

      if (dino.airborne()) {
        var jetpackAngle = dino.jetpackAngle();
        if(jetpackAngle != 0) {
          jetpackAngle = jetpackAngle * 0.95;
        }

        if (impulse.x < 0) {
          acceleration = -0.2;
          jetpackAngle = (jetpackAngle - Math.PI/256).clamp(-Math.PI/12, Math.PI/12);
        } else if (impulse.x > 0) {
          acceleration = 0.2
          jetpackAngle = (jetpackAngle + Math.PI/256).clamp(-Math.PI/12, Math.PI/12);
        }

        dino.jetpackAngle(jetpackAngle);
        dino.xVelocity((dino.xVelocity() + impulse.x + acceleration).clamp(-10, 10));
      }

      if (dino.currentState() !== dino.states().bite) {
        dino.yVelocity((dino.yVelocity() + impulse.y).clamp(-10, 20));
      }

      if (impulse.y < 0) {
        if (dino.xVelocity() < 0) {
          dino.jetpackAngle((dino.jetpackAngle() + Math.PI/256).clamp(-Math.PI/12, Math.PI/12));
        }

        if (dino.xVelocity() > 0) {
          dino.jetpackAngle((dino.jetpackAngle() - Math.PI/256).clamp(-Math.PI/12, Math.PI/12));
        }
      }

      if (Math.abs(impulse.y < 0)) {
        dino.airborne(true);
      }

      if (Math.abs(impulse.x) > 0 || impulse.y < 0) {
        dino.jetpackOn(true);
      } else {
        dino.jetpackOn(false);
        acceleration = 0;
      }

      fireSprite.update();

      if(dino.jetpackOn() && dino.airborne()) {
        var p = dino.getTransform().transformPoint(Point(-20, 20).add(self.position()));
        var jetFlame = Bullet({
          collideDamage: 20,
          damageType: "fire",
          effectCount: 0,
          duration: 1,
          radius: 20,
          speed: 0,
          sprite: Sprite.EMPTY,
          x: p.x,
          y: p.y
        }).extend({
          before: {
            hit: function(other) {
              if(other.burn) {
                other.burn(jetFlame);
              }
            }
          }
        });

        addGameObject(jetFlame);
      }
    },

    after: {
      draw: function(canvas) {
        canvas.withTransform(self.getTransform(), function() {
          if (dino.jetpackOn() && dino.airborne()) {
            fireSprite.draw(canvas, -I.sprite.width/2, -I.sprite.height/2);
          }
        });
      }
    }
  });

  return self;
}
function LaserGun(I) {
  I = I || {};

  var monocle = Animation.load({
    url: "images/weapons/laser_eye.png",
    frames: 4,
    width: 28,
    height: 26,
    delay: 4
  });

  $.reverseMerge(I, {
    ammo: Infinity,
    attachment: "eye",
    cooldown: 12,
    exitPoints: [Point(5, 2)],
    name: "laserGun",
    power: 0,
    radius: 5,
    sprite: monocle
  });

  var self = Weapon(I).extend({
    generateProjectile: function(direction, position) {
      Sound.play("laserGun", 1);

      return Bullet({
        speed: 15,
        collideDamage: 3,
        health: 5000,
        hitCircles: [{"x": -15, "y": 0, "radius": 3}, {"x": 0, "y": 0, "radius": 3}, {"x": 15, "y": 0, "radius": 3}],
        sprite: Sprite.load("images/projectiles/laser.png"),
        theta: direction,
        x: position.x,
        y: position.y
      });
    }
  });

  return self;
}
function MachineGun(I) {
  I = I || {};

  var jitter = Math.PI / 12;
  var dinoTransform = Matrix.IDENTITY;

  $.reverseMerge(I, {
    ammo: Infinity,
    exitPoints: [Point(50, 1)],
    name: "machineGun"
  });

  // Adjust machine gun angle
  function updateGunAngle(dino, levelPosition) {
    var t = dino.getTransform().concat(self.getTransform());
    var position = t.transformPoint(Point(0, 0));
    var displacement = 0;

    if(shooting) {
      if(I.ammo > 0) {
        displacement = rand() * jitter - jitter / 2;
      } else {
        Sound.play("no_ammo");
      }
    }

    I.rotation = Point.direction(position, target.add(levelPosition)) + displacement;
  }

  var self = Weapon(I).extend({
    generateProjectile: function(direction, position, centerDirection) {
      Sound.play(I.name, 1);

      return Bullet({
        theta: centerDirection,
        x: position.x,
        y: position.y
      });
    },

    getTransform: function() {
      var position = dinoTransform.transformPoint(self.position());

      return dinoTransform.inverse().concat(Matrix.rotation(I.rotation).translate(position.x, position.y));
    },

    before: {
      update: function(dino, levelPosition) {
        dinoTransform = dino.getTransform();

        updateGunAngle(dino, levelPosition);
      }
    }
  });
  return self;
}
function Meat(I) {
  I = I || {};

  var healthPerUpdate = 3;

  $.reverseMerge(I, {
    ammoSprite: Sprite.EMPTY,
    duration: 50,
    exitPoints: [],
    name: "meat",
    sprite: Sprite.EMPTY
  });

  var self = Weapon(I).extend({
    before: {
      update: function(dino) {
        dino.heal(healthPerUpdate);
      },
    },
    data: $.noop,
    draw: $.noop
  });

  return self;
}
function MissileLauncher(I) {
  I = I || {};

  $.reverseMerge(I, {
    ammo: Infinity,
    attachment: "back",
    cooldown: 6,
    exitMode: "cycle",
    exitPoints: [Point(20, -36), Point(24, -26), Point(30, -37), Point(34, -28), Point(40, -29), Point(38, -37)],
    name: "missileLauncher",
    power: 10
  });

  var self = Weapon(I).extend({
    generateProjectile: function(direction, position) {
      $.extend(position, {
        theta: direction
      });

      return HomingMissile(position);
    }
  });
  return self;
}
function Weapon(I) {
  I = I || {};

  $.reverseMerge(I, {
    autofire: false,
    cooldown: 0,
    delay: 0,
    exitMode: "all",
    exitPoints: [Point(0, 0)],
    selectable: false,
    primaryFn: function(direction, localPosition, centerDirection) {
      addGameObject(self.generateProjectile(direction, localPosition, centerDirection));
    },
    secondaryFn: toss,
    theta: 0,
    throwable: false
  });

  I.sprite = I.sprite || Sprite.load("images/weapons/" + I.name + ".png");

  var lastPoint = -1;
  var targetPosition = 0;

  function toss() {
    if(I.throwable) {
      I.active = false;

      var position = dino.position();
      // TODO: Targeted throws

      addGameObject(ThrownItem($.extend({
        weaponName: I.name,
        x: position.x,
        y: position.y
      }, I.throwable)));

      return true;
    } else {
      return false;
    }
  }

  var self = Accessory(I).extend({
    generateProjectile: function(direction, position) {
      return Bullet({ theta: direction, x: position.x, y: position.y });
    },

    name: function() {
      return I.name;
    },

    shoot: function(position, transform, mode) {
      if(I.ammo > 0) {
        lastPoint++;

        var points;
        var t = transform.concat(self.getTransform());
        var center = t.transformPoint(Point(0, 0));

        if(I.exitMode == "cycle") {
          lastPoint = Math.mod(lastPoint, I.exitPoints.length);
          points = [I.exitPoints[lastPoint]];
        } else {
          points = I.exitPoints;
        }

        $.each(points, function(i, exitPoint) {
          var localPosition = t.transformPoint(exitPoint);
          var direction = Point.direction(localPosition, targetPosition);
          var centerDirection = Point.direction(center, localPosition);

          if (mode == 'primary') {
            I.primaryFn(direction, localPosition, centerDirection);
            I.ammo--;
          } else if (mode == 'secondary') {
            I.secondaryFn(direction, localPosition, centerDirection);
          }
        });
      }
    },

    toss: toss,

    before: {
      update: function(dino, levelPosition) {
        targetPosition = target.add(levelPosition);

        if(I.ammo <= 0 && I.name != 'machineGun') {
          I.active = false;
        }
      }
    },

    after: {
      update: function(dino) {
        if(I.delay > 0) {
          I.delay--;
        } else {
          if(shooting || I.autofire) {
            self.shoot(dino.position(), dino.getTransform(), 'primary');

            I.delay += I.cooldown;
          }

          if(secondaryShooting) {
            self.shoot(dino.position(), dino.getTransform(), 'secondary');
          }
        }
      }
    }
  });

  self.attrReader('selectable');

  return self;
}
