import axios from 'axios';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


const API_URL = 'http://localhost:3000/'; 
const auth = getAuth();


export async function firebaseLogin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();
    localStorage.setItem('userToken', token);
    
    return { user, token };
  } catch (error) {
    console.error('Firebase login error', error);
    throw error;
  }
}

export async function firebaseLogout() {
  try {
    await auth.signOut();
    localStorage.removeItem('userToken');
  } catch (error) {
    console.error('Firebase logout error', error);
    throw error;
  }
}

export async function login(username, password) {
  try {
    const response = await axios.post(`${API_URL}login`, { username, password });
    if (response.data.token) {
      localStorage.setItem('userToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Login error', error.response.data);
    throw error;
  }
}

export async function signup( email, password,firstName, lastName, role) {
  try {
    const response = await axios.post(`${API_URL}signup`, { email, password,firstName, lastName, role });
    return response.data;
  } catch (error) {
    console.error('Signup error', error.response.data);
    throw error;
  }
}
