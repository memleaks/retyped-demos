using System;
using Bridge;
using Retyped;
using static Retyped.dom;
using static Retyped.react.React;
using static Retyped.react_dom;

namespace ReactDemo
{
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

            var formEl = createElement<MessageEntryForm.Props>(MessageEntryForm.Class, formProps);
            render.Self(formEl, root);
        }
    }

    public class MessageEntryForm : Component<MessageEntryForm.Props, MessageEntryForm.State>
    {
        public static ComponentClass<Props> Class => typeof(MessageEntryForm).As<ComponentClass<Props>>();

        public new Props props
        {
            get { return base.props.As<Props>(); }
            set { base.props = value.As<es5.Readonly<Props>>(); }
        }

        public new State state
        {
            get { return base.state.As<State>(); }
            set { base.state = value.As<es5.Readonly<State>>(); }
        }
    
        public MessageEntryForm(Props p)
            : base(p)
        {
            state = new State { Value = "" };
            props = p;
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

            var labelNode = createElement("label", labelConfig).AsNode();


            // Create input:
            Intersection<ClassAttributes<HTMLInputElement>, InputHTMLAttributes<HTMLInputElement>> inputConfig =
                new InputHTMLAttributes<HTMLInputElement>
                {
                    style = new CSSProperties
                    {
                        marginLeft = (Union<string, double>) 20
                    },
                    value = state.Value,
                    onChange = Handler.ChangeEvent<HTMLInputElement>(e =>
                    {
                        state = new State { Value = e.target.Type2.value };
                        setState<KeyOf<State>>(state);
                        //System.Console.WriteLine(e.target.Type2.value);
                        //System.Console.WriteLine(state.Value);
                    })
                };
            inputConfig.Type1.key = "input1";
            var inputNode = createElement("input", inputConfig).AsNode();

            // Create button:
            Intersection<ClassAttributes<HTMLButtonElement>, ButtonHTMLAttributes<HTMLButtonElement>> buttonConfig =
                new ButtonHTMLAttributes<HTMLButtonElement>
                {
                    style = new CSSProperties
                    {
                        height = (Union<string, double>) 28,
                        width = (Union<string, double>) 150,
                        marginLeft = (Union<string, double>) 20
                    },
                    dangerouslySetInnerHTML = new DOMAttributes<HTMLButtonElement>.dangerouslySetInnerHTMLConfig()
                    {
                        __html =string.IsNullOrWhiteSpace(state.Value) ? "Enter text" : "Print to Console",
                    },
                    disabled = string.IsNullOrWhiteSpace(state.Value),
                    onClick = Handler.MouseEvent<HTMLButtonElement>(e =>
                    {
                        props.OnSave(state.Value);
                    })
                };
            buttonConfig.Type1.key = "button1";
            var buttonNode = createElement("button", buttonConfig).AsNode();

            // Create div:
            Intersection<ClassAttributes<HTMLDivElement>, HTMLAttributes<HTMLDivElement>> divConfig =
                new HTMLAttributes<HTMLDivElement>
                {
                    className = "wrapper"
                };

            var div = createElement("div", divConfig, new[]
            {
                labelNode,
                inputNode,
                buttonNode
            });

            return div;
        }

        [ObjectLiteral]
        public class Props
        {
            public string Label;
            public Action<string> OnSave;
        }

        [ObjectLiteral]
        public class State
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
