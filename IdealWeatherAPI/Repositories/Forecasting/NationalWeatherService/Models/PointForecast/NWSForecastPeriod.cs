namespace IdealWeatherAPI.Repositories.Forecasting.NationalWeatherService.Models.PointForecast
{
    public class NWSForecastPeriod
    {
        public int Number { get; set; }
        public string? Name { get; set; }
        public DateTimeOffset? StartTime { get; set; }
        public DateTimeOffset? EndTime { get; set; }
        public bool IsDaytime { get; set; }
        public int Temperature { get; set; }
        public string? TemperatureUnit { get; set; }
        public string? TemperatureTrend { get; set; }
        public NWSProbabilityOfPrecipitation? ProbabilityOfPrecipitation { get; set; }
        public string? WindSpeed { get; set; }
        public string? WindDirection { get; set; }
        public string? Icon { get; set; }
        public string? ShortForecast { get; set; }
        public string? DetailedForecast { get; set; }
    }
}
