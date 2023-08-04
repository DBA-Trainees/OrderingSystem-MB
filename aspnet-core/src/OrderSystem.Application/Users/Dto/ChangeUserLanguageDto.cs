using System.ComponentModel.DataAnnotations;

namespace OrderSystem.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}