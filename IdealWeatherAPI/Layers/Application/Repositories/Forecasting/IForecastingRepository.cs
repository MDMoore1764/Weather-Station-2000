using IdealWeatherAPI.Layers.Domain.Forecasting;
using IdealWeatherAPI.Layers.Domain.Geocoding;

namespace IdealWeatherAPI.Layers.Application.Repositories.Forecasting
{
    public interface IForecastingRepository
    {
        Task<Forecast?> GetWeatherForecast(Coordinates coordinates);
    }
}
