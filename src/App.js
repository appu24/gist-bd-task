import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Gist from './components/Gist';
import GistView from './components/GistView';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Gist}></Route>
        <Route exact path='/view/:gistID' component={GistView}></Route>
      </Switch>
    </Router>
  );
};

export default App;
