/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 16.3.2
 */
Bridge.assembly("GranularDemo", function ($asm, globals) {
    "use strict";

    /** @namespace GranularDemo */

    /**
     * Interaction logic for App.xaml
     *
     * @public
     * @class GranularDemo.App
     * @augments System.Windows.Application
     */
    Bridge.define("GranularDemo.App", {
        inherits: [System.Windows.Application],
        main: function Main () {
            System.Windows.ApplicationHost.Current.System$Windows$IApplicationHost$Run($asm.$.GranularDemo.App.f1);
        },
        methods: {
            InitializeComponent: function () {
                System.Windows.Application.LoadComponent$1(this, Granular.Compatibility.Uri.CreateAbsoluteUri("pack://application:,,,/GranularDemo;component/App.xaml"));
            }
        }
    });

    Bridge.ns("GranularDemo.App", $asm.$);

    Bridge.apply($asm.$.GranularDemo.App, {
        f1: function () {
            var application = new GranularDemo.App();
            application.InitializeComponent();
            application.Run();
        }
    });

    /**
     * Interaction logic for MainWindow.xaml
     *
     * @public
     * @class GranularDemo.MainWindow
     * @augments System.Windows.Window
     */
    Bridge.define("GranularDemo.MainWindow", {
        inherits: [System.Windows.Window],
        fields: {
            _count: 0,
            sayBtn: null
        },
        ctors: {
            init: function () {
                this._count = 1;
            },
            ctor: function () {
                this.$initialize();
                System.Windows.Window.ctor.call(this);
                this.InitializeComponent();
            }
        },
        methods: {
            Button_Click: function (sender, e) {
                var domProxy = GranularDemo.Shared.Resolver.Resolve(GranularDemo.Shared.Interfaces.IDomProxy);

                domProxy.GranularDemo$Shared$Interfaces$IDomProxy$Alert("Hello, World! #" + this._count);

                this._count = (this._count + 1) | 0;
                var btn = Bridge.cast(sender, System.Windows.Controls.Button);
                var btnText = Bridge.cast(btn.Content, System.String);
                domProxy.GranularDemo$Shared$Interfaces$IDomProxy$UpdateBtnText(btn.Name, (btnText || "") + " #" + this._count);
            },
            InitializeComponent: function () {
                System.Windows.Application.LoadComponent$1(this, Granular.Compatibility.Uri.CreateAbsoluteUri("pack://application:,,,/GranularDemo;component/MainWindow.xaml"));
            }
        }
    });

    Bridge.define("GranularDemo.Shared.Interfaces.IDomProxy", {
        $kind: "interface"
    });

    Bridge.define("GranularDemo.Shared.Resolver", {
        statics: {
            fields: {
                RegisteredTypes: null
            },
            ctors: {
                init: function () {
                    this.RegisteredTypes = new (System.Collections.Generic.Dictionary$2(Function,Function))();
                },
                ctor: function () {
                    // Register interface implementations:
                    GranularDemo.Shared.Resolver.Register(GranularDemo.Shared.Interfaces.IDomProxy, GranularDemo.Shared.Internal.DomProxy);
                }
            },
            methods: {
                Register: function (TInterface, TImplementation) {
                    GranularDemo.Shared.Resolver.RegisteredTypes.set(TInterface, TImplementation);
                },
                Resolve: function (TInterface) {
                    var implType = { };
                    if (!GranularDemo.Shared.Resolver.RegisteredTypes.tryGetValue(TInterface, implType)) {
                        return Bridge.getDefaultValue(TInterface);
                    }

                    return Bridge.cast(Bridge.unbox(Bridge.createInstance(implType.v)), TInterface);
                }
            }
        }
    });

    Bridge.define("GranularDemo.Shared.Internal.DomProxy", {
        inherits: [GranularDemo.Shared.Interfaces.IDomProxy],
        alias: [
            "Alert", "GranularDemo$Shared$Interfaces$IDomProxy$Alert",
            "UpdateBtnText", "GranularDemo$Shared$Interfaces$IDomProxy$UpdateBtnText"
        ],
        methods: {
            Alert: function (msg) {
                alert(msg);
            },
            UpdateBtnText: function (buttonId, text) {
                var btn = jQuery("#" + (buttonId || ""));
                var contentDiv = btn.find("contentpresenter textblock div");
                contentDiv.html(text);
            }
        }
    });
});
