import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function CardSkeleton({cards}) {
  return (
 <>
          <div className='py-3'>
        {Array(cards).fill(0).map((item, index) => (
        <div key={index} className='skeleton-animation my-4 px-5 '><Skeleton width={200}height={12} /></div>
    ))}
    </div>
        </>

  )  
}
