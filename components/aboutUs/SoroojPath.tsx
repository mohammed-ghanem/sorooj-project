'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Collapse } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';

const SoroojPath = () => {
  const [items, setItems] = useState([]); // State to hold fetched items
  const [loading, setLoading] = useState(true); // State to handle loading state
  const defaultActiveKey = ['1']; // Default active key

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/static-pages/tracks-center-areas`,
          {
            headers: {
              'Content-Type': 'application/json',
              withCredentials: true,
            },
          }
        );
        const data = response.data.data.tracks;

        // Transform the API data to match the Collapse component format
        const formattedItems = data.map((track: any, index: number) => ({
          key: (index + 1).toString(),
          label: (
            <h5 className="font-bold font-cairo">
              <FontAwesomeIcon className="ml-2" icon={faPenNib} />
              {track.title}
            </h5>
          ),
          children: (
            <div className="font-cairo">
              <p>{track.content}</p>
            </div>
          ),
        }));

        setItems(formattedItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Show loading state while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Collapse
      items={items}
      defaultActiveKey={defaultActiveKey}
      accordion // Ensure only one item is active
      expandIconPosition="end"
      expandIcon={({ isActive }) =>
        isActive ? (
          <MinusCircleOutlined style={{ fontSize: '24px', color: '#fff' }} />
        ) : (
          <PlusCircleOutlined style={{ fontSize: '24px', color: '#9F854E' }} />
        )
      }
    />
  );
};

export default SoroojPath;
