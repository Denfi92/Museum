function createMap() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2FyaW1vdmEiLCJhIjoiY2t1ODdhYXJqNDIyYTJvcDhjNTk4NzJvNSJ9.Tv-b0opxzCrtkIvsoxaf2w';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/karimova/cku9j0s7k66fz17mqyj6nh73o',
        zoom: 15.76,
        center: [2.33635, 48.86096],
    });

    map.addControl(new mapboxgl.NavigationControl());

    const marker1 = new mapboxgl.Marker({
        color: "#000000",
    }).setLngLat([2.3364, 48.86091])
    .setPopup(new mapboxgl.Popup().setHTML("<span>Louvre Museum</span>"))
    .addTo(map);

    const marker2 = new mapboxgl.Marker({
        color: "#757575",
    }).setLngLat([2.3333, 48.8602])
    .setPopup(new mapboxgl.Popup().setHTML("<span>Entrance from Pont du Carrousel</span>"))
    .addTo(map);

    const marker3 = new mapboxgl.Marker({
        color: "#757575",
    }).setLngLat([2.3397, 48.8607])
    .setPopup(new mapboxgl.Popup().setHTML("<span>Sarcophage d'Abou Roach</span>"))
    .addTo(map);

    const marker4 = new mapboxgl.Marker({
        color: "#757575",
    }).setLngLat([2.3330, 48.8619])
    .setPopup(new mapboxgl.Popup().setHTML("<span>Arc de Triomphe du Carrousel</span>"))
    .addTo(map);

    const marker5 = new mapboxgl.Marker({
        color: "#757575",
    }).setLngLat([2.3365, 48.8625])
    .setPopup(new mapboxgl.Popup().setHTML("<span>Metro station</span>"))
    .addTo(map);
}

createMap();