const express = require("express")
const request = require("request")

let app = express();
let port = process.env.PORT || 8734;

// static file path
app.use(express.static(__dirname+'/public'))
// html file path
app.set('views','./src/views')
// view engine
app.set('view engine', 'ejs')

app.get('/weather',(req,res) => {
    let city = req.query.city?req.query.city:'Shimla'
    let url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`
    //calling api
    request(url,(err,apiResponse) => {
        if(err) throw err;
        const output = JSON.parse(apiResponse.body)
        res.render('index',{title:'Weather App',result:output})
    })
})


app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})