import { BrowserRouter, Route, Routes } from "react-router-dom"
import Niveis from "./pages/Niveis"
import Desenvolvedores from "./pages/Desenvolvedores"

export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Desenvolvedores/>}
                />
                <Route
                    path="/niveis"
                    element={<Niveis/>}
                />
            </Routes>
        </BrowserRouter>
    )
}