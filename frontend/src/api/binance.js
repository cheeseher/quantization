import axios from 'axios'

const API_BASE_URL = '/api'

// API接口服务
const binanceService = {
  // 获取账户余额
  getAccountBalance: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/balance`)
      return response.data
    } catch (error) {
      console.error('获取账户余额失败:', error)
      throw error
    }
  },

  // 获取当前价格
  getCurrentPrice: async (symbol) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/price`, {
        params: { symbol }
      })
      return response.data
    } catch (error) {
      console.error(`获取${symbol}价格失败:`, error)
      throw error
    }
  },

  // 开仓
  openPosition: async (symbol, direction, amount, stopLoss, leverage = 10) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/position/open`, {
        symbol,
        direction,
        amount,
        stopLoss,
        leverage
      })
      return response.data
    } catch (error) {
      console.error('开仓失败:', error)
      throw error
    }
  },

  // 平仓
  closePosition: async (symbol, positionId, amount, isPercent = false) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/position/close`, {
        symbol,
        positionId,
        amount,
        isPercent
      })
      return response.data
    } catch (error) {
      console.error('平仓失败:', error)
      throw error
    }
  },

  // 获取当前持仓
  getCurrentPosition: async (symbol) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/position`, {
        params: { symbol }
      })
      return response.data
    } catch (error) {
      console.error('获取当前持仓失败:', error)
      throw error
    }
  },

  // 获取交易记录
  getTradeRecords: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/records`)
      return response.data
    } catch (error) {
      console.error('获取交易记录失败:', error)
      throw error
    }
  }
}

export default binanceService 