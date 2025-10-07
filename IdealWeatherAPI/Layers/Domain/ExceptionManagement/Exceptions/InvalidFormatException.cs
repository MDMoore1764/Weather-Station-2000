using IdealWeatherAPI.Layers.Domain.Exceptions.Interfaces;

namespace IdealWeatherAPI.Layers.Domain.ExceptionManagement.Exceptions
{
    public class InvalidFormatException : Exception, IHaveAStatus, IHaveATitle
    {
        public int StatusCode => 400;

        public string Title => "Invalid Format";

        public InvalidFormatException(string message) : base(message)
        {
        }

        public InvalidFormatException(string message, Exception innerException) : base(message, innerException)
        {
        }

    }
}
