namespace IdealWeatherAPI.Layers.Application.Repositories.Forecasting.NationalWeatherService.Models.PointForecast
{
    public class NWSForecastProperties
    {
        public string? Units { get; set; }
        public string? ForecastGenerator { get; set; }
        public DateTimeOffset? GeneratedAt { get; set; }
        public DateTimeOffset? UpdateTime { get; set; }
        public string? ValidTimes { get; set; }
        public List<NWSForecastPeriod>? Periods { get; set; }
    }
}
