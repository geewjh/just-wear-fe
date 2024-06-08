import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

export default function AuthPage({ setUser }) {
  return (
    <div>
      <main className="container flex mx-auto h-[90vh] items-center justify-center">
        <SignUpForm setUser={setUser} />
        <LoginForm setUser={setUser} />
      </main>
    </div>
  );
}
