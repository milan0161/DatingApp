interface Member {
  id: number;
  userName: string;
  photoUrl: string;
  age: number;
  knownAs: string;
  created: string;
  lastActive: string;
  gender: string;
  introduction: string;
  lookingFor: string;
  interests: string;
  city: string;
  country: string;
  photos: Photo[];
}

interface Photo {
  id: number;
  url: string;
  isMain: boolean;
}

interface FormInput {
  introduction: string;
  lookingFor: string;
  interests: string;
  city: string;
  country: string;
}

interface Pagination<T> {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  data: T[];
}

interface PaginationRequest {
  page: number;
  itemsPerPage: number;
  minAge: number;
  maxAge: number;
  gender?: string;
  orderBy?: string;
}
