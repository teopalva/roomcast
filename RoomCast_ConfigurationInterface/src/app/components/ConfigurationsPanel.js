var React = require('react');
var Mui = require('material-ui');
var NutellaMixin = require('./NutellaMixin');
var Paper = Mui.Paper;
var DropDownMenu = require('./material-ui/drop-down-menu.jsx');

/**
 */
var ConfigurationsPanel = React.createClass({

    mixins: [NutellaMixin],

    render: function() {

        var menuItems = [
            { payload: '1', text: 'Never' },
            { payload: '2', text: 'Every Night' },
            { payload: '3', text: 'Weeknights' },
            { payload: '4', text: 'Weekends' },
            { payload: '5', text: 'Weekly' },
        ];

        return (
            <div className='configurations-panel-div'>

                <Paper>

                    <DropDownMenu menuItems={menuItems} />

                </Paper>

            </div>);

    }

});

module.exports = ConfigurationsPanel;

