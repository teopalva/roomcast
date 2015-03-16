var React = require('react');
var Mui = require('material-ui');

/**
 * @prop selectedChannel
 * @prop channels
 */
var ChannelInfo = React.createClass({

    render: function() {

        var broker = query_parameters.broker, runId = 'RoomQuake', imgType = 'screenshot_rect';

        imgSource = this.props.selectedChannel? 'http://' + broker + ':57880/roomcast/main-interface/assets/channels/' + runId + '/' + imgType + '/' + this.props.channels[this.props.selectedChannel.id].screenshot : 'http://' + broker + ':57880/roomcast/main-interface/assets/roomcast.jpg';

        // <div className='dock-base'> </div>

        return (
            <div className='channel-info-div'>
                <img src={imgSource} >  </img>
            </div>);

    }

});

module.exports = ChannelInfo;

