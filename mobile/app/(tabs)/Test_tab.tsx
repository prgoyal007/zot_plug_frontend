import { Test } from "ui/test"
import { test } from "api/data"
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Test_tab() {

  const base_url_api = 'http://localhost:4000'

  /* useQuery is best for any kind of data fetching logic */
  const { data: test_data, isLoading } = useQuery({
    queryKey: ['test'],
    queryFn: async () => await test(base_url_api)
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
