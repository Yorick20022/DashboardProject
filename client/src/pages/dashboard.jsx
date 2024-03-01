import '../styles/style.css';
import '../styles/users.css';
import '../styles/stats.css';
import '../styles/sidebar.css';
import '../styles/discord.css';
import '../styles/activity.css';
import '../styles/toplevel.css';
import Tooltip from '@mui/material/Tooltip';
import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';

function App() {
  const [data, setData] = useState(null); // Initialize data as null
  const [online, setOnline] = useState(true); // Initialize data as false

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:5000/result');
      if (response.ok) {
        const result = await response.json();
        setData(_ => [...result]);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error while fetching data', error);
    }
  };

  useEffect(() => {
    const to = setTimeout(() => {
      getData();
    }, 1000);
    return () => clearTimeout(to);
  }, [data]);

  const checkDiscordBotStatus = async () => {
    try {
      const response = await fetch('http://localhost:4000/bot-status');
      if (response.ok) {
        setOnline(true);
      } else {
        console.log('Bot is offline!');
        setOnline(false);
      }
    } catch (error) {
      console.error('Error while fetching data', error);
      setOnline(false);
    }
  };


  useEffect(() => {
    const checkBotStatusInterval = setInterval(() => {
      checkDiscordBotStatus();
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(checkBotStatusInterval);
  }, []);

  return (
    <div className="hi">
      <div className="main">
        <div className="sidebar">
          <h1 className="servertitle">Codingshelter</h1>
          <hr className="servertitleline" />
        </div>
        <input type="text" className="menusearch" placeholder="Search" />
        <div className="sidebarmenu">
          <div className="gauge"></div>
          <i className="fa-solid fa-gauge"></i>
          <p className="dashboardtext">Dashboard</p>
          <i className="fa-solid fa-gear"></i>
          <p className="settingstext">Settings</p>
          <i className="fa-solid fa-wrench"></i>
          <p className="toolstext">Config</p>
        </div>

        <h1 className="welcomeuser">Welcome, Yorick</h1>
        <div className="statscontent">
          <div className="container">
            {data ? (
              data.map((item, index) => (
                <div key={index}>
                  <div className="row">
                    <div className="box" id="box1">
                      <p className="statstext">MESSAGES</p>
                      <i className="fa-solid fa-message"></i>
                      <p className="statdata">{<CountUp start={0} end={item.allMessages} duration={3}></CountUp>}</p>
                    </div>
                    <div className="box" id="box2">
                      <p className="statstext">BANS</p>
                      <i className="fa-solid fa-gavel"></i>
                      <p style={{ marginTop: 4.3 + "rem" }} className="statdata">{<CountUp start={0} end={item.allBans} duration={3}></CountUp>}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <div className="row">
                  <div className="box" id="box1">
                    <p className="statstext">MESSAGES</p>
                    <i className="fa-solid fa-message"></i>
                    <p className="statdata">N/A</p>
                  </div>
                  <div className="box" id="box2">
                    <p className="statstext">BANS</p>
                    <i className="fa-solid fa-gavel"></i>
                    <p style={{ marginTop: 4.3 + "rem" }} className="statdata">N/A</p>
                  </div>
                </div>
              </div>
            )}

            {data ? (
              data.map((item, index) => (
                <div key={index}>
                  <div className="row">
                    <div className="box" id="box3">
                      <p className="statstext">TIMEOUTS</p>
                      <i className="fa-solid fa-clock"></i>
                      <p style={{ marginTop: 4.4 + "rem" }} className="statdata">{<CountUp start={0} end={item.allTimeouts} duration={3}></CountUp>}</p>
                    </div>
                    <div className="box" id="box4">
                      <p className="statstext">KICKS</p>
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                      <p style={{ marginTop: 4.4 + "rem" }} className="statdata">{<CountUp start={0} end={item.allKicks} duration={3}></CountUp>}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <div className="row">
                  <div className="box" id="box3">
                    <p className="statstext">TIMEOUTS</p>
                    <i className="fa-solid fa-clock"></i>
                    <p style={{ marginTop: 4.4 + "rem" }} className="statdata">N/A</p>
                  </div>
                  <div className="box" id="box4">
                    <p className="statstext">KICKS</p>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <p style={{ marginTop: 4.4 + "rem" }} className="statdata">N/A</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {data ? (
        data.map((item, index) => (
          <div key={index}>
            <div className="topusers">
              <p className="topuserstitle">TOP</p>
              <p className="topusersmessages"><strong>Messages:</strong> @{item.mostMessages} ({item.userWithMostMessages})</p>
              <p className="topusersmessages"><strong>Bans:</strong> @{item.mostBans} ({item.userWithMostBans})</p>
              <p className="topusersmessages"><strong>Timeouts:</strong> @{item.mostTimeouts} ({item.userWithMostTimeouts})</p>
              <p className="topusersmessages"><strong>Kicks:</strong> @{item.mostKicks} ({item.userWithMostKicks})</p>
            </div>
          </div>
        ))
      ) : (
        <div>
          <div className="topusers">
            <p className="topuserstitle">TOP</p>
            <p className="topusersmessages"><strong>Messages:</strong> N/A</p>
            <p className="topusersmessages"><strong>Bans:</strong> N/A</p>
            <p className="topusersmessages"><strong>Timeouts:</strong> N/A</p>
            <p className="topusersmessages"><strong>Kicks:</strong> N/A</p>
          </div>
        </div>
      )}

      {data ? (
        data.map((item, index) => (
          <div key={index}>
            <div className="morestatstext">
              <p className="morestatstitle">UPTIME</p>
              {online ? (
                <Tooltip title="Bot online!">
                  <i className="fa-solid fa-circle fa-fade status-online"></i>
                </Tooltip>
              ) : (
                <Tooltip title="Bot offline!">
                  <i className="fa-solid fa-circle fa-fade status-offline"></i>
                </Tooltip>
              )}
              {online ? (
                <div>
                  <p className="morestatcontent"><strong>Days:</strong> {item.days}</p>
                  <p className="morestatcontent"><strong>Hours:</strong> {item.hours}</p>
                  <p className="morestatcontent"><strong>Minutes:</strong> {item.minutes}</p>
                  <p className="morestatcontent"><strong>Seconds:</strong> {item.seconds}</p>
                </div>
              ) : (
                <p className="morestatcontent"><strong>Bot is experiencing issues!</strong></p>
              )}
            </div>
          </div>
        ))
      ) : (
        <div>
          <div className="morestatstext">
            <p className="morestatstitle">UPTIME</p>
            {online ? (
              <div>
                <p className="morestatcontent"><strong>Days:</strong> N/A</p>
                <p className="morestatcontent"><strong>Hours:</strong> N/A</p>
                <p className="morestatcontent"><strong>Minutes:</strong> N/A</p>
                <p className="morestatcontent"><strong>Seconds:</strong> N/A</p>
              </div>
            ) : (
              <p className="morestatcontent"><strong>Bot is experiencing issues!</strong></p>
            )}
          </div>
        </div>
      )}

      {data ? (
        data.map((item, index) => (
          <div key={index}>
            <div className="recentactivity">
              <p className="recentactivitytitle">RECENT ACTIVITY</p>
              {item.lastMessage.length > 18 ? (
                <Tooltip title={item.lastMessage}>
                  <p className="recentactivitycontent">
                    <strong>Message:</strong> {item.lastMessage.substring(0, 18)}...
                  </p>
                </Tooltip>
              ) : (
                <p className="recentactivitycontent">
                  <strong>Message:</strong> {item.lastMessage}
                </p>
              )}
              <p className="recentactivitycontent"><strong>Ban:</strong> {item.lastBan}</p>
              <p className="recentactivitycontent"><strong>Kick:</strong> {item.lastKick}</p>
              <p className="recentactivitycontent"><strong>Timeout:</strong> {item.lastTimeout}</p>
              <p className="recentactivitycontent"><strong>Joined user:</strong> {item.lastJoin}</p>
            </div>
          </div>
        ))
      ) : (
        <div>
          <div className="recentactivity">
            <p className="recentactivitytitle">RECENT ACTIVITY</p>
            <p className="recentactivitycontent">
              <strong>Message:</strong> N/A
            </p>
            <p className="recentactivitycontent"><strong>Ban:</strong> N/A</p>
            <p className="recentactivitycontent"><strong>Kick:</strong> N/A</p>
            <p className="recentactivitycontent"><strong>Timeout:</strong> N/A</p>
            <p className="recentactivitycontent"><strong>Joined user:</strong> N/A</p>
          </div>
        </div>
      )}

      {data ? (
        data.map((item, index) => (
          <div key={index}>
            <div className="toplevel">
              <div className="toplevelcontent">
                <hr className="toplevelline" />
                <p className="topleveltitle">TOP LEVELS</p>
                {item.userLevel.map((level, levelIndex) => (
                  <div key={levelIndex}>
                    <Tooltip title={level.user_xp + " xp"}>
                      <p className="toplevelcontenttext"><strong>User:</strong> {level.user} ({level.user_level})</p>
                      <br />
                    </Tooltip>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <div className="toplevel">
            <div className="toplevelcontent">
              <hr className="toplevelline" />
              <p className="topleveltitle">TOP LEVELS</p>
              <p className="toplevelcontenttext"> N/A</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App;
