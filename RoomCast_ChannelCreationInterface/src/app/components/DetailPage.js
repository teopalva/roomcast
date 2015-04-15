
var React = require('react');
var Channel = require('./Channel');

var DetailPage = React.createClass({

    componentDidMount: function() {
        this.setState({
            channel: this.props.channel
        });
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            channel: nextProps.channel
        });
    },

    getInitialState: function () {
        return  {
            channel: this.props.channel
        }
    },

    render: function() {

        var channel =
                <Channel
                    channel={this.state.channel}
                    selected={true} />;

        return (

            <div>
                <div className="card-detail"> {channel} </div>
                <div className="right-bar-detail">  </div>
            </div>

        );

    }

});

module.exports = DetailPage;

