using IdealWeatherAPI.Models.Forecasting;
using IdealWeatherAPI.Models.Geocoding;

namespace IdealWeatherAPI.Repositories.Forecasting
{
    public interface IForecastingRepository
    {
        Task<Forecast?> GetWeatherForecast(Coordinates coordinates);
    }
}
