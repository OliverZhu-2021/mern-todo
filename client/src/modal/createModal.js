const api_base = 'http://localhost:3001';

const CreateModal = ({ 
  popupActive, 
  setPopupActive,
  newTodo,
  setNewTodo,
  todos,
  setTodos
}) => {

  const addTodo = async () => {
		const data = await fetch(api_base + "/todo/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				text: newTodo
			})
		});

		const dataJson = await data.json();

		setTodos([...todos, dataJson]);

		setPopupActive(false);
		setNewTodo("");
	}

  return(
    <>
      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
          <div className="content">
            <h3>Add Task</h3>
            <input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
            <div className="button" onClick={addTodo}>Create Task</div>
          </div>
        </div>
      ) : ''
      }
    </>
  )
};

export default CreateModal;