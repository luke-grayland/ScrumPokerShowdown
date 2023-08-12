﻿using ScrumPoker_react;
using ScrumPoker_react.Controllers;
using ScrumPoker_react.Hubs;
using ScrumPoker_react.Orchestrators;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors();
builder.Services.AddControllersWithViews();
builder.Services.AddSignalR();
builder.Services.AddScoped<IGameOrchestrator, GameOrchestrator>();
builder.Services.AddScoped<GameController>();

var redisConfiguration = new RedisConfiguration
{
    ConnectionString = "localhost:6379",
    InstanceName = "MyRedisInstance"
};
builder.Services.AddSingleton<IConnectionMultiplexer>(x =>
    ConnectionMultiplexer.Connect(redisConfiguration.ConnectionString));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(builder =>
    {
        builder
            .WithOrigins("http://localhost:3000")
            .SetIsOriginAllowedToAllowWildcardSubdomains()
            .AllowAnyHeader()
            .AllowCredentials()
            .WithMethods("GET", "PUT", "POST", "DELETE", "OPTIONS")
            .SetPreflightMaxAge(TimeSpan.FromSeconds(3600));
    }
);

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<ScrumPokerHub>("/ScrumPokerHub");
});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");;

app.Run();

