<template>
  <div class="settings-container p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">策略设置</h1>
      <button @click="createNewStrategy" class="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
        新建策略
      </button>
    </div>
    
    <!-- 策略卡片列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="strategy in strategies" :key="strategy.id" class="bg-white rounded-lg shadow">
        <!-- 策略卡片 -->
        <div v-if="!strategy.isEditing" class="p-4">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-semibold mb-1">{{ strategy.name }}</h3>
            </div>
            <div class="flex gap-2">
              <button @click="strategy.isEditing = true" 
                class="text-blue-600 hover:text-blue-700 px-3 py-1 rounded-md hover:bg-blue-50">
                编辑
              </button>
              <button @click="deleteStrategy(strategy.id)"
                class="text-red-600 hover:text-red-700 px-3 py-1 rounded-md hover:bg-red-50">
                删除
              </button>
            </div>
          </div>
          
          <!-- 策略概览 -->
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">执行时间</span>
              <span class="font-medium">{{ strategy.executionHours }}小时</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">杠杆倍数</span>
              <span class="font-medium">{{ strategy.leverage }}×</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">初始仓位</span>
              <span class="font-medium">{{ strategy.initialPositionPercent }}%</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">止损幅度</span>
              <span class="font-medium">{{ strategy.stopLossPercent }}%</span>
            </div>
          </div>
        </div>

        <!-- 策略编辑表单 -->
        <div v-else class="p-4">
          <div class="flex justify-between items-center mb-4">
            <input 
              v-model="strategy.name"
              class="text-lg font-semibold px-2 py-1 border rounded"
              :placeholder="'策略名称'"
            />
            <button @click="strategy.isEditing = false" 
              class="text-gray-600 hover:text-gray-700 px-3 py-1 rounded-md hover:bg-gray-50">
              关闭
            </button>
          </div>

          <!-- 策略执行时间 -->
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">策略执行时间（小时）</label>
            <input 
              type="number" 
              v-model="strategy.executionHours" 
              min="1" 
              max="8" 
              step="1"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
            <p class="text-xs text-gray-500 mt-1">可设置 1-8 小时</p>
          </div>

          <!-- 杠杆配置 -->
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">杠杆倍数</label>
            <input 
              type="number" 
              v-model="strategy.leverage" 
              min="1" 
              max="20" 
              step="1"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
            <p class="text-xs text-gray-500 mt-1">可设置 1-20 倍</p>
          </div>
          
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">初始仓位比例（%）</label>
            <input 
              type="number" 
              v-model="strategy.initialPositionPercent" 
              min="1" 
              max="5" 
              step="0.1"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
            <p class="text-xs text-gray-500 mt-1">可设置 1-5%</p>
          </div>
          
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">止损幅度（%）</label>
            <input 
              type="number" 
              v-model="strategy.stopLossPercent" 
              min="1" 
              max="5" 
              step="0.1"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
            <p class="text-xs text-gray-500 mt-1">可设置 1-5%</p>
          </div>
          
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">加仓触发盈利（%）</label>
            <input 
              type="number" 
              v-model="strategy.addPositionTriggerPercent" 
              min="5" 
              max="20" 
              step="1"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
            <p class="text-xs text-gray-500 mt-1">可设置 5-20%</p>
          </div>
          
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">加仓比例（%）</label>
            <input 
              type="number" 
              v-model="strategy.addPositionPercent" 
              min="5" 
              max="20" 
              step="1"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
            <p class="text-xs text-gray-500 mt-1">可设置 5-20%</p>
          </div>
          
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">第一次止盈（%）</label>
            <input 
              type="number" 
              v-model="strategy.firstTakeProfitPercent" 
              min="10" 
              max="30" 
              step="1"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
            <p class="text-xs text-gray-500 mt-1">可设置 10-30%</p>
          </div>
          
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">第二次止盈（%）</label>
            <input 
              type="number" 
              v-model="strategy.secondTakeProfitPercent" 
              min="30" 
              max="70" 
              step="1"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
            <p class="text-xs text-gray-500 mt-1">可设置 30-70%</p>
          </div>
          
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">追踪止盈回撤（%）</label>
            <input 
              type="number" 
              v-model="strategy.trailingStopPercent" 
              min="1" 
              max="10" 
              step="0.5"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
            <p class="text-xs text-gray-500 mt-1">可设置 1-10%</p>
          </div>
          
          <button @click="saveStrategy(strategy.id)" class="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            保存策略
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 策略数据结构
const createStrategyData = (id, name = '新策略') => ({
  id,
  name,
  isEditing: false,
  executionHours: 4,
  leverage: 10,
  initialPositionPercent: 2,
  stopLossPercent: 2,
  addPositionTriggerPercent: 10,
  addPositionPercent: 10,
  firstTakeProfitPercent: 20,
  secondTakeProfitPercent: 50,
  trailingStopPercent: 5
})

// 策略列表
const strategies = ref([
  createStrategyData(1, '策略 1')
])

// 创建新策略
const createNewStrategy = () => {
  const newId = Math.max(0, ...strategies.value.map(s => s.id)) + 1
  const newStrategy = createStrategyData(newId, `策略 ${newId}`)
  newStrategy.isEditing = true // 新建策略时直接进入编辑模式
  strategies.value.push(newStrategy)
}

// 删除策略
const deleteStrategy = (id) => {
  if (strategies.value.length > 1) {
    strategies.value = strategies.value.filter(s => s.id !== id)
  }
}

// 保存策略
const saveStrategy = (id) => {
  const strategy = strategies.value.find(s => s.id === id)
  if (strategy) {
    strategy.isEditing = false
    // TODO: 实现保存逻辑
    console.log('保存策略:', id)
  }
}
</script>

<style scoped>
.settings-container {
  max-width: 1200px;
  margin: 0 auto;
}
</style> 