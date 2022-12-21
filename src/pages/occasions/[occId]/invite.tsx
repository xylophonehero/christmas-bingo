import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../components/Button'
import Heading from '../../../components/Heading'
import Input from '../../../components/Input'
import { trpc } from '../../../utils/trpc'

interface InviteForm {
  email: string
}

const Invite: NextPage = () => {
  const { query, push } = useRouter()
  const { register, handleSubmit } = useForm<InviteForm>()
  const mutation = trpc.occasion.invite.useMutation({
    onSuccess: () => push(`/occasions/${query.occId}`)
  })

  return (
    <>
      <Heading>
        Invite someone
      </Heading>
      <form
        className='flex flex-col items-center gap-8'
        onSubmit={handleSubmit((data) => mutation.mutate({ email: data.email, id: Number(query.occId) }))}>
        <Input label="Email" {...register('email')} required />
        <div className='flex gap-4'>
          <Button type="submit">
            Invite user
          </Button>
          <Button type="button" onClick={() => push(`/occasions/${query.occId}`)}>
            Cancel
          </Button>
        </div>
      </form>
    </>
  )
}

export default Invite