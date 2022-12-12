// ! Html elements
const ipInput = document.querySelector('#inputIp');
const searchBtn = document.querySelector('#searchBtn')

const ipField = document.querySelector('#ipaddress');
const locationField = document.querySelector('#locattion');
const timeZoneField = document.querySelector('#timezone');
const ispField = document.querySelector('#isp');


let map;

function initMap() { //! Google Map 
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -0, lng: 0 },
    zoom: 18, //! initial Zoom level
    mapId:'2f8fb0ffb1955b9', //! for Styling the map
  });
}

searchBtn.addEventListener("click", ()=>{
    let inputValue = ipInput.value ;
    
    let domainNameRegex = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/; //! regex to check the input for correct ip addresses

    let ipAdrRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/; //! regex to check the input for correct ip addresses

        if (ipAdrRegex.test(inputValue)) {
            ipInput.classList.remove("invalid-input")
            ipInput.classList.add("valid-input")

            lookIpDomain("ipAddress", inputValue);  

        } else if (domainNameRegex.test(inputValue)) {
            ipInput.classList.remove("invalid-input")
            ipInput.classList.add("valid-input")

            lookIpDomain("domain", inputValue);

        }
        else{
            ipInput.classList.remove("valid-input")

            ipInput.classList.add("invalid-input")
            console.log("invalid input");
        }

})



//! Add Enter to Ip Input
ipInput.addEventListener("keypress", function(event) {
    //! If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      //! Cancel the default action, if needed
      event.preventDefault();
      //! Trigger the button element with a click
      searchBtn.click();
    }
  });



 function lookIpDomain(path, blob){
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_rnp6P9iqW4qnv5osnohkrAa9CbJA6&${path}=${blob}`)
    .then(res => res.json())
       .then(data => {
           ipField.textContent = data.ip;
           locationField.textContent = `${data.location.city},  ${data.location.region} ${data.location.postalCode} ${data.location.country}`;
           timeZoneField.textContent = `UTC ${data.location.timezone}`;
           ispField.textContent = data.isp;
           let lat = data.location.lat;
           let lng = data.location.lng;

           let userLocation = {lat, lng};
           console.log(userLocation);
           map.setCenter(userLocation);

           // A marker with a with a URL pointing to a PNG.
           const markerImg = document.createElement('img');
           markerImg.src = './images/icon-location.svg';
           markerImg.style.width = "40px";
           
           const userMarker = new google.maps.marker.AdvancedMarkerView({
               map:map,
               position: userLocation,
               content: markerImg,
               title:  `${path} Location`,
            });
               
       })
       
 };


lookIpDomain();


window.initMap = initMap;

