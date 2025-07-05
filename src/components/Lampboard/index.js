import { useEffect } from "react";

export default function Lampboard({mapLetter}) {
  let alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  useEffect(() => {
    let btnLetterHTML = document.querySelector('.btn-lamp-' + mapLetter)
    if(btnLetterHTML){
      btnLetterHTML.classList.add('active')
      setTimeout(() => {
        btnLetterHTML.classList.remove('active')
      }, 3000);
    }
  }, [mapLetter])

  return (
    <div className="text-center">
      <h4 className="mt-4 mb-0">Lampboard</h4>
      <p className="mb-3">As lâmpadas irão ligar das letras referentes cifradas/decifradas</p>
      <div
        className="d-flex gap-2 justify-content-center"
        style={{ flexWrap: "wrap" }}
      >
        {alphabet.map((item) => {
          return (
            <button
              type="button"
              className={`btn btn-lamp btn-lamp-${item} border border-secondary rounded-circle fw-bold text-center`}
              style={{ width: "34px", height: "34px", fontSize: '12px', cursor: 'text' }}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
