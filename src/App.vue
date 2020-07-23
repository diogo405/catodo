<template>
    <div id="app" class="catodo" @keyup="keyUp" @keydown="keyDown" tabindex="0" ref="app">
        <div class="catodo__info">Ctrl+i for instructions</div>
        <h1 class="catodo__title">
            catodo 😺 <span class="catodo__sub">A mouseless todo list</span>
        </h1>
        <div class="catodo__items">
            <input v-show="newTask.visible" class="catodo__new" ref="new">
            <div class="catodo__notasks" v-if="tasks.length === 0 && !newTask.visible">
                No tasks yet 🤷🏻‍♀️ 
                To create a new task hit <span class="catodo__code">Ctrl+n</span>
            </div>
            <Task v-else v-for="task in tasks" :text="task.text" :key="task.text"/>
        </div>
        <Instructions :visible="instructions.visible"/>
    </div>
</template>

<script>
import Task from '@/components/Task'
import Instructions from '@/components/Instructions'
export default {
    name: 'app',
    components: {Task, Instructions},
    data() {
        return {
            tasks: [],
            ctrlPressed: false,
            instructions: {
                visible: false
            },
            newTask: {
                visible: false,
                text: ''      
            }
        }
    },
    methods: {
        getTasks() {
            this.tasks = JSON.parse(sessionStorage.getItem('tasks'))
            this.tasks = this.tasks || []
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
            // Ctrl+ n
            if (this.ctrlPressed && event.keyCode === 78) {
                this.ctrlPressed = false // avoid double trigger
                this.newTask.visible = true
                this.$nextTick(() => { this.$refs.new.focus() })
            }
            // Ctrl + i
            if (this.ctrlPressed && event.keyCode === 73) {
                this.ctrlPressed = false
                this.instructions.visible = true
            }

            if (this.ctrlPressed && event.keyCode === 88) {
                this.ctrlPressed = false
                this.instructions.visible = false
            }
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
    position: relative;
}
.catodo__info {
    position: fixed;
    top: 0;
    right: 0;
    font-size: 14px;
    color: black;
    background-color: #A6BDAC;
    padding: 15px;
    border: 3px solid black;
    border-top: none;
    border-right: none;
}
.catodo__title {
    font-family: var(--big);
    text-align: center;
    margin-top: 100px;
    font-size: 42px;
    color: black;
    font-weight: 700;
    letter-spacing: 1px;
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
    padding: 100px 50px 50px 50px;
}
.catodo__notasks {
    text-align: center;
    font-size: 20px;
    color: black;
    background-color: #E2C8CA;
    border: 3px solid black;
    padding: 20px;
}
.catodo__code {
    font-style: italic;
}
.catodo__new {
    font-size: 20px;
    color: black;
    background-color: #E2C8CA;
    border: 3px solid black;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
}
</style>
