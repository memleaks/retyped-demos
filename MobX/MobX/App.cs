using static Retyped.dom;

namespace MobX
{
    public class App
    {
        private static TodoStore _store;

        public static void Main()
        {
            // The demo project contains some samples from:
            // https://mobx.js.org/getting-started.html

            // For the sake of simplicity, "mobx.js" is being loaded using "require.js".
            // To make that happen, "mobx.js" was converted from CommonJS to AMD format:
            // http://requirejs.org/docs/commonjs.html#manualconversion

            // That conversion is not required when working in NodeJS environment.
            
            var rootEl = document.getElementById("root");

            // Create a store:
            _store = new TodoStore(rootEl);

            // Add a few initial To Do items:
            _store.AddTodoItem("Create a Task");
            _store.AddTodoItem("Mark a Task as completed");
            _store.AddTodoItem("Delete a Task");
        }
    }
}