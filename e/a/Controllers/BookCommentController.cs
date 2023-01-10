using a.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;

namespace a.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookCommentController : ControllerBase
{
    private readonly BookCommentdbcontext _reactcontext;

    public BookCommentController(BookCommentdbcontext reactcontext)
    {

        _reactcontext = reactcontext;
    }

    [HttpGet]
    public async Task<ActionResult> GET()
    {
        var comments = await _reactcontext.BookComments.ToListAsync();
        return Ok(comments);
    }

    [HttpGet]
    [Route("{bookId:int}")]
    public async Task<IActionResult> Get(int bookId)
    {
        var bookById = await _reactcontext
        .BookComments.Where(_ => _.BookId == bookId)
        .FirstOrDefaultAsync();
        return Ok(bookById);
    }



    [HttpPost]

    public async Task<ActionResult> Post(BookComments newComment)
    {

        _reactcontext.BookComments.Add(newComment);
        await _reactcontext.SaveChangesAsync();
        return Ok(newComment);
    }



}
