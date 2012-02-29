Ext.define('GeoExt.data.LayerStore', {
    extend: 'Ext.data.Store',

    requires: ['GeoExt.model.Layer'],

    config: {
        model: 'GeoExt.model.Layer',
        sorters: [{
            sorterFn: function(left, right) {
                // FIXME: sort by zindex
            }
        }]
    }
});
