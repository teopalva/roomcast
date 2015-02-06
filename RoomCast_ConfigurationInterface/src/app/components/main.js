var React = require('react'),
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton;

var ResourcesPanel = require('./ResourcesPanel.js');
var ChannelsPanel = require('./ChannelsPanel');

var Main = React.createClass({

    render: function () {

        return (
            <div className="outer-div">

                <ResourcesPanel resources={RESOURCES} channels={CHANNELS}/>
                <ChannelsPanel channels={CHANNELS} />

            </div>
        );
    }

});

module.exports = Main;

var RESOURCES = [

    {
        family: 'iPad',
        items: [
            {name: 'iPad1'},
            {name: 'iPad2'},
            {name: 'iPad3'},
            {name: 'iPad4'},
            {name: 'iPad5'}
        ]
    },
    {
        family: 'Mac',
        items: [
            {name: 'mac1'},
            {name: 'mac2'},
            {name: 'mac3'}
        ]
    }
];

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