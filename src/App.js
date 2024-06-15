import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/search/Search";
import BusinessOverview from "./pages/business_overview/BusinessOverview";
import Loading from "./pages/loading/Loading";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Search />} />
          <Route index path="/search" element={<Search />} />
          <Route
            index
            path="/business_overview"
            element={<BusinessOverview />}
          />
          <Route path="*" element={<Loading />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
