Ext.define('GeoExt.model.Layer', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'name',
            type: 'string'
        }, {
            name: 'visibility',
            convert: function(visibility, record) {
                record.raw.setVisibility(visibility);
                return record.raw.getVisibility();
            }
        }, {
            name: 'map',
            convert: function(value, record) {
                // value not used, readonly
                return record.raw.map;
            }
        }]
    },

    init: function() {
        this.raw.events.on({
            visibilitychanged: function(evt) {
                // FIXME
                //this.set('visibility', this.raw.getVisibility());
            },
            scope: this
        });
        // FIXME: changelayer, property == 'name'
    }
});
