const script = document.createElement('script');
script.async = true;
script.src = `https://maps.googleapis.com/maps/api/js?key=${config.MAP_API_KEY}&callback=initMap&libraries=&v=weekly`
document.body.appendChild(script);
let markers = [];

//populate data
function poplulateData (){
  if(allData.length !== 0){
    allData.map((business) => {
      const element = {
        coords: { lat: business.coordinates.latitude, lng: business.coordinates.longitude },
        content: `
        <h1>${business.name}</h1>
        <p>${business.location.display_address.join(', ')}</p>
        <p>${business.display_phone}</p>
        `
      }
      markers.push(element);
    });

  console.log(markers);
}}


async function initMap() {
  markers = [];
  await poplulateData();

  let options = {
    zoom: 12,
    center: markers[0].coords
  }

  //Set map
  const map = new google.maps.Map(document.getElementById("map"), options);

  for(let marker of markers){
    addMarker(marker);
  }

  const infoWindow = new google.maps.InfoWindow();

  //Add marker function
  function addMarker(props){
    const marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      icon: './bubble-tea.png'
    });

    if(props.content){
      marker.addListener('click', function() {
        infoWindow.setContent(props.content);
        infoWindow.open(map, marker);
      });
    }
  }
}