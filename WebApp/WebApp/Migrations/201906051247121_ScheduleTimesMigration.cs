namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ScheduleTimesMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ScheduleTimes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Time = c.String(),
                        ScheduleId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Schedules", t => t.ScheduleId, cascadeDelete: true)
                .Index(t => t.ScheduleId);
            
            AddColumn("dbo.Lines", "LineType", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ScheduleTimes", "ScheduleId", "dbo.Schedules");
            DropIndex("dbo.ScheduleTimes", new[] { "ScheduleId" });
            DropColumn("dbo.Lines", "LineType");
            DropTable("dbo.ScheduleTimes");
        }
    }
}
