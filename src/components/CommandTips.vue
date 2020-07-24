<template>
	<div class="ctips">
		<span class="ctips__tip">
			<span class="ctips__code">Ctrl+a</span> abort
		</span>
		<span class="ctips__tip ctips__tip--save">
			<span class="ctips__code">Enter</span> save
		</span>
	</div>
</template>

<script>
export default {
	
}
</script>

<style>
.ctips {
	display: flex;
    justify-content: flex-end;
}
.ctips__tip {
	align-self: flex-start;
	margin-right: 5px;
	padding: 5px;
	border: 3px solid black;
	border-top: 0;
	background-color: var(--white);
	font-size: 12px;
}
.ctips__tip--save {
	background-color: var(--green);
	padding: 10px;
}
.ctips__tip:last-child {
	margin-right: 0;
}
.ctips__code {
	font-style: italic;
}
</style>
