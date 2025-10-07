using IdealWeatherAPI.Layers.Domain.Geocoding;

namespace IdealWeatherAPI.Layers.Application.Repositories.Forecasting.NationalWeatherService.Models.PointForecast
{
    public class NWSForecastGeometry
    {
        public string? Type { get; set; }
        public List<List<List<decimal>>>? Coordinates { get; set; }

        public List<List<Coordinates>> GetCoordinateSets()
        {
            return Coordinates?
                .Select(coordinateSet => 
                    coordinateSet
                        .Select(c => 
                            new Coordinates(c[0], c[1]))
                        .ToList())
                .ToList() 
                ?? [];
        }
    }
}
