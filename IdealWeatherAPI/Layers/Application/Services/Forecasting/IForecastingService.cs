using IdealWeatherAPI.Layers.Domain.Forecasting;
using IdealWeatherAPI.Layers.Domain.Geocoding;

namespace IdealWeatherAPI.Layers.Application.Services.Forecasting
{
    public interface IForecastingService
    {
        Task<Forecast?> GetWeatherForecast(Address address);
        Task<Forecast?> GetWeatherForecast(Coordinates coordinates);
    }
}
