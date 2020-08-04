<template>
    <div :class="['cins', {'cins--active': visible}]">
        <h2 class="cins__title">📝 Instructions</h2>
        <p class="cins__subtitle">Here are all the commands you need to start managing your todo list.</p>
        <div class="cins__items">
            <div v-for="instruction in instructions" :class="['cins__item', {'cins__item--section': instruction.space}]">
                <div class="catodo__command-cont">
                    <span class="catodo__command catodo__command--small">{{instruction.cmd}}</span>
                </div>
                <span class="cins__desc">{{instruction.label}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['visible'],
    data() {
        return {
            instructions: [
                {cmd: 'Esc', label: 'Close this window'},
                {cmd: 'Ctrl+i', label: 'Open this window'},
                {cmd: 'Ctrl+n', label: 'Create a new task', space: true},
                {cmd: 'Enter', label: 'Save task'},
                {cmd: 'Esc', label: 'Abort task creation'},
                {cmd: 'Ctrl+d', label: 'Open task deletion popup', space: true},
                {cmd: 'Esc', label: 'Abort task deletion'},
                {cmd: 'Task id + Enter', label: 'Delete task'},
                {cmd: 'Ctrl+0 (zero)', label: 'Delete all tasks'},
                {cmd: 'Ctrl+t', label: 'Move task popup', space: true},
                {cmd: 'Esc', label: 'Abort move task'},
                {cmd: 'Task id + Enter', label: 'Move task'},
                {cmd: 'Ctrl+m', label: 'Toggle dark mode', space: true}
            ]
        }
    }
}
</script>

<style>
.cins {
    padding: 40px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: none;
    opacity: 0;
    border-bottom-left-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
    box-shadow: var(--shadow);
    background-color: white;
    animation: fadeInFromNone 200ms ease-out;
    width: 80%;
    max-width: 500px;
    box-sizing: border-box;
    z-index: 2;
}
.cins--active {
    opacity: 1;
    display: block;
}
.cins__title {
    font-weight: 700;
    font-size: 22px;
}
.cins__subtitle {
    margin-top: 10px;
    font-size: 14px;
}
.cins__items {
    margin-top: 30px;
}
.cins__item {
    margin-top: 15px;
    display: flex;
}
.cins__item:first-child {
    margin-top: 0;
}
.catodo__command-cont {
    width: 200px;
    flex-shrink: 0;
}
.cins__item.cins__item--section {
    margin-top: 40px;
}
.catodo--dark .cins {
    background-color: var(--lightDark);
    box-shadow: var(--darkShadow);
}

@media (max-width: 576px) {
    .cins {
        padding: 25px;
    }
    .cins__item {
        font-size: 12px;
    }
    .catodo__command-cont {
        width: 120px;
    }
}
</style>
