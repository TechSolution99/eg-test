import Home from "./Home/Home";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import Header from "./Navbar/Header";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import { useEffect } from "react";

export default function Index(props) {
  const { isLoggedIn, setLoggedIn } = props
  useEffect(() => {

  }, [])
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      <BrowserRouter>
        {isLoggedIn ?
          <Routes>
            <Route path="/" element={<Home setLoggedIn={setLoggedIn}/>}>
            </Route>
          </Routes>
          :
          <Routes>
            <Route path="/" element={<SignIn setLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />}>
            </Route>
            <Route path="/signup" element={<SignUp setLoggedIn={setLoggedIn} />}>
            </Route>
          </Routes>
        }
      </BrowserRouter>
    </div>
  )
}