import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/Input";
import { trpc } from "../utils/trpc";

interface AddForm {
  text: string
}

const Add: NextPage = () => {
  const router = useRouter()
  const mutation = trpc.event.add.useMutation({
    onSuccess: () => router.push('/')
  })
  const { register, handleSubmit } = useForm<AddForm>()

  return <div className="space-y-12">
    {mutation.isLoading && <div>Loading...</div>}
    <Heading>
      New event
    </Heading>
    <form className="flex flex-col items-center gap-8" onSubmit={handleSubmit((data) => mutation.mutate({ text: data.text }))}>
      <Input {...register('text')} required />
      <div className="flex gap-4">
        <Button type="submit">
          Submit
        </Button>
        <Button type="button" onClick={() => router.push('/')}>
          Cancel
        </Button>
      </div>
    </form>
  </div>
}

export default Add