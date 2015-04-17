
var React = require('react');
var TopBar = require('./TopBar');

var CataloguePage = React.createClass({

    componentDidMount: function() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    },

    componentWillUnmount: function() {
        window.removeEventListener("resize", this.updateDimensions);
    },

    getInitialState: function () {
        return  {
            height: 0
        }
    },

    updateDimensions: function() {
        var height = this.refs.gridRef.getDOMNode().offsetHeight;
        console.log(height);

        this.setState({height: height});
    },

    render: function() {

        var overlayStyle = {
            height: this.state.height
        };

        var overlay = <div className="grid-overlay"  onTouchTap={this.props.onExitSelection} ></div>;
        if(this.props.isSelected) {
            overlay = <div className="grid-overlay is-shown"  onTouchTap={this.props.onExitSelection} ></div>;
        }

        return (

            <div>

                <TopBar
                    onSave={this.props.onSave}
                    onUndo={this.props.onUndo} />

                <div className='content-div'>
                    <div className="grid" ref='gridRef' >
                        {overlay}
                        {this.props.channels}
                    </div>
                </div>

            </div>

        );

    }

});

module.exports = CataloguePage;

