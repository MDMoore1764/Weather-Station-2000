using IdealWeatherAPI.Layers.Application.Services.Forecasting;
using IdealWeatherAPI.Layers.Domain.Geocoding;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IdealWeatherAPI.Layers.Presentation.Controllers;

[ApiController]
[Route("[controller]/v{version:apiVersion}")]
public class ForecastController : ControllerBase
{
    private readonly ILogger<ForecastController> _logger;
    private readonly IForecastingService _forecastingService;

    public ForecastController(ILogger<ForecastController> logger, IForecastingService forecastingService)
    {
        _logger = logger;
        _forecastingService = forecastingService;
    }

    /// <summary>
    /// Get the weather forecast using coordinates.
    /// </summary>
    /// <param name="address">The United States address of the target location.</param>
    /// <returns>The 7-day weather forecast.</returns>
    [HttpGet("ByAddress")]
    public async Task<IActionResult> GetForecastByAddressAsync([FromQuery] Address address)
    {
        var forecast = await _forecastingService.GetWeatherForecast(address);
        return Ok(forecast);
    }

    /// <summary>
    /// Get the weather forecast using coordinates.
    /// </summary>
    /// <param name="coordinates">The coordinates of the target location, within the United States.</param>
    /// <returns>The 7-day weather forecast.</returns>
    [HttpGet("ByCoordinates")]
    public async Task<IActionResult> GetForecastByCoordinatesAsync([FromQuery] Coordinates coordinates)
    {
        var forecast = await _forecastingService.GetWeatherForecast(coordinates);

        if (forecast == null)
        {
            return UnprocessableEntity($"The specified location {coordinates} does not have a forecast available.");
        }

        return Ok(forecast);
    }
}
