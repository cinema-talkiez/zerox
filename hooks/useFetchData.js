import axios from "axios";
import { useEffect, useState } from "react";
import { useError } from "@/contexts/ErrorContext"; // Import the useError hook to access the error context

function useFetchData(apiEndpoint) {
  const [alldata, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [allMovie, setAllMovie] = useState([]);
  const { setNetworkError } = useError(); // Access the setNetworkError function from the context

  useEffect(() => {
    if (initialLoad) {
      // Set initialLoad to false to prevent the API call on subsequent renders
      setInitialLoad(false);
      setLoading(false);
      return; // Exit useEffect early
    }

    // Set loading to true to indicate data fetching
    setLoading(true);

    const fetchAllData = async () => {
      try {
        const res = await axios.get(apiEndpoint);
        const alldata = res.data;
        setAllData(alldata);
        setAllMovie(alldata);
        setLoading(false); // Set loading state to false after data is fetched
        setNetworkError(null); // Reset network error on successful data fetch
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setLoading(false); // Set loading state false even if there's an error
        setNetworkError("Network Error: Unable to fetch data"); // Trigger global error state
      }
    };

    // Fetch movie data only if the API endpoint exists
    if (apiEndpoint) {
      fetchAllData(); // Call this function if API exists
    }

  }, [initialLoad, apiEndpoint, setNetworkError]); // Depend on initialLoad and apiEndpoint to trigger API call

  return { alldata, allMovie, loading };
}

export default useFetchData;

