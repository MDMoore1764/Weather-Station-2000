using System.Text.Json.Serialization;

namespace IdealWeatherAPI.Repositories.Geocoding.USCensus.Models.Benchmarks
{
    public class Benchmark
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = string.Empty;
    }
}
