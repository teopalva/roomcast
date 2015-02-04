var React = require('react');
var Mui = require('material-ui');
var FlatButton = Mui.FlatButton;

var PoolRow = React.createClass({

    render: function () {

        var channelsList = [];
        this.props.channels.forEach(function (ch) {
            channelsList.push(<FlatButton label={ch.name} />);
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