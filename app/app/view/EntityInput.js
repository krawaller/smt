Ext.define("SMT.view.EntityInput", {
    extend: 'Ext.form.Panel',
    xtype: 'entityinput',

    config: {


        entity: null,
        record: null,
        store: null,

        items: [{
            xtype: 'fieldset',
            // title: 'Personal Info', // Set from entity.title instead
            // instructions: 'Please enter the information above.',
            defaults: {
                required: true,
                labelAlign: 'left',
                labelWidth: '32%'
            },
            items: [] // Added based on model
        },
        {
            xtype: 'panel',
            defaults: {
                xtype: 'button',
                style: 'margin: 0.1em',
                flex: 1
            },
            layout: {
                type: 'hbox'
            },
            items: [{
                action: 'delete',
                text: 'Delete',
                ui: 'decline',
                hidden: true
            },
            {
                action: 'save',
                text: 'Save',
                ui: 'confirm'
            }]
        }]
        

    },

    setEntity: function(entity) {

        this.down('fieldset').setTitle(entity.title);
        this._entity = entity;
    },

    setRecord: function(record) {

        if(record){
            var items = [];
            record.getFields().each(function(field) {
                if(field.getName() !== '_id'){
                    items.push({
                        xtype: 'textfield', //field.getType().type
                        name: field.getName(),
                        label: field.getName()
                    });
                }
            });
            this.down('fieldset').add(items);
        }

        if(record && record.get('_id')){
            this.down('button[action=delete]').show();
        }

        this.callParent([record]);
    }

});




