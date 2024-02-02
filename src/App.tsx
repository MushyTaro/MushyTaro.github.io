import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./components/mainPage.tsx";
function App() {
	return <MainPage />;
}

ReactDOM.createRoot(document.getElementById("content")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

export default App;
