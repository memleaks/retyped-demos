using System;

using static Retyped.dom;
using static Retyped.dragula;
using DragulaOptions = Retyped.dragula.dragula2.DragulaOptions;

namespace DragulaDemo
{
    public class App
    {
        public static void Main()
        {
            // Dragula library is accessed via Global variables,
            // see "loader" setting in bridge.json file.

            ConfigureExample1();
            ConfigureExample2();
            ConfigureExample3();
            ConfigureExample4();
            ConfigureExample5();
            ConfigureExample6();
            ConfigureExample7();
            ConfigureExample8();
        }

        private static void ConfigureExample1()
        {
            dragula3.Self(new Element[]
            {
                document.getElementById("left-defaults"),
                document.getElementById("right-defaults")
            });
        }

        private static void ConfigureExample2()
        {
            var drake = dragula3.Self(new Element[]
            {
                document.getElementById("left-events"),
                document.getElementById("right-events"),
            });

            drake.on("drag", new Action<Element>(el =>
            {
                el.className = el.className.Replace("ex-moved", "");
            }));

            drake.on("drop", new Action<Element>(el =>
            {
                el.className += " ex-moved";
            }));

            drake.on("over", new Action<Element, Element>((el, container) =>
            {
                container.className += " ex-over";
            }));

            drake.on("out", new Action<Element, Element>((el, container) =>
            {
                container.className = container.className.Replace("ex-over", "");
            }));
        }

        private static void ConfigureExample3()
        {
            dragula3.Self(new Element[]
                {
                    document.getElementById("left-rm-spill"),
                    document.getElementById("right-rm-spill"),
                },
                new DragulaOptions
                {
                    removeOnSpill = true
                });
        }

        private static void ConfigureExample4()
        {
            dragula3.Self(new Element[]
                {
                    document.getElementById("left-rollbacks"),
                    document.getElementById("right-rollbacks"),
                },
                new DragulaOptions
                {
                    revertOnSpill = true
                });
        }

        private static void ConfigureExample5()
        {
            dragula3.Self(new Element[]
                {
                    document.getElementById("left-copy"),
                    document.getElementById("right-copy"),
                },
                new DragulaOptions
                {
                    copy = true
                });
        }

        private static void ConfigureExample6()
        {
            dragula3.Self(new Element[]
                {
                    document.getElementById("left-copy-1tomany"),
                    document.getElementById("right-copy-1tomany"),
                },
                new DragulaOptions
                {
                    copy = new DragulaOptions.copyFn((el, source) =>
                        source.id == "left-copy-1tomany"),

                    accepts = (el, target, source, sibling) =>
                        target.id != "left-copy-1tomany"
                });
        }

        private static void ConfigureExample7()
        {
            dragula3.Self(new Element[]
                {
                    document.getElementById("left-lovehandles"),
                    document.getElementById("right-lovehandles"),
                },
                new DragulaOptions
                {
                    moves = (el, container, handle, sibling) => handle.className.Contains("handle")
                });
        }

        private static void ConfigureExample8()
        {
            const string clickIndicator = " [click!]";
            var sortable = document.getElementById("sortable");

            dragula3.Self(new Element[]
            {
                sortable
            });

            sortable.onclick = e =>
            {
                var target = (Element)e.target;
                if (target.id == sortable.id)
                {
                    return;
                }

                target.innerHTML += clickIndicator;

                setTimeout(timeoutEv =>
                {
                    target.innerHTML = target.innerHTML.Replace(clickIndicator, "");
                }, 500);
            };
        }
    }
}