<template>
	<div v-show="visible" class="dtask">
		<div class="dtask__cont">
			<label class="dtask__label">Enter the task id to be deleted: </label>
			<input class="dtask__input" ref="delete" maxlength="2" v-model.trim="id">
		</div>
		<CommandTips/>
	</div>
</template>

<script>
import CommandTips from '@/components/CommandTips'
import {EventBus} from '@/eventBus'
import {Storage} from '@/storage'
export default {
	props: ['visible'],
	data() {
		return {
			id: ''
		}
	},
	components: {CommandTips},
	methods: {
		deleteTask() {
			if (!this.id) return
			Storage.deleteTask(this.id)
			this.id = ''
			this.$emit('update')
		}
	},
	mounted() {
		EventBus.$on('delete-task', () => this.deleteTask());
	}
}
</script>

<style>
.dtask {
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
}
.dtask__cont {
	background-color: var(--grey);
    color: black;
    border: 3px solid black;
    border-top: none;
    padding: 20px;
    display: flex;
}
.dtask__label {
    font-size: 16px;
    align-self: center;
}
.dtask__input {
	border: none;
	width: 50px;
	margin-left: 10px;
}
</style>
