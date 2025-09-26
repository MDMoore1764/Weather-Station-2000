using IdealWeatherAPI.AppHost.Configuration;
using Microsoft.Extensions.Configuration;
using Projects;

var builder = DistributedApplication.CreateBuilder(args);

builder
    .AddProject<Projects.IdealWeatherAPI>(AppSettings.WeatherAPIName)
    .WithReplicas(AppSettings.WeatherAPIReplicas);
    
using var app = builder.Build();
await app.RunAsync();
