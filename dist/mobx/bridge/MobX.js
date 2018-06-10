/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.1.0
 */
Bridge.assembly("MobX", function ($asm, globals) {
    "use strict";

    require(["mobx"], function (mobx) {
        Bridge.define("MobX.App", {
            main: function Main () {
                // The demo project contains some samples from:
                // https://mobx.js.org/getting-started.html
    
                // For the sake of simplicity, "mobx.js" is being loaded using "require.js".
                // To make that happen, "mobx.js" was converted from CommonJS to AMD format:
                // http://requirejs.org/docs/commonjs.html#manualconversion
    
                // That conversion is not required when working in NodeJS environment.
    
                var rootEl = document.getElementById("root");
    
                // Create a store:
                MobX.App._store = new MobX.TodoStore(rootEl);
    
                // Add a few initial To Do items:
                MobX.App._store.AddTodoItem("Create a Task");
                MobX.App._store.AddTodoItem("Mark a Task as completed");
                MobX.App._store.AddTodoItem("Delete a Task");
            },
            statics: {
                fields: {
                    _store: null
                }
            }
        });
    
        Bridge.define("MobX.TodoStore", {
            fields: {
                _todoDiv: null,
                _progressLabel: null,
                _todos: null,
                _completedTodosCount: null,
                _report: null
            },
            props: {
                CompletedTodosCount: {
                    get: function () {
                        return this._completedTodosCount.get();
                    }
                },
                Report: {
                    get: function () {
                        return this._report.get();
                    }
                }
            },
            ctors: {
                init: function () {
                    this._todos = mobx.observable(System.Array.init(0, null, System.Object));
                },
                ctor: function (root) {
                    this.$initialize();
                    // Render UI elements:
                    this.Render(root);
    
                    // Subscribe to Todos changes:
                    this._todos.observe(Bridge.fn.cacheBind(this, this.TodoObserveFn));
    
                    // Configure computed field (_completedTodosCount):
                    this._completedTodosCount = mobx.computed(Bridge.fn.bind(this, function () {
                            return this._todos.filter(function (v, i, arr) {
                                return v.Completed ? Bridge.box(true, System.Boolean, System.Boolean.toString) : null;
                            }).length;
                        }));
    
                    // Configure computed field (_report):
                    this._report = mobx.computed(Bridge.fn.bind(this, function () {
                            return System.String.format("Progress: {0}/{1}", Bridge.box(this.CompletedTodosCount, System.Int32), Bridge.box(this._todos.length, System.Double, System.Double.format, System.Double.getHashCode));
                        }));
    
                    // Configure reaction on state changes:
                    mobx.autorun(Bridge.fn.cacheBind(this, this.StageChangedFn));
                }
            },
            methods: {
                AddTodoItem: function (task) {
                    var item = { Task: task, Completed: false };
    
                    this._todos.push(item);
                },
                TodoObserveFn: function (x) {
                    var $t;
                    var spliceInfo = x;
    
                    // Ensure it's a splice, not a change event:
                    if (spliceInfo.type === "splice") {
                        //foreach (var removed in spliceInfo.removed)
                        //{
                        //    // nothing to do.
                        //    // 'delete' button handler takes care of this.
                        //}
    
                        // Render controls for the new records:
                        $t = Bridge.getEnumerator(spliceInfo.added);
                        try {
                            while ($t.moveNext()) {
                                var added = $t.Current;
                                this.RenderItem(added);
                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$Dispose();
                            }
                        }}
                },
                StageChangedFn: function (r) {
                    // Update ProgressLabel text:
                    this._progressLabel.innerHTML = "Tasks left: " + System.Double.format((this._todos.length - this.CompletedTodosCount));
    
                    // Print Report to Console:
                    System.Console.WriteLine(this.Report);
                    return null;
                },
                Render: function (root) {
                    var $t;
                    // Create HTML elements:
                    var headerDiv = document.createElement("div");
                    this._todoDiv = document.createElement("div");
    
                    root.appendChild(headerDiv);
                    root.appendChild(this._todoDiv);
    
                    // Header (to do item creation):
                    var input = document.createElement("input");
                    var addButton = ($t = document.createElement("button"), $t.innerHTML = "Add", $t.className = "btn btn-primary", $t.style.margin = "10px", $t.disabled = true, $t);
    
                    input.onkeyup = function (e) {
                        if (System.Nullable.eq((e != null ? e.keyCode : null), 13)) {
                            addButton.click();
                        } else {
                            addButton.disabled = System.String.isNullOrEmpty(input.value);
                        }
                    };
    
                    addButton.onclick = Bridge.fn.bind(this, function (e) {
                        this.AddTodoItem(input.value);
                        input.value = "";
                        input.onkeyup(null);
                    });
    
                    this._progressLabel = document.createElement("label");
    
                    headerDiv.appendChild(input);
                    headerDiv.appendChild(addButton);
                    headerDiv.appendChild(document.createElement("br"));
                    headerDiv.appendChild(this._progressLabel);
                    headerDiv.appendChild(document.createElement("br"));
                    headerDiv.appendChild(document.createElement("br"));
                },
                RenderItem: function (item) {
                    var $t;
                    var itemDiv = document.createElement("div");
    
                    // Create a CheckBox
                    var checkBox = ($t = document.createElement("input"), $t.type = "checkbox", $t.style.margin = "10px", $t);
    
                    checkBox.addEventListener("click", function (e) {
                        // Set the item as Completed:
                        item.Completed = checkBox.checked;
                    });
    
                    var button = ($t = document.createElement("button"), $t.innerHTML = "del", $t.onclick = Bridge.fn.bind(this, function (e) {
                        // Remove the item and the controls:
                        this._todoDiv.removeChild(itemDiv);
                        this._todos.remove(item);
                    }), $t);
    
                    itemDiv.appendChild(button);
                    itemDiv.appendChild(checkBox);
                    itemDiv.appendChild(($t = document.createElement("label"), $t.innerHTML = item.Task, $t));
                    itemDiv.appendChild(document.createElement("br"));
    
                    this._todoDiv.appendChild(itemDiv);
                }
            }
        });
        Bridge.init();
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJNb2JYLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJUb2RvU3RvcmUuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQWtCWUEsYUFBYUE7OztnQkFHYkEsa0JBQVNBLElBQUlBLGVBQVVBOzs7Z0JBR3ZCQTtnQkFDQUE7Z0JBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3QkNSSkEsT0FBT0E7Ozs7O3dCQVNQQSxPQUFPQTs7Ozs7O2tDQWpCd0VBLGdCQUEwREE7O2dDQW9CeEhBOzs7b0JBR2JBLFlBQU9BOzs7b0JBR1BBLG9CQUFlQSxBQUF3RUE7OztvQkFHdkZBLDRCQUF1QkEsY0FBZ0NBLEFBQTZDQTttQ0FDaEdBLG1CQUFjQSxBQUE2REEsVUFBQ0EsR0FBR0EsR0FBR0E7dUNBQVFBLGNBQWNBLDREQUFnQkE7Ozs7O29CQUc1SEEsZUFBVUEsY0FBbUNBLEFBQWdEQTttQ0FBTUEsMENBQWtDQSxvREFBb0JBOzs7O29CQUd6SkEsYUFBcUJBLEFBQWdDQTs7Ozt1Q0FHakNBO29CQUVwQkEsV0FBV0EsUUFFQUE7O29CQUlYQSxpQkFBWUE7O3lDQUtXQTs7b0JBRXZCQSxpQkFBaUJBLEFBQWtEQTs7O29CQUduRUEsSUFBSUEsb0JBQW1CQTs7Ozs7Ozs7d0JBU25CQSwwQkFBc0JBOzs7O2dDQUVsQkEsZ0JBQVdBOzs7Ozs7OzswQ0FLT0E7O29CQUcxQkEsZ0NBQTJCQSxpQkFBaUJBLHNCQUFDQSxxQkFBZ0JBOzs7b0JBRzdEQSx5QkFBeUJBO29CQUN6QkEsT0FBT0E7O2tDQU9TQTs7O29CQUdoQkEsZ0JBQWdCQTtvQkFDaEJBLGdCQUFXQTs7b0JBRVhBLGlCQUFxREE7b0JBQ3JEQSxpQkFBcURBOzs7b0JBR3JEQSxZQUFZQTtvQkFDWkEsZ0JBQWdCQTs7b0JBUWhCQSxnQkFBZ0JBO3dCQUVaQSxJQUFJQSxvQkFBQ0EsS0FBR0EsT0FBS0EsWUFBVUEsQUFBT0E7NEJBRTFCQTs7NEJBSUFBLHFCQUFxQkEsNEJBQXFCQTs7OztvQkFJbERBLG9CQUFvQkE7d0JBRWhCQSxpQkFBWUE7d0JBQ1pBLGNBQWNBO3dCQUNkQSxjQUFjQTs7O29CQUdsQkEsc0JBQWlCQTs7b0JBRWpCQSxzQkFBNERBO29CQUM1REEsc0JBQTZEQTtvQkFDN0RBLHNCQUF5REE7b0JBQ3pEQSxzQkFBNERBO29CQUM1REEsc0JBQXlEQTtvQkFDekRBLHNCQUF5REE7O3NDQUdyQ0E7O29CQUVwQkEsY0FBY0E7OztvQkFHZEEsZUFBZUE7O29CQU1mQSxtQ0FBMkNBLEFBQWtFQTs7d0JBR3pHQSxpQkFBaUJBOzs7b0JBR3JCQSxhQUFhQSwyRUFHQ0E7O3dCQUdOQSwwQkFBeURBO3dCQUN6REEsbUJBQWNBOzs7b0JBSXRCQSxvQkFBMkRBO29CQUMzREEsb0JBQTBEQTtvQkFDMURBLG9CQUEwREEsc0RBQThDQTtvQkFDeEdBLG9CQUF1REE7O29CQUV2REEsMEJBQXlEQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJcclxubmFtZXNwYWNlIE1vYlhcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFRvZG9TdG9yZSBfc3RvcmU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFRoZSBkZW1vIHByb2plY3QgY29udGFpbnMgc29tZSBzYW1wbGVzIGZyb206XHJcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vbW9ieC5qcy5vcmcvZ2V0dGluZy1zdGFydGVkLmh0bWxcclxuXHJcbiAgICAgICAgICAgIC8vIEZvciB0aGUgc2FrZSBvZiBzaW1wbGljaXR5LCBcIm1vYnguanNcIiBpcyBiZWluZyBsb2FkZWQgdXNpbmcgXCJyZXF1aXJlLmpzXCIuXHJcbiAgICAgICAgICAgIC8vIFRvIG1ha2UgdGhhdCBoYXBwZW4sIFwibW9ieC5qc1wiIHdhcyBjb252ZXJ0ZWQgZnJvbSBDb21tb25KUyB0byBBTUQgZm9ybWF0OlxyXG4gICAgICAgICAgICAvLyBodHRwOi8vcmVxdWlyZWpzLm9yZy9kb2NzL2NvbW1vbmpzLmh0bWwjbWFudWFsY29udmVyc2lvblxyXG5cclxuICAgICAgICAgICAgLy8gVGhhdCBjb252ZXJzaW9uIGlzIG5vdCByZXF1aXJlZCB3aGVuIHdvcmtpbmcgaW4gTm9kZUpTIGVudmlyb25tZW50LlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHJvb3RFbCA9IFJldHlwZWQuZG9tLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIHN0b3JlOlxyXG4gICAgICAgICAgICBfc3RvcmUgPSBuZXcgVG9kb1N0b3JlKHJvb3RFbCk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgYSBmZXcgaW5pdGlhbCBUbyBEbyBpdGVtczpcclxuICAgICAgICAgICAgX3N0b3JlLkFkZFRvZG9JdGVtKFwiQ3JlYXRlIGEgVGFza1wiKTtcclxuICAgICAgICAgICAgX3N0b3JlLkFkZFRvZG9JdGVtKFwiTWFyayBhIFRhc2sgYXMgY29tcGxldGVkXCIpO1xyXG4gICAgICAgICAgICBfc3RvcmUuQWRkVG9kb0l0ZW0oXCJEZWxldGUgYSBUYXNrXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIEJyaWRnZTtcclxuXHJcbm5hbWVzcGFjZSBNb2JYXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUb2RvU3RvcmVcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50IF90b2RvRGl2O1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5kb20uSFRNTExhYmVsRWxlbWVudCBfcHJvZ3Jlc3NMYWJlbDtcclxuXHJcbiAgICAgICAgLy8gT2JzZXJ2YWJsZSBhcnJheSBvZiBUbyBEbyBpdGVtczpcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFJldHlwZWQubW9ieC5JT2JzZXJ2YWJsZUFycmF5IDxnbG9iYWw6Ok1vYlguVG9kb0l0ZW0+X3RvZG9zID0gUmV0eXBlZC5tb2J4Lm9ic2VydmFibGUuVHlwZTEuU2VsZjxnbG9iYWw6Ok1vYlguVG9kb0l0ZW0+KG5ldyBUb2RvSXRlbVswXSk7XHJcblxyXG4gICAgICAgIC8vIENvbXB1dGVkIHByb3BlcnR5IChudW1iZXIgb2YgY29tcGxldGVkIFRvIERvIGl0ZW1zKTpcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFJldHlwZWQubW9ieC5JQ29tcHV0ZWRWYWx1ZSA8aW50Pl9jb21wbGV0ZWRUb2Rvc0NvdW50O1xyXG5wdWJsaWMgaW50IENvbXBsZXRlZFRvZG9zQ291bnRcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9jb21wbGV0ZWRUb2Rvc0NvdW50LmdldCgpO1xyXG4gICAgfVxyXG59XHJcbiAgICAgICAgLy8gQ29tcHV0ZWQgcHJvcGVydHkgKHByb2dyZXNzIHJlcG9ydCk6XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBSZXR5cGVkLm1vYnguSUNvbXB1dGVkVmFsdWUgPHN0cmluZz5fcmVwb3J0O1xyXG5wdWJsaWMgc3RyaW5nIFJlcG9ydFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX3JlcG9ydC5nZXQoKTtcclxuICAgIH1cclxufVxyXG4gICAgICAgIHB1YmxpYyBUb2RvU3RvcmUoUmV0eXBlZC5kb20uSFRNTEVsZW1lbnQgcm9vdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFJlbmRlciBVSSBlbGVtZW50czpcclxuICAgICAgICAgICAgUmVuZGVyKHJvb3QpO1xyXG5cclxuICAgICAgICAgICAgLy8gU3Vic2NyaWJlIHRvIFRvZG9zIGNoYW5nZXM6XHJcbiAgICAgICAgICAgIF90b2Rvcy5vYnNlcnZlKChnbG9iYWw6OlJldHlwZWQubW9ieC5JT2JzZXJ2YWJsZUFycmF5PGdsb2JhbDo6TW9iWC5Ub2RvSXRlbT4ub2JzZXJ2ZUZuKVRvZG9PYnNlcnZlRm4pO1xyXG5cclxuICAgICAgICAgICAgLy8gQ29uZmlndXJlIGNvbXB1dGVkIGZpZWxkIChfY29tcGxldGVkVG9kb3NDb3VudCk6XHJcbiAgICAgICAgICAgIF9jb21wbGV0ZWRUb2Rvc0NvdW50ID0gUmV0eXBlZC5tb2J4LmNvbXB1dGVkLlNlbGY8aW50PigoZ2xvYmFsOjpSZXR5cGVkLm1vYnguSUNvbXB1dGVkLlNlbGZGbjxpbnQ+KSgoKSA9PlxyXG4gICAgICAgICAgICAgICAgX3RvZG9zLmZpbHRlcigoZ2xvYmFsOjpSZXR5cGVkLmVzNS5BcnJheTxnbG9iYWw6Ok1vYlguVG9kb0l0ZW0+LmZpbHRlckZuMikoKHYsIGksIGFycikgPT4gdi5Db21wbGV0ZWQgPyAob2JqZWN0KSB0cnVlIDogbnVsbCkpLkxlbmd0aCkpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ29uZmlndXJlIGNvbXB1dGVkIGZpZWxkIChfcmVwb3J0KTpcclxuICAgICAgICAgICAgX3JlcG9ydCA9IFJldHlwZWQubW9ieC5jb21wdXRlZC5TZWxmPHN0cmluZz4oKGdsb2JhbDo6UmV0eXBlZC5tb2J4LklDb21wdXRlZC5TZWxmRm48c3RyaW5nPikoKCkgPT4gc3RyaW5nLkZvcm1hdChcIlByb2dyZXNzOiB7MH0vezF9XCIsQ29tcGxldGVkVG9kb3NDb3VudCxfdG9kb3MubGVuZ3RoKSkpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ29uZmlndXJlIHJlYWN0aW9uIG9uIHN0YXRlIGNoYW5nZXM6XHJcbiAgICAgICAgICAgIFJldHlwZWQubW9ieC5hdXRvcnVuKChnbG9iYWw6OlJldHlwZWQubW9ieC5hdXRvcnVuRm4pU3RhZ2VDaGFuZ2VkRm4pO1xyXG4gICAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkVG9kb0l0ZW0oc3RyaW5nIHRhc2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IG5ldyBUb2RvSXRlbVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUYXNrID0gdGFzayxcclxuICAgICAgICAgICAgICAgIENvbXBsZXRlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBfdG9kb3MucHVzaChpdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNyZWdpb24gSGFuZGxlcnNcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFRvZG9PYnNlcnZlRm4oVW5pb248UmV0eXBlZC5tb2J4LklBcnJheUNoYW5nZTxnbG9iYWw6Ok1vYlguVG9kb0l0ZW0+LCBSZXR5cGVkLm1vYnguSUFycmF5U3BsaWNlPGdsb2JhbDo6TW9iWC5Ub2RvSXRlbT4+IHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc3BsaWNlSW5mbyA9IChSZXR5cGVkLm1vYnguSUFycmF5U3BsaWNlPGdsb2JhbDo6TW9iWC5Ub2RvSXRlbT4peDtcclxuXHJcbiAgICAgICAgICAgIC8vIEVuc3VyZSBpdCdzIGEgc3BsaWNlLCBub3QgYSBjaGFuZ2UgZXZlbnQ6XHJcbiAgICAgICAgICAgIGlmIChzcGxpY2VJbmZvLnR5cGUgPT0gUmV0eXBlZC5tb2J4LkxpdGVyYWxzLnNwbGljZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9mb3JlYWNoICh2YXIgcmVtb3ZlZCBpbiBzcGxpY2VJbmZvLnJlbW92ZWQpXHJcbiAgICAgICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vIG5vdGhpbmcgdG8gZG8uXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyAnZGVsZXRlJyBidXR0b24gaGFuZGxlciB0YWtlcyBjYXJlIG9mIHRoaXMuXHJcbiAgICAgICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZW5kZXIgY29udHJvbHMgZm9yIHRoZSBuZXcgcmVjb3JkczpcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhZGRlZCBpbiBzcGxpY2VJbmZvLmFkZGVkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFJlbmRlckl0ZW0oYWRkZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9iamVjdCBTdGFnZUNoYW5nZWRGbihSZXR5cGVkLm1vYnguSVJlYWN0aW9uUHVibGljIHIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgUHJvZ3Jlc3NMYWJlbCB0ZXh0OlxyXG4gICAgICAgICAgICBfcHJvZ3Jlc3NMYWJlbC5pbm5lckhUTUwgPSBcIlRhc2tzIGxlZnQ6IFwiICsgKF90b2Rvcy5sZW5ndGggLSBDb21wbGV0ZWRUb2Rvc0NvdW50KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFByaW50IFJlcG9ydCB0byBDb25zb2xlOlxyXG4gICAgICAgICAgICBTeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoUmVwb3J0KTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gUmVuZGVyaW5nXHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSZW5kZXIoUmV0eXBlZC5kb20uSFRNTEVsZW1lbnQgcm9vdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBIVE1MIGVsZW1lbnRzOlxyXG4gICAgICAgICAgICB2YXIgaGVhZGVyRGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIF90b2RvRGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50KCk7XHJcblxyXG4gICAgICAgICAgICByb290LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KGhlYWRlckRpdik7XHJcbiAgICAgICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oX3RvZG9EaXYpO1xyXG5cclxuICAgICAgICAgICAgLy8gSGVhZGVyICh0byBkbyBpdGVtIGNyZWF0aW9uKTpcclxuICAgICAgICAgICAgdmFyIGlucHV0ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnQoKTtcclxuICAgICAgICAgICAgdmFyIGFkZEJ1dHRvbiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MQnV0dG9uRWxlbWVudFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbm5lckhUTUwgPSBcIkFkZFwiLFxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gXCJidG4gYnRuLXByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgIHN0eWxlID0ge21hcmdpbiA9IFwiMTBweFwifSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkID0gdHJ1ZVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaW5wdXQub25rZXl1cCA9IGUgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKChlIT1udWxsP2Uua2V5Q29kZToodWludD8pbnVsbCkgPT0gMTMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQnV0dG9uLmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQnV0dG9uLmRpc2FibGVkID0gc3RyaW5nLklzTnVsbE9yRW1wdHkoaW5wdXQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgYWRkQnV0dG9uLm9uY2xpY2sgPSBlID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEFkZFRvZG9JdGVtKGlucHV0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gc3RyaW5nLkVtcHR5O1xyXG4gICAgICAgICAgICAgICAgaW5wdXQub25rZXl1cChudWxsKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIF9wcm9ncmVzc0xhYmVsID0gbmV3IFJldHlwZWQuZG9tLkhUTUxMYWJlbEVsZW1lbnQoKTtcclxuXHJcbiAgICAgICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnQ+KGlucHV0KTtcclxuICAgICAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQ+KGFkZEJ1dHRvbik7XHJcbiAgICAgICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxCUkVsZW1lbnQ+KG5ldyBSZXR5cGVkLmRvbS5IVE1MQlJFbGVtZW50KCkpO1xyXG4gICAgICAgICAgICBoZWFkZXJEaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MTGFiZWxFbGVtZW50PihfcHJvZ3Jlc3NMYWJlbCk7XHJcbiAgICAgICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxCUkVsZW1lbnQ+KG5ldyBSZXR5cGVkLmRvbS5IVE1MQlJFbGVtZW50KCkpO1xyXG4gICAgICAgICAgICBoZWFkZXJEaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MQlJFbGVtZW50PihuZXcgUmV0eXBlZC5kb20uSFRNTEJSRWxlbWVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSZW5kZXJJdGVtKFRvZG9JdGVtIGl0ZW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaXRlbURpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgQ2hlY2tCb3hcclxuICAgICAgICAgICAgdmFyIGNoZWNrQm94ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IFwiY2hlY2tib3hcIixcclxuICAgICAgICAgICAgICAgIHN0eWxlID0geyBtYXJnaW4gPSBcIjEwcHhcIn1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNoZWNrQm94LmFkZEV2ZW50TGlzdGVuZXI8c3RyaW5nPihcImNsaWNrXCIsIChnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lckZuPHN0cmluZz4pKGUgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBpdGVtIGFzIENvbXBsZXRlZDpcclxuICAgICAgICAgICAgICAgIGl0ZW0uQ29tcGxldGVkID0gY2hlY2tCb3guQGNoZWNrZWQ7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBidXR0b24gPSBuZXcgUmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW5uZXJIVE1MID0gXCJkZWxcIixcclxuICAgICAgICAgICAgICAgIG9uY2xpY2sgPSBlID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBpdGVtIGFuZCB0aGUgY29udHJvbHM6XHJcbiAgICAgICAgICAgICAgICAgICAgX3RvZG9EaXYucmVtb3ZlQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oaXRlbURpdik7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RvZG9zLnJlbW92ZShpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGl0ZW1EaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MQnV0dG9uRWxlbWVudD4oYnV0dG9uKTtcclxuICAgICAgICAgICAgaXRlbURpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnQ+KGNoZWNrQm94KTtcclxuICAgICAgICAgICAgaXRlbURpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxMYWJlbEVsZW1lbnQ+KG5ldyBSZXR5cGVkLmRvbS5IVE1MTGFiZWxFbGVtZW50IHtpbm5lckhUTUwgPSBpdGVtLlRhc2t9KTtcclxuICAgICAgICAgICAgaXRlbURpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxCUkVsZW1lbnQ+KG5ldyBSZXR5cGVkLmRvbS5IVE1MQlJFbGVtZW50KCkpO1xyXG5cclxuICAgICAgICAgICAgX3RvZG9EaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oaXRlbURpdik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICB9XHJcbn0iXQp9Cg==
