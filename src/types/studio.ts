export interface Studio {
  _id: string;
  title: string;
  category: 'Photo Studio' | 'Film Stage' | 'Podcast Lounge' | 'Music Suite' | 'Workshop';
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  amenities: string[];
  overview: string;
  hostEmail: string;
  hostName: string;
  rating?: number;
}

export interface Booking {
  _id: string;
  studioId: string;
  studioTitle: string;
  userEmail: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
}