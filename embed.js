(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = {
    "relprefix": "/pxt-sample/",
    "workerjs": "/pxt-sample/worker.js",
    "tdworkerjs": "/pxt-sample/tdworker.js",
    "monacoworkerjs": "/pxt-sample/monacoworker.js",
    "pxtVersion": "1.0.7",
    "pxtRelId": "",
    "pxtCdnUrl": "/pxt-sample/",
    "targetVersion": "0.0.0",
    "targetRelId": "",
    "targetCdnUrl": "/pxt-sample/",
    "targetUrl": "",
    "simUrl": "/pxt-sample/simulator.html",
    "partsUrl": "/pxt-sample/siminstructions.html",
    "runUrl": "/pxt-sample/run.html",
    "docsUrl": "/pxt-sample/docs.html",
    "isStatic": true
};

    var appCdnRoot = "/pxt-sample/";
    var scripts = [
        "highlight.js/highlight.pack.js",
        "bluebird.min.js",
        "typescript.js",
        "semantic.js",
        "marked/marked.min.js",
        "lzma/lzma_worker-min.js",
        "blockly/blockly_compressed.js",
        "blockly/blocks_compressed.js",
        "blockly/msg/js/en.js",
        "pxtlib.js",
        "pxtblocks.js",
        "pxteditor.js",
        "pxtsim.js",
        "target.js",
        "pxtrunner.js"
    ].map(function(s) { return appCdnRoot + s; })

    if (typeof jQuery == "undefined")
        scripts.unshift(appCdnRoot + "jquery.js")

    var pxtCallbacks = []

    window.ksRunnerReady = function(f) {
        if (pxtCallbacks == null) f()
        else pxtCallbacks.push(f)
    }

    window.ksRunnerWhenLoaded = function() {
        pxt.docs.requireHighlightJs = function() { return hljs; }
        pxt.setupWebConfig(pxtConfig || window.pxtWebConfig)
        pxt.runner.initCallbacks = pxtCallbacks
        pxtCallbacks.push(function() {
            pxtCallbacks = null
        })
        pxt.runner.init();
    }

    scripts.forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    })

} ())
