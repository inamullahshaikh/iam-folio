import { Routes, Route } from "react-router-dom";
import PortfolioHome from "./pages/PortfolioHome";
import PortfolioProjectDetail from "./pages/PortfolioProjectDetail";

export default function App() {
  return (
    <Routes>
      <Route index element={<PortfolioHome />} />
      <Route path="projects/:slug" element={<PortfolioProjectDetail />} />
    </Routes>
  );
}
