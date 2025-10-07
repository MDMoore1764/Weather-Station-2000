namespace IdealWeatherAPI.Layers.Application.Repositories.Forecasting.NationalWeatherService.Models.PointForecast
{
    public class NWSForecastProperties
    {
        public string? Units { get; set; }
        public string? ForecastGenerator { get; set; }
        public DateTimeOffset? GeneratedAt { get; set; }
        public DateTimeOffset? UpdateTime { get; set; }

        // e.g. "2025-09-25T17:00:00+00:00/P7DT11H"
        public string? ValidTimes { get; set; }
        public List<NWSForecastPeriod>? Periods { get; set; }
    }
}
