import { Hello } from "ui"
import { test } from "api/data"
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Test() {

  /* useQuery is best for any kind of data fetching logic */
  const { data: test_data, isLoading } = useQuery({
    queryKey: ['test'],
    queryFn: async () => await test()
  })

  useEffect(() => {
    if (!isLoading) {
      console.log(test_data)
    }
  }, [isLoading, test_data])

  return (
    <Hello />
  );
}
