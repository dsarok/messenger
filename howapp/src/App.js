import useLocalStorage from "./components/Uselocalstorage";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { Contactcontext } from "./components/Contactcontext";
import Conversationprovider from "./components/Conversationcontext";
import  Socketprovider  from "./components/Socketprovider";

function App() {
  const [id, setId] = useLocalStorage('howapp');
  const dashboard=(
    <Socketprovider id={id}>
      <Contactcontext>
    <Conversationprovider id={id}>
      <Dashboard id={id}/>
    </Conversationprovider>
    </Contactcontext>
    </Socketprovider>
    )
  return (
   id?dashboard:<Login onSubmitId={setId}/>
   );
}

export default App;
