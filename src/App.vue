<template>
    <div id="app" class="catodo" @keyup="keyUp" @keydown="keyDown" tabindex="0" ref="app">
        <h1 class="catodo__title">
            catodo 😺 <span class="catodo__sub">A mouseless todo list</span>
        </h1>
        <div class="catodo__items">
            <div class="catodo__howto" v-if="tasks.length > 0">
                💡 <span class="catodo__code">Ctrl+d</span> to delete a task; <span class="catodo__code">Ctrl+s</span> to mark as done
            </div>
            <NewTask :visible="visible.newTaskPopup" ref="newTask" @update="update()"/>
            <div class="catodo__notasks" v-if="tasks.length === 0 && !visible.newTaskPopup">
                No tasks yet 🤷🏻‍♀️ 
                To create a new task hit <span class="catodo__code">Ctrl+n</span>
            </div>
            <Task v-else v-for="task in tasks" :task="task" :key="task.text"/>
        </div>
        <Instructions :visible="visible.instructions"/>
        <TaskPopup 
            :visible="visible.deleteTaskPopup" 
            label="Enter the task id to be deleted: "
            ref="deleteTask" 
            @update="update()"
        />
        <TaskPopup 
            :visible="visible.markAsDonePopup" 
            label="Enter the task id to be marked as done: " 
            ref="doneTask" 
            @update="update()"
        />
        <div class="catodo__info">Ctrl+i for instructions</div>
    </div>
</template>

<script>
import {Storage} from '@/storage'
import Task from '@/components/Task'
import TaskPopup from '@/components/TaskPopup'
import NewTask from '@/components/NewTask'
import Instructions from '@/components/Instructions'
import {EventBus} from '@/eventBus'
export default {
    name: 'app',
    components: {TaskPopup, NewTask, Task, Instructions},
    data() {
        return {
            tasks: [],
            ctrlPressed: false,
            visible: {
                instructions: false,
                newTaskPopup: false,
                deleteTaskPopup: false,
                markAsDonePopup: false
            }
        }
    },
    methods: {
        getTasks() {
            this.tasks = Storage.getTasks()
        },
        keyDown(event) {
            //console.log(event.keyCode)
            if (event.keyCode === 17) {
                this.ctrlPressed = true
            }
        },
        keyUp(event) {
            if (event.keyCode === 17) {
                this.ctrlPressed = false
            }

            // Ctrl + n (new task)
            if (this.ctrlPressed && event.keyCode === 78) {
                this.ctrlPressed = false // avoid double trigger
                this.hidePopups()
                this.visible.newTaskPopup = true
                this.$nextTick(() => { this.$refs.newTask.$refs.new.focus() })
            }

            // Ctrl + i (open instructions)
            if (this.ctrlPressed && event.keyCode === 73) {
                this.ctrlPressed = false
                this.visible.instructions = true
            }

            // Esc (close instructions)
            if (this.visible.instructions && event.keyCode === 27) {
                this.visible.instructions = false
            }

            // Enter (save new task)
            if (this.visible.newTaskPopup && event.keyCode === 13) {
                this.ctrlPressed = false
                EventBus.$emit('save-task')
            }

            // Enter (delete task)
            if (this.visible.deleteTaskPopup && event.keyCode === 13) {
                this.ctrlPressed = false
                EventBus.$emit('update-task', {action: 'DELETE'})
            }

            // Enter (mark as done task)
            if (this.visible.markAsDonePopup && event.keyCode === 13) {
                this.ctrlPressed = false
                EventBus.$emit('update-task', {action: 'DONE'})
            }

            // Esc (abort new task)
            if (this.visible.newTaskPopup && event.keyCode === 27) {
                this.visible.newTaskPopup = false
                EventBus.$emit('abort-task')
                this.$nextTick(() => { this.$refs.app.focus() })
            }

            // Esc (abort delete task)
            if (this.visible.deleteTaskPopup && event.keyCode === 27) {
                this.visible.deleteTaskPopup = false
                this.$nextTick(() => { this.$refs.app.focus() })
            }

            // Esc (abort mark as done task)
            if (this.visible.markAsDonePopup && event.keyCode === 27) {
                this.visible.markAsDonePopup = false
                this.$nextTick(() => { this.$refs.app.focus() })
            }

            // Ctrl + 0 (zero - delete all tasks)
            if (this.ctrlPressed && event.keyCode === 48) {
                this.ctrlPressed = false
                Storage.deleteAllTasks()
                this.update()   
            }

            // Ctrl + d (delete task)
            if (this.ctrlPressed && event.keyCode === 68 && this.tasks.length > 0) {
                this.hidePopups()
                this.visible.deleteTaskPopup = true
                this.$nextTick(() => { this.$refs.deleteTask.$refs.input.focus() })
            }

            // Ctrl + s (mark as done)
            if (this.ctrlPressed && event.keyCode === 83 && this.tasks.length > 0) {
                this.ctrlPressed = false
                this.hidePopups()
                this.visible.markAsDonePopup = true
                this.$nextTick(() => { this.$refs.doneTask.$refs.input.focus() })
            }

        },
        hidePopups() {
            this.visible.newTaskPopup = false
            this.visible.deleteTaskPopup = false
            this.visible.markAsDonePopup = false
        },
        update() {
            this.hidePopups()
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
.catodo__howto {
    margin-bottom: 20px;
    font-size: 14px;
}
</style>
