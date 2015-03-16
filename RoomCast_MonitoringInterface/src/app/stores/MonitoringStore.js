
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var MonitoringConstants = require('../constants/MonitoringConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _playing = {
    'iPad1': '01',
    'iPad2': '01',
    'iPad3': '01',
    'iPad4': '01',
    'iPad5': '02',
    'iPad6': '02',
    'iPad7': '03'
};

var _groups = {
    'Group1': ["iPad1", "iPad2", "iPad3", "iPad4"],
    'Group2': ["iPad5", "iPad6"],
    'Group3': ["iPad7"]
    };

/////////////////////////


/////////////////////////


var MonitoringStore = assign({}, EventEmitter.prototype, {

    getPlaying: function() {
        return _playing;
    },

    getGroups: function() {
        return _groups;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }



});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

    switch(action.actionType) {
        case MonitoringConstants.PLAY:
            MonitoringStore.play();
            break;

        default:
        // no op


    }

});

module.exports = MonitoringStore;