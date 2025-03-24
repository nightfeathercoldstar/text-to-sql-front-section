'use client'
import type { FC } from 'react'
import React, { useCallback, useEffect, useState } from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import {
  PencilIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  LightBulbIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/solid'
import s from './style.module.css'
import type { AppInfo } from '@/types/app'
import Button from '@/app/components/base/button'
import AppIcon from '@/app/components/base/app-icon'

export const AppInfoComp = ({ siteInfo }: { siteInfo: AppInfo }) => {
  const { t } = useTranslation()
  return (
    <div className='relative z-10'>
      <div className='flex flex-col items-center md:items-start'>
        {/* Title */}
        <div className='flex items-center justify-center md:justify-start mb-4'>
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-3 rounded-xl shadow-lg">
            <AppIcon size='large' />
          </div>
          <div className='ml-4'>
            <h1 className='text-[36px] text-gray-900 font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400'>
              {siteInfo.title}
            </h1>
            <p className="text-sm text-gray-500">{siteInfo.copyright}</p>
          </div>
        </div>
        
        {siteInfo.description && (
          <div className='max-w-[680px] md:max-w-[680px] text-center md:text-left text-lg text-gray-600 mb-6'>
            {siteInfo.description}
          </div>
        )}
        
        <div className='w-full max-w-[680px]'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
            <FeatureCard 
              icon={<ChatBubbleLeftRightIcon className="h-5 w-5 text-indigo-500" />}
              title="智能对话" 
              description="基于先进AI模型，为您提供流畅自然的对话体验" 
            />
            <FeatureCard 
              icon={<DocumentTextIcon className="h-5 w-5 text-indigo-500" />}
              title="知识丰富" 
              description="拥有广泛的知识库，能够回答各个领域的问题" 
            />
            <FeatureCard 
              icon={<LightBulbIcon className="h-5 w-5 text-indigo-500" />}
              title="创意助手" 
              description="帮助您激发创意，提供新颖的思路和建议" 
            />
            <FeatureCard 
              icon={<ShieldCheckIcon className="h-5 w-5 text-indigo-500" />}
              title="安全可靠" 
              description="注重隐私保护，提供安全可靠的服务体验" 
            />
          </div>
          
          <div className='mt-2 p-4 bg-indigo-50 rounded-lg border border-indigo-100'>
            <p className='font-medium text-gray-700 mb-2'>使用指南：</p>
            <ul className='space-y-1.5 text-gray-600'>
              <li className="flex items-center">
                <span className="inline-block w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center mr-2">1</span>
                在对话框中输入您的问题或需求
              </li>
              <li className="flex items-center">
                <span className="inline-block w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center mr-2">2</span>
                系统会基于AI技术给您提供专业回答
              </li>
              <li className="flex items-center">
                <span className="inline-block w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center mr-2">3</span>
                您可以随时开始新的对话或继续已有对话
              </li>
              <li className="flex items-center">
                <span className="inline-block w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center mr-2">4</span>
                历史对话会保存在侧边栏中方便您随时查看
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center mb-2">
        <div className="p-2 bg-indigo-50 rounded-md mr-3">
          {icon}
        </div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

export const PromptTemplate: FC<{ html: string }> = ({ html }) => {
  return (
    <div
      className={' box-border text-sm text-gray-700'}
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  )
}

export const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.75 1C2.75 0.723858 2.52614 0.5 2.25 0.5C1.97386 0.5 1.75 0.723858 1.75 1V1.75H1C0.723858 1.75 0.5 1.97386 0.5 2.25C0.5 2.52614 0.723858 2.75 1 2.75H1.75V3.5C1.75 3.77614 1.97386 4 2.25 4C2.52614 4 2.75 3.77614 2.75 3.5V2.75H3.5C3.77614 2.75 4 2.52614 4 2.25C4 1.97386 3.77614 1.75 3.5 1.75H2.75V1Z" fill="#444CE7" />
    <path d="M2.75 8.5C2.75 8.22386 2.52614 8 2.25 8C1.97386 8 1.75 8.22386 1.75 8.5V9.25H1C0.723858 9.25 0.5 9.47386 0.5 9.75C0.5 10.0261 0.723858 10.25 1 10.25H1.75V11C1.75 11.2761 1.97386 11.5 2.25 11.5C2.52614 11.5 2.75 11.2761 2.75 11V10.25H3.5C3.77614 10.25 4 10.0261 4 9.75C4 9.47386 3.77614 9.25 3.5 9.25H2.75V8.5Z" fill="#444CE7" />
    <path d="M6.96667 1.32051C6.8924 1.12741 6.70689 1 6.5 1C6.29311 1 6.10759 1.12741 6.03333 1.32051L5.16624 3.57494C5.01604 3.96546 4.96884 4.078 4.90428 4.1688C4.8395 4.2599 4.7599 4.3395 4.6688 4.40428C4.578 4.46884 4.46546 4.51604 4.07494 4.66624L1.82051 5.53333C1.62741 5.60759 1.5 5.79311 1.5 6C1.5 6.20689 1.62741 6.39241 1.82051 6.46667L4.07494 7.33376C4.46546 7.48396 4.578 7.53116 4.6688 7.59572C4.7599 7.6605 4.8395 7.7401 4.90428 7.8312C4.96884 7.922 5.01604 8.03454 5.16624 8.42506L6.03333 10.6795C6.1076 10.8726 6.29311 11 6.5 11C6.70689 11 6.89241 10.8726 6.96667 10.6795L7.83376 8.42506C7.98396 8.03454 8.03116 7.922 8.09572 7.8312C8.1605 7.7401 8.2401 7.6605 8.3312 7.59572C8.422 7.53116 8.53454 7.48396 8.92506 7.33376L11.1795 6.46667C11.3726 6.39241 11.5 6.20689 11.5 6C11.5 5.79311 11.3726 5.60759 11.1795 5.53333L8.92506 4.66624C8.53454 4.51604 8.422 4.46884 8.3312 4.40428C8.2401 4.3395 8.1605 4.2599 8.09572 4.1688C8.03116 4.078 7.98396 3.96546 7.83376 3.57494L6.96667 1.32051Z" fill="#444CE7" />
  </svg>
)

export const ChatBtn: FC<{ onClick: () => void; className?: string }> = ({
  className,
  onClick,
}) => {
  const { t } = useTranslation()
  return (
    <Button
      type='primary'
      className={cn(className, `space-x-2 flex items-center ${s.customBtn} bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 px-6 py-3 text-base shadow-md`)}
      onClick={onClick}>
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M18 10.5C18 14.366 14.418 17.5 10 17.5C8.58005 17.506 7.17955 17.1698 5.917 16.52L2 17.5L3.338 14.377C2.493 13.267 2 11.934 2 10.5C2 6.634 5.582 3.5 10 3.5C14.418 3.5 18 6.634 18 10.5ZM7 9.5H5V11.5H7V9.5ZM15 9.5H13V11.5H15V9.5ZM9 9.5H11V11.5H9V9.5Z" fill="white" />
      </svg>
      <span>{t('app.chat.startChat')}</span>
    </Button>
  )
}

export const EditBtn = ({ className, onClick }: { className?: string; onClick: () => void }) => {
  const { t } = useTranslation()

  return (
    <div
      className={cn('px-3 py-1.5 flex space-x-1 items-center rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors duration-200 cursor-pointer', className)}
      onClick={onClick}
    >
      <PencilIcon className='w-3 h-3' />
      <span className="font-medium">{t('common.operation.edit')}</span>
    </div>
  )
}

export const FootLogo = () => (
  <div className={s.logo} />
)
