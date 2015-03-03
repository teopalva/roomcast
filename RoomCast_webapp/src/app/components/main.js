
var React = require('react');
var Channel = require('./Channel');

var Main = React.createClass({

 componentDidMount: function() {
        var self=this;

        nutella.net.subscribe('mapping/updated', function(message, channel, from_component_id, from_resource_id) {
            var myChannelsId = [];
            // TODO hp: always iPad1
            message.forEach(function(f) {
                for (var i in f.items) {
                    var item = f.items[i];
                    if (item.name === 'iPad1') {
                        myChannelsId = item.channels;
                        break;
                    }
                }
            });

            var myChannels = [];
            myChannelsId.forEach(function(id) {
                myChannels.push(CHANNELS[id]);
            });

            if(myChannels.length === 0) {
                // TODO show message 'no available channels' on screen
            }

            self.handleUpdatedChannels(myChannels);

        });
    },

    getInitialState: function() {
        return {
            channels: CHANNELS
        };
    },

    handleUpdatedChannels: function(channels) {
        this.setState({
            channels: channels
        });
    },

    render: function() {

        var channels = [];
        for (ch in this.state.channels) {
            if (this.state.channels.hasOwnProperty(ch)) {
                channels.push(
                    <div className="col-1-3">
                        <Channel
                            channel={this.state.channels[ch]} />
                    </div>);
            }

        }

        return (
            <div className="grid">


                {channels}


            </div>
        );
    }


});

module.exports = Main;

var CHANNELS = {
    '01': {name: 'Admin', icon: '', screenshot: './assets/channels/Roomquake/Admin.png', description: 'description: first channel'},
    '02': {name: 'AggregateView', icon: '', screenshot: './assets/channels/Roomquake/AggregateView.png',  description: ''},
    '03': {name: 'Seismograph1', icon: '', screenshot: './assets/channels/Roomquake/Seismograph1.png',  description: ''},
    '04': {name: 'Seismograph2', icon: '', screenshot: './assets/channels/Roomquake/Seismograph2.png',  description: ''},
    '05': {name: 'Seismograph3', icon: '', screenshot: './assets/channels/Roomquake/Seismograph3.png',  description: ''},
    '06': {name: 'Seismograph4', icon: '', screenshot: './assets/channels/Roomquake/Seismograph4.png',  description: ''},
    '07': {name: 'StudentsForms', icon: '', screenshot: './assets/channels/Roomquake/StudentsForms.png',  description: ''}
    /*
     '08': {name: 'channel8', icon: './assets/icon/channel_icon.png', description: ''},
     '09': {name: 'channel9', icon: './assets/icon/channel_icon.png', description: ''},
     '10': {name: 'channel10', icon: './assets/icon/channel_icon.png', description: ''},
     '11': {name: 'channel11', icon: './assets/icon/channel_icon.png', description: ''},
     '12': {name: 'channel12', icon: './assets/icon/channel_icon.png', description: ''},
     '13': {name: 'channel13', icon: './assets/icon/channel_icon.png', description: ''},
     '14': {name: 'channel14', icon: './assets/icon/channel_icon.png', description: ''},
     '15': {name: 'channel15', icon: './assets/icon/channel_icon.png', description: ''},
     '16': {name: 'channel16', icon: './assets/icon/channel_icon.png', description: ''}
     */

};


