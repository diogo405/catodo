<template>
	<div :class="['newt', {'newt--visible': visible}]">
		<input class="newt__input" ref="new" v-model.trim="text">
		<CommandTips/>
	</div>
</template>

<script>
import {EventBus} from '@/eventBus'
import {Storage} from '@/storage'
import CommandTips from '@/components/CommandTips'
export default {
	props: {
		visible: Boolean
	},
	components: {CommandTips},
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
	opacity: 0;
	display: none;
	animation: fadeInFromNone 200ms ease-out;
}
.newt--visible {
	opacity: 1;
	display: block;
}
.newt__input {
    font-size: 20px;
    background-color: white;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    border: none;
}
.catodo--dark .newt__input {
    background-color: var(--lightDark);
    box-shadow: none;
    color: white;
}
</style>
