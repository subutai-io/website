// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function () {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

// Собираем все нужные плагины в нужном порядке
// Подробнее https://www.npmjs.com/package/gulp-include

//////////////////////////////////////////////////////////////////////////////
// Important plugins
//////////////////////////////////////////////////////////////////////////////

// Enable html5 tags support in old browsers
/**
* @preserve HTML5 Shiv 3.7.2 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
*/
;(function(window, document) {
/*jshint evil:true */
  /** version */
  var version = '3.7.2';

  /** Preset options */
  var options = window.html5 || {};

  /** Used to skip problem elements */
  var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

  /** Not all elements can be cloned in IE **/
  var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

  /** Detect whether the browser supports default html5 styles */
  var supportsHtml5Styles;

  /** Name of the expando, to work with multiple documents or to re-shiv one document */
  var expando = '_html5shiv';

  /** The id for the the documents expando */
  var expanID = 0;

  /** Cached data for each document */
  var expandoData = {};

  /** Detect whether the browser supports unknown elements */
  var supportsUnknownElements;

  (function() {
    try {
        var a = document.createElement('a');
        a.innerHTML = '<xyz></xyz>';
        //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
        supportsHtml5Styles = ('hidden' in a);

        supportsUnknownElements = a.childNodes.length == 1 || (function() {
          // assign a false positive if unable to shiv
          (document.createElement)('a');
          var frag = document.createDocumentFragment();
          return (
            typeof frag.cloneNode == 'undefined' ||
            typeof frag.createDocumentFragment == 'undefined' ||
            typeof frag.createElement == 'undefined'
          );
        }());
    } catch(e) {
      // assign a false positive if detection fails => unable to shiv
      supportsHtml5Styles = true;
      supportsUnknownElements = true;
    }

  }());

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a style sheet with the given CSS text and adds it to the document.
   * @private
   * @param {Document} ownerDocument The document.
   * @param {String} cssText The CSS text.
   * @returns {StyleSheet} The style element.
   */
  function addStyleSheet(ownerDocument, cssText) {
    var p = ownerDocument.createElement('p'),
        parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

    p.innerHTML = 'x<style>' + cssText + '</style>';
    return parent.insertBefore(p.lastChild, parent.firstChild);
  }

  /**
   * Returns the value of `html5.elements` as an array.
   * @private
   * @returns {Array} An array of shived element node names.
   */
  function getElements() {
    var elements = html5.elements;
    return typeof elements == 'string' ? elements.split(' ') : elements;
  }

  /**
   * Extends the built-in list of html5 elements
   * @memberOf html5
   * @param {String|Array} newElements whitespace separated list or array of new element names to shiv
   * @param {Document} ownerDocument The context document.
   */
  function addElements(newElements, ownerDocument) {
    var elements = html5.elements;
    if(typeof elements != 'string'){
      elements = elements.join(' ');
    }
    if(typeof newElements != 'string'){
      newElements = newElements.join(' ');
    }
    html5.elements = elements +' '+ newElements;
    shivDocument(ownerDocument);
  }

   /**
   * Returns the data associated to the given document
   * @private
   * @param {Document} ownerDocument The document.
   * @returns {Object} An object of data.
   */
  function getExpandoData(ownerDocument) {
    var data = expandoData[ownerDocument[expando]];
    if (!data) {
        data = {};
        expanID++;
        ownerDocument[expando] = expanID;
        expandoData[expanID] = data;
    }
    return data;
  }

  /**
   * returns a shived element for the given nodeName and document
   * @memberOf html5
   * @param {String} nodeName name of the element
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived element.
   */
  function createElement(nodeName, ownerDocument, data){
    if (!ownerDocument) {
        ownerDocument = document;
    }
    if(supportsUnknownElements){
        return ownerDocument.createElement(nodeName);
    }
    if (!data) {
        data = getExpandoData(ownerDocument);
    }
    var node;

    if (data.cache[nodeName]) {
        node = data.cache[nodeName].cloneNode();
    } else if (saveClones.test(nodeName)) {
        node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
    } else {
        node = data.createElem(nodeName);
    }

    // Avoid adding some elements to fragments in IE < 9 because
    // * Attributes like `name` or `type` cannot be set/changed once an element
    //   is inserted into a document/fragment
    // * Link elements with `src` attributes that are inaccessible, as with
    //   a 403 response, will cause the tab/window to crash
    // * Script elements appended to fragments will execute when their `src`
    //   or `text` property is set
    return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
  }

  /**
   * returns a shived DocumentFragment for the given document
   * @memberOf html5
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived DocumentFragment.
   */
  function createDocumentFragment(ownerDocument, data){
    if (!ownerDocument) {
        ownerDocument = document;
    }
    if(supportsUnknownElements){
        return ownerDocument.createDocumentFragment();
    }
    data = data || getExpandoData(ownerDocument);
    var clone = data.frag.cloneNode(),
        i = 0,
        elems = getElements(),
        l = elems.length;
    for(;i<l;i++){
        clone.createElement(elems[i]);
    }
    return clone;
  }

  /**
   * Shivs the `createElement` and `createDocumentFragment` methods of the document.
   * @private
   * @param {Document|DocumentFragment} ownerDocument The document.
   * @param {Object} data of the document.
   */
  function shivMethods(ownerDocument, data) {
    if (!data.cache) {
        data.cache = {};
        data.createElem = ownerDocument.createElement;
        data.createFrag = ownerDocument.createDocumentFragment;
        data.frag = data.createFrag();
    }


    ownerDocument.createElement = function(nodeName) {
      //abort shiv
      if (!html5.shivMethods) {
          return data.createElem(nodeName);
      }
      return createElement(nodeName, ownerDocument, data);
    };

    ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
      'var n=f.cloneNode(),c=n.createElement;' +
      'h.shivMethods&&(' +
        // unroll the `createElement` calls
        getElements().join().replace(/[\w\-:]+/g, function(nodeName) {
          data.createElem(nodeName);
          data.frag.createElement(nodeName);
          return 'c("' + nodeName + '")';
        }) +
      ');return n}'
    )(html5, data.frag);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Shivs the given document.
   * @memberOf html5
   * @param {Document} ownerDocument The document to shiv.
   * @returns {Document} The shived document.
   */
  function shivDocument(ownerDocument) {
    if (!ownerDocument) {
        ownerDocument = document;
    }
    var data = getExpandoData(ownerDocument);

    if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
      data.hasCSS = !!addStyleSheet(ownerDocument,
        // corrects block display not defined in IE6/7/8/9
        'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
        // adds styling not present in IE6/7/8/9
        'mark{background:#FF0;color:#000}' +
        // hides non-rendered elements
        'template{display:none}'
      );
    }
    if (!supportsUnknownElements) {
      shivMethods(ownerDocument, data);
    }
    return ownerDocument;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The `html5` object is exposed so that more elements can be shived and
   * existing shiving can be detected on iframes.
   * @type Object
   * @example
   *
   * // options can be changed before the script is included
   * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
   */
  var html5 = {

    /**
     * An array or space separated string of node names of the elements to shiv.
     * @memberOf html5
     * @type Array|String
     */
    'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video',

    /**
     * current version of html5shiv
     */
    'version': version,

    /**
     * A flag to indicate that the HTML5 style sheet should be inserted.
     * @memberOf html5
     * @type Boolean
     */
    'shivCSS': (options.shivCSS !== false),

    /**
     * Is equal to true if a browser supports creating unknown/HTML5 elements
     * @memberOf html5
     * @type boolean
     */
    'supportsUnknownElements': supportsUnknownElements,

    /**
     * A flag to indicate that the document's `createElement` and `createDocumentFragment`
     * methods should be overwritten.
     * @memberOf html5
     * @type Boolean
     */
    'shivMethods': (options.shivMethods !== false),

    /**
     * A string to describe the type of `html5` object ("default" or "default print").
     * @memberOf html5
     * @type String
     */
    'type': 'default',

    // shivs the document according to the specified `html5` object options
    'shivDocument': shivDocument,

    //creates a shived element
    createElement: createElement,

    //creates a shived documentFragment
    createDocumentFragment: createDocumentFragment,

    //extends list of elements
    addElements: addElements
  };

  /*--------------------------------------------------------------------------*/

  // expose html5
  window.html5 = html5;

  // shiv the document
  shivDocument(document);

}(this, document));


// Enable @media support in old browsers
/*! Respond.js v1.4.2: min/max-width media query polyfill
 * Copyright 2014 Scott Jehl
 * Licensed under MIT
 * http://j.mp/respondjs */

/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
/*! NOTE: If you're already including a window.matchMedia polyfill via Modernizr or otherwise, you don't need this part */
(function(w) {
  "use strict";
  w.matchMedia = w.matchMedia || function(doc, undefined) {
    var bool, docElem = doc.documentElement, refNode = docElem.firstElementChild || docElem.firstChild, fakeBody = doc.createElement("body"), div = doc.createElement("div");
    div.id = "mq-test-1";
    div.style.cssText = "position:absolute;top:-100em";
    fakeBody.style.background = "none";
    fakeBody.appendChild(div);
    return function(q) {
      div.innerHTML = '&shy;<style media="' + q + '"> #mq-test-1 { width: 42px; }</style>';
      docElem.insertBefore(fakeBody, refNode);
      bool = div.offsetWidth === 42;
      docElem.removeChild(fakeBody);
      return {
        matches: bool,
        media: q
      };
    };
  }(w.document);
})(this);

