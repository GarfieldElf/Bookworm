using a.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;

namespace a.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EventController : ControllerBase
{
    private readonly Eventdbcontext _reactcontext;

   public EventController(Eventdbcontext reactcontext)
    {

        _reactcontext = reactcontext;
    }

    [HttpGet]
    public async Task<ActionResult> GET()
    {
        var events = await _reactcontext.CreateEvent.ToListAsync();
        return Ok(events);
    }

    [HttpPost]

    public async Task<ActionResult> Post(Events newEvent)
    {

        _reactcontext.CreateEvent.Add(newEvent);
        await _reactcontext.SaveChangesAsync();
        return Ok(newEvent);
    }

    [HttpGet]
    [Route("{eventId:int}")]
    public async Task<IActionResult> Get(int eventId)
    {
        var eventById = await _reactcontext
        .CreateEvent.Where(_ => _.EventId == eventId)
        .FirstOrDefaultAsync();
        return Ok(eventById);
    }

    [HttpPut]
    public async Task<ActionResult> Put(Events eventToUpdate)
    {
        _reactcontext.CreateEvent.Update(eventToUpdate);
        await _reactcontext.SaveChangesAsync();
        return Ok(eventToUpdate);
    }



}
