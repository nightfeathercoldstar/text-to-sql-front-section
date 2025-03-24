'use client'

export default function TestPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>测试页面</h1>
      <p>这是一个简单的测试页面，用于验证Next.js路由和渲染功能是否正常。</p>
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '0.5rem' }}>
        <p>如果您能看到这个页面，说明应用的基本功能是正常的。</p>
        <p>请尝试访问：<a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>返回首页</a></p>
      </div>
    </div>
  )
} 