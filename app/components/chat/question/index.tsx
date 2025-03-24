'use client'
import type { FC } from 'react'
import React from 'react'
import type { IChatItem } from '../type'
import styles from '../style.module.css'

import { Markdown } from '@/app/components/base/markdown'
import ImageGallery from '@/app/components/base/image-gallery'

type IQuestionProps = Pick<IChatItem, 'id' | 'content' | 'useCurrentUserAvatar'> & {
  imgSrcs?: string[]
}

const Question: FC<IQuestionProps> = ({ id, content, useCurrentUserAvatar, imgSrcs }) => {
  const userName = ''
  return (
    <div className='flex items-start justify-end mb-6' key={id}>
      <div className='mr-3'>
        <div className={`${styles.question} relative text-sm text-gray-900`}>
          <div
            className={'py-3 px-4 text-white rounded-2xl shadow-md'}
            style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
          >
            {imgSrcs && imgSrcs.length > 0 && (
              <ImageGallery srcs={imgSrcs} />
            )}
            <Markdown content={content} />
          </div>
        </div>
      </div>
      {useCurrentUserAvatar
        ? (
          <div className='w-10 h-10 shrink-0 leading-10 text-center rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md'>
            {userName?.[0]?.toLocaleUpperCase() || '用'}
          </div>
        )
        : (
          <div 
            className={styles.messageAvatar}
            style={{
              backgroundImage: 'url(/assets/user-avatar.svg)'
            }}
          ></div>
        )}
    </div>
  )
}

export default React.memo(Question)
