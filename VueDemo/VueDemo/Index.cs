using Retyped;
using VueDemo.Components;

namespace VueDemo
{
    public class Index
    {
        public static void Main()
        {
            var v = new vue.Vue(new RootCmp("#app"));
        }
    }
}