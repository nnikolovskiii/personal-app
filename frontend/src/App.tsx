import { Routes, Route } from 'react-router-dom';
import './App.css';
import BlogPostsPage from "./pages/BlogPostsPage.tsx";
import AboutMePage from "./pages/AboutMePage.tsx";

export default function App() {
    return (
        <div className="App">
            <Routes>
                {/* Route for the About Me page at the root path */}
                <Route path="/" element={<AboutMePage />} />

                {/* Route for the Blog Posts page at /blogs */}
                <Route path="/blogs" element={<BlogPostsPage />} />
            </Routes>
        </div>
    );
}