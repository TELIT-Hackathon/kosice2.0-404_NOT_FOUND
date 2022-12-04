import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { MarkerF } from "@react-google-maps/api";
import BottomItem from "../components/BottomItem";
import Header from "../components/Header";
import { useRouter } from "next/router";
import { Fab } from "@mui/material";
import Link from "next/link";

const containerStyle = {
  width: "100vw",
  height: "80vh",
};

const serverUrl = "http://localhost:3500";

function MyComponent() {
  const [markers, setMarkers] = useState([]);
  const [role, setRole] = useState("passenger");
  const [center, setCenter] = useState({
    lat: 48.731515,
    lng: 21.243395,
  });
  const [zoom, setZoom] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const fetchMarkers = async () => {
    const response = await fetch(`${serverUrl}/markers`);
    const data = await response.json();

    return data;
  };

  useEffect(() => {
    fetchMarkers().then((data) => {
      setMarkers(data);
    });
  }, []);

  return (
    <div>
      <Header />
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            gestureHandling: "greedy",
          }}
          onClick={(event) => console.log(event.latLng.lat())}
        >
          {markers?.map((item, index) => {
            return (
              <MarkerF
                key={index}
                position={{
                  lat: parseFloat(item.lat),
                  lng: parseFloat(item.lon),
                }}
                onClick={() => setSelectedMarker(item)}
              />
            );
          })}
        </GoogleMap>
      </LoadScript>

      {!selectedMarker ? (
        <div className="fixed bottom-0 left-0 w-full bg-white p-3 pt-3 rounded-t-2xl group">
          <div className="flex flex-col items-center space-y-2">
            <div
              className="text-center flex flex-col items-center space-y-3 cursor-pointer group"
              onClick={() => setModalOpen((prev) => !prev)}
            >
              <div className="h-1 w-24 bg-gray-200 rounded-full mb-2 group-hover:w-32 transition-all"></div>
              <h2 className="font-semibold text-2xl">Pick your ride</h2>
              <p className="text-gray-400 pb-4">
                Select desired driver from the list below
              </p>
            </div>
            <ul
              className={`w-full space-y-2 py-2 border-t border-gray-300 overflow-hidden max-h-0 transition-all ${
                modalOpen ? "max-h-[1000px]" : ""
              }`}
            >
              {markers?.map((marker, index) => {
                return (
                  <BottomItem
                    key={index}
                    img={marker?.user?.photo}
                    name={marker?.user?.name}
                    text={marker?.user?.distance}
                    onClick={() => {
                      setCenter({
                        lat: parseFloat(marker.lat),
                        lng: parseFloat(marker.lon),
                      });
                      setModalOpen(false);
                      setZoom(16);
                      setSelectedMarker(marker);
                    }}
                  />
                );
              })}
            </ul>
          </div>

          <div className="flex justify-end items-center  pt-4">
            <Link href="/create">
              <button
                onClick={() => setRole("passenger")}
                className={`text-xl font-bold px-4 py-2 rounded-md transition-all bg-green text-white hover:scale-105 transition`}
              >
                + Passenger
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 w-full bg-white p-3 rounded-t-2xl group">
          <div className="flex justify-between items-center text-2xl font-bold p-2">
            <button onClick={() => setSelectedMarker(null)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="#2EBFA5"
                className="w-8 h-10 -rotate-90"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            </button>
            <h3>Ride to US Steel</h3>
            <div className="w-8"></div>
          </div>

          <ul className="font-light">
            <li className="flex border-t border-gray-200 p-4 text-sm space-x-2">
              <h4 className="w-1/3 text-lg font-bold">Your driver:</h4>
              <div className="flex items-center">
                <ul className="flex flex-col items-start">
                  <li className="font-bold text-base">
                    {selectedMarker?.user?.name}
                  </li>
                  <li className="underline">{selectedMarker?.user?.email}</li>
                  <li className="flex">
                    <span className="font-semibold">rating:</span>{" "}
                    {selectedMarker?.user?.rating}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#FFD700"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#FFD700"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  </li>
                </ul>
                <img
                  src={selectedMarker?.user?.photo}
                  alt=""
                  className="w-14 h-14 rounded-full"
                />
              </div>
            </li>

            <li className="flex  border-t border-gray-200 w-full p-4 text-sm space-x-2">
              <h4 className="w-1/3 text-lg font-bold">Route:</h4>
              <div className="flex-1">
                <ul className="flex flex-col">
                  <li>
                    <span className="font-semibold">duration:</span>{" "}
                    {selectedMarker?.duration}
                  </li>
                  <li>
                    <span className="font-semibold">distance:</span>{" "}
                    {selectedMarker?.distance}
                  </li>
                  <li>
                    <span className="font-semibold">average CO2 cost:</span>{" "}
                    {selectedMarker?.co2}
                  </li>
                </ul>
                <img src="" alt="" />
              </div>
            </li>

            <li className="flex justify-between border-t border-gray-200 p-4 text-sm space-x-2">
              <h4 className="w-1/3 text-lg font-bold">Schedule:</h4>
              <div className="flex-1">
                <ul className="flex flex-col text-end w-fit items-start">
                  {selectedMarker?.schedule &&
                    Object.keys(selectedMarker?.schedule).map((day) => {
                      return (
                        <li key={day}>
                          <span className="font-semibold">{day}</span>:{" "}
                          {selectedMarker?.schedule?.[day] ?? "no ride"}
                        </li>
                      );
                    })}
                </ul>
                <img src="" alt="" />
              </div>
            </li>
          </ul>
        </div>
      )}

      <div></div>
    </div>
  );
}

export default React.memo(MyComponent);
