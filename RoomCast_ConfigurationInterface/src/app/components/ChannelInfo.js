var React = require('react');
var Mui = require('material-ui');

/**
 * @prop selectedChannel
 * @prop channels
 */
var ChannelInfo = React.createClass({

    render: function() {

        imgSource = this.props.selectedChannel? this.props.channels[this.props.selectedChannel.id].icon : './assets/roomcast.jpg';

        // <div className='dock-base'> </div>

        return (
            <div className='channel-info-div'>
                <img src={imgSource} >  </img>
            </div>);

    }

});

module.exports = ChannelInfo;

