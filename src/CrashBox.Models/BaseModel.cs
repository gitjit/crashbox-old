using System;
using Newtonsoft.Json;

namespace CrashBox.Models
{
    public class BaseModel
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "pk")]
        public string PKey { get; set; }

        [JsonProperty(PropertyName = "_ts")]
        public ulong TStamp { get; set; }
    }
}