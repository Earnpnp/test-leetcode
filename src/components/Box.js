import React, { useState } from "react";

function Box() {
  const [input, setInput] = useState("");
  const [openBracket, setOpenBracket] = useState([]);
  const [closeBracket, setCloseBracket] = useState([]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length > 30) {
      alert("คุณใส่ข้อมูลเกิน");
      setInput("");
      setOpenBracket([]);
      setCloseBracket([]);
      return;
    }

    setInput(inputValue);
    const openBrackets = [];
    const closeBrackets = [];

    for (let i = 0; i < inputValue.length; i++) {
      if (inputValue[i] === "(") {
        openBrackets.push(i + 1);
      } else if (inputValue[i] === ")") {
        closeBrackets.push(i + 1);
      }
    }
    setOpenBracket(openBrackets);
    setCloseBracket(closeBrackets);
  };

  return (
    <>
      <div className="">
        <h1>()</h1>
        <input value={input} onChange={handleInputChange} />
        <p>
          ต้องใส่วงเล็บเปิดเพิ่ม{closeBracket.length}ตัว
          <br />
          ต้องใส่วงเล็บปิดเพิ่ม{openBracket.length}ตัว
          <br />
          ตำแหน่งที่ต้องใส่วงเล็บเปิดคือ{openBracket.join(", ")}
          <br />
          ตำแหน่งที่ต้องใส่วงเล็บปิดคือ{closeBracket.join(", ")}
          <br />
        </p>
      </div>
    </>
  );
}

export default Box;
