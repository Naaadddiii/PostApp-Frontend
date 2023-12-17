import { LOGIN } from "../config/RestApi";
import { SIGNUP } from "../config/RestApi";
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(LOGIN, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error('Login failed. Please check your credentials.');
  }
};

export const signupUser = async (name, email, password) => {
  try {
    const response = await axios.post(SIGNUP, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw new Error('Signup failed. Please try again.');
  }
};



