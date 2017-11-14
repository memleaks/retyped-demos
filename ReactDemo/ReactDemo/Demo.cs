using System;
using Bridge;
using Retyped;
using static Retyped.dom;
using static Retyped.react.React;
using static Retyped.react_dom;

namespace ReactDemo
{
    using DivAttr = HTMLAttributes<HTMLDivElement>;
    using InputAttr = ChangeTargetHTMLAttributes<HTMLInputElement>;
    using ButtonAttr = ChangeTargetHTMLAttributes<HTMLButtonElement>;

    public class Demo
    {
        public static void Main()
        {
            var root = document.getElementById("root");

            var formProps = new MessageEntryForm.Props
            {
                Label = "Text:",
                OnSave = value => System.Console.WriteLine($"Entered value: '{value}'.")
            };

            var formEl = createElement(MessageEntryForm.Class, formProps);
            render(formEl, root);
        }
    }

    public class MessageEntryForm : Component<MessageEntryForm.Props, MessageEntryForm.State>
    {
        public static ComponentClass<Props> Class => typeof(MessageEntryForm).As<ComponentClass<Props>>();

        public new Props props => base.props.As<Props>();

        public new State state
        {
            get { return base.state.As<State>(); }
            set { base.state = value.As<es5.Readonly<State>>(); }
        }
    
        public MessageEntryForm(Props p)
            : base(p)
        {
            state = new State { Value = "" };
        }

        [Name("render")]
        public ReactElement<HTMLAttributes<HTMLDivElement>> Render()
        {
            // Create label:
            Intersection<ClassAttributes<HTMLLabelElement>, HTMLAttributes<HTMLLabelElement>> labelConfig =
                new ClassAttributes<HTMLLabelElement>
                {
                    key = "label1"
                };
            var labelNode = DOM.label.Self(labelConfig, props.Label).AsNode();

            // Create input:
            Intersection<ClassAttributes<HTMLInputElement>, ChangeTargetHTMLAttributes<HTMLInputElement>> inputConfig =
                new ChangeTargetHTMLAttributes<HTMLInputElement>
                {
                    style = new CSSProperties
                    {
                        marginLeft = 20,
                    },
                    value = state.Value,
                    onChange = Handler.ChangeEvent<HTMLInputElement>(e =>
                    {
                        setState(new State { Value = e.currentTarget.Type2.value});
                    })
                };
            inputConfig.Type1.key = "input1";
            var inputNode = DOM.input.Self(inputConfig).AsNode();

            // Create button:
            Intersection<ClassAttributes<HTMLButtonElement>, HTMLAttributes<HTMLButtonElement>> buttonConfig =
                new HTMLAttributes<HTMLButtonElement>
                {
                    style = new CSSProperties
                    {
                        height = 28,
                        width = 150,
                        marginLeft = 20,
                    },
                    dangerouslySetInnerHTML = new DOMAttributes<HTMLButtonElement>.dangerouslySetInnerHTMLConfig()
                    {
                        __html =string.IsNullOrWhiteSpace(state.Value) ? "Enter text" : "Print to Console",
                    },
                    disabled = string.IsNullOrWhiteSpace(state.Value),
                    onClick = Handler.MouseEvent<HTMLButtonElement>(e => props.OnSave(state.Value))
                };
            buttonConfig.Type1.key = "button1";
            var buttonNode = DOM.button.Self(buttonConfig).AsNode();

            // Create div:
            var div = DOM.div.Self(new HTMLAttributes<HTMLDivElement> { className = "wrapper" }, new [] {
                labelNode,
                inputNode,
                buttonNode});

            return div;
        }

        [ObjectLiteral]
        public class Props
        {
            public string Label;
            public Action<string> OnSave;
        }

        [ObjectLiteral]
        public class State : es5.Pick<State, KeyOf<State>>
        {
            public string Value;
        }
    }

    [External]
    public static class Extensions
    {
        /// <summary>
        /// Converts DOMElement -> ReactNode.
        /// </summary>
        [Template("{0}")]
        public static extern ReactNode AsNode<P, T>(this DOMElement<P, T> el)
            where P : DOMAttributes<T>
            where T : Element;
    }

    [External]
    public static class Handler
    {
        [Template("{0}")]
        public static extern ChangeEventHandler<TElement> ChangeEvent<TElement>(Action<ChangeEvent<TElement>> action);

        [Template("{0}")]
        public static extern MouseEventHandler<TElement> MouseEvent<TElement>(Action<MouseEvent<TElement>> action);
    }
}
