using a.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;

namespace a.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RegistrationController : ControllerBase
{
    private readonly Registerdbcontext _reactcontext;

    public RegistrationController(Registerdbcontext reactcontext)
    {

        _reactcontext = reactcontext;
    }

    [HttpGet]
    public async Task<ActionResult> GET()
    {
        var users = await _reactcontext.UserRegistration.ToListAsync();
        return Ok(users);
    }

    [HttpPost]

    public async Task<ActionResult> Post(Register newUser)
    {

        _reactcontext.UserRegistration.Add(newUser);
        await _reactcontext.SaveChangesAsync();
        return Ok(newUser);
    }

    [HttpGet]
    [Route("{userId:int}")]

    public async Task<IActionResult> Get(int userId)
    {
        var userById = await _reactcontext
        .UserRegistration.Where(_ => _.UserId == userId)
        .FirstOrDefaultAsync();
        return Ok(userById);
    }

    [HttpPut]
    public async Task<IActionResult> Put(Register UsertoUpdate)
    {
        _reactcontext.UserRegistration.Update(UsertoUpdate);
        await _reactcontext.SaveChangesAsync();
        return Ok(UsertoUpdate);
    }



}
