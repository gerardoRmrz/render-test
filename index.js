const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());

let agenda = [
  {
    "id": 1,
    "name": "Aato Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-532523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423422"
  }
]

app.get('/api/persons', (request, response) => {
  response.json( agenda )
})

app.get('/info', (request, response) => {
  const length = agenda.length;
  const date = new Date();
  const dateStr = `<br><div>${date.toString()}</div>`
  response.send(`<div>Phonebook has info for ${length} people</div> ${dateStr}`);

})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = agenda.find( item => item.id === id )

  if (person){
    response.json( person );
  }else{
    response.status(404).end();
  }

})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  agenda = agenda.filter( item => item.id !== id );

  response.status(200).end();
})

const generate_id =()=>{
  const maxId = agenda.length >0
        ? Math.max(...agenda.map( item => item.id ))
        : 1 ;
  const id = Math.floor(maxId +1 + (1000-maxId)*Math.random());
  return id
}

app.post( '/api/persons', (request, response)=>{
  const body = request.body;
  console.log(body.name)
  if (! (body.name && body.number )){
    return response.status(400).json(
      {
        error: 'content missing'
      }
    )
  }

  if ( agenda.find( person => person.name === body.name ) ){
    return response.status(400).json(
      {
        error: 'name must be unique'
      }
    )
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generate_id()
  }

  agenda = agenda.concat(person);

  response.json(agenda)
}) 


const PORT = 3001;
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
});
