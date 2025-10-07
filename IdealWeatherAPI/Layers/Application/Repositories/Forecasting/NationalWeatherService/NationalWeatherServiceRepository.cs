using IdealWeatherAPI.Configuration;
using IdealWeatherAPI.Layers.Application.Repositories.Forecasting;
using IdealWeatherAPI.Layers.Application.Repositories.Forecasting.NationalWeatherService.Models.PointAlerts;
using IdealWeatherAPI.Layers.Application.Repositories.Forecasting.NationalWeatherService.Models.PointForecast;
using IdealWeatherAPI.Layers.Application.Repositories.Forecasting.NationalWeatherService.Models.PointResponse;
using IdealWeatherAPI.Layers.Application.Repositories.Forecasting.NationalWeatherService.Utilities;
using IdealWeatherAPI.Layers.Domain.Forecasting;
using IdealWeatherAPI.Layers.Domain.Geocoding;
using System.Net;
using System.Net.Http;

namespace IdealWeatherAPI.Layers.Application.Repositories.Forecasting.NationalWeatherService
{
    public class NationalWeatherServiceRepository : IForecastingRepository
    {
        private readonly HttpClient _nwsClient;
        private readonly HttpClient _httpClient;
        private readonly ILogger<NationalWeatherServiceRepository> _logger;
        private const string POINTS_ENDPOINT = "points/";
        private const string ALERTS_ENDPOINT = "alerts/";

        public NationalWeatherServiceRepository(ILogger<NationalWeatherServiceRepository> logger, IHttpClientFactory httpClientFactory, AppSettings settings)
        {
            _httpClient = httpClientFactory.CreateClient();

            _nwsClient = httpClientFactory.CreateClient();
            _nwsClient.BaseAddress = new Uri(settings.APIs.GovernmentWeatherService.BaseURI);
            _nwsClient.DefaultRequestHeaders.TryAddWithoutValidation("User-Agent", settings.APIs.GovernmentWeatherService.UserAgent);
            _nwsClient.DefaultRequestHeaders.TryAddWithoutValidation("Accept", settings.APIs.GovernmentWeatherService.Accept);

            _httpClient.DefaultRequestHeaders.TryAddWithoutValidation("User-Agent", settings.APIs.GovernmentWeatherService.UserAgent);
            _httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Accept", settings.APIs.GovernmentWeatherService.Accept);

            _logger = logger;
        }

        public async Task<Forecast?> GetWeatherForecast(Coordinates coordinates)
        {
            _logger.LogInformation("""Retrieving forecast for coordinates "{coordinates}".""", coordinates);

            var nwsForecastTask = GetNWSForecast(coordinates);
            var nwsalertsTask = GetNWSAlert(coordinates);

            var nwsForecast = await nwsForecastTask;
            if (nwsForecast == null)
            {
                _logger.LogWarning("No forecast found.");
                return null;
            }

            var nwsAlert = await nwsalertsTask;

            if (nwsAlert?.Features == null)
            {
                _logger.LogInformation("No alerts found.");
            }
            else
            {
                _logger.LogInformation("{alertCount} alerts found!", nwsAlert.Features.Count);
            }

            return new Forecast()
            {
                AffectedLocations = nwsForecast.GetAffectedLocations(),
                Alerts = nwsAlert?.Features?.Select(f => f.Properties?.ToForecastAlert())?.Where(alert => alert != null).Cast<ForecastAlert>().ToList() ?? [],
                Forecasts = nwsForecast.ToForecastEntries(),
                GeneratedAt = nwsForecast.Properties?.GeneratedAt,
                LastUpdated = nwsForecast.Properties?.UpdateTime
            };

        }

        private async Task<NWSForecastResponse?> GetNWSForecast(Coordinates coordinates)
        {
            var coordinateFormatter = new CoordinateQueryFormatter(coordinates);
            var forecastUri = $"{POINTS_ENDPOINT}{coordinateFormatter}";

            var forecastPointsResponse = await _nwsClient.GetFromJsonAsync<NWSLocationResponse>(forecastUri);

            if (string.IsNullOrEmpty(forecastPointsResponse?.LocationFeatures?.ForecastURL))
            {
                return null;
            }

            return await _httpClient.GetFromJsonAsync<NWSForecastResponse>(forecastPointsResponse?.LocationFeatures?.ForecastURL);
        }

        private Task<NWSAlertResponse?> GetNWSAlert(Coordinates coordinates)
        {
            var coordinateFormatter = new CoordinateQueryFormatter(coordinates);
            var alertsUri = $"{ALERTS_ENDPOINT}?point={coordinateFormatter}";

            return _nwsClient.GetFromJsonAsync<NWSAlertResponse>(alertsUri);
        }
    }
}
