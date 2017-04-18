var read = require('csv-parser')
var write = require('csv-write-stream')
var through = require('through2')
var fs = require('fs')
var request = require('request')
var path = require('path')
/**
Read the contents of the CSV file and run it through a transform function
*/
fs.createReadStream(path.join(__dirname, './Buildings_Preliminary_SFHA.csv')) // Read contents of file
  .pipe(read()) // parse as csv
  .pipe(through.obj(transform)) // send each csv row through the transform function
  .pipe(write()) // write back out as a csv
  .pipe(process.stdout) // send the output to the console

/**
This transform requests the mailing address fields from the County's tax parcel rest api and
adds them to the row before sending it back to the pipeline. Missing addresses or data are left
blank.
*/
function transform (chunk, enc, cb) {
  var self = this
  request({
    url: 'https://sjcgis.org/arcgis/rest/services/Polaris/Parcels/MapServer/1/query',
    qs: { where: `PIN='${chunk.PIN}'`,
          outFields: 'Owner, Address_1, Address_2, Address_3, City, State, Zip',
          f: 'json'
        },
    json: true
  }, function (err, res, body) {
    if (err) cb(err)
    var attrs = {}
    if (body.features.length) {
      attrs = body.features[0].attributes || {}
    }
    Object.keys(attrs).forEach(function (k) {
      var header = 'Mail_' + k
      chunk[header] = attrs[k]
    })
    self.push(chunk)
    cb()
  })
}
