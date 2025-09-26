using IdealWeatherAPI.Repositories.Forecasting.NationalWeatherService.Models.PointForecast;

namespace IdealWeatherAPI.Models.Forecasting
{
    public class ForecastEntry
    {
        public DateTimeOffset? StartTime { get; set; }
        public DateTimeOffset? EndTime { get; set; }
        public bool IsDaytime { get; set; }
        public int Temperature { get; set; }
        public string? TemperatureUnit { get; set; }
        public string? TemperatureTrend { get; set; }
        public string? ProbabilityOfPrecipitation { get; set; }
        public string? WindSpeed { get; set; }
        public string? WindDirection { get; set; }
        public string? Icon { get; set; }
        public string? ShortForecast { get; set; }
        public string? DetailedForecast { get; set; }
    }
}
