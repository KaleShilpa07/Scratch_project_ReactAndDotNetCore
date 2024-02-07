
using static ScratchProject1.ComponyContext;

namespace ScratchProject1.Infrastructure.Irepository
{

    public interface IStudentrepo
    {
        Task<IEnumerable<StudentDetailsDTO>> GetAllStudentss();
        Task<StudentDetailsDTO> GetStudentById(int studentid);
        Task<int> AddStudents(StudentDetailsDTO studentDetails);
        Task<bool> EditStudent(int studentid, StudentDetailsDTO studentDetails);
        Task<int> DeleteStudent(int studentid);
        List<Student> SearchStudents(string searchterm);
        Task<int> DeleteMultiple(List<int> ids);
    }

}
