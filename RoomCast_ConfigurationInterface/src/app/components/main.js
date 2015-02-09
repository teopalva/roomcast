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
        this.handleSavedUpdates();
    },

    handleSavedUpdates: function() {
      console.log(this.state.mapping);
    },

    handleCancelledUpdates: function() {

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
                    channels={CHANNELS}
                    selectedChannel={this.state.selectedChannel}
                    onSelectedChannel={this.handleSelection} />

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

/*
var CHANNELS = [
    {name: 'ch1', icon: ''},
    {name: 'ch2', icon: ''},
    {name: 'ch3', icon: ''},
    {name: 'ch4', icon: ''},
    {name: 'ch5', icon: ''},
    {name: 'ch5', icon: ''},
    {name: 'ch6', icon: ''},
    {name: 'ch6', icon: ''},
    {name: 'ch6', icon: ''},
    {name: 'ch7', icon: ''}
];
*/

var CHANNELS = {
    '01': {name: 'channel1', icon: './assets/icon/channel_icon.png', description: 'description: first channel'},
    '02': {name: 'channel2', icon: './assets/icon/channel_icon.png', description: ''},
    '03': {name: 'channel3', icon: './assets/icon/channel_icon.png', description: ''},
    '04': {name: 'channel4', icon: './assets/icon/channel_icon.png', description: ''},
    '05': {name: 'channel5', icon: './assets/icon/channel_icon.png', description: ''},
    '06': {name: 'channel6', icon: './assets/icon/channel_icon.png', description: ''},
    '07': {name: 'channel7', icon: './assets/icon/channel_icon.png', description: ''},
    '08': {name: 'channel8', icon: './assets/icon/channel_icon.png', description: ''},
    '09': {name: 'channel9', icon: './assets/icon/channel_icon.png', description: ''},
    '10': {name: 'channel10', icon: './assets/icon/channel_icon.png', description: ''},
    /*
    11: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    12: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    13: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    14: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    15: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    16: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    17: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    18: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    19: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    20: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    21: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    22: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    23: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    24: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    25: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    26: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    27: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    28: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    29: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    30: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    31: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    32: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    33: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    34: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    35: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    36: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    37: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    38: {name: 'first channel', icon: './assets/icon/channel_icon.png', description: ''},
    */
    '39': {name: 'channel39', icon: './assets/icon/channel_icon.png', description: ''}
}