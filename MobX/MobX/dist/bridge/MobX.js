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
    
                    var checkBox = ($t = document.createElement("input"), $t.type = "checkbox", $t.style.margin = "10px", $t);
    
                    checkBox.addEventListener("click", function (e) {
                        item.Completed = checkBox.checked;
                    });
    
                    var button = ($t = document.createElement("button"), $t.innerHTML = "del", $t.onclick = Bridge.fn.bind(this, function (e) {
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJNb2JYLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJUb2RvU3RvcmUuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7O2dCQWtCWUEsYUFBYUE7O2dCQUdiQSxrQkFBU0EsSUFBSUEsZUFBVUE7O2dCQUd2QkE7Z0JBQ0FBO2dCQUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JDWmdDQSxPQUFPQTs7Ozs7d0JBSWpCQSxPQUFPQTs7Ozs7O2tDQVI4Q0EsZ0JBQTBEQTs7Z0NBVXhIQTs7b0JBR2JBLFlBQU9BOztvQkFHUEEsb0JBQWVBLEFBQXdFQTs7b0JBR3ZGQSw0QkFBdUJBLGNBQWdDQSxBQUE2Q0E7bUNBQ2hHQSxtQkFBY0EsQUFBNkRBLFVBQUNBLEdBQUdBLEdBQUdBO3VDQUFRQSxjQUFjQSxPQUFnQkE7Ozs7b0JBRzVIQSxlQUFVQSxjQUFtQ0EsQUFBZ0RBO21DQUFNQSwwQ0FBa0NBLDBCQUFvQkE7OztvQkFHekpBLGFBQXFCQSxBQUFnQ0E7Ozs7dUNBR2pDQTtvQkFFcEJBLFdBQVdBLFFBRUFBOztvQkFJWEEsaUJBQVlBOzt5Q0FLV0E7O29CQUV2QkEsaUJBQWlCQSxBQUFrREE7O29CQUduRUEsSUFBSUEsb0JBQW1CQTs7d0JBU25CQSwwQkFBc0JBOzs7O2dDQUVsQkEsZ0JBQVdBOzs7Ozs7OzswQ0FLT0E7b0JBRzFCQSxnQ0FBMkJBLGlCQUFpQkEsc0JBQUNBLHFCQUFnQkE7O29CQUc3REEseUJBQXlCQTtvQkFDekJBLE9BQU9BOztrQ0FPU0E7O29CQUdoQkEsZ0JBQWdCQTtvQkFDaEJBLGdCQUFXQTs7b0JBRVhBLGlCQUFxREE7b0JBQ3JEQSxpQkFBcURBOztvQkFHckRBLFlBQVlBO29CQUNaQSxnQkFBZ0JBOztvQkFRaEJBLGdCQUFnQkE7d0JBRVpBLElBQUlBLG9CQUFDQSxLQUFHQSxPQUFLQSxZQUFVQSxBQUFTQTs0QkFFNUJBOzs0QkFJQUEscUJBQXFCQSw0QkFBcUJBOzs7d0JBRzlDQSxPQUFPQTs7O29CQUdYQSxvQkFBb0JBO3dCQUVoQkEsaUJBQVlBO3dCQUNaQSxjQUFjQTt3QkFDZEEsY0FBY0E7d0JBQ2RBLE9BQU9BOzs7b0JBR1hBLHNCQUFpQkE7O29CQUVqQkEsc0JBQTREQTtvQkFDNURBLHNCQUE2REE7b0JBQzdEQSxzQkFBeURBO29CQUN6REEsc0JBQTREQTtvQkFDNURBLHNCQUF5REE7b0JBQ3pEQSxzQkFBeURBOztzQ0FHckNBOztvQkFFcEJBLGNBQWNBOztvQkFHZEEsZUFBZUE7O29CQU1mQSxtQ0FBbUNBLEFBQW1EQTt3QkFHbEZBLGlCQUFpQkE7OztvQkFHckJBLGFBQWFBLDJFQUdDQTt3QkFHTkEsMEJBQXlEQTt3QkFDekRBLG1CQUFjQTt3QkFDZEEsT0FBT0E7OztvQkFJZkEsb0JBQTJEQTtvQkFDM0RBLG9CQUEwREE7b0JBQzFEQSxvQkFBMERBLHNEQUE4Q0E7b0JBQ3hHQSxvQkFBdURBOztvQkFFdkRBLDBCQUF5REEiLAogICJzb3VyY2VzQ29udGVudCI6IFsiXHJcbm5hbWVzcGFjZSBNb2JYXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBUb2RvU3RvcmUgX3N0b3JlO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBUaGUgZGVtbyBwcm9qZWN0IGNvbnRhaW5zIHNvbWUgc2FtcGxlcyBmcm9tOlxyXG4gICAgICAgICAgICAvLyBodHRwczovL21vYnguanMub3JnL2dldHRpbmctc3RhcnRlZC5odG1sXHJcblxyXG4gICAgICAgICAgICAvLyBGb3IgdGhlIHNha2Ugb2Ygc2ltcGxpY2l0eSwgXCJtb2J4LmpzXCIgaXMgYmVpbmcgbG9hZGVkIHVzaW5nIFwicmVxdWlyZS5qc1wiLlxyXG4gICAgICAgICAgICAvLyBUbyBtYWtlIHRoYXQgaGFwcGVuLCBcIm1vYnguanNcIiB3YXMgY29udmVydGVkIGZyb20gQ29tbW9uSlMgdG8gQU1EIGZvcm1hdDpcclxuICAgICAgICAgICAgLy8gaHR0cDovL3JlcXVpcmVqcy5vcmcvZG9jcy9jb21tb25qcy5odG1sI21hbnVhbGNvbnZlcnNpb25cclxuXHJcbiAgICAgICAgICAgIC8vIFRoYXQgY29udmVyc2lvbiBpcyBub3QgcmVxdWlyZWQgd2hlbiB3b3JraW5nIGluIE5vZGVKUyBlbnZpcm9ubWVudC5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciByb290RWwgPSBSZXR5cGVkLmRvbS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBzdG9yZTpcclxuICAgICAgICAgICAgX3N0b3JlID0gbmV3IFRvZG9TdG9yZShyb290RWwpO1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkIGEgZmV3IGluaXRpYWwgVG8gRG8gaXRlbXM6XHJcbiAgICAgICAgICAgIF9zdG9yZS5BZGRUb2RvSXRlbShcIkNyZWF0ZSBhIFRhc2tcIik7XHJcbiAgICAgICAgICAgIF9zdG9yZS5BZGRUb2RvSXRlbShcIk1hcmsgYSBUYXNrIGFzIGNvbXBsZXRlZFwiKTtcclxuICAgICAgICAgICAgX3N0b3JlLkFkZFRvZG9JdGVtKFwiRGVsZXRlIGEgVGFza1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBCcmlkZ2U7XHJcblxyXG5uYW1lc3BhY2UgTW9iWFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVG9kb1N0b3JlXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCBfdG9kb0RpdjtcclxuICAgICAgICBwcml2YXRlIFJldHlwZWQuZG9tLkhUTUxMYWJlbEVsZW1lbnQgX3Byb2dyZXNzTGFiZWw7XHJcblxyXG4gICAgICAgIC8vIE9ic2VydmFibGUgYXJyYXkgb2YgVG8gRG8gaXRlbXM6XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBSZXR5cGVkLm1vYnguSU9ic2VydmFibGVBcnJheSA8Z2xvYmFsOjpNb2JYLlRvZG9JdGVtPl90b2RvcyA9IFJldHlwZWQubW9ieC5vYnNlcnZhYmxlLlR5cGUxLlNlbGY8Z2xvYmFsOjpNb2JYLlRvZG9JdGVtPihuZXcgVG9kb0l0ZW1bMF0pO1xyXG5cclxuICAgICAgICAvLyBDb21wdXRlZCBwcm9wZXJ0eSAobnVtYmVyIG9mIGNvbXBsZXRlZCBUbyBEbyBpdGVtcyk6XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBSZXR5cGVkLm1vYnguSUNvbXB1dGVkVmFsdWUgPGludD5fY29tcGxldGVkVG9kb3NDb3VudDtcclxuICAgICAgICBwdWJsaWMgaW50IENvbXBsZXRlZFRvZG9zQ291bnQge2dldHtyZXR1cm4gX2NvbXBsZXRlZFRvZG9zQ291bnQuZ2V0KCk7fX1cclxuXHJcbiAgICAgICAgLy8gQ29tcHV0ZWQgcHJvcGVydHkgKHByb2dyZXNzIHJlcG9ydCk6XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBSZXR5cGVkLm1vYnguSUNvbXB1dGVkVmFsdWUgPHN0cmluZz5fcmVwb3J0O1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgUmVwb3J0IHtnZXR7cmV0dXJuIF9yZXBvcnQuZ2V0KCk7fX1cclxuXHJcbiAgICAgICAgcHVibGljIFRvZG9TdG9yZShSZXR5cGVkLmRvbS5IVE1MRWxlbWVudCByb290KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gUmVuZGVyIFVJIGVsZW1lbnRzOlxyXG4gICAgICAgICAgICBSZW5kZXIocm9vdCk7XHJcblxyXG4gICAgICAgICAgICAvLyBTdWJzY3JpYmUgdG8gVG9kb3MgY2hhbmdlczpcclxuICAgICAgICAgICAgX3RvZG9zLm9ic2VydmUoKGdsb2JhbDo6UmV0eXBlZC5tb2J4LklPYnNlcnZhYmxlQXJyYXk8Z2xvYmFsOjpNb2JYLlRvZG9JdGVtPi5vYnNlcnZlRm4pVG9kb09ic2VydmVGbik7XHJcblxyXG4gICAgICAgICAgICAvLyBDb25maWd1cmUgY29tcHV0ZWQgZmllbGQgKF9jb21wbGV0ZWRUb2Rvc0NvdW50KTpcclxuICAgICAgICAgICAgX2NvbXBsZXRlZFRvZG9zQ291bnQgPSBSZXR5cGVkLm1vYnguY29tcHV0ZWQuU2VsZjxpbnQ+KChnbG9iYWw6OlJldHlwZWQubW9ieC5JQ29tcHV0ZWQuU2VsZkZuPGludD4pKCgpID0+XHJcbiAgICAgICAgICAgICAgICBfdG9kb3MuZmlsdGVyKChnbG9iYWw6OlJldHlwZWQuZXM1LkFycmF5PGdsb2JhbDo6TW9iWC5Ub2RvSXRlbT4uZmlsdGVyRm4yKSgodiwgaSwgYXJyKSA9PiB2LkNvbXBsZXRlZCA/IChvYmplY3QpIHRydWUgOiBudWxsKSkuTGVuZ3RoKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDb25maWd1cmUgY29tcHV0ZWQgZmllbGQgKF9yZXBvcnQpOlxyXG4gICAgICAgICAgICBfcmVwb3J0ID0gUmV0eXBlZC5tb2J4LmNvbXB1dGVkLlNlbGY8c3RyaW5nPigoZ2xvYmFsOjpSZXR5cGVkLm1vYnguSUNvbXB1dGVkLlNlbGZGbjxzdHJpbmc+KSgoKSA9PiBzdHJpbmcuRm9ybWF0KFwiUHJvZ3Jlc3M6IHswfS97MX1cIixDb21wbGV0ZWRUb2Rvc0NvdW50LF90b2Rvcy5sZW5ndGgpKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDb25maWd1cmUgcmVhY3Rpb24gb24gc3RhdGUgY2hhbmdlczpcclxuICAgICAgICAgICAgUmV0eXBlZC5tb2J4LmF1dG9ydW4oKGdsb2JhbDo6UmV0eXBlZC5tb2J4LmF1dG9ydW5GbilTdGFnZUNoYW5nZWRGbik7XHJcbiAgICAgICAgfVxyXG4gICAgICBcclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRUb2RvSXRlbShzdHJpbmcgdGFzaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gbmV3IFRvZG9JdGVtXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRhc2sgPSB0YXNrLFxyXG4gICAgICAgICAgICAgICAgQ29tcGxldGVkID0gZmFsc2VcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIF90b2Rvcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBIYW5kbGVyc1xyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgVG9kb09ic2VydmVGbihVbmlvbjxSZXR5cGVkLm1vYnguSUFycmF5Q2hhbmdlPGdsb2JhbDo6TW9iWC5Ub2RvSXRlbT4sIFJldHlwZWQubW9ieC5JQXJyYXlTcGxpY2U8Z2xvYmFsOjpNb2JYLlRvZG9JdGVtPj4geClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzcGxpY2VJbmZvID0gKFJldHlwZWQubW9ieC5JQXJyYXlTcGxpY2U8Z2xvYmFsOjpNb2JYLlRvZG9JdGVtPil4O1xyXG5cclxuICAgICAgICAgICAgLy8gRW5zdXJlIGl0J3MgYSBzcGxpY2UsIG5vdCBhIGNoYW5nZSBldmVudDpcclxuICAgICAgICAgICAgaWYgKHNwbGljZUluZm8udHlwZSA9PSBSZXR5cGVkLm1vYnguTGl0ZXJhbHMuc3BsaWNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL2ZvcmVhY2ggKHZhciByZW1vdmVkIGluIHNwbGljZUluZm8ucmVtb3ZlZClcclxuICAgICAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gbm90aGluZyB0byBkby5cclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICdkZWxldGUnIGJ1dHRvbiBoYW5kbGVyIHRha2VzIGNhcmUgb2YgdGhpcy5cclxuICAgICAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlbmRlciBjb250cm9scyBmb3IgdGhlIG5ldyByZWNvcmRzOlxyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGFkZGVkIGluIHNwbGljZUluZm8uYWRkZWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVuZGVySXRlbShhZGRlZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb2JqZWN0IFN0YWdlQ2hhbmdlZEZuKFJldHlwZWQubW9ieC5JUmVhY3Rpb25QdWJsaWMgcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBQcm9ncmVzc0xhYmVsIHRleHQ6XHJcbiAgICAgICAgICAgIF9wcm9ncmVzc0xhYmVsLmlubmVySFRNTCA9IFwiVGFza3MgbGVmdDogXCIgKyAoX3RvZG9zLmxlbmd0aCAtIENvbXBsZXRlZFRvZG9zQ291bnQpO1xyXG5cclxuICAgICAgICAgICAgLy8gUHJpbnQgUmVwb3J0IHRvIENvbnNvbGU6XHJcbiAgICAgICAgICAgIFN5c3RlbS5Db25zb2xlLldyaXRlTGluZShSZXBvcnQpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBSZW5kZXJpbmdcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJlbmRlcihSZXR5cGVkLmRvbS5IVE1MRWxlbWVudCByb290KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIEhUTUwgZWxlbWVudHM6XHJcbiAgICAgICAgICAgIHZhciBoZWFkZXJEaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQoKTtcclxuICAgICAgICAgICAgX3RvZG9EaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQoKTtcclxuXHJcbiAgICAgICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oaGVhZGVyRGl2KTtcclxuICAgICAgICAgICAgcm9vdC5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihfdG9kb0Rpdik7XHJcblxyXG4gICAgICAgICAgICAvLyBIZWFkZXIgKHRvIGRvIGl0ZW0gY3JlYXRpb24pOlxyXG4gICAgICAgICAgICB2YXIgaW5wdXQgPSBuZXcgUmV0eXBlZC5kb20uSFRNTElucHV0RWxlbWVudCgpO1xyXG4gICAgICAgICAgICB2YXIgYWRkQnV0dG9uID0gbmV3IFJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlubmVySFRNTCA9IFwiQWRkXCIsXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBcImJ0biBidG4tcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSB7bWFyZ2luID0gXCIxMHB4XCJ9LFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQgPSB0cnVlXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpbnB1dC5vbmtleXVwID0gZSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGUhPW51bGw/ZS5rZXlDb2RlOihkb3VibGU/KW51bGwpID09IDEzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZEJ1dHRvbi5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZEJ1dHRvbi5kaXNhYmxlZCA9IHN0cmluZy5Jc051bGxPckVtcHR5KGlucHV0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGFkZEJ1dHRvbi5vbmNsaWNrID0gZSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBBZGRUb2RvSXRlbShpbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHN0cmluZy5FbXB0eTtcclxuICAgICAgICAgICAgICAgIGlucHV0Lm9ua2V5dXAobnVsbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIF9wcm9ncmVzc0xhYmVsID0gbmV3IFJldHlwZWQuZG9tLkhUTUxMYWJlbEVsZW1lbnQoKTtcclxuXHJcbiAgICAgICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnQ+KGlucHV0KTtcclxuICAgICAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQ+KGFkZEJ1dHRvbik7XHJcbiAgICAgICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxCUkVsZW1lbnQ+KG5ldyBSZXR5cGVkLmRvbS5IVE1MQlJFbGVtZW50KCkpO1xyXG4gICAgICAgICAgICBoZWFkZXJEaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MTGFiZWxFbGVtZW50PihfcHJvZ3Jlc3NMYWJlbCk7XHJcbiAgICAgICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxCUkVsZW1lbnQ+KG5ldyBSZXR5cGVkLmRvbS5IVE1MQlJFbGVtZW50KCkpO1xyXG4gICAgICAgICAgICBoZWFkZXJEaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MQlJFbGVtZW50PihuZXcgUmV0eXBlZC5kb20uSFRNTEJSRWxlbWVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSZW5kZXJJdGVtKFRvZG9JdGVtIGl0ZW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaXRlbURpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgQ2hlY2tCb3hcclxuICAgICAgICAgICAgdmFyIGNoZWNrQm94ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IFwiY2hlY2tib3hcIixcclxuICAgICAgICAgICAgICAgIHN0eWxlID0geyBtYXJnaW4gPSBcIjEwcHhcIn1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNoZWNrQm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6UmV0eXBlZC5kb20uRXZlbnQ+KShlID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgaXRlbSBhcyBDb21wbGV0ZWQ6XHJcbiAgICAgICAgICAgICAgICBpdGVtLkNvbXBsZXRlZCA9IGNoZWNrQm94LkBjaGVja2VkO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYnV0dG9uID0gbmV3IFJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlubmVySFRNTCA9IFwiZGVsXCIsXHJcbiAgICAgICAgICAgICAgICBvbmNsaWNrID0gZSA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgaXRlbSBhbmQgdGhlIGNvbnRyb2xzOlxyXG4gICAgICAgICAgICAgICAgICAgIF90b2RvRGl2LnJlbW92ZUNoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KGl0ZW1EaXYpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90b2Rvcy5yZW1vdmUoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpdGVtRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQ+KGJ1dHRvbik7XHJcbiAgICAgICAgICAgIGl0ZW1EaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MSW5wdXRFbGVtZW50PihjaGVja0JveCk7XHJcbiAgICAgICAgICAgIGl0ZW1EaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MTGFiZWxFbGVtZW50PihuZXcgUmV0eXBlZC5kb20uSFRNTExhYmVsRWxlbWVudCB7aW5uZXJIVE1MID0gaXRlbS5UYXNrfSk7XHJcbiAgICAgICAgICAgIGl0ZW1EaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MQlJFbGVtZW50PihuZXcgUmV0eXBlZC5kb20uSFRNTEJSRWxlbWVudCgpKTtcclxuXHJcbiAgICAgICAgICAgIF90b2RvRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KGl0ZW1EaXYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59Il0KfQo=
