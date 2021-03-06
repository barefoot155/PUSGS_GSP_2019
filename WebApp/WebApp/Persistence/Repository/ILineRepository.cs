﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public interface ILineRepository: IRepository<Line, int>
    {
        int GetLineIdByLineNumber(string lineNumber);

        List<string> GetLinesByLineType(LineType lineType);
        List<string> GetAllLines();
        bool AddNewLine(LineBindingModel line);
        Line GetLineByLineNumber(string lineNumber);
        bool UpdateLine(LineBindingModel line);
        List<Station> GetAllStationsByLineNumber(string lineNumber);
        bool RemoveLine(int lineId);
        Line GetLineById(int lineId);
    }
}
