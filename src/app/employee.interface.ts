export interface EmployeeResponseInterFace {
  status: string
  data: EmployeeInterface[]
  message: string
}
export interface EmployeeInterface {
  id: number
  employee_name: string
  employee_salary: number
  employee_age: number
  profile_image: string
}
export interface AGE {
  range: string;
  code: Array<number>;
}
