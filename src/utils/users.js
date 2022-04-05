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
           error: 'Username not available'
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

addUser({
    id:3,
    username: 'xoxoF  ',
    room: 'franchise'
})

console.log(users)

const removedUser = removeUser(3)

console.log(removedUser)
console.log(users)