(function(w) {
  "use strict";
  var respond = {};
  w.respond = respond;
  respond.update = function() {};
  var requestQueue = [], xmlHttp = function() {
    var xmlhttpmethod = false;
    try {
      xmlhttpmethod = new w.XMLHttpRequest();
    } catch (e) {
      xmlhttpmethod = new w.ActiveXObject("Microsoft.XMLHTTP");
    }
    return function() {
      return xmlhttpmethod;
    };
  }(), ajax = function(url, callback) {
    var req = xmlHttp();
    if (!req) {
      return;
    }
    req.open("GET", url, true);
    req.onreadystatechange = function() {
      if (req.readyState !== 4 || req.status !== 200 && req.status !== 304) {
        return;
      }
      callback(req.responseText);
    };
    if (req.readyState === 4) {
      return;
    }
    req.send(null);
  }, isUnsupportedMediaQuery = function(query) {
    return query.replace(respond.regex.minmaxwh, "").match(respond.regex.other);
  };
  respond.ajax = ajax;
  respond.queue = requestQueue;
  respond.unsupportedmq = isUnsupportedMediaQuery;
  respond.regex = {
    media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
    keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
    comments: /\/\*[^*]*\*+([^/][^*]*\*+)*\//gi,
    urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
    findStyles: /@media *([^\{]+)\{([\S\s]+?)$/,
    only: /(only\s+)?([a-zA-Z]+)\s?/,
    minw: /\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
    maxw: /\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
    minmaxwh: /\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi,
    other: /\([^\)]*\)/g
  };
  respond.mediaQueriesSupported = w.matchMedia && w.matchMedia("only all") !== null && w.matchMedia("only all").matches;
  if (respond.mediaQueriesSupported) {
    return;
  }
  var doc = w.document, docElem = doc.documentElement, mediastyles = [], rules = [], appendedEls = [], parsedSheets = {}, resizeThrottle = 30, head = doc.getElementsByTagName("head")[0] || docElem, base = doc.getElementsByTagName("base")[0], links = head.getElementsByTagName("link"), lastCall, resizeDefer, eminpx, getEmValue = function() {
    var ret, div = doc.createElement("div"), body = doc.body, originalHTMLFontSize = docElem.style.fontSize, originalBodyFontSize = body && body.style.fontSize, fakeUsed = false;
    div.style.cssText = "position:absolute;font-size:1em;width:1em";
    if (!body) {
      body = fakeUsed = doc.createElement("body");
      body.style.background = "none";
    }
    docElem.style.fontSize = "100%";
    body.style.fontSize = "100%";
    body.appendChild(div);
    if (fakeUsed) {
      docElem.insertBefore(body, docElem.firstChild);
    }
    ret = div.offsetWidth;
    if (fakeUsed) {
      docElem.removeChild(body);
    } else {
      body.removeChild(div);
    }
    docElem.style.fontSize = originalHTMLFontSize;
    if (originalBodyFontSize) {
      body.style.fontSize = originalBodyFontSize;
    }
    ret = eminpx = parseFloat(ret);
    return ret;
  }, applyMedia = function(fromResize) {
    var name = "clientWidth", docElemProp = docElem[name], currWidth = doc.compatMode === "CSS1Compat" && docElemProp || doc.body[name] || docElemProp, styleBlocks = {}, lastLink = links[links.length - 1], now = new Date().getTime();
    if (fromResize && lastCall && now - lastCall < resizeThrottle) {
      w.clearTimeout(resizeDefer);
      resizeDefer = w.setTimeout(applyMedia, resizeThrottle);
      return;
    } else {
      lastCall = now;
    }
    for (var i in mediastyles) {
      if (mediastyles.hasOwnProperty(i)) {
        var thisstyle = mediastyles[i], min = thisstyle.minw, max = thisstyle.maxw, minnull = min === null, maxnull = max === null, em = "em";
        if (!!min) {
          min = parseFloat(min) * (min.indexOf(em) > -1 ? eminpx || getEmValue() : 1);
        }
        if (!!max) {
          max = parseFloat(max) * (max.indexOf(em) > -1 ? eminpx || getEmValue() : 1);
        }
        if (!thisstyle.hasquery || (!minnull || !maxnull) && (minnull || currWidth >= min) && (maxnull || currWidth <= max)) {
          if (!styleBlocks[thisstyle.media]) {
            styleBlocks[thisstyle.media] = [];
          }
          styleBlocks[thisstyle.media].push(rules[thisstyle.rules]);
        }
      }
    }
    for (var j in appendedEls) {
      if (appendedEls.hasOwnProperty(j)) {
        if (appendedEls[j] && appendedEls[j].parentNode === head) {
          head.removeChild(appendedEls[j]);
        }
      }
    }
    appendedEls.length = 0;
    for (var k in styleBlocks) {
      if (styleBlocks.hasOwnProperty(k)) {
        var ss = doc.createElement("style"), css = styleBlocks[k].join("\n");
        ss.type = "text/css";
        ss.media = k;
        head.insertBefore(ss, lastLink.nextSibling);
        if (ss.styleSheet) {
          ss.styleSheet.cssText = css;
        } else {
          ss.appendChild(doc.createTextNode(css));
        }
        appendedEls.push(ss);
      }
    }
  }, translate = function(styles, href, media) {
    var qs = styles.replace(respond.regex.comments, "").replace(respond.regex.keyframes, "").match(respond.regex.media), ql = qs && qs.length || 0;
    href = href.substring(0, href.lastIndexOf("/"));
    var repUrls = function(css) {
      return css.replace(respond.regex.urls, "$1" + href + "$2$3");
    }, useMedia = !ql && media;
    if (href.length) {
      href += "/";
    }
    if (useMedia) {
      ql = 1;
    }
    for (var i = 0; i < ql; i++) {
      var fullq, thisq, eachq, eql;
      if (useMedia) {
        fullq = media;
        rules.push(repUrls(styles));
      } else {
        fullq = qs[i].match(respond.regex.findStyles) && RegExp.$1;
        rules.push(RegExp.$2 && repUrls(RegExp.$2));
      }
      eachq = fullq.split(",");
      eql = eachq.length;
      for (var j = 0; j < eql; j++) {
        thisq = eachq[j];
        if (isUnsupportedMediaQuery(thisq)) {
          continue;
        }
        mediastyles.push({
          media: thisq.split("(")[0].match(respond.regex.only) && RegExp.$2 || "all",
          rules: rules.length - 1,
          hasquery: thisq.indexOf("(") > -1,
          minw: thisq.match(respond.regex.minw) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
          maxw: thisq.match(respond.regex.maxw) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
        });
      }
    }
    applyMedia();
  }, makeRequests = function() {
    if (requestQueue.length) {
      var thisRequest = requestQueue.shift();
      ajax(thisRequest.href, function(styles) {
        translate(styles, thisRequest.href, thisRequest.media);
        parsedSheets[thisRequest.href] = true;
        w.setTimeout(function() {
          makeRequests();
        }, 0);
      });
    }
  }, ripCSS = function() {
    for (var i = 0; i < links.length; i++) {
      var sheet = links[i], href = sheet.href, media = sheet.media, isCSS = sheet.rel && sheet.rel.toLowerCase() === "stylesheet";
      if (!!href && isCSS && !parsedSheets[href]) {
        if (sheet.styleSheet && sheet.styleSheet.rawCssText) {
          translate(sheet.styleSheet.rawCssText, href, media);
          parsedSheets[href] = true;
        } else {
          if (!/^([a-zA-Z:]*\/\/)/.test(href) && !base || href.replace(RegExp.$1, "").split("/")[0] === w.location.host) {
            if (href.substring(0, 2) === "//") {
              href = w.location.protocol + href;
            }
            requestQueue.push({
              href: href,
              media: media
            });
          }
        }
      }
    }
    makeRequests();
  };
  ripCSS();
  respond.update = ripCSS;
  respond.getEmValue = getEmValue;
  function callMedia() {
    applyMedia(true);
  }
  if (w.addEventListener) {
    w.addEventListener("resize", callMedia, false);
  } else if (w.attachEvent) {
    w.attachEvent("onresize", callMedia);
  }
})(this);

// Browser feature detection library for HTML5/CSS3
/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-mq-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function D(a){j.cssText=a}function E(a,b){return D(n.join(a+";")+(b||""))}function F(a,b){return typeof a===b}function G(a,b){return!!~(""+a).indexOf(b)}function H(a,b){for(var d in a){var e=a[d];if(!G(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function I(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:F(f,"function")?f.bind(d||b):f}return!1}function J(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return F(b,"string")||F(b,"undefined")?H(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),I(e,b,c))}function K(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b)&&c(b).matches||!1;var d;return y("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},A=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=F(e[d],"function"),F(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),B={}.hasOwnProperty,C;!F(B,"undefined")&&!F(B.call,"undefined")?C=function(a,b){return B.call(a,b)}:C=function(a,b){return b in a&&F(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.flexbox=function(){return J("flexWrap")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!F(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){return!!a.WebGLRenderingContext},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!J("indexedDB",a)},s.hashchange=function(){return A("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.rgba=function(){return D("background-color:rgba(150,255,150,.5)"),G(j.backgroundColor,"rgba")},s.hsla=function(){return D("background-color:hsla(120,40%,100%,.5)"),G(j.backgroundColor,"rgba")||G(j.backgroundColor,"hsla")},s.multiplebgs=function(){return D("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return J("backgroundSize")},s.borderimage=function(){return J("borderImage")},s.borderradius=function(){return J("borderRadius")},s.boxshadow=function(){return J("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return E("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return J("animationName")},s.csscolumns=function(){return J("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return D((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),G(j.backgroundImage,"gradient")},s.cssreflections=function(){return J("boxReflect")},s.csstransforms=function(){return!!J("transform")},s.csstransforms3d=function(){var a=!!J("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return J("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var L in s)C(s,L)&&(x=L.toLowerCase(),e[x]=s[L](),v.push((e[x]?"":"no-")+x));return e.input||K(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)C(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},D(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.mq=z,e.hasEvent=A,e.testProp=function(a){return H([a])},e.testAllProps=J,e.testStyles=y,e.prefixed=function(a,b,c){return b?J(a,b,c):J(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};


// JQuery Swipe Plugin
/*jslint undef: true, browser: true, continue: true, eqeq: true, vars: true, forin: true, white: true, newcap: false, nomen: true, plusplus: true, maxerr: 50, indent: 4 */

/**
 * jGestures: a jQuery plugin for gesture events
 * Copyright 2010-2011 Neue Digitale / Razorfish GmbH
 * Copyright 2011-2012, Razorfish GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @fileOverview
 * Razorfish GmbH javascript library: add touch events such as 'pinch',
 * 'rotate', 'swipe', 'tap' and 'orientationchange' on capable user agents.
 * For incapable devices there's a basic event substitution: a "tapone" event
 * can be triggered by "clicking", a "swipeone" by performing a swipe-ish
 * gesture using the mouse (buttondown - mousemove - buttonup).
 *
 * This is still a beta version, bugfixes and improvements appreciated.
 *
 * @author martin.krause@razorfish.de
 * @version 0.90-shake
 *
 * @requires
 * jQuery JavaScript Library v1.4.2 - http://jquery.com/
 *	Copyright 2010, John Resig
 *	Dual licensed under the MIT or GPL Version 2 licenses.
 *	http://jquery.org/license
 *
 * @example	jQuery('#swipe').bind('swipeone',eventHandler);
 *
 * Notification on native events:
 * On every native touchstart, touchend, gesturestart and gestureend-event,
 * jgestures triggers a corresponding custom event
 * ('jGestures.touchstart', 'jGestures.touchend;start', 'jGestures.touchend;processed',
 * 'jGestures.gesturestart', 'jGestures.gestureend;start', 'jGestures.gestureend;processed') on the event-element.
 * The  eventhandler's second argument represents the original touch event (yes: including all touchpoints).
 * Use this if you need very detailed control e.g. kinetic scrolling or implementing additional gestures.
 *
 * Every jGesture-eventhandler receives a custom object as second argument
 * containing the original event (originalEvent property) and processed
 * information (such as delta values and timesptamp).
 * Example:{
 *				type: eventtype e.g. "swipe","pinch",
 *				originalEvent: {DOM-Event},
 *				// default: just one entry on the delta-array - the first touchpoint
 *				// the first touchpoint is the reference point for every gesture,
 *				// because moving touchpoints in various directions would result in
 *				// a gesture.
 *				// delta and direction details are just provided for touch not for gesture / motion events
 *				delta : [
 *					{
 *						lastX:{Number} , // x-axis: relative to the last touchevent (e.g. touchmove!)
 *						lastY:{Number}, // y-axis: relative to the last touchevent (e.g. touchmove!)
 *						moved: {Number},  // distance: relative to the original touchpoint
 *						startX: {Number} , // relative to the original touchpoint
 *						startY: {Number} ,// relative to the original touchpoint
 *					} ],
 *				// based on the first touchpoint
 *				direction : { // relative to the last touchevent (e.g. touchmove!)
 *					vector: {Number}, // -1|+1, indicates the direction if necessary(pinch/rotate)
 *					orientation: {Number} // window.orientation: -90,0,90,180 || null (window.orienntation)
 *					lastX : {Number}, // -1,0,+1 || null (orientationchange) // relative to the last touchevent (e.g. touchmove!)
 *					lastY : {Number}, // -1,0,+1 || null (orientationchange)// relative to the last touchevent (e.g. touchmove!)
 *					startX: {Number} , // relative to the original touchpoint
 *					startY: {Number} ,// relative to the original touchpoint
 *				},
 *				rotation: {Number} || null, // gestureonly: amount of rotation relative to the current position NOT the original
 *				scale: {Number} || null, // gestureonly: amount of scaling relative to the current position NOT the original
 *				duration: {Number}, // ms: relative to the original touchpoint
 *				description : {String} // details as String: {TYPE *}:{TOUCHES 1|2|3|4}:{X-AXIS 'right'|'left'|'steady'}:{Y-AXIS 'down'|'up'|'steady'} e.g. "swipe:1:left:steady" relative to the last touchpoint
 *			};
 *
 * Available jGesture-events can be grouped into:
 *
 *
 * Device events:
 *	The jGesture-Events in this group are triggered by the device.
 *
 * @event 'orientationchange'
 *		The device is turned clockwise or counterclockwise. This event is triggered
 *		by the device and might use an internal gyroscope.
 *	obj.description:
 *		orientationchange:landscape:clockwise:-90
 *		orientationchange:portrait:default:0
 *		orientationchange:landscape:counterclockwise|portrait:90
 *		orientationchange:portrait:upsidedown:180
 *
 *
 * Move events:
 *	The jGesture-Events in this group are triggered during the touch/gesture
 *	execution whenever a touchpoint changes.
 *	In contrast to touchend/gestureend-events which are triggered after
 *	the touch/gesture has completed.
 *
 * @event 'pinch'
 *		Is triggered during a pinch gesture (two fingers moving away from or
 *		towards each other).
 *	obj.description:
 *		pinch:-1:close
 *		pinch:+1:open
 *
 * @event 'rotate'
 *		Is triggered during a rotation gesture (two fingers rotating clockwise
 *		or counterclockwise).
 *	obj.description:
 *		rotate:-1:counterclockwise
 *		rotate:+1:+clockwise
 *
 * @event 'swipemove'
 *		Is triggered during a swipe move gesture (finger(s) being moved around
 *		the device, e.g. dragging)
 *	obj.description:
 *		swipemove:1:left:down
 *		swipemove:1:left:up
 *		swipemove:1:left:steady
 *		swipemove:1:right:down
 *		swipemove:1:right:up
 *		swipemove:1:right:steady
 *		swipemove:2:left:down
 *		swipemove:2:left:up
 *		swipemove:2:left:steady
 *		swipemove:2:right:down
 *		swipemove:2:right:up
 *		swipemove:2:right:steady
 *		swipemove:2:left:down
 *		swipemove:3:left:up
 *		swipemove:3:left:steady
 *		swipemove:3:right:down
 *		swipemove:3:right:up
 *		swipemove:3:right:steady
 *		swipemove:3:left:down
 *		swipemove:4:left:up
 *		swipemove:4:left:steady
 *		swipemove:4:right:down
 *		swipemove:4:right:up
 *		swipemove:4:right:steady
 *
 *
 * Toucheend events:
 *	The jGesture-Events in this group are triggered after the touch/gesture
 *	has completed.
 *	In contrast to touchmove-events which are triggered during the touch/gesture
 *	execution whenever a touchpoint changes.
 *
 * @event 'swipeone'
 *		Is triggered after a swipe move gesture with one touchpoint (one finger
 *		was moved around the device)
 *	obj.description:
 *		swipeone:1:left:down
 *		swipeone:1:left:up
 *		swipeone:1:left:steady
 *		swipeone:1:right:down
 *		swipeone:1:right:up
 *		swipeone:1:right:steady
 *
 * @event 'swipetwo'
 *		Is triggered after a swipe move gesture with two touchpoints (two fingers
 *		were moved around the device)
 *	obj.description:
 *		swipetwo:2:left:down
 *		swipetwo:2:left:up
 *		swipetwo:2:left:steady
 *		swipetwo:2:right:down
 *		swipetwo:2:right:up
 *		swipetwo:2:right:steady
 *
 * @event 'swipethree'
 *		Is triggered after a swipe move gesture with three touchpoints (three
 *		fingers were moved around the device)
 *	obj.description:
 *		swipethree:3:left:down
 *		swipethree:3:left:up
 *		swipethree:3:left:steady
 *		swipethree:3:right:down
 *		swipethree:3:right:up
 *		swipethree:3:right:steady
 *
 * @event 'swipefour'
 *		Is triggered after a swipe move gesture with four touchpoints (four
 *		fingers were moved around the device)
 *	obj.description:
 *		swipefour:4:left:down
 *		swipefour:4:left:up
 *		swipefour:4:left:steady
 *		swipefour:4:right:down
 *		swipefour:4:right:up
 *		swipefour:4:right:steady
 *
 *
 * @event 'swipeup'
 *		Is triggered after an  strict upwards swipe move gesture
 *	obj.description:
 *		swipe:1:steady:up
 *		swipe:2:steady:up
 *		swipe:3:steady:up
 *		swipe:4:steady:up
 *
 * @event 'swiperightup'
 *		Is triggered after a rightwards and upwards swipe move gesture
 *	obj.description:
 *		swipe:1:right:up
 *		swipe:2:right:up
 *		swipe:3:right:up
 *		swipe:4:right:up
 *
 * @event 'swiperight'
 *		Is triggered after a  strict rightwards swipe move gesture
 *	obj.description:
 *		swipe:1:right:steady
 *		swipe:2:right:steady
 *		swipe:3:right:steady
 *		swipe:4:right:steady
 *
 * @event 'swiperightdown'
 *		Is triggered after a rightwards and downwards swipe move gesture
 *	obj.description:
 *		swipe:1:right:down
 *		swipe:2:right:down
 *		swipe:3:right:down
 *		swipe:4:right:down
 *
 * @event 'swipedown'
 *		Is triggered after a  strict downwards swipe move gesture
 *	obj.description:
 *		swipe:1:steady:down
 *		swipe:2:steady:down
 *		swipe:3:steady:down
 *		swipe:4:steady:down
 *
 * @event 'swipeleftdown'
 *		Is triggered after a leftwards and downwards swipe move gesture
 *	obj.description:
 *		swipe:1:left:down
 *		swipe:2:left:down
 *		swipe:3:left:down
 *		swipe:4:left:down
 *
 * @event 'swipeleft'
 *		Is triggered after a strict leftwards swipe move gesture
 *	obj.description:
 *		swipe:1:left:steady
 *		swipe:2:left:steady
 *		swipe:3:left:steady
 *		swipe:4:left:steady
 *
 * @event 'swipeleftup'
 *		Is triggered after a leftwards and upwards swipe move gesture
 *	obj.description:
 *		swipe:1:left:up
 *		swipe:2:left:up
 *		swipe:3:left:up
 *		swipe:4:left:up
 *
 * @event 'tapone'
 *		Is triggered after a single (one finger) tap gesture
 *	obj.description:
 *		tapone
 *
 * @event 'taptwo'
 *		Is triggered after a double (two finger) tap gesture
 *	obj.description:
 *		taptwo
 * *
 * @event 'tapthree'
 *		Is triggered after a tripple (three finger) tap gesture
 *	obj.description:
 *		tapthree
 *
 *
 * Gestureend events:
 *	A gesture is an interpretation of different touchpoints.
 *	The jGesture-Events in this group are triggered when a gesture has finished
 *	and the touchpoints are removed from the device.
 *
 * @event 'pinchopen'
 *		Is triggered when a pinchopen gesture (two fingers moving away from each
 *		other) occured and the touchpoints (fingers) are removed the device.
 *	obj.description:
 *		pinch:+1:open
 *
 * @event 'pinchclose'
 *		Is triggered when a pinchclose gesture (two fingers moving towards each
 *		other) occured and the touchpoints (fingers) are removed the device.
 *	obj.description:
 *		pinch:-1:close
 *
 * @event 'rotatecw'
 *		Is triggered when a clockwise rotation gesture (two fingers rotating
 *		clockwise) occured and the touchpoints (fingers) are removed the device.
 *	obj.description:
 *		rotate:+1:+clockwise
 *
 * @event 'rotateccw'
 *		Is triggered when a counterclockwise rotation gesture (two fingers
 *		rotating counterclockwise) occured and the touchpoints (fingers) are
 *		removed the device.
 *	obj.description:
 *		rotate:-1:+counterclockwise
 *
 *
 * Motion events:
 *  A "motion event" is an interpretation of changes in space, e.g. a "shaking motion"
 *  consists of a specified number of acceleration changes in a given interval.
 * For understanding "directions", place your mobile device on a table with the bottom
 * (home button) close to you:
 *  - x-axis: horizontal left / right
 *  - y-axis: horizontal front / back (through the home button)
 *  - z-axis: vertical through your device
 *
 *  Note: Devicemotion / deviceorientation don't send custom event (such as: jGestures.touchstart).
 *  Note: Devicemotion should be bound on the "window-element" - because the whole device moves
 *
 * @event 'shake'
 *		Is triggered when a shaking motion is detected
 *	obj.description:
 *		shake:leftright:x-axisfrontback:y-axis:updown:z-axis
 *
 * @event 'shakefrontback'
 *		Is triggered when a shaking motion is detected and the gesture can be interpreted as a mainly front-back movement.
  *	obj.description:
 *		shakefrontback:shakefrontback:y-axis
 *
 * @event 'shakeleftright'
 *		Is triggered when a shaking motion is detected and the gesture can be interpreted as a mainly left-right movement.
 *		Additional major movements are mentioned in the obj.description.
 *	obj.description:
 *		shakeleftright:leftright:x-axis
 *
 * @event 'shakeupdown'
 *		Is triggered when a shaking motion is detected and the gesture can be interpreted as a mainly up-down movement.
 *		Additional major movements are mentioned in the obj.description.
 *	obj.description:
 *		shake:shakeupdown:updown:z-axis
 *
 * @example
 *		.bind( eventType, [ eventData ], handler(eventObject) )
 * jQuery('body').bind('tapone',function(){alert(arguments[1].description);})
 *
 */

 (function($) {

	/**
	* General thresholds.
	*/
	// @TODO: move to $...defaults
	// @TODO: shake to defaults freeze etc
	// change of x deg in y ms


	$.jGestures = {};
	$.jGestures.defaults = {};
	$.jGestures.defaults.thresholdShake =  {
		requiredShakes : 10,
		freezeShakes: 100,
		frontback : {
			sensitivity: 10
		 },
		leftright : {
			sensitivity: 10
		},
		updown : {
			sensitivity: 10
		}
	};

	$.jGestures.defaults.thresholdPinchopen = 0.05;
	$.jGestures.defaults.thresholdPinchmove = 0.05;
	$.jGestures.defaults.thresholdPinch = 0.05;
	$.jGestures.defaults.thresholdPinchclose = 0.05;
	$.jGestures.defaults.thresholdRotatecw = 5; //deg
	$.jGestures.defaults.thresholdRotateccw = 5; // deg
	// a tap becomes a swipe if x/y values changes are above this threshold
	$.jGestures.defaults.thresholdMove = 20;
	$.jGestures.defaults.thresholdSwipe = 100;
	// get capable user agents
	$.jGestures.data = {};
	$.jGestures.data.capableDevicesInUserAgentString = ['iPad','iPhone','iPod','Mobile Safari']; // basic functionality such as swipe, pinch, rotate, tap should work on every mobile safari, e.g. GalaxyTab
	$.jGestures.data.hasGestures = (function () { var _i; for(_i = 0; _i < $.jGestures.data.capableDevicesInUserAgentString.length; _i++ ) {  if (navigator.userAgent.indexOf($.jGestures.data.capableDevicesInUserAgentString[_i]) !== -1 ) {return true;} } return false; } )();
	$.hasGestures = $.jGestures.data.hasGestures;
	$.jGestures.events = {
		touchstart : 'jGestures.touchstart',
		touchendStart: 'jGestures.touchend;start',
		touchendProcessed: 'jGestures.touchend;processed',
		gesturestart: 'jGestures.gesturestart',
		gestureendStart: 'jGestures.gestureend;start',
		gestureendProcessed: 'jGestures.gestureend;processed'
	};

	jQuery
		.each({
			// "first domevent necessary"_"touch event+counter" : "exposed as"
			// event: orientationchange
			orientationchange_orientationchange01: "orientationchange",
			// event: gestures
			gestureend_pinchopen01: "pinchopen",
			gestureend_pinchclose01: "pinchclose",
			gestureend_rotatecw01 : 'rotatecw',
			gestureend_rotateccw01 : 'rotateccw',
			// move events
			gesturechange_pinch01: 'pinch',
			gesturechange_rotate01: 'rotate',
			touchstart_swipe13: 'swipemove',
			// event: touches
			touchstart_swipe01: "swipeone",
			touchstart_swipe02: "swipetwo",
			touchstart_swipe03: "swipethree",
			touchstart_swipe04: "swipefour",
			touchstart_swipe05: 'swipeup',
			touchstart_swipe06: 'swiperightup',
			touchstart_swipe07: 'swiperight',
			touchstart_swipe08: 'swiperightdown',
			touchstart_swipe09: 'swipedown',
			touchstart_swipe10: 'swipeleftdown',
			touchstart_swipe11: 'swipeleft',
			touchstart_swipe12: 'swipeleftup',
			touchstart_tap01: 'tapone',
			touchstart_tap02: 'taptwo',
			touchstart_tap03: 'tapthree',
			touchstart_tap04: 'tapfour',

			devicemotion_shake01: 'shake',
			devicemotion_shake02: 'shakefrontback',
			devicemotion_shake03: 'shakeleftright',
			devicemotion_shake04: 'shakeupdown'

		},

		/**
		* Add gesture events inside the jQuery.event.special namespace
		*/
		function( sInternal_, sPublicFN_ ) {

			// add as funciton to jQuery.event.special.sPublicFN_
			jQuery.event.special[ sPublicFN_ ] = {

				/**
				* When the first event handler is bound, jQuery executes the setup function.
				* This plugin just uses one eventhandler per element, regardless of the number of bound events.
				* All Events are stored internally as properties on the dom-element using the $.data api.
				* The setup-function adds the eventlistener, acting as a proxy function for the internal events.
				* $.data.ojQueryGestures[_sDOMEvent ('tap') ] = {Boolean}
				* @return {Void}
				*/
				setup: function () {
					// split the arguments to necessary controll arguements
					var _aSplit = sInternal_.split('_');
					var _sDOMEvent = _aSplit[0]; //
					// get the associated gesture event and strip the counter: necessary for distinguisihng similliar events such as tapone-tapfour
					var _sGestureEvent = _aSplit[1].slice(0,_aSplit[1].length-2);
					var _$element = jQuery(this);
					var _oDatajQueryGestures ;
					var oObj;
					// bind the event handler on the first $.bind() for a gestureend-event, set marker
					if (!_$element.data('ojQueryGestures') || !_$element.data('ojQueryGestures')[_sDOMEvent])  {
						// setup pseudo event
						_oDatajQueryGestures = _$element.data('ojQueryGestures') || {};
						oObj = {};
						// marker for:  domEvent being set on this element
						// e.g.: $.data.oGestureInternals['touchstart'] = true;
						// since they're grouped, i'm just marking the first one being added
						oObj[_sDOMEvent] = true;
						$.extend(true,_oDatajQueryGestures,oObj);
						_$element.data('ojQueryGestures' ,_oDatajQueryGestures);
						// add gesture events
						if($.hasGestures) {
							switch(_sGestureEvent) {

								// event: orientationchange
								case 'orientationchange':
									_$element.get(0).addEventListener('orientationchange', _onOrientationchange, false);
								break;

								// event:
								// - shake
								// - tilt
								case 'shake':
								case 'shakefrontback':
								case 'shakeleftright':
								case 'shakeupdown':
								case 'tilt':
									//$.hasGyroscope = true //!window.DeviceOrientationEvent;
									//_$element.get(0).addEventListener('devicemotion', _onDevicemotion, false);
									//_$element.get(0).addEventListener('deviceorientation', _onDeviceorientation, false);
									_$element.get(0).addEventListener('devicemotion', _onDevicemotion, false);
								break;

								// event:
								// - touchstart
								// - touchmove
								// - touchend
								case 'tap':
								case 'swipe':
								case 'swipeup':
								case 'swiperightup':
								case 'swiperight':
								case 'swiperightdown':
								case 'swipedown':
								case 'swipeleftdown':
								case 'swipeleft':
									_$element.get(0).addEventListener('touchstart', _onTouchstart, false);
								break;

								// event: gestureend
								case 'pinchopen':
								case 'pinchclose' :
								case 'rotatecw' :
								case 'rotateccw' :
									_$element.get(0).addEventListener('gesturestart', _onGesturestart, false);
									_$element.get(0).addEventListener('gestureend', _onGestureend, false);
								break;

								// event: gesturechange
								case 'pinch':
								case 'rotate':
									_$element.get(0).addEventListener('gesturestart', _onGesturestart, false);
									_$element.get(0).addEventListener('gesturechange', _onGesturechange, false);
								break;
							}
						}
						// create substitute for gesture events
						else {
							switch(_sGestureEvent) {
								// event substitutes:
								// - touchstart: mousedown
								// - touchmove: none
								// - touchend: mouseup
								case 'tap':
								case 'swipe':
									// _$element.get(0).addEventListener('mousedown', _onTouchstart, false);
									 _$element.bind('mousedown', _onTouchstart);
								break;

								// no substitution
								case 'orientationchange':
								case 'pinchopen':
								case 'pinchclose' :
								case 'rotatecw' :
								case 'rotateccw' :
								case 'pinch':
								case 'rotate':
								case 'shake':
								case 'tilt':

								break;
							}
						}

					}
					return false;
				},

				/**
				* For every $.bind(GESTURE) the add-function will be called.
				* Instead of binding an actual eventlister, the event is stored as $.data on the element.
				* The handler will be triggered using $.triggerHandler(GESTURE) if the internal
				* eventhandler (proxy being bound on setup()) detects a GESTURE event
				* @param {Object} event_ jQuery-Event-Object being passed by $.bind()
				* @return {Void}
				*/
				add : function(event_) {
					// add pseudo event: properties on $.data
					var _$element = jQuery(this);
					var _oDatajQueryGestures = _$element.data('ojQueryGestures');
//					_oDatajQueryGestures[event_.type] = { 'originalType' : event_.type , 'threshold' : event_.data.threshold, 'preventDefault' : event_.data.preventDefault } ;
					_oDatajQueryGestures[event_.type] = { 'originalType' : event_.type } ;
					return false;
				},

				/**
				* For every $.unbind(GESTURE) the remove-function will be called.
				* Instead of removing the actual eventlister, the event is removed from $.data on the element.
				* @param {Object} event_ jQuery-Event-Object being passed by $.bind()
				* @return {Void}
				*/
				remove : function(event_) {
					// remove pseudo event: properties on $.data
					var _$element = jQuery(this);
					var _oDatajQueryGestures = _$element.data('ojQueryGestures');
					_oDatajQueryGestures[event_.type] = false;
					_$element.data('ojQueryGestures' ,_oDatajQueryGestures );
					return false;
				},

				/**
				* The last $.unbind()-call on the domElement triggers the teardown function
				* removing the eventlistener
				* @return {Void}
				*/
				// @TODO: maybe rework teardown to work with event type?!
				teardown : function() {
					// split the arguments to necessary controll arguements
					var _aSplit = sInternal_.split('_');
					var _sDOMEvent = _aSplit[0]; //
					// get the associated gesture event and strip the counter: necessary for distinguisihng similliar events such as tapone-tapfour
					var _sGestureEvent = _aSplit[1].slice(0,_aSplit[1].length-2);
					var _$element = jQuery(this);
					var _oDatajQueryGestures;
					var oObj;
					// bind the event handler on the first $.bind() for a gestureend-event, set marker
					if (!_$element.data('ojQueryGestures') || !_$element.data('ojQueryGestures')[_sDOMEvent])  {
						// setup pseudo event
						_oDatajQueryGestures = _$element.data('ojQueryGestures') || {};
						oObj = {};
						// remove marker for:  domEvent being set on this element
						oObj[_sDOMEvent] = false;
						$.extend(true,_oDatajQueryGestures,oObj);
						_$element.data('ojQueryGestures' ,_oDatajQueryGestures);

						// remove gesture events
						if($.hasGestures) {
							switch(_sGestureEvent) {

								// event: orientationchange
								case 'orientationchange':
									_$element.get(0).removeEventListener('orientationchange', _onOrientationchange, false);
								break;

								case 'shake':
								case 'shakefrontback':
								case 'shakeleftright':
								case 'shakeupdown':
								case 'tilt':
									_$element.get(0).removeEventListener('devicemotion', _onDevicemotion, false);
								break;

								// event :
								// - touchstart
								// - touchmove
								// - touchend
								case 'tap':
								case 'swipe':
								case 'swipeup':
								case 'swiperightup':
								case 'swiperight':
								case 'swiperightdown':
								case 'swipedown':
								case 'swipeleftdown':
								case 'swipeleft':
								case 'swipeleftup':
									_$element.get(0).removeEventListener('touchstart', _onTouchstart, false);
									_$element.get(0).removeEventListener('touchmove', _onTouchmove, false);
									_$element.get(0).removeEventListener('touchend', _onTouchend, false);
								break;

								// event: gestureend
								case 'pinchopen':
								case 'pinchclose' :
								case 'rotatecw' :
								case 'rotateccw' :
									_$element.get(0).removeEventListener('gesturestart', _onGesturestart, false);
									_$element.get(0).removeEventListener('gestureend', _onGestureend, false);
								break;

								// event: gesturechange
								case 'pinch':
								case 'rotate':
									_$element.get(0).removeEventListener('gesturestart', _onGesturestart, false);
									_$element.get(0).removeEventListener('gesturechange', _onGesturechange, false);
								break;
							}
						}
						// remove substitute for gesture events
						else {
							switch(_sGestureEvent) {
								// event substitutes:
								// - touchstart: mousedown
								// - touchmove: none
								// - touchend: mouseup
								case 'tap':
								case 'swipe':
//									_$element.get(0).removeEventListener('mousedown', _onTouchstart, false);
//									_$element.get(0).removeEventListener('mousemove', _onTouchmove, false);
//									_$element.get(0).removeEventListener('mouseup', _onTouchend, false);
									_$element.unbind('mousedown', _onTouchstart);
									_$element.unbind('mousemove', _onTouchmove);
									_$element.unbind('mouseup', _onTouchend);
								break;

								// no substitution
								case 'orientationchange':
								case 'pinchopen':
								case 'pinchclose' :
								case 'rotatecw' :
								case 'rotateccw' :
								case 'pinch':
								case 'rotate':
								case 'shake':
								case 'tilt':

								break;
							}
						}

					}
				return false;
				}

			};
		});

	/**
	* Creates the object that ist passed as second argument to the $element.triggerHandler function.
	* This object contains detailed informations about the gesture event.
	* @param {Object} oOptions_  {type: {String}, touches: {String}, deltaY: {String},deltaX : {String}, startMove: {Object}, event:{DOM-Event}, timestamp:{String},vector: {Number}}
	* @example _createOptions (
	*				{
	*					type: 'swipemove',
	*					touches: '1',
	*					deltaY: _iDeltaY,
	*					deltaX : _iDeltaX,
	*					startMove: _oDatajQueryGestures.oStartTouch,
	*					event:event_,
	*					timestamp:_oEventData.timestamp,
	*					vector: -1
	*				}
	*			);
	* @returns {Object}
	*			{
	*				type: eventtype e.g. "swipe","pinch",
	*				originalEvent: {DOM-Event},
	*				// default: just one entry on the delta-array - the first touchpoint
	*				// the first touchpoint is the reference point for every gesture,
	*				// because moving touchpoints in various directions would result in
	*				// a gesture.
	*				// delta and direction details are just provided for touch not for gesture / motion events
	*				delta : [
	*					{
	*						lastX:{Number} , // x-axis: relative to the last touchevent (e.g. touchmove!)
	*						lastY:{Number}, // y-axis: relative to the last touchevent (e.g. touchmove!)
	*						moved: {Number},  // distance: relative to the original touchpoint
	*						startX: {Number} , // relative to the original touchpoint
	*						startY: {Number} ,// relative to the original touchpoint
	*					} ],
	*				// based on the first touchpoint
	*				direction : { // relative to the last touchevent (e.g. touchmove!)
	*					vector: {Number}, // -1|+1, indicates the direction if necessary(pinch/rotate)
	*					orientation: {Number} // window.orientation: -90,0,90,180 || null (window.orienntation)
	*					lastX : {Number}, // -1,0,+1 relative to the last touchevent (e.g. touchmove!)
	*					lastY : {Number}, // -1,0,+1 relative to the last touchevent (e.g. touchmove!)
	*					startX: {Number} , //-1,0,+1 relative to the original touchpoint
	*					startY: {Number} ,// -1,0,+1 relative to the original touchpoint
	*				},
	*				rotation: {Number} || null, // gestureonly: amount of rotation relative to the current position NOT the original
	*				scale: {Number} || null, // gestureonly: amount of scaling relative to the current position NOT the original
	*				duration: {Number}, // ms: relative to the original touchpoint
	*				description : {String} // details as String: {TYPE *}:{TOUCHES 1|2|3|4}:{X-AXIS 'right'|'left'|'steady'}:{Y-AXIS 'down'|'up'|'steady'} e.g. "swipe:1:left:steady" relative to the last touchpoint
	*			};
	*/
	function _createOptions(oOptions_) {
		// force properties
		oOptions_.startMove = (oOptions_.startMove) ? oOptions_.startMove : {startX: null,startY:null,timestamp:null}  ;
		var _iNow = new Date().getTime();
		var _oDirection;
		var _oDelta;
		// calculate touch differences
		if (oOptions_.touches) {
			// store delta values
			_oDelta = [
				{
					lastX: oOptions_.deltaX ,
					lastY: oOptions_.deltaY,
					moved: null,
					startX:  oOptions_.screenX - oOptions_.startMove.screenX ,
					startY: oOptions_.screenY - oOptions_.startMove.screenY
				}
			];

			_oDirection =  {
				vector: oOptions_.vector || null,
				orientation : window.orientation || null,
				lastX : ((_oDelta[0].lastX > 0) ? +1 : ( (_oDelta[0].lastX < 0) ? -1 : 0 ) ),
				lastY : ((_oDelta[0].lastY > 0) ? +1 : ( (_oDelta[0].lastY < 0) ? -1 : 0 ) ),
				startX : ((_oDelta[0].startX > 0) ? +1 : ( (_oDelta[0].startX < 0) ? -1 : 0 ) ),
				startY : ((_oDelta[0].startY > 0) ? +1 : ( (_oDelta[0].startY < 0) ? -1 : 0 ) )
			};

			// calculate distance traveled using the pythagorean theorem
			_oDelta[0].moved =  Math.sqrt(Math.pow(Math.abs(_oDelta[0].startX), 2) + Math.pow(Math.abs(_oDelta[0].startY), 2));

		}
		return {
			type: oOptions_.type || null,
			originalEvent: oOptions_.event || null,
			delta : _oDelta  || null,
			direction : _oDirection || { orientation : window.orientation || null, vector: oOptions_.vector || null},
			duration: (oOptions_.duration) ? oOptions_.duration : ( oOptions_.startMove.timestamp ) ? _iNow - oOptions_.timestamp : null,
			rotation: oOptions_.rotation || null,
			scale: oOptions_.scale || null,
			description : oOptions_.description || [
				oOptions_.type,
				':',
				oOptions_.touches,
				':',
				((_oDelta[0].lastX != 0) ? ((_oDelta[0].lastX > 0) ? 'right' : 'left') : 'steady'),
				':',
				((_oDelta[0].lastY != 0) ? ( (_oDelta[0].lastY > 0) ? 'down' : 'up') :'steady')
				].join('')
		};

	}



	/**
	* DOM-event handlers
	*/

	/**
	* Handler: orientationchange
	* Triggers the bound orientationchange handler on the window element
	* The "orientationchange" handler will receive an object with additional information
	* about the event.
	*  {
	*	direction : {
	*		orientation: {-90|0|90|180}
	*	},
	*	description : [
	*		'orientationchange:{landscape:clockwise:|portrait:default|landscape:counterclockwise|portrait:upsidedown}:{-90|0|90|180}' // e.g. 'orientation:landscape:clockwise:-90
	*	}
	* @param {DOM-Event} event_
	* @return {Void}
	*/
	function _onOrientationchange(event_) {

		// window.orientation: -90,0,90,180
		var _aDict = ['landscape:clockwise:','portrait:default:','landscape:counterclockwise:','portrait:upsidedown:'];

		$(window).triggerHandler('orientationchange',
			{
				direction : {orientation: window.orientation},
				description : [
					'orientationchange:',
					_aDict[( (window.orientation / 90) +1)],
					window.orientation
					].join('')
			});
	}


	/**
	* Handler: devicemotion
	* Calculates "motion events" such as shake, tilt, wiggle by observing "changes in space"
	* For understanding "directions", place your mobile device on a table with the bottom
	* (home button) close to you:
	*  - x-axis: horizontal left / right
	*  - y-axis: horizontal front / back (through the home button)
	*  - z-axis: vertical through your device
	* @param {DOM-Event} event_
	* @returns {Object}
	*			{
	*				type: eventtype e.g. "shake",
	*				originalEvent: {DOM-Event},
	*				// delta and direction details are just provided for touch not for gesture / motion events
	*				delta : null,
	*				direction :{
	*					vector: null,
	*					orientation: -90,0,90,180 || null (window.orienntation)
	*				}
	*				rotation: {Number} , //  amount of rotation relative to the current position NOT the original
	*				scale: {Number} , // amount of scaling relative to the current position NOT the original
	*				duration: {Number}, // ms: duration of the motion
	*				description : {String} // details as String: pinch:{'close'|'open'} e.g. "pinch:-1:close" ||  rotate:{'counterclockwise'|'clockwise'} e.g. "rotate:-1:counterclockwise"
	*			};
	* @param {DOM-Event} event_
	* @return {Void}
	*/
	function _onDevicemotion(event_) {

		var _sType;
		var _$element = jQuery(window);
		//var _bHasGyroscope = $.hasGyroscope;

		// skip custom notification: devicemotion is triggered every 0.05s regardlesse of any gesture

		// get options
		var _oDatajQueryGestures = _$element.data('ojQueryGestures');

		var _oThreshold = $.jGestures.defaults.thresholdShake;

		// get last position or set initital values
		var _oLastDevicePosition = _oDatajQueryGestures.oDeviceMotionLastDevicePosition || {
			accelerationIncludingGravity : {
				x: 0,
				y: 0,
				z: 0
			},
			shake : {
				eventCount: 0,
				intervalsPassed: 0,
				intervalsFreeze: 0
			},
			shakeleftright : {
				eventCount: 0,
				intervalsPassed: 0,
				intervalsFreeze: 0
			},
			shakefrontback : {
				eventCount: 0,
				intervalsPassed: 0,
				intervalsFreeze: 0
			},
			shakeupdown : {
				eventCount: 0,
				intervalsPassed: 0,
				intervalsFreeze: 0
			}
		};

		// cache current values
		var _oCurrentDevicePosition = {
			accelerationIncludingGravity : {
				x: event_.accelerationIncludingGravity.x,
				y: event_.accelerationIncludingGravity.y,
				z: event_.accelerationIncludingGravity.z
			},
			shake: {
				eventCount: _oLastDevicePosition.shake.eventCount,
				intervalsPassed: _oLastDevicePosition.shake.intervalsPassed,
				intervalsFreeze: _oLastDevicePosition.shake.intervalsFreeze
			 },
			 shakeleftright: {
				eventCount: _oLastDevicePosition.shakeleftright.eventCount,
				intervalsPassed: _oLastDevicePosition.shakeleftright.intervalsPassed,
				intervalsFreeze: _oLastDevicePosition.shakeleftright.intervalsFreeze
			 },
			 shakefrontback: {
				eventCount: _oLastDevicePosition.shakefrontback.eventCount,
				intervalsPassed: _oLastDevicePosition.shakefrontback.intervalsPassed,
				intervalsFreeze: _oLastDevicePosition.shakefrontback.intervalsFreeze
			 },
			 shakeupdown: {
				eventCount: _oLastDevicePosition.shakeupdown.eventCount,
				intervalsPassed: _oLastDevicePosition.shakeupdown.intervalsPassed,
				intervalsFreeze: _oLastDevicePosition.shakeupdown.intervalsFreeze
			 }

		};


		// options
		var _aType;
		var _aDescription;
		var _oObj;


		// trigger events for all bound pseudo events on this element
		for (_sType in _oDatajQueryGestures) {
			// get current pseudo event


			// trigger bound events on this element
			switch(_sType) {

				case 'shake':
				case 'shakeleftright':
				case 'shakefrontback':
				case 'shakeupdown':

					// options
					_aType = [];
					_aDescription = [];

					_aType.push(_sType);

					// freeze shake - prevent multiple shake events on one  shaking motion (user won't stop shaking immediately)
					if (++_oCurrentDevicePosition[_sType].intervalsFreeze > _oThreshold.freezeShakes && _oCurrentDevicePosition[_sType].intervalsFreeze < (2*_oThreshold.freezeShakes) ) { break;	}

					// set control values
					_oCurrentDevicePosition[_sType].intervalsFreeze  = 0;
					_oCurrentDevicePosition[_sType].intervalsPassed++;

					// check for shaking motions: massive acceleration changes in every direction
					if ( ( _sType === 'shake' ||_sType === 'shakeleftright' ) && ( _oCurrentDevicePosition.accelerationIncludingGravity.x > _oThreshold.leftright.sensitivity  || _oCurrentDevicePosition.accelerationIncludingGravity.x < (-1* _oThreshold.leftright.sensitivity) ) ) {
						_aType.push('leftright');
						_aType.push('x-axis');
					}

					if ( ( _sType === 'shake' ||_sType === 'shakefrontback' ) && (_oCurrentDevicePosition.accelerationIncludingGravity.y > _oThreshold.frontback.sensitivity  || _oCurrentDevicePosition.accelerationIncludingGravity.y < (-1 * _oThreshold.frontback.sensitivity) ) ) {
						_aType.push('frontback');
						_aType.push('y-axis');
					}

					if ( ( _sType === 'shake' ||_sType === 'shakeupdown' ) && ( _oCurrentDevicePosition.accelerationIncludingGravity.z+9.81 > _oThreshold.updown.sensitivity  || _oCurrentDevicePosition.accelerationIncludingGravity.z+9.81 < (-1 * _oThreshold.updown.sensitivity) ) ) {
						_aType.push('updown');
						_aType.push('z-axis');
					}

					// at least one successful shaking event
					if (_aType.length > 1) {
						// minimum number of shaking motions during  the defined "time" (messured by events - device event interval: 0.05s)
						if (++_oCurrentDevicePosition[_sType].eventCount == _oThreshold.requiredShakes && (_oCurrentDevicePosition[_sType].intervalsPassed) < _oThreshold.freezeShakes ) {
							// send event
							_$element.triggerHandler(_sType, _createOptions ({type: _sType, description: _aType.join(':'), event:event_,duration:_oCurrentDevicePosition[_sType].intervalsPassed*5 }) );
							// reset
							_oCurrentDevicePosition[_sType].eventCount = 0;
							_oCurrentDevicePosition[_sType].intervalsPassed = 0;
							// freeze shake
							_oCurrentDevicePosition[_sType].intervalsFreeze = _oThreshold.freezeShakes+1;
						}
						// too slow, reset
						else if (_oCurrentDevicePosition[_sType].eventCount == _oThreshold.requiredShakes && (_oCurrentDevicePosition[_sType].intervalsPassed) > _oThreshold.freezeShakes ) {
							_oCurrentDevicePosition[_sType].eventCount = 0 ;
							_oCurrentDevicePosition[_sType].intervalsPassed = 0;
						}
					}
				break;

			}

			// refresh pseudo events
			_oObj = {};
			_oObj.oDeviceMotionLastDevicePosition = _oCurrentDevicePosition;
			_$element.data('ojQueryGestures',$.extend(true,_oDatajQueryGestures,_oObj));

		}
	}


	/**
	* Handler: touchstart or mousedown
	* Setup pseudo-event by storing initial values such as :
	*	screenX : {Number}
	*	screenY : {Number}
	*	timestamp: {Number}
	*  on the pseudo gesture event and
	*  sets up additional eventlisteners for handling touchmove events.
	* @param {DOM-Event} event_
	* @return {Void}
	*/
	function _onTouchstart(event_) {

		// ignore bubbled handlers
		// if ( event_.currentTarget !== event_.target ) { return; }

		var _$element = jQuery(event_.currentTarget);
		// var _$element = jQuery(event_.target);

		// trigger custom notification
		_$element.triggerHandler($.jGestures.events.touchstart,event_);


		// set the necessary touch events
		if($.hasGestures) {
			event_.currentTarget.addEventListener('touchmove', _onTouchmove, false);
			event_.currentTarget.addEventListener('touchend', _onTouchend, false);
		}
		// event substitution
		else {
//			event_.currentTarget.addEventListener('mousemove', _onTouchmove, false);
//			event_.currentTarget.addEventListener('mouseup', _onTouchend, false);
			_$element.bind('mousemove', _onTouchmove);
			_$element.bind('mouseup', _onTouchend);
		}

		// get stored pseudo event
		var _oDatajQueryGestures = _$element.data('ojQueryGestures');

		// var _oEventData = _oDatajQueryGestures[_sType];
		var _eventBase = (event_.touches) ? event_.touches[0] : event_;
		// store current values for calculating relative values (changes between touchmoveevents)
		var _oObj = {};
		_oObj.oLastSwipemove = { screenX : _eventBase.screenX, screenY : _eventBase.screenY, timestamp:new Date().getTime()};
		_oObj.oStartTouch = { screenX : _eventBase.screenX, screenY : _eventBase.screenY, timestamp:new Date().getTime()};

		_$element.data('ojQueryGestures',$.extend(true,_oDatajQueryGestures,_oObj));
	}


	/**
	* Handler: touchmove or mousemove
	* Calculates the x/y changes since the last event,
	* compares it to $.jGestures.defaults.thresholdMove and triggers
	* an swipemove event if the distance exceed the
	* threshold.
	* Custom-event argument object:
	* {Object}
	*			{
	*				type: e.g. 'swipemove',
	*				≈: {DOM-Event},
	*				// default: just one entry on the delta-array - the first touchpoint
	*				// the first touchpoint is the reference point for every gesture,
	*				// because moving touchpoints in various directions would result in
	*				// a gesture.
	*				// delta and direction details are just provided for touch not for gesture / motion events
	*				delta : [
	*					{
	*						lastX:{Number} , // x-axis: relative to the last touchevent (e.g. touchmove!)
	*						lastY:{Number}, // y-axis: relative to the last touchevent (e.g. touchmove!)
	*						moved: {Number},  // distance: relative to the original touchpoint
	*						startX: {Number} , // relative to the original touchpoint
	*						startY: {Number} ,// relative to the original touchpoint
	*					} ],
	*				// based on the first touchpoint
	*				direction : { // relative to the last touchevent (e.g. touchmove!)
	*					vector: {Number}, // -1|+1, indicates the direction if necessary(pinch/rotate)
	*					orientation: {Number} // window.orientation: -90,0,90,180 || null (window.orienntation)
	*					lastX : {Number}, // -1,0,+1 relative to the last touchevent (e.g. touchmove!)
	*					lastY : {Number}, // -1,0,+1 relative to the last touchevent (e.g. touchmove!)
	*					startX: {Number} , //-1,0,+1 relative to the original touchpoint
	*					startY: {Number} ,// -1,0,+1 relative to the original touchpoint
	*				},
	*				rotation: null, // gestureonly: amount of rotation relative to the current position NOT the original
	*				scale: null, // gestureonly: amount of scaling relative to the current position NOT the original
	*				duration: {Number}, // ms: relative to the original touchpoint
	*				description : {String} // details as String: {TYPE *}:{TOUCHES 1|2|3|4}:{X-AXIS 'right'|'left'|'steady'}:{Y-AXIS 'down'|'up'|'steady'} e.g. "swipe:1:left:steady" relative to the last touchpoint
	*			};
	*
	* @param {DOM-Event} event_
	* @return {Void}
	*/
	function _onTouchmove(event_) {

		var _$element = jQuery(event_.currentTarget);
		// var _$element = jQuery(event_.target);

		// get stored pseudo event
		var _oDatajQueryGestures = _$element.data('ojQueryGestures');

		var _bHasTouches = !!event_.touches;
		var _iScreenX = (_bHasTouches) ? event_.changedTouches[0].screenX : event_.screenX;
		var _iScreenY = (_bHasTouches) ? event_.changedTouches[0].screenY : event_.screenY;

		//relative to the last event
		var _oEventData = _oDatajQueryGestures.oLastSwipemove;
		var _iDeltaX = _iScreenX - _oEventData.screenX   ;
		var _iDeltaY = _iScreenY - _oEventData.screenY;

		var _oDetails;

			// there's a swipemove set (not the first occurance), trigger event
		if (!!_oDatajQueryGestures.oLastSwipemove) {
			// check
			_oDetails = _createOptions({type: 'swipemove', touches: (_bHasTouches) ? event_.touches.length: '1', screenY: _iScreenY,screenX:_iScreenX ,deltaY: _iDeltaY,deltaX : _iDeltaX, startMove:_oEventData, event:event_, timestamp:_oEventData.timestamp});
			_$element.triggerHandler(_oDetails.type,_oDetails);
		}
		// store the new values
		var _oObj = {};
		var _eventBase = (event_.touches) ? event_.touches[0] : event_;
		_oObj.oLastSwipemove = { screenX : _eventBase.screenX, screenY : _eventBase.screenY, timestamp:new Date().getTime()};
		_$element.data('ojQueryGestures',$.extend(true,_oDatajQueryGestures,_oObj));
	}


	/**
	* Handler: touchend or mouseup
	* Removes the additional handlers (move/end)
	* Calculates the x/y changes since the touchstart event
	* not in relation to the last move event.
	* Triggers the
	*	swipeone|swipetwo|swipethree|swipefour|
	*	swipeup|swiperightup|swiperight|swiperightdown|swipedown|
	*	swipeleftdown|swipeleft|swipeleftup|
	*	tapone|taptwo|tapthree|tapfour
	* event.
	*		{Object}
	*			{
	*				type: eventtype e.g. "swipeone","swipeleftdown",
	*				originalEvent: {DOM-Event},
	*				// default: just one entry on the delta-array - the first touchpoint
	*				// the first touchpoint is the reference point for every gesture,
	*				// because moving touchpoints in various directions would result in
	*				// a gesture.
	*				// delta and direction details are just provided for touch not for gesture / motion events
	*				delta : [
	*					{
	*						lastX:{Number} , // x-axis: relative to the last touchevent (e.g. touchmove!)
	*						lastY:{Number}, // y-axis: relative to the last touchevent (e.g. touchmove!)
	*						moved: {Number},  // distance: relative to the original touchpoint
	*						startX: {Number} , // relative to the original touchpoint
	*						startY: {Number} ,// relative to the original touchpoint
	*					} ],
	*				// based on the first touchpoint
	*				direction : { // relative to the last touchevent (e.g. touchmove!)
	*					vector: {Number}, // -1|+1, indicates the direction if necessary(pinch/rotate)
	*					orientation: {Number} // window.orientation: -90,0,90,180 || null (window.orienntation)
	*					lastX : {Number}, // -1,0,+1 relative to the last touchevent (e.g. touchmove!)
	*					lastY : {Number}, // -1,0,+1 relative to the last touchevent (e.g. touchmove!)
	*					startX: {Number} , //-1,0,+1 relative to the original touchpoint
	*					startY: {Number} ,// -1,0,+1 relative to the original touchpoint
	*				},
	*				rotation: null,
	*				scale: null ,
	*				duration: {Number}, // ms: relative to the original touchpoint
	*				description : {String} // details as String: {TYPE *}:{TOUCHES 1|2|3|4}:{X-AXIS 'right'|'left'|'steady'}:{Y-AXIS 'down'|'up'|'steady'} e.g. "swipe:1:left:steady" relative to the last touchpoint
	*			};
	* @param {DOM-Event} event_
	* @return {Void}
	*/
	function _onTouchend(event_) {

		// ignore bubbled handlers
		// if ( event_.currentTarget !== event_.target ) { return; }

		var _$element = jQuery(event_.currentTarget);
		var _bHasTouches = !!event_.changedTouches;
		var _iTouches = (_bHasTouches) ? event_.changedTouches.length : '1';
		var _iScreenX = (_bHasTouches) ? event_.changedTouches[0].screenX : event_.screenX;
		var _iScreenY = (_bHasTouches) ? event_.changedTouches[0].screenY : event_.screenY;

		// trigger custom notification
		_$element.triggerHandler($.jGestures.events.touchendStart,event_);

		// var _$element = jQuery(event_.target);
		// remove events
		if($.hasGestures) {
			event_.currentTarget.removeEventListener('touchmove', _onTouchmove, false);
			event_.currentTarget.removeEventListener('touchend', _onTouchend, false);
		}
		// event substitution
		else {
//			event_.currentTarget.removeEventListener('mousemove', _onTouchmove, false);
//			event_.currentTarget.removeEventListener('mouseup', _onTouchend, false);
			_$element.unbind('mousemove', _onTouchmove);
			_$element.unbind('mouseup', _onTouchend);
		}
		// get all bound pseudo events
		var _oDatajQueryGestures = _$element.data('ojQueryGestures');

		// if the current change on the x/y position is above the defined threshold for moving an element set the moved flag
		// to distinguish between a moving gesture and a shaking finger trying to tap
		var _bHasMoved = (
			Math.abs(_oDatajQueryGestures.oStartTouch.screenX - _iScreenX) > $.jGestures.defaults.thresholdMove ||
			Math.abs(_oDatajQueryGestures.oStartTouch.screenY - _iScreenY) > $.jGestures.defaults.thresholdMove
		) ? true : false;

		// if the current change on the x/y position is above the defined threshold for swiping set the moved flag
		// to indicate we're dealing with a swipe gesture
		var _bHasSwipeGesture = (
			Math.abs(_oDatajQueryGestures.oStartTouch.screenX - _iScreenX) > $.jGestures.defaults.thresholdSwipe ||
			Math.abs(_oDatajQueryGestures.oStartTouch.screenY - _iScreenY) > $.jGestures.defaults.thresholdSwipe
		) ? true : false;


		var _sType;
		var _oEventData ;

		var _oDelta;

		// calculate distances in relation to the touchstart position not the last touchmove event!
		var _iDeltaX;
		var _iDeltaY;
		var _oDetails;

		var _aDict = ['zero','one','two','three','four'];

		// swipe marker
		var _bIsSwipe;


		// trigger events for all bound pseudo events on this element
		for (_sType in _oDatajQueryGestures) {

			// get current pseudo event
			_oEventData = _oDatajQueryGestures.oStartTouch;

			_oDelta = {};
			_iScreenX = (_bHasTouches) ? event_.changedTouches[0].screenX : event_.screenX;
			_iScreenY = (_bHasTouches) ? event_.changedTouches[0].screenY : event_.screenY;
			// calculate distances in relation to the touchstart position not the last touchmove event!
			_iDeltaX = _iScreenX - _oEventData.screenX ;
			_iDeltaY = _iScreenY - _oEventData.screenY;
			_oDetails = _createOptions({type: 'swipe', touches: _iTouches, screenY: _iScreenY,screenX:_iScreenX ,deltaY: _iDeltaY,deltaX : _iDeltaX, startMove:_oEventData, event:event_, timestamp:  _oEventData.timestamp });


			// swipe marker
			_bIsSwipe = false;

			// trigger bound events on this element
			switch(_sType) {
				case 'swipeone':

					if( _bHasTouches === false && _iTouches == 1 && _bHasMoved === false){
						// trigger tapone!
						break;
					}
					if (_bHasTouches===false || ( _iTouches == 1  && _bHasMoved === true && _bHasSwipeGesture===true)) {
						_bIsSwipe = true;

						_oDetails.type = ['swipe',_aDict[_iTouches]].join('');
						_$element.triggerHandler(_oDetails.type,_oDetails);
					}
				break;

				case 'swipetwo':
					if (( _bHasTouches && _iTouches== 2 && _bHasMoved === true && _bHasSwipeGesture===true)) {
						_bIsSwipe = true;
						_oDetails.type = ['swipe',_aDict[_iTouches]].join('');
						_$element.triggerHandler(_oDetails.type,_oDetails);
					}
				break;

				case 'swipethree':
					if ( ( _bHasTouches && _iTouches == 3 && _bHasMoved === true && _bHasSwipeGesture===true)) {
						_bIsSwipe = true;
						_oDetails.type = ['swipe',_aDict[_iTouches]].join('');
						_$element.triggerHandler(_oDetails.type,_oDetails);
					}
				break;

				case 'swipefour':
					if ( ( _bHasTouches && _iTouches == 4 && _bHasMoved === true && _bHasSwipeGesture===true)) {
						_bIsSwipe = true;
						_oDetails.type = ['swipe',_aDict[_iTouches]].join('');
						_$element.triggerHandler(_oDetails.type,_oDetails);
					}
				break;

				case 'swipeup':
				case 'swiperightup':
				case 'swiperight':
				case 'swiperightdown':
				case 'swipedown':
				case 'swipeleftdown':
				case 'swipeleft':
				case 'swipeleftup':
					if ( _bHasTouches && _bHasMoved === true && _bHasSwipeGesture===true) {
						_bIsSwipe = true;
						var deltaX = _oDetails.delta[0].lastX;
						var deltaY = _oDetails.delta[0].lastY;
						var hor = ver = '';
						if (deltaX > 0) { // right
							hor = 'right';
							if (deltaY > 0) {
								ver = 'down'
							} else {
								ver = 'up';
							}

							if (Math.abs(deltaY) < deltaX * 0.3) {
								ver = '';
							} else if (Math.abs(deltaY) >= deltaX * 2.2) {
								hor = '';
							}
						} else { // left
							hor = 'left';
							if (deltaY > 0) {
								ver = 'down'
							} else {
								ver = 'up';
							}

							if (Math.abs(deltaY) < Math.abs(deltaX) * 0.3) {
								ver = '';
							} else if (Math.abs(deltaY) > Math.abs(deltaX) * 2.2) {
								hor = '';
							}
						}
						// (_oDetails.delta[0].lastX < 0) -> 'left'
						// (_oDetails.delta[0].lastY > 0) -> 'down'
						// (_oDetails.delta[0].lastY < 0) -> 'up'
						// alert('function swipe_' + hor + '_' + ver);

						_oDetails.type = ['swipe', hor, ver].join('');
						_$element.triggerHandler(_oDetails.type, _oDetails);
					}
				break;

				case 'tapone':
				case 'taptwo':
				case 'tapthree':
				case 'tapfour':
					if (( /* _bHasTouches && */ _bHasMoved !== true && _bIsSwipe !==true) && (_aDict[_iTouches] ==_sType.slice(3)) ) {
						_oDetails.description = ['tap',_aDict[_iTouches]].join('');
						_oDetails.type = ['tap',_aDict[_iTouches]].join('');
						_$element.triggerHandler(_oDetails.type,_oDetails);
						}
					break;

			}

			// refresh pseudo events
			var _oObj = {};
//			_oObj[_sType] = false;
//			_oObj.hasTouchmoved = false;
			_$element.data('ojQueryGestures',$.extend(true,_oDatajQueryGestures,_oObj));
			_$element.data('ojQueryGestures',$.extend(true,_oDatajQueryGestures,_oObj));

		}
		_$element.triggerHandler($.jGestures.events.touchendProcessed,event_);
	}


	/**
	* Handler: gesturestart
	* Setup pseudo-event by storing initial values such as :
	*	timestamp: {Number}
	*  on the pseudo gesture event
	* Since the gesture-event doesn't supply event.touches no tuchpoints will be calculated
	* @param {DOM-Event} event_
	* @return {Void}
	*/
	function _onGesturestart(event_) {

		// ignore bubbled handlers
		// if ( event_.currentTarget !== event_.target ) { return; }

		var _$element = jQuery(event_.currentTarget);
		// var _$element = jQuery(event_.target);

		// trigger custom notification
		_$element.triggerHandler($.jGestures.events.gesturestart,event_);


		// get stored pseudo event
		var _oDatajQueryGestures = _$element.data('ojQueryGestures');

		// var _oEventData = _oDatajQueryGestures[_sType];
		// store current values for calculating relative values (changes between touchmoveevents)
		var _oObj = {};
		_oObj.oStartTouch = {timestamp:new Date().getTime()};
		_$element.data('ojQueryGestures',$.extend(true,_oDatajQueryGestures,_oObj));
	}

	/**
	* Handler: gesturechange
	* Read the event_.scale / event_.rotate values,
	* an triggers a pinch|rotate event if necessary.
	* Since the gesture-event doesn't supply event.touches no tuchpoints will be calculated
	* @returns {Object}
	*			{
	*				type: eventtype e.g. "pinch","rotate",
	*				originalEvent: {DOM-Event},
	*				// delta and direction details are just provided for touch not for gesture / motion events
	*				delta : null,
	*				direction : {
	*					vector: {Number}, // -1|+1, indicates the direction if necessary(pinch/rotate)
	*					 orientation: {Number} // window.orientation: -90,0,90,180 || null (window.orienntation)
	*				 },
	*				rotation: {Number} , //  amount of rotation relative to the current position NOT the original
	*				scale: {Number} , // amount of scaling relative to the current position NOT the original
	*				duration: {Number}, // ms: relative to the original touchpoint
	*				description : {String} // details as String: pinch:{'close'|'open'} e.g. "pinch:-1:close" ||  rotate:{'counterclockwise'|'clockwise'} e.g. "rotate:-1:counterclockwise"
	*			};
	* @param {DOM-Event} event_
	* @return {Void}
	*/
	function _onGesturechange(event_) {

		// ignore bubbled handlers
		// if ( event_.currentTarget !== event_.target ) { return; }

		var _$element = jQuery(event_.currentTarget);
		// var _$element = jQuery(event_.target);
		var _iDelta,_iDirection,_sDesc,_oDetails;
		// get all pseudo events
		var _oDatajQueryGestures = _$element.data('ojQueryGestures');

		// trigger events for all bound pseudo events on this element
		var _sType;
		for (_sType in _oDatajQueryGestures) {

			// trigger a specific bound event
			switch(_sType) {

				case 'pinch':
					_iDelta = event_.scale;
					if ( ( ( _iDelta < 1 ) && (_iDelta % 1) < (1 - $.jGestures.defaults.thresholdPinchclose) ) || ( ( _iDelta > 1 ) && (_iDelta % 1) > ($.jGestures.defaults.thresholdPinchopen) ) ) {
						_iDirection = (_iDelta < 1 ) ? -1 : +1 ;
						_oDetails = _createOptions({type: 'pinch', scale: _iDelta, touches: null,startMove:_oDatajQueryGestures.oStartTouch, event:event_, timestamp: _oDatajQueryGestures.oStartTouch.timestamp, vector:_iDirection, description: ['pinch:',_iDirection,':' , ( (_iDelta < 1 ) ? 'close' : 'open' )].join('') });
						_$element.triggerHandler(_oDetails.type, _oDetails);
					}
				break;

				case 'rotate':
					_iDelta = event_.rotation;
					if ( ( ( _iDelta < 1 ) &&  ( -1*(_iDelta) > $.jGestures.defaults.thresholdRotateccw ) ) || ( ( _iDelta > 1 ) && (_iDelta  > $.jGestures.defaults.thresholdRotatecw) ) ) {
						_iDirection = (_iDelta < 1 ) ? -1 : +1 ;
						_oDetails = _createOptions({type: 'rotate', rotation: _iDelta, touches: null, startMove:_oDatajQueryGestures.oStartTouch, event:event_, timestamp: _oDatajQueryGestures.oStartTouch.timestamp, vector:_iDirection, description: ['rotate:',_iDirection,':' , ( (_iDelta < 1 ) ? 'counterclockwise' : 'clockwise' )].join('') });
						_$element.triggerHandler(_oDetails.type, _oDetails);
					}
				break;

			}
		}

	}


	/**
	* Handler: gestureend
	* Read the event_.scale / event_.rotate values,
	* compares it to $.jGestures.defaults.threshold* and triggers
	* a pinchclose|pinchclose|rotatecw|rotateccw event if the distance exceed the
	* Since the gesture-event doesn't supply event.touches no tuchpoints will be calculated
	* * Custom-event argument object:
	* @returns {Object}
	*			{
	*				type: eventtype e.g. "pinchclose","pinchopen", "rotatecw", "rotateccw",
	*				originalEvent: {DOM-Event},
	*				// delta and direction details are just provided for touch not for gesture / motion events
	*				delta : null,
	*				// based on the first touchpoint
	*				direction : {
	*					vector: {Number}, // -1|+1, indicates the direction if necessary(pinch/rotate)
	*					orientation: {Number} // window.orientation: -90,0,90,180 || null (window.orienntation)
	*				},
	*				rotation: {Number} , //  amount of rotation relative to the current position NOT the original
	*				scale: {Number} , // amount of scaling relative to the current position NOT the original
	*				duration: {Number}, // ms: relative to the original touchpoint
	*				description : {String} // details as String: pinch:{'close'|'open'} e.g. "pinch:-1:close" ||  rotate:{'counterclockwise'|'clockwise'} e.g. "rotate:-1:counterclockwise"
	*			};
	* @param {DOM-Event} event_
	* @return {Void}
	*/
	function _onGestureend(event_) {
		// ignore bubbled handlers
		// if ( event_.currentTarget !== event_.target ) { return; }

		var _$element = jQuery(event_.currentTarget);
		// var _$element = jQuery(event_.target);

		// trigger custom notification
		_$element.triggerHandler($.jGestures.events.gestureendStart,event_);

		var _iDelta;
		var _oDatajQueryGestures = _$element.data('ojQueryGestures');

		// trigger handler for every bound event
		var _sType;
		for (_sType in _oDatajQueryGestures) {

			switch(_sType) {

				case 'pinchclose':
					_iDelta = event_.scale;
					if (( _iDelta < 1 ) && (_iDelta % 1) < (1 - $.jGestures.defaults.thresholdPinchclose)) {
						_$element.triggerHandler('pinchclose', _createOptions ({type: 'pinchclose', scale:_iDelta, vector: -1, touches: null, startMove: _oDatajQueryGestures.oStartTouch, event:event_, timestamp:_oDatajQueryGestures.oStartTouch.timestamp,description: 'pinch:-1:close' }) );
					}
				break;

				case 'pinchopen':
					_iDelta = event_.scale;
					if ( ( _iDelta > 1 ) && (_iDelta % 1) > ($.jGestures.defaults.thresholdPinchopen) ) {
						_$element.triggerHandler('pinchopen', _createOptions ({type: 'pinchopen', scale:_iDelta, vector: +1, touches: null, startMove: _oDatajQueryGestures.oStartTouch, event:event_, timestamp:_oDatajQueryGestures.oStartTouch.timestamp,description: 'pinch:+1:open'}) );
					}
				break;

				case 'rotatecw':
					_iDelta = event_.rotation;
					if ( ( _iDelta > 1 ) && (_iDelta  > $.jGestures.defaults.thresholdRotatecw) ) {
						_$element.triggerHandler('rotatecw', _createOptions ({type: 'rotatecw', rotation:_iDelta, vector: +1, touches: null, startMove: _oDatajQueryGestures.oStartTouch, event:event_, timestamp:_oDatajQueryGestures.oStartTouch.timestamp,description: 'rotate:+1:clockwise'}) );
					}
				break;

				case 'rotateccw':
					_iDelta = event_.rotation;
					if ( ( _iDelta < 1 ) &&  ( -1*(_iDelta) > $.jGestures.defaults.thresholdRotateccw ) ) {
							_$element.triggerHandler('rotateccw', _createOptions ({type: 'rotateccw', rotation:_iDelta, vector: -1, touches: null, startMove: _oDatajQueryGestures.oStartTouch, event:event_, timestamp:_oDatajQueryGestures.oStartTouch.timestamp,description: 'rotate:-1:counterclockwise'}) );
						}
				break;

				}
			}
			_$element.triggerHandler($.jGestures.events.gestureendProcessed,event_);
		}
	}
)(jQuery);



//////////////////////////////////////////////////////////////////////////////
// Optionals plugins
//////////////////////////////////////////////////////////////////////////////

// Sliders
// ---------------------------------------------------------------------------
// require plugins/slick/slick.js
// require plugins/bjqs/bjqs-1.3.js


// Modlal windows and lightbox gallery
// ---------------------------------------------------------------------------
// require plugins/colorbox/jquery.colorbox.js
// require plugins/colorbox/i18n/jquery.colorbox-ru.js


// Share buttons
// ---------------------------------------------------------------------------
// require plugins/social-likes/social-likes.js


// Gallery
// ---------------------------------------------------------------------------
// require plugins/fotorama/fotorama.js


// Drag'n drop file uploader
// ---------------------------------------------------------------------------
// require plugins/dropzone/dropzone.js


// JQuery UI
// ---------------------------------------------------------------------------
// UI Core
// require plugins/jquery-ui/core.js
// require plugins/jquery-ui/widget.js
// require plugins/jquery-ui/mouse.js
// require plugins/jquery-ui/position.js

// Interactions
// require plugins/jquery-ui/draggable.js
// require plugins/jquery-ui/droppable.js
// require plugins/jquery-ui/resizable.js
// require plugins/jquery-ui/selectable.js
// require plugins/jquery-ui/sortable.js

// Widgets
// require plugins/jquery-ui/accordion.js
// require plugins/jquery-ui/autocomplete.js
// require plugins/jquery-ui/button.js
// require plugins/jquery-ui/datepicker.js
// require plugins/jquery-ui/dialog.js
// require plugins/jquery-ui/menu.js
// require plugins/jquery-ui/progressbar.js
// require plugins/jquery-ui/selectmenu.js
// require plugins/jquery-ui/slider.js
// require plugins/jquery-ui/spinner.js
// require plugins/jquery-ui/tabs.js
// require plugins/jquery-ui/tooltip.js

// Effects
// require plugins/jquery-ui/effect.js
// require plugins/jquery-ui/effect-blind.js
// require plugins/jquery-ui/effect-bounce.js
// require plugins/jquery-ui/effect-clip.js
// require plugins/jquery-ui/effect-drop.js
// require plugins/jquery-ui/effect-explode.js
// require plugins/jquery-ui/effect-fade.js
// require plugins/jquery-ui/effect-fold.js
// require plugins/jquery-ui/effect-highlight.js
// require plugins/jquery-ui/effect-puff.js
// require plugins/jquery-ui/effect-pulsate.js
// require plugins/jquery-ui/effect-scale.js
// require plugins/jquery-ui/effect-shake.js
// require plugins/jquery-ui/effect-size.js
// require plugins/jquery-ui/effect-slide.js
// require plugins/jquery-ui/effect-transfer.js

// Language
// require plugins/jquery-ui/i18n/datepicker-ru.js
// require plugins/jquery-ui/i18n/datepicker-en-GB.js
// require plugins/jquery-ui/i18n/datepicker-ky.js


// Browser detection library
// ---------------------------------------------------------------------------
// require plugins/bowser/bowser.js


// Positioned element on the page, and lock within the user's viewport when scrolling
// ---------------------------------------------------------------------------
// require plugins/lockfixed/jquery.lockfixed.js


// Cross-browser mouse wheel support with delta normalization
// ---------------------------------------------------------------------------
// require plugins/mousewheel/jquery.mousewheel.js


// Scrollbar plugin
// ---------------------------------------------------------------------------
// require plugins/perfect-scrollbar/perfect-scrollbar.js

// Forms
// ---------------------------------------------------------------------------
/*
 * jQuery Form Styler v1.7.2
 * https://github.com/Dimox/jQueryFormStyler
 *
 * Copyright 2012-2015 Dimox (http://dimox.name/)
 * Released under the MIT license.
 *
 * Date: 2015.07.15
 *
 */

;(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
}(function($) {

	'use strict';

	var pluginName = 'styler',
			defaults = {
				wrapper: 'form',
				idSuffix: '-styler',
				filePlaceholder: 'Файл не выбран',
				fileBrowse: 'Обзор...',
				selectPlaceholder: 'Выберите...',
				selectSearch: false,
				selectSearchLimit: 10,
				selectSearchNotFound: 'Совпадений не найдено',
				selectSearchPlaceholder: 'Поиск...',
				selectVisibleOptions: 0,
				singleSelectzIndex: '100',
				selectSmartPositioning: true,
				onSelectOpened: function() {},
				onSelectClosed: function() {},
				onFormStyled: function() {}
			};

	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this.init();
	}

	Plugin.prototype = {

		// инициализация
		init: function() {

			var el = $(this.element);
			var opt = this.options;

			var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;
			var Android = (navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;

			function Attributes() {
				var id = '',
						title = '',
						classes = '',
						dataList = '';
				if (el.attr('id') !== undefined && el.attr('id') !== '') id = ' id="' + el.attr('id') + opt.idSuffix + '"';
				if (el.attr('title') !== undefined && el.attr('title') !== '') title = ' title="' + el.attr('title') + '"';
				if (el.attr('class') !== undefined && el.attr('class') !== '') classes = ' ' + el.attr('class');
				var data = el.data();
				for (var i in data) {
					if (data[i] !== '' && i !== '_styler') dataList += ' data-' + i + '="' + data[i] + '"';
				}
				id += dataList;
				this.id = id;
				this.title = title;
				this.classes = classes;
			}

			// checkbox
			if (el.is(':checkbox')) {

				var checkboxOutput = function() {

					var att = new Attributes();
					var checkbox = $('<div' + att.id + ' class="jq-checkbox' + att.classes + '"' + att.title + '><div class="jq-checkbox__div"></div></div>');

					// прячем оригинальный чекбокс
					el.css({
						position: 'absolute',
						zIndex: '-1',
						opacity: 0,
						margin: 0,
						padding: 0
					}).after(checkbox).prependTo(checkbox);

					checkbox.attr('unselectable', 'on').css({
						'-webkit-user-select': 'none',
						'-moz-user-select': 'none',
						'-ms-user-select': 'none',
						'-o-user-select': 'none',
						'user-select': 'none',
						display: 'inline-block',
						position: 'relative',
						overflow: 'hidden'
					});

					if (el.is(':checked')) checkbox.addClass('checked');
					if (el.is(':disabled')) checkbox.addClass('disabled');

					// клик на псевдочекбокс
					checkbox.on('click.styler', function() {
						if (!checkbox.is('.disabled')) {
							if (el.is(':checked')) {
								el.prop('checked', false);
								checkbox.removeClass('checked');
							} else {
								el.prop('checked', true);
								checkbox.addClass('checked');
							}
							el.change();
							return false;
						} else {
							return false;
						}
					});
					// клик на label
					el.closest('label').add('label[for="' + el.attr('id') + '"]').on('click.styler', function(e) {
						if (!$(e.target).is('a')) {
							checkbox.click();
							e.preventDefault();
						}
					});
					// переключение по Space или Enter
					el.on('change.styler', function() {
						if (el.is(':checked')) checkbox.addClass('checked');
						else checkbox.removeClass('checked');
					})
					// чтобы переключался чекбокс, который находится в теге label
					.on('keydown.styler', function(e) {
						if (e.which == 32) checkbox.click();
					})
					.on('focus.styler', function() {
						if (!checkbox.is('.disabled')) checkbox.addClass('focused');
					})
					.on('blur.styler', function() {
						checkbox.removeClass('focused');
					});

				}; // end checkboxOutput()

				checkboxOutput();

				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.off('.styler').parent().before(el).remove();
					checkboxOutput();
				});

			// end checkbox

			// radio
			} else if (el.is(':radio')) {

				var radioOutput = function() {

					var att = new Attributes();
					var radio = $('<div' + att.id + ' class="jq-radio' + att.classes + '"' + att.title + '><div class="jq-radio__div"></div></div>');

					// прячем оригинальную радиокнопку
					el.css({
						position: 'absolute',
						zIndex: '-1',
						opacity: 0,
						margin: 0,
						padding: 0
					}).after(radio).prependTo(radio);

					radio.attr('unselectable', 'on').css({
						'-webkit-user-select': 'none',
						'-moz-user-select': 'none',
						'-ms-user-select': 'none',
						'-o-user-select': 'none',
						'user-select': 'none',
						display: 'inline-block',
						position: 'relative'
					});

					if (el.is(':checked')) radio.addClass('checked');
					if (el.is(':disabled')) radio.addClass('disabled');

					// клик на псевдорадиокнопке
					radio.on('click.styler', function() {
						if (!radio.is('.disabled')) {
							radio.closest(opt.wrapper).find('input[name="' + el.attr('name') + '"]').prop('checked', false).parent().removeClass('checked');
							el.prop('checked', true).parent().addClass('checked');
							el.change();
							return false;
						} else {
							return false;
						}
					});
					// клик на label
					el.closest('label').add('label[for="' + el.attr('id') + '"]').on('click.styler', function(e) {
						if (!$(e.target).is('a')) {
							radio.click();
							e.preventDefault();
						}
					});
					// переключение стрелками
					el.on('change.styler', function() {
						el.parent().addClass('checked');
					})
					.on('focus.styler', function() {
						if (!radio.is('.disabled')) radio.addClass('focused');
					})
					.on('blur.styler', function() {
						radio.removeClass('focused');
					});

				}; // end radioOutput()

				radioOutput();

				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.off('.styler').parent().before(el).remove();
					radioOutput();
				});

			// end radio

			// file
			} else if (el.is(':file')) {

				// прячем оригинальное поле
				el.css({
					position: 'absolute',
					top: 0,
					right: 0,
					width: '100%',
					height: '100%',
					opacity: 0,
					margin: 0,
					padding: 0
				});

				var fileOutput = function() {

					var att = new Attributes();
					var placeholder = el.data('placeholder');
					if (placeholder === undefined) placeholder = opt.filePlaceholder;
					var browse = el.data('browse');
					if (browse === undefined || browse === '') browse = opt.fileBrowse;
					var file = $('<div' + att.id + ' class="jq-file' + att.classes + '"' + att.title + ' style="display: inline-block; position: relative; overflow: hidden"></div>');
					var name = $('<div class="jq-file__name">' + placeholder + '</div>').appendTo(file);
					$('<div class="jq-file__browse">' + browse + '</div>').appendTo(file);
					el.after(file).appendTo(file);

					if (el.is(':disabled')) file.addClass('disabled');

					el.on('change.styler', function() {
						var value = el.val();
						if (el.is('[multiple]')) {
							value = '';
							var files = el[0].files;
							for (var i = 0; i < files.length; i++) {
								value += ( (i > 0) ? ', ' : '' ) + files[i].name;
							}
						}
						name.text(value.replace(/.+[\\\/]/, ''));
						if (value === '') {
							name.text(placeholder);
							file.removeClass('changed');
						} else {
							file.addClass('changed');
						}
					})
					.on('focus.styler', function() {
						file.addClass('focused');
					})
					.on('blur.styler', function() {
						file.removeClass('focused');
					})
					.on('click.styler', function() {
						file.removeClass('focused');
					});

				}; // end fileOutput()

				fileOutput();

				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.off('.styler').parent().before(el).remove();
					fileOutput();
				});

			// end file

			} else if (el.is('input[type="number"]')) {

				var numberOutput = function() {

					var number = $('<div class="jq-number"><div class="jq-number__spin minus"></div><div class="jq-number__spin plus"></div></div>');
					el.after(number).prependTo(number).wrap('<div class="jq-number__field"></div>');

					if (el.is(':disabled')) number.addClass('disabled');

					var min,
							max,
							step,
							timeout = null,
							interval = null;
					if (el.attr('min') !== undefined) min = el.attr('min');
					if (el.attr('max') !== undefined) max = el.attr('max');
					if (el.attr('step') !== undefined && $.isNumeric(el.attr('step')))
						step = Number(el.attr('step'));
					else
						step = Number(1);

					var changeValue = function(spin) {
						var value = el.val(),
								newValue;
						if (!$.isNumeric(value)) {
							value = 0;
							el.val('0');
						}
						if (spin.is('.minus')) {
							newValue = parseInt(value, 10) - step;
							if (step > 0) newValue = Math.ceil(newValue / step) * step;
						} else if (spin.is('.plus')) {
							newValue = parseInt(value, 10) + step;
							if (step > 0) newValue = Math.floor(newValue / step) * step;
						}
						if ($.isNumeric(min) && $.isNumeric(max)) {
							if (newValue >= min && newValue <= max) el.val(newValue);
						} else if ($.isNumeric(min) && !$.isNumeric(max)) {
							if (newValue >= min) el.val(newValue);
						} else if (!$.isNumeric(min) && $.isNumeric(max)) {
							if (newValue <= max) el.val(newValue);
						} else {
							el.val(newValue);
						}
					};

					if (!number.is('.disabled')) {
						number.on('mousedown.styler', 'div.jq-number__spin', function() {
							var spin = $(this);
							changeValue(spin);
							timeout = setTimeout(function(){
								interval = setInterval(function(){ changeValue(spin); }, 40);
							}, 350);
						}).on('mouseup.styler mouseout.styler', 'div.jq-number__spin', function() {
							clearTimeout(timeout);
							clearInterval(interval);
						});
						el.on('focus.styler', function() {
							number.addClass('focused');
						})
						.on('blur.styler', function() {
							number.removeClass('focused');
						});
					}

				}; // end numberOutput()

				numberOutput();

				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.off('.styler').closest('.jq-number').before(el).remove();
					numberOutput();
				});

			// end number

			// select
			} else if (el.is('select')) {

				var selectboxOutput = function() {

					// запрещаем прокрутку страницы при прокрутке селекта
					function preventScrolling(selector) {
						selector.off('mousewheel DOMMouseScroll').on('mousewheel DOMMouseScroll', function(e) {
							var scrollTo = null;
							if (e.type == 'mousewheel') { scrollTo = (e.originalEvent.wheelDelta * -1); }
							else if (e.type == 'DOMMouseScroll') { scrollTo = 40 * e.originalEvent.detail; }
							if (scrollTo) {
								e.stopPropagation();
								e.preventDefault();
								$(this).scrollTop(scrollTo + $(this).scrollTop());
							}
						});
					}

					var option = $('option', el);
					var list = '';
					// формируем список селекта
					function makeList() {
						for (var i = 0; i < option.length; i++) {
							var op = option.eq(i);
							var li = '',
									liClass = '',
									liClasses = '',
									id = '',
									title = '',
									dataList = '',
									optionClass = '',
									optgroupClass = '',
									dataJqfsClass = '';
							var disabled = 'disabled';
							var selDis = 'selected sel disabled';
							if (op.prop('selected')) liClass = 'selected sel';
							if (op.is(':disabled')) liClass = disabled;
							if (op.is(':selected:disabled')) liClass = selDis;
							if (op.attr('id') !== undefined && op.attr('id') !== '') id = ' id="' + op.attr('id') + opt.idSuffix + '"';
							if (op.attr('title') !== undefined && option.attr('title') !== '') title = ' title="' + op.attr('title') + '"';
							if (op.attr('class') !== undefined) {
								optionClass = ' ' + op.attr('class');
								dataJqfsClass = ' data-jqfs-class="' + op.attr('class') + '"';
							}

							var data = op.data();
							for (var k in data) {
								if (data[k] !== '') dataList += ' data-' + k + '="' + data[k] + '"';
							}

							if ( (liClass + optionClass) !== '' )   liClasses = ' class="' + liClass + optionClass + '"';
							li = '<li' + dataJqfsClass + dataList + liClasses + title + id + '>'+ op.html() +'</li>';

							// если есть optgroup
							if (op.parent().is('optgroup')) {
								if (op.parent().attr('class') !== undefined) optgroupClass = ' ' + op.parent().attr('class');
								li = '<li' + dataJqfsClass + dataList + ' class="' + liClass + optionClass + ' option' + optgroupClass + '"' + title + id + '>'+ op.html() +'</li>';
								if (op.is(':first-child')) {
									li = '<li class="optgroup' + optgroupClass + '">' + op.parent().attr('label') + '</li>' + li;
								}
							}

							list += li;
						}
					} // end makeList()

					// одиночный селект
					function doSelect() {
						var att = new Attributes();

						var searchHTML = '';
						var selectPlaceholder = el.data('placeholder');
						var selectSearch = el.data('search');
						var selectSearchLimit = el.data('search-limit');
						var selectSearchNotFound = el.data('search-not-found');
						var selectSearchPlaceholder = el.data('search-placeholder');
						var singleSelectzIndex = el.data('z-index');
						var selectSmartPositioning = el.data('smart-positioning');

						if (selectPlaceholder === undefined) selectPlaceholder = opt.selectPlaceholder;
						if (selectSearch === undefined || selectSearch === '') selectSearch = opt.selectSearch;
						if (selectSearchLimit === undefined || selectSearchLimit === '') selectSearchLimit = opt.selectSearchLimit;
						if (selectSearchNotFound === undefined || selectSearchNotFound === '') selectSearchNotFound = opt.selectSearchNotFound;
						if (selectSearchPlaceholder === undefined) selectSearchPlaceholder = opt.selectSearchPlaceholder;
						if (singleSelectzIndex === undefined || singleSelectzIndex === '') singleSelectzIndex = opt.singleSelectzIndex;
						if (selectSmartPositioning === undefined || selectSmartPositioning === '') selectSmartPositioning = opt.selectSmartPositioning;

						var selectbox =
							$('<div' + att.id + ' class="jq-selectbox jqselect' + att.classes + '" style="display: inline-block; position: relative; z-index:' + singleSelectzIndex + '">' +
									'<div class="jq-selectbox__select"' + att.title + ' style="position: relative">' +
										'<div class="jq-selectbox__select-text"></div>' +
										'<div class="jq-selectbox__trigger"><div class="jq-selectbox__trigger-arrow"></div></div>' +
									'</div>' +
								'</div>');

						el.css({margin: 0, padding: 0}).after(selectbox).prependTo(selectbox);

						var divSelect = $('div.jq-selectbox__select', selectbox);
						var divText = $('div.jq-selectbox__select-text', selectbox);
						var optionSelected = option.filter(':selected');

						makeList();

						if (selectSearch) searchHTML =
							'<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="' + selectSearchPlaceholder + '"></div>' +
							'<div class="jq-selectbox__not-found">' + selectSearchNotFound + '</div>';
						var dropdown =
							$('<div class="jq-selectbox__dropdown" style="position: absolute">' +
									searchHTML +
									'<ul style="position: relative; list-style: none; overflow: auto; overflow-x: hidden">' + list + '</ul>' +
								'</div>');
						selectbox.append(dropdown);
						var ul = $('ul', dropdown);
						var li = $('li', dropdown);
						var search = $('input', dropdown);
						var notFound = $('div.jq-selectbox__not-found', dropdown).hide();
						if (li.length < selectSearchLimit) search.parent().hide();

						// показываем опцию по умолчанию
						// если 1-я опция пустая и выбрана по умолчанию, то показываем плейсхолдер
						if (el.val() === '') {
							divText.text(selectPlaceholder).addClass('placeholder');
						} else {
							divText.text(optionSelected.text());
						}

						// определяем самый широкий пункт селекта
						var liWidthInner = 0,
								liWidth = 0;
						li.each(function() {
							var l = $(this);
							l.css({'display': 'inline-block'});
							if (l.innerWidth() > liWidthInner) {
								liWidthInner = l.innerWidth();
								liWidth = l.width();
							}
							l.css({'display': ''});
						});

						// подстраиваем ширину свернутого селекта в зависимости
						// от ширины плейсхолдера или самого широкого пункта
						if (divText.is('.placeholder') && (divText.width() > liWidthInner)) {
							divText.width(divText.width());
						} else {
							var selClone = selectbox.clone().appendTo('body').width('auto');
							var selCloneWidth = selClone.outerWidth();
							selClone.remove();
							if (selCloneWidth == selectbox.outerWidth()) {
								divText.width(liWidth);
							}
						}

						// подстраиваем ширину выпадающего списка в зависимости от самого широкого пункта
						if (liWidthInner > selectbox.width()) dropdown.width(liWidthInner);

						// прячем 1-ю пустую опцию, если она есть и если атрибут data-placeholder не пустой
						// если все же нужно, чтобы первая пустая опция отображалась, то указываем у селекта: data-placeholder=""
						if (option.first().text() === '' && el.data('placeholder') !== '') {
							li.first().hide();
						}

						// прячем оригинальный селект
						el.css({
							position: 'absolute',
							left: 0,
							top: 0,
							width: '100%',
							height: '100%',
							opacity: 0
						});

						var selectHeight = selectbox.outerHeight();
						var searchHeight = search.outerHeight();
						var isMaxHeight = ul.css('max-height');
						var liSelected = li.filter('.selected');
						if (liSelected.length < 1) li.first().addClass('selected sel');
						if (li.data('li-height') === undefined) li.data('li-height', li.outerHeight());
						var position = dropdown.css('top');
						if (dropdown.css('left') == 'auto') dropdown.css({left: 0});
						if (dropdown.css('top') == 'auto') dropdown.css({top: selectHeight});
						dropdown.hide();

						// если выбран не дефолтный пункт
						if (liSelected.length) {
							// добавляем класс, показывающий изменение селекта
							if (option.first().text() != optionSelected.text()) {
								selectbox.addClass('changed');
							}
							// передаем селекту класс выбранного пункта
							selectbox.data('jqfs-class', liSelected.data('jqfs-class'));
							selectbox.addClass(liSelected.data('jqfs-class'));
						}

						// если селект неактивный
						if (el.is(':disabled')) {
							selectbox.addClass('disabled');
							return false;
						}

						// при клике на псевдоселекте
						divSelect.click(function() {

							// колбек при закрытии селекта
							if ($('div.jq-selectbox').filter('.opened').length) {
								opt.onSelectClosed.call($('div.jq-selectbox').filter('.opened'));
							}

							el.focus();

							// если iOS, то не показываем выпадающий список,
							// т.к. отображается нативный и неизвестно, как его спрятать
							if (iOS) return;

							// умное позиционирование
							var win = $(window);
							var liHeight = li.data('li-height');
							var topOffset = selectbox.offset().top;
							var bottomOffset = win.height() - selectHeight - (topOffset - win.scrollTop());
							var visible = el.data('visible-options');
							if (visible === undefined || visible === '') visible = opt.selectVisibleOptions;
							var minHeight = liHeight * 5;
							var newHeight = liHeight * visible;
							if (visible > 0 && visible < 6) minHeight = newHeight;
							if (visible === 0) newHeight = 'auto';

							var dropDown = function() {
								dropdown.height('auto').css({bottom: 'auto', top: position});
								var maxHeightBottom = function() {
									ul.css('max-height', Math.floor((bottomOffset - 20 - searchHeight) / liHeight) * liHeight);
								};
								maxHeightBottom();
								ul.css('max-height', newHeight);
								if (isMaxHeight != 'none') {
									ul.css('max-height', isMaxHeight);
								}
								if (bottomOffset < (dropdown.outerHeight() + 20)) {
									maxHeightBottom();
								}
							};

							var dropUp = function() {
								dropdown.height('auto').css({top: 'auto', bottom: position});
								var maxHeightTop = function() {
									ul.css('max-height', Math.floor((topOffset - win.scrollTop() - 20 - searchHeight) / liHeight) * liHeight);
								};
								maxHeightTop();
								ul.css('max-height', newHeight);
								if (isMaxHeight != 'none') {
									ul.css('max-height', isMaxHeight);
								}
								if ((topOffset - win.scrollTop() - 20) < (dropdown.outerHeight() + 20)) {
									maxHeightTop();
								}
							};

							if (selectSmartPositioning === true || selectSmartPositioning === 1) {
								// раскрытие вниз
								if (bottomOffset > (minHeight + searchHeight + 20)) {
									dropDown();
									selectbox.removeClass('dropup').addClass('dropdown');
								// раскрытие вверх
								} else {
									dropUp();
									selectbox.removeClass('dropdown').addClass('dropup');
								}
							} else if (selectSmartPositioning === false || selectSmartPositioning === 0) {
								// раскрытие вниз
								if (bottomOffset > (minHeight + searchHeight + 20)) {
									dropDown();
									selectbox.removeClass('dropup').addClass('dropdown');
								}
							}

							// если выпадающий список выходит за правый край окна браузера,
							// то меняем позиционирование с левого на правое
							if (selectbox.offset().left + dropdown.outerWidth() > win.width()) {
								dropdown.css({left: 'auto', right: 0});
							}
							// конец умного позиционирования

							$('div.jqselect').css({zIndex: (singleSelectzIndex - 1)}).removeClass('opened');
							selectbox.css({zIndex: singleSelectzIndex});
							if (dropdown.is(':hidden')) {
								$('div.jq-selectbox__dropdown:visible').hide();
								dropdown.show();
								selectbox.addClass('opened focused');
								// колбек при открытии селекта
								opt.onSelectOpened.call(selectbox);
							} else {
								dropdown.hide();
								selectbox.removeClass('opened dropup dropdown');
								// колбек при закрытии селекта
								if ($('div.jq-selectbox').filter('.opened').length) {
									opt.onSelectClosed.call(selectbox);
								}
							}

							// поисковое поле
							if (search.length) {
								search.val('').keyup();
								notFound.hide();
								search.keyup(function() {
									var query = $(this).val();
									li.each(function() {
										if (!$(this).html().match(new RegExp('.*?' + query + '.*?', 'i'))) {
											$(this).hide();
										} else {
											$(this).show();
										}
									});
									// прячем 1-ю пустую опцию
									if (option.first().text() === '' && el.data('placeholder') !== '') {
										li.first().hide();
									}
									if (li.filter(':visible').length < 1) {
										notFound.show();
									} else {
										notFound.hide();
									}
								});
							}

							// прокручиваем до выбранного пункта при открытии списка
							if (li.filter('.selected').length) {
								if (el.val() === '') {
									ul.scrollTop(0);
								} else {
									// если нечетное количество видимых пунктов,
									// то высоту пункта делим пополам для последующего расчета
									if ( (ul.innerHeight() / liHeight) % 2 !== 0 ) liHeight = liHeight / 2;
									ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - ul.innerHeight() / 2 + liHeight);
								}
							}

							preventScrolling(ul);
							return false;

						}); // end divSelect.click()

						// при наведении курсора на пункт списка
						li.hover(function() {
							$(this).siblings().removeClass('selected');
						});
						var selectedText = li.filter('.selected').text();

						// при клике на пункт списка
						li.filter(':not(.disabled):not(.optgroup)').click(function() {
							el.focus();
							var t = $(this);
							var liText = t.text();
							if (!t.is('.selected')) {
								var index = t.index();
								index -= t.prevAll('.optgroup').length;
								t.addClass('selected sel').siblings().removeClass('selected sel');
								option.prop('selected', false).eq(index).prop('selected', true);
								selectedText = liText;
								divText.text(liText);

								// передаем селекту класс выбранного пункта
								if (selectbox.data('jqfs-class')) selectbox.removeClass(selectbox.data('jqfs-class'));
								selectbox.data('jqfs-class', t.data('jqfs-class'));
								selectbox.addClass(t.data('jqfs-class'));

								el.change();
							}
							dropdown.hide();
							selectbox.removeClass('opened dropup dropdown');
							// колбек при закрытии селекта
							opt.onSelectClosed.call(selectbox);

						});
						dropdown.mouseout(function() {
							$('li.sel', dropdown).addClass('selected');
						});

						// изменение селекта
						el.on('change.styler', function() {
							divText.text(option.filter(':selected').text()).removeClass('placeholder');
							li.removeClass('selected sel').not('.optgroup').eq(el[0].selectedIndex).addClass('selected sel');
							// добавляем класс, показывающий изменение селекта
							if (option.first().text() != li.filter('.selected').text()) {
								selectbox.addClass('changed');
							} else {
								selectbox.removeClass('changed');
							}
						})
						.on('focus.styler', function() {
							selectbox.addClass('focused');
							$('div.jqselect').not('.focused').removeClass('opened dropup dropdown').find('div.jq-selectbox__dropdown').hide();
						})
						.on('blur.styler', function() {
							selectbox.removeClass('focused');
						})
						// изменение селекта с клавиатуры
						.on('keydown.styler keyup.styler', function(e) {
							var liHeight = li.data('li-height');
							if (el.val() === '') {
								divText.text(selectPlaceholder).addClass('placeholder');
							} else {
								divText.text(option.filter(':selected').text());
							}
							li.removeClass('selected sel').not('.optgroup').eq(el[0].selectedIndex).addClass('selected sel');
							// вверх, влево, Page Up, Home
							if (e.which == 38 || e.which == 37 || e.which == 33 || e.which == 36) {
								if (el.val() === '') {
									ul.scrollTop(0);
								} else {
									ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top);
								}
							}
							// вниз, вправо, Page Down, End
							if (e.which == 40 || e.which == 39 || e.which == 34 || e.which == 35) {
								ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - ul.innerHeight() + liHeight);
							}
							// закрываем выпадающий список при нажатии Enter
							if (e.which == 13) {
								e.preventDefault();
								dropdown.hide();
								selectbox.removeClass('opened dropup dropdown');
								// колбек при закрытии селекта
								opt.onSelectClosed.call(selectbox);
							}
						}).on('keydown.styler', function(e) {
							// открываем выпадающий список при нажатии Space
							if (e.which == 32) {
								e.preventDefault();
								divSelect.click();
							}
						});

						// прячем выпадающий список при клике за пределами селекта
						if (!onDocumentClick.registered) {
							$(document).on('click', onDocumentClick);
							onDocumentClick.registered = true;
						}

					} // end doSelect()

					// мультиселект
					function doMultipleSelect() {
						var att = new Attributes();
						var selectbox = $('<div' + att.id + ' class="jq-select-multiple jqselect' + att.classes + '"' + att.title + ' style="display: inline-block; position: relative"></div>');

						el.css({margin: 0, padding: 0}).after(selectbox);

						makeList();
						selectbox.append('<ul>' + list + '</ul>');
						var ul = $('ul', selectbox).css({
							'position': 'relative',
							'overflow-x': 'hidden',
							'-webkit-overflow-scrolling': 'touch'
						});
						var li = $('li', selectbox).attr('unselectable', 'on');
						var size = el.attr('size');
						var ulHeight = ul.outerHeight();
						var liHeight = li.outerHeight();
						if (size !== undefined && size > 0) {
							ul.css({'height': liHeight * size});
						} else {
							ul.css({'height': liHeight * 4});
						}
						if (ulHeight > selectbox.height()) {
							ul.css('overflowY', 'scroll');
							preventScrolling(ul);
							// прокручиваем до выбранного пункта
							if (li.filter('.selected').length) {
								ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top);
							}
						}

						// прячем оригинальный селект
						el.prependTo(selectbox).css({
							position: 'absolute',
							left: 0,
							top: 0,
							width: '100%',
							height: '100%',
							opacity: 0
						});

						// если селект неактивный
						if (el.is(':disabled')) {
							selectbox.addClass('disabled');
							option.each(function() {
								if ($(this).is(':selected')) li.eq($(this).index()).addClass('selected');
							});

						// если селект активный
						} else {

							// при клике на пункт списка
							li.filter(':not(.disabled):not(.optgroup)').click(function(e) {
								el.focus();
								var clkd = $(this);
								if(!e.ctrlKey && !e.metaKey) clkd.addClass('selected');
								if(!e.shiftKey) clkd.addClass('first');
								if(!e.ctrlKey && !e.metaKey && !e.shiftKey) clkd.siblings().removeClass('selected first');

								// выделение пунктов при зажатом Ctrl
								if(e.ctrlKey || e.metaKey) {
									if (clkd.is('.selected')) clkd.removeClass('selected first');
										else clkd.addClass('selected first');
									clkd.siblings().removeClass('first');
								}

								// выделение пунктов при зажатом Shift
								if(e.shiftKey) {
									var prev = false,
											next = false;
									clkd.siblings().removeClass('selected').siblings('.first').addClass('selected');
									clkd.prevAll().each(function() {
										if ($(this).is('.first')) prev = true;
									});
									clkd.nextAll().each(function() {
										if ($(this).is('.first')) next = true;
									});
									if (prev) {
										clkd.prevAll().each(function() {
											if ($(this).is('.selected')) return false;
												else $(this).not('.disabled, .optgroup').addClass('selected');
										});
									}
									if (next) {
										clkd.nextAll().each(function() {
											if ($(this).is('.selected')) return false;
												else $(this).not('.disabled, .optgroup').addClass('selected');
										});
									}
									if (li.filter('.selected').length == 1) clkd.addClass('first');
								}

								// отмечаем выбранные мышью
								option.prop('selected', false);
								li.filter('.selected').each(function() {
									var t = $(this);
									var index = t.index();
									if (t.is('.option')) index -= t.prevAll('.optgroup').length;
									option.eq(index).prop('selected', true);
								});
								el.change();

							});

							// отмечаем выбранные с клавиатуры
							option.each(function(i) {
								$(this).data('optionIndex', i);
							});
							el.on('change.styler', function() {
								li.removeClass('selected');
								var arrIndexes = [];
								option.filter(':selected').each(function() {
									arrIndexes.push($(this).data('optionIndex'));
								});
								li.not('.optgroup').filter(function(i) {
									return $.inArray(i, arrIndexes) > -1;
								}).addClass('selected');
							})
							.on('focus.styler', function() {
								selectbox.addClass('focused');
							})
							.on('blur.styler', function() {
								selectbox.removeClass('focused');
							});

							// прокручиваем с клавиатуры
							if (ulHeight > selectbox.height()) {
								el.on('keydown.styler', function(e) {
									// вверх, влево, PageUp
									if (e.which == 38 || e.which == 37 || e.which == 33) {
										ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - liHeight);
									}
									// вниз, вправо, PageDown
									if (e.which == 40 || e.which == 39 || e.which == 34) {
										ul.scrollTop(ul.scrollTop() + li.filter('.selected:last').position().top - ul.innerHeight() + liHeight * 2);
									}
								});
							}

						}
					} // end doMultipleSelect()

					if (el.is('[multiple]')) {

						// если Android или iOS, то мультиселект не стилизуем
						// причина для Android - в стилизованном селекте нет возможности выбрать несколько пунктов
						// причина для iOS - в стилизованном селекте неправильно отображаются выбранные пункты
						if (Android || iOS) return;

						doMultipleSelect();
					} else {
						doSelect();
					}

				}; // end selectboxOutput()

				selectboxOutput();

				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.off('.styler').parent().before(el).remove();
					selectboxOutput();
				});

			// end select

			// reset
			} else if (el.is(':reset')) {
				el.on('click', function() {
					setTimeout(function() {
						el.closest(opt.wrapper).find('input, select').trigger('refresh');
					}, 1);
				});
			} // end reset

		}, // init: function()

		// деструктор
		destroy: function() {

			var el = $(this.element);

			if (el.is(':checkbox') || el.is(':radio')) {
				el.removeData().off('.styler').removeAttr('style').parent().before(el).remove();
				el.closest('label').add('label[for="' + el.attr('id') + '"]').off('.styler');
			} else if (el.is('input[type="number"]')) {
				el.removeData().off('.styler').closest('.jq-number').before(el).remove();
			} else if (el.is(':file') || el.is('select')) {
				el.removeData().off('.styler').removeAttr('style').parent().before(el).remove();
			}

		} // destroy: function()

	}; // Plugin.prototype

	$.fn[pluginName] = function(options) {
		var args = arguments;
		if (options === undefined || typeof options === 'object') {
			return this.each(function() {
				if (!$.data(this, '_' + pluginName)) {
					$.data(this, '_' + pluginName, new Plugin(this, options));
				}
			})
			// колбек после выполнения плагина
			.promise()
			.done(function() {
				var opt = $(this[0]).data('_' + pluginName);
				if (opt) opt.options.onFormStyled.call();
			});
		} else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
			var returns;
			this.each(function() {
				var instance = $.data(this, '_' + pluginName);
				if (instance instanceof Plugin && typeof instance[options] === 'function') {
					returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
				}
			});
			return returns !== undefined ? returns : this;
		}
	};

	// прячем выпадающий список при клике за пределами селекта
	function onDocumentClick(e) {
		// e.target.nodeName != 'OPTION' - добавлено для обхода бага в Opera на движке Presto
		// (при изменении селекта с клавиатуры срабатывает событие onclick)
		if (!$(e.target).parents().hasClass('jq-selectbox') && e.target.nodeName != 'OPTION') {
			if ($('div.jq-selectbox.opened').length) {
				var selectbox = $('div.jq-selectbox.opened'),
						search = $('div.jq-selectbox__search input', selectbox),
						dropdown = $('div.jq-selectbox__dropdown', selectbox),
						opt = selectbox.find('select').data('_' + pluginName).options;

				// колбек при закрытии селекта
				opt.onSelectClosed.call(selectbox);

				if (search.length) search.val('').keyup();
				dropdown.hide().find('li.sel').addClass('selected');
				selectbox.removeClass('focused opened dropup dropdown');
			}
		}
	}
	onDocumentClick.registered = false;

}));


