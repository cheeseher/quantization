<template>
  <div class="monitor-container p-4">
    <h1 class="text-2xl font-bold mb-4">策略监控</h1>
    
    <!-- 无持仓状态 -->
    <div v-if="!hasPosition" class="empty-state bg-white p-8 rounded-lg shadow text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      <h2 class="text-lg font-semibold mb-2">暂无持仓</h2>
      <p class="text-gray-500 mb-4">当前没有激活的交易策略</p>
      <router-link to="/" class="bg-blue-600 text-white px-6 py-2 rounded-lg inline-block">
        去开仓
      </router-link>
    </div>
    
    <!-- 持仓状态 -->
    <div v-else>
      <!-- 概览卡片 -->
      <div class="overview-card bg-white p-4 rounded-lg shadow mb-4">
        <div class="flex justify-between items-center mb-3">
          <div class="flex items-center">
            <span class="text-lg font-bold mr-2">{{ position.symbol }}</span>
            <span class="px-2 py-1 rounded text-sm font-medium" 
                  :class="{'bg-green-100 text-green-800': position.direction === 'LONG', 
                           'bg-red-100 text-red-800': position.direction === 'SHORT'}">
              {{ position.direction === 'LONG' ? '多仓' : '空仓' }}
            </span>
          </div>
          <span class="text-gray-500">{{ position.openTime }}</span>
        </div>
        
        <div class="grid grid-cols-2 gap-2 mb-3">
          <div class="stat-item">
            <div class="text-sm text-gray-500">开仓价</div>
            <div class="font-semibold">{{ position.entryPrice }}</div>
          </div>
          <div class="stat-item">
            <div class="text-sm text-gray-500">当前价</div>
            <div class="font-semibold">{{ position.currentPrice }}</div>
          </div>
          <div class="stat-item">
            <div class="text-sm text-gray-500">仓位大小</div>
            <div class="font-semibold">{{ position.size }} USDT</div>
          </div>
          <div class="stat-item">
            <div class="text-sm text-gray-500">杠杆倍数</div>
            <div class="font-semibold">{{ position.leverage }}×</div>
          </div>
        </div>
        
        <div class="pnl-info p-3 rounded-lg mb-3"
             :class="{'bg-green-50': position.pnlPercent > 0, 'bg-red-50': position.pnlPercent < 0}">
          <div class="flex justify-between">
            <span>未实现盈亏:</span>
            <span class="font-bold" 
                  :class="{'text-green-600': position.pnlPercent > 0, 'text-red-600': position.pnlPercent < 0}">
              {{ position.pnlPercent > 0 ? '+' : '' }}{{ position.pnlPercent }}% ({{ position.pnlAmount }} USDT)
            </span>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-2">
          <button class="bg-yellow-500 text-white py-2 rounded-lg font-medium">调整止盈止损</button>
          <button class="bg-red-600 text-white py-2 rounded-lg font-medium">立即平仓</button>
        </div>
      </div>
      
      <!-- 策略执行状态 -->
      <div class="strategy-status bg-white p-4 rounded-lg shadow mb-4">
        <h2 class="text-lg font-semibold mb-3">策略执行状态</h2>
        
        <div class="mb-3">
          <div class="flex justify-between mb-1">
            <span class="text-sm">止损设置</span>
            <span class="text-sm font-medium">{{ position.stopLossPrice }} ({{ position.stopLossPercent }}%)</span>
          </div>
          <div class="relative h-2 bg-gray-200 rounded-full">
            <div class="absolute left-0 top-0 h-full bg-red-500 rounded-full" 
                 :style="{width: getStopLossWidth()}"></div>
          </div>
        </div>
        
        <div class="mb-4">
          <div class="flex justify-between mb-1">
            <span class="text-sm">止盈目标</span>
            <span class="text-sm font-medium">{{ position.takeProfitLevels.join('% → ') }}%</span>
          </div>
          <div class="relative h-2 bg-gray-200 rounded-full">
            <div class="absolute left-0 top-0 h-full bg-green-500 rounded-full" 
                 :style="{width: getProfitProgressWidth()}"></div>
          </div>
        </div>
        
        <h3 class="font-medium mb-2">策略执行进度</h3>
        <ul class="strategy-progress space-y-3">
          <li v-for="(step, index) in strategySteps" :key="index" 
              class="flex items-start">
            <div class="step-status mr-3 mt-1" :class="{'step-completed': step.completed}">
              <div class="status-circle"></div>
              <div v-if="index < strategySteps.length - 1" class="status-line"></div>
            </div>
            <div>
              <div class="text-sm font-medium" :class="{'text-blue-600': step.completed}">
                {{ step.title }}
              </div>
              <div class="text-xs text-gray-500">{{ step.description }}</div>
            </div>
          </li>
        </ul>
      </div>
      
      <!-- 额外操作 -->
      <div class="additional-actions bg-white p-4 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-3">额外操作</h2>
        <button class="w-full bg-blue-600 text-white py-2 rounded-lg font-medium mb-2">
          手动加仓
        </button>
        <button class="w-full bg-gray-600 text-white py-2 rounded-lg font-medium">
          切换追踪止盈
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 模拟数据，实际应从API获取
const hasPosition = ref(true)

