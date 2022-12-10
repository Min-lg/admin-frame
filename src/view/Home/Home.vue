<!-- 组件说明 -->
<template>
    <el-row>
        <el-col :span="12">
            <div id="chart1"  style="height:300px"/>
        </el-col>
        <el-col :span="12">
            <div id="chart2"  style="height:300px"/>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
            <div id="chart3"  style="height:300px"/>
        </el-col>
        <el-col :span="12">
            <div id="chart4"  style="height:300px"/>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
            <div id="chart5"  style="height:300px"/>
        </el-col>
        <el-col :span="12">
            <div id="chart6"  style="height:300px"/>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
            <div id="chart7"  style="height:300px"/>
        </el-col>
        <el-col :span="12">
            <div id="chart8"  style="height:300px"/>
        </el-col>
    </el-row>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import echarts from '@/lib/echarts.js';
import wonderland from '@/lib/wonderland';
import {useSystem} from '@/store/system'


const system = useSystem();

let option = {
  xAxis: {
    type: 'category',
    data: ['A', 'B', 'C']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150],
      type: 'line'
    }
  ]
};

let myChart1;
let myChart2;
let myChart3;
let myChart4;
let myChart5;
let myChart6;
let myChart7;
let myChart8;

onMounted(()=>{
    echarts.registerTheme('wonderland', wonderland);
    myChart1 = echarts.init(document.getElementById('chart1'), 'wonderland');
    myChart2 = echarts.init(document.getElementById('chart2'), 'wonderland');
    myChart3 = echarts.init(document.getElementById('chart3'), 'wonderland');
    myChart4 = echarts.init(document.getElementById('chart4'), 'wonderland');
    myChart5 = echarts.init(document.getElementById('chart5'), 'wonderland');
    myChart6 = echarts.init(document.getElementById('chart6'), 'wonderland');
    myChart7 = echarts.init(document.getElementById('chart7'), 'wonderland');
    myChart8 = echarts.init(document.getElementById('chart8'), 'wonderland');
    myChart1.setOption(option);
    myChart2.setOption(option);
    myChart3.setOption(option);
    myChart4.setOption(option);
    myChart5.setOption(option);
    myChart6.setOption(option);
    myChart7.setOption(option);
    myChart8.setOption(option);
    setTimeout(()=>{
        system.isLoading = false;
    },1000);
})

onUnmounted(()=>{
    myChart1.dispose();
    myChart2.dispose();
    myChart3.dispose();
    myChart4.dispose();
    myChart5.dispose();
    myChart6.dispose();
    myChart7.dispose();
    myChart8.dispose();
})
</script>

<style scoped lang='scss'>
</style>