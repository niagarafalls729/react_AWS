import React, { useRef } from 'react';
import Draft from '../editor/index'



export default function StudyHistory() {

  const childValueRef = useRef(null);

  const handleButtonClick = () => {
    if (childValueRef.current) {
      const childValue = childValueRef.current.getValue();
      alert('자식 컴포넌트의 값: ' + childValue);
    }
  };

  return (
    <div>StudyHistory
      <Draft  ref={childValueRef} />
      <button onClick={handleButtonClick}>버튼</button> 
    </div>
  )
}
