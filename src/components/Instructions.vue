<template>
    <div :class="['cins', {'cins--active': visible}]">
        <h2 class="cins__title">📝 Instructions</h2>
        <p class="cins__subtitle">Here are all the commands you need to start managing your todo list.</p>
        <div class="cins__items">
            <div class="cins__item">
                <span class="cins__command-cont">
                    <span class="catodo__command">Esc</span>
                </span>
                 Close this window
            </div>
            <div class="cins__item">
                <span class="cins__command-cont">
                    <span class="catodo__command">Ctrl+i</span>
                </span>
                 Open this window
            </div>
            <div class="cins__item cins__item--section">
                <span class="cins__command-cont">
                    <span class="catodo__command">Ctrl+n</span>
                </span>
                 Create a new task
            </div>
            <div class="cins__item">
                <span class="cins__command-cont">
                    <span class="catodo__command">Enter</span> 
                </span>
                Save task
            </div>
            <div class="cins__item">
                <span class="cins__command-cont">
                    <span class="catodo__command">Esc</span> 
                </span>
                Abort task creation
            </div>
            <div class="cins__item cins__item--section">
                <span class="cins__command-cont">
                    <span class="catodo__command">Ctrl+d</span> 
                </span>
                Open task deletion popup
            </div>
            <div class="cins__item">
                <span class="cins__command-cont">
                    <span class="catodo__command">Esc</span> 
                </span>
                Abort task deletion
            </div>
            <div class="cins__item">
                <span class="cins__command-cont">
                    <span class="catodo__command catodo__command--small">Task id + Enter</span> 
                </span>
                Delete task
            </div>
            <div class="cins__item">
                <span class="cins__command-cont">
                    <span class="catodo__command catodo__command--small">Ctrl+0 (zero)</span> 
                </span>
                Delete all tasks
            </div>
            <div class="cins__item cins__item--section">
                <span class="cins__command-cont">
                    <span class="catodo__command">Ctrl+m</span> 
                </span>
                Toggle dark mode
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['visible']
}
</script>

<style>
.cins {
    padding: 50px;
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    display: none;
    opacity: 0;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    background-color: white;
    animation: fadeInFromNone 200ms ease-out;
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
    margin-top: 40px;
}
.cins__item {
    margin-top: 20px;
}
.cins__item:first-child {
    margin-top: 0;
}
.cins__item.cins__item--section {
    margin-top: 40px;
}
.cins__command-cont {
    display: inline-block;
    min-width: 120px;
}
.catodo--dark .cins {
    background-color: var(--lightDark);
    box-shadow: var(--darkShadow);
}
</style>
