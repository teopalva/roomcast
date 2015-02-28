
var React = require('react');
var Channel = require('./Channel');

var Main = React.createClass({

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
        console.log(this.state.channels)
        for (ch in this.state.channels) {
            if (this.state.channels.hasOwnProperty(ch)) {
                channels.push(
                    <div className="col-1-3">
                        <Channel/>
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
    '01': {name: 'Admin', icon: './assets/channels/Roomquake/Admin.png', screenshot: '', description: 'description: first channel'},
    '02': {name: 'AggregateView', icon: './assets/channels/Roomquake/AggregateView.png', screenshot: '',  description: ''},
    '03': {name: 'Seismograph1', icon: './assets/channels/Roomquake/Seismograph1.png', screenshot: '',  description: ''},
    '04': {name: 'Seismograph2', icon: './assets/channels/Roomquake/Seismograph2.png', screenshot: '',  description: ''},
    '05': {name: 'Seismograph3', icon: './assets/channels/Roomquake/Seismograph3.png', screenshot: '',  description: ''},
    '06': {name: 'Seismograph4', icon: './assets/channels/Roomquake/Seismograph4.png', screenshot: '',  description: ''},
    '07': {name: 'StudentsForms', icon: './assets/channels/Roomquake/StudentsForms.png', screenshot: '',  description: ''},

     '08': {name: 'channel8', icon: './assets/icon/channel_icon.png', description: ''},
     '09': {name: 'channel9', icon: './assets/icon/channel_icon.png', description: ''},
     '10': {name: 'channel10', icon: './assets/icon/channel_icon.png', description: ''},
     '11': {name: 'channel11', icon: './assets/icon/channel_icon.png', description: ''},
     '12': {name: 'channel12', icon: './assets/icon/channel_icon.png', description: ''},
     '13': {name: 'channel13', icon: './assets/icon/channel_icon.png', description: ''},
     '14': {name: 'channel14', icon: './assets/icon/channel_icon.png', description: ''},
     '15': {name: 'channel15', icon: './assets/icon/channel_icon.png', description: ''},
     '16': {name: 'channel16', icon: './assets/icon/channel_icon.png', description: ''}

}