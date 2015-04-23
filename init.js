
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

var kmlFormat = new ol.format.KML();
var features = kmlFormat.writeFeatures(featureOverlay.getFeatures());

var exportKMLElement = document.getElementById('export-kml');

// exportKMLElement.addEventListener('click', function() {
// 		debugger;
// 		// get the features drawn on the map
// 		var features = featureOverlay.getFeatures().getArray();
// 		// create an object to write features on a output KML file 
// 		var format = new ol.format.KML();
// 		// write features to KML format using projection EPSG:4326
// 		var kml = format.writeFeatures(features, {featureProjection: 'EPSG:3857'});
// 		// Save KML node as KML file using FileSaver.js script
// 		// var str = (new XMLSerializer).serializeToString(kml);
// 		var blob = new Blob([kml], {type: "text/plain;charset=utf-8;"});
// 		saveAs(blob, "NovaCamada.kml");
// 		// var base64 = exampleNS.strToBase64(string);
// 		// 	exportKMLElement.href =
// 		// 	  'data:application/vnd.google-earth.kml+xml;base64,' + base64;
// 	}, false);
// if ('download' in exportKMLElement) {
// 	debugger;	
// 	var polygonSource = features.getSource();
	
// 	exportKMLElement.addEventListener('click', function(e) {
// 		if (!exportKMLElement.href) {
// 			var features = [];
// 			polygonSource.forEachFeature(function(feature) {
// 			var clone = feature.clone();
// 			clone.setId(feature.getId());  // clone does not set the id
// 			clone.getGeometry().transform(projection, 'EPSG:4326');
// 			features.push(clone);
// 			});
// 			var string = new ol.format.KML().writeFeatures(features);
// 			var base64 = exampleNS.strToBase64(string);
// 			exportKMLElement.href =
// 			  'data:application/vnd.google-earth.kml+xml;base64,' + base64;
// 		}
// 	}, false);
// } else {
//   var info = document.getElementById('no-download');
//   /**
//    * display error message
//    */
//   info.style.display = '';
// }
