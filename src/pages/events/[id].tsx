import type { NextPage } from "next";
import { useRouter } from "next/router";
import Heading from "../../components/Heading";
import { trpc } from "../../utils/trpc";

const Event: NextPage = () => {
  const { query } = useRouter()
  const event = trpc.event.getById.useQuery({ id: query.id as string })
  const eventInstances = trpc.event.instancesByEvent.useQuery({ eventId: query.id as string })

  return <div className="flex flex-col gap-12">
    <Heading>
      {event.data?.text}
    </Heading>
    <ul className="flex flex-col gap-2">
      {eventInstances.data?.map((eventInstance) => (
        <li key={eventInstance.id} className="flex gap-2">
          <div>
            Created by {eventInstance.user.name}
          </div>
          <div>
            at {eventInstance.createdAt.toLocaleString()}
          </div>
        </li>
      ))}
    </ul>
  </div>
}

export default Event