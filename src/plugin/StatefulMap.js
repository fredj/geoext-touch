// name sucks
Ext.define('GeoExt.plugin.StatefulMap', {
    alias: 'plugin.gx_statefulmap',

    config: {
        map: null,
        state: null
    },

    init: function(map) {
        if (map) {
            this.setMap(map);
            // apply saved state
            var state = this.getState();
            if (state) {
                map.setCenter(state.lonlat);
                map.setZoom(state.zoom);
            }
            map.on('moveend', this.moveend, this);
        }
    },

    moveend: function(map, olmap) {
        this.setState({
            lonlat: olmap.getCenter(),
            zoom: olmap.getZoom()
        });
    },

    getState: function() {
        var state = localStorage.getItem(this.getMap().getId() + '-position');
        if (state) {
            var items = state.split(',');
            return {
                lonlat: items.slice(0, 2),
                zoom: items[2]
            };
        }
    },

    applyState: function(state) {
        var key = this.getMap().getId() + '-position',
            value = [state.lonlat.lon, state.lonlat.lat, state.zoom].join(',');

        localStorage.setItem(key, value);
    }
});
