import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch tasks from localStorage
const loadTasksFromStorage = (username) => {
    if (!username) return [];
    const storedTasks = localStorage.getItem(`tasks_${username}`);
    return storedTasks ? JSON.parse(storedTasks) : [];
};

// Fetch weather data using an async thunk
export const fetchWeather = createAsyncThunk("weather/fetchWeather", async ({ lat, lon }, { rejectWithValue }) => {
    try {
        const API_KEY = "a1a68f434d8b9c25d24789bbf736491b"; // Replace with your API key
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }

        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
      tasks: [],
      weather: {},
      weatherError: null,
      username: null,  // Track the currently logged-in user
  },
  reducers: {
      setUser: (state, action) => {
          state.username = action.payload;
          state.tasks = loadTasksFromStorage(action.payload); // Load tasks for this user
      },
      addTask: (state, action) => {
          const newTask = {
              id: Date.now(),
              text: action.payload.text,
              priority: action.payload.priority,
              type: action.payload.type,
              completed: false,
          };
          state.tasks.push(newTask);
          if (state.username) {
            localStorage.setItem(`tasks_${state.username}`, JSON.stringify([...state.tasks]))
          }
      },
      removeTask: (state, action) => {
          state.tasks = state.tasks.filter(task => task.id !== action.payload);
          if (state.username) {
            localStorage.setItem(`tasks_${state.username}`, JSON.stringify([...state.tasks]))
          }
      },
      toggleTask: (state, action) => {
          const task = state.tasks.find(task => task.id === action.payload);
          if (task) task.completed = !task.completed;
          if (state.username) {
            localStorage.setItem(`tasks_${state.username}`, JSON.stringify([...state.tasks]))
          }
      },
      logoutUser: (state) => {
          state.username = null;
          state.tasks = [];
      }
  },
});

export const { setUser, addTask, removeTask, toggleTask, logoutUser } = taskSlice.actions;
export default taskSlice.reducer;