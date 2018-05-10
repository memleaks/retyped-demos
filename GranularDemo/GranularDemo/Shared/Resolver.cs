using System;
using System.Collections.Generic;

namespace GranularDemo.Shared
{
    public static class Resolver
    {
        private static readonly Dictionary<Type, Type> RegisteredTypes = new Dictionary<Type, Type>();

#if (Granular)
        static Resolver()
        {
            // Register interface implementations:
            Register<Interfaces.IDomProxy, Internal.DomProxy>();
        }
#endif

        public static void Register<TInterface, TImplementation>()
        {
            RegisteredTypes[typeof(TInterface)] = typeof(TImplementation);
        }

        public static TInterface Resolve<TInterface>()
        {
            Type implType;
            if (!RegisteredTypes.TryGetValue(typeof(TInterface), out implType))
            {
                return default(TInterface);
            }

            return (TInterface)Activator.CreateInstance(implType);
        }
    }
}