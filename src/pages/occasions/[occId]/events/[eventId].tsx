import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../../../../components/Button";
import Heading from "../../../../components/Heading";
import { trpc } from "../../../../utils/trpc";
import { FiTrash } from 'react-icons/fi'

const Event: NextPage = () => {
  const { query } = useRouter()
  const utils = trpc.useContext()
  const event = trpc.event.getById.useQuery({ id: Number(query.eventId) })
  const eventInstances = trpc.event.instancesByEvent.useQuery({ eventId: Number(query.eventId) })

  const deleteEventInstanceMutation = trpc.event.deleteInstance.useMutation({
    onSuccess: () => utils.event.instancesByEvent.invalidate()
  })

  return <>
    <Heading>
      {event.data?.text}
    </Heading>
    {eventInstances.data?.length === 0
      ? <div>This event has not happened yet</div>
      : <ul className="flex flex-col gap-2">
        {eventInstances.data?.map((eventInstance) => (
          <li key={eventInstance.id} className="flex gap-2 items-center">
            <div>
              Created by {eventInstance.user.name}
            </div>
            <div>
              at {eventInstance.createdAt.toLocaleString()}
            </div>
            <Button round onClick={() => deleteEventInstanceMutation.mutate({ eventId: eventInstance.id })}>
              <FiTrash />
            </Button>
          </li>
        ))}
      </ul>}
    <Link href={`/occasions/${query.occId}`}>
      <Button>
        Back to occasion
      </Button>
    </Link>
  </>
}

export default Event