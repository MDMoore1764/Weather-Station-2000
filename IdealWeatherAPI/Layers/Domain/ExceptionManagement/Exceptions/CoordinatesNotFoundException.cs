using IdealWeatherAPI.Layers.Domain.Exceptions.Interfaces;

namespace IdealWeatherAPI.Layers.Domain.ExceptionManagement.Exceptions
{
    public class CoordinatesNotFoundException : Exception, IHaveAStatus, IHaveATitle
    {
        public int StatusCode => 499;
        public string Title => "Coordinates Not Found";
        public CoordinatesNotFoundException(string message) : base(message)
        {
        }

        public CoordinatesNotFoundException(string message, Exception innerException) : base(message, innerException)
        {
        }

    }
}
