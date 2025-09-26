using IdealWeatherAPI.Configurations;
using IdealWeatherAPI.ExceptionManagement.Exceptions;
using IdealWeatherAPI.Models.Geocoding;
using IdealWeatherAPI.Repositories.Forecasting.NationalWeatherService.Utilities;
using IdealWeatherAPI.Repositories.Geocoding.USCensus.Models;
using IdealWeatherAPI.Repositories.Geocoding.USCensus.Models.Benchmarks;
using IdealWeatherAPI.Repositories.Geocoding.USCensus.Utilities;
using IdealWeatherAPI.Repositories.Geocoding.USCensus.Validations;
using IdealWeatherAPI.Utilities.Extensions;
using Newtonsoft.Json;

namespace IdealWeatherAPI.Repositories.Geocoding.USCensus
{
    public class USCensusGeocodingServiceRepository : IGeocodingRepository
    {
        private readonly ILogger<USCensusGeocodingServiceRepository> _logger;
        private readonly AppSettings _settings;
        private readonly HttpClient _geocodeClient;

        private const string ADDRESS_ENDPOINT = "locations/address";
        private const string BENCHMARKS_ENDPOINT = "benchmarks";
        private const string DEFAULT_BENCHMARK = "4";

        public USCensusGeocodingServiceRepository(ILogger<USCensusGeocodingServiceRepository> logger, IHttpClientFactory httpClientFactory, AppSettings settings)
        {
            _logger = logger;
            this._settings = settings;
            _geocodeClient = httpClientFactory.CreateClient();
            _geocodeClient.BaseAddress = new Uri(settings.APIs.GeocodingCensusService.BaseURI);
            _geocodeClient.DefaultRequestHeaders.Add("Accept", settings.APIs.GeocodingCensusService.Accept);

        }

        /// <summary>
        /// Get coordinates from a valid US Census address using the US Census Geocoding API.
        /// </summary>
        /// <param name="address"></param>
        /// <returns>The first coordinate match for the provided address, if the address is found. Else, null.</returns>
        /// <exception cref="ArgumentException">Thrown if the address is invalid.</exception>
        public async Task<Coordinates?> GetCoordinates(Address address)
        {
            var addressValidator = new AddressValidator(address);

            if (!addressValidator.AddressIsValid())
            {
                throw new InvalidFormatException($"""The provided address is not valid: "{address}".""");
            }

            var latestBenchmark = await GetLatestBenchmarkVersionAsync();

            _logger.LogInformation("""Retrieving coordinates for address "{address}".""", address);

            var formatted = new AddressQueryFormatter(address);
            var uri = $"{ADDRESS_ENDPOINT}{formatted}&format=json&benchmark={latestBenchmark}";

            var apiResponse = await this._geocodeClient.GetFromJsonAsync<USCensusGeocodeResponse>(uri);


            var addressMatches = apiResponse?.Result.AddressMatches.Count ?? 0;
            var firstResponse = apiResponse?.Result.AddressMatches.FirstOrDefault()?.Coordinates;


            if (addressMatches != 1)
            {
                _logger.LogWarning("""{count} coordinate sets found for the specified address.""", addressMatches);
            }
            else
            {
                _logger.LogInformation("""Coordinates found: {coordinates}""", firstResponse);
            }


            return firstResponse;
        }

        private async Task<string> GetLatestBenchmarkVersionAsync()
        {

            _logger.LogInformation("Fetching latest benchmark...");
            var uri = BENCHMARKS_ENDPOINT ;
            var apiResponse = await this._geocodeClient.GetFromJsonAsync<BenchmarkResult>(uri);

            var latestBenchmark = apiResponse?.Benchmarks.FirstOrDefault();

            if(latestBenchmark == null)
            {
                _logger.LogWarning($"""Benchmarks not found, using default benchmark "{DEFAULT_BENCHMARK}" """);
                return DEFAULT_BENCHMARK;
            }

            _logger.LogInformation($"""Benchmarks found, using latest benchmark "{latestBenchmark.Id}". """);


            return latestBenchmark.Id;
        }
    }
}
