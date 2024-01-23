const { prisma } = require('../prisma/prisma-client')

const allEmployees = async (_, res) => {
  try {
    const employees = await prisma.employee.findMany()
    if (employees.length === 0) {
      throw error
    }
    res.status(200).json(employees)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "can't find employees" })
  }
}

const addEmployee = async (req, res) => {
  try {
    const data = req.body

    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({ message: 'all fields are required' })
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    })

    return res.status(201).json(employee)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'something went wrong' })
  }
}

const removeEmployee = async (req, res) => {
  try {
    const { id } = req.body
    await prisma.employee.delete({
      where: {
        id,
      },
    })

    res.status(204).json({
      message: 'deleted',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'can not delete employee' })
  }
}

const editEmployee = async (req, res) => {
  try {
    const data = req.body
    const id = data.id
    await prisma.employee.update({
      where: {
        id,
      },
      data,
    })
    res.status(204).json({ message: 'edited' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'can not edit employee' })
  }
}

const getEmployee = async (req, res) => {
  const { id } = req.params
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    })

    res.status(200).json(employee)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'can not find employee' })
  }
}

module.exports = {
  allEmployees,
  addEmployee,
  removeEmployee,
  editEmployee,
  getEmployee,
}
