import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [lesson, setLesson] = useState("");

  const handleClick = () => {
    axios
      .post("http://localhost:3000/api/generate-lesson", {
        topic: "Momentum for NYC regents",
        gradeLevel: "11",
      })
      .then((res) => {
        setLesson(res.data.lesson);
      });
  };

  return (
    <>
      <button onClick={handleClick}>Generate Lesson</button>
      <div dangerouslySetInnerHTML={{ __html: lesson }} />
    </>
  );
}

export default App;
