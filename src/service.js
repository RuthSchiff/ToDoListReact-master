import axios from 'axios';

const apiUrl =  process.env.REACT_APP_API_URL;

const service = {
  getTasks: async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.log("User ID not found in localStorage");
      return;
    }
    try {
      const result = await axios.get(`${apiUrl}/allTasks`, {
        params: { userId }
      });
      if (result.status !== 200) {
        console.log("Error fetching data");
        return;
      }
      return result.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return null;
    }
  },

  

  addTask: async (NameT) => {
    const userId = parseInt(localStorage.getItem('userId'), 10);
    if (isNaN(userId)) {
      console.log("User ID not found in localStorage or is not a valid number");
      return;
    }
    try {
      const result = await axios.post(`${apiUrl}/addTask/${NameT}/${userId}`);
      if (result.status !== 200) {
        console.log("Error adding data");
        return;
      }
      return result.data;
    } catch (error) {
      console.error("Error adding task:", error);
      return null;
    }
  },
  setCompleted: async (id, isComplete) => {
    try {
      const result = await axios.put(`${apiUrl}/updateTask/${id}`, { isComplete });
      if (result.status !== 200) {
        console.log("Error updating data");
        return;
      }
      return result.data;
    } catch (error) {
      console.error("Error updating task:", error);
      return null;
    }
  },
  deleteTask: async (id) => {
    try {
      const result = await axios.delete(`${apiUrl}/deleteTask/${id}`);
      if (result.status !== 200) {
        console.log("Error deleting data");
        return;
      }
      return result.data;
    } catch (error) {
      console.error("Error deleting task:", error);
      return null;
    }
  },
  register: async (Name, Password) => {
    try {
      const result = await axios.post(`${apiUrl}/Register/${Name}/${Password}`);
      if (result.status === 200) {
        const userId = result.data;
        localStorage.setItem('userId', userId);
        return userId;
      } else {
        console.log("Error registering user");
        return null;
      }
    } catch (error) {
      console.error("Error registering user:", error);
      return null;
    }
  },
  login: async (Password) => {
    // debugger
    try {
      const result = await axios.post(`${apiUrl}/login/${Password}`);
      if (result.status === 200) {
        const userId = result.data;
        localStorage.setItem('userId', userId);
        console.log(  localStorage.getItem('userId'));
        
        return userId;
      } else {
        console.log("Error logging in");
        return null;
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return null;
    }
  },
};

export default service;