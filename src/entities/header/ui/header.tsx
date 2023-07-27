import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const Header = () => {
  const session = useSession()
  const router = useRouter()

  const isAuth = session.status === 'authenticated'

  const handleLogout = () => {
    router.push('/').then(() => signOut())
  }

  return (
    <div className="flex justify-between items-center h-20 gap-3">
      <div className="flex-auto">
        <Link href="/">
          <Image src="/logo.png" width={150} height={50} alt="logo" />
        </Link>
      </div>
      {isAuth && <p>Привет, {session.data?.user.name}</p>}
      {isAuth && (
        <Link
          href="/events/create"
          className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 duration-75"
        >
          Создать
        </Link>
      )}
      {isAuth ? (
        <button onClick={handleLogout}>
          <Image src="/logout-icon.svg" width={24} height={24} alt="icon" />
        </button>
      ) : (
        <Link href="/api/auth/signin">
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
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </Link>
      )}
    </div>
  )
}
