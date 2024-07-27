import axios from "axios";

export const authenticate = async (emailId, password) => {
    const url = `/userDB?emailId=${emailId}&password=${password}`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      localStorage.setItem('user', JSON.stringify(data[0]));
      sessionStorage.setItem('user',data[0].name);
      localStorage.setItem('useremail', JSON.stringify(data[0]));
      sessionStorage.setItem('useremail',data[0].emailId);
      window.location.href="http://localhost:3000";
      console.log(sessionStorage.getItem('useremail'));

      if (data.length > 0) {
        return true;
      }
      return false;
    } catch (e) {
      let error = new Error("Authentication failed");
      error.status = 404;
      throw error;
    }
  };

