import React, { useState } from "react";

const Game = () => {
  const [numbers, setNumbers] = useState("");
  const [result, setResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const enterNumbers = (e) => {
    setNumbers(e.target.value);
  };

  const checkValidity = () => {
    const inputNumbers = numbers.split(",");

    // Check if there are exactly 4 numbers
    if (inputNumbers.length !== 4) {
      return false;
    }

    // Check if each number is between 1 and 9
    for (let i = 0; i < inputNumbers.length; i++) {
      const num = parseInt(inputNumbers[i]);

      if (isNaN(num) || num < 1 || num > 9) {
        return false;
      }

      // Check if any number is duplicated
      for (let j = i + 1; j < inputNumbers.length; j++) {
        if (num === parseInt(inputNumbers[j])) {
          return false;
        }
      }
    }

    return true;
  };

  const generatePermutations = () => {
    const inputNumbers = numbers.split(",");
    const permutations = [];

    const generate = (arr, perm) => {
      if (arr.length === 0) {
        permutations.push(perm);
      } else {
        for (let i = 0; i < arr.length; i++) {
          const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
          generate(rest, perm.concat(arr[i]));
        }
      }
    };

    generate(inputNumbers, []);
    return permutations;
  };

  const checkCombinations = (permutations) => {
    const operations = ["+", "-", "*", "/"];

    for (let i = 0; i < permutations.length; i++) {
      const perm = permutations[i];

      for (let j = 0; j < operations.length; j++) {
        for (let k = 0; k < operations.length; k++) {
          for (let l = 0; l < operations.length; l++) {
            const combination = [operations[j], operations[k], operations[l]];
            const expression = `${perm[0]}${combination[0]}${perm[1]}${combination[1]}${perm[2]}${combination[2]}${perm[3]}`;

            try {
              const evalResult = eval(expression);
              if (evalResult === 24) {
                return combination;
              }
            } catch (error) {
              // Ignore any error
            }
          }
        }
      }
    }

    return null;
  };

  const performOperations = (combination) => {
    const inputNumbers = numbers.split(",");

    let expression = `${inputNumbers[0]}${combination[0]}${inputNumbers[1]}${combination[1]}${inputNumbers[2]}${combination[2]}${inputNumbers[3]}`;

    // Add parentheses to ensure correct order of operations
    expression = `(${expression})`;

    try {
      const evalResult = eval(expression);
      return evalResult;
    } catch (error) {
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkValidity()) {
      const permutations = generatePermutations();
      const combination = checkCombinations(permutations);

      if (combination) {
        const result = performOperations(combination);

        if (result !== null && result === 24) {
          setResult(combination.join("") + " = 24");
          setErrorMessage("");
        } else {
          setResult("");
          setErrorMessage("ชุดนี้ไม่สามารถทำให้ผลลัพธ์กลายเป็น 24 ได้");
        }
      } else {
        setResult("");
        setErrorMessage("ชุดนี้ไม่สามารถทำให้ผลลัพธ์กลายเป็น 24 ได้");
      }
    } else {
      setResult("");
      setErrorMessage("กรุณาป้อนตัวเลขที่ไม่ซ้ำกันและอยู่ในช่วง 1-9");
    }
  };

  return (
    <div>
      <h1>Game 24</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter numbers (comma-separated):{" "}
          <input type="text" onChange={enterNumbers} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {result && <p>ผลลัพธ์: {result}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Game;
