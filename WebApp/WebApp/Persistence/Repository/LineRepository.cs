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
            //short zamijeni u modelu sa string
            var num = short.Parse(lineNumber);
            
            return AppDbContext.Lines.FirstOrDefault(l => l.Number == num).Id;
        }
    }
}