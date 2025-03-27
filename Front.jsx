import React ,{useEffect,useState} from "react";
import './Style/All.css';
import TaskList from "./taskList";
import TaskInput from "./taskinput"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "./Redux/taskSlice";
import Login from "./login";
import { useNavigate } from "react-router-dom";
import { logout } from "./Redux/auth";
import { setUser } from "./Redux/taskSlice";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav ,Button} from "react-bootstrap";
import { useLocation } from "react-router-dom";

function Front(){
    const dispatch = useDispatch();
    const weather = useSelector((state) => state.tasks.weather); // Fetch weather from Redux store
    const tasks = useSelector((state) => state.tasks.tasks)||[];
    const weatherError = useSelector((state) => state.tasks.weatherError);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const navigate= useNavigate();
    const [expanded, setExpanded] = useState(false); 
    const location =useLocation();

    useEffect(() => {
      if (!isAuthenticated) {
          navigate("/login"); //  Redirect to login if not authenticated
      }else {
        dispatch(setUser(user));  // Load tasks for the logged-in user
    }}
    , [isAuthenticated, dispatch, navigate, user]);
 
    useEffect(() => {
      const isOutTask =Array.isArray(tasks) &&  tasks.some(task => task.type === "outside");
      if(isOutTask && "geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(
        (position)=>{
          const {latitude,longitude}=position.coords;
          dispatch(fetchWeather({lat:latitude,long:longitude}));
        },
        (error)=>{
          console.error("Error getting location ", error);
          })
      }else{
        console.error("Geolocation is not supported by this browser.");
      }
    }, [dispatch,tasks]);
    
    const check=()=>{
     return expanded ? {margin:"5px",width:"80px"}:{}}

    return (
        <>
        <div className="app-container">
            <Navbar expand="lg" expanded={expanded} className="justify-content-start">
                <Navbar.Toggle aria-controls="basic-navbar-nav"  onClick={() => setExpanded(!expanded)}/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {location.pathname === "/" && (
                         <Button variant="danger" style={{marginTop:'10px',width:'100px'}}onClick={() =>{dispatch(logout()); setExpanded(false);}}>Logout</Button>
                        )} 
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
         <div className="heading">
            <h2 className="head-1">Oraganize your Daily Tasks</h2>
            <h4 style={{fontStyle:'italic'}}>Add,Delete or priotitize your work </h4>
         </div>   
         {isAuthenticated ? (
            <>
                <h2>Welcome, {user}!</h2>
                    {weather && weather.main && (
                        <div className="weather-info">
                            <p>Weather in {weather.name}: {weather.main.temp}°C</p>
                        </div>
                    )}

        <TaskInput />
        <TaskList />
            </>
            ) : (
        <Login/>
            )}
        </div>
    </>
    )
}

export default Front;