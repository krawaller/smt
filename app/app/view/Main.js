Ext.define('SMT.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',

    config: {
        fullscreen: true,
        
        tabBarPosition: 'bottom',

        // layout: {
        //     type: 'card',
        //     animation: {
        //         type: 'fade'
        //     }
        // },

        items: [{
            xtype: 'entitylisting',
            title: 'North Partners',
            iconCls: 'home',
            entity: {
                title: 'North Partner Org.',
                model: 'NorthPartnerOrganisation',
                store: 'NorthPartnerOrganisation'
            }
        },{
            xtype: 'entitylisting',
            title: 'South Partners',
            iconCls: 'home',
            entity: {
                title: 'South Partner Org.',
                model: 'SouthPartnerOrganisation',
                store: 'SouthPartnerOrganisation'
            }
        }]
    }
});