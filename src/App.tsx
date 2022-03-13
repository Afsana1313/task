import ListContainer from './components/ListContainer';
//import './App.scss';
import { createContext, useState } from 'react' 
import { ListType } from './components/type';

export const ThemeContext = createContext<any>(null);
function App() {
  const [list, setList] = useState<ListType[] | null>(null)
  const value = {
    list,
    setList
  }
  return (
    <ThemeContext.Provider value={value}>
      <div className="App">
         <h2>KanBan List</h2>
          <ListContainer/>
        </div>
    </ThemeContext.Provider>
  );
}

export default App;
