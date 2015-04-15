
var React = require('react');
var TopBar = require('./TopBar');

var CataloguePage = React.createClass({

    render: function() {

        return (

            <div>
                <TopBar
                    onSave={this.props.onSave}
                    onUndo={this.props.onUndo} />
                <div className="grid"> {this.props.channels} </div>
            </div>

        );

    }

});

module.exports = CataloguePage;

