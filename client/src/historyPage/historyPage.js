import { useEffect, useState } from "react";
const api_base = 'http://localhost:3001';

const HistoryPage = () => {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory();
  }, [])

  const getHistory = () => {
    fetch(api_base + '/todos/history')
      .then(res => res.json())
      .then(data => setHistory(data))
      .catch((err) => console.error("Error: ", err));
  };

  return(
    <div className="history-main">
      <div className="todos">
        {history.length > 0 ? history.map(history => (
          <div className={"todo"} key={history._id} >
            <div 
              className='checkbox-text-container'
            >
              <div className="text">{history.text}</div>
            </div>
          </div>
        )) : (
          <p>You currently have no history</p>
        )}
		  </div>
    </div>
  );
};

export default HistoryPage;