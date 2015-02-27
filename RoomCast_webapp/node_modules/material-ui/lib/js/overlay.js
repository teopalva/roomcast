var React = require('react'),
  Classable = require('./mixins/classable');

var Overlay = React.createClass({displayName: "Overlay",

  mixins: [Classable],

  propTypes: {
    show: React.PropTypes.bool
  },

  render: function() {
    var 
      $__0=
        
        
        this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1}),
      classes = this.getClasses('mui-overlay', {
        'mui-is-shown': this.props.show
      });

    return (
      React.createElement("div", React.__spread({},  other, {className: classes}))
    );
  }

});

module.exports = Overlay;