import Link from 'next/link'
import React from 'react'
import { trpc } from '../utils/trpc'

const UserOccasions = () => {
  const occasions = trpc.occasion.getAll.useQuery()

  if (!occasions.data) return <div>Loading...</div>

  if (occasions.data.length === 0) return <div>So empty</div>

  return (
    <ul>
      {occasions.data.map((occasion) => (
        <li key={occasion.id}>
          <Link href={`/${occasion.id}`}>
            {occasion.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default UserOccasions