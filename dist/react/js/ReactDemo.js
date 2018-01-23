/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.7.0
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJSZWFjdERlbW8uanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkRlbW8uY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7O2dCQWNZQSxXQUFXQTs7Z0JBRVhBLGdCQUFnQkEsMEJBR0hBO29CQUFTQSx5QkFBeUJBLCtDQUFzQ0E7OztnQkFHckZBLGFBQWFBLG9CQUE0RUEsa0NBQXdCQTtnQkFDakhBLGdCQUFtRUEsUUFBUUE7Ozs7Ozs7Ozs7NEJBTXVCQSxPQUFPQSxBQUFPQTs7Ozs7Ozs7d0JBRXhGQSxPQUFPQTs7Ozs7d0JBSXpCQSxPQUFPQTs7O3dCQUNQQSxhQUFhQTs7Ozs7Z0NBR0NBOzsrQ0FDYkE7b0JBRVBBLGVBQVFBOzs7Ozs7O29CQU9SQSxrQkFDSUE7b0JBSUpBLGdCQUFnQkEsQUFBbUpBLGdCQUFtQ0EsYUFBYUE7OztvQkFHbk5BLGtCQUNJQSxTQUVZQSxXQUFJQSwyRUFJSkEsOEJBQ0dBLEFBQWtEQSxBQUF1R0E7NEJBRWhLQSxjQUEwRUEsU0FBb0JBOztvQkFHMUdBO29CQUNBQSxnQkFBZ0JBLEFBQStKQSxnQkFBbUNBOzs7b0JBR2xOQSxtQkFDSUEsU0FFWUEsV0FBSUEsNkhBTWNBLFVBRWRBLGlDQUEwQkEscUVBRTNCQSxpQ0FBMEJBLDhCQUMzQkEsQUFBa0RBLEFBQXVHQTs0QkFBS0Esb0JBQWFBOztvQkFFN0xBO29CQUNBQSxpQkFBaUJBLEFBQXFKQSxpQkFBb0NBOzs7b0JBRzFNQSxVQUFVQSxjQUFpQ0EsMEJBQXNHQSxtQkFDN0lBLFdBQ0FBLFdBQ0FBOztvQkFFSkEsT0FBT0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgU3lzdGVtO1xyXG51c2luZyBCcmlkZ2U7XHJcbnVzaW5nIFJldHlwZWQ7XHJcblxyXG5uYW1lc3BhY2UgUmVhY3REZW1vXHJcbntcclxuICAgIHVzaW5nIERpdkF0dHIgPSBIVE1MQXR0cmlidXRlczxIVE1MRGl2RWxlbWVudD47XHJcbiAgICB1c2luZyBJbnB1dEF0dHIgPSBDaGFuZ2VUYXJnZXRIVE1MQXR0cmlidXRlczxIVE1MSW5wdXRFbGVtZW50PjtcclxuICAgIHVzaW5nIEJ1dHRvbkF0dHIgPSBDaGFuZ2VUYXJnZXRIVE1MQXR0cmlidXRlczxIVE1MQnV0dG9uRWxlbWVudD47XHJcblxyXG4gICAgcHVibGljIGNsYXNzIERlbW9cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcm9vdCA9IFJldHlwZWQuZG9tLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JtUHJvcHMgPSBuZXcgTWVzc2FnZUVudHJ5Rm9ybS5Qcm9wc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBMYWJlbCA9IFwiVGV4dDpcIixcclxuICAgICAgICAgICAgICAgIE9uU2F2ZSA9IHZhbHVlID0+IFN5c3RlbS5Db25zb2xlLldyaXRlTGluZShzdHJpbmcuRm9ybWF0KFwiRW50ZXJlZCB2YWx1ZTogJ3swfScuXCIsdmFsdWUpKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGZvcm1FbCA9IFJldHlwZWQucmVhY3QuUmVhY3QuY3JlYXRlRWxlbWVudDxnbG9iYWw6OlJlYWN0RGVtby5NZXNzYWdlRW50cnlGb3JtLlByb3BzPihNZXNzYWdlRW50cnlGb3JtLkNsYXNzLCBmb3JtUHJvcHMpO1xyXG4gICAgICAgICAgICBSZXR5cGVkLnJlYWN0X2RvbS5yZW5kZXI8Z2xvYmFsOjpSZWFjdERlbW8uTWVzc2FnZUVudHJ5Rm9ybS5Qcm9wcz4oZm9ybUVsLCByb290KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIE1lc3NhZ2VFbnRyeUZvcm0gOiBSZXR5cGVkLnJlYWN0LlJlYWN0LkNvbXBvbmVudFxyXG48Z2xvYmFsOjpSZWFjdERlbW8uTWVzc2FnZUVudHJ5Rm9ybS5Qcm9wcyxnbG9iYWw6OlJlYWN0RGVtby5NZXNzYWdlRW50cnlGb3JtLlN0YXRlPiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBSZXR5cGVkLnJlYWN0LlJlYWN0LkNvbXBvbmVudENsYXNzIDxnbG9iYWw6OlJlYWN0RGVtby5NZXNzYWdlRW50cnlGb3JtLlByb3BzPkNsYXNzIHtnZXR7cmV0dXJuIHR5cGVvZihNZXNzYWdlRW50cnlGb3JtKS5BczxSZXR5cGVkLnJlYWN0LlJlYWN0LkNvbXBvbmVudENsYXNzPGdsb2JhbDo6UmVhY3REZW1vLk1lc3NhZ2VFbnRyeUZvcm0uUHJvcHM+PigpO319XHJcblxyXG4gICAgICAgIHB1YmxpYyBuZXcgUHJvcHMgcHJvcHMge2dldHtyZXR1cm4gYmFzZS5wcm9wcy5BczxQcm9wcz4oKTt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgbmV3IFN0YXRlIHN0YXRlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gYmFzZS5zdGF0ZS5BczxTdGF0ZT4oKTsgfVxyXG4gICAgICAgICAgICBzZXQgeyBiYXNlLnN0YXRlID0gdmFsdWUuQXM8ZXM1LlJlYWRvbmx5PFN0YXRlPj4oKTsgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHB1YmxpYyBNZXNzYWdlRW50cnlGb3JtKFByb3BzIHApXHJcbiAgICAgICAgICAgIDogYmFzZShwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RhdGUgPSBuZXcgU3RhdGUgeyBWYWx1ZSA9IFwiXCIgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFtOYW1lKFwicmVuZGVyXCIpXVxyXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLnJlYWN0LlJlYWN0LlJlYWN0RWxlbWVudCA8Z2xvYmFsOjpSZXR5cGVkLnJlYWN0LlJlYWN0LkhUTUxBdHRyaWJ1dGVzPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+PlJlbmRlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgbGFiZWw6XHJcbiAgICAgICAgICAgIEludGVyc2VjdGlvbjxSZXR5cGVkLnJlYWN0LlJlYWN0LkNsYXNzQXR0cmlidXRlczxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxMYWJlbEVsZW1lbnQ+LCBSZXR5cGVkLnJlYWN0LlJlYWN0LkhUTUxBdHRyaWJ1dGVzPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTExhYmVsRWxlbWVudD4+IGxhYmVsQ29uZmlnID1cclxuICAgICAgICAgICAgICAgIG5ldyBSZXR5cGVkLnJlYWN0LlJlYWN0LkNsYXNzQXR0cmlidXRlc1xyXG48Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MTGFiZWxFbGVtZW50PiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5ID0gXCJsYWJlbDFcIlxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIGxhYmVsTm9kZSA9IFJlYWN0RGVtby5FeHRlbnNpb25zLkFzTm9kZTxnbG9iYWw6OlJldHlwZWQucmVhY3QuUmVhY3QuSFRNTEF0dHJpYnV0ZXM8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MTGFiZWxFbGVtZW50PixnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxMYWJlbEVsZW1lbnQ+KFJldHlwZWQucmVhY3QuUmVhY3QuRE9NLmxhYmVsLlNlbGYobGFiZWxDb25maWcsIHByb3BzLkxhYmVsKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgaW5wdXQ6XHJcbiAgICAgICAgICAgIEludGVyc2VjdGlvbjxSZXR5cGVkLnJlYWN0LlJlYWN0LkNsYXNzQXR0cmlidXRlczxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnQ+LCBSZXR5cGVkLnJlYWN0LlJlYWN0LkNoYW5nZVRhcmdldEhUTUxBdHRyaWJ1dGVzPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTElucHV0RWxlbWVudD4+IGlucHV0Q29uZmlnID1cclxuICAgICAgICAgICAgICAgIG5ldyBSZXR5cGVkLnJlYWN0LlJlYWN0LkNoYW5nZVRhcmdldEhUTUxBdHRyaWJ1dGVzXHJcbjxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnQ+ICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IG5ldyBSZXR5cGVkLnJlYWN0LlJlYWN0LkNTU1Byb3BlcnRpZXNcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQgPSAyMCxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gc3RhdGUuVmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2UgPSBIYW5kbGVyLkNoYW5nZUV2ZW50PFJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnQ+KChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpSZXR5cGVkLnJlYWN0LlJlYWN0LkNoYW5nZUV2ZW50PGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTElucHV0RWxlbWVudD4+KShlID0+XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTdGF0ZTxnbG9iYWw6OlJldHlwZWQuS2V5T2Y8Z2xvYmFsOjpSZWFjdERlbW8uTWVzc2FnZUVudHJ5Rm9ybS5TdGF0ZT4+KG5ldyBTdGF0ZSB7IFZhbHVlID0gZS5jdXJyZW50VGFyZ2V0LlR5cGUyLnZhbHVlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpbnB1dENvbmZpZy5UeXBlMS5rZXkgPSBcImlucHV0MVwiO1xyXG4gICAgICAgICAgICB2YXIgaW5wdXROb2RlID0gUmVhY3REZW1vLkV4dGVuc2lvbnMuQXNOb2RlPGdsb2JhbDo6UmV0eXBlZC5yZWFjdC5SZWFjdC5DaGFuZ2VUYXJnZXRIVE1MQXR0cmlidXRlczxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnQ+LGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTElucHV0RWxlbWVudD4oUmV0eXBlZC5yZWFjdC5SZWFjdC5ET00uaW5wdXQuU2VsZihpbnB1dENvbmZpZykpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGJ1dHRvbjpcclxuICAgICAgICAgICAgSW50ZXJzZWN0aW9uPFJldHlwZWQucmVhY3QuUmVhY3QuQ2xhc3NBdHRyaWJ1dGVzPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQ+LCBSZXR5cGVkLnJlYWN0LlJlYWN0LkhUTUxBdHRyaWJ1dGVzPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQ+PiBidXR0b25Db25maWcgPVxyXG4gICAgICAgICAgICAgICAgbmV3IFJldHlwZWQucmVhY3QuUmVhY3QuSFRNTEF0dHJpYnV0ZXNcclxuPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQ+ICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IG5ldyBSZXR5cGVkLnJlYWN0LlJlYWN0LkNTU1Byb3BlcnRpZXNcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IDI4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IDE1MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luTGVmdCA9IDIwLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwgPSBuZXcgUmV0eXBlZC5yZWFjdC5SZWFjdC5ET01BdHRyaWJ1dGVzPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQ+LmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MQ29uZmlnKClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9faHRtbCA9c3RyaW5nLklzTnVsbE9yV2hpdGVTcGFjZShzdGF0ZS5WYWx1ZSkgPyBcIkVudGVyIHRleHRcIiA6IFwiUHJpbnQgdG8gQ29uc29sZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPSBzdHJpbmcuSXNOdWxsT3JXaGl0ZVNwYWNlKHN0YXRlLlZhbHVlKSxcclxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrID0gSGFuZGxlci5Nb3VzZUV2ZW50PFJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50PigoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6UmV0eXBlZC5yZWFjdC5SZWFjdC5Nb3VzZUV2ZW50PGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQ+PikoZSA9PiBwcm9wcy5PblNhdmUoc3RhdGUuVmFsdWUpKSlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGJ1dHRvbkNvbmZpZy5UeXBlMS5rZXkgPSBcImJ1dHRvbjFcIjtcclxuICAgICAgICAgICAgdmFyIGJ1dHRvbk5vZGUgPSBSZWFjdERlbW8uRXh0ZW5zaW9ucy5Bc05vZGU8Z2xvYmFsOjpSZXR5cGVkLnJlYWN0LlJlYWN0LkhUTUxBdHRyaWJ1dGVzPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQ+LGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQ+KFJldHlwZWQucmVhY3QuUmVhY3QuRE9NLmJ1dHRvbi5TZWxmKGJ1dHRvbkNvbmZpZykpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGRpdjpcclxuICAgICAgICAgICAgdmFyIGRpdiA9IFJldHlwZWQucmVhY3QuUmVhY3QuRE9NLmRpdi5TZWxmKG5ldyBSZXR5cGVkLnJlYWN0LlJlYWN0LkhUTUxBdHRyaWJ1dGVzIDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PnsgY2xhc3NOYW1lID0gXCJ3cmFwcGVyXCIgfSwgbmV3IFtdIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsTm9kZSxcclxuICAgICAgICAgICAgICAgIGlucHV0Tm9kZSxcclxuICAgICAgICAgICAgICAgIGJ1dHRvbk5vZGV9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkaXY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBbT2JqZWN0TGl0ZXJhbF1cclxuICAgICAgICBwdWJsaWMgY2xhc3MgUHJvcHNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdHJpbmcgTGFiZWw7XHJcbiAgICAgICAgICAgIHB1YmxpYyBBY3Rpb248c3RyaW5nPiBPblNhdmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBbT2JqZWN0TGl0ZXJhbF1cclxuICAgICAgICBwdWJsaWMgY2xhc3MgU3RhdGUgOiBlczUuUGljazxTdGF0ZSwgS2V5T2Y8U3RhdGU+PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHN0cmluZyBWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgW0V4dGVybmFsXVxyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBFeHRlbnNpb25zXHJcbiAgICB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBDb252ZXJ0cyBET01FbGVtZW50IC0+IFJlYWN0Tm9kZS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIFtUZW1wbGF0ZShcInswfVwiKV1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGV4dGVybiBSZXR5cGVkLnJlYWN0LlJlYWN0LlJlYWN0Tm9kZSBBc05vZGU8UCwgVD4odGhpcyBSZXR5cGVkLnJlYWN0LlJlYWN0LkRPTUVsZW1lbnQgPFAsVD5lbClcclxuICAgICAgICAgICAgd2hlcmUgUCA6IFJldHlwZWQucmVhY3QuUmVhY3QuRE9NQXR0cmlidXRlc1xyXG48VD4gICAgICAgICAgICB3aGVyZSBUIDogUmV0eXBlZC5kb20uRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBbRXh0ZXJuYWxdXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEhhbmRsZXJcclxuICAgIHtcclxuICAgICAgICBbVGVtcGxhdGUoXCJ7MH1cIildXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBleHRlcm4gUmV0eXBlZC5yZWFjdC5SZWFjdC5DaGFuZ2VFdmVudEhhbmRsZXIgPFRFbGVtZW50PkNoYW5nZUV2ZW50PFRFbGVtZW50PihBY3Rpb248UmV0eXBlZC5yZWFjdC5SZWFjdC5DaGFuZ2VFdmVudDxURWxlbWVudD4+IGFjdGlvbik7XHJcblxyXG4gICAgICAgIFtUZW1wbGF0ZShcInswfVwiKV1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGV4dGVybiBSZXR5cGVkLnJlYWN0LlJlYWN0Lk1vdXNlRXZlbnRIYW5kbGVyIDxURWxlbWVudD5Nb3VzZUV2ZW50PFRFbGVtZW50PihBY3Rpb248UmV0eXBlZC5yZWFjdC5SZWFjdC5Nb3VzZUV2ZW50PFRFbGVtZW50Pj4gYWN0aW9uKTtcclxuICAgIH1cclxufVxyXG4iXQp9Cg==
