using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using System.IO;

namespace WebApplication1.Pages.Orders
{
    [Authorize]
    public class CheckoutModel : PageModel
    {
        private readonly WebApplication1.Data.ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        public CheckoutModel(WebApplication1.Data.ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }


   
        
        public async Task<IActionResult> OnGetAsync()
        {

            
           
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {


            IdentityUser currentUser = await _userManager.GetUserAsync(User);

            var Orders = await _context.Orders.Include(o => o.Product).Include(o => o.User).Where(o => o.User == currentUser).ToListAsync();

            foreach(Order o in Orders)
            {
                System.IO.File.AppendAllText("zamowienia.txt",o.Data+": "+ o.User.Email + ", " + o.Product.Name + ", " + o.ProductCount + ", " + o.Amount+"\r\n");
            }
            
            _context.Orders.RemoveRange(Orders);

            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}
