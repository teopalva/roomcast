
var React = require('react');
var D3GridLayer = require('./d3/D3GridLayer');

var GridLayer = React.createClass({

    componentDidMount: function() {

        function objectLength( object ) {
            var length = 0;
            for( var key in object ) {
                if( object.hasOwnProperty(key) ) {
                    ++length;
                }
            }
            return length;
        }

        var node = this.getDOMNode();
        var h = window.innerHeight / 2;
        var n = (objectLength(this.props.data) / 3);
        if((objectLength(this.props.data) % 3) != 0) {
            h++;
        }
        h = h * n;

        D3GridLayer.create(node, {
            width: '60%',
            height: h    //window.innerHeight
        }, this.getLayerState());
    },

    componentDidUpdate: function() {
      var node = this.getDOMNode();
        D3GridLayer.update(node, this.getLayerState());
    },

    componentWillUnmount: function() {
        var node = this.getDOMNode();
        D3GridLayer.destroy(node);
    },

    getLayerState: function() {
        return {
          data: this.props.data
        };
    },

    render: function() {
      return (
          <div className='GridLayer'></div>
      );
    }

});

module.exports = GridLayer;