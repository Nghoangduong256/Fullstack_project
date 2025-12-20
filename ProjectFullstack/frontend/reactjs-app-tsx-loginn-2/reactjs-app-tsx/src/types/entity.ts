// Create interfaces for the data structures used in the application

// Interface for a Department
export interface Department {
  id?: number;
  name: string;
  totalMember: number;
  type: "DEV" | "TEST"; // Type can be either 'Department' or 'Team'
  createDate?: string; // ISO date string
  // List of accounts in the department (optional)
  accounts?: Account[];
}

// Interface for a Account
export interface Account {
  id: number;
  userName: string;
  email: string;
  password?: string; // Optional field
  fullName?: string; // Full name of the account holder
  department?: Department; // Optional field
  departmentId?: number; // Foreign key to Department
  createDate: string; // ISO date string
  role: "ROLE_ADMIN" | "ROLE_USER";
  positionId?: number; // Foreign key to Position
}
