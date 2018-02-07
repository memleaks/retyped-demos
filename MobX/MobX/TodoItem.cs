using Bridge;

namespace MobX
{
    [ObjectLiteral]
    public class TodoItem
    {
        public string Task { get; set; }

        public bool Completed { get; set; }

        public string Assignee { get; set; }
    }
}