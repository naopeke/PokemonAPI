// server side

const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = 5000;

app.get('/index/:id', async (req, res) =>{
    const id = req.params.id;
        
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
     .then(response =>{
        let data = response.data;
        if (!data.error){
            let pokemon = {id:data.id, name:data.name, type:data.types[0].type.name, image:data.sprites.front_default, effect_entries:data.effect_entries};
            res.json(pokemon);
        } else {
            console.error('error in fetching');
            // error to the client
            res.status(500).send('Fetching error');
     }
    })
    .catch(error =>{
        console.error(error);
    })
});

    

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
});