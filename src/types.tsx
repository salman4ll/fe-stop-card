export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
  onClick?: () => void;
};

export type TableHead = {
  id: string;
  nama: string;
  telp: string;
};

export type data = {
  id: number;
  nama: string;
  alamat: string;
};

export interface User {
    id_user: string;
    name: string;
    email: string;
    role: string;
    is_verified: number;
}

export interface Location{
    id_location: string;
    name: string;
}

export interface Insiden {
    id_incident: string;
    title: string;
    description: string;
    location_name: string;
    time_incident: string;
    category: string;
    status: string;
    saran: string;
    image: string;
    keyword: string;
}