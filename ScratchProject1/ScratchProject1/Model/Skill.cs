using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ScratchProject1

{
    [Table("SkillTBL")]
    public class Skill
    {
        [Key]
        public int SkillId { get; set; }
        [Required]
        public string? SkillName { get; set; }
        //collection Navigation prop
        public virtual List<Student> Students { get; set; } = new List<Student>();
    }
}
