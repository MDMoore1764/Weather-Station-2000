using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using Serilog;
using System.Net.NetworkInformation;

namespace IdealWeatherAPI.Configuration.Extensions
{
    public static class LoggingExtensions
    {
        public static IServiceCollection ConfigureLogging(this IServiceCollection serviceCollection, WebApplicationBuilder builder, AppSettings settings)
        {
            Log.Logger = new LoggerConfiguration()
            .ReadFrom
            .Configuration(settings.Configuration)
            .CreateLogger();

            builder.Logging.ClearProviders();
            builder.Logging.AddSerilog(Log.Logger);
            builder.Host.UseSerilog(Log.Logger);

            return serviceCollection.AddSerilog(Log.Logger);
        }

        public static IServiceCollection ConfigureOpenTelemetry(this IServiceCollection serviceCollection, AppSettings appSettings)
        {
            serviceCollection
                .AddOpenTelemetry()
                .ConfigureResource(r => r.AddService(
                    serviceName: appSettings.Application.Name,
                    serviceVersion: appSettings.Application.Version))
                .WithTracing(t =>
                {
                    t.AddAspNetCoreInstrumentation();
                    t.AddHttpClientInstrumentation();
                    t.AddOtlpExporter(opt =>
                    {
                        opt.Endpoint = new Uri(appSettings.OpenTelemetry.Tracing.Exporter.Endpoint);
                    });
                })
                .WithMetrics(m =>
                {
                    m.AddRuntimeInstrumentation();
                    m.AddOtlpExporter(opt =>
                    {
                        opt.Endpoint = new Uri(appSettings.OpenTelemetry.Metrics.Exporter.Endpoint);
                    });
                });


            return serviceCollection;
        }
    }
}
