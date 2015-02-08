var React = require('react');
var Mui = require('material-ui');
var Paper = Mui.Paper;
var ChannelInfo = require('./ChannelInfo');
var ChannelsList = require('./ChannelsList');

var ChannelsPanel = React.createClass({

    handleSelectedChannel: function(ch) {
        this.props.onSelectedChannel(ch);
    },

    render: function(){

        return (
            <div className="channels-panel">

                <Paper className='channels-panel-paper'>

                    <div className='channels-catalogue-title-div-outer'>
                        <div className='channels-catalogue-title-div-middle'>
                            <div className='channels-catalogue-title-div-inner'>
                                <p> Channels Catalogue </p>
                            </div>
                        </div>
                    </div>

                    <ChannelInfo />

                    <ChannelsList
                        channels={this.props.channels}
                        onSelectedChannel={this.handleSelectedChannel}
                        selectedChannel={this.props.selectedChannel} />

                </Paper>

            </div> );
    }

});

module.exports = ChannelsPanel;

