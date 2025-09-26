using System.Text.Json.Serialization;

namespace IdealWeatherAPI.Models.Geocoding
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
            this.Latitude = latitude;
            this.Longitude = longitude;
        }

        public override string ToString()
        {
            return $"[{Longitude}, {Latitude}]";
        }
    }
}
