using IdealWeatherAPI.Layers.Domain.Geocoding;
using System.Net;

namespace IdealWeatherAPI.Layers.Application.Repositories.Geocoding.USCensus.Utilities
{
    public class AddressQueryFormatter
    {
        private readonly Address _address;

        public AddressQueryFormatter(Address address)
        {
            _address = address;
        }

        public override string ToString()
        {
            Dictionary<string, string> namedParameters = [];

            EvaluateAndAddParameter(namedParameters, nameof(_address.City), _address.City);
            EvaluateAndAddParameter(namedParameters, nameof(_address.State), _address.State);
            EvaluateAndAddParameter(namedParameters, nameof(_address.Street), _address.Street);
            EvaluateAndAddParameter(namedParameters, "Zip", _address.Postalcode);

            var castParameters = namedParameters.Select(kvp => $"{kvp.Key}={kvp.Value}");

            var joinedParameters = string.Join("&", castParameters);

            return $"?{joinedParameters}".ToLower();
        }

        private static void EvaluateAndAddParameter(Dictionary<string, string> namedParameters, string parameterName, string? value)
        {
            if (!string.IsNullOrEmpty(value))
            {
                namedParameters.Add(WebUtility.UrlEncode(parameterName), WebUtility.UrlEncode(value));
            }
        }

    }
}
