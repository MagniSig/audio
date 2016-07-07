!function(o){if("function"==typeof define&&define.amd){var t=[];define("common.audio",t,o)}else"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=o:o(window._,window.Backbone)}(function(){function o(o,t,e){this.context=o,this.urlList=t,this.onload=e,this.bufferList=[],this.loadCount=0}try{window.AudioContext=window.AudioContext||window.webkitAudioContext,context=new AudioContext}catch(t){log("Web Audio API is not supported in this browser")}var e=function(o,t){return context?(t&&(this.options=u.extend(this.options,t)),o&&this.load(o),void 0):(u.log("ERROR: No AudioContext available. Try Chrome, Safari of Firefox Nightly."),void 0)};e.prototype.load=function(t,e){if(t){e=e||function(){};var n,i,a=[],f={};if(t instanceof Array){a=t;for(var d in t)n=t[d],i=u.pathToName(n),f[i]=n}else if(t instanceof Object){for(var c in t)a.push(t[c]);f=t}else n=t,i=u.pathToName(n),a.push(n),f[i]=n;var s=new o(context,a,new r(f,e));s.load()}},e.prototype.options={},e.prototype.play=function(o){if(!n[o])return u.log("no audio loaded with the key:",o);if(!n[o].buffer)return u.log("audio has not loaded yet");var t=context.createBufferSource();t.buffer=n[o].buffer,t.connect(context.destination),t.start(0)};var n={},r=function(o){return this.collection=o,n=u.extend(n,this.collection),this.update.bind(this)};r.prototype.update=function(o){i=0;for(var t in this.collection)n[t].buffer=o[i],i++},o.prototype.loadBuffer=function(o,t){var e=new XMLHttpRequest;e.open("GET",o,!0),e.responseType="arraybuffer";var n=this;e.onload=function(){n.context.decodeAudioData(e.response,function(e){return e?(n.bufferList[t]=e,++n.loadCount==n.urlList.length&&n.onload(n.bufferList),void 0):(alert("error decoding file data: "+o),void 0)},function(o){console.error("decodeAudioData error",o)})},e.onprogress=function(){},e.onerror=function(){alert("BufferLoader: XHR error")},e.send()},o.prototype.load=function(){for(var o=0;o<this.urlList.length;++o)this.loadBuffer(this.urlList[o],o)};var u={log:function(o){console.log(o)},extend:function(o,t){for(var e in t)t[e]&&t[e].constructor&&t[e].constructor===Object?(o[e]=o[e]||{},arguments.callee(o[e],t[e])):o[e]=t[e];return o},pathToName:function(o){var t;return t=o.replace(/^.*[\\\/]/,""),t=t.substring(0,t.lastIndexOf("."))}};return"object"==typeof window&&"object"==typeof window.document&&(window.CommonAudio=e),e});