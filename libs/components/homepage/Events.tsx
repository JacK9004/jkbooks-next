import React, { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';

interface EventData {
  eventTitle: string;
  date: string;
  description: string;
  imageSrc: string;
  link: string;
}

const eventsData: EventData[] = [
  {
    eventTitle: 'Book Launch: "Darknest Before The Dawn"',
    date: 'August 20, 2024',
    description: 'Join us for the launch of "Darknest Before The Dawn" by Mike Martin.',
    imageSrc: '/img/events/event1.webp',
    link: '/community/detail?articleCategory=EVENTS&id=66c778cadddc5e3013436e28',
  },
  {
    eventTitle: 'Author Meet & Greet: Mike Martin',
    date: 'September 10, 2024',
    description: 'Meet Jane Smith, the author of the best-selling novel "Dangerous Waters".',
    imageSrc: '/img/events/event2.webp',
    link: '/community/detail?articleCategory=EVENTS&id=66c77a35dddc5e3013436e30',
  },
  {
    eventTitle: 'Children’s Story Time',
    date: 'October 5, 2024',
    description: 'Bring your kids for a fun story time with popular children’s books.',
    imageSrc: '/img/events/event3.1.jpg',
    link: '/community/detail?articleCategory=EVENTS&id=66c77ae0dddc5e3013436e39',
  },
  {
    eventTitle: 'Poetry Reading Night',
    date: 'November 15, 2024',
    description: 'Experience an evening of beautiful poetry readings.',
    imageSrc: '/img/events/event4.png',
    link: '/community/detail?articleCategory=EVENTS&id=66c77bd1dddc5e3013436e41',
  },
];

const EventCard = ({ event }: { event: EventData }) => {
  const device = useDeviceDetect();

  return (
    <a href={event.link} style={{ textDecoration: 'none' }}>
      <Stack
        className="event-card"
        sx={{
          backgroundImage: `url(${event.imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative',
          width: '300px',
          height: '420px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      >
        <Stack
          sx={{
            position: 'absolute',
            bottom: '0',
            width: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            padding: '20px',
          }}
        >
          <Typography variant="h6">{event.eventTitle}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {event.date}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {event.description}
          </Typography>
        </Stack>
      </Stack>
    </a>
  );
};

const Events = () => {
  const device = useDeviceDetect();

  return (
    <Stack className="events">
      <Typography component="h4" className="white">
        BOOKS UPCOMING EVENTS
      </Typography>
      <Stack className="container">
        <Stack className="card-wrapper">
          {eventsData.map((event) => (
            <EventCard event={event} key={event.eventTitle} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Events;
