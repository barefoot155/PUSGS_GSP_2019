namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NewDbMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Discounts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CustomerType = c.Int(nullable: false),
                        Coefficient = c.Single(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Items",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Type = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Lines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Number = c.String(),
                        LineType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Stations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Address = c.String(),
                        LocationId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Locations", t => t.LocationId, cascadeDelete: true)
                .Index(t => t.LocationId);
            
            CreateTable(
                "dbo.Locations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Lat = c.Double(nullable: false),
                        Lon = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Pricelist_Item",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ItemId = c.Int(nullable: false),
                        PricelistId = c.Int(nullable: false),
                        Price = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Items", t => t.ItemId, cascadeDelete: true)
                .ForeignKey("dbo.Pricelists", t => t.PricelistId, cascadeDelete: true)
                .Index(t => t.ItemId)
                .Index(t => t.PricelistId);
            
            CreateTable(
                "dbo.Pricelists",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Schedules",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Day = c.Int(nullable: false),
                        LineId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Lines", t => t.LineId, cascadeDelete: true)
                .Index(t => t.LineId);
            
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
            
            CreateTable(
                "dbo.Tickets",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TicketType = c.Int(nullable: false),
                        CustomerType = c.Int(nullable: false),
                        Price = c.Double(nullable: false),
                        CheckTime = c.DateTime(nullable: false),
                        ExpirationDate = c.DateTime(nullable: false),
                        Pricelist_itemId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Pricelist_Item", t => t.Pricelist_itemId, cascadeDelete: true)
                .Index(t => t.Pricelist_itemId);
            
            CreateTable(
                "dbo.StationLines",
                c => new
                    {
                        Station_Id = c.Int(nullable: false),
                        Line_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Station_Id, t.Line_Id })
                .ForeignKey("dbo.Stations", t => t.Station_Id, cascadeDelete: true)
                .ForeignKey("dbo.Lines", t => t.Line_Id, cascadeDelete: true)
                .Index(t => t.Station_Id)
                .Index(t => t.Line_Id);
            
            AddColumn("dbo.AspNetUsers", "DateOfBirth", c => c.DateTime(nullable: false));
            AddColumn("dbo.AspNetUsers", "Address", c => c.String());
            AddColumn("dbo.AspNetUsers", "Name", c => c.String());
            AddColumn("dbo.AspNetUsers", "Surname", c => c.String());
            AddColumn("dbo.AspNetUsers", "TicketId", c => c.Int());
            AddColumn("dbo.AspNetUsers", "Type", c => c.Int(nullable: false));
            CreateIndex("dbo.AspNetUsers", "TicketId");
            AddForeignKey("dbo.AspNetUsers", "TicketId", "dbo.Tickets", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUsers", "TicketId", "dbo.Tickets");
            DropForeignKey("dbo.Tickets", "Pricelist_itemId", "dbo.Pricelist_Item");
            DropForeignKey("dbo.ScheduleTimes", "ScheduleId", "dbo.Schedules");
            DropForeignKey("dbo.Schedules", "LineId", "dbo.Lines");
            DropForeignKey("dbo.Pricelist_Item", "PricelistId", "dbo.Pricelists");
            DropForeignKey("dbo.Pricelist_Item", "ItemId", "dbo.Items");
            DropForeignKey("dbo.Stations", "LocationId", "dbo.Locations");
            DropForeignKey("dbo.StationLines", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.StationLines", "Station_Id", "dbo.Stations");
            DropIndex("dbo.StationLines", new[] { "Line_Id" });
            DropIndex("dbo.StationLines", new[] { "Station_Id" });
            DropIndex("dbo.AspNetUsers", new[] { "TicketId" });
            DropIndex("dbo.Tickets", new[] { "Pricelist_itemId" });
            DropIndex("dbo.ScheduleTimes", new[] { "ScheduleId" });
            DropIndex("dbo.Schedules", new[] { "LineId" });
            DropIndex("dbo.Pricelist_Item", new[] { "PricelistId" });
            DropIndex("dbo.Pricelist_Item", new[] { "ItemId" });
            DropIndex("dbo.Stations", new[] { "LocationId" });
            DropColumn("dbo.AspNetUsers", "Type");
            DropColumn("dbo.AspNetUsers", "TicketId");
            DropColumn("dbo.AspNetUsers", "Surname");
            DropColumn("dbo.AspNetUsers", "Name");
            DropColumn("dbo.AspNetUsers", "Address");
            DropColumn("dbo.AspNetUsers", "DateOfBirth");
            DropTable("dbo.StationLines");
            DropTable("dbo.Tickets");
            DropTable("dbo.ScheduleTimes");
            DropTable("dbo.Schedules");
            DropTable("dbo.Pricelists");
            DropTable("dbo.Pricelist_Item");
            DropTable("dbo.Locations");
            DropTable("dbo.Stations");
            DropTable("dbo.Lines");
            DropTable("dbo.Items");
            DropTable("dbo.Discounts");
        }
    }
}
