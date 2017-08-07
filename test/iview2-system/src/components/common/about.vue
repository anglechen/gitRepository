<style scoped>

.about {
  margin: 10px 20px 0 30px;
  color: black;
}

</style>

<template>

<div class="about">
    <vue-markdown># 后台管理系统</vue-markdown>
    <vue-markdown>-------------------</vue-markdown>
    <vue-markdown>### 基于Vue2 + iView2.0 </vue-markdown>
    <br/><br/>
    <vue-markdown># 自述</vue-markdown>
    <vue-markdown>-------------------</vue-markdown>
    <vue-markdown>### iView 是一套高效美观的 Vue2 UI 框架。主要适合大中型中后台产品，比如某产品的运营平台、数据监控平台、管理平台等，从工程配置、到样式布局，甚至后面规划的业务套件，是一整套的解决方案，十分适合快速开发。
    </vue-markdown>

</div>

</template>

<script>

import VueMarkdown from 'vue-markdown'
export default {
    components: {
        VueMarkdown
    }
}

</script>
