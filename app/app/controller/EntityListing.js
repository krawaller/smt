Ext.define('SMT.controller.EntityListing', {
    extend: 'Ext.app.Controller',


    config: {
        refs: {

            entityListing: 'entitylisting',


            // addButton: 'button',

            exampleRef: {
                selector: 'selector',
                xtype: 'xtype',
                autoCreate: true
            }
        },

        control: {

            entitylisting: {
                push: 'onEntityListingPush',
                pop: 'onEntityListingPop',
                back: 'onEntityListingBack'
            },

            'entitylisting button[action=add]': {
                tap: 'onEntityListingAdd'
            },

            'entitylisting button[action=save]': {
                tap: 'onEntityInputSave'
            },

            'entitylisting button[action=delete]': {
                tap: 'onEntityInputDelete'
            },

            'entitylisting list': {
                itemtap: 'onEntityListingItemTap'
            }
        }
    },

    init: function () {

    },

    onEntityListingAdd: function(button, event) {
        var entityListing = button.up('entitylisting');
        var entity = entityListing.getEntity();

        var record = Ext.create('SMT.model.' + entity.model);

        var entityInput = Ext.create('SMT.view.EntityInput', {
            xtype: 'entityinput',
            entity: entity,
            // type: entity.title,
            title: 'Create', // + entity.title,
            record: record,
            store: entity.store
        });

        entityListing.setActiveEntityInput(entityInput);
        entityListing.push(entityInput);
    },

    //TODO: Ehm... there is some kind of ID mismatch going on, so you
    //if you edit a newly created instance, the updated state won't be
    //saved. Think we need to return the generated _id from the server
    //upon successful save, but Sencha docs suck at these things. :-S
    onEntityInputSave: function(button) {
        var entityListing = button.up('entitylisting'),
            activeEntityInput = entityListing.getActiveEntityInput();

        activeEntityInput.updateRecord(activeEntityInput.getRecord(), true);
        var phantom = activeEntityInput.getRecord().phantom;
        
        activeEntityInput.setMasked({
            xtype: 'loadmask',
            message: 'Loading'
        });
        activeEntityInput.getRecord().save(function(record, con) { //FIXME: loader plz
            if(phantom){
                Ext.StoreMgr.get(activeEntityInput.getStore()).add(activeEntityInput.getRecord());
            }
            entityListing.pop();
        });

    },

    onEntityInputDelete: function(button) {
        var entityListing = button.up('entitylisting'),
            activeEntityInput = entityListing.getActiveEntityInput();

        activeEntityInput.setMasked({
            xtype: 'loadmask',
            message: 'Loading'
        });
        activeEntityInput.getRecord().erase(); //FIXME should be erase and do a delete request
        entityListing.pop();
    },

    onEntityListingBack: function(entityListing) {
        if(entityListing.getActiveEntityInput().xtype === 'entityinput'){
            entityListing.down('button[action=save]').hide();
        }
        
    },

    onEntityListingPush: function(entityListing, newItem) {
        entityListing.down('button[action=add]').hide();

        if(newItem.xtype === 'entityinput'){
            setTimeout(function() {
                entityListing.down('button[action=save]').show(); // FIXME
            }, 250);
        }
    },

    onEntityListingPop: function(entityListing, oldItem) {
        if(oldItem.xtype === 'entityinput'){
            entityListing.down('button[action=save]').hide();
            setTimeout(function() {
                entityListing.down('button[action=add]').show(); // FIXME
            }, 250);
             // FIXME
        } else {
            entityListing.down('button[action=add]').show();
        }
        
    },

    onEntityListingItemTap: function(list, index, target, record) {
        
        var entityListing = list.up('entitylisting');
        var entity = entityListing.getEntity();

        var entityInput = Ext.create('SMT.view.EntityInput', {
            xtype: 'entityinput',
            entity: entity,
            title:  'Edit', //record.get('name'),
            record: record,
            store: entity.store
        });

        entityListing.setActiveEntityInput(entityInput);
        entityListing.push(entityInput);
        
    }
});
