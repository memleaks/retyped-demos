/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 16.7.1
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
                                $t.System$IDisposable$dispose();
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJNb2JYLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJUb2RvU3RvcmUuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQWtCWUEsYUFBYUE7OztnQkFHYkEsa0JBQVNBLElBQUlBLGVBQVVBOzs7Z0JBR3ZCQTtnQkFDQUE7Z0JBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3QkNaZ0NBLE9BQU9BOzs7Ozt3QkFJakJBLE9BQU9BOzs7Ozs7a0NBUjhDQSxnQkFBMERBOztnQ0FVeEhBOzs7b0JBR2JBLFlBQU9BOzs7b0JBR1BBLG9CQUFlQSxBQUF3RUE7OztvQkFHdkZBLDRCQUF1QkEsY0FBZ0NBLEFBQTZDQTttQ0FDaEdBLG1CQUFjQSxBQUE0REEsVUFBQ0EsR0FBR0EsR0FBR0E7dUNBQVFBLGNBQWNBLDREQUFnQkE7Ozs7O29CQUczSEEsZUFBVUEsY0FBbUNBLEFBQWdEQTttQ0FBTUEsMENBQWtDQSxvREFBb0JBOzs7O29CQUd6SkEsYUFBcUJBLEFBQWdDQTs7Ozt1Q0FHakNBO29CQUVwQkEsV0FBV0EsUUFFQUE7O29CQUlYQSxpQkFBWUE7O3lDQUtXQTs7b0JBRXZCQSxpQkFBaUJBLEFBQWtEQTs7O29CQUduRUEsSUFBSUEsb0JBQW1CQTs7Ozs7Ozs7d0JBU25CQSwwQkFBc0JBOzs7O2dDQUVsQkEsZ0JBQVdBOzs7Ozs7OzswQ0FLT0E7O29CQUcxQkEsZ0NBQTJCQSxpQkFBaUJBLHNCQUFDQSxxQkFBZ0JBOzs7b0JBRzdEQSx5QkFBeUJBO29CQUN6QkEsT0FBT0E7O2tDQU9TQTs7O29CQUdoQkEsZ0JBQWdCQTtvQkFDaEJBLGdCQUFXQTs7b0JBRVhBLGlCQUFxREE7b0JBQ3JEQSxpQkFBcURBOzs7b0JBR3JEQSxZQUFZQTtvQkFDWkEsZ0JBQWdCQTs7b0JBUWhCQSxnQkFBZ0JBO3dCQUVaQSxJQUFJQSxvQkFBQ0EsS0FBR0EsT0FBS0EsWUFBVUEsQUFBU0E7NEJBRTVCQTs7NEJBSUFBLHFCQUFxQkEsNEJBQXFCQTs7O3dCQUc5Q0EsT0FBT0E7OztvQkFHWEEsb0JBQW9CQTt3QkFFaEJBLGlCQUFZQTt3QkFDWkEsY0FBY0E7d0JBQ2RBLGNBQWNBO3dCQUNkQSxPQUFPQTs7O29CQUdYQSxzQkFBaUJBOztvQkFFakJBLHNCQUE0REE7b0JBQzVEQSxzQkFBNkRBO29CQUM3REEsc0JBQXlEQTtvQkFDekRBLHNCQUE0REE7b0JBQzVEQSxzQkFBeURBO29CQUN6REEsc0JBQXlEQTs7c0NBR3JDQTs7b0JBRXBCQSxjQUFjQTs7O29CQUdkQSxlQUFlQTs7b0JBTWZBLG1DQUFtQ0EsQUFBbURBOzt3QkFHbEZBLGlCQUFpQkE7OztvQkFHckJBLGFBQWFBLDJFQUdDQTs7d0JBR05BLDBCQUF5REE7d0JBQ3pEQSxtQkFBY0E7d0JBQ2RBLE9BQU9BOzs7b0JBSWZBLG9CQUEyREE7b0JBQzNEQSxvQkFBMERBO29CQUMxREEsb0JBQTBEQSxzREFBOENBO29CQUN4R0Esb0JBQXVEQTs7b0JBRXZEQSwwQkFBeURBIiwKICAic291cmNlc0NvbnRlbnQiOiBbIlxyXG5uYW1lc3BhY2UgTW9iWFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVG9kb1N0b3JlIF9zdG9yZTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gVGhlIGRlbW8gcHJvamVjdCBjb250YWlucyBzb21lIHNhbXBsZXMgZnJvbTpcclxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9tb2J4LmpzLm9yZy9nZXR0aW5nLXN0YXJ0ZWQuaHRtbFxyXG5cclxuICAgICAgICAgICAgLy8gRm9yIHRoZSBzYWtlIG9mIHNpbXBsaWNpdHksIFwibW9ieC5qc1wiIGlzIGJlaW5nIGxvYWRlZCB1c2luZyBcInJlcXVpcmUuanNcIi5cclxuICAgICAgICAgICAgLy8gVG8gbWFrZSB0aGF0IGhhcHBlbiwgXCJtb2J4LmpzXCIgd2FzIGNvbnZlcnRlZCBmcm9tIENvbW1vbkpTIHRvIEFNRCBmb3JtYXQ6XHJcbiAgICAgICAgICAgIC8vIGh0dHA6Ly9yZXF1aXJlanMub3JnL2RvY3MvY29tbW9uanMuaHRtbCNtYW51YWxjb252ZXJzaW9uXHJcblxyXG4gICAgICAgICAgICAvLyBUaGF0IGNvbnZlcnNpb24gaXMgbm90IHJlcXVpcmVkIHdoZW4gd29ya2luZyBpbiBOb2RlSlMgZW52aXJvbm1lbnQuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgcm9vdEVsID0gUmV0eXBlZC5kb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgc3RvcmU6XHJcbiAgICAgICAgICAgIF9zdG9yZSA9IG5ldyBUb2RvU3RvcmUocm9vdEVsKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCBhIGZldyBpbml0aWFsIFRvIERvIGl0ZW1zOlxyXG4gICAgICAgICAgICBfc3RvcmUuQWRkVG9kb0l0ZW0oXCJDcmVhdGUgYSBUYXNrXCIpO1xyXG4gICAgICAgICAgICBfc3RvcmUuQWRkVG9kb0l0ZW0oXCJNYXJrIGEgVGFzayBhcyBjb21wbGV0ZWRcIik7XHJcbiAgICAgICAgICAgIF9zdG9yZS5BZGRUb2RvSXRlbShcIkRlbGV0ZSBhIFRhc2tcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgQnJpZGdlO1xyXG5cclxubmFtZXNwYWNlIE1vYlhcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRvZG9TdG9yZVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQgX3RvZG9EaXY7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLmRvbS5IVE1MTGFiZWxFbGVtZW50IF9wcm9ncmVzc0xhYmVsO1xyXG5cclxuICAgICAgICAvLyBPYnNlcnZhYmxlIGFycmF5IG9mIFRvIERvIGl0ZW1zOlxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUmV0eXBlZC5tb2J4LklPYnNlcnZhYmxlQXJyYXkgPGdsb2JhbDo6TW9iWC5Ub2RvSXRlbT5fdG9kb3MgPSBSZXR5cGVkLm1vYngub2JzZXJ2YWJsZS5UeXBlMS5TZWxmPGdsb2JhbDo6TW9iWC5Ub2RvSXRlbT4obmV3IFRvZG9JdGVtWzBdKTtcclxuXHJcbiAgICAgICAgLy8gQ29tcHV0ZWQgcHJvcGVydHkgKG51bWJlciBvZiBjb21wbGV0ZWQgVG8gRG8gaXRlbXMpOlxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUmV0eXBlZC5tb2J4LklDb21wdXRlZFZhbHVlIDxpbnQ+X2NvbXBsZXRlZFRvZG9zQ291bnQ7XHJcbiAgICAgICAgcHVibGljIGludCBDb21wbGV0ZWRUb2Rvc0NvdW50IHtnZXR7cmV0dXJuIF9jb21wbGV0ZWRUb2Rvc0NvdW50LmdldCgpO319XHJcblxyXG4gICAgICAgIC8vIENvbXB1dGVkIHByb3BlcnR5IChwcm9ncmVzcyByZXBvcnQpOlxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUmV0eXBlZC5tb2J4LklDb21wdXRlZFZhbHVlIDxzdHJpbmc+X3JlcG9ydDtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFJlcG9ydCB7Z2V0e3JldHVybiBfcmVwb3J0LmdldCgpO319XHJcblxyXG4gICAgICAgIHB1YmxpYyBUb2RvU3RvcmUoUmV0eXBlZC5kb20uSFRNTEVsZW1lbnQgcm9vdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFJlbmRlciBVSSBlbGVtZW50czpcclxuICAgICAgICAgICAgUmVuZGVyKHJvb3QpO1xyXG5cclxuICAgICAgICAgICAgLy8gU3Vic2NyaWJlIHRvIFRvZG9zIGNoYW5nZXM6XHJcbiAgICAgICAgICAgIF90b2Rvcy5vYnNlcnZlKChnbG9iYWw6OlJldHlwZWQubW9ieC5JT2JzZXJ2YWJsZUFycmF5PGdsb2JhbDo6TW9iWC5Ub2RvSXRlbT4ub2JzZXJ2ZUZuKVRvZG9PYnNlcnZlRm4pO1xyXG5cclxuICAgICAgICAgICAgLy8gQ29uZmlndXJlIGNvbXB1dGVkIGZpZWxkIChfY29tcGxldGVkVG9kb3NDb3VudCk6XHJcbiAgICAgICAgICAgIF9jb21wbGV0ZWRUb2Rvc0NvdW50ID0gUmV0eXBlZC5tb2J4LmNvbXB1dGVkLlNlbGY8aW50PigoZ2xvYmFsOjpSZXR5cGVkLm1vYnguSUNvbXB1dGVkLlNlbGZGbjxpbnQ+KSgoKSA9PlxyXG4gICAgICAgICAgICAgICAgX3RvZG9zLmZpbHRlcigoZ2xvYmFsOjpSZXR5cGVkLmVzNS5BcnJheTxnbG9iYWw6Ok1vYlguVG9kb0l0ZW0+LmZpbHRlckZuKSgodiwgaSwgYXJyKSA9PiB2LkNvbXBsZXRlZCA/IChvYmplY3QpIHRydWUgOiBudWxsKSkuTGVuZ3RoKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDb25maWd1cmUgY29tcHV0ZWQgZmllbGQgKF9yZXBvcnQpOlxyXG4gICAgICAgICAgICBfcmVwb3J0ID0gUmV0eXBlZC5tb2J4LmNvbXB1dGVkLlNlbGY8c3RyaW5nPigoZ2xvYmFsOjpSZXR5cGVkLm1vYnguSUNvbXB1dGVkLlNlbGZGbjxzdHJpbmc+KSgoKSA9PiBzdHJpbmcuRm9ybWF0KFwiUHJvZ3Jlc3M6IHswfS97MX1cIixDb21wbGV0ZWRUb2Rvc0NvdW50LF90b2Rvcy5sZW5ndGgpKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDb25maWd1cmUgcmVhY3Rpb24gb24gc3RhdGUgY2hhbmdlczpcclxuICAgICAgICAgICAgUmV0eXBlZC5tb2J4LmF1dG9ydW4oKGdsb2JhbDo6UmV0eXBlZC5tb2J4LmF1dG9ydW5GbilTdGFnZUNoYW5nZWRGbik7XHJcbiAgICAgICAgfVxyXG4gICAgICBcclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRUb2RvSXRlbShzdHJpbmcgdGFzaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gbmV3IFRvZG9JdGVtXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRhc2sgPSB0YXNrLFxyXG4gICAgICAgICAgICAgICAgQ29tcGxldGVkID0gZmFsc2VcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIF90b2Rvcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBIYW5kbGVyc1xyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgVG9kb09ic2VydmVGbihVbmlvbjxSZXR5cGVkLm1vYnguSUFycmF5Q2hhbmdlPGdsb2JhbDo6TW9iWC5Ub2RvSXRlbT4sIFJldHlwZWQubW9ieC5JQXJyYXlTcGxpY2U8Z2xvYmFsOjpNb2JYLlRvZG9JdGVtPj4geClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzcGxpY2VJbmZvID0gKFJldHlwZWQubW9ieC5JQXJyYXlTcGxpY2U8Z2xvYmFsOjpNb2JYLlRvZG9JdGVtPil4O1xyXG5cclxuICAgICAgICAgICAgLy8gRW5zdXJlIGl0J3MgYSBzcGxpY2UsIG5vdCBhIGNoYW5nZSBldmVudDpcclxuICAgICAgICAgICAgaWYgKHNwbGljZUluZm8udHlwZSA9PSBSZXR5cGVkLm1vYnguTGl0ZXJhbHMuc3BsaWNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL2ZvcmVhY2ggKHZhciByZW1vdmVkIGluIHNwbGljZUluZm8ucmVtb3ZlZClcclxuICAgICAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gbm90aGluZyB0byBkby5cclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICdkZWxldGUnIGJ1dHRvbiBoYW5kbGVyIHRha2VzIGNhcmUgb2YgdGhpcy5cclxuICAgICAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlbmRlciBjb250cm9scyBmb3IgdGhlIG5ldyByZWNvcmRzOlxyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGFkZGVkIGluIHNwbGljZUluZm8uYWRkZWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVuZGVySXRlbShhZGRlZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb2JqZWN0IFN0YWdlQ2hhbmdlZEZuKFJldHlwZWQubW9ieC5JUmVhY3Rpb25QdWJsaWMgcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBQcm9ncmVzc0xhYmVsIHRleHQ6XHJcbiAgICAgICAgICAgIF9wcm9ncmVzc0xhYmVsLmlubmVySFRNTCA9IFwiVGFza3MgbGVmdDogXCIgKyAoX3RvZG9zLmxlbmd0aCAtIENvbXBsZXRlZFRvZG9zQ291bnQpO1xyXG5cclxuICAgICAgICAgICAgLy8gUHJpbnQgUmVwb3J0IHRvIENvbnNvbGU6XHJcbiAgICAgICAgICAgIFN5c3RlbS5Db25zb2xlLldyaXRlTGluZShSZXBvcnQpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBSZW5kZXJpbmdcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJlbmRlcihSZXR5cGVkLmRvbS5IVE1MRWxlbWVudCByb290KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIEhUTUwgZWxlbWVudHM6XHJcbiAgICAgICAgICAgIHZhciBoZWFkZXJEaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQoKTtcclxuICAgICAgICAgICAgX3RvZG9EaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQoKTtcclxuXHJcbiAgICAgICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oaGVhZGVyRGl2KTtcclxuICAgICAgICAgICAgcm9vdC5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihfdG9kb0Rpdik7XHJcblxyXG4gICAgICAgICAgICAvLyBIZWFkZXIgKHRvIGRvIGl0ZW0gY3JlYXRpb24pOlxyXG4gICAgICAgICAgICB2YXIgaW5wdXQgPSBuZXcgUmV0eXBlZC5kb20uSFRNTElucHV0RWxlbWVudCgpO1xyXG4gICAgICAgICAgICB2YXIgYWRkQnV0dG9uID0gbmV3IFJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlubmVySFRNTCA9IFwiQWRkXCIsXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBcImJ0biBidG4tcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSB7bWFyZ2luID0gXCIxMHB4XCJ9LFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQgPSB0cnVlXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpbnB1dC5vbmtleXVwID0gZSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGUhPW51bGw/ZS5rZXlDb2RlOihkb3VibGU/KW51bGwpID09IDEzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZEJ1dHRvbi5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZEJ1dHRvbi5kaXNhYmxlZCA9IHN0cmluZy5Jc051bGxPckVtcHR5KGlucHV0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGFkZEJ1dHRvbi5vbmNsaWNrID0gZSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBBZGRUb2RvSXRlbShpbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHN0cmluZy5FbXB0eTtcclxuICAgICAgICAgICAgICAgIGlucHV0Lm9ua2V5dXAobnVsbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIF9wcm9ncmVzc0xhYmVsID0gbmV3IFJldHlwZWQuZG9tLkhUTUxMYWJlbEVsZW1lbnQoKTtcclxuXHJcbiAgICAgICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnQ+KGlucHV0KTtcclxuICAgICAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQ+KGFkZEJ1dHRvbik7XHJcbiAgICAgICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxCUkVsZW1lbnQ+KG5ldyBSZXR5cGVkLmRvbS5IVE1MQlJFbGVtZW50KCkpO1xyXG4gICAgICAgICAgICBoZWFkZXJEaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MTGFiZWxFbGVtZW50PihfcHJvZ3Jlc3NMYWJlbCk7XHJcbiAgICAgICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxCUkVsZW1lbnQ+KG5ldyBSZXR5cGVkLmRvbS5IVE1MQlJFbGVtZW50KCkpO1xyXG4gICAgICAgICAgICBoZWFkZXJEaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MQlJFbGVtZW50PihuZXcgUmV0eXBlZC5kb20uSFRNTEJSRWxlbWVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSZW5kZXJJdGVtKFRvZG9JdGVtIGl0ZW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaXRlbURpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgQ2hlY2tCb3hcclxuICAgICAgICAgICAgdmFyIGNoZWNrQm94ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IFwiY2hlY2tib3hcIixcclxuICAgICAgICAgICAgICAgIHN0eWxlID0geyBtYXJnaW4gPSBcIjEwcHhcIn1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNoZWNrQm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6UmV0eXBlZC5kb20uRXZlbnQ+KShlID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgaXRlbSBhcyBDb21wbGV0ZWQ6XHJcbiAgICAgICAgICAgICAgICBpdGVtLkNvbXBsZXRlZCA9IGNoZWNrQm94LkBjaGVja2VkO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYnV0dG9uID0gbmV3IFJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlubmVySFRNTCA9IFwiZGVsXCIsXHJcbiAgICAgICAgICAgICAgICBvbmNsaWNrID0gZSA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgaXRlbSBhbmQgdGhlIGNvbnRyb2xzOlxyXG4gICAgICAgICAgICAgICAgICAgIF90b2RvRGl2LnJlbW92ZUNoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KGl0ZW1EaXYpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90b2Rvcy5yZW1vdmUoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpdGVtRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQ+KGJ1dHRvbik7XHJcbiAgICAgICAgICAgIGl0ZW1EaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MSW5wdXRFbGVtZW50PihjaGVja0JveCk7XHJcbiAgICAgICAgICAgIGl0ZW1EaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MTGFiZWxFbGVtZW50PihuZXcgUmV0eXBlZC5kb20uSFRNTExhYmVsRWxlbWVudCB7aW5uZXJIVE1MID0gaXRlbS5UYXNrfSk7XHJcbiAgICAgICAgICAgIGl0ZW1EaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MQlJFbGVtZW50PihuZXcgUmV0eXBlZC5kb20uSFRNTEJSRWxlbWVudCgpKTtcclxuXHJcbiAgICAgICAgICAgIF90b2RvRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KGl0ZW1EaXYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59Il0KfQo=
