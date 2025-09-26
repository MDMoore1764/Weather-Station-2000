using IdealWeatherAPI.ExceptionManagement.Exceptions;
using IdealWeatherAPI.Models.Forecasting;
using IdealWeatherAPI.Models.Geocoding;
using IdealWeatherAPI.Repositories.Forecasting;
using IdealWeatherAPI.Repositories.Geocoding;

namespace IdealWeatherAPI.Services.Forecasting
{
    public class TheGoodOlForecastingService : IForecastingService
    {
        private readonly IForecastingRepository _forecastingRepository;
        private readonly IGeocodingRepository _geocodingRepository;

        public TheGoodOlForecastingService(IForecastingRepository forecastingRepository, IGeocodingRepository geocodingRepository)
        {
            this._forecastingRepository = forecastingRepository;
            this._geocodingRepository = geocodingRepository;
        }

        /// <summary>
        /// Gets the weather forecast from the provided address. 
        /// </summary>
        /// <param name="address">The address for the weather forecast prediction.</param>
        /// <returns></returns>
        /// <exception cref="CoordinatesNotFoundException"></exception>
        public async Task<Forecast?> GetWeatherForecast(Address address)
        {
            var coordinates = await this._geocodingRepository.GetCoordinates(address);
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
