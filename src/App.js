import { Route, Switch, useLocation } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import Form from './components/Form/Form';
import Nav from './components/Nav/Nav';
import PostPage from './components/Post/PostPage';
import './App.css';
import './components/Auth/Auth.css'
import './components/Nav/Nav.css'
import './components/Dashboard/Dashboard.css'
import './components/Post/Post.css'
import './components/Post/PostPage.css'
import './components/Form/Form.css'

const App = () => {
  const location = useLocation()
  return (
    <div className="app">
      { location.pathname === "/" ? null : <Nav />}
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/post/:postid" component={PostPage} />
        <Route path="/new" component={Form} />
      </Switch>
    </div>
  );
}

export default App
