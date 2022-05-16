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

namespace WebApplication1.Pages.Orders
{
    [Authorize]
    public class IndexModel : PageModel
    {
        private readonly WebApplication1.Data.ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        public IndexModel(WebApplication1.Data.ApplicationDbContext context, 
            UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public IList<Order> Orders { get; set; }
        public double Sum{get;set;}

        public async Task OnGetAsync()
        {

            IdentityUser currentUser = await _userManager.GetUserAsync(User);

            if(currentUser.UserName.ToLower().Equals("admin"))
                Orders = await _context.Orders.Include(o => o.Product).Include(o => o.User).ToListAsync();
            else
            {
                Orders = await _context.Orders.Include(o => o.Product).Include(o => o.User).Where(o => o.User==currentUser).ToListAsync();
            }

            Sum = Orders.Sum(order => order.Amount);

        }
    }
}
