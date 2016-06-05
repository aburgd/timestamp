var express = require("express")
var path = require("path")
var moment = require("moment")

var app = express()
var port = process.env.PORT || 3500

app.set('port', port)
app.use(express.static(path.resolve(__dirname, 'client')))
app.get('/:timestamp', function(req, res) {
    var time = moment(req.params.timestamp, 'MMMM DD, YYYY', true)
    if (!time.isValid()) time = moment.unix(req.params.timestamp)
    if (!time.isValid()) {
      res.json({
        'humanreadable': null,
        'unix' : null
      })
    }
    
    res.json({
      'humanreadable': time.format('MMMM DD, YYYY')
    , 'unix': time.format('X')
    })
})

app.listen(port, () => {
  console.log("Server is listening on ${port}")
})