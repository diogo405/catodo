<template>
	<div class="task">
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
    background-color: #ECBC9E;
    border: 3px solid black;
    border-radius: 2px;
    margin-top: 5px;
    color: black;
    font-size: 20px;
}
.task:first-child {
    margin-top: 0;
}
.task__id {
    color: grey;
    font-size: 14px;
}
.task__text {
    margin-left: 10px;
}
</style>
