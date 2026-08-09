import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Day from "./pages/Day";
import PageTransition from "./components/PageTransition";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <PageTransition>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/day/12" element={<Day />} />
        </Routes>
      </PageTransition>
    </AppProvider>
  );
}

export default App;
