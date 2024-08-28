import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import components
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
// import pages
import BookmarkWord from "./pages/word/BookmarkWord";
import BookmarkOWS from "./pages/ows/BookmarkOWS";
import BookmarkIdiom from "./pages/idiom/BookmarkIdiom";
import Word from "./pages/word/Word";
import ReviseWord from "./pages/revise/ReviseWord";
import ReviseOWS from "./pages/revise/ReviseOWS";
import ReviseIdiom from "./pages/revise/ReviseIdiom";
import OWS from "./pages/ows/OWS";
import Idiom from "./pages/idiom/Idiom";
import Spelling from "./pages/spelling/Spelling";
import Common from "./pages/common/Common";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// import css files
import "./App.css";
import "./css/Auth.css";
import "./css/Modal.css";
import "./css/Word.css";
import "./css/Revise.css";
import { AuthContext } from "./context/AuthContext";

const App = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="App">
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Word />} />
                    <Route path="/bookmark-word" element={<BookmarkWord />} />
                    <Route path="/bookmark-ows" element={<BookmarkOWS />} />
                    <Route path="/bookmark-idiom" element={<BookmarkIdiom />} />
                    <Route path="/revise-word" element={<ReviseWord />} />
                    <Route path="/revise-ows" element={<ReviseOWS />} />
                    <Route path="/revise-idiom" element={<ReviseIdiom />} />
                    <Route path="/word" element={<Word />} />
                    <Route path="/ows" element={<OWS />} />
                    <Route path="/idioms" element={<Idiom />} />
                    <Route path="/spellings" element={<Spelling />} />
                    <Route path="/common" element={<Common />} />
                    <Route path="/login" element={user ? <Navigate to="/bookmark" /> : <Login />} />
                    <Route
                        path="/register"
                        element={user ? <Navigate to="/bookmark" /> : <Register />}
                    />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default App;
