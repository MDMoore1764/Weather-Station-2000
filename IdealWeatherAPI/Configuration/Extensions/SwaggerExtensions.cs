namespace IdealWeatherAPI.Configuration.Extensions
{
    public static class SwaggerExtensions
    {
        public static IServiceCollection ConfigureSwagger(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddEndpointsApiExplorer();
            serviceCollection.AddSwaggerGen();
            return serviceCollection;
        }
    }
}
