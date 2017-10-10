using Bridge;
using Bridge.Html5;
using Newtonsoft.Json;
using System;
using static Retyped.knockout;
using ObservableString = Retyped.knockout.KnockoutObservable<string>.Interface;
using ComputedString = Retyped.knockout.KnockoutComputed<string>.Interface;

namespace KnockoutDemo
{
    public class App
    {
        public static void Main()
        {
            // Original "Hello wold" demo can be found here:
            // http://knockoutjs.com/examples/helloWorld.html

            ko.applyBindings(new ViewModel("Planet", "Earth")); // This makes Knockout get to work
        }
    }

    // Here's my data model
    public class ViewModel
    {
        public ObservableString firstName { get; set; }

        public ObservableString lastName { get; set; }

        public ComputedString fullName { get; set; }

        public ViewModel(string first, string last)
        {
            firstName = ko.observable.Self<string>(first);
            lastName = ko.observable.Self<string>(last);

            // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
            fullName = ko.pureComputed(() => firstName.Self() + " " + lastName.Self());
        }
    }
}