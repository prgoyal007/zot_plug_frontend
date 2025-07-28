import { Test } from "ui/test"
import { test } from "api/data"
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Test_tab() {

  const LOCAL_IP = 'your_local_ip'

  const BASE_URL = __DEV__
    ? `http://${LOCAL_IP}:4000`
    : 'https://your-production-url.com'

  /* useQuery is best for any kind of data fetching logic */
  const { data: test_data, isLoading } = useQuery({
    queryKey: ['test'],
    queryFn: async () => await test(BASE_URL)
  })

  useEffect(() => {
    if (!isLoading) {
      console.log(test_data)
    }
  }, [isLoading, test_data])

  return (
    <Test />
  );
}
