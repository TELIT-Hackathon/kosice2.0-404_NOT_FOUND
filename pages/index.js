import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { MarkerF } from '@react-google-maps/api';
import BottomItem from '../components/BottomItem';

const containerStyle = {
    width: '100vw',
    height: '80vh',
};

const serverUrl = "https://json-server-nine-beige.vercel.app/api/markers";


function MyComponent() {
    const [markers, setMarkers] = useState([]);
    const [role, setRole] = useState("passenger");
    const [center, setCenter] = useState({
        lat: 48.731515,
        lng: 21.243395,
    })
    const [zoom, setZoom] = useState(10);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchMarkers = async () => {
        const response = await fetch(serverUrl);
        const data = await response.json();

        console.log(data)

        return data;
    };

    useEffect(() => {
        fetchMarkers().then((data) => setMarkers(data));
    }, []);

    return (
        <div>
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
                        gestureHandling: "greedy"
                    }}
                >
                    {markers?.map((item, index) => {
                        return (
                            <MarkerF
                                key={index}
                                position={{
                                    lat: parseFloat(item.lat),
                                    lng: parseFloat(item.lon),
                                }}
                            />
                        );
                    })}
                </GoogleMap>
            </LoadScript>

            <div className='absolute bottom-0 left-0 w-full bg-white p-3 pt-6 rounded-t-2xl group'>
                <div className='flex flex-col items-center space-y-2'>
                    <div className="text-center space-y-3" onClick={() => setModalOpen(prev => !prev)}>
                        <h2 className='font-semibold text-2xl'>Pick your ride</h2>
                        <p className='text-gray-400 pb-4'>
                            Select desired driver from the list below
                        </p>
                    </div>
                    <ul className={`w-full space-y-2 py-2 border-t border-gray-300 overflow-hidden max-h-0 transition-all ${modalOpen ? "max-h-[1000px]" : ""}`}>
                        {markers?.map((marker, index) => {
                            return <BottomItem key={index} img={marker?.user?.photo} name={marker?.user?.name} text={marker?.user?.distance} onClick={() => {
                                setCenter({
                                    lat: parseFloat(marker.lat),
                                    lng: parseFloat(marker.lon),
                                })
                                setModalOpen(false)
                                setZoom(16)
                            }
                            }/>
                        })}
                    </ul>
                </div>
                <div className='flex justify-between items-center  pt-4'>
                    <div className='space-x-6 rounded-xl bg-green p-2'>
                        <button
                            onClick={() => setRole("passenger")}
                            className={`text-lg font-bold px-2 py-1 rounded-md transition-all ${
                                role === "passenger"
                                    ? 'bg-white text-green'
                                    : 'text-white'
                            }`}
                        >
                            Passenger
                        </button>
                        <button
                            onClick={() => setRole("driver")}
                            className={`text-lg font-bold px-3 py-1 rounded-md transition-all ${
                                role === "driver" ? 'bg-white text-green' : 'text-white'
                            }`}
                        >
                            Driver
                        </button>
                    </div>

                    <div>image</div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(MyComponent);
