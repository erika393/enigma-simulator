import { useEffect, useState } from "react";
import ModalRotors from "../ModalRotors";
import { list_alphabet } from "../../static_configs";

export default function Rotors({offsetsRotors, moveOffsetRotor1, moveOffsetRotor2, moveOffsetRotor3}) {
  const [offset_rotor1, setoffset_rotor1] = useState(0);
  const [offset_rotor2, setoffset_rotor2] = useState(0);
  const [offset_rotor3, setoffset_rotor3] = useState(0);

  useEffect(() => {
    offsetsRotors(offset_rotor1, offset_rotor2, offset_rotor3)
  }, [offset_rotor1, offset_rotor2, offset_rotor3])

  return (
    <div>
      <div>
        <div className="d-flex gap-3 justify-content-center text-center">
          <div className="">
            <h6>Rotor 1</h6>
            {Array.from({ length: 6 }).map((_, i) => {
              return (
                <div className="bg-dark text-white border border-secondary px-4" style={{width: '70px'}}>
                  {(parseInt(i) + parseInt(moveOffsetRotor1)) % 26}
                  {/* {list_alphabet[(parseInt(i) + parseInt(moveOffsetRotor1)) % 26]} */}
                </div>
              );
            })}
          </div>
          <div className="">
            <h6>Rotor 2</h6>
            {Array.from({ length: 6 }).map((_, i) => {
              return (
                <div className="bg-dark text-white border border-secondary text-center px-4" style={{width: '70px'}}>
                  {(parseInt(i) + parseInt(moveOffsetRotor2)) % 26}
                </div>
              );
            })}
          </div>
          <div className="">
            <h6>Rotor 3</h6>
            {Array.from({ length: 6 }).map((_, i) => {
              return (
                <div className="bg-dark text-white border border-secondary text-center px-4" style={{width: '70px'}}>
                  {(parseInt(i) + parseInt(moveOffsetRotor3)) % 26}
                </div>
              );
            })}
          </div>
        </div>
        <div className="text-center">
          <button
            className="bg-secondary text-white mt-3"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Configurar
          </button>
        </div>
      </div>
      <ModalRotors
        offset1={offset_rotor1}
        offset2={offset_rotor2}
        offset3={offset_rotor3}
        onChangeOffsetRotor1={(offset) => setoffset_rotor1(offset)}
        onChangeOffsetRotor2={(offset) => setoffset_rotor2(offset)}
        onChangeOffsetRotor3={(offset) => setoffset_rotor3(offset)}
      />
    </div>
  );
}
