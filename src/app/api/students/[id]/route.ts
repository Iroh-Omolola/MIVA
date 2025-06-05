import students from '@/data/students.json'; 

/**
 * API Handler for student data management by ID.
 * 
 * This module provides GET, DELETE, and PUT request handling for individual student information.
 * It uses an in-memory array to simulate a database of students.
 */

/**
 * Handles GET requests to retrieve a single student by ID.
 * 
 * @param {Request} req - The incoming request object.
 * @param {Object} params - The parameters from the request.
 * @param {string} params.id - The ID of the student to retrieve.
 * 
 * @returns {Response} 
 * - If the student is found, a JSON response containing the student's data with a status code of 200.
 * - If the student is not found, a JSON response with a message and a status code of 404.
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const student = students.find((student) => student.id === params.id);
  if (student) {
    return new Response(JSON.stringify(student), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: "Student not found" }), { status: 404 });
  }
}
/**
 * Handles DELETE requests to remove a student by ID.
 * 
 * @param {Request} req - The incoming request object.
 * @param {Object} params - The parameters from the request.
 * @param {string} params.id - The ID of the student to delete.
 * 
 * @returns {Response} 
 * - If the student is deleted successfully, a JSON response with a success message and a status code of 200.
 * - If the student is not found, a JSON response with a message and a status code of 404.
 */

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const studentIndex = students.findIndex((student) => student.id === params.id);

  if (studentIndex > -1) {
    students.splice(studentIndex, 1); 
    return new Response(JSON.stringify({ message: "Student deleted successfully" }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: "Student not found" }), { status: 404 });
  }
}

/**
 * Handles PUT requests to update a student's information by ID.
 * 
 * @param {Request} req - The incoming request object containing the updated student data.
 * @param {Object} params - The parameters from the request.
 * @param {string} params.id - The ID of the student to update.
 * 
 * @returns {Response} 
 * - If the student is updated successfully, a JSON response with a success message and a status code of 200.
 * - If the student is not found, a JSON response with a message and a status code of 404.
 */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const studentIndex = students.findIndex((student) => student.id === params.id);

  if (studentIndex > -1) {
    const body = await req.json();
    students[studentIndex] = { ...students[studentIndex], ...body };
    return new Response(JSON.stringify({ message: "Student updated successfully" }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: "Student not found" }), { status: 404 });
  }
}
