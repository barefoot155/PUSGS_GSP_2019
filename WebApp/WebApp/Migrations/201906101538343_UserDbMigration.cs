namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserDbMigration : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "DocumentPath", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "DocumentPath");
        }
    }
}
