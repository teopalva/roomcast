var React = require('react');
var Mui = require('material-ui');
var RaisedButton_ = Mui.RaisedButton_;
var ContextButton = require('./ContextButton');
var GlobalButton = require('./GlobalButton');

/**
 * @prop familyName
 * @prop selectedChannel
 */
var PoolHeader = React.createClass({
    render: function() {

        var buttonStyle = {
            marginRight:'10px'
        };

        var buttonAdd, buttonRemove, headerButtons;
        if(this.props.selectedChannel) {
            buttonAdd = <ContextButton type='add'/>;
            buttonRemove = <ContextButton type='remove'/>;
            headerButtons = <th>
                    {buttonAdd}
                    {buttonRemove}
            </th>
        } else {
            buttonRemove = <GlobalButton type='remove'/>;
            headerButtons = <th>
                    {buttonRemove}
            </th>
        }

        return (

            <tr className='pool-header'>
                <th> {this.props.familyName} </th>
                    {headerButtons}
                <th></th>
            </tr>);

    }
});

module.exports = PoolHeader;