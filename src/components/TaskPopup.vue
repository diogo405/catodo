<template>
	<div :class="['dtask', {'dtask--visible': visible}]">
		<div class="dtask__cont">
			<label class="dtask__label">{{label}}</label>
			<input class="dtask__input" ref="input" maxlength="2" v-model.trim="id" @input="v => {id = id.toUpperCase()}">
		</div>
		<CommandTips/>
	</div>
</template>

<script>
import CommandTips from '@/components/CommandTips'
import {EventBus} from '@/eventBus'
import {Storage} from '@/storage'
export default {
	props: ['visible', 'label'],
	data() {
		return {
			id: ''
		}
	},
	components: {CommandTips},
	methods: {
		updateTask(params) {
			if (!this.id) return

			if (params.action == 'DELETE') {
				Storage.deleteTask(this.id)
				this.id = ''
				this.$emit('update')
				return
			}

			if (params.action == 'DONE') {
				let task = Storage.getTask(this.id)
				if (!task) {
					this.id = ''
					this.$emit('update')
					return
				}

				let status = task.status === 'CREATED' ? 'DONE' : 'CREATED'
				Storage.updateTask(this.id, status)
				this.id = ''
				this.$emit('update')
				return
			}
			
			/* eslint-disable no-console */
			console.error(`Action ${params.action} not set`)
		}
	},
	mounted() {
		EventBus.$on('update-task', (params) => this.updateTask(params));
	}
}
</script>

<style>
.dtask {
	position: absolute;
	bottom: 20px;
	right: 20px;
	box-shadow: var(--shadow);
	border-radius: var(--radius);
    padding: 20px;
    opacity: 0;
    transition: opacity 200ms ease-out;
}
.dtask--visible {
	opacity: 1;
}
.dtask__cont {
	background-color: white;
    display: flex;
}
.dtask__label {
    font-size: 14px;
    align-self: center;
}
.dtask__input {
	border: none;
	width: 50px;
	margin-left: 10px;
}
.catodo--dark .dtask {
	box-shadow: var(--darkShadow);
}
.catodo--dark .dtask__cont {
	background-color: var(--dark);
}
.catodo--dark .dtask__input {
	background-color: var(--dark);
	color: white;
}
</style>
