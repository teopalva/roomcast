var React = require('react'),
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton;

var ResourcesPanel = require('./ResourcesPanel.js');
var ChannelsPanel = require('./ChannelsPanel');

var Main = React.createClass({

    getInitialState: function() {
        return {
            selectedChannel: 'ch04'  // true when a specific channel is selected
        };
    },

    handleSelection: function(selectedChannel) {
        this.setState({
            selectedChannel: selectedChannel
        });
    },

    render: function () {

        return (
            <div className='outer-div'>

                <ResourcesPanel
                    resources={RESOURCES}
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
                channels: ['ch01','ch02']
            },
            {
                name: 'iPad2',
                channels: ['ch01','ch02','ch03','ch04','ch05']
            },
            {
                name: 'iPad3',
                channels: ['ch01']
            },
            {
                name: 'iPad4',
                channels: ['ch01','ch02','ch03','ch04','ch05','ch06']
            },
            {
                name: 'iPad5',
                channels: ['ch01','ch02']
            }
        ]
    },
    {
        family: 'Mac',
        items: [
            {
                name: 'mac1',
                channels: ['ch01','ch02']
            },
            {
                name: 'mac2',
                channels: ['ch01']
            },
            {
                name: 'mac3',
                channels: ['ch01','ch02']
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
    ch01: {icon: './assets/icon/channel_icon.png', description: 'description: first channel'},
    ch02: {icon: './assets/icon/channel_icon.png', description: ''},
    ch03: {icon: './assets/icon/channel_icon.png', description: ''},
    ch04: {icon: './assets/icon/channel_icon.png', description: ''},
    ch05: {icon: './assets/icon/channel_icon.png', description: ''},
    ch06: {icon: './assets/icon/channel_icon.png', description: ''},
    ch07: {icon: './assets/icon/channel_icon.png', description: ''},
    ch08: {icon: './assets/icon/channel_icon.png', description: ''},
    ch09: {icon: './assets/icon/channel_icon.png', description: ''},
    ch10: {icon: './assets/icon/channel_icon.png', description: ''},
    /*
    ch11: {icon: './assets/icon/channel_icon.png', description: ''},
    ch12: {icon: './assets/icon/channel_icon.png', description: ''},
    ch13: {icon: './assets/icon/channel_icon.png', description: ''},
    ch14: {icon: './assets/icon/channel_icon.png', description: ''},
    ch15: {icon: './assets/icon/channel_icon.png', description: ''},
    ch16: {icon: './assets/icon/channel_icon.png', description: ''},
    ch17: {icon: './assets/icon/channel_icon.png', description: ''},
    ch18: {icon: './assets/icon/channel_icon.png', description: ''},
    ch19: {icon: './assets/icon/channel_icon.png', description: ''},
    ch20: {icon: './assets/icon/channel_icon.png', description: ''},
    ch21: {icon: './assets/icon/channel_icon.png', description: ''},
    ch22: {icon: './assets/icon/channel_icon.png', description: ''},
    ch23: {icon: './assets/icon/channel_icon.png', description: ''},
    ch24: {icon: './assets/icon/channel_icon.png', description: ''},
    ch25: {icon: './assets/icon/channel_icon.png', description: ''},
    ch26: {icon: './assets/icon/channel_icon.png', description: ''},
    ch27: {icon: './assets/icon/channel_icon.png', description: ''},
    ch28: {icon: './assets/icon/channel_icon.png', description: ''},
    ch29: {icon: './assets/icon/channel_icon.png', description: ''},
    ch30: {icon: './assets/icon/channel_icon.png', description: ''},
    ch31: {icon: './assets/icon/channel_icon.png', description: ''},
    ch32: {icon: './assets/icon/channel_icon.png', description: ''},
    ch33: {icon: './assets/icon/channel_icon.png', description: ''},
    ch34: {icon: './assets/icon/channel_icon.png', description: ''},
    ch35: {icon: './assets/icon/channel_icon.png', description: ''},
    ch36: {icon: './assets/icon/channel_icon.png', description: ''},
    ch37: {icon: './assets/icon/channel_icon.png', description: ''},
    ch38: {icon: './assets/icon/channel_icon.png', description: ''},
    */
    ch39: {icon: './assets/icon/channel_icon.png', description: ''}
}