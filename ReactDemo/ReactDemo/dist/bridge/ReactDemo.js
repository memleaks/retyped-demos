/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 17.1.0
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJSZWFjdERlbW8uanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkRlbW8uY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7O2dCQVVZQSxXQUFXQTs7Z0JBRVhBLGdCQUFnQkEsMEJBR0hBO29CQUFTQSx5QkFBeUJBLCtDQUFzQ0E7OztnQkFHckZBLGFBQWFBLG9CQUE0RUEsa0NBQXdCQTtnQkFDakhBLGdCQUF3RUEsUUFBUUE7Ozs7Ozs7Ozs7NEJBVXBGQSxPQUFPQSxBQUFPQTs7Ozs7Ozs7d0JBS0pBLE9BQU9BOzs7d0JBQ1BBLHFGQUFhQTs7Ozs7d0JBS2JBLE9BQU9BOzs7d0JBQ1BBLHFGQUFhQTs7Ozs7Z0NBR0NBOzsrQ0FDYkE7b0JBRVBBLGVBQVFBO29CQUNSQSxlQUFRQTs7Ozs7b0JBT1JBLGtCQUNJQTs7b0JBS0pBLGdCQUFnQkEsQUFBbUpBLDZCQUFrS0E7OztvQkFJclVBLGtCQUNJQSxTQUVZQSxjQUVTQSxhQUVUQSw4QkFDR0EsQUFBa0RBLEFBQXVHQTs0QkFFaEtBLGVBQVFBLFNBQW9CQTs0QkFDNUJBLGNBQXVCQTs7b0JBS25DQTtvQkFDQUEsZ0JBQWdCQSxBQUF3SkEsNkJBQXVLQTs7b0JBRy9VQSxtQkFDSUEsU0FFWUEsVUFFS0EsV0FDREEsaUJBQ0tBLCtCQUVTQSxVQUVkQSxpQ0FBMEJBLHFFQUUzQkEsaUNBQTBCQSw4QkFDM0JBLEFBQWtEQSxBQUF1R0E7NEJBRS9KQSxvQkFBYUE7O29CQUd6QkE7b0JBQ0FBLGlCQUFpQkEsQUFBMkpBLDhCQUEyS0E7O29CQUd2VkEsZ0JBQ0lBOztvQkFLSkEsVUFBVUEseUNBQTRKQSxrQkFBV0EsbUJBRTdLQSxXQUNBQSxXQUNBQTs7b0JBR0pBLE9BQU9BIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFN5c3RlbTtcclxudXNpbmcgQnJpZGdlO1xyXG51c2luZyBSZXR5cGVkO1xyXG5cclxubmFtZXNwYWNlIFJlYWN0RGVtb1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRGVtb1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciByb290ID0gUmV0eXBlZC5kb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZvcm1Qcm9wcyA9IG5ldyBNZXNzYWdlRW50cnlGb3JtLlByb3BzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIExhYmVsID0gXCJUZXh0OlwiLFxyXG4gICAgICAgICAgICAgICAgT25TYXZlID0gdmFsdWUgPT4gU3lzdGVtLkNvbnNvbGUuV3JpdGVMaW5lKHN0cmluZy5Gb3JtYXQoXCJFbnRlcmVkIHZhbHVlOiAnezB9Jy5cIix2YWx1ZSkpXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9ybUVsID0gUmV0eXBlZC5yZWFjdC5SZWFjdC5jcmVhdGVFbGVtZW50PGdsb2JhbDo6UmVhY3REZW1vLk1lc3NhZ2VFbnRyeUZvcm0uUHJvcHM+KE1lc3NhZ2VFbnRyeUZvcm0uQ2xhc3MsIGZvcm1Qcm9wcyk7XHJcbiAgICAgICAgICAgIFJldHlwZWQucmVhY3RfZG9tLnJlbmRlci5TZWxmPGdsb2JhbDo6UmVhY3REZW1vLk1lc3NhZ2VFbnRyeUZvcm0uUHJvcHM+KGZvcm1FbCwgcm9vdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBNZXNzYWdlRW50cnlGb3JtIDogUmV0eXBlZC5yZWFjdC5SZWFjdC5Db21wb25lbnRcclxuPGdsb2JhbDo6UmVhY3REZW1vLk1lc3NhZ2VFbnRyeUZvcm0uUHJvcHMsZ2xvYmFsOjpSZWFjdERlbW8uTWVzc2FnZUVudHJ5Rm9ybS5TdGF0ZT4gICAge1xyXG5wdWJsaWMgc3RhdGljIFJldHlwZWQucmVhY3QuUmVhY3QuQ29tcG9uZW50Q2xhc3MgPGdsb2JhbDo6UmVhY3REZW1vLk1lc3NhZ2VFbnRyeUZvcm0uUHJvcHM+Q2xhc3Ncclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZihNZXNzYWdlRW50cnlGb3JtKS5BczxSZXR5cGVkLnJlYWN0LlJlYWN0LkNvbXBvbmVudENsYXNzPGdsb2JhbDo6UmVhY3REZW1vLk1lc3NhZ2VFbnRyeUZvcm0uUHJvcHM+PigpO1xyXG4gICAgfVxyXG59XHJcbiAgICAgICAgcHVibGljIG5ldyBQcm9wcyBwcm9wc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGJhc2UucHJvcHMuQXM8UHJvcHM+KCk7IH1cclxuICAgICAgICAgICAgc2V0IHsgYmFzZS5wcm9wcyA9IHZhbHVlLkFzPGVzNS5SZWFkb25seTxQcm9wcz4+KCk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBuZXcgU3RhdGUgc3RhdGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBiYXNlLnN0YXRlLkFzPFN0YXRlPigpOyB9XHJcbiAgICAgICAgICAgIHNldCB7IGJhc2Uuc3RhdGUgPSB2YWx1ZS5BczxlczUuUmVhZG9ubHk8U3RhdGU+PigpOyB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcHVibGljIE1lc3NhZ2VFbnRyeUZvcm0oUHJvcHMgcClcclxuICAgICAgICAgICAgOiBiYXNlKHApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGF0ZSA9IG5ldyBTdGF0ZSB7IFZhbHVlID0gXCJcIiB9O1xyXG4gICAgICAgICAgICBwcm9wcyA9IHA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBbTmFtZShcInJlbmRlclwiKV1cclxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5yZWFjdC5SZWFjdC5SZWFjdEVsZW1lbnQgPGdsb2JhbDo6UmV0eXBlZC5yZWFjdC5SZWFjdC5IVE1MQXR0cmlidXRlczxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50Pj5SZW5kZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGxhYmVsOlxyXG4gICAgICAgICAgICBJbnRlcnNlY3Rpb248UmV0eXBlZC5yZWFjdC5SZWFjdC5DbGFzc0F0dHJpYnV0ZXM8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MTGFiZWxFbGVtZW50PiwgUmV0eXBlZC5yZWFjdC5SZWFjdC5IVE1MQXR0cmlidXRlczxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxMYWJlbEVsZW1lbnQ+PiBsYWJlbENvbmZpZyA9XHJcbiAgICAgICAgICAgICAgICBuZXcgUmV0eXBlZC5yZWFjdC5SZWFjdC5DbGFzc0F0dHJpYnV0ZXNcclxuPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTExhYmVsRWxlbWVudD4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IFwibGFiZWwxXCJcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgbGFiZWxOb2RlID0gUmVhY3REZW1vLkV4dGVuc2lvbnMuQXNOb2RlPGdsb2JhbDo6UmV0eXBlZC5yZWFjdC5SZWFjdC5IVE1MQXR0cmlidXRlczxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxMYWJlbEVsZW1lbnQ+LGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTExhYmVsRWxlbWVudD4oUmV0eXBlZC5yZWFjdC5SZWFjdC5jcmVhdGVFbGVtZW50PGdsb2JhbDo6UmV0eXBlZC5yZWFjdC5SZWFjdC5IVE1MQXR0cmlidXRlczxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxMYWJlbEVsZW1lbnQ+LGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTExhYmVsRWxlbWVudD4oXCJsYWJlbFwiLCBsYWJlbENvbmZpZykpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBpbnB1dDpcclxuICAgICAgICAgICAgSW50ZXJzZWN0aW9uPFJldHlwZWQucmVhY3QuUmVhY3QuQ2xhc3NBdHRyaWJ1dGVzPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTElucHV0RWxlbWVudD4sIFJldHlwZWQucmVhY3QuUmVhY3QuSW5wdXRIVE1MQXR0cmlidXRlczxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnQ+PiBpbnB1dENvbmZpZyA9XHJcbiAgICAgICAgICAgICAgICBuZXcgUmV0eXBlZC5yZWFjdC5SZWFjdC5JbnB1dEhUTUxBdHRyaWJ1dGVzXHJcbjxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnQ+ICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IG5ldyBSZXR5cGVkLnJlYWN0LlJlYWN0LkNTU1Byb3BlcnRpZXNcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQgPSAoVW5pb248c3RyaW5nLCBkb3VibGU+KSAyMFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBzdGF0ZS5WYWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZSA9IEhhbmRsZXIuQ2hhbmdlRXZlbnQ8UmV0eXBlZC5kb20uSFRNTElucHV0RWxlbWVudD4oKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlJldHlwZWQucmVhY3QuUmVhY3QuQ2hhbmdlRXZlbnQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MSW5wdXRFbGVtZW50Pj4pKGUgPT5cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gbmV3IFN0YXRlIHsgVmFsdWUgPSBlLnRhcmdldC5UeXBlMi52YWx1ZSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTdGF0ZTxLZXlPZjxTdGF0ZT4+KHN0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9TeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoZS50YXJnZXQuVHlwZTIudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1N5c3RlbS5Db25zb2xlLldyaXRlTGluZShzdGF0ZS5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpbnB1dENvbmZpZy5UeXBlMS5rZXkgPSBcImlucHV0MVwiO1xyXG4gICAgICAgICAgICB2YXIgaW5wdXROb2RlID0gUmVhY3REZW1vLkV4dGVuc2lvbnMuQXNOb2RlPGdsb2JhbDo6UmV0eXBlZC5yZWFjdC5SZWFjdC5JbnB1dEhUTUxBdHRyaWJ1dGVzPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTElucHV0RWxlbWVudD4sZ2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MSW5wdXRFbGVtZW50PihSZXR5cGVkLnJlYWN0LlJlYWN0LmNyZWF0ZUVsZW1lbnQ8Z2xvYmFsOjpSZXR5cGVkLnJlYWN0LlJlYWN0LklucHV0SFRNTEF0dHJpYnV0ZXM8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MSW5wdXRFbGVtZW50PixnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnQ+KFwiaW5wdXRcIiwgaW5wdXRDb25maWcpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBidXR0b246XHJcbiAgICAgICAgICAgIEludGVyc2VjdGlvbjxSZXR5cGVkLnJlYWN0LlJlYWN0LkNsYXNzQXR0cmlidXRlczxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50PiwgUmV0eXBlZC5yZWFjdC5SZWFjdC5CdXR0b25IVE1MQXR0cmlidXRlczxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50Pj4gYnV0dG9uQ29uZmlnID1cclxuICAgICAgICAgICAgICAgIG5ldyBSZXR5cGVkLnJlYWN0LlJlYWN0LkJ1dHRvbkhUTUxBdHRyaWJ1dGVzXHJcbjxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50PiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSBuZXcgUmV0eXBlZC5yZWFjdC5SZWFjdC5DU1NQcm9wZXJ0aWVzXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSAoVW5pb248c3RyaW5nLCBkb3VibGU+KSAyOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGggPSAoVW5pb248c3RyaW5nLCBkb3VibGU+KSAxNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQgPSAoVW5pb248c3RyaW5nLCBkb3VibGU+KSAyMFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwgPSBuZXcgUmV0eXBlZC5yZWFjdC5SZWFjdC5ET01BdHRyaWJ1dGVzPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQ+LmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MQ29uZmlnKClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9faHRtbCA9c3RyaW5nLklzTnVsbE9yV2hpdGVTcGFjZShzdGF0ZS5WYWx1ZSkgPyBcIkVudGVyIHRleHRcIiA6IFwiUHJpbnQgdG8gQ29uc29sZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPSBzdHJpbmcuSXNOdWxsT3JXaGl0ZVNwYWNlKHN0YXRlLlZhbHVlKSxcclxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrID0gSGFuZGxlci5Nb3VzZUV2ZW50PFJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50PigoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6UmV0eXBlZC5yZWFjdC5SZWFjdC5Nb3VzZUV2ZW50PGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQ+PikoZSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuT25TYXZlKHN0YXRlLlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGJ1dHRvbkNvbmZpZy5UeXBlMS5rZXkgPSBcImJ1dHRvbjFcIjtcclxuICAgICAgICAgICAgdmFyIGJ1dHRvbk5vZGUgPSBSZWFjdERlbW8uRXh0ZW5zaW9ucy5Bc05vZGU8Z2xvYmFsOjpSZXR5cGVkLnJlYWN0LlJlYWN0LkJ1dHRvbkhUTUxBdHRyaWJ1dGVzPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQ+LGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQ+KFJldHlwZWQucmVhY3QuUmVhY3QuY3JlYXRlRWxlbWVudDxnbG9iYWw6OlJldHlwZWQucmVhY3QuUmVhY3QuQnV0dG9uSFRNTEF0dHJpYnV0ZXM8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MQnV0dG9uRWxlbWVudD4sZ2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MQnV0dG9uRWxlbWVudD4oXCJidXR0b25cIiwgYnV0dG9uQ29uZmlnKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgZGl2OlxyXG4gICAgICAgICAgICBJbnRlcnNlY3Rpb248UmV0eXBlZC5yZWFjdC5SZWFjdC5DbGFzc0F0dHJpYnV0ZXM8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4sIFJldHlwZWQucmVhY3QuUmVhY3QuSFRNTEF0dHJpYnV0ZXM8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4+IGRpdkNvbmZpZyA9XHJcbiAgICAgICAgICAgICAgICBuZXcgUmV0eXBlZC5yZWFjdC5SZWFjdC5IVE1MQXR0cmlidXRlc1xyXG48Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IFwid3JhcHBlclwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGRpdiA9IFJldHlwZWQucmVhY3QuUmVhY3QuY3JlYXRlRWxlbWVudDxnbG9iYWw6OlJldHlwZWQucmVhY3QuUmVhY3QuSFRNTEF0dHJpYnV0ZXM8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4sZ2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oXCJkaXZcIiwgZGl2Q29uZmlnLCBuZXdbXVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbE5vZGUsXHJcbiAgICAgICAgICAgICAgICBpbnB1dE5vZGUsXHJcbiAgICAgICAgICAgICAgICBidXR0b25Ob2RlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRpdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFtPYmplY3RMaXRlcmFsXVxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBQcm9wc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHN0cmluZyBMYWJlbDtcclxuICAgICAgICAgICAgcHVibGljIEFjdGlvbjxzdHJpbmc+IE9uU2F2ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFtPYmplY3RMaXRlcmFsXVxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBTdGF0ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHN0cmluZyBWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgW0V4dGVybmFsXVxyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBFeHRlbnNpb25zXHJcbiAgICB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBDb252ZXJ0cyBET01FbGVtZW50IC0+IFJlYWN0Tm9kZS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIFtUZW1wbGF0ZShcInswfVwiKV1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGV4dGVybiBSZXR5cGVkLnJlYWN0LlJlYWN0LlJlYWN0Tm9kZSBBc05vZGU8UCwgVD4odGhpcyBSZXR5cGVkLnJlYWN0LlJlYWN0LkRPTUVsZW1lbnQgPFAsVD5lbClcclxuICAgICAgICAgICAgd2hlcmUgUCA6IFJldHlwZWQucmVhY3QuUmVhY3QuRE9NQXR0cmlidXRlc1xyXG48VD4gICAgICAgICAgICB3aGVyZSBUIDogUmV0eXBlZC5kb20uRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBbRXh0ZXJuYWxdXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEhhbmRsZXJcclxuICAgIHtcclxuICAgICAgICBbVGVtcGxhdGUoXCJ7MH1cIildXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBleHRlcm4gUmV0eXBlZC5yZWFjdC5SZWFjdC5DaGFuZ2VFdmVudEhhbmRsZXIgPFRFbGVtZW50PkNoYW5nZUV2ZW50PFRFbGVtZW50PihBY3Rpb248UmV0eXBlZC5yZWFjdC5SZWFjdC5DaGFuZ2VFdmVudDxURWxlbWVudD4+IGFjdGlvbik7XHJcblxyXG4gICAgICAgIFtUZW1wbGF0ZShcInswfVwiKV1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGV4dGVybiBSZXR5cGVkLnJlYWN0LlJlYWN0Lk1vdXNlRXZlbnRIYW5kbGVyIDxURWxlbWVudD5Nb3VzZUV2ZW50PFRFbGVtZW50PihBY3Rpb248UmV0eXBlZC5yZWFjdC5SZWFjdC5Nb3VzZUV2ZW50PFRFbGVtZW50Pj4gYWN0aW9uKTtcclxuICAgIH1cclxufVxyXG4iXQp9Cg==
