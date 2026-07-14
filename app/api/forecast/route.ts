import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

function getApiKey(): string {
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key) {
    throw new Error(
      "OpenWeatherMap API key is missing. Add OPENWEATHER_API_KEY to your .env.local file."
    );
  }
  return key;
}

export async function GET(req: NextRequest) {
  try {
    const key = getApiKey();
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    let upstreamUrl: string;
    if (city) {
      upstreamUrl = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${key}&units=metric&cnt=40`;
    } else if (lat && lon) {
      upstreamUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric&cnt=40`;
    } else {
      return NextResponse.json(
        { message: "Missing 'city' or 'lat'/'lon' query parameters." },
        { status: 400 }
      );
    }

    const res = await fetch(upstreamUrl, { next: { revalidate: 300 } });
    const data = await res.json();

    if (!res.ok) {
      const message =
        res.status === 404
          ? city
            ? `City "${city}" not found.`
            : "Location not found."
          : `Forecast API error (${res.status}). Please try again.`;
      return NextResponse.json({ message }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected server error.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
