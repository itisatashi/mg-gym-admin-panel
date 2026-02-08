import LoginForm from "../features/authentication/LoginForm";

function Login() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-accent">💪 MG GYM</h1>
          <p className="text-text-muted mt-2">Admin Panel</p>
        </div>
        <div className="card p-8">
          <h2 className="text-xl font-semibold mb-6">Welcome Back</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
