using System.Text.Json.Serialization;

namespace IdealWeatherAPI.Layers.Application.Repositories.Forecasting.NationalWeatherService.Models.PointResponse
{
    public class NWSFeature
    {
        [JsonPropertyName("forecast")]
        public string ForecastURL { get; set; } = string.Empty;

        [JsonPropertyName("cwa")]
        public string WeatherStation { get; set;}
    }
}
