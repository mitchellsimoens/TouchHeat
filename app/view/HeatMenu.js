Ext.define('Recorder.view.HeatMenu', {
    extend : 'Ext.form.Panel',
    xtype  : 'recorder-heatmenu',

    requires : [
        'Ext.field.Checkbox',
        'Ext.form.FieldSet'
    ],

    config : {
        map           : null,
        centered      : true,
        modal         : true,
        hideOnMaskTap : true,
        width         : '75%',
        height        : '75%',
        items         : true
    },

    applyItems : function(items, oldItems) {
        if (!Ext.isArray(items)) {
            var events   = Ux.event.Recorder.getEventsToRecord(),
                filtered = Ux.event.Recorder.getFilteredEvents(),
                i        = 0,
                len      = events.length,
                event;

            items = [];

            for (; i < len; i++) {
                event = events[i];

                items.push({
                    xtype   : 'checkboxfield',
                    label   : event,
                    name    : 'event',
                    value   : event,
                    checked : filtered.indexOf(event) > -1
                });
            }

            items.push({
                xtype : 'button',
                text  : 'Filter',
                ui    : 'confirm'
            });

            items = [
                {
                    xtype : 'fieldset',
                    title : 'Filter Events',
                    items : items
                },
                {
                    xtype : 'button',
                    text  : 'Go Back',
                    ui    : 'decline'
                }
            ];
        }

        return this.callParent([items, oldItems]);
    }
});