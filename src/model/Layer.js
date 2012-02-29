Ext.define('GeoExt.model.Layer', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'name',
            convert: function(name, record) {
                record.raw.setName(name);
                return record.raw.name;
            }
        }, {
            name: 'visibility',
            convert: function(visibility, record) {
                record.raw.setVisibility(visibility);
                return record.raw.getVisibility();
            }
        }, {
            name: 'opacity',
            convert: function(opacity, record) {
                record.raw.setOpacity(opacity);
                return record.raw.opacity;
            }
        },{
            name: 'map',
            convert: function(value, record) {
                // 'value' not used, readonly.
                return record.raw.map;
            }
        }]
    },

    init: function() {
        this.get('map').events.on({
            changelayer: function(evt) {
                if (evt.layer === this.raw) {
                    // FIXME
                }
            },
            scope: this
        });
    }
});
