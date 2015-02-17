var React = require('react'),
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton;

var ResourcesPanel = require('./ResourcesPanel.js');
var ChannelsPanel = require('./ChannelsPanel');

var Main = React.createClass({

    getInitialState: function() {
        return {
            selectedChannel: null,
            mapping: RESOURCES
        };
    },

    handleSelection: function(selectedChannel) {
        this.setState({
            selectedChannel: selectedChannel
        });
    },

    handleUpdatedMapping: function(mapping) {
        this.setState({
            mapping: mapping
        });
    },

    handleSavedChanges: function() {
      console.log(this.state.mapping);
        //nutella.publish('mapping/update', 'Update Message');
    },

    handleCancelledUpdates: function() {
        // TODO
    },

    render: function () {

        return (
            <div className='outer-div'>

                <ResourcesPanel
                    mapping={this.state.mapping}
                    onUpdatedMapping={this.handleUpdatedMapping}
                    channels={CHANNELS}
                    selectedChannel={this.state.selectedChannel}
                    onSelectedChannel={this.handleSelection} />

                <ChannelsPanel
                    ref={'channelsPanel'}
                    channels={CHANNELS}
                    selectedChannel={this.state.selectedChannel}
                    onSelectedChannel={this.handleSelection}
                    onSavedChanges={this.handleSavedChanges} />

            </div>
        );
    }

});

module.exports = Main;

var RESOURCES = [

    {
        family: 'iPad',
        items: [
            {
                name: 'iPad1',
                channels: ['01','02']
            },
            {
                name: 'iPad2',
                channels: ['01','02','03','04','05']
            },
            {
                name: 'iPad3',
                channels: ['01']
            },
            {
                name: 'iPad4',
                channels: ['01','02','03','04','05','06']
            },
            {
                name: 'iPad5',
                channels: ['01','02']
            }
        ]
    },
    {
        family: 'Mac',
        items: [
            {
                name: 'mac1',
                channels: ['01','02']
            },
            {
                name: 'mac2',
                channels: ['01']
            },
            {
                name: 'mac3',
                channels: ['01','02']
            }
        ]
    }
];

var CHANNELS = {
    '01': {name: 'Admin', icon: './assets/channels/Roomquake/Admin.png', description: 'description: first channel'},
    '02': {name: 'AggregateView', icon: './assets/channels/Roomquake/AggregateView.png', description: ''},
    '03': {name: 'Seismograph1', icon: './assets/channels/Roomquake/Seismograph1.png', description: ''},
    '04': {name: 'Seismograph2', icon: './assets/channels/Roomquake/Seismograph2.png', description: ''},
    '05': {name: 'Seismograph3', icon: './assets/channels/Roomquake/Seismograph3.png', description: ''},
    '06': {name: 'Seismograph4', icon: './assets/channels/Roomquake/Seismograph4.png', description: ''},
    '07': {name: 'StudentsForms', icon: './assets/channels/Roomquake/StudentsForms.png', description: ''}
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
}