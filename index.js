const express = require('express');
const app = express();

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


const PORT = 3001;
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
});
