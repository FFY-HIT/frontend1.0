<template>
    <div class="stage-bar">
        <div v-for="(stage, index) in stages" :key="index" class="stage-item">
            <span>{{ stage }}</span>
            <div class="icon1" v-if="index > currentStage - 1">◉</div>
            <div class="icon" v-if="index < currentStage" >◉</div>
            <div class="timeStamp-text" v-if="index === 0" >{{ timeStamp[0] }}</div>
            <div class="timeStamp-text" v-if="index === 1" >{{ timeStamp[1] }}</div>
            <div class="timeStamp-text" v-if="index === 2" >{{ timeStamp[2] }}</div>
            <div class="timeStamp-text" v-if="index === 3" >{{ timeStamp[3] }}</div>
            <div class="timeStamp-text" v-if="index === 4" >{{ timeStamp[4] }}</div>
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
        },
        timeStamp:{
            type: Array,
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
.timeStamp-text {
    position: absolute;
    top: 40px; /* 调整文本位置 */
    left: 50%;
    transform: translateX(-50%);
    color: #333; /* 设置文本颜色 */
    font-size: 12px; /* 设置文本字号 */
}
</style>
