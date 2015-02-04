var React = require('react');
var Mui = require('material-ui');
var RaisedButton = Mui.RaisedButton;

var PoolHeader = React.createClass({
    render: function(){
    return (

            <tr className='pool-header'>
                <th> {this.props.familyName} </th>
                <th> <RaisedButton label="Add to All" primary={true} />
                     <RaisedButton label="Delete from All" secondary={true} />
                </th>
                <th></th>
            </tr>);

    }
});

module.exports = PoolHeader;