// setup api config
const express = require("express");
const PORT = 8080;
const app = express();

// create api instance
app.use(express.json())
app.listen(PORT, () =>{
    console.log(`API is live on http://localhost:${PORT}`)
})


app.get('/tshirt', (req, res) => {
    console.log(`tshirt GET api called from ${req.hostname}`)
    res.status(200).send({
        color: 'red',
        size: 'large'
    })
})


app.post('/tshirt/:id', (req, res) => {
    console.log(`tshirt POST api called from ${req.hostnmae}`)
    const id = req.params.id
    const data = req.body.json
    const size = req.body.size

    if(!size){
        res.status(418).send({message: "missing size"})
    }

    res.status(200).send({
        message: `your shirt with id ${id} and size ${size} was created!`
    })
})


