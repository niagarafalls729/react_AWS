import   React from 'react'
import Modalpop from "../component/ModalCRUD";
import { useState, useEffect, useId, useRef } from "react";
export default function StudyHistory() {

  const [createdBTN, setCreatedBTN ] = useState(false);

  return (
    <div>
        <button onClick={()=>createdBTN ? setCreatedBTN(false) : setCreatedBTN(true) }> 새글 등록 </button>
        {createdBTN &&
          <Modalpop></Modalpop>
        }
    </div>
  )
}
