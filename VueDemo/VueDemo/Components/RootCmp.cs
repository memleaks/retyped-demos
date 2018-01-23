using VueDemo.Extensions;

namespace VueDemo.Components
{
    public class RootCmp : VueComponent<RootCmpModel>
    {
        public RootCmp(string rootEl)
        {
            el = rootEl;

            template = @"
<div>
    Name:  <input v-model=""" + nameof(RootCmpModel.name) + @""" type=""text"">
    <HelloComponent :name=""" + nameof(RootCmpModel.name) + @""" :initialEnthusiasm=""5"" />
</div>";

            data = () => new RootCmpModel { name = "World"};

            components = new componentsConfig
            {
                ["HelloComponent"] = new HelloCmp().AsComponent()
            };
        }
    }

    public class RootCmpModel
    {
        public string name;
    }
}