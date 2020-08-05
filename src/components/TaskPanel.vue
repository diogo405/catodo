<template>
	<div class="tpanel">
		<div v-for="task in sortedTasks" :class="['tpanel__task', {'tpanel__task--done': task.status === 'DONE'}]" :key="task.id"></div>
	</div>
</template>

<script>
export default {
	props: {
		tasks: Array
	},
	computed: {
		sortedTasks() {
			let sortedTasks = [...this.tasks]
			return sortedTasks.sort((a, b) => {
				if (a.status === 'DONE' && b.status === 'DONE') return 0
				if (a.status === 'DONE' && b.status !== 'DONE') return -1
				if (a.status !== 'DONE' && b.status === 'DONE') return 1
				return 0 // whatever
			})
		}
	}
}
</script>

<style>
.tpanel {
	position: absolute;
	top: 5px;
	left: 10px;
	display: flex;
	max-width: 100px;
    flex-wrap: wrap;
}
.tpanel__task {
	width: 5px;
	height: 5px;
	border-radius: 50%;
	border: 1px solid var(--blue);
	background-color: white;
	margin-right: 5px;
	margin-top: 5px;
}
.catodo--dark .tpanel__task {
	background-color: var(--dark);
}
.tpanel__task.tpanel__task--done {
	background-color: var(--blue);
}
</style>
