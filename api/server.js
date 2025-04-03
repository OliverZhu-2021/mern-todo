const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/todolist', {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

// Models
const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
	try {
    const todos = await Todo.find({ status: { $in: ['active', 'completed'] } });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})

	todo.save();

	res.json(todo);
});

// Soft delete by changing instance status
app.delete('/todo/delete/:id', async (req, res) => {
	try {
    const todo = await Todo.findById(req.params.id);
    todo.status = 'deleted';
    await todo.save();
    res.json({result: todo});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/todo/complete/:id', async (req, res) => {
	try {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.status = todo.complete ? 'completed' : 'active';
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

app.put('/todo/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.text = req.body.text;

	todo.save();

	res.json(todo);
});

app.get('/todos/history', async (req, res) => {
  try {
    const historyTodos = await Todo.find({ status: { $in: ['completed', 'deleted'] } });
    res.json(historyTodos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001);