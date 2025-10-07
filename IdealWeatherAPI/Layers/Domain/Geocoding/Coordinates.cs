using System.Text.Json.Serialization;

namespace IdealWeatherAPI.Layers.Domain.Geocoding
{
    public class Coordinates
    {
        [JsonPropertyName("x")]
        public decimal Longitude { get; set; }
        [JsonPropertyName("y")]
        public decimal Latitude { get; set; }
        public Coordinates()
        {
            
        }

        public Coordinates(decimal longitude, decimal latitude)
        {
            Latitude = latitude;
            Longitude = longitude;
        }

        public override string ToString()
        {
            return $"[{Longitude}, {Latitude}]";
        }
    }
}
