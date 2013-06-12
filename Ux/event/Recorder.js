Ext.define('Ux.event.Recorder', {
    singleton : true,

    requires : [
        'Ext.mixin.Observable',
        'Ext.util.MixedCollection'
    ],

    mixins : {
        observable : 'Ext.mixin.Observable'
    },

    config : {
        eventsToRecord : [
            'tap',
            'longpress',
            'touchstart',
            'touchend'
        ],
        eventValues    : {
            tap        : 1,
            longpress  : 2,
            touchstart : 1,
            touchend   : 1
        },
        target         : null,
        status         : 'stop',
        filteredEvents : null,
        saveEvents     : Ext.emptyFn
    },

    _allEvents : null,
    _events    : null,

    constructor : function(config) {
        var me = this;

        me.initConfig(config);
        me.callParent([config]);

        me._events = new Ext.util.MixedCollection();

        me.mixins.observable.constructor.call(me);
    },

    start : function() {
        this.setStatus('start');
        this.setTarget();
    },

    applyTarget : function() {
        return Ext.getBody();
    },

    updateEventsToRecord : function(events) {
        this.setFilteredEvents(events);
    },

    updateTarget : function(target, oldTarget) {
        var me     = this,
            events = me.getEventsToRecord(),
            i      = 0,
            len    = events.length,
            obj    = {
                scope : me
            },
            event;

        for (; i < len; i++) {
            event = events[i];

            obj[event] = me.createRecorder(event);
        }

        if (oldTarget) {
            oldTarget.clearListeners();
        }

        if (target) {
            target.on(obj);
        }
    },

    updateStatus : function(status, oldStatus) {
        if (status !== oldStatus) {
            this.fireEvent(status, this);
        }
    },

    updateFilteredEvents : function(filtered, old) {
        var me             = this,
            eventsToRecord = me.getEventsToRecord();

        if (me._allEvents) {
            me._events    = me._allEvents;
            me._allEvents = null;
        }

        if (filtered.length && filtered.length !== eventsToRecord.length) {
            me._allEvents = me._events;
            me._events    = me._events.filterBy(function(event) {
                return filtered.indexOf(event.type) > -1;
            });
        }

        if (old) {
            me.fireEvent('filter', me);
        }
    },

    createRecorder : function(type) {
        var me = this;

        return function(e) {
            me.recordEvent(type, e);
        };
    },

    recordEvent : function(type, e) {
        var me = this;

        if (me.getStatus() !== 'start') {
            return;
        }

        var values = me.getEventValues(),
            value  = values[type],
            target = e.getTarget(null, null, true);

        me._events.add({
            type       : type,
            hash       : location.hash.substr(1),
            value      : values[type],
            x          : e.pageX,
            y          : e.pageY,
            timestamp  : e.time,
            e          : e,
            screenSize : target.getSize()
        });

        me.fireEvent('event', me, type, value, e);
    },

    pause : function() {
        this.setStatus('pause');
    },

    resume : function() {
        this.setStatus('start');
    },

    reset : function() {
        var me = this;

        me._events.removeAll();

        me._allEvents = null;

        me.fireEvent('reset', me);
    },

    filter : function(arr) {
        var me             = this,
            i              = 0,
            len            = arr.length,
            newArr         = [],
            type;

        for (; i < len; i++) {
            type = arr[i];

            if (type) {
                newArr.push(type);
            }
        }

        me.setFilteredEvents(newArr);
    },

    getEvents : function(all, events, hash) {
        var me        = this,
            allMc     = me._allEvents,
            currMc    = me._events,
            incEvents = [];

        all    = all    || true;
        events = events || me.getEventsToRecord();
        hash   = hash   || ['*'];

        if (all && allMc) {
            currMc = allMc;
        }

        currMc.each(function(event) {
            if (hash[0] === '*' || hash.indexOf(event.hash) > -1) {
                if (events.indexOf(event.type) > -1) {
                    incEvents.push(event);
                }
            }
        });

        return incEvents;
    },

    save : function(all, events, hash) {
        var fn = this.getSaveEvents();

        fn.call(this, this.getEvents(all, events, hash));
    }
});