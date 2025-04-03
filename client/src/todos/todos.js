const api_base = 'http://localhost:3001';

const Todos = ({ todos, setTodos }) => {

  const completeTodo = async id => {
		console.log("Complete todo")
		const data = await fetch(api_base + '/todo/complete/' + id);
		const dataJson = await data.json();
		setTodos(todos => todos.map(todo => {
			if (todo._id === dataJson._id) {
				todo.complete = dataJson.complete;
			}
			return todo;
		}));
	}

  const deleteTodo = async id => {
		console.log("Delete todo")
		const data = await fetch(api_base + '/todo/delete/' + id, { method: "DELETE" });
		const dataJson = await data.json()

		setTodos(todos => todos.filter(todo => todo._id !== dataJson.result._id));
	}

  return(
    <div className="todos">
				{todos.length > 0 ? todos.map(todo => (
					<div className={
						"todo" + (todo.complete ? " is-complete" : "")
					} key={todo._id} >
						<div 
							onClick={() => completeTodo(todo._id)}
							className='checkbox-text-container'
						>
							<div className="checkbox"></div>
							<div className="text">{todo.text}</div>
						</div>
						<div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
					</div>
				)) : (
					<p>You currently have no tasks</p>
				)}
		</div>
  )
};

export default Todos