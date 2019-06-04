using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace WebApp.Models
{
    // Models used as parameters to AccountController actions.

    public class LoginBindingModel
    {
        [Required]
        [Display(Name = "Username")]
        public string Username { get; set; }
        [Required]
        [Display(Name = "Password")]
        public string Password { get; set; }
    }
    public class DiscountBindingModel
    {
        [Required]
        [Display(Name = "CustomerType")]
        public CustomerType CustomerType { get; set; }
        [Required]
        [Display(Name = "Coefficient")]
        public float Coefficient { get; set; }
    }

    public class ItemBindingModel
    {
        [Required]
        [Display(Name = "Type")]
        public TicketType Type { get; set; }
    }

    public class LineBindingModel
    {
        [Required]
        [Display(Name = "Number")]
        public short Number { get; set; }
    }

    public class LocationBindingModel
    {
        [Required]
        [Display(Name = "Lat")]
        public double Lat { get; set; }
        [Required]
        [Display(Name = "Lon")]
        public double Lon { get; set; }
    }

    public class PricelistBindingModel
    {
        [Required]
        [Display(Name = "StartDate")]
        public DateTime StartDate { get; set; }
        [Required]
        [Display(Name = "EndDate")]
        public DateTime EndDate { get; set; }
        [Required]
        [Display(Name = "IsActive")]
        public bool IsActive { get; set; }
    }

    public class Pricelist_ItemBindingModel
    {
        [Required]
        [Display(Name = "ItemId")]
        public int ItemId { get; set; }
        [Required]
        [Display(Name = "ItemId")]
        public int PricelistId { get; set; }
        [Required]
        [Display(Name = "ItemId")]
        public double Price { get; set; }
    }

    public class TicketPriceBindingModel
    {
        [Required]
        [Display(Name = "TicketType")]
        public TicketType TicketType { get; set; }
        [Required]
        [Display(Name = "CustomerType")]
        public CustomerType CustomerType { get; set; }
    }

    public class ScheduleBindingModel
    {
        [Required]
        [Display(Name = "Day")]
        public DayOfWeek Day { get; set; }
        [Required]
        [Display(Name = "LineId")]
        public int LineId { get; set; }
    }

    public class StationBindingModel
    {
        [Required]
        [Display(Name = "Name")]
        public string Name { get; set; }
        [Required]
        [Display(Name = "Address")]
        public string Address { get; set; }
        [Required]
        [Display(Name = "LocationId")]
        public int LocationId { get; set; }
    }

    public class TicketBindingModel
    {
        [Required]
        [Display(Name = "TicketType")]
        public TicketType TicketType { get; set; }
        [Required]
        [Display(Name = "CustomerType")]
        public CustomerType CustomerType { get; set; }
        [Required]
        [Display(Name = "Price")]
        public double Price { get; set; }
        [Required]
        [Display(Name = "CheckTime")]
        public DateTime CheckTime { get; set; }
        [Required]
        [Display(Name = "ExpirationDate")]
        public DateTime ExpirationDate { get; set; }
        [Required]
        [Display(Name = "Pricelist_itemId")]
        public int Pricelist_itemId { get; set; }
    }
    public class AddExternalLoginBindingModel
    {
        [Required]
        [Display(Name = "External access token")]
        public string ExternalAccessToken { get; set; }
    }

    public class ChangePasswordBindingModel
    {
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Current password")]
        public string OldPassword { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }

    public class RegisterBindingModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "ConfirmPassword")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
        
        [Display(Name = "PhoneNumber")]
        public string PhoneNumber { get; set; }

        [Required]
        [Display(Name = "UserName")]
        public string UserName { get; set; }

        [Required]
        [Display(Name = "DateOfBirth")]
        public string DateOfBirth { get; set; }

        [Required]
        [Display(Name = "Address")]
        public string Address { get; set; }

        [Required]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Required]
        [Display(Name = "Surname")]
        public string Surname { get; set; }

        [Required]
        [Display(Name = "CustomerType")]
        public CustomerType CustomerType { get; set; }
    }

    public class RegisterExternalBindingModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class RemoveLoginBindingModel
    {
        [Required]
        [Display(Name = "Login provider")]
        public string LoginProvider { get; set; }

        [Required]
        [Display(Name = "Provider key")]
        public string ProviderKey { get; set; }
    }

    public class SetPasswordBindingModel
    {
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}
