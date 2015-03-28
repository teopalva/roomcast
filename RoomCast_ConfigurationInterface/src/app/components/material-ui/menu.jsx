var React = require('react');
var Mui = require('material-ui');
var Paper = Mui.Paper;
var Dom = require('../../../../node_modules/material-ui/src/js/utils/dom');
var KeyLine = require('../../../../node_modules/material-ui/src/js/utils/key-line');
var MenuItem = require('./menu-item.jsx');

var Menu = React.createClass({

    propTypes: {
        autoWidth: React.PropTypes.bool,
        onItemTap: React.PropTypes.func,
        onItemClick: React.PropTypes.func,
        onToggleClick: React.PropTypes.func,
        menuItems: React.PropTypes.array.isRequired,
        selectedIndex: React.PropTypes.number,
        hideable: React.PropTypes.bool,
        visible: React.PropTypes.bool,
        zDepth: React.PropTypes.number
    },

    getInitialState: function() {
        return { nestedMenuShown: false }
    },

    getDefaultProps: function() {
        return {
            autoWidth: true,
            hideable: false,
            visible: true,
            zDepth: 1
        };
    },

    componentDidMount: function() {
        var el = this.getDOMNode();

        //Set the menu with
        //this._setKeyWidth(el);
        var menuWidth = document.getElementsByClassName('resources-panel')[0].offsetWidth / 3;
        //Update the menu width
        el.style.width = menuWidth + 'px';

        //Save the initial menu height for later
        this._initialMenuHeight = el.offsetHeight + KeyLine.Desktop.MENU_ITEM_HEIGHT;

        console.log(el, el.offsetHeight, this._initialMenuHeight);

        //Show or Hide the menu according to visibility
        this._renderVisibility();
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.props.visible !== prevProps.visible) this._renderVisibility();
    },

    render: function() {
        var classes = 'mui-menu';
        if(this.props.hideable) {
            classes += ' mui-menu-hideable';
        }
        if(this.props.visible) {
            classes += ' mui-visible';
        }

        return (
            <Paper ref="paperContainer" zDepth={this.props.zDepth} className={classes}>
        {this._getChildren()}
            </Paper>
        );
    },

    _getChildren: function() {
        var children = [],
            menuItem,
            itemComponent,
            isSelected;

        //This array is used to keep track of all nested menu refs
        this._nestedChildren = [];

        for (var i=0; i < this.props.menuItems.length; i++) {
            menuItem = this.props.menuItems[i];
            isSelected = i === this.props.selectedIndex;

            var {
                icon,
                data,
                attribute,
                number,
                toggle,
                onClick,
        ...other
        } = menuItem;

        itemComponent = (
            <MenuItem
              {...other}
                selected={isSelected}
                key={i}
                index={i}
                icon={menuItem.icon}
                data={menuItem.data}
                attribute={menuItem.attribute}
                number={menuItem.number}
                toggle={menuItem.toggle}
                onClick={this._onItemClick}
                onTouchTap={this._onItemTap}
                lastItem={i===this.props.menuItems.length}>

              {menuItem.text}

            </MenuItem>
        );
        children.push(itemComponent);
    }

    if(this.props.configMenu) {

        var newField = (
            <div className='config-text-field-div'>
                <input className='config-input'
                    placeholder={'New name'}
                    onChange={console.log('change')} />
            </div>
        );

        var lastItem = (
            <MenuItem
              {...other}
            selected={isSelected}
            key={i}
            index={i}
            data={menuItem.data}
            attribute={menuItem.attribute}
            number={menuItem.number}
            toggle={menuItem.toggle}
            onClick={this._onItemClick}
            onTouchTap={this._onItemTap}
            lastItem={true} >

              {newField}

        </MenuItem>);

        children.push(lastItem);

    }

    return children;
},

_setKeyWidth: function(el) {
    var menuWidth = this.props.autoWidth ?
    KeyLine.getIncrementalDim(el.offsetWidth) + 'px' :
        '100%';

    //Update the menu width
    Dom.withoutTransition(el, function() {
        el.style.width = menuWidth;
    });
},

_renderVisibility: function() {
    var el;

    if (this.props.hideable) {
        el = this.getDOMNode();
        var innerContainer = this.refs.paperContainer.getInnerContainer().getDOMNode();

        if (this.props.visible) {

            //Open the menu
            el.style.height = this._initialMenuHeight + 'px';
            //This is to account for fast clicks
            if (this.props.visible) {
                innerContainer.style.overflow = 'visible';
            }

        } else {

        //Close the menu
        el.style.height = '0px';

        //Set the overflow to hidden so that animation works properly
        innerContainer.style.overflow = 'hidden';
    }
}
},

handleLogout: function() {
    this.props.onLogout();
},

_onItemClick: function(e, index) {
    if (this.props.onItemClick) this.props.onItemClick(e, index, this.props.menuItems[index]);
},

_onItemTap: function(e, index) {
    if (this.props.onItemTap) this.props.onItemTap(e, index, this.props.menuItems[index]);
},

_onItemToggle: function(e, index, toggled) {
    if (this.props.onItemToggle) this.props.onItemToggle(e, index, this.props.menuItems[index], toggled);
}

});

module.exports = Menu;
