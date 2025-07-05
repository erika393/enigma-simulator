import { list_alphabet } from "../../static_configs";

export default function Keyboard({pressKey}) {
  const alphabet = list_alphabet
  const handlePressKey = (letter) => {
    pressKey(letter)
  }

  return (
    <div className="text-center">
      <h4 className="mt-4 mb-0">Keyboard</h4>
      <p className="mb-3">
        <i>Digite as letras à serem cifradas/decifradas.</i>
      </p>
      <div
        className="d-flex gap-2 justify-content-center"
        style={{ flexWrap: "wrap" }}
      >
        {alphabet.map((letter) => {
          return (
            <button
              type="button"
              className="btn btn-keyboard btn-primary rounded-circle fw-bold"
              onClick={() => handlePressKey(letter)}
              style={{ width: "50px", height: "50px" }}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
