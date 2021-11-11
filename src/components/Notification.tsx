import { AnimatePresence, motion } from 'framer-motion'
import { createContext, FunctionComponent, useCallback, useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import GhostButton from './ui/GhostButton'

type NotificationContextType = {
    message: string | null,
    set(value: string | null): void
}

const CloseButton = styled(GhostButton)`
    font-size: 1.4rem;
    margin: 0;

    span {
        margin: 0;
    }
`

const NotificationContext = createContext<NotificationContextType>({
  message: null,
  set: (_: string) => {}
})

export function useNotificationContext() {
  const ctx = useContext(NotificationContext)
  return ctx
}

const notificationChoregraphy = {
  from: { y: 20, opacity: 0 },
  to: { y: 0, opacity: 1 },
  exit: { opacity: 0 }
}

const Notification: FunctionComponent<{ timeout?: number }> = ({ timeout = 2000 }) => {
  const { message, set } = useNotificationContext()
  const hasMessage = !!message

  useEffect(() => {
    const t = setTimeout(() => {
      set(null)
    }, timeout)
    return () => clearTimeout(t)
  }, [message, set])

  return createPortal((
        <>
            <AnimatePresence>
              {hasMessage && (
                  <motion.div className='modal' variants={notificationChoregraphy}
                      initial='from' animate='to' exit='exit'>
                      { message }
                      <CloseButton onClick={() => set(null)} type='button'>
                          <span>&times;</span>
                          <span className="visually-hidden">Close</span>
                      </CloseButton>
                </motion.div>) }
            </AnimatePresence>
        </>), document.querySelector('#notification')!)
}

export const NotificationProvider: FunctionComponent<{}> = ({ children }) => {
  const [notification, setNotification] = useState<string | null>(null)

  const set = useCallback((value: string | null) => {
    setNotification(value)
  }, [])

  return (
    <NotificationContext.Provider value={{ message: notification, set }}>
          {children}
    </NotificationContext.Provider>
  )
}

export default Notification
