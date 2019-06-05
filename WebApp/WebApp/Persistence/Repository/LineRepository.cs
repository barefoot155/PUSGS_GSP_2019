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
    }
}