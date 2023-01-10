using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System;



namespace a.Models
{
    public class Registerdbcontext:DbContext
    {

        public Registerdbcontext(DbContextOptions<Registerdbcontext> context) : base(context)
        {

        }

        public DbSet<Register> UserRegistration { get; set; }


    }
}
