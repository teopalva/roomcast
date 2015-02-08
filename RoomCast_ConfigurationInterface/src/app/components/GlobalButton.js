var React = require('react');
var Mui = require('material-ui');
var RaisedButton = Mui.RaisedButton;

/**
 * @prop type
 */
var GlobalButton = React.createClass({

    render: function(){

        var button = this.props.type==='add'? <RaisedButton label='Add' secondary={true} /> : <RaisedButton label='Remove' primary={true} />;
        return (<div className='div-button-container'>
                {button}
            </div>);
    }

});

module.exports = GlobalButton;

