using Azure.Identity;
using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;

namespace a.Models
{
    public class BookComments
    {
    
        public int? BookId { get; set; }

        [Key]
        public int? CommentId { get; set; }
        public string? BookComment { get; set; }

        [DataType(DataType.Date)]
        public DateTime Datee { get; set; }

        public string? Username { get; set; }

        public string? IsRecommended { get; set; }

        public Boolean AddedComment { get; set; }


    }
}