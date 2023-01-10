using a.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;

namespace a.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookController : ControllerBase
{
    private readonly Booksdbcontext _reactcontext;

    public BookController(Booksdbcontext reactcontext)
    {

        _reactcontext = reactcontext;
    }

    [HttpGet]
    public async Task<ActionResult> GET()
    {
        var books = await _reactcontext.Books.ToListAsync();
        return Ok(books);
    }

    [HttpGet]
    [Route("{bookId:int}")]
    public async Task<IActionResult> Get(int bookId)
    {
        var bookById = await _reactcontext
        .Books.Where(_ => _.BookId == bookId)
        .FirstOrDefaultAsync();
        return Ok(bookById);
    }



}