import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button";
import Heading from "../../../../components/Heading";
import Input from "../../../../components/Input";
import { trpc } from "../../../../utils/trpc";
import { BiErrorCircle } from 'react-icons/bi'

interface AddForm {
  text: string
}

const Add: NextPage = () => {
  const { push, query } = useRouter()
  console.log(query)
  const mutation = trpc.event.add.useMutation({
    onSuccess: () => push(`/occasions/${query.occId}`),
  })
  const { register, handleSubmit } = useForm<AddForm>()

  return <div className="space-y-12">
    <Heading>
      New event
    </Heading>
    <form className="flex flex-col items-center gap-8" onSubmit={handleSubmit((data) => mutation.mutate({ text: data.text, occasionId: Number(query.occId) }))}>
      <Input label="Event name" {...register('text')} required />
      <div className="text-red-400 empty:hidden flex space-x-2 items-center">
        {mutation.error?.message}
      </div>
      <div className="flex gap-4">
        <Button type="submit">
          {mutation.isLoading ? <div>Loading...</div> : <span>Submit</span>}
        </Button>
        <Button type="button" onClick={() => push(`/occasions/${query.occId}`)}>
          Cancel
        </Button>
      </div>
    </form>
  </div>
}

export default Add