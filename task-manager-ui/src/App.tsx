import { Route, Routes } from "react-router-dom"
import SignupForm from "./pages/auth/components/signup-form"
import SigninForm from "./pages/auth/components/singin-form"
import Me from "./pages/auth/components/me"

function App() {

  return (
    <Routes>
      <Route path="/" element={<SignupForm />} />
      <Route path="/auth/signup" element={<SignupForm />} />
      <Route path="/auth/login" element={<SigninForm />} />
      <Route path="/dashboard" element={<Me />} />
    </Routes>
  )
}

export default App
