Ext.define('Recorder.controller.Main', {
    extend : 'Ext.app.Controller',

    config : {
        control : {
            'button'            : {
                tap : 'handleButtonTap'
            },
            'recorder-heatmap'  : {
                tap  : 'hideHeatmap',
                hide : 'destroyComponent'
            },
            'recorder-heatmenu' : {
                hide : 'destroyComponent'
            },
            'recorder-main'     : {
                activeitemchange : 'onMainItemChange'
            }
        },
        routes  : {
            ''        : 'showDefault',
            'form'    : 'showForm',
            'home'    : 'showHome',
            'heatmap' : 'showHeatMap'
        }
    },

    handleButtonTap : function(button) {
        var text = button.getText(),
            menu;

        if (/view/i.test(text)) {
            this.redirectTo('heatmap');
        } else if (/reset/i.test(text)) {
            Ux.event.Recorder.resume();
            Ux.event.Recorder.reset();
        } else if (/filter/i.test(text)) {
            menu   = button.up('recorder-heatmenu');

            var values = menu.getValues();

            Ux.event.Recorder.filter(values.event || []);

            menu.hide();
        } else if (/back/i.test(text)) {
            menu = button.up('recorder-heatmenu');

            menu.hide();

            this.redirectTo('home');
        } else if (/save/i.test(text)) {
            Ux.event.Recorder.save();
        }
    },

    hideHeatmap : function(map) {
        var menu = new Recorder.view.HeatMenu({
            map : map
        });

        Ext.Viewport.add(menu);
        menu.show();
    },

    destroyComponent : function(comp) {
        comp.destroy();
    },

    onMainItemChange : function(tabpanel, newItem) {
        var hash = /welcome/i.test(newItem.title) ? 'home' : 'form';

        if (!new RegExp(hash, 'i').test(location.hash)) {
            this.redirectTo(hash);
        }
    },

    showDefault : function() {
        this.redirectTo('home');
    },

    showHome : function() {
        Ext.Viewport.setActiveItem(0);

        Ux.event.Recorder.resume();
    },

    showHeatMap : function() {
        Ux.event.Recorder.pause();

        Ext.Viewport.setActiveItem({
            xtype : 'recorder-heatmap'
        });
    },

    showForm : function() {
        var main = Ext.Viewport.child('recorder-main');

        main.setActiveItem(1);
    }
});