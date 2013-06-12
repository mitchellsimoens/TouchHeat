Ext.define('Recorder.view.HeatMap', {
    extend : 'Ext.Component',
    xtype  : 'recorder-heatmap',

    requires : [
        'Ux.event.Recorder',

        'Recorder.view.HeatMenu'
    ],

    config : {
        pressure : 15
    },

    _heatcanvas : null,

    template : [
        {
            reference : 'canvas',
            tag       : 'canvas'
        }
    ],

    initialize : function() {
        var me = this;

        me.callParent();

        me.on({
            scope   : me,
            single  : true,
            painted : me.showHeatMap
        });

        me.element.on({
            scope : me,
            tap   : me.onMapTap
        });

        Ux.event.Recorder.on({
            scope  : me,
            reset  : me.onRecorderReset,
            filter : me.showHeatMap
        });
    },

    showHeatMap : function() {
        var me         = this,
            heatcanvas = me._heatcanvas,
            canvas     = me.canvas,
            size       = me.element.getSize(),
            events     = Ux.event.Recorder._events,
            pressure   = me.getPressure(),
            x, y, value;

        canvas.dom.width  = size.width;
        canvas.dom.height = size.height;

        if (heatcanvas) {
            heatcanvas.clear();
        } else {
            heatcanvas = me._heatcanvas = new HeatCanvas(canvas.dom);
        }

        events.each(function(event) {
            x     = event.x;
            y     = event.y;
            value = event.value * pressure;

            heatcanvas.push(x, y, value);
            canvas.dom.getContext('2d').fillText(value, x, y);
        });

        heatcanvas.render(1, null, null);
    },

    onMapTap : function() {
        this.fireEvent('tap', this);
    },

    onRecorderReset : function() {
        var heatcanvas = this._heatcanvas;

        heatcanvas.clear();
        heatcanvas.render(1, null, null);
    }
});