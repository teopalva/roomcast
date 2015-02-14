var React = require('react');
var Mui = require('material-ui');
var Channel = require('./Channel');

var ChannelsList = React.createClass({

    handleSelectedChannel: function(ch) {
        this.props.onSelectedChannel(ch);
    },

    handleStyleRespectiveChannel: function() {
        var selected = this.props.selectedChannel;
        for(ref in this.refs) {
            console.log(ref, selected);
            if(this.refs[ref].props.id===selected.id) {
                console.log(selected.imgNode);
                break;
            }
        }
    },

    render: function() {

        var channels = [];
        var chs = this.props.channels;
        var keys = Object.keys(chs).sort();
        for(var i = 0; i < keys.length; i++) {
            var key = keys[i];

            // set respective selected channel in channels list
            var respectiveSelected = null;
            if(this.props.selectedChannel && key===this.props.selectedChannel.id) {
                respectiveSelected = true;
            }

            channels.push(<Channel
                id={key}
                name={chs[key].name}
                imgPath={chs[key].icon}
                onSelectedChannel={this.handleSelectedChannel}
                currentSelectedChannel={this.props.selectedChannel}
                belongsTo='channels'
                respectiveSelected={respectiveSelected} />);
        }

        return (
            <div className='channels-list-div'>
                {channels}
            </div>);

    }

});

module.exports = ChannelsList;

