import { Event } from '@prisma/client';
import Link from 'next/link';
import React from 'react'
import { FiPlus } from 'react-icons/fi';
import { trpc } from '../utils/trpc';
import Button from './Button';

type IEvent = Event & {
  _count: {
    eventInstance: number;
  };
}

const Event = ({ id, _count: count, text }: IEvent) => {
  const utils = trpc.useContext()
  const mutation = trpc.event.addInstance.useMutation({
    onSuccess: () => utils.occasion.getById.invalidate()
  })

  return (
    <li key={id} className="grid grid-cols-[2ch_1fr_auto] gap-2 items-center">
      <div>
        {count.eventInstance}
      </div>
      <div>
        <Link href={`events/${id}`}>
          {text}
        </Link>
      </div>
      <Button round onClick={() => mutation.mutate({ eventId: id })}>
        <FiPlus />
      </Button>
    </li>
  )
}

export default Event