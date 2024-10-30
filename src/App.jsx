import { useState } from "react";
import FormProgramingSchool from "./components/FormProgramingSchool";
import DataView from "./components/DataView";

function App() {
  const [status, setStatus] = useState(false);
  const [data, setData] = useState(null);

  const handleData = (element) => {
    console.log(element);

    setData(element);
    setStatus(true);
  };

  return (
    <>
      {!status && <FormProgramingSchool handleData={handleData} />}
      {status && <DataView data={data} />}
    </>
  );
}

export default App;
