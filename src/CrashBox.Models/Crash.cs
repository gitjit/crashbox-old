using Newtonsoft.Json;

namespace CrashBox.Models
{
    public class Crash : BaseModel
    {
        [JsonProperty(PropertyName = "app")]
        public string App { get; set; }

        [JsonProperty(PropertyName = "version")]
        public string Version { get; set; }

        [JsonProperty(PropertyName = "os")]
        public string Os { get; set; }

        [JsonProperty(PropertyName = "region")]
        public string Region { get; set; }

        [JsonProperty(PropertyName = "language")]
        public string Language { get; set; }

        [JsonProperty(PropertyName = "method")]
        public string Method { get; set; } // Method call that create the exception

        [JsonProperty(PropertyName = "mhash")]
        public ulong Mhash { get; set; }

        [JsonProperty(PropertyName = "log")]
        public string Log { get; set; }

        [JsonProperty(PropertyName = "extype")]
        public string ExType { get; set; }

        [JsonProperty(PropertyName = "stack")]
        public string Stack { get; set; }

    }
}