const position = ref({
  symbol: 'BTC/USDT',
  direction: 'LONG',
  openTime: '2023-08-16 10:30',
  entryPrice: 30000,
  currentPrice: 32400,
  size: 200,
  leverage: 10,
  pnlPercent: 8,
  pnlAmount: 16,
  stopLossPrice: 29400,
  stopLossPercent: 2,
  takeProfitLevels: [20, 50, 100],
  additionalPositions: []
})

const strategySteps = ref([
  {
    title: '初始建仓',
    description: '2023-08-16 10:30 以 30000 开仓',
    completed: true
  },
  {
    title: '第一次加仓',
    description: '盈利达到 10% 时加仓',
    completed: false
  },
  {
    title: '第一次止盈',
    description: '盈利达到 20% 时平仓 1/3',
    completed: false
  },
  {
    title: '第二次止盈',
    description: '盈利达到 50% 时平仓 1/3',
    completed: false
  },
  {
    title: '追踪止盈',
    description: '剩余仓位设置 5% 回撤止盈',
    completed: false
  }
])

// 计算止损进度条宽度
const getStopLossWidth = () => {
  const currentPrice = position.value.currentPrice
  const entryPrice = position.value.entryPrice
  const stopLossPrice = position.value.stopLossPrice
  
  if (position.value.direction === 'LONG') {
    const total = entryPrice - stopLossPrice
    const current = currentPrice - stopLossPrice
    return `${Math.min(100, Math.max(0, (current / total) * 100))}%`
  } else {
    const total = stopLossPrice - entryPrice
    const current = stopLossPrice - currentPrice
    return `${Math.min(100, Math.max(0, (current / total) * 100))}%`
  }
}

// 计算止盈进度条宽度
const getProfitProgressWidth = () => {
  // 根据盈利百分比与第一个止盈目标的比例计算
  const pnlPercent = position.value.pnlPercent
  const firstTarget = position.value.takeProfitLevels[0]
  return `${Math.min(100, (pnlPercent / firstTarget) * 100)}%`
}
</script>

<style scoped>
.monitor-container {
  max-width: 600px;
  margin: 0 auto;
}

.strategy-progress .step-status {
  position: relative;
}

.status-circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #e5e7eb;
  border: 2px solid #d1d5db;
}

.status-line {
  position: absolute;
  left: 8px;
  top: 16px;
  width: 2px;
  height: calc(100% + 12px);
  background-color: #d1d5db;
  transform: translateX(-50%);
}

.step-completed .status-circle {
  background-color: #3b82f6;
  border-color: #2563eb;
}

.step-completed .status-line {
  background-color: #3b82f6;
}
</style> 