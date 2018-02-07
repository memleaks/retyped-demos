/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.7.1
 */
Bridge.assembly("ReactDemo", function ($asm, globals) {
    "use strict";

    require(["react","react-dom"], function (React,ReactDOM) {
        Bridge.define("ReactDemo.Demo", {
            main: function Main () {
                var root = document.getElementById("root");
    
                var formProps = { Label: "Text:", OnSave: function (value) {
                    System.Console.WriteLine(System.String.format("Entered value: '{0}'.", [value]));
                } };
    
                var formEl = React.createElement(ReactDemo.MessageEntryForm.Class, formProps);
                ReactDOM.render(formEl, root);
            }
        });
    
        Bridge.define("ReactDemo.MessageEntryForm", {
            inherits: [React.Component],
            statics: {
                props: {
                    Class: {
                        get: function () {
                            return ReactDemo.MessageEntryForm;
                        }
                    }
                }
            },
            props: {
                props$1: {
                    get: function () {
                        return this.props;
                    }
                },
                state$1: {
                    get: function () {
                        return this.state;
                    },
                    set: function (value) {
                        this.state = value;
                    }
                }
            },
            ctors: {
                ctor: function (p) {
                    this.$initialize();
                    React.Component.call(this, p);
                    this.state$1 = { Value: "" };
                }
            },
            methods: {
                render: function () {
                    var $t;
                    // Create label:
                    var labelConfig = { key: "label1" };
                    var labelNode = React.DOM.label(labelConfig, this.props$1.Label);
    
                    // Create input:
                    var inputConfig = { style: ($t = new (Bridge.virtualc("React.CSSProperties"))(), $t.marginLeft = 20, $t), value: this.state$1.Value, onChange: Bridge.fn.bind(this, function (e) {
                            this.setState({ Value: e.currentTarget.value });
                        }) };
                    inputConfig.key = "input1";
                    var inputNode = React.DOM.input(inputConfig, null);
    
                    // Create button:
                    var buttonConfig = { style: ($t = new (Bridge.virtualc("React.CSSProperties"))(), $t.height = 28, $t.width = 150, $t.marginLeft = 20, $t), dangerouslySetInnerHTML: { __html: System.String.isNullOrWhiteSpace(this.state$1.Value) ? "Enter text" : "Print to Console" }, disabled: System.String.isNullOrWhiteSpace(this.state$1.Value), onClick: Bridge.fn.bind(this, function (e) {
                            this.props$1.OnSave(this.state$1.Value);
                        }) };
                    buttonConfig.key = "button1";
                    var buttonNode = React.DOM.button(buttonConfig, null);
    
                    // Create div:
                    var div = React.DOM.div({ className: "wrapper" }, System.Array.init([labelNode, inputNode, buttonNode], Bridge.virtualc("React.ReactNode")));
    
                    return div;
                }
            }
        });
        Bridge.init();
    });
});
