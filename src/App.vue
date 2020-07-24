<template>
    <div id="app" class="catodo" @keyup="keyUp" @keydown="keyDown" tabindex="0" ref="app">
        <h1 class="catodo__title">
            catodo 😺 <span class="catodo__sub">A mouseless todo list</span>
        </h1>
        <div class="catodo__items">
            <div class="catodo__howtodel" v-if="tasks.length > 0">
                💡 Hit <span class="catodo__code">Ctrl+d</span> to delete a task
            </div>
            <NewTask :visible="newTask.visible" ref="newTask" @update="update()"/>
            <div class="catodo__notasks" v-if="tasks.length === 0 && !newTask.visible">
                No tasks yet 🤷🏻‍♀️ 
                To create a new task hit <span class="catodo__code">Ctrl+n</span>
            </div>
            <Task v-else v-for="task in tasks" :task="task" :key="task.text"/>
        </div>
        <Instructions :visible="instructions.visible"/>
        <DeleteTask :visible="deleteTask.visible" ref="deleteTask" @update="update()"/>
        <div class="catodo__info">Ctrl+i for instructions</div>
    </div>
</template>

<script>
import {Storage} from '@/storage'
import Task from '@/components/Task'
import DeleteTask from '@/components/DeleteTask'
import NewTask from '@/components/NewTask'
import Instructions from '@/components/Instructions'
import {EventBus} from '@/eventBus'
export default {
    name: 'app',
    components: {DeleteTask, NewTask, Task, Instructions},
    data() {
        return {
            tasks: [],
            ctrlPressed: false,
            instructions: {
                visible: false
            },
            newTask: {
                visible: false
            },
            deleteTask: {
                visible: false
            }
        }
    },
    methods: {
        getTasks() {
            this.tasks = Storage.getTasks()
        },
        keyDown(event) {
            console.log(event.keyCode)
            if (event.keyCode === 17) {
                this.ctrlPressed = true
            }
        },
        keyUp(event) {
            if (event.keyCode === 17) {
                this.ctrlPressed = false
            }
            // Ctrl + n
            if (this.ctrlPressed && event.keyCode === 78) {
                this.ctrlPressed = false // avoid double trigger
                this.newTask.visible = true
                this.deleteTask.visible = false
                this.$nextTick(() => { this.$refs.newTask.$refs.new.focus() })
            }
            // Ctrl + i
            if (this.ctrlPressed && event.keyCode === 73) {
                this.ctrlPressed = false
                this.instructions.visible = true
            }
            // Ctrl + x
            if (this.ctrlPressed && event.keyCode === 88) {
                this.ctrlPressed = false
                this.instructions.visible = false
            }
            // Enter (new task)
            if (this.newTask.visible && event.keyCode === 13) {
                this.ctrlPressed = false
                EventBus.$emit('save-task')
                this.$nextTick(() => { this.$refs.app.focus() })
            }
            // Enter (delete task)
            if (this.deleteTask.visible && event.keyCode === 13) {
                this.ctrlPressed = false
                EventBus.$emit('delete-task')
                this.$nextTick(() => { this.$refs.app.focus() })
            }
            // Ctrl + a (new task)
            if (this.ctrlPressed && this.newTask.visible && event.keyCode === 65) {
                this.ctrlPressed = false
                this.newTask.visible = false
                EventBus.$emit('abort-task')
                this.$nextTick(() => { this.$refs.app.focus() })
            }
            // Ctrl + a (delete task)
            if (this.ctrlPressed && this.deleteTask.visible && event.keyCode === 65) {
                this.ctrlPressed = false
                this.deleteTask.visible = false
                this.$nextTick(() => { this.$refs.app.focus() })
            }
            // Ctrl + 0 (zero)
            if (this.ctrlPressed && event.keyCode === 48) {
                this.ctrlPressed = false
                Storage.deleteAllTasks()
                this.update()   
            }
            // Ctrl + d (delete task)
            if (this.ctrlPressed && event.keyCode === 68 && this.tasks.length > 0) {
                this.ctrlPressed = false
                this.newTask.visible = false
                this.deleteTask.visible = true
                this.$nextTick(() => { this.$refs.deleteTask.$refs.delete.focus() })
            }

        },
        update() {
            this.newTask.visible = false
            this.deleteTask.visible = false
            this.tasks = Storage.getTasks()
            this.$refs.app.focus()
        }
    },
    mounted() {
        this.getTasks()
        this.$refs.app.focus()
    }
}
</script>

<style>
.catodo {
    height: 100%;
}
.catodo__info {
    position: fixed;
    top: 0;
    right: 0;
    font-size: 14px;
    color: black;
    background-color: var(--green);
    padding: 15px;
    border: 3px solid black;
    border-top: none;
    border-right: none;
}
.catodo__title {
    font-family: var(--big);
    text-align: center;
    font-size: 42px;
    color: black;
    font-weight: 700;
    letter-spacing: 1px;
    padding-top: 100px;
}
.catodo__sub {
    color: #222222;
    font-family: var(--normal);
    font-size: 26px;
    font-weight: 100;
    display: inline-block;
    margin-left: 5px;
}
.catodo__items {
    padding: 50px;
}
.catodo__notasks {
    text-align: center;
    font-size: 20px;
    color: black;
    background-color: var(--grey);
    border: 3px solid black;
    padding: 20px;
}
.catodo__code {
    font-style: italic;
}
.catodo__howtodel {
    text-align: center;
    margin-bottom: 20px;
}
</style>
