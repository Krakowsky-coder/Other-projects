import { AdjacencyMatrix } from "./AdjacencyMatrix";
import { IncidenceMatrix } from "./IncidenceMatrix";
import { MainPage } from "./components/main-page/MainPage";

function App() {
  return (
    <div className="App">
      <AdjacencyMatrix x={5} y={5} />
      <IncidenceMatrix x={6} y={5} />
      <MainPage />
    </div>
  );
}

export default App;
