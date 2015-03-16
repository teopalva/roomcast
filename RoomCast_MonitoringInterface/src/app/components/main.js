
var React = require('react');
var MonitoringStore = require('../stores/MonitoringStore');
var Mui = require('material-ui');
var D3canvas = require('./D3canvas');

function getMonitoringState() {
    return {
        groups: MonitoringStore.getGroups(),
        playing: MonitoringStore.getPlaying()
    };
}

var Main = React.createClass({

    getInitialState: function() {
        return getMonitoringState();
    },

    componentDidMount: function() {
        MonitoringStore.addChangeListener(this._onChange)
    },

    componentWillUnmount: function() {
        MonitoringStore.removeChangeListener(this._onChange);
    },

    render: function() {

        return (

            <D3canvas
                groups={this.state.groups}
                playing={this.state.playing} />

        );
    },

    /**
     * Event handler for 'change' events coming from the Store
     */
    _onChange: function() {
        this.setState(getMonitoringState());
    }


});

module.exports = Main;

var MAPPING = [{
    "family": "iPad",
    "items": [{
        "name": "iPad1",
        "channels": ["01", "02", "03", "04", "05", "06", "07"]
    }, {
        "name": "iPad2",
        "channels": []
    }, {
        "name": "iPad3",
        "channels": ["01", "02", "04", "07"]
    }, {
        "name": "iPad4",
        "channels": ["01", "02", "03", "04", "05", "06", "07"]
    }, {
        "name": "iPad5",
        "channels": ["01", "02", "04", "07"]
    }]
}, {
    "family": "Mac",
    "items": [{
        "name": "mac1",
        "channels": ["01", "02"]
    }, {
        "name": "mac2",
        "channels": ["01"]
    }, {
        "name": "mac3",
        "channels": ["01", "02"]
    }]
}];

