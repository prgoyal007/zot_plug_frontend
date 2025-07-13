'use client'
import { Hello } from 'ui'
import { useQuery } from '@tanstack/react-query';
import { fetch_test } from './api_utils/api_actions';
import { useEffect } from 'react';

export default function Home() {

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
  }, [isLoading, test_data])

  return (
    <>
      {/* Tailwind in-line styling */}
      <div className="bg-red-500 w-full h-10"> test test</div>
      { /* Shared UI comp, check proj_root/ui to check how this works */}
      <Hello />
      <div className="bg-green-500 w-full h-10">
        {isLoading ? "Fetching_data" : "Data logged to client console"}
      </div>
    </>
  );
}
