<template>
	<div class="task">
		{{text}}
	</div>
</template>

<script>
export default {
	name: 'task',
	props: ['text']
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
</style>
