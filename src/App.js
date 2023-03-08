import './App.css';
import Projects from './components/Projects';
import 'bootstrap/dist/css/bootstrap.min.css';

// App component calling the main Projects component
function App() {
  return (
    <div className="App">
      <Projects/>
    </div>
  );
}

export default App;
