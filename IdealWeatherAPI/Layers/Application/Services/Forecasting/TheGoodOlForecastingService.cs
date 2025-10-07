using IdealWeatherAPI.Layers.Application.Repositories.Forecasting;
using IdealWeatherAPI.Layers.Application.Repositories.Geocoding;
using IdealWeatherAPI.Layers.Domain.ExceptionManagement.Exceptions;
using IdealWeatherAPI.Layers.Domain.Forecasting;
using IdealWeatherAPI.Layers.Domain.Geocoding;

namespace IdealWeatherAPI.Layers.Application.Services.Forecasting
{
    public class TheGoodOlForecastingService : IForecastingService
    {
        private readonly IForecastingRepository _forecastingRepository;
        private readonly IGeocodingRepository _geocodingRepository;

        public TheGoodOlForecastingService(IForecastingRepository forecastingRepository, IGeocodingRepository geocodingRepository)
        {
            _forecastingRepository = forecastingRepository;
            _geocodingRepository = geocodingRepository;
        }

        /// <summary>
        /// Gets the weather forecast from the provided address. 
        /// </summary>
        /// <param name="address">The address for the weather forecast prediction.</param>
        /// <returns></returns>
        /// <exception cref="CoordinatesNotFoundException"></exception>
        public async Task<Forecast?> GetWeatherForecast(Address address)
        {
            var coordinates = await _geocodingRepository.GetCoordinates(address);
            if (coordinates == null)
            {
                throw new CoordinatesNotFoundException($"""No coordinates could be determined for the provided address: "{address}".""");
            }

            return await GetWeatherForecast(coordinates);
        }

        public Task<Forecast?> GetWeatherForecast(Coordinates coordinates)
        {
            return _forecastingRepository.GetWeatherForecast(coordinates);
        }
    }
}
