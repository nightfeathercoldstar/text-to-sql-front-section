import type { FC } from 'react'
import React from 'react'
import {
  Bars3Icon,
  PencilSquareIcon,
  InformationCircleIcon,
  Cog6ToothIcon,
  MoonIcon,
} from '@heroicons/react/24/solid'
import AppIcon from '@/app/components/base/app-icon'

export type IHeaderProps = {
  title: string
  isMobile?: boolean
  onShowSideBar?: () => void
  onCreateNewChat?: () => void
}

const Header: FC<IHeaderProps> = ({
  title,
  isMobile,
  onShowSideBar,
  onCreateNewChat,
}) => {
  return (
    <div className="shrink-0 flex items-center justify-between h-14 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md">
      {isMobile
        ? (
          <div
            className='flex items-center justify-center h-8 w-8 cursor-pointer hover:bg-indigo-700 rounded-md transition-colors duration-200'
            onClick={() => onShowSideBar?.()}
          >
            <Bars3Icon className="h-5 w-5 text-white" />
          </div>
        )
        : <div className="w-8"></div>}
      <div className='flex items-center space-x-2'>
        <div className="bg-white p-1 rounded-md">
          <AppIcon size="small" />
        </div>
        <div className="text-base font-bold">{title}</div>
        <div className="text-xs opacity-80 bg-indigo-700 px-2 py-0.5 rounded-full">v1.0.0</div>
      </div>
      <div className="flex items-center space-x-2">
        {isMobile
          ? (
            <div className='flex items-center justify-center h-8 w-8 cursor-pointer hover:bg-indigo-700 rounded-md transition-colors duration-200'
              onClick={() => onCreateNewChat?.()}
            >
              <PencilSquareIcon className="h-5 w-5 text-white" />
            </div>)
          : (
            <>
              <div className='flex items-center justify-center h-8 w-8 cursor-pointer hover:bg-indigo-700 rounded-md transition-colors duration-200'>
                <MoonIcon className="h-5 w-5 text-white" />
              </div>
              <div className='flex items-center justify-center h-8 w-8 cursor-pointer hover:bg-indigo-700 rounded-md transition-colors duration-200'>
                <Cog6ToothIcon className="h-5 w-5 text-white" />
              </div>
              <div className='flex items-center justify-center h-8 w-8 cursor-pointer hover:bg-indigo-700 rounded-md transition-colors duration-200'>
                <InformationCircleIcon className="h-5 w-5 text-white" />
              </div>
              <button 
                className="ml-2 px-3 py-1.5 bg-white text-indigo-600 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors duration-200"
                onClick={() => onCreateNewChat?.()}
              >
                新对话
              </button>
            </>
          )}
      </div>
    </div>
  )
}

export default React.memo(Header)
