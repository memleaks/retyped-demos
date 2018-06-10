/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 17.1.0
 */
Bridge.assembly("DragulaDemo", function ($asm, globals) {
    "use strict";

    Bridge.define("DragulaDemo.App", {
        main: function Main () {
            // Dragula library is accessed via Global variables,
            // see "loader" setting in bridge.json file.

            DragulaDemo.App.ConfigureExample1();
            DragulaDemo.App.ConfigureExample2();
            DragulaDemo.App.ConfigureExample3();
            DragulaDemo.App.ConfigureExample4();
            DragulaDemo.App.ConfigureExample5();
            DragulaDemo.App.ConfigureExample6();
            DragulaDemo.App.ConfigureExample7();
            DragulaDemo.App.ConfigureExample8();
        },
        statics: {
            methods: {
                ConfigureExample1: function () {
                    dragula(System.Array.init([document.getElementById("left-defaults"), document.getElementById("right-defaults")], Element));
                },
                ConfigureExample2: function () {
                    var drake = dragula(System.Array.init([document.getElementById("left-events"), document.getElementById("right-events")], Element));

                    drake.on("drag", function (el) {
                        el.className = System.String.replaceAll(el.className, "ex-moved", "");
                    });

                    drake.on("drop", function (el) {
                        el.className = (el.className || "") + " ex-moved";
                    });

                    drake.on("over", function (el, container) {
                        container.className = (container.className || "") + " ex-over";
                    });

                    drake.on("out", function (el, container) {
                        container.className = System.String.replaceAll(container.className, "ex-over", "");
                    });
                },
                ConfigureExample3: function () {
                    dragula(System.Array.init([document.getElementById("left-rm-spill"), document.getElementById("right-rm-spill")], Element), { removeOnSpill: true });
                },
                ConfigureExample4: function () {
                    dragula(System.Array.init([document.getElementById("left-rollbacks"), document.getElementById("right-rollbacks")], Element), { revertOnSpill: true });
                },
                ConfigureExample5: function () {
                    dragula(System.Array.init([document.getElementById("left-copy"), document.getElementById("right-copy")], Element), { copy: true });
                },
                ConfigureExample6: function () {
                    dragula(System.Array.init([document.getElementById("left-copy-1tomany"), document.getElementById("right-copy-1tomany")], Element), { copy: function (el, source) {
                            return Bridge.referenceEquals(source.id, "left-copy-1tomany");
                        }, accepts: function (el, target, source, sibling) {
                            return !Bridge.referenceEquals(target.id, "left-copy-1tomany");
                        } });
                },
                ConfigureExample7: function () {
                    dragula(System.Array.init([document.getElementById("left-lovehandles"), document.getElementById("right-lovehandles")], Element), { moves: function (el, container, handle, sibling) {
                            return System.String.contains(handle.className,"handle");
                        } });
                },
                ConfigureExample8: function () {
                    var clickIndicator = " [click!]";
                    var sortable = document.getElementById("sortable");

                    dragula(System.Array.init([sortable], Element));

                    sortable.onclick = function (e) {
                        var target = Bridge.cast(e.target, Element);
                        if (Bridge.referenceEquals(target.id, sortable.id)) {
                            return;
                        }

                        target.innerHTML = (target.innerHTML || "") + (clickIndicator || "");

                        setTimeout(function (timeoutEv) {
                            target.innerHTML = System.String.replaceAll(target.innerHTML, clickIndicator, "");
                        }, 500);
                    };
                }
            }
        }
    });
});
