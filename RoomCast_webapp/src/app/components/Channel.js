var React = require('react');
var Mui = require('material-ui');
var Paper = Mui.Paper;

/**
 * @prop channel
 */
var Channel = React.createClass({

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

        // JavaScript to send an action to iOS code
        var appName = 'roomcast';
        var actionType = 'playChannel';
        // TODO generalize
        var actionParameters = {
            'name': this.props.channel.name,
            'url': this.props.channel.url
        };
        var jsonString = (JSON.stringify(actionParameters));
        var escapedJsonParameters = escape(jsonString);
        var url = appName + '://' + actionType + "#" + escapedJsonParameters;
        console.log('launching url: ', url);
        document.location.href = url;

    },

    render: function() {

        var broker = query_parameters.broker, runId = 'RoomQuake', imgType = 'screenshot';

        var style = {
            backgroundImage: 'url(' + 'http://' + broker + ':57880/roomcast/main-interface/assets/channels/' + runId + '/' + imgType + '/' + this.props.channel.screenshot + ')',
            backgroundSize: '100% 100%'
        };

        //<img className='channel-screenshot' src={this.props.channel.screenshot}> </img>
        //onTouchStart={this.handleClick} >

        return (
            <Paper className='channel' style={style} ref='channelRef' onTouchTap={this.handleClick} >

                <div className='channel-div' >

                    <div className='channel-caption'>

                        <div className='icon-name-wrapper'>

                            <img className='channel-icon'> </img>

                            <div className='name-wrapper'>
                                <p className='channel-name'> {this.props.channel.name} </p>
                                <p className='channel-description'> description... </p>
                            </div>

                        </div>

                    </div>

                </div>
            </Paper>);

    }

});

module.exports = Channel;

