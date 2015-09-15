var React = require('react');
var Mui = require('material-ui');
var Paper = Mui.Paper;
var NutellaMixin = require('./NutellaMixin');
var iOSMixin = require('./iOSMixin');

/**
 * @prop channel
 */
var Channel = React.createClass({

    mixins: [NutellaMixin, iOSMixin],

    componentDidMount: function() {
    },

    handleClick: function() {
        this.props.onSetPlaying(this.props.chId);
    },

    render: function() {

        var style = {
            backgroundImage: 'url(' + this.props.channel.screenshot + ')',
            backgroundSize: '100% 100%'
        };

        var iconStyle = {
            backgroundColor: this.props.channel.icon
        };

        return (
            <Paper className='channel' style={style} ref='channelRef' onTouchTap={this.handleClick} >

                <div className='channel-div'>

                    <div className='channel-caption'>

                        <div className='icon-name-wrapper'>

                            <div className='channel-icon' ref='channelIcon' style={iconStyle} > </div>

                            <div className='name-wrapper'>
                                <p className='channel-name'> {this.props.channel.name} </p>
                            </div>

                        </div>

                    </div>

                </div>

            </Paper>);

    }

});

module.exports = Channel;

