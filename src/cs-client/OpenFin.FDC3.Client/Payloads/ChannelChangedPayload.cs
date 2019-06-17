using Openfin.Desktop.Messaging;
using Newtonsoft.Json;

namespace OpenFin.FDC3.Channels
{
    public class ChannelChangedPayload
    {
        public string Type => "channel-changed";
        [JsonIgnore]
        public ChannelClient Channel { get; set; }
        [JsonIgnore]
        public ChannelClient PreviousChannel { get; set; }
    }
}