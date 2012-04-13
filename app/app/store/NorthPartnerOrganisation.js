Ext.define('SMT.store.NorthPartnerOrganisation', {
    extend: 'Ext.data.Store',

    config: {
        
        model: 'SMT.model.NorthPartnerOrganisation',
        autoLoad: true,
        sorters: [
            {
                property : 'name',
                direction: 'ASC'
            }
        ]

    }
});