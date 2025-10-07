using IdealWeatherAPI.Layers.Domain.Forecasting;
using System.Text.Json.Serialization;

namespace IdealWeatherAPI.Layers.Application.Repositories.Forecasting.NationalWeatherService.Models.PointAlerts
{
    public class NWSAlertProperties
    {
        [JsonPropertyName("@id")]
        public string? AtId { get; set; }

        [JsonPropertyName("@type")]
        public string? AtType { get; set; }
        public string? Id { get; set; }
        public string? AreaDesc { get; set; }
        public List<string>? AffectedZones { get; set; }
        public DateTimeOffset? Sent { get; set; }
        public DateTimeOffset? Effective { get; set; }
        public DateTimeOffset? Onset { get; set; }
        public DateTimeOffset? Expires { get; set; }
        public DateTimeOffset? Ends { get; set; }
        public string? Status { get; set; }
        public string? MessageType { get; set; }
        public string? Category { get; set; }
        public string? Severity { get; set; }
        public string? Certainty { get; set; }
        public string? Urgency { get; set; }
        public string? Event { get; set; }
        public string? Sender { get; set; }
        public string? SenderName { get; set; }
        public string? Headline { get; set; }
        public string? Description { get; set; }
        public string? Instruction { get; set; }
        public string? Response { get; set; }
        public string? Scope { get; set; }
        public string? Code { get; set; }
        public string? Language { get; set; }
        public string? Web { get; set; }

        public ForecastAlert ToForecastAlert()
        {
            var areas = AreaDesc?.Split(";", StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries).ToHashSet() ?? [];
            return new ForecastAlert()
            {
                AffectedAreas = areas,
                Category = Category,
                Certainty = Certainty,
                Code = Code,
                Description = Description,
                Instruction = Instruction,
                Effective = Effective,
                Ends = Ends,
                Event = Event,
                Expires = Expires,
                Headline = Headline,
                Onset = Onset,
                SenderName = SenderName,
                Sent = Sent,
                Severity = Severity,
                Urgency = Urgency,
            };
        }
    }
}
