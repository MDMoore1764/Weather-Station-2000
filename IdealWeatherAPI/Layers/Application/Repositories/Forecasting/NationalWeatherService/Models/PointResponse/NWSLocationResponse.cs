using System.Text.Json.Serialization;

namespace IdealWeatherAPI.Layers.Application.Repositories.Forecasting.NationalWeatherService.Models.PointResponse
{
    public class NWSLocationResponse
    {
        [JsonPropertyName("properties")]
        public NWSFeature LocationFeatures { get; set; } = default!;
    }
}
