namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class LineNumberMigration : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Lines", "Number", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Lines", "Number", c => c.Short(nullable: false));
        }
    }
}
