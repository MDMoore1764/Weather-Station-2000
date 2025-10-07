namespace IdealWeatherAPI.Layers.Application.Repositories.Forecasting.NationalWeatherService.Models.PointForecast
{
    public class NWSProbabilityOfPrecipitation
    {
        public string? UnitCode { get; set; }
        public double? Value { get; set; }

        public override string ToString()
        {
            var val = (int)(Value ?? 0);
            var unit = UnitCode ?? "";

            return $"{val}{unit}";
        }
    }
}
