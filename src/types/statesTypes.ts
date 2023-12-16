export interface GlobalState {
   services: ServicesState;
   products: ProductsState;
   auth: AuthState;
   categories: CategoriesState;
}

export interface AuthState {
   isLoggedIn: boolean;
}

export interface ServicesState {
   isLoading: boolean;
   error: any;
   services: ServiceType[];
}

export interface ProductsState {
   isLoading: boolean;
   error: any;
   products: ProductType[];
   count: number;
   isSuccessed: boolean;
   loadingChange: boolean;
}

export interface CategoriesState {
   isLoading: boolean;
   error: any;
   categories: CategoryType[];
}

export interface ServiceType {
   id: string;
   name: string;
   type: number;
   image: null;
}

export interface ProductType {
   category: { id: number; name: string };
   code: string;
   count: number;
   id: number;
   period_in_days: number;
   price: string;
   service: { id: number; name: string; type: number };
   status: number;
   user: null | any;
   serviceType?: string;
}

export interface CategoryType {
   id: number;
   name: string;
   image: null;
}
