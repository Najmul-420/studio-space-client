export type StudioCategory =
  | 'Photo Studio'
  | 'Film Stage'
  | 'Podcast Lounge'
  | 'Music Suite'
  | 'Workshop'
  | 'Art Workshop';

export interface Studio {
  _id: string;
  title: string;
  category: StudioCategory;
  hourlyRate: number;
  thumbnail?: string;
  securityDeposit: number;
  maxCapacity: number;
  location: string | { address?: string; city?: string };
  imageUrl: string;
  images?: string[];
  amenities: string[];
  overview: string;
  hostEmail: string;
  hostName: string;
  rating?: number;
  reviews?: { _id?: string; authorName: string; rating: number; comment: string }[];
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Booking {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioImage?: string;
  userEmail: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: BookingStatus;
}

export interface User {
  name: string;
  email: string;
  photoUrl?: string;
}
