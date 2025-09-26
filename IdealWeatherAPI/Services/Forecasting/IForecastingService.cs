using IdealWeatherAPI.Models.Forecasting;
using IdealWeatherAPI.Models.Geocoding;

namespace IdealWeatherAPI.Services.Forecasting
{
    public interface IForecastingService
    {
        Task<Forecast?> GetWeatherForecast(Address address);
        Task<Forecast?> GetWeatherForecast(Coordinates coordinates);
    }
}
