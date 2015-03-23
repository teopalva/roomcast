
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
    'Group3': ["iPad7"],
    'Group4': ["iPad8"],
    'Group5': ["iPad9"],
    'Group6': ["iPad10"],
    'Group7': ["iPad11"]
    };

var _channels = {
    '01': {name: 'Admin', icon: '', screenshot: './assets/channels/Roomquake/Admin.png', description: 'description: first channel', url: 'http://matteopalvarini.com/viz/Project3'},
    '02': {name: 'AggregateView', icon: '', screenshot: './assets/channels/Roomquake/AggregateView.png',  description: '', url:'http://google.it'},
    '03': {name: 'Seismograph1', icon: '', screenshot: './assets/channels/Roomquake/Seismograph1.png',  description: '', url:'roomquake.seismometer://'},
    '04': {name: 'Seismograph2', icon: '', screenshot: './assets/channels/Roomquake/Seismograph2.png',  description: '', url:'http://d3js.org'},
    '05': {name: 'Seismograph3', icon: '', screenshot: './assets/channels/Roomquake/Seismograph3.png',  description: '', url:'roomquake.seismometer://'},
    '06': {name: 'Seismograph4', icon: '', screenshot: './assets/channels/Roomquake/Seismograph4.png',  description: '', url:'roomquake.seismometer://'},
    '07': {name: 'StudentsForms', icon: '', screenshot: './assets/channels/Roomquake/StudentsForms.png',  description: '', url:'http://uic.edu'}
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

    getChannels: function() {
        return _channels;
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