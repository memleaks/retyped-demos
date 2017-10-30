/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.4.1
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJLbm9ja291dERlbW8uanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkFwcC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7OztZQWdCWUEsaUJBQWtDQSxJQUFJQTs7Ozs7Ozs7Ozs7NEJBYXpCQSxPQUFjQTs7Z0JBRTNCQSxpQkFBWUEsY0FBNENBO2dCQUN4REEsZ0JBQVdBLGNBQTRDQTs7O2dCQUd2REEsZ0JBQVdBLGdCQUF5Q0EsQUFBaUVBOzJCQUFNQSxrQ0FBeUJBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIEJyaWRnZTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgT2JzZXJ2YWJsZVN0cmluZyA9IFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlPHN0cmluZz4uSW50ZXJmYWNlO1xyXG51c2luZyBDb21wdXRlZFN0cmluZyA9IFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRDb21wdXRlZDxzdHJpbmc+LkludGVyZmFjZTtcclxuXHJcbm5hbWVzcGFjZSBLbm9ja291dERlbW9cclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIE9yaWdpbmFsIFwiSGVsbG8gd29sZFwiIGRlbW8gY2FuIGJlIGZvdW5kIGhlcmU6XHJcbiAgICAgICAgICAgIC8vIGh0dHA6Ly9rbm9ja291dGpzLmNvbS9leGFtcGxlcy9oZWxsb1dvcmxkLmh0bWxcclxuXHJcbiAgICAgICAgICAgIFJldHlwZWQua25vY2tvdXQua28uYXBwbHlCaW5kaW5ncyhuZXcgVmlld01vZGVsKFwiUGxhbmV0XCIsIFwiRWFydGhcIikpOyAvLyBUaGlzIG1ha2VzIEtub2Nrb3V0IGdldCB0byB3b3JrXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEhlcmUncyBteSBkYXRhIG1vZGVsXHJcbiAgICBwdWJsaWMgY2xhc3MgVmlld01vZGVsXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlPFN5c3RlbS5TdHJpbmc+LkludGVyZmFjZSBmaXJzdE5hbWUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGU8U3lzdGVtLlN0cmluZz4uSW50ZXJmYWNlIGxhc3ROYW1lIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRDb21wdXRlZDxTeXN0ZW0uU3RyaW5nPi5JbnRlcmZhY2UgZnVsbE5hbWUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmlld01vZGVsKHN0cmluZyBmaXJzdCwgc3RyaW5nIGxhc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmaXJzdE5hbWUgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KGZpcnN0KTtcclxuICAgICAgICAgICAgbGFzdE5hbWUgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KGxhc3QpO1xyXG5cclxuICAgICAgICAgICAgLy8gS25vY2tvdXQgdHJhY2tzIGRlcGVuZGVuY2llcyBhdXRvbWF0aWNhbGx5LiBJdCBrbm93cyB0aGF0IGZ1bGxOYW1lIGRlcGVuZHMgb24gZmlyc3ROYW1lIGFuZCBsYXN0TmFtZSwgYmVjYXVzZSB0aGVzZSBnZXQgY2FsbGVkIHdoZW4gZXZhbHVhdGluZyBmdWxsTmFtZS5cclxuICAgICAgICAgICAgZnVsbE5hbWUgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLnB1cmVDb21wdXRlZDxzdHJpbmc+KChnbG9iYWw6OlJldHlwZWQua25vY2tvdXQuS25vY2tvdXRTdGF0aWMucHVyZUNvbXB1dGVkRm48c3RyaW5nPikoKCkgPT4gZmlyc3ROYW1lLlNlbGYoKSArIFwiIFwiICsgbGFzdE5hbWUuU2VsZigpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0KfQo=
