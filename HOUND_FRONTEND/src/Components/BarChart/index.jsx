import React, { useRef, useEffect, useState } from "react";
import Highcharts from "highcharts";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import axios from "axios";
import moment from "moment";

function BarChart({ contData}) {
  const chartContainer = useRef(null);
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf("month"));
  const [likesAndCommentData, setLikesAndCommentData] = useState(null);

  const constructQueryParameters = (
    firstDate,
    lastDate,
  ) => {
    const queryParams = [];
    if (firstDate && lastDate) {
      const formattedFirstDate = moment(firstDate.$d).format("YYYY-MM-DD");
      const formattedLastDate = moment(lastDate.$d).format("YYYY-MM-DD");
      queryParams.push(`from=${formattedFirstDate}`);
      queryParams.push(`to=${formattedLastDate}`);
    }

    return queryParams.join("&");
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const firstDayOfMonth = dayjs(date).startOf("month");
      const lastDayOfMonth = dayjs(date).endOf("month");
      getLikesAndComments(firstDayOfMonth, lastDayOfMonth);
    }
  };

  const getLikesAndComments = async(firstDate, lastDate) =>{
    try {
        if(firstDate && lastDate){
          const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/user/current-user/likesAndComments?${constructQueryParameters(firstDate, lastDate)}`, {withCredentials: true});
          // console.log(res);
        setLikesAndCommentData(res?.data)
        }
    } catch (error) {
      console.log(error);
    }
  }
  const getData = ()=>{
    const firstDayOfMonth = dayjs(selectedDate).startOf("month");
    const lastDayOfMonth = dayjs(selectedDate).endOf("month");
    getLikesAndComments(firstDayOfMonth, lastDayOfMonth);
  }
  useEffect(()=>{
    getLikesAndComments();
    getData();
  },[]);
  const likesCount = likesAndCommentData?.map((e)=> e?.likeCount);
  const commentcount = likesAndCommentData?.map((e)=> e?.commentCount);
  useEffect(() => {
    const daysInMonth = dayjs(selectedDate)?.daysInMonth();
    Highcharts.chart(chartContainer.current, {
      chart: {
        type: "column",
      },
      title: {
        text: null,
        align: "left",
        margin: 80,
        style: {
          color: "#585858",
        },
      },
      subtitle: {
        text: null,
        align: "left",
        style: {
          color: "#444",
        },
      },
      xAxis: {
        categories: Array.from({ length: daysInMonth }, (_, day) =>
        (day + 1).toString(),
        ),
        title: {
          text: "Days",
        },
      },
      yAxis: {
        title: {
          text: "Likes and Comments ",
        },
      },
    //   tooltip: {
    //     formatter() {
    //       return `Day: <b>${Math.round(
    //         this.x,
    //       )}</b><br/>Contribution Amount: <b> ₹ ${Math.round(
    //         this.y,
    //       )?.toLocaleString(
    //         "en-IN",
    //       )}</b><br/>Number of Receipts: <b>${this.point.z?.toLocaleString(
    //         "en-IN",
    //       )}`;
    //     },
    //   },

      series: [
        {
          name: "Likes",
          data: likesCount,
          
        //   color: {
        //     linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        //     stops: [
        //       [0, "#A63EB6"],
        //       [1, "#B33F99"],
        //     ],
        //   },
        },
        {
            name: 'Comments',
            data: commentcount,
        }
      ],
    });
  }, [likesAndCommentData]);

  return (
    <div
      style={{
        background: "#fff",
        paddingTop: "24px",
        borderRadius: "12px",
        marginBottom: "20px",
      }}
    >
      <div style={{ paddingLeft: "24px" }}>
        <Typography
          style={{ fontSize: "24px", fontWeight: 500, color: "#444" }}
        >
          Monthly Likes and Comments
        </Typography>
        <Typography
          style={{ fontSize: "14px", fontWeight: 500, color: "#444" }}
        >
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          paddingRight: "24px",
          marginBottom: "24px",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Month"
            value={selectedDate}
            openTo="month"
            onChange={(newDate) => handleDateChange(newDate)}
            disableFuture
            renderInput={(params) => <TextField {...params} />}
            views={["year", "month"]}
            format="MMMM YYYY"
            slotProps={{ textField: { size: "small" } }}
            sx={{ width: "190px", height: "46px", marginTop: "24px" }}
          />
        </LocalizationProvider>
      </div>
      <div
        ref={chartContainer}
        style={{ borderRadius: "12px", overflow: "hidden" }}
      />
    </div>
  );
}

export default BarChart;
