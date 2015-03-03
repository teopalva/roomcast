var React = require('react');
var Mui = require('material-ui');
var Paper = Mui.Paper;

/**
 * @prop channel
 */
var Channel = React.createClass({

    render: function() {

        var style = {
            backgroundImage: 'url(' + this.props.channel.screenshot + ')',
            backgroundSize: '100% 100%'
        };

        //<img className='channel-screenshot' src={this.props.channel.screenshot}> </img>

        return (
            <Paper className='channel' style={style}>

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

