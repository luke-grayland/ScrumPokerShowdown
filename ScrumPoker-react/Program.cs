using ScrumPoker_react;
using ScrumPoker_react.Controllers;
using ScrumPoker_react.Hubs;
using ScrumPoker_react.Orchestrators;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

IConfiguration configuration = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .Build();

builder.Services.AddCors();
builder.Services.AddControllersWithViews();
builder.Services.AddSignalR();
builder.Services.AddScoped<IGameOrchestrator, GameOrchestrator>();
builder.Services.AddScoped<GameController>();

var redisConfiguration = new RedisConfiguration
{
    ConnectionString = configuration["Redis:ConnectionString"],
    InstanceName = configuration["Redis:InstanceName"]
};
builder.Services.AddSingleton<IConnectionMultiplexer>(x =>
    ConnectionMultiplexer.Connect(redisConfiguration.ConnectionString));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseDefaultFiles();
    app.UseStaticFiles();
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

