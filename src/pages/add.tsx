import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/Input";
import { trpc } from "../utils/trpc";

interface AddForm {
  text: string
  startDate: Date
  endDate: Date
}

const Add: NextPage = () => {
  const { push } = useRouter()
  const mutation = trpc.occasion.create.useMutation({
    onSuccess: ({ id }) => push(`/${id}`)
  })
  const { register, handleSubmit } = useForm<AddForm>()

  const handleAdd = (data: AddForm) => mutation.mutate({
    title: data.text,
    endDate: new Date(data.endDate),
    startDate: new Date(data.startDate),
  })

  return <div className="space-y-12">
    {mutation.isLoading && <div>Loading...</div>}
    <Heading>
      New event
    </Heading>
    <form className="flex flex-col items-center gap-8" onSubmit={handleSubmit(handleAdd)}>
      <Input {...register('text')} required />
      <Input {...register('startDate')} required type="date" />
      <Input {...register('endDate')} required type="date" />
      <div className="flex gap-4">
        <Button type="submit">
          Submit
        </Button>
        <Button type="button" onClick={() => push('/')}>
          Cancel
        </Button>
      </div>
    </form>
  </div>
}

export default Add