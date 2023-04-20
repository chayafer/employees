import { Role } from "./role"

export interface Employee {
  name :string
  idNumber :string
  isdeleted :boolean
  created :Date
  role?:Role
  manager?:Employee
}

