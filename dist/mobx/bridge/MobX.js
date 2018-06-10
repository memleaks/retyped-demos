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
    
    
    
                var rootEl = document.getElementById("root");
    
                MobX.App._store = new MobX.TodoStore(rootEl);
    
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
                    this.Render(root);
    
                    this._todos.observe(Bridge.fn.cacheBind(this, this.TodoObserveFn));
    
                    this._completedTodosCount = mobx.computed(Bridge.fn.bind(this, function () {
                            return this._todos.filter(function (v, i, arr) {
                                return v.Completed ? true : null;
                            }).length;
                        }));
    
                    this._report = mobx.computed(Bridge.fn.bind(this, function () {
                            return System.String.format("Progress: {0}/{1}", this.CompletedTodosCount, this._todos.length);
                        }));
    
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
    
                    if (spliceInfo.type === "splice") {
    
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
                    this._progressLabel.innerHTML = "Tasks left: " + System.Double.format((this._todos.length - this.CompletedTodosCount));
    
                    System.Console.WriteLine(this.Report);
                    return null;
                },
                Render: function (root) {
                    var $t;
                    var headerDiv = document.createElement("div");
                    this._todoDiv = document.createElement("div");
    
                    root.appendChild(headerDiv);
                    root.appendChild(this._todoDiv);
    
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
    
                    var checkBox = ($t = document.createElement("input"), $t.type = "checkbox", $t.style.margin = "10px", $t);
    
                    checkBox.addEventListener("click", function (e) {
                        item.Completed = checkBox.checked;
                    });
    
                    var button = ($t = document.createElement("button"), $t.innerHTML = "del", $t.onclick = Bridge.fn.bind(this, function (e) {
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJNb2JYLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJUb2RvU3RvcmUuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7O2dCQWtCWUEsYUFBYUE7O2dCQUdiQSxrQkFBU0EsSUFBSUEsZUFBVUE7O2dCQUd2QkE7Z0JBQ0FBO2dCQUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JDUkpBLE9BQU9BOzs7Ozt3QkFTUEEsT0FBT0E7Ozs7OztrQ0FqQndFQSxnQkFBMERBOztnQ0FvQnhIQTs7b0JBR2JBLFlBQU9BOztvQkFHUEEsb0JBQWVBLEFBQXdFQTs7b0JBR3ZGQSw0QkFBdUJBLGNBQWdDQSxBQUE2Q0E7bUNBQ2hHQSxtQkFBY0EsQUFBNkRBLFVBQUNBLEdBQUdBLEdBQUdBO3VDQUFRQSxjQUFjQSxPQUFnQkE7Ozs7b0JBRzVIQSxlQUFVQSxjQUFtQ0EsQUFBZ0RBO21DQUFNQSwwQ0FBa0NBLDBCQUFvQkE7OztvQkFHekpBLGFBQXFCQSxBQUFnQ0E7Ozs7dUNBR2pDQTtvQkFFcEJBLFdBQVdBLFFBRUFBOztvQkFJWEEsaUJBQVlBOzt5Q0FLV0E7O29CQUV2QkEsaUJBQWlCQSxBQUFrREE7O29CQUduRUEsSUFBSUEsb0JBQW1CQTs7d0JBU25CQSwwQkFBc0JBOzs7O2dDQUVsQkEsZ0JBQVdBOzs7Ozs7OzswQ0FLT0E7b0JBRzFCQSxnQ0FBMkJBLGlCQUFpQkEsc0JBQUNBLHFCQUFnQkE7O29CQUc3REEseUJBQXlCQTtvQkFDekJBLE9BQU9BOztrQ0FPU0E7O29CQUdoQkEsZ0JBQWdCQTtvQkFDaEJBLGdCQUFXQTs7b0JBRVhBLGlCQUFxREE7b0JBQ3JEQSxpQkFBcURBOztvQkFHckRBLFlBQVlBO29CQUNaQSxnQkFBZ0JBOztvQkFRaEJBLGdCQUFnQkE7d0JBRVpBLElBQUlBLG9CQUFDQSxLQUFHQSxPQUFLQSxZQUFVQSxBQUFPQTs0QkFFMUJBOzs0QkFJQUEscUJBQXFCQSw0QkFBcUJBOzs7O29CQUlsREEsb0JBQW9CQTt3QkFFaEJBLGlCQUFZQTt3QkFDWkEsY0FBY0E7d0JBQ2RBLGNBQWNBOzs7b0JBR2xCQSxzQkFBaUJBOztvQkFFakJBLHNCQUE0REE7b0JBQzVEQSxzQkFBNkRBO29CQUM3REEsc0JBQXlEQTtvQkFDekRBLHNCQUE0REE7b0JBQzVEQSxzQkFBeURBO29CQUN6REEsc0JBQXlEQTs7c0NBR3JDQTs7b0JBRXBCQSxjQUFjQTs7b0JBR2RBLGVBQWVBOztvQkFNZkEsbUNBQTJDQSxBQUFrRUE7d0JBR3pHQSxpQkFBaUJBOzs7b0JBR3JCQSxhQUFhQSwyRUFHQ0E7d0JBR05BLDBCQUF5REE7d0JBQ3pEQSxtQkFBY0E7OztvQkFJdEJBLG9CQUEyREE7b0JBQzNEQSxvQkFBMERBO29CQUMxREEsb0JBQTBEQSxzREFBOENBO29CQUN4R0Esb0JBQXVEQTs7b0JBRXZEQSwwQkFBeURBIiwKICAic291cmNlc0NvbnRlbnQiOiBbIlxyXG5uYW1lc3BhY2UgTW9iWFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVG9kb1N0b3JlIF9zdG9yZTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gVGhlIGRlbW8gcHJvamVjdCBjb250YWlucyBzb21lIHNhbXBsZXMgZnJvbTpcclxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9tb2J4LmpzLm9yZy9nZXR0aW5nLXN0YXJ0ZWQuaHRtbFxyXG5cclxuICAgICAgICAgICAgLy8gRm9yIHRoZSBzYWtlIG9mIHNpbXBsaWNpdHksIFwibW9ieC5qc1wiIGlzIGJlaW5nIGxvYWRlZCB1c2luZyBcInJlcXVpcmUuanNcIi5cclxuICAgICAgICAgICAgLy8gVG8gbWFrZSB0aGF0IGhhcHBlbiwgXCJtb2J4LmpzXCIgd2FzIGNvbnZlcnRlZCBmcm9tIENvbW1vbkpTIHRvIEFNRCBmb3JtYXQ6XHJcbiAgICAgICAgICAgIC8vIGh0dHA6Ly9yZXF1aXJlanMub3JnL2RvY3MvY29tbW9uanMuaHRtbCNtYW51YWxjb252ZXJzaW9uXHJcblxyXG4gICAgICAgICAgICAvLyBUaGF0IGNvbnZlcnNpb24gaXMgbm90IHJlcXVpcmVkIHdoZW4gd29ya2luZyBpbiBOb2RlSlMgZW52aXJvbm1lbnQuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgcm9vdEVsID0gUmV0eXBlZC5kb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgc3RvcmU6XHJcbiAgICAgICAgICAgIF9zdG9yZSA9IG5ldyBUb2RvU3RvcmUocm9vdEVsKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCBhIGZldyBpbml0aWFsIFRvIERvIGl0ZW1zOlxyXG4gICAgICAgICAgICBfc3RvcmUuQWRkVG9kb0l0ZW0oXCJDcmVhdGUgYSBUYXNrXCIpO1xyXG4gICAgICAgICAgICBfc3RvcmUuQWRkVG9kb0l0ZW0oXCJNYXJrIGEgVGFzayBhcyBjb21wbGV0ZWRcIik7XHJcbiAgICAgICAgICAgIF9zdG9yZS5BZGRUb2RvSXRlbShcIkRlbGV0ZSBhIFRhc2tcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgQnJpZGdlO1xyXG5cclxubmFtZXNwYWNlIE1vYlhcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRvZG9TdG9yZVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQgX3RvZG9EaXY7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLmRvbS5IVE1MTGFiZWxFbGVtZW50IF9wcm9ncmVzc0xhYmVsO1xyXG5cclxuICAgICAgICAvLyBPYnNlcnZhYmxlIGFycmF5IG9mIFRvIERvIGl0ZW1zOlxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUmV0eXBlZC5tb2J4LklPYnNlcnZhYmxlQXJyYXkgPGdsb2JhbDo6TW9iWC5Ub2RvSXRlbT5fdG9kb3MgPSBSZXR5cGVkLm1vYngub2JzZXJ2YWJsZS5UeXBlMS5TZWxmPGdsb2JhbDo6TW9iWC5Ub2RvSXRlbT4obmV3IFRvZG9JdGVtWzBdKTtcclxuXHJcbiAgICAgICAgLy8gQ29tcHV0ZWQgcHJvcGVydHkgKG51bWJlciBvZiBjb21wbGV0ZWQgVG8gRG8gaXRlbXMpOlxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUmV0eXBlZC5tb2J4LklDb21wdXRlZFZhbHVlIDxpbnQ+X2NvbXBsZXRlZFRvZG9zQ291bnQ7XHJcbnB1YmxpYyBpbnQgQ29tcGxldGVkVG9kb3NDb3VudFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX2NvbXBsZXRlZFRvZG9zQ291bnQuZ2V0KCk7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICAvLyBDb21wdXRlZCBwcm9wZXJ0eSAocHJvZ3Jlc3MgcmVwb3J0KTpcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFJldHlwZWQubW9ieC5JQ29tcHV0ZWRWYWx1ZSA8c3RyaW5nPl9yZXBvcnQ7XHJcbnB1YmxpYyBzdHJpbmcgUmVwb3J0XHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfcmVwb3J0LmdldCgpO1xyXG4gICAgfVxyXG59XHJcbiAgICAgICAgcHVibGljIFRvZG9TdG9yZShSZXR5cGVkLmRvbS5IVE1MRWxlbWVudCByb290KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gUmVuZGVyIFVJIGVsZW1lbnRzOlxyXG4gICAgICAgICAgICBSZW5kZXIocm9vdCk7XHJcblxyXG4gICAgICAgICAgICAvLyBTdWJzY3JpYmUgdG8gVG9kb3MgY2hhbmdlczpcclxuICAgICAgICAgICAgX3RvZG9zLm9ic2VydmUoKGdsb2JhbDo6UmV0eXBlZC5tb2J4LklPYnNlcnZhYmxlQXJyYXk8Z2xvYmFsOjpNb2JYLlRvZG9JdGVtPi5vYnNlcnZlRm4pVG9kb09ic2VydmVGbik7XHJcblxyXG4gICAgICAgICAgICAvLyBDb25maWd1cmUgY29tcHV0ZWQgZmllbGQgKF9jb21wbGV0ZWRUb2Rvc0NvdW50KTpcclxuICAgICAgICAgICAgX2NvbXBsZXRlZFRvZG9zQ291bnQgPSBSZXR5cGVkLm1vYnguY29tcHV0ZWQuU2VsZjxpbnQ+KChnbG9iYWw6OlJldHlwZWQubW9ieC5JQ29tcHV0ZWQuU2VsZkZuPGludD4pKCgpID0+XHJcbiAgICAgICAgICAgICAgICBfdG9kb3MuZmlsdGVyKChnbG9iYWw6OlJldHlwZWQuZXM1LkFycmF5PGdsb2JhbDo6TW9iWC5Ub2RvSXRlbT4uZmlsdGVyRm4yKSgodiwgaSwgYXJyKSA9PiB2LkNvbXBsZXRlZCA/IChvYmplY3QpIHRydWUgOiBudWxsKSkuTGVuZ3RoKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDb25maWd1cmUgY29tcHV0ZWQgZmllbGQgKF9yZXBvcnQpOlxyXG4gICAgICAgICAgICBfcmVwb3J0ID0gUmV0eXBlZC5tb2J4LmNvbXB1dGVkLlNlbGY8c3RyaW5nPigoZ2xvYmFsOjpSZXR5cGVkLm1vYnguSUNvbXB1dGVkLlNlbGZGbjxzdHJpbmc+KSgoKSA9PiBzdHJpbmcuRm9ybWF0KFwiUHJvZ3Jlc3M6IHswfS97MX1cIixDb21wbGV0ZWRUb2Rvc0NvdW50LF90b2Rvcy5sZW5ndGgpKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDb25maWd1cmUgcmVhY3Rpb24gb24gc3RhdGUgY2hhbmdlczpcclxuICAgICAgICAgICAgUmV0eXBlZC5tb2J4LmF1dG9ydW4oKGdsb2JhbDo6UmV0eXBlZC5tb2J4LmF1dG9ydW5GbilTdGFnZUNoYW5nZWRGbik7XHJcbiAgICAgICAgfVxyXG4gICAgICBcclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRUb2RvSXRlbShzdHJpbmcgdGFzaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gbmV3IFRvZG9JdGVtXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRhc2sgPSB0YXNrLFxyXG4gICAgICAgICAgICAgICAgQ29tcGxldGVkID0gZmFsc2VcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIF90b2Rvcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBIYW5kbGVyc1xyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgVG9kb09ic2VydmVGbihVbmlvbjxSZXR5cGVkLm1vYnguSUFycmF5Q2hhbmdlPGdsb2JhbDo6TW9iWC5Ub2RvSXRlbT4sIFJldHlwZWQubW9ieC5JQXJyYXlTcGxpY2U8Z2xvYmFsOjpNb2JYLlRvZG9JdGVtPj4geClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzcGxpY2VJbmZvID0gKFJldHlwZWQubW9ieC5JQXJyYXlTcGxpY2U8Z2xvYmFsOjpNb2JYLlRvZG9JdGVtPil4O1xyXG5cclxuICAgICAgICAgICAgLy8gRW5zdXJlIGl0J3MgYSBzcGxpY2UsIG5vdCBhIGNoYW5nZSBldmVudDpcclxuICAgICAgICAgICAgaWYgKHNwbGljZUluZm8udHlwZSA9PSBSZXR5cGVkLm1vYnguTGl0ZXJhbHMuc3BsaWNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL2ZvcmVhY2ggKHZhciByZW1vdmVkIGluIHNwbGljZUluZm8ucmVtb3ZlZClcclxuICAgICAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gbm90aGluZyB0byBkby5cclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICdkZWxldGUnIGJ1dHRvbiBoYW5kbGVyIHRha2VzIGNhcmUgb2YgdGhpcy5cclxuICAgICAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlbmRlciBjb250cm9scyBmb3IgdGhlIG5ldyByZWNvcmRzOlxyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGFkZGVkIGluIHNwbGljZUluZm8uYWRkZWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVuZGVySXRlbShhZGRlZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb2JqZWN0IFN0YWdlQ2hhbmdlZEZuKFJldHlwZWQubW9ieC5JUmVhY3Rpb25QdWJsaWMgcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBQcm9ncmVzc0xhYmVsIHRleHQ6XHJcbiAgICAgICAgICAgIF9wcm9ncmVzc0xhYmVsLmlubmVySFRNTCA9IFwiVGFza3MgbGVmdDogXCIgKyAoX3RvZG9zLmxlbmd0aCAtIENvbXBsZXRlZFRvZG9zQ291bnQpO1xyXG5cclxuICAgICAgICAgICAgLy8gUHJpbnQgUmVwb3J0IHRvIENvbnNvbGU6XHJcbiAgICAgICAgICAgIFN5c3RlbS5Db25zb2xlLldyaXRlTGluZShSZXBvcnQpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBSZW5kZXJpbmdcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJlbmRlcihSZXR5cGVkLmRvbS5IVE1MRWxlbWVudCByb290KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIEhUTUwgZWxlbWVudHM6XHJcbiAgICAgICAgICAgIHZhciBoZWFkZXJEaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQoKTtcclxuICAgICAgICAgICAgX3RvZG9EaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQoKTtcclxuXHJcbiAgICAgICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oaGVhZGVyRGl2KTtcclxuICAgICAgICAgICAgcm9vdC5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihfdG9kb0Rpdik7XHJcblxyXG4gICAgICAgICAgICAvLyBIZWFkZXIgKHRvIGRvIGl0ZW0gY3JlYXRpb24pOlxyXG4gICAgICAgICAgICB2YXIgaW5wdXQgPSBuZXcgUmV0eXBlZC5kb20uSFRNTElucHV0RWxlbWVudCgpO1xyXG4gICAgICAgICAgICB2YXIgYWRkQnV0dG9uID0gbmV3IFJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlubmVySFRNTCA9IFwiQWRkXCIsXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBcImJ0biBidG4tcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSB7bWFyZ2luID0gXCIxMHB4XCJ9LFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQgPSB0cnVlXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpbnB1dC5vbmtleXVwID0gZSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGUhPW51bGw/ZS5rZXlDb2RlOih1aW50PyludWxsKSA9PSAxMylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRCdXR0b24uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRCdXR0b24uZGlzYWJsZWQgPSBzdHJpbmcuSXNOdWxsT3JFbXB0eShpbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBhZGRCdXR0b24ub25jbGljayA9IGUgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQWRkVG9kb0l0ZW0oaW5wdXQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBzdHJpbmcuRW1wdHk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5vbmtleXVwKG51bGwpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgX3Byb2dyZXNzTGFiZWwgPSBuZXcgUmV0eXBlZC5kb20uSFRNTExhYmVsRWxlbWVudCgpO1xyXG5cclxuICAgICAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTElucHV0RWxlbWVudD4oaW5wdXQpO1xyXG4gICAgICAgICAgICBoZWFkZXJEaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MQnV0dG9uRWxlbWVudD4oYWRkQnV0dG9uKTtcclxuICAgICAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJSRWxlbWVudD4obmV3IFJldHlwZWQuZG9tLkhUTUxCUkVsZW1lbnQoKSk7XHJcbiAgICAgICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxMYWJlbEVsZW1lbnQ+KF9wcm9ncmVzc0xhYmVsKTtcclxuICAgICAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJSRWxlbWVudD4obmV3IFJldHlwZWQuZG9tLkhUTUxCUkVsZW1lbnQoKSk7XHJcbiAgICAgICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxCUkVsZW1lbnQ+KG5ldyBSZXR5cGVkLmRvbS5IVE1MQlJFbGVtZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJlbmRlckl0ZW0oVG9kb0l0ZW0gaXRlbSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtRGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBDaGVja0JveFxyXG4gICAgICAgICAgICB2YXIgY2hlY2tCb3ggPSBuZXcgUmV0eXBlZC5kb20uSFRNTElucHV0RWxlbWVudFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gXCJjaGVja2JveFwiLFxyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSB7IG1hcmdpbiA9IFwiMTBweFwifVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY2hlY2tCb3guYWRkRXZlbnRMaXN0ZW5lcjxzdHJpbmc+KFwiY2xpY2tcIiwgKGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTElucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyRm48c3RyaW5nPikoZSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIGl0ZW0gYXMgQ29tcGxldGVkOlxyXG4gICAgICAgICAgICAgICAgaXRlbS5Db21wbGV0ZWQgPSBjaGVja0JveC5AY2hlY2tlZDtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGJ1dHRvbiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MQnV0dG9uRWxlbWVudFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbm5lckhUTUwgPSBcImRlbFwiLFxyXG4gICAgICAgICAgICAgICAgb25jbGljayA9IGUgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGl0ZW0gYW5kIHRoZSBjb250cm9sczpcclxuICAgICAgICAgICAgICAgICAgICBfdG9kb0Rpdi5yZW1vdmVDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihpdGVtRGl2KTtcclxuICAgICAgICAgICAgICAgICAgICBfdG9kb3MucmVtb3ZlKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaXRlbURpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50PihidXR0b24pO1xyXG4gICAgICAgICAgICBpdGVtRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTElucHV0RWxlbWVudD4oY2hlY2tCb3gpO1xyXG4gICAgICAgICAgICBpdGVtRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTExhYmVsRWxlbWVudD4obmV3IFJldHlwZWQuZG9tLkhUTUxMYWJlbEVsZW1lbnQge2lubmVySFRNTCA9IGl0ZW0uVGFza30pO1xyXG4gICAgICAgICAgICBpdGVtRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJSRWxlbWVudD4obmV3IFJldHlwZWQuZG9tLkhUTUxCUkVsZW1lbnQoKSk7XHJcblxyXG4gICAgICAgICAgICBfdG9kb0Rpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihpdGVtRGl2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxufSJdCn0K
