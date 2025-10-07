using IdealWeatherAPI.Layers.Domain.Geocoding;

namespace IdealWeatherAPI.Layers.Application.Repositories.Geocoding.USCensus.Validations
{
    public class AddressValidator
    {
        private readonly Address _address;

        public AddressValidator(Address address)
        {
            _address = address;
        }

        /// <summary>
        /// Validates the address for use with the US Census Geocoding Service's "address" search type. 
        /// </summary>
        /// <returns>True if the street and postal code OR the street, city, and state are present.</returns>
        public bool AddressIsValid()
        {
            if (!string.IsNullOrWhiteSpace(_address.StreetName) && !string.IsNullOrWhiteSpace(_address.Postalcode))
            {
                return true;
            }

            if (!string.IsNullOrWhiteSpace(_address.StreetName) && !string.IsNullOrWhiteSpace(_address.City) && !string.IsNullOrWhiteSpace(_address.State))
            {
                return true;
            }

            return false;
        }

    }
}
