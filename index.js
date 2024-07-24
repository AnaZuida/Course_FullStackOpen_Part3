const express = require('express')
const app = express()

app.use(express.json())

let persons = [
 {
  id: "1",
  name: "Arto Hellas",
  number: "040-123456"
 },
 {
  id: "2",
  name: "Ada Lovelace",
  number: "39-44-5323523"
 },
 {
  id: "3",
  name: "Dan Abramov",
  number: "12-43-234345"
 },
 {
  id: "4",
  name: "Mary Poppendieck",
  number: "39-23-6423122"
 }
]

const generateId = () => {
  /*const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)*/

  const minCeiled = Math.ceil(0)
  const maxFloored = Math.floor(1000)
  
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) 
}

const get_persons_total = () => {
  const persons_total = persons.length - 1
  return persons_total
}

app.get('/', (request, response) => {
  //response.send('<h1>Hello World!</h1>')
  response.status(404).end()
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/api/info', (request, response) => {
  response.send('<p>Phonebook has info for ' + get_persons_total() + ' people</p><p>' + new Date().toISOString() + '</p>')  
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  if (persons.map(n => n.name).includes(body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
