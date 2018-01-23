/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 16.7.0
 */
Bridge.assembly("VueDemo", function ($asm, globals) {
    "use strict";

    require(["vue.js"], function (vue_js) {
        /** @namespace System */
    
        /**
         * @memberof System
         * @callback System.Func
         * @return  {TModel}
         */
    
        /** @namespace VueDemo.Extensions */
    
        /**
         * Vue componenent with a specific Model type.
         *
         * @public
         * @class VueDemo.Extensions.VueComponent$1
         * @augments System.Object
         * @param   {Function}    [name]    Model (data) type
         */
        Bridge.define("VueDemo.Extensions.VueComponent$1", function (TModel) { return {
            fields: {
                /**
                 * Overrides {@link } with the actual model type.
                 *
                 * @instance
                 * @public
                 * @memberof VueDemo.Extensions.VueComponent$1
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
                 * @this VueDemo.Extensions.VueComponent$1
                 * @memberof VueDemo.Extensions.VueComponent$1
                 * @param   {boolean}    registerMembers    If true, automatically registers [VueMethods]/[VueComputed] methods.
                 * @return  {void}
                 */
                ctor: function (registerMembers) {
                    if (registerMembers === void 0) { registerMembers = true; }
    
                    this.$initialize();
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
                 * @this VueDemo.Extensions.VueComponent$1
                 * @memberof VueDemo.Extensions.VueComponent$1
                 * @return  {System.Object}
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
                                // Skip constructors and special methods.
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
                            $t.System$IDisposable$dispose();
                        }
                    }
                    return config;
                },
                /**
                 * Collects and registers STATIC methods (for computed properties) marked with {@link } attribute.
                 *
                 * @instance
                 * @private
                 * @this VueDemo.Extensions.VueComponent$1
                 * @memberof VueDemo.Extensions.VueComponent$1
                 * @return  {System.Object}
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
                                // Skip constructors and special methods.
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
                            $t.System$IDisposable$dispose();
                        }
                    }
                    return config;
                }
            }
        }; });
    
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
                var v = new vue_js(new VueDemo.Components.RootCmp("#app"));
            }
        });
    
        /**
         * Vue componenent with a specific Model and Properties type.
         *
         * @public
         * @class VueDemo.Extensions.VueComponent$2
         * @augments VueDemo.Extensions.VueComponent$1
         * @param   {Function}    [name]    Model (data) type
         * @param   {Function}    [name]    Properties type
         */
        Bridge.define("VueDemo.Extensions.VueComponent$2", function (TModel, TProperties) { return {
            inherits: [VueDemo.Extensions.VueComponent$1(TModel)],
            statics: {
                methods: {
                    /**
                     * Collects component's property names
                     *
                     * @static
                     * @private
                     * @this VueDemo.Extensions.VueComponent$2
                     * @memberof VueDemo.Extensions.VueComponent$2
                     * @return  {Array.<string>}
                     */
                    GetCmpPropertyNames: function () {
                        var $t, $t1;
                        var names = new (System.Collections.Generic.List$1(System.String)).ctor();
    
                        var propsEntityMembers = Bridge.Reflection.getMembers(TProperties, 31, 20);
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
                                $t.System$IDisposable$dispose();
                            }
                        }
                        return names.toArray();
                    }
                }
            },
            ctors: {
                /**
                 * Creates a Vue componenent with a specific Model and Properties type.
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
                    VueDemo.Extensions.VueComponent$1(TModel).ctor.call(this, registerMembers);
                    this.props = VueDemo.Extensions.VueComponent$2(TModel,TProperties).GetCmpPropertyNames();
                }
            }
        }; });
    
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
    
        Bridge.define("VueDemo.Components.HelloCmpProps", {
            fields: {
                name: null,
                initialEnthusiasm: 0
            }
        });
    
        Bridge.define("VueDemo.Components.RootCmp", {
            inherits: [VueDemo.Extensions.VueComponent$1(VueDemo.Components.RootCmpModel)],
            ctors: {
                ctor: function (rootEl) {
                    this.$initialize();
                    VueDemo.Extensions.VueComponent$1(VueDemo.Components.RootCmpModel).ctor.call(this);
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
        Bridge.init();
    });
});
