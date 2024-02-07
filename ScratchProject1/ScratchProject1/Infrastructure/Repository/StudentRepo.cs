using Microsoft.EntityFrameworkCore;
using ScratchProject1;
using ScratchProject1.Infrastructure.Irepository;
using ScratchProject1.Model;
using static ScratchProject1.ComponyContext;

public class StudentRepository : IStudentrepo
{
    private readonly ComponyContext _cc;

    public StudentRepository(ComponyContext context)
    {
        _cc = context;
    }

    public async Task<int> AddStudents(StudentDetailsDTO studentDetails)
    {
        using (var transaction = _cc.Database.BeginTransaction())
        {
            try
            {
                // Create a new Student entity
                var student = new Student
                {
                    Name = studentDetails.Name,
                    City = studentDetails.City,
                    Age = studentDetails.Age,
                    Standard = studentDetails.Standard,
                    Photo = studentDetails.Photo,
                    DOB = studentDetails.DOB,
                    Gender = studentDetails.Gender,
                    MobileNo = studentDetails.MobileNo,
                    EmailId = studentDetails.EmailId,
                    IsActive = studentDetails.IsActive,
                    // Set other properties accordingly
                };

                // Save the student data to the Student table
                _cc.Students.Add(student);
                await _cc.SaveChangesAsync();

                // Create a new Course entity
                var course = new Course
                {
                    CourseName = studentDetails.CourseName,
                    CourseCode = studentDetails.CourseCode,
                    Credits = studentDetails.Credits,
                    Grade = studentDetails.Grade
                    // Set other properties accordingly
                };

                // Save the course data to the Course table
                _cc.courses.Add(course);
                await _cc.SaveChangesAsync();

                // Create a new Enrollment entity
                var enrollment = new Enrollment
                {
                    StudentId = student.StudentId,
                    CourseId = course.CourseId,
                    EnrollmentDate = studentDetails.EnrollmentDate
                    // Set other properties accordingly
                };

                // Save the enrollment data to the Enrollment table
                _cc.enrollments.Add(enrollment);
                await _cc.SaveChangesAsync();

                // Commit the transaction
                transaction.Commit();

                // Return the student ID
                return student.StudentId;
            }
            catch (Exception)
            {
                // An error occurred, roll back the transaction
                transaction.Rollback();
                throw;  // Rethrow the exception to signal failure
            }
        }
    }




    public async Task<int> DeleteStudent(int studentid)
    {
        var stud = await _cc.Students.FindAsync(studentid);

        if (stud == null)
        {
            // Student not found
            return 0; // You can choose a suitable status code
        }

        _cc.Students.Remove(stud);
        int result = await _cc.SaveChangesAsync();

        return result; // Return the number of affected rows

    }



    public async Task<IEnumerable<StudentDetailsDTO>> GetAllStudentss()
    {
        var studentsWithDetails = await _cc.Students
            .Include(s => s.Enrollments)
            .ThenInclude(e => e.Course)
            .ToListAsync();

        var result = studentsWithDetails.Select(s => new StudentDetailsDTO
        {
           
            Name = s.Name,
            City = s.City,
            Age = s.Age,
            Standard = s.Standard,
            Photo = s.Photo,
            DOB = s.DOB,
            Gender = s.Gender,
            MobileNo = s.MobileNo,
            EmailId = s.EmailId,
            IsActive = s.IsActive,
            CourseName = s.Enrollments?.FirstOrDefault()?.Course?.CourseName,
            Grade = s.Enrollments?.FirstOrDefault()?.Course?.Grade,
            CourseCode = s.Enrollments?.FirstOrDefault()?.Course?.CourseCode,
            Credits = s.Enrollments?.FirstOrDefault()?.Course?.Credits ?? 0,
            EnrollmentDate = s.Enrollments?.FirstOrDefault()?.EnrollmentDate ?? DateTime.MinValue,
        }).ToList();

        return result;
    }


