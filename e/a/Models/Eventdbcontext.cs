using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System;

namespace a.Models

{
    public class Eventdbcontext:DbContext

    {
        public Eventdbcontext(DbContextOptions<Eventdbcontext> context) : base(context)
        {

        }

        public DbSet<Events>CreateEvent { get; set; }
    }

}

