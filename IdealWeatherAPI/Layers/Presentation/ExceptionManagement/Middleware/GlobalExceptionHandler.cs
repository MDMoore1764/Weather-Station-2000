using IdealWeatherAPI.Layers.Domain.Exceptions.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;

namespace IdealWeatherAPI.Layers.Presentation.ExceptionManagement.Middleware
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionMiddleware> _logger;

        public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unhandled exception occurred");

                context.Response.ContentType = "application/json";
                context.Response.StatusCode = ex is IHaveAStatus e ? e.StatusCode : (int)HttpStatusCode.InternalServerError;

                var problemDetails = new ProblemDetails()
                {
                    Status = context.Response.StatusCode,
                    Detail = ex.Message,
                    Title = ex is IHaveATitle t ? t.Title : "An unexpected error occurred.",
                };

                await context.Response.WriteAsync(JsonSerializer.Serialize(problemDetails));
            }
        }
    }
}
