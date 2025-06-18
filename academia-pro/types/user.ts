export interface User {
  id: string;
  name: string;
  cpf: string;
  age: number;
  type: 'student' | 'gym_partner' | 'guardian';
  profilePhoto?: string;
  registrationNumber?: string;
  enrollmentProof?: string;
  gym?: string;
  phone?: string;
  email?: string;
  benefits: Benefit[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Benefit {
  id: string;
  type: string;
  description: string;
  discount: number;
  status: 'active' | 'expired' | 'pending';
  validUntil: Date;
  icon: string;
}

export interface Gym {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  modalities: string[];
  rating: number;
  distance?: number;
  photos: string[];
  workingHours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  isPartner: boolean;
}

export interface WorkoutSession {
  id: string;
  userId: string;
  gymId: string;
  date: Date;
  duration: number;
  checkInTime: string;
  checkOutTime?: string;
  qrCodeUsed: boolean;
}