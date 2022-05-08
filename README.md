<h1 align="left">
Home Among the Gum Trees
</h1>
<div style="margin: 200px;">
  
[🔗 Try out the app here!](https://home-among-the-gum-trees.vercel.app/)  
Note: this app is optimized for Melbourne, Australia. If you don't know any addresses, try: [47 Lansell Rd, Toorak](https://www.abc.net.au/news/2021-10-14/toorak-mansion-house-sale-auction-record-melbourne/100538138)
  
## About this project
This app is built for my friends and family at home searching for properties in Melbourne, Australia. It uses the Google Maps API.

### About the app
The app is a tool for evaluating the neighbourhood of a given property. The user searches for an address and chooses from a set of suggestions. The app then displays the top 3 places across several categories (eg. restaurant, cafe, park etc.) within 1km of the selected address. Clicking on the house marker link takes the user to realestate.com.au where they can view details about the property, such as sale prices and land size.
  
## Techonologies Used
- [Google Maps API](https://developers.google.com/maps/documentation/javascript): Map display, Markers, Places Autocomplete, Nearby Search
- React Hooks
- HTML, CSS, Sass, Javascript
  
## Demo
<a href="https://youtu.be/ayhjH3wpiy8" target="_blank">
  <img src="https://img.youtube.com/vi/ayhjH3wpiy8/0.jpg" alt="Home Among the Gum Trees Demo!" />
</a> 
  
## Project Status
- The first version is complete
- I plan to add the following features in future versions:
    - Display property information on the page (eg. most recent sale price, land area)
    - Store history of previously searched addresses
    - Allow user to specify radius (currently it's 1km)
    - Allow user to select an address by (right-)clicking on the map
    - Sort train/tram stations by proximity instead of rating
    - Display walking distance for each place (using the Google Maps Directions Service)
 
