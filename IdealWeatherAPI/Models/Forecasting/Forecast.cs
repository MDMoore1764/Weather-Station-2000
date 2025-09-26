using IdealWeatherAPI.Models.Geocoding;

namespace IdealWeatherAPI.Models.Forecasting
{
    public class Forecast
    {
        public DateTimeOffset? GeneratedAt { get; set; }
        public DateTimeOffset? LastUpdated { get; set; }
        public List<List<Coordinates>> AffectedLocations { get; set; }
        public List<ForecastEntry> Forecasts { get; set; }
        public List<ForecastAlert> Alerts { get; set; }
        public Forecast()
        {
            Forecasts = [];
        }
    }
}
