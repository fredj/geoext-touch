Ext.define('GeoExt.Map', {
    extend: 'Ext.Component',
    xtype: 'gx_map',

    requires: ['GeoExt.data.LayerStore'],

    config: {
        map: null,
        mapOptions: {},
        layers: null,

        center: null,
        zoom: null,
        extent: null
    },

    initialize: function() {
        this.callParent(arguments);

        this.on('painted', this.render, this, {
            single: true
        });

        this.element.on('longpress', function(evt, node) {
            // FIXME: add lonlat to evt
            this.fireEvent('longpress', this, evt);
        }, this);

        this.setMap(new OpenLayers.Map(this.getMapOptions()));

        this.getMap().events.on({
            moveend: this.forwardEvent,
            scope: this
        });
        this.setLayers(Ext.create('GeoExt.data.LayerStore', {
            data: this.getMap().layers
        }));
    },

    destroy: function() {
        var map = this.getMap();
        if (map) {
            map.destroy();
        }
        this.callParent();
    },

    forwardEvent: function(evt) {
        this.fireEvent(evt.type, evt);
    },

    // initial rendering
    render: function(component) {
        var map = this.getMap();
        map.render(this.element.dom);

        var center = this.getCenter(),
            zoom = this.getZoom(),
            extent = this.getExtent();

        if (center && zoom) {
            map.setCenter(center, zoom);
        } else if (extent) {
            map.zoomToExtent(extent);
        } else {
            map.zoomToMaxExtent();
        }
    },

    getProjection: function() {
        return this.getMap().getProjection();
    },

    updateCenter: function(center) {
        var map = this.getMap();
        if (map) {
            map.setCenter(center);
        }
    },

    updateZoom: function(zoom) {
        var map = this.getMap();
        if (map) {
            map.zoomTo(zoom);
        }
    },

    updateExtent: function(extent) {
        var map = this.getMap();
        if (map) {
            map.zoomToExtent(extent);
        }
    }
});
