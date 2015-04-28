var React = require('react');
var Mui = require('material-ui');
var Paper = Mui.Paper;

/**
 * @prop selectedChannel
 * @prop channels
 */
var ChannelCard = React.createClass({

    getCardSelected: function() {

        var style = {
            backgroundImage: 'url(' + this.props.channelData.screenshot + ')',
            backgroundSize: '100% 100%'
        };

        var iconStyle = {
            backgroundColor: this.props.channelData.icon
        };

        var description =
            <p className='channel-description'> {this.props.channelData.description} </p>;

        return (

            <div className="col-1-3" >

                <Paper className='channel-card'
                       ref={'channel' + this.props.channelId}
                       zDepth={3}
                       style={style} >

                    <div className='channel-div'>

                        <div className='channel-caption'>

                            <div className='icon-name-wrapper'>

                                <div className='channel-icon' ref='channelIcon' style={iconStyle} > </div>

                                <div className='name-wrapper'>
                                    <p className='channel-name'> {this.props.channelData.name} </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </Paper>

            </div>);

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
        card = this.getCardSelected();
        return card;

    }

});

module.exports = ChannelCard;

