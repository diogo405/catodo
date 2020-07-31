<template>
	<div :class="['task', {'task--done': task.status === 'DONE'}]">
        <span class="task__id">id: {{task.id}}</span>
        <span class="task__text">{{task.text}}</span>
	</div>
</template>

<script>
export default {
	props: ['task']
}
</script>

<style>
.task {
	padding: 20px;
    background-color: white;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    margin-top: 30px;
    font-size: 20px;
}
.task--done.task {
    background-color: whitesmoke;
    box-shadow: none;
}
.task:first-child {
    margin-top: 0;
}
.task__id {
    font-size: 14px;
    color: grey;
}
.task__text {
    margin-left: 10px;
}
.task--done .task__text {
    text-decoration: line-through;
}
.catodo--dark .task {
    background-color: var(--lightDark);
    box-shadow: none;
}
.catodo--dark .task--done.task {
    background-color: var(--dark);
}
</style>
