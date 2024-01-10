using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ScratchProject1
{
    [Table("StudTBL")]
    public class Student
    {
        [Key]
        //Scaler Property
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Adress { get; set; }
        [Required]
        public string? Age { get; set; }
        [Required]
        public string? Class { get; set; }
        public int SkillId { get; set; }
        [ForeignKey("SkillId")]
        //refference NP
        public virtual Skill? Skills { get; set; }


    }
}
