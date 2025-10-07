using System.Text.Json.Serialization;

namespace IdealWeatherAPI.Layers.Domain.Forecasting
{
    public class ForecastAlert
    {
        /// <summary>
        /// The names of the areas affected by the alert.
        /// </summary>
        public HashSet<string> AffectedAreas { get; set; } = [];
        /// <summary>
        /// When the alert was sent to the weather station.
        /// </summary>
        public DateTimeOffset? Sent { get; set; }
        /// <summary>
        /// When the alert starts being in-effect.
        /// </summary>
        public DateTimeOffset? Effective { get; set; }
        /// <summary>
        /// When the event is expected to start.
        /// </summary>
        public DateTimeOffset? Onset { get; set; }
        /// <summary>
        /// When the alert expires.
        /// </summary>
        public DateTimeOffset? Expires { get; set; }
        /// <summary>
        /// When the event expires.
        /// </summary>
        public DateTimeOffset? Ends { get; set; }
        public string? Category { get; set; }
        /// <summary>
        /// How severe the event is.
        /// </summary>
        public string? Severity { get; set; }
        /// <summary>
        /// How certain the event is to occur.
        /// </summary>
        public string? Certainty { get; set; }
        /// <summary>
        /// How urgently the warning should be heeded.
        /// </summary>
        public string? Urgency { get; set; }
        /// <summary>
        /// What the event is.
        /// </summary>
        public string? Event { get; set; }
        /// <summary>
        /// Who sent the event.
        /// </summary>
        public string? SenderName { get; set; }
        /// <summary>
        /// The headline statement for the event.
        /// </summary>
        public string? Headline { get; set; }
        /// <summary>
        /// A description of the event in detail.
        /// </summary>
        public string? Description { get; set; }
        /// <summary>
        /// Instructions for people experiencing the event.
        /// </summary>
        public string? Instruction { get; set; }
        /// <summary>
        /// The event code.
        /// </summary>
        public string? Code { get; set; }
    }
}
