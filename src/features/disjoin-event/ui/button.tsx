import { trpc } from '@/shared/api'

type DisjoinEventButton = {
  eventId: number
  onSuccess?: () => void
}

export const DisjoinEventButton = ({ eventId, onSuccess }: DisjoinEventButton) => {
  const { mutate } = trpc.event.disjoin.useMutation({ onSuccess })

  const handleClick = () => {
    mutate({ id: eventId })
  }

  return (
    <button className="h-10 px-6 font-semibold rounded-md text-white bg-red-500" onClick={handleClick}>
      Покинуть событие
    </button>
  )
}
