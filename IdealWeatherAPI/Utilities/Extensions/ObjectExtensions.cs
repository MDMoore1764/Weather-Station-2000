using System.Net;

namespace IdealWeatherAPI.Utilities.Extensions
{
    public static class ObjectExtensions
    {
        /// <summary>
        /// Provides a URL-encoded query string, beginning with a "?", separated by &.
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="propertyName"></param>
        /// <returns></returns>
       public static string ToQueryString(this object obj, string? propertyName = null)
        {
            string? primativeValue = null;
            if(obj == null)
            {
                primativeValue = "";
            }

            else if(obj is string s)
            {
                primativeValue = s;
            }

            var type = obj?.GetType();

            if (primativeValue == null && type != null && type.IsValueType)
            {
                primativeValue = obj?.ToString() ?? "";
            }

            if(primativeValue != null && propertyName == null)
            {
                return primativeValue;
            }
            else if (primativeValue != null)
            {
                return $"{WebUtility.UrlEncode(propertyName)}={WebUtility.UrlEncode(primativeValue)}";
            }


            var properties = type!.GetProperties();

            List<string> propertyParts = [];

            foreach (var property in properties)
            {
                var value = property.GetValue(obj, null);

                if (value == null)
                {
                    continue;
                }

                propertyParts.Add(value.ToQueryString(property.Name));
            }

            var propertyString = string.Join("&", propertyParts);

            return $"?{propertyString}";
        }
    }
}
