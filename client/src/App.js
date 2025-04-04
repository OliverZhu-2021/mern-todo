import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from './homePage/homePage';
import HistoryPage from "./historyPage/historyPage";


function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<HomePage />} />
				<Route path="history" element={<HistoryPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
