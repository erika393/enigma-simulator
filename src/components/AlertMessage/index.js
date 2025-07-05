import { useEffect, useState } from "react";

export default function AlertMessage({message, status = 'success', showAlert}) {

    return (
    <>
      {showAlert && <div class={`alert alert-${status} position-fixed`} role="alert">
        {message}
      </div>}
    </>
  );
}
