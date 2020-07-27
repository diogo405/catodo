<template>
	<div :class="['cins', {'cins--active': visible}]">
		<h2 class="cins__title">📝 Instructions</h2>
		<p class="cins__text">Catodo is a mouseless todo list thus here are the shortcuts for ya:</p>
		<div class="cins__items">
			<div class="cins__item">
				&bull;
				<span class="cins__code">Esc</span> Close this window
			</div>
			<div class="cins__item">
				&bull;
				<span class="cins__code">Ctrl+i</span> Open this window
			</div>
			<div class="cins__item cins__item--section">
				&bull;
				<span class="cins__code">Ctrl+n</span> Create a new task
			</div>
			<div class="cins__item">
				&bull;
				<span class="cins__code">Enter</span> Save task
			</div>
			<div class="cins__item">
				&bull;
				<span class="cins__code">Esc</span> Abort task creation
			</div>
			<div class="cins__item cins__item--section">
				&bull;
				<span class="cins__code">Ctrl+d</span> Open task deletion popup
			</div>
			<div class="cins__item">
				&bull;
				<span class="cins__code">Esc</span> Abort task deletion
			</div>
			<div class="cins__item">
				&bull;
				<span class="cins__code">Task id + Enter</span> Delete task
			</div>
			<div class="cins__item">
				&bull;
				<span class="cins__code">Ctrl+0 (zero)</span> Delete all tasks
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['visible']
}
</script>

<style>
.cins {
	padding: 50px;
	border: 1px solid grey; 
	background-color: darkgrey;
	position: absolute;
	top: 50px;
	left: 50%;
	transform: translateX(-50%);
	border: 3px solid black;
	display: none;
}
.cins--active {
	display: block;
}
.cins__title {
	font-size: 26px;
	font-family: var(--big);
}
.cins__text {
	margin-top: 10px;
}
.cins__items {
	margin-top: 30px;
}
.cins__item {
	font-size: 16px;
	margin-top: 10px;	
}
.cins__item:first-child {
	margin-top: 0;
}
.cins__item.cins__item--section {
	margin-top: 25px;
}
.cins__code {
	font-size: 18px;
	font-style: italic;
    margin-right: 10px;
    min-width: 150px;
    display: inline-block;
}
</style>
