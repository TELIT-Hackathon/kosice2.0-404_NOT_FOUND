import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';
import { MarkerF } from '@react-google-maps/api';
import BottomItem from '../components/BottomItem';

const containerStyle = {
    width: '100vw',
    height: '100vh',
};

const center = {
    lat: 48.731515,
    lng: 21.243395,
};

function MyComponent() {
    const [markers, setMarkers] = useState([]);
    const [role, setRole] = useState("passenger");

    const fetchMarkers = async () => {
        const response = await fetch('http://localhost:3500/markers');
        const data = await response.json();

        console.log(data);

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
                    zoom={10}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
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

            <div className='absolute bottom-0 left-0 w-full bg-white p-3 rounded-t-2xl'>
                <div className='flex flex-col items-center space-y-3'>
                    <h2 className='font-semibold text-2xl'>Pick your ride</h2>
                    <p className='text-gray-400 pb-4'>
                        Select desired driver from the list below
                    </p>
                    <ul className='w-full'>
                        <BottomItem />
                    </ul>
                </div>
                <div className='flex justify-between items-center border-t border-gray-300 pt-4'>
                    <div className='space-x-6 rounded bg-green-400 p-2'>
                        <button
                            onClick={() => setRole("passenger")}
                            className={`text-lg font-bold px-2 py-1 rounded-md transition-all ${
                                role === "passenger"
                                    ? 'bg-white text-green-400'
                                    : 'text-white'
                            }`}
                        >
                            Passenger
                        </button>
                        <button
                            onClick={() => setRole("driver")}
                            className={`text-lg font-bold px-3 py-1 rounded-md transition-all ${
                                role === "driver" ? 'bg-white text-green-400' : 'text-white'
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
