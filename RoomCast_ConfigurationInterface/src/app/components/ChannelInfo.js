var React = require('react');
var Mui = require('material-ui');
var Paper = Mui.Paper;

/**
 * @prop selectedChannel
 * @prop channels
 */
var ChannelInfo = React.createClass({

    getCardSelected: function() {

        var style = {
            backgroundImage: 'url(' + this.props.selectedChannel.channelData.screenshot + ')',
            backgroundSize: '100% 100%'
        };

        var iconStyle = {
            backgroundColor: this.props.selectedChannel.channelData.icon
        };

        return (

            <Paper className='channel-card'
                   ref={'channel' + this.props.channelId}
                   zDepth={3}
                   style={style} >

                <div className='channel-div'>

                    <div className='channel-caption'>

                        <div className='icon-name-wrapper'>

                            <div className='channel-icon' ref='channelIcon' style={iconStyle} > </div>

                            <div className='name-wrapper'>
                                <p className='channel-name'> {this.props.selectedChannel.channelData.name} </p>
                                <p className='channel-description'> {this.props.selectedChannel.channelData.description} </p>
                            </div>

                        </div>

                    </div>

                </div>

            </Paper>
        )

    },

    getCardDefault: function() {

        var style = {
            backgroundImage: 'url(' + 'http://localhost:57882/2413e677923c146b5ebbe4500b5580c9.png' + ')',
            backgroundSize: '100% 100%'
        };

        var iconStyle = {
            backgroundColor: 'red'
        };

        return (
            <Paper className='channel-card'
                   zDepth={3}
                   style={style} >

                <div className='channel-div'> </div>

            </Paper>
        )

    },

    render: function() {
        var card;
        if(this.props.selectedChannel) {
            card = this.getCardSelected();
        } else {
            card = this.getCardDefault();
        }
        return (
            <div className='card-container' >
                <div className='card' >
                    {card}
                </div>
            </div>
        )

    }

});

module.exports = ChannelInfo;

