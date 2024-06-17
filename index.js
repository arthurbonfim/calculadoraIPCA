import express from 'express';
import { filterByYear, returnById, returnFluctuation, returnHistory } from './service/service.js';
const app = express();

app.get('/historicoIPCA', (req, res) => {
    let year = parseInt(req.query.year);
    if(!(year)){
        res.json(returnHistory());
    }else if(year < 2015 || year > 2023){
        res.status(404).send({"err":"No history found for the specific element"});
    }else{
        res.json(filterByYear(year));
    }
});

app.get('/historicoIPCA/calculo', (req, res) => {
    let value = parseInt(req.query.value);
    let initialMonth = parseInt(req.query.initialMonth);
    let initialYear = parseInt(req.query.initialYear);
    let finalMonth = parseInt(req.query.finalMonth);
    let finalYear = parseInt(req.query.finalYear);
    let result = returnFluctuation(value, initialMonth, initialYear,
    finalMonth, finalYear);
    res.json(result);

    
})

app.get('/historicoIPCA/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let i = returnById(id);
    if(i){
        res.json(returnById(id));
    }else{
        res.status(404).send({"err":"Element not found"});
    }
});


app.listen(8080, ()=>{
    console.log('Server started on port 8080');
})