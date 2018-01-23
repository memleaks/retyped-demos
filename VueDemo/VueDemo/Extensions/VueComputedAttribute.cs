using System;

namespace VueDemo.Extensions
{
    /// <summary>
    /// Only static methods are supported.
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, Inherited = false)]
    public sealed class VueComputedAttribute : Attribute
    {
    }
}