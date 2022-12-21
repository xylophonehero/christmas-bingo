import type { Occasion } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import { trpc } from '../utils/trpc'

const getDayDifference = (start: number, end: number) => {
  const dayDiff = (end - start) / (24 * 60 * 60 * 1000)
  return Math.ceil(dayDiff)
}

const occasionStatus = (occasion: Occasion) => {
  const dateNow = Date.now()

  if (occasion.startDate.getTime() > dateNow) {
    const dayDifference = getDayDifference(dateNow, occasion.startDate.getTime())
    return `Starts in less than ${dayDifference} day${dayDifference === 1 ? '' : 's'}`
  }

  if (occasion.endDate.getTime() < dateNow) return 'Finished'

  return 'Started'
}

const UserOccasions = () => {
  const occasions = trpc.occasion.getAll.useQuery()

  if (!occasions.data) return <div>Loading...</div>

  if (occasions.data.length === 0) return <div>Create your first occasion</div>

  return (
    <ul className='flex flex-col gap-2'>
      {occasions.data.map((occasion) => (
        <li key={occasion.id}>
          <Link href={`/occasions/${occasion.id}`}>
            <span className='font-bold'>
              {occasion.title}
            </span>
            {' - '}
            <span>
              {occasionStatus(occasion)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default UserOccasions