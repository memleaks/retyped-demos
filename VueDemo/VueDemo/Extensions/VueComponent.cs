using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Bridge;
using Retyped;

namespace VueDemo.Extensions
{
    /// <summary>
    /// Vue componenent with a specific Model and Properties type.
    /// </summary>
    /// <typeparam name="TModel">Model (data) type</typeparam>
    /// <typeparam name="TProps">Properties type</typeparam>
    public class VueComponent<TModel, TProps> : vue.ComponentOptions<vue.Vue, vue.DefaultData<vue.Vue>, vue.DefaultMethods<vue.Vue>, vue.DefaultComputed, vue.PropsDefinition<TProps>, TProps>
    {
        /// <summary>
        /// Overrides <see cref="vue.ComponentOptions{V,Data,Methods,Computed,PropsDef,Props}.data"/> with the actual model type.
        /// </summary>
        [Name("data")]
        public new Func<TModel> data { private get; set; }

        /// <summary>
        /// Model instance. Should be used in [VueMethods]/[VueComputed] methods.
        /// </summary>
        protected static extern TModel Model
        {
            [Template("this")]
            get;
        }

        /// <summary>
        /// Properties instance. Should be used in [VueMethods]/[VueComputed] methods.
        /// </summary>
        protected static extern TProps Properties
        {
            [Template("this")]
            get;
        }

        /// <summary>
        /// Creates a Vue componenent with a specific Model type.
        /// </summary>
        /// <param name="registerMembers">If true, automatically registers [VueMethods]/[VueComputed] methods.</param>
        public VueComponent(bool registerMembers = true)
        {
            props = GetCmpPropertyNames();

            if (registerMembers)
            {
                methods = RegisterMethods();
                computed = RegisterComputed();
            }
        }

        /// <summary>
        /// Converts component into <see cref="vue.Component{Data,Methods,Computed,Props}"/> type.
        /// </summary>
        [Template("{this}")]
        public extern vue.Component<object, object, object, object> AsComponent();

        [Template("new vue ({this})")]
        public extern vue.CombinedVueInstance<vue.DefaultData<vue.Vue>, vue.DefaultMethods<vue.Vue>, vue.DefaultComputed, vue.PropsDefinition<vue.DefaultProps>, vue.DefaultProps> Create();

        /// <summary>
        /// Collects and registers STATIC methods marked with <see cref="VueMethodAttribute"/> attribute.
        /// </summary>
        private vue.DefaultMethods<vue.Vue> RegisterMethods()
        {
            var publicMembers = GetType().GetMembers(BindingFlags.Public | BindingFlags.Static | BindingFlags.DeclaredOnly);
            var config = new vue.DefaultMethods<vue.Vue>();

            foreach (var member in publicMembers)
            {
                var method = member as MethodInfo;
                if (method == null)
                {
                    continue;
                }

                if (method.IsConstructor || method.IsSpecialName)
                {
                    // Skip constructors and special methods.
                    continue;
                }

                var isVueMethod = method.GetCustomAttributes(typeof(VueMethodAttribute)).Any();
                if (!isVueMethod)
                {
                    continue;
                }

                config[method.ScriptName] = (vue.DefaultMethods<vue.Vue>.keyFn<vue.Vue>) method.DeclaringType[method.ScriptName];
            }

            return config;
        }

        /// <summary>
        /// Collects and registers STATIC methods (for computed properties) marked with <see cref="VueComputedAttribute"/> attribute.
        /// </summary>
        private vue.Accessors<vue.DefaultComputed> RegisterComputed()
        {
            var publicMembers = GetType().GetMembers(BindingFlags.Public | BindingFlags.Static);

            var config = new vue.Accessors<vue.DefaultComputed>();

            foreach (var member in publicMembers)
            {
                var method = member as MethodInfo;
                if (method == null)
                {
                    continue;
                }

                if (method.IsConstructor || method.IsSpecialName)
                {
                    // Skip constructors and special methods.
                    continue;
                }

                var isVueComputed = method.GetCustomAttributes(typeof(VueComputedAttribute)).Any();
                if (!isVueComputed)
                {
                    continue;
                }

                config[method.ScriptName] = (Func<object>)method.DeclaringType[method.ScriptName];
            }

            return config;
        }

        /// <summary>
        /// Collects component's property names
        /// </summary>
        private static vue.ArrayPropsDefinition<TProps> GetCmpPropertyNames()
        {
            var names = new List<string>();

            var propsEntityMembers = typeof(TProps).GetMembers(BindingFlags.Public | BindingFlags.Instance);
            foreach (var member in propsEntityMembers)
            {
                var field = member as FieldInfo;
                if (field != null && !field.IsSpecialName)
                {
                    names.Add(field.ScriptName);
                    continue;
                }

                var prop = member as PropertyInfo;
                if (prop != null)
                {
                    names.Add(prop.ScriptFieldName ?? prop.Name);
                }
            }

            return names
                .Select(x => x.As<KeyOf<TProps>>())
                .ToArray();
        }
    }
}