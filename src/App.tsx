import ListContainer from "./components/ListContainer";
//import './App.scss';
import { createContext, useState } from "react";
import { CategoryType, ListType } from "./components/type";

export const ThemeContext = createContext<any>(null);
function App() {
  const [list, setList] = useState<ListType[] | null>(null);
  const [categoryList, setCategoryList] = useState<CategoryType[] | null>(null);
  const value = {
    list,
    setList,
    categoryList,
    setCategoryList,
  };
  return (
    <ThemeContext.Provider value={value}>
      <div className="App">
        <h2>Kanban Board</h2>
        <ListContainer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
