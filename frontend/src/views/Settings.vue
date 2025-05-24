<template>
  <div class="settings-container p-4">
    <h1 class="text-2xl font-bold mb-4">账户设置</h1>
    
    <!-- API设置 -->
    <div class="section bg-white p-4 rounded-lg shadow mb-4">
      <h2 class="text-lg font-semibold mb-3">API 设置</h2>
      
      <div class="mb-3">
        <label class="block text-sm font-medium text-gray-700 mb-1">交易所</label>
        <select class="w-full p-2 border border-gray-300 rounded-md" v-model="exchange">
          <option value="binance">Binance</option>
        </select>
      </div>
      
      <div class="mb-3">
        <label class="block text-sm font-medium text-gray-700 mb-1">API Key</label>
        <input type="text" class="w-full p-2 border border-gray-300 rounded-md" 
          placeholder="输入API Key" v-model="apiKey" />
      </div>
      
      <div class="mb-3">
        <label class="block text-sm font-medium text-gray-700 mb-1">API Secret</label>
        <input type="password" class="w-full p-2 border border-gray-300 rounded-md" 
          placeholder="输入API Secret" v-model="apiSecret" />
      </div>
      
      <div class="flex items-center mb-3">
        <input type="checkbox" id="testnet" class="mr-2 h-4 w-4" v-model="useTestnet" />
        <label for="testnet" class="text-sm text-gray-700">使用测试网络</label>
      </div>
      
      <button class="w-full bg-blue-600 text-white py-2 rounded-lg font-medium">
        保存API设置
      </button>
    </div>
    
    <!-- 杠杆配置 -->
    <div class="section bg-white p-4 rounded-lg shadow mb-4">
      <h2 class="text-lg font-semibold mb-3">杠杆配置</h2>
      
      <div class="mb-3">
        <label class="block text-sm font-medium text-gray-700 mb-1">默认杠杆倍数: {{ leverage }}×</label>
        <input type="range" min="1" max="20" step="1" class="w-full" v-model="leverage" />
        <div class="flex justify-between text-xs text-gray-500">
          <span>1×</span>
          <span>5×</span>
          <span>10×</span>
          <span>15×</span>
          <span>20×</span>
        </div>
      </div>
    </div>
    
    <!-- 策略参数 -->
    <div class="section bg-white p-4 rounded-lg shadow mb-4">
      <h2 class="text-lg font-semibold mb-3">策略参数</h2>
      
      <div class="mb-3">
        <label class="block text-sm font-medium text-gray-700 mb-1">初始仓位比例: {{ initialPositionPercent }}%</label>
        <input type="range" min="1" max="5" step="0.1" class="w-full" v-model="initialPositionPercent" />
      </div>
      
      <div class="mb-3">
        <label class="block text-sm font-medium text-gray-700 mb-1">止损幅度: {{ stopLossPercent }}%</label>
        <input type="range" min="1" max="5" step="0.1" class="w-full" v-model="stopLossPercent" />
      </div>
      
      <div class="mb-3">
        <label class="block text-sm font-medium text-gray-700 mb-1">加仓触发盈利: {{ addPositionTriggerPercent }}%</label>
        <input type="range" min="5" max="20" step="1" class="w-full" v-model="addPositionTriggerPercent" />
      </div>
      
      <div class="mb-3">
        <label class="block text-sm font-medium text-gray-700 mb-1">加仓比例: {{ addPositionPercent }}%</label>
        <input type="range" min="5" max="20" step="1" class="w-full" v-model="addPositionPercent" />
      </div>
      
      <div class="mb-3">
        <label class="block text-sm font-medium text-gray-700 mb-1">第一次止盈: {{ firstTakeProfitPercent }}%</label>
        <input type="range" min="10" max="30" step="1" class="w-full" v-model="firstTakeProfitPercent" />
      </div>
      
      <div class="mb-3">
        <label class="block text-sm font-medium text-gray-700 mb-1">第二次止盈: {{ secondTakeProfitPercent }}%</label>
        <input type="range" min="30" max="70" step="1" class="w-full" v-model="secondTakeProfitPercent" />
      </div>
      
      <div class="mb-3">
        <label class="block text-sm font-medium text-gray-700 mb-1">追踪止盈回撤: {{ trailingStopPercent }}%</label>
        <input type="range" min="1" max="10" step="0.5" class="w-full" v-model="trailingStopPercent" />
      </div>
      
      <button class="w-full bg-blue-600 text-white py-2 rounded-lg font-medium">
        保存策略设置
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// API设置
const exchange = ref('binance')
const apiKey = ref('')
const apiSecret = ref('')
const useTestnet = ref(true)

// 杠杆配置
const leverage = ref(10)

// 策略参数
const initialPositionPercent = ref(2)
const stopLossPercent = ref(2)
const addPositionTriggerPercent = ref(10)
const addPositionPercent = ref(10)
const firstTakeProfitPercent = ref(20)
const secondTakeProfitPercent = ref(50)
const trailingStopPercent = ref(5)
</script>

<style scoped>
.settings-container {
  max-width: 600px;
  margin: 0 auto;
}

input[type="range"] {
  -webkit-appearance: none;
  height: 5px;
  background: #e2e8f0;
  border-radius: 5px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
}
</style> 