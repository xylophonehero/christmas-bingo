import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiPlus } from "react-icons/fi";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import { trpc } from "../../utils/trpc";

const Occasion: NextPage = () => {
  const { query } = useRouter()
  const occasionQuery = trpc.occasion.getById.useQuery({ id: query.occ as string })
  // const eventsByOccasion = trpc.event.eventsByOccasion.useQuery({ occasionId: query.occ as string })
  const utils = trpc.useContext()
  const mutation = trpc.event.addInstance.useMutation({
    onSuccess: () => utils.occasion.getById.invalidate()
  })

  if (occasionQuery.isLoading || !occasionQuery.data) return <div>Loading...</div>

  const { endDate, events, startDate, title } = occasionQuery.data

  return (
    <div>
      <Heading>
        {title}
      </Heading>
      <div>
        <span>
          {startDate.toDateString()}
        </span>
        -
        <span>
          {endDate.toDateString()}
        </span>
      </div>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="grid grid-cols-[2ch_1fr_auto] gap-2 items-center">
            <div>
              {event._count.eventInstance}
            </div>
            <div>
              <Link href={`${query.occ}/${event.id}`}>
                {event.text}
              </Link>
            </div>
            <Button round onClick={() => mutation.mutate({ eventId: event.id })}>
              <FiPlus />
            </Button>
          </li>
        ))}
      </ul>
      <div className="flex gap-4">
        <Link href={`/${query.occ}/add`}>
          <Button>
            Add event
          </Button>
        </Link>
        <Link href={`${query.occ}/invite`}>
          <Button>
            Invite
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Occasion