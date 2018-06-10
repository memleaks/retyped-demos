/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 17.1.0
 */
Bridge.assembly("KnockoutDemo", function ($asm, globals) {
    "use strict";

    Bridge.define("KnockoutDemo.App", {
        main: function Main () {
            // Original "Hello wold" demo can be found here:
            // http://knockoutjs.com/examples/helloWorld.html

            ko.applyBindings(new KnockoutDemo.ViewModel("Planet", "Earth")); // This makes Knockout get to work
        }
    });

    Bridge.define("KnockoutDemo.ViewModel", {
        props: {
            firstName: null,
            lastName: null,
            fullName: null
        },
        ctors: {
            ctor: function (first, last) {
                this.$initialize();
                this.firstName = ko.observable(first);
                this.lastName = ko.observable(last);

                // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
                this.fullName = ko.pureComputed(Bridge.fn.bind(this, function () {
                    return (this.firstName() || "") + " " + (this.lastName() || "");
                }));
            }
        }
    });
});
