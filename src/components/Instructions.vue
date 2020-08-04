<template>
    <div :class="['cins', {'cins--active': visible}]">
        <h2 class="cins__title">📝 Instructions</h2>
        <p class="cins__subtitle">Here are all the commands you need to start managing your todo list.</p>
        <div class="cins__items">
            <div class="cins__item">
                <div class="catodo__command-cont">
                    <span class="catodo__command">Esc</span>
                </div>
                <span class="cins__desc">Close this window</span>
            </div>
            <div class="cins__item">
                <div class="catodo__command-cont">
                    <span class="catodo__command">Ctrl+i</span>
                </div>
                <span class="cins__desc">Open this window</span>
            </div>
            <div class="cins__item cins__item--section">
                <div class="catodo__command-cont">
                    <span class="catodo__command">Ctrl+n</span>
                </div>
                <span class="cins__desc">Create a new task</span>
            </div>
            <div class="cins__item">
                <div class="catodo__command-cont">
                    <span class="catodo__command">Enter</span> 
                </div>
                <span class="cins__desc">Save task</span>
            </div>
            <div class="cins__item">
                <div class="catodo__command-cont">
                    <span class="catodo__command">Esc</span> 
                </div>
                <span class="cins__desc">Abort task creation</span>
            </div>
            <div class="cins__item cins__item--section">
                <div class="catodo__command-cont">
                    <span class="catodo__command">Ctrl+d</span> 
                </div>
                <span class="cins__desc">Open task deletion popup</span>
            </div>
            <div class="cins__item">
                <div class="catodo__command-cont">
                    <span class="catodo__command">Esc</span> 
                </div>
                <span class="cins__desc">Abort task deletion</span>
            </div>
            <div class="cins__item">
                <div class="catodo__command-cont">
                    <span class="catodo__command catodo__command--small">Task id + Enter</span> 
                </div>
                <span class="cins__desc">Delete task</span>
            </div>
            <div class="cins__item">
                <div class="catodo__command-cont">
                    <span class="catodo__command catodo__command--small">Ctrl+0 (zero)</span> 
                </div>
                <span class="cins__desc">Delete all tasks</span>
            </div>
            <div class="cins__item cins__item--section">
                <div class="catodo__command-cont">
                    <span class="catodo__command">Ctrl+m</span> 
                </div>
                <span class="cins__desc">Toggle dark mode</span>
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
        width: 70%;
    }
    .cins__item {
        font-size: 12px;
    }
    .catodo__command-cont {
        width: 120px;
    }
}
</style>
