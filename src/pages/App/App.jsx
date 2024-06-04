import { useState } from "react";
import AuthPage from "../AuthPage/AuthPage";
import DummyPage from "../DummyPage/DummyPage";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <main className="bg-neutral-content text-4xl font-bold">
        {user ? <DummyPage /> : <AuthPage />}
      </main>
    </>
  );
}

export default App;