// Tabs
// ---------------------------------------------------------------------------
// require plugins/ion-tabs/ion.tabs.js


// Ion Slider
// ---------------------------------------------------------------------------
// require plugins/ion-rangeSlider/ion.rangeSlider.js

// Transit
// ---------------------------------------------------------------------------
/*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2014 Rico Sta. Cruz
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */

/* jshint expr: true */

;(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    factory(root.jQuery);
  }

}(this, function($) {

  $.transit = {
    version: "0.9.12",

    // Map of $.css() keys to values for 'transitionProperty'.
    // See https://developer.mozilla.org/en/CSS/CSS_transitions#Properties_that_can_be_animated
    propertyMap: {
      marginLeft    : 'margin',
      marginRight   : 'margin',
      marginBottom  : 'margin',
      marginTop     : 'margin',
      paddingLeft   : 'padding',
      paddingRight  : 'padding',
      paddingBottom : 'padding',
      paddingTop    : 'padding'
    },

    // Will simply transition "instantly" if false
    enabled: true,

    // Set this to false if you don't want to use the transition end property.
    useTransitionEnd: false
  };

  var div = document.createElement('div');
  var support = {};

  // Helper function to get the proper vendor property name.
  // (`transition` => `WebkitTransition`)
  function getVendorPropertyName(prop) {
    // Handle unprefixed versions (FF16+, for example)
    if (prop in div.style) return prop;

    var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
    var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

    for (var i=0; i<prefixes.length; ++i) {
      var vendorProp = prefixes[i] + prop_;
      if (vendorProp in div.style) { return vendorProp; }
    }
  }

  // Helper function to check if transform3D is supported.
  // Should return true for Webkits and Firefox 10+.
  function checkTransform3dSupport() {
    div.style[support.transform] = '';
    div.style[support.transform] = 'rotateY(90deg)';
    return div.style[support.transform] !== '';
  }

  var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

  // Check for the browser's transitions support.
  support.transition      = getVendorPropertyName('transition');
  support.transitionDelay = getVendorPropertyName('transitionDelay');
  support.transform       = getVendorPropertyName('transform');
  support.transformOrigin = getVendorPropertyName('transformOrigin');
  support.filter          = getVendorPropertyName('Filter');
  support.transform3d     = checkTransform3dSupport();

  var eventNames = {
    'transition':       'transitionend',
    'MozTransition':    'transitionend',
    'OTransition':      'oTransitionEnd',
    'WebkitTransition': 'webkitTransitionEnd',
    'msTransition':     'MSTransitionEnd'
  };

  // Detect the 'transitionend' event needed.
  var transitionEnd = support.transitionEnd = eventNames[support.transition] || null;

  // Populate jQuery's `$.support` with the vendor prefixes we know.
  // As per [jQuery's cssHooks documentation](http://api.jquery.com/jQuery.cssHooks/),
  // we set $.support.transition to a string of the actual property name used.
  for (var key in support) {
    if (support.hasOwnProperty(key) && typeof $.support[key] === 'undefined') {
      $.support[key] = support[key];
    }
  }

  // Avoid memory leak in IE.
  div = null;

  // ## $.cssEase
  // List of easing aliases that you can use with `$.fn.transition`.
  $.cssEase = {
    '_default':       'ease',
    'in':             'ease-in',
    'out':            'ease-out',
    'in-out':         'ease-in-out',
    'snap':           'cubic-bezier(0,1,.5,1)',
    // Penner equations
    'easeInCubic':    'cubic-bezier(.550,.055,.675,.190)',
    'easeOutCubic':   'cubic-bezier(.215,.61,.355,1)',
    'easeInOutCubic': 'cubic-bezier(.645,.045,.355,1)',
    'easeInCirc':     'cubic-bezier(.6,.04,.98,.335)',
    'easeOutCirc':    'cubic-bezier(.075,.82,.165,1)',
    'easeInOutCirc':  'cubic-bezier(.785,.135,.15,.86)',
    'easeInExpo':     'cubic-bezier(.95,.05,.795,.035)',
    'easeOutExpo':    'cubic-bezier(.19,1,.22,1)',
    'easeInOutExpo':  'cubic-bezier(1,0,0,1)',
    'easeInQuad':     'cubic-bezier(.55,.085,.68,.53)',
    'easeOutQuad':    'cubic-bezier(.25,.46,.45,.94)',
    'easeInOutQuad':  'cubic-bezier(.455,.03,.515,.955)',
    'easeInQuart':    'cubic-bezier(.895,.03,.685,.22)',
    'easeOutQuart':   'cubic-bezier(.165,.84,.44,1)',
    'easeInOutQuart': 'cubic-bezier(.77,0,.175,1)',
    'easeInQuint':    'cubic-bezier(.755,.05,.855,.06)',
    'easeOutQuint':   'cubic-bezier(.23,1,.32,1)',
    'easeInOutQuint': 'cubic-bezier(.86,0,.07,1)',
    'easeInSine':     'cubic-bezier(.47,0,.745,.715)',
    'easeOutSine':    'cubic-bezier(.39,.575,.565,1)',
    'easeInOutSine':  'cubic-bezier(.445,.05,.55,.95)',
    'easeInBack':     'cubic-bezier(.6,-.28,.735,.045)',
    'easeOutBack':    'cubic-bezier(.175, .885,.32,1.275)',
    'easeInOutBack':  'cubic-bezier(.68,-.55,.265,1.55)'
  };

  // ## 'transform' CSS hook
  // Allows you to use the `transform` property in CSS.
  //
  //     $("#hello").css({ transform: "rotate(90deg)" });
  //
  //     $("#hello").css('transform');
  //     //=> { rotate: '90deg' }
  //
  $.cssHooks['transit:transform'] = {
    // The getter returns a `Transform` object.
    get: function(elem) {
      return $(elem).data('transform') || new Transform();
    },

    // The setter accepts a `Transform` object or a string.
    set: function(elem, v) {
      var value = v;

      if (!(value instanceof Transform)) {
        value = new Transform(value);
      }

      // We've seen the 3D version of Scale() not work in Chrome when the
      // element being scaled extends outside of the viewport.  Thus, we're
      // forcing Chrome to not use the 3d transforms as well.  Not sure if
      // translate is affectede, but not risking it.  Detection code from
      // http://davidwalsh.name/detecting-google-chrome-javascript
      if (support.transform === 'WebkitTransform' && !isChrome) {
        elem.style[support.transform] = value.toString(true);
      } else {
        elem.style[support.transform] = value.toString();
      }

      $(elem).data('transform', value);
    }
  };

  // Add a CSS hook for `.css({ transform: '...' })`.
  // In jQuery 1.8+, this will intentionally override the default `transform`
  // CSS hook so it'll play well with Transit. (see issue #62)
  $.cssHooks.transform = {
    set: $.cssHooks['transit:transform'].set
  };

  // ## 'filter' CSS hook
  // Allows you to use the `filter` property in CSS.
  //
  //     $("#hello").css({ filter: 'blur(10px)' });
  //
  $.cssHooks.filter = {
    get: function(elem) {
      return elem.style[support.filter];
    },
    set: function(elem, value) {
      elem.style[support.filter] = value;
    }
  };

  // jQuery 1.8+ supports prefix-free transitions, so these polyfills will not
  // be necessary.
  if ($.fn.jquery < "1.8") {
    // ## 'transformOrigin' CSS hook
    // Allows the use for `transformOrigin` to define where scaling and rotation
    // is pivoted.
    //
    //     $("#hello").css({ transformOrigin: '0 0' });
    //
    $.cssHooks.transformOrigin = {
      get: function(elem) {
        return elem.style[support.transformOrigin];
      },
      set: function(elem, value) {
        elem.style[support.transformOrigin] = value;
      }
    };

    // ## 'transition' CSS hook
    // Allows you to use the `transition` property in CSS.
    //
    //     $("#hello").css({ transition: 'all 0 ease 0' });
    //
    $.cssHooks.transition = {
      get: function(elem) {
        return elem.style[support.transition];
      },
      set: function(elem, value) {
        elem.style[support.transition] = value;
      }
    };
  }

  // ## Other CSS hooks
  // Allows you to rotate, scale and translate.
  registerCssHook('scale');
  registerCssHook('scaleX');
  registerCssHook('scaleY');
  registerCssHook('translate');
  registerCssHook('rotate');
  registerCssHook('rotateX');
  registerCssHook('rotateY');
  registerCssHook('rotate3d');
  registerCssHook('perspective');
  registerCssHook('skewX');
  registerCssHook('skewY');
  registerCssHook('x', true);
  registerCssHook('y', true);

  // ## Transform class
  // This is the main class of a transformation property that powers
  // `$.fn.css({ transform: '...' })`.
  //
  // This is, in essence, a dictionary object with key/values as `-transform`
  // properties.
  //
  //     var t = new Transform("rotate(90) scale(4)");
  //
  //     t.rotate             //=> "90deg"
  //     t.scale              //=> "4,4"
  //
  // Setters are accounted for.
  //
  //     t.set('rotate', 4)
  //     t.rotate             //=> "4deg"
  //
  // Convert it to a CSS string using the `toString()` and `toString(true)` (for WebKit)
  // functions.
  //
  //     t.toString()         //=> "rotate(90deg) scale(4,4)"
  //     t.toString(true)     //=> "rotate(90deg) scale3d(4,4,0)" (WebKit version)
  //
  function Transform(str) {
    if (typeof str === 'string') { this.parse(str); }
    return this;
  }

  Transform.prototype = {
    // ### setFromString()
    // Sets a property from a string.
    //
    //     t.setFromString('scale', '2,4');
    //     // Same as set('scale', '2', '4');
    //
    setFromString: function(prop, val) {
      var args =
        (typeof val === 'string')  ? val.split(',') :
        (val.constructor === Array) ? val :
        [ val ];

      args.unshift(prop);

      Transform.prototype.set.apply(this, args);
    },

    // ### set()
    // Sets a property.
    //
    //     t.set('scale', 2, 4);
    //
    set: function(prop) {
      var args = Array.prototype.slice.apply(arguments, [1]);
      if (this.setter[prop]) {
        this.setter[prop].apply(this, args);
      } else {
        this[prop] = args.join(',');
      }
    },

    get: function(prop) {
      if (this.getter[prop]) {
        return this.getter[prop].apply(this);
      } else {
        return this[prop] || 0;
      }
    },

    setter: {
      // ### rotate
      //
      //     .css({ rotate: 30 })
      //     .css({ rotate: "30" })
      //     .css({ rotate: "30deg" })
      //     .css({ rotate: "30deg" })
      //
      rotate: function(theta) {
        this.rotate = unit(theta, 'deg');
      },

      rotateX: function(theta) {
        this.rotateX = unit(theta, 'deg');
      },

      rotateY: function(theta) {
        this.rotateY = unit(theta, 'deg');
      },

      // ### scale
      //
      //     .css({ scale: 9 })      //=> "scale(9,9)"
      //     .css({ scale: '3,2' })  //=> "scale(3,2)"
      //
      scale: function(x, y) {
        if (y === undefined) { y = x; }
        this.scale = x + "," + y;
      },

      // ### skewX + skewY
      skewX: function(x) {
        this.skewX = unit(x, 'deg');
      },

      skewY: function(y) {
        this.skewY = unit(y, 'deg');
      },

      // ### perspectvie
      perspective: function(dist) {
        this.perspective = unit(dist, 'px');
      },

      // ### x / y
      // Translations. Notice how this keeps the other value.
      //
      //     .css({ x: 4 })       //=> "translate(4px, 0)"
      //     .css({ y: 10 })      //=> "translate(4px, 10px)"
      //
      x: function(x) {
        this.set('translate', x, null);
      },

      y: function(y) {
        this.set('translate', null, y);
      },

      // ### translate
      // Notice how this keeps the other value.
      //
      //     .css({ translate: '2, 5' })    //=> "translate(2px, 5px)"
      //
      translate: function(x, y) {
        if (this._translateX === undefined) { this._translateX = 0; }
        if (this._translateY === undefined) { this._translateY = 0; }

        if (x !== null && x !== undefined) { this._translateX = unit(x, 'px'); }
        if (y !== null && y !== undefined) { this._translateY = unit(y, 'px'); }

        this.translate = this._translateX + "," + this._translateY;
      }
    },

    getter: {
      x: function() {
        return this._translateX || 0;
      },

      y: function() {
        return this._translateY || 0;
      },

      scale: function() {
        var s = (this.scale || "1,1").split(',');
        if (s[0]) { s[0] = parseFloat(s[0]); }
        if (s[1]) { s[1] = parseFloat(s[1]); }

        // "2.5,2.5" => 2.5
        // "2.5,1" => [2.5,1]
        return (s[0] === s[1]) ? s[0] : s;
      },

      rotate3d: function() {
        var s = (this.rotate3d || "0,0,0,0deg").split(',');
        for (var i=0; i<=3; ++i) {
          if (s[i]) { s[i] = parseFloat(s[i]); }
        }
        if (s[3]) { s[3] = unit(s[3], 'deg'); }

        return s;
      }
    },

    // ### parse()
    // Parses from a string. Called on constructor.
    parse: function(str) {
      var self = this;
      str.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(x, prop, val) {
        self.setFromString(prop, val);
      });
    },

    // ### toString()
    // Converts to a `transition` CSS property string. If `use3d` is given,
    // it converts to a `-webkit-transition` CSS property string instead.
    toString: function(use3d) {
      var re = [];

      for (var i in this) {
        if (this.hasOwnProperty(i)) {
          // Don't use 3D transformations if the browser can't support it.
          if ((!support.transform3d) && (
            (i === 'rotateX') ||
            (i === 'rotateY') ||
            (i === 'perspective') ||
            (i === 'transformOrigin'))) { continue; }

          if (i[0] !== '_') {
            if (use3d && (i === 'scale')) {
              re.push(i + "3d(" + this[i] + ",1)");
            } else if (use3d && (i === 'translate')) {
              re.push(i + "3d(" + this[i] + ",0)");
            } else {
              re.push(i + "(" + this[i] + ")");
            }
          }
        }
      }

      return re.join(" ");
    }
  };

  function callOrQueue(self, queue, fn) {
    if (queue === true) {
      self.queue(fn);
    } else if (queue) {
      self.queue(queue, fn);
    } else {
      self.each(function () {
                fn.call(this);
            });
    }
  }

  // ### getProperties(dict)
  // Returns properties (for `transition-property`) for dictionary `props`. The
  // value of `props` is what you would expect in `$.css(...)`.
  function getProperties(props) {
    var re = [];

    $.each(props, function(key) {
      key = $.camelCase(key); // Convert "text-align" => "textAlign"
      key = $.transit.propertyMap[key] || $.cssProps[key] || key;
      key = uncamel(key); // Convert back to dasherized

      // Get vendor specify propertie
      if (support[key])
        key = uncamel(support[key]);

      if ($.inArray(key, re) === -1) { re.push(key); }
    });

    return re;
  }

  // ### getTransition()
  // Returns the transition string to be used for the `transition` CSS property.
  //
  // Example:
  //
  //     getTransition({ opacity: 1, rotate: 30 }, 500, 'ease');
  //     //=> 'opacity 500ms ease, -webkit-transform 500ms ease'
  //
  function getTransition(properties, duration, easing, delay) {
    // Get the CSS properties needed.
    var props = getProperties(properties);

    // Account for aliases (`in` => `ease-in`).
    if ($.cssEase[easing]) { easing = $.cssEase[easing]; }

    // Build the duration/easing/delay attributes for it.
    var attribs = '' + toMS(duration) + ' ' + easing;
    if (parseInt(delay, 10) > 0) { attribs += ' ' + toMS(delay); }

    // For more properties, add them this way:
    // "margin 200ms ease, padding 200ms ease, ..."
    var transitions = [];
    $.each(props, function(i, name) {
      transitions.push(name + ' ' + attribs);
    });

    return transitions.join(', ');
  }

  // ## $.fn.transition
  // Works like $.fn.animate(), but uses CSS transitions.
  //
  //     $("...").transition({ opacity: 0.1, scale: 0.3 });
  //
  //     // Specific duration
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500);
  //
  //     // With duration and easing
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in');
  //
  //     // With callback
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, function() { ... });
  //
  //     // With everything
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in', function() { ... });
  //
  //     // Alternate syntax
  //     $("...").transition({
  //       opacity: 0.1,
  //       duration: 200,
  //       delay: 40,
  //       easing: 'in',
  //       complete: function() { /* ... */ }
  //      });
  //
  $.fn.transition = $.fn.transit = function(properties, duration, easing, callback) {
    var self  = this;
    var delay = 0;
    var queue = true;

    var theseProperties = $.extend(true, {}, properties);

    // Account for `.transition(properties, callback)`.
    if (typeof duration === 'function') {
      callback = duration;
      duration = undefined;
    }

    // Account for `.transition(properties, options)`.
    if (typeof duration === 'object') {
      easing = duration.easing;
      delay = duration.delay || 0;
      queue = typeof duration.queue === "undefined" ? true : duration.queue;
      callback = duration.complete;
      duration = duration.duration;
    }

    // Account for `.transition(properties, duration, callback)`.
    if (typeof easing === 'function') {
      callback = easing;
      easing = undefined;
    }

    // Alternate syntax.
    if (typeof theseProperties.easing !== 'undefined') {
      easing = theseProperties.easing;
      delete theseProperties.easing;
    }

    if (typeof theseProperties.duration !== 'undefined') {
      duration = theseProperties.duration;
      delete theseProperties.duration;
    }

    if (typeof theseProperties.complete !== 'undefined') {
      callback = theseProperties.complete;
      delete theseProperties.complete;
    }

    if (typeof theseProperties.queue !== 'undefined') {
      queue = theseProperties.queue;
      delete theseProperties.queue;
    }

    if (typeof theseProperties.delay !== 'undefined') {
      delay = theseProperties.delay;
      delete theseProperties.delay;
    }

    // Set defaults. (`400` duration, `ease` easing)
    if (typeof duration === 'undefined') { duration = $.fx.speeds._default; }
    if (typeof easing === 'undefined')   { easing = $.cssEase._default; }

    duration = toMS(duration);

    // Build the `transition` property.
    var transitionValue = getTransition(theseProperties, duration, easing, delay);

    // Compute delay until callback.
    // If this becomes 0, don't bother setting the transition property.
    var work = $.transit.enabled && support.transition;
    var i = work ? (parseInt(duration, 10) + parseInt(delay, 10)) : 0;

    // If there's nothing to do...
    if (i === 0) {
      var fn = function(next) {
        self.css(theseProperties);
        if (callback) { callback.apply(self); }
        if (next) { next(); }
      };

      callOrQueue(self, queue, fn);
      return self;
    }

    // Save the old transitions of each element so we can restore it later.
    var oldTransitions = {};

    var run = function(nextCall) {
      var bound = false;

      // Prepare the callback.
      var cb = function() {
        if (bound) { self.unbind(transitionEnd, cb); }

        if (i > 0) {
          self.each(function() {
            this.style[support.transition] = (oldTransitions[this] || null);
          });
        }

        if (typeof callback === 'function') { callback.apply(self); }
        if (typeof nextCall === 'function') { nextCall(); }
      };

      if ((i > 0) && (transitionEnd) && ($.transit.useTransitionEnd)) {
        // Use the 'transitionend' event if it's available.
        bound = true;
        self.bind(transitionEnd, cb);
      } else {
        // Fallback to timers if the 'transitionend' event isn't supported.
        window.setTimeout(cb, i);
      }

      // Apply transitions.
      self.each(function() {
        if (i > 0) {
          this.style[support.transition] = transitionValue;
        }
        $(this).css(theseProperties);
      });
    };

    // Defer running. This allows the browser to paint any pending CSS it hasn't
    // painted yet before doing the transitions.
    var deferredRun = function(next) {
        this.offsetWidth = this.offsetWidth; // force a repaint
        run(next);
    };

    // Use jQuery's fx queue.
    callOrQueue(self, queue, deferredRun);

    // Chainability.
    return this;
  };

  function registerCssHook(prop, isPixels) {
    // For certain properties, the 'px' should not be implied.
    if (!isPixels) { $.cssNumber[prop] = true; }

    $.transit.propertyMap[prop] = support.transform;

    $.cssHooks[prop] = {
      get: function(elem) {
        var t = $(elem).css('transit:transform');
        return t.get(prop);
      },

      set: function(elem, value) {
        var t = $(elem).css('transit:transform');
        t.setFromString(prop, value);

        $(elem).css({ 'transit:transform': t });
      }
    };

  }

  // ### uncamel(str)
  // Converts a camelcase string to a dasherized string.
  // (`marginLeft` => `margin-left`)
  function uncamel(str) {
    return str.replace(/([A-Z])/g, function(letter) { return '-' + letter.toLowerCase(); });
  }

  // ### unit(number, unit)
  // Ensures that number `number` has a unit. If no unit is found, assume the
  // default is `unit`.
  //
  //     unit(2, 'px')          //=> "2px"
  //     unit("30deg", 'rad')   //=> "30deg"
  //
  function unit(i, units) {
    if ((typeof i === "string") && (!i.match(/^[\-0-9\.]+$/))) {
      return i;
    } else {
      return "" + i + units;
    }
  }

  // ### toMS(duration)
  // Converts given `duration` to a millisecond string.
  //
  // toMS('fast') => $.fx.speeds[i] => "200ms"
  // toMS('normal') //=> $.fx.speeds._default => "400ms"
  // toMS(10) //=> '10ms'
  // toMS('100ms') //=> '100ms'  
  //
  function toMS(duration) {
    var i = duration;

    // Allow string durations like 'fast' and 'slow', without overriding numeric values.
    if (typeof i === 'string' && (!i.match(/^[\-0-9\.]+/))) { i = $.fx.speeds[i] || $.fx.speeds._default; }

    return unit(i, 'ms');
  }

  // Export some functions for testable-ness.
  $.transit.getTransitionValue = getTransition;

  return $;
}));


