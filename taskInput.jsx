import React ,{useState} from "react";
import { useDispatch } from 'react-redux';
import {addTask} from './Redux/taskSlice';


function TaskInput(){
    const [task,setTask]=useState("");
    const [priority, setPriority]=useState("Medium");
    const [tasktype ,setTaskType]=useState("Inside");
    const [error, setError] = useState("");
    const dispatch =useDispatch();

    const handleTask=()=>{
          if (!task.trim()) {
            setError("Task cannot be empty!"); // Set error message
            return;
          }else{
          setError("");
          }
            dispatch(addTask({text: task,priority}));
            setTask("");
            setPriority("Medium");
            setTaskType("Inside");
         }
    
    const handleKeyPress = (e) => {
          if (e.key === "Enter") {
              handleTask();
          }
      };
  
        
    return (
        <>
         {/*Enter Tasks and Add*/}
        <div className="add">
        <input 
          type="text" 
          onChange={(e)=>{setTask(e.target.value);if (error) setError("");}}
          value={task}
          placeholder="Enter task"
          onKeyDown={handleKeyPress}
        /> 
        <button className="button" onClick={handleTask}>Add Task</button>
        </div>
         {/*Error handle*/}
        {error && <p style={{ color: "red",textAlign:"left" }}>{error}</p>}

         {/*Priority*/}
        <div className="options">
        <select 
          className="opt-1"
          value={priority}
          onChange={(e)=>setPriority(e.target.value)}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

        <select
          className="opt-2" 
          value={tasktype}
          onChange={(e)=>setTaskType(e.target.value)}>
           <option value="inside">Inside</option>
           <option value="outside">Outside</option>
        </select> 
        </div> 

         

          
        </>
    )
}

export default TaskInput;