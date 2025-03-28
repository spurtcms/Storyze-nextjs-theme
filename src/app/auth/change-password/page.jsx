import ChangePassword from '@/app/component/ChangePassword'
import React, { Suspense } from 'react'

export const metadata = {
    title: 'Change Password',
    description: '...',
  }

const Page = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
             <ChangePassword/>
            </Suspense>
        </div>
    )
}

export default Page
