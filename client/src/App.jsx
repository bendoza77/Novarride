import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./components/FallBack/Loading";

// LAZY IMPORTS (everything loads ONLY when needed)
const Home = lazy(() => import("./pages/Home"));
const Nav = lazy(() => import("./components/Nav"));
const Footer = lazy(() => import("./components/Footer"));
const About = lazy(() => import("./pages/About"));
const Cars = lazy(() => import("./pages/Cars"));
const Car = lazy(() => import("./pages/Car"));
const Contact = lazy(() => import("./pages/Contact"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const Authorization = lazy(() => import("./pages/Authorization"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/profile"));

const App = () => {

    return (
        <>
        <Suspense fallback={<Loading />}>
            <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/cars" element={<Cars />} />
                    <Route path="/car" element={<Car />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/service" element={<ServicePage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/authorization" element={<Authorization />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            <Footer />
        </Suspense>
        </>
    );

  


}

export default App
