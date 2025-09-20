'use client'
import { Test } from 'ui/test'
import { TestButton } from 'ui/test_button'
import BasicButton from 'ui/components/basic_button'
import DailyTarget from 'ui/dailyTarget/comp'
import { useQuery } from '@tanstack/react-query'
import { fetch_test } from './api_utils/api_actions'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  /* useQuery is best for any kind of data fetching logic */
  const { data: test_data, isLoading } = useQuery({
    queryKey: ['test'],
    queryFn: async () => await fetch_test()
  })

  /* useEffect is situational, use if you want a action to run on first render */
  useEffect(() => {
    if (!isLoading) {
      console.log(test_data)
    }
    if (progress < 1200) {

      const interval = setInterval(() => {
        setProgress(prev => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isLoading, test_data, progress, setProgress])

  return (
    <>
      {/* Tailwind in-line styling */}
      <div className="bg-red-500 w-full h-10"> test test</div>
      { /* Shared UI comp, check proj_root/ui to check how this works */}
      <div className="bg-green-500 w-full h-10">
        {isLoading ? "Fetching_data" : "Data logged to client console"}
      </div>
      <div className="flex flex-col justify-center mt-4 gap-y-4">
        <Test />
        <TestButton onPress={async () => {
          const data = await fetch_test()
          console.log(data)
        }} />
        <BasicButton text='Login' onPress={() => router.push('/auth?mode=login')} />
        <DailyTarget height={25} currProgress={progress} maxProgress={1200} />
      </div>
    </>
  );
}
