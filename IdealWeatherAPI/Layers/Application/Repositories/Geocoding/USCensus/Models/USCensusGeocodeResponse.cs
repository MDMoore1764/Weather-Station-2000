using System.Text.Json.Serialization;

namespace IdealWeatherAPI.Layers.Application.Repositories.Geocoding.USCensus.Models
{
    public class USCensusGeocodeResponse
    {
        [JsonPropertyName("result")]
        public USCensusGeocodeResult Result { get; set; } = default!;
    }
}
