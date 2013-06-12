Ext.define('Recorder.view.Main', {
    extend : 'Ext.tab.Panel',
    xtype  : 'recorder-main',

    requires : [
        'Ext.field.Email',
        'Ext.form.FieldSet',
        'Ext.TitleBar',
        'Ext.Video',

        'Recorder.view.HeatMap'
    ],

    config : {
        tabBarPosition : 'bottom',
        items          : [
            {
                xtype  : 'titlebar',
                docked : 'top',
                title  : 'Welcome to Sencha Touch 2',
                items  : [
                    {
                        text  : 'View',
                        align : 'right'
                    },
                    {
                        text  : 'Reset',
                        align : 'right'
                    },
                    {
                        text  : 'Save',
                        align : 'right'
                    }
                ]
            },
            {
                title            : 'Welcome',
                iconCls          : 'home',
                styleHtmlContent : true,
                scrollable       : true,
                html             : [
                    'You\'ve just generated a new Sencha Touch 2 project. What you\'re looking at right now is the ',
                    'contents of <a target="_blank" href="app/view/Main.js">app/view/Main.js</a> - edit that file ',
                    'and refresh to change what\'s rendered here.'
                ].join('')
            },
            {
                title   : 'Get Started',
                iconCls : 'action',
                items   : [
                    {
                        xtype : 'fieldset',
                        title : 'User Information',
                        items : [
                            {
                                xtype : 'textfield',
                                label : 'First Name'
                            },
                            {
                                xtype : 'textfield',
                                label : 'Last Name'
                            },
                            {
                                xtype : 'emailfield',
                                label : 'Email'
                            }
                        ]
                    },
                    {
                        xtype       : 'container',
                        defaultType : 'container',
                        layout      : {
                            type  : 'hbox',
                            align : 'stretch'
                        },
                        items       : [
                            {
                                flex        : 1,
                                defaultType : 'button',
                                items       : [
                                    {
                                        text : 'One'
                                    },
                                    {
                                        text : 'Three'
                                    },
                                    {
                                        text : 'Five'
                                    },
                                    {
                                        text : 'Seven'
                                    }
                                ]
                            },
                            {
                                flex        : 1,
                                defaultType : 'button',
                                items       : [
                                    {
                                        text : 'Two'
                                    },
                                    {
                                        text : 'Four'
                                    },
                                    {
                                        text : 'Six'
                                    },
                                    {
                                        text : 'Eight'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
});