import React, { useState } from "react";
import classes from "./TodoMain.module.css";
import BackToTopButton from "../Button/BackToTopButton";
const TodoMain = () => {
  const [t1, setT1] = useState([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  const deleteTask = (taskName) => {
    setT1(
      t1.filter((task) => {
        if (task !== taskName) {
          return true;
        } else {
          return false;
        }
      })
    );
  };
  const handleShowWarning = () => {
    setShowWarning(true);
  };

  const handleHideWarning = () => {
    setShowWarning(false);
  };

  async function handleTodolist() {
    if (text.trim() === "") {
      setEnteredNameIsValid(false);
      setTimeout(() => {
        setEnteredNameIsValid(true);
      }, 300);
    } else {
      try {
        // Make a POST request to add the task to Firebase
        const response = await fetch('https://dark-todo-pilot-default-rtdb.firebaseio.com/DARK-TODO-PILOT.json', {
          method: 'POST',
          body: JSON.stringify({ task: text }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to add task to Firebase');
        }
  
        // Update the local state
        setT1([...t1, text]);
        setText("");
      } catch (error) {
        console.error(error);
        // Handle error
      }
    }
  }
  
  function handleChange(e) {
    setText(e.target.value);
  }
  function handleSearch(ev) {
    setSearch(ev.target.value);
  }  
  const list = t1.filter((t) => t.includes(search));
  const todoListStyle = {
    height: `${list.length*8}vh`,
    border: "1px solid #ccc",
    padding: "10px",
    overflowY: "auto",
  };


  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleTodolist();
    }
  };

  return (
    <div>
      <div className={classes.card}>
        <div className={classes.cardimg}></div>
        <div className={classes.cardbody}>
          <h2 className={classes.cardtitle}>
            <img
              className={classes.logo}
              src="	https://cdn-icons-png.flaticon.com/128/2387/2387635.png"
              alt=""
            />{" "}
            TODO PILOT
          </h2>

          <input
            type="text"
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            required
          />
          <button onClick={handleTodolist}>
            <img
              className={classes.plus}
              src="	https://cdn-icons-png.flaticon.com/128/1237/1237946.png
"
              alt=""
            />
            ADD TASK
          </button>
          <br />
          <input type="text" onChange={handleSearch} />
          <button>
            <img
              className={classes.searchh}
              src="https://cdn-icons-png.flaticon.com/128/16/16492.png
"
              alt=""
            />
            SEARCH
          </button>
          <br />
          <button className={classes.warning} onClick={handleShowWarning}>
            <img
              className={classes.warningimg}
              src="	https://cdn-icons-png.flaticon.com/512/61/61053.png
"
              alt=""
            />
            SHOW INSTRUCTIONS
          </button>

          {showWarning && (
            <div className="warning-message">
              <p>DOUBLECLICK FOR DELETE THE TASK!</p>
              <button onClick={handleHideWarning}>&#10006; CANCLE</button>
            </div>
          )}
           {!enteredNameIsValid  && (
                  <p style={{ color: "#d9534f", fontSize: "20px" }}>
                    TASK MUST NOT BE EMPTY
                  </p>
                )}
        </div>
      </div>

      <div className={classes.carbody}>
        <h4
          className={classes.cardbody}
          style={{ color: "black", cursor: "pointer" }}
        >
          WHAT NEEDS TO BE DONE?
        </h4>
        <div id="todoList" style={todoListStyle} className={classes.taskname}>
          {list.map((task, index) => {
            return (
              <div key={index} style={{ marginBottom: "10px" }}>
                
                <h1 onDoubleClick={() => deleteTask(task)}>{task}</h1>
              </div>
             
            );
          })}
         
        </div>          
        <div className={classes.footer}> <p>&copy; 2023 TODO PILOT</p></div>

      </div>
      <BackToTopButton/>
    </div>
  );
};
export default TodoMain;