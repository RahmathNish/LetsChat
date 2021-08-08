// // Front end JS
// const chatForm = document.getElementById('chat-form');
// const chatMessages = document.querySelector('.chat-messages');
// const userList = document.getElementById('users');
// // const roomName = document.getElementById('room-name');


// //Get username and room from url
// const  {username,room } = Qs.parse(location.search, {
//     ignoreQueryPrefix : true
// });

// const socket = io();

// //joining chatrm
// socket.emit('joinRoom', { username, room });

// // Get room and usersS

// socket.on('roomUsers',({ room, users }) => {
//     function outputRoomName(room) {
//         const roomName = document.getElementById('room-name');
//         roomName.innerText=room;
//      };
//     outputRoomName(room);
//     outputUsers(users);
// });

// socket.on('message', (message) => {
//     console.log(message);
//     outputMessage(message);

//     // SCROLL DOWN
//     chatMessages.scrollTop = chatMessages.scrollHeight;
// });

// //  Submitting message
// chatForm.addEventListener('submit', (e) => {
//  e.preventDefault();

//  let msg = e.target.elements.msg.value;

//  // emit a message to the server
//  socket.emit('chatMessage',msg);

// // CLEAR MSG
// e.target.elements.msg.value = '';
// e.target.elements.msg.focus();

// });

// // output message
// function outputMessage(message) {
//     const div = document.createElement('div');
//     div.classList.add('message');
//     div.innerHTML=`	<p class="meta">${message.username} <span>${message.time}</span></p>
//                     <p class="text">
//                         ${message.text}
//                      </p>`;
//     document.querySelector('.chat-messages').appendChild(div);
// }

// // Adding roomname to DOM


// // Adding users to DOM
// function outputUsers(users) {
//     userList.innerHTML = '';
//     users.forEach((user) => {
//         const li=document.createElement('li');
//         li.innerText = user.username;
//         userList.appendChild(li);
//     });
// }
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
}
});
