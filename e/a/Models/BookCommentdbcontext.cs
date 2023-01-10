using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System;

namespace a.Models

{
    public class BookCommentdbcontext : DbContext

    {
        public BookCommentdbcontext(DbContextOptions<BookCommentdbcontext> context) : base(context)
        {

        }

        public DbSet<BookComments> BookComments { get; set; }
    }

}