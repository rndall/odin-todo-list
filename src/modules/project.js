function createProject(name, todos = []) {
	const addTodo = (todo) => todos.push(todo);
	const removeTodo = (index) => todos.filter((todo, i) => index !== todo[i]);

	return { name, addTodo, removeTodo };
}

export { createProject };
