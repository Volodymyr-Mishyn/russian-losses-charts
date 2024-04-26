import { fetchData } from "@/_core/data/fetch-data";

// Mocking the global fetch
global.fetch = jest.fn();
const SECONDS_IN_HOUR = 3600;
describe("fetchData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch data successfully and return formatted data", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([{ data: "someData", date: "2022-01-01", dayOfInvasion: 1 }]),
    });

    const result = await fetchData();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${process.env.API_URL}/api/mod?flat=true`, {
      next: { revalidate: SECONDS_IN_HOUR },
    });
    expect(result).toEqual([{ data: "someData", date: new Date("2022-01-01"), dayOfInvasion: 1 }]);
  });

  it("should throw an error when fetch fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Failed to fetch data",
    });

    await expect(fetchData()).rejects.toThrow("Failed to fetch data");
  });
});
