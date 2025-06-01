import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const TrackOrder = () => {
  const { trackingNumber } = useParams();
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTrackingDetails() {
      try {
        const response = await axios.post("http://127.0.0.1:8000/fedex/track/", { trackingNumber });
        setOrderData(response.data.tracking_details.reverse());
      } catch (error) {
        console.error("Tracking error:", error);
      } finally {
        setLoading(false);
      }
    }
    getTrackingDetails();
  }, [trackingNumber]);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex flex-col items-center mb-10 text-center">
          <svg className="h-28 text-orange-400 fill-current mb-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 113.21">
            <path d="M82.42,60a3.52,3.52,0,1,0,3.2,3.51A3.36,3.36,0,0,0,82.42,60Z" />
            <path d="M76.64,113.21l1.25-32.57c-8.45,8.48-15,14.79-27.82,15.12-4.06-.15-14.62-.46-18.68-.91C26.44,94.29,23,94.5,19.85,90,15,83,21.41,74.84,27.71,76.15c7.11.63,24,2.24,28.85-3.71,5-4.8,8.9-11.5,15.44-13.63,36.83-12,50.8-7.64,50.79,5.9l0,48.5Z" />
            <path d="M56.5,29.66,40.2,20,47,19.3l20.74,9.11L56.5,29.66ZM17.27,37.23V70.57a17.77,17.77,0,0,0-6.2,9.26L0,73.22.34,26.56,17.27,37.23Z" />
            <path d="M83.5,7.6H67.92c-.52,0-.79.45-.93,1l-1.81,6.51c-.14.5.42,1,.93,1H78.69a24.27,24.27,0,0,0-1.16,7.43c0,13,10.15,23.46,22.68,23.46s22.67-10.5,22.67-23.46S112.73,0,100.21,0A22.3,22.3,0,0,0,83.5,7.6Z" />
          </svg>
          <p className="text-white text-xl font-semibold">Tracking Number:</p>
          <p className="text-teal-300 text-lg font-mono">{trackingNumber}</p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <svg className="animate-spin h-8 w-8 text-pink-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        ) : (
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <ol className="relative border-l border-teal-400 pl-6">
              {orderData.map((item, index) => (
                <li key={index} className="mb-8">
                  <span className="absolute w-4 h-4 bg-teal-500 rounded-full -left-2 top-1.5"></span>
                  <h3 className="text-white font-semibold">{item.eventDescription}</h3>
                  <p className="text-sm text-gray-300 mt-1">Scanned at: {item.city || 'FedEx Facility'}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </>
  );
};

export default TrackOrder;