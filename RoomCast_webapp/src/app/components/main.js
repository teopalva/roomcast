
var React = require('react');
var Channel = require('./Channel');
//var NutellaMixin = require('./NutellaMixin');
var Mui = require('material-ui');
var FloatingActionButton = Mui.FloatingActionButton;
var RightNav = Mui.RightNav;

var Main = React.createClass({

    //mixins: [NutellaMixin],

    componentDidMount: function() {
        var self=this;

        // TODO move all after rid has been set
        // TODO send request with MAC, get rid (name)
        //this.handleUpdatedRid('iPad1');
        var actionParameters = {
            'rid': 'iPad4'
        };
        var jsonString = (JSON.stringify(actionParameters));
        var escapedJsonParameters = escape(jsonString);
        var url = 'roomcast' + '://' + 'setResourceIdentity' + "#" + escapedJsonParameters;
        document.location.href = url;

        try {
            // Get current assigned channels (mapping)
            nutella.net.request('mapping/retrieve', 'all', function (response) {
                self.updateChannelsForRid(response, self.state.rid);
            });

            // Subscribe for future changes
            nutella.net.subscribe('mapping/updated', function (message, channel, from_component_id, from_resource_id) {
                self.updateChannelsForRid(message, self.state.rid);
            });
        } catch(e) {
            console.warn('nutella error -> fetching from fake data');
            self.updateChannelsForRid(MAPPING, self.state.rid);
        }

    },

    updateChannelsForRid: function(message, rid) {
        var myChannelsId = [];
        var myChannels = [];
        message.forEach(function (f) {
            for (var i in f.items) {
                var item = f.items[i];
                if (item.name === rid) {
                    myChannelsId = item.channels;
                    break;
                }
            }
        });
        myChannelsId.forEach(function (id) {
            myChannels.push(CHANNELS[id]);
        });
        if (myChannels.length === 0) {
            // TODO show message 'no available channels' on screen
        }
        this.handleUpdatedChannels(myChannels);
    },

    getInitialState: function() {
        return {
            rid: null,
            channels: [],
            mapping: []
        };
    },

    handleUpdatedRid: function(rid) {
        this.setState({
            rid: rid
        });
    },

    handleUpdatedChannels: function(channels) {
        this.setState({
            channels: channels
        });
    },

    handleUpdatedMapping: function(mapping) {
        this.setState({
            mapping: mapping
        });
    },

    handleControlButton: function() {
        var self = this;
        this.refs.rightNav.toggle();
        if(this.refs.rightNav.state.open === false) {
            nutella.net.request('mapping/retrieve', 'all', function (response) {
                self.handleUpdatedMapping(response);
            });
        }
    },

    handleSelectedResource: function(rid) {
        var self = this;
        this.handleUpdatedRid(rid);
        nutella.net.request('mapping/retrieve', 'all', function (response) {
            self.updateChannelsForRid(response, rid);
        });
    },

    handleItemTap: function(menuItem) {
        this.handleSelectedResource(menuItem.id);
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

        var menuItems = [];
        this.state.mapping.forEach(function (f) {
            for (var i in f.items) {
                menuItems.push({
                        id: f.items[i].name,
                        text: f.items[i].name
                    }
                );
            }
        });

        return (

            <div className='outerDiv'>

                <div className="grid"> {channels} </div>

                <FloatingActionButton className='controlButton' iconClassName="muidocs-icon-action-grade" secondary={true} onTouchTap={this.handleControlButton} />

                <RightNav ref='rightNav' docked={false} menuItems={menuItems} onItemTap={this.handleItemTap} />

            </div>

        );
    }


});

module.exports = Main;

var CHANNELS = {
    '01': {name: 'Admin', icon: '', screenshot: './assets/channels/Roomquake/Admin.png', description: 'description: first channel', url: 'http://matteopalvarini.com/viz/Project3'},
    '02': {name: 'AggregateView', icon: '', screenshot: './assets/channels/Roomquake/AggregateView.png',  description: '', url:'http://google.it'},
    '03': {name: 'Seismograph1', icon: '', screenshot: './assets/channels/Roomquake/Seismograph1.png',  description: '', url:'roomquake.seismometer://'},
    '04': {name: 'Seismograph2', icon: '', screenshot: './assets/channels/Roomquake/Seismograph2.png',  description: '', url:'http://d3js.org'},
    '05': {name: 'Seismograph3', icon: '', screenshot: './assets/channels/Roomquake/Seismograph3.png',  description: '', url:'roomquake.seismometer://'},
    '06': {name: 'Seismograph4', icon: '', screenshot: './assets/channels/Roomquake/Seismograph4.png',  description: '', url:'roomquake.seismometer://'},
    '07': {name: 'StudentsForms', icon: '', screenshot: './assets/channels/Roomquake/StudentsForms.png',  description: '', url:'http://uic.edu'}
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