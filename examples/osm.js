Ext.Loader.setConfig({
    enabled: true
});

Ext.Loader.setPath({
    'GeoExt': '../src'
});

Ext.application({
    name: 'GeoExt.example.osm',
    requires: ['GeoExt.Map'],

    launch: function() {
        Ext.create('Ext.Panel', {
            fullscreen: true,
            layout: 'fit',
            items: [{
                xtype: 'toolbar',
                docked: 'top'
            }, {
                xtype: 'gx_map',
                mapOptions: {
                    theme: false,
                    layers: [new OpenLayers.Layer.OSM()]
                },
                listeners: {
                    longpress: function(map, lonlat, olmap, event) {
                        alert(lonlat.toString());
                    }
                }
            }]
        });
    }
});
