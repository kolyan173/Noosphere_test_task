var exportKMLElement = document.getElementById('export-kml');

var map = new ol.Map({
		target: 'map',
		layers: [
		  new ol.layer.Tile({
			  source: new ol.source.BingMaps({
				  key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
				  imagerySet: 'Aerial'
			  })
		  })
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


var modify = new ol.interaction.Modify({
	features: featureOverlay.getFeatures(),
	deleteCondition: function(event) {
		return ol.events.condition.shiftKeyOnly(event) &&
			ol.events.condition.singleClick(event);
	}
});

function addInteraction() {
	var draw = new ol.interaction.Draw({
		features: featureOverlay.getFeatures(),
		type: 'Polygon'
	});
	map.addInteraction(draw);
}

osm.bindTo('view', map);

featureOverlay.setMap(map);
featureOverlay.setMap(osm);

map.addInteraction(modify);
addInteraction();


function saveKMLElement() {
	var kmlFormat = new ol.format.KML();
	var features = featureOverlay.getFeatures().getArray();
	var format = new ol.format.KML();
	var kml = format.writeFeatures(features, {featureProjection: 'EPSG:3857'});
	var blob = new Blob([ kml ], {type: "text/plain;charset=utf-8;"});
	
	saveAs(blob, "NovaCamada.kml");
}

exportKMLElement.addEventListener('click', saveKMLElement, false);

