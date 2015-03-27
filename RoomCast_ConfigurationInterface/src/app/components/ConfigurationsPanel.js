var React = require('react');
var Mui = require('material-ui');
var NutellaMixin = require('./NutellaMixin');
var Paper = Mui.Paper;
var DropDownMenu = require('./material-ui/drop-down-menu.jsx');

/**
 */
var ConfigurationsPanel = React.createClass({

    mixins: [NutellaMixin],

    shouldComponentUpdate: function() {
        return this.props.configs.length !== 0;
    },

    handleChangeConfig: function(e, selectedIndex, menuItem) {
        this.props.onChangeConfig(menuItem.configId);
    },

    render: function() {

        var dropdown = null;
        var menuItems = [];

        var configs = this.props.configs;
        if(configs.length !== 0) {
            var ids = [];
            for(var c in configs) {
                if(configs.hasOwnProperty(c)) {
                    ids.push(+c);
                }
            }

            function sortNumber(a,b) {
                return b - a;
            }
            ids.sort(sortNumber);

            ids.forEach(function(id, i) {
                menuItems.push({configId: id, text: configs[id].name});
            });

            dropdown = (<DropDownMenu menuItems={menuItems} onChange={this.handleChangeConfig} />);
        }

        return (
            <div className='configurations-panel-div'>

                <Paper>

                {dropdown}

                </Paper>

            </div>);

    }

});

module.exports = ConfigurationsPanel;

