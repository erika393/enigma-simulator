import React, { useState } from "react";

export default function ModalRotors({
  offset1,
  offset2,
  offset3,
  onChangeOffsetRotor1,
  onChangeOffsetRotor2,
  onChangeOffsetRotor3,
}) {
  const [offset_rotor1, setoffset_rotor1] = useState(offset1);
  const [offset_rotor2, setoffset_rotor2] = useState(offset2);
  const [offset_rotor3, setoffset_rotor3] = useState(offset3);

  const handleSaveChanges = () => {
    onChangeOffsetRotor1(offset_rotor1);
    onChangeOffsetRotor2(offset_rotor2);
    onChangeOffsetRotor3(offset_rotor3);
  };

  return (
    <>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Configurar posição inicial dos rotores
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="row">
                <div className="col">
                  <div>
                    <label className="form-label">Rotor 1</label>
                    <select
                      className="form-select"
                      value={offset_rotor1}
                      onChange={(e) => setoffset_rotor1(parseInt(e.target.value))}
                    >
                      {Array.from({ length: 26 }).map((_, i) => {
                        return <option value={i}>{i}</option>;
                      })}
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div>
                    <label className="form-label">Rotor 2</label>
                    <select
                      className="form-select"
                      value={offset_rotor2}
                      onChange={(e) => setoffset_rotor2(parseInt(e.target.value))}
                    >
                      {Array.from({ length: 26 }).map((_, i) => {
                        return <option value={i}>{i}</option>;
                      })}
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div>
                    <label className="form-label">Rotor 3</label>
                    <select
                      className="form-select"
                      value={offset_rotor3}
                      onChange={(e) => setoffset_rotor3(parseInt(e.target.value))}
                    >
                      {Array.from({ length: 26 }).map((_, i) => {
                        return <option value={i}>{i}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fechar
              </button>
              <button
                type="button"
                data-bs-dismiss="modal"
                class="btn btn-primary"
                onClick={handleSaveChanges}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
