<template>
	<div :class="['cins', {'cins--active': visible}]">
		<h2 class="cins__title">📝 Instructions</h2>
		<p class="cins__text">catodo is a mouseless todo list thus here are the shortcuts for ya:</p>
		<div class="cins__items">
			<div class="cins__item">
				&bull;
				<span class="cins__code">Ctrl+x</span> Close this window
			</div>
			<div class="cins__item">
				&bull;
				<span class="cins__code">Ctrl+n</span> Create a new task
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
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
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
	font-size: 20px;
	margin-top: 20px;	
}
.cins__item:first-child {
	margin-top: 0;
}
.cins__code {
	font-style: italic;
	margin-right: 10px;
}
</style>
