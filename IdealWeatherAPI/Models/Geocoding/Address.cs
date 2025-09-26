using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace IdealWeatherAPI.Models.Geocoding
{
    public class Address
    {
        public string? StructureNumber { get; set; }
        public string? StreetName { get; set; }
        public string? Urbanization { get; set; }
        public string? City { get; set; }
        public string? Municipio { get; set; }
        public string? State { get; set; }
        public string? Postalcode { get; set; }
        public string? Street
        {
            get
            {
                if (StructureNumber == null)
                {
                    return null;
                }

                if (StreetName == null)
                {
                    return null;
                }


                return $"{StructureNumber} {StreetName}";
            }
        }

        public override string ToString()
        {
            return $"{StructureNumber} {StreetName}, {City} {State}";
        }
    }
}
