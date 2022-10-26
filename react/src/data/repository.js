import axios from "axios";
import { useParams } from "react-router";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(username, password) {
  const response = await axios.get(API_HOST + "/api/users/login", { params: { username, password } });
  const user = response.data;
  
  // NOTE: In this example the login is also persistent as it is stored in local storage.
  if(user !== null)
    setUser(user);

  return user;
}
async function getAllUsers() {
  const response = await axios.get(API_HOST + "/api/users");
  return response.data;
}
async function findUser(id) {
  const response = await axios.get(API_HOST + `/api/users/select/${id}`);

  return response.data;
}

async function deleteUser(id) {
  const response = await axios.get(API_HOST + `/api/users/delete/${id}`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}
async function updateUser(user) {
  const response = await axios.post(API_HOST + "/api/users/update",user);

  return response.data;
}



// --- Post ---------------------------------------------------------------------------------------
async function getPosts() {

  const response = await axios.get(API_HOST + "/api/posts/get");

  return response.data;
}

async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/posts/create", post);

  return response.data;
}


// --- Follow ---------------------------------------------------------------------------------------
async function getFollows() {
  const response = await axios.get(API_HOST + "/api/follows/get");

  return response.data;
}

//get follow for one another record
async function getOneFollow(follow) {
  const response = await axios.post(API_HOST + "/api/follows/select", follow);

  return response.data;
}

//get one's follow
async function findFollow(id) {
  const response = await axios.get(API_HOST + `/api/follows/findFollow/${id}`);
  return response.data;
}

//follow someone
async function createFollow(follow) {
  const response = await axios.post(API_HOST + "/api/follows/create", follow);

  return response.data;
}

async function unFollow(follow) {
  const response = await axios.post(API_HOST + "/api/follows/delete", follow);

  return response.data;
}

// --- Like---------------------------------------------------------------------------------------
async function addLike(like) {
  const response = await axios.post(API_HOST + "/api/likes/create", like);

  return response.data;
}

async function unLike(unlike) {
  const response = await axios.post(API_HOST + "/api/likes/delete", unlike);

  return response.data;
}


// --- Helper functions to interact with local storage --------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser, getAllUsers, findUser, createUser, updateUser,deleteUser,
  getPosts, createPost,
  getFollows, getOneFollow, findFollow, createFollow, unFollow,
  addLike, unLike,
  getUser, removeUser,setUser
}
