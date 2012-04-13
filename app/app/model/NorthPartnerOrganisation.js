// What's a North partner organisation?
// It will have a name, post
// address, email address. Phones? Faxes? Bank account for money
// transfers? Contact persons? A contract version. It will be associated
// with customers, or with local partner organisations in South. We may
// be paying them a commission fee based on their associates'
// transactions, or they may be paying us. We may be appending their
// messages or logo to our North or South messages. Of all entities in
// the SMT system, this will be the one there's fewest of.

Ext.define('SMT.model.NorthPartnerOrganisation', {
    extend: 'Ext.data.Model',

    config: {

        idProperty: '_id',

        fields: [
            { name: '_id', type: 'auto' },
            { name: 'name', type: 'string' },
            { name: 'email', type: 'string' },
            { name: 'phone', type: 'string' }
        ],

        proxy: {
            type: 'rest',
            url: Config.API + 'NorthPartnerOrganisation'
        }
    }
});