namespace IdealWeatherAPI.Layers.Application.Repositories.Forecasting.NationalWeatherService.Models.PointAlerts
{
    public class NWSAlertResponse
    {
        public List<NWSAlertFeature>? Features { get; set; }

        public string? Title { get; set; }

        public DateTimeOffset? Updated { get; set; }


    }
}
