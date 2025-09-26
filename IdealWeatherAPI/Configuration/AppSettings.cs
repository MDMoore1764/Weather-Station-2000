namespace IdealWeatherAPI.Configurations
{
    public class AppSettings
    {
        public static string DefaultEnv => "development";
        public static string Env => Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")?.ToLower() ?? DefaultEnv;
        public IConfiguration Configuration { get; }
        public LoggingSettings Logging { get; set; } = new();
        public string AllowedHosts { get; set; } = string.Empty;
        public ApplicationSettings Application { get; set; } = new();
        public SerilogSettings Serilog { get; set; } = new();
        public OpenTelemetrySettings OpenTelemetry { get; set; } = new();
        public APISettings APIs { get; set; } = new();
        public AppSettings(IConfiguration configuration)
        {
            ConfigurationBinder.Bind(configuration, this);
            this.Configuration = configuration;
        }

        public void UpdateFrom(IConfiguration configuration)
        {
            ConfigurationBinder.Bind(configuration, this);
        }
    }

    public class APISettings
    {
        public GeocodingCensusServiceSettings GeocodingCensusService { get; set; } = new();
        public GovernmentWeatherService GovernmentWeatherService { get; set; } = new();
    }

    public class GeocodingCensusServiceSettings
    {
        public string BaseURI { get; set; } = string.Empty;
        public string UserAgent { get; set; } = string.Empty;
        public string Format { get; set; } = string.Empty;
        public string Accept { get; set; } = string.Empty;
    }

    public class GovernmentWeatherService
    {
        public string BaseURI { get; set; } = string.Empty;
        public string UserAgent { get; set; } = string.Empty;
        public string Accept { get; set; } = string.Empty;
    }


    public class LoggingSettings
    {
        public LogLevelSettings LogLevel { get; set; } = new();
    }

    public class LogLevelSettings
    {
        public string Default { get; set; } = string.Empty;
        public string MicrosoftAspNetCore { get; set; } = string.Empty;
    }

    public class ApplicationSettings
    {
        public string Name { get; set; } = string.Empty;
        public string Version { get; set; } = string.Empty;
    }

    public class SerilogSettings
    {
        public string MinimumLevel { get; set; } = string.Empty;
        public List<SerilogWriteToSettings> WriteTo { get; set; } = new();
        public List<string> Enrich { get; set; } = new();
    }

    public class SerilogWriteToSettings
    {
        public string Name { get; set; } = string.Empty;
        public SerilogArgsSettings? Args { get; set; }
    }

    public class SerilogArgsSettings
    {
        public string Endpoint { get; set; } = string.Empty;
        public string Protocol { get; set; } = string.Empty;
        public Dictionary<string, string> ResourceAttributes { get; set; } = new();
        public bool IncludeScopes { get; set; }
        public List<string> ExportedFields { get; set; } = new();
    }

    public class OpenTelemetrySettings
    {
        public OpenTelemetryResourceSettings Resource { get; set; } = new();
        public OpenTelemetryTracingSettings Tracing { get; set; } = new();
        public OpenTelemetryMetricsSettings Metrics { get; set; } = new();
        public OpenTelemetryLogsSettings Logs { get; set; } = new();
    }

    public class OpenTelemetryResourceSettings
    {
        public string ServiceName { get; set; } = string.Empty;
        public string ServiceVersion { get; set; } = string.Empty;
    }

    public class OpenTelemetryTracingSettings
    {
        public bool Enabled { get; set; }
        public OpenTelemetryExporterSettings Exporter { get; set; } = new();
        public OpenTelemetrySamplerSettings Sampler { get; set; } = new();
    }

    public class OpenTelemetryMetricsSettings
    {
        public bool Enabled { get; set; }
        public OpenTelemetryExporterSettings Exporter { get; set; } = new();
        public int IntervalSeconds { get; set; }
    }

    public class OpenTelemetryLogsSettings
    {
        public bool Enabled { get; set; }
        public OpenTelemetryExporterSettings Exporter { get; set; } = new();
    }

    public class OpenTelemetryExporterSettings
    {
        public string Endpoint { get; set; } = string.Empty;
        public string Protocol { get; set; } = string.Empty;
    }

    public class OpenTelemetrySamplerSettings
    {
        public string Type { get; set; } = string.Empty;
    }
}
