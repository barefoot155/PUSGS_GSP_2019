namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CheckTicketMigration : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Tickets", "IsChecked", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Tickets", "IsChecked");
        }
    }
}
