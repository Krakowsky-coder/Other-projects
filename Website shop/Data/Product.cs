using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Data
{
    public class Product
    {
        public int Id { get; set; }


        [Display(Name = "Cena")]
        [Range(0, double.MaxValue, ErrorMessage = "Niepoprawna wartość")]
        [Required(ErrorMessage = "Nie podano ceny")]
        public Double Price { get; set; }

        [Display(Name = "Nazwa produktu")]
        [Required(ErrorMessage = "Nie podano nazwy")]

        public string Name { get; set; }

        [Display(Name = "Opis")]
        public string Description { get; set; }


    }
}
