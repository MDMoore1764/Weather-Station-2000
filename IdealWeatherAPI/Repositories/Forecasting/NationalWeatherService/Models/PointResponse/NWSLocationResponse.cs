using System.Text.Json.Serialization;

namespace IdealWeatherAPI.Repositories.Forecasting.NationalWeatherService.Models.PointForecast
{
    public class NWSLocationResponse
    {
        [JsonPropertyName("properties")]
        public NWSFeature LocationFeatures { get; set; } = default!;
    }
}
