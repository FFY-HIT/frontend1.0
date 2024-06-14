<template>
    <div>
        <!-- 图片容器 -->
        <div style="position: relative;">
            <!-- 图片 -->
            <img src="../../../static/img/system.png" alt="图片描述">

            <button class="image-button1" @click="redirectToPage('/publisher_strategy')">🏠</button>
            <button class="image-button2" @click="redirectToPage('/com_admin')">🏠</button>
            <button class="image-button3" @click="redirectToPage('/key_admin')">🏠</button>
            <button class="image-button4" @click="redirectToPage('/logger_strategy')">🏠</button>
            <button class="image-button5" @click="redirectToPage('/announcement_admin')">🏠</button>
            <button class="image-button6" @click="redirectToPage('/announcement_overview')">🏠</button>
            <button class="image-button7" @click="redirectToPage('/announcemen_overview')">🏠</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        redirectToPage(link) {
            // 在这里编写点击按钮后跳转到指定链接的逻辑
            // 例如，使用Vue Router:
            this.$router.push(link);
        }
    }
}
</script>

<style scoped>
.image-button1 {
    position: absolute;
    top: 225px;
    left: 190px;
    border: none; /* 隐藏按钮的边框 */
    background: none; /* 清除按钮的背景 */
    cursor: pointer; /* 鼠标悬停时显示手型光标 */
    outline: none; /* 移除聚焦时的外边框 */
    padding: 0; /* 去除内边距 */
}

.image-button2 {
    position: absolute;
    top: 296px;
    left: 190px;
    border: none; /* 隐藏按钮的边框 */
    background: none; /* 清除按钮的背景 */
    cursor: pointer; /* 鼠标悬停时显示手型光标 */
    outline: none; /* 移除聚焦时的外边框 */
    padding: 0; /* 去除内边距 */
}
.image-button3 {
    position: absolute;
    top: 367px;
    left: 190px;
    border: none; /* 隐藏按钮的边框 */
    background: none; /* 清除按钮的背景 */
    cursor: pointer; /* 鼠标悬停时显示手型光标 */
    outline: none; /* 移除聚焦时的外边框 */
    padding: 0; /* 去除内边距 */
}
.image-button4 {
    position: absolute;
    top: 438px;
    left: 190px;
    border: none; /* 隐藏按钮的边框 */
    background: none; /* 清除按钮的背景 */
    cursor: pointer; /* 鼠标悬停时显示手型光标 */
    outline: none; /* 移除聚焦时的外边框 */
    padding: 0; /* 去除内边距 */
}
.image-button5 {
    position: absolute;
    top: 87px;
    left: 805px;
    border: none; /* 隐藏按钮的边框 */
    background: none; /* 清除按钮的背景 */
    cursor: pointer; /* 鼠标悬停时显示手型光标 */
    outline: none; /* 移除聚焦时的外边框 */
    padding: 0; /* 去除内边距 */
}
.image-button6 {
    position: absolute;
    top: 145px;
    left: 975px;
    border: none; /* 隐藏按钮的边框 */
    background: none; /* 清除按钮的背景 */
    cursor: pointer; /* 鼠标悬停时显示手型光标 */
    outline: none; /* 移除聚焦时的外边框 */
    padding: 0; /* 去除内边距 */
}
.image-button7 {
    position: absolute;
    top: 526px;
    left: 380px;
    border: none; /* 隐藏按钮的边框 */
    background: none; /* 清除按钮的背景 */
    cursor: pointer; /* 鼠标悬停时显示手型光标 */
    outline: none; /* 移除聚焦时的外边框 */
    padding: 0; /* 去除内边距 */
}
</style>
