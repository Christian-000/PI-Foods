import './App.css';
import {Switch, Route} from 'react-router-dom';
import LandingPage from './Components/LandingPage'
import Home from './Components/Home';
import Detail from './Components/Detail'
import RecipeCreation from './Components/RecipeCreation';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path = '/'><LandingPage  /></Route>
        <Route exact path = '/home'><Home /></Route>
        <Route exact path="/detail/:id"><Detail/></Route>
        <Route exact path="/recipe"><RecipeCreation/></Route>


      </Switch>
    </div>
  );
}

export default App;
