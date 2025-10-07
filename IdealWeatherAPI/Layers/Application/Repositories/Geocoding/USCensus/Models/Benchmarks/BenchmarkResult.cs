using System.Text.Json.Serialization;

namespace IdealWeatherAPI.Layers.Application.Repositories.Geocoding.USCensus.Models.Benchmarks
{
    public class BenchmarkResult
    {
        [JsonPropertyName("benchmarks")]
        public List<Benchmark> Benchmarks { get; set; } = [];
    }
}
