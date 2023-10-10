"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,_toPropertyKey(n.key),n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _unsupportedIterableToArray(e,t){var r;if(e)return"string"==typeof e?_arrayLikeToArray(e,t):"Map"===(r="Object"===(r=Object.prototype.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _toPrimitive(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0===r)return("string"===t?String:Number)(e);r=r.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}function _toPropertyKey(e){e=_toPrimitive(e,"string");return"symbol"==typeof e?e:String(e)}Object.defineProperty(exports,"__esModule",{value:!0});var ModeType={Array:"array",Tree:"tree"},errEnum={stop:"stop",filter:"filter"},dirReadEntry=function(e,t){var i=t.endFuc,a=t.excFuc,r=e.createReader();(function n(){r.readEntries(function(r){(function e(t){return r[t]||0!==t?r[t]?void a(r[t],{next:function(){e(t+1)}}):n():i()})(0)})})()},noop=function(){},ResHandle=function(){function t(e){_classCallCheck(this,t),this.targetDom=e.targetDom,this.dragoverFuc=e.dragoverFuc||noop,this.dragleaveFuc=e.dragleaveFuc||noop,this.validFuc=e.validFuc,this.mode=e.mode||ModeType.Array,this.onlyFile=e.onlyFile||!1,this.validPushFuc=e.validPushFuc,this.dropDataFuc=e.dropDataFuc||noop,this.bindFuc=null,this.targetOverFlag=!1,this.init()}return _createClass(t,[{key:"init",value:function(){this.targetDom&&(this.bindFuc={dragFuc:this.dragFuc.bind(this),getDrapFile:this.getDrapFile.bind(this),pasteFuc:this.pasteFuc.bind(this),mouseFuc:this.mouseFuc.bind(this)},this.targetDom.addEventListener("mouseenter",this.bindFuc.mouseFuc,!1),this.targetDom.addEventListener("mouseleave",this.bindFuc.mouseFuc,!1),document.addEventListener("paste",this.bindFuc.pasteFuc,!1),this.targetDom.addEventListener("dragover",this.bindFuc.dragFuc,!1),this.targetDom.addEventListener("dragleave",this.bindFuc.dragFuc,!1),this.targetDom.addEventListener("drop",this.bindFuc.getDrapFile,!1))}},{key:"destroy",value:function(){this.targetDom.removeEventListener("dragover",this.bindFuc.dragFuc,!1),this.targetDom.removeEventListener("dragleave",this.bindFuc.dragFuc,!1),this.targetDom.removeEventListener("drop",this.bindFuc.getDrapFile,!1),this.bindFuc=null}},{key:"mouseFuc",value:function(e){"mouseenter"===e.type?this.targetOverFlag=!0:this.targetOverFlag=!1}},{key:"dragFuc",value:function(e){return e.stopPropagation(),e.preventDefault(),this["dragover"===e.type?"dragoverFuc":"dragleaveFuc"].call(e.target),this}},{key:"getDrapFile",value:function(e){this.dragFuc(e),this.addDataTransfer(e.dataTransfer)}},{key:"pasteFuc",value:function(e){var t;this.targetOverFlag&&(t=document.activeElement,/textarea|input/i.test(t.nodeName)||this.addDataTransfer(e.clipboardData))}},{key:"errHanlder",value:function(e,t){(null==e?void 0:e.message)!==errEnum.stop&&t&&t()}},{key:"addDataTransfer",value:function(e){var t,r=this;if(null!=e&&null!=(t=e.items)&&t.length){for(var n=[],i=0;i<e.items.length;i++){var a;(a=e.items[i].webkitGetAsEntry())&&n.push(a)}return this.getContent(n).then(function(e){"function"==typeof r.dropDataFuc&&r.dropDataFuc(e)},function(e){r.errHanlder(e)})}}},{key:"getContent",value:function(o){var u=this;return new Promise(function(i,e){var a=[];(function t(r){var e=o[r];if(!e)return i(a);var n="tree"===u.mode?"getFileSystemEntryTree":"getFileSystemEntryArray";u[n](e,"").then(function(e){a.push.apply(a,_toConsumableArray(e)),t(r+1)},function(e){u.errHanlder(e)})})(0)})}},{key:"ifPushValid",value:function(e){return"function"!=typeof this.validPushFuc||this.validPushFuc(e)}},{key:"pushItem",value:function(e,t){return this.ifPushValid(t)?(e.push(t),t):null}},{key:"entryForEach",value:function(){}},{key:"entryFileHandler",value:function(e,t,r){var n=this,i=t.resolve,a=t.reject,o=[];e.file(function(e){e=r(e);if("function"==typeof n.validFuc&&!n.validFuc(e))return a(new Error(errEnum.stop));n.pushItem(o,e),i(o)})}},{key:"getFileSystemEntryTree",value:function(r){var a=this,o=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"";return new Promise(function(e,t){if(r){var n,i;if(!r.isFile)return r.isDirectory?(i={fullPath:o+(n=r).name,name:n.name,totalSize:0,type:"text/directory",file:new File([],o+n.name,{type:"text/directory"}),child:[]},a.ifPushValid(i)?void dirReadEntry(n,{endFuc:function(){return i.totalSize=i.child.reduce(function(e,t){return e+((null==t?void 0:t.size)||(null==t?void 0:t.totalSize))},0),e([i])},excFuc:function(e,t){var r=t.next;a.getFileSystemEntryTree(e,o+n.name+"/").then(function(e){var t;(t=i.child).push.apply(t,_toConsumableArray(e)),r()},function(e){a.errHanlder(e,function(){r()})})}}):t(new Error(errEnum.filter))):void e([]);a.entryFileHandler(r,{resolve:e,reject:t},function(e){return{size:e.size,fullPath:o+e.name,name:e.name,type:e.type,file:e}})}else e([])})}},{key:"getFileSystemEntryArray",value:function(a){var o=this,u=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"";return new Promise(function(e,t){if(a)if(a.isFile)o.entryFileHandler(a,{resolve:e,reject:t},function(e){return{size:e.size,fullPath:u+e.name,name:e.name,type:e.type,file:e}});else if(a.isDirectory){var n=a,i=[],r={fullPath:u+n.name,name:n.name,totalSize:0,type:"text/directory",file:new File([],u+n.name,{type:"text/directory"})};if(!o.onlyFile&&!o.pushItem(i,r))return t(new Error(errEnum.filter));dirReadEntry(n,{endFuc:function(){return o.onlyFile||(i[0].totalSize=i.reduce(function(e,t){return e+((null==t?void 0:t.size)||0)},0)),e(i)},excFuc:function(e,t){var r=t.next;o.getFileSystemEntryArray(e,u+n.name+"/").then(function(e){console.log("results===",e),i.push.apply(i,_toConsumableArray(e)),r()},function(e){o.errHanlder(e,function(){r()})})}})}else e([]);else e([])})}}]),t}();exports.ResHandle=ResHandle;
