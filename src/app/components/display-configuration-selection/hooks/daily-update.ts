import { useEffect, useState } from "react";

const useDailyUpdate = (): Date => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 1);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    const timeout = setTimeout(() => {
      setCurrentDate(new Date());
    }, msUntilMidnight);
    return () => clearTimeout(timeout);
  }, [currentDate]);

  return currentDate;
};

export default useDailyUpdate;
