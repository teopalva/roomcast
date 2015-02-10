var React = require('react');
var Mui = require('material-ui');

/**
 * @prop selectedChannel
 */
var ChannelInfo = React.createClass({

    render: function() {

        imgSource = this.props.selectedChannel? './assets/channels/Roomquake_02.png' : './assets/roomcast.jpg';

        return (
            <div className='channel-info-div'>
                <img src={imgSource} >  </img>
            </div>);

    }

});

module.exports = ChannelInfo;

