var React = require('react');
var Classable = require('./mixins/classable');
var IconButton = require('./icon-button');
var NavigationMenu = require('./svg-icons/navigation-menu');
var Paper = require('./paper');

var AppBar = React.createClass({displayName: "AppBar",

  mixins: [Classable],

  propTypes: {
    onMenuIconButtonTouchTap: React.PropTypes.func,
    showMenuIconButton: React.PropTypes.bool,
    title : React.PropTypes.string,
    zDepth: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      showMenuIconButton: true,
      title: '',
      zDepth: 1
    }
  },

  render: function() {
    var $__0=
      
      
      this.props,onTouchTap=$__0.onTouchTap,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{onTouchTap:1});

    var classes = this.getClasses('mui-app-bar'),
      title, menuIconButton;

    if (this.props.title) {
      title = React.createElement("h1", {className: "mui-app-bar-title"}, this.props.title);
    }




    if (this.props.showMenuIconButton) {
      menuIconButton = (
        React.createElement(IconButton, {
          className: "mui-app-bar-navigation-icon-button", 
          onTouchTap: this._onMenuIconButtonTouchTap}, 
            React.createElement(NavigationMenu, null)
        )
      );
    }

    return (
      React.createElement(Paper, {rounded: false, className: classes, zDepth: this.props.zDepth}, 
        menuIconButton, 
        title, 
        this.props.children
      )
    );
  },

  _onMenuIconButtonTouchTap: function(e) {
    if (this.props.onMenuIconButtonTouchTap) this.props.onMenuIconButtonTouchTap(e);
  }

});

module.exports = AppBar;
