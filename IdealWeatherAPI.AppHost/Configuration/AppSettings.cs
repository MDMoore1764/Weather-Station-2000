using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IdealWeatherAPI.AppHost.Configuration
{
    public class AppSettings
    {
        /// <summary>
        /// The number of Weather API replicas to host. This would be set from an environment variable in a real application.
        /// </summary>
        public static int WeatherAPIReplicas => 5;

        /// <summary>
        /// The name of the ideal weather api project, for reference by the Aspire host. This would be set from an environment variable in a real application.
        /// </summary>
        public static string WeatherAPIName => "IdealWeatherAPI";
    }
}
