using VueDemo.Extensions;

namespace VueDemo.Components
{
    public class HelloCmp : VueComponent<HelloCmpModel, HelloCmpProps>
    {
        public HelloCmp()
        {
            template = @"
<div>
    <div class=""greeting"">Hello {{" + nameof(HelloCmpProps.name) + @"}}{{" + nameof(ExclamationMarks) + @"}}</div>
    <button @click=""" + nameof(Decrement) + @""">-</button>
    <button @click=""" + nameof(Increment) + @""">+</button>
</div>";

            data = () => new HelloCmpModel
            {
                enthusiasm = Properties.initialEnthusiasm
            };
        }

        [VueMethod]
        public static void Decrement()
        {
            Model.enthusiasm--;
        }

        [VueMethod]
        public static void Increment()
        {
            Model.enthusiasm++;
        }

        [VueComputed]
        public static string ExclamationMarks()
        {
            return new string('!', Model.enthusiasm);
        }
    }

    public class HelloCmpModel
    {
        public int enthusiasm;
    }

    public class HelloCmpProps
    {
        public string name;
        public int initialEnthusiasm;
    }
}
