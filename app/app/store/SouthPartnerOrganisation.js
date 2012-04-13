Ext.define('SMT.store.SouthPartnerOrganisation', {
    extend: 'Ext.data.Store',

    config: {
        
        model: 'SMT.model.SouthPartnerOrganisation',
        autoLoad: true,
        sorters: [
            {
                property : 'name',
                direction: 'ASC'
            }
        ]

    }
});