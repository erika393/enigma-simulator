import { useState } from "react";
import "./App.css";
import Keyboard from "./components/Keyboard";
import Lampboard from "./components/Lampboard";
import Plugboard from "./components/Plugboard";
import Rotors from "./components/Rotors";
import {
  list_alphabet,
  map_rotor1,
  map_rotor2,
  map_rotor3,
  reflector,
} from "./static_configs";
import { get_inverse_dict } from "./functions";

function App() {
  const alphabet = list_alphabet;
  const [initoffsetRotor1, setinitOffsetRotor1] = useState(0);
  const [initoffsetRotor2, setinitOffsetRotor2] = useState(0);
  const [initoffsetRotor3, setinitOffsetRotor3] = useState(0);

  const [offsetRotor1, setOffsetRotor1] = useState(0);
  const [offsetRotor2, setOffsetRotor2] = useState(0);
  const [offsetRotor3, setOffsetRotor3] = useState(0);
  const [plugboardGroups, setplugboardGroups] = useState({});
  const [plugboardGroupsInverse, setplugboardGroupsInverse] = useState({});
  const [mapLetter, setMapLetter] = useState("");
  const [textedWord, setTextedWord] = useState("");
  const [word, setWord] = useState("");
  const [oldWord, setOldWord] = useState("-");

  const rotor1 = map_rotor1;
  const rotor2 = map_rotor2;
  const rotor3 = map_rotor3;
  const rotor1_inverse = get_inverse_dict(map_rotor1);
  const rotor2_inverse = get_inverse_dict(map_rotor2);
  const rotor3_inverse = get_inverse_dict(map_rotor3);

  const handleEnigma = (letter) => {
    setTextedWord(textedWord + letter);
    let offset1 = offsetRotor1;
    let offset2 = offsetRotor2;
    let offset3 = offsetRotor3;

    let index_start = alphabet.indexOf(letter);

    if (index_start in plugboardGroups) {
      index_start = plugboardGroups[index_start];
    }
    offset1 = (offset1 + 1) % 26;
    if (offset1 == 0) {
      offset2 = (offset2 + 1) % 26;
      if (offset2 == 0) offset3 = (offset3 + 1) % 26;
    }

    let index_letter_offset = (index_start + offset1) % 26;
    let index_letter_map = rotor1[index_letter_offset];

    index_letter_offset = (index_letter_map + offset2) % 26;
    index_letter_map = rotor2[index_letter_offset];

    index_letter_offset = (index_letter_map + offset3) % 26;
    index_letter_map = rotor3[index_letter_offset];

    let map_reflector = reflector[index_letter_map];

    index_letter_offset = (map_reflector - offset3 + 26) % 26;
    index_letter_map = rotor3_inverse[index_letter_offset];

    index_letter_offset = (index_letter_map - offset2 + 26) % 26;
    index_letter_map = rotor2_inverse[index_letter_offset];

    index_letter_offset = (index_letter_map - offset1 + 26) % 26;
    index_letter_map = rotor1_inverse[index_letter_offset];

    if (index_letter_map in plugboardGroupsInverse) {
      index_letter_map = plugboardGroupsInverse[index_letter_map];
    }

    setMapLetter(alphabet[index_letter_map]);
    setWord(word + alphabet[index_letter_map]);
    setOffsetRotor1(offset1);
    setOffsetRotor2(offset2);
    setOffsetRotor3(offset3);
  };

  const getPlugboardGroups = (groups) => {
    resetEnigma();
    setplugboardGroups(groups);
    setplugboardGroupsInverse(get_inverse_dict(groups));
  };

  const getInitOffsetRotors = (offset1, offset2, offset3) => {
    setinitOffsetRotor1(offset1);
    setinitOffsetRotor2(offset2);
    setinitOffsetRotor3(offset3);

    setOffsetRotor1(offset1);
    setOffsetRotor2(offset2);
    setOffsetRotor3(offset3);
    setOldWord(word ?? "-");
    setWord("");
    setTextedWord("");
  };

  const resetEnigma = () => {
    setOffsetRotor1(initoffsetRotor1);
    setOffsetRotor2(initoffsetRotor2);
    setOffsetRotor3(initoffsetRotor3);
    setOldWord(word ?? "-");
    setWord("");
    setTextedWord("");
  };

  return (
    <div className="App">
      <div className="enigma-machine m-auto">
        <h3 className="text-center bg-primary text-white py-2 mb-0">
          Simulador - Máquina Enigma de 3 Rotores
        </h3>
        <div className="row container m-auto">
          <div className="col pe-lg-4">
            <div className="m-auto" style={{ maxWidth: "600px" }}>
              <div>
                <Lampboard mapLetter={mapLetter} />
              </div>
              {/* {word} */}
              <div className="mt-3">
                <label className="form-label">Texto cifrado/decifrado:</label>
                <div className="row m-0">
                  <div className="col p-0">
                    <input
                      className="form-control"
                      disabled
                      value={word}
                      placeholder="Nenhum texto cifrado/decifrado"
                    />
                  </div>
                  <div className="col-auto p-0">
                    <button className="btn btn-secondary" onClick={resetEnigma}>
                      Limpar
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <i>
                      Texto anterior: <b>{oldWord}</b>
                    </i>
                  </div>
                  <div className="col-12 col-lg-6">
                    <i>
                      Texto digitado: <b>{textedWord}</b>
                    </i>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Keyboard pressKey={(letter) => handleEnigma(letter)} />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-2 mt-3 mt-lg-auto m-auto">
            <div>
              <Rotors
                offsetsRotors={(off1, off2, off3) =>
                  getInitOffsetRotors(off1, off2, off3)
                }
                moveOffsetRotor1={offsetRotor1}
                moveOffsetRotor2={offsetRotor2}
                moveOffsetRotor3={offsetRotor3}
              />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Plugboard groupsPlugboard={(groups) => getPlugboardGroups(groups)} />
        </div>
      </div>
      <footer className="bg-secondary text-white text-center py-2 mt-4">
        <p className="mb-0"><i>Trabalho desenvolvido para Segurança da Computação - Erika R., João P., João V. | UFSC - 2025/1</i></p>
      </footer>
    </div>
  );
}

export default App;
