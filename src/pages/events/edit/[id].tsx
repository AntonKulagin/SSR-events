import { CreateEventSchema, trpc } from '@/shared/api'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { CreateEventForm } from '@/features/create-event'

export default function Edit() {
  const router = useRouter()
  const session = useSession()

  const { data: event, isLoading } = trpc.event.findUnique.useQuery({
    id: Number(router.query.id),
  })

  const { mutate } = trpc.event.update.useMutation({
    onSuccess: data => {
      router.push(`/events/${data.id}`)
    },
  })

  const handleSubmit = (data: CreateEventSchema) => {
    mutate({ id: Number(router.query.id), ...data })
  }

  if (isLoading) {
    return 'Loading...'
  }

  if (session.status === 'unauthenticated') {
    return 'Forbidden'
  }

  if (session.data?.user.id !== event?.authorId) {
    return 'Тебе форматировать нельзя! Ты - не автор этого события!'
  }

  if (!event) {
    return 'No data'
  }

  return <CreateEventForm onSubmit={handleSubmit} {...event} />
}
