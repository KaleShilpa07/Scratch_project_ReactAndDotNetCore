﻿


using Microsoft.EntityFrameworkCore;
namespace ScratchProject1
{
    public class ComponyContext : DbContext
    {
        public ComponyContext(DbContextOptions<ComponyContext> options) : base(options)
        {

        }
        public DbSet<Student> students { get; set; }
        public DbSet<Skill> skills { get; set; }
        public DbSet<Registration> registrations { get; set; }
    }
}
