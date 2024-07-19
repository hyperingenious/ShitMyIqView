import { useEffect, useState } from "react"
import { getData } from "../supabase"
import Cards from "./Cards";

function App() {
  const [dataStatus, setDataStatus] = useState('idle');
  const [data, setData] = useState(null);

  useEffect(() => {
    getData(setData, setDataStatus);
  }, [])

  return (

    <div>
      {dataStatus == "loading" && <h1>So your data is loading</h1>}
      {dataStatus == 'error' && <h1>There is a error guys</h1>}
      {dataStatus == 'success' && <Cards data={data} />}
    </div>
  )
}

export default App;