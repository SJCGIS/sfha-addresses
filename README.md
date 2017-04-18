# SFHA Mailing Address List

The County received a list of parcels and situs addresses from FEMA to notify
for possible inclusion in Special Flood Hazard Areas. However, the list from
FEMA only included situs addresses, not mailing addresses.

This [Node.js](http://nodejs.org) application adds the mailing information to
each row in the CSV file by requesting data from the County GIS Tax Parcel Rest
API.

## Usage

You must have [Node.js](http://nodejs.org) installed. Then download or `git
clone` the repository and run `npm install` within the directory to install the
dependencies.

The example below runs the program and outputs it to a new CSV file.
``` javascript
node index.js > list.csv
```
