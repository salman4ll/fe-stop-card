export type SideNavItem = {
  title: string | JSX.Element;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
  onClick?: () => void;
  onTouchStart?: () => void;
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

export interface Location {
  id_location: string;
  name: string;
}

export interface Category {
  id_category: string;
  name: string;
}

export interface TypeReporting {
  id_category: Category;
  id_type_reporting: string;
  name: string;
  control_measure: string[];
}

export interface Severity {
  id_severity: string;
  name: string;
  value: number;
}

export interface Likelihood {
  id_likelihood: string;
  name: string;
  value: number;
}

export interface Insiden {
  id_incident: string;
  id_category: string;
  area: string;
  custom_category: string;
  id_type_reporting: string;
  custom_type_reporting: string;
  id_severity: string;
  id_likelihood: string;
  id_location: string;
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
