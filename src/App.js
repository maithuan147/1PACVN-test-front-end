import './App.css';
import SearchData from "./Components/SearchData";
import 'react-toastify/dist/ReactToastify.css';
import RenderData from './Components/RenderData';
import { useState } from 'react';
import InfoData from './Components/InfoData';

function App() {
  const [dataApi, setDataApi] = useState();
  const [tabs, setTabs] = useState("all");
  return (
    <div className="App">
      <SearchData setDataApi={setDataApi} />
      <InfoData  {...{ dataApi, setDataApi, tabs }} />
      {
        dataApi && <div className="tabs">
          <button className={tabs === "all" ? "active" : ""} onClick={() => setTabs("all")}>All</button>
          <button className={tabs === "liked" ? "active" : ""} onClick={() => setTabs("liked")}>Liked</button>
          <button className={tabs === "removed" ? "active" : ""} onClick={() => setTabs("removed")}>Removed</button>
        </div>
      }

      <RenderData {...{ dataApi, setDataApi, tabs, setTabs }} />
    </div>
  );
}

export default App;
