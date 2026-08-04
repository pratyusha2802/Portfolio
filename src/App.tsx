import { Route, Routes } from "react-router-dom";
import BackToTop from "./components/BackToTop";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import WorkDetail from "./pages/WorkDetail";

function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<WorkDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <BackToTop />
    </>
  );
}

export default App;
