using System.Text.Json.Serialization;

namespace IdealWeatherAPI.Repositories.Geocoding.USCensus.Models
{
    public class USCensusGeocodeResponse
    {
        [JsonPropertyName("result")]
        public USCensusGeocodeResult Result { get; set; } = default!;
    }
}
