using System.Text.Json.Serialization;

namespace IdealWeatherAPI.Repositories.Forecasting.NationalWeatherService.Models.PointForecast
{
    public class NWSFeature
    {
        [JsonPropertyName("forecast")]
        public string ForecastURL { get; set; } = string.Empty;

        [JsonPropertyName("cwa")]
        public string WeatherStation { get; set;}
    }
}
