using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;

namespace a.Models
{
    public class Register
    {

        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }=string.Empty;

        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Favourite Book is required")]
        public string FavouriteBook { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required")]
        public string UserPassword { get; set; } = string.Empty;

        [Key]
        public int UserId { get; set; }

        public string? userAvatar { get; set; }


    }
}
