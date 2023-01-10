using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;

namespace a.Models
{
    public class Events
    {
        [Key]
        public int? EventId { get; set; }
        public string? BookName { get; set; } 
        public string? Comments { get; set; }

        public int? EnrolledUsers { get; set; } 
        public string? EventType { get; set; }

        [DataType(DataType.Date)]
        public DateTime EventDate { get; set; }

        [DataType(DataType.Time)]
        public DateTime EventTime { get; set; }

        public int CounterEnrolled { get; set; }

        public Boolean SetDisabled { get; set; }

    }
}
