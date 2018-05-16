/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 17.0.0
 */
Bridge.assembly("DragulaDemo", function ($asm, globals) {
    "use strict";

    Bridge.define("DragulaDemo.App", {
        main: function Main () {

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
                        var target = e.target;
                        if (Bridge.referenceEquals(target.id, sortable.id)) {
                            return null;
                        }

                        target.innerHTML = (target.innerHTML || "") + (clickIndicator || "");

                        setTimeout(function (timeoutEv) {
                            target.innerHTML = System.String.replaceAll(target.innerHTML, clickIndicator, "");
                        }, 500);

                        return null;
                    };
                }
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJEcmFndWxhRGVtby5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7OztZQVlZQTtZQUNBQTtZQUNBQTtZQUNBQTtZQUNBQTtZQUNBQTtZQUNBQTtZQUNBQTs7Ozs7b0JBS0FBLFFBQThCQSxtQkFFMUJBLDBDQUNBQTs7O29CQU1KQSxZQUFZQSxRQUE4QkEsbUJBRXRDQSx3Q0FDQUE7O29CQUdKQSxpQkFBaUJBLEFBQWdDQTt3QkFFN0NBLGVBQWVBOzs7b0JBR25CQSxpQkFBaUJBLEFBQWdDQTt3QkFFN0NBOzs7b0JBR0pBLGlCQUFpQkEsQUFBcURBLFVBQUNBLElBQUlBO3dCQUV2RUE7OztvQkFHSkEsZ0JBQWdCQSxBQUFxREEsVUFBQ0EsSUFBSUE7d0JBRXRFQSxzQkFBc0JBOzs7O29CQU0xQkEsUUFBOEJBLG1CQUV0QkEsMENBQ0FBLHNEQUVKQTs7O29CQVFKQSxRQUE4QkEsbUJBRXRCQSwyQ0FDQUEsdURBRUpBOzs7b0JBUUpBLFFBQThCQSxtQkFFdEJBLHNDQUNBQSxrREFFSkE7OztvQkFRSkEsUUFBOEJBLG1CQUV0QkEsOENBQ0FBLDBEQUVKQSxRQUVXQSxBQUEwQkEsVUFBQ0EsSUFBSUE7bUNBQ2xDQTtvQ0FFTUEsVUFBQ0EsSUFBSUEsUUFBUUEsUUFBUUE7bUNBQzNCQTs7OztvQkFNWkEsUUFBOEJBLG1CQUV0QkEsNkNBQ0FBLHlEQUVKQSxTQUVZQSxVQUFDQSxJQUFJQSxXQUFXQSxRQUFRQTttQ0FBWUE7Ozs7b0JBTXBEQTtvQkFDQUEsZUFBZUE7O29CQUVmQSxRQUE4QkEsbUJBRTFCQTs7b0JBR0pBLG1CQUFtQkE7d0JBRWZBLGFBQWFBLEFBQXFCQTt3QkFDbENBLElBQUlBLGtDQUFhQTs0QkFFYkEsT0FBT0E7Ozt3QkFHWEEsK0NBQW9CQTs7d0JBRXBCQSxXQUF1QkEsQUFBbUNBOzRCQUV0REEsbUJBQW1CQSwyQ0FBeUJBOzs7d0JBR2hEQSxPQUFPQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIERyYWd1bGFPcHRpb25zID0gUmV0eXBlZC5kcmFndWxhLmRyYWd1bGEyLkRyYWd1bGFPcHRpb25zO1xyXG5cclxubmFtZXNwYWNlIERyYWd1bGFEZW1vXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBEcmFndWxhIGxpYnJhcnkgaXMgYWNjZXNzZWQgdmlhIEdsb2JhbCB2YXJpYWJsZXMsXHJcbiAgICAgICAgICAgIC8vIHNlZSBcImxvYWRlclwiIHNldHRpbmcgaW4gYnJpZGdlLmpzb24gZmlsZS5cclxuXHJcbiAgICAgICAgICAgIENvbmZpZ3VyZUV4YW1wbGUxKCk7XHJcbiAgICAgICAgICAgIENvbmZpZ3VyZUV4YW1wbGUyKCk7XHJcbiAgICAgICAgICAgIENvbmZpZ3VyZUV4YW1wbGUzKCk7XHJcbiAgICAgICAgICAgIENvbmZpZ3VyZUV4YW1wbGU0KCk7XHJcbiAgICAgICAgICAgIENvbmZpZ3VyZUV4YW1wbGU1KCk7XHJcbiAgICAgICAgICAgIENvbmZpZ3VyZUV4YW1wbGU2KCk7XHJcbiAgICAgICAgICAgIENvbmZpZ3VyZUV4YW1wbGU3KCk7XHJcbiAgICAgICAgICAgIENvbmZpZ3VyZUV4YW1wbGU4KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIENvbmZpZ3VyZUV4YW1wbGUxKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJldHlwZWQuZHJhZ3VsYS5kcmFndWxhMy5TZWxmKG5ldyBSZXR5cGVkLmRvbS5FbGVtZW50W11cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUmV0eXBlZC5kb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsZWZ0LWRlZmF1bHRzXCIpLFxyXG4gICAgICAgICAgICAgICAgUmV0eXBlZC5kb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyaWdodC1kZWZhdWx0c1wiKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgQ29uZmlndXJlRXhhbXBsZTIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGRyYWtlID0gUmV0eXBlZC5kcmFndWxhLmRyYWd1bGEzLlNlbGYobmV3IFJldHlwZWQuZG9tLkVsZW1lbnRbXVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSZXR5cGVkLmRvbS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxlZnQtZXZlbnRzXCIpLFxyXG4gICAgICAgICAgICAgICAgUmV0eXBlZC5kb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyaWdodC1ldmVudHNcIiksXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZHJha2Uub24oXCJkcmFnXCIsIG5ldyBBY3Rpb248UmV0eXBlZC5kb20uRWxlbWVudD4oZWwgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLlJlcGxhY2UoXCJleC1tb3ZlZFwiLCBcIlwiKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgZHJha2Uub24oXCJkcm9wXCIsIG5ldyBBY3Rpb248UmV0eXBlZC5kb20uRWxlbWVudD4oZWwgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZWwuY2xhc3NOYW1lICs9IFwiIGV4LW1vdmVkXCI7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIGRyYWtlLm9uKFwib3ZlclwiLCBuZXcgQWN0aW9uPFJldHlwZWQuZG9tLkVsZW1lbnQsIFJldHlwZWQuZG9tLkVsZW1lbnQ+KChlbCwgY29udGFpbmVyKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lICs9IFwiIGV4LW92ZXJcIjtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgZHJha2Uub24oXCJvdXRcIiwgbmV3IEFjdGlvbjxSZXR5cGVkLmRvbS5FbGVtZW50LCBSZXR5cGVkLmRvbS5FbGVtZW50PigoZWwsIGNvbnRhaW5lcikgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IGNvbnRhaW5lci5jbGFzc05hbWUuUmVwbGFjZShcImV4LW92ZXJcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgQ29uZmlndXJlRXhhbXBsZTMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmV0eXBlZC5kcmFndWxhLmRyYWd1bGEzLlNlbGYobmV3IFJldHlwZWQuZG9tLkVsZW1lbnRbXVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFJldHlwZWQuZG9tLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGVmdC1ybS1zcGlsbFwiKSxcclxuICAgICAgICAgICAgICAgICAgICBSZXR5cGVkLmRvbS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJpZ2h0LXJtLXNwaWxsXCIpLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG5ldyBEcmFndWxhT3B0aW9uc1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZU9uU3BpbGwgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgQ29uZmlndXJlRXhhbXBsZTQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmV0eXBlZC5kcmFndWxhLmRyYWd1bGEzLlNlbGYobmV3IFJldHlwZWQuZG9tLkVsZW1lbnRbXVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFJldHlwZWQuZG9tLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGVmdC1yb2xsYmFja3NcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgUmV0eXBlZC5kb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyaWdodC1yb2xsYmFja3NcIiksXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbmV3IERyYWd1bGFPcHRpb25zXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV2ZXJ0T25TcGlsbCA9IHRydWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBDb25maWd1cmVFeGFtcGxlNSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSZXR5cGVkLmRyYWd1bGEuZHJhZ3VsYTMuU2VsZihuZXcgUmV0eXBlZC5kb20uRWxlbWVudFtdXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmV0eXBlZC5kb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsZWZ0LWNvcHlcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgUmV0eXBlZC5kb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyaWdodC1jb3B5XCIpLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG5ldyBEcmFndWxhT3B0aW9uc1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvcHkgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgQ29uZmlndXJlRXhhbXBsZTYoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmV0eXBlZC5kcmFndWxhLmRyYWd1bGEzLlNlbGYobmV3IFJldHlwZWQuZG9tLkVsZW1lbnRbXVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFJldHlwZWQuZG9tLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGVmdC1jb3B5LTF0b21hbnlcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgUmV0eXBlZC5kb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyaWdodC1jb3B5LTF0b21hbnlcIiksXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbmV3IERyYWd1bGFPcHRpb25zXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29weSA9IG5ldyBEcmFndWxhT3B0aW9ucy5jb3B5Rm4oKGVsLCBzb3VyY2UpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZS5pZCA9PSBcImxlZnQtY29weS0xdG9tYW55XCIpLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhY2NlcHRzID0gKGVsLCB0YXJnZXQsIHNvdXJjZSwgc2libGluZykgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmlkICE9IFwibGVmdC1jb3B5LTF0b21hbnlcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIENvbmZpZ3VyZUV4YW1wbGU3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJldHlwZWQuZHJhZ3VsYS5kcmFndWxhMy5TZWxmKG5ldyBSZXR5cGVkLmRvbS5FbGVtZW50W11cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBSZXR5cGVkLmRvbS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxlZnQtbG92ZWhhbmRsZXNcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgUmV0eXBlZC5kb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyaWdodC1sb3ZlaGFuZGxlc1wiKSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBuZXcgRHJhZ3VsYU9wdGlvbnNcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlcyA9IChlbCwgY29udGFpbmVyLCBoYW5kbGUsIHNpYmxpbmcpID0+IGhhbmRsZS5jbGFzc05hbWUuQ29udGFpbnMoXCJoYW5kbGVcIilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBDb25maWd1cmVFeGFtcGxlOCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBzdHJpbmcgY2xpY2tJbmRpY2F0b3IgPSBcIiBbY2xpY2shXVwiO1xyXG4gICAgICAgICAgICB2YXIgc29ydGFibGUgPSBSZXR5cGVkLmRvbS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNvcnRhYmxlXCIpO1xyXG5cclxuICAgICAgICAgICAgUmV0eXBlZC5kcmFndWxhLmRyYWd1bGEzLlNlbGYobmV3IFJldHlwZWQuZG9tLkVsZW1lbnRbXVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzb3J0YWJsZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNvcnRhYmxlLm9uY2xpY2sgPSBlID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSAoUmV0eXBlZC5kb20uRWxlbWVudCllLnRhcmdldDtcclxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQuaWQgPT0gc29ydGFibGUuaWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LmlubmVySFRNTCArPSBjbGlja0luZGljYXRvcjtcclxuXHJcbiAgICAgICAgICAgICAgICBSZXR5cGVkLmRvbS5zZXRUaW1lb3V0KChnbG9iYWw6OlJldHlwZWQuZG9tLnNldFRpbWVvdXRGbikodGltZW91dEV2ID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmlubmVySFRNTCA9IHRhcmdldC5pbm5lckhUTUwuUmVwbGFjZShjbGlja0luZGljYXRvciwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICB9KSwgNTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXQp9Cg==
