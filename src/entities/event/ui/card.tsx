import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

type EventCardProps = {
  id: number
  title: string
  description: string | null
  date: Date
  action: ReactNode
  isAuthor: boolean
}

export const EventCard = ({ id, title, description, date, action, isAuthor }: EventCardProps) => {
  return (
    <div className="flex font-sans rounded-lg shadow-xl overflow-hidden">
      <div className="flex-none w-48 relative">
        <Image src="/poster.png" alt="" className="absolute inset-0 w-full h-full object-cover" fill />
      </div>
      <div className="flex-auto p-6 relative">
        <div className="flex flex-wrap -mt-6 pt-6 pb-6">
          <h1 className="flex-auto text-lg font-semibold text-slate-900">{title}</h1>
          <div className="text-lg font-semibold text-slate-500">{date.toDateString()}</div>
          <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">{description}</div>
        </div>
        <div className="flex space-x-4 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            {action}
            <Link
              href={`/events/${id}`}
              className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900 align-middle leading-10"
            >
              Подробнее
            </Link>
          </div>
        </div>
        {isAuthor && (
          <div className="absolute bottom-6 right-6">
            <Link href={`/events/edit/${id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
