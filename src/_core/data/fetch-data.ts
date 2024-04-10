import { DayResultFlat, RussianLossesData } from '../models/loss-entities';

export async function fetchData(): Promise<RussianLossesData> {
  const response = await fetch(`${process.env.API_URL}/api/mod?flat=true`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data: Array<DayResultFlat> = await response.json();
  return data.map((item) => ({ data: item.data, date: new Date(item.date), dayOfInvasion: item.dayOfInvasion }));
}
