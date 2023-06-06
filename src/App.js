import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './component/Login'
import Home from './component/Home'
import Alljobs from './component/Alljobs'
import JobDetails from './component/JobDetails'
import NotFound from './component/NotFound'
import ProtectedRoute from './component/ProtectedRoute'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Alljobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </div>
)

export default App
