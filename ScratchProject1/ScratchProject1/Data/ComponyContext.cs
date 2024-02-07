using Microsoft.EntityFrameworkCore;
using ScratchProject1.Model;

namespace ScratchProject1
{
    public class ComponyContext : DbContext
    {
        public ComponyContext(DbContextOptions<ComponyContext> options) : base(options)
        {

        }
        public DbSet<Course> courses { get; set; }
        public DbSet<Enrollment> enrollments { get; set; }
        public DbSet<Student> Students { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {  // Configure relationships

            // Many-to-Many relationship between Course and Student through Enrollment
            modelBuilder.Entity<Enrollment>()
                .HasKey(e => new { e.StudentId, e.CourseId });

            modelBuilder.Entity<Enrollment>()
                .HasOne(e => e.Student)
                .WithMany(s => s.Enrollments)
                .HasForeignKey(e => e.StudentId);

            modelBuilder.Entity<Enrollment>()
                .HasOne(e => e.Course)
                .WithMany(c => c.Enrollments)
                .HasForeignKey(e => e.CourseId);

            // Optionally, add other configurations for entities here


            // Optionally, add other configurations for entities here

            // Configure your entity relationships here if needed
            // modelBuilder.Entity<YourEntity>().HasOne(...);
        }

        // DTO for Student
        public class StudentDetailsDTO
        {
            public int StudentId { get; set; }
            public string? Name { get; set; }
            public string? City { get; set; }
            public string? Age { get; set; }
            public string? Standard { get; set; }
            public byte[] Photo { get; set; }
            public string? PhotoBase64 { get; set; }
            public DateTime? DOB { get; set; }
            public string?   Gender { get; set; }
            public string? MobileNo { get; set; }
            public string? EmailId { get; set; }
            public bool IsActive { get; set; }

          public int CourseId { get; set; }
            public string? CourseName { get; set; }
            public string? CourseCode { get; set; }
            public string? Grade { get; set; }
            public int Credits { get; set; }
          public int EnrollmentId { get; set; }
            public DateTime EnrollmentDate { get; set; }

        }
    }
}
