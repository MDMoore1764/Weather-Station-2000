using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace IdealWeatherAPI.Layers.Domain.Geocoding
{
    public class Address
    {
        public string? StreetName { get; set; }
        public string? Urbanization { get; set; }
        public string? City { get; set; }
        public string? Municipio { get; set; }
        public string? State { get; set; }
        public string? Postalcode { get; set; }

        public override string ToString()
        {
            return $"{StreetName}, {City} {State}";
        }
    }
}