    public async Task<StudentDetailsDTO> GetStudentById(int studentid)
    {
        try
        {
            var studentWithDetails = await _cc.Students
                .Where(s => s.StudentId == studentid)
                .Include(s => s.Enrollments)
                .ThenInclude(e => e.Course)
                .FirstOrDefaultAsync();

            if (studentWithDetails == null)
            {
                return null;
            }

            var enrollment = studentWithDetails.Enrollments.FirstOrDefault();

            var studentDetailsDTO = new StudentDetailsDTO
            {
                Name = studentWithDetails.Name,
                City = studentWithDetails.City,
                Age = studentWithDetails.Age,
                Standard = studentWithDetails.Standard,
                Photo = studentWithDetails.Photo,
                DOB = studentWithDetails.DOB,
                Gender = studentWithDetails.Gender,
                MobileNo = studentWithDetails.MobileNo,
                EmailId = studentWithDetails.EmailId,
                IsActive = studentWithDetails.IsActive,
                Grade = enrollment?.Course?.Grade,
                CourseName = enrollment?.Course?.CourseName,
                CourseCode = enrollment?.Course?.CourseCode,
                Credits = enrollment?.Course?.Credits ?? 0,
                EnrollmentDate = enrollment?.EnrollmentDate ?? DateTime.MinValue,
            };

            return studentDetailsDTO;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error retrieving student details: {ex.Message}");
            throw;
        }
    }


public async Task<bool> EditStudent(int studentid, StudentDetailsDTO student)
    {
        // Start a database transaction
        using (var transaction = _cc.Database.BeginTransaction())
        {
            try
            {
                // Retrieve the existing student from the database
                var existingStudent = await _cc.Students.FindAsync(studentid);

                if (existingStudent == null)
                {
                    // Student not found
                    return false;
                }

                // Update the existing student properties

                if (!string.IsNullOrEmpty(student.PhotoBase64))
                {
                    student.Photo = Convert.FromBase64String(student.PhotoBase64);
                }

                existingStudent.Photo = Convert.FromBase64String(student.PhotoBase64);
                existingStudent.Name = student.Name;
                existingStudent.City = student.City;
                existingStudent.Age = student.Age;
                existingStudent.Standard = student.Standard;
                existingStudent.DOB = student.DOB;
                existingStudent.Gender = student.Gender;
                existingStudent.MobileNo = student.MobileNo;
                existingStudent.EmailId = student.EmailId;
                existingStudent.IsActive = student.IsActive;

                // Update the student data in the Student table
                _cc.Students.Update(existingStudent);
                await _cc.SaveChangesAsync();

                // Retrieve the existing enrollment for the student from the database
                var existingEnrollment = await _cc.enrollments
                    .Where(e => e.StudentId == studentid)
                    .FirstOrDefaultAsync();

                if (existingEnrollment == null)
                {
                    // Enrollment not found
                    return false;
                }

                // Update the existing enrollment properties
                existingEnrollment.EnrollmentDate = student.EnrollmentDate;

                // Update the enrollment data in the Enrollment table
                _cc.enrollments.Update(existingEnrollment);
                await _cc.SaveChangesAsync();

                // Retrieve the existing course for the enrollment from the database
                var existingCourse = await _cc.courses.FindAsync(existingEnrollment.CourseId);

                if (existingCourse == null)
                {
                    // Course not found
                    return false;
                }

                // Update the existing course properties
                existingCourse.CourseName = student.CourseName;
                existingCourse.CourseCode = student.CourseCode;
                existingCourse.Credits = student.Credits;

                // Update the course data in the Course table
                _cc.courses.Update(existingCourse);
                await _cc.SaveChangesAsync();

                // Commit the transaction
                transaction.Commit();

                // Return true indicating success
                return true;
            }
            catch (Exception ex)
            {
                // An error occurred, roll back the transaction
                transaction.Rollback();
                throw;  // Rethrow the exception to signal failure
            }
        }
    }

    public async Task<int> DeleteMultiple(List<int> ids)
    {
        var itemsToDelete = await _cc.Students.Where(i => ids.Contains(i.StudentId)).ToListAsync();

        if (itemsToDelete == null || itemsToDelete.Count == 0)
        {
            return 0; // Indicates that no items were found or deleted
        }

        _cc.Students.RemoveRange(itemsToDelete);
        int deletedCount = await _cc.SaveChangesAsync();

        return deletedCount;
    }

    public List<Student> SearchStudents(string searchTerm)
    {
        return _cc.Students
            .Where(s => s.Name.Contains(searchTerm) || s.City.Contains(searchTerm))
            .ToList();
    }
}









