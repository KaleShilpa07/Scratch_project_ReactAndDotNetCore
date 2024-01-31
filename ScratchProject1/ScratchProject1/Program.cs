using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using ScratchProject1;

var builder = WebApplication.CreateBuilder(args);

// ... other configurations

builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<ComponyContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultCon"));
});

// Add Swagger configuration
builder.Services.AddSwaggerGen();
// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseCors("AllowAllOrigins");



// ... other middleware

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();