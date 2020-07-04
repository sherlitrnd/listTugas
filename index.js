var express = require("express")
var bodyParser = require("body-parser")
var tugas = require("./routes/tugas")
var cors = require("cors")

var port = 3333

var app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use("/api", tugas)


app.listen(port,function(){
    console.log('server berjalan pada port '+ port);
    
})