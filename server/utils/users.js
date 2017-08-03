 class Users {
    constructor(){
        this.users = [];
    }

    addUser(id, name, room){
        let user =  {id: id, username: name, room: room};
        this.users.push(user);
        return user;
    }
    findUsersForRoom(room){
        return this.users.filter(userObj => userObj.room === room)
    }

    getUser(username){
        return this.users.filter(userObj => {return userObj.username == username})[0]
    }

    removeUser(username){
        let user = this.getUser(username);
        if (user) {
            this.users = this.users.filter(userObj => userObj.username != user.username)
        }
    }
}


export default Users;