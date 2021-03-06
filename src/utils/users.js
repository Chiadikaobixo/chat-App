const users = []

const addUser = ({id, username, room}) => {
   //clean data
   username = username.trim().toLowerCase()
   room = room.trim().toLowerCase()

   //validate data
   if(!username || !room){
       return{
           error: 'Username and Room are required'
       }
   }

   //check for existing user
   const existingUser = users.find((user) => {
       return user.room === room && user.username === username
   })

   //validate username
   if(existingUser){
       return{
           error: 'Username not available!'
       }
   }

   //save user
   const user = {id, username, room}
   users.push(user)
   return {user}
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    const user = users.find((user) => user.id === id)

    return user
}

const getUsersInRoom = (room) => {
    const usersInRoom = users.filter((user) => user.room === room )

    return usersInRoom
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}