<template>
	<div v-show="visible" class="newt">
		<input class="newt__input" ref="new" v-model.trim="text">
		<div class="newt__tips">
			<span class="newt__tip">
				<span class="newt__code">Ctrl+a</span> abort
			</span>
			<span class="newt__tip newt__tip--save">
				<span class="newt__code">Enter</span> save
			</span>
		</div>
	</div>
</template>

<script>
import {EventBus} from '@/eventBus'
import {Storage} from '@/storage'
export default {
	props: {
		visible: Boolean
	},
	data() {
		return {
			text: ''
		}
	},
	methods: {
		saveTask() {
			if (!this.text) return
			Storage.saveTask({text: this.text})
			this.text = ''
			this.$emit('update')
		},
		abortTask() {
			this.text = ''
		}
	},
	mounted() {
		EventBus.$on('save-task', () => this.saveTask());
		EventBus.$on('abort-task', () => this.abortTask());
	}
}
</script>

<style>
.newt {
	padding-bottom: 10px;
}
.newt__input {
    font-size: 20px;
    color: black;
    background-color: var(--grey);
    border: 3px solid black;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
}
.newt__tips {
	display: flex;
    justify-content: flex-end;
}
.newt__tip {
	align-self: flex-start;
	margin-right: 5px;
	padding: 5px;
	border: 3px solid black;
	border-top: 0;
	background-color: var(--white);
	font-size: 12px;
}
.newt__tip--save {
	background-color: var(--green);
	padding: 10px;
}
.newt__tip:last-child {
	margin-right: 0;
}
.newt__code {
	font-style: italic;
}
</style>
