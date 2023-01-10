using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System;

namespace a.Models

{
    public class Booksdbcontext : DbContext

    {
        public Booksdbcontext(DbContextOptions<Booksdbcontext> context) : base(context)
        {

        }

        public DbSet<Books> Books { get; set; }
    }

}
