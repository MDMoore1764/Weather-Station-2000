
namespace IdealWeatherAPI.ExceptionManagement.Exceptions
{
    public class CoordinatesNotFoundException : Exception, IHaveAStatus
    {
        public int StatusCode => 499;

        public CoordinatesNotFoundException(string message) : base(message)
        {
        }

        public CoordinatesNotFoundException(string message, Exception innerException) : base(message, innerException)
        {
        }

    }
}
