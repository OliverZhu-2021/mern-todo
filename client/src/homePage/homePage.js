import { useState, useEffect } from "react";
import Todos from "../todos/todos";
import CreateModal from "../modal/createModal";
import { Link } from "react-router-dom";
const api_base = 'http://localhost:3001';

const HomePage = () => {

  const [todos, setTodos] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
		GetTodos();
	}, []);

  const GetTodos = () => {
		fetch(api_base + '/todos')
			.then(res => res.json())
			.then(data => setTodos(data))
			.catch((err) => console.error("Error: ", err));
	}

  return(
    <div className="App">
      <div className="header">
        <h1>Welcome, Hao</h1>
        <Link 
          className="to-history-btn"
          to="/history"
        >
          History
        </Link>
      </div>
			<h4>Your tasks</h4>
			<Todos todos={todos} setTodos={setTodos} />

			<div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

			<CreateModal 
				popupActive={popupActive}
				setPopupActive={setPopupActive}
				newTodo={newTodo}
				setNewTodo={setNewTodo}
				todos={todos}
				setTodos={setTodos}
			/>
		</div>
  );
};

export default HomePage;