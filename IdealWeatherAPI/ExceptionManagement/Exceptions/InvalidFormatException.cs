namespace IdealWeatherAPI.ExceptionManagement.Exceptions
{
    public class InvalidFormatException : Exception, IHaveAStatus
    {
        public int StatusCode => 400;

        public InvalidFormatException(string message) : base(message)
        {
        }

        public InvalidFormatException(string message, Exception innerException) : base(message, innerException)
        {
        }

    }
}
