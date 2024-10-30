import { useState } from "react";
function DataView({ data }) {
  const [imageSrc, setImageSrc] = useState(null);
  const file = data.cv[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    setImageSrc(e.target.result); // Ustaw źródło obrazu w stanie
  };
  reader.readAsDataURL(file);
  return (
    <div id="dataView">
      <div>
        <p>Dane Osobowe:</p>
        <div>Imię: {data.name}</div>
        <div>Nazwisko: {data.surname}</div>
        <div>Email: {data.email}</div>
        <div>Tel.: {data.phone}</div>
      </div>
      <div>
        <p>Doświadczenie w programowaniu:</p>
        <ul>
          {data.programingExp.map(({ id, name, level }) => (
            <li key={id}>{`Technologia: ${name}/${level}`}</li>
          ))}
        </ul>
      </div>
      <div>
        <p>Preferencje kursu:</p>
        <div>Typ kursu: {data.courseType}</div>
        <p>Preferowane technologie:</p>
        <ul>
          {data.technologies.map((element, index) => (
            <li key={index}>{element}</li>
          ))}
        </ul>
      </div>
      <div>
        <p>Curriculum vitae:</p>
        <img src={imageSrc} alt="CV Image" style={{ maxWidth: "150px" }} />
      </div>
    </div>
  );
}

export default DataView;
