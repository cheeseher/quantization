<template>
  <div class="records-container p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">交易记录</h1>
      <router-link to="/" class="bg-blue-600 text-white px-4 py-2 rounded-lg">返回主页</router-link>
    </div>
    
    <div v-if="records.length === 0" class="text-center py-8 bg-white rounded-lg shadow">
      <p class="text-gray-500">暂无交易记录</p>
    </div>
    
    <div v-else class="records-list">
      <div 
        v-for="(record, index) in records" 
        :key="index" 
        class="record-item bg-white p-4 rounded-lg shadow mb-4"
      >
        <div class="flex justify-between mb-2">
          <span class="font-semibold">{{ record.coin }}/USDT</span>
          <span class="text-gray-500">{{ record.time }}</span>
        </div>
        
        <div class="flex justify-between mb-2">
          <span>方向:</span>
          <span :class="{'text-green-600': record.direction === 'LONG', 'text-red-600': record.direction === 'SHORT'}">
            {{ record.direction === 'LONG' ? '做多' : '做空' }}
          </span>
        </div>
        
        <div class="flex justify-between mb-2">
          <span>建仓价:</span>
          <span>{{ record.entryPrice }}</span>
        </div>
        
        <div class="flex justify-between mb-2">
          <span>止损价:</span>
          <span>{{ record.stopLossPrice }}</span>
        </div>
        
        <div class="mb-2">
          <div class="font-semibold mb-1">加仓记录:</div>
          <div v-if="record.additionalPositions.length === 0" class="text-gray-500 text-sm">
            暂无加仓
          </div>
          <div 
            v-for="(position, idx) in record.additionalPositions" 
            :key="idx"
            class="text-sm"
          >
            {{ position.time }} - {{ position.price }} - {{ position.amount }} USDT
          </div>
        </div>
        
        <div class="mb-2">
          <div class="font-semibold mb-1">平仓记录:</div>
          <div v-if="record.closingPositions.length === 0" class="text-gray-500 text-sm">
            暂无平仓
          </div>
          <div 
            v-for="(position, idx) in record.closingPositions" 
            :key="idx"
            class="text-sm"
          >
            {{ position.time }} - {{ position.price }} - {{ position.percent }}% - {{ position.pnl }} USDT
          </div>
        </div>
        
        <div class="flex justify-between font-semibold" v-if="record.finished">
          <span>总盈亏:</span>
          <span :class="{'text-green-600': record.totalPnl > 0, 'text-red-600': record.totalPnl < 0}">
            {{ record.totalPnl > 0 ? '+' : '' }}{{ record.totalPnl }} USDT
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 模拟数据，实际将从API获取
const records = ref([
  {
    coin: 'BTC',
    time: '2023-08-15 14:30',
    direction: 'LONG',
    entryPrice: 30000,
    stopLossPrice: 29400,
    additionalPositions: [
      { time: '2023-08-15 16:45', price: 33000, amount: 50 }
    ],
    closingPositions: [
      { time: '2023-08-15 17:30', price: 36000, percent: 20, pnl: 100 },
      { time: '2023-08-15 19:20', price: 45000, percent: 50, pnl: 300 }
    ],
    finished: true,
    totalPnl: 400
  },
  {
    coin: 'ETH',
    time: '2023-08-14 10:15',
    direction: 'SHORT',
    entryPrice: 1800,
    stopLossPrice: 1836,
    additionalPositions: [],
    closingPositions: [
      { time: '2023-08-14 13:45', price: 1600, percent: 100, pnl: 200 }
    ],
    finished: true,
    totalPnl: 200
  }
])
</script>

<style scoped>
.records-container {
  max-width: 600px;
  margin: 0 auto;
}
</style> 