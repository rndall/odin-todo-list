import { createTodo } from "./todo";

function createProject(name, todos = []) {
	const addTodo = (title, description, dueDate, priority) =>
		todos.push(createTodo(title, description, dueDate, priority));
	const removeTodo = (index) => todos.splice(index, 1);

	return { name, todos, addTodo, removeTodo };
}

export { createProject };
