<template>
    <div id="app" :class="['catodo', {'catodo--dark': darkMode}] " @keyup="keyUp" @keydown="keyDown" tabindex="0" ref="app">
        <h1 class="catodo__title">
            catodo <span class="catodo__icon">😺</span> <span class="catodo__sub">
                <span>A</span>
                <span class="catodo__sub-space"> m</span>
                <span>o</span>
                <span>u</span>
                <span>s</span>
                <span>e</span>
                <span>l</span>
                <span>e</span>
                <span>s</span>
                <span>s</span>
                <span class="catodo__sub-space"> t</span>
                <span>o</span>                
                <span>d</span>                
                <span>o</span>
                <span class="catodo__sub-space"> l</span>
                <span>i</span>                
                <span>s</span>                
                <span>t</span>                
            </span>
        </h1>
        <div class="catodo__items">
            <div class="catodo__howtos" v-if="tasks.length > 0">
                <div class="catodo__howto">
                    <span class="catodo__command catodo__command--small">Ctrl+d</span> to delete a task 
                </div>
                <div class="catodo__howto">
                    <span class="catodo__command catodo__command--small">Ctrl+s</span> to mark as done
                </div>
            </div>
            <NewTask :visible="visible.newTaskPopup" ref="newTask" @update="update()"/>
            <div class="catodo__notasks" v-if="tasks.length === 0 && !visible.newTaskPopup">
                No tasks yet. To create a task hit <span class="catodo__command">Ctrl+n</span>
            </div>
            <Task v-else v-for="task in tasks" :task="task" :key="task.text"/>
        </div>
        <TaskPanel :tasks="tasks"/>
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
        <TaskPopup 
            :visible="visible.moveTopTaskPopup" 
            label="Enter the task id to move to top: " 
            ref="topTask" 
            @update="update()"
        />
        <div class="catodo__info">
            <span class="catodo__command">Ctrl+i</span> for instructions
        </div>
    </div>
</template>

<script>
import {Storage} from '@/storage'
import Task from '@/components/Task'
import TaskPopup from '@/components/TaskPopup'
import NewTask from '@/components/NewTask'
import TaskPanel from '@/components/TaskPanel'
import Instructions from '@/components/Instructions'
import {EventBus} from '@/eventBus'
import './assets/css/subtitle.css'

export default {
    name: 'app',
    components: {TaskPopup, NewTask, Task, Instructions, TaskPanel},
    data() {
        return {
            tasks: [],
            ctrlPressed: false,
            visible: {
                instructions: false,
                newTaskPopup: false,
                deleteTaskPopup: false,
                markAsDonePopup: false,
                moveTopTaskPopup: false
            },
            darkMode: false
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

            // Enter (move to top)
            if (this.visible.moveTopTaskPopup && event.keyCode === 13) {
                this.ctrlPressed = false
                EventBus.$emit('update-task', {action: 'TOP'})
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

            // Esc (abort move to top)
            if (this.visible.moveTopTaskPopup && event.keyCode === 27) {
                this.visible.moveTopTaskPopup = false
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

            // Ctrl + t (move to top)
            if (this.ctrlPressed && event.keyCode === 84 && this.tasks.length > 0) {
                this.ctrlPressed = false
                this.hidePopups()
                this.visible.moveTopTaskPopup = true
                this.$nextTick(() => { this.$refs.topTask.$refs.input.focus() })
            }

            // Ctrl + m (toggle dark mode)
            if (this.ctrlPressed && event.keyCode === 77) {
                this.ctrlPressed = false
                this.darkMode = !this.darkMode
            }

        },
        hidePopups() {
            this.visible.newTaskPopup = false
            this.visible.deleteTaskPopup = false
            this.visible.markAsDonePopup = false
            this.visible.moveTopTaskPopup = false
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
    font-family: var(--font);
    background-color: white; 
    color: var(--dark);
    transition: background-color 300ms ease-out;
    overflow: scroll;
}
.catodo__info {
    position: absolute;
    font-size: 14px;
    background: var(--lightBlue);
    padding: 20px;
    top: 0;
    right: 0;
    border-bottom-left-radius: var(--radius);
}
.catodo__title {
    font-family: var(--font);
    font-weight: 700;
    text-align: center;
    font-size: 32px;
    letter-spacing: 1px;
    padding: 70px 70px 0 70px;
}
.catodo__icon {
    animation: moveHead 0.5s ease-out;
    animation-delay: 2s;
    display: inline-block;
}
.catodo__items {
    padding: 100px;
}
.catodo__notasks {
    text-align: center;
    font-size: 16px;
    line-height: 30px;
}
.catodo__howtos {
    margin-bottom: 20px;
    font-size: 14px;
    display: flex;
}
.catodo__howto {
    margin-right: 10px;
    line-height: 25px;
}
.catodo--dark.catodo {
    background-color: var(--dark); 
    color: white;
    font-weight: 700;
}
.catodo--dark .catodo__info {
    background-color: var(--lightDark);
}

@keyframes moveHead {
    0% {
        transform: rotate(0);
    }
    20% {
        transform: rotate(40deg);
    }
    40% {
        transform: rotate(0);
    }
}

@media (max-width: 576px) {
    .catodo__items {
        padding: 70px;
    }

    .catodo__howtos {
        flex-direction: column;
    }

    .catodo__howto {
        margin-top: 20px;
    }

    .catodo__howto:first-child {
        margin-top: 0;
    }
}
</style>
