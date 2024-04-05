<template>
    <div class="stage-bar">
        <div v-for="(stage, index) in stages" :key="index" class="stage-item">
            <span>{{ stage }}</span>
            <div class="icon1" v-if="index > currentStage - 1">◉</div>
            <div class="icon" v-if="index < currentStage" >◉</div>
            <div class="arrow" v-if="index < stages.length - 1"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        stages: {
            type: Array,
            required: true
        },
        currentStage: {
            type: Number,
            required: true
        }
    }
};
</script>

<style>
.stage-bar {
    display: flex;
    justify-content: space-between;
}

.stage-item {
    position: relative;
    text-align: center;
    flex: 1;
}

.icon {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    color: #00FF00;
}
.icon1 {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    color: #aaa;
}
.arrow {
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-left: 21px solid #aaa;
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
}
</style>
