// var raster = new ol.layer.Tile({
// 	source: new ol.source.MapQuest({layer: 'sat'})
// });

var map = new ol.Map({
		target: 'map',
		layers: [
		  new ol.layer.Tile({
			  source: new ol.source.BingMaps({
				  key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
				  imagerySet: 'Aerial'
			  })
		  }),
		  // raster
		],
		view: new ol.View({
		  center: [0, 0],
		  zoom: 1
		})
	  });

var osm = new ol.Map({
	target: 'osm',
	layers: [
	  new ol.layer.Tile({
		  source: new ol.source.OSM({
			  attributions: [
				  ol.source.OSM.ATTRIBUTION
			  ],
			  crossOrigin: null
		  })
	  })
	]
});

osm.bindTo('view', map);

var featureOverlay = new ol.FeatureOverlay({
	style: new ol.style.Style({
		fill: new ol.style.Fill({
			color: 'rgba(255, 255, 255, 0.2)'
		}),
		stroke: new ol.style.Stroke({
			color: '#ffcc33',
			width: 2
		}),
		image: new ol.style.Circle({
			radius: 7,
			fill: new ol.style.Fill({
				color: '#ffcc33'
			})
		})
	})
});

featureOverlay.setMap(map);
featureOverlay.setMap(osm);

var modify = new ol.interaction.Modify({
	features: featureOverlay.getFeatures(),
	deleteCondition: function(event) {
		return ol.events.condition.shiftKeyOnly(event) &&
			ol.events.condition.singleClick(event);
	}
});

map.addInteraction(modify);

function addInteraction() {
	var draw = new ol.interaction.Draw({
		features: featureOverlay.getFeatures(),
		type: 'Polygon'
	});
	map.addInteraction(draw);
}

addInteraction();

