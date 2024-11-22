import Postaction from '@/app/component/PostAction/Postaction'
import { Suspense } from 'react'

const page = ({ params }) => {
  return (
    <>
      <Suspense fallback={null}>
        <Postaction params={params} />
      </Suspense>
    </>
  )
}

export default page