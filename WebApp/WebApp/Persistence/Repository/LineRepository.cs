using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class LineRepository : Repository<Line, int>, ILineRepository
    {
        protected ApplicationDbContext AppDbContext { get { return context as ApplicationDbContext; } }

        public LineRepository(DbContext context) : base(context){ }

        public int GetLineIdByLineNumber(string lineNumber)
        {            
            return AppDbContext.Lines.FirstOrDefault(l => l.Number == lineNumber).Id;
        }

        public List<string> GetLinesByLineType(LineType lineType)
        {
            List<string> ret = new List<string>();

            foreach (var item in AppDbContext.Lines.ToList())
            {
                if(item.LineType == lineType)
                {
                    ret.Add(item.Number);
                }
            }

            return ret;
        }

        public List<string> GetAllLines()
        {
            List<string> ret = new List<string>();

            foreach (var item in AppDbContext.Lines.ToList())
            {
                ret.Add(item.Number);
            }

            return ret;
        }

        public Line GetLineByLineNumber(string lineNumber)
        {
            return AppDbContext.Lines.FirstOrDefault(line => line.Number == lineNumber);
        }

        public bool AddNewLine(LineBindingModel line)
        {
            try
            {
                Line l = new Line()
                {
                    LineType = line.LineType,
                    Number = line.Number,
                    Stations = new List<Station>()
                };

                foreach (Station item in AppDbContext.Stations.ToList())
                {
                    if(line.Stations.Contains(item.Name))
                    {
                        l.Stations.Add(item);
                    }
                }

                if (!AppDbContext.Lines.Any(x => x.Number == line.Number))
                {
                    AppDbContext.Lines.Add(l);
                    AppDbContext.SaveChanges();
                }

                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public bool UpdateLine(LineBindingModel line)
        {

            foreach (Line lineItem in AppDbContext.Lines.ToList())
            {
                if(lineItem.Id == line.Id)
                {
                    lineItem.Number = line.Number;
                    lineItem.LineType = line.LineType;
                    lineItem.Stations = new List<Station>();
                    foreach (string station in line.Stations)
                    {
                        lineItem.Stations.Add(GetStationByName(station));
                    }

                    AppDbContext.SaveChanges();

                    return true;
                }
            }

            return false;
        }

        public Station GetStationByName(string station)
        {
            return AppDbContext.Stations.Single(s => s.Name == station);
        }

        public List<Station> GetAllStationsByLineNumber(string lineNumber)
        {
            Line line = AppDbContext.Lines.FirstOrDefault(l => l.Number == lineNumber);

            if (line == null)
                return new List<Station>();

            return line.Stations;
        }

        public bool RemoveLine(int lineId)
        {
            try
            {
                Line lineToRemove = AppDbContext.Lines.Single(l => l.Id == lineId);
                AppDbContext.Lines.Remove(lineToRemove);

                AppDbContext.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                //conflict
                return false;
            }
        }
    }
}