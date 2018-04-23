/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.0.0
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
    
                        return null;
                    };
    
                    addButton.onclick = Bridge.fn.bind(this, function (e) {
                        this.AddTodoItem(input.value);
                        input.value = "";
                        input.onkeyup(null);
                        return null;
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
                        return null;
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJNb2JYLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJUb2RvU3RvcmUuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQWtCWUEsYUFBYUE7OztnQkFHYkEsa0JBQVNBLElBQUlBLGVBQVVBOzs7Z0JBR3ZCQTtnQkFDQUE7Z0JBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3QkNaZ0NBLE9BQU9BOzs7Ozt3QkFJakJBLE9BQU9BOzs7Ozs7a0NBUjhDQSxnQkFBMERBOztnQ0FVeEhBOzs7b0JBR2JBLFlBQU9BOzs7b0JBR1BBLG9CQUFlQSxBQUF3RUE7OztvQkFHdkZBLDRCQUF1QkEsY0FBZ0NBLEFBQTZDQTttQ0FDaEdBLG1CQUFjQSxBQUE2REEsVUFBQ0EsR0FBR0EsR0FBR0E7dUNBQVFBLGNBQWNBLDREQUFnQkE7Ozs7O29CQUc1SEEsZUFBVUEsY0FBbUNBLEFBQWdEQTttQ0FBTUEsMENBQWtDQSxvREFBb0JBOzs7O29CQUd6SkEsYUFBcUJBLEFBQWdDQTs7Ozt1Q0FHakNBO29CQUVwQkEsV0FBV0EsUUFFQUE7O29CQUlYQSxpQkFBWUE7O3lDQUtXQTs7b0JBRXZCQSxpQkFBaUJBLEFBQWtEQTs7O29CQUduRUEsSUFBSUEsb0JBQW1CQTs7Ozs7Ozs7d0JBU25CQSwwQkFBc0JBOzs7O2dDQUVsQkEsZ0JBQVdBOzs7Ozs7OzswQ0FLT0E7O29CQUcxQkEsZ0NBQTJCQSxpQkFBaUJBLHNCQUFDQSxxQkFBZ0JBOzs7b0JBRzdEQSx5QkFBeUJBO29CQUN6QkEsT0FBT0E7O2tDQU9TQTs7O29CQUdoQkEsZ0JBQWdCQTtvQkFDaEJBLGdCQUFXQTs7b0JBRVhBLGlCQUFxREE7b0JBQ3JEQSxpQkFBcURBOzs7b0JBR3JEQSxZQUFZQTtvQkFDWkEsZ0JBQWdCQTs7b0JBUWhCQSxnQkFBZ0JBO3dCQUVaQSxJQUFJQSxvQkFBQ0EsS0FBR0EsT0FBS0EsWUFBVUEsQUFBU0E7NEJBRTVCQTs7NEJBSUFBLHFCQUFxQkEsNEJBQXFCQTs7O3dCQUc5Q0EsT0FBT0E7OztvQkFHWEEsb0JBQW9CQTt3QkFFaEJBLGlCQUFZQTt3QkFDWkEsY0FBY0E7d0JBQ2RBLGNBQWNBO3dCQUNkQSxPQUFPQTs7O29CQUdYQSxzQkFBaUJBOztvQkFFakJBLHNCQUE0REE7b0JBQzVEQSxzQkFBNkRBO29CQUM3REEsc0JBQXlEQTtvQkFDekRBLHNCQUE0REE7b0JBQzVEQSxzQkFBeURBO29CQUN6REEsc0JBQXlEQTs7c0NBR3JDQTs7b0JBRXBCQSxjQUFjQTs7O29CQUdkQSxlQUFlQTs7b0JBTWZBLG1DQUFtQ0EsQUFBbURBOzt3QkFHbEZBLGlCQUFpQkE7OztvQkFHckJBLGFBQWFBLDJFQUdDQTs7d0JBR05BLDBCQUF5REE7d0JBQ3pEQSxtQkFBY0E7d0JBQ2RBLE9BQU9BOzs7b0JBSWZBLG9CQUEyREE7b0JBQzNEQSxvQkFBMERBO29CQUMxREEsb0JBQTBEQSxzREFBOENBO29CQUN4R0Esb0JBQXVEQTs7b0JBRXZEQSwwQkFBeURBIiwKICAic291cmNlc0NvbnRlbnQiOiBbIlxyXG5uYW1lc3BhY2UgTW9iWFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVG9kb1N0b3JlIF9zdG9yZTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gVGhlIGRlbW8gcHJvamVjdCBjb250YWlucyBzb21lIHNhbXBsZXMgZnJvbTpcclxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9tb2J4LmpzLm9yZy9nZXR0aW5nLXN0YXJ0ZWQuaHRtbFxyXG5cclxuICAgICAgICAgICAgLy8gRm9yIHRoZSBzYWtlIG9mIHNpbXBsaWNpdHksIFwibW9ieC5qc1wiIGlzIGJlaW5nIGxvYWRlZCB1c2luZyBcInJlcXVpcmUuanNcIi5cclxuICAgICAgICAgICAgLy8gVG8gbWFrZSB0aGF0IGhhcHBlbiwgXCJtb2J4LmpzXCIgd2FzIGNvbnZlcnRlZCBmcm9tIENvbW1vbkpTIHRvIEFNRCBmb3JtYXQ6XHJcbiAgICAgICAgICAgIC8vIGh0dHA6Ly9yZXF1aXJlanMub3JnL2RvY3MvY29tbW9uanMuaHRtbCNtYW51YWxjb252ZXJzaW9uXHJcblxyXG4gICAgICAgICAgICAvLyBUaGF0IGNvbnZlcnNpb24gaXMgbm90IHJlcXVpcmVkIHdoZW4gd29ya2luZyBpbiBOb2RlSlMgZW52aXJvbm1lbnQuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgcm9vdEVsID0gUmV0eXBlZC5kb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgc3RvcmU6XHJcbiAgICAgICAgICAgIF9zdG9yZSA9IG5ldyBUb2RvU3RvcmUocm9vdEVsKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCBhIGZldyBpbml0aWFsIFRvIERvIGl0ZW1zOlxyXG4gICAgICAgICAgICBfc3RvcmUuQWRkVG9kb0l0ZW0oXCJDcmVhdGUgYSBUYXNrXCIpO1xyXG4gICAgICAgICAgICBfc3RvcmUuQWRkVG9kb0l0ZW0oXCJNYXJrIGEgVGFzayBhcyBjb21wbGV0ZWRcIik7XHJcbiAgICAgICAgICAgIF9zdG9yZS5BZGRUb2RvSXRlbShcIkRlbGV0ZSBhIFRhc2tcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgQnJpZGdlO1xyXG5cclxubmFtZXNwYWNlIE1vYlhcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRvZG9TdG9yZVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQgX3RvZG9EaXY7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLmRvbS5IVE1MTGFiZWxFbGVtZW50IF9wcm9ncmVzc0xhYmVsO1xyXG5cclxuICAgICAgICAvLyBPYnNlcnZhYmxlIGFycmF5IG9mIFRvIERvIGl0ZW1zOlxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUmV0eXBlZC5tb2J4LklPYnNlcnZhYmxlQXJyYXkgPGdsb2JhbDo6TW9iWC5Ub2RvSXRlbT5fdG9kb3MgPSBSZXR5cGVkLm1vYngub2JzZXJ2YWJsZS5UeXBlMS5TZWxmPGdsb2JhbDo6TW9iWC5Ub2RvSXRlbT4obmV3IFRvZG9JdGVtWzBdKTtcclxuXHJcbiAgICAgICAgLy8gQ29tcHV0ZWQgcHJvcGVydHkgKG51bWJlciBvZiBjb21wbGV0ZWQgVG8gRG8gaXRlbXMpOlxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUmV0eXBlZC5tb2J4LklDb21wdXRlZFZhbHVlIDxpbnQ+X2NvbXBsZXRlZFRvZG9zQ291bnQ7XHJcbiAgICAgICAgcHVibGljIGludCBDb21wbGV0ZWRUb2Rvc0NvdW50IHtnZXR7cmV0dXJuIF9jb21wbGV0ZWRUb2Rvc0NvdW50LmdldCgpO319XHJcblxyXG4gICAgICAgIC8vIENvbXB1dGVkIHByb3BlcnR5IChwcm9ncmVzcyByZXBvcnQpOlxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUmV0eXBlZC5tb2J4LklDb21wdXRlZFZhbHVlIDxzdHJpbmc+X3JlcG9ydDtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFJlcG9ydCB7Z2V0e3JldHVybiBfcmVwb3J0LmdldCgpO319XHJcblxyXG4gICAgICAgIHB1YmxpYyBUb2RvU3RvcmUoUmV0eXBlZC5kb20uSFRNTEVsZW1lbnQgcm9vdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFJlbmRlciBVSSBlbGVtZW50czpcclxuICAgICAgICAgICAgUmVuZGVyKHJvb3QpO1xyXG5cclxuICAgICAgICAgICAgLy8gU3Vic2NyaWJlIHRvIFRvZG9zIGNoYW5nZXM6XHJcbiAgICAgICAgICAgIF90b2Rvcy5vYnNlcnZlKChnbG9iYWw6OlJldHlwZWQubW9ieC5JT2JzZXJ2YWJsZUFycmF5PGdsb2JhbDo6TW9iWC5Ub2RvSXRlbT4ub2JzZXJ2ZUZuKVRvZG9PYnNlcnZlRm4pO1xyXG5cclxuICAgICAgICAgICAgLy8gQ29uZmlndXJlIGNvbXB1dGVkIGZpZWxkIChfY29tcGxldGVkVG9kb3NDb3VudCk6XHJcbiAgICAgICAgICAgIF9jb21wbGV0ZWRUb2Rvc0NvdW50ID0gUmV0eXBlZC5tb2J4LmNvbXB1dGVkLlNlbGY8aW50PigoZ2xvYmFsOjpSZXR5cGVkLm1vYnguSUNvbXB1dGVkLlNlbGZGbjxpbnQ+KSgoKSA9PlxyXG4gICAgICAgICAgICAgICAgX3RvZG9zLmZpbHRlcigoZ2xvYmFsOjpSZXR5cGVkLmVzNS5BcnJheTxnbG9iYWw6Ok1vYlguVG9kb0l0ZW0+LmZpbHRlckZuMikoKHYsIGksIGFycikgPT4gdi5Db21wbGV0ZWQgPyAob2JqZWN0KSB0cnVlIDogbnVsbCkpLkxlbmd0aCkpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ29uZmlndXJlIGNvbXB1dGVkIGZpZWxkIChfcmVwb3J0KTpcclxuICAgICAgICAgICAgX3JlcG9ydCA9IFJldHlwZWQubW9ieC5jb21wdXRlZC5TZWxmPHN0cmluZz4oKGdsb2JhbDo6UmV0eXBlZC5tb2J4LklDb21wdXRlZC5TZWxmRm48c3RyaW5nPikoKCkgPT4gc3RyaW5nLkZvcm1hdChcIlByb2dyZXNzOiB7MH0vezF9XCIsQ29tcGxldGVkVG9kb3NDb3VudCxfdG9kb3MubGVuZ3RoKSkpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ29uZmlndXJlIHJlYWN0aW9uIG9uIHN0YXRlIGNoYW5nZXM6XHJcbiAgICAgICAgICAgIFJldHlwZWQubW9ieC5hdXRvcnVuKChnbG9iYWw6OlJldHlwZWQubW9ieC5hdXRvcnVuRm4pU3RhZ2VDaGFuZ2VkRm4pO1xyXG4gICAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkVG9kb0l0ZW0oc3RyaW5nIHRhc2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IG5ldyBUb2RvSXRlbVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUYXNrID0gdGFzayxcclxuICAgICAgICAgICAgICAgIENvbXBsZXRlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBfdG9kb3MucHVzaChpdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNyZWdpb24gSGFuZGxlcnNcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFRvZG9PYnNlcnZlRm4oVW5pb248UmV0eXBlZC5tb2J4LklBcnJheUNoYW5nZTxnbG9iYWw6Ok1vYlguVG9kb0l0ZW0+LCBSZXR5cGVkLm1vYnguSUFycmF5U3BsaWNlPGdsb2JhbDo6TW9iWC5Ub2RvSXRlbT4+IHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc3BsaWNlSW5mbyA9IChSZXR5cGVkLm1vYnguSUFycmF5U3BsaWNlPGdsb2JhbDo6TW9iWC5Ub2RvSXRlbT4peDtcclxuXHJcbiAgICAgICAgICAgIC8vIEVuc3VyZSBpdCdzIGEgc3BsaWNlLCBub3QgYSBjaGFuZ2UgZXZlbnQ6XHJcbiAgICAgICAgICAgIGlmIChzcGxpY2VJbmZvLnR5cGUgPT0gUmV0eXBlZC5tb2J4LkxpdGVyYWxzLnNwbGljZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9mb3JlYWNoICh2YXIgcmVtb3ZlZCBpbiBzcGxpY2VJbmZvLnJlbW92ZWQpXHJcbiAgICAgICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vIG5vdGhpbmcgdG8gZG8uXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyAnZGVsZXRlJyBidXR0b24gaGFuZGxlciB0YWtlcyBjYXJlIG9mIHRoaXMuXHJcbiAgICAgICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZW5kZXIgY29udHJvbHMgZm9yIHRoZSBuZXcgcmVjb3JkczpcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhZGRlZCBpbiBzcGxpY2VJbmZvLmFkZGVkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFJlbmRlckl0ZW0oYWRkZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9iamVjdCBTdGFnZUNoYW5nZWRGbihSZXR5cGVkLm1vYnguSVJlYWN0aW9uUHVibGljIHIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgUHJvZ3Jlc3NMYWJlbCB0ZXh0OlxyXG4gICAgICAgICAgICBfcHJvZ3Jlc3NMYWJlbC5pbm5lckhUTUwgPSBcIlRhc2tzIGxlZnQ6IFwiICsgKF90b2Rvcy5sZW5ndGggLSBDb21wbGV0ZWRUb2Rvc0NvdW50KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFByaW50IFJlcG9ydCB0byBDb25zb2xlOlxyXG4gICAgICAgICAgICBTeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoUmVwb3J0KTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gUmVuZGVyaW5nXHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSZW5kZXIoUmV0eXBlZC5kb20uSFRNTEVsZW1lbnQgcm9vdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBIVE1MIGVsZW1lbnRzOlxyXG4gICAgICAgICAgICB2YXIgaGVhZGVyRGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIF90b2RvRGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50KCk7XHJcblxyXG4gICAgICAgICAgICByb290LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KGhlYWRlckRpdik7XHJcbiAgICAgICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oX3RvZG9EaXYpO1xyXG5cclxuICAgICAgICAgICAgLy8gSGVhZGVyICh0byBkbyBpdGVtIGNyZWF0aW9uKTpcclxuICAgICAgICAgICAgdmFyIGlucHV0ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnQoKTtcclxuICAgICAgICAgICAgdmFyIGFkZEJ1dHRvbiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MQnV0dG9uRWxlbWVudFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbm5lckhUTUwgPSBcIkFkZFwiLFxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gXCJidG4gYnRuLXByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgIHN0eWxlID0ge21hcmdpbiA9IFwiMTBweFwifSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkID0gdHJ1ZVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaW5wdXQub25rZXl1cCA9IGUgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKChlIT1udWxsP2Uua2V5Q29kZTooZG91YmxlPyludWxsKSA9PSAxMylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRCdXR0b24uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRCdXR0b24uZGlzYWJsZWQgPSBzdHJpbmcuSXNOdWxsT3JFbXB0eShpbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBhZGRCdXR0b24ub25jbGljayA9IGUgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQWRkVG9kb0l0ZW0oaW5wdXQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBzdHJpbmcuRW1wdHk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5vbmtleXVwKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBfcHJvZ3Jlc3NMYWJlbCA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MTGFiZWxFbGVtZW50KCk7XHJcblxyXG4gICAgICAgICAgICBoZWFkZXJEaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MSW5wdXRFbGVtZW50PihpbnB1dCk7XHJcbiAgICAgICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50PihhZGRCdXR0b24pO1xyXG4gICAgICAgICAgICBoZWFkZXJEaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MQlJFbGVtZW50PihuZXcgUmV0eXBlZC5kb20uSFRNTEJSRWxlbWVudCgpKTtcclxuICAgICAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTExhYmVsRWxlbWVudD4oX3Byb2dyZXNzTGFiZWwpO1xyXG4gICAgICAgICAgICBoZWFkZXJEaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MQlJFbGVtZW50PihuZXcgUmV0eXBlZC5kb20uSFRNTEJSRWxlbWVudCgpKTtcclxuICAgICAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJSRWxlbWVudD4obmV3IFJldHlwZWQuZG9tLkhUTUxCUkVsZW1lbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgUmVuZGVySXRlbShUb2RvSXRlbSBpdGVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW1EaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIENoZWNrQm94XHJcbiAgICAgICAgICAgIHZhciBjaGVja0JveCA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MSW5wdXRFbGVtZW50XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBcImNoZWNrYm94XCIsXHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IHsgbWFyZ2luID0gXCIxMHB4XCJ9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjaGVja0JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlJldHlwZWQuZG9tLkV2ZW50PikoZSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIGl0ZW0gYXMgQ29tcGxldGVkOlxyXG4gICAgICAgICAgICAgICAgaXRlbS5Db21wbGV0ZWQgPSBjaGVja0JveC5AY2hlY2tlZDtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGJ1dHRvbiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MQnV0dG9uRWxlbWVudFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbm5lckhUTUwgPSBcImRlbFwiLFxyXG4gICAgICAgICAgICAgICAgb25jbGljayA9IGUgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGl0ZW0gYW5kIHRoZSBjb250cm9sczpcclxuICAgICAgICAgICAgICAgICAgICBfdG9kb0Rpdi5yZW1vdmVDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihpdGVtRGl2KTtcclxuICAgICAgICAgICAgICAgICAgICBfdG9kb3MucmVtb3ZlKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaXRlbURpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50PihidXR0b24pO1xyXG4gICAgICAgICAgICBpdGVtRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTElucHV0RWxlbWVudD4oY2hlY2tCb3gpO1xyXG4gICAgICAgICAgICBpdGVtRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTExhYmVsRWxlbWVudD4obmV3IFJldHlwZWQuZG9tLkhUTUxMYWJlbEVsZW1lbnQge2lubmVySFRNTCA9IGl0ZW0uVGFza30pO1xyXG4gICAgICAgICAgICBpdGVtRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJSRWxlbWVudD4obmV3IFJldHlwZWQuZG9tLkhUTUxCUkVsZW1lbnQoKSk7XHJcblxyXG4gICAgICAgICAgICBfdG9kb0Rpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihpdGVtRGl2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxufSJdCn0K
