// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../node_modules/boxicons/css/boxicons.min.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"./..\\fonts\\boxicons.eot":[["boxicons.0dca1d21.eot","../node_modules/boxicons/fonts/boxicons.eot"],"../node_modules/boxicons/fonts/boxicons.eot"],"./..\\fonts\\boxicons.woff2":[["boxicons.7a075b4b.woff2","../node_modules/boxicons/fonts/boxicons.woff2"],"../node_modules/boxicons/fonts/boxicons.woff2"],"./..\\fonts\\boxicons.woff":[["boxicons.098faa5e.woff","../node_modules/boxicons/fonts/boxicons.woff"],"../node_modules/boxicons/fonts/boxicons.woff"],"./..\\fonts\\boxicons.ttf":[["boxicons.5fd50502.ttf","../node_modules/boxicons/fonts/boxicons.ttf"],"../node_modules/boxicons/fonts/boxicons.ttf"],"./..\\fonts\\boxicons.svg":[["boxicons.4de4a689.svg","../node_modules/boxicons/fonts/boxicons.svg"],"../node_modules/boxicons/fonts/boxicons.svg"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"scss/style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"img/arsenal.png":[function(require,module,exports) {
module.exports = "/arsenal.e3d7bda4.png";
},{}],"img/juventus.png":[function(require,module,exports) {
module.exports = "/juventus.8fdcb4f5.png";
},{}],"img/bayern.png":[function(require,module,exports) {
module.exports = "/bayern.378d3db3.png";
},{}],"img/main-jersey.png":[function(require,module,exports) {
module.exports = "/main-jersey.a7eea7f1.png";
},{}],"img/psg.png":[function(require,module,exports) {
module.exports = "/psg.4b3e6885.png";
},{}],"img/realmadrid.png":[function(require,module,exports) {
module.exports = "/realmadrid.5bc0a0ea.png";
},{}],"img/barcelona.png":[function(require,module,exports) {
module.exports = "/barcelona.1eefd885.png";
},{}],"img/*.png":[function(require,module,exports) {
module.exports = {
  "arsenal": require("./arsenal.png"),
  "juventus": require("./juventus.png"),
  "bayern": require("./bayern.png"),
  "main-jersey": require("./main-jersey.png"),
  "psg": require("./psg.png"),
  "realmadrid": require("./realmadrid.png"),
  "barcelona": require("./barcelona.png")
};
},{"./arsenal.png":"img/arsenal.png","./juventus.png":"img/juventus.png","./bayern.png":"img/bayern.png","./main-jersey.png":"img/main-jersey.png","./psg.png":"img/psg.png","./realmadrid.png":"img/realmadrid.png","./barcelona.png":"img/barcelona.png"}],"js/main.js":[function(require,module,exports) {
"use strict";

require("boxicons/css/boxicons.min.css");

require("../scss/style.scss");

var _ = require("../img/*.png");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var additem = document.querySelectorAll('.add__item');
var listGoods = [{
  number: 1,
  title: 'arsenal',
  img: _.arsenal,
  price: 80,
  inCart: 0
}, {
  number: 2,
  title: 'barcelona',
  img: _.barcelona,
  price: 90,
  inCart: 0
}, {
  number: 3,
  title: 'realmadrid',
  img: _.realmadrid,
  price: 100,
  inCart: 0
}, {
  number: 4,
  title: 'bayern',
  img: _.bayern,
  price: 80,
  inCart: 0
}, {
  number: 5,
  title: 'juventus',
  img: _.juventus,
  price: 110,
  inCart: 0
}, {
  number: 6,
  title: 'psg',
  img: _.psg,
  price: 120,
  inCart: 0
}];

var _loop = function _loop(i) {
  additem[i].addEventListener('click', function () {
    cartNum(listGoods[i]);
    totalCost(listGoods[i]);
  });
};

for (var i = 0; i < additem.length; i++) {
  _loop(i);
}

function onLoadCartNum() {
  var goodsNumbers = localStorage.getItem('cartNumbers');

  if (goodsNumbers) {
    document.getElementsByClassName('.cart .num').textContent = goodsNumbers;
  }
}

function cartNum(product) {
  var goodsNumbers = localStorage.getItem('cartNumbers');
  goodsNumbers = parseInt(goodsNumbers);

  if (goodsNumbers) {
    localStorage.setItem('cartNumbers', goodsNumbers + 1);
    document.querySelector('.cart .num').textContent = goodsNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart .num').textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  var cartItems = localStorage.getItem('goodsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.title] == undefined) {
      cartItems = _objectSpread(_objectSpread({}, cartItems), {}, _defineProperty({}, product.title, product));
    }

    cartItems[product.title].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = _defineProperty({}, product.title, product);
  }

  localStorage.setItem("goodsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  var cartCost = localStorage.getItem('totalCost');

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  var cartItems = localStorage.getItem("goodsInCart");
  cartItems = JSON.parse(cartItems);
  var goodsContainer = document.querySelector(".products");
  var cartCost = localStorage.getItem('totalCost');

  if (cartItems && goodsContainer) {
    goodsContainer.innerHTML = '';
    Object.values(cartItems).map(function (item) {
      goodsContainer.innerHTML += "\n            <div class=\"product_container\">\n            <p>".concat(item.number, "</p>\n               <div class = \"product\">\n                   <div class=\"product_name\">\n                   <img src=\"").concat(item.img, "\"></img>\n                   <span>").concat(item.title, " Strip</span>\n                   </div>\n               </div>\n               <div class = \"price\">").concat(item.price, "</div>\n               <div class = \"quantity\">\n                   <span>").concat(item.inCart, "</span>\n               </div>\n               <div class=\"total\">\n                   ").concat(item.inCart * item.price, "\n               </div>\n               ");
    });
    goodsContainer.innerHTML += "\n        <div class=\"cartTotalContainer\">\n            <h3 class=\"cartTotalTitle\">Cart Total</h3>\n            <h3 class=\"cartTotal\">".concat(cartCost, "</h3>\n        </div>\n        ");
  }
} // function removeCart() {
//     let remItems;
//     let but = document.getElementsByClassName('rem-but');
//     if (but) {
//         but.addEventListener('click', () => {
//             remItems = localStorage.removeItem('goodsInCart');
//         })
//     }
// }


onLoadCartNum();
displayCart(); // removeCart();
},{"boxicons/css/boxicons.min.css":"../node_modules/boxicons/css/boxicons.min.css","../scss/style.scss":"scss/style.scss","../img/*.png":"img/*.png"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56525" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map