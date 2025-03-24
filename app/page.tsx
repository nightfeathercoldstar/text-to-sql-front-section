'use client'

import { useState, useEffect } from 'react'
import Welcome from './components/welcome'
import Chat from './components/chat'
import { AppInfo, PromptConfig, ChatItem, Resolution, TransferMethod } from '@/types/app'
import { MessageRating } from '@/app/components/chat/type'

// 创建默认的站点信息
const defaultSiteInfo: AppInfo = {
  title: '文本转SQL应用',
  description: '轻松将自然语言转换为SQL查询语句',
  default_language: 'zh-Hans',
  copyright: '',
  privacy_policy: ''
}

// 创建默认的prompt配置
const defaultPromptConfig: PromptConfig = {
  prompt_template: '',
  prompt_variables: []
}

// 预设的SQL查询模板
const SQL_TEMPLATES = [
  {
    question: "查询所有销售额超过1000元的订单",
    sql: "SELECT * FROM orders WHERE total_amount > 1000;",
    explanation: "这个查询将从'orders'表中筛选出销售额超过1000元的所有订单记录。"
  },
  {
    question: "查找最近30天内的所有订单",
    sql: "SELECT * FROM orders WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);",
    explanation: "该查询会返回最近30天内的所有订单记录，使用了MySQL的日期函数。"
  },
  {
    question: "统计每个客户的订单总数",
    sql: "SELECT customer_id, COUNT(*) as order_count FROM orders GROUP BY customer_id ORDER BY order_count DESC;",
    explanation: "这个查询统计了每位客户的订单数量，并按订单数量从高到低排序。"
  }
]

export default function HomePage() {
  const [showChat, setShowChat] = useState(false)
  const [chatList, setChatList] = useState<ChatItem[]>([])
  const [isResponding, setIsResponding] = useState(false)
  const [controlClearQuery, setControlClearQuery] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // 从localStorage获取主题模式
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const handleStartChat = () => {
    console.log('开始对话被点击!')
    setShowChat(true)
    // 初始化聊天列表，添加一条欢迎消息
    setChatList([
      {
        id: `welcome-${Date.now()}`,
        content: '👋 欢迎使用文本转SQL应用！请输入您的问题，例如："查询所有销售额超过1000元的订单"',
        isAnswer: true,
        feedbackDisabled: true,
      }
    ])
  }

  const handleSendMessage = (message: string, files: any[]) => {
    if (!message.trim()) return
    
    // 设置正在响应状态
    setIsResponding(true)
    
    // 添加用户问题到聊天列表
    const questionId = `question-${Date.now()}`
    setChatList(prevList => [
      ...prevList,
      {
        id: questionId,
        content: message,
        isAnswer: false,
      }
    ])

    // 模拟API响应，使用随机模板或基于问题生成回答
    setTimeout(() => {
      // 随机选择一个模板，或者使用默认回答
      let response;
      
      // 尝试查找匹配的模板（简单匹配）
      const lowerMessage = message.toLowerCase();
      const matchedTemplate = SQL_TEMPLATES.find(t => 
        lowerMessage.includes(t.question.substring(0, 10).toLowerCase())
      );
      
      if (matchedTemplate) {
        response = {
          sql: matchedTemplate.sql,
          explanation: matchedTemplate.explanation
        };
      } else {
        // 默认回答
        response = {
          sql: `SELECT * FROM table_name WHERE condition;`,
          explanation: `我根据您的问题"${message}"生成了基本SQL查询结构。您可能需要指定具体的表名和条件来完善这个查询。`
        };
      }
      
      setChatList(prevList => [
        ...prevList,
        {
          id: `answer-${Date.now()}`,
          content: `\`\`\`sql\n${response.sql}\n\`\`\`\n\n${response.explanation}`,
          isAnswer: true,
        }
      ])
      
      // 响应完成
      setIsResponding(false)
    }, 1500)

    // 清空输入框
    setControlClearQuery(prev => prev + 1)
  }

  // 模拟反馈功能
  const handleFeedback = (messageId: string, feedback: { rating: MessageRating, content?: string | null }) => {
    console.log(`对消息 ${messageId} 进行了 ${feedback.rating} 操作`)
    return Promise.resolve() // FeedbackFunc需要返回Promise
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <header className="border-b dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              SQLGenius
            </span>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={isDarkMode ? "切换到亮色模式" : "切换到暗色模式"}
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="container mx-auto py-4">
        {!showChat ? (
          <Welcome 
            conversationName=""
            hasSetInputs={false}
            isPublicVersion={true}
            siteInfo={defaultSiteInfo}
            promptConfig={defaultPromptConfig}
            onStartChat={handleStartChat}
            canEditInputs={false}
            savedInputs={{}}
            onInputsChange={() => {}}
          />
        ) : (
          <div className="mx-auto max-w-4xl h-[calc(100vh-100px)] px-4 sm:px-6 lg:px-8 flex flex-col">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md flex-1 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">文本转SQL对话</h2>
                </div>
                <button 
                  onClick={() => setShowChat(false)}
                  className="px-3 py-1.5 text-indigo-600 dark:text-indigo-400 border border-indigo-600 dark:border-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors text-sm"
                >
                  返回首页
                </button>
              </div>
              <div className="flex-1 overflow-auto p-4 relative dark:text-gray-100">
                <Chat 
                  chatList={chatList}
                  onSend={handleSendMessage}
                  isResponding={isResponding}
                  controlClearQuery={controlClearQuery}
                  onFeedback={handleFeedback}
                  feedbackDisabled={false}
                  visionConfig={{
                    enabled: false,
                    number_limits: 4,
                    detail: Resolution.low,
                    transfer_methods: [TransferMethod.local_file]
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-6 py-4 border-t dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} SQLGenius. 基于自然语言处理的SQL生成工具</p>
        </div>
      </footer>
    </div>
  )
}
