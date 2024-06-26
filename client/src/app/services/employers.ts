import { Employee } from '@prisma/client'
import { api } from './api'

export const employeesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query<Employee[], void>({
      query: () => ({
        url: '/employees',
        method: 'GET',
      }),
    }),
    getEmployee: builder.query<Employee, string>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'GET',
      }),
    }),
    editEmployee: builder.mutation<string, Employee>({
      query: (employee) => ({
        url: `/employees/edit/${employee.id}`,
        body: employee,
        method: 'PUT',
      }),
    }),
    removeEmployee: builder.mutation<string, string>({
      query: (id) => ({
        url: `/employees/remove/${id}`,
        method: 'POST',
        body: { id },
      }),
    }),
    addEmployee: builder.mutation<Employee, Employee>({
      query: (employee) => ({
        url: `/employees/add`,
        method: 'POST',
        body: employee,
      }),
    }),
  }),
})

export const {
  useGetAllEmployeesQuery,
  useGetEmployeeQuery,
  useEditEmployeeMutation,
  useAddEmployeeMutation,
  useRemoveEmployeeMutation,
} = employeesApi

export const {
  endpoints: {
    getAllEmployees,
    getEmployee,
    editEmployee,
    removeEmployee,
    addEmployee,
  },
} = employeesApi
