import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { useAuth } from "../Firebase";
import { distance } from "framer-motion";
import { useRouter } from "next/router";

const CreatePage = () => {
  const [age, setAge] = useState("");
  const [seats, setSeats] = useState("");
  const [position, setPosition] = useState({ lat: null, lng: null });
  const [durationTime, setDurationTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [co2, setCo2] = useState(0);
  const router = useRouter();

  const containerStyle = {
    width: "100vw",
    height: "40vh",
  };

  const center = {
    lat: 48.731515,
    lng: 21.243395,
  };

  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };

  const handleChangeSeats = (event) => {
    setSeats(event.target.value);
  };

  const user = useAuth();

  console.log(user);

  const saveRoute = async () => {
    const data = {
      lat: position.lat,
      lon: position.lng,
      user: {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        distance: `${Math.floor(Math.random() * (150 - 10)) + 10} meters away`,
      },
      rating: Math.floor(Math.random() * (5 - 3)) + 3,
      duration: `${durationTime}min`,
      distance: `${distance}km`,
      co2: `${co2} g`,
      schedule: {
        monday: "6:00 - 6:15",
        tuesday: "6:00 - 6:15",
        wednesday: "6:00 - 6:15",
        thursday: "6:00 - 6:15",
        friday: "6:00 - 6:15",
        saturday: null,
        sunday: null,
      },
    };

    fetch(" http://localhost:3500/markers", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(function (res) {
        console.log(res);
        router.push("/");
      })
      .catch(function (res) {
        console.log(res);
      });
  };

  useEffect(() => {
    if (!!position.lng && !!position.lng) {
      console.log(position, "position");
      setDurationTime(Math.floor(Math.random() * (20 - 5)) + 5);
      setDistance(Math.floor(Math.random() * (20 - 5)) + 5);
      setCo2(Math.floor(Math.random() * (2000 - 500)) + 500);
    }
  }, [position]);

  return (
    <div>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            gestureHandling: "greedy",
          }}
          onClick={(event) => {
            setPosition({
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            });
          }}
        >
          {position && (
            <MarkerF
              position={{
                lat: parseFloat(position.lat),
                lng: parseFloat(position.lng),
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>

      <div className="p-4 space-y-6">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Destination</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChangeAge}
          >
            <MenuItem value={10}>U.S Stel</MenuItem>
            <MenuItem value={20}>TUKE</MenuItem>
            <MenuItem value={30}>T-systems</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Free seats</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={seats}
            label="Age"
            onChange={handleChangeSeats}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>

        <div>
          <p className="mb-2">Departure time:</p>

          <div className="flex space-x-2">
            <TextField
              id="outlined-basic"
              label="From"
              variant="outlined"
              size="small"
              type="number"
            />

            <TextField
              id="outlined-basic"
              label="To"
              variant="outlined"
              size="small"
              type="number"
            />
          </div>
        </div>

        <div className="flex text-sm">
          <div className="flex-1">
            <p>
              <span className="font-bold">duration:</span> {durationTime}min
            </p>
            <p>
              <span className="font-bold">distance:</span> {distance}km
            </p>
            <p>
              <span className="font-bold">CO2 cost:</span> {co2}g
            </p>
          </div>
          <div className="flex-1">
            <p>you will earn for each person each ride</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-green rounded-full px-6 py-2 text-xl"
            onClick={saveRoute}
          >
            Create Route
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
