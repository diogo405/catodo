class Storage {
	static saveTask(task) {
		let tasks = Storage.getTasks()
		tasks.unshift({id: Storage.generateTaskId(), text: task.text, status: 'CREATED'})
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}

	static deleteTask(id) {
		let tasks = Storage.getTasks()
		tasks = tasks.filter(t => t.id.toUpperCase() !== id.toUpperCase())
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}

	static getTasks() {
		let tasks = JSON.parse(localStorage.getItem('tasks'))
        return tasks || []
	}

	static getTask(id) {
		let tasks = JSON.parse(localStorage.getItem('tasks'))
		let task = tasks.find(t => t.id.toUpperCase() === id.toUpperCase())
		/* eslint-disable no-console */
		if (!task) console.log(`Cannot find task ${id}`)
		return task
	}

	static updateTask(id, status) {
		let tasks = Storage.getTasks()
		tasks.forEach(t => {
			if (t.id.toUpperCase() === id.toUpperCase()) {
				t.status = status
			}
		})
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}

	static deleteAllTasks() {
		localStorage.setItem('tasks', '[]')
        return []
	}

	static generateTaskId() {
		return Math.random().toString(36).substring(2, 4).toUpperCase()
	}
}

export {Storage}