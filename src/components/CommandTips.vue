<template>
	<div class="ctips">
		<span class="ctips__tip">
			<span class="catodo__command catodo__command--secondary">Esc</span> abort
		</span>
		<span class="ctips__tip">
			<span class="catodo__command">Enter</span> save
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
	margin: 20px 10px 0 0;
	font-size: 12px;
}
.ctips__tip:last-child {
	margin-right: 0;
}
</style>
