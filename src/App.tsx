import { BrowserRouter, Route, Switch } from "react-router-dom"

import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"
import { Room } from "./pages/Room"
import { AdminRoom } from "./pages/AdminRoom"

import { AuthContextProvider } from "./contexts/AuthContext"

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        {/* O switch não permite duas rotas ao mesmo tempo */}
        <Switch>
          {/* O exact diz pro Route que precisa ser exatamente aquele path */}
          <Route path="/" exact component={Home}></Route>
          <Route path="/rooms/new" component={NewRoom}></Route>
          <Route path="/rooms/:id" component={Room}></Route>

          <Route path="/admin/rooms/:id" component={AdminRoom}></Route>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
