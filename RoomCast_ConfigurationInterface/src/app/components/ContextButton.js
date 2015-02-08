var React = require('react');
var Mui = require('material-ui');
var FloatingActionButton_ = Mui.FloatingActionButton_;

/**
 * @prop type
 */
var ContextButton = React.createClass({

    render: function() {

        var button = this.props.type==='add'? <FloatingActionButton_ icon='content-add' secondary={true} /> :
            <FloatingActionButton_ icon='content-remove' primary={true} />;

        return (
            <div className='div-button-container'>
                {button}
            </div>
        );

    }

});

module.exports = ContextButton;

