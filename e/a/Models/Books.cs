using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;

namespace a.Models
{
    public class Books
    {
        [Key]
        public int? BookId { get; set; }
        
        public string? BookName { get; set; }
        public string? Category { get; set; }

        public string? BookAuthor { get; set; }
        public string? BookCover { get; set; }

        public string? BookSummary { get; set; }
       

    }
}
