using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ScratchProject1.Model
{
    [Table("EmailModelTBL")]
    public class EmailModel
    {
        [Key]
        public int id { get; set; }
        public string To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}
