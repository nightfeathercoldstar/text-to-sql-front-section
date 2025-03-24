'use client'
import type { FC } from 'react'
import React from 'react'
import type { ThoughtItem, ToolInfoInThought } from '../type'
import Tool from './tool'
import type { Emoji } from '@/types/tools'

export type IThoughtProps = {
  thought?: ThoughtItem
  agentThoughts?: ThoughtItem[]
  allToolIcons: Record<string, string | Emoji>
  isFinished?: boolean
}

function getValue(value: string, isValueArray: boolean, index: number) {
  if (isValueArray) {
    try {
      return JSON.parse(value)[index]
    }
    catch (e) {
    }
  }
  return value
}

const Thought: FC<IThoughtProps> = ({
  thought,
  agentThoughts,
  allToolIcons,
  isFinished = true,
}) => {
  // 如果传入了agentThoughts，则渲染多个思考过程
  if (agentThoughts && agentThoughts.length > 0) {
    return (
      <div className='my-2 space-y-3'>
        {agentThoughts.map((item, i) => (
          <SingleThought 
            key={i} 
            thought={item} 
            allToolIcons={allToolIcons} 
            isFinished={true} 
          />
        ))}
      </div>
    )
  }

  // 否则渲染单个思考过程
  if (!thought) return null
  return <SingleThought thought={thought} allToolIcons={allToolIcons} isFinished={isFinished} />
}

const SingleThought: FC<{
  thought: ThoughtItem
  allToolIcons: Record<string, string | Emoji>
  isFinished: boolean
}> = ({ thought, allToolIcons, isFinished }) => {
  const [toolNames, isValueArray]: [string[], boolean] = (() => {
    try {
      if (Array.isArray(JSON.parse(thought.tool)))
        return [JSON.parse(thought.tool), true]
    }
    catch (e) {
    }
    return [[thought.tool], false]
  })()

  const toolThoughtList = toolNames.map((toolName, index) => {
    return {
      name: toolName,
      input: getValue(thought.tool_input, isValueArray, index),
      output: getValue(thought.observation, isValueArray, index),
      isFinished,
    }
  })

  return (
    <div className='my-2 space-y-2'>
      {toolThoughtList.map((item: ToolInfoInThought, index) => (
        <Tool
          key={index}
          info={item}
          allToolIcons={allToolIcons}
        />
      ))}
    </div>
  )
}

export default Thought
