import styles from '../style.module.css';

// SQL关键词列表
const SQL_KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'AS', 'GROUP BY', 'ORDER BY',
  'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'ALL', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE',
  'CREATE', 'ALTER', 'DROP', 'TABLE', 'INDEX', 'VIEW', 'FUNCTION', 'PROCEDURE', 'TRIGGER',
  'PRIMARY', 'KEY', 'FOREIGN', 'CONSTRAINT', 'NOT', 'NULL', 'DEFAULT', 'AUTO_INCREMENT', 'UNIQUE',
  'AND', 'OR', 'IN', 'BETWEEN', 'LIKE', 'IS', 'EXISTS', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END',
  'ASC', 'DESC', 'WITH', 'DISTINCT', 'REFERENCES', 'CASCADE', 'RESTRICT', 'CHECK', 'TEMPORARY'
];

// SQL函数列表
const SQL_FUNCTIONS = [
  'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'COALESCE', 'IFNULL', 'ISNULL', 'NVL', 'NULLIF',
  'CAST', 'CONVERT', 'DATE', 'DATEDIFF', 'DATEADD', 'DATENAME', 'DATEPART',
  'CONCAT', 'SUBSTRING', 'TRIM', 'LTRIM', 'RTRIM', 'LOWER', 'UPPER', 'LEN', 'LENGTH',
  'ROUND', 'FLOOR', 'CEILING', 'ABS', 'SQRT', 'POWER', 'EXP', 'LOG', 'SIN', 'COS', 'TAN',
  'ROW_NUMBER', 'RANK', 'DENSE_RANK', 'NTILE', 'LEAD', 'LAG', 'FIRST_VALUE', 'LAST_VALUE'
];

/**
 * 高亮SQL代码
 * @param sql SQL代码文本
 * @returns 带HTML高亮标记的SQL代码
 */
export function highlightSQL(sql: string): string {
  if (!sql) return '';
  
  // 转义HTML特殊字符
  let highlighted = sql
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  // 高亮字符串
  highlighted = highlighted.replace(/'([^']*)'/g, `<span class="${styles.string}">'$1'</span>`);
  highlighted = highlighted.replace(/"([^"]*)"/g, `<span class="${styles.string}">"$1"</span>`);
  
  // 高亮数字
  highlighted = highlighted.replace(/\b(\d+)\b/g, `<span class="${styles.number}">$1</span>`);
  
  // 高亮操作符
  highlighted = highlighted.replace(/([=<>!+\-*/%]+)/g, `<span class="${styles.operator}">$1</span>`);
  
  // 高亮函数
  SQL_FUNCTIONS.forEach(func => {
    const regex = new RegExp(`\\b${func}\\b`, 'gi');
    highlighted = highlighted.replace(regex, `<span class="${styles.function}">$&</span>`);
  });
  
  // 高亮关键词
  SQL_KEYWORDS.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    highlighted = highlighted.replace(regex, `<span class="${styles.keyword}">$&</span>`);
  });
  
  // 替换换行符为HTML换行
  highlighted = highlighted.replace(/\n/g, '<br/>');
  
  return highlighted;
}

/**
 * 检测文本中的SQL代码块并高亮
 * @param text 包含SQL代码的文本
 * @returns 处理后的文本，带有高亮的SQL代码
 */
export function processTextWithSQL(text: string): string {
  if (!text) return '';
  
  // 寻找SQL代码块 ```sql ... ``` 或 ```SQL ... ```
  const sqlBlockRegex = /```(sql|SQL)\s*([\s\S]*?)```/g;
  
  return text.replace(sqlBlockRegex, (_match, _lang, code) => {
    const highlightedCode = highlightSQL(code.trim());
    return `<pre class="${styles.codeBlock}"><code class="${styles.codeContent}">${highlightedCode}</code></pre>`;
  });
}

/**
 * 自动检测文本中的SQL语句并高亮
 * 这个函数会尝试识别文本中的SQL语句，即使没有显式的代码块标记
 * @param text 可能包含SQL语句的文本
 * @returns 处理后的文本
 */
export function autoDetectAndHighlightSQL(text: string): string {
  if (!text) return '';
  
  // 先处理显式标记的SQL代码块
  let processedText = processTextWithSQL(text);
  
  // 如果文本中没有显式的SQL代码块，但看起来像SQL，尝试自动高亮
  if (processedText === text && isSQLLike(text)) {
    // 在不同行的SQL语句周围添加代码块
    const lines = text.split('\n');
    const sqlLines: string[] = [];
    let inSQLBlock = false;
    let sqlBlock = '';
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (isSQLLine(trimmedLine) && !inSQLBlock) {
        inSQLBlock = true;
        sqlBlock = trimmedLine;
      } else if (inSQLBlock) {
        if (isSQLLine(trimmedLine) || trimmedLine === '') {
          sqlBlock += '\n' + line;
        } else {
          sqlLines.push(sqlBlock);
          inSQLBlock = false;
          sqlBlock = '';
        }
      }
    });
    
    if (inSQLBlock) {
      sqlLines.push(sqlBlock);
    }
    
    sqlLines.forEach(sql => {
      processedText = processedText.replace(sql, `<pre class="${styles.codeBlock}"><code class="${styles.codeContent}">${highlightSQL(sql)}</code></pre>`);
    });
  }
  
  return processedText;
}

/**
 * 判断一段文本是否看起来像SQL语句
 */
function isSQLLike(text: string): boolean {
  const sqlIndicators = [
    /\bSELECT\b.*\bFROM\b/i,
    /\bINSERT\b.*\bINTO\b/i,
    /\bUPDATE\b.*\bSET\b/i,
    /\bDELETE\b.*\bFROM\b/i,
    /\bCREATE\b.*\bTABLE\b/i,
    /\bALTER\b.*\bTABLE\b/i
  ];
  
  return sqlIndicators.some(regex => regex.test(text));
}

/**
 * 判断一行文本是否看起来像SQL语句
 */
function isSQLLine(line: string): boolean {
  if (!line) return false;
  
  // 检查SQL关键词
  for (const keyword of SQL_KEYWORDS) {
    if (line.toUpperCase().includes(keyword)) {
      return true;
    }
  }
  
  // 检查SQL操作符和结构
  return /[;,]$/.test(line) || // 以分号或逗号结尾
         /\bAS\b/i.test(line) || // 包含 AS 关键词
         /\bON\b/i.test(line) || // 包含 ON 关键词
         /=|>|<|!=|<>/.test(line); // 包含比较运算符
} 