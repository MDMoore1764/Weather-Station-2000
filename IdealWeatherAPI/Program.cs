
using Asp.Versioning;
using IdealWeatherAPI.Configuration.Extensions;
using IdealWeatherAPI.Configurations;
using IdealWeatherAPI.Repositories.Forecasting;
using IdealWeatherAPI.Repositories.Forecasting.NationalWeatherService;
using IdealWeatherAPI.Repositories.Geocoding;
using IdealWeatherAPI.Repositories.Geocoding.USCensus;
using IdealWeatherAPI.ServiceDefaults;
using IdealWeatherAPI.Services.Forecasting;
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
        .AddOpenApi()
        .ConfigureSwagger()
        .AddControllers();

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
        app.MapDefaultEndpoints();

        app.UseCors(configureCors =>
        {
            configureCors
            .AllowAnyHeader()
            .AllowAnyMethod()
            .SetIsOriginAllowedToAllowWildcardSubdomains()
            .WithOrigins("http://localhost:5173");
        });

        if (app.Environment.IsDevelopment())
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
