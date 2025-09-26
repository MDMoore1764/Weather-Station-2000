using IdealWeatherAPI.Models.Geocoding;

namespace IdealWeatherAPI.Repositories.Forecasting.NationalWeatherService.Utilities
{
    public class CoordinateQueryFormatter
    {
        private readonly Coordinates coordinates;

        public CoordinateQueryFormatter(Coordinates coordinates) 
        {
            this.coordinates = coordinates;
        }

        public override string ToString()
        {
            return $"{coordinates.Latitude},{coordinates.Longitude}";
        }
    }
}