// Basic table
// ---------------------------------------------------------------------------
/*
 * jQuery Basic Table
 * Author: Jerry Low
 */

(function($) {
	$.fn.basictable = function(options) {
		var setup = function(table, data) {
			if (data.tableWrap) {
				table.wrap('<div class="' + settings.baseClass + '__wrapper"></div>');
			}

			var format = '';

			if (table.find('thead tr th').length) {
				format = 'thead tr th';
			}
			else if (table.find('th').length) {
				format = 'tr:first th';
			}
			else {
				format = 'tr:first td';
			}

			var headings = [];

			$.each(table.find(format), function() {
				var $heading = $(this);
				var colspan = parseInt($heading.attr('colspan'), 10) || 1;
				var row = $heading.closest('tr').index();

				if (!headings[row]) {
					headings[row] = [];
				}

				for (var i = 0; i < colspan; i++) {
					headings[row].push($heading);
				}
			});

			$.each(table.find('tbody tr'), function() {
				var $row = $(this);
				var cellIndex = 0;

				$row.children().each(function() {
					var $cell = $(this);

					if ($cell.html().trim() === '' || $cell.html() === '&nbsp;') {
						$cell.addClass(settings.baseClass + '__hide');
					}
					else {
						for (var i = 0; i < headings.length; i++) {
							var $heading = $(headings[i][cellIndex]);

							if ($heading.html() !== '' && $heading.html() !== '&nbsp;') {
								if( $cell.attr('data-th') ) {
									$cell.attr('data-th', $cell.attr('data-th') + ': ' + $heading.text());
								}
								else {
									$cell.attr('data-th', $heading.text());
								}

								if (data.contentWrap && !$cell.children().hasClass(settings.baseClass + '__content')) {
										$cell.wrapInner('<span class="' + settings.baseClass + '__content" />');
								}
							}
						}
					}

					cellIndex += $cell.attr('colspan') || 1;
				});
			});
		};

		var unwrap = function(table) {
			$.each(table.find('td'), function() {
				var $cell = $(this);
				var content = $cell.children('.' + settings.baseClass + '__content').html();
				$cell.html(content);
			});
		};

		var check = function(table, data) {
			// Only change when table is larger than parent if force
			// responsive is turned off.
			if (!data.forceResponsive) {
				if (table.removeClass(settings.baseClass + '_responsive').outerWidth() > table.parent().width()) {
					start(table, data);
				}
				else {
					end(table, data);
				}
			}
			else {
				if ($(window).width() <= data.breakpoint) {
					start(table, data);
				}
				else {
					end(table, data);
				}
			}
		};

		var start = function(table, data) {
			table.addClass(settings.baseClass + '_responsive');

			if (data.tableWrapper) {
				table.parent('.' + settings.baseClass + 'wrapper').addClass(settings.baseClass + '__wrapper_active');
			}
		};

		var end = function(table, data) {
			table.removeClass(settings.baseClass + '_responsive');

			if (data.tableWrapper) {
				table.parent('.' + settings.baseClass + '__wrapper').removeClass(settings.baseClass + '__wrapper_active');
			}
		};

		var destroy = function(table, data) {
			table.find('td').removeAttr('data-th');

			if (data.tableWrap) {
				table.unwrap();
			}

			if (data.contentWrap) {
				unwrap(table);
			}

			table.removeData('basictable');
		};

		var resize = function(table) {
			if (table.data('basictable')) {
				check(table, table.data('basictable'));
			}
		};

		// Get table.
		var table = this;

		// If table has already executed.
		if (table.length === 0 || table.data('basictable')) {
			if (table.data('basictable')) {
				// Destroy basic table.
				if (options == 'destroy') {
					destroy(table, table.data('basictable'));
				}
				// Start responsive mode.
				else if (options === 'start') {
					start(table, table.data('basictable'));
				}
				else if (options === 'stop') {
					end(table, table.data('basictable'));
				}
				else {
					check(table, table.data('basictable'));
				}
			}
			return false;
		}

		// Extend Settings.
		var settings = $.extend({}, $.fn.basictable.defaults, options);

		var vars = {
			breakpoint: settings.breakpoint,
			contentWrap: settings.contentWrap,
			forceResponsive: settings.forceResponsive,
			noResize: settings.noResize,
			tableWrapper: settings.tableWrapper
		};

		// Initiate
		table.data('basictable', vars);

		setup(table, table.data('basictable'));

		if (!vars.noResize) {
			check(table, table.data('basictable'));

			$(window).bind('resize.basictable', function() {
				resize(table);
			});
		}
	};

	$.fn.basictable.defaults = {
		breakpoint: 568,
		contentWrap: true,
		forceResponsive: true,
		noResize: false,
		tableWrap: false,
		baseClass: 'bt'
	};
})(jQuery);



