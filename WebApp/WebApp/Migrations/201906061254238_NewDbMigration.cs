namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NewDbMigration : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.AspNetUsers", "TicketId", "dbo.Tickets");
            DropIndex("dbo.AspNetUsers", new[] { "TicketId" });
            AlterColumn("dbo.AspNetUsers", "TicketId", c => c.Int());
            CreateIndex("dbo.AspNetUsers", "TicketId");
            AddForeignKey("dbo.AspNetUsers", "TicketId", "dbo.Tickets", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUsers", "TicketId", "dbo.Tickets");
            DropIndex("dbo.AspNetUsers", new[] { "TicketId" });
            AlterColumn("dbo.AspNetUsers", "TicketId", c => c.Int(nullable: false));
            CreateIndex("dbo.AspNetUsers", "TicketId");
            AddForeignKey("dbo.AspNetUsers", "TicketId", "dbo.Tickets", "Id", cascadeDelete: true);
        }
    }
}
