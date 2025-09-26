using System.Text.Json.Serialization;

namespace IdealWeatherAPI.Repositories.Geocoding.USCensus.Models
{
    public class USCensusGeocodeResult
    {
        [JsonPropertyName("addressMatches")]
        public List<USCensusGeocodeAddress> AddressMatches { get; set; } = new();
    }
}
