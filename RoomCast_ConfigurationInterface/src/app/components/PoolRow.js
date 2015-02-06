var React = require('react');
var Mui = require('material-ui');
var Channel = require('./Channel');

var PoolRow = React.createClass({

    render: function () {

        var channelsList = [];
        this.props.channels.forEach(function (ch) {
            channelsList.push(<Channel name={ch.name} />);
        });

        return (

            <tr className='pool-row'>

                <td> {this.props.resourceId} </td>
                <td>{channelsList}</td>
                <td></td>

            </tr>);

    }
});

module.exports = PoolRow;