// Remodal
// ---------------------------------------------------------------------------
/*
 *  Remodal - v1.0.6
 *  Responsive, lightweight, fast, synchronized with CSS animations, fully customizable modal window plugin with declarative configuration and hash tracking.
 *  http://vodkabears.github.io/remodal/
 *
 *  Made by Ilya Makarov
 *  Under MIT License
 */

!(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], function($) {
      return factory(root, $);
    });
  } else if (typeof exports === 'object') {
    factory(root, require('jquery'));
  } else {
    factory(root, root.jQuery || root.Zepto);
  }
})(this, function(global, $) {

  'use strict';

  /**
   * Name of the plugin
   * @private
   * @const
   * @type {String}
   */
  var PLUGIN_NAME = 'remodal';

  /**
   * Namespace for CSS and events
   * @private
   * @const
   * @type {String}
   */
  var NAMESPACE = global.REMODAL_GLOBALS && global.REMODAL_GLOBALS.NAMESPACE || PLUGIN_NAME;

  /**
   * Animationstart event with vendor prefixes
   * @private
   * @const
   * @type {String}
   */
  var ANIMATIONSTART_EVENTS = $.map(
    ['animationstart', 'webkitAnimationStart', 'MSAnimationStart', 'oAnimationStart'],

    function(eventName) {
      return eventName + '.' + NAMESPACE;
    }

  ).join(' ');

  /**
   * Animationend event with vendor prefixes
   * @private
   * @const
   * @type {String}
   */
  var ANIMATIONEND_EVENTS = $.map(
    ['animationend', 'webkitAnimationEnd', 'MSAnimationEnd', 'oAnimationEnd'],

    function(eventName) {
      return eventName + '.' + NAMESPACE;
    }

  ).join(' ');

  /**
   * Default settings
   * @private
   * @const
   * @type {Object}
   */
  var DEFAULTS = $.extend({
    hashTracking: true,
    closeOnConfirm: true,
    closeOnCancel: true,
    closeOnEscape: true,
    closeOnOutsideClick: true,
    modifier: ''
  }, global.REMODAL_GLOBALS && global.REMODAL_GLOBALS.DEFAULTS);

  /**
   * States of the Remodal
   * @private
   * @const
   * @enum {String}
   */
  var STATES = {
    CLOSING: 'closing',
    CLOSED: 'closed',
    OPENING: 'opening',
    OPENED: 'opened'
  };

  /**
   * Reasons of the state change.
   * @private
   * @const
   * @enum {String}
   */
  var STATE_CHANGE_REASONS = {
    CONFIRMATION: 'confirmation',
    CANCELLATION: 'cancellation'
  };

  /**
   * Is animation supported?
   * @private
   * @const
   * @type {Boolean}
   */
  var IS_ANIMATION = (function() {
    var style = document.createElement('div').style;

    return style.animationName !== undefined ||
      style.WebkitAnimationName !== undefined ||
      style.MozAnimationName !== undefined ||
      style.msAnimationName !== undefined ||
      style.OAnimationName !== undefined;
  })();

  /**
   * Is iOS?
   * @private
   * @const
   * @type {Boolean}
   */
  var IS_IOS = /iPad|iPhone|iPod/.test(navigator.platform);

  /**
   * Current modal
   * @private
   * @type {Remodal}
   */
  var current;

  /**
   * Scrollbar position
   * @private
   * @type {Number}
   */
  var scrollTop;

  /**
   * Returns an animation duration
   * @private
   * @param {jQuery} $elem
   * @returns {Number}
   */
  function getAnimationDuration($elem) {
    if (
      IS_ANIMATION &&
      $elem.css('animation-name') === 'none' &&
      $elem.css('-webkit-animation-name') === 'none' &&
      $elem.css('-moz-animation-name') === 'none' &&
      $elem.css('-o-animation-name') === 'none' &&
      $elem.css('-ms-animation-name') === 'none'
    ) {
      return 0;
    }

    var duration = $elem.css('animation-duration') ||
      $elem.css('-webkit-animation-duration') ||
      $elem.css('-moz-animation-duration') ||
      $elem.css('-o-animation-duration') ||
      $elem.css('-ms-animation-duration') ||
      '0s';

    var delay = $elem.css('animation-delay') ||
      $elem.css('-webkit-animation-delay') ||
      $elem.css('-moz-animation-delay') ||
      $elem.css('-o-animation-delay') ||
      $elem.css('-ms-animation-delay') ||
      '0s';

    var iterationCount = $elem.css('animation-iteration-count') ||
      $elem.css('-webkit-animation-iteration-count') ||
      $elem.css('-moz-animation-iteration-count') ||
      $elem.css('-o-animation-iteration-count') ||
      $elem.css('-ms-animation-iteration-count') ||
      '1';

    var max;
    var len;
    var num;
    var i;

    duration = duration.split(', ');
    delay = delay.split(', ');
    iterationCount = iterationCount.split(', ');

    // The 'duration' size is the same as the 'delay' size
    for (i = 0, len = duration.length, max = Number.NEGATIVE_INFINITY; i < len; i++) {
      num = parseFloat(duration[i]) * parseInt(iterationCount[i], 10) + parseFloat(delay[i]);

      if (num > max) {
        max = num;
      }
    }

    return num;
  }

  /**
   * Returns a scrollbar width
   * @private
   * @returns {Number}
   */
  function getScrollbarWidth() {
    if ($(document.body).height() <= $(window).height()) {
      return 0;
    }

    var outer = document.createElement('div');
    var inner = document.createElement('div');
    var widthNoScroll;
    var widthWithScroll;

    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    document.body.appendChild(outer);

    widthNoScroll = outer.offsetWidth;

    // Force scrollbars
    outer.style.overflow = 'scroll';

    // Add inner div
    inner.style.width = '100%';
    outer.appendChild(inner);

    widthWithScroll = inner.offsetWidth;

    // Remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
  }

  /**
   * Locks the screen
   * @private
   */
  function lockScreen() {
    if (IS_IOS) {
      return;
    }

    var $html = $('html');
    var lockedClass = namespacify('is-locked');
    var paddingRight;
    var $body;

    if (!$html.hasClass(lockedClass)) {
      $body = $(document.body);

      // Zepto does not support '-=', '+=' in the `css` method
      paddingRight = parseInt($body.css('padding-right'), 10) + getScrollbarWidth();

      $body.css('padding-right', paddingRight + 'px');
      $html.addClass(lockedClass);
    }
  }

  /**
   * Unlocks the screen
   * @private
   */
  function unlockScreen() {
    if (IS_IOS) {
      return;
    }

    var $html = $('html');
    var lockedClass = namespacify('is-locked');
    var paddingRight;
    var $body;

    if ($html.hasClass(lockedClass)) {
      $body = $(document.body);

      // Zepto does not support '-=', '+=' in the `css` method
      paddingRight = parseInt($body.css('padding-right'), 10) - getScrollbarWidth();

      $body.css('padding-right', paddingRight + 'px');
      $html.removeClass(lockedClass);
    }
  }

  /**
   * Sets a state for an instance
   * @private
   * @param {Remodal} instance
   * @param {STATES} state
   * @param {Boolean} isSilent If true, Remodal does not trigger events
   * @param {String} Reason of a state change.
   */
  function setState(instance, state, isSilent, reason) {

    var newState = namespacify('is', state);
    var allStates = [namespacify('is', STATES.CLOSING),
                     namespacify('is', STATES.OPENING),
                     namespacify('is', STATES.CLOSED),
                     namespacify('is', STATES.OPENED)].join(' ');

    instance.$bg
      .removeClass(allStates)
      .addClass(newState);

    instance.$overlay
      .removeClass(allStates)
      .addClass(newState);

    instance.$wrapper
      .removeClass(allStates)
      .addClass(newState);

    instance.$modal
      .removeClass(allStates)
      .addClass(newState);

    instance.state = state;
    !isSilent && instance.$modal.trigger({
      type: state,
      reason: reason
    }, [{ reason: reason }]);
  }

  /**
   * Synchronizes with the animation
   * @param {Function} doBeforeAnimation
   * @param {Function} doAfterAnimation
   * @param {Remodal} instance
   */
  function syncWithAnimation(doBeforeAnimation, doAfterAnimation, instance) {
    var runningAnimationsCount = 0;

    var handleAnimationStart = function(e) {
      if (e.target !== this) {
        return;
      }

      runningAnimationsCount++;
    };

    var handleAnimationEnd = function(e) {
      if (e.target !== this) {
        return;
      }

      if (--runningAnimationsCount === 0) {

        // Remove event listeners
        $.each(['$bg', '$overlay', '$wrapper', '$modal'], function(index, elemName) {
          instance[elemName].off(ANIMATIONSTART_EVENTS + ' ' + ANIMATIONEND_EVENTS);
        });

        doAfterAnimation();
      }
    };

    $.each(['$bg', '$overlay', '$wrapper', '$modal'], function(index, elemName) {
      instance[elemName]
        .on(ANIMATIONSTART_EVENTS, handleAnimationStart)
        .on(ANIMATIONEND_EVENTS, handleAnimationEnd);
    });

    doBeforeAnimation();

    // If the animation is not supported by a browser or its duration is 0
    if (
      getAnimationDuration(instance.$bg) === 0 &&
      getAnimationDuration(instance.$overlay) === 0 &&
      getAnimationDuration(instance.$wrapper) === 0 &&
      getAnimationDuration(instance.$modal) === 0
    ) {

      // Remove event listeners
      $.each(['$bg', '$overlay', '$wrapper', '$modal'], function(index, elemName) {
        instance[elemName].off(ANIMATIONSTART_EVENTS + ' ' + ANIMATIONEND_EVENTS);
      });

      doAfterAnimation();
    }
  }

  /**
   * Closes immediately
   * @private
   * @param {Remodal} instance
   */
  function halt(instance) {
    if (instance.state === STATES.CLOSED) {
      return;
    }

    $.each(['$bg', '$overlay', '$wrapper', '$modal'], function(index, elemName) {
      instance[elemName].off(ANIMATIONSTART_EVENTS + ' ' + ANIMATIONEND_EVENTS);
    });

    instance.$bg.removeClass(instance.settings.modifier);
    instance.$overlay.removeClass(instance.settings.modifier).hide();
    instance.$wrapper.hide();
    unlockScreen();
    setState(instance, STATES.CLOSED, true);
  }

  /**
   * Parses a string with options
   * @private
   * @param str
   * @returns {Object}
   */
  function parseOptions(str) {
    var obj = {};
    var arr;
    var len;
    var val;
    var i;

    // Remove spaces before and after delimiters
    str = str.replace(/\s*:\s*/g, ':').replace(/\s*,\s*/g, ',');

    // Parse a string
    arr = str.split(',');
    for (i = 0, len = arr.length; i < len; i++) {
      arr[i] = arr[i].split(':');
      val = arr[i][1];

      // Convert a string value if it is like a boolean
      if (typeof val === 'string' || val instanceof String) {
        val = val === 'true' || (val === 'false' ? false : val);
      }

      // Convert a string value if it is like a number
      if (typeof val === 'string' || val instanceof String) {
        val = !isNaN(val) ? +val : val;
      }

      obj[arr[i][0]] = val;
    }

    return obj;
  }

  /**
   * Generates a string separated by dashes and prefixed with NAMESPACE
   * @private
   * @param {...String}
   * @returns {String}
   */
  function namespacify() {
    var result = NAMESPACE;

    for (var i = 0; i < arguments.length; ++i) {
      result += '-' + arguments[i];
    }

    return result;
  }

  /**
   * Handles the hashchange event
   * @private
   * @listens hashchange
   */
  function handleHashChangeEvent() {
    var id = location.hash.replace('#', '');
    var instance;
    var $elem;

    if (!id) {

      // Check if we have currently opened modal and animation was completed
      if (current && current.state === STATES.OPENED && current.settings.hashTracking) {
        current.close();
      }
    } else {

      // Catch syntax error if your hash is bad
      try {
        $elem = $(
          '[data-' + PLUGIN_NAME + '-id="' + id + '"]'
        );
      } catch (err) {}

      if ($elem && $elem.length) {
        instance = $[PLUGIN_NAME].lookup[$elem.data(PLUGIN_NAME)];

        if (instance && instance.settings.hashTracking) {
          instance.open();
        }
      }

    }
  }

  /**
   * Remodal constructor
   * @constructor
   * @param {jQuery} $modal
   * @param {Object} options
   */
  function Remodal($modal, options) {
    var $body = $(document.body);
    var remodal = this;

    remodal.settings = $.extend({}, DEFAULTS, options);
    remodal.index = $[PLUGIN_NAME].lookup.push(remodal) - 1;
    remodal.state = STATES.CLOSED;

    remodal.$overlay = $('.' + namespacify('overlay'));

    if (!remodal.$overlay.length) {
      remodal.$overlay = $('<div>').addClass(namespacify('overlay') + ' ' + namespacify('is', STATES.CLOSED)).hide();
      $body.append(remodal.$overlay);
    }

    remodal.$bg = $('.' + namespacify('bg')).addClass(namespacify('is', STATES.CLOSED));

    remodal.$modal = $modal
      .addClass(
        NAMESPACE + ' ' +
        namespacify('is-initialized') + ' ' +
        remodal.settings.modifier + ' ' +
        namespacify('is', STATES.CLOSED))
      .attr('tabindex', '-1');

    remodal.$wrapper = $('<div>')
      .addClass(
        namespacify('wrapper') + ' ' +
        remodal.settings.modifier + ' ' +
        namespacify('is', STATES.CLOSED))
      .hide()
      .append(remodal.$modal);
    $body.append(remodal.$wrapper);

    // Add the event listener for the close button
    remodal.$wrapper.on('click.' + NAMESPACE, '[data-' + PLUGIN_NAME + '-action="close"]', function(e) {
      e.preventDefault();

      remodal.close();
    });

    // Add the event listener for the cancel button
    remodal.$wrapper.on('click.' + NAMESPACE, '[data-' + PLUGIN_NAME + '-action="cancel"]', function(e) {
      e.preventDefault();

      remodal.$modal.trigger(STATE_CHANGE_REASONS.CANCELLATION);

      if (remodal.settings.closeOnCancel) {
        remodal.close(STATE_CHANGE_REASONS.CANCELLATION);
      }
    });

    // Add the event listener for the confirm button
    remodal.$wrapper.on('click.' + NAMESPACE, '[data-' + PLUGIN_NAME + '-action="confirm"]', function(e) {
      e.preventDefault();

      remodal.$modal.trigger(STATE_CHANGE_REASONS.CONFIRMATION);

      if (remodal.settings.closeOnConfirm) {
        remodal.close(STATE_CHANGE_REASONS.CONFIRMATION);
      }
    });

    // Add the event listener for the overlay
    remodal.$wrapper.on('click.' + NAMESPACE, function(e) {
      var $target = $(e.target);

      if (!$target.hasClass(namespacify('wrapper'))) {
        return;
      }

      if (remodal.settings.closeOnOutsideClick) {
        remodal.close();
      }
    });
  }

  /**
   * Opens a modal window
   * @public
   */
  Remodal.prototype.open = function() {
    var remodal = this;
    var id;

    // Check if the animation was completed
    if (remodal.state === STATES.OPENING || remodal.state === STATES.CLOSING) {
      return;
    }

    id = remodal.$modal.attr('data-' + PLUGIN_NAME + '-id');

    if (id && remodal.settings.hashTracking) {
      scrollTop = $(window).scrollTop();
      location.hash = id;
    }

    if (current && current !== remodal) {
      halt(current);
    }

    current = remodal;
    lockScreen();
    remodal.$bg.addClass(remodal.settings.modifier);
    remodal.$overlay.addClass(remodal.settings.modifier).show();
    remodal.$wrapper.show().scrollTop(0);
    remodal.$modal.focus();

    syncWithAnimation(
      function() {
        setState(remodal, STATES.OPENING);
      },

      function() {
        setState(remodal, STATES.OPENED);
      },

      remodal);
  };

  /**
   * Closes a modal window
   * @public
   * @param {String} reason
   */
  Remodal.prototype.close = function(reason) {
    var remodal = this;

    // Check if the animation was completed
    if (remodal.state === STATES.OPENING || remodal.state === STATES.CLOSING) {
      return;
    }

    if (
      remodal.settings.hashTracking &&
      remodal.$modal.attr('data-' + PLUGIN_NAME + '-id') === location.hash.substr(1)
    ) {
      location.hash = '';
      $(window).scrollTop(scrollTop);
    }

    syncWithAnimation(
      function() {
        setState(remodal, STATES.CLOSING, false, reason);
      },

      function() {
        remodal.$bg.removeClass(remodal.settings.modifier);
        remodal.$overlay.removeClass(remodal.settings.modifier).hide();
        remodal.$wrapper.hide();
        unlockScreen();

        setState(remodal, STATES.CLOSED, false, reason);
      },

      remodal);
  };

  /**
   * Returns a current state of a modal
   * @public
   * @returns {STATES}
   */
  Remodal.prototype.getState = function() {
    return this.state;
  };

  /**
   * Destroys a modal
   * @public
   */
  Remodal.prototype.destroy = function() {
    var lookup = $[PLUGIN_NAME].lookup;
    var instanceCount;

    halt(this);
    this.$wrapper.remove();

    delete lookup[this.index];
    instanceCount = $.grep(lookup, function(instance) {
      return !!instance;
    }).length;

    if (instanceCount === 0) {
      this.$overlay.remove();
      this.$bg.removeClass(
        namespacify('is', STATES.CLOSING) + ' ' +
        namespacify('is', STATES.OPENING) + ' ' +
        namespacify('is', STATES.CLOSED) + ' ' +
        namespacify('is', STATES.OPENED));
    }
  };

  /**
   * Special plugin object for instances
   * @public
   * @type {Object}
   */
  $[PLUGIN_NAME] = {
    lookup: []
  };

  /**
   * Plugin constructor
   * @constructor
   * @param {Object} options
   * @returns {JQuery}
   */
  $.fn[PLUGIN_NAME] = function(opts) {
    var instance;
    var $elem;

    this.each(function(index, elem) {
      $elem = $(elem);

      if ($elem.data(PLUGIN_NAME) == null) {
        instance = new Remodal($elem, opts);
        $elem.data(PLUGIN_NAME, instance.index);

        if (
          instance.settings.hashTracking &&
          $elem.attr('data-' + PLUGIN_NAME + '-id') === location.hash.substr(1)
        ) {
          instance.open();
        }
      } else {
        instance = $[PLUGIN_NAME].lookup[$elem.data(PLUGIN_NAME)];
      }
    });

    return instance;
  };

  $(document).ready(function() {

    // data-remodal-target opens a modal window with the special Id
    $(document).on('click', '[data-' + PLUGIN_NAME + '-target]', function(e) {
      e.preventDefault();

      var elem = e.currentTarget;
      var id = elem.getAttribute('data-' + PLUGIN_NAME + '-target');
      var $target = $('[data-' + PLUGIN_NAME + '-id="' + id + '"]');

      $[PLUGIN_NAME].lookup[$target.data(PLUGIN_NAME)].open();
    });

    // Auto initialization of modal windows
    // They should have the 'remodal' class attribute
    // Also you can write the `data-remodal-options` attribute to pass params into the modal
    $(document).find('.' + NAMESPACE).each(function(i, container) {
      var $container = $(container);
      var options = $container.data(PLUGIN_NAME + '-options');

      if (!options) {
        options = {};
      } else if (typeof options === 'string' || options instanceof String) {
        options = parseOptions(options);
      }

      $container[PLUGIN_NAME](options);
    });

    // Handles the keydown event
    $(document).on('keydown.' + NAMESPACE, function(e) {
      if (current && current.settings.closeOnEscape && current.state === STATES.OPENED && e.keyCode === 27) {
        current.close();
      }
    });

    // Handles the hashchange event
    $(window).on('hashchange.' + NAMESPACE, handleHashChangeEvent);
  });
});



// My plugins
// ---------------------------------------------------------------------------
// require plugins/jquery.drop-down.js
// require plugins/jquery.equal-heights.js
// require plugins/jquery.highlight.js
// require plugins/jquery.link-radio.js
// require plugins/jquery.raiting.js
// require plugins/jquery.spinner.js
// require plugins/jquery.tabs.js

