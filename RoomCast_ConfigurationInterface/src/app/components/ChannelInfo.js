var React = require('react');
var Mui = require('material-ui');
var NutellaMixin = require('./NutellaMixin');

/**
 * @prop selectedChannel
 * @prop channels
 */
var ChannelInfo = React.createClass({

    mixins: [NutellaMixin],

    render: function() {

        imgSource = this.props.selectedChannel? this.getUrlForAsset(this.props.channels[this.props.selectedChannel.id].screenshot, 'screenshot') : this.getUrlForAsset('roomcast.jpg');

        // <div className='dock-base'> </div>

        return (
            <div className='channel-info-div'>
                <img src={imgSource} >  </img>
            </div>);

    }

});

module.exports = ChannelInfo;

