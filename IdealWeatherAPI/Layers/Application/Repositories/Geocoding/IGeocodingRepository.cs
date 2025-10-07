using IdealWeatherAPI.Layers.Domain.Geocoding;

namespace IdealWeatherAPI.Layers.Application.Repositories.Geocoding
{
    public interface IGeocodingRepository
    {
        Task<Coordinates?> GetCoordinates(Address address);
    }
}
