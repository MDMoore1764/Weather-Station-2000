using IdealWeatherAPI.Models.Geocoding;
using System.Text.Json.Serialization;

namespace IdealWeatherAPI.Repositories.Geocoding.USCensus.Models
{
    public class USCensusGeocodeAddress
    {
        [JsonPropertyName("coordinates")]
        public Coordinates Coordinates { get; set; } = default!;
    }
}
