
var NutellaMixin = {

    getChannelsForRid: function(message, rid) {
        var myChannelsId = [];
        var myChannels = [];
        message.forEach(function(f) {
            for (var i in f.items) {
                var item = f.items[i];
                if (item.name === 'iPad1') {
                    myChannelsId = item.channels;
                    break;
                }
            }
        });
        myChannelsId.forEach(function(id) {
            myChannels.push(CHANNELS[id]);
        });
    },

    getUrlForAsset: function(assetName, assetType) {

        var broker;
        if('nutella' in window) {
            broker = query_parameters.broker;
        } else {
            broker = '52.1.142.215';    // TODO hardcoded broker
        }

        var runId = 'RoomQuake';    // TODO hardcoded runid
        if(assetType == null) {
            return 'http://' + broker + ':57880/roomcast/main-interface/assets/channels/'  + '/' + assetName;
        }
        return 'http://' + broker + ':57880/roomcast/main-interface/assets/channels/' + runId + '/' + assetType + '/' + assetName;

    }

};

module.exports = NutellaMixin;