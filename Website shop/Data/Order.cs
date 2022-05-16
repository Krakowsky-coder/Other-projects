using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Data
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime Data { get; set; }


        [Display(Name = "Nazwa produktu")]
        public Product Product { get; set; }

        [Display(Name = "Ilość")]
        public int ProductCount { get; set; }


        [Display(Name = "Suma")]
        public Double Amount { get; set; }

        
        public IdentityUser User { get; set; }
    }
}
