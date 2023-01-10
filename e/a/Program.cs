using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using a.Models;
using Azure.Core;
using Azure;
using Microsoft.AspNetCore.Builder;
using static System.Net.Mime.MediaTypeNames;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Services.AddDbContext<Eventdbcontext>(options =>{
    options.UseSqlServer(builder.Configuration.GetConnectionString("WebApiDatabase"));

});

builder.Services.AddDbContext<Registerdbcontext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("WebApiDatabase"));

});

builder.Services.AddDbContext<Booksdbcontext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("WebApiDatabase"));

});

builder.Services.AddDbContext<BookCommentdbcontext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("WebApiDatabase"));

});


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("https://localhost:3000",
                                              "https://localhost:7024")
                                                  .AllowAnyHeader()
                                                  .AllowAnyMethod();
                      });
});


    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }
    app.UseHttpsRedirection();

    app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

    app.MapControllers();

    app.Run();

