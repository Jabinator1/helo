import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import Form from './components/Form/Form';
import Nav from './components/Nav/Nav';
import Post from './components/Post/Post';

const App = () => {
  const location = useLocation()
  return (
    <div>
      { location.pathname === "/" ? null : <Nav />}
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/post/:postid" component={Post} />
        <Route path="/new" component={Form} />
      </Switch>
    </div>
  );
}

export default App;
