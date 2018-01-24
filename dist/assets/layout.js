(function (funcName, baseObj) {
    // The function mimics $('document').ready(function() { .. })

    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    // should be called when the document is ready
    // this function protects itself against being called more than once
    function ready() {
        if (!readyFired) {
            // this must be set to true before we start calling callbacks
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                // if a callback here happens to add new ready handlers,
                // the docReady() function will see that it already fired
                // and will schedule the callback to run right after
                // this event loop finishes so all handlers will still execute
                // in order and no new ones will be added to the readyList
                // while we are processing the list
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            // allow any closures held by these functions to free
            readyList = [];
        }
    }

    function readyStateChange() {
        if (document.readyState === "complete") {
            ready();
        }
    }

    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    baseObj[funcName] = function (callback, context) {
        if (typeof callback !== "function") {
            throw new TypeError("callback for docReady(fn) must be a function");
        }
        // if ready has already fired, then just schedule the callback
        // to fire asynchronously, but right away
        if (readyFired) {
            setTimeout(function () { callback(context); }, 1);
            return;
        } else {
            // add the function and context to the list
            readyList.push({ fn: callback, ctx: context });
        }
        // if document already ready to go, schedule the ready function to run
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            // otherwise if we don't have event handlers installed, install them
            if (document.addEventListener) {
                // first choice is DOMContentLoaded event
                document.addEventListener("DOMContentLoaded", ready, false);
                // backup is window load event
                window.addEventListener("load", ready, false);
            } else {
                // must be IE
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    };
})("docReady", window);

function getLayoutScript() {
    for (var i = 0; i < document.scripts.length; i++) {
        var script = document.scripts[i];
        if (script.src.endsWith("layout.js")) {
            return script;
        }
    }

    return null;
}

function setStyle() {
    var link1 = document.createElement("link");
    link1.rel = "stylesheet";
    link1.href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css";
    link1.integrity = "sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M";
    link1.crossOrigin = "anonymous";

    var link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "../assets/css/demo.css?1.0.0.0";
    link2.crossOrigin = "anonymous";

    document.head.appendChild(link1);
    document.head.appendChild(link2);
}

function setHeader(libName, prjName) {
    var header = document.createElement("header");
    header.className = "navbar";

    header.innerHTML = `
        <div class ="logo-container d-flex align-items-center">
            <a href="https://retyped.com/" class ="navbar-brand">
                <svg xmlns="http://www.w3.org/2000/svg" width="170" height="31.7" viewBox="0 0 170 31.7" overflow="scroll"><path d="M59.5 13.3c0 2.4-.9 3.9-2.8 4.6l3.8 5.3h-4.1l-3.3-4.7h-2.3v4.7h-3.3V8.4h5.6c2.3 0 4 .4 4.9 1.2 1 .8 1.5 2 1.5 3.7zm-4 1.8c.4-.4.6-1 .6-1.8s-.2-1.3-.6-1.6c-.4-.3-1.2-.4-2.2-.4h-2.5v4.4h2.4c1.1 0 1.9-.2 2.3-.6zM77.8 8.4v3h-7.4v3.1H77v2.8h-6.6v3.1H78v2.9H67.1V8.4h10.7zM91.5 11.3v12h-3.3v-12H84V8.4h11.7v2.9h-4.2zM108.8 23.3h-3.3v-5.9l-5.1-9h3.6l3.2 5.5 3.2-5.5h3.6l-5.1 9v5.9zM130 9.7c1 .9 1.6 2.2 1.6 4.1 0 1.8-.5 3.2-1.6 4-1.1.8-2.7 1.3-4.9 1.3h-2v4.1h-3.3V8.4h5.2c2.3 0 4 .5 5 1.3zm-2.4 5.9c.4-.4.6-1.1.6-2s-.3-1.5-.8-1.8c-.5-.4-1.3-.5-2.4-.5h-1.9v5h2.2c1.1 0 1.9-.3 2.3-.7zM149.1 8.4v3h-7.4v3.1h6.6v2.8h-6.6v3.1h7.6v2.9h-10.9V8.4h10.7zM167.9 10.4c1.4 1.3 2.1 3.1 2.1 5.4 0 2.3-.7 4.1-2.1 5.5-1.4 1.3-3.5 2-6.3 2h-5.1V8.4h5.2c2.7 0 4.8.7 6.2 2zm-2.5 8.8c.8-.8 1.2-1.9 1.2-3.3 0-1.5-.4-2.6-1.2-3.4-.8-.8-2.1-1.2-3.7-1.2h-1.8v9h2.1c1.5 0 2.6-.4 3.4-1.1z" /><g><path d="M27.8 0v27.8H0v3.9h31.7V0M3.9 3.9h19.9V0H0v23.8h3.9" /><path d="M7.8 19.9v3.9h16v-16h-3.9v12.1" /></g></svg>
            </a>
            <span class ="sep mr-3 ml-1">|</span>
            <span class ="site-title"><a href="https://demos.retyped.com">Demos</a> > </span>
            <span class ="site-title">${libName}</span>
        </div>
        <span class ="fork-on-github d-none d-sm-inline-block"><a href="https://github.com/Retyped/Demos/tree/master/${prjName}">Fork me on GitHub</a></span>`;

    document.body.insertBefore(header, document.body.firstChild);
}

function setFooter() {
    var footer = document.createElement("footer");
    footer.className = "site-footer";

    footer.innerHTML = `
        <p class ="mb-0">
            &copy; 2008 - ${new Date().getFullYear()}</span> <a href="http://object.net/">Object.NET, Inc.</a> All Rights Reserved
        </p>`;

    document.body.appendChild(footer);
}

window.docReady(function () {
    var layoutScript = getLayoutScript();
    if (!layoutScript) {
        return;
    }

    var libName = layoutScript.getAttribute("LibName");
    var prjName = layoutScript.getAttribute("ProjName");
    if (!libName || !prjName) {
        return;
    }

    setStyle();
    setHeader(libName, prjName);
    setFooter();
});

