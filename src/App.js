import "./App.css"
import React, { useState } from "react";

const GpaCalculator = () => {
  const [totalCredits, setTotalCredits] = useState(0);
  const [totalGradePoints, setTotalGradePoints] = useState(0);
  const [grades, setGrades] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  // const [lastTotalGrade, setlastTotalGradePoints]=useState(0);
  const [totalGpa, setTotalGpa]=useState(0);

  const user = {
    totalHours: 37,
    totalGpa: 3.8,
  };

  const data = [
    { id: 1, name: "sa:", hours: 3 },
    { id: 2, name: "dc:", hours: 3 },
    { id: 3, name: "ds:", hours: 3 },
    { id: 4, name: "pl2:", hours: 3 },
    { id: 5, name: "logic:", hours: 3 },
    { id: 6, name: "db:", hours: 3 },
    { id: 7, name: "hr:", hours: 2 },
  ];

  const calculateGPA = () => {
    let totalCreditsValue = 0;
    let totalGradePointsValue = 0;

    for (const subject of data) {
      const grade = grades[subject.id];

      if (!grade || !isValidGrade(grade)) {
        setErrorMessage("Please enter valid grades for all subjects.");
        return;
      }

      const gradePoints = calculateGradePoints(grade);
      const coursePoints = subject.hours * gradePoints;

      totalCreditsValue += subject.hours;
      totalGradePointsValue += coursePoints;
    }

    let lastTotalGrade = user.totalGpa * user.totalHours;
    console.log(lastTotalGrade);
    let totalGrade = lastTotalGrade + totalGradePointsValue;
    console.log(totalGrade);
    setTotalCredits(totalCreditsValue + user.totalHours);
    console.log(totalCreditsValue);
    setTotalGradePoints(totalGradePointsValue+totalGrade);
    setTotalGpa((totalGrade / (totalCreditsValue+user.totalHours)).toFixed(2))


    setErrorMessage("");
  };

  const isValidGrade = (grade) => {
    const validGrades = ["A", "A+", "B", "B+", "C", "C+", "D", "D+", "F"];
    return validGrades.includes(grade.toUpperCase());
  };

  const calculateGradePoints = (grade) => {
    switch (grade.toUpperCase()) {
      case "A+":
        return 4.0;
      case "A":
        return 3.75;
      case "B+":
        return 3.4;
      case "B":
        return 3.1;
      case "C+":
        return 2.8;
      case "C":
        return 2.5;
      case "D+":
        return 2.25;
      case "D":
        return 2.0;
      case "F":
        return 1.0;
      default:
        return 0.0;
    }
  };

  return (
    <div>
      <h1 className="header">GPA Calculator</h1>
      <div className="grade">
        {data.map((subject) => (
          <div key={subject.id} className="margin">
            <div className="namesub">{subject.name}</div>
            <input
              placeholder="Valid Input (A, B, C, D, F)"
              className="grade-input"
              type="text"
              id={`grade-${subject.id}`}
              value={grades[subject.id] || ""}
              onChange={(e) => {
                setGrades((prevGrades) => ({
                  ...prevGrades,
                  [subject.id]: e.target.value.toUpperCase(),
                }));
              }}
            />
          </div>
        ))}
      </div>
      <button onClick={calculateGPA}>Calculate GPA</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div id="result">
        <p>Total Credits: {totalCredits}</p>
        <p>
          GPA:{" "}
          {isNaN(totalCredits)
            ? "N/A"
            : totalGpa}
        </p>
      </div>
    </div>
  );
};

export default GpaCalculator;
