using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Timers;
using WebApp.Models;

namespace WebApp.Hubs
{
    [HubName("notifications")]
    public class NotificationHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<NotificationHub>();

        private List<string> line7a = new List<string>()
        {
            "45.241258-19.831091",
            "45.243437-19.839891",
            "45.245161-19.846399",
            "45.247049-19.848534",
            "45.248303-19.851066",
            "45.249754-19.855347",
            "45.251944-19.855562"
        };

        private static List<StationBindingModel> stations = new List<StationBindingModel>();

        private static Timer timer = new Timer();
        //private double cntLat = 45.241258;
        //private double cntLon = 19.831091;
        private static int cnt = 0;

        public NotificationHub()
        {
        }

        public void TimeServerUpdates()
        {
            timer.Interval = 500;
            timer.Start();
            timer.Elapsed += OnTimedEvent;
        }

        private void OnTimedEvent(object source, ElapsedEventArgs e)
        {
            GetTime();
        }

        public void GetTime()
        {
            if (stations.Count > 0)
            {
                if (cnt >= stations.Count)
                    cnt = 0;
                Clients.All.setRealTime(stations[cnt].Lat.ToString() + "-" + stations[cnt].Lon.ToString());
                ++cnt;
            }
        }

        public void StopTimeServerUpdates()
        {
            timer.Stop();
        }

        public void AddStations(List<StationBindingModel> stationsBM)
        {
            stations = stationsBM;
        }
    }
}