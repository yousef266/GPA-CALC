import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

const GpaCalculator = () => {
  const [totalCredits, setTotalCredits] = useState(0);
  const [totalGradePoints, setTotalGradePoints] = useState(0);
  const [count, setcount] = useState(0);
  const [credit, setCredit] = useState("");
  const [grade, setGrade] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const calculateGPA = () => {
    const parsedCredit = parseInt(credit);
    const uppercaseGrade = grade.toUpperCase();
    setcount(count + 1)

    if (
      isNaN(parsedCredit) ||
      parsedCredit <= 0 ||
      !isValidGrade(uppercaseGrade)
    ) {
      setErrorMessage("Please enter valid credit hours and grade.");
      setcount(count)
      return;
    }
    if (count >= 7) {
      setErrorMessage(
        "The number of subjects is more than the permitted number"
      );
      setcount(count)

      return;
    }
    if (credit < 2) {
      setErrorMessage(
        "Min hour is 2."
      );
      setcount(count)
      return ;
    } else if (credit > 3) {
      setErrorMessage(
        "Max hour is 3."
      );
      setcount(count)
      return ;
    }
    const gradePoints = calculateGradePoints(uppercaseGrade);
    const coursePoints = parsedCredit * gradePoints;

    setTotalCredits(totalCredits + parsedCredit);
    setTotalGradePoints(totalGradePoints + coursePoints);

    const gpa = (totalGradePoints / totalCredits).toFixed(2);

    setErrorMessage("");

    
    setCredit("");
    setGrade("");
  };
  const isValidGrade = (grade) => {
    const validGrades = ["A", "B", "C", "D", "F"];
    return validGrades.includes(grade);
  };

  const calculateGradePoints = (grade) => {
    switch (grade) {
      case "A":
        return 4.0;
      case "B":
        return 3.0;
      case "C":
        return 2.0;
      case "D":
        return 1.0;
      case "F":
        return 0.0;
      default:
        return 0.0;
    }
  };

  return (
    <div>
      <h1 className="header">GPA Calculate </h1>
      <div>
        <div className="hour">
          <label htmlFor="credit">Credit Hours:</label>
          <input
            min={2}
            // type="number"
            id="credit"
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
          />
        </div>
        <div className="grade">
          <label htmlFor="grade" className="grade">
            Grade:
          </label>
          <input 
            placeholder="Vlaid Input ( A, B, C, D, F)"
            className="grade-input"
            type="text"
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>
      </div>
      {/* <div>{count}</div> */}
      <button onClick={calculateGPA}>Calculate GPA</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div id="result">
        <p>number of subjects: {count}</p>
        <p>Total Credits: {totalCredits}</p>
        <p>
          GPA:{" "}
          {isNaN(totalCredits)
            ? "N/A"
            : (totalGradePoints / totalCredits).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default GpaCalculator;
