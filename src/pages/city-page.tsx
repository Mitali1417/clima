// import { useParams, useSearchParams } from "react-router-dom";
// import { useWeatherQuery, useForecastQuery } from "@/hooks/use-weather";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { AlertTriangle } from "lucide-react";
// import { CurrentWeather } from "../components/current-weather";
// import { HourlyTemperature } from "../components/hourly-temprature";
// import { WeatherDetails } from "../components/weather-details";
// import { WeatherForecast } from "../components/weather-forecast";
// import WeatherSkeleton from "../components/loading-skeleton";
// import { FavoriteButton } from "@/components/favorite-button";

// export function CityPage() {
//   const [searchParams] = useSearchParams();
//   const params = useParams();
//   const lat = parseFloat(searchParams.get("lat") || "0");
//   const lon = parseFloat(searchParams.get("lon") || "0");

//   const coordinates = { lat, lon };

//   const weatherQuery = useWeatherQuery(coordinates);
//   const forecastQuery = useForecastQuery(coordinates);

//   if (weatherQuery.error || forecastQuery.error) {
//     return (
//       <Alert variant="destructive">
//         <AlertTriangle className="h-4 w-4" />
//         <AlertDescription>
//           Failed to load weather data. Please try again.
//         </AlertDescription>
//       </Alert>
//     );
//   }

//   if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
//     return <WeatherSkeleton />;
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold tracking-tight">
//           {params.cityName}, {weatherQuery.data.sys.country}
//         </h1>
//         <div className="flex gap-2">
//           <FavoriteButton
//             data={{ ...weatherQuery.data, name: params.cityName }}
//           />
//         </div>
//       </div>

//       <div className="grid gap-6">
//         <CurrentWeather data={weatherQuery.data} />
//         <HourlyTemperature data={forecastQuery.data} />
//         <div className="grid gap-6 md:grid-cols-2 items-start">
//           <WeatherDetails data={weatherQuery.data} />
//           <WeatherForecast data={forecastQuery.data} />
//         </div>
//       </div>
//     </div>
//   );
// }





"use client"

import { useParams, useSearchParams } from "react-router-dom"
import { useWeatherQuery, useForecastQuery } from "../hooks/use-weather"
import { Alert, AlertDescription } from "../components/ui/alert"
import { AlertTriangle, ArrowLeft } from "lucide-react"
import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom"
import { CurrentWeather } from "../components/current-weather"
import { WeatherDetails } from "../components/weather-details"
import { WeatherForecast } from "../components/weather-forecast"
import { FavoriteButton } from "../components/favorite-button"
import WeatherSkeleton from "@/components/loading-skeleton"
import { HourlyTemperature } from "@/components/hourly-temprature"

export function CityPage() {
  const { cityName } = useParams<{ cityName: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const lat = Number.parseFloat(searchParams.get("lat") || "0")
  const lon = Number.parseFloat(searchParams.get("lon") || "0")
  const coordinates = { lat, lon }

  const weatherQuery = useWeatherQuery(coordinates)
  const forecastQuery = useForecastQuery(coordinates)

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4 flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>Failed to load weather data. Please try again.</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!weatherQuery.data || !forecastQuery.data || !cityName) {
    return <WeatherSkeleton />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/")}
              className="rounded-full bg-white/80 backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="space-y-1">
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {decodeURIComponent(cityName)}
              </h1>
              <p className="text-lg text-muted-foreground">{weatherQuery.data.sys.country}</p>
            </div>
          </div>
          <FavoriteButton data={{ ...weatherQuery.data, name: cityName }} />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:gap-8">
          {/* Current Weather - Full Width */}
          <CurrentWeather data={weatherQuery.data} />

          {/* Hourly Temperature - Full Width */}
          <HourlyTemperature data={forecastQuery.data} />

          {/* Details and Forecast - Side by Side on Desktop */}
          <div className="grid gap-6 lg:gap-8 xl:grid-cols-2">
            <WeatherDetails data={weatherQuery.data} />
            <WeatherForecast data={forecastQuery.data} />
          </div>
        </div>
      </div>
    </div>
  )
}
