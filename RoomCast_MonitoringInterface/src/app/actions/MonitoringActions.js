
var AppDispatcher = require('../dispatcher/AppDispatcher');
var MonitoringConstants = require('../constants/MonitoringConstants');

var MonitoringActions = {

    play: function(channel, group) {
        AppDispatcher.dispatch({
            actionType: MonitoringConstants.PLAY,

        });
    }





}