/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.1.0
 */
Bridge.assembly("VueDemo", function ($asm, globals) {
    "use strict";

    require(["vue"], function (vue) {
        /** @namespace System */
    
        /**
         * @memberof System
         * @callback System.Func
         * @return  {TModel}
         */
    
        /** @namespace VueDemo.Extensions */
    
        /**
         * Vue componenent with a specific Model and Properties type.
         *
         * @public
         * @class VueDemo.Extensions.VueComponent$2
         * @augments vue.System.Object
         * @param   {Function}    [name]    Model (data) type
         * @param   {Function}    [name]    Properties type
         */
        Bridge.define("VueDemo.Extensions.VueComponent$2", function (TModel, TProps) { return {
            statics: {
                methods: {
                    /**
                     * Collects component's property names
                     *
                     * @static
                     * @private
                     * @this VueDemo.Extensions.VueComponent$2
                     * @memberof VueDemo.Extensions.VueComponent$2
                     * @return  {Retyped.vue.ArrayPropsDefinition$1}
                     */
                    GetCmpPropertyNames: function () {
                        var $t, $t1;
                        var names = new (System.Collections.Generic.List$1(System.String)).ctor();
    
                        var propsEntityMembers = Bridge.Reflection.getMembers(TProps, 31, 20);
                        $t = Bridge.getEnumerator(propsEntityMembers);
                        try {
                            while ($t.moveNext()) {
                                var member = $t.Current;
                                var field = Bridge.as(member, System.Reflection.FieldInfo);
                                if (field != null && !(field.sy || false)) {
                                    names.add(field.sn);
                                    continue;
                                }
    
                                var prop = Bridge.as(member, System.Reflection.PropertyInfo);
                                if (prop != null) {
                                    names.add(($t1 = prop.fn, $t1 != null ? $t1 : prop.n));
                                }
                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$Dispose();
                            }
                        }
                        return System.Linq.Enumerable.from(names).select(function (x) {
                                return x;
                            }).ToArray(String);
                    }
                }
            },
            fields: {
                /**
                 * Overrides {@link } with the actual model type.
                 *
                 * @instance
                 * @public
                 * @memberof VueDemo.Extensions.VueComponent$2
                 * @function data
                 * @type System.Func
                 */
                data: null
            },
            ctors: {
                /**
                 * Creates a Vue componenent with a specific Model type.
                 *
                 * @instance
                 * @public
                 * @this VueDemo.Extensions.VueComponent$2
                 * @memberof VueDemo.Extensions.VueComponent$2
                 * @param   {boolean}    registerMembers    If true, automatically registers [VueMethods]/[VueComputed] methods.
                 * @return  {void}
                 */
                ctor: function (registerMembers) {
                    if (registerMembers === void 0) { registerMembers = true; }
    
                    this.$initialize();
                    this.props = VueDemo.Extensions.VueComponent$2(TModel,TProps).GetCmpPropertyNames();
    
                    if (registerMembers) {
                        this.methods = this.RegisterMethods();
                        this.computed = this.RegisterComputed();
                    }
                }
            },
            methods: {
                /**
                 * Collects and registers STATIC methods marked with {@link } attribute.
                 *
                 * @instance
                 * @private
                 * @this VueDemo.Extensions.VueComponent$2
                 * @memberof VueDemo.Extensions.VueComponent$2
                 * @return  {vue.System.Object}
                 */
                RegisterMethods: function () {
                    var $t;
                    var publicMembers = Bridge.Reflection.getMembers(Bridge.getType(this), 31, 26);
                    var config = { };
    
                    $t = Bridge.getEnumerator(publicMembers);
                    try {
                        while ($t.moveNext()) {
                            var member = $t.Current;
                            var method = Bridge.as(member, System.Reflection.MethodInfo);
                            if (method == null) {
                                continue;
                            }
    
                            if ((method.t === 1) || (method.sy || false)) {
                                continue;
                            }
    
                            var isVueMethod = System.Linq.Enumerable.from(System.Attribute.getCustomAttributes(method, VueDemo.Extensions.VueMethodAttribute)).any();
                            if (!isVueMethod) {
                                continue;
                            }
    
                            config[method.sn] = method.td[method.sn];
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    return config;
                },
                /**
                 * Collects and registers STATIC methods (for computed properties) marked with {@link } attribute.
                 *
                 * @instance
                 * @private
                 * @this VueDemo.Extensions.VueComponent$2
                 * @memberof VueDemo.Extensions.VueComponent$2
                 * @return  {vue.System.Object}
                 */
                RegisterComputed: function () {
                    var $t;
                    var publicMembers = Bridge.Reflection.getMembers(Bridge.getType(this), 31, 24);
    
                    var config = { };
    
                    $t = Bridge.getEnumerator(publicMembers);
                    try {
                        while ($t.moveNext()) {
                            var member = $t.Current;
                            var method = Bridge.as(member, System.Reflection.MethodInfo);
                            if (method == null) {
                                continue;
                            }
    
                            if ((method.t === 1) || (method.sy || false)) {
                                continue;
                            }
    
                            var isVueComputed = System.Linq.Enumerable.from(System.Attribute.getCustomAttributes(method, VueDemo.Extensions.VueComputedAttribute)).any();
                            if (!isVueComputed) {
                                continue;
                            }
    
                            config[method.sn] = method.td[method.sn];
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    return config;
                }
            }
        }; });
    
        Bridge.define("VueDemo.Components.HelloCmpProps", {
            fields: {
                name: null,
                initialEnthusiasm: 0
            }
        });
    
        Bridge.define("VueDemo.Components.RootCmpProps");
    
        /**
         * Only static methods are supported.
         *
         * @public
         * @class VueDemo.Extensions.VueComputedAttribute
         * @augments System.Attribute
         */
        Bridge.define("VueDemo.Extensions.VueComputedAttribute", {
            inherits: [System.Attribute]
        });
    
        /**
         * Only static methods are supported.
         *
         * @public
         * @class VueDemo.Extensions.VueMethodAttribute
         * @augments System.Attribute
         */
        Bridge.define("VueDemo.Extensions.VueMethodAttribute", {
            inherits: [System.Attribute]
        });
    
        Bridge.define("VueDemo.Index", {
            main: function Main () {
                var v = new vue (new VueDemo.Components.RootCmp("#app"));
            }
        });
    
        Bridge.define("VueDemo.Components.HelloCmpModel", {
            fields: {
                enthusiasm: 0
            }
        });
    
        Bridge.define("VueDemo.Components.RootCmpModel", {
            fields: {
                name: null
            }
        });
    
        Bridge.define("VueDemo.Components.HelloCmp", {
            inherits: [VueDemo.Extensions.VueComponent$2(VueDemo.Components.HelloCmpModel,VueDemo.Components.HelloCmpProps)],
            statics: {
                methods: {
                    Decrement: function () {
                        this.enthusiasm = (this.enthusiasm - 1) | 0;
                    },
                    Increment: function () {
                        this.enthusiasm = (this.enthusiasm + 1) | 0;
                    },
                    ExclamationMarks: function () {
                        return System.String.fromCharCount(33, this.enthusiasm);
                    }
                }
            },
            ctors: {
                ctor: function () {
                    this.$initialize();
                    VueDemo.Extensions.VueComponent$2(VueDemo.Components.HelloCmpModel,VueDemo.Components.HelloCmpProps).ctor.call(this);
                    this.template = "\r\n<div>\n    <div class=\"greeting\">Hello {{name}}{{ExclamationMarks}}</div>\n    <button @click=\"Decrement\">-</button>\n    <button @click=\"Increment\">+</button>\n</div>";
    
                    this.data = function () {
                        var $t;
                        return ($t = new VueDemo.Components.HelloCmpModel(), $t.enthusiasm = this.initialEnthusiasm, $t);
                    };
                }
            }
        });
    
        Bridge.define("VueDemo.Components.RootCmp", {
            inherits: [VueDemo.Extensions.VueComponent$2(VueDemo.Components.RootCmpModel,VueDemo.Components.RootCmpProps)],
            ctors: {
                ctor: function (rootEl) {
                    this.$initialize();
                    VueDemo.Extensions.VueComponent$2(VueDemo.Components.RootCmpModel,VueDemo.Components.RootCmpProps).ctor.call(this);
                    this.el = rootEl;
    
                    this.template = "\r\n<div>\r\n    Name:  <input v-model=\"name\" type=\"text\">\r\n    <HelloComponent :name=\"name\" :initialEnthusiasm=\"5\" />\r\n</div>";
    
                    this.data = function () {
                        var $t;
                        return ($t = new VueDemo.Components.RootCmpModel(), $t.name = "World", $t);
                    };
    
                    this.components = function (_o1) {
                            _o1.HelloComponent = new VueDemo.Components.HelloCmp();
                            return _o1;
                        }({ });
                }
            }
        });
        Bridge.init();
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJWdWVEZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJFeHRlbnNpb25zL1Z1ZUNvbXBvbmVudC5jcyIsIkluZGV4LmNzIiwiQ29tcG9uZW50cy9IZWxsb0NtcC5jcyIsIkNvbXBvbmVudHMvUm9vdENtcC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dCQTBJWUEsWUFBWUEsS0FBSUE7O3dCQUVoQkEseUJBQXlCQSw2QkFBT0EsWUFBbUJBO3dCQUNuREEsMEJBQXVCQTs7OztnQ0FFbkJBLFlBQVlBO2dDQUNaQSxJQUFJQSxTQUFTQSxRQUFRQSxDQUFDQTtvQ0FFbEJBLFVBQVVBO29DQUNWQTs7O2dDQUdKQSxXQUFXQTtnQ0FDWEEsSUFBSUEsUUFBUUE7b0NBRVJBLFVBQVVBLG9DQUF3QkE7Ozs7Ozs7O3dCQUkxQ0EsT0FBT0EsNEJBQW9FQSxjQUN0RkEsQUFBNkRBO3VDQUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQ0FsSHZDQTs7OztvQkFFaEJBLGFBQVFBOztvQkFFUkEsSUFBSUE7d0JBRUFBLGVBQVVBO3dCQUNWQSxnQkFBV0E7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBa0JmQSxvQkFBb0JBLHVEQUFxQkE7b0JBQ3pDQSxhQUFhQTs7b0JBRWJBLDBCQUF1QkE7Ozs7NEJBRW5CQSxhQUFhQTs0QkFDYkEsSUFBSUEsVUFBVUE7Z0NBRVZBOzs7NEJBR0pBLElBQUlBLG9CQUF3QkE7Z0NBR3hCQTs7OzRCQUdKQSxrQkFBa0JBLDRCQUFtQ0EsNkNBQTJCQSxBQUFPQTs0QkFDdkZBLElBQUlBLENBQUNBO2dDQUVEQTs7OzRCQUdKQSxPQUFPQSxhQUFxQkEsQUFBNkNBLFVBQXFCQTs7Ozs7OztvQkFHbEdBLE9BQU9BOzs7Ozs7Ozs7Ozs7O29CQVFQQSxvQkFBb0JBLHVEQUFxQkE7O29CQUV6Q0EsYUFBYUE7O29CQUViQSwwQkFBdUJBOzs7OzRCQUVuQkEsYUFBYUE7NEJBQ2JBLElBQUlBLFVBQVVBO2dDQUVWQTs7OzRCQUdKQSxJQUFJQSxvQkFBd0JBO2dDQUd4QkE7Ozs0QkFHSkEsb0JBQW9CQSw0QkFBbUNBLDZDQUEyQkEsQUFBT0E7NEJBQ3pGQSxJQUFJQSxDQUFDQTtnQ0FFREE7Ozs0QkFHSkEsT0FBT0EsYUFBcUJBLEFBQWNBLFVBQXFCQTs7Ozs7OztvQkFHbkVBLE9BQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkMxSFBBLFFBQVFBLGFBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JDZ0JaQTs7O3dCQU1BQTs7O3dCQU1BQSxPQUFPQSxnQ0FBZ0JBOzs7Ozs7OztvQkE1QnZCQSxnQkFBV0E7O29CQU9YQSxZQUFPQTs7K0JBQU1BLFVBQUlBLG9EQUVBQTs7Ozs7Ozs7O2dDQ1hOQTs7O29CQUVYQSxVQUFLQTs7b0JBRUxBLGdCQUFXQTs7b0JBTVhBLFlBQU9BOzsrQkFBTUEsVUFBSUE7OztvQkFFakJBLGtCQUFhQSxBQUFxREEsVUFBQ0E7NEJBQU9BLHFCQUF1QkEsSUFBSUE7NEJBQXlCQSxPQUFPQTswQkFBMUZBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uUmVmbGVjdGlvbjtcclxudXNpbmcgQnJpZGdlO1xyXG51c2luZyBSZXR5cGVkO1xyXG5cclxubmFtZXNwYWNlIFZ1ZURlbW8uRXh0ZW5zaW9uc1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gVnVlIGNvbXBvbmVuZW50IHdpdGggYSBzcGVjaWZpYyBNb2RlbCBhbmQgUHJvcGVydGllcyB0eXBlLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUTW9kZWxcIj5Nb2RlbCAoZGF0YSkgdHlwZTwvdHlwZXBhcmFtPlxyXG4gICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRQcm9wc1wiPlByb3BlcnRpZXMgdHlwZTwvdHlwZXBhcmFtPlxyXG4gICAgcHVibGljIGNsYXNzIFZ1ZUNvbXBvbmVudDxUTW9kZWwsIFRQcm9wcz4gOiB2dWUuQ29tcG9uZW50T3B0aW9uczx2dWUuVnVlLCB2dWUuRGVmYXVsdERhdGE8dnVlLlZ1ZT4sIHZ1ZS5EZWZhdWx0TWV0aG9kczx2dWUuVnVlPiwgdnVlLkRlZmF1bHRDb21wdXRlZCwgdnVlLlByb3BzRGVmaW5pdGlvbjxUUHJvcHM+LCBUUHJvcHM+XHJcbiAgICB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBPdmVycmlkZXMgPHNlZSBjcmVmPVwidnVlLkNvbXBvbmVudE9wdGlvbnN7VixEYXRhLE1ldGhvZHMsQ29tcHV0ZWQsUHJvcHNEZWYsUHJvcHN9LmRhdGFcIi8+IHdpdGggdGhlIGFjdHVhbCBtb2RlbCB0eXBlLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgW05hbWUoXCJkYXRhXCIpXVxyXG4gICAgICAgIHB1YmxpYyBuZXcgRnVuYzxUTW9kZWw+IGRhdGEgeyBwcml2YXRlIGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gTW9kZWwgaW5zdGFuY2UuIFNob3VsZCBiZSB1c2VkIGluIFtWdWVNZXRob2RzXS9bVnVlQ29tcHV0ZWRdIG1ldGhvZHMuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcm90ZWN0ZWQgc3RhdGljIGV4dGVybiBUTW9kZWwgTW9kZWxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFtUZW1wbGF0ZShcInRoaXNcIildXHJcbiAgICAgICAgICAgIGdldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUHJvcGVydGllcyBpbnN0YW5jZS4gU2hvdWxkIGJlIHVzZWQgaW4gW1Z1ZU1ldGhvZHNdL1tWdWVDb21wdXRlZF0gbWV0aG9kcy5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByb3RlY3RlZCBzdGF0aWMgZXh0ZXJuIFRQcm9wcyBQcm9wZXJ0aWVzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBbVGVtcGxhdGUoXCJ0aGlzXCIpXVxyXG4gICAgICAgICAgICBnZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIENyZWF0ZXMgYSBWdWUgY29tcG9uZW5lbnQgd2l0aCBhIHNwZWNpZmljIE1vZGVsIHR5cGUuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyZWdpc3Rlck1lbWJlcnNcIj5JZiB0cnVlLCBhdXRvbWF0aWNhbGx5IHJlZ2lzdGVycyBbVnVlTWV0aG9kc10vW1Z1ZUNvbXB1dGVkXSBtZXRob2RzLjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIFZ1ZUNvbXBvbmVudChib29sIHJlZ2lzdGVyTWVtYmVycyA9IHRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcm9wcyA9IEdldENtcFByb3BlcnR5TmFtZXMoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZWdpc3Rlck1lbWJlcnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZHMgPSBSZWdpc3Rlck1ldGhvZHMoKTtcclxuICAgICAgICAgICAgICAgIGNvbXB1dGVkID0gUmVnaXN0ZXJDb21wdXRlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIENvbnZlcnRzIGNvbXBvbmVudCBpbnRvIDxzZWUgY3JlZj1cInZ1ZS5Db21wb25lbnR7RGF0YSxNZXRob2RzLENvbXB1dGVkLFByb3BzfVwiLz4gdHlwZS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIFtUZW1wbGF0ZShcInt0aGlzfVwiKV1cclxuICAgICAgICBwdWJsaWMgZXh0ZXJuIHZ1ZS5Db21wb25lbnQ8b2JqZWN0LCBvYmplY3QsIG9iamVjdCwgb2JqZWN0PiBBc0NvbXBvbmVudCgpO1xyXG5cclxuICAgICAgICBbVGVtcGxhdGUoXCJuZXcgdnVlICh7dGhpc30pXCIpXVxyXG4gICAgICAgIHB1YmxpYyBleHRlcm4gdnVlLkNvbWJpbmVkVnVlSW5zdGFuY2U8dnVlLkRlZmF1bHREYXRhPHZ1ZS5WdWU+LCB2dWUuRGVmYXVsdE1ldGhvZHM8dnVlLlZ1ZT4sIHZ1ZS5EZWZhdWx0Q29tcHV0ZWQsIHZ1ZS5Qcm9wc0RlZmluaXRpb248dnVlLkRlZmF1bHRQcm9wcz4sIHZ1ZS5EZWZhdWx0UHJvcHM+IENyZWF0ZSgpO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIENvbGxlY3RzIGFuZCByZWdpc3RlcnMgU1RBVElDIG1ldGhvZHMgbWFya2VkIHdpdGggPHNlZSBjcmVmPVwiVnVlTWV0aG9kQXR0cmlidXRlXCIvPiBhdHRyaWJ1dGUuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcml2YXRlIHZ1ZS5EZWZhdWx0TWV0aG9kczx2dWUuVnVlPiBSZWdpc3Rlck1ldGhvZHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHB1YmxpY01lbWJlcnMgPSBHZXRUeXBlKCkuR2V0TWVtYmVycyhCaW5kaW5nRmxhZ3MuUHVibGljIHwgQmluZGluZ0ZsYWdzLlN0YXRpYyB8IEJpbmRpbmdGbGFncy5EZWNsYXJlZE9ubHkpO1xyXG4gICAgICAgICAgICB2YXIgY29uZmlnID0gbmV3IHZ1ZS5EZWZhdWx0TWV0aG9kczx2dWUuVnVlPigpO1xyXG5cclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIG1lbWJlciBpbiBwdWJsaWNNZW1iZXJzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWV0aG9kID0gbWVtYmVyIGFzIE1ldGhvZEluZm87XHJcbiAgICAgICAgICAgICAgICBpZiAobWV0aG9kID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZC5Jc0NvbnN0cnVjdG9yIHx8IG1ldGhvZC5Jc1NwZWNpYWxOYW1lKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNraXAgY29uc3RydWN0b3JzIGFuZCBzcGVjaWFsIG1ldGhvZHMuXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlzVnVlTWV0aG9kID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8b2JqZWN0PihtZXRob2QuR2V0Q3VzdG9tQXR0cmlidXRlcyh0eXBlb2YoVnVlTWV0aG9kQXR0cmlidXRlKSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1Z1ZU1ldGhvZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25maWdbbWV0aG9kLlNjcmlwdE5hbWVdID0gKHZ1ZS5EZWZhdWx0TWV0aG9kczx2dWUuVnVlPi5rZXlGbjx2dWUuVnVlPikgbWV0aG9kLkRlY2xhcmluZ1R5cGVbbWV0aG9kLlNjcmlwdE5hbWVdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBDb2xsZWN0cyBhbmQgcmVnaXN0ZXJzIFNUQVRJQyBtZXRob2RzIChmb3IgY29tcHV0ZWQgcHJvcGVydGllcykgbWFya2VkIHdpdGggPHNlZSBjcmVmPVwiVnVlQ29tcHV0ZWRBdHRyaWJ1dGVcIi8+IGF0dHJpYnV0ZS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByaXZhdGUgdnVlLkFjY2Vzc29yczx2dWUuRGVmYXVsdENvbXB1dGVkPiBSZWdpc3RlckNvbXB1dGVkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBwdWJsaWNNZW1iZXJzID0gR2V0VHlwZSgpLkdldE1lbWJlcnMoQmluZGluZ0ZsYWdzLlB1YmxpYyB8IEJpbmRpbmdGbGFncy5TdGF0aWMpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbmZpZyA9IG5ldyB2dWUuQWNjZXNzb3JzPHZ1ZS5EZWZhdWx0Q29tcHV0ZWQ+KCk7XHJcblxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgbWVtYmVyIGluIHB1YmxpY01lbWJlcnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZXRob2QgPSBtZW1iZXIgYXMgTWV0aG9kSW5mbztcclxuICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWV0aG9kLklzQ29uc3RydWN0b3IgfHwgbWV0aG9kLklzU3BlY2lhbE5hbWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2tpcCBjb25zdHJ1Y3RvcnMgYW5kIHNwZWNpYWwgbWV0aG9kcy5cclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaXNWdWVDb21wdXRlZCA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PG9iamVjdD4obWV0aG9kLkdldEN1c3RvbUF0dHJpYnV0ZXModHlwZW9mKFZ1ZUNvbXB1dGVkQXR0cmlidXRlKSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1Z1ZUNvbXB1dGVkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbmZpZ1ttZXRob2QuU2NyaXB0TmFtZV0gPSAoRnVuYzxvYmplY3Q+KW1ldGhvZC5EZWNsYXJpbmdUeXBlW21ldGhvZC5TY3JpcHROYW1lXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQ29sbGVjdHMgY29tcG9uZW50J3MgcHJvcGVydHkgbmFtZXNcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZ1ZS5BcnJheVByb3BzRGVmaW5pdGlvbjxUUHJvcHM+IEdldENtcFByb3BlcnR5TmFtZXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5hbWVzID0gbmV3IExpc3Q8c3RyaW5nPigpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHByb3BzRW50aXR5TWVtYmVycyA9IHR5cGVvZihUUHJvcHMpLkdldE1lbWJlcnMoQmluZGluZ0ZsYWdzLlB1YmxpYyB8IEJpbmRpbmdGbGFncy5JbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBtZW1iZXIgaW4gcHJvcHNFbnRpdHlNZW1iZXJzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmllbGQgPSBtZW1iZXIgYXMgRmllbGRJbmZvO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkICE9IG51bGwgJiYgIWZpZWxkLklzU3BlY2lhbE5hbWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZXMuQWRkKGZpZWxkLlNjcmlwdE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwcm9wID0gbWVtYmVyIGFzIFByb3BlcnR5SW5mbztcclxuICAgICAgICAgICAgICAgIGlmIChwcm9wICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZXMuQWRkKHByb3AuU2NyaXB0RmllbGROYW1lID8/IHByb3AuTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNlbGVjdDxzdHJpbmcsZ2xvYmFsOjpSZXR5cGVkLktleU9mPFRQcm9wcz4+KG5hbWVzXHJcbiwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxzdHJpbmcsIGdsb2JhbDo6UmV0eXBlZC5LZXlPZjxUUHJvcHM+PikoeCA9PiB4LkFzPEtleU9mPFRQcm9wcz4+KCkpKVxyXG4gICAgICAgICAgICAgICAgLlRvQXJyYXkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBWdWVEZW1vLkNvbXBvbmVudHM7XHJcblxyXG5uYW1lc3BhY2UgVnVlRGVtb1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgSW5kZXhcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdiA9IG5ldyBSb290Q21wKFwiI2FwcFwiKS5DcmVhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBWdWVEZW1vLkV4dGVuc2lvbnM7XHJcblxyXG5uYW1lc3BhY2UgVnVlRGVtby5Db21wb25lbnRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBIZWxsb0NtcCA6IFZ1ZUNvbXBvbmVudDxIZWxsb0NtcE1vZGVsLCBIZWxsb0NtcFByb3BzPlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBIZWxsb0NtcCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA9IEBcIlxyXG48ZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJcImdyZWV0aW5nXCJcIj5IZWxsbyB7e1wiICsgXCJuYW1lXCIrIEBcIn19e3tcIiArIFwiRXhjbGFtYXRpb25NYXJrc1wiKyBAXCJ9fTwvZGl2PlxuICAgIDxidXR0b24gQGNsaWNrPVwiXCJcIiArIFwiRGVjcmVtZW50XCIrIEBcIlwiXCI+LTwvYnV0dG9uPlxuICAgIDxidXR0b24gQGNsaWNrPVwiXCJcIiArIFwiSW5jcmVtZW50XCIrIEBcIlwiXCI+KzwvYnV0dG9uPlxuPC9kaXY+XCI7XHJcblxyXG4gICAgICAgICAgICBkYXRhID0gKCkgPT4gbmV3IEhlbGxvQ21wTW9kZWxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZW50aHVzaWFzbSA9IFByb3BlcnRpZXMuaW5pdGlhbEVudGh1c2lhc21cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFtWdWVNZXRob2RdXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERlY3JlbWVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBNb2RlbC5lbnRodXNpYXNtLS07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBbVnVlTWV0aG9kXVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBJbmNyZW1lbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTW9kZWwuZW50aHVzaWFzbSsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgW1Z1ZUNvbXB1dGVkXVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIEV4Y2xhbWF0aW9uTWFya3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBzdHJpbmcoJyEnLCBNb2RlbC5lbnRodXNpYXNtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhlbGxvQ21wTW9kZWxcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IGVudGh1c2lhc207XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhlbGxvQ21wUHJvcHNcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIG5hbWU7XHJcbiAgICAgICAgcHVibGljIGludCBpbml0aWFsRW50aHVzaWFzbTtcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBWdWVEZW1vLkV4dGVuc2lvbnM7XHJcblxyXG5uYW1lc3BhY2UgVnVlRGVtby5Db21wb25lbnRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBSb290Q21wIDogVnVlQ29tcG9uZW50PFJvb3RDbXBNb2RlbCwgUm9vdENtcFByb3BzPlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBSb290Q21wKHN0cmluZyByb290RWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbCA9IHJvb3RFbDtcclxuXHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gQFwiXHJcbjxkaXY+XHJcbiAgICBOYW1lOiAgPGlucHV0IHYtbW9kZWw9XCJcIlwiICsgXCJuYW1lXCIrIEBcIlwiXCIgdHlwZT1cIlwidGV4dFwiXCI+XHJcbiAgICA8SGVsbG9Db21wb25lbnQgOm5hbWU9XCJcIlwiICsgXCJuYW1lXCIrIEBcIlwiXCIgOmluaXRpYWxFbnRodXNpYXNtPVwiXCI1XCJcIiAvPlxyXG48L2Rpdj5cIjtcclxuXHJcbiAgICAgICAgICAgIGRhdGEgPSAoKSA9PiBuZXcgUm9vdENtcE1vZGVsIHsgbmFtZSA9IFwiV29ybGRcIn07XHJcblxyXG4gICAgICAgICAgICBjb21wb25lbnRzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IGNvbXBvbmVudHNDb25maWcoKSwoX28xKT0+e19vMVtcIkhlbGxvQ29tcG9uZW50XCJdPSBuZXcgSGVsbG9DbXAoKS5Bc0NvbXBvbmVudCgpO3JldHVybiBfbzE7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBSb290Q21wTW9kZWxcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIG5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFJvb3RDbXBQcm9wc1xyXG4gICAge1xyXG4gICAgfVxyXG59Il0KfQo=
