class Storage {
	static saveTask(task) {
		let tasks = Storage.getTasks()
		tasks.push({id: Storage.generateTaskId(), text: task.text, status: 'CREATED'})
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}

	static getTasks() {
		let tasks = JSON.parse(localStorage.getItem('tasks'))
        return tasks.reverse() || []
	}

	static generateTaskId() {
		return Math.random().toString(36).substring(2, 4).toUpperCase()
	}
}

export {Storage}