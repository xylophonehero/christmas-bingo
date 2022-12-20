import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button'
import Heading from '../../components/Heading'
import Input from '../../components/Input'
import { trpc } from '../../utils/trpc'

interface InviteForm {
  email: string
}

const Invite: NextPage = () => {
  const { query } = useRouter()
  const { register, handleSubmit } = useForm<InviteForm>()
  const mutation = trpc.occasion.invite.useMutation()
  return (
    <div>
      <Heading>
        Invite someone
      </Heading>
      <form onSubmit={handleSubmit((data) => mutation.mutate({ email: data.email, id: query.occ as string }))}>
        <Input {...register('email')} required />
        <Button type="submit">
          Invite user
        </Button>
      </form>
    </div>
  )
}

export default Invite