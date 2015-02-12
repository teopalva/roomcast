
var ButtonInteractionsMixin = {

    insertNewChannel: function(channels, chId) {

        var newChannels = [];
        var found = false;
        for(var i=0; i<channels.length; i++) {
            if (+chId === +channels[i]) {
                return channels;
            }
            if(+chId < +channels[i] && !found) {
                newChannels.push(chId);
                newChannels.push(channels[i]);
                found = true;
            } else {
                newChannels.push(channels[i]);
            }
        }
        if(!found) {
            newChannels.push(chId);
        }

        return newChannels;
    }

};

module.exports = ButtonInteractionsMixin;