import axios from "axios";


export const resolvers = {
    Query: {
        users: () => getRestUsersList(),
        todos: () => getRestToDosList(),
        todo: (parent, args, context, info) => todoById(parent, args, context, info),
        user: (parent, args, context, info) => userById(parent, args, context, info),
    },
    User:{
        todos: (parent, args, context, info) => usersTodos(parent, args, context, info),
    },
    ToDoItem:{
        user: (parent, args, context, info) => todosUser(parent, args, context, info),
    },

}


async function getRestUsersList(){
    try {
        const users = await axios.get("https://jsonplaceholder.typicode.com/users")
        console.log(users);
        return users.data.map(({ id, name, email, username }) => ({
            id: id,
            name: name,
            email: email,
            login: username,
        }))
    } catch (error) {
        throw error
    }
}

async function userById(parent, args, context, info){
    try {
        const usersList = await getRestUsersList();
        return usersList.find(u => u.id == args.id);
    } catch (error) {
        throw error;
    }
}

async function usersTodos(parent, args, context, info){
    try {
        const todosList = await getRestToDosList();
        return todosList.filter(t => t.user == parent.id);
    } catch (error) {
        throw error;
    }
}


async function getRestToDosList(){
    try {
        const todos = await axios.get("https://jsonplaceholder.typicode.com/todos")
        console.log(todos);
        return todos.data.map(({ id, title, completed, userId}) => ({
            id: id,
            title: title,
            completed: completed,
            user: userId,
        }))
    } catch (error) {
        throw error
    }
}

async function todoById(parent, args, context, info){
    try {
        const todosList = await getRestToDosList();
        return todosList.find(t => t.id == args.id);
    } catch (error) {
        throw error;
    }
}


async function todosUser(parent, args, context, info){
    try {
        const usersList = await getRestUsersList();
        return usersList.find(u => u.id == parent.user);
    } catch (error) {
        throw error;
    }
}





