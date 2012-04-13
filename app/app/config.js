var Config = {
    API: window.location.search.indexOf('localAPI') === -1 ? 'http://smt-dev.herokuapp.com/api/' : 'http://localhost:3000/api/'
};

Ext.Loader.setConfig({
    enabled: true
});

Ext.Loader.setPath({
    'SMT': 'app'
});

Ext.apply(Ext.util.Format, {
    defaultDateFormat: 'Y-m-d'
});