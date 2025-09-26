using IdealWeatherAPI.Models.Forecasting;
using IdealWeatherAPI.Models.Geocoding;

namespace IdealWeatherAPI.Repositories.Forecasting.NationalWeatherService.Models.PointForecast
{
    public class NWSForecastResponse
    {
        public NWSForecastGeometry? Geometry { get; set; }
        public NWSForecastProperties? Properties { get; set; }

        public List<List<Coordinates>> GetAffectedLocations()
        {
            return Geometry?.GetCoordinateSets() ?? [];
        }

        public List<ForecastEntry> ToForecastEntries()
        {
            return this.Properties?.Periods?.Select(p => new ForecastEntry()
            {
                DetailedForecast = p.DetailedForecast,
                EndTime = p.EndTime,
                Icon = p.Icon,
                IsDaytime = p.IsDaytime,
                ProbabilityOfPrecipitation = p.ProbabilityOfPrecipitation?.ToString() ?? "0%",
                ShortForecast = p.ShortForecast,
                StartTime = p.StartTime,
                Temperature = p.Temperature,
                TemperatureTrend = p.TemperatureTrend,
                TemperatureUnit = p.TemperatureUnit,
                WindDirection = p.WindDirection,
                WindSpeed = p.WindSpeed,
            }).ToList() ?? [];
        }
    }
}
