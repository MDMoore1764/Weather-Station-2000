using IdealWeatherAPI.Models.Geocoding;

namespace IdealWeatherAPI.Repositories.Geocoding
{
    public interface IGeocodingRepository
    {
        Task<Coordinates?> GetCoordinates(Address address);
    }
}
