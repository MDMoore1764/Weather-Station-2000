using IdealWeatherAPI.Layers.Domain.Geocoding;
using System.Text.Json.Serialization;

namespace IdealWeatherAPI.Layers.Application.Repositories.Geocoding.USCensus.Models
{
    public class USCensusGeocodeAddress
    {
        [JsonPropertyName("coordinates")]
        public Coordinates Coordinates { get; set; } = default!;
    }
}
