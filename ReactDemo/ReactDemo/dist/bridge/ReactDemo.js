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
                    var labelConfig = { key: "label1" };
    
                    var labelNode = React.createElement("label", labelConfig);
    
    
                    var inputConfig = { style: { marginLeft: 20 }, value: this.state$1.Value, onChange: Bridge.fn.bind(this, function (e) {
                            this.state$1 = { Value: e.target.value };
                            this.setState(this.state$1);
                        }) };
                    inputConfig.key = "input1";
                    var inputNode = React.createElement("input", inputConfig);
    
                    var buttonConfig = { style: { height: 28, width: 150, marginLeft: 20 }, dangerouslySetInnerHTML: { __html: System.String.isNullOrWhiteSpace(this.state$1.Value) ? "Enter text" : "Print to Console" }, disabled: System.String.isNullOrWhiteSpace(this.state$1.Value), onClick: Bridge.fn.bind(this, function (e) {
                            this.props$1.OnSave(this.state$1.Value);
                        }) };
                    buttonConfig.key = "button1";
                    var buttonNode = React.createElement("button", buttonConfig);
    
                    var divConfig = { className: "wrapper" };
    
                    var div = React.createElement.apply(React, ["div", divConfig].concat(System.Array.init([labelNode, inputNode, buttonNode], Bridge.virtualc("React.ReactNode"))));
    
                    return div;
                }
            }
        });
        Bridge.init();
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJSZWFjdERlbW8uanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkRlbW8uY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7O2dCQVVZQSxXQUFXQTs7Z0JBRVhBLGdCQUFnQkEsMEJBR0hBO29CQUFTQSx5QkFBeUJBLCtDQUFzQ0E7OztnQkFHckZBLGFBQWFBLG9CQUE0RUEsa0NBQXdCQTtnQkFDakhBLGdCQUF3RUEsUUFBUUE7Ozs7Ozs7Ozs7NEJBTWtCQSxPQUFPQSxBQUFPQTs7Ozs7Ozs7d0JBSTFHQSxPQUFPQTs7O3dCQUNQQSxxRkFBYUE7Ozs7O3dCQUtiQSxPQUFPQTs7O3dCQUNQQSxxRkFBYUE7Ozs7O2dDQUdDQTs7K0NBQ2JBO29CQUVQQSxlQUFRQTtvQkFDUkEsZUFBUUE7Ozs7O29CQU9SQSxrQkFDSUE7O29CQUtKQSxnQkFBZ0JBLEFBQW1KQSw2QkFBa0tBOzs7b0JBSXJVQSxrQkFDSUEsU0FFWUEsY0FFU0EsYUFFVEEsOEJBQ0dBLEFBQWtEQSxBQUF1R0E7NEJBRWhLQSxlQUFRQSxTQUFvQkE7NEJBQzVCQSxjQUF1QkE7O29CQUtuQ0E7b0JBQ0FBLGdCQUFnQkEsQUFBd0pBLDZCQUF1S0E7O29CQUcvVUEsbUJBQ0lBLFNBRVlBLFVBRUtBLFdBQ0RBLGlCQUNLQSwrQkFFU0EsVUFFZEEsaUNBQTBCQSxxRUFFM0JBLGlDQUEwQkEsOEJBQzNCQSxBQUFrREEsQUFBdUdBOzRCQUUvSkEsb0JBQWFBOztvQkFHekJBO29CQUNBQSxpQkFBaUJBLEFBQTJKQSw4QkFBMktBOztvQkFHdlZBLGdCQUNJQTs7b0JBS0pBLFVBQVVBLHlDQUE0SkEsa0JBQVdBLG1CQUU3S0EsV0FDQUEsV0FDQUE7O29CQUdKQSxPQUFPQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIEJyaWRnZTtcclxudXNpbmcgUmV0eXBlZDtcclxuXHJcbm5hbWVzcGFjZSBSZWFjdERlbW9cclxue1xyXG4gICAgcHVibGljIGNsYXNzIERlbW9cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcm9vdCA9IFJldHlwZWQuZG9tLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JtUHJvcHMgPSBuZXcgTWVzc2FnZUVudHJ5Rm9ybS5Qcm9wc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBMYWJlbCA9IFwiVGV4dDpcIixcclxuICAgICAgICAgICAgICAgIE9uU2F2ZSA9IHZhbHVlID0+IFN5c3RlbS5Db25zb2xlLldyaXRlTGluZShzdHJpbmcuRm9ybWF0KFwiRW50ZXJlZCB2YWx1ZTogJ3swfScuXCIsdmFsdWUpKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGZvcm1FbCA9IFJldHlwZWQucmVhY3QuUmVhY3QuY3JlYXRlRWxlbWVudDxnbG9iYWw6OlJlYWN0RGVtby5NZXNzYWdlRW50cnlGb3JtLlByb3BzPihNZXNzYWdlRW50cnlGb3JtLkNsYXNzLCBmb3JtUHJvcHMpO1xyXG4gICAgICAgICAgICBSZXR5cGVkLnJlYWN0X2RvbS5yZW5kZXIuU2VsZjxnbG9iYWw6OlJlYWN0RGVtby5NZXNzYWdlRW50cnlGb3JtLlByb3BzPihmb3JtRWwsIHJvb3QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgTWVzc2FnZUVudHJ5Rm9ybSA6IFJldHlwZWQucmVhY3QuUmVhY3QuQ29tcG9uZW50XHJcbjxnbG9iYWw6OlJlYWN0RGVtby5NZXNzYWdlRW50cnlGb3JtLlByb3BzLGdsb2JhbDo6UmVhY3REZW1vLk1lc3NhZ2VFbnRyeUZvcm0uU3RhdGU+ICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFJldHlwZWQucmVhY3QuUmVhY3QuQ29tcG9uZW50Q2xhc3MgPGdsb2JhbDo6UmVhY3REZW1vLk1lc3NhZ2VFbnRyeUZvcm0uUHJvcHM+Q2xhc3Mge2dldHtyZXR1cm4gdHlwZW9mKE1lc3NhZ2VFbnRyeUZvcm0pLkFzPFJldHlwZWQucmVhY3QuUmVhY3QuQ29tcG9uZW50Q2xhc3M8Z2xvYmFsOjpSZWFjdERlbW8uTWVzc2FnZUVudHJ5Rm9ybS5Qcm9wcz4+KCk7fX1cclxuXHJcbiAgICAgICAgcHVibGljIG5ldyBQcm9wcyBwcm9wc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGJhc2UucHJvcHMuQXM8UHJvcHM+KCk7IH1cclxuICAgICAgICAgICAgc2V0IHsgYmFzZS5wcm9wcyA9IHZhbHVlLkFzPGVzNS5SZWFkb25seTxQcm9wcz4+KCk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBuZXcgU3RhdGUgc3RhdGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBiYXNlLnN0YXRlLkFzPFN0YXRlPigpOyB9XHJcbiAgICAgICAgICAgIHNldCB7IGJhc2Uuc3RhdGUgPSB2YWx1ZS5BczxlczUuUmVhZG9ubHk8U3RhdGU+PigpOyB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcHVibGljIE1lc3NhZ2VFbnRyeUZvcm0oUHJvcHMgcClcclxuICAgICAgICAgICAgOiBiYXNlKHApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGF0ZSA9IG5ldyBTdGF0ZSB7IFZhbHVlID0gXCJcIiB9O1xyXG4gICAgICAgICAgICBwcm9wcyA9IHA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBbTmFtZShcInJlbmRlclwiKV1cclxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5yZWFjdC5SZWFjdC5SZWFjdEVsZW1lbnQgPGdsb2JhbDo6UmV0eXBlZC5yZWFjdC5SZWFjdC5IVE1MQXR0cmlidXRlczxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50Pj5SZW5kZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGxhYmVsOlxyXG4gICAgICAgICAgICBJbnRlcnNlY3Rpb248UmV0eXBlZC5yZWFjdC5SZWFjdC5DbGFzc0F0dHJpYnV0ZXM8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MTGFiZWxFbGVtZW50PiwgUmV0eXBlZC5yZWFjdC5SZWFjdC5IVE1MQXR0cmlidXRlczxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxMYWJlbEVsZW1lbnQ+PiBsYWJlbENvbmZpZyA9XHJcbiAgICAgICAgICAgICAgICBuZXcgUmV0eXBlZC5yZWFjdC5SZWFjdC5DbGFzc0F0dHJpYnV0ZXNcclxuPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTExhYmVsRWxlbWVudD4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IFwibGFiZWwxXCJcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgbGFiZWxOb2RlID0gUmVhY3REZW1vLkV4dGVuc2lvbnMuQXNOb2RlPGdsb2JhbDo6UmV0eXBlZC5yZWFjdC5SZWFjdC5IVE1MQXR0cmlidXRlczxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxMYWJlbEVsZW1lbnQ+LGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTExhYmVsRWxlbWVudD4oUmV0eXBlZC5yZWFjdC5SZWFjdC5jcmVhdGVFbGVtZW50PGdsb2JhbDo6UmV0eXBlZC5yZWFjdC5SZWFjdC5IVE1MQXR0cmlidXRlczxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxMYWJlbEVsZW1lbnQ+LGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTExhYmVsRWxlbWVudD4oXCJsYWJlbFwiLCBsYWJlbENvbmZpZykpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBpbnB1dDpcclxuICAgICAgICAgICAgSW50ZXJzZWN0aW9uPFJldHlwZWQucmVhY3QuUmVhY3QuQ2xhc3NBdHRyaWJ1dGVzPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTElucHV0RWxlbWVudD4sIFJldHlwZWQucmVhY3QuUmVhY3QuSW5wdXRIVE1MQXR0cmlidXRlczxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnQ+PiBpbnB1dENvbmZpZyA9XHJcbiAgICAgICAgICAgICAgICBuZXcgUmV0eXBlZC5yZWFjdC5SZWFjdC5JbnB1dEhUTUxBdHRyaWJ1dGVzXHJcbjxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnQ+ICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IG5ldyBSZXR5cGVkLnJlYWN0LlJlYWN0LkNTU1Byb3BlcnRpZXNcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQgPSAoVW5pb248c3RyaW5nLCBkb3VibGU+KSAyMFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBzdGF0ZS5WYWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZSA9IEhhbmRsZXIuQ2hhbmdlRXZlbnQ8UmV0eXBlZC5kb20uSFRNTElucHV0RWxlbWVudD4oKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlJldHlwZWQucmVhY3QuUmVhY3QuQ2hhbmdlRXZlbnQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MSW5wdXRFbGVtZW50Pj4pKGUgPT5cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gbmV3IFN0YXRlIHsgVmFsdWUgPSBlLnRhcmdldC5UeXBlMi52YWx1ZSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTdGF0ZTxLZXlPZjxTdGF0ZT4+KHN0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9TeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoZS50YXJnZXQuVHlwZTIudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1N5c3RlbS5Db25zb2xlLldyaXRlTGluZShzdGF0ZS5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpbnB1dENvbmZpZy5UeXBlMS5rZXkgPSBcImlucHV0MVwiO1xyXG4gICAgICAgICAgICB2YXIgaW5wdXROb2RlID0gUmVhY3REZW1vLkV4dGVuc2lvbnMuQXNOb2RlPGdsb2JhbDo6UmV0eXBlZC5yZWFjdC5SZWFjdC5JbnB1dEhUTUxBdHRyaWJ1dGVzPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTElucHV0RWxlbWVudD4sZ2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MSW5wdXRFbGVtZW50PihSZXR5cGVkLnJlYWN0LlJlYWN0LmNyZWF0ZUVsZW1lbnQ8Z2xvYmFsOjpSZXR5cGVkLnJlYWN0LlJlYWN0LklucHV0SFRNTEF0dHJpYnV0ZXM8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MSW5wdXRFbGVtZW50PixnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnQ+KFwiaW5wdXRcIiwgaW5wdXRDb25maWcpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBidXR0b246XHJcbiAgICAgICAgICAgIEludGVyc2VjdGlvbjxSZXR5cGVkLnJlYWN0LlJlYWN0LkNsYXNzQXR0cmlidXRlczxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50PiwgUmV0eXBlZC5yZWFjdC5SZWFjdC5CdXR0b25IVE1MQXR0cmlidXRlczxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50Pj4gYnV0dG9uQ29uZmlnID1cclxuICAgICAgICAgICAgICAgIG5ldyBSZXR5cGVkLnJlYWN0LlJlYWN0LkJ1dHRvbkhUTUxBdHRyaWJ1dGVzXHJcbjxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50PiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSBuZXcgUmV0eXBlZC5yZWFjdC5SZWFjdC5DU1NQcm9wZXJ0aWVzXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSAoVW5pb248c3RyaW5nLCBkb3VibGU+KSAyOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGggPSAoVW5pb248c3RyaW5nLCBkb3VibGU+KSAxNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQgPSAoVW5pb248c3RyaW5nLCBkb3VibGU+KSAyMFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwgPSBuZXcgUmV0eXBlZC5yZWFjdC5SZWFjdC5ET01BdHRyaWJ1dGVzPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQ+LmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MQ29uZmlnKClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9faHRtbCA9c3RyaW5nLklzTnVsbE9yV2hpdGVTcGFjZShzdGF0ZS5WYWx1ZSkgPyBcIkVudGVyIHRleHRcIiA6IFwiUHJpbnQgdG8gQ29uc29sZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPSBzdHJpbmcuSXNOdWxsT3JXaGl0ZVNwYWNlKHN0YXRlLlZhbHVlKSxcclxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrID0gSGFuZGxlci5Nb3VzZUV2ZW50PFJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50PigoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6UmV0eXBlZC5yZWFjdC5SZWFjdC5Nb3VzZUV2ZW50PGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQ+PikoZSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuT25TYXZlKHN0YXRlLlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGJ1dHRvbkNvbmZpZy5UeXBlMS5rZXkgPSBcImJ1dHRvbjFcIjtcclxuICAgICAgICAgICAgdmFyIGJ1dHRvbk5vZGUgPSBSZWFjdERlbW8uRXh0ZW5zaW9ucy5Bc05vZGU8Z2xvYmFsOjpSZXR5cGVkLnJlYWN0LlJlYWN0LkJ1dHRvbkhUTUxBdHRyaWJ1dGVzPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQ+LGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQ+KFJldHlwZWQucmVhY3QuUmVhY3QuY3JlYXRlRWxlbWVudDxnbG9iYWw6OlJldHlwZWQucmVhY3QuUmVhY3QuQnV0dG9uSFRNTEF0dHJpYnV0ZXM8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MQnV0dG9uRWxlbWVudD4sZ2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MQnV0dG9uRWxlbWVudD4oXCJidXR0b25cIiwgYnV0dG9uQ29uZmlnKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgZGl2OlxyXG4gICAgICAgICAgICBJbnRlcnNlY3Rpb248UmV0eXBlZC5yZWFjdC5SZWFjdC5DbGFzc0F0dHJpYnV0ZXM8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4sIFJldHlwZWQucmVhY3QuUmVhY3QuSFRNTEF0dHJpYnV0ZXM8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4+IGRpdkNvbmZpZyA9XHJcbiAgICAgICAgICAgICAgICBuZXcgUmV0eXBlZC5yZWFjdC5SZWFjdC5IVE1MQXR0cmlidXRlc1xyXG48Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IFwid3JhcHBlclwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGRpdiA9IFJldHlwZWQucmVhY3QuUmVhY3QuY3JlYXRlRWxlbWVudDxnbG9iYWw6OlJldHlwZWQucmVhY3QuUmVhY3QuSFRNTEF0dHJpYnV0ZXM8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4sZ2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oXCJkaXZcIiwgZGl2Q29uZmlnLCBuZXdbXVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbE5vZGUsXHJcbiAgICAgICAgICAgICAgICBpbnB1dE5vZGUsXHJcbiAgICAgICAgICAgICAgICBidXR0b25Ob2RlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRpdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFtPYmplY3RMaXRlcmFsXVxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBQcm9wc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHN0cmluZyBMYWJlbDtcclxuICAgICAgICAgICAgcHVibGljIEFjdGlvbjxzdHJpbmc+IE9uU2F2ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFtPYmplY3RMaXRlcmFsXVxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBTdGF0ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHN0cmluZyBWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgW0V4dGVybmFsXVxyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBFeHRlbnNpb25zXHJcbiAgICB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBDb252ZXJ0cyBET01FbGVtZW50IC0+IFJlYWN0Tm9kZS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIFtUZW1wbGF0ZShcInswfVwiKV1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGV4dGVybiBSZXR5cGVkLnJlYWN0LlJlYWN0LlJlYWN0Tm9kZSBBc05vZGU8UCwgVD4odGhpcyBSZXR5cGVkLnJlYWN0LlJlYWN0LkRPTUVsZW1lbnQgPFAsVD5lbClcclxuICAgICAgICAgICAgd2hlcmUgUCA6IFJldHlwZWQucmVhY3QuUmVhY3QuRE9NQXR0cmlidXRlc1xyXG48VD4gICAgICAgICAgICB3aGVyZSBUIDogUmV0eXBlZC5kb20uRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBbRXh0ZXJuYWxdXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEhhbmRsZXJcclxuICAgIHtcclxuICAgICAgICBbVGVtcGxhdGUoXCJ7MH1cIildXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBleHRlcm4gUmV0eXBlZC5yZWFjdC5SZWFjdC5DaGFuZ2VFdmVudEhhbmRsZXIgPFRFbGVtZW50PkNoYW5nZUV2ZW50PFRFbGVtZW50PihBY3Rpb248UmV0eXBlZC5yZWFjdC5SZWFjdC5DaGFuZ2VFdmVudDxURWxlbWVudD4+IGFjdGlvbik7XHJcblxyXG4gICAgICAgIFtUZW1wbGF0ZShcInswfVwiKV1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGV4dGVybiBSZXR5cGVkLnJlYWN0LlJlYWN0Lk1vdXNlRXZlbnRIYW5kbGVyIDxURWxlbWVudD5Nb3VzZUV2ZW50PFRFbGVtZW50PihBY3Rpb248UmV0eXBlZC5yZWFjdC5SZWFjdC5Nb3VzZUV2ZW50PFRFbGVtZW50Pj4gYWN0aW9uKTtcclxuICAgIH1cclxufVxyXG4iXQp9Cg==
