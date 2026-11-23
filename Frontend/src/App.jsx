
import AppRoutes from "./AppRoutes"
import "./style.scss"
import { AuthProvider } from "./feature/auth/auth.context"

const App = () => {
  return (
 <AuthProvider>
   <AppRoutes/>
 </AuthProvider>
   
  )
}

export default App