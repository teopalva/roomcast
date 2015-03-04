var React = require('react');
var Mui = require('material-ui');
var Paper = Mui.Paper;

/**
 * @prop channel
 */
var Channel = React.createClass({

    handleClick: function() {

        console.log('click', this.props.channel);
/*
        // JavaScript to send an action to iOS code
        var appName = 'roomcast';
        var actionType = 'playChannel';
        // TODO generalize
        var actionParameters = {
            'chId': '02',
            'url': 'd3js.org'
        };
        var jsonString = (JSON.stringify(actionParameters));
        var escapedJsonParameters = escape(jsonString);
        var url = appName + '://' + actionType + "#" + escapedJsonParameters;
        console.log('launching url: ', url);
        document.location.href = url;
*/
    },

    render: function() {

        var style = {
            backgroundImage: 'url(' + this.props.channel.screenshot + ')',
            backgroundSize: '100% 100%'
        };

        //<img className='channel-screenshot' src={this.props.channel.screenshot}> </img>

        return (
            <Paper className='channel' style={style} onClick={this.handleClick}>

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

