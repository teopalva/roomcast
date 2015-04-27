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

        /*
         // Manually handle touches from mobile
         try {
         //this.refs.channelRef.onTouchStart(handleStart);
         //this.refs.channelRef.onTouchStart(handleEnd);
         console.log(this.refs.channelRef);
         var ongoingTouches = [];

         function handleStart(evt) {
         evt.preventDefault();
         ongoingTouches.push(evt);
         console.log(ongoingTouches);
         }

         function handleEnd(evt) {
         evt.preventDefault();
         ongoingTouches.pop();
         console.log(ongoingTouches);
         }
         } catch(e) {
         console.error(e.stack);
         }
         */

    },

    handleClick: function() {

        var actionParameters = {
            'name': this.props.channel.name,
            'url': this.props.channel.url
        };
        this.iOScall('playChannel', actionParameters);

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
                                <p className='channel-description'> {this.props.channel.description} </p>
                            </div>

                        </div>

                    </div>

                </div>

            </Paper>);

    }

});

module.exports = Channel;

