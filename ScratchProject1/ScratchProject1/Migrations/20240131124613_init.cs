using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ScratchProject1.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CourseTBL",
                columns: table => new
                {
                    CourseId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CourseName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CourseCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Credits = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseTBL", x => x.CourseId);
                });

            migrationBuilder.CreateTable(
                name: "EmailModelTBL",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    To = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmailModelTBL", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "StudTBL",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Age = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Standard = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Photo = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    DOB = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MobileNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmailId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudTBL", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EnrollmentTBL",
                columns: table => new
                {
                    EnrollmentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id = table.Column<int>(type: "int", nullable: false),
                    CourseId = table.Column<int>(type: "int", nullable: false),
                    EnrollmentDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnrollmentTBL", x => x.EnrollmentId);
                    table.ForeignKey(
                        name: "FK_EnrollmentTBL_CourseTBL_CourseId",
                        column: x => x.CourseId,
                        principalTable: "CourseTBL",
                        principalColumn: "CourseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EnrollmentTBL_StudTBL_Id",
                        column: x => x.Id,
                        principalTable: "StudTBL",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GradeTBL",
                columns: table => new
                {
                    GradeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EnrollmentId = table.Column<int>(type: "int", nullable: false),
                    GradeValue = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GradeTBL", x => x.GradeId);
                    table.ForeignKey(
                        name: "FK_GradeTBL_EnrollmentTBL_EnrollmentId",
                        column: x => x.EnrollmentId,
                        principalTable: "EnrollmentTBL",
                        principalColumn: "EnrollmentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EnrollmentTBL_CourseId",
                table: "EnrollmentTBL",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_EnrollmentTBL_Id",
                table: "EnrollmentTBL",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_GradeTBL_EnrollmentId",
                table: "GradeTBL",
                column: "EnrollmentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmailModelTBL");

            migrationBuilder.DropTable(
                name: "GradeTBL");

            migrationBuilder.DropTable(
                name: "EnrollmentTBL");

            migrationBuilder.DropTable(
                name: "CourseTBL");

            migrationBuilder.DropTable(
                name: "StudTBL");
        }
    }
}
