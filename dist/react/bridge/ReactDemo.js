/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 17.0.0
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
                        return Bridge.ensureBaseProperty(this, "props", "React$Component").$React$Component$props;
                    },
                    set: function (value) {
                        Bridge.ensureBaseProperty(this, "props", "React$Component").$React$Component$props = value;
                    }
                },
                state$1: {
                    get: function () {
                        return Bridge.ensureBaseProperty(this, "state", "React$Component").$React$Component$state;
                    },
                    set: function (value) {
                        Bridge.ensureBaseProperty(this, "state", "React$Component").$React$Component$state = value;
                    }
                }
            },
            ctors: {
                ctor: function (p) {
                    this.$initialize();
                    React.Component.call(this, p);
                    this.state$1 = { Value: "" };
                    this.props$1 = p;
                }
            },
            methods: {
                render: function () {
                    // Create label:
                    var labelConfig = { key: "label1" };
    
                    var labelNode = React.createElement("label", labelConfig);
    
    
                    // Create input:
                    var inputConfig = { style: { marginLeft: 20 }, value: this.state$1.Value, onChange: Bridge.fn.bind(this, function (e) {
                            this.state$1 = { Value: e.target.value };
                            this.setState(this.state$1);
                            //System.Console.WriteLine(e.target.Type2.value);
                            //System.Console.WriteLine(state.Value);
                        }) };
                    inputConfig.key = "input1";
                    var inputNode = React.createElement("input", inputConfig);
    
                    // Create button:
                    var buttonConfig = { style: { height: 28, width: 150, marginLeft: 20 }, dangerouslySetInnerHTML: { __html: System.String.isNullOrWhiteSpace(this.state$1.Value) ? "Enter text" : "Print to Console" }, disabled: System.String.isNullOrWhiteSpace(this.state$1.Value), onClick: Bridge.fn.bind(this, function (e) {
                            this.props$1.OnSave(this.state$1.Value);
                        }) };
                    buttonConfig.key = "button1";
                    var buttonNode = React.createElement("button", buttonConfig);
    
                    // Create div:
                    var divConfig = { className: "wrapper" };
    
                    var div = React.createElement.apply(React, ["div", divConfig].concat(System.Array.init([labelNode, inputNode, buttonNode], Bridge.virtualc("React.ReactNode"))));
    
                    return div;
                }
            }
        });
        Bridge.init();
    });
});
