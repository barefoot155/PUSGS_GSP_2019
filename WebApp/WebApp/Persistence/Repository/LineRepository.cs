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

        public LineRepository(DbContext context) : base(context)
        {

        }

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

        public bool AddNewLine(LineBindingModel line)
        {
            try
            {
                Line l = new Line()
                {
                    LineType = line.LineType,
                    Number = line.Number,
                    //TODO dodati stations
                };

                AppDbContext.Lines.Add(l);
                AppDbContext.SaveChanges();

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}