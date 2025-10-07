using Microsoft.Extensions.Configuration;
using System.Runtime.CompilerServices;

namespace IdealWeatherAPI.Configuration.Extensions
{
    public static class ConfigurationExtensions
    {
        public static AppSettings AddConfiguration(this IServiceCollection  serviceCollection)
        {
            var startupConfiguration = GetConfiguration();
            var appSettings = new AppSettings(startupConfiguration);

            startupConfiguration.GetReloadToken().RegisterChangeCallback((current) =>
            {
                appSettings.UpdateFrom((current as IConfiguration)!);
            }, startupConfiguration);

            serviceCollection.AddSingleton((sp) =>
            {
                return startupConfiguration;
            });

            serviceCollection.AddSingleton((sp) =>
            {
                return appSettings;
            });

            return appSettings;
        }

        public static IConfiguration GetConfiguration()
        {
           return new ConfigurationBuilder()
            .AddJsonFile("Configuration/appsettings.json", false)
            .AddJsonFile($"configuration/appsettings.{AppSettings.Env}.json", true)
            .Build();
        }
    }
}
