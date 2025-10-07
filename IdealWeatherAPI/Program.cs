
using Asp.Versioning;
using IdealWeatherAPI.Configuration;
using IdealWeatherAPI.Configuration.Extensions;
using IdealWeatherAPI.Layers.Application.Repositories.Forecasting;
using IdealWeatherAPI.Layers.Application.Repositories.Forecasting.NationalWeatherService;
using IdealWeatherAPI.Layers.Application.Repositories.Geocoding;
using IdealWeatherAPI.Layers.Application.Repositories.Geocoding.USCensus;
using IdealWeatherAPI.Layers.Application.Services.Forecasting;
using IdealWeatherAPI.Layers.Presentation.ExceptionManagement.Middleware;
using IdealWeatherAPI.ServiceDefaults;
using Microsoft.Extensions.DependencyInjection;

namespace IdealWeatherAPI;

public class Program
{
    public static Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        ConfigureApplicationBuilder(builder);

        var app = builder.Build();

        ConfigureApplication(app);

        return app.RunAsync();
    }

    private static WebApplicationBuilder ConfigureApplicationBuilder(WebApplicationBuilder builder)
    {
        builder.Services.AddHealthChecks();

        var settings = builder.Services
            .AddConfiguration();


        builder.Services.AddApiVersioning(s =>
        {
            s.DefaultApiVersion = new ApiVersion(1, 0);
        });

        builder.Services
        .ConfigureLogging(builder, settings)
        .ConfigureOpenTelemetry(settings)
        .AddControllers();

        if (AppSettings.IsDevelopment)
        {
            builder.Services
            .AddOpenApi()
            .ConfigureSwagger();
        }

        InjectDependencies(builder.Services);

        return builder;
    }

    private static IServiceCollection InjectDependencies(IServiceCollection serviceCollection)
    {
        return serviceCollection
            .AddHttpClient()
            .AddScoped<IForecastingService, TheGoodOlForecastingService>()
            .AddScoped<IGeocodingRepository, USCensusGeocodingServiceRepository>()
            .AddScoped<IForecastingRepository, NationalWeatherServiceRepository>();
    }

    private static WebApplication ConfigureApplication(WebApplication app)
    {
        app.UseMiddleware<GlobalExceptionMiddleware>();

        app.MapDefaultEndpoints();

        app.UseCors(configureCors =>
        {
            configureCors
            .AllowAnyHeader()
            .AllowAnyMethod()
            .SetIsOriginAllowedToAllowWildcardSubdomains()
            .WithOrigins("http://localhost:5173");
        });

        if (AppSettings.IsDevelopment)
        {
            app.MapOpenApi();
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        return app;
    }
}
