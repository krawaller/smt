Ext.define("SMT.view.EntityListing", {
    extend: 'Ext.navigation.View',
    xtype: 'entitylisting',

    config: {

        navigationBar: {
            items: [
                {
                    xtype: 'button',
                    action: 'add',
                    iconCls: 'add',
                    iconMask: true,
                    align: 'right',
                    hidden: false,

                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 150
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 150
                    }
                },

                {
                    xtype: 'button',
                    action: 'save',
                    text: 'Save',
                    align: 'right',
                    hidden: true,

                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 150
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 150
                    }
                }
            ]
        },

        // Since we name the property `entity` here, Sencha creates
        // the `setEntity` method below which gets called even on construction if
        // we pass `entity` like Ext.create('SMT.view.EntityListing', { entity: '...' })
        entity: null,
        activeEntityInput: null,

        test: null,

        items: []
    },

    setEntity: function(entity) {
        // console.log('entity', entity);
        this.push({
            title: entity.title,
            xtype: 'list',
            itemTpl: '{name}',
            disableSelection: true,

            plugins: [
                {
                    xclass: 'Ext.plugin.PullRefresh',
                    pullRefreshText: 'Pull down to refresh!'
                }
            ],

            store: entity.store

        });

        this._entity = entity;
    }

});
