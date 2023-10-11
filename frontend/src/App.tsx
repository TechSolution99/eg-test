import { useState } from "react";
import Index from "./component/Index";

function App() {
  const [isLoggedIn, setLoggedIn ] = useState(false);

  return (
    <>
      <Index isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
    </>

  );
}

export default App;