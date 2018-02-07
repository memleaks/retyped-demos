using Bridge;

using static Retyped.dom;
using static Retyped.mobx;

namespace MobX
{
    public class TodoStore
    {
        private HTMLDivElement _todoDiv;
        private HTMLLabelElement _progressLabel;

        // Observable array of To Do items:
        private readonly IObservableArray<TodoItem> _todos = observable.Type1.Self(new TodoItem[0]);

        // Computed property (number of completed To Do items):
        private readonly IComputedValue<int> _completedTodosCount;
        public int CompletedTodosCount => _completedTodosCount.get();

        // Computed property (progress report):
        private readonly IComputedValue<string> _report;
        public string Report => _report.get();

        public TodoStore(HTMLElement root)
        {
            // Render UI elements:
            Render(root);

            // Subscribe to Todos changes:
            _todos.observe(TodoObserveFn);

            // Configure computed field (_completedTodosCount):
            _completedTodosCount = computed.Self(() =>
                _todos.filter((v, i, arr) => v.Completed ? (object) true : null).Length);

            // Configure computed field (_report):
            _report = computed.Self(() => $"Progress: {CompletedTodosCount}/{_todos.length}");

            // Configure reaction on state changes:
            autorun(StageChangedFn);
        }
      
        public void AddTodoItem(string task)
        {
            var item = new TodoItem
            {
                Task = task,
                Completed = false
            };

            _todos.push(item);
        }

        #region Handlers

        private void TodoObserveFn(Union<IArrayChange<TodoItem>, IArraySplice<TodoItem>> x)
        {
            var spliceInfo = (IArraySplice<TodoItem>)x;

            // Ensure it's a splice, not a change event:
            if (spliceInfo.type == Retyped.mobx.Literals.splice)
            {
                //foreach (var removed in spliceInfo.removed)
                //{
                //    // nothing to do.
                //    // 'delete' button handler takes care of this.
                //}

                // Render controls for the new records:
                foreach (var added in spliceInfo.added)
                {
                    RenderItem(added);
                }
            }
        }

        private object StageChangedFn(IReactionPublic r)
        {
            // Update ProgressLabel text:
            _progressLabel.innerHTML = "Tasks left: " + (_todos.length - CompletedTodosCount);

            // Print Report to Console:
            System.Console.WriteLine(Report);
            return null;
        }

        #endregion

        #region Rendering

        private void Render(HTMLElement root)
        {
            // Create HTML elements:
            var headerDiv = new HTMLDivElement();
            _todoDiv = new HTMLDivElement();

            root.appendChild(headerDiv);
            root.appendChild(_todoDiv);

            // Header (to do item creation):
            var input = new HTMLInputElement();
            var addButton = new HTMLButtonElement
            {
                innerHTML = "Add",
                className = "btn btn-primary",
                disabled = true
            };

            input.onkeyup = e =>
            {
                if (e?.keyCode == 13)
                {
                    addButton.click();
                }
                else
                {
                    addButton.disabled = string.IsNullOrEmpty(input.value);
                }

                return null;
            };

            addButton.onclick = e =>
            {
                AddTodoItem(input.value);
                input.value = string.Empty;
                input.onkeyup(null);
                return null;
            };

            _progressLabel = new HTMLLabelElement();

            headerDiv.appendChild(input);
            headerDiv.appendChild(addButton);
            headerDiv.appendChild(new HTMLBRElement());
            headerDiv.appendChild(_progressLabel);
            headerDiv.appendChild(new HTMLBRElement());
            headerDiv.appendChild(new HTMLBRElement());
        }

        private void RenderItem(TodoItem item)
        {
            var itemDiv = new HTMLDivElement
            {
                className = "item"
            };

            // Create a CheckBox
            var checkBox = new HTMLInputElement
            {
                type = "checkbox",
            };

            checkBox.addEventListener("click", e =>
            {
                // Set the item as Completed:
                item.Completed = checkBox.@checked;
            });

            var button = new HTMLButtonElement
            {
                innerHTML = "del",
                onclick = e =>
                {
                    // Remove the item and the controls:
                    _todoDiv.removeChild(itemDiv);
                    _todos.remove(item);
                    return null;
                }
            };

            itemDiv.appendChild(button);
            itemDiv.appendChild(checkBox);
            itemDiv.appendChild(new HTMLLabelElement {innerHTML = item.Task});
            itemDiv.appendChild(new HTMLBRElement());

            _todoDiv.appendChild(itemDiv);
        }

        #endregion
    }
}