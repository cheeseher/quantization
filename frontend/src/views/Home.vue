<template>
  <div class="home-container px-4 py-4">
    <h1 class="text-xl font-bold mb-4">个人策略交易系统</h1>
    
    <!-- 账户信息 -->
    <div class="account-info bg-white p-4 rounded-lg shadow mb-4">
      <h2 class="text-base font-semibold mb-2">账户信息</h2>
      <div class="flex justify-between">
        <span>余额 (USDT):</span>
        <span class="font-bold">{{ accountBalance }}</span>
      </div>
      <div v-if="hasPosition" class="mt-2">
        <div class="flex justify-between">
          <span>当前持仓:</span>
          <span class="font-bold" :class="{'text-green-600': positionDirection === 'LONG', 'text-red-600': positionDirection === 'SHORT'}">
            {{ positionDirection === 'LONG' ? '多单' : '空单' }}
          </span>
        </div>
        <div class="flex justify-between">
          <span>仓位大小:</span>
          <span class="font-bold">{{ positionSize }}</span>
        </div>
        <div class="flex justify-between">
          <span>浮动盈亏:</span>
          <span class="font-bold" :class="{'text-green-600': parseFloat(profitLoss) > 0, 'text-red-600': parseFloat(profitLoss) < 0}">
            {{ profitLoss }}%
          </span>
        </div>
        <div class="mt-2">
          <router-link to="/monitor" class="text-blue-600 text-sm flex items-center justify-center">
            <span>查看详情</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- 市场价格 -->
    <div class="market-price bg-white p-4 rounded-lg shadow mb-4">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-base font-semibold">市场价格</h2>
        <button @click="refreshPrice" class="text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      <div class="space-y-4">
        <!-- BTC 价格 -->
        <div class="price-group">
          <div class="text-sm text-gray-600 mb-2">BTC</div>
          <div class="grid grid-cols-3 gap-2">
            <div class="price-card p-3 rounded-lg bg-gray-50">
              <div class="text-xs text-gray-500 mb-1">现货</div>
              <div class="text-sm font-medium text-gray-500">USDT</div>
              <div class="text-lg font-bold">{{ btcSpotPrice }}</div>
              <div class="text-xs" :class="{'text-green-600': btcSpotChange > 0, 'text-red-600': btcSpotChange < 0}">
                {{ btcSpotChange > 0 ? '+' : '' }}{{ btcSpotChange }}%
              </div>
            </div>
            <div class="price-card p-3 rounded-lg bg-blue-50">
              <div class="text-xs text-gray-500 mb-1">合约</div>
              <div class="text-sm font-medium text-gray-500">USDT</div>
              <div class="text-lg font-bold">{{ btcFuturesPrice }}</div>
              <div class="text-xs" :class="{'text-green-600': btcFuturesChange > 0, 'text-red-600': btcFuturesChange < 0}">
                {{ btcFuturesChange > 0 ? '+' : '' }}{{ btcFuturesChange }}%
              </div>
            </div>
            <div class="price-card p-3 rounded-lg bg-blue-50">
              <div class="text-xs text-gray-500 mb-1">合约</div>
              <div class="text-sm font-medium text-gray-500">USDC</div>
              <div class="text-lg font-bold">{{ btcUsdcPrice }}</div>
              <div class="text-xs" :class="{'text-green-600': btcUsdcChange > 0, 'text-red-600': btcUsdcChange < 0}">
                {{ btcUsdcChange > 0 ? '+' : '' }}{{ btcUsdcChange }}%
              </div>
            </div>
          </div>
        </div>

        <!-- ETH 价格 -->
        <div class="price-group">
          <div class="text-sm text-gray-600 mb-2">ETH</div>
          <div class="grid grid-cols-3 gap-2">
            <div class="price-card p-3 rounded-lg bg-gray-50">
              <div class="text-xs text-gray-500 mb-1">现货</div>
              <div class="text-sm font-medium text-gray-500">USDT</div>
              <div class="text-lg font-bold">{{ ethSpotPrice }}</div>
              <div class="text-xs" :class="{'text-green-600': ethSpotChange > 0, 'text-red-600': ethSpotChange < 0}">
                {{ ethSpotChange > 0 ? '+' : '' }}{{ ethSpotChange }}%
              </div>
            </div>
            <div class="price-card p-3 rounded-lg bg-blue-50">
              <div class="text-xs text-gray-500 mb-1">合约</div>
              <div class="text-sm font-medium text-gray-500">USDT</div>
              <div class="text-lg font-bold">{{ ethFuturesPrice }}</div>
              <div class="text-xs" :class="{'text-green-600': ethFuturesChange > 0, 'text-red-600': ethFuturesChange < 0}">
                {{ ethFuturesChange > 0 ? '+' : '' }}{{ ethFuturesChange }}%
              </div>
            </div>
            <div class="price-card p-3 rounded-lg bg-blue-50">
              <div class="text-xs text-gray-500 mb-1">合约</div>
              <div class="text-sm font-medium text-gray-500">USDC</div>
              <div class="text-lg font-bold">{{ ethUsdcPrice }}</div>
              <div class="text-xs" :class="{'text-green-600': ethUsdcChange > 0, 'text-red-600': ethUsdcChange < 0}">
                {{ ethUsdcChange > 0 ? '+' : '' }}{{ ethUsdcChange }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 交易设置 -->
    <div class="trade-settings bg-white p-4 rounded-lg shadow mb-4">
      <h2 class="text-base font-semibold mb-2">交易设置</h2>
      
      <!-- 策略选择 -->
      <div class="mb-3">
        <div class="text-sm text-gray-600 mb-1">选择策略</div>
        <select v-model="selectedStrategy" class="w-full p-2 border border-gray-300 rounded-lg bg-white">
          <option v-for="strategy in strategies" :key="strategy.id" :value="strategy.id">
            {{ strategy.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <div class="text-sm text-gray-600 mb-1">选择币种</div>
        <div class="flex space-x-2">
          <button 
            v-for="coin in ['BTC', 'ETH']" 
            :key="coin"
            @click="selectedCoin = coin"
            class="flex-1 py-2 rounded-lg text-center transition-colors duration-200"
            :class="selectedCoin === coin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
          >
            {{ coin }}
          </button>
        </div>
      </div>
      
      <div>
        <div class="text-sm text-gray-600 mb-1">交易类型</div>
        <div class="flex space-x-2">
          <button 
            v-for="type in ['合约', '现货']" 
            :key="type"
            @click="tradeType = type"
            class="flex-1 py-2 rounded-lg text-center transition-colors duration-200"
            :class="tradeType === type ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
          >
            {{ type }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- 交易按钮 -->
    <div class="trade-buttons" :class="[tradeType === '合约' ? 'grid grid-cols-2' : 'grid grid-cols-1', 'gap-4 mb-4']">
      <button 
        @click="showConfirmation(tradeType === '合约' ? 'LONG' : 'BUY')" 
        class="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white py-6 rounded-lg text-xl font-bold transition-colors duration-200"
      >
        {{ tradeType === '合约' ? '我看涨' : '买入' }}
      </button>
      <button 
        v-if="tradeType === '合约'"
        @click="showConfirmation('SHORT')" 
        class="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white py-6 rounded-lg text-xl font-bold transition-colors duration-200"
      >
        我看跌
      </button>
    </div>
    
    <!-- 交易提示 -->
    <div class="tips bg-white p-4 rounded-lg shadow text-sm text-gray-600">
      <div class="font-medium mb-1">策略提示:</div>
      <ul class="list-disc pl-5 space-y-1" v-if="tradeType === '合约'">
        <li>初始仓位为账户余额的2%</li>
        <li>止损设置为2%</li>
        <li>每盈利10%将自动加仓一次(最多3次)</li>
        <li>盈利20%平仓1/3，50%再平1/3</li>
        <li>尾仓设置5%回撤止盈</li>
      </ul>
      <ul class="list-disc pl-5 space-y-1" v-else>
        <li>单次交易金额不超过账户余额的30%</li>
        <li>支持现货限价单和市价单</li>
        <li>可设置止盈价格</li>
      </ul>
    </div>
    
    <!-- 确认弹窗 -->
    <div v-if="showConfirm" class="confirmation-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-sm w-full p-4">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-lg font-bold">确认下单</h3>
          <button @click="showConfirm = false" class="text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="order-info space-y-2 mb-4">
          <div class="grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
            <div class="text-gray-600">币种:</div>
            <div class="font-medium">{{ selectedCoin }}/USDT</div>
            
            <div class="text-gray-600">类型:</div>
            <div class="font-medium">{{ tradeType }}</div>
            
            <div class="text-gray-600">方向:</div>
            <div class="font-medium" :class="{
              'text-green-600': confirmDirection === 'LONG' || confirmDirection === 'BUY',
              'text-red-600': confirmDirection === 'SHORT' || confirmDirection === 'SELL'
            }">
              {{ getDirectionText(confirmDirection) }}
            </div>
            
            <div class="text-gray-600">当前价格:</div>
            <div class="font-medium">{{ currentPrice }}</div>
            
            <div class="text-gray-600">{{ tradeType === '合约' ? '建仓金额' : '交易金额' }}:</div>
            <div class="font-medium">{{ entryAmount }} USDT</div>
            
            <template v-if="tradeType === '合约'">
              <div class="text-gray-600">止损价格:</div>
              <div class="font-medium">{{ stopLossPrice }}</div>
            </template>
          </div>
          
          <div v-if="tradeType === '合约'" class="bg-gray-100 p-2 rounded text-sm">
            <div class="font-medium mb-1">止盈策略:</div>
            <ul class="list-disc pl-5 space-y-0.5">
              <li>盈利20%平仓1/3</li>
              <li>盈利50%平仓1/3</li>
              <li>尾仓设置5%回撤止盈</li>
            </ul>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-2">
          <button @click="showConfirm = false" class="py-2 bg-gray-200 rounded-lg font-medium">取消</button>
          <button @click="confirmOrder" class="py-2 bg-blue-600 text-white rounded-lg font-medium">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 状态管理
const accountBalance = ref(10000)
const hasPosition = ref(false)
const positionDirection = ref('LONG')
const positionSize = ref('0')
const profitLoss = ref('0')

const selectedCoin = ref('BTC')
const tradeType = ref('合约')
const showConfirm = ref(false)
const confirmDirection = ref('')
const currentPrice = ref(0)
const entryAmount = ref(0)
const stopLossPrice = ref(0)

// 市场价格
const btcSpotPrice = ref('30000.00')
const btcSpotChange = ref(2.5)
const btcFuturesPrice = ref('30050.00')
const btcFuturesChange = ref(2.6)
const btcUsdcPrice = ref('30055.00')
const btcUsdcChange = ref(2.7)

const ethSpotPrice = ref('1800.00')
const ethSpotChange = ref(-1.2)
const ethFuturesPrice = ref('1805.00')
const ethFuturesChange = ref(-1.1)
const ethUsdcPrice = ref('1806.00')
const ethUsdcChange = ref(-1.0)

// 策略数据
const strategies = ref([])
const selectedStrategy = ref(null)

// 获取策略列表
const fetchStrategies = () => {
  // TODO: 从后端获取策略列表
  strategies.value = [
    { id: 1, name: '策略 1' },
    { id: 2, name: '策略 2' },
    { id: 3, name: '策略 3' }
  ]
  selectedStrategy.value = strategies.value[0]?.id
}

onMounted(() => {
  fetchStrategies()
  refreshPrice()
})

// 刷新价格
const refreshPrice = () => {
  // 模拟价格更新
  const btcBasePrice = 30000 + Math.random() * 1000
  btcSpotPrice.value = btcBasePrice.toFixed(2)
  btcFuturesPrice.value = (btcBasePrice + Math.random() * 50).toFixed(2)
  btcUsdcPrice.value = (btcBasePrice + Math.random() * 50).toFixed(2)
  btcSpotChange.value = (Math.random() * 5 - 2.5).toFixed(2)
  btcFuturesChange.value = (Math.random() * 5 - 2.5).toFixed(2)
  btcUsdcChange.value = (Math.random() * 5 - 2.5).toFixed(2)

  const ethBasePrice = 1800 + Math.random() * 50
  ethSpotPrice.value = ethBasePrice.toFixed(2)
  ethFuturesPrice.value = (ethBasePrice + Math.random() * 5).toFixed(2)
  ethUsdcPrice.value = (ethBasePrice + Math.random() * 5).toFixed(2)
  ethSpotChange.value = (Math.random() * 5 - 2.5).toFixed(2)
  ethFuturesChange.value = (Math.random() * 5 - 2.5).toFixed(2)
  ethUsdcChange.value = (Math.random() * 5 - 2.5).toFixed(2)
}

// 获取方向文本
const getDirectionText = (direction) => {
  switch (direction) {
    case 'LONG':
      return '做多'
    case 'SHORT':
      return '做空'
    case 'BUY':
      return '买入'
    case 'SELL':
      return '卖出'
    default:
      return ''
  }
}

// 展示确认弹窗
const showConfirmation = (direction) => {
  confirmDirection.value = direction
  
  // 获取当前选择的币种价格
  currentPrice.value = selectedCoin.value === 'BTC' 
    ? (tradeType.value === '合约' ? btcFuturesPrice.value : btcSpotPrice.value)
    : (tradeType.value === '合约' ? ethFuturesPrice.value : ethSpotPrice.value)
  
  if (tradeType.value === '合约') {
    // 合约交易计算策略参数
    const totalBalance = accountBalance.value
    const stopLossPercentage = 0.02 // 2%
    const leverage = 10
    
    entryAmount.value = (totalBalance * 0.02) / (stopLossPercentage * leverage)
    entryAmount.value = Math.floor(entryAmount.value * 100) / 100 // 保留两位小数
    
    // 计算止损价格
    if (direction === 'LONG') {
      stopLossPrice.value = (currentPrice.value * (1 - stopLossPercentage)).toFixed(2)
    } else {
      stopLossPrice.value = (currentPrice.value * (1 + stopLossPercentage)).toFixed(2)
    }
  } else {
    // 现货交易
    entryAmount.value = Math.floor(accountBalance.value * 0.3 * 100) / 100 // 30%账户余额，保留两位小数
    stopLossPrice.value = null // 现货不设置止损
  }
  
  showConfirm.value = true
}

// 确认下单
const confirmOrder = async () => {
  // 这里将调用API进行实际下单
  console.log(`下单: ${confirmDirection.value} ${selectedCoin.value}/USDT ${tradeType.value}`)
  console.log(`金额: ${entryAmount.value} USDT, 止损价: ${stopLossPrice.value}`)
  
  // 模拟API请求成功
  hasPosition.value = true
  positionDirection.value = confirmDirection.value
  positionSize.value = `${entryAmount.value} USDT`
  profitLoss.value = '0'
  
  showConfirm.value = false
}
</script>

<style scoped>
.home-container {
  max-width: 600px;
  margin: 0 auto;
}

/* 添加触摸反馈效果 */
button {
  -webkit-tap-highlight-color: transparent;
}

.confirmation-modal {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style> 