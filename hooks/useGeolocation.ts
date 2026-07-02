"use client";

import { useState, useCallback } from "react";

interface GeolocationState {
  loading: boolean;
  error: string | null;
}

export function useGeolocation(onSuccess: (lat: number, lon: number) => void) {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    error: null,
  });

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState({ loading: false, error: "Geolocation is not supported by your browser." });
      return;
    }

    setState({ loading: true, error: null });

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setState({ loading: false, error: null });
        onSuccess(coords.latitude, coords.longitude);
      },
      (err) => {
        let message = "Unable to get your location.";
        if (err.code === err.PERMISSION_DENIED)
          message = "Location access denied. Please allow location in your browser settings.";
        else if (err.code === err.POSITION_UNAVAILABLE)
          message = "Location information is unavailable.";
        else if (err.code === err.TIMEOUT)
          message = "Location request timed out. Please try again.";

        setState({ loading: false, error: message });
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  }, [onSuccess]);

  return { ...state, getCurrentLocation };
}
