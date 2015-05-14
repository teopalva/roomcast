var React = require('react');
var Mui = require('material-ui');
var ChannelCard = require('./ChannelCard');

var ChannelsCatalogue = React.createClass({

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

            channels.push(<ChannelCard
                    id={key}
                    key={key}
                    channelData={chs[key]}
                    channelId={key}
                    currentSelectedChannel={this.props.selectedChannel}
                    respectiveSelected={respectiveSelected}
                    onSelectedChannel={this.handleSelectedChannel} />
            );
        }

        var backgroundMessageStyle = {
            position: 'absolute',
            left: '0',
            bottom: '50%',
            width: '100%',
            fontSize: '2.5vw',
            textAlign: 'center',
            color: '#9197a3',
            fontWeight: '300'
        };
        var backgroundMessage = null;
        if(channels.length === 0) {
            backgroundMessage = <p style={backgroundMessageStyle} > {'Empty Catalogue'} </p>;
        }

        return (
            <div className='content-div'>

                {backgroundMessage}

                <div className="grid" ref='gridRef' >
                    {channels}
                </div>
            </div>
        )
    }

});

module.exports = ChannelsCatalogue;

