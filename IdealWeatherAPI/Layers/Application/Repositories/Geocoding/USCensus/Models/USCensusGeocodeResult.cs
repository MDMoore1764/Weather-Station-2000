using System.Text.Json.Serialization;

namespace IdealWeatherAPI.Layers.Application.Repositories.Geocoding.USCensus.Models
{
    public class USCensusGeocodeResult
    {
        [JsonPropertyName("addressMatches")]
        public List<USCensusGeocodeAddress> AddressMatches { get; set; } = new();
    }
}
