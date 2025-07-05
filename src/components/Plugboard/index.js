import { useEffect, useState } from "react";
import randomColor from "randomcolor";
import { list_alphabet } from "../../static_configs";
import AlertMessage from "../AlertMessage";

export default function Plugboard({groupsPlugboard}) {
  let alphabet = list_alphabet
  // groups em index
  const [groups, setGroups] = useState({});
  const [from, setFrom] = useState(null);
  const [currentColor, setCurrentColor] = useState();
  const [usedColors, setUserColors] = useState([]);
  const [showAlert, setShowAlert] = useState(false)

  const getColor = () => {
    const color = randomColor();
    let isUsed = true;
    while (isUsed) {
      if (color in usedColors) {
        isUsed = true;
        color = randomColor();
      } else {
        isUsed = false;
      }
    }
    setUserColors((prevState) => ({...prevState, color}))
    return color;
  };

  const handleConnectGroup = (letter) => {
    const btnHTML = document.querySelector(".btn-plug-" + letter);
    if (!btnHTML) return;
    if (checkRules(letter)) return;
    const color = getColor();
    if (from) {
      btnHTML.style.backgroundColor = currentColor;
      // grupo completo de mapeamento
      setGroups((prevState) => ({ ...prevState, [alphabet.indexOf(from)]: alphabet.indexOf(letter) }));
      setFrom(null);
    } else {
      btnHTML.style.backgroundColor = color;
      setCurrentColor(color);
      setFrom(letter);
    }
  };

  const removeConnectGroup = (letterIndex) => {
    let toValue = groups[letterIndex];
    const btnFromHTML = document.querySelector(".btn-plug-" + alphabet[letterIndex]);
    const btnToHTML = document.querySelector(".btn-plug-" + alphabet[toValue]);

    if (btnFromHTML) btnFromHTML.style.backgroundColor = "white";
    if (btnToHTML) btnToHTML.style.backgroundColor = "white";

    setGroups((prev) => {
      const newGroup = { ...prev };
      delete newGroup[letterIndex];
      return newGroup;
    });
  };

  const checkInGroup = (letter) => {
    letter = alphabet.indexOf(letter)
    let isIncludes = false;
    Object.entries(groups).forEach(([key, value]) => {
      if (key == letter || value == letter) isIncludes = true;
    });
    return isIncludes;
  };

  const checkRules = (letter) => {
    if (checkInGroup(letter)) {
      alert("Letra já mapeada!");
      return true;
    }
    if (from == letter) {
      alert("Não pode mapear a mesma letra!");
      return true;
    }
    return false;
  };

  const handleSave = () => {
    groupsPlugboard(groups)
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 2000);
  }

  const handleReset = () => {
    setGroups({})
    groupsPlugboard({})
  }

  return (
    <div className="text-center mt-5 p-3 border border-secondary rounded-3 container m-auto" style={{backgroundColor: 'rgba(128,128,128,0.3)'}}>
        <h4 className="mb-0">Plugboard</h4>
        <p className="mb-2"><i>Clique no circulo embaixo das letras à serem mapeadas.</i></p>
      <div className="d-flex gap-4 flex-wrap justify-content-center text-center">
        {alphabet.map((item) => {
          return (
            <>
              <div>
                <div>{item}</div>
                <button
                  className={`btn btn-plug-${item} p-0 m-0 rounded-circle border border-dark`}
                  style={{ width: "15px", height: "15px", backgroundColor: 'white' }}
                  onClick={() => handleConnectGroup(item)}
                ></button>
              </div>
            </>
          );
        })}
      </div>
      <div className="text-center mt-3">
        <h6 className="mb-0">Grupos:</h6>
        <p className="mb-0">
          <i>Para remover um grupo é só clicar em cima do grupo.</i>
        </p>
        <div className="d-flex gap-3 justify-content-center mt-2">
          {Object.entries(groups).map(([key, value]) => {
            return (
              <>
                <button
                  className="btn btn-warning"
                  onClick={() => removeConnectGroup(key)}
                >
                  {alphabet[key]}:{alphabet[value]}
                </button>
              </>
            );
          })}
        </div>
      </div>
      <div className="gap-2 d-flex justify-content-center mt-2">
        <button className="btn btn-primary py-1" onClick={handleSave}>Salvar</button>
        <button className="btn btn-danger py-1" onClick={handleReset}>Resetar</button>
      </div>
      <AlertMessage message="Plugboard configurado com sucesso!" status="success" showAlert={showAlert}/>
    </div>
  );
}
