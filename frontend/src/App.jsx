import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import TodoApp from "./components/TodoApp";

function App() {
    return (
        <div>
            <Header />
            <TodoApp />
            <Footer />
        </div>
    );
}

export default App;
